const test = require('node:test');
const assert = require('node:assert');

const mem = {};
const calls = [];
globalThis.NightOwl = {
  storage: {
    get: async (key, fallback) => (mem[key] === undefined ? fallback : JSON.parse(JSON.stringify(mem[key]))),
    set: async (items) => { for (const [k, value] of Object.entries(items)) mem[k] = JSON.parse(JSON.stringify(value)); }
  },
  api: {
    league: async (leagueId) => { calls.push(`league:${leagueId}`); const seasonAndPrevious = { L26: ['2026', 'L25'], L25: ['2025', 'L24'], L24: ['2024', 'L23'], L23: ['2023', '0'] }[leagueId]; return { league_id: leagueId, season: seasonAndPrevious[0], previous_league_id: seasonAndPrevious[1] }; },
    rosters: async (leagueId) => [{ roster_id: 1, owner_id: leagueId === 'L26' ? 'u1' : 'u1' }, { roster_id: 2, owner_id: 'u2' }],
    transactions: async (leagueId, week) => {
      calls.push(`tx:${leagueId}:${week}`);
      if (leagueId === 'L26' && week === 3) return [{ type: 'trade', status: 'complete', leg: 3, created: 3000, transaction_id: 'now', roster_ids: [1, 2], adds: { A: 1, B: 2 }, drops: { A: 2, B: 1 }, draft_picks: [] }, { type: 'waiver', status: 'complete', leg: 3, created: 3001, adds: { Z: 1 }, drops: {}, roster_ids: [1] }];
      if (leagueId === 'L25' && week === 9) return [{ type: 'trade', status: 'complete', leg: 9, created: 1000, transaction_id: 'old', roster_ids: [1, 2], adds: { C: 2 }, drops: { C: 1 }, draft_picks: [{ season: '2025', round: 1, roster_id: 2, owner_id: 1, previous_owner_id: 2 }] }];
      if (leagueId === 'L26' && week === 2) throw new Error('Sleeper hiccup');
      return [];
    },
    leagueDrafts: async (leagueId) => (leagueId === 'L25' ? [{ draft_id: 'D25', season: '2025', type: 'linear', status: 'complete', settings: { rounds: 1, teams: 2 } }] : []),
    draft: async () => ({ slot_to_roster_id: { 1: 1, 2: 2 } }),
    draftPicks: async () => [{ pick_no: 1, round: 1, draft_slot: 2, roster_id: 1, player_id: 'X' }, { pick_no: 2, round: 1, draft_slot: 1, roster_id: 2, player_id: 'Y' }],
    matchups: async (leagueId, week) => {
      calls.push(`matchups:${leagueId}:${week}`);
      return [{ roster_id: 1, starters: ['A'], players_points: { A: 10 } }, { roster_id: 2, starters: ['B'], players_points: { B: 4 } }];
    }
  }
};
require('../src/shared/numbers.js');
require('../src/trades/history.js');
require('../src/trades/drafts.js');
require('../src/trades/loader.js');

const context = { sideValue: (values) => values.reduce((total, value) => total + value, 0), assetValue: (total) => ({ A: 6000, B: 4000, C: 3000 }[total.pid] || 0) };
const league = { leagueId: 'L26', raw: { season: '2026' } };
const nfl = { season: '2026', week: 5 };

test('chain: the league and every season before it, back to its first', async () => {
  const chain = await globalThis.NightOwl.tradeLoader.chain('L26', '2026');
  assert.deepEqual(chain.map((link) => link.season), ['2026', '2025', '2024', '2023']);
});

test('load: trades from every season, graded, with the points each side started after the deal', async () => {
  const history = await globalThis.NightOwl.tradeLoader.load(league, nfl, context);
  assert.deepEqual(history.seasons, ['2026', '2025', '2024', '2023']);
  assert.deepEqual(history.graded.map((graded) => graded.trade.id), ['now', 'old']);
  const now = history.graded[0];
  assert.ok(now.grades[1].valueNet > 0);
  assert.deepEqual(now.real[1], { started: 10, bench: 0 });
  assert.ok(history.graded[1].real, 'last season\'s deal has its points too');
  assert.equal(history.profiles.u1.trades, 2);
  assert.equal(history.band.count, 2);
});

test('load: finished weeks are cached, so a second load only refetches the live week', async () => {
  calls.length = 0;
  await globalThis.NightOwl.tradeLoader.load(league, nfl, context);
  const transactionCalls = calls.filter((call) => call.startsWith('tx:L26'));
  assert.ok(transactionCalls.length <= 2, `refetched ${transactionCalls.join(', ')}`);
  assert.ok(!calls.includes('tx:L26:3'));
});

test('rows: waiver moves are kept alongside trades for the recap', async () => {
  const result = await globalThis.NightOwl.tradeLoader.rows('L26', 5);
  assert.equal(result.trades.length, 1);
  assert.deepEqual(result.moves.map((move) => move.type), ['waiver']);
});

test('load: a traded pick that has been spent is the player taken with it', async () => {
  const history = await globalThis.NightOwl.tradeLoader.load(league, nfl, context);
  const old = history.graded.find((graded) => graded.trade.id === 'old');
  const pick = old.trade.sides[1].gotPicks[0];
  assert.equal(pick.player, 'X');
  assert.equal(history.drafts.length, 1);
});
