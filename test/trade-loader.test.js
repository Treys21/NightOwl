// Trade loader: follows the league's history, grades trades, and caches what can't change.
const test = require('node:test');
const assert = require('node:assert');

const mem = {};
const calls = [];
globalThis.NightOwl = {
  storage: {
    get: async (key, fallback) => (mem[key] === undefined ? fallback : JSON.parse(JSON.stringify(mem[key]))),
    set: async (items) => { for (const [k, v] of Object.entries(items)) mem[k] = JSON.parse(JSON.stringify(v)); }
  },
  api: {
    league: async (id) => { calls.push(`league:${id}`); return { league_id: id, season: id === 'L25' ? '2025' : '2026', previous_league_id: id === 'L26' ? 'L25' : '0' }; },
    rosters: async (id) => [{ roster_id: 1, owner_id: id === 'L26' ? 'u1' : 'u1' }, { roster_id: 2, owner_id: 'u2' }],
    transactions: async (id, week) => {
      calls.push(`tx:${id}:${week}`);
      if (id === 'L26' && week === 3) return [{ type: 'trade', status: 'complete', leg: 3, created: 3000, transaction_id: 'now', roster_ids: [1, 2], adds: { A: 1, B: 2 }, drops: { A: 2, B: 1 }, draft_picks: [] }, { type: 'waiver', status: 'complete', leg: 3, created: 3001, adds: { Z: 1 }, drops: {}, roster_ids: [1] }];
      if (id === 'L25' && week === 9) return [{ type: 'trade', status: 'complete', leg: 9, created: 1000, transaction_id: 'old', roster_ids: [1, 2], adds: { C: 2 }, drops: { C: 1 }, draft_picks: [] }];
      if (id === 'L26' && week === 2) throw new Error('Sleeper hiccup'); // one bad week must not sink the rest
      return [];
    },
    matchups: async (id, week) => {
      calls.push(`matchups:${id}:${week}`);
      return [{ roster_id: 1, starters: ['A'], players_points: { A: 10 } }, { roster_id: 2, starters: ['B'], players_points: { B: 4 } }];
    }
  }
};
require('../src/trades/history.js');
require('../src/trades/loader.js');

const ctx = { sideValue: (vs) => vs.reduce((a, b) => a + b, 0), assetValue: (a) => ({ A: 6000, B: 4000, C: 3000 }[a.pid] || 0) };
const lg = { leagueId: 'L26', raw: { season: '2026' } };
const nfl = { season: '2026', week: 5 };

test('chain: the league and the season before it', async () => {
  const c = await globalThis.NightOwl.tradeLoader.chain('L26', '2026');
  assert.deepEqual(c, [{ leagueId: 'L26', season: '2026' }, { leagueId: 'L25', season: '2025' }]);
});

test('load: trades from both seasons, graded, with points only for this season', async () => {
  const h = await globalThis.NightOwl.tradeLoader.load(lg, nfl, ctx);
  assert.deepEqual(h.seasons, ['2026', '2025']);
  assert.deepEqual(h.graded.map((g) => g.trade.id), ['now', 'old']); // newest first
  const now = h.graded[0];
  assert.ok(now.grades[1].valueNet > 0); // side 1 got A (6,000) for B (4,000)
  assert.deepEqual(now.real[1], { started: 10, bench: 0 }); // A started for side 1 after the trade week
  assert.equal(h.graded[1].real, null); // last season's deal is graded on the market alone
  assert.equal(h.profiles.u1.trades, 2); // one manager across both seasons
  assert.equal(h.band.count, 2);
});

test('load: finished weeks are cached, so a second load only refetches the live week', async () => {
  calls.length = 0;
  await globalThis.NightOwl.tradeLoader.load(lg, nfl, ctx);
  const tx = calls.filter((c) => c.startsWith('tx:L26'));
  assert.ok(tx.length <= 2, `refetched ${tx.join(', ')}`); // the live week, and the week that failed the first time
  assert.ok(!calls.includes('tx:L26:3'));
});

test('rows: waiver moves are kept alongside trades for the recap', async () => {
  const r = await globalThis.NightOwl.tradeLoader.rows('L26', 5);
  assert.equal(r.trades.length, 1);
  assert.deepEqual(r.moves.map((m) => m.type), ['waiver']);
});
