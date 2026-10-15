globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, players, storage, account, dom } = NightOwl;
  const { escape: escapeHtml, dayTimeShort, windowTitle } = NightOwl.format;
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

  const { item } = NightOwl.betsRows.create({ state });

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
