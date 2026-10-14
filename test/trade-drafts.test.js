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

test('after trades: a pick bought is graded against its price, a pick sold against what it fetched', () => {
  const values = { A: 5000, B: 4800, C: 9000, D: 4500, E: 3000, F: 0, G: 2800, H: 2500 };
  const b = d.board(rookie, (pid) => values[pid]);
  const trade = (got, gave, gotPicks, gavePicks) => ({ got, gave, gotPicks, gavePicks });
  // Roster 10 paid player P (worth 8,000) for roster 30's round-1 pick, which became C (9,000).
  const trades = [{ sides: { 10: trade([], ['P'], [{ season: '2025', round: 1, from: 30 }], []), 30: trade(['P'], [], [], [{ season: '2025', round: 1, from: 30 }]) } }];
  const net = d.afterTrades(b, rookie, trades, (a) => (a.pid === 'P' ? 8000 : 0));
  assert.strictEqual(net[10].trades, -8000);
  assert.strictEqual(net[30].trades, 8000);
  assert.ok(net[10].score < b.byRoster[10].score, 'paying 8,000 for the pick takes most of the shine off the 9,000 player');
  assert.ok(net[30].score > 0, 'the seller was paid more than the slot was expected to return');
  // No trades: the gain is just the picks over their slots.
  const plain = d.afterTrades(b, rookie, [], () => 0);
  assert.strictEqual(plain[20].gain, Math.round(b.byRoster[20].excess));
});

test('the pick chart sets each slot\'s baseline, and a late-round hit is graded on total growth', () => {
  const chart = ({ round }) => ({ 1: 6000, 2: 4000 }[round]);
  const values = { A: 6000, B: 6000, C: 6000, D: 6000, E: 4000, F: 4000, G: 4000, H: 9000 }; // roster 10's round-2 pick grew past a first
  const b = d.board(rookie, (pid) => values[pid], chart);
  assert.strictEqual(b.picks[0].expected, 6000);
  assert.strictEqual(b.picks[7].expected, 4000);
  const net = d.afterTrades(b, rookie, [], () => 0);
  const best = Object.entries(net).sort((x, y) => y[1].gain - x[1].gain)[0];
  assert.strictEqual(best[0], '10', 'the team with the 9,000 second-rounder gained the most');
  // 6,000 + 6,000 (the pick it holds from roster 30, no trade recorded) + 9,000, over the 10,000 its own two slots were worth.
  assert.strictEqual(best[1].gain, 11000);
});

test('settle: a pick passed on before its draft is worth its slot; the player counts for the one who used it', () => {
  const idx = d.index([rookie]);
  const pick = { season: '2025', round: 1, from: 30 }; // drafted by roster 10 as C
  const sides = (got, gave, gotP, gaveP) => ({ got, gave, gotPicks: gotP, gavePicks: gaveP });
  // 30 -> 20 (week 1), 20 -> 10 (week 2). Roster 10 drafted.
  const t1 = { at: 1, sides: { 20: sides([], [], [{ ...pick }], []), 30: sides([], [], [], [{ ...pick }]) } };
  const t2 = { at: 2, sides: { 10: sides([], [], [{ ...pick }], []), 20: sides([], [], [], [{ ...pick }]) } };
  d.settle([t2, t1], idx);
  const first = t1.sides[20].gotPicks[0];
  assert.ok(first.passed && first.pos === 3 && first.teams === 4 && !first.player, 'the middle holder only passed it on');
  assert.deepStrictEqual(t1.sides[30].gavePicks[0].passed, true, 'both sides of a trade see the same value');
  assert.strictEqual(t2.sides[10].gotPicks[0].player, 'C', 'the manager who held it at the draft used it');
  assert.strictEqual(t2.sides[20].gavePicks[0].player, 'C');
});

test('settle: a pick whose holder did not draft with it (it moved some way not recorded) is priced at its slot', () => {
  const idx = d.index([rookie]);
  const t = { at: 1, sides: { 20: { got: [], gave: [], gotPicks: [{ season: '2025', round: 1, from: 30 }], gavePicks: [] }, 30: { got: [], gave: [], gotPicks: [], gavePicks: [{ season: '2025', round: 1, from: 30 }] } } };
  d.settle([t], idx);
  assert.ok(t.sides[20].gotPicks[0].passed);
});

test('a late pick that loses all its value costs little; an early one costs its full shortfall', () => {
  const chart = ({ round }) => ({ 1: 6000, 2: 1500 }[round]);
  const draft = { season: '2025', rounds: 2, teams: 2, slotToRoster: { 1: 1, 2: 2 }, picks: [
    { no: 1, round: 1, slot: 1, by: 1, pid: 'a' }, { no: 2, round: 1, slot: 2, by: 2, pid: 'b' },
    { no: 3, round: 2, slot: 2, by: 2, pid: 'c' }, { no: 4, round: 2, slot: 1, by: 1, pid: 'd' } ] };
  const values = { a: 0, b: 6000, c: 0, d: 6000 }; // roster 1 busts its first, hits its second; roster 2 hits its first, busts its second
  const b = d.board(draft, (pid) => values[pid], chart);
  const early = b.picks[0];
  const late = b.picks[2];
  assert.strictEqual(early.excess, -6000, 'an early bust counts in full');
  assert.ok(late.excess > -1500 * 0.5 && late.excess < 0, `a late bust counts for a fraction: ${late.excess}`);
  assert.ok(late.weight < early.weight);
});
