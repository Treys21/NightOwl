import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
export const ROOT = new URL('../../../', import.meta.url).pathname;
export const EVAL_DIR = process.env.NIGHT_OWL_EVAL_DIR || join(ROOT, '.eval');
const HTTP_DIR = join(ROOT, '.eval', 'http');
const SLEEPER_API = 'https://api.sleeper.app/v1';

globalThis.NightOwl = {};
for (const modulePath of ['shared/numbers', 'lineups/core', 'season/core', 'season/value', 'valuation/age-curves', 'valuation/redraft-values', 'season/finder', 'live/scoring', 'draft/match-names', 'shared/market-fit', 'shared/market-values', 'trades/history', 'moves/values']) require(`${ROOT}src/${modulePath}.js`);
export const nightOwl = globalThis.NightOwl;

mkdirSync(HTTP_DIR, { recursive: true });

const memory = new Map();

export const hashText = (text) => createHash('sha1').update(String(text)).digest('hex').slice(0, 16);
export const hashNumber = (text) => parseInt(hashText(text).slice(0, 8), 16);

export { seededRandom } from './random.mjs';

export async function getJson(url, { fresh = false } = {}) {
  if (memory.has(url)) return memory.get(url);
  const file = join(HTTP_DIR, `${hashText(url)}.json`);
  const pending = (async () => {
    if (!fresh && existsSync(file)) return JSON.parse(readFileSync(file, 'utf8'));
    for (let attempt = 0; attempt < 4; attempt++) {
      const response = await fetch(url);
      if (response.status === 404) return null;
      if (response.ok) {
        const data = await response.json();
        writeFileSync(file, JSON.stringify(data));
        return data;
      }
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
    return null;
  })();
  memory.set(url, pending);
  return pending;
}

export const sleeper = (path) => getJson(`${SLEEPER_API}${path}`);

export async function inChunks(items, work, size = 8) {
  const out = [];
  for (let index = 0; index < items.length; index += size) out.push(...await Promise.all(items.slice(index, index + size).map(work)));
  return out;
}

export async function loadWorld() {
  const raw = await sleeper('/players/nfl');
  const info = {};
  const sleeperList = [];
  for (const [playerId, player] of Object.entries(raw)) {
    if (!player) continue;
    const positions = (player.fantasy_positions && player.fantasy_positions.length ? player.fantasy_positions : [player.position]).filter(Boolean);
    info[playerId] = {
      name: player.position === 'DEF' ? `${player.first_name} ${player.last_name}` : player.full_name || `${player.first_name || ''} ${player.last_name || ''}`.trim(),
      pos: player.position || '', team: player.team || '', age: player.age || null, searchRank: player.search_rank == null ? null : player.search_rank, positions
    };
    if (['QB', 'RB', 'WR', 'TE', 'K', 'DEF'].includes(player.position)) sleeperList.push({ id: playerId, name: info[playerId].name, position: player.position, team: player.team, searchRank: player.search_rank == null ? null : player.search_rank, age: player.age || null });
  }
  const marketCache = new Map();
  const positionsOf = (playerId) => (info[playerId] && info[playerId].positions.length ? info[playerId].positions : /^[A-Z]{2,3}$/.test(playerId) ? ['DEF'] : []);
  return {
    info, positionsOf,
    marketFor: (seasonYear) => { if (!marketCache.has(seasonYear)) marketCache.set(seasonYear, nightOwl.marketValues.build(sleeperList, seasonYear)); return marketCache.get(seasonYear); }
  };
}

export function writeJson(file, data) {
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, JSON.stringify(data, null, 1));
}

export function readJson(file, fallback = null) {
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : fallback;
}
