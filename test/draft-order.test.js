const test = require('node:test');
const assert = require('node:assert');

const api = require('../src/draft/draft-order.js');

const snake12 = { type: 'snake', settings: { teams: 12 } };
const linear12 = { type: 'linear', settings: { teams: 12 } };

test('round 1 runs forward', () => {
  assert.equal(api.slotOnClock(snake12, 1), 1);
  assert.equal(api.slotOnClock(snake12, 12), 12);
});

test('round 2 reverses', () => {
  assert.equal(api.slotOnClock(snake12, 13), 12);
  assert.equal(api.slotOnClock(snake12, 24), 1);
});

test('round 3 runs forward again', () => {
  assert.equal(api.slotOnClock(snake12, 25), 1);
  assert.equal(api.slotOnClock(snake12, 36), 12);
});

test('linear drafts never reverse', () => {
  assert.equal(api.slotOnClock(linear12, 13), 1);
  assert.equal(api.slotOnClock(linear12, 24), 12);
});

test('slotOnClock returns null without team count', () => {
  assert.equal(api.slotOnClock({ type: 'snake', settings: {} }, 5), null);
  assert.equal(api.slotOnClock(null, 5), null);
});

test('slotForUser reads the draft order', () => {
  const draft = { draft_order: { '730717096874491904': 8, '726734936429641728': 11 } };
  assert.equal(api.slotForUser(draft, '730717096874491904'), 8);
  assert.equal(api.slotForUser(draft, '999'), null);
  assert.equal(api.slotForUser(draft, null), null);
  assert.equal(api.slotForUser({}, '730717096874491904'), null);
});
