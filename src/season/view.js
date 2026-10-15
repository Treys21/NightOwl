globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, players, storage, account, dom, season, model } = NightOwl;
  const { keepsPlayers, isPlaying, mine: rosterOf, ownerNames, displayWeek } = NightOwl.leagues;

  const REFRESH_MS = 10 * 60000;
  const LIVE_REFRESH_MS = 2 * 60000;

  let root = null;
  const elementById = (elementId) => root.querySelector(`#${elementId}`);

  const state = {
    week: null,
    leagues: [],
    open: new Set(),
    draftMethod: 'linear',
    mode: 'now',
    stats: {},
    remainingOf: null,
    projections: new Map(),
    projecting: false,
    live: false,
    loadedAt: 0,
    timer: null,
    busy: false,
    error: null
  };

  const MARKUP = `
    <header class="bar">
      <div class="title"><strong id="se-week">Season</strong><span id="se-sub" class="muted small"></span></div>
      <div class="actions">
        <div class="tabs se-mode" role="group" aria-label="Season view">
          <button type="button" class="tab" data-mode="now" title="Standings and draft order as things stand">Now</button>
          <button type="button" class="tab" data-mode="projected" title="Play out the rest of the season and the playoffs from projected lineups">Projected</button>
          <button type="button" class="tab" data-mode="path" title="Your remaining opponents, what you need, and how much the next game matters">Path</button>
          <button type="button" class="tab" data-mode="recap" title="What the bench cost you, your MVP, your best add and trades">Recap</button>
        </div>
        <button id="se-refresh" class="icon" title="Refresh now" aria-label="Refresh now">↻</button>
      </div>
    </header>
    <div class="tool-scroll">
      <p id="se-error" class="error" hidden></p>
      <div id="se-summary"></div>
      <div id="se-body"><div class="skel" role="status" aria-label="Loading your leagues"><i></i><i></i><i></i></div></div>
    </div>
  `;

  async function weekScores(leagueId, weeks) {
    const key = `season.scores.${leagueId}`;
    const cached = await storage.get(key, {});
    const missing = weeks.filter((week) => !cached[week]);
    const fetched = await Promise.all(missing.map((week) => api.matchups(leagueId, week).then((result) => [week, result])));
    for (const [week, matchups] of fetched) {
      cached[week] = Object.fromEntries((matchups || []).map((matchup) => [matchup.roster_id, matchup.points == null ? null : matchup.points]));
    }
    if (fetched.length) await storage.set({ [key]: cached });
    return weeks.map((week) => cached[week]).filter(Boolean);
  }

  async function load() {
    const { userId } = await account.resolve();
    const excluded = await account.excluded();
    const prefs = await storage.get('season.settings', {});
    if (prefs.draftMethod) state.draftMethod = prefs.draftMethod;
    if (prefs.mode) state.mode = prefs.mode;

    await players.load();
    const nfl = await api.state();
    state.week = displayWeek(nfl);
    state.nfl = nfl;

    const playing = (await api.leagues(userId, nfl.season)).filter((league) => isPlaying(league) && !excluded.has(league.league_id));
    state.leagues = (await Promise.all(playing.map(async (league) => {
      const { rosters, users, traded } = await api.leagueParts(league);
      const mine = rosterOf(rosters, userId);
      if (!mine) return null;
      const { playoffTeams, playoffStart, medianGame, finished, next, inProgress } = model.timeline(league, rosters, nfl);
      const thisWeek = inProgress ? await api.matchups(league.league_id, next) : [];
      const weeks = await weekScores(league.league_id, finished);
      const names = ownerNames(users);
      const live = liveWeek(league, rosters, thisWeek || [], { medianGame });
      const counted = live ? live.rosters : rosters;
      const allWeeks = live ? weeks.concat([live.scores]) : weeks;
      const rows = season.standings(counted, allWeeks, { medianGame }).map((row) => Object.assign(row, { name: names.get(row.ownerId) || `Team ${row.rosterId}` }));
      const power = season.powerRatings(rows, weeks.length ? weeks : allWeeks);
      for (const row of rows) row.power = power[row.rosterId];
      if (playoffTeams && next < playoffStart) {
        try {
          const schedule = await model.schedule(league.league_id, live ? next + 1 : next, playoffStart);
          const odds = season.playoffOdds({
            teams: rows.map((row) => Object.assign({ rosterId: row.rosterId, wins: row.wins, ties: row.ties, pf: row.pf }, season.teamStrength(weeks, row.rosterId))),
            schedule,
            playoffTeams,
            medianGame,
            sims: model.SIMS,
            seed: season.hash(`${league.league_id}:${next}`)
          });
          for (const row of rows) row.playoffOdds = odds[row.rosterId];
        } catch (error) {
          console.warn('[Night Owl season] playoff odds unavailable', error);
        }
      }
      return {
        leagueId: league.league_id,
        name: league.name.trim(),
        playoffTeams,
        medianGame,
        raw: {
          season: league.season,
          rosters,
          next,
          inProgress,
          thisWeek: thisWeek || [],
          playoffStart,
          roundType: (league.settings && league.settings.playoff_round_type) || 0,
          slots: league.roster_positions || [],
          scoring: league.scoring_settings || {},
          names
        },
        live: live ? next : null,
        draft: keepsPlayers(league) ? {
          season: Number(league.season) + 1,
          rounds: (league.settings && league.settings.draft_rounds) || 4,
          owner: season.pickOwners(traded, Number(league.season) + 1)
        } : null,
        rows,
        me: rows.find((row) => row.rosterId === mine.roster_id)
      };
    }))).filter(Boolean).sort((a, b) => a.me.rank / a.rows.length - b.me.rank / b.rows.length || a.name.localeCompare(b.name));
    state.live = state.leagues.some((league) => league.live);
    state.loadedAt = Date.now();
  }

  function liveWeek(league, rosters, matchups, { medianGame }) {
    if (!matchups.some((matchup) => matchup.points > 0)) return null;
    const byRoster = new Map(rosters.map((roster) => [roster.roster_id, roster]));
    const positionsOf = (playerId) => players.info(playerId).positions;
    const maxes = new Map(matchups.map((matchup) => {
      const teamRow = byRoster.get(matchup.roster_id) || {};
      const unavailable = new Set([...(teamRow.reserve || []), ...(teamRow.taxi || [])]);
      const pool = (matchup.players || []).filter((playerId) => !unavailable.has(playerId));
      const playersPoints = matchup.players_points || {};
      const best = season.optimal(league.roster_positions || [], pool, (playerId) => playersPoints[playerId] || 0, positionsOf);
      return [matchup.roster_id, Math.max(best.points, matchup.points || 0)];
    }));
    return {
      rosters: season.asItStands(rosters, matchups, (rosterId) => (maxes.has(rosterId) ? maxes.get(rosterId) : null), { medianGame }),
      scores: Object.fromEntries(matchups.map((matchup) => [matchup.roster_id, matchup.points || 0]))
    };
  }

  async function runProjections() {
    if (state.projecting || !state.leagues.length) return;
    const pending = state.leagues.filter((league) => league.raw.next < league.raw.playoffStart && !state.projections.has(league.leagueId));
    if (!pending.length) return;
    state.projecting = true;
    render();
    try {
      const nfl = state.nfl;
      const [stats, remainingOf] = await Promise.all([
        model.projections(nfl.season, model.weeksNeeded(pending), model.positionsFor(pending.map((league) => league.raw.slots))),
        pending.some((league) => league.raw.inProgress) ? model.remainingByTeam(nfl.season, nfl.week) : Promise.resolve(() => 1)
      ]);
      state.stats = stats;
      state.remainingOf = remainingOf;
      for (const league of pending) {
        try {
          await new Promise((resolve) => setTimeout(resolve));
          state.projections.set(league.leagueId, await model.projectLeague(league, { remainingOf, stats, draftMethod: state.draftMethod }));
        } catch (error) {
          console.warn('[Night Owl season] projection failed', league.name, error);
          state.projections.set(league.leagueId, { error: error.message || String(error) });
        }
      }
    } catch (error) {
      console.error('[Night Owl season] projections unavailable', error);
      state.error = `Projections unavailable. ${NightOwl.format.errorText(error)}`;
    } finally {
      state.projecting = false;
      render();
      if (state.mode === 'path') extras().runPaths();
    }
  }

  async function refresh() {
    if (state.busy || !root) return;
    state.busy = true;
    elementById('se-refresh').classList.add('spin');
    try {
      await load();
      state.error = null;
    } catch (error) {
      console.error('[Night Owl season]', error);
      state.error = NightOwl.format.errorText(error);
    } finally {
      state.busy = false;
      if (root) {
        elementById('se-refresh').classList.remove('spin');
        state.projections.clear();
        extras().clear();
        render();
        if (state.mode === 'projected' || state.mode === 'path') runProjections();
        if (state.mode === 'recap') extras().runRecaps();
      }
    }
  }

  const { block: leagueBlock, nameOf, record, signedTenth } = NightOwl.seasonLeagues.create({ state });

  function render() {
    if (!root) return;
    if (state.week) elementById('se-week').textContent = `Week ${state.week}`;
    elementById('se-sub').textContent = state.projecting ? 'projecting…' : state.live ? 'live' : '';
    for (const button of root.querySelectorAll('[data-mode]')) {
      const isActive = button.dataset.mode === state.mode;
      button.classList.toggle('on', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    }
    elementById('se-error').hidden = !state.error;
    elementById('se-error').textContent = state.error || '';
    if (!state.leagues.length) {
      if (state.loadedAt) dom.setHtml(elementById('se-body'), '<p class="muted small empty">No in-season leagues found.</p>');
      else if (state.error) dom.setHtml(elementById('se-body'), '');
      dom.setHtml(elementById('se-summary'), '');
      return;
    }
    const sum = state.leagues.reduce((acc, league) => {
      const myTeam = league.me;
      acc.w += myTeam.wins; acc.l += myTeam.losses; acc.t += myTeam.ties;
      acc.aw += myTeam.allPlay.w; acc.al += myTeam.allPlay.l; acc.at += myTeam.allPlay.t;
      acc.luck += myTeam.luck || 0;
      if (league.playoffTeams && myTeam.rank <= league.playoffTeams) acc.in++;
      return acc;
    }, { w: 0, l: 0, t: 0, aw: 0, al: 0, at: 0, luck: 0, in: 0 });
    dom.setHtml(elementById('se-summary'), `<div class="se-summary">
      <div><b>${record(sum.w, sum.l, sum.t)}</b><span>overall</span></div>
      <div><b>${record(sum.aw, sum.al, sum.at)}</b><span>all-play</span></div>
      <div class="${sum.luck > 0.05 ? 'up' : sum.luck < -0.05 ? 'down' : ''}"><b>${signedTenth(sum.luck)}</b><span>wins of luck</span></div>
      <div><b>${sum.in} of ${state.leagues.length}</b><span>in playoff spots</span></div>
    </div>`);
    const block = state.mode === 'path' ? extras().pathBlock : state.mode === 'recap' ? extras().recapBlock : leagueBlock;
    dom.setHtml(elementById('se-body'), state.leagues.map(block).join(''));
  }

  let extrasPane = null;
  const extras = () => {
    extrasPane = extrasPane || NightOwl.seasonExtras.create({ state, render, nameOf, active: () => !!root });
    return extrasPane;
  };

  storage.onChanged((changes) => {
    if (root && (changes.settings || changes['live.settings'])) refresh();
  });

  function mount(element) {
    if (root === element) return;
    root = element;
    root.classList.add('tool', 'intro');
    setTimeout(() => element.classList.remove('intro'), 1600);
    root.innerHTML = MARKUP;
    elementById('se-refresh').addEventListener('click', refresh);
    root.querySelector('.se-mode').addEventListener('click', (event) => {
      const button = event.target.closest('[data-mode]');
      if (!button || button.dataset.mode === state.mode) return;
      state.mode = button.dataset.mode;
      storage.set({ 'season.settings': { draftMethod: state.draftMethod, mode: state.mode } });
      render();
      if (state.mode === 'projected' || state.mode === 'path') runProjections().then(() => state.mode === 'path' && extras().runPaths());
      if (state.mode === 'recap') extras().runRecaps();
    });
    elementById('se-body').addEventListener('click', (event) => {
      const button = event.target.closest('[data-method]');
      if (!button || button.dataset.method === state.draftMethod) return;
      state.draftMethod = button.dataset.method;
      storage.set({ 'season.settings': { draftMethod: state.draftMethod, mode: state.mode } });
      if (state.mode === 'projected') { state.projections.clear(); runProjections(); }
      render();
    });
    dom.trackOpenDetails(elementById('se-body'), state.open);
    render();
    if (Date.now() - state.loadedAt > REFRESH_MS / 2) refresh();
    else if (state.mode === 'projected' || state.mode === 'path') runProjections().then(() => state.mode === 'path' && extras().runPaths());
    else if (state.mode === 'recap') extras().runRecaps();
    state.timer = setInterval(() => {
      if (Date.now() - state.loadedAt >= (state.live ? LIVE_REFRESH_MS : REFRESH_MS) - 1000) refresh();
    }, LIVE_REFRESH_MS);
  }

  function unmount() {
    clearInterval(state.timer);
    state.timer = null;
    root = null;
  }

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.season = { mount, unmount };
})(globalThis.NightOwl);
