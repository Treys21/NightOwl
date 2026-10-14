import { createRequire } from 'node:module';
import { parseArgs } from 'node:util';
import { writeFileSync } from 'node:fs';

const require = createRequire(import.meta.url);
globalThis.NightOwl = {};
for (const modulePath of ['lineups/core', 'season/core', 'season/value', 'season/finder', 'live/scoring', 'draft/match-names', 'shared/ktc', 'trades/history', 'moves/values']) require(`../../src/${modulePath}.js`);
const nightOwl = globalThis.NightOwl;

const { values: options } = parseArgs({ options: { user: { type: 'string' }, seasons: { type: 'string', default: '2' }, json: { type: 'string' }, samples: { type: 'string', default: '25' } } });
if (!options.user) { console.error('usage: node tools/backtest/run.mjs --user <sleeper username>'); process.exit(1); }
const SEASONS = Number(options.seasons);
const SAMPLES = Number(options.samples);

const cache = new Map();
const get = (url) => {
  if (!cache.has(url)) cache.set(url, fetch(url).then((response) => (response.ok ? response.json() : Promise.reject(new Error(`${response.status} ${url}`)))));
  return cache.get(url);
};
const SLEEPER_API = 'https://api.sleeper.app/v1';
const chunked = async (items, work, batchSize = 8) => { const out = []; for (let i = 0; i < items.length; i += batchSize) out.push(...await Promise.all(items.slice(i, i + batchSize).map(work))); return out; };
const hash = (text) => [...String(text)].reduce((hashState, character) => Math.imul(hashState ^ character.charCodeAt(0), 16777619), 2166136261) >>> 0;
const rng = (seed) => { let seedState = seed >>> 0; return () => { seedState = (seedState + 0x6d2b79f5) >>> 0; let mixed = seedState; mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1); mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61); return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296; }; };

console.log('Loading players and KeepTradeCut values…');
const [raw, dynastyHtml, redraftHtml] = await Promise.all([
  get(`${SLEEPER_API}/players/nfl`),
  fetch(nightOwl.ktc.URLS.dynasty).then((response) => response.text()),
  fetch(nightOwl.ktc.URLS.redraft).then((response) => response.text())
]);
const info = {};
const sleeperList = [];
for (const [playerId, player] of Object.entries(raw)) {
  if (!player) continue;
  const positions = (player.fantasy_positions && player.fantasy_positions.length ? player.fantasy_positions : [player.position]).filter(Boolean);
  info[playerId] = { name: player.position === 'DEF' ? `${player.first_name} ${player.last_name}` : player.full_name || `${player.first_name || ''} ${player.last_name || ''}`.trim(), pos: player.position || '', team: player.team || '', positions };
  if (['QB', 'RB', 'WR', 'TE', 'K', 'DEF'].includes(player.position)) sleeperList.push({ id: playerId, name: info[playerId].name, position: player.position, team: player.team });
}
const dynRows = nightOwl.ktc.parse(dynastyHtml);
const redRows = nightOwl.ktc.parse(redraftHtml);
const KTC = { players: nightOwl.ktc.matchAll(dynRows, sleeperList), picks: nightOwl.ktc.pickValues(dynRows) };
const KTC_REDRAFT = { players: nightOwl.ktc.matchAll(redRows, sleeperList) };
const positionsOf = (playerId) => (info[playerId] && info[playerId].positions.length ? info[playerId].positions : /^[A-Z]{2,3}$/.test(playerId) ? ['DEF'] : []);

const state0 = await get(`${SLEEPER_API}/state/nfl`);
const user = await get(`${SLEEPER_API}/user/${options.user}`);
const currentLeagues = await get(`${SLEEPER_API}/user/${user.user_id}/leagues/nfl/${state0.season}`);

const IDP = new Set(['DL', 'LB', 'DB', 'IDP_FLEX']);
const projectionCache = new Map();
async function projections(season, week, idp) {
  const key = `${season}:${week}:${idp}`;
  if (!projectionCache.has(key)) {
    const positionQuery = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'].concat(idp ? ['DL', 'LB', 'DB'] : []).map((position) => `position[]=${position}`).join('&');
    projectionCache.set(key, get(`https://api.sleeper.com/projections/nfl/${season}/${week}?season_type=regular&${positionQuery}`).then((rows) => {
      const out = {};
      for (const row of rows || []) if (row.stats) out[row.player_id] = row.stats;
      return out;
    }).catch(() => ({})));
  }
  return projectionCache.get(key);
}

async function loadSeason(leagueId, isCurrent) {
  const league = await get(`${SLEEPER_API}/league/${leagueId}`);
  const rosters = await get(`${SLEEPER_API}/league/${leagueId}/rosters`);
  const lastWeek = isCurrent ? Math.max(1, state0.week) : 18;
  const weeks = Array.from({ length: lastWeek }, (_, i) => i + 1);
  const transactions = (await chunked(weeks, (week) => get(`${SLEEPER_API}/league/${leagueId}/transactions/${week}`).catch(() => []))).flat().filter((transaction) => transaction.status === 'complete');
  const matchups = {};
  await chunked(weeks.filter((week) => week < lastWeek || !isCurrent), async (week) => { matchups[week] = await get(`${SLEEPER_API}/league/${leagueId}/matchups/${week}`).catch(() => []); });
  return { league, rosters, transactions, matchups, isCurrent };
}

function rostersBefore(season, trade) {
  const rosterPlayers = new Map(season.rosters.map((roster) => [roster.roster_id, new Set(roster.players || [])]));
  const later = season.transactions.filter((transaction) => transaction.created >= trade.at).sort((a, b) => b.created - a.created);
  for (const transaction of later) {
    for (const [playerId, rosterId] of Object.entries(transaction.adds || {})) rosterPlayers.get(rosterId)?.delete(playerId);
    for (const [playerId, rosterId] of Object.entries(transaction.drops || {})) rosterPlayers.get(rosterId)?.add(playerId);
  }
  return rosterPlayers;
}

function windowsBefore(season, week) {
  const wins = new Map(season.rosters.map((roster) => [roster.roster_id, 0]));
  for (let pastWeek = 1; pastWeek < week; pastWeek++) {
    const rows = season.matchups[pastWeek] || [];
    const byMatch = new Map();
    for (const matchup of rows) if (matchup.matchup_id != null) byMatch.set(matchup.matchup_id, (byMatch.get(matchup.matchup_id) || []).concat(matchup));
    for (const pair of byMatch.values()) if (pair.length === 2 && pair[0].points !== pair[1].points) wins.set((pair[0].points > pair[1].points ? pair[0] : pair[1]).roster_id, wins.get((pair[0].points > pair[1].points ? pair[0] : pair[1]).roster_id) + 1);
  }
  const order = [...wins.entries()].sort((a, b) => a[1] - b[1]);
  const rosterCount = order.length;
  return new Map(order.map(([rosterId], i) => [rosterId, week <= 2 ? 0.5 : Math.max(0, Math.min(1, 1.4 * (rosterCount > 1 ? i / (rosterCount - 1) : 0.5) - 0.2))]));
}

async function prepare(season, trade, rosterPlayers, kind) {
  const league = season.league;
  const slots = league.roster_positions || [];
  const playoffStart = (league.settings && league.settings.playoff_week_start) || 15;
  const idp = slots.some((slot) => IDP.has(slot));
  const weekNums = [];
  for (let week = trade.week + 1; week < playoffStart; week++) weekNums.push(week);
  if (!weekNums.length) return null;
  const stats = {};
  await chunked(weekNums, async (week) => { stats[week] = await projections(league.season, week, idp); });
  const weeks = weekNums.map((week) => ({ week: week, weight: 1, projOf: (playerId) => nightOwl.scoring.points(stats[week][playerId], league.scoring_settings), isOut: () => false }));
  const rosters = season.rosters.map((roster) => Object.assign({}, roster, { players: [...rosterPlayers.get(roster.roster_id)], reserve: [], taxi: [] }));
  const fakeLeague = {
    kind, weeks, raw: { season: league.season, rosters, scoring: league.scoring_settings, slots },
    superflex: nightOwl.ktc.isSuperflex(slots), tep: nightOwl.ktc.tepTier(league.scoring_settings),
    ranks: new Map(rosters.map((roster, i) => [roster.roster_id, i + 1])), slots: null, picks: new Map()
  };
  const state = { ktc: KTC, ktcRedraft: KTC_REDRAFT, stats };
  const moveValues = nightOwl.moveValues.create(state);
  return { slots, weeks, rosters, fakeLeague, moveValues, stats, kind };
}

const packageRule = (isDynasty) => (isDynasty
  ? { exponent: nightOwl.ktc.EXPONENT_PACKAGE, replacement: nightOwl.ktc.REPLACEMENT_DYNASTY }
  : { exponent: nightOwl.ktc.EXPONENT_REDRAFT, replacement: nightOwl.ktc.REPLACEMENT_REDRAFT });

function buildContext(preparation, goal = 'balanced') {
  const { fakeLeague, moveValues, slots, weeks, kind } = preparation;
  const isDynasty = kind !== 'redraft';
  const isConsensus = !isDynasty;
  return {
    mode: isDynasty ? 'dynasty' : 'redraft', consensus: isConsensus, slots, weeks, positionsOf,
    isPick: nightOwl.moveValues.isPick, canCut: () => true,
    rawOf: isDynasty ? (playerId) => moveValues.dynastyValue(fakeLeague, playerId) : (playerId) => moveValues.redraftValue(fakeLeague, playerId),
    valueOf: isDynasty ? (team, playerId, outlook) => moveValues.valueFor(fakeLeague, playerId, outlook) : (team, playerId) => moveValues.redraftValue(fakeLeague, playerId),
    sideValue: (values, picks) => nightOwl.ktc.packageValue(values.map((value, index) => ({ v: value, pick: Boolean(picks && picks[index]) })), packageRule(isDynasty)),
    pointValue: moveValues.pointValue(fakeLeague), goal, focus: {}
  };
}

const poolOf = (playerIds) => playerIds.filter((playerId) => positionsOf(playerId).length);
function team(preparation, rosterId, rosterPlayers, outlook) {
  const playerIds = [...rosterPlayers.get(rosterId)];
  return { id: rosterId, pool: poolOf(playerIds), assets: playerIds, players: playerIds, count: playerIds.length, capacity: 99, w: outlook };
}
const pickId = (pick) => `pick:${pick.season}:${pick.round}:${pick.from}`;

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
  let seasonLeagueId = league.league_id;
  for (let seasonIndex = 0; seasonIndex < SEASONS && seasonLeagueId && seasonLeagueId !== '0'; seasonIndex++) {
    const isCurrent = seasonIndex === 0;
    const season = await loadSeason(seasonLeagueId, isCurrent);
    if (!isCurrent && kind === 'redraft') break;
    const trades = nightOwl.tradeHistory.parse(season.transactions, season.league.season).filter((trade) => Object.keys(trade.sides).length === 2);
    for (const trade of trades) {
      const rosterPlayers = rostersBefore(season, trade);
      const preparation = await prepare(season, trade, rosterPlayers, kind);
      if (!preparation) continue;
      const [firstRosterId, secondRosterId] = Object.keys(trade.sides).map(Number);
      const outlook = windowsBefore(season, trade.week);
      const context = buildContext(preparation);
      const sideOf = (rosterId) => ({
        give: trade.sides[rosterId].gave.concat(trade.sides[rosterId].gavePicks.map(pickId)),
        get: trade.sides[rosterId].got.concat(trade.sides[rosterId].gotPicks.map(pickId))
      });
      const firstTeam = team(preparation, firstRosterId, rosterPlayers, outlook.get(firstRosterId));
      const secondTeam = team(preparation, secondRosterId, rosterPlayers, outlook.get(secondRosterId));
      const priced = (playerIds) => playerIds.filter((assetId) => context.rawOf(assetId) > 0).length / Math.max(1, playerIds.length);
      const firstSide = sideOf(firstRosterId);
      if (priced(firstSide.give.concat(firstSide.get)) < 0.6) continue;
      const rand = rng(hash(trade.id));
      const pickRandomAssets = (playerIds, count) => { const pool = playerIds.filter((assetId) => context.rawOf(assetId) > 0); const out = []; while (out.length < count && pool.length) out.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]); return out; };
      const randoms = [];
      for (let i = 0; i < SAMPLES; i++) {
        randoms.push({ give: pickRandomAssets([...rosterPlayers.get(firstRosterId)], firstSide.give.filter((assetId) => !assetId.startsWith('pick:')).length || 1), get: pickRandomAssets([...rosterPlayers.get(secondRosterId)], firstSide.get.filter((assetId) => !assetId.startsWith('pick:')).length || 1) });
      }
      const judge = (set, give, get) => {
        const character = Object.assign({}, context, { params: set.params });
        const firstView = nightOwl.finder.judge(character, firstTeam, secondTeam, give, get);
        const secondView = nightOwl.finder.judge(character, secondTeam, firstTeam, get, give);
        return { ok: firstView.ok || secondView.ok, reason: firstView.ok || secondView.ok ? null : firstView.reason, net: Math.abs(firstView.rawNetThem), gains: [firstView.impact.a.delta, firstView.impact.b.delta] };
      };
      const allParameterSets = [DEFAULT, ...PARAM_SETS];
      const realJudged = allParameterSets.map((set) => judge(set, firstSide.give, firstSide.get));
      const base = nightOwl.finder.judge(context, firstTeam, secondTeam, firstSide.give, firstSide.get);
      const gainerPays = (base.impact.a.delta - base.impact.b.delta) * (base.rawNetThem) > 0;
      results.push({
        league: league.name, season: season.league.season, week: trade.week, kind, id: trade.id,
        net: realJudged[0].net, gains: realJudged[0].gains, gainerPays,
        hasPicks: firstSide.give.concat(firstSide.get).some((assetId) => assetId.startsWith('pick:')),
        vals: { give: firstSide.give.map((assetId) => context.rawOf(assetId)), get: firstSide.get.map((assetId) => context.rawOf(assetId)) },
        detail: { give: firstSide.give.map((assetId) => `${assetId.startsWith('pick:') ? assetId : info[assetId] ? info[assetId].name : assetId} ${context.rawOf(assetId)}`), get: firstSide.get.map((assetId) => `${assetId.startsWith('pick:') ? assetId : info[assetId] ? info[assetId].name : assetId} ${context.rawRaw ? '' : context.rawOf(assetId)}`), w: [outlook.get(firstRosterId), outlook.get(secondRosterId)], uMe: base.uMe, uThem: base.uThem, dPts: [base.impact.a.delta, base.impact.b.delta] },
        passes: realJudged.map((judgment) => judgment.ok),
        reasons: realJudged.map((judgment) => judgment.reason),
        randomPass: allParameterSets.map((set) => randoms.filter((randomTrade) => judge(set, randomTrade.give, randomTrade.get).ok).length / randoms.length)
      });
    }
    const previousLeagueId = season.league.previous_league_id;
    seasonLeagueId = previousLeagueId && previousLeagueId !== '0' ? previousLeagueId : null;
  }
}

const allParameterSets = [DEFAULT, ...PARAM_SETS];
const percent = (fraction) => `${Math.round(fraction * 100)}%`;
const median = (values) => { const sorted = values.slice().sort((a, b) => a - b); return sorted.length ? sorted[Math.floor(sorted.length / 2)] : null; };
const quantile = (values, fraction) => { const sorted = values.slice().sort((a, b) => a - b); return sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(fraction * sorted.length))] : null; };
console.log(`\n${results.length} real trades judged (${new Set(results.map((result) => result.league)).size} leagues)\n`);
for (const kind of ['dynasty', 'redraft']) {
  const rows = results.filter((result) => (kind === 'redraft' ? result.kind === 'redraft' : result.kind !== 'redraft'));
  if (!rows.length) continue;
  const nets = rows.map((result) => result.net);
  console.log(`== ${kind}: ${rows.length} trades · ${percent(rows.filter((result) => result.hasPicks).length / rows.length)} include picks`);
  console.log(`   price gap between the sides (consensus): median ${percent(median(nets))} · 75th ${percent(quantile(nets, 0.75))} · 90th ${percent(quantile(nets, 0.9))}`);
  console.log(`   the side that gains lineup points is the one paying in price: ${percent(rows.filter((result) => result.gainerPays).length / rows.length)} of trades`);
  const gap = (result, exponent) => { const packageValue = (values) => Math.pow(values.filter((value) => value > 0).reduce((total, value) => total + Math.pow(value, exponent), 0), 1 / exponent); const giveValue = packageValue(result.vals.give); const getValue = packageValue(result.vals.get); return Math.abs(giveValue - getValue) / Math.max(giveValue, getValue, 1); };
  const byExp = [1, 1.5, 2, 2.5, 3, 4, 6].map((exponent) => [exponent, median(rows.map((result) => gap(result, exponent)))]);
  console.log(`   median price gap by package exponent (lower = real trades look more even): ${byExp.map(([exponent, medianGap]) => `${exponent}: ${percent(medianGap)}`).join(' · ')}`);
  const bothGain = rows.filter((result) => result.gains[0] > 0 && result.gains[1] > 0).length;
  console.log(`   both lineups gain: ${percent(bothGain / rows.length)} · at least one side loses points: ${percent(rows.filter((result) => Math.min(...result.gains) < 0).length / rows.length)}`);
  const score = (i) => { const real = rows.filter((result) => result.passes[i]).length / rows.length; const rnd = rows.reduce((total, result) => total + result.randomPass[i], 0) / rows.length; return { real, rnd, j: real - rnd }; };
  const ranked = allParameterSets.map((parameterSet, i) => ({ s: parameterSet, i, ...score(i) })).sort((a, b) => b.j - a.j);
  const defaultRow = ranked.find((entry) => entry.s === DEFAULT);
  console.log(`   current defaults: pass ${percent(defaultRow.real)} of real trades, ${percent(defaultRow.rnd)} of random swaps (gap ${percent(defaultRow.j)})`);
  console.log('   best parameter sets (real pass, random pass, gap):');
  for (const entry of ranked.slice(0, 8)) console.log(`     ${entry.s.name.padEnd(44)} ${percent(entry.real).padStart(4)} ${percent(entry.rnd).padStart(4)} ${percent(entry.j).padStart(4)}`);
  const why = {};
  for (const result of rows) if (!result.passes[0]) why[result.reasons[0]] = (why[result.reasons[0]] || 0) + 1;
  console.log(`   why real trades fail the current defaults: ${JSON.stringify(why)}`);
}
if (process.env.DETAILS) for (const result of results) console.log(`${result.league} ${result.season} w${result.week} [${result.kind}] net ${percent(result.net)} dPts ${result.detail.dPts.join('/')} w ${result.detail.w.map((outlookValue) => outlookValue.toFixed(2)).join('/')} u ${Math.round(result.detail.uMe)}/${Math.round(result.detail.uThem)} ${result.reasons[0] || 'PASS'}\n    A gave: ${result.detail.give.join(', ')}\n    A got : ${result.detail.get.join(', ')}`);
if (options.json) { writeFileSync(options.json, JSON.stringify({ results, sets: allParameterSets.map((parameterSet) => parameterSet.name) }, null, 1)); console.log(`\nwrote ${options.json}`); }
