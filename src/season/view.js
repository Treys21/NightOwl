// Season tool: one row per league with where you stand, how lucky you've
// been, and how many points your lineup choices left on the bench. Expanding
// a league shows its full standings with all-play records.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, players, storage, season } = NightOwl;
  const { escape: esc, short: num, percent } = NightOwl.format;
  const { NOT_STARTING_SLOTS } = NightOwl.lineups;

  const REFRESH_MS = 10 * 60000;

  let root = null;
  const $ = (id) => root.querySelector(`#${id}`);

  const state = {
    username: '',
    userId: null,
    week: null,
    leagues: [],
    open: new Set(), // league ids expanded
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
      const finished = [];
      for (let w = start; w < week; w++) finished.push(w);
      const [rosters, users, lastWeek] = await Promise.all([
        api.rosters(lg.league_id),
        api.users(lg.league_id),
        finished.length ? api.matchups(lg.league_id, finished[finished.length - 1]) : Promise.resolve([])
      ]);
      const mine = rosters.find((r) => r.owner_id === state.userId || (r.co_owners || []).includes(state.userId));
      if (!mine) return null;
      const weeks = await weekScores(lg.league_id, finished);
      const names = new Map(users.map((u) => [u.user_id, (u.metadata && u.metadata.team_name) || u.display_name]));
      const medianGame = !!(lg.settings && lg.settings.league_average_match);
      const rows = season.standings(rosters, weeks, { medianGame }).map((row) => Object.assign(row, { name: names.get(row.ownerId) || `Team ${row.rosterId}` }));
      const playoffTeams = (lg.settings && lg.settings.playoff_teams) || 0;
      const playoffStart = (lg.settings && lg.settings.playoff_week_start) || 15;
      if (playoffTeams && week < playoffStart) {
        try {
          const schedule = await remainingSchedule(lg.league_id, week, playoffStart);
          const odds = season.playoffOdds({
            teams: rows.map((r) => Object.assign({ rosterId: r.rosterId, wins: r.wins, ties: r.ties, pf: r.pf }, season.teamStrength(weeks, r.rosterId))),
            schedule,
            playoffTeams,
            medianGame,
            sims: 2000,
            seed: season.hash(`${lg.league_id}:${week}`)
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
        rows,
        me: rows.find((r) => r.rosterId === mine.roster_id),
        review: finished.length ? weekReview(lg, lastWeek || [], mine, finished[finished.length - 1]) : null
      };
    }))).filter(Boolean).sort((a, b) => a.me.rank / a.rows.length - b.me.rank / b.rows.length || a.name.localeCompare(b.name));
    state.loadedAt = Date.now();
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
    return `<table class="se-table">
      <thead><tr><th>#</th><th>Team</th><th title="Wins-losses">Record</th><th title="Record if you played every team every week">All-play</th><th title="Points for">PF</th><th title="Wins above what your scores earned">Luck</th>${lg.rows.some((r) => r.playoffOdds != null) ? '<th title="Chance to make the playoffs">Playoffs</th>' : ''}</tr></thead>
      <tbody>${lg.rows.map((r) => `
        <tr class="${r === lg.me ? 'me' : ''}${cut && r.rank === cut ? ' cut' : ''}">
          <td>${r.rank}</td>
          <td class="se-team">${esc(r.name)}</td>
          <td>${record(r.wins, r.losses, r.ties)}</td>
          <td>${record(r.allPlay.w, r.allPlay.l, r.allPlay.t)}</td>
          <td>${num(r.pf)}</td>
          <td class="${r.luck > 0 ? 'up' : r.luck < 0 ? 'down' : ''}">${r.luck == null ? '–' : `${r.luck > 0 ? '+' : r.luck < 0 ? '−' : ''}${num(Math.abs(r.luck))}`}</td>
          ${r.playoffOdds == null ? '' : `<td>${oddsLabel(r.playoffOdds)}</td>`}
        </tr>`).join('')}</tbody>
    </table>${cut ? `<p class="muted small se-note">Line under ${ordinal(cut)}: playoff cut.</p>` : ''}`;
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
        </div>
        ${reviewLine(lg.review)}
      </summary>
      ${table(lg)}
    </details>`;
  }

  function render() {
    if (!root) return;
    $('se-week').textContent = state.week ? `· Week ${state.week}` : '';
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
    $('se-body').addEventListener('toggle', (e) => {
      const id = e.target.dataset && e.target.dataset.id;
      if (!id) return;
      if (e.target.open) state.open.add(id); else state.open.delete(id);
    }, true);
    render();
    if (Date.now() - state.loadedAt > REFRESH_MS / 2) refresh();
    state.timer = setInterval(refresh, REFRESH_MS);
  }

  function unmount() {
    clearInterval(state.timer);
    state.timer = null;
    root = null;
  }

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.season = { mount, unmount };
})(globalThis.NightOwl);
