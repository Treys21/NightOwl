const test = require('node:test');
const assert = require('node:assert');

require('../src/lineups/core.js');
require('../src/season/core.js');
const recap = require('../src/season/recap.js');

const SLOTS = ['QB', 'RB', 'RB', 'BN', 'BN'];
const POS = { q: ['QB'], a: ['RB'], b: ['RB'], c: ['RB'], d: ['RB'] };
const positionsOf = (p) => POS[p] || [];

const weekly = [
  { week: 1, rosters: { 1: { starters: ['q', 'a', 'b'], points: { q: 20, a: 10, b: 4, c: 16 } }, 2: { starters: ['d'], points: { d: 22 } } } },
  { week: 2, rosters: { 1: { starters: ['q', 'a', 'c'], points: { q: 18, a: 12, b: 3, c: 11 } }, 2: { starters: ['d'], points: { d: 30 } } } }
];

test('lineups: points the bench cost each week, the swap that would have helped, and the MVP', () => {
  const r = recap.lineups(1, weekly, SLOTS, positionsOf);
  assert.equal(r.weeks[0].actual, 34);
  assert.equal(r.weeks[0].best, 46);
  assert.equal(r.weeks[0].loss, 12);
  assert.equal(r.weeks[0].miss.in, 'c');
  assert.equal(r.weeks[0].miss.out, 'b');
  assert.equal(r.weeks[1].loss, 0);
  assert.equal(r.totalLoss, 12);
  assert.deepEqual(r.mvp, { pid: 'q', pts: 38, weeks: 2 });
});

test('wire: the best player you added by points started for you, and the best one you let go', () => {
  const moves = [
    { type: 'waiver', leg: 0, adds: { c: 1 }, drops: { b: 1 } },
    { type: 'free_agent', leg: 0, adds: { d: 2 }, drops: { x: 2 } }
  ];
  const w = [
    { week: 1, rosters: { 1: { starters: ['c'], points: { c: 16 } } } },
    { week: 2, rosters: { 1: { starters: ['c'], points: { c: 11 } }, 2: { starters: ['b'], points: { b: 25 } } } }
  ];
  const r = recap.wire(1, moves, w);
  assert.deepEqual(r.bestAdd, { pid: 'c', week: 0, started: 27, onRoster: 27 });
  assert.deepEqual(r.regret, { pid: 'b', week: 0, pts: 25 });
  assert.equal(r.adds, 1);
  assert.equal(r.drops, 1);
});

test('wire: no moves, no story', () => {
  assert.deepEqual(recap.wire(1, [], weekly), { bestAdd: null, regret: null, adds: 0, drops: 0 });
});
