globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, tracker, scoring, teams, players, storage, account, dom } = NightOwl;
  const { escape: escapeHtml, points: fmt, signed, clock: clockOf, short } = NightOwl.format;
  const { isPlaying, mine, ownerNames, avatars, startingSlots, slotLabel, displayWeek, seasonType: seasonTypeOf } = NightOwl.leagues;
  let root = null;
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
        <button id="settings-btn" class="icon" title="Leagues to track" aria-label="Leagues to track" aria-expanded="false">⚙</button>
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
        <p class="muted small">Points use each league's own scoring. Change your username from the Night Owl toolbar button.</p>
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
        <p id="feed-empty" class="muted small empty">Scoring plays by your starters and opponents show up here live.</p>
      </section>
      <section data-pane="matchups" hidden>
        <div id="scoreboard"><div class="skel" role="status" aria-label="Loading your leagues"><i></i><i></i><i></i></div></div>
      </section>
      <section data-pane="games" hidden>
        <div id="games"></div>
      </section>
    </div>
  `;

  const LIVE_POLL_MS = 15000;
  const IDLE_POLL_MS = 120000;
  const CONTEXT_TTL_MS = 5 * 60000;
  const SCHEDULE_TTL_MS = 60000;
  const MAX_EVENTS = 500;

  const state = {
    openRecaps: new Set(),
    settings: { username: '', excluded: [] },
    ctx: null,
    stats: {},
    proj: {},
    projAt: 0,
    clocks: [],
    clocksAt: 0,
    trend: { key: null, series: {} },
    snapshot: null,
    events: [],
    schedule: { games: [], loadedAt: 0 },
    filter: 'all',
    view: 'feed',
    league: '',
    bigOnly: false,
    gameOpen: new Map(),
    lastPoll: 0,
    timer: null,
    busy: false,
    seenEventIds: new Set()
  };

  const weekKey = (context) => `${context.season}-${context.seasonType}-${context.week}`;
  const activeLeagues = () => (state.ctx ? state.ctx.leagues.filter((league) => !state.settings.excluded.includes(league.leagueId)) : []);

  const loadPlayers = () => players.load();
  const info = (playerId) => players.info(playerId);

  async function loadContext() {
    const { username, userId } = await account.resolve();
    const nfl = await api.state();
    const season = nfl.season;
    const seasonType = seasonTypeOf(nfl);
    const week = displayWeek(nfl);

    const playing = (await api.leagues(userId, season)).filter(isPlaying);
    const leagues = (await Promise.all(playing.map(async (league) => {
      const [rosters, users, matchups] = await Promise.all([
        api.rosters(league.league_id), api.users(league.league_id), api.matchups(league.league_id, week)
      ]);
      const roster = mine(rosters, userId);
      if (!roster) return null;
      const names = ownerNames(users);
      const faces = avatars(users);
      const ownerOf = (rosterId) => (rosters.find((x) => x.roster_id === rosterId) || {}).owner_id;
      const teamName = (rosterId) => names.get(ownerOf(rosterId)) || `Team ${rosterId}`;
      const avatar = (rosterId) => faces.get(ownerOf(rosterId)) || '';
      const matchup = tracker.pickMatchup(matchups || [], roster.roster_id);
      return {
        leagueId: league.league_id,
        name: league.name.trim(),
        scoring: league.scoring_settings || {},
        slots: startingSlots(league),
        myName: teamName(roster.roster_id),
        myAvatar: avatar(roster.roster_id),
        oppName: matchup && matchup.opp ? teamName(matchup.opp.rosterId) : null,
        oppAvatar: matchup && matchup.opp ? avatar(matchup.opp.rosterId) : '',
        matchup
      };
    }))).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));

    state.ctx = { username, userId, season, seasonType, week, leagues, loadedAt: Date.now() };
    await storage.set({ 'live.ctx': state.ctx });
  }

  async function loadSchedule() {
    const context = state.ctx;
    const before = new Map(state.schedule.games.map((g) => [g.game_id, g.status]));
    const games = (await api.schedule(context.season, context.seasonType)).filter((g) => g.week === context.week);
    state.schedule = { games, loadedAt: Date.now() };
    return games.some((g) => g.status === 'in_game' && before.has(g.game_id) && before.get(g.game_id) !== 'in_game');
  }

  const positionsNeeded = () => api.positionsFor(activeLeagues().map((league) => league.slots));

  function trackedTeams() {
    const codes = new Set();
    for (const playerId of tracker.watchList(activeLeagues()).keys()) {
      const t = info(playerId).team;
      if (t) codes.add(t);
    }
    return codes;
  }

  function gameStatus(team) {
    const g = state.schedule.games.find((x) => x.home === team || x.away === team);
    return g ? g.status : null;
  }

  const todayET = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });

  function isLive() {
    const today = todayET();
    const tracked = trackedTeams();
    return state.schedule.games.some((g) => {
      if (!tracked.has(g.home) && !tracked.has(g.away)) return false;
      if (g.status === 'complete' || g.status === 'canceled') return false;
      return g.status !== 'pre_game' || g.date === today;
    });
  }

  const PROJ_TTL_MS = 30 * 60000;
  const CLOCK_TTL_MS = 60000;

  async function loadOutlook(context) {
    const now = Date.now();
    if (now - state.projAt > PROJ_TTL_MS) {
      try {
        const rows = await api.weekProjections(context.season, context.week, context.seasonType, positionsNeeded());
        state.proj = Object.fromEntries(rows.map((r) => [r.player_id, r.stats || {}]));
        state.projAt = now;
      } catch (error) {
        console.warn('[Night Owl] projections unavailable', error);
      }
    }
    if (now - state.clocksAt > CLOCK_TTL_MS) {
      try {
        state.clocks = NightOwl.lineups.parseGames(await api.kickoffs(context.season, context.week, context.seasonType));
      } catch {
        state.clocks = NightOwl.lineups.gamesFromSchedule(state.schedule.games, context.week);
      }
      state.clocksAt = now;
    }
  }

  function remainingFor(team) {
    const g = state.clocks.find((x) => x.home === team || x.away === team);
    return g ? g.remaining : 0;
  }

  function winChance(league) {
    if (!league.matchup || !league.matchup.opp || !Object.keys(state.proj).length) return null;
    const side = (s) => NightOwl.season.outlook(s.starters.map((playerId) => ({
      points: scoring.points(state.stats[playerId], league.scoring),
      proj: scoring.points(state.proj[playerId], league.scoring),
      remaining: remainingFor(info(playerId).team)
    })));
    return NightOwl.season.winProbability(side(league.matchup.mine), side(league.matchup.opp));
  }

  const stillToPlay = (side) => (side ? side.starters.filter((playerId) => remainingFor(info(playerId).team) > 0).length : 0);

  function recordTrend(context) {
    const key = weekKey(context);
    if (state.trend.key !== key) state.trend = { key, series: {} };
    const now = Date.now();
    let changed = false;
    for (const league of activeLeagues()) {
      const chance = winChance(league);
      if (chance == null) continue;
      const series = state.trend.series[league.leagueId] || (state.trend.series[league.leagueId] = []);
      const last = series[series.length - 1];
      if (last && Math.abs(last[1] - chance) < 0.005 && now - last[0] < 15 * 60000) continue;
      series.push([now, Math.round(chance * 1000) / 1000]);
      if (series.length > 400) series.splice(0, series.length - 400);
      changed = true;
    }
    if (changed) storage.set({ 'live.trend': state.trend });
  }

  function trendSvg(series) {
    if (!series || series.length < 2) return '';
    const w = 300;
    const h = 44;
    const t0 = series[0][0];
    const span = Math.max(1, series[series.length - 1][0] - t0);
    const points = series.map(([t, p]) => `${((t - t0) / span * w).toFixed(1)},${((1 - p) * h).toFixed(1)}`).join(' ');
    const end = series[series.length - 1][1];
    return `<div class="trend"><span class="muted small">Win chance today</span>
      <svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="${h / 2}" x2="${w}" y2="${h / 2}" class="mid"/>
        <polyline points="${points}" class="${end >= 0.5 ? 'good' : 'bad'}"/>
      </svg></div>`;
  }

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

      const context = state.ctx;
      const rows = await api.weekStats(context.season, context.week, context.seasonType, positionsNeeded());
      const cur = {};
      for (const r of rows) {
        cur[r.player_id] = r.stats || {};
        if (r.player) players.remember(r.player_id, `${r.player.first_name} ${r.player.last_name}`, r.player.position, r.team);
      }
      state.stats = cur;
      await loadOutlook(context);
      recordTrend(context);

      const leagues = activeLeagues();
      const key = weekKey(context);
      let eventsChanged = false;
      if (state.snapshot && state.snapshot.key === key) {
        const fresh = tracker.diffEvents(state.snapshot.stats, cur, leagues, info, Date.now());
        const gap = Date.now() - state.snapshot.at > 3 * LIVE_POLL_MS;
        for (const event of fresh) if (gap) { event.catchUp = true; event.since = state.snapshot.at; }
        if (fresh.length) { state.events = fresh.concat(state.events).slice(0, MAX_EVENTS); eventsChanged = true; }
        if (!gap) celebrate(fresh);
      } else {
        const fresh = tracker.diffEvents(tracker.trimSnapshot({}, leagues), cur, leagues, info, Date.now());
        for (const event of fresh) { event.catchUp = true; event.firstLook = true; event.since = event.ts; }
        if (fresh.length) state.openRecaps.add(`${fresh[0].since}-${fresh[0].ts}`);
        state.events = fresh;
        eventsChanged = true;
      }
      state.snapshot = { key, at: Date.now(), stats: tracker.trimSnapshot(cur, leagues) };
      state.lastPoll = Date.now();
      await storage.set(eventsChanged
        ? { 'live.snapshot': state.snapshot, 'live.events': { key, list: state.events } }
        : { 'live.snapshot': state.snapshot });
      render();
    } catch (error) {
      console.error('[Night Owl]', error);
      showError(NightOwl.format.errorText(error));
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
    if (root.parentElement) root.parentElement.classList.toggle('hot', !!live);
    state.timer = setTimeout(() => poll(false), live ? LIVE_POLL_MS : IDLE_POLL_MS);
  }

  function render() {
    if (!root) return;
    const context = state.ctx;
    if (context) $('week-label').textContent = `Week ${context.week}${context.seasonType === 'post' ? ' playoffs' : ''}`;
    $('updated').textContent = state.lastPoll ? `updated ${clockOf(state.lastPoll)}` : '';
    renderIdle();
    renderGames();
    renderScoreboard();
    renderLeagueSelect();
    renderFeed();
    renderLeagueToggles();
    showView();
  }

  function lineup(league, side) {
    if (!side) return '<div class="muted small">No opponent this week</div>';
    return side.slots.map((playerId, i) => {
      const slot = slotLabel(league.slots[i]);
      if (!playerId || playerId === '0') return `<div class="slot"><span class="pos">${escapeHtml(slot)}</span><span class="nm muted">empty</span><span></span></div>`;
      const p = info(playerId);
      const playing = gameStatus(p.team) === 'in_game';
      return `<div class="slot${playing ? ' playing' : ''}"><span class="pos ${escapeHtml(slot)}">${escapeHtml(slot)}</span>`
        + `<span class="nm" title="${escapeHtml(p.name)} ${escapeHtml(p.pos)} ${escapeHtml(p.team)}">${escapeHtml(p.name)}</span>`
        + `<span class="pt">${fmt(scoring.points(state.stats[playerId], league.scoring))}</span></div>`;
    }).join('');
  }

  function renderGames() {
    const today = todayET();
    const leagues = activeLeagues();
    const byId = new Map(leagues.map((league) => [league.leagueId, league]));
    const watch = tracker.watchList(leagues);
    const games = state.schedule.games
      .filter((g) => g.status === 'in_game' || (g.status === 'pre_game' && g.date === today))
      .sort((a, b) => Number(b.status === 'in_game') - Number(a.status === 'in_game'));

    const html = games.map((g) => {
      const rows = [...watch].filter(([playerId]) => [g.home, g.away].includes(info(playerId).team)).map(([playerId, spots]) => {
        const p = info(playerId);
        const forMe = spots.filter((s) => s.side === 'me').length - spots.filter((s) => s.side === 'opp').length;
        const chips = spots.map(({ leagueId, side }) => {
          const league = byId.get(leagueId);
          const points = scoring.points(state.stats[playerId], league.scoring);
          return `<span class="impact ${side === 'me' ? 'helps' : 'hurts'}">${escapeHtml(league.name)} · ${side === 'me' ? 'you' : 'opp'} ${fmt(points)}</span>`;
        }).join('');
        return { forMe, mine: spots.some((sp) => sp.side === 'me'), html: `<li class="ev" style="--tc:${teams.colors(p.team).primary}"><div class="ev-top"><span class="ev-who">${face(playerId, p.team)}<span><span class="ev-name">${escapeHtml(p.name)}</span> <span class="muted small">${escapeHtml(p.pos)} · ${escapeHtml(p.team)}</span></span></span></div><div class="impacts">${chips}</div></li>` };
      }).sort((a, b) => b.forMe - a.forMe);
      const status = g.status === 'in_game' ? '<span class="live-tag">LIVE</span>' : '<span class="muted small">later</span>';
      const mine = rows.filter((r) => r.mine).length;
      const id = String(g.game_id);
      const open = state.gameOpen.has(id) ? state.gameOpen.get(id) : g.status === 'in_game';
      return `<details class="game" data-game="${escapeHtml(id)}"${open ? ' open' : ''}>
        <summary class="game-h"><img alt="" src="${teams.logo(g.away)}">${escapeHtml(g.away)} <span class="muted">@</span> <img alt="" src="${teams.logo(g.home)}">${escapeHtml(g.home)} ${status}<span class="game-count">${rows.length} starters · ${mine} yours</span></summary>
        ${rows.length ? `<ol class="game-list">${rows.map((r) => r.html).join('')}</ol>` : '<p class="muted small">None of your matchups have a starter in this game.</p>'}
      </details>`;
    }).join('') || `<p class="muted small empty">${gamesIdleText()}</p>`;
    dom.setHtml($('games'), html);
    $('lv-count-games').textContent = games.filter((g) => g.status === 'in_game').length ? `${games.filter((g) => g.status === 'in_game').length} live` : '';
  }

  function face(playerId, team) {
    return `<img class="face" alt="" src="${teams.photo(playerId, team)}" style="border-color:${teams.colors(team).primary}">`;
  }

  const POP_MS = 2200;
  const POP_GAP_MS = 150;
  const MAX_POPS = 3;
  const BIG_PTS = 4;
  const MIN_POP_PTS = 1;
  const popQueue = [];
  let popping = false;

  function celebrate(events) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ranked = events.filter((event) => isBig(event) || maxImpact(event) >= MIN_POP_PTS).sort((x, y) => (Number(isBig(y)) - Number(isBig(x))) || (maxImpact(y) - maxImpact(x)));
    if (!ranked.length) return;
    popQueue.length = 0;
    popQueue.push(...ranked.slice(0, MAX_POPS));
    if (!popping) nextPop();
  }

  const maxImpact = (event) => Math.max(0, ...event.impacts.map((im) => Math.abs(im.pts)));

  function isBig(event) {
    return /TD|safety|2-pt/.test(event.text) || maxImpact(event) >= BIG_PTS;
  }

  function nextPop() {
    const event = popQueue.shift();
    const layer = root && $('stage');
    if (!event || !layer) {
      popping = false;
      if (layer) layer.classList.remove('busy');
      renderIdle();
      return;
    }
    popping = true;
    layer.classList.add('busy');
    layer.classList.remove('dormant');

    const big = isBig(event);
    const mood = moodOf(event);
    const headline = /TD/.test(event.text) ? 'TOUCHDOWN!' : /safety/.test(event.text) ? 'SAFETY!' : big ? 'BIG PLAY' : '';
    const p = info(event.pid);
    const team = event.team || p.team;
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
      <div class="fig">${figure(event, p, team, c)}</div>
      <div class="copy">
        ${headline ? `<div class="headline">${headline}</div>` : ''}
        <div class="pts">${playValue(event)}</div>
        <div class="who">${escapeHtml(event.name)} <span>${escapeHtml(event.pos)} · ${escapeHtml(team)}</span></div>
        <div class="what">${escapeHtml(event.text)}</div>
        <div class="where">${impactChips(event)}</div>
      </div>`;
    pop.querySelectorAll('img').forEach((img) => img.addEventListener('error', () => img.remove()));
    layer.append(pop);
    layer.classList.remove('glow-good', 'glow-bad');
    void layer.offsetWidth;
    if (mood !== 'even') layer.classList.add(`glow-${mood}`);
    if (big) burst(layer, mood, c);

    setTimeout(() => { pop.remove(); setTimeout(nextPop, POP_GAP_MS); }, POP_MS);
  }

  function gamesIdleText() {
    const games = state.schedule.games;
    if (games.length && games.every((g) => g.status === 'complete' || g.status === 'canceled')) {
      return `Every Week ${state.ctx ? state.ctx.week : ''} game is final. Next week's games show up here at kickoff.`;
    }
    const next = (state.clocks || []).filter((c) => c.kickoff > Date.now()).sort((a, b) => a.kickoff - b.kickoff)[0];
    return next ? `No games on right now. Next kickoff ${NightOwl.format.dayTime(next.kickoff)}.` : 'No games on right now.';
  }

  function renderIdle() {
    if (!root || popping) return;
    const last = state.events.find((event) => !event.catchUp);
    const recap = !last && state.events[0];
    const live = state.schedule.games.find((g) => g.status === 'in_game');
    $('stage').classList.toggle('dormant', !last && !live);
    $('stage-idle').innerHTML = last
      ? `<span class="muted small">Last play · ${clockOf(last.ts)}</span>
         <span class="idle-who"><img alt="" src="${teams.photo(last.pid, last.team)}"><b>${escapeHtml(last.name)}</b></span>
         <span>${escapeHtml(last.text)}</span>
         <span class="impacts idle-impacts">${impactChips(last)}</span>`
      : `<span class="muted">${live ? `${escapeHtml(live.away)} @ ${escapeHtml(live.home)} is live. Waiting for the next play.` : 'Plays pop here the moment they happen'}</span>
         ${recap && !recap.firstLook ? `<span class="muted small">Caught up on everything since ${clockOf(recap.since || recap.ts)}</span>` : ''}`;
  }

  function figure(event, p, team, c) {
    if (event.pos === 'DEF' || teams.isDefenseId(event.pid)) {
      return `<img class="logo" alt="" src="${teams.logo(team)}">`;
    }
    const num = escapeHtml(p.number || event.pos || '');
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
      <img class="head" alt="" src="${teams.headshot(event.pid)}">`;
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

  const pctLabel = (p) => (p > 0.99 && p < 1 ? '>99%' : p < 0.01 && p > 0 ? '<1%' : `${Math.round(p * 100)}%`);

  const score = (n) => (Math.round(n * 100) / 100).toFixed(2);

  const share = (a, b) => (a + b > 0 ? Math.round((a / (a + b)) * 100) : 50);

  function avatarImg(src, name, cls) {
    const initial = escapeHtml((name || '?').trim().charAt(0).toUpperCase());
    return src
      ? `<img class="av ${cls}" alt="" src="${escapeHtml(src)}">`
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

    const html = leagues.map((league) => {
      const s = board.get(league.leagueId);
      if (!s) return `<details class="match" data-id="${escapeHtml(league.leagueId)}"><summary><span class="lname">${escapeHtml(league.name)}</span><span class="muted">no matchup</span></summary></details>`;
      state.prevScores[league.leagueId] = s;
      if (s.margin != null) { withOpp++; if (s.margin > 0) winning++; }
      const before = prev[league.leagueId];
      const moved = before && (before.mine !== s.mine || before.opp !== s.opp);
      const chance = winChance(league);
      const decided = s.opp != null && stillToPlay(league.matchup.mine) === 0 && stillToPlay(league.matchup.opp) === 0 && chance != null;
      if (s.opp != null) {
        if (!decided) final.open++;
        else if (s.margin > 0) final.won++;
        else if (s.margin < 0) final.lost++;
      }
      const mood = chance != null ? (chance >= 0.5 ? 'win' : 'lose') : s.margin > 0 ? 'win' : s.margin < 0 ? 'lose' : 'tie';
      if (chance != null) { withChance++; if (chance >= 0.5) favored++; }
      const pct = s.opp == null ? 100 : chance == null ? share(s.mine, s.opp) : Math.round(chance * 100);
      const odds = decided
        ? `<span class="winpct ${s.margin >= 0 ? 'good' : 'bad'}">${s.margin > 0 ? 'Won by' : s.margin < 0 ? 'Lost by' : 'Tied'}</span>`
        : chance == null ? '' : `<span class="winpct ${chance >= 0.5 ? 'good' : 'bad'}" title="Chance to win, from live points plus projections for the time left">Win ${pctLabel(chance)}</span>`;
      const toPlay = (side) => (chance == null || decided || !side ? '' : ` · ${stillToPlay(side)} to play`);
      return `<details class="match ${mood}${moved ? ' flash' : ''}" data-id="${league.leagueId}"${open.has(league.leagueId) ? ' open' : ''}>
        <summary>
          <div class="m-league"><span class="lname">${escapeHtml(league.name)}</span>${odds}${s.margin == null ? '' : `<span class="margin${chance == null || decided ? ` ${mood}` : ''}">${decided ? score(Math.abs(s.margin)) : signed(s.margin)}</span>`}</div>
          <div class="m-row">
            ${avatarImg(league.myAvatar, league.myName, 'me')}
            <div class="m-side me">
              <span class="tname">${escapeHtml(league.myName)}${toPlay(league.matchup.mine)}</span>
              <span class="big${moved && before.mine !== s.mine ? ' bump' : ''}" data-from="${before ? before.mine : s.mine}" data-to="${s.mine}">${score(s.mine)}</span>
            </div>
            <span class="vs">VS</span>
            <div class="m-side opp">
              <span class="tname">${escapeHtml(league.oppName || 'Bye week')}${toPlay(league.matchup.opp)}</span>
              <span class="big${moved && before.opp !== s.opp ? ' bump' : ''}" data-from="${before ? before.opp : s.opp}" data-to="${s.opp == null ? '' : s.opp}">${s.opp == null ? '' : score(s.opp)}</span>
            </div>
            ${league.oppName ? avatarImg(league.oppAvatar, league.oppName, 'opp') : ''}
          </div>
          ${s.opp == null || decided ? '' : `<span class="wp" role="img" aria-label="${chance == null ? `Your share of points: ${pct}%` : `Win chance: ${pct}%`}" title="${chance == null ? 'Your share of the points so far' : 'Your chance to win'}"><span style="width:${pct}%"></span><i style="left:${pct}%"></i></span>`}
        </summary>
        ${trendSvg(state.trend.series[league.leagueId])}
        <div class="lineups">
          <div><h3>${escapeHtml(league.myName)}</h3>${lineup(league, league.matchup.mine)}</div>
          <div><h3>${escapeHtml(league.oppName || '')}</h3>${lineup(league, league.matchup.opp)}</div>
        </div>
      </details>`;
    }).join('') || '<p class="muted small">No in-season leagues found.</p>';
    const changed = dom.setHtml($('scoreboard'), html);

    $('net-total').innerHTML = withOpp && !final.open
      ? `<span class="pill-count ${final.won >= final.lost ? 'good' : 'bad'}" title="This week's results">${final.won}–${final.lost}</span>`
      : withChance
      ? `<span class="pill-count ${favored * 2 >= withChance ? 'good' : 'bad'}" title="Favored to win ${favored} of ${withChance}">${favored}/${withChance} favored</span>`
      : withOpp ? `<span class="pill-count ${winning * 2 >= withOpp ? 'good' : 'bad'}" title="Leading in ${winning} of ${withOpp}">${winning}/${withOpp} up</span>` : '';
    if (changed) root.querySelectorAll('.match .big[data-to]').forEach(countUp);
  }

  function countUp(element) {
    const from = parseFloat(element.dataset.from);
    const to = parseFloat(element.dataset.to);
    if (!Number.isFinite(from) || !Number.isFinite(to) || from === to) return;
    const start = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - start) / 900);
      const eased = 1 - Math.pow(1 - t, 3);
      element.textContent = score(from + (to - from) * eased);
      if (t < 1 && element.isConnected) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const forMe = (im) => (im.side === 'me' ? im.pts : -im.pts);

  function shownImpacts(event) {
    return state.league ? event.impacts.filter((im) => im.leagueId === state.league) : event.impacts;
  }

  function impactChips(event) {
    return shownImpacts(event).map((im) => {
      const v = forMe(im);
      const cls = v > 0 ? 'helps' : v < 0 ? 'hurts' : 'zero';
      return `<span class="impact ${cls}" title="${im.side === 'me' ? 'Your starter' : "Your opponent's starter"} in ${escapeHtml(im.leagueName)}">${escapeHtml(im.leagueName)} <b>${signed(v, short)}</b></span>`;
    }).join('');
  }

  function moodOf(event) {
    const vals = shownImpacts(event).map(forMe).filter((v) => v !== 0);
    if (!vals.length) return 'even';
    if (vals.every((v) => v > 0)) return 'good';
    if (vals.every((v) => v < 0)) return 'bad';
    return 'even';
  }

  function playValue(event) {
    const points = [...new Set(event.impacts.map((im) => im.pts))].sort((x, y) => x - y);
    if (points.length === 1) return `${signed(points[0])}<small> pts</small>`;
    return `${signed(points[0])}–${fmt(points[points.length - 1])}<small> pts</small>`;
  }

  function matchesFilters(event) {
    const shown = shownImpacts(event);
    if (!shown.length) return false;
    if (state.bigOnly && !isBig(event)) return false;
    if (state.filter === 'all') return true;
    const vals = shown.map(forMe);
    return state.filter === 'good' ? vals.some((v) => v > 0) : vals.some((v) => v < 0);
  }

  function playRow(event, isNew) {
    const mood = moodOf(event);
    return `<li class="ev ${mood === 'even' ? '' : mood}${isNew ? ' new' : ''}${isBig(event) ? ' major' : ''}" style="--tc:${teams.colors(event.team).primary}">
        <div class="ev-top">
          <span class="ev-who">${face(event.pid, event.team)}<span><span class="ev-name">${escapeHtml(event.name)}</span> <span class="muted small">${escapeHtml(event.pos)} · ${escapeHtml(event.team)}</span></span></span>
          <span class="ev-val">${playValue(event)}</span>
        </div>
        <div class="ev-text">${escapeHtml(event.text || 'stat correction')}</div>
        <div class="impacts">${impactChips(event)}</div>
      </li>`;
  }

  function recapCard(group) {
    const since = group[0].since || group[0].ts;
    const key = `${since}-${group[0].ts}`;
    const rows = group.map((event) => `
      <div class="recap-row">
        <span class="ev-who">${face(event.pid, event.team)}<span><span class="ev-name">${escapeHtml(event.name)}</span> <span class="muted small">${escapeHtml(event.text || 'stat correction')}</span></span></span>
        <div class="impacts">${impactChips(event)}</div>
      </div>`).join('');
    return `<li class="recap"><details data-recap="${key}"${state.openRecaps.has(key) ? ' open' : ''}>
        <summary>
          <span class="recap-title"><b>${group[0].firstLook ? 'This week so far' : 'While you were away'}</b><span class="muted small">${group[0].firstLook ? `as of ${clockOf(group[0].ts)}` : `${clockOf(since)} – ${clockOf(group[0].ts)}`} · ${group.length} player${group.length === 1 ? '' : 's'}</span></span>
        </summary>
        <div class="recap-rows">${rows}</div>
      </details></li>`;
  }

  function renderFeed() {
    const list = state.events.filter(matchesFilters);
    $('feed-empty').hidden = list.length > 0;
    $('feed-empty').textContent = state.events.length
      ? 'No plays match these filters.'
      : state.ctx && !state.ctx.leagues.length
        ? 'No in-season leagues right now.'
        : 'Scoring plays by your starters and opponents show up here live.';
    const first = state.seenEventIds.size === 0;
    const html = [];
    let lastTs = null;
    for (let i = 0; i < list.length; i++) {
      const event = list[i];
      if (event.catchUp) {
        const group = [event];
        while (list[i + 1] && list[i + 1].catchUp && list[i + 1].ts === event.ts) group.push(list[++i]);
        html.push(recapCard(group));
        lastTs = null;
        continue;
      }
      if (event.ts !== lastTs) {
        let n = 1;
        while (list[i + n] && !list[i + n].catchUp && list[i + n].ts === event.ts) n++;
        html.push(`<li class="ev-when"><span>${clockOf(event.ts)}</span>${n > 1 ? `<span>${n} plays</span>` : ''}</li>`);
        lastTs = event.ts;
      }
      html.push(playRow(event, !first && !state.seenEventIds.has(event.id)));
    }
    dom.setHtml($('feed'), html.join(''));
    $('lv-count-feed').textContent = String(state.events.filter((event) => !event.catchUp).length || '');
    for (const event of state.events) state.seenEventIds.add(event.id);
  }

  function renderLeagueSelect() {
    const sel = $('lv-league');
    if (!state.ctx) return;
    const leagues = activeLeagues();
    if (state.league && !leagues.some((league) => league.leagueId === state.league)) state.league = '';
    dom.setHtml(sel, '<option value="">All leagues</option>' + leagues.map((league) =>
      `<option value="${escapeHtml(league.leagueId)}"${league.leagueId === state.league ? ' selected' : ''}>${escapeHtml(league.name)}</option>`).join(''));
  }

  function showView() {
    for (const b of $('lv-tabs').children) b.classList.toggle('on', b.dataset.view === state.view);
    root.querySelectorAll('[data-pane]').forEach((pane) => { pane.hidden = pane.dataset.pane !== state.view; });
    $('lv-big').classList.toggle('on', state.bigOnly);
  }

  function renderLeagueToggles() {
    const box = $('league-toggles');
    if (!state.ctx) { dom.setHtml(box, ''); return; }
    dom.setHtml(box, '<p class="lv-set-h">Leagues to track</p>' + state.ctx.leagues.map((league) =>
      `<label><input type="checkbox" data-id="${escapeHtml(league.leagueId)}"${state.settings.excluded.includes(league.leagueId) ? '' : ' checked'}> ${escapeHtml(league.name)}</label>`
    ).join(''));
  }

  function showError(message) {
    if (!root) return;
    $('error').hidden = !message;
    $('error').textContent = message || '';
    const skel = message && $('scoreboard').querySelector('.skel');
    if (skel) skel.remove();
  }

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

  document.addEventListener('visibilitychange', () => {
    if (root && !document.hidden && Date.now() - state.lastPoll > LIVE_POLL_MS) poll(false);
  });

  async function mount(element) {
    if (root === element) return;
    root = element;
    root.classList.add('tool', 'intro');
    setTimeout(() => element.classList.remove('intro'), 1600);
    root.innerHTML = MARKUP;
    root.addEventListener('error', (e) => {
      const img = e.target;
      if (img && img.tagName === 'IMG' && img.classList.contains('av')) {
        img.replaceWith(Object.assign(document.createElement('span'), { className: `${img.className} blank`, textContent: '•' }));
      }
    }, true);

    state.seenEventIds = new Set();
    state.prevScores = {};

    $('settings-btn').addEventListener('click', () => {
      $('settings').hidden = !$('settings').hidden;
      $('settings-btn').setAttribute('aria-expanded', String(!$('settings').hidden));
    });
    $('refresh').addEventListener('click', () => poll(true));
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
    if (root !== element) return;
    state.ctx = await storage.get('live.ctx', null);
    if (state.ctx && state.ctx.username !== state.settings.username) state.ctx = null;
    state.snapshot = await storage.get('live.snapshot', null);
    state.trend = await storage.get('live.trend', { key: null, series: {} });
    const saved = await storage.get('live.events', null);
    if (saved && state.snapshot && saved.key === state.snapshot.key) state.events = saved.list;
    render();
    if (!state.settings.username) showError(account.NEED_USERNAME);
    poll(false);
  }

  function unmount() {
    clearTimeout(state.timer);
    root = null;
  }

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.live = { mount, unmount };
})(globalThis.NightOwl);
