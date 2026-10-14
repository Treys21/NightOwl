const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const bets = require('../src/bets/core.js');

const fixture = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/bets.json'), 'utf8'));

test('Sleeper lines become per-player NFL markets; other sports are dropped', () => {
  const lines = bets.parseLines(fixture.lines);
  assert.deepEqual(Object.keys(lines).sort(), ['10232', '10859']);
  const touchdownLine = lines['10232'].find((market) => market.type === 'anytime_touchdowns');
  assert.equal(touchdownLine.line, 0.5);
  assert.equal(touchdownLine.over, 2.34);
  assert.equal(touchdownLine.under, 1.41);
  assert.ok(touchdownLine.recent.length > 0 && touchdownLine.recent.length <= 10);
});

test('payouts turn into a fair probability with the margin removed', () => {
  assert.equal(Math.round(bets.impliedOver(2.34, 1.41) * 1000) / 10, 37.6);
  assert.equal(bets.impliedOver(2, 2), 0.5);
  assert.equal(bets.impliedOver(null, null), null);
});

test('hit rate counts games over the line', () => {
  const recent = [{ value: 0 }, { value: 2 }, { value: 1 }, { value: 0 }];
  assert.deepEqual(bets.hitRate(recent, 0.5), { over: 2, games: 4 });
  assert.equal(bets.hitRate([], 10), null);
});

test('closing lines survive after Sleeper pulls them at kickoff', () => {
  const pre = bets.parseLines(fixture.lines);
  const merged = bets.mergeLines(pre, {});
  assert.deepEqual(merged, pre);
  const moved = bets.mergeLines(pre, { 10232: [Object.assign({}, pre['10232'][0], { line: 99.5 })] });
  assert.equal(moved['10232'].find((market) => market.type === pre['10232'][0].type).line, 99.5);
  assert.equal(moved['10232'].length, pre['10232'].length);
});

test('ESPN milestone props become ladders per athlete', () => {
  const ladders = bets.parseMilestones(fixture.milestones);
  const any = Object.values(ladders)[0];
  assert.ok(any.length >= 1);
  for (const ladder of any) {
    assert.ok(ladder.rungs.length >= 1);
    assert.deepEqual(ladder.rungs, [...ladder.rungs].sort((a, b) => a - b));
  }
});

test('team implied totals from the spread and total', () => {
  const impliedTotals = bets.impliedTotals({ home: 'JAX', away: 'PHI', odds: { details: 'JAX -7.5', overUnder: 41.5 } });
  assert.deepEqual(impliedTotals.teams, { JAX: 24.5, PHI: 17 });
  const wsh = bets.impliedTotals({ home: 'WAS', away: 'NYG', odds: { details: 'WSH -3', overUnder: 44 } });
  assert.deepEqual(wsh.teams, { WAS: 23.5, NYG: 20.5 });
  assert.equal(bets.impliedTotals({ home: 'A', away: 'B' }), null);
});

test('defense ranks: 1st allows the most fantasy points per game to a position', () => {
  const ranks = bets.defenseRanks(fixture.defs);
  assert.equal(Object.keys(ranks).length, 32);
  const wrRanks = Object.values(ranks).map((rank) => rank.WR.rank).sort((a, b) => a - b);
  assert.deepEqual(wrRanks, Array.from({ length: 32 }, (_, i) => i + 1));
  const first = Object.values(ranks).find((rank) => rank.WR.rank === 1).WR.perGame;
  const last = Object.values(ranks).find((rank) => rank.WR.rank === 32).WR.perGame;
  assert.ok(first > last);
});

test('live progress against a line, and TDs settle at 0.5', () => {
  const receivingMarket = { keys: ['rec_yd'], line: 89.5 };
  assert.deepEqual(bets.progress(receivingMarket, { rec_yd: 45 }), { value: 45, line: 89.5, pct: 45 / 89.5, hit: false });
  assert.equal(bets.progress(receivingMarket, { rec_yd: 92 }).hit, true);
  const combo = { keys: ['rush_yd', 'rec_yd'], line: 60.5 };
  assert.equal(bets.progress(combo, { rush_yd: 40, rec_yd: 25 }).value, 65);
  const touchdownMarket = { keys: ['rush_td', 'rec_td'], line: 0.5, td: true };
  assert.equal(bets.progress(touchdownMarket, { rec_td: 1 }).hit, true);
  assert.equal(bets.progress(touchdownMarket, {}).hit, false);
  assert.equal(bets.progress(receivingMarket, undefined), null);
  assert.equal(bets.progress(receivingMarket, { rush_yd: 3 }).value, 0);
});

test('statValue is null when the stat line has none of the keys', () => {
  assert.equal(bets.statValue({ rec_yd: 40 }, ['rec_lng']), null);
  assert.equal(bets.statValue({ rec_yd: 40, rush_yd: 12.25 }, ['rec_yd', 'rush_yd']), 52.3);
});

test('ordinals', () => {
  assert.deepEqual([1, 2, 3, 4, 11, 12, 13, 21, 22, 32].map(bets.ordinal),
    ['1st', '2nd', '3rd', '4th', '11th', '12th', '13th', '21st', '22nd', '32nd']);
});

test('payout multipliers convert to American odds', () => {
  assert.equal(bets.american(2.34), '+134');
  assert.equal(bets.american(1.41), '-244');
  assert.equal(bets.american(2), '+100');
  assert.equal(bets.american(1.78), '-128');
  assert.equal(bets.american(null), null);
  assert.equal(bets.american(1), null);
});

test('key market per position for the collapsed row', () => {
  const market = (type) => ({ type, td: type === 'anytime_touchdowns', keys: [] });
  const markets = [market('anytime_touchdowns'), market('receptions'), market('receiving_yards'), market('rushing_yards')];
  assert.equal(bets.keyMarket(markets, 'WR').type, 'receiving_yards');
  assert.equal(bets.keyMarket(markets, 'RB').type, 'rushing_yards');
  assert.equal(bets.keyMarket([market('anytime_touchdowns')], 'WR'), null);
  assert.equal(bets.keyMarket([market('longest_rush')], 'QB').type, 'longest_rush');
});

test('sort scores: TD odds, best hit rate (4+ games), best projection edge', () => {
  const touchdownMarket = { type: 'anytime_touchdowns', td: true, pOver: 0.42, recent: [] };
  const receivingMarket = { type: 'receiving_yards', keys: ['rec_yd'], line: 50, recent: [5, 60, 70, 80, 20].map((value) => ({ value })) };
  assert.equal(bets.SORTS.td([touchdownMarket, receivingMarket]), 0.42);
  assert.equal(bets.SORTS.td([receivingMarket]), -1);
  assert.equal(bets.SORTS.hit([touchdownMarket, receivingMarket]), 3 / 5);
  assert.equal(bets.SORTS.lean([receivingMarket], { rec_yd: 60 }), 0.2);
  assert.equal(bets.SORTS.lean([receivingMarket], {}), -Infinity);
});

test('long milestone ladders keep the rungs nearest the line', () => {
  const ladder = [40, 50, 60, 70, 80, 86, 90, 100, 110, 120, 130, 140, 150];
  assert.deepEqual(bets.trimRungs(ladder, 84.5), [60, 70, 80, 86, 90, 100]);
  assert.deepEqual(bets.trimRungs([15, 25, 40], 30), [15, 25, 40]);
  assert.equal(bets.trimRungs(ladder, null).length, 6);
});

test('live line by position, for players without a betting line', () => {
  assert.equal(bets.liveLine('WR', { rec: 4, rec_yd: 38 }), '4 rec · 38 yds so far');
  assert.equal(bets.liveLine('QB', { pass_yd: 212, pass_td: 2 }), '212 pass yds · 2 TD so far');
  assert.equal(bets.liveLine('RB', {}), '0 rush yds · 0 rec so far');
  assert.equal(bets.liveLine('DEF', {}), '');
});
