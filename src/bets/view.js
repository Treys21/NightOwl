globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, teams, players, storage, account, dom } = NightOwl;
  const { escape: escapeHtml, short: shortNumber, percent: percentText, dayTime: timeOf, dayTimeShort, windowTitle } = NightOwl.format;
  const { isPlaying, mine: rosterOf, displayWeek, seasonType: seasonTypeOf } = NightOwl.leagues;
  const core = NightOwl.bets;
  const windowsOf = (games) => NightOwl.lineups.windows(games);
  let root = null;
  const byId = (elementId) => root.querySelector(`#${elementId}`);

  const REFRESH_MS = 5 * 60000;
  const LIVE_MS = 20000;
  const PROPS_TTL_MS = 15 * 60000;
  const DEF_TTL_MS = 6 * 3600000;
  const INTRO_MS = 1600;
  const PREVIEW_MS = 10000;
  const MIN_BAR_PERCENT = 6;
  const GOOD_DEFENSE_RANK = 8;
  const BAD_DEFENSE_RANK = 25;
  const MINE_WEIGHT = 10;

  const state = {
    showOpp: false,
    ui: { q: '', pos: 'ALL', win: 'all', sort: 'kickoff' },
    open: new Set(),
    justOpened: new Set(),
    rendered: new Map(),
    renderedKeys: '',
    nfl: null,
    people: new Map(),
    games: [],
    lines: {},
    linesKey: '',
    ladders: {},
    propsAt: new Map(),
    ranks: {},
    ranksAt: 0,
    proj: {},
    live: {},
    hits: new Set(),
    previewing: false,
    fresh: new Set(),
    loadedAt: 0,
    timers: [],
    liveTimer: null,
    busy: false,
    error: null
  };


  const MARKUP = `
    <header class="bar">
      <div class="title"><strong id="bt-week">Bets</strong></div>
      <div class="actions">
        <div class="tabs" id="bt-who">
          <button data-who="mine" class="tab on">Mine</button>
          <button data-who="all" class="tab">+ Opponents</button>
        </div>
        <button id="bt-refresh" class="icon" title="Refresh now" aria-label="Refresh now">↻</button>
      </div>
    </header>
    <div class="tool-scroll">
      <div class="bt-toolbar">
        <div class="bt-tool-row">
          <input id="bt-q" type="search" placeholder="Search player or team…" autocomplete="off" spellcheck="false">
          <select id="bt-win" title="Games"></select>
          <select id="bt-sort" title="Sort">
            <option value="kickoff">Kickoff</option>
            <option value="td">TD odds</option>
            <option value="hit">Hit rate</option>
            <option value="lean">Proj vs line</option>
            <option value="exposure">My leagues</option>
          </select>
        </div>
        <div class="bt-tool-row chips" id="bt-pos">
          <button class="chip" data-pos="ALL">All</button><button class="chip" data-pos="QB">QB</button><button class="chip" data-pos="RB">RB</button><button class="chip" data-pos="WR">WR</button><button class="chip" data-pos="TE">TE</button><button class="chip" data-pos="K">K</button>
          <button class="chip ghost" id="bt-toggle-all">Expand all</button>
        </div>
      </div>
      <p id="bt-error" class="error" hidden></p>
      <div id="bt-body"><div class="skel" role="status" aria-label="Loading lines for your starters"><i></i><i></i><i></i></div></div>
      <p class="bt-legal">Lines: Sleeper Picks payouts and DraftKings (via ESPN). For information only, not betting advice. 21+, gamble responsibly · 1-800-GAMBLER.</p>
    </div>
  `;

  async function loadPeople(userId, season, week) {
    const playing = (await api.leagues(userId, season)).filter(isPlaying);
    state.leagueCount = playing.length;
    const people = new Map();
    const addPerson = (playerId, leagueName, side) => {
      if (!playerId || playerId === '0') return;
      if (!people.has(playerId)) people.set(playerId, []);
      people.get(playerId).push({ leagueName, side });
    };
    await Promise.all(playing.map(async (league) => {
      const [rosters, matchups] = await Promise.all([api.rosters(league.league_id), api.matchups(league.league_id, week)]);
      const own = rosterOf(rosters, userId);
      if (!own) return;
      const pair = NightOwl.tracker.pickMatchup(matchups || [], own.roster_id);
      if (!pair) return;
      const name = league.name.trim();
      pair.mine.starters.forEach((playerId) => addPerson(playerId, name, 'me'));
      if (pair.opp) pair.opp.starters.forEach((playerId) => addPerson(playerId, name, 'opp'));
    }));
    state.people = people;
  }

  async function loadProps(force) {
    const teamsWithPlayers = new Set([...state.people.keys()].map((playerId) => players.info(playerId).team));
    const games = state.games.filter((game) => game.state !== 'post' && game.id && (teamsWithPlayers.has(game.home) || teamsWithPlayers.has(game.away)));
    for (const game of games) {
      if (!force && Date.now() - (state.propsAt.get(game.id) || 0) < PROPS_TTL_MS) continue;
      try {
        const ladders = core.parseMilestones(await api.propBets(game.id));
        for (const [espnId, list] of Object.entries(ladders)) {
          const playerId = players.byEspn(espnId);
          if (playerId) state.ladders[playerId] = list;
        }
        state.propsAt.set(game.id, Date.now());
      } catch (error) {
        console.warn('[Night Owl bets] props unavailable for', game.id, error.message || error);
        state.propsAt.set(game.id, Date.now());
      }
    }
  }

  async function load(force) {
    const { userId } = await account.resolve();
    const saved = await storage.get('bets.settings', {});
    state.showOpp = !!saved.showOpp;
    if (saved.pos) state.ui.pos = saved.pos;
    if (saved.sort) state.ui.sort = saved.sort;

    await players.load();
    state.nfl = await api.state();
    const season = state.nfl.season;
    const week = displayWeek(state.nfl);
    const seasonType = seasonTypeOf(state.nfl);

    await loadPeople(userId, season, week);

    try {
      state.games = NightOwl.lineups.parseGames(await api.kickoffs(season, week, seasonType));
    } catch (error) {
      console.warn('[Night Owl bets] ESPN games unavailable, using Sleeper dates', error);
      state.games = NightOwl.lineups.gamesFromSchedule(await api.schedule(season, seasonType), week);
    }

    const key = `${season}-${seasonType}-${week}`;
    const stored = await storage.get('bets.lines', null);
    const previous = stored && stored.key === key ? stored.lines : {};
    let fresh = {};
    try { fresh = core.parseLines(await api.lines()); } catch (error) { console.warn('[Night Owl bets] Sleeper lines unavailable', error); }
    state.lines = core.mergeLines(previous, fresh);
    state.linesKey = key;
    await storage.set({ 'bets.lines': { key, lines: state.lines } });

    if (force || Date.now() - state.ranksAt > DEF_TTL_MS) {
      try {
        state.ranks = core.defenseRanks(await api.defenseSeason(season, seasonType));
        state.ranksAt = Date.now();
      } catch (error) { console.warn('[Night Owl bets] defense stats unavailable', error); }
    }

    try {
      const rows = await api.weekProjections(season, week, seasonType);
      state.proj = {};
      for (const row of rows) state.proj[row.player_id] = row.stats || {};
    } catch (error) { console.warn('[Night Owl bets] projections unavailable', error); }

    await loadProps(force);
    await loadLive();
    state.loadedAt = Date.now();
  }

  async function loadLive() {
    if (!state.nfl || !state.games.some((game) => game.state !== 'pre')) return;
    const rows = await api.weekStats(state.nfl.season, displayWeek(state.nfl), seasonTypeOf(state.nfl));
    const live = {};
    for (const row of rows) live[row.player_id] = row.stats || {};
    state.fresh = new Set();
    for (const [playerId, markets] of Object.entries(state.lines)) {
      if (!state.people.has(playerId)) continue;
      for (const market of markets) {
        const progress = core.progress(market, live[playerId]);
        const marketKey = `${playerId}:${market.type}`;
        if (progress && progress.hit && !state.hits.has(marketKey)) {
          if (state.loadedAt) state.fresh.add(marketKey);
          state.hits.add(marketKey);
        }
      }
    }
    state.live = live;
  }

  async function refresh(force) {
    if (!root || state.busy) return;
    state.busy = true;
    byId('bt-refresh').classList.add('spin');
    try {
      await load(force);
      state.error = null;
    } catch (error) {
      console.error('[Night Owl bets]', error);
      state.error = NightOwl.format.errorText(error);
    } finally {
      state.busy = false;
      if (root) byId('bt-refresh').classList.remove('spin');
      render();
      scheduleLive();
    }
  }

  function scheduleLive() {
    clearTimeout(state.liveTimer);
    if (!root || !state.games.some((game) => game.state === 'in')) return;
    state.liveTimer = setTimeout(async () => {
      try { await loadLive(); render(); } catch (error) { console.warn('[Night Owl bets] live stats', error); }
      scheduleLive();
    }, LIVE_MS);
  }

  function playerAvatar(playerId, team) {
    return `<img class="face" alt="" src="${teams.photo(playerId, team)}" style="border-color:${teams.colors(team).primary}">`;
  }

  function sparkline(recent, line) {
    const values = recent.map((game) => game.value).filter((value) => value != null);
    if (!values.length) return '';
    const top = Math.max(line * 1.4, ...values, 1);
    const bars = recent.map((game) => {
      const heightPercent = Math.max(MIN_BAR_PERCENT, Math.round((game.value / top) * 100));
      return `<i class="${game.value > line ? 'over' : ''}" style="height:${heightPercent}%" title="${escapeHtml(game.opponent || '')} ${escapeHtml(game.date || '')}: ${shortNumber(game.value)}"></i>`;
    }).join('');
    return `<span class="bt-spark">${bars}<b style="bottom:${Math.round((line / top) * 100)}%"></b></span>`;
  }

  function marketRow(playerId, market, inPlay) {
    const rate = core.hitRate(market.recent, market.line);
    const projected = core.statValue(state.proj[playerId], market.keys);
    const live = inPlay ? core.progress(market, state.live[playerId]) : null;
    const marketKey = `${playerId}:${market.type}`;
    const lean = projected != null && !market.td && !market.max ? Math.round((projected - market.line) * 10) / 10 : null;
    const recentTitle = market.recent.map((game) => `${game.opponent || ''} ${shortNumber(game.value)}`).join(' · ');
    return `<div class="bt-tr${live && live.hit ? ' hit' : ''}${state.fresh.has(marketKey) ? ' just-hit' : ''}">
      <span class="bt-td-lbl">${escapeHtml(market.label)}</span>
      <span class="bt-td-line">${shortNumber(market.line)}</span>
      <span class="bt-td-odds" title="Over pays ${market.over || '–'}×">${market.over ? core.american(market.over) : '–'}</span>
      <span class="bt-td-odds" title="Under pays ${market.under || '–'}×">${market.under ? core.american(market.under) : '–'}</span>
      <span class="bt-td-l10${rate && rate.over * 2 > rate.games ? ' good' : ''}" title="Last ${market.recent.length}: ${escapeHtml(recentTitle)}">${sparkline(market.recent, market.line)}${rate ? `${rate.over}/${rate.games}` : '–'}</span>
      <span class="bt-td-proj ${lean > 0 ? 'up' : lean < 0 ? 'down' : ''}" title="${projected != null ? `Sleeper projects ${shortNumber(projected)}` : 'No projection for this stat'}">${lean != null ? `${lean > 0 ? '+' : ''}${shortNumber(lean)}` : '–'}</span>
      ${live ? `<span class="bt-tr-live${live.hit ? ' hit' : ''}"><i style="width:${Math.round(live.pct * 100)}%"></i><em>${live.hit ? '✓ ' : ''}${shortNumber(live.value)} / ${shortNumber(live.line)}</em></span>` : ''}
    </div>`;
  }

  function ladderRow(playerId, ladder, inPlay) {
    const market = (state.lines[playerId] || []).find((candidate) => candidate.keys.join() === ladder.keys.join() && !candidate.max);
    const values = market ? market.recent.map((game) => game.value).filter((value) => value != null) : [];
    const liveValue = inPlay ? (core.statValue(state.live[playerId], ladder.keys) ?? 0) : null;
    const rungs = core.trimRungs(ladder.rungs, market ? market.line : null).map((rung) => {
      const rate = values.length ? values.filter((value) => value >= rung).length / values.length : null;
      const reached = liveValue != null && liveValue >= rung;
      return `<span class="bt-rung${reached ? ' reached' : ''}" title="${rate != null ? `${rung}+ in ${Math.round(rate * values.length)} of last ${values.length}` : `${rung}+`}">
        ${rung}+${rate != null ? `<small>${percentText(rate)}</small>` : ''}</span>`;
    }).join('');
    return `<div class="bt-ladder"><span class="bt-ladder-lbl">${escapeHtml(ladder.label)}</span><div class="bt-rungs">${rungs}</div></div>`;
  }

  function context(player, game) {
    if (!game) return '';
    const opponent = game.home === player.team ? game.away : game.home;
    const separator = game.home === player.team ? 'vs' : '@';
    const rank = state.ranks[opponent] && state.ranks[opponent][player.pos === 'DEF' ? 'QB' : player.pos];
    const impliedTotals = core.impliedTotals(game);
    const parts = [`<span class="bt-opp"><img alt="" src="${teams.logo(opponent)}">${separator} ${escapeHtml(opponent)}</span>`];
    if (rank && player.pos !== 'DEF') {
      const tone = rank.rank <= GOOD_DEFENSE_RANK ? 'good' : rank.rank >= BAD_DEFENSE_RANK ? 'bad' : '';
      parts.push(`<span class="bt-rank ${tone}" title="${escapeHtml(opponent)} allows ${rank.perGame} fantasy pts/game to ${escapeHtml(player.pos)}s">${core.ordinal(rank.rank)} most to ${escapeHtml(player.pos)}s</span>`);
    }
    if (impliedTotals && impliedTotals.teams[player.team] != null) parts.push(`<span class="bt-chip">Team total <b>${shortNumber(impliedTotals.teams[player.team])}</b></span>`);
    if (impliedTotals) parts.push(`<span class="bt-chip">O/U <b>${shortNumber(impliedTotals.total)}</b>${impliedTotals.favorite ? ` · ${escapeHtml(impliedTotals.favorite)} −${shortNumber(impliedTotals.spread)}` : ''}</span>`);
    return `<div class="bt-ctx">${parts.join('')}</div>`;
  }

  function detail(playerId, spots, game, inPlay) {
    const player = players.info(playerId);
    const markets = state.lines[playerId] || [];
    const ladders = state.ladders[playerId] || [];
    const others = markets.filter((market) => !market.td);
    const touchdownMarket = markets.find((market) => market.td && market.type === 'anytime_touchdowns');
    const touchdownHitRate = touchdownMarket ? core.hitRate(touchdownMarket.recent, core.ANYTIME_TOUCHDOWN_LINE) : null;
    const spotChips = spots.map((spot) => `<span class="impact ${spot.side === 'me' ? 'helps' : 'hurts'}">${escapeHtml(spot.leagueName)} · ${spot.side === 'me' ? 'you' : 'opp'}</span>`).join('');
    return `<div class="bt-detail">
      <div class="impacts">${spotChips}</div>
      ${touchdownMarket && touchdownMarket.over ? `<div class="bt-tdline">Anytime TD <b class="am">${core.american(touchdownMarket.over)}</b>${touchdownHitRate ? ` · scored in ${touchdownHitRate.over} of last ${touchdownHitRate.games}` : ''}${touchdownMarket.under ? ` · No <b class="am">${core.american(touchdownMarket.under)}</b>` : ''}</div>` : ''}
      ${context(player, game)}
      ${others.length ? `<div class="bt-table">
        <div class="bt-tr bt-th"><span>Line</span><span></span><span>Over</span><span>Under</span><span>Last 10</span><span>Proj</span></div>
        ${others.map((other) => marketRow(playerId, other, inPlay)).join('')}
      </div>` : '<p class="muted small">No player lines posted yet.</p>'}
      ${ladders.length ? `<div class="bt-ladders"><span class="bt-sub">DraftKings milestones · hit rate last 10</span>${ladders.map((ladder) => ladderRow(playerId, ladder, inPlay)).join('')}</div>` : ''}
    </div>`;
  }

  function item(playerId, spots, game, showWindow) {
    const player = players.info(playerId);
    const markets = state.lines[playerId] || [];
    const touchdownMarket = markets.find((market) => market.type === 'anytime_touchdowns');
    const key = core.keyMarket(markets, player.pos);
    const inPlay = state.previewing || !!(game && game.state !== 'pre');
    const liveTd = touchdownMarket && inPlay ? core.progress(touchdownMarket, state.live[playerId]) : null;
    const keyLive = key && inPlay ? core.progress(key, state.live[playerId]) : null;
    const keyHitRate = key ? core.hitRate(key.recent, key.line) : null;
    const keyProj = key ? core.statValue(state.proj[playerId], key.keys) : null;
    const keyLean = key && keyProj != null && !key.max ? keyProj - key.line : null;
    const hits = inPlay ? markets.filter((market) => { const progress = core.progress(market, state.live[playerId]); return progress && progress.hit; }).length : 0;
    const mine = spots.filter((spot) => spot.side === 'me').length;
    const theirs = spots.length - mine;
    const open = state.open.has(playerId);
    const keyHtml = key
      ? `<span class="bt-key">${keyLive
        ? `<span class="bt-key-live${keyLive.hit ? ' hit' : ''}">${keyLive.hit ? '✓ ' : ''}${shortNumber(keyLive.value)}</span> <span class="bt-key-lbl">of ${shortNumber(key.line)} ${escapeHtml(key.label)}</span>`
        : `<span class="bt-key-lbl">${escapeHtml(key.label)}</span> <b>${shortNumber(key.line)}</b>${keyHitRate ? ` <span class="bt-key-hr${keyHitRate.over * 2 > keyHitRate.games ? ' good' : ''}">${keyHitRate.over}/${keyHitRate.games}</span>` : ''}${keyLean != null && Math.abs(keyLean) >= 0.5 ? ` <span class="bt-key-lean ${keyLean > 0 ? 'up' : 'down'}">${keyLean > 0 ? '▲' : '▼'}</span>` : ''}`}</span>`
      : `<span class="muted small">${inPlay ? escapeHtml(core.liveLine(player.pos, state.live[playerId]) || 'No line for this game') : 'No lines yet'}</span>`;
    const justCashed = markets.some((market) => state.fresh.has(`${playerId}:${market.type}`));
    return `<details class="bt-item${mine ? ' mine' : ' theirs'}${state.showOpp ? ' mixed' : ''}${justCashed ? ' cashing' : ''}${!key && !inPlay ? ' nolines' : ''}${state.justOpened.has(playerId) ? ' opening' : ''}" data-key="p:${escapeHtml(playerId)}" data-pid="${escapeHtml(playerId)}" style="--tc:${teams.colors(player.team).primary}"${open ? ' open' : ''}>
      <summary>
        ${playerAvatar(playerId, player.team)}
        <span class="bt-sum">
          <span class="bt-sum-top"><span class="ev-name">${escapeHtml(player.name)}</span><span class="muted small">${escapeHtml(player.pos)} · ${escapeHtml(player.team)}${showWindow && game ? ` · ${escapeHtml(timeOf(game.kickoff))}` : ''}</span></span>
          <span class="bt-sum-bot">${keyHtml}
            ${mine > 1 ? `<span class="bt-exp you" title="Starting in ${mine} of your leagues">${mine} leagues</span>` : ''}${theirs && (state.showOpp || !mine) ? `<span class="bt-exp opp" title="Starting for ${theirs} opponent${theirs > 1 ? 's' : ''}">opp ×${theirs}</span>` : ''}
            ${hits ? `<span class="bt-exp hit">✓ ${hits} hit</span>` : ''}</span>
        </span>
        ${touchdownMarket && touchdownMarket.over ? `<span class="bt-atd${liveTd && liveTd.hit ? ' hit' : ''}" title="Anytime touchdown odds"><b>${liveTd && liveTd.hit ? '✓ TD' : core.american(touchdownMarket.over)}</b>${liveTd && liveTd.hit ? '<small>scored</small>' : ''}</span>` : '<span></span>'}
        <span class="bt-chev">›</span>
      </summary>
      ${open ? detail(playerId, spots, game, inPlay) : ''}
    </details>`;
  }

  const SORT_LABELS = { kickoff: 'Kickoff', td: 'TD odds', hit: 'Hit rate', lean: 'Proj vs line', exposure: 'My leagues' };

  function renderToolbar(kickoffWindows) {
    const preferences = state.ui;
    const option = (value, label) => `<option value="${value}"${preferences.win === value ? ' selected' : ''}>${label}</option>`;
    dom.setHtml(byId('bt-win'), [option('all', 'All games')]
      .concat(kickoffWindows.some((kickoffWindow) => kickoffWindow.games.some((game) => game.state === 'in')) ? [option('live', 'Live now')] : [])
      .concat(kickoffWindows.filter((kickoffWindow) => !kickoffWindow.games.every((game) => game.state === 'post')).map((kickoffWindow) => option(String(kickoffWindow.kickoff), kickoffWindow.approx ? new Date(kickoffWindow.kickoff).toLocaleDateString([], { weekday: 'short' }) : dayTimeShort(kickoffWindow.kickoff))))
      .join(''));
    for (const button of byId('bt-pos').children) button.classList.toggle('on', button.dataset.pos === preferences.pos);
    byId('bt-sort').value = preferences.sort;
    byId('bt-toggle-all').textContent = state.open.size ? 'Collapse all' : 'Expand all';
    root.style.setProperty('--bt-tb', `${root.querySelector('.bt-toolbar').offsetHeight}px`);
  }

  function render() {
    if (!root) return;
    byId('bt-error').hidden = !state.error;
    byId('bt-error').textContent = state.error || '';
    if (state.nfl) byId('bt-week').textContent = `Week ${displayWeek(state.nfl)}`;
    for (const button of byId('bt-who').children) button.classList.toggle('on', (button.dataset.who === 'all') === state.showOpp);
    if (!state.loadedAt) {
      if (state.error) byId('bt-body').innerHTML = '';
      return;
    }

    const preferences = state.ui;
    const gameOf = new Map();
    for (const game of state.games) { gameOf.set(game.home, game); gameOf.set(game.away, game); }
    const kickoffWindows = windowsOf(state.games);
    const phaseOf = (kickoffWindow) => (kickoffWindow.games.some((game) => game.state === 'in') ? 0 : kickoffWindow.games.every((game) => game.state === 'post') ? 2 : 1);
    const kickoffWindowOf = (team) => kickoffWindows.find((kickoffWindow) => kickoffWindow.teams.has(team));
    renderToolbar(kickoffWindows);

    const query = preferences.q.trim().toLowerCase();
    const rows = [...state.people]
      .filter(([, spots]) => state.showOpp || spots.some((spot) => spot.side === 'me'))
      .map(([playerId, spots]) => ({ pid: playerId, spots, p: players.info(playerId) }))
      .map((row) => Object.assign(row, { game: gameOf.get(row.p.team), win: kickoffWindowOf(row.p.team) }))
      .filter((row) => row.win)
      .filter((row) => preferences.pos === 'ALL' || row.p.pos === preferences.pos)
      .filter((row) => !query || row.p.name.toLowerCase().includes(query) || row.p.team.toLowerCase() === query)
      .filter((row) => preferences.win === 'all' || (preferences.win === 'live' ? phaseOf(row.win) === 0 : String(row.win.kickoff) === preferences.win));

    const mineFirst = (a, b) => (b.spots.some((spot) => spot.side === 'me') - a.spots.some((spot) => spot.side === 'me')) || b.spots.length - a.spots.length;
    const blocks = [];
    const header = (key, inner, count) => blocks.push({ key, html: `<h3 class="bt-group-h" data-key="${escapeHtml(key)}">${inner}<span>${count}</span></h3>` });
    if (preferences.sort === 'kickoff') {
      const sortedWins = kickoffWindows.slice().sort((a, b) => phaseOf(a) - phaseOf(b) || a.kickoff - b.kickoff);
      for (const sortedWin of sortedWins) {
        const list = rows.filter((row) => row.win === sortedWin).sort(mineFirst);
        if (!list.length) continue;
        const phase = phaseOf(sortedWin);
        const tag = phase === 0 ? '<span class="live-tag">LIVE</span> ' : phase === 2 ? '<span class="muted">Final · </span>' : '';
        header(`g:${sortedWin.kickoff}`, `${tag}${escapeHtml(windowTitle(sortedWin))}`, list.length);
        for (const row of list) blocks.push({ key: `p:${row.pid}`, html: item(row.pid, row.spots, row.game, false) });
      }
    } else {
      const score = (row) => (preferences.sort === 'exposure'
        ? row.spots.filter((spot) => spot.side === 'me').length * MINE_WEIGHT - row.spots.filter((spot) => spot.side === 'opp').length
        : core.SORTS[preferences.sort](state.lines[row.pid], state.proj[row.pid]));
      const list = rows.slice().sort((a, b) => score(b) - score(a) || mineFirst(a, b));
      if (list.length) header(`s:${preferences.sort}`, `Sorted by ${escapeHtml(SORT_LABELS[preferences.sort])}`, list.length);
      for (const row of list) blocks.push({ key: `p:${row.pid}`, html: item(row.pid, row.spots, row.game, true) });
    }
    updateRows(blocks, query || preferences.pos !== 'ALL' || preferences.win !== 'all');
    state.justOpened.clear();
  }

  function updateRows(blocks, filtered) {
    const body = byId('bt-body');
    const keys = blocks.map((block) => block.key).join('|');
    if (!blocks.length) {
      body.innerHTML = `<p class="muted small empty">${filtered ? 'No players match these filters.' : (state.leagueCount === 0 ? 'No in-season leagues right now.' : 'None of your starters have games left this week.')}</p>`;
      state.rendered = new Map();
      state.renderedKeys = '';
      return;
    }
    if (keys !== state.renderedKeys) {
      body.innerHTML = blocks.map((block) => block.html).join('');
    } else {
      const template = document.createElement('template');
      for (const block of blocks) {
        if (state.rendered.get(block.key) === block.html) continue;
        const element = body.querySelector(`[data-key="${CSS.escape(block.key)}"]`);
        if (!element) continue;
        template.innerHTML = block.html;
        element.replaceWith(template.content.firstElementChild);
      }
    }
    state.rendered = new Map(blocks.map((block) => [block.key, block.html]));
    state.renderedKeys = keys;
  }

  async function saveUi() {
    await storage.set({ 'bets.settings': { showOpp: state.showOpp, pos: state.ui.pos, sort: state.ui.sort } });
  }

  function preview() {
    if (!state.loadedAt) return;
    const real = state.live;
    const realHits = state.hits;
    const fake = {};
    for (const [playerId, markets] of Object.entries(state.lines)) {
      if (!state.people.has(playerId)) continue;
      const fakeStats = (fake[playerId] = {});
      for (const market of markets) {
        const share = 0.35 + Math.random() * 0.95;
        const target = (market.td ? 1 : market.line) * share;
        market.keys.forEach((k, i) => { fakeStats[k] = Math.round((i === 0 ? target : 0) * 10) / 10; });
      }
    }
    state.live = fake;
    state.previewing = true;
    state.hits = new Set();
    state.fresh = new Set();
    for (const [playerId, markets] of Object.entries(state.lines)) {
      for (const market of markets) {
        const progress = core.progress(market, fake[playerId]);
        if (progress && progress.hit) state.fresh.add(`${playerId}:${market.type}`);
      }
    }
    render();
    setTimeout(() => { state.live = real; state.hits = realHits; state.fresh = new Set(); state.previewing = false; render(); }, PREVIEW_MS);
  }

  function mount(element) {
    if (root === element) return;
    root = element;
    root.classList.add('tool', 'intro');
    setTimeout(() => element.classList.remove('intro'), INTRO_MS);
    root.innerHTML = MARKUP;
    byId('bt-refresh').addEventListener('click', () => refresh(true));
    root.querySelector('.title strong').title = 'Double-click to preview live tracking';
    root.querySelector('.title strong').addEventListener('dblclick', preview);
    byId('bt-who').addEventListener('click', async (event) => {
      const who = event.target.dataset && event.target.dataset.who;
      if (!who) return;
      state.showOpp = who === 'all';
      await saveUi();
      render();
    });
    byId('bt-q').addEventListener('input', (event) => { state.ui.q = event.target.value; render(); });
    byId('bt-sort').addEventListener('change', async (event) => { state.ui.sort = event.target.value; await saveUi(); render(); });
    byId('bt-pos').addEventListener('click', async (event) => {
      if (event.target.id === 'bt-toggle-all') {
        if (state.open.size) state.open.clear();
        else root.querySelectorAll('.bt-item').forEach((item) => state.open.add(item.dataset.pid));
        render();
        return;
      }
      const position = event.target.dataset && event.target.dataset.pos;
      if (!position) return;
      state.ui.pos = position;
      await saveUi();
      render();
    });
    byId('bt-win').addEventListener('change', (event) => {
      state.ui.win = event.target.value;
      render();
    });
    byId('bt-body').addEventListener('toggle', (event) => {
      const details = event.target;
      if (!details.classList || !details.classList.contains('bt-item')) return;
      const playerId = details.dataset.pid;
      if (details.open === state.open.has(playerId)) return;
      if (details.open) { state.open.add(playerId); state.justOpened.add(playerId); } else state.open.delete(playerId);
      render();
    }, true);
    state.timers.push(setInterval(() => refresh(false), REFRESH_MS));
    render();
    refresh(false);
  }

  storage.onChanged((changes) => {
    if (changes.settings && root) refresh(true);
  });

  function unmount() {
    state.timers.forEach(clearInterval);
    state.timers = [];
    clearTimeout(state.liveTimer);
    root = null;
  }

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.bets = { mount, unmount };
})(globalThis.NightOwl);
