// Live tool for the floating panel: loads your leagues and this week's
// matchups, polls Sleeper's live stat lines, and turns every change into a
// feed event showing what it did to each matchup it touches. Runs only while
// mounted — switching the panel to Draft unmounts it and stops polling.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, tracker, scoring, teams, players, storage } = NightOwl;
  const { escape: esc, points: fmt, signed, clock: clockOf } = NightOwl.format;
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
        <button id="refresh" class="icon" title="Refresh now">↻</button>
        <button id="settings-btn" class="icon" title="Leagues to track">⚙</button>
      </div>
    </header>
    <div class="stage" id="stage"><div class="idle" id="stage-idle">Plays pop here the moment they happen</div></div>
    <div class="tool-scroll">
    <section id="settings" class="card" hidden>
      <div id="league-toggles"></div>
      <p class="muted small">Username comes from the extension popup. Points use each league's own scoring settings.</p>
    </section>
    <p id="error" class="error" hidden></p>
    <div id="games"></div>
    <h2>Matchups <span id="net-total"></span></h2>
    <div id="scoreboard"><p class="muted small empty">Loading your leagues…</p></div>
    <div class="feed-head">
      <h2>Live feed</h2>
      <div class="tabs" id="filters">
        <button data-filter="all" class="tab on">All</button>
        <button data-filter="good" class="tab">Helps me</button>
        <button data-filter="bad" class="tab">Hurts me</button>
      </div>
    </div>
    <ol id="feed"></ol>
    <p id="feed-empty" class="muted small empty">Every scoring play by your starters and your opponents' starters lands here, with what it did in each league.</p>
    </div>
  `;

  const NEED_USERNAME = 'Add your Sleeper username in the extension popup (click the toolbar icon) to get started.';
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
    snapshot: null, // { key, stats } last diffed snapshot, persisted
    events: [], // newest first, persisted per week
    schedule: { games: [], loadedAt: 0 },
    filter: 'all',
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
        state.events = [];
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
    $('updated').textContent = state.lastPoll ? new Date(state.lastPoll).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' }) : '';
    renderIdle();
    renderGames();
    renderScoreboard();
    renderFeed();
    renderLeagueToggles();
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
    const games = state.schedule.games.filter((g) => g.status === 'in_game' || (g.status === 'pre_game' && g.date === today));

    $('games').innerHTML = games.map((g) => {
      const rows = [...watch].filter(([pid]) => [g.home, g.away].includes(info(pid).team)).map(([pid, spots]) => {
        const p = info(pid);
        const forMe = spots.filter((s) => s.side === 'me').length - spots.filter((s) => s.side === 'opp').length;
        const chips = spots.map(({ leagueId, side }) => {
          const lg = byId.get(leagueId);
          const pts = scoring.points(state.stats[pid], lg.scoring);
          return `<span class="impact ${side === 'me' ? 'helps' : 'hurts'}">${esc(lg.name)} · ${side === 'me' ? 'you' : 'opp'} ${fmt(pts)}</span>`;
        }).join('');
        return { forMe, html: `<li class="ev" style="--tc:${teams.colors(p.team).primary}"><div class="ev-top"><span class="ev-who">${face(pid, p.team)}<span><span class="ev-name">${esc(p.name)}</span> <span class="muted small">${esc(p.pos)} · ${esc(p.team)}</span></span></span></div><div class="impacts">${chips}</div></li>` };
      }).sort((a, b) => b.forMe - a.forMe);
      const status = g.status === 'in_game' ? '<span class="live-tag">LIVE</span>' : '<span class="muted">today</span>';
      const mine = rows.filter((r) => r.forMe > 0).length;
      return `<h2 class="game-h"><img alt="" src="${teams.logo(g.away)}">${esc(g.away)} <span class="muted">@</span> <img alt="" src="${teams.logo(g.home)}">${esc(g.home)} ${status} <span class="muted">· ${rows.length} starters (${mine} yours)</span></h2>`
        + (rows.length ? `<ol class="game-list">${rows.map((r) => r.html).join('')}</ol>` : '<p class="muted small">None of your matchups have a starter in this game.</p>');
    }).join('');
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
  const POP_GAP_MS = 900;
  const popQueue = [];
  let popping = false;

  function celebrate(events) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    popQueue.push(...events.slice(0, 5));
    if (!popping) nextPop();
  }

  function isBig(ev) {
    return /TD|safety|2-pt/.test(ev.text) || ev.impacts.some((i) => Math.abs(i.pts) >= 6);
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

    const big = isBig(ev);
    const mood = ev.net > 0 ? 'good' : ev.net < 0 ? 'bad' : 'even';
    const headline = /TD/.test(ev.text) ? 'TOUCHDOWN!' : /safety/.test(ev.text) ? 'SAFETY!' : big ? 'BIG PLAY' : '';
    const p = info(ev.pid);
    const team = ev.team || p.team;
    const c = teams.colors(team);
    const pop = document.createElement('div');
    pop.className = `pop ${mood}${big ? ' big' : ''}`;
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
        <div class="pts">${ev.net === 0 ? '±0' : signed(ev.net)}</div>
        <div class="who">${esc(ev.name)} <span>${esc(ev.pos)} · ${esc(team)}</span></div>
        <div class="what">${esc(ev.text)}</div>
        <div class="where">${ev.impacts.map((im) => {
          const forMe = im.side === 'me' ? im.pts : -im.pts;
          return `<span class="impact ${forMe > 0 ? 'helps' : forMe < 0 ? 'hurts' : 'zero'}">${esc(im.leagueName)} ${im.side === 'me' ? 'you' : 'opp'} ${signed(im.pts)}</span>`;
        }).join('')}</div>
      </div>`;
    // No headshot (rookies, some defenders): the jersey carries the figure alone.
    pop.querySelectorAll('img').forEach((img) => img.addEventListener('error', () => img.remove()));
    layer.append(pop);
    layer.classList.remove('glow-good', 'glow-bad');
    void layer.offsetWidth; // restart the glow animation
    if (mood !== 'even') layer.classList.add(`glow-${mood}`);
    if (big) burst(layer, mood, c);

    setTimeout(() => pop.remove(), POP_MS);
    setTimeout(nextPop, popQueue.length ? POP_GAP_MS : POP_MS);
  }

  // Between plays the stage shows the last one, or what it's waiting on.
  function renderIdle() {
    if (!root || popping) return;
    const last = state.events.find((ev) => !ev.catchUp);
    const recap = !last && state.events[0];
    const live = state.schedule.games.find((g) => g.status === 'in_game');
    const lc = last ? teams.colors(last.team) : null;
    $('stage').style.setProperty('--idle-tint', lc ? lc.primary : 'transparent');
    $('stage-idle').innerHTML = last
      ? `<span class="muted small">Last play · ${new Date(last.ts).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</span>
         <span class="idle-who"><img alt="" src="${/^[A-Z]{2,3}$/.test(last.pid) ? teams.logo(last.team) : teams.headshot(last.pid)}"><b>${esc(last.name)}</b></span>
         <span>${esc(last.text)}</span>
         <span class="${last.net > 0 ? 'good' : last.net < 0 ? 'bad' : 'muted'} last-net">${last.net === 0 ? '±0' : signed(last.net)}</span>`
      : `<span class="muted">${live ? `${esc(live.away)} @ ${esc(live.home)} is live — waiting for the next play` : 'Plays pop here the moment they happen'}</span>
         ${recap ? `<span class="muted small">Caught up on everything since ${clockOf(recap.since || recap.ts)}</span>` : ''}`;
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
    let withOpp = 0;

    $('scoreboard').innerHTML = leagues.map((lg) => {
      const s = board.get(lg.leagueId);
      if (!s) return `<div class="match"><summary><span class="lname">${esc(lg.name)}</span><span class="muted">no matchup</span></summary></div>`;
      state.prevScores[lg.leagueId] = s;
      if (s.margin != null) { withOpp++; if (s.margin > 0) winning++; }
      const before = prev[lg.leagueId];
      const moved = before && (before.mine !== s.mine || before.opp !== s.opp);
      const mood = s.margin > 0 ? 'win' : s.margin < 0 ? 'lose' : 'tie';
      const pct = s.opp == null ? 100 : share(s.mine, s.opp);
      return `<details class="match ${mood}${moved ? ' flash' : ''}" data-id="${lg.leagueId}"${open.has(lg.leagueId) ? ' open' : ''}>
        <summary>
          <div class="m-league"><span class="lname">${esc(lg.name)}</span>${s.margin == null ? '' : `<span class="margin ${mood}">${signed(s.margin)}</span>`}</div>
          <div class="m-row">
            ${avatarImg(lg.myAvatar, lg.myName, 'me')}
            <div class="m-side me">
              <span class="tname">${esc(lg.myName)}</span>
              <span class="big${moved && before.mine !== s.mine ? ' bump' : ''}" data-from="${before ? before.mine : s.mine}" data-to="${s.mine}">${fmt(s.mine)}</span>
            </div>
            <span class="vs">VS</span>
            <div class="m-side opp">
              <span class="tname">${esc(lg.oppName || 'Bye week')}</span>
              <span class="big${moved && before.opp !== s.opp ? ' bump' : ''}" data-from="${before ? before.opp : s.opp}" data-to="${s.opp == null ? '' : s.opp}">${fmt(s.opp)}</span>
            </div>
            ${lg.oppName ? avatarImg(lg.oppAvatar, lg.oppName, 'opp') : ''}
          </div>
          ${s.opp == null ? '' : `<span class="wp"><span style="width:${pct}%"></span><i style="left:${pct}%"></i></span>`}
        </summary>
        <div class="lineups">
          <div><h3>${esc(lg.myName)}</h3>${lineup(lg, lg.matchup.mine)}</div>
          <div><h3>${esc(lg.oppName || '')}</h3>${lineup(lg, lg.matchup.opp)}</div>
        </div>
      </details>`;
    }).join('') || '<p class="muted small">No in-season leagues found.</p>';

    $('net-total').innerHTML = withOpp ? `<span class="pill-count ${winning * 2 >= withOpp ? 'good' : 'bad'}">leading ${winning}/${withOpp}</span>` : '';
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
      el.textContent = fmt(Math.round((from + (to - from) * eased) * 100) / 100);
      if (t < 1 && el.isConnected) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function impactChips(ev) {
    return ev.impacts.map((im) => {
      const forMe = im.side === 'me' ? im.pts : -im.pts;
      const cls = forMe > 0 ? 'helps' : forMe < 0 ? 'hurts' : 'zero';
      const who = im.side === 'me' ? 'you' : 'opp';
      return `<span class="impact ${cls}" title="${who === 'you' ? 'Your starter' : "Opponent's starter"}">${esc(im.leagueName)} · ${who} ${signed(im.pts)}</span>`;
    }).join('');
  }

  const netClass = (net) => (net > 0 ? 'good' : net < 0 ? 'bad' : '');

  function playCard(ev, isNew) {
    const cls = netClass(ev.net);
    return `<li class="ev ${cls}${isNew ? ' new' : ''}" style="--tc:${teams.colors(ev.team).primary}">
        <div class="ev-top">
          <span class="ev-who">${face(ev.pid, ev.team)}<span><span class="ev-name">${esc(ev.name)}</span> <span class="muted small">${esc(ev.pos)} · ${esc(ev.team)}</span></span></span>
          <span class="ev-net ${cls}" title="Net for you across all leagues">${signed(ev.net)}</span>
        </div>
        <div class="ev-text">${esc(ev.text || 'stat correction')}</div>
        <div class="impacts">${impactChips(ev)}</div>
        <div class="ev-time">${clockOf(ev.ts)}</div>
      </li>`;
  }

  // Everything that changed while the panel was closed, folded into one card.
  function recapCard(group) {
    const net = Math.round(group.reduce((sum, ev) => sum + ev.net, 0) * 100) / 100;
    const cls = netClass(net);
    const since = group[0].since || group[0].ts; // events saved before 3.0.1 lack it
    const key = `${since}-${group[0].ts}`;
    const rows = group.map((ev) => `
      <div class="recap-row">
        <span class="ev-who">${face(ev.pid, ev.team)}<span><span class="ev-name">${esc(ev.name)}</span> <span class="muted small">${esc(ev.text || 'stat correction')}</span></span></span>
        <span class="recap-net ${netClass(ev.net)}">${signed(ev.net)}</span>
        <div class="impacts">${impactChips(ev)}</div>
      </div>`).join('');
    return `<li class="recap"><details data-recap="${key}"${state.openRecaps.has(key) ? ' open' : ''}>
        <summary>
          <span class="recap-title"><b>While you were away</b><span class="muted small">${clockOf(since)} – ${clockOf(group[0].ts)} · ${group.length} player${group.length === 1 ? '' : 's'}</span></span>
          <span class="ev-net ${cls}" title="Net for you across all leagues">${signed(net)}</span>
        </summary>
        ${rows}
      </details></li>`;
  }

  function renderFeed() {
    const list = state.events.filter((ev) =>
      state.filter === 'all' || (state.filter === 'good' ? ev.net > 0 : ev.net < 0));
    $('feed-empty').hidden = list.length > 0;
    const first = state.seenEventIds.size === 0;
    const html = [];
    for (let i = 0; i < list.length; i++) {
      const ev = list[i];
      if (!ev.catchUp) {
        html.push(playCard(ev, !first && !state.seenEventIds.has(ev.id)));
        continue;
      }
      const group = [ev];
      while (list[i + 1] && list[i + 1].catchUp && list[i + 1].ts === ev.ts) group.push(list[++i]);
      html.push(recapCard(group));
    }
    $('feed').innerHTML = html.join('');
    for (const ev of state.events) state.seenEventIds.add(ev.id);
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
  }

  // ---- wiring -----------------------------------------------------------
  // Username is shared with the draft board (set in the popup); league
  // exclusions are the tracker's own.
  async function saveSettings() {
    await storage.set({ 'live.settings': { excluded: state.settings.excluded } });
  }

  async function loadSettings() {
    const shared = await storage.get('settings', {});
    const own = await storage.get('live.settings', {});
    state.settings = { username: (shared.username || '').trim(), excluded: own.excluded || [] };
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
