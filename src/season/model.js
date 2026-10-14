globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, players, storage, season, projection, lineups } = NightOwl;
  const fantasyPoints = NightOwl.scoring.points;

  const PROJECTION_TTL_MS = 6 * 3600000;
  const SIMS = 2000;
  const LAST_WEEK = 18;
  const PLAYOFF_WEIGHT = 1.5;
  const PROJECTION_KEY = (year) => `season.projections.v2.${year}`;

  function timeline(league, rosters, nfl) {
    const s = league.settings || {};
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

  const relevant = (stats) => (stats.pts_ppr || 0) >= 1 || (stats.idp_tkl || 0) >= 1 || (stats.idp_sack || 0) >= 0.1;
  const dropAdp = (stats) => Object.fromEntries(Object.entries(stats).filter(([k]) => !/adp/.test(k)));

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

  function positionsFor(slotLists) {
    return api.positionsFor(slotLists).slice().sort();
  }

  function weeksNeeded(leagues) {
    const needed = new Set();
    for (const league of leagues) {
      for (let w = league.raw.next; w < league.raw.playoffStart; w++) needed.add(w);
      for (const w of projection.playoffWeeks(projection.bracketFormat(league.playoffTeams, league.raw.playoffStart, league.raw.roundType))) needed.add(w);
    }
    return [...needed].filter((w) => w <= LAST_WEEK).sort((a, b) => a - b);
  }

  async function remainingByTeam(seasonYear, week) {
    try {
      const games = lineups.parseGames(await api.kickoffs(seasonYear, week, 'regular'));
      const out = new Map();
      for (const g of games) { out.set(g.home, g.remaining); out.set(g.away, g.remaining); }
      return (team) => (out.has(team) ? out.get(team) : 0);
    } catch {
      return () => 0.5;
    }
  }

  const activePool = (roster) => {
    const away = new Set([...(roster.reserve || []), ...(roster.taxi || [])]);
    return (roster.players || []).filter((playerId) => !away.has(playerId));
  };

  const nflSchedule = (seasonYear) => NightOwl.replacement.schedule(seasonYear);

  function valueWeeks(league, stats, schedule = null) {
    const r = league.raw;
    const { onBye } = NightOwl.replacement;
    const outIn = projection.availability((playerId) => players.info(playerId).injury);
    const first = r.inProgress ? r.next + 1 : r.next;
    const out = [];
    const published = Object.keys(stats).filter((w) => stats[w] && Object.keys(stats[w]).length);
    const average = new Map();
    const averageOf = (playerId) => {
      if (!average.has(playerId)) {
        const rows = published.map((w) => fantasyPoints(stats[w][playerId], r.scoring)).filter((p) => p > 0);
        average.set(playerId, rows.length >= published.length / 2 ? rows.reduce((a, b) => a + b, 0) / rows.length : 0);
      }
      return average.get(playerId);
    };
    const add = (w, weight) => {
      if (!stats[w] || !Object.keys(stats[w]).length) return;
      const injured = outIn(out.length);
      const bye = (playerId) => onBye(schedule, players.info(playerId).team, w);
      out.push({
        week: w,
        weight,
        projOf: (playerId) => (stats[w][playerId] ? fantasyPoints(stats[w][playerId], r.scoring) : bye(playerId) ? 0 : averageOf(playerId)),
        isOut: (playerId) => injured(playerId) || bye(playerId),
        bye
      });
    };
    for (let w = first; w < r.playoffStart; w++) add(w, 1);
    const format = projection.bracketFormat(league.playoffTeams, r.playoffStart, r.roundType);
    for (const w of projection.playoffWeeks(format)) if (w <= LAST_WEEK) add(w, PLAYOFF_WEIGHT);
    return out;
  }

  async function forecastWeeks(league, { remainingOf, stats, rosters = league.raw.rosters }) {
    const r = league.raw;
    const format = projection.bracketFormat(league.playoffTeams, r.playoffStart, r.roundType);
    const future = [];
    for (let w = r.inProgress ? r.next + 1 : r.next; w < r.playoffStart; w++) future.push(w);
    const poWeeks = projection.playoffWeeks(format);
    const sched = await schedule(league.leagueId, r.inProgress ? r.next + 1 : r.next, r.playoffStart);
    const positionsOf = (playerId) => players.info(playerId).positions;
    const outIn = projection.availability((playerId) => players.info(playerId).injury);
    const projOf = (week) => (playerId) => fantasyPoints(stats[week] && stats[week][playerId], r.scoring);
    const pools = new Map(rosters.map((roster) => [roster.roster_id, activePool(roster)]));
    const weekTeams = (week, index) => Object.fromEntries(rosters.map((roster) =>
      [roster.roster_id, projection.teamWeek(r.slots, pools.get(roster.roster_id), projOf(week), positionsOf, outIn(index))]));

    const weeks = [];
    let index = 0;
    if (r.inProgress) {
      const pairs = new Map();
      const teams = {};
      for (const m of r.thisWeek) {
        if (m.matchup_id != null) pairs.set(m.matchup_id, (pairs.get(m.matchup_id) || []).concat(m.roster_id));
        const pp = m.players_points || {};
        const o = season.outlook((m.starters || []).filter((playerId) => playerId && playerId !== '0').map((playerId) => ({
          points: pp[playerId] || 0,
          proj: projOf(r.next)(playerId),
          remaining: remainingOf(players.info(playerId).team)
        })));
        teams[m.roster_id] = { mean: o.mean, variance: o.variance, lineupSet: true };
      }
      weeks.push({ week: r.next, pairs: [...pairs.values()].filter((p) => p.length === 2), teams });
      index++;
    }
    future.forEach((w, i) => weeks.push({ week: w, pairs: sched[i] || [], teams: weekTeams(w, index + i) }));
    const playoffTeams = {};
    poWeeks.forEach((w, i) => { playoffTeams[w] = weekTeams(w, index + future.length + i); });
    return { format, weeks, playoffTeams, rosters };
  }

  async function projectLeague(league, { remainingOf, stats, rosters = league.raw.rosters, draftMethod = 'linear', sims = SIMS, forced = null }) {
    const f = await forecastWeeks(league, { remainingOf, stats, rosters });
    const teams = rosters.map((roster) => {
      const s = roster.settings || {};
      const pf = (s.fpts || 0) + (s.fpts_decimal || 0) / 100;
      const max = (s.ppts || 0) + (s.ppts_decimal || 0) / 100;
      return { rosterId: roster.roster_id, wins: s.wins || 0, losses: s.losses || 0, ties: s.ties || 0, pf, max, efficiency: max ? pf / max : null };
    });
    return projection.projectSeason({
      teams,
      weeks: f.weeks,
      playoff: f.format ? { format: f.format, teams: f.playoffTeams } : null,
      medianGame: league.medianGame,
      sims,
      seed: season.hash(`${league.leagueId}:${league.raw.next}:projected`),
      draft: league.draft ? { method: draftMethod } : null,
      forced
    });
  }

  NightOwl.model = { SIMS, timeline, schedule, projections, positionsFor, weeksNeeded, remainingByTeam, activePool, nflSchedule, valueWeeks, forecastWeeks, projectLeague };
})(globalThis.NightOwl);
