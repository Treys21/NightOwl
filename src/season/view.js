globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, players, storage, account, dom, season, projection, model } = NightOwl;
  const { isPlaying, mine: rosterOf, ownerNames, displayWeek } = NightOwl.leagues;
  const { escape: escapeHtml, short: shortNumber, tenths, percent } = NightOwl.format;

  const REFRESH_MS = 10 * 60000;
  const LIVE_REFRESH_MS = 2 * 60000;
  const KEEPS_PLAYERS = new Set([1, 2]);
  const SIMS = model.SIMS;

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
      const keeps = KEEPS_PLAYERS.has(league.settings && league.settings.type);
      const [rosters, users, traded] = await Promise.all([
        api.rosters(league.league_id),
        api.users(league.league_id),
        keeps ? api.tradedPicks(league.league_id).catch(() => []) : Promise.resolve([])
      ]);
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
        draft: keeps ? {
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

  const ordinal = (number) => {
    const tail = number % 100 >= 11 && number % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[number % 10] || 'th');
    return `${number}${tail}`;
  };
  const record = (wins, losses, ties) => `${wins}–${losses}${ties ? `–${ties}` : ''}`;
  const signedTenth = (value) => { const rounded = Math.round(value * 10) / 10; return rounded === 0 ? '0' : `${rounded > 0 ? '+' : '−'}${shortNumber(Math.abs(rounded))}`; };
  const oddsLabel = (probability) => (probability >= 0.995 ? '>99%' : probability > 0 && probability < 0.005 ? '<1%' : percent(probability));

  function table(league) {
    const cut = league.playoffTeams;
    return `<table class="se-table se-standings">
      <thead><tr><th>#</th><th>Team</th><th title="Wins-losses">Record</th><th title="Record if you played every team every week">All-play</th><th title="Points for">PF</th><th title="Wins above what your scores earned">Luck</th><th title="Power rating, 0–100: record 35%, points per week 35%, steadiness 15%, last 3 weeks 15%">Power</th>${league.rows.some((row) => row.playoffOdds != null) ? '<th title="Chance to make the playoffs">Playoffs</th>' : ''}</tr></thead>
      <tbody>${league.rows.map((row) => `
        <tr class="${row === league.me ? 'me' : ''}${cut && row.rank === cut ? ' cut' : ''}">
          <td>${row.rank}</td>
          <td class="se-team">${escapeHtml(row.name)}</td>
          <td>${record(row.wins, row.losses, row.ties)}</td>
          <td>${record(row.allPlay.w, row.allPlay.l, row.allPlay.t)}</td>
          <td>${shortNumber(row.pf)}</td>
          <td class="${row.luck > 0 ? 'up' : row.luck < 0 ? 'down' : ''}">${row.luck == null ? '–' : `${row.luck > 0 ? '+' : row.luck < 0 ? '−' : ''}${shortNumber(Math.abs(row.luck))}`}</td>
          <td>${row.power == null ? '–' : Math.round(row.power)}</td>
          ${row.playoffOdds == null ? '' : `<td>${oddsLabel(row.playoffOdds)}</td>`}
        </tr>`).join('')}</tbody>
    </table>${notes(league)}`;
  }

  function notes(league) {
    const parts = [];
    if (league.playoffTeams) parts.push(`Line under ${ordinal(league.playoffTeams)}: playoff cut.`);
    if (league.live) parts.push(`Week ${league.live} counts as if it ended now.`);
    return parts.length ? `<p class="muted small se-note">${parts.join(' ')}</p>` : '';
  }

  const METHODS = {
    linear: { label: 'Linear', blurb: 'Gaps count in proportion to their size.' },
    inverse: { label: 'Inverse', blurb: 'The worst teams pull far ahead; small gaps near the top barely count.' }
  };
  const pickLabel = (round, slot) => `${round}.${String(slot).padStart(2, '0')}`;

  function draftPicks(league) {
    return season.draftOrder(
      league.rows.map((row) => ({ rosterId: row.rosterId, wins: row.wins + row.ties / 2, max: row.max || 0, row: row })),
      { method: state.draftMethod }
    );
  }

  function myPicks(league, picks) {
    const mine = league.me.rosterId;
    const out = [];
    for (let round = 1; round <= league.draft.rounds; round++) {
      for (const pick of picks) if (league.draft.owner(round, pick.rosterId) === mine) out.push(pickLabel(round, pick.pick));
    }
    return out;
  }

  function draftBlock(league) {
    if (!league.draft) return '';
    const picks = draftPicks(league);
    const byRoster = new Map(league.rows.map((row) => [row.rosterId, row]));
    const held = myPicks(league, picks);
    const weight = Math.round(season.DRAFT_WIN_WEIGHT * 100);
    return `<section class="se-draft">
      <div class="se-draft-head">
        <div><b>${league.draft.season} draft order</b><span class="muted small">${league.live ? 'live, ' : ''}if the season ended now</span></div>
        <div class="tabs" role="group" aria-label="Draft order method">${Object.entries(METHODS).map(([key, method]) => `
          <button type="button" class="tab${state.draftMethod === key ? ' on' : ''}" data-method="${key}" aria-pressed="${state.draftMethod === key}" title="${escapeHtml(method.blurb)}">${method.label}</button>`).join('')}
        </div>
      </div>
      <table class="se-table se-draft-table">
        <thead><tr><th title="Round 1 pick">Pick</th><th>Team</th><th title="Wins">W</th><th title="Max points: best possible lineup every week">Max PF</th><th title="${weight}% wins, ${100 - weight}% max points; higher picks earlier">Score</th></tr></thead>
        <tbody>${picks.map((pick) => {
          const holder = league.draft.owner(1, pick.rosterId);
          const traded = holder !== pick.rosterId ? byRoster.get(holder) : null;
          return `<tr class="${holder === league.me.rosterId ? 'me' : ''}">
            <td>${pickLabel(1, pick.pick)}</td>
            <td class="se-team">${escapeHtml(pick.row.name)}${traded ? `<span class="se-via" title="Pick traded to ${escapeHtml(traded.name)}">→ ${escapeHtml(traded.name)}</span>` : ''}</td>
            <td>${shortNumber(pick.wins)}</td>
            <td>${pick.max ? tenths(pick.max) : '–'}</td>
            <td>${pick.score.toFixed(3)}</td>
          </tr>`;
        }).join('')}</tbody>
      </table>
      <p class="muted small se-note">${weight}% wins + ${100 - weight}% max points, worst first. ${escapeHtml(METHODS[state.draftMethod].blurb)}
        ${held.length ? `You hold <b>${held.join(', ')}</b>.` : `You hold no ${league.draft.season} picks.`}</p>
    </section>`;
  }

  const kpi = (value, label, { tone = '', title = '' } = {}) =>
    `<div class="se-kpi ${tone}"${title ? ` title="${escapeHtml(title)}"` : ''}><b>${value}</b><span>${label}</span></div>`;

  function firstsKpi(league) {
    const firsts = draftPicks(league).filter((pick) => league.draft.owner(1, pick.rosterId) === league.me.rosterId).map((pick) => pickLabel(1, pick.pick));
    return kpi(firsts.length ? firsts.join(', ') : 'Traded', `${league.draft.season} 1st`, {
      title: `Round 1 picks you hold, by the projected ${league.draft.season} draft order`
    });
  }

  const projRecord = (wins, losses) => `${shortNumber(Math.round(wins * 10) / 10)}–${shortNumber(Math.round(losses * 10) / 10)}`;
  const nameOf = (league, rosterId) => {
    const row = league.rows.find((row) => row.rosterId === rosterId);
    return row ? row.name : `Team ${rosterId}`;
  };

  const TOP_PICKS = 3;
  const firstPickOdds = (team) => (team.pickOdds ? team.pickOdds[0] : 0);
  const topThreePickOdds = (team) => (team.pickOdds ? team.pickOdds.slice(0, TOP_PICKS).reduce((total, odds) => total + odds, 0) : 0);

  function projectedTable(league, projected) {
    const cut = league.playoffTeams;
    const byes = projected.bracket && projected.bracket.rounds[0].matches.some((match) => !match.bottom);
    const showsDraftOdds = !!league.draft && projected.order.some((rosterId) => projected.teams[rosterId].pickOdds);
    return `<table class="se-table se-standings se-projected">
      <thead><tr><th title="Projected finish: average place across ${SIMS.toLocaleString()} simulated seasons">#</th><th>Team</th><th title="Projected final record (average across simulations)">Record</th><th title="Projected points for at season's end">PF</th>${cut ? '<th title="Chance to make the playoffs">Playoffs</th>' : ''}${byes ? '<th class="se-opt" title="Chance of a first-round bye">Bye</th>' : ''}${projected.bracket ? '<th title="Chance to win the championship">Title</th><th class="se-opt" title="Chance of losing the first playoff round">1st-round exit</th><th class="se-opt" title="Chance of winning the third-place game">3rd place</th>' : ''}${showsDraftOdds ? '<th class="se-opt" title="Chance of the first overall pick">#1 pick</th><th class="se-opt" title="Chance of a top-3 pick">Top 3</th>' : ''}</tr></thead>
      <tbody>${projected.order.map((rosterId, i) => {
        const team = projected.teams[rosterId];
        return `<tr class="${rosterId === league.me.rosterId ? 'me' : ''}${cut && i + 1 === cut ? ' cut' : ''}">
          <td>${i + 1}</td>
          <td class="se-team">${escapeHtml(nameOf(league, rosterId))}</td>
          <td>${projRecord(team.wins, team.losses)}</td>
          <td>${shortNumber(Math.round(team.pf))}</td>
          ${cut ? `<td>${oddsLabel(team.playoffOdds)}</td>` : ''}
          ${byes ? `<td class="se-opt">${oddsLabel(team.byeOdds)}</td>` : ''}
          ${projected.bracket ? `<td>${oddsLabel(team.titleOdds)}</td><td class="se-opt">${oddsLabel(team.firstRoundExitOdds)}</td><td class="se-opt">${oddsLabel(team.thirdPlaceOdds)}</td>` : ''}
          ${showsDraftOdds ? `<td class="se-opt">${oddsLabel(firstPickOdds(team))}</td><td class="se-opt">${oddsLabel(topThreePickOdds(team))}</td>` : ''}
        </tr>`;
      }).join('')}</tbody>
    </table>
    <p class="muted small se-note">${league.raw.inProgress ? `Week ${league.raw.next} so far, then ` : ''}each team's best projected lineup every week through the playoffs, played out ${SIMS.toLocaleString()} times on the real schedule${league.medianGame ? ', median games included' : ''}. Records are averages.</p>`;
  }

  function projectedDraftBlock(league, projected) {
    if (!league.draft) return '';
    const picks = projection.projectedDraft(projected, { method: state.draftMethod });
    const weight = Math.round(season.DRAFT_WIN_WEIGHT * 100);
    const held = [];
    for (let round = 1; round <= league.draft.rounds; round++) {
      for (const pick of picks) if (league.draft.owner(round, pick.rosterId) === league.me.rosterId) held.push(pickLabel(round, pick.pick));
    }
    return `<section class="se-draft">
      <div class="se-draft-head">
        <div><b>${league.draft.season} draft order</b><span class="muted small">projected, end of season</span></div>
        <div class="tabs" role="group" aria-label="Draft order method">${Object.entries(METHODS).map(([key, method]) => `
          <button type="button" class="tab${state.draftMethod === key ? ' on' : ''}" data-method="${key}" aria-pressed="${state.draftMethod === key}" title="${escapeHtml(method.blurb)}">${method.label}</button>`).join('')}
        </div>
      </div>
      <table class="se-table se-draft-table">
        <thead><tr><th title="Round 1 pick">Pick</th><th>Team</th><th title="Projected final wins">W</th><th title="Projected max points at season's end">Max PF</th><th title="Chance of the first overall pick">#1</th><th title="Chance of a top-3 pick">Top 3</th></tr></thead>
        <tbody>${picks.map((pick) => {
          const holder = league.draft.owner(1, pick.rosterId);
          const traded = holder !== pick.rosterId ? nameOf(league, holder) : null;
          return `<tr class="${holder === league.me.rosterId ? 'me' : ''}">
            <td>${pickLabel(1, pick.pick)}</td>
            <td class="se-team">${escapeHtml(nameOf(league, pick.rosterId))}${traded ? `<span class="se-via" title="Pick traded to ${escapeHtml(traded)}">→ ${escapeHtml(traded)}</span>` : ''}</td>
            <td>${shortNumber(Math.round(pick.wins * 10) / 10)}</td>
            <td>${tenths(pick.max)}</td>
            <td>${pick.odds ? oddsLabel(pick.odds[0]) : '–'}</td>
            <td>${pick.odds ? oddsLabel(topThreePickOdds({ pickOdds: pick.odds })) : '–'}</td>
          </tr>`;
        }).join('')}</tbody>
      </table>
      <p class="muted small se-note">${weight}% wins + ${100 - weight}% max points on projected final numbers, worst first.
        ${held.length ? `You'd hold <b>${held.join(', ')}</b>.` : `You hold no ${league.draft.season} picks.`}</p>
    </section>`;
  }

  function bracketBlock(league, projected) {
    if (!projected.bracket) return '';
    const side = (entrant, chance) => (entrant
      ? `<div class="se-slot${entrant.rosterId === league.me.rosterId ? ' me' : ''}"><span class="se-seed">${entrant.seed}</span><span class="se-bteam">${escapeHtml(nameOf(league, entrant.rosterId))}</span><span class="se-bpts">${tenths(entrant.points)}</span><span class="se-bodds">${chance}</span></div>`
      : '<div class="se-slot bye"><span class="se-seed"></span><span class="se-bteam muted">Bye</span></div>');
    const champ = projected.bracket.champion;
    return `<section class="se-bracket">
      <div class="se-draft-head"><div><b>Projected playoffs</b><span class="muted small">favorites advance; % to win each game</span></div></div>
      <div class="se-rounds">${projected.bracket.rounds.map((round) => `
        <div class="se-round${round.matches.length === 1 ? ' solo' : ''}">
          <div class="se-round-h">${round.label}<span class="muted"> · Wk ${round.weeks.join('–')}</span></div>
          ${round.matches.map((match) => `<div class="se-match">
            ${side(match.top, match.bottom ? percent(match.pTop) : '')}
            ${match.bottom ? side(match.bottom, percent(1 - match.pTop)) : side(null)}
          </div>`).join('')}
        </div>`).join('')}
      </div>
      ${champ ? `<p class="muted small se-note">Projected champion: <b>${escapeHtml(nameOf(league, champ.rosterId))}</b> (${oddsLabel(projected.teams[champ.rosterId].titleOdds)} to win it all).${projected.teams[league.me.rosterId] ? ` You: ${oddsLabel(projected.teams[league.me.rosterId].titleOdds)}.` : ''}</p>` : ''}
    </section>`;
  }

  function projectedKpis(league, projected) {
    const myProjection = projected.teams[league.me.rosterId];
    const place = projected.order.indexOf(league.me.rosterId) + 1;
    const picks = league.draft ? projection.projectedDraft(projected, { method: state.draftMethod }) : null;
    const firsts = picks ? picks.filter((pick) => league.draft.owner(1, pick.rosterId) === league.me.rosterId).map((pick) => pickLabel(1, pick.pick)) : null;
    return `<div class="se-kpis">
      ${kpi(projRecord(myProjection.wins, myProjection.losses), `proj. · ${ordinal(place)}`, { title: 'Projected final record and finish' })}
      ${league.playoffTeams ? kpi(oddsLabel(myProjection.playoffOdds), 'playoffs', { tone: myProjection.playoffOdds >= 0.5 ? 'up' : 'down', title: `Chance to make the playoffs, from ${SIMS.toLocaleString()} projected seasons` }) : kpi(shortNumber(Math.round(myProjection.pf)), 'proj. PF')}
      ${projected.bracket ? kpi(oddsLabel(myProjection.titleOdds), 'title', { tone: myProjection.titleOdds >= 1 / league.rows.length ? 'up' : '', title: 'Chance to win the championship' }) : kpi(shortNumber(Math.round(myProjection.max)), 'proj. max')}
      ${firsts ? kpi(firsts.length ? firsts.join(', ') : 'Traded', `${league.draft.season} 1st`, { title: 'Round 1 picks you hold, by the projected end-of-season order' }) : kpi(oddsLabel(myProjection.byeOdds), 'bye', { title: 'Chance of a first-round bye' })}
    </div>`;
  }

  function leagueBlock(league) {
    const myTeam = league.me;
    const projectedLeague = state.mode === 'projected' ? state.projections.get(league.leagueId) : null;
    const projected = projectedLeague && !projectedLeague.error;
    const place = projected ? projectedLeague.order.indexOf(myTeam.rosterId) + 1 : myTeam.rank;
    const inPlayoffs = league.playoffTeams && place <= league.playoffTeams;
    const luck = myTeam.luck == null ? '–' : signedTenth(myTeam.luck);
    let body;
    if (state.mode !== 'projected') body = `${table(league)}${draftBlock(league)}`;
    else if (league.raw.next >= league.raw.playoffStart) body = `<p class="muted small se-note">The regular season is over; nothing left to project.</p>${table(league)}${draftBlock(league)}`;
    else if (!projectedLeague) body = '<div class="skel" role="status" aria-label="Projecting the rest of the season"><i></i><i></i><i></i></div>';
    else if (projectedLeague.error) body = `<p class="error">Couldn't project this league: ${escapeHtml(projectedLeague.error)}</p>`;
    else body = `${projectedTable(league, projectedLeague)}${bracketBlock(league, projectedLeague)}${projectedDraftBlock(league, projectedLeague)}`;
    return `<details class="se-league" data-id="${escapeHtml(league.leagueId)}"${state.open.has(league.leagueId) ? ' open' : ''}>
      <summary>
        <div class="se-head">
          <span class="se-name">${escapeHtml(league.name)}</span>
          <span class="se-rank${inPlayoffs ? ' in' : ''}" title="${projected ? 'Projected finish' : inPlayoffs ? 'In a playoff spot' : 'Outside the playoff spots'}">${projected ? 'proj. ' : ''}${ordinal(place)} of ${league.rows.length}</span>
        </div>
        ${projected ? projectedKpis(league, projectedLeague) : `<div class="se-kpis">
          ${kpi(record(myTeam.wins, myTeam.losses, myTeam.ties), league.medianGame ? 'incl. median' : 'record', { title: league.medianGame ? 'This league also plays the league median every week' : '' })}
          ${myTeam.playoffOdds == null
            ? kpi(record(myTeam.allPlay.w, myTeam.allPlay.l, myTeam.allPlay.t), 'all-play', { title: 'Your record if you played every team every week' })
            : kpi(oddsLabel(myTeam.playoffOdds), 'playoffs', { tone: myTeam.playoffOdds >= 0.5 ? 'up' : 'down', title: 'Chance to make the playoffs, from 2,000 simulations' })}
          ${kpi(luck, Math.abs(myTeam.luck) === 1 ? 'win of luck' : 'wins of luck', { tone: myTeam.luck > 0 ? 'up' : myTeam.luck < 0 ? 'down' : '', title: 'Wins above what your weekly scores earned' })}
          ${league.draft ? firstsKpi(league) : kpi(myTeam.efficiency == null ? '–' : percent(myTeam.efficiency), 'of max points', { title: 'Points scored out of the best lineup you could have set' })}
        </div>`}
      </summary>
      ${body}
    </details>`;
  }

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
    elementById('se-body').addEventListener('toggle', (event) => {
      const leagueId = event.target.dataset && event.target.dataset.id;
      if (!leagueId) return;
      if (event.target.open) state.open.add(leagueId); else state.open.delete(leagueId);
    }, true);
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
