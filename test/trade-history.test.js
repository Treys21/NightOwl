const test = require('node:test');
const assert = require('node:assert');
const tradeHistory = require('../src/trades/history.js');

const buildTransaction = (over) => Object.assign({
  type: 'trade', status: 'complete', leg: 4, created: 1000, transaction_id: 't1',
  roster_ids: [1, 2], adds: { A: 1, B: 2 }, drops: { A: 2, B: 1 }, draft_picks: []
}, over);

test('parse: completed trades only, each side with what it got and gave, picks included', () => {
  const rows = [
    buildTransaction({}),
    buildTransaction({ transaction_id: 'w', type: 'waiver' }),
    buildTransaction({ transaction_id: 'x', status: 'failed' }),
    buildTransaction({ transaction_id: 'p', created: 2000, adds: null, drops: null, draft_picks: [{ season: 2027, round: 1, roster_id: 1, owner_id: 2, previous_owner_id: 1 }] })
  ];
  const trades = tradeHistory.parse(rows, 2026);
  assert.deepEqual(trades.map((trade) => trade.id), ['p', 't1']);
  const trade = trades[1];
  assert.deepEqual(trade.sides[1].got, ['A']);
  assert.deepEqual(trade.sides[1].gave, ['B']);
  assert.equal(trade.week, 4);
  assert.deepEqual(trades[0].sides[2].gotPicks, [{ season: '2027', round: 1, from: 1 }]);
  assert.deepEqual(trades[0].sides[1].gavePicks, [{ season: '2027', round: 1, from: 1 }]);
});

test('realized: what each side\'s players started and sat for it, after the trade week only', () => {
  const [trade] = tradeHistory.parse([buildTransaction({})], 2026);
  const weekly = [
    { week: 4, rosters: { 1: { starters: ['A'], points: { A: 99 } } } },
    { week: 5, rosters: { 1: { starters: ['A'], points: { A: 10 } }, 2: { starters: [], points: { B: 7 } } } },
    { week: 6, rosters: { 1: { starters: [], points: { A: 4 } }, 2: { starters: ['B'], points: { B: 12 } } } }
  ];
  const realized = tradeHistory.realized(trade, weekly);
  assert.deepEqual(realized[1], { started: 10, bench: 4 });
  assert.deepEqual(realized[2], { started: 12, bench: 7 });
});

const context = (values) => ({
  assetValue: (asset) => (asset.pick ? values[`pick:${asset.pick.round}`] || 0 : values[asset.pid] || 0),
  sideValue: (values) => values.reduce((total, value) => total + value, 0)
});

test('grade: the side that got more on the market gets the better letter; points move the score', () => {
  const [trade] = tradeHistory.parse([buildTransaction({})], 2026);
  const grades = tradeHistory.grade(trade, context({ A: 6000, B: 4000 }), { 1: { started: 30, bench: 0 }, 2: { started: 20, bench: 0 } });
  assert.ok(grades[1].valuePct > 0 && grades[2].valuePct < 0);
  assert.equal(grades[1].valueNet, 2000);
  assert.equal(grades[1].ptsNet, 10);
  assert.ok(/^[AB]/.test(grades[1].letter) && /^[DF]/.test(grades[2].letter), `${grades[1].letter}/${grades[2].letter}`);
});

test('grade: an even trade is a C each, and with no market price the points decide', () => {
  const [trade] = tradeHistory.parse([buildTransaction({})], 2026);
  const even = tradeHistory.grade(trade, context({ A: 5000, B: 5000 }), null);
  assert.deepEqual([even[1].letter, even[2].letter], ['C', 'C']);
  const redraft = tradeHistory.grade(trade, context({}), { 1: { started: 60, bench: 0 }, 2: { started: 10, bench: 0 } });
  assert.ok(redraft[1].ptsNet === 50 && /^[AB]/.test(redraft[1].letter) && /^[DF]/.test(redraft[2].letter));
});

test('profiles and league band: how often, how fair, and what a league tolerates', () => {
  const trades = tradeHistory.parse([
    buildTransaction({ transaction_id: 'a', created: 3 }), buildTransaction({ transaction_id: 'b', created: 2 }),
    buildTransaction({ transaction_id: 'c', created: 1 }), buildTransaction({ transaction_id: 'd', created: 0 })
  ], 2026);
  const graded = trades.map((trade) => ({ trade, grades: tradeHistory.grade(trade, context({ A: 5500, B: 5000 }), null) }));
  const profiles = tradeHistory.profiles(graded);
  assert.equal(profiles[1].trades, 4);
  assert.ok(profiles[1].avgPct > 0 && profiles[2].avgPct < 0);
  assert.equal(profiles[1].partners[2], 4);
  const leagueBand = tradeHistory.league(graded, 1);
  assert.equal(leagueBand.count, 4);
  assert.ok(Math.abs(leagueBand.medianAbsPct - 500 / 5500) < 1e-9);
  assert.ok(leagueBand.tolerance >= 0.06 && leagueBand.tolerance <= 0.2);
  assert.equal(tradeHistory.league(graded.slice(0, 2), 1).tolerance, null);
});

test('letters run A to F around an even trade, in small steps', () => {
  assert.deepEqual([0.5, 0.3, 0.12, 0.05, 0, -0.05, -0.12, -0.3].map(tradeHistory.letterFor), ['A+', 'A', 'B', 'C+', 'C', 'C-', 'D', 'F']);
  assert.strictEqual(tradeHistory.letterFor(0.12), 'B', 'a 12% edge, the typical real deal, is a B and not an A');
  assert.strictEqual(tradeHistory.toneOf('B+'), 'B');
});
