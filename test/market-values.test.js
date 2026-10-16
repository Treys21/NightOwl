const test = require('node:test');
const assert = require('node:assert');

require('../src/shared/numbers.js');
require('../src/shared/market-fit.js');
const market = require('../src/shared/market-values.js');

const listed = [
  { id: 'qb1', position: 'QB', searchRank: 3, age: 26 },
  { id: 'wr1', position: 'WR', searchRank: 5, age: 24 },
  { id: 'wr2', position: 'WR', searchRank: 220, age: 24 },
  { id: 'old', position: 'RB', searchRank: 40, age: 31 },
  { id: 'young', position: 'RB', searchRank: 40, age: 22 },
  { id: 'kicker', position: 'K', searchRank: 10, age: 30 },
  { id: 'deep', position: 'WR', searchRank: 900, age: 24 }
];

test('building values lists skill players by search rank, in both league formats', () => {
  const built = market.build(listed, '2026');
  assert.deepEqual(Object.keys(built.players).sort(), ['old', 'qb1', 'wr1', 'wr2', 'young']);
  assert.ok(built.players.wr1.v[0] > built.players.wr2.v[0]);
  assert.ok(built.players.qb1.s[0] > built.players.qb1.v[0]);
  assert.equal(built.players.wr1.s[0], built.players.wr1.v[0]);
});

test('a younger player is worth more than an older one at the same rank', () => {
  const built = market.build(listed, '2026');
  assert.ok(built.players.young.v[0] > built.players.old.v[0]);
});

test('league format picks the value: superflex vs 1QB, and tight-end premium only for TEs', () => {
  const tightEndEntry = { p: 'TE', v: [6000, 6500, 7000, 7500], s: [6100, 6600, 7100, 7600] };
  const receiverEntry = { p: 'WR', v: [5000, 5000, 5000, 5000], s: [5100, 5100, 5100, 5100] };
  assert.equal(market.valueIn(tightEndEntry, { superflex: false, tep: 0 }), 6000);
  assert.equal(market.valueIn(tightEndEntry, { superflex: true, tep: 2 }), 7100);
  assert.equal(market.valueIn(receiverEntry, { superflex: false, tep: 3 }), 5000);
  assert.equal(market.isSuperflex(['QB', 'RB', 'SUPER_FLEX', 'BN']), true);
  assert.equal(market.isSuperflex(['QB', 'QB', 'RB']), true);
  assert.equal(market.isSuperflex(['QB', 'RB', 'FLEX']), false);
  assert.equal(market.tepTier({ bonus_rec_te: 0.5 }), 1);
  assert.equal(market.tepTier({ bonus_rec_te: 1.5 }), 3);
  assert.equal(market.tepTier({}), 0);
});

test('scoring shifts value by how the league treats the player compared with PPR', () => {
  assert.equal(market.scoringFactor(120, 160), 0.75);
  assert.equal(market.scoringFactor(200, 200), 1);
  assert.equal(market.scoringFactor(500, 200), 1.4);
  assert.equal(market.scoringFactor(10, 200), 0.6);
  assert.equal(market.scoringFactor(0, 200), 1);
});

test('a trade side is worth less than its pieces added up, so depth does not buy a star', () => {
  assert.equal(market.sideValue([4000, 4000]) < 8000, true);
  assert.equal(market.sideValue([4000, 4000]) < market.sideValue([6500]), true);
  assert.equal(market.sideValue([5000]), 5000);
  assert.equal(market.sideValue([]), 0);
});

test('pick tier follows the standings: the worst teams pick early', () => {
  const tiers = Array.from({ length: 12 }, (_, i) => market.pickTier(i + 1, 12));
  assert.deepEqual(tiers, ['early', 'early', 'early', 'early', 'mid', 'mid', 'mid', 'mid', 'late', 'late', 'late', 'late']);
  assert.deepEqual([1, 5, 10].map((rank) => market.pickTier(rank, 10)), ['early', 'mid', 'late']);
});

test('projected draft slots turn into pick tiers: the team projected to finish last holds the early pick', () => {
  require('../src/lineups/core.js');
  require('../src/season/core.js');
  const projection = require('../src/season/project.js');
  const strength = { 1: 150, 2: 120, 3: 100, 4: 60 };
  const week = { pairs: [[1, 4], [2, 3]], teams: Object.fromEntries(Object.entries(strength).map(([rosterId, mean]) => [rosterId, { mean: mean, variance: 100 }])) };
  const teams = [1, 2, 3, 4].map((rosterId) => ({ rosterId, wins: 2, losses: 2, ties: 0, pf: 400, max: 450, efficiency: 1 }));
  const projected = projection.projectSeason({ teams, weeks: [week, week], sims: 1500, seed: 3, draft: { method: 'linear' } });
  const order = projection.projectedDraft(projected, { method: 'linear' });
  assert.equal(order[0].rosterId, 4);
  assert.equal(order[3].rosterId, 1);
  assert.equal(market.pickTier(order[0].pick, 12), 'early');
  assert.equal(market.pickTier(order[3].pick, 4), 'late');
});

test('pick baseline: early, mid and late values blended along the round; none past the chart', () => {
  const picks = { '2027:1:early': { v: 7000, s: 7000 }, '2027:1:mid': { v: 6000, s: 6000 }, '2027:1:late': { v: 5000, s: 5000 } };
  const baselineAt = (slot) => market.pickBaseline(picks, { round: 1, slot, teams: 12, superflex: false });
  assert.strictEqual(baselineAt(1), 7000);
  assert.strictEqual(baselineAt(12), 5000);
  assert.ok(baselineAt(6) < 7000 && baselineAt(6) > 5000 && baselineAt(5) >= baselineAt(8));
  assert.strictEqual(market.pickBaseline(picks, { round: 6, slot: 1, teams: 12, superflex: false }), 0);
});

test('draft picks: valued by year, round and tier, earlier rounds worth more', () => {
  const picks = market.pickValues('2026');
  assert.deepEqual(Object.keys(picks).filter((key) => key.startsWith('2027:1:')).sort(), ['2027:1:early', '2027:1:late', '2027:1:mid']);
  assert.ok(market.pickValue(picks, { year: 2027, round: 1, tier: 'early', superflex: false }) > market.pickValue(picks, { year: 2027, round: 1, tier: 'late', superflex: false }));
  assert.ok(market.pickValue(picks, { year: 2027, round: 1, tier: 'mid', superflex: false }) > market.pickValue(picks, { year: 2027, round: 2, tier: 'mid', superflex: false }));
  assert.ok(market.pickValue(picks, { year: 2027, round: 1, tier: 'mid', superflex: false }) > market.pickValue(picks, { year: 2029, round: 1, tier: 'mid', superflex: false }));
  assert.equal(market.pickValue(picks, { year: 2035, round: 1, tier: 'mid', superflex: false }), 0);
});
