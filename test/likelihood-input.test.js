const test = require('node:test');
const assert = require('node:assert');
const likelihood = require('../src/ai/likelihood.js');
const input = require('../src/ai/likelihood-input.js');
const model = require('../src/ai/likelihood-model-dynasty.js');

const infos = {
  a1: { pos: 'WR', searchRank: 20, age: 24 }, a2: { pos: 'RB', searchRank: 80, age: 27 }, a3: { pos: 'QB', searchRank: 150, age: 30 },
  b1: { pos: 'WR', searchRank: 30, age: 25 }, b2: { pos: 'RB', searchRank: 60, age: 22 }, b3: { pos: 'TE', searchRank: 300, age: 29 }
};
const points = { a1: [12, 14, 9], a2: [8, 7, 9], a3: [18, 20, 17], b1: [11, 13, 15], b2: [10, 6, 12], b3: [5, 4, 6] };
const facts = {
  positions: ['QB', 'RB', 'WR', 'TE', 'FLEX', 'BN'], season: '2025', week: 4, weeksPlayed: [1, 2, 3],
  pointsOf: (week, playerId) => (points[playerId] || [])[week - 1],
  infoOf: (playerId) => infos[playerId],
  rosterPlayers: (rosterId) => (rosterId === 1 ? ['a1', 'a2', 'a3'] : ['b1', 'b2', 'b3']),
  standingsRanks: new Map([[1, 3], [2, 8]])
};
const deal = { myId: 1, partnerId: 2, give: ['a2'], get: ['b2'] };

test('builds assets from league facts', () => {
  const built = input.build(facts, deal);
  assert.strictEqual(built.sides[0].give[0].pid, 'a2');
  assert.ok(Math.abs(built.sides[0].give[0].ppg - 8) < 1e-9);
  assert.strictEqual(built.sides[1].give[0].pid, 'b2');
  assert.strictEqual(built.rosters[1].size, 3);
  assert.ok(built.rank[2] < built.rank[1]);
});

test('turns picks into assets with a market value', () => {
  const built = input.build(facts, { myId: 1, partnerId: 2, give: ['pick:2026:1:2'], get: ['b2'] });
  const pick = built.sides[0].give[0];
  assert.strictEqual(pick.kind, 'pick');
  assert.strictEqual(pick.years_out, 1);
  assert.ok(Math.abs(pick.mkt - 22.5) < 1e-9);
});

test('returns a calibrated probability between 0 and 1', () => {
  const result = likelihood.likelihood(model, input.build(facts, deal));
  assert.ok(result.calibrated > 0 && result.calibrated < 1);
});

test('a lopsided give looks less like a real trade than an even swap', () => {
  const even = likelihood.likelihood(model, input.build(facts, { myId: 1, partnerId: 2, give: ['a1'], get: ['b1'] })).calibrated;
  const lopsided = likelihood.likelihood(model, input.build(facts, { myId: 1, partnerId: 2, give: ['a1', 'a3'], get: ['b3'] })).calibrated;
  assert.ok(lopsided <= even);
});
