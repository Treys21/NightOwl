const test = require('node:test');
const assert = require('node:assert');

globalThis.NightOwl = {};
require('../src/lineups/core.js');
require('../src/season/core.js');
require('../src/valuation/age-curves.js');
const horizon = require('../src/season/horizon.js');

test('the horizon uses each position\'s age curve', () => {
  assert.ok(horizon.ageMultiplier('RB', 28, 2) < 0.6, 'a 28-year-old back keeps little in two years');
  assert.ok(horizon.ageMultiplier('WR', 22, 2) > 1.1, 'a 22-year-old receiver grows');
  assert.strictEqual(horizon.ageMultiplier('K', 35, 2), 1, 'kickers do not age');
  assert.strictEqual(horizon.ageMultiplier('RB', null, 2), 1, 'an unknown age is not guessed at');
});

test('a change of one point over a season is noise; a big one is not', () => {
  assert.strictEqual(horizon.meaningfulness(1, 11), 'negligible');
  assert.strictEqual(horizon.meaningfulness(-12, 11), 'modest');
  assert.strictEqual(horizon.meaningfulness(60, 11), 'significant');
  assert.strictEqual(horizon.meaningfulness(60, 3), 'significant');
});

const POSITIONS = { oldRb: ['RB'], youngRb: ['RB'], qb: ['QB'], filler: ['RB'], stand: ['RB'] };
const AGES = { oldRb: 29, youngRb: 22, qb: 27, filler: 25 };
const positionsOf = (playerId) => POSITIONS[playerId];
const weeks = Array.from({ length: 10 }, () => ({ projOf: (playerId) => ({ oldRb: 16, youngRb: 14, qb: 20, filler: 6 }[playerId] || 0), isOut: () => false }));
const base = { slots: ['QB', 'RB', 'BN'], positionsOf, ageOf: (playerId) => AGES[playerId], weeks, isVirtual: (playerId) => playerId === 'stand', replacementRate: () => 5 };

test('trading a young back for an old one gains points now and gives them back later', () => {
  const impact = horizon.horizonImpact(Object.assign({}, base, { a: { pool: ['qb', 'youngRb', 'stand'] }, b: { pool: ['oldRb', 'stand'] }, aGives: ['youngRb'], bGives: ['oldRb'] }));
  assert.ok(impact.a[0] > 0 || impact.a[1] > 0 || impact.a[1] < impact.a[0], 'the old back is worth less each year');
  assert.ok(impact.a[1] < impact.a[0], `the gain shrinks: ${impact.a.join(' then ')}`);
  assert.ok(impact.b[1] > impact.b[0], 'the other side gets the opposite');
});

test('notes: warns when a trade helps now and costs later, and when the lineup change is noise', () => {
  const warning = horizon.tradeNotes({ now: 40, future: [-5, -30], weeksLeft: 10, season: 2026, gives: [{ name: 'Young', age: 22, position: 'RB' }], gets: [{ name: 'Old', age: 29, position: 'RB' }] });
  assert.ok(warning.some((note) => /Helps now, but costs you by 2028: Old is 29/.test(note)), warning.join(' | '));
  assert.ok(warning.some((note) => /7 years older/.test(note)), warning.join(' | '));
  const noise = horizon.tradeNotes({ now: 1, future: [0, 0], weeksLeft: 10, season: 2026, gives: [{ name: 'A', age: 25 }], gets: [{ name: 'B', age: 25 }] });
  assert.ok(noise.some((note) => /within projection noise/.test(note)));
  const slowBurn = horizon.tradeNotes({ now: -20, future: [5, 25], weeksLeft: 10, season: 2026, gives: [], gets: [] });
  assert.ok(slowBurn.some((note) => /pays off by 2028/.test(note)));
});
