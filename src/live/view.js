globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, tracker, scoring, teams, players, storage, account, dom } = NightOwl;
  const { escape: escapeHtml, points: formatPoints, signed, delta, clock: clockOf, short: shortNumber } = NightOwl.format;
  const { isPlaying, mine, ownerNames, avatars, startingSlots, slotLabel, displayWeek, seasonType: seasonTypeOf } = NightOwl.leagues;
  let root = null;
  const byId = (elementId) => root.querySelector(`#${elementId}`);

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
      <button data-view="lastweek">Last week</button>
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
      <section data-pane="lastweek" hidden>
        <div id="lastweek"></div>
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
    lastWeek: { status: 'idle', review: null, week: null, playsMissing: false },
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
      const ownerOf = (rosterId) => (rosters.find((roster) => roster.roster_id === rosterId) || {}).owner_id;
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
    if (state.view === 'lastweek') ensureLastWeek();
    await storage.set({ 'live.ctx': state.ctx });
  }

  async function loadSchedule() {
    const context = state.ctx;
    const before = new Map(state.schedule.games.map((game) => [game.game_id, game.status]));
    const games = (await api.schedule(context.season, context.seasonType)).filter((game) => game.week === context.week);
    state.schedule = { games, loadedAt: Date.now() };
    return games.some((game) => game.status === 'in_game' && before.has(game.game_id) && before.get(game.game_id) !== 'in_game');
  }

  const positionsNeeded = () => api.positionsFor(activeLeagues().map((league) => league.slots));

  function trackedTeams() {
    const codes = new Set();
    for (const playerId of tracker.watchList(activeLeagues()).keys()) {
      const team = info(playerId).team;
      if (team) codes.add(team);
    }
    return codes;
  }

  function gameStatus(team) {
    const teamGame = state.schedule.games.find((game) => game.home === team || game.away === team);
    return teamGame ? teamGame.status : null;
  }

  const todayET = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });

  function isLive() {
    const today = todayET();
    const tracked = trackedTeams();
    return state.schedule.games.some((game) => {
      if (!tracked.has(game.home) && !tracked.has(game.away)) return false;
      if (game.status === 'complete' || game.status === 'canceled') return false;
      return game.status !== 'pre_game' || game.date === today;
    });
  }

  const PROJ_TTL_MS = 30 * 60000;
  const CLOCK_TTL_MS = 60000;

  async function loadOutlook(context) {
    const now = Date.now();
    if (now - state.projAt > PROJ_TTL_MS) {
      try {
        const rows = await api.weekProjections(context.season, context.week, context.seasonType, positionsNeeded());
        state.proj = Object.fromEntries(rows.map((row) => [row.player_id, row.stats || {}]));
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
    const teamClock = state.clocks.find((clock) => clock.home === team || clock.away === team);
    return teamClock ? teamClock.remaining : 0;
  }

  function winChance(league) {
    if (!league.matchup || !league.matchup.opp || !Object.keys(state.proj).length) return null;
    const side = (lineup) => NightOwl.season.outlook(lineup.starters.map((playerId) => ({
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
      if (last && Math.abs(last[1] - chance) < TREND_MIN_CHANGE && now - last[0] < TREND_REPEAT_MS) continue;
      series.push([now, Math.round(chance * 1000) / 1000]);
      if (series.length > TREND_MAX_POINTS) series.splice(0, series.length - TREND_MAX_POINTS);
      changed = true;
    }
    if (changed) storage.set({ 'live.trend': state.trend });
  }

  function trendSvg(series) {
    if (!series || series.length < 2) return '';
    const width = TREND_WIDTH;
    const height = TREND_HEIGHT;
    const startTime = series[0][0];
    const span = Math.max(1, series[series.length - 1][0] - startTime);
    const points = series.map(([time, chance]) => `${((time - startTime) / span * width).toFixed(1)},${((1 - chance) * height).toFixed(1)}`).join(' ');
    const end = series[series.length - 1][1];
    return `<div class="trend"><span class="muted small">Win chance today</span>
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="${height / 2}" x2="${width}" y2="${height / 2}" class="mid"/>
        <polyline points="${points}" class="${end >= 0.5 ? 'good' : 'bad'}"/>
      </svg></div>`;
  }

  async function pollLiveData(force) {
    if (state.busy || !root || !state.settings.username) return;
    state.busy = true;
    byId('refresh').classList.add('spin');
    try {
      showError(null);
      await loadPlayers();
      if (force || !state.ctx || Date.now() - state.ctx.loadedAt > CONTEXT_TTL_MS) await loadContext();
      if (force || Date.now() - state.schedule.loadedAt > SCHEDULE_TTL_MS) {
        if ((await loadSchedule()) && !force) await loadContext();
      }

      const context = state.ctx;
      const rows = await api.weekStats(context.season, context.week, context.seasonType, positionsNeeded());
      const current = {};
      for (const row of rows) {
        current[row.player_id] = row.stats || {};
        if (row.player) players.remember(row.player_id, `${row.player.first_name} ${row.player.last_name}`, row.player.position, row.team);
      }
      state.stats = current;
      await loadOutlook(context);
      recordTrend(context);

      const leagues = activeLeagues();
      const key = weekKey(context);
      let eventsChanged = false;
      if (state.snapshot && state.snapshot.key === key) {
        const fresh = tracker.diffEvents(state.snapshot.stats, current, leagues, info, Date.now());
        const missedUpdates = Date.now() - state.snapshot.at > 3 * LIVE_POLL_MS;
        for (const event of fresh) if (missedUpdates) { event.catchUp = true; event.since = state.snapshot.at; }
        if (fresh.length) { state.events = fresh.concat(state.events).slice(0, MAX_EVENTS); eventsChanged = true; }
        if (!missedUpdates) celebrate(fresh);
      } else {
        const fresh = tracker.diffEvents(tracker.trimSnapshot({}, leagues), current, leagues, info, Date.now());
        for (const event of fresh) { event.catchUp = true; event.firstLook = true; event.since = event.ts; }
        if (fresh.length) state.openRecaps.add(`${fresh[0].since}-${fresh[0].ts}`);
        state.events = fresh;
        eventsChanged = true;
      }
      state.snapshot = { key, at: Date.now(), stats: tracker.trimSnapshot(current, leagues) };
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
      if (root) byId('refresh').classList.remove('spin');
      schedule();
    }
  }

  function schedule() {
    clearTimeout(state.timer);
    if (!root) return;
    const live = state.ctx && isLive();
    byId('live-dot').classList.toggle('live', !!live);
    if (root.parentElement) root.parentElement.classList.toggle('hot', !!live);
    state.timer = setTimeout(() => pollLiveData(false), live ? LIVE_POLL_MS : IDLE_POLL_MS);
  }

  function render() {
    if (!root) return;
    const context = state.ctx;
    if (context) byId('week-label').textContent = `Week ${context.week}${context.seasonType === 'post' ? ' playoffs' : ''}`;
    byId('updated').textContent = state.lastPoll ? `updated ${clockOf(state.lastPoll)}` : '';
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
      const player = info(playerId);
      const playing = gameStatus(player.team) === 'in_game';
      return `<div class="slot${playing ? ' playing' : ''}"><span class="pos ${escapeHtml(slot)}">${escapeHtml(slot)}</span>`
        + `<span class="nm" title="${escapeHtml(player.name)} ${escapeHtml(player.pos)} ${escapeHtml(player.team)}">${escapeHtml(player.name)}</span>`
        + `<span class="pt">${formatPoints(scoring.points(state.stats[playerId], league.scoring))}</span></div>`;
    }).join('');
  }

  function renderGames() {
    const today = todayET();
    const leagues = activeLeagues();
    const leagueById = new Map(leagues.map((league) => [league.leagueId, league]));
    const watch = tracker.watchList(leagues);
    const games = state.schedule.games
      .filter((game) => game.status === 'in_game' || (game.status === 'pre_game' && game.date === today))
      .sort((a, b) => Number(b.status === 'in_game') - Number(a.status === 'in_game'));

    const html = games.map((game) => {
      const rows = [...watch].filter(([playerId]) => [game.home, game.away].includes(info(playerId).team)).map(([playerId, spots]) => {
        const player = info(playerId);
        const netForMe = spots.filter((spot) => spot.side === 'me').length - spots.filter((spot) => spot.side === 'opp').length;
        const chips = spots.map(({ leagueId, side }) => {
          const league = leagueById.get(leagueId);
          const points = scoring.points(state.stats[playerId], league.scoring);
          return `<span class="impact ${side === 'me' ? 'helps' : 'hurts'}">${escapeHtml(league.name)} · ${side === 'me' ? 'you' : 'opp'} ${formatPoints(points)}</span>`;
        }).join('');
        return { forMe: netForMe, mine: spots.some((spot) => spot.side === 'me'), html: `<li class="ev" style="--tc:${teams.colors(player.team).primary}"><div class="ev-top"><span class="ev-who">${playerAvatar(playerId, player.team)}<span><span class="ev-name">${escapeHtml(player.name)}</span> <span class="muted small">${escapeHtml(player.pos)} · ${escapeHtml(player.team)}</span></span></span></div><div class="impacts">${chips}</div></li>` };
      }).sort((a, b) => b.forMe - a.forMe);
      const status = game.status === 'in_game' ? '<span class="live-tag">LIVE</span>' : '<span class="muted small">later</span>';
      const mine = rows.filter((row) => row.mine).length;
      const gameId = String(game.game_id);
      const open = state.gameOpen.has(gameId) ? state.gameOpen.get(gameId) : game.status === 'in_game';
      return `<details class="game" data-game="${escapeHtml(gameId)}"${open ? ' open' : ''}>
        <summary class="game-h"><img alt="" src="${teams.logo(game.away)}">${escapeHtml(game.away)} <span class="muted">@</span> <img alt="" src="${teams.logo(game.home)}">${escapeHtml(game.home)} ${status}<span class="game-count">${rows.length} starters · ${mine} yours</span></summary>
        ${rows.length ? `<ol class="game-list">${rows.map((row) => row.html).join('')}</ol>` : '<p class="muted small">None of your matchups have a starter in this game.</p>'}
      </details>`;
    }).join('') || `<p class="muted small empty">${gamesIdleText()}</p>`;
    dom.setHtml(byId('games'), html);
    byId('lv-count-games').textContent = games.filter((game) => game.status === 'in_game').length ? `${games.filter((game) => game.status === 'in_game').length} live` : '';
  }

  function playerAvatar(playerId, team) {
    return `<img class="face" alt="" src="${teams.photo(playerId, team)}" style="border-color:${teams.colors(team).primary}">`;
  }

  const POP_MS = 2200;
  const POP_GAP_MS = 150;
  const MAX_POPS = 3;
  const BIG_PTS = 4;
  const TREND_MIN_CHANGE = 0.005;
  const TREND_REPEAT_MS = 15 * 60000;
  const TREND_MAX_POINTS = 400;
  const TREND_WIDTH = 300;
  const TREND_HEIGHT = 44;
  const SPARK_COUNT = 36;
  const SPARK_MIN_DISTANCE = 70;
  const SPARK_EXTRA_DISTANCE = 150;
  const SPARK_LIFETIME_MS = 1600;
  const COUNT_UP_MS = 900;
  const INTRO_MS = 1600;
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

  const maxImpact = (event) => Math.max(0, ...event.impacts.map((impact) => Math.abs(impact.pts)));

  function isBig(event) {
    return /TD|safety|2-pt/.test(event.text) || maxImpact(event) >= BIG_PTS;
  }

  function nextPop() {
    const event = popQueue.shift();
    const layer = root && byId('stage');
    if (!event || !layer) {
      popping = false;
      if (layer) layer.classList.remove('busy');
      renderIdle();
      return;
    }
    popping = true;
    layer.classList.add('busy');
    layer.classList.remove('dormant');

    const isBigPlay = isBig(event);
    const mood = moodOf(event);
    const headline = /TD/.test(event.text) ? 'TOUCHDOWN!' : /safety/.test(event.text) ? 'SAFETY!' : isBigPlay ? 'BIG PLAY' : '';
    const player = info(event.pid);
    const team = event.team || player.team;
    const colors = teams.colors(team);
    const popup = document.createElement('div');
    popup.className = `pop ${mood}${isBigPlay ? ' major' : ''}`;
    popup.style.setProperty('--tp', colors.primary);
    popup.style.setProperty('--ts', colors.secondary);
    popup.style.setProperty('--ink', colors.ink);
    popup.style.setProperty('--ink2', teams.inkOn(colors.secondary));
    popup.innerHTML = `
      <div class="band"></div>
      <img class="mark" alt="" src="${teams.logo(team)}">
      <div class="fig">${renderFigure(event, player, team, colors)}</div>
      <div class="copy">
        ${headline ? `<div class="headline">${headline}</div>` : ''}
        <div class="pts">${playValue(event)}</div>
        <div class="who">${escapeHtml(event.name)} <span>${escapeHtml(event.pos)} · ${escapeHtml(team)}</span></div>
        <div class="what">${escapeHtml(event.text)}</div>
        <div class="where">${impactChips(event)}</div>
      </div>`;
    popup.querySelectorAll('img').forEach((image) => image.addEventListener('error', () => image.remove()));
    layer.append(popup);
    layer.classList.remove('glow-good', 'glow-bad');
    void layer.offsetWidth;
    if (mood !== 'even') layer.classList.add(`glow-${mood}`);
    if (isBigPlay) spawnSparks(layer, mood, colors);

    setTimeout(() => { popup.remove(); setTimeout(nextPop, POP_GAP_MS); }, POP_MS);
  }

  function gamesIdleText() {
    const games = state.schedule.games;
    if (games.length && games.every((game) => game.status === 'complete' || game.status === 'canceled')) {
      return `Every Week ${state.ctx ? state.ctx.week : ''} game is final. Next week's games show up here at kickoff.`;
    }
    const next = (state.clocks || []).filter((clock) => clock.kickoff > Date.now()).sort((a, b) => a.kickoff - b.kickoff)[0];
    return next ? `No games on right now. Next kickoff ${NightOwl.format.dayTime(next.kickoff)}.` : 'No games on right now.';
  }

  function renderIdle() {
    if (!root || popping) return;
    const last = state.events.find((event) => !event.catchUp);
    const recap = !last && state.events[0];
    const live = state.schedule.games.find((game) => game.status === 'in_game');
    byId('stage').classList.toggle('dormant', !last && !live);
    byId('stage-idle').innerHTML = last
      ? `<span class="muted small">Last play · ${clockOf(last.ts)}</span>
         <span class="idle-who"><img alt="" src="${teams.photo(last.pid, last.team)}"><b>${escapeHtml(last.name)}</b></span>
         <span>${escapeHtml(last.text)}</span>
         <span class="impacts idle-impacts">${impactChips(last)}</span>`
      : `<span class="muted">${live ? `${escapeHtml(live.away)} @ ${escapeHtml(live.home)} is live. Waiting for the next play.` : 'Plays pop here the moment they happen'}</span>
         ${recap && !recap.firstLook ? `<span class="muted small">Caught up on everything since ${clockOf(recap.since || recap.ts)}</span>` : ''}`;
  }

  function renderFigure(event, player, team, colors) {
    if (event.pos === 'DEF' || teams.isDefenseId(event.pid)) {
      return `<img class="logo" alt="" src="${teams.logo(team)}">`;
    }
    const jerseyLabel = escapeHtml(player.number || event.pos || '');
    return `
      <svg class="jersey" viewBox="0 0 120 112" aria-hidden="true">
        <path d="M34 8 L50 2 Q60 12 70 2 L86 8 L116 30 L102 54 L90 47 L90 110 L30 110 L30 47 L18 54 L4 30 Z"
              fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="3" stroke-linejoin="round"/>
        <path d="M12 40 L22 46 M108 40 L98 46" stroke="${colors.secondary}" stroke-width="5"/>
        <path d="M14 35 L24 41 M106 35 L96 41" stroke="${colors.ink}" stroke-width="2" opacity=".7"/>
        <text x="60" y="92" text-anchor="middle" font-family="Poppins, Inter, sans-serif" font-weight="800"
              font-size="${jerseyLabel.length > 2 ? 26 : 38}" fill="${colors.ink}" stroke="${colors.secondary}" stroke-width="1.5"
              paint-order="stroke">${jerseyLabel}</text>
      </svg>
      <img class="head" alt="" src="${teams.headshot(event.pid)}">`;
  }

  function spawnSparks(layer, mood, teamColors) {
    const sparkColors = [teamColors.primary, teamColors.secondary, '#ffffff', mood === 'bad' ? '#f75c8d' : '#00ceb8', teamColors.secondary];
    for (let i = 0; i < SPARK_COUNT; i++) {
      const spark = document.createElement('i');
      spark.className = 'spark';
      const angle = (Math.PI * 2 * i) / SPARK_COUNT + Math.random() * 0.3;
      const distance = SPARK_MIN_DISTANCE + Math.random() * SPARK_EXTRA_DISTANCE;
      spark.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
      spark.style.setProperty('--dy', `${Math.sin(angle) * distance * 0.6 + 30}px`);
      spark.style.setProperty('--rot', `${Math.random() * 720 - 360}deg`);
      spark.style.background = sparkColors[i % sparkColors.length];
      spark.style.animationDelay = `${Math.random() * 120}ms`;
      layer.append(spark);
      setTimeout(() => spark.remove(), SPARK_LIFETIME_MS);
    }
  }

  const probabilityLabel = (probability) => (probability > 0.99 && probability < 1 ? '>99%' : probability < 0.01 && probability > 0 ? '<1%' : `${Math.round(probability * 100)}%`);

  const score = (value) => (Math.round(value * 100) / 100).toFixed(2);

  const percentShare = (own, other) => (own + other > 0 ? Math.round((own / (own + other)) * 100) : 50);

  function avatarImg(source, name, className) {
    const initial = escapeHtml((name || '?').trim().charAt(0).toUpperCase());
    return source
      ? `<img class="av ${className}" alt="" src="${escapeHtml(source)}">`
      : `<span class="av ${className} blank">${initial}</span>`;
  }

  function renderScoreboard() {
    const leagues = activeLeagues();
    const board = new Map(tracker.scoreboard(leagues, state.stats).map((entry) => [entry.leagueId, entry]));
    const open = new Set([...root.querySelectorAll('.match[open]')].map((details) => details.dataset.id));
    const previous = state.prevScores || {};
    state.prevScores = {};
    let winning = 0;
    let favored = 0;
    let withChance = 0;
    let withOpp = 0;
    const tally = { won: 0, lost: 0, open: 0 };

    const html = leagues.map((league) => {
      const entry = board.get(league.leagueId);
      if (!entry) return `<details class="match" data-id="${escapeHtml(league.leagueId)}"><summary><span class="lname">${escapeHtml(league.name)}</span><span class="muted">no matchup</span></summary></details>`;
      state.prevScores[league.leagueId] = entry;
      if (entry.margin != null) { withOpp++; if (entry.margin > 0) winning++; }
      const before = previous[league.leagueId];
      const scoreChanged = before && (before.mine !== entry.mine || before.opp !== entry.opp);
      const chance = winChance(league);
      const decided = entry.opp != null && stillToPlay(league.matchup.mine) === 0 && stillToPlay(league.matchup.opp) === 0 && chance != null;
      if (entry.opp != null) {
        if (!decided) tally.open++;
        else if (entry.margin > 0) tally.won++;
        else if (entry.margin < 0) tally.lost++;
      }
      const mood = chance != null ? (chance >= 0.5 ? 'win' : 'lose') : entry.margin > 0 ? 'win' : entry.margin < 0 ? 'lose' : 'tie';
      if (chance != null) { withChance++; if (chance >= 0.5) favored++; }
      const percentText = entry.opp == null ? 100 : chance == null ? percentShare(entry.mine, entry.opp) : Math.round(chance * 100);
      const odds = decided
        ? `<span class="winpct ${entry.margin >= 0 ? 'good' : 'bad'}">${entry.margin > 0 ? 'Won by' : entry.margin < 0 ? 'Lost by' : 'Tied'}</span>`
        : chance == null ? '' : `<span class="winpct ${chance >= 0.5 ? 'good' : 'bad'}" title="Chance to win, from live points plus projections for the time left">Win ${probabilityLabel(chance)}</span>`;
      const toPlay = (side) => (chance == null || decided || !side ? '' : ` · ${stillToPlay(side)} to play`);
      return `<details class="match ${mood}${scoreChanged ? ' flash' : ''}" data-id="${league.leagueId}"${open.has(league.leagueId) ? ' open' : ''}>
        <summary>
          <div class="m-league"><span class="lname">${escapeHtml(league.name)}</span>${odds}${entry.margin == null ? '' : `<span class="margin${chance == null || decided ? ` ${mood}` : ''}">${decided ? score(Math.abs(entry.margin)) : signed(entry.margin)}</span>`}</div>
          <div class="m-row">
            ${avatarImg(league.myAvatar, league.myName, 'me')}
            <div class="m-side me">
              <span class="tname">${escapeHtml(league.myName)}${toPlay(league.matchup.mine)}</span>
              <span class="big${scoreChanged && before.mine !== entry.mine ? ' bump' : ''}" data-from="${before ? before.mine : entry.mine}" data-to="${entry.mine}">${score(entry.mine)}</span>
            </div>
            <span class="vs">VS</span>
            <div class="m-side opp">
              <span class="tname">${escapeHtml(league.oppName || 'Bye week')}${toPlay(league.matchup.opp)}</span>
              <span class="big${scoreChanged && before.opp !== entry.opp ? ' bump' : ''}" data-from="${before ? before.opp : entry.opp}" data-to="${entry.opp == null ? '' : entry.opp}">${entry.opp == null ? '' : score(entry.opp)}</span>
            </div>
            ${league.oppName ? avatarImg(league.oppAvatar, league.oppName, 'opp') : ''}
          </div>
          ${entry.opp == null || decided ? '' : `<span class="wp" role="img" aria-label="${chance == null ? `Your share of points: ${percentText}%` : `Win chance: ${percentText}%`}" title="${chance == null ? 'Your share of the points so far' : 'Your chance to win'}"><span style="width:${percentText}%"></span><i style="left:${percentText}%"></i></span>`}
        </summary>
        ${trendSvg(state.trend.series[league.leagueId])}
        <div class="lineups">
          <div><h3>${escapeHtml(league.myName)}</h3>${lineup(league, league.matchup.mine)}</div>
          <div><h3>${escapeHtml(league.oppName || '')}</h3>${lineup(league, league.matchup.opp)}</div>
        </div>
      </details>`;
    }).join('') || '<p class="muted small">No in-season leagues found.</p>';
    const changed = dom.setHtml(byId('scoreboard'), html);

    byId('net-total').innerHTML = withOpp && !tally.open
      ? `<span class="pill-count ${tally.won >= tally.lost ? 'good' : 'bad'}" title="This week's results">${tally.won}–${tally.lost}</span>`
      : withChance
      ? `<span class="pill-count ${favored * 2 >= withChance ? 'good' : 'bad'}" title="Favored to win ${favored} of ${withChance}">${favored}/${withChance} favored</span>`
      : withOpp ? `<span class="pill-count ${winning * 2 >= withOpp ? 'good' : 'bad'}" title="Leading in ${winning} of ${withOpp}">${winning}/${withOpp} up</span>` : '';
    if (changed) root.querySelectorAll('.match .big[data-to]').forEach(countUp);
  }

  function countUp(element) {
    const startValue = parseFloat(element.dataset.from);
    const target = parseFloat(element.dataset.to);
    if (!Number.isFinite(startValue) || !Number.isFinite(target) || startValue === target) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / COUNT_UP_MS);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = score(startValue + (target - startValue) * eased);
      if (progress < 1 && element.isConnected) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const impactForMe = (impact) => (impact.side === 'me' ? impact.pts : -impact.pts);

  function shownImpacts(event) {
    return state.league ? event.impacts.filter((impact) => impact.leagueId === state.league) : event.impacts;
  }

  function impactChips(event) {
    return shownImpacts(event).map((impact) => {
      const signedPoints = impactForMe(impact);
      const className = signedPoints > 0 ? 'helps' : signedPoints < 0 ? 'hurts' : 'zero';
      return `<span class="impact ${className}" title="${impact.side === 'me' ? 'Your starter' : "Your opponent's starter"} in ${escapeHtml(impact.leagueName)}">${escapeHtml(impact.leagueName)} <b>${signed(signedPoints, shortNumber)}</b></span>`;
    }).join('');
  }

  function moodOf(event) {
    const impactValues = shownImpacts(event).map(impactForMe).filter((value) => value !== 0);
    if (!impactValues.length) return 'even';
    if (impactValues.every((value) => value > 0)) return 'good';
    if (impactValues.every((value) => value < 0)) return 'bad';
    return 'even';
  }

  function playValue(event) {
    const points = [...new Set(event.impacts.map((impact) => impact.pts))].sort((x, y) => x - y);
    if (points.length === 1) return `${signed(points[0])}<small> pts</small>`;
    return `${signed(points[0])}–${formatPoints(points[points.length - 1])}<small> pts</small>`;
  }

  function matchesFilters(event) {
    const shown = shownImpacts(event);
    if (!shown.length) return false;
    if (state.bigOnly && !isBig(event)) return false;
    if (state.filter === 'all') return true;
    const impactValues = shown.map(impactForMe);
    return state.filter === 'good' ? impactValues.some((value) => value > 0) : impactValues.some((value) => value < 0);
  }

  function playRow(event, isNew) {
    const mood = moodOf(event);
    return `<li class="ev ${mood === 'even' ? '' : mood}${isNew ? ' new' : ''}${isBig(event) ? ' major' : ''}" style="--tc:${teams.colors(event.team).primary}">
        <div class="ev-top">
          <span class="ev-who">${playerAvatar(event.pid, event.team)}<span><span class="ev-name">${escapeHtml(event.name)}</span> <span class="muted small">${escapeHtml(event.pos)} · ${escapeHtml(event.team)}</span></span></span>
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
        <span class="ev-who">${playerAvatar(event.pid, event.team)}<span><span class="ev-name">${escapeHtml(event.name)}</span> <span class="muted small">${escapeHtml(event.text || 'stat correction')}</span></span></span>
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
    byId('feed-empty').hidden = list.length > 0;
    byId('feed-empty').textContent = state.events.length
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
        let playsAtTime = 1;
        while (list[i + playsAtTime] && !list[i + playsAtTime].catchUp && list[i + playsAtTime].ts === event.ts) playsAtTime++;
        html.push(`<li class="ev-when"><span>${clockOf(event.ts)}</span>${playsAtTime > 1 ? `<span>${playsAtTime} plays</span>` : ''}</li>`);
        lastTs = event.ts;
      }
      html.push(playRow(event, !first && !state.seenEventIds.has(event.id)));
    }
    dom.setHtml(byId('feed'), html.join(''));
    byId('lv-count-feed').textContent = String(state.events.filter((event) => !event.catchUp).length || '');
    for (const event of state.events) state.seenEventIds.add(event.id);
  }

  function renderLeagueSelect() {
    const leagueSelect = byId('lv-league');
    if (!state.ctx) return;
    const leagues = activeLeagues();
    if (state.league && !leagues.some((league) => league.leagueId === state.league)) state.league = '';
    dom.setHtml(leagueSelect, '<option value="">All leagues</option>' + leagues.map((league) =>
      `<option value="${escapeHtml(league.leagueId)}"${league.leagueId === state.league ? ' selected' : ''}>${escapeHtml(league.name)}</option>`).join(''));
  }

  const lastWeekMessage = (text) => `<p class="muted small empty">${escapeHtml(text)}</p>`;

  function lastWeekHtml() {
    const lastWeek = state.lastWeek;
    if (lastWeek.status === 'loading' || lastWeek.status === 'idle') return '<div class="skel" role="status" aria-label="Loading last week"><i></i><i></i><i></i></div>';
    if (lastWeek.status === 'failed') return lastWeekMessage('Last week could not be loaded right now.');
    if (!lastWeek.week) return lastWeekMessage('No finished week yet.');
    const review = lastWeek.review;
    if (!review.results.length) return lastWeekMessage(`None of your leagues played in week ${lastWeek.week}.`);
    const headshot = (playerId) => `<img class="lw-face" src="${NightOwl.teams.headshot(playerId)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">`;
    const tiles = review.results.map((result) => `<li class="lw-tile ${result.won ? 'up' : result.lost ? 'down' : ''}" title="${escapeHtml(result.leagueName)}: ${result.myPoints.toFixed(1)} to ${result.theirPoints.toFixed(1)}"><span class="lw-tile-name">${escapeHtml(result.leagueName)}</span><b>${delta(result.margin)}</b></li>`).join('');
    const leagueName = new Map(review.results.map((result) => [result.leagueId, result.leagueName]));
    const pill = (name, points, decided, title) => `<span class="lw-chip ${points > 0 ? 'up' : 'down'}${decided ? ' decided' : ''}" title="${escapeHtml(title)}">${decided ? '★ ' : ''}<i>${escapeHtml(name)}</i> ${signed(points)}</span>`;
    const swingOf = (priced) => Math.max(...priced.entries.map((entry) => Math.abs(entry.net)));
    const ranked = review.plays.slice().sort((first, second) => swingOf(second) - swingOf(first)).slice(0, 12);
    const biggest = ranked.length ? swingOf(ranked[0]) : 1;
    const plays = ranked.map((priced) => `<li class="lw-play"><span class="lw-faces">${headshot(priced.participants[0].playerId)}</span><span class="lw-body"><span class="lw-text">${escapeHtml(priced.play.text.split(' (')[0])}</span><span class="lw-bar"><i style="width:${Math.round(100 * swingOf(priced) / biggest)}%"></i></span><span class="lw-chips">${priced.entries.map((entry) => pill(leagueName.get(entry.leagueId), entry.net, entry.flipped, '')).join('')}</span></span></li>`).join('');
    return `<ul class="lw-tiles">${tiles}</ul>${lastWeek.playsMissing ? lastWeekMessage('Plays unavailable right now.') : `${plays ? `<ul class="lw-plays">${plays}</ul>` : ''}`}`;
  }

  function renderLastWeek() {
    if (root) dom.setHtml(byId('lastweek'), lastWeekHtml());
  }

  async function ensureLastWeek() {
    const lastWeek = state.lastWeek;
    if (lastWeek.status !== 'idle' || !state.ctx) return;
    lastWeek.status = 'loading';
    renderLastWeek();
    try {
      const nflState = await api.state();
      const loaded = await NightOwl.liveWeekData.loadLastWeek({ nflState, userId: state.ctx.userId, excludedLeagueIds: state.settings.excluded });
      lastWeek.week = loaded.week;
      lastWeek.playsMissing = !loaded.plays;
      lastWeek.review = loaded.week ? NightOwl.weekReview.reviewWeek({ leagues: loaded.leagues, plays: loaded.plays || [], playerIdOf: loaded.playerIdOf }) : null;
      lastWeek.status = 'ready';
    } catch (error) {
      console.warn('[Night Owl live] last week unavailable', error);
      lastWeek.status = 'failed';
    }
    renderLastWeek();
  }

  function showView() {
    for (const tab of byId('lv-tabs').children) tab.classList.toggle('on', tab.dataset.view === state.view);
    root.querySelectorAll('[data-pane]').forEach((pane) => { pane.hidden = pane.dataset.pane !== state.view; });
    byId('lv-big').classList.toggle('on', state.bigOnly);
  }

  function renderLeagueToggles() {
    const leagueToggles = byId('league-toggles');
    if (!state.ctx) { dom.setHtml(leagueToggles, ''); return; }
    dom.setHtml(leagueToggles, '<p class="lv-set-h">Leagues to track</p>' + state.ctx.leagues.map((league) =>
      `<label><input type="checkbox" data-id="${escapeHtml(league.leagueId)}"${state.settings.excluded.includes(league.leagueId) ? '' : ' checked'}> ${escapeHtml(league.name)}</label>`
    ).join(''));
  }

  function showError(message) {
    if (!root) return;
    byId('error').hidden = !message;
    byId('error').textContent = message || '';
    const placeholder = message && byId('scoreboard').querySelector('.skel');
    if (placeholder) placeholder.remove();
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
    pollLiveData(true);
  });

  document.addEventListener('visibilitychange', () => {
    if (root && !document.hidden && Date.now() - state.lastPoll > LIVE_POLL_MS) pollLiveData(false);
  });

  async function mount(element) {
    if (root === element) return;
    root = element;
    root.classList.add('tool', 'intro');
    setTimeout(() => element.classList.remove('intro'), INTRO_MS);
    root.innerHTML = MARKUP;
    root.addEventListener('error', (event) => {
      const image = event.target;
      if (image && image.tagName === 'IMG' && image.classList.contains('av')) {
        image.replaceWith(Object.assign(document.createElement('span'), { className: `${image.className} blank`, textContent: '•' }));
      }
    }, true);

    state.seenEventIds = new Set();
    state.prevScores = {};

    byId('settings-btn').addEventListener('click', () => {
      byId('settings').hidden = !byId('settings').hidden;
      byId('settings-btn').setAttribute('aria-expanded', String(!byId('settings').hidden));
    });
    byId('refresh').addEventListener('click', () => pollLiveData(true));
    byId('week-label').addEventListener('dblclick', () => celebrate([
      { pid: '6786', name: 'CeeDee Lamb', pos: 'WR', team: 'DAL', text: '+1 rec · +15 rec yds', net: 2.5,
        impacts: [{ leagueName: 'Your league', side: 'me', pts: 2.5 }] },
      { pid: '4892', name: 'Baker Mayfield', pos: 'QB', team: 'TB', text: '+42 pass yds · +1 pass TD', net: -5.68,
        impacts: [{ leagueName: 'Rival league', side: 'opp', pts: 5.68 }] },
      { pid: 'DAL', name: 'Dallas Cowboys', pos: 'DEF', team: 'DAL', text: '+1 sack', net: 1,
        impacts: [{ leagueName: 'Your league', side: 'me', pts: 1 }] }
    ]));

    byId('league-toggles').addEventListener('change', async (event) => {
      const leagueId = event.target.dataset.id;
      if (!leagueId) return;
      const excluded = new Set(state.settings.excluded);
      if (event.target.checked) excluded.delete(leagueId); else excluded.add(leagueId);
      state.settings.excluded = [...excluded];
      await saveSettings();
      if (state.snapshot) state.snapshot.stats = Object.assign(tracker.trimSnapshot(state.stats, activeLeagues()), state.snapshot.stats);
      render();
    });

    byId('feed').addEventListener('toggle', (event) => {
      const key = event.target.dataset && event.target.dataset.recap;
      if (!key) return;
      if (event.target.open) state.openRecaps.add(key); else state.openRecaps.delete(key);
    }, true);

    byId('lv-tabs').addEventListener('click', (event) => {
      const tab = event.target.closest('[data-view]');
      if (!tab) return;
      state.view = tab.dataset.view;
      showView();
      if (state.view === 'lastweek') ensureLastWeek();
      root.querySelector('.tool-scroll').scrollTop = 0;
      saveSettings();
    });

    byId('lv-big').addEventListener('click', () => {
      state.bigOnly = !state.bigOnly;
      showView();
      renderFeed();
      saveSettings();
    });

    byId('lv-league').addEventListener('change', (event) => {
      state.league = event.target.value;
      renderFeed();
    });

    byId('games').addEventListener('toggle', (event) => {
      const gameId = event.target.dataset && event.target.dataset.game;
      if (gameId) state.gameOpen.set(gameId, event.target.open);
    }, true);

    byId('filters').addEventListener('click', (event) => {
      const filter = event.target.dataset.filter;
      if (!filter) return;
      state.filter = filter;
      for (const button of byId('filters').children) button.classList.toggle('on', button.dataset.filter === filter);
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
    pollLiveData(false);
  }

  function unmount() {
    clearTimeout(state.timer);
    root = null;
  }

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.live = { mount, unmount };
})(globalThis.NightOwl);
