const test = require('node:test');
const assert = require('node:assert');

const { round1, round2 } = require('../src/shared/numbers.js');

test('round1 and round2 round to a tenth and a hundredth', () => {
  assert.equal(round1(2.345), 2.3);
  assert.equal(round2(2.345), 2.35);
  assert.equal(round1(-0.04), 0);
});
