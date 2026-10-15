globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, players, storage, account, dom, projection, value, model, ktc, replacement } = NightOwl;
  const { isPlaying, mine: rosterOf, ownerNames } = NightOwl.leagues;

  const REFRESH_MS = 15 * 60000;
  const KIND = { 0: 'redraft', 1: 'keeper', 2: 'dynasty' };

  let root = null;
  const elementById = (elementId) => root.querySelector(`#${elementId}`);

  const state = {
    mode: 'waivers',
    draftMethod: 'linear',
    nfl: null,
    stats: {},
    remainingOf: null,
    ktc: null,
    ktcRedraft: null,
    ktcError: null,
    leagues: [],
    targets: new Map(),
    open: new Set(),
    history: { all: false },
    drafts: { draftId: null, color: 'slot' },
    finder: { leagueId: null, goal: 'balanced', shop: null, target: null, results: null, running: false, progress: '', error: null, token: 0 },
    trade: { leagueId: null, partner: null, give: new Set(), get: new Set(), result: null, token: 0 },
    base: new Map(),
    loadedAt: 0,
    generation: 0,
    timer: null,
    busy: false,
    thinking: false,
    error: null
  };

  const { standingsRanks, PICK_ROUNDS } = NightOwl.moveValues;
  const leagueValues = NightOwl.moveValues.create(state);
  const { label, pickLabel, block: waiverBlock } = NightOwl.movesWaivers.create({ state, values: leagueValues });
  const trade = NightOwl.movesTrade.create({ state, values: leagueValues, label, pickLabel, render: () => render(), active: () => !!root });
  const { nameOf } = trade;
  const { ownedPicks } = leagueValues;

  const MARKUP = `
    <header class="bar">
      <div class="title quiet"><strong>Moves</strong></div>
      <div class="actions">
        <div class="tabs mv-mode" role="group" aria-label="Moves">
          <button type="button" class="tab" data-mode="waivers" title="Free agents who would improve your lineups">Waivers</button>
          <button type="button" class="tab" data-mode="trade" title="What a trade does to both teams">Trade</button>
          <button type="button" class="tab" data-mode="finder" title="Trades the other manager would accept and you would want">Finder</button>
          <button type="button" class="tab" data-mode="history" title="Every trade in the league, graded">History</button>
          <button type="button" class="tab" data-mode="drafts" title="Each draft as a board, every pick graded against the picks around it">Drafts</button>
        </div>
        <button id="mv-refresh" class="icon" title="Refresh now" aria-label="Refresh now">↻</button>
      </div>
    </header>
    <div class="tool-scroll">
      <p id="mv-error" class="error" hidden></p>
      <div id="mv-body"><div class="skel" role="status" aria-label="Loading your leagues"><i></i><i></i><i></i></div></div>
    </div>
  `;

  const tick = () => new Promise((resolve) => setTimeout(resolve));
  const positionsOf = (playerId) => players.info(playerId).positions;
  const WAIVER_MIN_GAIN = 1.5;
  const REFERENCE_PPG = 12;
  const REFERENCE_WEEKS = 11;
  const DROP_PROTECTED = 2000;

  async function load() {
    const { userId } = await account.resolve();
    const excluded = await account.excluded();
    state.draftMethod = (await storage.get('season.settings', {})).draftMethod || 'linear';
    await players.load();
    const nflState = await api.state();
    state.nfl = nflState;

    const playing = (await api.leagues(userId, nflState.season)).filter((league) => isPlaying(league) && !excluded.has(league.league_id));
    const leagues = (await Promise.all(playing.map(async (league) => {
      const { rosters, users, traded } = await api.leagueParts(league);
      const mine = rosterOf(rosters, userId);
      if (!mine) return null;
      const timeline = model.timeline(league, rosters, nflState);
      if (timeline.next >= timeline.playoffStart) return null;
      const thisWeek = timeline.inProgress ? await api.matchups(league.league_id, timeline.next) : [];
      const weeklyPoints = await model.playerPointsByWeek(league.league_id, timeline.finished).catch(() => ({}));
      return {
        weeklyPoints,
        leagueId: league.league_id,
        name: league.name.trim(),
        playoffTeams: timeline.playoffTeams,
        medianGame: timeline.medianGame,
        draft: KIND[(league.settings && league.settings.type) || 0] === 'redraft' ? null : {},
        draftRounds: (league.settings && league.settings.draft_rounds) || PICK_ROUNDS,
        capacity: (league.roster_positions || []).length + ((league.settings && league.settings.reserve_slots) || 0) + ((league.settings && league.settings.taxi_slots) || 0),
        traded,
        tradeDeadline: (league.settings && league.settings.trade_deadline) || 0,
        kind: KIND[(league.settings && league.settings.type) || 0] || 'redraft',
        mine,
        names: ownerNames(users),
        raw: {
          season: league.season,
          rosters,
          next: timeline.next,
          inProgress: timeline.inProgress,
          thisWeek: thisWeek || [],
          playoffStart: timeline.playoffStart,
          roundType: (league.settings && league.settings.playoff_round_type) || 0,
          slots: league.roster_positions || [],
          scoring: league.scoring_settings || {}
        }
      };
    }))).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));

    const [stats, remainingOf, nflSchedule] = await Promise.all([
      leagues.length ? model.projections(nflState.season, model.weeksNeeded(leagues), model.positionsFor(leagues.map((league) => league.raw.slots))) : {},
      leagues.some((league) => league.raw.inProgress) ? model.remainingByTeam(nflState.season, nflState.week) : Promise.resolve(() => 1),
      model.nflSchedule(nflState.season)
    ]);
    state.stats = stats;
    state.remainingOf = remainingOf;
    state.ktcError = null;
    if (leagues.some((league) => league.kind !== 'redraft')) {
      try { state.ktc = await ktc.load('dynasty', players.list(), api.ktcRows); } catch (error) {
        console.warn('[Night Owl moves] KeepTradeCut unavailable', error);
        state.ktc = null;
        state.ktcError = error.message || String(error);
      }
    }

    if (leagues.some((league) => league.kind === 'redraft')) {
      try { state.ktcRedraft = await ktc.load('redraft', players.list(), api.ktcRows); } catch (error) {
        console.warn('[Night Owl moves] KeepTradeCut redraft values unavailable', error);
        state.ktcRedraft = null;
      }
    }

    const projected = new Set();
    for (const week of Object.values(stats)) for (const playerId of Object.keys(week)) projected.add(playerId);
    for (const league of leagues) {
      league.weeks = model.valueWeeks(league, stats, nflSchedule);
      const taken = new Set(league.raw.rosters.flatMap((roster) => roster.players || []));
      league.free = [...projected].filter((playerId) => !taken.has(playerId));
      league.rep = replacement.wrap({
        slots: league.raw.slots, weeks: league.weeks, positionsOf,
        rates: replacement.levels(league.free, league.weeks, positionsOf, replacement.startingPositions(league.raw.slots), [...taken])
      });
      league.scale = pointScale(league);
      league.ranks = standingsRanks(league.raw.rosters);
      league.picks = league.kind === 'redraft' ? new Map() : ownedPicks(league);
      league.superflex = ktc.isSuperflex(league.raw.slots);
      league.tep = ktc.tepTier(league.raw.scoring);
      league.openSpots = Math.max(0, league.capacity - (league.mine.players || []).length);
    }
    state.leagues = leagues;
    state.generation++;
    state.targets.clear();
    state.base.clear();
    state.loadedAt = Date.now();
  }

  function pointScale(league) {
    if (!league.weeks.length) return 1;
    const starters = NightOwl.leagues.startingSlots({ roster_positions: league.raw.slots }).length || 1;
    const perStarter = league.raw.rosters.map((roster) => value.lineupPoints(league.raw.slots, model.activePool(roster), league.weeks.slice(0, 1), positionsOf).total / starters);
    const pointsPerStarter = perStarter.reduce((total, points) => total + points, 0) / perStarter.length;
    const clamp = (value, lowest, highest) => Math.max(lowest, Math.min(highest, value));
    return clamp(pointsPerStarter / REFERENCE_PPG, 0.5, 2) * clamp(league.weeks.length / REFERENCE_WEEKS, 0.4, 1.3);
  }

  async function projectPicks() {
    const generation = state.generation;
    for (const league of state.leagues) {
      if (!league.draft || league.slots) continue;
      await tick();
      if (!root || generation !== state.generation) return;
      try {
        const base = await model.projectLeague(league, { remainingOf: state.remainingOf, stats: state.stats, draftMethod: state.draftMethod });
        if (generation !== state.generation) return;
        state.base.set(league.leagueId, base);
        league.slots = new Map(projection.projectedDraft(base, { method: state.draftMethod }).map((team) => [team.rosterId, team.pick]));
        league.dyn = new Map();
        league.blend = new Map();
        render();
      } catch (error) {
        console.warn('[Night Owl moves] draft order projection failed', league.name, error);
      }
    }
  }

  async function analyze() {
    const generation = state.generation;
    for (const league of state.leagues) {
      if (state.targets.has(league.leagueId)) continue;
      await tick();
      if (!root || generation !== state.generation) return;
      const pool = model.activePool(league.mine);
      const droppable = leagueValues.usesKtc(league) ? pool.filter((playerId) => leagueValues.dynastyValue(league, playerId) < DROP_PROTECTED) : pool;
      state.targets.set(league.leagueId, value.waiverTargets({
        slots: league.raw.slots, pool, droppable, openSpots: league.openSpots,
        candidates: league.free, weeks: league.rep.weeks, positionsOf, minGain: WAIVER_MIN_GAIN * league.scale
      }));
      render();
    }
  }

  async function refresh() {
    if (state.busy || !root) return;
    state.busy = true;
    elementById('mv-refresh').classList.add('spin');
    try {
      await load();
      state.error = null;
    } catch (error) {
      console.error('[Night Owl moves]', error);
      state.error = NightOwl.format.errorText(error);
    } finally {
      state.busy = false;
      if (root) {
        elementById('mv-refresh').classList.remove('spin');
        trade.keepValid();
        render();
        analyze().then(projectPicks).then(() => state.mode === 'trade' && trade.analyze()).then(loadHistories);
        state.finder.token++;
        state.finder.running = false;
        state.finder.results = null;
        if (state.mode === 'finder') finder().run();
        if (state.mode === 'trade') trade.analyze();
      }
    }
  }

  let finderPane = null;
  const finderLeague = () => state.leagues.find((league) => league.leagueId === state.finder.leagueId) || state.leagues[0] || null;
  function finder() {
    finderPane = finderPane || NightOwl.movesFinder.create({
      state, V: leagueValues, label, pickLabel, nameOf, positionsOf, render, active: () => !!root,
      ensureHistory: (league) => history().ensure(league),
      league: () => { const league = finderLeague(); state.finder.leagueId = league && league.leagueId; return league; },
      openTrade
    });
    return finderPane;
  }

  function openTrade(item) {
    const league = finderLeague();
    const tradeState = state.trade;
    tradeState.leagueId = league.leagueId;
    tradeState.partner = item.partnerId;
    tradeState.give = new Set(item.give);
    tradeState.get = new Set(item.get);
    tradeState.result = null;
    state.mode = 'trade';
    storage.set({ 'moves.settings': { mode: state.mode } });
    render();
    trade.analyze();
  }

  let historyPane = null;
  function history() {
    historyPane = historyPane || NightOwl.movesHistory.create({
      state, V: leagueValues, render, active: () => !!root,
      league: () => { const league = finderLeague(); state.finder.leagueId = league && league.leagueId; return league; }
    });
    return historyPane;
  }

  let draftsPane = null;
  function drafts() {
    draftsPane = draftsPane || NightOwl.movesDrafts.create({
      state, V: leagueValues, render, active: () => !!root, ensureHistory: (league) => history().ensure(league),
      league: () => { const league = finderLeague(); state.finder.leagueId = league && league.leagueId; return league; }
    });
    return draftsPane;
  }

  async function loadHistories() {
    const generation = state.generation;
    for (const league of state.leagues) {
      if (league.history || league.historyPromise) continue;
      await tick();
      if (!root || generation !== state.generation) return;
      await history().ensure(league);
      if (root && generation === state.generation && (state.mode === 'history' || state.mode === 'drafts')) render();
    }
  }

  function render() {
    if (!root) return;
    root.querySelectorAll('.mv-mode .tab').forEach((b) => b.classList.toggle('on', b.dataset.mode === state.mode));
    const error = elementById('mv-error');
    error.hidden = !state.error;
    error.textContent = state.error || '';
    if (!state.loadedAt) {
      if (state.error) dom.setHtml(elementById('mv-body'), '');
      return;
    }

    if (!state.leagues.length) {
      dom.setHtml(elementById('mv-body'), '<p class="empty muted">No league with a regular season left to play.</p>');
    } else if (state.mode === 'history') {
      dom.setHtml(elementById('mv-body'), history().pane());
    } else if (state.mode === 'drafts') {
      dom.setHtml(elementById('mv-body'), drafts().pane());
    } else if (state.mode === 'finder') {
      dom.setHtml(elementById('mv-body'), finder().pane());
    } else if (state.mode === 'waivers') {
      dom.setHtml(elementById('mv-body'), state.leagues.map(waiverBlock).join(''));
    } else {
      const body = elementById('mv-body');
      const scrolls = [...body.querySelectorAll('.mv-picks')].map((element) => element.scrollTop);
      if (dom.setHtml(body, trade.pane())) body.querySelectorAll('.mv-picks').forEach((element, i) => { element.scrollTop = scrolls[i] || 0; });
    }
  }

  function bind() {
    const body = elementById('mv-body');
    elementById('mv-refresh').addEventListener('click', refresh);
    root.querySelector('.mv-mode').addEventListener('click', (event) => {
      const button = event.target.closest('[data-mode]');
      if (!button || button.dataset.mode === state.mode) return;
      state.mode = button.dataset.mode;
      storage.set({ 'moves.settings': { mode: state.mode } });
      trade.keepValid();
      render();
      if (state.mode === 'trade') trade.analyze();
      if (state.mode === 'finder' && !state.finder.results && !state.finder.running) finder().run();
      if (state.mode === 'history' || state.mode === 'drafts') { const league = finderLeague(); if (league && !league.history) history().ensure(league).then(() => root && render()); }
    });
    dom.trackOpenDetails(body, state.open);
    body.addEventListener('click', (event) => {
      if (state.mode === 'finder') finder().click(event);
      else if (state.mode === 'history') history().click(event);
      else if (state.mode === 'drafts') drafts().click(event);
    });
    body.addEventListener('change', (event) => {
      if (state.mode === 'finder') { finder().change(event); return; }
      if (state.mode === 'history') { history().change(event); return; }
      if (state.mode === 'drafts') { drafts().change(event); return; }
      const tradeState = state.trade;
      const element = event.target;
      if (element.id === 'mv-league') {
        tradeState.leagueId = element.value; tradeState.partner = null; tradeState.give.clear(); tradeState.get.clear(); tradeState.result = null;
      } else if (element.id === 'mv-partner') {
        tradeState.partner = element.value ? Number(element.value) : null; tradeState.get.clear();
      } else if (element.dataset && (element.dataset.give || element.dataset.get)) {
        const set = element.dataset.give ? tradeState.give : tradeState.get;
        const playerId = element.dataset.give || element.dataset.get;
        if (element.checked) set.add(playerId); else set.delete(playerId);
      } else {
        return;
      }
      trade.analyze();
    });
  }

  function mount(element) {
    if (root === element) return;
    root = element;
    root.classList.add('tool', 'intro');
    setTimeout(() => element.classList.remove('intro'), 1600);
    root.innerHTML = MARKUP;
    bind();
    storage.get('moves.settings', {}).then((prefs) => {
      if (prefs.mode && root === element) { state.mode = prefs.mode; render(); }
    });
    render();
    if (Date.now() - state.loadedAt > REFRESH_MS / 2) refresh();
    else { render(); analyze().then(projectPicks).then(loadHistories); }
    state.timer = setInterval(() => {
      if (Date.now() - state.loadedAt >= REFRESH_MS - 1000) refresh();
    }, 60000);
  }

  function unmount() {
    state.finder.token++;
    state.finder.running = false;
    clearInterval(state.timer);
    state.timer = null;
    root = null;
  }

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.moves = { mount, unmount };
})(globalThis.NightOwl);
