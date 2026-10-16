import { parseArgs } from 'node:util';
import { readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { loadWorld, EVAL_DIR, readJson, writeJson } from './lib/env.mjs';
import { rebuild as rebuildCase, makeScorer } from './lib/replay.mjs';
import { winsorize, median } from './quality.mjs';
import { mean, standardDeviation, clusterBootstrap, detectableEffect, bootstrapP } from './stats.mjs';
import prompts from '../../src/ai/prompts.js';
import validate from '../../src/ai/validate.js';

const { values: options } = parseArgs({ options: {
  runs: { type: 'string', default: 'run1' },
  split: { type: 'string', default: 'tuning' },
  version: { type: 'string', default: prompts.VERSION },
  baseline: { type: 'string' },
  label: { type: 'string' },
  weights: { type: 'string' }
} });

const weights = readJson(options.weights || join(import.meta.dirname, 'weights.json'));
const world = await loadWorld();
const runs = options.runs.split(',');
const round = (value, places = 2) => (Number.isFinite(value) ? Math.round(value * 10 ** places) / 10 ** places : null);

const cases = readdirSync(join(EVAL_DIR, 'cases')).filter((name) => name.endsWith('.json')).map((name) => readJson(join(EVAL_DIR, 'cases', name)))
  .filter((entry) => options.split === 'all' || entry.split === options.split)
  .sort((a, b) => a.id.localeCompare(b.id));

const rebuild = (entry) => rebuildCase(world, entry);
const scorer = (entry, truth, built) => makeScorer(world, weights, entry, truth, built);

const rows = [];
for (const entry of cases) {
  const truth = readJson(join(EVAL_DIR, 'truth', `${entry.id}.json`));
  if (!truth) continue;
  const built = await rebuild(entry);
  const score = scorer(entry, truth, built);
  const candidates = entry.view.candidates.map((candidate) => ({ source: 'candidate', key: candidate.key, partnerId: candidate.partnerId, give: candidate.give, get: candidate.get }));
  const candidateScores = candidates.map(score);
  const staticTop1 = candidateScores[0].score;
  const staticTop3 = mean(candidateScores.slice(0, 3).map((result) => result.score));
  const staticAll = mean(candidateScores.map((result) => result.score));

  const perRun = [];
  for (const run of runs) {
    const file = join(EVAL_DIR, 'replies', options.version, run, `${entry.id}.json`);
    if (!existsSync(file)) continue;
    const text = readFileSync_(file);
    const parsed = validate.suggestions(text, entry.view);
    const scored = parsed.suggestions.map((deal) => Object.assign({ source: deal.source }, score(deal)));
    perRun.push({ run, valid: parsed.ok, errors: parsed.errors, suggestions: scored.length, top1: scored.length ? scored[0].score : 0, top3: scored.length ? mean(scored.map((result) => result.score)) : 0, accepted: scored.filter((result) => result.accepted).length, custom: scored.filter((result) => result.source === 'custom').length, firstAccepted: scored.length ? scored[0].accepted : false });
  }
  if (!perRun.length) continue;
  rows.push({ id: entry.id, leagueId: entry.leagueId, kind: entry.kind === 'redraft' ? 'redraft' : 'dynasty', staticTop1, staticTop3, staticAll, best: Math.max(...candidateScores.map((result) => result.score)), perRun });
}

function readFileSync_(file) {
  return readFileSync(file, 'utf8');
}

import { readFileSync } from 'node:fs';

const report = { version: options.version, runs, split: options.split, weightsVersion: weights.version, kinds: {} };
const lines = [`# Eval ${options.label || options.version} (${options.split}, ${runs.join('+')})`, ''];

for (const kind of ['redraft', 'dynasty']) {
  const group = rows.filter((row) => row.kind === kind);
  if (!group.length) continue;
  const average = (pick) => group.map((row) => mean(row.perRun.map(pick)));
  const top1 = average((run) => run.top1);
  const top3 = average((run) => run.top3);
  const paired1 = group.map((row, index) => top1[index] - row.staticTop1);
  const paired3 = group.map((row, index) => top3[index] - row.staticTop3);
  const clip1 = winsorize(paired1, weights.outlierMads);
  const clip3 = winsorize(paired3, weights.outlierMads);
  const outliers = clip1.clipped;
  const clusters = group.map((row) => row.leagueId);
  const options1 = { iterations: weights.bootstrapIterations, seed: 11 };
  const headline = clusterBootstrap(clip1.values, clusters, options1);
  const headline3 = clusterBootstrap(clip3.values, clusters, options1);
  const raw = clusterBootstrap(paired1, clusters, options1);
  const pValue = bootstrapP(clip1.values, clusters, options1);
  const noise = group.filter((row) => row.perRun.length > 1).map((row) => standardDeviation(row.perRun.map((run) => run.top1)));
  const validity = mean(group.flatMap((row) => row.perRun.map((run) => (run.valid ? 1 : 0))));
  const acceptedFirst = mean(group.flatMap((row) => row.perRun.map((run) => (run.firstAccepted ? 1 : 0))));
  const customShare = mean(group.flatMap((row) => row.perRun.map((run) => (run.suggestions ? run.custom / run.suggestions : 0))));
  const summary = {
    cases: group.length, leagues: new Set(clusters).size, outliersClipped: outliers.filter(Boolean).length, rawPaired: { mean: round(raw.mean), low: round(raw.low), high: round(raw.high) },
    llmTop1: round(mean(top1)), staticTop1: round(mean(group.map((row) => row.staticTop1))), allCandidates: round(mean(group.map((row) => row.staticAll))), bestPossible: round(mean(group.map((row) => row.best))),
    pairedTop1: { mean: round(headline.mean), low: round(headline.low), high: round(headline.high), p: round(pValue, 3) },
    pairedTop3: { mean: round(headline3.mean), low: round(headline3.low), high: round(headline3.high) },
    validity: round(validity), firstSuggestionAccepted: round(acceptedFirst), customShare: round(customShare),
    noiseFloor: noise.length ? round(median(noise)) : null, detectableEffect: round(detectableEffect(clip1.values, clusters)),
    clearWin: headline.low > Math.max(weights.minimumEffect, noise.length ? median(noise) : 0)
  };
  report.kinds[kind] = summary;
  lines.push(`## ${kind}`, `- cases ${summary.cases} in ${summary.leagues} leagues, ${summary.outliersClipped} outlier differences clipped to ${weights.outlierMads} robust spreads`, `- mean score: model first pick ${summary.llmTop1} · static finder first pick ${summary.staticTop1} · average candidate ${summary.allCandidates} · best candidate in hindsight ${summary.bestPossible}`, `- paired difference (model minus static, first pick, clipped): ${summary.pairedTop1.mean} [${summary.pairedTop1.low}, ${summary.pairedTop1.high}] p=${summary.pairedTop1.p}`, `- same without clipping: ${summary.rawPaired.mean} [${summary.rawPaired.low}, ${summary.rawPaired.high}]`, `- paired difference (top three): ${summary.pairedTop3.mean} [${summary.pairedTop3.low}, ${summary.pairedTop3.high}]`, `- valid replies ${summary.validity} · first pick passes the finder's gate ${summary.firstSuggestionAccepted} · own deals ${summary.customShare}`, `- run-to-run noise ${summary.noiseFloor} · smallest effect detectable at this size ${summary.detectableEffect} · clear win: ${summary.clearWin ? 'yes' : 'no'}`, '');
  const worst = group.map((row, index) => ({ id: row.id, diff: paired1[index] })).sort((a, b) => a.diff - b.diff).slice(0, 5);
  lines.push('worst cases (model minus static):', ...worst.map((entry) => `- ${entry.id} ${round(entry.diff)}`), '');
}

writeJson(join(EVAL_DIR, 'reports', `${options.label || options.version}-${options.split}.json`), { report, rows });
writeFileSync(join(EVAL_DIR, 'reports', `${options.label || options.version}-${options.split}.md`), lines.join('\n'));
console.log(lines.join('\n'));
