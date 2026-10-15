const test = require('node:test');
const assert = require('node:assert');

globalThis.NightOwl = {};
require('../src/shared/numbers.js');
require('../src/lineups/core.js');
require('../src/season/core.js');
require('../src/season/value.js');
require('../src/shared/ktc.js');
require('../src/moves/values.js');
const { nearestPickPerRound } = globalThis.NightOwl.moveValues;

test('the finder offers only the soonest pick in each round', () => {
  const picks = ['pick:2027:1:1', 'pick:2028:1:1', 'pick:2029:1:1', 'pick:2028:2:1', 'pick:2029:2:1', 'pick:2027:3:1'];
  assert.deepStrictEqual(nearestPickPerRound(picks), ['pick:2027:1:1', 'pick:2028:2:1', 'pick:2027:3:1']);
});

test('a later year is used for a round only when the nearer pick is gone', () => {
  const withoutNextFirst = ['pick:2028:1:1', 'pick:2029:1:1', 'pick:2027:2:1'];
  assert.deepStrictEqual(nearestPickPerRound(withoutNextFirst), ['pick:2028:1:1', 'pick:2027:2:1']);
});

test('every pick of the nearest year is kept, including ones bought from other teams', () => {
  const picks = ['pick:2027:1:1', 'pick:2027:1:7', 'pick:2028:1:1'];
  assert.deepStrictEqual(nearestPickPerRound(picks), ['pick:2027:1:1', 'pick:2027:1:7']);
});

test('no picks, no problem', () => {
  assert.deepStrictEqual(nearestPickPerRound([]), []);
});
