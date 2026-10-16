import { nightOwl } from './env.mjs';
import { loadSeason, rostersAt, standingsBefore, windowsFromStandings, prepare, buildContext, teamOf } from './league.mjs';

export async function rebuild(world, entry) {
  const season = await loadSeason(entry.leagueId);
  const rosterPlayers = rostersAt(season, entry.week);
  const preparation = await prepare(world, season, entry.week, rosterPlayers);
  const standings = standingsBefore(season, entry.week);
  const windows = windowsFromStandings(standings, entry.week);
  const context = buildContext(world, preparation);
  return { season, rosterPlayers, windows, standings, context };
}

export function makeScorer(world, weights, entry, truth, built) {

  const weightsOf = entry.kind === 'redraft' ? weights.redraft : weights.dynasty;
  const lineupWeeks = truth.weeks.map((week) => ({ week: week.week, weight: 1, projOf: (playerId) => week.points[playerId] || 0, isOut: () => false }));
  const mine = teamOf(world, built.season, entry.rosterId, built.rosterPlayers, built.windows.get(entry.rosterId));
  const cache = new Map();
  return (deal) => {
    const signature = `${deal.source || 'candidate'}|${deal.partnerId}|${deal.give.join()}|${deal.get.join()}`;
    if (cache.has(signature)) return cache.get(signature);
    const partner = teamOf(world, built.season, Number(deal.partnerId), built.rosterPlayers, built.windows.get(Number(deal.partnerId)));
    const impact = nightOwl.value.tradeImpact({ slots: truth.slots, weeks: lineupWeeks, positionsOf: world.positionsOf, a: { pool: mine.pool }, b: { pool: partner.pool }, aGives: deal.give, bGives: deal.get });
    let regular = 0;
    let playoff = 0;
    impact.a.perWeek.forEach((change, index) => { if (truth.weeks[index].playoff) playoff += change; else regular += change; });
    let theirChange = 0;
    impact.b.perWeek.forEach((change, index) => { if (!truth.weeks[index].playoff) theirChange += change; });
    const judged = deal.source === 'custom' ? nightOwl.finder.judge(built.context, mine, partner, deal.give, deal.get) : { ok: true, reason: null };
    const marketPoints = nightOwl.finder.valueGain(built.context, mine, mine.w, deal.give, deal.get) / (built.context.pointValue || 1);
    const gift = Math.max(0, theirChange - regular);
    const score = weightsOf.regular * regular + weightsOf.playoff * playoff + weightsOf.market * marketPoints - weightsOf.gift * gift - (judged.ok ? 0 : weightsOf.rejected);
    const result = { score, regular, playoff, theirChange, marketPoints, gift, accepted: judged.ok, reason: judged.reason };
    cache.set(signature, result);
    return result;
  };
}
