// Season tool: one row per league with where you stand, how lucky you've
// been, and how many points your lineup choices left on the bench. Expanding
// a league shows its full standings with all-play records and power ratings,
// and, in dynasty and keeper leagues, next year's draft order. While a week is
// being played, everything counts it as if the games ended now.
//
// "Projected" plays out the rest of the season and the playoffs from each
// team's projected lineups (see season/project.js): final records, playoff,
// bye and title odds, the end-of-season draft order and a projected bracket.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, players, storage, account, dom, season, projection, model } = NightOwl;
  const { isPlaying, mine: rosterOf, teamNames, displayWeek } = NightOwl.leagues;
  const { escape: esc, short: num, tenths, percent } = NightOwl.format;
  const { NOT_STARTING_SLOTS } = NightOwl.lineups;

  const REFRESH_MS = 10 * 60000;
  const LIVE_REFRESH_MS = 2 * 60000; // while a week is being played
  const KEEPS_PLAYERS = new Set([1, 2]); // settings.type: 1 keeper, 2 dynasty
  const SIMS = model.SIMS;

  let root = null;
  const $ = (id) => root.querySelector(`#${id}`);

  const state = {
    week: null,
    leagues: [],
    open: new Set(), // league ids expanded
    draftMethod: 'linear', // or 'inverse'; see season.draftOrder
    mode: 'now', // or 'projected', 'path' or 'recap'
    stats: {}, // weekly projections behind the simulations, kept for the path view
    remainingOf: null,
    projections: new Map(), // league id -> projectSeason result, or { error }
    projecting: false,
    live: false, // some league counts a week still being played
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
    const { userId } = await account.resolve();
    const excluded = await account.excluded();
    const prefs = await storage.get('season.settings', {});
    if (prefs.draftMethod) state.draftMethod = prefs.draftMethod;
    if (prefs.mode) state.mode = prefs.mode;

    await players.load();
    const nfl = await api.state();
    state.week = displayWeek(nfl);
    state.nfl = nfl;

    const playing = (await api.leagues(userId, nfl.season)).filter((lg) => isPlaying(lg) && !excluded.has(lg.league_id));
    state.leagues = (await Promise.all(playing.map(async (lg) => {
      const keeps = KEEPS_PLAYERS.has(lg.settings && lg.settings.type);
      const [rosters, users, traded] = await Promise.all([
        api.rosters(lg.league_id),
        api.users(lg.league_id),
        keeps ? api.tradedPicks(lg.league_id).catch(() => []) : Promise.resolve([])
      ]);
      const mine = rosterOf(rosters, userId);
      if (!mine) return null;
      const { playoffTeams, playoffStart, medianGame, finished, next, inProgress } = model.timeline(lg, rosters, nfl);
      const [lastWeek, thisWeek] = await Promise.all([
        finished.length ? api.matchups(lg.league_id, finished[finished.length - 1]) : Promise.resolve([]),
        inProgress ? api.matchups(lg.league_id, next) : Promise.resolve([])
      ]);
      const weeks = await weekScores(lg.league_id, finished);
      const names = teamNames(users);
      const live = liveWeek(lg, rosters, thisWeek || [], { medianGame });
      const counted = live ? live.rosters : rosters;
      const allWeeks = live ? weeks.concat([live.scores]) : weeks;
      const rows = season.standings(counted, allWeeks, { medianGame }).map((row) => Object.assign(row, { name: names.get(row.ownerId) || `Team ${row.rosterId}` }));
      const power = season.powerRatings(rows, weeks.length ? weeks : allWeeks);
      for (const r of rows) r.power = power[r.rosterId];
      if (playoffTeams && next < playoffStart) {
        try {
          const schedule = await model.schedule(lg.league_id, live ? next + 1 : next, playoffStart);
          const odds = season.playoffOdds({
            teams: rows.map((r) => Object.assign({ rosterId: r.rosterId, wins: r.wins, ties: r.ties, pf: r.pf }, season.teamStrength(weeks, r.rosterId))),
            schedule,
            playoffTeams,
            medianGame,
            sims: model.SIMS,
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
        // What the projection needs: the records as Sleeper has them (the
        // live week is projected, not counted), and the league's rules.
        raw: {
          season: lg.season,
          rosters,
          next,
          inProgress,
          thisWeek: thisWeek || [],
          playoffStart,
          roundType: (lg.settings && lg.settings.playoff_round_type) || 0,
          slots: lg.roster_positions || [],
          scoring: lg.scoring_settings || {},
          names
        },
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

  // ---- projection ---------------------------------------------------------

  async function runProjections() {
    if (state.projecting || !state.leagues.length) return;
    const pending = state.leagues.filter((lg) => lg.raw.next < lg.raw.playoffStart && !state.projections.has(lg.leagueId));
    if (!pending.length) return;
    state.projecting = true;
    render();
    try {
      const nfl = state.nfl;
      const [stats, remainingOf] = await Promise.all([
        model.projections(nfl.season, model.weeksNeeded(pending), model.positionsFor(pending.map((lg) => lg.raw.slots))),
        pending.some((lg) => lg.raw.inProgress) ? model.remainingByTeam(nfl.season, nfl.week) : Promise.resolve(() => 1)
      ]);
      state.stats = stats;
      state.remainingOf = remainingOf;
      for (const lg of pending) {
        try {
          // 2,000 simulated seasons take ~60 ms a league: give the page a
          // breath between leagues so Sleeper's own UI never stalls.
          await new Promise((resolve) => setTimeout(resolve));
          state.projections.set(lg.leagueId, await model.projectLeague(lg, { remainingOf, stats, draftMethod: state.draftMethod }));
        } catch (err) {
          console.warn('[Night Owl season] projection failed', lg.name, err);
          state.projections.set(lg.leagueId, { error: err.message || String(err) });
        }
      }
    } catch (err) {
      console.error('[Night Owl season] projections unavailable', err);
      state.error = `Projections unavailable: ${err.message || err}`;
    } finally {
      state.projecting = false;
      render();
      if (state.mode === 'path') extras().runPaths();
    }
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
        state.projections.clear();
        extras().clear();
        render();
        if (state.mode === 'projected' || state.mode === 'path') runProjections();
        if (state.mode === 'recap') extras().runRecaps();
      }
    }
  }

  // ---- view -------------------------------------------------------------

  const ordinal = (n) => {
    const tail = n % 100 >= 11 && n % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th');
    return `${n}${tail}`;
  };
  const record = (w, l, t) => `${w}–${l}${t ? `–${t}` : ''}`;
  const signedTenth = (n) => { const v = Math.round(n * 10) / 10; return v === 0 ? '0' : `${v > 0 ? '+' : '−'}${num(Math.abs(v))}`; };
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
        <div class="tabs" role="group" aria-label="Draft order method">${Object.entries(METHODS).map(([key, m]) => `
          <button type="button" class="tab${state.draftMethod === key ? ' on' : ''}" data-method="${key}" aria-pressed="${state.draftMethod === key}" title="${esc(m.blurb)}">${m.label}</button>`).join('')}
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

  // A value over its label; tone is 'up' (good), 'down' (bad) or ''.
  const kpi = (value, label, { tone = '', title = '' } = {}) =>
    `<div class="se-kpi ${tone}"${title ? ` title="${esc(title)}"` : ''}><b>${value}</b><span>${label}</span></div>`;

  function firstsKpi(lg) {
    const firsts = draftPicks(lg).filter((p) => lg.draft.owner(1, p.rosterId) === lg.me.rosterId).map((p) => pickLabel(1, p.pick));
    return kpi(firsts.length ? firsts.join(', ') : 'Traded', `${lg.draft.season} 1st`, {
      title: `Round 1 picks you hold, by the projected ${lg.draft.season} draft order`
    });
  }

  // ---- projected ----------------------------------------------------------

  const projRecord = (w, l) => `${num(Math.round(w * 10) / 10)}–${num(Math.round(l * 10) / 10)}`;
  const nameOf = (lg, rosterId) => {
    const row = lg.rows.find((r) => r.rosterId === rosterId);
    return row ? row.name : `Team ${rosterId}`;
  };

  function projectedTable(lg, p) {
    const cut = lg.playoffTeams;
    const byes = p.bracket && p.bracket.rounds[0].matches.some((m) => !m.bottom);
    return `<table class="se-table se-standings se-projected">
      <thead><tr><th title="Projected finish: average place across ${SIMS.toLocaleString()} simulated seasons">#</th><th>Team</th><th title="Projected final record (average across simulations)">Record</th><th title="Projected points for at season's end">PF</th>${cut ? '<th title="Chance to make the playoffs">Playoffs</th>' : ''}${byes ? '<th title="Chance of a first-round bye">Bye</th>' : ''}${p.bracket ? '<th title="Chance to win the championship">Title</th>' : ''}</tr></thead>
      <tbody>${p.order.map((id, i) => {
        const t = p.teams[id];
        return `<tr class="${id === lg.me.rosterId ? 'me' : ''}${cut && i + 1 === cut ? ' cut' : ''}">
          <td>${i + 1}</td>
          <td class="se-team">${esc(nameOf(lg, id))}</td>
          <td>${projRecord(t.wins, t.losses)}</td>
          <td>${num(Math.round(t.pf))}</td>
          ${cut ? `<td>${oddsLabel(t.playoffOdds)}</td>` : ''}
          ${byes ? `<td>${oddsLabel(t.byeOdds)}</td>` : ''}
          ${p.bracket ? `<td>${oddsLabel(t.titleOdds)}</td>` : ''}
        </tr>`;
      }).join('')}</tbody>
    </table>
    <p class="muted small se-note">${lg.raw.inProgress ? `Week ${lg.raw.next} so far, then ` : ''}each team's best projected lineup every week through the playoffs, played out ${SIMS.toLocaleString()} times on the real schedule${lg.medianGame ? ', median games included' : ''}. Records are averages.</p>`;
  }

  function projectedDraftBlock(lg, p) {
    if (!lg.draft) return '';
    const picks = projection.projectedDraft(p, { method: state.draftMethod });
    const weight = Math.round(season.DRAFT_WIN_WEIGHT * 100);
    const held = [];
    for (let round = 1; round <= lg.draft.rounds; round++) {
      for (const pk of picks) if (lg.draft.owner(round, pk.rosterId) === lg.me.rosterId) held.push(pickLabel(round, pk.pick));
    }
    return `<section class="se-draft">
      <div class="se-draft-head">
        <div><b>${lg.draft.season} draft order</b><span class="muted small">projected, end of season</span></div>
        <div class="tabs" role="group" aria-label="Draft order method">${Object.entries(METHODS).map(([key, m]) => `
          <button type="button" class="tab${state.draftMethod === key ? ' on' : ''}" data-method="${key}" aria-pressed="${state.draftMethod === key}" title="${esc(m.blurb)}">${m.label}</button>`).join('')}
        </div>
      </div>
      <table class="se-table se-draft-table">
        <thead><tr><th title="Round 1 pick">Pick</th><th>Team</th><th title="Projected final wins">W</th><th title="Projected max points at season's end">Max PF</th><th title="Chance of the first overall pick">#1</th></tr></thead>
        <tbody>${picks.map((pk) => {
          const holder = lg.draft.owner(1, pk.rosterId);
          const traded = holder !== pk.rosterId ? nameOf(lg, holder) : null;
          return `<tr class="${holder === lg.me.rosterId ? 'me' : ''}">
            <td>${pickLabel(1, pk.pick)}</td>
            <td class="se-team">${esc(nameOf(lg, pk.rosterId))}${traded ? `<span class="se-via" title="Pick traded to ${esc(traded)}">→ ${esc(traded)}</span>` : ''}</td>
            <td>${num(Math.round(pk.wins * 10) / 10)}</td>
            <td>${tenths(pk.max)}</td>
            <td>${pk.odds ? oddsLabel(pk.odds[0]) : '–'}</td>
          </tr>`;
        }).join('')}</tbody>
      </table>
      <p class="muted small se-note">${weight}% wins + ${100 - weight}% max points on projected final numbers, worst first.
        ${held.length ? `You'd hold <b>${held.join(', ')}</b>.` : `You hold no ${lg.draft.season} picks.`}</p>
    </section>`;
  }

  function bracketBlock(lg, p) {
    if (!p.bracket) return '';
    const side = (s, chance) => (s
      ? `<div class="se-slot${s.rosterId === lg.me.rosterId ? ' me' : ''}"><span class="se-seed">${s.seed}</span><span class="se-bteam">${esc(nameOf(lg, s.rosterId))}</span><span class="se-bpts">${tenths(s.points)}</span><span class="se-bodds">${chance}</span></div>`
      : '<div class="se-slot bye"><span class="se-seed"></span><span class="se-bteam muted">Bye</span></div>');
    const champ = p.bracket.champion;
    return `<section class="se-bracket">
      <div class="se-draft-head"><div><b>Projected playoffs</b><span class="muted small">favorites advance; % to win each game</span></div></div>
      <div class="se-rounds">${p.bracket.rounds.map((round) => `
        <div class="se-round${round.matches.length === 1 ? ' solo' : ''}">
          <div class="se-round-h">${round.label}<span class="muted"> · Wk ${round.weeks.join('–')}</span></div>
          ${round.matches.map((m) => `<div class="se-match">
            ${side(m.top, m.bottom ? percent(m.pTop) : '')}
            ${m.bottom ? side(m.bottom, percent(1 - m.pTop)) : side(null)}
          </div>`).join('')}
        </div>`).join('')}
      </div>
      ${champ ? `<p class="muted small se-note">Projected champion: <b>${esc(nameOf(lg, champ.rosterId))}</b> (${oddsLabel(p.teams[champ.rosterId].titleOdds)} to win it all).${p.teams[lg.me.rosterId] ? ` You: ${oddsLabel(p.teams[lg.me.rosterId].titleOdds)}.` : ''}</p>` : ''}
    </section>`;
  }

  function projectedKpis(lg, p) {
    const t = p.teams[lg.me.rosterId];
    const place = p.order.indexOf(lg.me.rosterId) + 1;
    const picks = lg.draft ? projection.projectedDraft(p, { method: state.draftMethod }) : null;
    const firsts = picks ? picks.filter((pk) => lg.draft.owner(1, pk.rosterId) === lg.me.rosterId).map((pk) => pickLabel(1, pk.pick)) : null;
    return `<div class="se-kpis">
      ${kpi(projRecord(t.wins, t.losses), `proj. · ${ordinal(place)}`, { title: 'Projected final record and finish' })}
      ${lg.playoffTeams ? kpi(oddsLabel(t.playoffOdds), 'playoffs', { tone: t.playoffOdds >= 0.5 ? 'up' : 'down', title: `Chance to make the playoffs, from ${SIMS.toLocaleString()} projected seasons` }) : kpi(num(Math.round(t.pf)), 'proj. PF')}
      ${p.bracket ? kpi(oddsLabel(t.titleOdds), 'title', { tone: t.titleOdds >= 1 / lg.rows.length ? 'up' : '', title: 'Chance to win the championship' }) : kpi(num(Math.round(t.max)), 'proj. max')}
      ${firsts ? kpi(firsts.length ? firsts.join(', ') : 'Traded', `${lg.draft.season} 1st`, { title: 'Round 1 picks you hold, by the projected end-of-season order' }) : kpi(oddsLabel(t.byeOdds), 'bye', { title: 'Chance of a first-round bye' })}
    </div>`;
  }

  function leagueBlock(lg) {
    const m = lg.me;
    const p = state.mode === 'projected' ? state.projections.get(lg.leagueId) : null;
    const projected = p && !p.error;
    const place = projected ? p.order.indexOf(m.rosterId) + 1 : m.rank;
    const inPlayoffs = lg.playoffTeams && place <= lg.playoffTeams;
    const luck = m.luck == null ? '–' : signedTenth(m.luck);
    let body;
    if (state.mode !== 'projected') body = `${table(lg)}${draftBlock(lg)}`;
    else if (lg.raw.next >= lg.raw.playoffStart) body = `<p class="muted small se-note">The regular season is over; nothing left to project.</p>${table(lg)}${draftBlock(lg)}`;
    else if (!p) body = '<div class="skel" role="status" aria-label="Projecting the rest of the season"><i></i><i></i><i></i></div>';
    else if (p.error) body = `<p class="error">Couldn't project this league: ${esc(p.error)}</p>`;
    else body = `${projectedTable(lg, p)}${bracketBlock(lg, p)}${projectedDraftBlock(lg, p)}`;
    return `<details class="se-league" data-id="${esc(lg.leagueId)}"${state.open.has(lg.leagueId) ? ' open' : ''}>
      <summary>
        <div class="se-head">
          <span class="se-name">${esc(lg.name)}</span>
          <span class="se-rank${inPlayoffs ? ' in' : ''}" title="${projected ? 'Projected finish' : inPlayoffs ? 'In a playoff spot' : 'Outside the playoff spots'}">${projected ? 'proj. ' : ''}${ordinal(place)} of ${lg.rows.length}</span>
        </div>
        ${projected ? projectedKpis(lg, p) : `<div class="se-kpis">
          ${kpi(record(m.wins, m.losses, m.ties), lg.medianGame ? 'incl. median' : 'record', { title: lg.medianGame ? 'This league also plays the league median every week' : '' })}
          ${m.playoffOdds == null
            ? kpi(record(m.allPlay.w, m.allPlay.l, m.allPlay.t), 'all-play', { title: 'Your record if you played every team every week' })
            : kpi(oddsLabel(m.playoffOdds), 'playoffs', { tone: m.playoffOdds >= 0.5 ? 'up' : 'down', title: 'Chance to make the playoffs, from 2,000 simulations' })}
          ${kpi(luck, Math.abs(m.luck) === 1 ? 'win of luck' : 'wins of luck', { tone: m.luck > 0 ? 'up' : m.luck < 0 ? 'down' : '', title: 'Wins above what your weekly scores earned' })}
          ${lg.draft ? firstsKpi(lg) : kpi(m.efficiency == null ? '–' : percent(m.efficiency), 'of max points', { title: 'Points scored out of the best lineup you could have set' })}
        </div>`}
        ${reviewLine(lg.review)}
      </summary>
      ${body}
    </details>`;
  }

  function render() {
    if (!root) return;
    if (state.week) $('se-week').textContent = `Week ${state.week}`;
    $('se-sub').textContent = state.projecting ? 'projecting…' : state.live ? 'live' : '';
    for (const btn of root.querySelectorAll('[data-mode]')) {
      const on = btn.dataset.mode === state.mode;
      btn.classList.toggle('on', on);
      btn.setAttribute('aria-pressed', String(on));
    }
    $('se-error').hidden = !state.error;
    $('se-error').textContent = state.error || '';
    if (!state.leagues.length) {
      if (state.loadedAt) dom.setHtml($('se-body'), '<p class="muted small empty">No in-season leagues found.</p>');
      else if (state.error) dom.setHtml($('se-body'), '');
      dom.setHtml($('se-summary'), '');
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
    dom.setHtml($('se-summary'), `<div class="se-summary">
      <div><b>${record(sum.w, sum.l, sum.t)}</b><span>overall</span></div>
      <div><b>${record(sum.aw, sum.al, sum.at)}</b><span>all-play</span></div>
      <div class="${sum.luck > 0.05 ? 'up' : sum.luck < -0.05 ? 'down' : ''}"><b>${signedTenth(sum.luck)}</b><span>wins of luck</span></div>
      <div><b>${sum.in} of ${state.leagues.length}</b><span>in playoff spots</span></div>
    </div>`);
    const block = state.mode === 'path' ? extras().pathBlock : state.mode === 'recap' ? extras().recapBlock : leagueBlock;
    dom.setHtml($('se-body'), state.leagues.map(block).join(''));
  }

  let extrasPane = null;
  const extras = () => {
    extrasPane = extrasPane || NightOwl.seasonExtras.create({ state, render, nameOf, active: () => !!root });
    return extrasPane;
  };

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
    root.querySelector('.se-mode').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-mode]');
      if (!btn || btn.dataset.mode === state.mode) return;
      state.mode = btn.dataset.mode;
      storage.set({ 'season.settings': { draftMethod: state.draftMethod, mode: state.mode } });
      render();
      if (state.mode === 'projected' || state.mode === 'path') runProjections().then(() => state.mode === 'path' && extras().runPaths());
      if (state.mode === 'recap') extras().runRecaps();
    });
    $('se-body').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-method]');
      if (!btn || btn.dataset.method === state.draftMethod) return;
      state.draftMethod = btn.dataset.method;
      storage.set({ 'season.settings': { draftMethod: state.draftMethod, mode: state.mode } });
      // #1-pick odds depend on the method, so projections run again.
      if (state.mode === 'projected') { state.projections.clear(); runProjections(); }
      render();
    });
    $('se-body').addEventListener('toggle', (e) => {
      const id = e.target.dataset && e.target.dataset.id;
      if (!id) return;
      if (e.target.open) state.open.add(id); else state.open.delete(id);
    }, true);
    render();
    if (Date.now() - state.loadedAt > REFRESH_MS / 2) refresh();
    else if (state.mode === 'projected' || state.mode === 'path') runProjections().then(() => state.mode === 'path' && extras().runPaths());
    else if (state.mode === 'recap') extras().runRecaps();
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
