const test = require('node:test');
const assert = require('node:assert');

require('../src/shared/numbers.js');
require('../src/lineups/core.js');
require('../src/season/core.js');
const value = require('../src/season/value.js');

const POS = { qb1: ['QB'], rb1: ['RB'], rb2: ['RB'], rb3: ['RB'], wr1: ['WR'], wr2: ['WR'], te1: ['TE'], fa_rb: ['RB'], fa_wr: ['WR'], fa_te: ['TE'], fa_qb: ['QB'], fa_junk: ['RB'] };
const PTS = { qb1: 20, rb1: 15, rb2: 8, rb3: 2, wr1: 12, wr2: 3, te1: 9, fa_rb: 11, fa_wr: 6, fa_te: 4, fa_qb: 18, fa_junk: 1 };
const SLOTS = ['QB', 'RB', 'RB', 'WR', 'TE', 'BN', 'BN'];
const positionsOf = (playerId) => POS[playerId];
const weeks = (weekCount, out = () => false) => Array.from({ length: weekCount }, () => ({ projOf: (playerId) => PTS[playerId] || 0, isOut: out }));

test('lineup points are the best lineup each week, summed', () => {
  const result = value.lineupPoints(SLOTS, ['qb1', 'rb1', 'rb2', 'rb3', 'wr1', 'te1'], weeks(3), positionsOf);
  assert.deepEqual(result.perWeek, [64, 64, 64]);
  assert.equal(result.total, 192);
});

test('a player who is out scores nothing in the weeks he misses', () => {
  const out = [{ projOf: (playerId) => PTS[playerId], isOut: (playerId) => playerId === 'qb1' }, { projOf: (playerId) => PTS[playerId], isOut: () => false }];
  const result = value.lineupPoints(SLOTS, ['qb1', 'rb1', 'rb2', 'wr1', 'te1'], out, positionsOf);
  assert.deepEqual(result.perWeek, [44, 64]);
});

const ROSTER = ['qb1', 'rb1', 'rb2', 'rb3', 'wr1', 'wr2', 'te1'];

test('waiver targets: only free agents who start are worth adding, with the least useful player as the drop', () => {
  const found = value.waiverTargets({
    slots: SLOTS, pool: ROSTER, droppable: ROSTER, openSpots: 0, weeks: weeks(4), positionsOf,
    candidates: ['fa_rb', 'fa_wr', 'fa_te', 'fa_qb', 'fa_junk']
  });
  const byPid = Object.fromEntries(found.map((target) => [target.pid, target]));
  assert.equal(byPid.fa_rb.gain, 12);
  assert.equal(byPid.fa_rb.nowGain, 3);
  assert.ok(['rb3', 'wr2'].includes(byPid.fa_rb.drop));
  assert.equal(byPid.fa_wr, undefined);
  assert.equal(byPid.fa_te, undefined);
  assert.equal(byPid.fa_junk, undefined);
  assert.equal(found[0].pid, 'fa_rb');
});

test('waiver targets: an open roster spot means no one has to be dropped', () => {
  const [top] = value.waiverTargets({ slots: SLOTS, pool: ROSTER, droppable: ROSTER, openSpots: 1, weeks: weeks(2), positionsOf, candidates: ['fa_rb'] });
  assert.equal(top.drop, null);
  assert.equal(top.gain, 6);
});

test('waiver targets: nothing to add when the season is over', () => {
  assert.deepEqual(value.waiverTargets({ slots: SLOTS, pool: ROSTER, droppable: ROSTER, weeks: [], positionsOf, candidates: ['fa_rb'] }), []);
});

test('a trade moves lineup points from one side to the other', () => {
  const myTeam = { pool: ['qb1', 'rb1', 'rb2', 'wr1', 'te1'] };
  const theirTeam = { pool: ['fa_qb', 'rb3', 'wr2', 'fa_rb'] };
  const impact = value.tradeImpact({ slots: SLOTS, weeks: weeks(2), positionsOf, a: myTeam, b: theirTeam, aGives: ['rb2'], bGives: ['fa_rb'] });
  assert.equal(impact.a.delta, 6);
  assert.deepEqual(impact.a.perWeek, [3, 3]);
  assert.equal(impact.b.delta < 0, true);
});

test('applying a trade swaps players between the two rosters and leaves the rest alone', () => {
  const rosters = [
    { roster_id: 1, players: ['a', 'b'], starters: ['a'], reserve: ['b'], taxi: [] },
    { roster_id: 2, players: ['c'], starters: ['c'], reserve: null, taxi: ['c'] },
    { roster_id: 3, players: ['d'] }
  ];
  const next = value.applyTrade(rosters, 1, 2, ['b'], ['c']);
  assert.deepEqual(next[0].players, ['a', 'c']);
  assert.deepEqual(next[0].reserve, []);
  assert.deepEqual(next[1].players, ['b']);
  assert.deepEqual(next[1].taxi, []);
  assert.equal(next[2], rosters[2]);
  assert.deepEqual(rosters[0].players, ['a', 'b']);
});
