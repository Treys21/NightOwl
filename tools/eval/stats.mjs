import { seededRandom } from './lib/random.mjs';
import { median } from './quality.mjs';

export const mean = (values) => (values.length ? values.reduce((total, value) => total + value, 0) / values.length : 0);

export function standardDeviation(values) {
  if (values.length < 2) return 0;
  const center = mean(values);
  return Math.sqrt(values.reduce((total, value) => total + (value - center) ** 2, 0) / (values.length - 1));
}

export function clusterBootstrap(values, clusters, { iterations = 10000, seed = 1, level = 0.95 } = {}) {
  const groups = new Map();
  values.forEach((value, index) => {
    const key = clusters[index];
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(value);
  });
  const lists = [...groups.values()];
  const estimate = mean(values);
  if (lists.length < 2) return { mean: estimate, low: estimate, high: estimate, clusters: lists.length, n: values.length };
  const random = seededRandom(seed);
  const draws = [];
  for (let iteration = 0; iteration < iterations; iteration++) {
    let total = 0;
    let count = 0;
    for (let pick = 0; pick < lists.length; pick++) {
      const list = lists[Math.floor(random() * lists.length)];
      for (const value of list) { total += value; count++; }
    }
    draws.push(total / count);
  }
  draws.sort((a, b) => a - b);
  const tail = (1 - level) / 2;
  return { mean: estimate, low: draws[Math.floor(tail * iterations)], high: draws[Math.min(iterations - 1, Math.floor((1 - tail) * iterations))], clusters: lists.length, n: values.length };
}

export function detectableEffect(values, clusters) {
  const effective = Math.max(1, new Set(clusters).size);
  return 2.8 * standardDeviation(values) / Math.sqrt(effective);
}

export function holm(pValues) {
  const order = pValues.map((p, index) => ({ p, index })).sort((a, b) => a.p - b.p);
  const out = new Array(pValues.length);
  let running = 0;
  order.forEach((entry, rank) => {
    running = Math.max(running, Math.min(1, entry.p * (pValues.length - rank)));
    out[entry.index] = running;
  });
  return out;
}

export function bootstrapP(values, clusters, options = {}) {
  const result = clusterBootstrap(values, clusters, Object.assign({ iterations: 4000 }, options));
  const groups = new Map();
  values.forEach((value, index) => { if (!groups.has(clusters[index])) groups.set(clusters[index], []); groups.get(clusters[index]).push(value); });
  const lists = [...groups.values()];
  if (lists.length < 2) return 1;
  const centered = values.map((value) => value - result.mean);
  const centeredGroups = new Map();
  centered.forEach((value, index) => { if (!centeredGroups.has(clusters[index])) centeredGroups.set(clusters[index], []); centeredGroups.get(clusters[index]).push(value); });
  const centeredLists = [...centeredGroups.values()];
  const random = seededRandom((options.seed || 1) + 7);
  const iterations = options.iterations || 4000;
  let extreme = 0;
  for (let iteration = 0; iteration < iterations; iteration++) {
    let total = 0;
    let count = 0;
    for (let pick = 0; pick < centeredLists.length; pick++) {
      const list = centeredLists[Math.floor(random() * centeredLists.length)];
      for (const value of list) { total += value; count++; }
    }
    if (Math.abs(total / count) >= Math.abs(result.mean)) extreme++;
  }
  return (extreme + 1) / (iterations + 1);
}

export { median };
