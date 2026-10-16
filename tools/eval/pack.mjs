import { parseArgs } from 'node:util';
import { readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { EVAL_DIR, readJson } from './lib/env.mjs';
import prompts from '../../src/ai/prompts.js';

const { values: options } = parseArgs({ options: {
  run: { type: 'string', default: 'run1' },
  split: { type: 'string', default: 'tuning' },
  batch: { type: 'string', default: '3' },
  max: { type: 'string', default: '30' },
  kind: { type: 'string', default: 'all' },
  tools: { type: 'boolean', default: false }
} });

const version = options.tools ? `${prompts.VERSION}-tools` : prompts.VERSION;
const ENGINE = `cd ${join(import.meta.dirname, '..', '..')} && node tools/eval/engine.mjs`;
const toolText = (caseId) => [
  'VERIFICATION TOOL (use it before you answer): run this in the shell, one deal per call:',
  `${ENGINE} ${caseId} '{"partnerId":4,"give":["id"],"get":["id","id"]}'`,
  'It prints JSON: legal (true or false, with the reason), myPointsGain and theirPointsGain for the rest of the season, fairnessToThem (value the partner gives up minus what they get, as a share; negative means I take more value than I give), and looksLikeARealTrade (0 to 1, how much the deal resembles trades real managers make; low means the partner is unlikely to accept).',
  'Propose your own deals as well as the listed candidates, check each one with the tool (at most 10 checks for this case), and put into your answer only deals the tool says are legal. Prefer deals that raise my points or fit my team window and also look like real trades (looksLikeARealTrade near or above 0.4). Do not run any other command.'
].join('\n');
const cases = readdirSync(join(EVAL_DIR, 'cases')).filter((name) => name.endsWith('.json')).map((name) => readJson(join(EVAL_DIR, 'cases', name)));
const wanted = cases
  .filter((entry) => options.split === 'all' || entry.split === options.split)
  .filter((entry) => options.kind === 'all' || (options.kind === 'redraft') === (entry.kind === 'redraft'))
  .sort((a, b) => a.id.localeCompare(b.id))
  .slice(0, Number(options.max));

const repliesDir = join(EVAL_DIR, 'replies', version, options.run);
mkdirSync(repliesDir, { recursive: true });
const todo = wanted.filter((entry) => !existsSync(join(repliesDir, `${entry.id}.json`)));

const packDir = join(EVAL_DIR, 'packs', version, options.run);
mkdirSync(packDir, { recursive: true });
const size = Number(options.batch);
const files = [];
for (let index = 0; index < todo.length; index += size) {
  const group = todo.slice(index, index + size);
  const parts = [
    'You are answering fantasy football trade-advice cases. For each case below, follow the SYSTEM text, read the DATA, and write your JSON answer to the reply file named for that case.',
    'Rules: write only the JSON object (no markdown fence, no commentary) to each reply file. Do not read any other file on disk' + (options.tools ? ' (except by running the verification tool)' : '') + '. Do not look at any directory named truth or any file outside the reply paths. Work each case independently.',
    ''
  ];
  for (const entry of group) {
    const built = prompts.build(entry.view);
    parts.push(`=========== CASE ${entry.id} ===========`, `REPLY FILE: ${join(repliesDir, `${entry.id}.json`)}`, '--- SYSTEM ---', built.system, '--- DATA ---', built.user, '');
    if (options.tools) parts.push('--- TOOL ---', toolText(entry.id), '');
  }
  const file = join(packDir, `batch-${options.kind}-${files.length + 1}.md`);
  writeFileSync(file, parts.join('\n'));
  files.push(file);
}
console.log(`${version}/${options.run}: ${wanted.length} cases selected, ${todo.length} still need replies, ${files.length} batch files`);
for (const file of files) console.log(file);
