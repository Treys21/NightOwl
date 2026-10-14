// Drafts: traded picks resolve to the players taken, and picks grade against their neighbours.
globalThis.NightOwl = {};
const test = require('node:test');
const assert = require('node:assert');
const d = require('../src/trades/drafts.js');

// A 4-team, 2-round rookie draft in 2025 and a 5-round startup the same season.
const rookie = {
  season: '2025', rounds: 2, teams: 4, slotToRoster: { 1: 10, 2: 20, 3: 30, 4: 40 },
  picks: [
    { no: 1, round: 1, slot: 1, by: 10, pid: 'A' }, { no: 2, round: 1, slot: 2, by: 20, pid: 'B' },
    { no: 3, round: 1, slot: 3, by: 10, pid: 'C' }, // slot 3 belonged to roster 30 and was traded to 10
    { no: 4, round: 1, slot: 4, by: 40, pid: 'D' },
    { no: 5, round: 2, slot: 4, by: 40, pid: 'E' }, { no: 6, round: 2, slot: 3, by: 30, pid: 'F' },
    { no: 7, round: 2, slot: 2, by: 20, pid: 'G' }, { no: 8, round: 2, slot: 1, by: 10, pid: 'H' }
  ]
};
const startup = { season: '2025', rounds: 5, teams: 4, slotToRoster: { 1: 10, 2: 20, 3: 30, 4: 40 }, picks: [{ no: 1, round: 1, slot: 1, by: 10, pid: 'Z' }] };

test('the rookie draft is the short one when a season has two', () => {
  assert.strictEqual(d.rookieDraft([startup, rookie], 2025), rookie);
  assert.strictEqual(d.rookieDraft([rookie], 2030), null);
});

test('a traded pick resolves to the player taken with it, by original owner', () => {
  const idx = d.index([startup, rookie]);
  assert.strictEqual(d.resolve(idx, { season: '2025', round: 1, from: 30 }).pid, 'C'); // roster 30's pick, spent by roster 10
  assert.strictEqual(d.resolve(idx, { season: '2025', round: 1, from: 30 }).by, 10);
  assert.strictEqual(d.resolve(idx, { season: '2025', round: 2, from: 40 }).pid, 'E');
  assert.strictEqual(d.resolve(idx, { season: '2026', round: 1, from: 10 }), null, 'not drafted yet');
});

test('expected value is what the picks around a slot returned', () => {
  assert.deepStrictEqual(d.expected([10, 20, 30]), [25, 20, 15]);
  assert.deepStrictEqual(d.expected([5]), [0]);
});

test('board: rounds down, slots across; a pick that beats its neighbours scores up, one that busts scores down', () => {
  const values = { A: 5000, B: 4800, C: 9000, D: 4500, E: 3000, F: 0, G: 2800, H: 2500 };
  const b = d.board(rookie, (pid) => values[pid]);
  assert.strictEqual(b.rounds, 2);
  assert.strictEqual(b.rows[0].length, 4);
  assert.strictEqual(b.rows[0][2].pid, 'C');
  assert.ok(b.rows[0][2].traded && !b.rows[0][0].traded);
  assert.ok(b.rows[0][2].score > 0.5, `a steal: ${b.rows[0][2].score}`);
  assert.ok(b.rows[1][2].score < -0.5, `a bust: ${b.rows[1][2].score}`);
  assert.strictEqual(b.rows[0][2].label, '1.03');
  // Teams are graded on the picks they made, whoever they belonged to.
  assert.ok(b.byRoster[10].value === 5000 + 9000 + 2500 && b.byRoster[10].picks === 3);
});
