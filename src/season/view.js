// Season tool: one row per league with where you stand, how lucky you've
// been, and how many points your lineup choices left on the bench. Expanding
// a league shows its full standings with all-play records and power ratings,
// and, in dynasty and keeper leagues, next year's draft order. While a week is
// being played, everything counts it as if the games ended now.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, players, storage, season } = NightOwl;
  const { escape: esc, short: num, tenths, percent } = NightOwl.format;
  const { NOT_STARTING_SLOTS } = NightOwl.lineups;

  const REFRESH_MS = 10 * 60000;
  const LIVE_REFRESH_MS = 2 * 60000; // while a week is being played
  const KEEPS_PLAYERS = new Set([1, 2]); // settings.type: 1 keeper, 2 dynasty

  let root = null;
  const $ = (id) => root.querySelector(`#${id}`);

  const state = {
    username: '',
    userId: null,
    week: null,
    leagues: [],
    open: new Set(), // league ids expanded
    draftMethod: 'linear', // or 'inverse'; see season.draftOrder
    live: false, // some league counts a week still being played
    loadedAt: 0,
    timer: null,
    busy: false,
    error: null
  };

  const MARKUP = `
    <header class="bar">
      <div class="title"><strong>Season</strong><span id="se-week" class="muted small"></span></div>
      <div class="actions"><button id="se-refresh" class="icon" title="Refresh now" aria-label="Refresh now">↻</button></div>
    </header>
    <div class="tool-scroll">
      <p id="se-error" class="error" hidden></p>
      <div id="se-summary"></div>
      <div id="se-body"><p class="muted small empty">Loading your leagues…</p></div>
    </div>
  `;

  // ---- data -------------------------------------------------------------

  // Scores for finished weeks never change, so each is fetched once.
  async function weekScores(leagueId, weeks) {
    const key = `season.scores.${leagueId}`;
    const cached = await storage.get(key, {});
    const missing = weeks.filter((w) => !cached[w]);
    const fetched = await Promise.all(missing.map((w) => api.matchups(leagueId, w).then((m) => [w, m])));
    for (const [w, matchups] of fetched) {
      cached[w] = Object.fromEntries((matchups || []).map((m) => [m.roster_id, m.points == null ? null : m.points]));
    }
    if (fetched.length) await storage.set({ [key]: cached });
    return weeks.map((w) => cached[w]).filter(Boolean);
  }

  // The rest of the regular season's pairings ([[rosterA, rosterB], ...] per
  // week). Sleeper publishes the whole schedule up front, so it's cached.
  async function remainingSchedule(leagueId, fromWeek, untilWeek) {
    const key = `season.schedule.${leagueId}`;
    const cached = await storage.get(key, {});
    const weeks = [];
    for (let w = fromWeek; w < untilWeek; w++) weeks.push(w);
    const missing = weeks.filter((w) => !cached[w]);
    const fetched = await Promise.all(missing.map((w) => api.matchups(leagueId, w).then((m) => [w, m])));
    for (const [w, matchups] of fetched) {
      const byMatch = new Map();
      for (const m of matchups || []) {
        if (m.matchup_id == null) continue;
        if (!byMatch.has(m.matchup_id)) byMatch.set(m.matchup_id, []);
        byMatch.get(m.matchup_id).push(m.roster_id);
      }
      cached[w] = [...byMatch.values()].filter((pair) => pair.length === 2);
    }
    if (fetched.length) await storage.set({ [key]: cached });
    return weeks.map((w) => cached[w] || []);
  }

  // Last finished week for your team: actual vs best possible, and the
  // single bench decision that cost the most.
  function weekReview(lg, matchups, mine, week) {
    const me = matchups.find((m) => m.roster_id === mine.roster_id);
    if (!me || !me.players_points) return null;
    const pp = me.players_points;
    const pointsOf = (pid) => pp[pid] || 0;
    const positionsOf = (pid) => players.info(pid).positions;
    const unavailable = new Set([...(mine.reserve || []), ...(mine.taxi || [])]);
    const pool = (me.players || []).filter((pid) => !unavailable.has(pid));
    const starters = me.starters || [];
    const bench = pool.filter((pid) => !starters.includes(pid));
    const best = season.optimal(lg.roster_positions || [], pool, pointsOf, positionsOf);
    const opp = me.matchup_id == null ? null : matchups.find((m) => m.matchup_id === me.matchup_id && m.roster_id !== me.roster_id);
    const slots = (lg.roster_positions || []).filter((s) => !NOT_STARTING_SLOTS.has(s));
    return {
      week,
      points: me.points || 0,
      max: Math.max(best.points, me.points || 0),
      opp: opp ? opp.points || 0 : null,
      miss: season.biggestMiss(slots, starters, bench, pointsOf, positionsOf)
    };
  }

  async function load() {
    const shared = await storage.get('settings', {});
    const own = await storage.get('live.settings', {});
    const prefs = await storage.get('season.settings', {});
    if (prefs.draftMethod) state.draftMethod = prefs.draftMethod;
    const username = (shared.username || '').trim();
    if (!username) throw new Error('Add your Sleeper username to get started.');
    if (username !== state.username) { state.username = username; state.userId = null; }
    const excluded = new Set(own.excluded || []);

    await players.load();
    const nfl = await api.state();
    const week = nfl.display_week || nfl.week;
    state.week = week;
    if (!state.userId) {
      const user = await api.user(username);
      if (!user || !user.user_id) throw new Error(`No Sleeper user named "${username}"`);
      state.userId = user.user_id;
    }

    const all = await api.leagues(state.userId, nfl.season);
    const playing = all.filter((lg) => (lg.status === 'in_season' || lg.status === 'post_season') && !excluded.has(lg.league_id));
    state.leagues = (await Promise.all(playing.map(async (lg) => {
      const start = (lg.settings && lg.settings.start_week) || 1;
      const playoffTeams = (lg.settings && lg.settings.playoff_teams) || 0;
      const playoffStart = (lg.settings && lg.settings.playoff_week_start) || 15;
      const keeps = KEEPS_PLAYERS.has(lg.settings && lg.settings.type);
      const medianGame = !!(lg.settings && lg.settings.league_average_match);
      const [rosters, users, traded] = await Promise.all([
        api.rosters(lg.league_id),
        api.users(lg.league_id),
        keeps ? api.tradedPicks(lg.league_id).catch(() => []) : Promise.resolve([])
      ]);
      const mine = rosters.find((r) => r.owner_id === state.userId || (r.co_owners || []).includes(state.userId));
      if (!mine) return null;
      // Finished weeks are the ones in Sleeper's records (wins, points, max
      // points), which can lag the NFL calendar by a day or so. The next week
      // is live once it has points.
      const finished = [];
      const recorded = season.weeksRecorded(rosters, { medianGame });
      for (let w = start; w < start + recorded && w < playoffStart; w++) finished.push(w);
      const next = start + recorded;
      const inProgress = next <= nfl.week && next < playoffStart;
      const [lastWeek, thisWeek] = await Promise.all([
        finished.length ? api.matchups(lg.league_id, finished[finished.length - 1]) : Promise.resolve([]),
        inProgress ? api.matchups(lg.league_id, next) : Promise.resolve([])
      ]);
      const weeks = await weekScores(lg.league_id, finished);
      const names = new Map(users.map((u) => [u.user_id, (u.metadata && u.metadata.team_name) || u.display_name]));
      const live = liveWeek(lg, rosters, thisWeek || [], { medianGame });
      const counted = live ? live.rosters : rosters;
      const allWeeks = live ? weeks.concat([live.scores]) : weeks;
      const rows = season.standings(counted, allWeeks, { medianGame }).map((row) => Object.assign(row, { name: names.get(row.ownerId) || `Team ${row.rosterId}` }));
      const power = season.powerRatings(rows, weeks.length ? weeks : allWeeks);
      for (const r of rows) r.power = power[r.rosterId];
      if (playoffTeams && next < playoffStart) {
        try {
          const schedule = await remainingSchedule(lg.league_id, live ? next + 1 : next, playoffStart);
          const odds = season.playoffOdds({
            teams: rows.map((r) => Object.assign({ rosterId: r.rosterId, wins: r.wins, ties: r.ties, pf: r.pf }, season.teamStrength(weeks, r.rosterId))),
            schedule,
            playoffTeams,
            medianGame,
            sims: 2000,
            seed: season.hash(`${lg.league_id}:${next}`)
          });
          for (const r of rows) r.playoffOdds = odds[r.rosterId];
        } catch (err) {
          console.warn('[Night Owl season] playoff odds unavailable', err);
        }
      }
      return {
        leagueId: lg.league_id,
        name: lg.name.trim(),
        playoffTeams,
        medianGame,
        live: live ? next : null,
        draft: keeps ? {
          season: Number(lg.season) + 1,
          rounds: (lg.settings && lg.settings.draft_rounds) || 4,
          owner: season.pickOwners(traded, Number(lg.season) + 1)
        } : null,
        rows,
        me: rows.find((r) => r.rosterId === mine.roster_id),
        review: finished.length ? weekReview(lg, lastWeek || [], mine, finished[finished.length - 1]) : null
      };
    }))).filter(Boolean).sort((a, b) => a.me.rank / a.rows.length - b.me.rank / b.rows.length || a.name.localeCompare(b.name));
    state.live = state.leagues.some((lg) => lg.live);
    state.loadedAt = Date.now();
  }

  // The week being played, folded into the season as it stands, or null
  // before anything has been scored.
  function liveWeek(lg, rosters, matchups, { medianGame }) {
    if (!matchups.some((m) => m.points > 0)) return null;
    const byRoster = new Map(rosters.map((r) => [r.roster_id, r]));
    const positionsOf = (pid) => players.info(pid).positions;
    const maxes = new Map(matchups.map((m) => {
      const r = byRoster.get(m.roster_id) || {};
      const unavailable = new Set([...(r.reserve || []), ...(r.taxi || [])]);
      const pool = (m.players || []).filter((pid) => !unavailable.has(pid));
      const pp = m.players_points || {};
      const best = season.optimal(lg.roster_positions || [], pool, (pid) => pp[pid] || 0, positionsOf);
      return [m.roster_id, Math.max(best.points, m.points || 0)];
    }));
    return {
      rosters: season.asItStands(rosters, matchups, (id) => (maxes.has(id) ? maxes.get(id) : null), { medianGame }),
      scores: Object.fromEntries(matchups.map((m) => [m.roster_id, m.points || 0]))
    };
  }

  async function refresh() {
    if (state.busy || !root) return;
    state.busy = true;
    $('se-refresh').classList.add('spin');
    try {
      await load();
      state.error = null;
    } catch (err) {
      console.error('[Night Owl season]', err);
      state.error = err.message || String(err);
    } finally {
      state.busy = false;
      if (root) {
        $('se-refresh').classList.remove('spin');
        render();
      }
    }
  }

  // ---- view -------------------------------------------------------------

  const ordinal = (n) => {
    const tail = n % 100 >= 11 && n % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th');
    return `${n}${tail}`;
  };
  const record = (w, l, t) => `${w}–${l}${t ? `–${t}` : ''}`;
  const luckText = (luck) => (luck == null ? '–' : luck === 0 ? 'even' : `${luck > 0 ? '+' : '−'}${num(Math.abs(luck))} ${Math.abs(luck) === 1 ? 'win' : 'wins'}`);
  const oddsLabel = (p) => (p >= 0.995 ? '>99%' : p > 0 && p < 0.005 ? '<1%' : percent(p));
  const playerName = (pid) => (pid ? players.info(pid).name : 'an empty slot');

  function reviewLine(r) {
    if (!r) return '';
    const left = r.max - r.points;
    let text = `Week ${r.week}: ${num(r.points)} of ${num(r.max)} possible.`;
    if (r.miss && left >= 0.5) {
      text += ` Starting ${esc(playerName(r.miss.in))} instead of ${esc(playerName(r.miss.out))} would have added ${num(r.miss.gain)}.`;
    } else {
      text += ' Best lineup you could have set.';
    }
    const lost = r.opp != null && r.points < r.opp;
    const flip = lost && r.max > r.opp;
    return `<div class="se-review${flip ? ' flip' : ''}">${text}${flip ? ' <b>That lineup wins it.</b>' : ''}</div>`;
  }

  function table(lg) {
    const cut = lg.playoffTeams;
    return `<table class="se-table se-standings">
      <thead><tr><th>#</th><th>Team</th><th title="Wins-losses">Record</th><th title="Record if you played every team every week">All-play</th><th title="Points for">PF</th><th title="Wins above what your scores earned">Luck</th><th title="Power rating, 0–100: record 35%, points per week 35%, steadiness 15%, last 3 weeks 15%">Power</th>${lg.rows.some((r) => r.playoffOdds != null) ? '<th title="Chance to make the playoffs">Playoffs</th>' : ''}</tr></thead>
      <tbody>${lg.rows.map((r) => `
        <tr class="${r === lg.me ? 'me' : ''}${cut && r.rank === cut ? ' cut' : ''}">
          <td>${r.rank}</td>
          <td class="se-team">${esc(r.name)}</td>
          <td>${record(r.wins, r.losses, r.ties)}</td>
          <td>${record(r.allPlay.w, r.allPlay.l, r.allPlay.t)}</td>
          <td>${num(r.pf)}</td>
          <td class="${r.luck > 0 ? 'up' : r.luck < 0 ? 'down' : ''}">${r.luck == null ? '–' : `${r.luck > 0 ? '+' : r.luck < 0 ? '−' : ''}${num(Math.abs(r.luck))}`}</td>
          <td>${r.power == null ? '–' : Math.round(r.power)}</td>
          ${r.playoffOdds == null ? '' : `<td>${oddsLabel(r.playoffOdds)}</td>`}
        </tr>`).join('')}</tbody>
    </table>${notes(lg)}`;
  }

  function notes(lg) {
    const parts = [];
    if (lg.playoffTeams) parts.push(`Line under ${ordinal(lg.playoffTeams)}: playoff cut.`);
    if (lg.live) parts.push(`Week ${lg.live} counts as if it ended now.`);
    return parts.length ? `<p class="muted small se-note">${parts.join(' ')}</p>` : '';
  }

  // ---- draft order --------------------------------------------------------

  const METHODS = {
    linear: { label: 'Linear', blurb: 'Gaps count in proportion to their size.' },
    inverse: { label: 'Inverse', blurb: 'The worst teams pull far ahead; small gaps near the top barely count.' }
  };
  const pickLabel = (round, slot) => `${round}.${String(slot).padStart(2, '0')}`;

  function draftPicks(lg) {
    return season.draftOrder(
      lg.rows.map((r) => ({ rosterId: r.rosterId, wins: r.wins + r.ties / 2, max: r.max || 0, row: r })),
      { method: state.draftMethod }
    );
  }

  // Picks you hold in every round, in draft order (rookie drafts run the same
  // order each round).
  function myPicks(lg, picks) {
    const mine = lg.me.rosterId;
    const out = [];
    for (let round = 1; round <= lg.draft.rounds; round++) {
      for (const p of picks) if (lg.draft.owner(round, p.rosterId) === mine) out.push(pickLabel(round, p.pick));
    }
    return out;
  }

  function draftBlock(lg) {
    if (!lg.draft) return '';
    const picks = draftPicks(lg);
    const byRoster = new Map(lg.rows.map((r) => [r.rosterId, r]));
    const held = myPicks(lg, picks);
    const weight = Math.round(season.DRAFT_WIN_WEIGHT * 100);
    return `<section class="se-draft">
      <div class="se-draft-head">
        <div><b>${lg.draft.season} draft order</b><span class="muted small">${lg.live ? 'live, ' : ''}if the season ended now</span></div>
        <div class="se-seg" role="group" aria-label="Draft order method">${Object.entries(METHODS).map(([key, m]) => `
          <button type="button" data-method="${key}" aria-pressed="${state.draftMethod === key}" title="${esc(m.blurb)}">${m.label}</button>`).join('')}
        </div>
      </div>
      <table class="se-table se-draft-table">
        <thead><tr><th title="Round 1 pick">Pick</th><th>Team</th><th title="Wins">W</th><th title="Max points: best possible lineup every week">Max PF</th><th title="${weight}% wins, ${100 - weight}% max points; higher picks earlier">Score</th></tr></thead>
        <tbody>${picks.map((p) => {
          const holder = lg.draft.owner(1, p.rosterId);
          const traded = holder !== p.rosterId ? byRoster.get(holder) : null;
          return `<tr class="${holder === lg.me.rosterId ? 'me' : ''}">
            <td>${pickLabel(1, p.pick)}</td>
            <td class="se-team">${esc(p.row.name)}${traded ? `<span class="se-via" title="Pick traded to ${esc(traded.name)}">→ ${esc(traded.name)}</span>` : ''}</td>
            <td>${num(p.wins)}</td>
            <td>${p.max ? tenths(p.max) : '–'}</td>
            <td>${p.score.toFixed(3)}</td>
          </tr>`;
        }).join('')}</tbody>
      </table>
      <p class="muted small se-note">${weight}% wins + ${100 - weight}% max points, worst first. ${esc(METHODS[state.draftMethod].blurb)}
        ${held.length ? `You hold <b>${held.join(', ')}</b>.` : `You hold no ${lg.draft.season} picks.`}</p>
    </section>`;
  }

  function firstsLine(lg) {
    if (!lg.draft) return '';
    const firsts = draftPicks(lg).filter((p) => lg.draft.owner(1, p.rosterId) === lg.me.rosterId).map((p) => pickLabel(1, p.pick));
    const label = `projected ${firsts.length > 1 ? '1sts' : '1st'}`;
    return `<span title="Round 1 picks you hold, by the projected ${lg.draft.season} draft order"><b>${firsts.length ? firsts.join(', ') : 'No'}</b> ${label}</span>`;
  }

  function leagueBlock(lg) {
    const m = lg.me;
    const inPlayoffs = lg.playoffTeams && m.rank <= lg.playoffTeams;
    return `<details class="se-league" data-id="${esc(lg.leagueId)}"${state.open.has(lg.leagueId) ? ' open' : ''}>
      <summary>
        <div class="se-head">
          <span class="se-name">${esc(lg.name)}</span>
          <span class="se-rank${inPlayoffs ? ' in' : ''}" title="${inPlayoffs ? 'In a playoff spot' : 'Outside the playoff spots'}">${ordinal(m.rank)} of ${lg.rows.length}</span>
        </div>
        <div class="se-stats">
          <span><b>${record(m.wins, m.losses, m.ties)}</b> record${lg.medianGame ? ' <i class="se-aside" title="This league also plays the league median every week">incl. median</i>' : ''}</span>
          <span><b>${record(m.allPlay.w, m.allPlay.l, m.allPlay.t)}</b> all-play</span>
          <span class="${m.luck > 0 ? 'up' : m.luck < 0 ? 'down' : ''}"><b>${luckText(m.luck)}</b> luck</span>
          ${m.playoffOdds == null ? '' : `<span class="${m.playoffOdds >= 0.5 ? 'up' : 'down'}"><b>${oddsLabel(m.playoffOdds)}</b> playoff odds</span>`}
          ${m.efficiency == null ? '' : `<span><b>${percent(m.efficiency)}</b> of max points</span>`}
          ${firstsLine(lg)}
        </div>
        ${reviewLine(lg.review)}
      </summary>
      ${table(lg)}
      ${draftBlock(lg)}
    </details>`;
  }

  function render() {
    if (!root) return;
    $('se-week').textContent = state.week ? `· Week ${state.week}${state.live ? ' · live' : ''}` : '';
    $('se-error').hidden = !state.error;
    $('se-error').textContent = state.error || '';
    if (!state.leagues.length) {
      if (state.loadedAt) $('se-body').innerHTML = '<p class="muted small empty">No in-season leagues found.</p>';
      $('se-summary').innerHTML = '';
      return;
    }
    const sum = state.leagues.reduce((acc, lg) => {
      const m = lg.me;
      acc.w += m.wins; acc.l += m.losses; acc.t += m.ties;
      acc.aw += m.allPlay.w; acc.al += m.allPlay.l; acc.at += m.allPlay.t;
      acc.luck += m.luck || 0;
      if (lg.playoffTeams && m.rank <= lg.playoffTeams) acc.in++;
      return acc;
    }, { w: 0, l: 0, t: 0, aw: 0, al: 0, at: 0, luck: 0, in: 0 });
    $('se-summary').innerHTML = `<div class="se-summary">
      <div><b>${record(sum.w, sum.l, sum.t)}</b><span>overall</span></div>
      <div><b>${record(sum.aw, sum.al, sum.at)}</b><span>all-play</span></div>
      <div class="${sum.luck > 0.05 ? 'up' : sum.luck < -0.05 ? 'down' : ''}"><b>${luckText(Math.round(sum.luck * 10) / 10)}</b><span>luck</span></div>
      <div><b>${sum.in} of ${state.leagues.length}</b><span>in playoff spots</span></div>
    </div>`;
    $('se-body').innerHTML = state.leagues.map(leagueBlock).join('');
  }

  // ---- lifecycle --------------------------------------------------------

  storage.onChanged((changes) => {
    if (root && (changes.settings || changes['live.settings'])) refresh();
  });

  function mount(el) {
    if (root === el) return;
    root = el;
    root.classList.add('tool', 'intro');
    setTimeout(() => el.classList.remove('intro'), 1600);
    root.innerHTML = MARKUP;
    $('se-refresh').addEventListener('click', refresh);
    $('se-body').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-method]');
      if (!btn || btn.dataset.method === state.draftMethod) return;
      state.draftMethod = btn.dataset.method;
      storage.set({ 'season.settings': { draftMethod: state.draftMethod } });
      render();
    });
    $('se-body').addEventListener('toggle', (e) => {
      const id = e.target.dataset && e.target.dataset.id;
      if (!id) return;
      if (e.target.open) state.open.add(id); else state.open.delete(id);
    }, true);
    render();
    if (Date.now() - state.loadedAt > REFRESH_MS / 2) refresh();
    // Every 2 minutes while a week is being played, otherwise every 10.
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
