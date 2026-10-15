globalThis.NightOwl = {};
const test = require('node:test');
const assert = require('node:assert');
const tradeDrafts = require('../src/trades/drafts.js');

const rookie = {
  season: '2025', rounds: 2, teams: 4, slotToRoster: { 1: 10, 2: 20, 3: 30, 4: 40 },
  picks: [
    { no: 1, round: 1, slot: 1, by: 10, pid: 'A' }, { no: 2, round: 1, slot: 2, by: 20, pid: 'B' },
    { no: 3, round: 1, slot: 3, by: 10, pid: 'C' },
    { no: 4, round: 1, slot: 4, by: 40, pid: 'D' },
    { no: 5, round: 2, slot: 4, by: 40, pid: 'E' }, { no: 6, round: 2, slot: 3, by: 30, pid: 'F' },
    { no: 7, round: 2, slot: 2, by: 20, pid: 'G' }, { no: 8, round: 2, slot: 1, by: 10, pid: 'H' }
  ]
};
const startup = { season: '2025', rounds: 5, teams: 4, slotToRoster: { 1: 10, 2: 20, 3: 30, 4: 40 }, picks: [{ no: 1, round: 1, slot: 1, by: 10, pid: 'Z' }] };

test('the rookie draft is the short one when a season has two', () => {
  assert.strictEqual(tradeDrafts.rookieDraft([startup, rookie], 2025), rookie);
  assert.strictEqual(tradeDrafts.rookieDraft([rookie], 2030), null);
});

test('a traded pick resolves to the player taken with it, by original owner', () => {
  const pickIndex = tradeDrafts.index([startup, rookie]);
  assert.strictEqual(tradeDrafts.resolve(pickIndex, { season: '2025', round: 1, from: 30 }).pid, 'C');
  assert.strictEqual(tradeDrafts.resolve(pickIndex, { season: '2025', round: 1, from: 30 }).by, 10);
  assert.strictEqual(tradeDrafts.resolve(pickIndex, { season: '2025', round: 2, from: 40 }).pid, 'E');
  assert.strictEqual(tradeDrafts.resolve(pickIndex, { season: '2026', round: 1, from: 10 }), null, 'not drafted yet');
});

test('expected value is what the picks around a slot returned', () => {
  assert.deepStrictEqual(tradeDrafts.expected([10, 20, 30]), [25, 20, 15]);
  assert.deepStrictEqual(tradeDrafts.expected([5]), [0]);
});

test('board: rounds down, slots across; a pick that beats its neighbours scores up, one that busts scores down', () => {
  const values = { A: 5000, B: 4800, C: 9000, D: 4500, E: 3000, F: 0, G: 2800, H: 2500 };
  const board = tradeDrafts.board(rookie, (playerId) => values[playerId]);
  assert.strictEqual(board.rounds, 2);
  assert.strictEqual(board.rows[0].length, 4);
  assert.strictEqual(board.rows[0][2].pid, 'C');
  assert.ok(board.rows[0][2].traded && !board.rows[0][0].traded);
  assert.ok(board.rows[0][2].score > 0.5, `a steal: ${board.rows[0][2].score}`);
  assert.ok(board.rows[1][2].score < -0.5, `a bust: ${board.rows[1][2].score}`);
  assert.strictEqual(board.rows[0][2].label, '1.03');
  assert.ok(board.byRoster[10].value === 5000 + 9000 + 2500 && board.byRoster[10].picks === 3);
});

test('after trades: a pick bought is graded against its price, a pick sold against what it fetched', () => {
  const values = { A: 5000, B: 4800, C: 9000, D: 4500, E: 3000, F: 0, G: 2800, H: 2500 };
  const board = tradeDrafts.board(rookie, (playerId) => values[playerId]);
  const trade = (got, gave, gotPicks, gavePicks) => ({ got, gave, gotPicks, gavePicks });
  const trades = [{ sides: { 10: trade([], ['P'], [{ season: '2025', round: 1, from: 30 }], []), 30: trade(['P'], [], [], [{ season: '2025', round: 1, from: 30 }]) } }];
  const net = tradeDrafts.afterTrades(board, rookie, trades, (asset) => (asset.pid === 'P' ? 8000 : 0));
  assert.strictEqual(net[10].trades, -8000);
  assert.strictEqual(net[30].trades, 8000);
  assert.ok(net[10].score < board.byRoster[10].score, 'paying 8,000 for the pick takes most of the shine off the 9,000 player');
  assert.ok(net[30].score > 0, 'the seller was paid more than the slot was expected to return');
  const plain = tradeDrafts.afterTrades(board, rookie, [], () => 0);
  assert.strictEqual(plain[20].gain, Math.round(board.byRoster[20].excess));
});

test('the pick chart sets each slot\'s baseline, and a late-round hit is graded on total growth', () => {
  const chart = ({ round }) => ({ 1: 6000, 2: 4000 }[round]);
  const values = { A: 6000, B: 6000, C: 6000, D: 6000, E: 4000, F: 4000, G: 4000, H: 9000 };
  const board = tradeDrafts.board(rookie, (playerId) => values[playerId], chart);
  assert.strictEqual(board.picks[0].expected, 6000);
  assert.strictEqual(board.picks[7].expected, 4000);
  const net = tradeDrafts.afterTrades(board, rookie, [], () => 0);
  const best = Object.entries(net).sort((first, second) => second[1].gain - first[1].gain)[0];
  assert.strictEqual(best[0], '10', 'the team with the 9,000 second-rounder gained the most');
  assert.strictEqual(best[1].gain, 5000);
});

test('settle: a pick passed on before its draft is worth its slot; the player counts for the one who used it', () => {
  const pickIndex = tradeDrafts.index([rookie]);
  const pick = { season: '2025', round: 1, from: 30 };
  const sides = (got, gave, gotP, gaveP) => ({ got, gave, gotPicks: gotP, gavePicks: gaveP });
  const firstTrade = { at: 1, sides: { 20: sides([], [], [{ ...pick }], []), 30: sides([], [], [], [{ ...pick }]) } };
  const secondTrade = { at: 2, sides: { 10: sides([], [], [{ ...pick }], []), 20: sides([], [], [], [{ ...pick }]) } };
  tradeDrafts.settle([secondTrade, firstTrade], pickIndex);
  const first = firstTrade.sides[20].gotPicks[0];
  assert.ok(first.passed && first.pos === 3 && first.teams === 4 && !first.player, 'the middle holder only passed it on');
  assert.deepStrictEqual(firstTrade.sides[30].gavePicks[0].passed, true, 'both sides of a trade see the same value');
  assert.strictEqual(secondTrade.sides[10].gotPicks[0].player, 'C', 'the manager who held it at the draft used it');
  assert.strictEqual(secondTrade.sides[20].gavePicks[0].player, 'C');
});

test('settle: a pick whose holder did not draft with it (it moved some way not recorded) is priced at its slot', () => {
  const pickIndex = tradeDrafts.index([rookie]);
  const trade = { at: 1, sides: { 20: { got: [], gave: [], gotPicks: [{ season: '2025', round: 1, from: 30 }], gavePicks: [] }, 30: { got: [], gave: [], gotPicks: [], gavePicks: [{ season: '2025', round: 1, from: 30 }] } } };
  tradeDrafts.settle([trade], pickIndex);
  assert.ok(trade.sides[20].gotPicks[0].passed);
});

test('a late pick that loses all its value costs little; an early one costs its full shortfall', () => {
  const chart = ({ round }) => ({ 1: 6000, 2: 1500 }[round]);
  const draft = { season: '2025', rounds: 2, teams: 2, slotToRoster: { 1: 1, 2: 2 }, picks: [
    { no: 1, round: 1, slot: 1, by: 1, pid: 'a' }, { no: 2, round: 1, slot: 2, by: 2, pid: 'b' },
    { no: 3, round: 2, slot: 2, by: 2, pid: 'c' }, { no: 4, round: 2, slot: 1, by: 1, pid: 'd' } ] };
  const values = { a: 0, b: 6000, c: 0, d: 6000 };
  const board = tradeDrafts.board(draft, (playerId) => values[playerId], chart);
  const early = board.picks[0];
  const late = board.picks[2];
  assert.strictEqual(early.excess, -6000, 'an early bust counts in full');
  assert.ok(late.excess > -1500 * 0.5 && late.excess < 0, `a late bust counts for a fraction: ${late.excess}`);
  assert.ok(late.weight < early.weight);
});

test('a team whose picks changed hands with no trade on record is graded on the picks it used, and flagged', () => {
  const values = { A: 5000, B: 4800, C: 9000, D: 4500, E: 3000, F: 0, G: 2800, H: 2500 };
  const board = tradeDrafts.board(rookie, (playerId) => values[playerId]);
  const unrecorded = tradeDrafts.afterTrades(board, rookie, [], () => 0);
  assert.strictEqual(unrecorded[30].tradesUnknown, true, 'roster 30 lost its round-one slot to roster 10 with no trade on record');
  assert.strictEqual(unrecorded[10].tradesUnknown, true);
  assert.strictEqual(unrecorded[20].tradesUnknown, false, 'roster 20 kept every pick');
  assert.strictEqual(unrecorded[30].gain, Math.round(board.byRoster[30].excess), 'no phantom loss for slots it no longer held');
  const trade = { sides: { 10: { got: [], gave: ['P'], gotPicks: [{ season: '2025', round: 1, from: 30 }], gavePicks: [] }, 30: { got: ['P'], gave: [], gotPicks: [], gavePicks: [{ season: '2025', round: 1, from: 30 }] } } };
  const recorded = tradeDrafts.afterTrades(board, rookie, [trade], () => 100);
  assert.strictEqual(recorded[30].tradesUnknown, false);
  assert.strictEqual(recorded[10].tradesUnknown, false);
});

test('a kicker taken as a placeholder is left out of the grades and of its neighbours\' expectations', () => {
  const values = { A: 6000, B: 6000, C: 6000, D: 6000, E: 4000, F: 4000, G: 4000, H: 4000 };
  const chart = ({ round }) => ({ 1: 6000, 2: 4000 }[round]);
  const kickerAtSlotThree = (playerId) => playerId === 'C';
  const board = tradeDrafts.board(rookie, (playerId) => values[playerId], chart, kickerAtSlotThree);
  const placeholder = board.picks.find((pick) => pick.pid === 'C');
  assert.deepStrictEqual([placeholder.placeholder, placeholder.value, placeholder.expected, placeholder.score, placeholder.excess], [true, 0, 0, 0, 0]);
  assert.strictEqual(board.byRoster[10].picks, 2, 'roster 10 made three picks, one of them a placeholder');
  const around = tradeDrafts.expected([5000, null, 7000, 9000]);
  assert.deepStrictEqual(around, [7000, 0, 7000, 7000], 'a placeholder is not a neighbour and has no expectation of its own');
  const unrelated = tradeDrafts.board(rookie, (playerId) => values[playerId], chart);
  assert.strictEqual(unrelated.picks.every((pick) => !pick.placeholder), true);
});

test('kicker placeholders in a startup draft are replaced by the rookie-draft picks they stand for, in order', () => {
  const startup = { season: '2026', rounds: 5, teams: 2, slotToRoster: { 1: 1, 2: 2 }, picks: [
    { no: 1, round: 1, slot: 1, by: 1, pid: 'star' }, { no: 2, round: 1, slot: 2, by: 2, pid: 'kickerA' },
    { no: 3, round: 2, slot: 2, by: 2, pid: 'other' }, { no: 4, round: 2, slot: 1, by: 1, pid: 'kickerB' } ] };
  const rookie = { season: '2026', rounds: 2, teams: 2, slotToRoster: { 1: 1, 2: 2 }, picks: [
    { no: 1, round: 1, slot: 1, by: 1, pid: 'rookie1' }, { no: 2, round: 1, slot: 2, by: 2, pid: 'rookie2' }, { no: 3, round: 2, slot: 1, by: 1, pid: 'rookie3' } ] };
  const isKicker = (playerId) => playerId.startsWith('kicker');
  const { draft, swapped } = tradeDrafts.swapPlaceholdersForRookiePicks(startup, rookie, isKicker);
  assert.strictEqual(swapped, 0, 'owners do not line up (team 2 took the first kicker, team 1 made the first rookie pick), so it is left as placeholders');
  assert.strictEqual(draft.picks[1].pid, 'kickerA');

  const matching = { season: '2026', rounds: 2, teams: 2, slotToRoster: { 1: 1, 2: 2 }, picks: [
    { no: 1, round: 1, slot: 1, by: 2, pid: 'rookie1' }, { no: 2, round: 1, slot: 2, by: 1, pid: 'rookie2' }, { no: 3, round: 2, slot: 1, by: 1, pid: 'rookie3' } ] };
  const kickersInRookieOrder = { season: '2026', rounds: 5, teams: 2, slotToRoster: { 1: 1, 2: 2 }, picks: [
    { no: 1, round: 1, slot: 1, by: 1, pid: 'star' }, { no: 2, round: 1, slot: 2, by: 2, pid: 'kickerA' },
    { no: 3, round: 2, slot: 2, by: 2, pid: 'other' }, { no: 4, round: 2, slot: 1, by: 1, pid: 'kickerB' } ] };
  const aligned = Object.assign({}, matching, { picks: [{ no: 1, round: 1, slot: 1, by: 2, pid: 'rookie1' }, { no: 2, round: 1, slot: 2, by: 1, pid: 'rookie2' }] });
  const swappedBoard = tradeDrafts.swapPlaceholdersForRookiePicks(kickersInRookieOrder, aligned, isKicker);
  assert.strictEqual(swappedBoard.swapped, 2);
  const [first, second] = [swappedBoard.draft.picks[1], swappedBoard.draft.picks[3]];
  assert.deepStrictEqual([first.pid, first.by, first.originalOwner, first.rookiePickLabel], ['rookie1', 2, 2, '1.01']);
  assert.deepStrictEqual([second.pid, second.by, second.originalOwner, second.rookiePickLabel], ['rookie2', 1, 1, '1.02']);
  const board = tradeDrafts.board(swappedBoard.draft, () => 5000, () => 5000, isKicker);
  assert.strictEqual(board.picks.every((pick) => !pick.placeholder), true, 'nothing is left as a placeholder');
  assert.strictEqual(board.picks.find((pick) => pick.no === 2).rookiePickLabel, '1.01');
});

test('a rookie pick traded after the kicker was taken shows as traded, with its first holder as the original owner', () => {
  const startup = { season: '2026', rounds: 5, teams: 2, slotToRoster: { 1: 1, 2: 2 }, picks: [
    { no: 1, round: 1, slot: 1, by: 1, pid: 'kickerA' }, { no: 2, round: 1, slot: 2, by: 2, pid: 'kickerB' },
    { no: 3, round: 2, slot: 2, by: 1, pid: 'kickerC' }, { no: 4, round: 2, slot: 1, by: 2, pid: 'kickerD' }, { no: 5, round: 3, slot: 1, by: 1, pid: 'star' } ] };
  const rookie = { season: '2026', rounds: 2, teams: 2, slotToRoster: { 1: 1, 2: 2 }, picks: [
    { no: 1, round: 1, slot: 1, by: 1, pid: 'rookie1' }, { no: 2, round: 1, slot: 2, by: 2, pid: 'rookie2' },
    { no: 3, round: 2, slot: 1, by: 1, pid: 'rookie3' }, { no: 4, round: 2, slot: 2, by: 1, pid: 'rookie4' } ] };
  const { draft, swapped } = tradeDrafts.swapPlaceholdersForRookiePicks(startup, rookie, (playerId) => playerId.startsWith('kicker'));
  assert.strictEqual(swapped, 4, 'three of four owners line up, which is enough');
  const board = tradeDrafts.board(draft, () => 4000, null, null);
  const moved = board.picks.find((pick) => pick.no === 4);
  assert.deepStrictEqual([moved.by, moved.from, moved.traded, moved.rookiePickLabel], [1, 2, true, '2.02']);
  const kept = board.picks.find((pick) => pick.no === 1);
  assert.deepStrictEqual([kept.by, kept.traded], [1, false]);
});
