import { createRequire } from 'node:module';
import { parseArgs } from 'node:util';
import { writeFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
globalThis.NightOwl = {};
for (const f of ['lineups/core', 'season/core', 'season/value', 'season/finder', 'live/scoring', 'draft/match-names', 'shared/ktc', 'trades/history', 'moves/values']) require(`../../src/${f}.js`);
const NO = globalThis.NightOwl;

const { values: args } = parseArgs({ options: { user: { type: 'string' }, seasons: { type: 'string', default: '2' }, json: { type: 'string' }, samples: { type: 'string', default: '25' } } });
if (!args.user) { console.error('usage: node tools/backtest/run.mjs --user <sleeper username>'); process.exit(1); }
const SEASONS = Number(args.seasons);
const SAMPLES = Number(args.samples);

const cache = new Map();
const get = (url) => {
  if (!cache.has(url)) cache.set(url, fetch(url).then((r) => (r.ok ? r.json() : Promise.reject(new Error(`${r.status} ${url}`)))));
  return cache.get(url);
};
const V1 = 'https://api.sleeper.app/v1';
const chunked = async (items, fn, n = 8) => { const out = []; for (let i = 0; i < items.length; i += n) out.push(...await Promise.all(items.slice(i, i + n).map(fn))); return out; };
const hash = (s) => [...String(s)].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261) >>> 0;
const rng = (seed) => { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };

console.log('Loading players and KeepTradeCut values…');
const [raw, dynastyHtml, redraftHtml] = await Promise.all([
  get(`${V1}/players/nfl`),
  fetch(NO.ktc.URLS.dynasty).then((r) => r.text()),
  fetch(NO.ktc.URLS.redraft).then((r) => r.text())
]);
const info = {};
const sleeperList = [];
for (const [id, p] of Object.entries(raw)) {
  if (!p) continue;
  const positions = (p.fantasy_positions && p.fantasy_positions.length ? p.fantasy_positions : [p.position]).filter(Boolean);
  info[id] = { name: p.position === 'DEF' ? `${p.first_name} ${p.last_name}` : p.full_name || `${p.first_name || ''} ${p.last_name || ''}`.trim(), pos: p.position || '', team: p.team || '', positions };
  if (['QB', 'RB', 'WR', 'TE', 'K', 'DEF'].includes(p.position)) sleeperList.push({ id, name: info[id].name, position: p.position, team: p.team });
}
const dynRows = NO.ktc.parse(dynastyHtml);
const redRows = NO.ktc.parse(redraftHtml);
const KTC = { players: NO.ktc.matchAll(dynRows, sleeperList), picks: NO.ktc.pickValues(dynRows) };
const KTC_REDRAFT = { players: NO.ktc.matchAll(redRows, sleeperList) };
const positionsOf = (pid) => (info[pid] && info[pid].positions.length ? info[pid].positions : /^[A-Z]{2,3}$/.test(pid) ? ['DEF'] : []);

const state0 = await get(`${V1}/state/nfl`);
const user = await get(`${V1}/user/${args.user}`);
const currentLeagues = await get(`${V1}/user/${user.user_id}/leagues/nfl/${state0.season}`);

const IDP = new Set(['DL', 'LB', 'DB', 'IDP_FLEX']);
const projectionCache = new Map();
async function projections(season, week, idp) {
  const key = `${season}:${week}:${idp}`;
  if (!projectionCache.has(key)) {
    const pos = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'].concat(idp ? ['DL', 'LB', 'DB'] : []).map((p) => `position[]=${p}`).join('&');
    projectionCache.set(key, get(`https://api.sleeper.com/projections/nfl/${season}/${week}?season_type=regular&${pos}`).then((rows) => {
      const out = {};
      for (const r of rows || []) if (r.stats) out[r.player_id] = r.stats;
      return out;
    }).catch(() => ({})));
  }
  return projectionCache.get(key);
}

async function loadSeason(leagueId, isCurrent) {
  const lg = await get(`${V1}/league/${leagueId}`);
  const rosters = await get(`${V1}/league/${leagueId}/rosters`);
  const lastWeek = isCurrent ? Math.max(1, state0.week) : 18;
  const weeks = Array.from({ length: lastWeek }, (_, i) => i + 1);
  const txs = (await chunked(weeks, (w) => get(`${V1}/league/${leagueId}/transactions/${w}`).catch(() => []))).flat().filter((t) => t.status === 'complete');
  const matchups = {};
  await chunked(weeks.filter((w) => w < lastWeek || !isCurrent), async (w) => { matchups[w] = await get(`${V1}/league/${leagueId}/matchups/${w}`).catch(() => []); });
  return { lg, rosters, txs, matchups, isCurrent };
}

function rostersBefore(season, trade) {
  const sets = new Map(season.rosters.map((r) => [r.roster_id, new Set(r.players || [])]));
  const later = season.txs.filter((t) => t.created >= trade.at).sort((a, b) => b.created - a.created);
  for (const t of later) {
    for (const [pid, rid] of Object.entries(t.adds || {})) sets.get(rid)?.delete(pid);
    for (const [pid, rid] of Object.entries(t.drops || {})) sets.get(rid)?.add(pid);
  }
  return sets;
}

function windowsBefore(season, week) {
  const wins = new Map(season.rosters.map((r) => [r.roster_id, 0]));
  for (let w = 1; w < week; w++) {
    const rows = season.matchups[w] || [];
    const byMatch = new Map();
    for (const m of rows) if (m.matchup_id != null) byMatch.set(m.matchup_id, (byMatch.get(m.matchup_id) || []).concat(m));
    for (const pair of byMatch.values()) if (pair.length === 2 && pair[0].points !== pair[1].points) wins.set((pair[0].points > pair[1].points ? pair[0] : pair[1]).roster_id, wins.get((pair[0].points > pair[1].points ? pair[0] : pair[1]).roster_id) + 1);
  }
  const order = [...wins.entries()].sort((a, b) => a[1] - b[1]);
  const n = order.length;
  return new Map(order.map(([rid], i) => [rid, week <= 2 ? 0.5 : Math.max(0, Math.min(1, 1.4 * (n > 1 ? i / (n - 1) : 0.5) - 0.2))]));
}

async function prepare(season, trade, sets, kind) {
  const lg = season.lg;
  const slots = lg.roster_positions || [];
  const playoffStart = (lg.settings && lg.settings.playoff_week_start) || 15;
  const idp = slots.some((s) => IDP.has(s));
  const weekNums = [];
  for (let w = trade.week + 1; w < playoffStart; w++) weekNums.push(w);
  if (!weekNums.length) return null;
  const stats = {};
  await chunked(weekNums, async (w) => { stats[w] = await projections(lg.season, w, idp); });
  const weeks = weekNums.map((w) => ({ week: w, weight: 1, projOf: (pid) => NO.scoring.points(stats[w][pid], lg.scoring_settings), isOut: () => false }));
  const rosters = season.rosters.map((r) => Object.assign({}, r, { players: [...sets.get(r.roster_id)], reserve: [], taxi: [] }));
  const fakeLg = {
    kind, weeks, raw: { season: lg.season, rosters, scoring: lg.scoring_settings, slots },
    superflex: NO.ktc.isSuperflex(slots), tep: NO.ktc.tepTier(lg.scoring_settings),
    ranks: new Map(rosters.map((r, i) => [r.roster_id, i + 1])), slots: null, picks: new Map()
  };
  const state = { ktc: KTC, ktcRedraft: KTC_REDRAFT, stats };
  const V = NO.moveValues.create(state);
  return { slots, weeks, rosters, fakeLg, V, stats, kind };
}

function buildCtx(prep, goal = 'balanced') {
  const { fakeLg, V, slots, weeks, kind } = prep;
  const dyn = kind !== 'redraft';
  const cons = !dyn;
  return {
    mode: dyn ? 'dynasty' : 'redraft', consensus: cons, slots, weeks, positionsOf,
    isPick: NO.moveValues.isPick, canCut: () => true,
    rawOf: dyn ? (id) => V.dynastyValue(fakeLg, id) : (id) => V.redraftValue(fakeLg, id),
    valueOf: dyn ? (t, id, w) => V.valueFor(fakeLg, id, w) : (t, id) => V.redraftValue(fakeLg, id),
    sideValue: dyn ? NO.ktc.sideValue : (vs) => NO.ktc.sideValue(vs, NO.ktc.EXPONENT_REDRAFT),
    pointValue: V.pointValue(fakeLg), goal, focus: {}
  };
}

const poolOf = (ids) => ids.filter((pid) => positionsOf(pid).length);
function team(prep, rid, sets, w) {
  const ids = [...sets.get(rid)];
  return { id: rid, pool: poolOf(ids), assets: ids, players: ids, count: ids.length, capacity: 99, w };
}
const pickId = (p) => `pick:${p.season}:${p.round}:${p.from}`;

const PARAM_SETS = [];
for (const fair of [0.08, 0.12, 0.2]) {
  for (const over of [0.15, 0.25, 0.35]) {
    for (const minMe of [1, 3]) {
      for (const floor of [0.03, 0.15, 0.3]) {
        PARAM_SETS.push({ name: `they lose ≤ ${fair} · you overpay ≤ ${over} · gain ≥ ${minMe} pts · mixed floor ${floor}`, params: {
          fairTolerance: fair, fairToleranceRedraft: fair, overpay: { balanced: over, now: over, future: over }, overpayRedraft: { balanced: over, now: over, future: over },
          minPoints: { me: minMe, them: Math.max(0, minMe - 1) }, mixedFloor: floor
        } });
      }
    }
  }
}
const DEFAULT = { name: 'current defaults', params: {} };

const results = [];
for (const league of currentLeagues) {
  const kind = ['redraft', 'keeper', 'dynasty'][league.settings.type] || 'redraft';
  let id = league.league_id;
  for (let s = 0; s < SEASONS && id && id !== '0'; s++) {
    const isCurrent = s === 0;
    const season = await loadSeason(id, isCurrent);
    if (!isCurrent && kind === 'redraft') break;
    const trades = NO.tradeHistory.parse(season.txs, season.lg.season).filter((t) => Object.keys(t.sides).length === 2);
    for (const trade of trades) {
      const sets = rostersBefore(season, trade);
      const prep = await prepare(season, trade, sets, kind);
      if (!prep) continue;
      const [a, b] = Object.keys(trade.sides).map(Number);
      const w = windowsBefore(season, trade.week);
      const ctx = buildCtx(prep);
      const sideOf = (rid) => ({
        give: trade.sides[rid].gave.concat(trade.sides[rid].gavePicks.map(pickId)),
        get: trade.sides[rid].got.concat(trade.sides[rid].gotPicks.map(pickId))
      });
      const A = team(prep, a, sets, w.get(a));
      const B = team(prep, b, sets, w.get(b));
      const priced = (ids) => ids.filter((x) => ctx.rawOf(x) > 0).length / Math.max(1, ids.length);
      const sa = sideOf(a);
      if (priced(sa.give.concat(sa.get)) < 0.6) continue;
      const rand = rng(hash(trade.id));
      const pickN = (ids, n) => { const pool = ids.filter((x) => ctx.rawOf(x) > 0); const out = []; while (out.length < n && pool.length) out.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]); return out; };
      const randoms = [];
      for (let i = 0; i < SAMPLES; i++) {
        randoms.push({ give: pickN([...sets.get(a)], sa.give.filter((x) => !x.startsWith('pick:')).length || 1), get: pickN([...sets.get(b)], sa.get.filter((x) => !x.startsWith('pick:')).length || 1) });
      }
      const judge = (set, give, get) => {
        const c = Object.assign({}, ctx, { params: set.params });
        const one = NO.finder.judge(c, A, B, give, get);
        const two = NO.finder.judge(c, B, A, get, give);
        return { ok: one.ok || two.ok, reason: one.ok || two.ok ? null : one.reason, net: Math.abs(one.rawNetThem), gains: [one.impact.a.delta, one.impact.b.delta] };
      };
      const sets_ = [DEFAULT, ...PARAM_SETS];
      const realJudged = sets_.map((set) => judge(set, sa.give, sa.get));
      const base = NO.finder.judge(ctx, A, B, sa.give, sa.get);
      const gainerPays = (base.impact.a.delta - base.impact.b.delta) * (base.rawNetThem) > 0;
      results.push({
        league: league.name, season: season.lg.season, week: trade.week, kind, id: trade.id,
        net: realJudged[0].net, gains: realJudged[0].gains, gainerPays,
        hasPicks: sa.give.concat(sa.get).some((x) => x.startsWith('pick:')),
        vals: { give: sa.give.map((x) => ctx.rawOf(x)), get: sa.get.map((x) => ctx.rawOf(x)) },
        detail: { give: sa.give.map((x) => `${x.startsWith('pick:') ? x : info[x] ? info[x].name : x} ${ctx.rawOf(x)}`), get: sa.get.map((x) => `${x.startsWith('pick:') ? x : info[x] ? info[x].name : x} ${ctx.rawRaw ? '' : ctx.rawOf(x)}`), w: [w.get(a), w.get(b)], uMe: base.uMe, uThem: base.uThem, dPts: [base.impact.a.delta, base.impact.b.delta] },
        passes: realJudged.map((j) => j.ok),
        reasons: realJudged.map((j) => j.reason),
        randomPass: sets_.map((set) => randoms.filter((r) => judge(set, r.give, r.get).ok).length / randoms.length)
      });
    }
    const prev = season.lg.previous_league_id;
    id = prev && prev !== '0' ? prev : null;
  }
}

const sets_ = [DEFAULT, ...PARAM_SETS];
const pct = (x) => `${Math.round(x * 100)}%`;
const median = (xs) => { const s = xs.slice().sort((a, b) => a - b); return s.length ? s[Math.floor(s.length / 2)] : null; };
const quant = (xs, q) => { const s = xs.slice().sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(q * s.length))] : null; };
console.log(`\n${results.length} real trades judged (${new Set(results.map((r) => r.league)).size} leagues)\n`);
for (const kind of ['dynasty', 'redraft']) {
  const rows = results.filter((r) => (kind === 'redraft' ? r.kind === 'redraft' : r.kind !== 'redraft'));
  if (!rows.length) continue;
  const nets = rows.map((r) => r.net);
  console.log(`== ${kind}: ${rows.length} trades · ${pct(rows.filter((r) => r.hasPicks).length / rows.length)} include picks`);
  console.log(`   price gap between the sides (consensus): median ${pct(median(nets))} · 75th ${pct(quant(nets, 0.75))} · 90th ${pct(quant(nets, 0.9))}`);
  console.log(`   the side that gains lineup points is the one paying in price: ${pct(rows.filter((r) => r.gainerPays).length / rows.length)} of trades`);
  const gap = (r, e) => { const f = (vs) => Math.pow(vs.filter((v) => v > 0).reduce((a, v) => a + Math.pow(v, e), 0), 1 / e); const x = f(r.vals.give); const y = f(r.vals.get); return Math.abs(x - y) / Math.max(x, y, 1); };
  const byExp = [1, 1.5, 2, 2.5, 3, 4, 6].map((e) => [e, median(rows.map((r) => gap(r, e)))]);
  console.log(`   median price gap by package exponent (lower = real trades look more even): ${byExp.map(([e, m]) => `${e}: ${pct(m)}`).join(' · ')}`);
  const bothGain = rows.filter((r) => r.gains[0] > 0 && r.gains[1] > 0).length;
  console.log(`   both lineups gain: ${pct(bothGain / rows.length)} · at least one side loses points: ${pct(rows.filter((r) => Math.min(...r.gains) < 0).length / rows.length)}`);
  const score = (i) => { const real = rows.filter((r) => r.passes[i]).length / rows.length; const rnd = rows.reduce((a, r) => a + r.randomPass[i], 0) / rows.length; return { real, rnd, j: real - rnd }; };
  const ranked = sets_.map((s, i) => ({ s, i, ...score(i) })).sort((a, b) => b.j - a.j);
  const d = ranked.find((x) => x.s === DEFAULT);
  console.log(`   current defaults: pass ${pct(d.real)} of real trades, ${pct(d.rnd)} of random swaps (gap ${pct(d.j)})`);
  console.log('   best parameter sets (real pass, random pass, gap):');
  for (const r of ranked.slice(0, 8)) console.log(`     ${r.s.name.padEnd(44)} ${pct(r.real).padStart(4)} ${pct(r.rnd).padStart(4)} ${pct(r.j).padStart(4)}`);
  const why = {};
  for (const r of rows) if (!r.passes[0]) why[r.reasons[0]] = (why[r.reasons[0]] || 0) + 1;
  console.log(`   why real trades fail the current defaults: ${JSON.stringify(why)}`);
}
if (process.env.DETAILS) for (const r of results) console.log(`${r.league} ${r.season} w${r.week} [${r.kind}] net ${pct(r.net)} dPts ${r.detail.dPts.join('/')} w ${r.detail.w.map((x) => x.toFixed(2)).join('/')} u ${Math.round(r.detail.uMe)}/${Math.round(r.detail.uThem)} ${r.reasons[0] || 'PASS'}\n    A gave: ${r.detail.give.join(', ')}\n    A got : ${r.detail.get.join(', ')}`);
if (args.json) { writeFileSync(args.json, JSON.stringify({ results, sets: sets_.map((s) => s.name) }, null, 1)); console.log(`\nwrote ${args.json}`); }
