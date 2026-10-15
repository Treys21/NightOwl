const test = require('node:test');
const assert = require('node:assert');

globalThis.NightOwl = {};
const redraft = require('../src/valuation/redraft-values.js');

test('a team\'s stance comes from its playoff odds, not from a rebuild-or-contend choice', () => {
  assert.strictEqual(redraft.stanceOf(0.9), 'leader');
  assert.strictEqual(redraft.stanceOf(0.4), 'hunt');
  assert.strictEqual(redraft.stanceOf(0.05), 'longShot');
  assert.strictEqual(redraft.stanceOf(null), 'hunt', 'unknown odds are not a verdict');
  assert.deepStrictEqual(['leader', 'hunt', 'longShot'].map(redraft.stanceLabel), ['Playoff team', 'In the hunt', 'Long shot']);
});

test('playoff weeks count most to a leader and least to a long shot', () => {
  assert.ok(redraft.weekWeight(true, 'leader') > redraft.weekWeight(true, 'hunt'));
  assert.ok(redraft.weekWeight(true, 'hunt') > redraft.weekWeight(true, 'longShot'));
  assert.strictEqual(redraft.weekWeight(false, 'leader'), 1);
});

test('a player scoring far above his projection is hot (sell), far below is cold (buy), near it is neither', () => {
  assert.strictEqual(redraft.formSignal({ recentPoints: [30, 25, 28], projectedPerGame: 15 }).signal, 'hot');
  assert.strictEqual(redraft.formSignal({ recentPoints: [3, 5, 2], projectedPerGame: 14 }).signal, 'cold');
  assert.strictEqual(redraft.formSignal({ recentPoints: [14, 16, 15], projectedPerGame: 15 }), null);
  assert.strictEqual(redraft.formSignal({ recentPoints: [40], projectedPerGame: 15 }), null, 'one game is not a trend');
  assert.strictEqual(redraft.formSignal({ recentPoints: [3, 4, 2], projectedPerGame: 4 }), null, 'a small gap is noise even when the ratio looks large');
  assert.strictEqual(redraft.formSignal({ recentPoints: [null, 22, 24], projectedPerGame: 10 }).signal, 'hot', 'a bye week is not a game');
});

test('the side that takes more bodies pays for the roster spots', () => {
  assert.strictEqual(redraft.extraBodyPremium(1, 1), 1);
  assert.ok(Math.abs(redraft.extraBodyPremium(2, 1) - 1.07) < 1e-9);
  assert.strictEqual(redraft.extraBodyPremium(1, 2), 1, 'giving more bodies costs nothing extra');
});

test('leaders like consolidating, teams in the hunt like depth, long shots do not care', () => {
  assert.ok(redraft.shapeFit('leader', 1, 2) > 1);
  assert.ok(redraft.shapeFit('leader', 2, 1) < 1);
  assert.ok(redraft.shapeFit('hunt', 2, 1) > 1);
  assert.ok(redraft.shapeFit('hunt', 1, 2) < 1);
  assert.strictEqual(redraft.shapeFit('longShot', 2, 1), 1);
  assert.strictEqual(redraft.shapeFit('leader', 2, 2), 1);
});
