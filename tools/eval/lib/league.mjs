import { nightOwl, sleeper, getJson, inChunks } from './env.mjs';

const IDP = new Set(['DL', 'LB', 'DB', 'IDP_FLEX']);
export const LAST_WEEK = 18;

export async function loadSeason(leagueId) {
  const [league, rosters, users] = await Promise.all([sleeper(`/league/${leagueId}`), sleeper(`/league/${leagueId}/rosters`), sleeper(`/league/${leagueId}/users`)]);
  if (!league || !rosters) return null;
  const weeks = Array.from({ length: LAST_WEEK }, (_, index) => index + 1);
  const transactions = (await inChunks(weeks, (week) => sleeper(`/league/${leagueId}/transactions/${week}`).then((rows) => rows || []))).flat().filter((transaction) => transaction.status === 'complete');
  const matchups = {};
  await inChunks(weeks, async (week) => { matchups[week] = (await sleeper(`/league/${leagueId}/matchups/${week}`)) || []; });
  return { league, rosters, users: users || [], transactions, matchups };
}

export function kindOf(league) {
  return ['redraft', 'keeper', 'dynasty'][league.settings.type] || 'redraft';
}

export function playedThrough(season) {
  let last = 0;
  for (let week = 1; week <= LAST_WEEK; week++) {
    const rows = season.matchups[week] || [];
    if (rows.length && rows.some((row) => (row.points || 0) > 0)) last = week;
  }
  return last;
}

export function rostersAt(season, week) {
  const rosterPlayers = new Map(season.rosters.map((roster) => [roster.roster_id, new Set([...(roster.players || [])])]));
  const later = season.transactions.filter((transaction) => transaction.leg >= week).sort((a, b) => b.created - a.created);
  for (const transaction of later) {
    for (const [playerId, rosterId] of Object.entries(transaction.adds || {})) if (rosterPlayers.has(rosterId)) rosterPlayers.get(rosterId).delete(playerId);
    for (const [playerId, rosterId] of Object.entries(transaction.drops || {})) if (rosterPlayers.has(rosterId)) rosterPlayers.get(rosterId).add(playerId);
  }
  return rosterPlayers;
}

export function standingsBefore(season, week) {
  const table = new Map(season.rosters.map((roster) => [roster.roster_id, { wins: 0, losses: 0, pointsFor: 0 }]));
  for (let pastWeek = 1; pastWeek < week; pastWeek++) {
    const byMatch = new Map();
    for (const row of season.matchups[pastWeek] || []) {
      if (row.matchup_id == null) continue;
      byMatch.set(row.matchup_id, (byMatch.get(row.matchup_id) || []).concat(row));
      if (table.has(row.roster_id)) table.get(row.roster_id).pointsFor += row.points || 0;
    }
    for (const pair of byMatch.values()) {
      if (pair.length !== 2 || pair[0].points === pair[1].points) continue;
      const winner = pair[0].points > pair[1].points ? pair[0] : pair[1];
      const loser = winner === pair[0] ? pair[1] : pair[0];
      if (table.has(winner.roster_id)) table.get(winner.roster_id).wins++;
      if (table.has(loser.roster_id)) table.get(loser.roster_id).losses++;
    }
  }
  const order = [...table.entries()].sort((a, b) => b[1].wins - a[1].wins || b[1].pointsFor - a[1].pointsFor);
  order.forEach(([rosterId], index) => { table.get(rosterId).rank = index + 1; });
  return table;
}

export function windowsFromStandings(standings, week) {
  const count = standings.size;
  const out = new Map();
  for (const [rosterId, row] of standings) {
    const fromBottom = count - row.rank;
    out.set(rosterId, week <= 2 ? 0.5 : Math.max(0, Math.min(1, 1.4 * (count > 1 ? fromBottom / (count - 1) : 0.5) - 0.2)));
  }
  return out;
}

const projectionCache = new Map();
export async function projections(seasonYear, week, idp) {
  const key = `${seasonYear}:${week}:${idp}`;
  if (!projectionCache.has(key)) {
    const positionQuery = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'].concat(idp ? ['DL', 'LB', 'DB'] : []).map((position) => `position[]=${position}`).join('&');
    projectionCache.set(key, getJson(`https://api.sleeper.com/projections/nfl/${seasonYear}/${week}?season_type=regular&${positionQuery}`).then((rows) => {
      const out = {};
      for (const row of rows || []) if (row.stats) out[row.player_id] = row.stats;
      return out;
    }).catch(() => ({})));
  }
  return projectionCache.get(key);
}

export function actualPoints(season, week) {
  const out = {};
  for (const row of season.matchups[week] || []) for (const [playerId, points] of Object.entries(row.players_points || {})) out[playerId] = points;
  return out;
}

export async function prepare(world, season, week, rosterPlayers) {
  const league = season.league;
  const kind = kindOf(league);
  const slots = league.roster_positions || [];
  const playoffStart = (league.settings && league.settings.playoff_week_start) || 15;
  const idp = slots.some((slot) => IDP.has(slot));
  const weekNumbers = [];
  for (let current = week; current < playoffStart; current++) weekNumbers.push(current);
  if (weekNumbers.length < 2) return null;
  const stats = {};
  await inChunks(weekNumbers, async (current) => { stats[current] = await projections(league.season, current, idp); });
  const weeks = weekNumbers.map((current) => ({ week: current, weight: 1, projOf: (playerId) => nightOwl.scoring.points(stats[current][playerId], league.scoring_settings), isOut: () => false }));
  const rosters = season.rosters.map((roster) => Object.assign({}, roster, { players: [...rosterPlayers.get(roster.roster_id)], reserve: [], taxi: [] }));
  const standings = standingsBefore(season, week);
  const fakeLeague = {
    kind, weeks, raw: { season: league.season, rosters, scoring: league.scoring_settings, slots },
    superflex: nightOwl.ktc.isSuperflex(slots), tep: nightOwl.ktc.tepTier(league.scoring_settings),
    ranks: new Map([...standings.entries()].map(([rosterId, row]) => [rosterId, row.rank])), slots: null, picks: new Map()
  };
  const moveValues = nightOwl.moveValues.create({ ktc: world.ktc, ktcRedraft: world.ktcRedraft, stats });
  return { slots, weeks, rosters, fakeLeague, moveValues, stats, kind, playoffStart, standings };
}

const packageRule = (isDynasty) => (isDynasty
  ? { exponent: nightOwl.ktc.EXPONENT_PACKAGE, replacement: nightOwl.ktc.REPLACEMENT_DYNASTY }
  : { exponent: nightOwl.ktc.EXPONENT_REDRAFT, replacement: nightOwl.ktc.REPLACEMENT_REDRAFT });

export function buildContext(world, preparation, goal = 'balanced') {
  const { fakeLeague, moveValues, slots, weeks, kind } = preparation;
  const isDynasty = kind !== 'redraft';
  return {
    mode: isDynasty ? 'dynasty' : 'redraft', consensus: !isDynasty, slots, weeks, positionsOf: world.positionsOf,
    isPick: nightOwl.moveValues.isPick, canCut: () => true,
    rawOf: isDynasty ? (playerId) => moveValues.dynastyValue(fakeLeague, playerId) : (playerId) => moveValues.redraftValue(fakeLeague, playerId),
    valueOf: isDynasty ? (team, playerId, outlook) => moveValues.valueFor(fakeLeague, playerId, outlook) : (team, playerId) => moveValues.redraftValue(fakeLeague, playerId),
    sideValue: (values, picks) => nightOwl.ktc.packageValue(values.map((value, index) => ({ v: value, pick: Boolean(picks && picks[index]) })), packageRule(isDynasty)),
    pointValue: moveValues.pointValue(fakeLeague), goal, focus: {}
  };
}

export function teamOf(world, season, rosterId, rosterPlayers, window) {
  const playerIds = [...rosterPlayers.get(rosterId)].filter((playerId) => world.positionsOf(playerId).length);
  const league = season.league;
  const capacity = (league.roster_positions || []).length + ((league.settings && league.settings.reserve_slots) || 0) + ((league.settings && league.settings.taxi_slots) || 0);
  return { id: rosterId, pool: playerIds, assets: playerIds, players: playerIds, count: playerIds.length, capacity, w: window };
}
