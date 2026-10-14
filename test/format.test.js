const test = require('node:test');
const assert = require('node:assert');

const format = require('../src/shared/format.js');

test('escape covers HTML metacharacters, null and numbers', () => {
  assert.equal(format.escape('<a href="x">Ja\'Marr & co</a>'), '&lt;a href=&quot;x&quot;&gt;Ja&#39;Marr &amp; co&lt;/a&gt;');
  assert.equal(format.escape(null), '');
  assert.equal(format.escape(7), '7');
});

test('points drop trailing zeros; tenths always show one decimal', () => {
  assert.equal(format.points(12.5), '12.5');
  assert.equal(format.points(7), '7');
  assert.equal(format.points(0.04), '0.04');
  assert.equal(format.points(null), '–');
  assert.equal(format.tenths(10.94), '10.9');
  assert.equal(format.tenths(3), '3.0');
  assert.equal(format.short(61.5), '61.5');
});

test('signed uses a real minus and ± for zero', () => {
  assert.equal(format.signed(2.5), '+2.5');
  assert.equal(format.signed(-3), '−3');
  assert.equal(format.signed(0), '±0');
  assert.equal(format.signed(-1.25, format.tenths), '−1.3');
});

test('percent and countdown', () => {
  assert.equal(format.percent(0.574), '57%');
  const now = 1_000_000_000_000;
  assert.equal(format.countdown(now + 12 * 60000, now), '12m');
  assert.equal(format.countdown(now + 185 * 60000, now), '3h 5m');
  assert.equal(format.countdown(now + (2 * 24 + 4) * 3600000, now), '2d 4h');
  assert.equal(format.countdown(now - 60000, now), '0m');
});

test('errorText: a sentence for a failed load, never the browser\'s "Failed to fetch"', () => {
  const { errorText } = format;
  assert.match(errorText(new TypeError('Failed to fetch')), /retries on its own/);
  assert.match(errorText(new Error('timed out: https://x')), /retries on its own/);
  assert.match(errorText(new Error('503 https://api.sleeper.app/v1/state/nfl')), /problem \(503\)/);
  assert.match(errorText(new Error('429 https://x')), /Too many requests/);
  assert.match(errorText(new Error('404 https://x')), /request \(404\)/);
  assert.strictEqual(errorText(new Error('No Sleeper user named "x"')), 'No Sleeper user named "x"');
  assert.ok(errorText(null));
});

test('windowTitle: an approximate kickoff names the day, not a made-up time', () => {
  const games = [{ away: 'SEA', home: 'DEN' }];
  const day = new Date('2026-10-15T17:00:00Z');
  const exact = format.windowTitle({ kickoff: day.getTime(), games });
  const approx = format.windowTitle({ kickoff: day.getTime(), games, approx: true });
  assert.match(exact, /\d:\d\d/);
  assert.doesNotMatch(approx, /\d:\d\d/);
  assert.match(approx, /SEA @ DEN/);
});
