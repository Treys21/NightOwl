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
    const leagueSettings = league.settings || {};
    const start = leagueSettings.start_week || 1;
    const playoffStart = leagueSettings.playoff_week_start || 15;
    const medianGame = !!leagueSettings.league_average_match;
    const recorded = season.weeksRecorded(rosters, { medianGame });
    const finished = [];
    for (let week = start; week < start + recorded && week < playoffStart; week++) finished.push(week);
    const next = start + recorded;
    return {
      start, playoffStart, medianGame, recorded, finished, next,
      playoffTeams: leagueSettings.playoff_teams || 0,
      inProgress: next <= nfl.week && next < playoffStart
    };
  }

  async function schedule(leagueId, fromWeek, untilWeek) {
    const key = `season.schedule.${leagueId}`;
    const cached = await storage.get(key, {});
    const weeks = [];
    for (let week = fromWeek; week < untilWeek; week++) weeks.push(week);
    const missing = weeks.filter((week) => !cached[week]);
    const fetched = await Promise.all(missing.map((week) => api.matchups(leagueId, week).then((result) => [week, result])));
    for (const [week, matchups] of fetched) {
      const byMatch = new Map();
      for (const matchup of matchups || []) {
        if (matchup.matchup_id == null) continue;
        if (!byMatch.has(matchup.matchup_id)) byMatch.set(matchup.matchup_id, []);
        byMatch.get(matchup.matchup_id).push(matchup.roster_id);
      }
      cached[week] = [...byMatch.values()].filter((pair) => pair.length === 2);
    }
    if (fetched.length) await storage.set({ [key]: cached });
    return weeks.map((week) => cached[week] || []);
  }

  const relevant = (stats) => (stats.pts_ppr || 0) >= 1 || (stats.idp_tkl || 0) >= 1 || (stats.idp_sack || 0) >= 0.1;
  const dropAdp = (stats) => Object.fromEntries(Object.entries(stats).filter(([k]) => !/adp/.test(k)));

  async function projections(seasonYear, weeks, positions) {
    const key = PROJECTION_KEY(seasonYear);
    const cached = await storage.get(key, {});
    const fresh = (week) => cached[week] && Date.now() - cached[week].at < PROJECTION_TTL_MS && positions.every((position) => cached[week].positions.includes(position));
    const missing = weeks.filter((week) => !fresh(week));
    const fetched = await Promise.all(missing.map((week) => api.weekProjections(seasonYear, week, 'regular', positions).then((rows) => [week, rows])));
    for (const [week, rows] of fetched) {
      const stats = {};
      for (const row of rows || []) if (row.stats && relevant(row.stats)) stats[row.player_id] = dropAdp(row.stats);
      cached[week] = { at: Date.now(), positions, stats };
    }
    if (fetched.length) await storage.set({ [key]: cached });
    return Object.fromEntries(weeks.map((week) => [week, (cached[week] && cached[week].stats) || {}]));
  }

  function positionsFor(slotLists) {
    return api.positionsFor(slotLists).slice().sort();
  }

  function weeksNeeded(leagues) {
    const needed = new Set();
    for (const league of leagues) {
      for (let week = league.raw.next; week < league.raw.playoffStart; week++) needed.add(week);
      for (const week of projection.playoffWeeks(projection.bracketFormat(league.playoffTeams, league.raw.playoffStart, league.raw.roundType))) needed.add(week);
    }
    return [...needed].filter((week) => week <= LAST_WEEK).sort((a, b) => a - b);
  }

  async function remainingByTeam(seasonYear, week) {
    try {
      const games = lineups.parseGames(await api.kickoffs(seasonYear, week, 'regular'));
      const out = new Map();
      for (const game of games) { out.set(game.home, game.remaining); out.set(game.away, game.remaining); }
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
    const leagueData = league.raw;
    const { onBye } = NightOwl.replacement;
    const outIn = projection.availability((playerId) => players.info(playerId).injury);
    const first = leagueData.inProgress ? leagueData.next + 1 : leagueData.next;
    const out = [];
    const published = Object.keys(stats).filter((week) => stats[week] && Object.keys(stats[week]).length);
    const average = new Map();
    const averageOf = (playerId) => {
      if (!average.has(playerId)) {
        const rows = published.map((week) => fantasyPoints(stats[week][playerId], leagueData.scoring)).filter((points) => points > 0);
        average.set(playerId, rows.length >= published.length / 2 ? rows.reduce((total, row) => total + row, 0) / rows.length : 0);
      }
      return average.get(playerId);
    };
    const add = (week, weight) => {
      if (!stats[week] || !Object.keys(stats[week]).length) return;
      const injured = outIn(out.length);
      const bye = (playerId) => onBye(schedule, players.info(playerId).team, week);
      out.push({
        week: week,
        weight,
        projOf: (playerId) => (stats[week][playerId] ? fantasyPoints(stats[week][playerId], leagueData.scoring) : bye(playerId) ? 0 : averageOf(playerId)),
        isOut: (playerId) => injured(playerId) || bye(playerId),
        bye
      });
    };
    for (let week = first; week < leagueData.playoffStart; week++) add(week, 1);
    const format = projection.bracketFormat(league.playoffTeams, leagueData.playoffStart, leagueData.roundType);
    for (const week of projection.playoffWeeks(format)) if (week <= LAST_WEEK) add(week, PLAYOFF_WEIGHT);
    return out;
  }

  async function forecastWeeks(league, { remainingOf, stats, rosters = league.raw.rosters }) {
    const leagueData = league.raw;
    const format = projection.bracketFormat(league.playoffTeams, leagueData.playoffStart, leagueData.roundType);
    const future = [];
    for (let week = leagueData.inProgress ? leagueData.next + 1 : leagueData.next; week < leagueData.playoffStart; week++) future.push(week);
    const poWeeks = projection.playoffWeeks(format);
    const weeklySchedule = await schedule(league.leagueId, leagueData.inProgress ? leagueData.next + 1 : leagueData.next, leagueData.playoffStart);
    const positionsOf = (playerId) => players.info(playerId).positions;
    const outIn = projection.availability((playerId) => players.info(playerId).injury);
    const projOf = (week) => (playerId) => fantasyPoints(stats[week] && stats[week][playerId], leagueData.scoring);
    const pools = new Map(rosters.map((roster) => [roster.roster_id, activePool(roster)]));
    const weekTeams = (week, index) => Object.fromEntries(rosters.map((roster) =>
      [roster.roster_id, projection.teamWeek(leagueData.slots, pools.get(roster.roster_id), projOf(week), positionsOf, outIn(index))]));

    const weeks = [];
    let index = 0;
    if (leagueData.inProgress) {
      const pairs = new Map();
      const teams = {};
      for (const matchup of leagueData.thisWeek) {
        if (matchup.matchup_id != null) pairs.set(matchup.matchup_id, (pairs.get(matchup.matchup_id) || []).concat(matchup.roster_id));
        const playersPoints = matchup.players_points || {};
        const matchupOutlook = season.outlook((matchup.starters || []).filter((playerId) => playerId && playerId !== '0').map((playerId) => ({
          points: playersPoints[playerId] || 0,
          proj: projOf(leagueData.next)(playerId),
          remaining: remainingOf(players.info(playerId).team)
        })));
        teams[matchup.roster_id] = { mean: matchupOutlook.mean, variance: matchupOutlook.variance, lineupSet: true };
      }
      weeks.push({ week: leagueData.next, pairs: [...pairs.values()].filter((pair) => pair.length === 2), teams });
      index++;
    }
    future.forEach((week, i) => weeks.push({ week: week, pairs: weeklySchedule[i] || [], teams: weekTeams(week, index + i) }));
    const playoffTeams = {};
    poWeeks.forEach((poWeek, i) => { playoffTeams[poWeek] = weekTeams(poWeek, index + future.length + i); });
    return { format, weeks, playoffTeams, rosters };
  }

  async function projectLeague(league, { remainingOf, stats, rosters = league.raw.rosters, draftMethod = 'linear', sims = SIMS, forced = null }) {
    const forecast = await forecastWeeks(league, { remainingOf, stats, rosters });
    const teams = rosters.map((roster) => {
      const rosterSettings = roster.settings || {};
      const pointsFor = (rosterSettings.fpts || 0) + (rosterSettings.fpts_decimal || 0) / 100;
      const max = (rosterSettings.ppts || 0) + (rosterSettings.ppts_decimal || 0) / 100;
      return { rosterId: roster.roster_id, wins: rosterSettings.wins || 0, losses: rosterSettings.losses || 0, ties: rosterSettings.ties || 0, pf: pointsFor, max, efficiency: max ? pointsFor / max : null };
    });
    return projection.projectSeason({
      teams,
      weeks: forecast.weeks,
      playoff: forecast.format ? { format: forecast.format, teams: forecast.playoffTeams } : null,
      medianGame: league.medianGame,
      sims,
      seed: season.hash(`${league.leagueId}:${league.raw.next}:projected`),
      draft: league.draft ? { method: draftMethod } : null,
      forced
    });
  }

  async function playerPointsByWeek(leagueId, weeks) {
    const key = `moves.points.v1.${leagueId}`;
    const cached = await storage.get(key, {});
    const missing = weeks.filter((week) => !cached[week]);
    const fetched = await Promise.all(missing.map((week) => api.matchups(leagueId, week).then((matchups) => [week, matchups]).catch(() => [week, null])));
    let changed = false;
    for (const [week, matchups] of fetched) {
      if (!matchups) continue;
      const points = {};
      for (const matchup of matchups) for (const [playerId, scored] of Object.entries(matchup.players_points || {})) if (scored) points[playerId] = scored;
      cached[week] = points;
      changed = true;
    }
    if (changed) await storage.set({ [key]: cached });
    return Object.fromEntries(weeks.filter((week) => cached[week]).map((week) => [week, cached[week]]));
  }

  NightOwl.model = { SIMS, timeline, schedule, playerPointsByWeek, projections, positionsFor, weeksNeeded, remainingByTeam, activePool, nflSchedule, valueWeeks, forecastWeeks, projectLeague };
})(globalThis.NightOwl);
