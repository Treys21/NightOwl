import { parseArgs } from 'node:util';
import { readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { nightOwl, loadWorld, EVAL_DIR, readJson, writeJson } from './lib/env.mjs';
import { loadSeason, rostersAt, standingsBefore, windowsFromStandings, prepare, buildContext, teamOf } from './lib/league.mjs';
import { madOutliers, median } from './quality.mjs';
import { mean, standardDeviation, clusterBootstrap, detectableEffect, bootstrapP } from './stats.mjs';
import prompts from '../../src/ai/prompts.js';
import validate from '../../src/ai/validate.js';

const { values: options } = parseArgs({ options: {
  runs: { type: 'string', default: 'run1' },
  split: { type: 'string', default: 'tuning' },
  version: { type: 'string', default: prompts.VERSION },
  baseline: { type: 'string' },
  label: { type: 'string' }
} });

const weights = readJson(join(import.meta.dirname, 'weights.json'));
const world = await loadWorld();
const runs = options.runs.split(',');
const round = (value, places = 2) => (Number.isFinite(value) ? Math.round(value * 10 ** places) / 10 ** places : null);

const cases = readdirSync(join(EVAL_DIR, 'cases')).filter((name) => name.endsWith('.json')).map((name) => readJson(join(EVAL_DIR, 'cases', name)))
  .filter((entry) => options.split === 'all' || entry.split === options.split)
  .sort((a, b) => a.id.localeCompare(b.id));

async function rebuild(entry) {
  const season = await loadSeason(entry.leagueId);
  const rosterPlayers = rostersAt(season, entry.week);
  const preparation = await prepare(world, season, entry.week, rosterPlayers);
  const windows = windowsFromStandings(standingsBefore(season, entry.week), entry.week);
  const context = buildContext(world, preparation);
  return { season, rosterPlayers, windows, context };
}

function scorer(entry, truth, built) {
  const weightsOf = entry.kind === 'redraft' ? weights.redraft : weights.dynasty;
  const lineupWeeks = truth.weeks.map((week) => ({ week: week.week, weight: 1, projOf: (playerId) => week.points[playerId] || 0, isOut: () => false }));
  const mine = teamOf(world, built.season, entry.rosterId, built.rosterPlayers, built.windows.get(entry.rosterId));
  const cache = new Map();
  return (deal) => {
    const signature = `${deal.partnerId}|${deal.give.join()}|${deal.get.join()}`;
    if (cache.has(signature)) return cache.get(signature);
    const partner = teamOf(world, built.season, Number(deal.partnerId), built.rosterPlayers, built.windows.get(Number(deal.partnerId)));
    const impact = nightOwl.value.tradeImpact({ slots: truth.slots, weeks: lineupWeeks, positionsOf: world.positionsOf, a: { pool: mine.pool }, b: { pool: partner.pool }, aGives: deal.give, bGives: deal.get });
    let regular = 0;
    let playoff = 0;
    impact.a.perWeek.forEach((change, index) => { if (truth.weeks[index].playoff) playoff += change; else regular += change; });
    let theirChange = 0;
    impact.b.perWeek.forEach((change, index) => { if (!truth.weeks[index].playoff) theirChange += change; });
    const judged = nightOwl.finder.judge(built.context, mine, partner, deal.give, deal.get);
    const marketPoints = nightOwl.finder.valueGain(built.context, mine, mine.w, deal.give, deal.get) / (built.context.pointValue || 1);
    const gift = Math.max(0, theirChange - regular);
    const score = weightsOf.regular * regular + weightsOf.playoff * playoff + weightsOf.market * marketPoints - weightsOf.gift * gift - (judged.ok ? 0 : weightsOf.rejected);
    const result = { score, regular, playoff, theirChange, marketPoints, gift, accepted: judged.ok, reason: judged.reason };
    cache.set(signature, result);
    return result;
  };
}

const rows = [];
for (const entry of cases) {
  const truth = readJson(join(EVAL_DIR, 'truth', `${entry.id}.json`));
  if (!truth) continue;
  const built = await rebuild(entry);
  const score = scorer(entry, truth, built);
  const candidates = entry.view.candidates.map((candidate) => ({ key: candidate.key, partnerId: candidate.partnerId, give: candidate.give, get: candidate.get }));
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
  const outliers = madOutliers(paired1, weights.outlierMads);
  const keep = (list) => list.filter((value, index) => !outliers[index]);
  const clusters = group.map((row) => row.leagueId);
  const clustersKept = keep(clusters);
  const options1 = { iterations: weights.bootstrapIterations, seed: 11 };
  const headline = clusterBootstrap(keep(paired1), clustersKept, options1);
  const headline3 = clusterBootstrap(keep(paired3), clustersKept, options1);
  const pValue = bootstrapP(keep(paired1), clustersKept, options1);
  const noise = group.filter((row) => row.perRun.length > 1).map((row) => standardDeviation(row.perRun.map((run) => run.top1)));
  const validity = mean(group.flatMap((row) => row.perRun.map((run) => (run.valid ? 1 : 0))));
  const acceptedFirst = mean(group.flatMap((row) => row.perRun.map((run) => (run.firstAccepted ? 1 : 0))));
  const customShare = mean(group.flatMap((row) => row.perRun.map((run) => (run.suggestions ? run.custom / run.suggestions : 0))));
  const summary = {
    cases: group.length, leagues: new Set(clusters).size, outliersExcluded: outliers.filter(Boolean).length,
    llmTop1: round(mean(top1)), staticTop1: round(mean(group.map((row) => row.staticTop1))), allCandidates: round(mean(group.map((row) => row.staticAll))), bestPossible: round(mean(group.map((row) => row.best))),
    pairedTop1: { mean: round(headline.mean), low: round(headline.low), high: round(headline.high), p: round(pValue, 3) },
    pairedTop3: { mean: round(headline3.mean), low: round(headline3.low), high: round(headline3.high) },
    validity: round(validity), firstSuggestionAccepted: round(acceptedFirst), customShare: round(customShare),
    noiseFloor: noise.length ? round(median(noise)) : null, detectableEffect: round(detectableEffect(keep(paired1), clustersKept)),
    clearWin: headline.low > Math.max(weights.minimumEffect, noise.length ? median(noise) : 0)
  };
  report.kinds[kind] = summary;
  lines.push(`## ${kind}`, `- cases ${summary.cases} in ${summary.leagues} leagues, ${summary.outliersExcluded} outliers excluded`, `- mean score: model first pick ${summary.llmTop1} · static finder first pick ${summary.staticTop1} · average candidate ${summary.allCandidates} · best candidate in hindsight ${summary.bestPossible}`, `- paired difference (model minus static, first pick): ${summary.pairedTop1.mean} [${summary.pairedTop1.low}, ${summary.pairedTop1.high}] p=${summary.pairedTop1.p}`, `- paired difference (top three): ${summary.pairedTop3.mean} [${summary.pairedTop3.low}, ${summary.pairedTop3.high}]`, `- valid replies ${summary.validity} · first pick passes the finder's gate ${summary.firstSuggestionAccepted} · own deals ${summary.customShare}`, `- run-to-run noise ${summary.noiseFloor} · smallest effect detectable at this size ${summary.detectableEffect} · clear win: ${summary.clearWin ? 'yes' : 'no'}`, '');
  const worst = group.map((row, index) => ({ id: row.id, diff: paired1[index] })).sort((a, b) => a.diff - b.diff).slice(0, 5);
  lines.push('worst cases (model minus static):', ...worst.map((entry) => `- ${entry.id} ${round(entry.diff)}`), '');
}

writeJson(join(EVAL_DIR, 'reports', `${options.label || options.version}-${options.split}.json`), { report, rows });
writeFileSync(join(EVAL_DIR, 'reports', `${options.label || options.version}-${options.split}.md`), lines.join('\n'));
console.log(lines.join('\n'));
