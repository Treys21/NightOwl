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
    for (const lg of leagues) {
      for (let w = lg.raw.next; w < lg.raw.playoffStart; w++) needed.add(w);
      for (const w of projection.playoffWeeks(projection.bracketFormat(lg.playoffTeams, lg.raw.playoffStart, lg.raw.roundType))) needed.add(w);
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

  const activePool = (ro) => {
    const away = new Set([...(ro.reserve || []), ...(ro.taxi || [])]);
    return (ro.players || []).filter((pid) => !away.has(pid));
  };

  const nflSchedule = (seasonYear) => NightOwl.replacement.schedule(seasonYear);

  function valueWeeks(lg, stats, schedule = null) {
    const r = lg.raw;
    const { onBye } = NightOwl.replacement;
    const outIn = projection.availability((pid) => players.info(pid).injury);
    const first = r.inProgress ? r.next + 1 : r.next;
    const out = [];
    const published = Object.keys(stats).filter((w) => stats[w] && Object.keys(stats[w]).length);
    const average = new Map();
    const averageOf = (pid) => {
      if (!average.has(pid)) {
        const rows = published.map((w) => fantasyPoints(stats[w][pid], r.scoring)).filter((p) => p > 0);
        average.set(pid, rows.length >= published.length / 2 ? rows.reduce((a, b) => a + b, 0) / rows.length : 0);
      }
      return average.get(pid);
    };
    const add = (w, weight) => {
      if (!stats[w] || !Object.keys(stats[w]).length) return;
      const injured = outIn(out.length);
      const bye = (pid) => onBye(schedule, players.info(pid).team, w);
      out.push({
        week: w,
        weight,
        projOf: (pid) => (stats[w][pid] ? fantasyPoints(stats[w][pid], r.scoring) : bye(pid) ? 0 : averageOf(pid)),
        isOut: (pid) => injured(pid) || bye(pid),
        bye
      });
    };
    for (let w = first; w < r.playoffStart; w++) add(w, 1);
    const format = projection.bracketFormat(lg.playoffTeams, r.playoffStart, r.roundType);
    for (const w of projection.playoffWeeks(format)) if (w <= LAST_WEEK) add(w, PLAYOFF_WEIGHT);
    return out;
  }

  async function forecastWeeks(lg, { remainingOf, stats, rosters = lg.raw.rosters }) {
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
    return { format, weeks, playoffTeams, rosters };
  }

  async function projectLeague(lg, { remainingOf, stats, rosters = lg.raw.rosters, draftMethod = 'linear', sims = SIMS, forced = null }) {
    const f = await forecastWeeks(lg, { remainingOf, stats, rosters });
    const teams = rosters.map((ro) => {
      const s = ro.settings || {};
      const pf = (s.fpts || 0) + (s.fpts_decimal || 0) / 100;
      const max = (s.ppts || 0) + (s.ppts_decimal || 0) / 100;
      return { rosterId: ro.roster_id, wins: s.wins || 0, losses: s.losses || 0, ties: s.ties || 0, pf, max, efficiency: max ? pf / max : null };
    });
    return projection.projectSeason({
      teams,
      weeks: f.weeks,
      playoff: f.format ? { format: f.format, teams: f.playoffTeams } : null,
      medianGame: lg.medianGame,
      sims,
      seed: season.hash(`${lg.leagueId}:${lg.raw.next}:projected`),
      draft: lg.draft ? { method: draftMethod } : null,
      forced
    });
  }

  NightOwl.model = { SIMS, timeline, schedule, projections, positionsFor, weeksNeeded, remainingByTeam, activePool, nflSchedule, valueWeeks, forecastWeeks, projectLeague };
})(globalThis.NightOwl);
