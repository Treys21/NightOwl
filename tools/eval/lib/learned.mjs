import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
require('../../../src/ai/likelihood-model-dynasty.js');
require('../../../src/ai/likelihood.js');
require('../../../src/ai/likelihood-input.js');

const playedWeeks = (season, week) => {
  const weeks = [];
  for (let past = 1; past < week; past++) if ((season.matchups[past] || []).some((row) => (row.points || 0) > 0)) weeks.push(past);
  return weeks;
};

export function learnedFactsFor(world, season, rosterPlayers, week, standings) {
  const weeksPlayed = playedWeeks(season, week);
  const byWeek = {};
  for (const past of weeksPlayed) {
    byWeek[past] = {};
    for (const row of season.matchups[past] || []) Object.assign(byWeek[past], row.players_points || {});
  }
  const count = standings.size;
  return {
    positions: season.league.roster_positions || [], season: season.league.season, week, weeksPlayed,
    pointsOf: (pastWeek, playerId) => (byWeek[pastWeek] || {})[playerId],
    infoOf: (playerId) => { const info = world.info[playerId] || {}; return { pos: info.pos, searchRank: info.searchRank, age: info.age }; },
    rosterPlayers: (rosterId) => [...(rosterPlayers.get(rosterId) || [])],
    standingsRanks: new Map([...standings].map(([rosterId, row]) => [rosterId, count - row.rank + 1]))
  };
}

export function learnedLikelihood(facts, myId, deal) {
  const model = globalThis.NightOwl.likelihoodModels.dynasty;
  const input = globalThis.NightOwl.likelihoodInput.build(facts, { myId, partnerId: Number(deal.partnerId), give: deal.give, get: deal.get });
  return globalThis.NightOwl.likelihood.likelihood(model, input).calibrated;
}
