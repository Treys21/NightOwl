const test = require('node:test');
const assert = require('node:assert');

globalThis.NightOwl = {};
require('../src/valuation/age-curves.js');
const dynasty = require('../src/valuation/dynasty-values.js');

const stream = (position, age, ratePerGame = 16, overrides = {}) => dynasty.productionStream(Object.assign({ restOfSeasonPoints: ratePerGame * 10, gamesLeft: 10, perGameRate: ratePerGame, replacementRate: 8, position, age }, overrides));

test('contenders weigh this season and discount the future steeply; rebuilders the reverse', () => {
  const contender = dynasty.seasonWeights(1);
  const rebuilder = dynasty.seasonWeights(0);
  assert.ok(contender[0] > rebuilder[0], 'this season counts more to a contender');
  assert.ok(rebuilder[3] > contender[3] * 2.5, 'three seasons out counts far more to a rebuilder');
  assert.strictEqual(contender.length, dynasty.SEASONS_AHEAD + 1);
});

test('a production stream is points over replacement, season by season, and fades with age', () => {
  const youngBack = stream('RB', 23);
  const oldBack = stream('RB', 28);
  assert.strictEqual(youngBack[0], 16 * 10 - 8 * 10, 'this season: rest-of-season points over replacement');
  assert.ok(oldBack[1] < youngBack[1] * 0.5, 'a 28-year-old back is worth less than half a 23-year-old next year');
  assert.strictEqual(oldBack[2], 0, 'and by two years out he is no better than a free agent');
  assert.ok(youngBack[1] >= youngBack[0] * 1.5, 'a 23-year-old back holds his level');
});

test('a contender prefers the veteran; a rebuilder prefers the young player of equal production now', () => {
  const veteran = stream('WR', 29);
  const young = stream('WR', 23);
  const asContender = (anyStream) => dynasty.weightedProduction(anyStream, 1);
  const asRebuilder = (anyStream) => dynasty.weightedProduction(anyStream, 0);
  assert.ok(asRebuilder(young) - asRebuilder(veteran) > asContender(young) - asContender(veteran), 'the young player gains ground for a rebuilder');
  assert.ok(asRebuilder(young) > asRebuilder(veteran), 'and wins outright for a rebuilder');
});

test('production is trusted for established players and the market for prospects', () => {
  assert.strictEqual(dynasty.productionTrust(21, true), 0.1);
  assert.strictEqual(dynasty.productionTrust(27, true), 0.5);
  assert.strictEqual(dynasty.productionTrust(27, false), 0, 'no projection, no production signal');
  const prospect = dynasty.blendedValue({ marketValue: 5000, productionValue: 0, age: 21, hasProjection: true });
  const veteran = dynasty.blendedValue({ marketValue: 5000, productionValue: 0, age: 29, hasProjection: true });
  assert.ok(prospect > veteran, 'a prospect with no production keeps most of his market value; a veteran with none does not');
  assert.strictEqual(dynasty.blendedValue({ marketValue: 0, productionValue: 9000, age: 27, hasProjection: true }), 0, 'nothing the market will not price');
});

test('production can lift a value only so far above the market', () => {
  const lifted = dynasty.blendedValue({ marketValue: 4000, productionValue: 90000, age: 27, hasProjection: true });
  assert.ok(lifted <= 4000 * 1.25 + 1, `capped: ${lifted}`);
});

test('the price of production is the median of what the market pays per point, for players who matter', () => {
  const samples = [
    { marketValue: 6000, neutralProduction: 60 }, { marketValue: 5000, neutralProduction: 50 }, { marketValue: 9000, neutralProduction: 60 },
    { marketValue: 500, neutralProduction: 90 }, { marketValue: 4000, neutralProduction: 3 }
  ];
  assert.strictEqual(dynasty.priceOfProduction(samples), 100, 'the 500-value and 3-point samples are noise');
  assert.strictEqual(dynasty.priceOfProduction([]), null);
});
