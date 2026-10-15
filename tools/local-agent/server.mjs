import { createServer } from 'node:http';
import { createHash, randomBytes } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import { query } from '@anthropic-ai/claude-agent-sdk';
import prompts from '../../src/ai/prompts.js';
import validate from '../../src/ai/validate.js';

const PORT = Number(process.env.NIGHT_OWL_PORT || 8787);
const MODEL = process.env.NIGHT_OWL_MODEL || undefined;
const TIMEOUT_MS = Number(process.env.NIGHT_OWL_TIMEOUT_MS || 120000);
const MAX_BODY = 2_000_000;

const configDir = join(homedir(), '.night-owl-agent');
const tokenFile = join(configDir, 'token');
mkdirSync(configDir, { recursive: true, mode: 0o700 });
if (!existsSync(tokenFile)) writeFileSync(tokenFile, randomBytes(24).toString('hex'), { mode: 0o600 });
const token = readFileSync(tokenFile, 'utf8').trim();

const emptyDirectory = mkdtempSync(join(tmpdir(), 'night-owl-agent-'));
const ANALYST_TURNS = Number(process.env.NIGHT_OWL_ANALYST_TURNS || 14);
const cache = new Map();
let queue = Promise.resolve();

const send = (response, status, body, origin) => {
  const headers = { 'content-type': 'application/json' };
  if (origin && origin.startsWith('chrome-extension://')) {
    headers['access-control-allow-origin'] = origin;
    headers['access-control-allow-headers'] = 'content-type, x-night-owl-token';
    headers['access-control-allow-methods'] = 'GET, POST, OPTIONS';
    headers.vary = 'origin';
  }
  response.writeHead(status, headers);
  response.end(JSON.stringify(body));
};

async function readBody(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY) throw new Error('body-too-large');
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
}

const csvCell = (value) => `"${String(value == null ? '' : value).replace(/"/g, '""')}"`;
const csv = (rows) => rows.map((row) => row.map(csvCell).join(',')).join('\n');

function writeDataset(directory, view) {
  const header = ['team', 'id', 'name', 'pos', 'age', 'nflTeam', 'market', 'projected', 'lineupValue'];
  const rows = [header];
  const add = (label, team) => { for (const player of team.players) rows.push([label, player.id, player.name, player.pos, player.age, player.team, player.market, player.projected, player.lineupValue]); };
  add('me', view.me);
  for (const partner of view.partners) add(`partner-${partner.rosterId}`, partner);
  writeFileSync(join(directory, 'players.csv'), csv(rows));
  const deals = [['key', 'partnerId', 'give', 'get', 'myPoints', 'theirPoints', 'fairnessToThem', 'likelihood']];
  for (const candidate of view.candidates) deals.push([candidate.key, candidate.partnerId, candidate.give.join(' '), candidate.get.join(' '), candidate.static.myPoints, candidate.static.theirPoints, candidate.static.fairnessToThem, candidate.static.likelihood]);
  writeFileSync(join(directory, 'candidates.csv'), csv(deals));
  writeFileSync(join(directory, 'league.json'), JSON.stringify(view.league, null, 1));
}

async function ask(built, analystDirectory) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  let text = '';
  let failure = null;
  try {
    const run = query({
      prompt: built.user,
      options: {
        systemPrompt: built.system, settingSources: [], persistSession: false, abortController: controller, model: MODEL,
        ...(analystDirectory ? {
          cwd: analystDirectory, tools: ['Bash'], allowedTools: ['Bash'], maxTurns: ANALYST_TURNS, permissionMode: 'dontAsk',
          sandbox: { enabled: true, failIfUnavailable: true, autoAllowBashIfSandboxed: true, allowUnsandboxedCommands: false, network: { allowedDomains: [] }, filesystem: { allowWrite: [analystDirectory] } }
        } : { cwd: emptyDirectory, tools: [], allowedTools: [], maxTurns: 1 })
      }
    });
    for await (const message of run) {
      if (message.type === 'result') {
        if (message.subtype === 'success') text = message.result;
        else failure = message.subtype;
      }
    }
  } finally {
    clearTimeout(timer);
  }
  if (failure) throw new Error(failure);
  return text;
}

function looksLikeView(view) {
  return view && view.league && view.me && Array.isArray(view.me.players) && Array.isArray(view.partners) && Array.isArray(view.candidates);
}

const server = createServer(async (request, response) => {
  const origin = request.headers.origin || '';
  try {
    if (request.method === 'OPTIONS') return send(response, 204, {}, origin);
    if (request.headers['x-night-owl-token'] !== token) return send(response, 401, { ok: false, error: 'bad-token' }, origin);
    if (request.method === 'GET' && request.url === '/health') return send(response, 200, { ok: true, prompt: prompts.VERSION, model: MODEL || 'default' }, origin);
    if (request.method === 'POST' && request.url === '/suggest') {
      const { view, mode, fresh } = await readBody(request);
      if (!looksLikeView(view)) return send(response, 400, { ok: false, error: 'bad-view' }, origin);
      const analyst = mode === 'analyst';
      const key = createHash('sha1').update(`${prompts.VERSION}|${analyst}|${JSON.stringify(view)}`).digest('hex');
      if (!fresh && cache.has(key)) return send(response, 200, Object.assign({ cached: true }, cache.get(key)), origin);
      const job = queue.then(async () => {
        let text;
        if (analyst) {
          const directory = mkdtempSync(join(tmpdir(), 'night-owl-analyst-'));
          try {
            writeDataset(directory, view);
            text = await ask({ system: prompts.analystSystem(view), user: prompts.build(view).user }, directory);
          } finally {
            rmSync(directory, { recursive: true, force: true });
          }
        } else {
          text = await ask(prompts.build(view));
        }
        const checked = validate.suggestions(text, view);
        return { ok: checked.ok, suggestions: checked.suggestions, errors: checked.errors, prompt: prompts.VERSION, mode: analyst ? 'analyst' : 'direct' };
      });
      queue = job.catch(() => {});
      const result = await job;
      if (result.ok) cache.set(key, result);
      return send(response, 200, result, origin);
    }
    if (request.method === 'POST' && request.url === '/chat') {
      const { view, messages, mode } = await readBody(request);
      const history = Array.isArray(messages) ? messages.filter((message) => message && (message.role === 'user' || message.role === 'assistant') && typeof message.content === 'string').slice(-20) : [];
      if (!looksLikeView(view) || !history.length || history[history.length - 1].role !== 'user') return send(response, 400, { ok: false, error: 'bad-chat' }, origin);
      const analyst = mode === 'analyst';
      const user = `${prompts.facts(view)}\n\n${prompts.transcript(history)}\n\nADVISOR:`;
      const job = queue.then(async () => {
        if (!analyst) return ask({ system: prompts.chatSystem(view), user });
        const directory = mkdtempSync(join(tmpdir(), 'night-owl-analyst-'));
        try {
          writeDataset(directory, view);
          return await ask({ system: `${prompts.chatSystem(view)}\n\n${prompts.analystNote}`, user }, directory);
        } finally {
          rmSync(directory, { recursive: true, force: true });
        }
      });
      queue = job.catch(() => {});
      const reply = (await job).trim();
      return send(response, 200, { ok: reply.length > 0, reply, mode: analyst ? 'analyst' : 'direct' }, origin);
    }
    return send(response, 404, { ok: false, error: 'not-found' }, origin);
  } catch (error) {
    return send(response, 500, { ok: false, error: String(error && error.message ? error.message : error) }, origin);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Night Owl local agent on http://127.0.0.1:${PORT}`);
  console.log(`Token (paste into the extension popup): ${token}`);
  console.log(`Model: ${MODEL || 'SDK default'} · tools disabled · no project files visible`);
});
