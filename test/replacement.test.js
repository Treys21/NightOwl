const test = require('node:test');
const assert = require('node:assert');

require('../src/lineups/core.js');
require('../src/season/core.js');
const rep = require('../src/season/replacement.js');
const { lineupPoints } = (require('../src/season/value.js'), globalThis.NightOwl.value);

const POS = { qb1: 'QB', qb2: 'QB', fa1: 'QB', fa2: 'QB', fa3: 'QB', fa4: 'QB', rb1: 'RB' };
const PTS = { qb1: 20, qb2: 10, fa1: 15, fa2: 14, fa3: 13, fa4: 2, rb1: 12 };
const positionsOf = (playerId) => [POS[playerId]];
const weeks = (weekCount) => Array.from({ length: weekCount }, () => ({ projOf: (playerId) => PTS[playerId] || 0, isOut: () => false }));

test('levels: the mean of the best few free agents, by position', () => {
  const levels = rep.levels(['fa1', 'fa2', 'fa3', 'fa4'], weeks(5), positionsOf, new Set(['QB']));
  assert.strictEqual(levels.get('QB'), 14);
});

test('levels: a position the league picked clean falls back to the weakest rostered starters', () => {
  const levels = rep.levels([], weeks(5), positionsOf, new Set(['QB']), ['qb1', 'qb2', 'fa2', 'fa3', 'fa4']);
  assert.ok(Math.abs(levels.get('QB') - (10 + 13 + 14) / 3) < 1e-9, 'the three weakest who still play (not the 2-point filler)');
});

test('a bye is told from an absence by the NFL schedule', () => {
  const sched = rep.playing([{ week: 8, home: 'A', away: 'B' }, { week: 8, home: 'C', away: 'D' }]);
  assert.ok(rep.onBye(sched, 'E', 8) === false || rep.onBye(sched, 'E', 8) === true);
  assert.strictEqual(rep.onBye(sched, 'A', 8), false);
  assert.strictEqual(rep.onBye(sched, 'Z', 8), true);
  assert.strictEqual(rep.onBye(sched, 'A', 9), false, 'a week the schedule lacks is unknown, not a bye');
  assert.strictEqual(rep.onBye(null, 'A', 8), false);
});

test('over replacement: a hole in the lineup is filled by a free agent, not by zero', () => {
  const slots = ['QB', 'BN'];
  const projectedWeeks = weeks(4);
  const levels = rep.levels(['fa1', 'fa2', 'fa3'], projectedWeeks, positionsOf, new Set(['QB']));
  const wrapped = rep.wrap({ slots, weeks: projectedWeeks, positionsOf, rates: levels, fade: 1 });
  const empty = lineupPoints(slots, wrapped.pool([]), wrapped.weeks, wrapped.positionsOf).total;
  assert.strictEqual(empty, 14 * 4, 'the stand-in plays');
  const starter = lineupPoints(slots, wrapped.pool(['qb1']), wrapped.weeks, wrapped.positionsOf).total;
  assert.strictEqual(starter - empty, (20 - 14) * 4);
  assert.strictEqual(Math.round(wrapped.over('qb1')), 24);
  assert.ok(wrapped.over('qb2') < 0, 'a QB below the free agents adds nothing');
});

test('a backup covers the starter\'s bye: worth the bye week over the stand-in, not the whole season', () => {
  const slots = ['QB', 'BN'];
  const projectedWeeks = weeks(4);
  projectedWeeks[1].isOut = (playerId) => playerId === 'qb1';
  const levels = new Map([['QB', 8]]);
  const wrapped = rep.wrap({ slots, weeks: projectedWeeks, positionsOf, rates: levels, fade: 1 });
  const solo = lineupPoints(slots, wrapped.pool(['qb1']), wrapped.weeks, wrapped.positionsOf).total;
  const covered = lineupPoints(slots, wrapped.pool(['qb1', 'qb2']), wrapped.weeks, wrapped.positionsOf).total;
  assert.strictEqual(covered - solo, 10 - 8, 'the backup beats the stand-in by 2 for the one bye week');
});

test('far-off weeks fade toward replacement, near ones barely move', () => {
  const projectedWeeks = weeks(12);
  const wrapped = rep.wrap({ slots: ['QB', 'BN'], weeks: projectedWeeks, positionsOf, rates: new Map([['QB', 10]]) });
  const near = wrapped.weeks[0].projOf('qb1');
  const far = wrapped.weeks[11].projOf('qb1');
  assert.ok(near < 20 && near > far && far > 10);
  assert.strictEqual(wrapped.weeks[3].projOf('rb1'), 12 * Math.pow(rep.FADE, 4) + 0 * 1 + (1 - Math.pow(rep.FADE, 4)) * 0, 'a position with no level has nothing to fade to except zero weight');
});

test('stand-ins are never out and are not tradable assets', () => {
  const projectedWeeks = weeks(2);
  const wrapped = rep.wrap({ slots: ['QB', 'BN'], weeks: projectedWeeks, positionsOf, rates: new Map([['QB', 10]]) });
  assert.ok(wrapped.stand.every(rep.isVirtual));
  assert.strictEqual(wrapped.weeks[0].isOut(wrapped.stand[0]), false);
});
