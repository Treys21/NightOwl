const test = require('node:test');
const assert = require('node:assert');
const likelihood = require('../src/ai/likelihood.js');
const model = require('../src/ai/likelihood-model-dynasty.js');
const data = require('./fixtures/likelihood-dynasty.json');

const inputOf = (fixture) => ({
  positions: fixture.positions,
  sides: fixture.sides,
  rosters: Object.fromEntries(Object.entries(fixture.rosters).map(([rid, roster]) => [rid, { size: roster.n, players: roster.players.map((player) => Object.assign({}, player, { age: player.age })) }])),
  rank: fixture.rank
});

test('features match the training pipeline', () => {
  data.fixtures.forEach((fixture) => {
    const features = likelihood.featurize(inputOf(fixture));
    fixture.features.forEach((expected, index) => {
      model.keys.forEach((key) => {
        assert.ok(Math.abs(features[index][key] - expected[key]) < 1e-6, `${key}: ${features[index][key]} vs ${expected[key]}`);
      });
    });
  });
});

test('predictions match the trained model', () => {
  data.fixtures.forEach((fixture) => {
    const result = likelihood.likelihood(model, inputOf(fixture));
    assert.ok(Math.abs(result.raw - fixture.raw) < 1e-6, `${result.raw} vs ${fixture.raw}`);
    assert.ok(Math.abs(result.calibrated - fixture.calibrated) < 1e-6, `${result.calibrated} vs ${fixture.calibrated}`);
  });
});
