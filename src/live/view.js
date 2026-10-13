// Live tool for the floating panel: loads your leagues and this week's
// matchups, polls Sleeper's live stat lines, and turns every change into a
// feed event showing what it did to each matchup it touches. Runs only while
// mounted — switching the panel to Draft unmounts it and stops polling.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, tracker, scoring, teams, players, storage } = NightOwl;
  const { escape: esc, points: fmt, signed, clock: clockOf, short }  = NightOwl.format;
  let root = null; // the element we render into, inside the panel's shadow root
  const $ = (id) => root.querySelector(`#${id}`);

  const MARKUP = `
    <header class="bar">
      <div class="title">
        <span id="live-dot" class="dot" title="Polls every 15s while your players' games are on"></span>
        <strong id="week-label" title="Double-click to preview the play animations">Live</strong>
        <span id="updated" class="muted small"></span>
      </div>
      <div class="actions">
        <button id="refresh" class="icon" title="Refresh now" aria-label="Refresh now">↻</button>
        <button id="settings-btn" class="icon" title="Leagues to track" aria-label="Leagues to track">⚙</button>
      </div>
    </header>
    <div class="stage" id="stage"><div class="idle" id="stage-idle">Plays pop here the moment they happen</div></div>
    <nav class="lv-tabs" id="lv-tabs">
      <button data-view="feed" class="on">Feed <span class="lv-count" id="lv-count-feed"></span></button>
      <button data-view="matchups">Matchups <span id="net-total"></span></button>
      <button data-view="games">Games <span class="lv-count" id="lv-count-games"></span></button>
    </nav>
    <div class="tool-scroll">
      <section id="settings" class="card" hidden>
        <div id="league-toggles"></div>
        <p class="muted small">Username comes from the extension popup. Points use each league's own scoring settings.</p>
      </section>
      <p id="error" class="error" hidden></p>
      <section data-pane="feed">
        <div class="lv-toolbar">
          <div class="tabs" id="filters">
            <button data-filter="all" class="tab on">All</button>
            <button data-filter="good" class="tab">Helps me</button>
            <button data-filter="bad" class="tab">Hurts me</button>
          </div>
          <button id="lv-big" class="tab" title="Touchdowns and plays worth 4+ points in a league">Big plays</button>
          <select id="lv-league" title="Show one league"><option value="">All leagues</option></select>
        </div>
        <ol id="feed"></ol>
        <p id="feed-empty" class="muted small empty">New scoring plays by your starters and your opponents' show up here as they happen, with what each did in every league.</p>
      </section>
      <section data-pane="matchups" hidden>
        <div id="scoreboard"><div class="skel" role="status" aria-label="Loading your leagues"><i></i><i></i><i></i></div></div>
      </section>
      <section data-pane="games" hidden>
        <div id="games"></div>
      </section>
    </div>
  `;

  const NEED_USERNAME = 'Add your Sleeper username to get started.';
  const LIVE_POLL_MS = 15000;
  const IDLE_POLL_MS = 120000;
  const CONTEXT_TTL_MS = 5 * 60000; // lineups can change until each game locks
  const SCHEDULE_TTL_MS = 60000;
  const MAX_EVENTS = 500;
  const IDP = ['DL', 'LB', 'DB', 'IDP_FLEX'];


  const state = {
    openRecaps: new Set(), // recap cards the user expanded
    settings: { username: '', excluded: [] },
    ctx: null, // { userId, season, week, seasonType, leagues, loadedAt }
    stats: {}, // pid -> current stat line
    proj: {}, // pid -> projected stat line for the week
    projAt: 0,
    clocks: [], // ESPN games with the share of each still to play
    clocksAt: 0,
    trend: { key: null, series: {} }, // leagueId -> [[ts, chance]] for this week
    snapshot: null, // { key, stats } last diffed snapshot, persisted
    events: [], // newest first, persisted per week
    schedule: { games: [], loadedAt: 0 },
    filter: 'all',
    view: 'feed', // feed | matchups | games
    league: '', // '' = all leagues
    bigOnly: false,
    gameOpen: new Map(), // game id -> open, once the user toggles it (live games start open)
    lastPoll: 0,
    timer: null,
    busy: false,
    seenEventIds: new Set()
  };

  const weekKey = (ctx) => `${ctx.season}-${ctx.seasonType}-${ctx.week}`;
  const activeLeagues = () => (state.ctx ? state.ctx.leagues.filter((lg) => !state.settings.excluded.includes(lg.leagueId)) : []);

  // ---- data loading -----------------------------------------------------
  const loadPlayers = () => players.load();
  const info = (pid) => players.info(pid);

  async function loadContext() {
    const nfl = await api.state();
    const season = nfl.season;
    const seasonType = nfl.season_type === 'post' ? 'post' : 'regular';
    const week = nfl.display_week || nfl.week;

    let userId = state.ctx && state.ctx.username === state.settings.username ? state.ctx.userId : null;
    if (!userId) {
      const user = await api.user(state.settings.username);
      if (!user || !user.user_id) throw new Error(`No Sleeper user named "${state.settings.username}"`);
      userId = user.user_id;
    }

    const all = await api.leagues(userId, season);
    const playing = all.filter((lg) => lg.status === 'in_season' || lg.status === 'post_season');
    const leagues = (await Promise.all(playing.map(async (lg) => {
      const [rosters, users, matchups] = await Promise.all([
        api.rosters(lg.league_id), api.users(lg.league_id), api.matchups(lg.league_id, week)
      ]);
      const mine = rosters.find((r) => r.owner_id === userId || (r.co_owners || []).includes(userId));
      if (!mine) return null;
      const userName = new Map(users.map((u) => [u.user_id, (u.metadata && u.metadata.team_name) || u.display_name]));
      const userAvatar = new Map(users.map((u) => [u.user_id, (u.metadata && u.metadata.avatar) || (u.avatar ? `https://sleepercdn.com/avatars/thumbs/${u.avatar}` : '')]));
      const owner = (rosterId) => rosters.find((x) => x.roster_id === rosterId) || {};
      const teamName = (rosterId) => userName.get(owner(rosterId).owner_id) || `Team ${rosterId}`;
      const avatar = (rosterId) => userAvatar.get(owner(rosterId).owner_id) || '';
      const matchup = tracker.pickMatchup(matchups || [], mine.roster_id);
      return {
        leagueId: lg.league_id,
        name: lg.name.trim(),
        scoring: lg.scoring_settings || {},
        slots: (lg.roster_positions || []).filter((p) => p !== 'BN' && p !== 'IR' && p !== 'TAXI'),
        myName: teamName(mine.roster_id),
        myAvatar: avatar(mine.roster_id),
        oppName: matchup && matchup.opp ? teamName(matchup.opp.rosterId) : null,
        oppAvatar: matchup && matchup.opp ? avatar(matchup.opp.rosterId) : '',
        matchup
      };
    }))).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));

    state.ctx = { username: state.settings.username, userId, season, seasonType, week, leagues, loadedAt: Date.now() };
    await storage.set({ 'live.ctx': state.ctx });
  }

  // Returns true when a game just kicked off: its lineups are now locked, so
  // the matchups get re-read to pick up any late swaps before kickoff.
  async function loadSchedule() {
    const ctx = state.ctx;
    const before = new Map(state.schedule.games.map((g) => [g.game_id, g.status]));
    const games = (await api.schedule(ctx.season, ctx.seasonType)).filter((g) => g.week === ctx.week);
    state.schedule = { games, loadedAt: Date.now() };
    return games.some((g) => g.status === 'in_game' && before.has(g.game_id) && before.get(g.game_id) !== 'in_game');
  }

  function positionsNeeded() {
    const usesIdp = activeLeagues().some((lg) => lg.slots.some((s) => IDP.includes(s)));
    return usesIdp ? api.OFFENSE.concat(['DL', 'LB', 'DB']) : api.OFFENSE;
  }

  // Is any game involving a tracked player on (or about to be on) right now?
  function trackedTeams() {
    const codes = new Set();
    for (const pid of tracker.watchList(activeLeagues()).keys()) {
      const t = info(pid).team;
      if (t) codes.add(t);
    }
    return codes;
  }

  function gameStatus(team) {
    const g = state.schedule.games.find((x) => x.home === team || x.away === team);
    return g ? g.status : null;
  }

  function isLive() {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
    const tracked = trackedTeams();
    return state.schedule.games.some((g) => {
      if (!tracked.has(g.home) && !tracked.has(g.away)) return false;
      if (g.status === 'complete' || g.status === 'canceled') return false;
      return g.status !== 'pre_game' || g.date === today;
    });
  }

  // ---- win probability inputs -------------------------------------------
  const PROJ_TTL_MS = 30 * 60000;
  const CLOCK_TTL_MS = 60000;

  // Projections (twice an hour) and game clocks (every minute while games
  // are on). Either failing just hides the win %.
  async function loadOutlook(ctx) {
    const now = Date.now();
    if (now - state.projAt > PROJ_TTL_MS) {
      try {
        const rows = await api.weekProjections(ctx.season, ctx.week, ctx.seasonType, positionsNeeded());
        state.proj = Object.fromEntries(rows.map((r) => [r.player_id, r.stats || {}]));
        state.projAt = now;
      } catch (err) {
        console.warn('[Night Owl] projections unavailable', err);
      }
    }
    if (now - state.clocksAt > CLOCK_TTL_MS) {
      try {
        state.clocks = NightOwl.lineups.parseGames(await api.kickoffs(ctx.season, ctx.week, ctx.seasonType));
      } catch {
        state.clocks = NightOwl.lineups.gamesFromSchedule(state.schedule.games, ctx.week);
      }
      state.clocksAt = now;
    }
  }

  // Share of a team's game left to play; 0 on a bye.
  function remainingFor(team) {
    const g = state.clocks.find((x) => x.home === team || x.away === team);
    return g ? g.remaining : 0;
  }

  // Chance of winning this league's matchup, or null when it can't be told.
  function winChance(lg) {
    if (!lg.matchup || !lg.matchup.opp || !Object.keys(state.proj).length) return null;
    const side = (s) => NightOwl.season.outlook(s.starters.map((pid) => ({
      points: scoring.points(state.stats[pid], lg.scoring),
      proj: scoring.points(state.proj[pid], lg.scoring),
      remaining: remainingFor(info(pid).team)
    })));
    return NightOwl.season.winProbability(side(lg.matchup.mine), side(lg.matchup.opp));
  }

  // Starters whose game isn't over yet (including ones not started).
  const stillToPlay = (side) => (side ? side.starters.filter((pid) => remainingFor(info(pid).team) > 0).length : 0);

  // Win chance over the day, one point per poll (persisted for the week).
  function recordTrend(ctx) {
    const key = weekKey(ctx);
    if (state.trend.key !== key) state.trend = { key, series: {} };
    const now = Date.now();
    for (const lg of activeLeagues()) {
      const chance = winChance(lg);
      if (chance == null) continue;
      const series = state.trend.series[lg.leagueId] || (state.trend.series[lg.leagueId] = []);
      const last = series[series.length - 1];
      if (last && Math.abs(last[1] - chance) < 0.005 && now - last[0] < 15 * 60000) continue;
      series.push([now, Math.round(chance * 1000) / 1000]);
      if (series.length > 400) series.splice(0, series.length - 400);
    }
    storage.set({ 'live.trend': state.trend });
  }

  // A small line of your win chance through the day, 50% marked.
  function trendSvg(series) {
    if (!series || series.length < 2) return '';
    const w = 300;
    const h = 44;
    const t0 = series[0][0];
    const span = Math.max(1, series[series.length - 1][0] - t0);
    const pts = series.map(([t, p]) => `${((t - t0) / span * w).toFixed(1)},${((1 - p) * h).toFixed(1)}`).join(' ');
    const end = series[series.length - 1][1];
    return `<div class="trend"><span class="muted small">Win chance today</span>
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="${h / 2}" x2="${w}" y2="${h / 2}" class="mid"/>
        <polyline points="${pts}" class="${end >= 0.5 ? 'good' : 'bad'}"/>
      </svg></div>`;
  }

  // ---- the poll ---------------------------------------------------------
  async function poll(force) {
    if (state.busy || !root || !state.settings.username) return;
    state.busy = true;
    $('refresh').classList.add('spin');
    try {
      showError(null);
      await loadPlayers();
      if (force || !state.ctx || Date.now() - state.ctx.loadedAt > CONTEXT_TTL_MS) await loadContext();
      if (force || Date.now() - state.schedule.loadedAt > SCHEDULE_TTL_MS) {
        if ((await loadSchedule()) && !force) await loadContext();
      }

      const ctx = state.ctx;
      const rows = await api.weekStats(ctx.season, ctx.week, ctx.seasonType, positionsNeeded());
      const cur = {};
      for (const r of rows) {
        cur[r.player_id] = r.stats || {};
        if (r.player) players.remember(r.player_id, `${r.player.first_name} ${r.player.last_name}`, r.player.position, r.team);
      }
      state.stats = cur;
      await loadOutlook(ctx);
      recordTrend(ctx);

      const leagues = activeLeagues();
      const key = weekKey(ctx);
      if (state.snapshot && state.snapshot.key === key) {
        const fresh = tracker.diffEvents(state.snapshot.stats, cur, leagues, info, Date.now());
        // After a gap (panel closed, tab asleep) a diff is everything since the
        // last look, not a play: it becomes a recap, never a pop-up or "last play".
        const gap = Date.now() - state.snapshot.at > 3 * LIVE_POLL_MS;
        for (const ev of fresh) if (gap) { ev.catchUp = true; ev.since = state.snapshot.at; }
        if (fresh.length) state.events = fresh.concat(state.events).slice(0, MAX_EVENTS);
        if (!gap) celebrate(fresh);
      } else {
        // First look this week (or this install): everything so far becomes a
        // "So far today" recap instead of an empty feed.
        const fresh = tracker.diffEvents(tracker.trimSnapshot({}, leagues), cur, leagues, info, Date.now());
        for (const ev of fresh) { ev.catchUp = true; ev.firstLook = true; ev.since = ev.ts; }
        if (fresh.length) state.openRecaps.add(`${fresh[0].since}-${fresh[0].ts}`); // start it open
        state.events = fresh;
      }
      state.snapshot = { key, at: Date.now(), stats: tracker.trimSnapshot(cur, leagues) };
      state.lastPoll = Date.now();
      await storage.set({ 'live.snapshot': state.snapshot, 'live.events': { key, list: state.events } });
      render();
    } catch (err) {
      console.error('[Night Owl]', err);
      showError(err.message || String(err));
    } finally {
      state.busy = false;
      if (root) $('refresh').classList.remove('spin');
      schedule();
    }
  }

  function schedule() {
    clearTimeout(state.timer);
    if (!root) return;
    const live = state.ctx && isLive();
    $('live-dot').classList.toggle('live', !!live);
    // The panel frame spins faster while one of your games is on.
    if (root.parentElement) root.parentElement.classList.toggle('hot', !!live);
    state.timer = setTimeout(() => poll(false), live ? LIVE_POLL_MS : IDLE_POLL_MS);
  }

  // ---- rendering --------------------------------------------------------

  function render() {
    if (!root) return;
    const ctx = state.ctx;
    if (ctx) $('week-label').textContent = `Week ${ctx.week}${ctx.seasonType === 'post' ? ' playoffs' : ''}`;
    $('updated').textContent = state.lastPoll ? `updated ${clockOf(state.lastPoll)}` : '';
    renderIdle();
    renderGames();
    renderScoreboard();
    renderLeagueSelect();
    renderFeed();
    renderLeagueToggles();
    showView();
    root.querySelectorAll('img.face').forEach((img) => img.addEventListener('error', () => { img.style.visibility = 'hidden'; }));
  }

  function lineup(lg, side) {
    if (!side) return '<div class="muted small">No opponent this week</div>';
    return side.slots.map((pid, i) => {
      const slot = (lg.slots[i] || '').replace('SUPER_FLEX', 'SF').replace('REC_FLEX', 'RF').replace('WRRB_FLEX', 'W/R');
      if (!pid || pid === '0') return `<div class="slot"><span class="pos">${esc(slot)}</span><span class="nm muted">empty</span><span></span></div>`;
      const p = info(pid);
      const playing = gameStatus(p.team) === 'in_game';
      return `<div class="slot${playing ? ' playing' : ''}"><span class="pos ${esc(slot)}">${esc(slot)}</span>`
        + `<span class="nm" title="${esc(p.name)} ${esc(p.pos)} ${esc(p.team)}">${esc(p.name)}</span>`
        + `<span class="pt">${fmt(scoring.points(state.stats[pid], lg.scoring))}</span></div>`;
    }).join('');
  }

  // Games on now (or later today) with every tracked starter in them: who's
  // yours, who's your opponents', in which leagues, and what they have so far.
  function renderGames() {
    const today = new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
    const leagues = activeLeagues();
    const byId = new Map(leagues.map((lg) => [lg.leagueId, lg]));
    const watch = tracker.watchList(leagues);
    // Games on now come first, then the rest of today's in schedule order.
    const games = state.schedule.games
      .filter((g) => g.status === 'in_game' || (g.status === 'pre_game' && g.date === today))
      .sort((a, b) => (b.status === 'in_game') - (a.status === 'in_game'));

    $('games').innerHTML = games.map((g) => {
      const rows = [...watch].filter(([pid]) => [g.home, g.away].includes(info(pid).team)).map(([pid, spots]) => {
        const p = info(pid);
        const forMe = spots.filter((s) => s.side === 'me').length - spots.filter((s) => s.side === 'opp').length;
        const chips = spots.map(({ leagueId, side }) => {
          const lg = byId.get(leagueId);
          const pts = scoring.points(state.stats[pid], lg.scoring);
          return `<span class="impact ${side === 'me' ? 'helps' : 'hurts'}">${esc(lg.name)} · ${side === 'me' ? 'you' : 'opp'} ${fmt(pts)}</span>`;
        }).join('');
        return { forMe, mine: spots.some((sp) => sp.side === 'me'), html: `<li class="ev" style="--tc:${teams.colors(p.team).primary}"><div class="ev-top"><span class="ev-who">${face(pid, p.team)}<span><span class="ev-name">${esc(p.name)}</span> <span class="muted small">${esc(p.pos)} · ${esc(p.team)}</span></span></span></div><div class="impacts">${chips}</div></li>` };
      }).sort((a, b) => b.forMe - a.forMe);
      const status = g.status === 'in_game' ? '<span class="live-tag">LIVE</span>' : '<span class="muted small">later</span>';
      const mine = rows.filter((r) => r.mine).length;
      const id = String(g.game_id);
      const open = state.gameOpen.has(id) ? state.gameOpen.get(id) : g.status === 'in_game';
      return `<details class="game" data-game="${esc(id)}"${open ? ' open' : ''}>
        <summary class="game-h"><img alt="" src="${teams.logo(g.away)}">${esc(g.away)} <span class="muted">@</span> <img alt="" src="${teams.logo(g.home)}">${esc(g.home)} ${status}<span class="game-count">${rows.length} starters · ${mine} yours</span></summary>
        ${rows.length ? `<ol class="game-list">${rows.map((r) => r.html).join('')}</ol>` : '<p class="muted small">None of your matchups have a starter in this game.</p>'}
      </details>`;
    }).join('') || '<p class="muted small empty">No games on right now.</p>';
    $('lv-count-games').textContent = games.filter((g) => g.status === 'in_game').length ? `${games.filter((g) => g.status === 'in_game').length} live` : '';
  }

  // Small round headshot (team logo for defenses) ringed in the team's color.
  function face(pid, team) {
    const src = /^[A-Z]{2,3}$/.test(pid) ? teams.logo(team) : teams.headshot(pid);
    return `<img class="face" alt="" src="${src}" style="border-color:${teams.colors(team).primary}">`;
  }

  // ---- celebrations ------------------------------------------------------
  // Each fresh play pops over the panel: a big signed number for what it did
  // to you net across leagues, who did it, and where. Touchdowns and other big
  // swings get a banner and a burst of confetti.
  const POP_MS = 2200;
  const POP_GAP_MS = 150; // after one pop leaves, before the next lands
  const MAX_POPS = 3;
  const BIG_PTS = 4;
  const MIN_POP_PTS = 1; // smaller plays (a 3-yard run) go to the feed only
  const popQueue = [];
  let popping = false;

  // One pop at a time. On a busy slate only the three biggest plays of a poll
  // pop (the feed has the rest), and a new poll replaces plays still waiting.
  function celebrate(events) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ranked = events.filter((ev) => isBig(ev) || maxImpact(ev) >= MIN_POP_PTS).sort((x, y) => (isBig(y) - isBig(x)) || (maxImpact(y) - maxImpact(x)));
    if (!ranked.length) return;
    popQueue.length = 0;
    popQueue.push(...ranked.slice(0, MAX_POPS));
    if (!popping) nextPop();
  }

  const maxImpact = (ev) => Math.max(0, ...ev.impacts.map((im) => Math.abs(im.pts)));

  function isBig(ev) {
    return /TD|safety|2-pt/.test(ev.text) || maxImpact(ev) >= BIG_PTS;
  }

  function nextPop() {
    const ev = popQueue.shift();
    const layer = root && $('stage');
    if (!ev || !layer) {
      popping = false;
      if (layer) layer.classList.remove('busy');
      renderIdle();
      return;
    }
    popping = true;
    layer.classList.add('busy');
    layer.classList.remove('dormant');

    const big = isBig(ev);
    const mood = moodOf(ev);
    const headline = /TD/.test(ev.text) ? 'TOUCHDOWN!' : /safety/.test(ev.text) ? 'SAFETY!' : big ? 'BIG PLAY' : '';
    const p = info(ev.pid);
    const team = ev.team || p.team;
    const c = teams.colors(team);
    const pop = document.createElement('div');
    pop.className = `pop ${mood}${big ? ' major' : ''}`;
    pop.style.setProperty('--tp', c.primary);
    pop.style.setProperty('--ts', c.secondary);
    pop.style.setProperty('--ink', c.ink);
    pop.style.setProperty('--ink2', teams.inkOn(c.secondary));
    pop.innerHTML = `
      <div class="band"></div>
      <img class="mark" alt="" src="${teams.logo(team)}">
      <div class="fig">${figure(ev, p, team, c)}</div>
      <div class="copy">
        ${headline ? `<div class="headline">${headline}</div>` : ''}
        <div class="pts">${playValue(ev)}</div>
        <div class="who">${esc(ev.name)} <span>${esc(ev.pos)} · ${esc(team)}</span></div>
        <div class="what">${esc(ev.text)}</div>
        <div class="where">${impactChips(ev)}</div>
      </div>`;
    // No headshot (rookies, some defenders): the jersey carries the figure alone.
    pop.querySelectorAll('img').forEach((img) => img.addEventListener('error', () => img.remove()));
    layer.append(pop);
    layer.classList.remove('glow-good', 'glow-bad');
    void layer.offsetWidth; // restart the glow animation
    if (mood !== 'even') layer.classList.add(`glow-${mood}`);
    if (big) burst(layer, mood, c);

    setTimeout(() => { pop.remove(); setTimeout(nextPop, POP_GAP_MS); }, POP_MS);
  }

  // Between plays the stage shows the last one, or what it's waiting on.
  function renderIdle() {
    if (!root || popping) return;
    const last = state.events.find((ev) => !ev.catchUp);
    const recap = !last && state.events[0];
    const live = state.schedule.games.find((g) => g.status === 'in_game');
    // Nothing playing and nothing to show: give the room to the list.
    $('stage').classList.toggle('dormant', !last && !live);
    $('stage-idle').innerHTML = last
      ? `<span class="muted small">Last play · ${clockOf(last.ts)}</span>
         <span class="idle-who"><img alt="" src="${/^[A-Z]{2,3}$/.test(last.pid) ? teams.logo(last.team) : teams.headshot(last.pid)}"><b>${esc(last.name)}</b></span>
         <span>${esc(last.text)}</span>
         <span class="impacts idle-impacts">${impactChips(last)}</span>`
      : `<span class="muted">${live ? `${esc(live.away)} @ ${esc(live.home)} is live. Waiting for the next play.` : 'Plays pop here the moment they happen'}</span>
         ${recap && !recap.firstLook ? `<span class="muted small">Caught up on everything since ${clockOf(recap.since || recap.ts)}</span>` : ''}`;
  }

  // The player in uniform: a jersey in team colors with their number, their
  // headshot on the collar. Defenses get the team logo instead.
  function figure(ev, p, team, c) {
    if (ev.pos === 'DEF' || /^[A-Z]{2,3}$/.test(ev.pid)) {
      return `<img class="logo" alt="" src="${teams.logo(team)}">`;
    }
    const num = esc(p.number || ev.pos || '');
    return `
      <svg class="jersey" viewBox="0 0 120 112" aria-hidden="true">
        <path d="M34 8 L50 2 Q60 12 70 2 L86 8 L116 30 L102 54 L90 47 L90 110 L30 110 L30 47 L18 54 L4 30 Z"
              fill="${c.primary}" stroke="${c.secondary}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M12 40 L22 46 M108 40 L98 46" stroke="${c.secondary}" stroke-width="5"/>
        <path d="M14 35 L24 41 M106 35 L96 41" stroke="${c.ink}" stroke-width="2" opacity=".7"/>
        <text x="60" y="92" text-anchor="middle" font-family="Poppins, Inter, sans-serif" font-weight="800"
              font-size="${num.length > 2 ? 26 : 38}" fill="${c.ink}" stroke="${c.secondary}" stroke-width="1.5"
              paint-order="stroke">${num}</text>
      </svg>
      <img class="head" alt="" src="${teams.headshot(ev.pid)}">`;
  }

  function burst(layer, mood, c) {
    const colors = [c.primary, c.secondary, '#ffffff', mood === 'bad' ? '#f75c8d' : '#00ceb8', c.secondary];
    for (let i = 0; i < 36; i++) {
      const spark = document.createElement('i');
      spark.className = 'spark';
      const angle = (Math.PI * 2 * i) / 36 + Math.random() * 0.3;
      const dist = 70 + Math.random() * 150;
      spark.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
      spark.style.setProperty('--dy', `${Math.sin(angle) * dist * 0.6 + 30}px`);
      spark.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
      spark.style.background = colors[i % colors.length];
      spark.style.animationDelay = `${Math.random() * 120}ms`;
      layer.append(spark);
      setTimeout(() => spark.remove(), 1600);
    }
  }

  // 0.995 shows as ">99%", never a misleading 100%.
  const pctLabel = (p) => (p > 0.99 && p < 1 ? '>99%' : p < 0.01 && p > 0 ? '<1%' : `${Math.round(p * 100)}%`);

  // Matchup scores always carry two decimals, as on Sleeper (178.20).
  const score = (n) => (Math.round(n * 100) / 100).toFixed(2);

  // Your share of the combined score, as the teal/pink bar Sleeper draws.
  const share = (a, b) => (a + b > 0 ? Math.round((a / (a + b)) * 100) : 50);

  function avatarImg(src, name, cls) {
    const initial = esc((name || '?').trim().charAt(0).toUpperCase());
    return src
      ? `<img class="av ${cls}" alt="" src="${esc(src)}">`
      : `<span class="av ${cls} blank">${initial}</span>`;
  }

  function renderScoreboard() {
    const leagues = activeLeagues();
    const board = new Map(tracker.scoreboard(leagues, state.stats).map((s) => [s.leagueId, s]));
    const open = new Set([...root.querySelectorAll('.match[open]')].map((d) => d.dataset.id));
    const prev = state.prevScores || {};
    state.prevScores = {};
    let winning = 0;
    let favored = 0;
    let withChance = 0;
    let withOpp = 0;
    const final = { won: 0, lost: 0, open: 0 };

    $('scoreboard').innerHTML = leagues.map((lg) => {
      const s = board.get(lg.leagueId);
      if (!s) return `<div class="match"><summary><span class="lname">${esc(lg.name)}</span><span class="muted">no matchup</span></summary></div>`;
      state.prevScores[lg.leagueId] = s;
      if (s.margin != null) { withOpp++; if (s.margin > 0) winning++; }
      const before = prev[lg.leagueId];
      const moved = before && (before.mine !== s.mine || before.opp !== s.opp);
      const chance = winChance(lg);
      // Every starter on both sides has played: show the result, not odds.
      const decided = s.opp != null && stillToPlay(lg.matchup.mine) === 0 && stillToPlay(lg.matchup.opp) === 0 && chance != null;
      if (s.opp != null) {
        if (!decided) final.open++;
        else if (s.margin > 0) final.won++;
        else if (s.margin < 0) final.lost++;
      }
      // Once odds exist the card's tone follows them, so a card never says
      // "losing" next to "Win 96%". The score gap stays neutral.
      const mood = chance != null ? (chance >= 0.5 ? 'win' : 'lose') : s.margin > 0 ? 'win' : s.margin < 0 ? 'lose' : 'tie';
      if (chance != null) { withChance++; if (chance >= 0.5) favored++; }
      // The bar shows your chance to win once projections are in, else your
      // share of the combined score.
      const pct = s.opp == null ? 100 : chance == null ? share(s.mine, s.opp) : Math.round(chance * 100);
      const odds = decided
        ? `<span class="winpct ${s.margin >= 0 ? 'good' : 'bad'}">${s.margin > 0 ? 'Won by' : s.margin < 0 ? 'Lost by' : 'Tied'}</span>`
        : chance == null ? '' : `<span class="winpct ${chance >= 0.5 ? 'good' : 'bad'}" title="Chance to win, from live points plus projections for the time left">Win ${pctLabel(chance)}</span>`;
      const toPlay = (side) => (chance == null || decided || !side ? '' : ` · ${stillToPlay(side)} to play`);
      return `<details class="match ${mood}${moved ? ' flash' : ''}" data-id="${lg.leagueId}"${open.has(lg.leagueId) ? ' open' : ''}>
        <summary>
          <div class="m-league"><span class="lname">${esc(lg.name)}</span>${odds}${s.margin == null ? '' : `<span class="margin${chance == null || decided ? ` ${mood}` : ''}">${decided ? score(Math.abs(s.margin)) : signed(s.margin)}</span>`}</div>
          <div class="m-row">
            ${avatarImg(lg.myAvatar, lg.myName, 'me')}
            <div class="m-side me">
              <span class="tname">${esc(lg.myName)}${toPlay(lg.matchup.mine)}</span>
              <span class="big${moved && before.mine !== s.mine ? ' bump' : ''}" data-from="${before ? before.mine : s.mine}" data-to="${s.mine}">${score(s.mine)}</span>
            </div>
            <span class="vs">VS</span>
            <div class="m-side opp">
              <span class="tname">${esc(lg.oppName || 'Bye week')}${toPlay(lg.matchup.opp)}</span>
              <span class="big${moved && before.opp !== s.opp ? ' bump' : ''}" data-from="${before ? before.opp : s.opp}" data-to="${s.opp == null ? '' : s.opp}">${s.opp == null ? '' : score(s.opp)}</span>
            </div>
            ${lg.oppName ? avatarImg(lg.oppAvatar, lg.oppName, 'opp') : ''}
          </div>
          ${s.opp == null || decided ? '' : `<span class="wp" role="img" aria-label="${chance == null ? `Your share of points: ${pct}%` : `Win chance: ${pct}%`}" title="${chance == null ? 'Your share of the points so far' : 'Your chance to win'}"><span style="width:${pct}%"></span><i style="left:${pct}%"></i></span>`}
        </summary>
        ${trendSvg(state.trend.series[lg.leagueId])}
        <div class="lineups">
          <div><h3>${esc(lg.myName)}</h3>${lineup(lg, lg.matchup.mine)}</div>
          <div><h3>${esc(lg.oppName || '')}</h3>${lineup(lg, lg.matchup.opp)}</div>
        </div>
      </details>`;
    }).join('') || '<p class="muted small">No in-season leagues found.</p>';

    // Once win odds exist, count where you're favored (what matters); before
    // that, where you're ahead right now.
    $('net-total').innerHTML = withOpp && !final.open
      ? `<span class="pill-count ${final.won >= final.lost ? 'good' : 'bad'}" title="This week's results">${final.won}–${final.lost}</span>`
      : withChance
      ? `<span class="pill-count ${favored * 2 >= withChance ? 'good' : 'bad'}" title="Favored to win ${favored} of ${withChance}">${favored}/${withChance} favored</span>`
      : withOpp ? `<span class="pill-count ${winning * 2 >= withOpp ? 'good' : 'bad'}" title="Leading in ${winning} of ${withOpp}">${winning}/${withOpp} up</span>` : '';
    root.querySelectorAll('.match .big[data-to]').forEach(countUp);
    root.querySelectorAll('img.av').forEach((img) => img.addEventListener('error', () => img.replaceWith(Object.assign(document.createElement('span'), { className: img.className + ' blank', textContent: '•' }))));
  }

  // Scores tick up (or down) to their new value instead of jumping.
  function countUp(el) {
    const from = parseFloat(el.dataset.from);
    const to = parseFloat(el.dataset.to);
    if (!Number.isFinite(from) || !Number.isFinite(to) || from === to) return;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / 900);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = score(from + (to - from) * eased);
      if (t < 1 && el.isConnected) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Per league, from your side: + when it helps you (your starter), − when it
  // hurts (your opponent's). Never summed: leagues are separate contests.
  const forMe = (im) => (im.side === 'me' ? im.pts : -im.pts);

  function shownImpacts(ev) {
    return state.league ? ev.impacts.filter((im) => im.leagueId === state.league) : ev.impacts;
  }

  function impactChips(ev) {
    return shownImpacts(ev).map((im) => {
      const v = forMe(im);
      const cls = v > 0 ? 'helps' : v < 0 ? 'hurts' : 'zero';
      return `<span class="impact ${cls}" title="${im.side === 'me' ? 'Your starter' : "Your opponent's starter"} in ${esc(im.leagueName)}">${esc(im.leagueName)} <b>${signed(v, short)}</b></span>`;
    }).join('');
  }

  function moodOf(ev) {
    const vals = shownImpacts(ev).map(forMe).filter((v) => v !== 0);
    if (!vals.length) return 'even';
    if (vals.every((v) => v > 0)) return 'good';
    if (vals.every((v) => v < 0)) return 'bad';
    return 'even';
  }

  // What the play was worth to the player: one number when every league scores
  // it alike, else the range ("+1.8–2.3 pts").
  function playValue(ev) {
    const pts = [...new Set(ev.impacts.map((im) => im.pts))].sort((x, y) => x - y);
    if (pts.length === 1) return `${signed(pts[0])}<small> pts</small>`;
    return `${signed(pts[0])}–${fmt(pts[pts.length - 1])}<small> pts</small>`;
  }

  function matchesFilters(ev) {
    const shown = shownImpacts(ev);
    if (!shown.length) return false;
    if (state.bigOnly && !isBig(ev)) return false;
    if (state.filter === 'all') return true;
    const vals = shown.map(forMe);
    return state.filter === 'good' ? vals.some((v) => v > 0) : vals.some((v) => v < 0);
  }

  function playRow(ev, isNew) {
    const mood = moodOf(ev);
    return `<li class="ev ${mood === 'even' ? '' : mood}${isNew ? ' new' : ''}${isBig(ev) ? ' major' : ''}" style="--tc:${teams.colors(ev.team).primary}">
        <div class="ev-top">
          <span class="ev-who">${face(ev.pid, ev.team)}<span><span class="ev-name">${esc(ev.name)}</span> <span class="muted small">${esc(ev.pos)} · ${esc(ev.team)}</span></span></span>
          <span class="ev-val">${playValue(ev)}</span>
        </div>
        <div class="ev-text">${esc(ev.text || 'stat correction')}</div>
        <div class="impacts">${impactChips(ev)}</div>
      </li>`;
  }

  // Everything that changed while the panel was closed, folded into one card.
  function recapCard(group) {
    const since = group[0].since || group[0].ts; // events saved before 3.0.1 lack it
    const key = `${since}-${group[0].ts}`;
    const rows = group.map((ev) => `
      <div class="recap-row">
        <span class="ev-who">${face(ev.pid, ev.team)}<span><span class="ev-name">${esc(ev.name)}</span> <span class="muted small">${esc(ev.text || 'stat correction')}</span></span></span>
        <div class="impacts">${impactChips(ev)}</div>
      </div>`).join('');
    return `<li class="recap"><details data-recap="${key}"${state.openRecaps.has(key) ? ' open' : ''}>
        <summary>
          <span class="recap-title"><b>${group[0].firstLook ? 'So far today' : 'While you were away'}</b><span class="muted small">${group[0].firstLook ? `up to ${clockOf(group[0].ts)}` : `${clockOf(since)} – ${clockOf(group[0].ts)}`} · ${group.length} player${group.length === 1 ? '' : 's'}</span></span>
        </summary>
        <div class="recap-rows">${rows}</div>
      </details></li>`;
  }

  // Newest first, grouped by update so a busy slate reads in bursts.
  function renderFeed() {
    const list = state.events.filter(matchesFilters);
    $('feed-empty').hidden = list.length > 0;
    $('feed-empty').textContent = state.events.length
      ? 'No plays match these filters.'
      : "New scoring plays by your starters and your opponents' show up here as they happen, with what each did in every league.";
    const first = state.seenEventIds.size === 0;
    const html = [];
    let lastTs = null;
    for (let i = 0; i < list.length; i++) {
      const ev = list[i];
      if (ev.catchUp) {
        const group = [ev];
        while (list[i + 1] && list[i + 1].catchUp && list[i + 1].ts === ev.ts) group.push(list[++i]);
        html.push(recapCard(group));
        lastTs = null;
        continue;
      }
      if (ev.ts !== lastTs) {
        let n = 1;
        while (list[i + n] && !list[i + n].catchUp && list[i + n].ts === ev.ts) n++;
        html.push(`<li class="ev-when"><span>${clockOf(ev.ts)}</span>${n > 1 ? `<span>${n} plays</span>` : ''}</li>`);
        lastTs = ev.ts;
      }
      html.push(playRow(ev, !first && !state.seenEventIds.has(ev.id)));
    }
    $('feed').innerHTML = html.join('');
    $('lv-count-feed').textContent = String(state.events.filter((ev) => !ev.catchUp).length || '');
    for (const ev of state.events) state.seenEventIds.add(ev.id);
  }

  function renderLeagueSelect() {
    const sel = $('lv-league');
    if (!state.ctx) return;
    const leagues = activeLeagues();
    if (state.league && !leagues.some((lg) => lg.leagueId === state.league)) state.league = '';
    sel.innerHTML = '<option value="">All leagues</option>' + leagues.map((lg) =>
      `<option value="${esc(lg.leagueId)}"${lg.leagueId === state.league ? ' selected' : ''}>${esc(lg.name)}</option>`).join('');
  }

  function showView() {
    for (const b of $('lv-tabs').children) b.classList.toggle('on', b.dataset.view === state.view);
    root.querySelectorAll('[data-pane]').forEach((pane) => { pane.hidden = pane.dataset.pane !== state.view; });
    $('lv-big').classList.toggle('on', state.bigOnly);
  }

  function renderLeagueToggles() {
    const box = $('league-toggles');
    if (!state.ctx) { box.innerHTML = ''; return; }
    box.innerHTML = '<p class="small muted">Leagues to track</p>' + state.ctx.leagues.map((lg) =>
      `<label><input type="checkbox" data-id="${lg.leagueId}"${state.settings.excluded.includes(lg.leagueId) ? '' : ' checked'}> ${esc(lg.name)}</label>`
    ).join('');
  }

  function showError(msg) {
    if (!root) return;
    $('error').hidden = !msg;
    $('error').textContent = msg || '';
    // No endless placeholders under an error.
    const skel = msg && $('scoreboard').querySelector('.skel');
    if (skel) skel.remove();
  }

  // ---- wiring -----------------------------------------------------------
  // Username is shared with the draft board (set in the popup); league
  // exclusions are the tracker's own.
  async function saveSettings() {
    await storage.set({ 'live.settings': { excluded: state.settings.excluded, view: state.view, bigOnly: state.bigOnly } });
  }

  async function loadSettings() {
    const shared = await storage.get('settings', {});
    const own = await storage.get('live.settings', {});
    state.settings = { username: (shared.username || '').trim(), excluded: own.excluded || [] };
    if (own.view) state.view = own.view;
    state.bigOnly = !!own.bigOnly;
  }

  // Username changed in the popup: start over for the new account.
  storage.onChanged(async (changes) => {
    if (!changes.settings) return;
    const before = state.settings.username;
    await loadSettings();
    if (state.settings.username === before) return;
    state.ctx = null;
    state.snapshot = null;
    state.events = [];
    await storage.set({ 'live.ctx': null, 'live.snapshot': null, 'live.events': null });
    poll(true);
  });

  // Background tabs throttle timers; catch up as soon as we're visible.
  document.addEventListener('visibilitychange', () => {
    if (root && !document.hidden && Date.now() - state.lastPoll > LIVE_POLL_MS) poll(false);
  });

  async function mount(el) {
    if (root === el) return;
    root = el;
    root.classList.add('tool', 'intro');
    setTimeout(() => el.classList.remove('intro'), 1600);
    root.innerHTML = MARKUP;

    state.seenEventIds = new Set();
    state.prevScores = {};

    $('settings-btn').addEventListener('click', () => { $('settings').hidden = !$('settings').hidden; });
    $('refresh').addEventListener('click', () => poll(true));
    // Double-click the week label to preview the pop-ups.
    $('week-label').addEventListener('dblclick', () => celebrate([
      { pid: '6786', name: 'CeeDee Lamb', pos: 'WR', team: 'DAL', text: '+1 rec · +15 rec yds', net: 2.5,
        impacts: [{ leagueName: 'Your league', side: 'me', pts: 2.5 }] },
      { pid: '4892', name: 'Baker Mayfield', pos: 'QB', team: 'TB', text: '+42 pass yds · +1 pass TD', net: -5.68,
        impacts: [{ leagueName: 'Rival league', side: 'opp', pts: 5.68 }] },
      { pid: 'DAL', name: 'Dallas Cowboys', pos: 'DEF', team: 'DAL', text: '+1 sack', net: 1,
        impacts: [{ leagueName: 'Your league', side: 'me', pts: 1 }] }
    ]));

    $('league-toggles').addEventListener('change', async (e) => {
      const id = e.target.dataset.id;
      if (!id) return;
      const excluded = new Set(state.settings.excluded);
      if (e.target.checked) excluded.delete(id); else excluded.add(id);
      state.settings.excluded = [...excluded];
      await saveSettings();
      // Newly tracked players need a baseline before their plays count.
      if (state.snapshot) state.snapshot.stats = Object.assign(tracker.trimSnapshot(state.stats, activeLeagues()), state.snapshot.stats);
      render();
    });

    $('feed').addEventListener('toggle', (e) => {
      const key = e.target.dataset && e.target.dataset.recap;
      if (!key) return;
      if (e.target.open) state.openRecaps.add(key); else state.openRecaps.delete(key);
    }, true);

    $('lv-tabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-view]');
      if (!b) return;
      state.view = b.dataset.view;
      showView();
      root.querySelector('.tool-scroll').scrollTop = 0;
      saveSettings();
    });

    $('lv-big').addEventListener('click', () => {
      state.bigOnly = !state.bigOnly;
      showView();
      renderFeed();
      saveSettings();
    });

    $('lv-league').addEventListener('change', (e) => {
      state.league = e.target.value;
      renderFeed();
    });

    $('games').addEventListener('toggle', (e) => {
      const id = e.target.dataset && e.target.dataset.game;
      if (id) state.gameOpen.set(id, e.target.open);
    }, true);

    $('filters').addEventListener('click', (e) => {
      const f = e.target.dataset.filter;
      if (!f) return;
      state.filter = f;
      for (const b of $('filters').children) b.classList.toggle('on', b.dataset.filter === f);
      renderFeed();
    });

    await loadSettings();
    if (root !== el) return; // switched away while loading
    state.ctx = await storage.get('live.ctx', null);
    if (state.ctx && state.ctx.username !== state.settings.username) state.ctx = null;
    state.snapshot = await storage.get('live.snapshot', null);
    state.trend = await storage.get('live.trend', { key: null, series: {} });
    const saved = await storage.get('live.events', null);
    if (saved && state.snapshot && saved.key === state.snapshot.key) state.events = saved.list;
    render();
    if (!state.settings.username) showError(NEED_USERNAME);
    poll(false);
  }

  function unmount() {
    clearTimeout(state.timer);
    root = null;
  }

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.live = { mount, unmount };
})(globalThis.NightOwl);
