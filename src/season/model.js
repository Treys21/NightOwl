// Everything the Season and Moves tools share to play out the rest of the
// season: where each league stands on the calendar, the remaining schedule,
// weekly projections, and the simulation fed from them. Fetches and caches;
// the math is in season/core.js, season/project.js and season/value.js.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, players, storage, season, projection, lineups } = NightOwl;
  const fantasyPoints = NightOwl.scoring.points;

  const PROJECTION_TTL_MS = 6 * 3600000; // weekly projections, per week
  const SIMS = 2000;
  const LAST_WEEK = 18;
  // A title is won in the playoff weeks, so a player's points there count extra when pricing a roster move.
  const PLAYOFF_WEIGHT = 1.5;
  const PROJECTION_KEY = (year) => `season.projections.v2.${year}`;

  /**
   * Where a league is on the calendar. Finished weeks are the ones in Sleeper's
   * records (wins, points, max points), which can lag the NFL calendar by a day
   * or so. The next week is live once it has points.
   * -> { start, playoffStart, playoffTeams, medianGame, recorded, finished: [week], next, inProgress }
   */
  function timeline(lg, rosters, nfl) {
    const s = lg.settings || {};
    const start = s.start_week || 1;
    const playoffStart = s.playoff_week_start || 15;
    const medianGame = !!s.league_average_match;
    const recorded = season.weeksRecorded(rosters, { medianGame });
    const finished = [];
    for (let w = start; w < start + recorded && w < playoffStart; w++) finished.push(w);
    const next = start + recorded;
    return {
      start, playoffStart, medianGame, recorded, finished, next,
      playoffTeams: s.playoff_teams || 0,
      inProgress: next <= nfl.week && next < playoffStart
    };
  }

  // The rest of the regular season's pairings ([[rosterA, rosterB], ...] per
  // week). Sleeper publishes the whole schedule up front, so it's cached.
  async function schedule(leagueId, fromWeek, untilWeek) {
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

  // A row worth keeping: a real projection. Everything below a point (and the
  // thousands of deep-bench rows) is noise and most of the payload.
  const relevant = (stats) => (stats.pts_ppr || 0) >= 1 || (stats.idp_tkl || 0) >= 1 || (stats.idp_sack || 0) >= 0.1;
  const dropAdp = (stats) => Object.fromEntries(Object.entries(stats).filter(([k]) => !/adp/.test(k)));

  /**
   * Weekly projections for every relevant player, cached for a few hours:
   * { week: { pid: stats } }. About 100 KB a week once trimmed.
   */
  async function projections(seasonYear, weeks, positions) {
    const key = PROJECTION_KEY(seasonYear);
    const cached = await storage.get(key, {});
    const fresh = (w) => cached[w] && Date.now() - cached[w].at < PROJECTION_TTL_MS && positions.every((p) => cached[w].positions.includes(p));
    const missing = weeks.filter((w) => !fresh(w));
    const fetched = await Promise.all(missing.map((w) => api.weekProjections(seasonYear, w, 'regular', positions).then((rows) => [w, rows])));
    for (const [w, rows] of fetched) {
      const stats = {};
      for (const r of rows || []) if (r.stats && relevant(r.stats)) stats[r.player_id] = dropAdp(r.stats);
      cached[w] = { at: Date.now(), positions, stats };
    }
    if (fetched.length) await storage.set({ [key]: cached });
    return Object.fromEntries(weeks.map((w) => [w, (cached[w] && cached[w].stats) || {}]));
  }

  /** Positions to request projections for: offense, plus IDP when some league starts them. */
  function positionsFor(slotLists) {
    return api.positionsFor(slotLists).slice().sort();
  }

  /** Weeks to project for a set of leagues: every week still to play, through the playoffs. */
  function weeksNeeded(leagues) {
    const needed = new Set();
    for (const lg of leagues) {
      for (let w = lg.raw.next; w < lg.raw.playoffStart; w++) needed.add(w);
      for (const w of projection.playoffWeeks(projection.bracketFormat(lg.playoffTeams, lg.raw.playoffStart, lg.raw.roundType))) needed.add(w);
    }
    return [...needed].filter((w) => w <= LAST_WEEK).sort((a, b) => a - b);
  }

  // Share of each team's game left this week (1 before kickoff, 0 when final).
  async function remainingByTeam(seasonYear, week) {
    try {
      const games = lineups.parseGames(await api.kickoffs(seasonYear, week, 'regular'));
      const out = new Map();
      for (const g of games) { out.set(g.home, g.remaining); out.set(g.away, g.remaining); }
      return (team) => (out.has(team) ? out.get(team) : 0); // no game: bye
    } catch {
      return () => 0.5; // ESPN unreachable: call every game half played
    }
  }

  // Players who can play: the roster minus injured reserve and the taxi squad.
  const activePool = (ro) => {
    const away = new Set([...(ro.reserve || []), ...(ro.taxi || [])]);
    return (ro.players || []).filter((pid) => !away.has(pid));
  };

  /**
   * One entry per remaining week for the value engine (season/value.js): the
   * regular season still to play, then the playoff weeks (weighted extra):
   * projected points under the league's scoring, and who is out. Index 0 is the
   * next week to play (the one in progress counts as played: it has real lineups).
   */
  function valueWeeks(lg, stats) {
    const r = lg.raw;
    const outIn = projection.availability((pid) => players.info(pid).injury);
    const first = r.inProgress ? r.next + 1 : r.next;
    const out = [];
    const add = (w, weight) => out.push({ week: w, weight, projOf: (pid) => fantasyPoints(stats[w] && stats[w][pid], r.scoring), isOut: outIn(out.length) });
    for (let w = first; w < r.playoffStart; w++) add(w, 1);
    const format = projection.bracketFormat(lg.playoffTeams, r.playoffStart, r.roundType);
    for (const w of projection.playoffWeeks(format)) if (w <= LAST_WEEK && stats[w]) add(w, PLAYOFF_WEIGHT);
    return out;
  }

  /**
   * Simulate the rest of the league's season.
   *   lg        { leagueId, playoffTeams, medianGame, draft, raw }
   *   remainingOf / stats   from remainingByTeam and projections
   *   rosters   play the season with these rosters instead of the real ones
   *             (a trade, say)
   *   draftMethod   for #1-pick odds, when the league has a draft to project
   */
  async function projectLeague(lg, { remainingOf, stats, rosters = lg.raw.rosters, draftMethod = 'linear', sims = SIMS }) {
    const r = lg.raw;
    const format = projection.bracketFormat(lg.playoffTeams, r.playoffStart, r.roundType);
    const future = [];
    for (let w = r.inProgress ? r.next + 1 : r.next; w < r.playoffStart; w++) future.push(w);
    const poWeeks = projection.playoffWeeks(format);
    const sched = await schedule(lg.leagueId, r.inProgress ? r.next + 1 : r.next, r.playoffStart);
    const positionsOf = (pid) => players.info(pid).positions;
    const outIn = projection.availability((pid) => players.info(pid).injury);
    const projOf = (week) => (pid) => fantasyPoints(stats[week] && stats[week][pid], r.scoring);
    const pools = new Map(rosters.map((ro) => [ro.roster_id, activePool(ro)]));
    const weekTeams = (week, index) => Object.fromEntries(rosters.map((ro) =>
      [ro.roster_id, projection.teamWeek(r.slots, pools.get(ro.roster_id), projOf(week), positionsOf, outIn(index))]));

    const weeks = [];
    let index = 0;
    if (r.inProgress) {
      // The real starters: points so far plus what's left of their games.
      const pairs = new Map();
      const teams = {};
      for (const m of r.thisWeek) {
        if (m.matchup_id != null) pairs.set(m.matchup_id, (pairs.get(m.matchup_id) || []).concat(m.roster_id));
        const pp = m.players_points || {};
        const o = season.outlook((m.starters || []).filter((pid) => pid && pid !== '0').map((pid) => ({
          points: pp[pid] || 0,
          proj: projOf(r.next)(pid),
          remaining: remainingOf(players.info(pid).team)
        })));
        teams[m.roster_id] = { mean: o.mean, variance: o.variance, lineupSet: true };
      }
      weeks.push({ week: r.next, pairs: [...pairs.values()].filter((p) => p.length === 2), teams });
      index++;
    }
    future.forEach((w, i) => weeks.push({ week: w, pairs: sched[i] || [], teams: weekTeams(w, index + i) }));
    const playoffTeams = {};
    poWeeks.forEach((w, i) => { playoffTeams[w] = weekTeams(w, index + future.length + i); });

    const teams = rosters.map((ro) => {
      const s = ro.settings || {};
      const pf = (s.fpts || 0) + (s.fpts_decimal || 0) / 100;
      const max = (s.ppts || 0) + (s.ppts_decimal || 0) / 100;
      return { rosterId: ro.roster_id, wins: s.wins || 0, losses: s.losses || 0, ties: s.ties || 0, pf, max, efficiency: max ? pf / max : null };
    });
    return projection.projectSeason({
      teams,
      weeks,
      playoff: format ? { format, teams: playoffTeams } : null,
      medianGame: lg.medianGame,
      sims,
      seed: season.hash(`${lg.leagueId}:${r.next}:projected`),
      draft: lg.draft ? { method: draftMethod } : null
    });
  }

  NightOwl.model = { SIMS, timeline, schedule, projections, positionsFor, weeksNeeded, remainingByTeam, activePool, valueWeeks, projectLeague };
})(globalThis.NightOwl);
