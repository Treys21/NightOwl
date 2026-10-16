import { join } from 'node:path';
import { loadWorld, EVAL_DIR, readJson, nightOwl } from './lib/env.mjs';
import { rebuild } from './lib/replay.mjs';
import { teamOf } from './lib/league.mjs';
import { learnedFactsFor, learnedLikelihood } from './lib/learned.mjs';

const [caseId, dealText] = process.argv.slice(2);
if (!caseId || !dealText) { console.error('usage: node tools/eval/engine.mjs <caseId> \'{"partnerId":4,"give":["id"],"get":["id"]}\''); process.exit(1); }
const entry = readJson(join(EVAL_DIR, 'cases', `${caseId}.json`));
if (!entry) { console.log(JSON.stringify({ error: 'unknown case' })); process.exit(0); }
let deal;
try { deal = JSON.parse(dealText); } catch (error) { console.log(JSON.stringify({ error: 'deal is not valid JSON' })); process.exit(0); }

const world = await loadWorld();
const built = await rebuild(world, entry);
const partnerId = Number(deal.partnerId);
const mineIds = [...built.rosterPlayers.get(entry.rosterId)];
const theirIds = [...(built.rosterPlayers.get(partnerId) || [])];
const give = (deal.give || []).map(String);
const get = (deal.get || []).map(String);
const problems = [];
if (!theirIds.length) problems.push('unknown partnerId');
if (!give.length || !get.length || give.length > 2 || get.length > 2) problems.push('each side needs one or two players');
if (give.some((id) => !mineIds.includes(id))) problems.push('give must be players on my roster');
if (get.some((id) => !theirIds.includes(id))) problems.push('get must be players on the partner roster');
if (problems.length) { console.log(JSON.stringify({ legal: false, reason: problems.join('; ') })); process.exit(0); }

const mine = teamOf(world, built.season, entry.rosterId, built.rosterPlayers, built.windows.get(entry.rosterId));
const partner = teamOf(world, built.season, partnerId, built.rosterPlayers, built.windows.get(partnerId));
const judged = nightOwl.finder.judge(built.context, mine, partner, give, get);
const facts = learnedFactsFor(world, built.season, built.rosterPlayers, entry.week, built.standings);
let likelihood = null;
if (entry.kind !== 'redraft') { try { likelihood = learnedLikelihood(facts, entry.rosterId, { partnerId, give, get }); } catch (error) { likelihood = null; } }
const round = (value, places = 2) => (Number.isFinite(value) ? Math.round(value * 10 ** places) / 10 ** places : null);
console.log(JSON.stringify({
  legal: judged.ok, reason: judged.reason || null,
  myPointsGain: round(judged.impact && judged.impact.a.delta, 1), theirPointsGain: round(judged.impact && judged.impact.b.delta, 1),
  fairnessToThem: round(judged.rawNetThem), looksLikeARealTrade: round(likelihood)
}));
