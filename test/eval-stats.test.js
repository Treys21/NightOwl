const test = require('node:test');
const assert = require('node:assert');

test('cluster bootstrap interval brackets the mean and respects clusters', async () => {
  const { clusterBootstrap, holm, detectableEffect } = await import('../tools/eval/stats.mjs');
  const values = [4, 5, 6, 5, 4, 6, 5, 5];
  const clusters = ['a', 'a', 'b', 'b', 'c', 'c', 'd', 'd'];
  const result = clusterBootstrap(values, clusters, { iterations: 2000, seed: 3 });
  assert.ok(result.low <= result.mean && result.mean <= result.high);
  assert.strictEqual(result.clusters, 4);
  const noisy = clusterBootstrap([10, -10, 9, -9], ['a', 'b', 'c', 'd'], { iterations: 2000, seed: 3 });
  assert.ok(noisy.low < 0 && noisy.high > 0);
  assert.deepStrictEqual(holm([0.01, 0.04, 0.03]).map((value) => Math.round(value * 100) / 100), [0.03, 0.06, 0.06]);
  assert.ok(detectableEffect([1, 2, 3, 4], ['a', 'b', 'c', 'd']) > 0);
});

test('same seed gives the same bootstrap and outliers are flagged by MAD', async () => {
  const { clusterBootstrap } = await import('../tools/eval/stats.mjs');
  const { madOutliers, scoreCase } = await import('../tools/eval/quality.mjs');
  const values = [1, 2, 3, 2, 1, 3];
  const clusters = ['a', 'b', 'c', 'd', 'e', 'f'];
  assert.deepStrictEqual(clusterBootstrap(values, clusters, { seed: 5 }), clusterBootstrap(values, clusters, { seed: 5 }));
  assert.deepStrictEqual(madOutliers([1, 2, 2, 3, 2, 100]), [false, false, false, false, false, true]);
  const good = { seasonComplete: true, actingTeamAbandoned: false, weeksLeft: 8, candidateCount: 10, teams: 12, marketValuesFromToday: false, lopsidedShare: 0 };
  assert.strictEqual(scoreCase(good).accepted, true);
  assert.strictEqual(scoreCase(Object.assign({}, good, { weeksLeft: 2 })).accepted, false);
  const leaky = scoreCase(Object.assign({}, good, { marketValuesFromToday: true, weeksLeft: 4 }));
  assert.deepStrictEqual(leaky.reasons, ['short-outcome-window', 'market-values-from-today']);
  assert.strictEqual(leaky.score, 0.7);
  assert.strictEqual(scoreCase(Object.assign({}, good, { marketValuesFromToday: true, weeksLeft: 4 }), { acceptThreshold: 0.75 }).accepted, false);
  assert.strictEqual(scoreCase(Object.assign({}, good, { marketValuesFromToday: true }), { acceptThreshold: 0.95 }).accepted, false);
});
