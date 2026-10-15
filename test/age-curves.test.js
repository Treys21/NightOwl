const test = require('node:test');
const assert = require('node:assert');

globalThis.NightOwl = {};
const ageCurves = require('../src/valuation/age-curves.js');

test('each position ages on its own clock: backs fall first, receivers next, quarterbacks last', () => {
  assert.ok(ageCurves.retention('RB', 29) < ageCurves.retention('WR', 29));
  assert.ok(ageCurves.retention('WR', 29) < ageCurves.retention('QB', 29));
  assert.strictEqual(ageCurves.retention('QB', 30), 1, 'a quarterback is at full strength through 33');
  assert.ok(ageCurves.retention('RB', 28) < 0.65);
});

test('retention between listed ages is interpolated, and rookies are below their peak', () => {
  const between = ageCurves.retention('WR', 27.5);
  assert.ok(between < ageCurves.retention('WR', 27) && between > ageCurves.retention('WR', 28));
  assert.ok(ageCurves.retention('WR', 21) < ageCurves.retention('WR', 25));
  assert.ok(ageCurves.retention('TE', 22) < 0.6, 'tight ends take years to develop');
});

test('an unknown age or a kicker is never adjusted', () => {
  assert.strictEqual(ageCurves.retention('WR', null), 1);
  assert.strictEqual(ageCurves.futureMultiplier('K', 38, 2), 1);
  assert.strictEqual(ageCurves.futureMultiplier('RB', undefined, 2), 1);
});

test('the multiplier is how much of today\'s production a player keeps', () => {
  assert.ok(ageCurves.futureMultiplier('RB', 27, 2) < 0.6);
  assert.ok(ageCurves.futureMultiplier('WR', 23, 2) > 1.05, 'a 23-year-old receiver is still growing');
  assert.ok(Math.abs(ageCurves.futureMultiplier('QB', 28, 2) - 1) < 1e-9);
});

test('a rebuilding team passes on players who will lose a third of their production within two years', () => {
  assert.strictEqual(ageCurves.losesTooMuchForRebuild('RB', 25), false);
  assert.strictEqual(ageCurves.losesTooMuchForRebuild('RB', 26), true);
  assert.strictEqual(ageCurves.losesTooMuchForRebuild('WR', 26), false);
  assert.strictEqual(ageCurves.losesTooMuchForRebuild('WR', 28), true);
  assert.strictEqual(ageCurves.losesTooMuchForRebuild('QB', 30), false);
  assert.strictEqual(ageCurves.hardToMove('RB', 28), true, 'few will buy a 28-year-old back');
});
