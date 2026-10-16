import { parseArgs } from 'node:util';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { loadWorld, EVAL_DIR, readJson } from './lib/env.mjs';
import { rebuild, makeScorer } from './lib/replay.mjs';
import { learnedFactsFor, learnedLikelihood } from './lib/learned.mjs';
import { clusterBootstrap, mean } from './stats.mjs';

const { values: options } = parseArgs({ options: { split: { type: 'string', default: 'tuning' }, gate: { type: 'string', default: '0.3' }, limit: { type: 'string', default: '1000' } } });
const GATE = Number(options.gate);
const weights = readJson(join(import.meta.dirname, 'weights.json'));
const world = await loadWorld();

const cases = readdirSync(join(EVAL_DIR, 'cases')).filter((name) => name.endsWith('.json')).map((name) => readJson(join(EVAL_DIR, 'cases', name)))
  .filter((entry) => entry.kind !== 'redraft' && (options.split === 'all' || entry.split === options.split)).sort((a, b) => a.id.localeCompare(b.id)).slice(0, Number(options.limit));

const rows = [];
for (const entry of cases) {
  const truth = readJson(join(EVAL_DIR, 'truth', `${entry.id}.json`));
  if (!truth || entry.view.candidates.length < 4) continue;
  const built = await rebuild(world, entry);
  const score = makeScorer(world, weights, entry, truth, built);
  const facts = learnedFactsFor(world, built.season, built.rosterPlayers, entry.week, built.standings);
  const scored = entry.view.candidates.map((candidate) => {
    let learned = null;
    try { learned = learnedLikelihood(facts, entry.rosterId, candidate); } catch (error) { learned = null; }
    return { learned, outcome: score({ source: 'candidate', partnerId: candidate.partnerId, give: candidate.give, get: candidate.get }).score };
  });
  if (scored.some((item) => item.learned === null)) continue;
  const order = scored.map((item) => item.learned).sort((a, b) => a - b);
  const cutoff = order[Math.floor(order.length * GATE)];
  const kept = scored.filter((item) => item.learned >= cutoff);
  const byLearned = scored.slice().sort((a, b) => b.learned - a.learned);
  rows.push({ league: entry.leagueId, static: scored[0].outcome, gated: kept[0].outcome, learnedTop: byLearned[0].outcome, all: mean(scored.map((item) => item.outcome)), keptAll: mean(kept.map((item) => item.outcome)), droppedAll: mean(scored.filter((item) => item.learned < cutoff).map((item) => item.outcome)) });
}
console.log(`${rows.length} dynasty cases (${options.split}), gate drops the least likely ${Math.round(GATE * 100)}%`);
for (const [label, a, b] of [['gated first pick vs static first pick', 'gated', 'static'], ['most-likely pick vs static first pick', 'learnedTop', 'static'], ['kept candidates vs all candidates (mean)', 'keptAll', 'all']]) {
  const diffs = rows.map((row) => ({ cluster: row.league, value: row[a] - row[b] }));
  const result = clusterBootstrap(diffs.map((entry) => entry.value), diffs.map((entry) => entry.cluster));
  console.log(`${label}: ${result.mean.toFixed(2)} [${result.low.toFixed(2)}, ${result.high.toFixed(2)}]`);
}
const dropped = rows.filter((row) => Number.isFinite(row.droppedAll));
console.log(`mean outcome of dropped candidates ${mean(dropped.map((row) => row.droppedAll)).toFixed(2)} vs kept ${mean(dropped.map((row) => row.keptAll)).toFixed(2)}`);
