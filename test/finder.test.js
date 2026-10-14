// Trade finder: who gets proposed, and what never should.
const test = require('node:test');
const assert = require('node:assert');

require('../src/lineups/core.js');
require('../src/season/core.js');
require('../src/season/value.js');
const finder = require('../src/season/finder.js');

const SLOTS = ['QB', 'RB', 'RB', 'WR', 'WR', 'FLEX', 'BN', 'BN', 'BN'];
const POS = {};
const PTS = {};
const add = (id, pos, pts) => { POS[id] = [pos]; PTS[id] = pts; return id; };
const weeks = (n) => Array.from({ length: n }, () => ({ projOf: (p) => PTS[p] || 0, isOut: () => false }));

// Me: deep at RB, thin at WR. Them: deep at WR, thin at RB.
const me = ['m_qb', 'm_rb1', 'm_rb2', 'm_rb3', 'm_rb4', 'm_wr1', 'm_wr2'];
const them = ['t_qb', 't_rb1', 't_rb2', 't_wr1', 't_wr2', 't_wr3', 't_wr4'];
add('m_qb', 'QB', 20); add('m_rb1', 'RB', 16); add('m_rb2', 'RB', 15); add('m_rb3', 'RB', 14); add('m_rb4', 'RB', 13);
add('m_wr1', 'WR', 14); add('m_wr2', 'WR', 6);
add('t_qb', 'QB', 19); add('t_rb1', 'RB', 15); add('t_rb2', 'RB', 5); add('t_wr1', 'WR', 15); add('t_wr2', 'WR', 14); add('t_wr3', 'WR', 13); add('t_wr4', 'WR', 12);

const base = (mode) => ({
  mode, slots: SLOTS, weeks: weeks(8), positionsOf: (p) => POS[p], pointValue: 50,
  isPick: (id) => id.startsWith('pick:'),
  canCut: () => false,
  rawOf: (id) => (PTS[id] || 0) * 100,
  valueOf: (team, id) => (PTS[id] || 0) * 100,
  sideValue: (vs) => vs.reduce((a, b) => a + b, 0),
  goal: 'balanced', focus: {}
});
const team = (id, pool, w, picks = []) => ({ id, pool, assets: pool.concat(picks), count: pool.length, capacity: 9, w });

test('redraft: a deal that fills each side\'s hole is proposed, and both lineups gain', () => {
  const ctx = base('redraft');
  const a = team(1, me, 0.8);
  const b = team(2, them, 0.8);
  const found = finder.proposeFor(ctx, a, b, finder.dropLosses(a, ctx));
  assert.ok(found.length > 0, 'something is proposed');
  for (const p of found) {
    assert.ok(p.me.dPts >= 1.5 && p.them.dPts >= 1, `both gain: ${p.me.dPts} / ${p.them.dPts}`);
  }
  // The natural swap: an RB from my surplus for a WR from theirs.
  assert.ok(found.some((p) => p.give.some((id) => id.startsWith('m_rb')) && p.get.some((id) => id.startsWith('t_wr'))));
});

test('redraft: never proposes a deal that makes either lineup worse', () => {
  const ctx = base('redraft');
  const a = team(1, me, 1);
  const b = team(2, them, 1);
  const found = finder.proposeFor(ctx, a, b, finder.dropLosses(a, ctx));
  assert.ok(found.every((p) => p.me.dPts > 0 && p.them.dPts > 0));
});

test('nothing to propose when neither side has a need the other can fill', () => {
  const ctx = base('redraft');
  const twin = ['x_qb', 'x_rb1', 'x_rb2', 'x_rb3', 'x_wr1', 'x_wr2'];
  [['x_qb', 'QB', 20], ['x_rb1', 'RB', 16], ['x_rb2', 'RB', 15], ['x_rb3', 'RB', 14], ['x_wr1', 'WR', 14], ['x_wr2', 'WR', 13]].forEach((r) => add(...r));
  const a = team(1, ['m_qb', 'm_rb1', 'm_rb2', 'm_rb3', 'm_wr1', 'm_wr2'], 1);
  const b = team(3, twin, 1);
  const found = finder.proposeFor(ctx, a, b, finder.dropLosses(a, ctx));
  assert.ok(found.every((p) => p.me.dPts >= 1.5), 'only real upgrades');
});

test('roster limits: a deal that overfills a full roster is not proposed', () => {
  const ctx = base('redraft');
  const a = Object.assign(team(1, me, 0.8), { capacity: me.length });
  const b = Object.assign(team(2, them, 0.8), { capacity: them.length });
  const found = finder.proposeFor(ctx, a, b, finder.dropLosses(a, ctx));
  assert.ok(found.every((p) => p.give.length === p.get.length), 'only even swaps on full rosters');
});

test('shop and target: every proposal includes the player you are shopping or after', () => {
  const ctx = Object.assign(base('redraft'), { focus: { shop: 'm_rb3' } });
  const a = team(1, me, 0.8);
  const b = team(2, them, 0.8);
  const found = finder.proposeFor(ctx, a, b, finder.dropLosses(a, ctx));
  assert.ok(found.length > 0 && found.every((p) => p.give.includes('m_rb3')));
  const ctx2 = Object.assign(base('redraft'), { focus: { target: 't_wr2' } });
  const f2 = finder.proposeFor(ctx2, a, b, finder.dropLosses(a, ctx2));
  assert.ok(f2.every((p) => p.get.includes('t_wr2')));
  assert.deepEqual(finder.proposeFor(Object.assign(base('redraft'), { focus: { target: 'nobody' } }), a, b, finder.dropLosses(a, ctx)), []);
});

// Dynasty: values are in KTC-like units and picks exist.
const dyn = () => {
  const ctx = base('dynasty');
  const ktc = { m_qb: 7000, m_rb1: 6000, m_rb2: 5200, m_rb3: 3000, m_rb4: 2500, m_wr1: 5000, m_wr2: 1500, t_qb: 6500, t_rb1: 4800, t_rb2: 1200, t_wr1: 6200, t_wr2: 4000, t_wr3: 3500, t_wr4: 3000, 'pick:2027:1:2': 5000, 'pick:2027:1:1': 5200 };
  const ages = { m_rb1: 30, m_rb2: 29, t_wr1: 22, t_wr2: 23 };
  ctx.rawOf = (id) => ktc[id] || 0;
  ctx.valueOf = (t, id, w) => {
    const age = ages[id] || 26;
    let v = ktc[id] || 0;
    if (ctx.isPick(id)) v *= w > 0.6 ? 0.92 : w < 0.3 ? 1.12 : 1;
    else if (age > 27) v *= w < 0.3 ? Math.max(0.7, 1 - 0.05 * (age - 27)) : 1.03;
    return v;
  };
  ctx.sideValue = (vs) => Math.round(Math.pow(vs.reduce((a, b) => a + Math.pow(b, 1.5), 0), 1 / 1.5));
  return { ctx, ktc };
};

test('dynasty: never asks them to take a loss on consensus value', () => {
  const { ctx } = dyn();
  const a = team(1, me, 0.9, ['pick:2027:1:1']);
  const b = team(2, them, 0.1, ['pick:2027:1:2']);
  const found = finder.proposeFor(ctx, a, b, finder.dropLosses(a, ctx));
  assert.ok(found.length > 0, 'a contender and a rebuilder find a deal');
  for (const p of found) {
    assert.ok(p.rawNetThem >= -finder.FAIR_TOLERANCE, `partner sees ${p.rawNetThem}`);
    assert.ok(p.likelihood > 0 && p.likelihood < 1);
  }
});

test('dynasty: the rebuilder is offered picks and youth for veterans, not the reverse', () => {
  const { ctx } = dyn();
  const a = team(1, me, 0.95, ['pick:2027:1:1']); // contender
  const b = team(2, them, 0.05, ['pick:2027:1:2']); // rebuilder holding a pick and young WRs
  const found = finder.proposeFor(ctx, a, b, finder.dropLosses(a, ctx));
  const best = found[0];
  assert.ok(best, 'a deal exists');
  // The contender takes back production; the rebuilder gets the older players or the pick the contender holds.
  const vetsToThem = best.give.filter((id) => ['m_rb1', 'm_rb2'].includes(id)).length + best.give.filter((id) => id.startsWith('pick:')).length;
  assert.ok(vetsToThem > 0, `gives ${best.give}`);
});

test('goal chips change what you are asked to accept: win now wants points, rebuild wants value', () => {
  const a = team(1, me, 0.5, ['pick:2027:1:1']);
  const b = team(2, them, 0.5, ['pick:2027:1:2']);
  const run = (goal) => { const { ctx } = dyn(); ctx.goal = goal; return finder.proposeFor(ctx, a, b, finder.dropLosses(a, ctx)); };
  assert.ok(run('now').every((p) => p.me.dPts >= 3), 'win now: every deal adds points');
  const { ctx } = dyn();
  for (const p of run('future')) {
    assert.ok(finder.valueGain(ctx, a, 0, p.give, p.get) >= 0.04 * p.size, 'rebuild: every deal adds value');
  }
});

test('contention maps playoff odds to a 0 to 1 window', () => {
  assert.equal(finder.contention(0), 0);
  assert.equal(finder.contention(0.1), 0);
  assert.ok(Math.abs(finder.contention(0.35) - 0.5) < 1e-9);
  assert.equal(finder.contention(0.99), 1);
  assert.ok(finder.lambdaOf(1) > 0 && finder.lambdaOf(0) < 0);
});

test('subsets: every group of one or two', () => {
  assert.deepEqual(finder.subsets(['a', 'b', 'c'], 2), [['a'], ['a', 'b'], ['a', 'c'], ['b'], ['b', 'c'], ['c']]);
});

test('kickers and defenses are never traded for, unless you ask about one', () => {
  const ctx = base('redraft');
  const withK = ['m_qb', 'm_rb1', 'm_rb2', 'm_rb3', 'm_wr1', 'm_wr2', add('m_k', 'K', 9)];
  const theirsK = ['t_qb', 't_rb1', 't_wr1', 't_wr2', 't_wr3', add('t_k', 'K', 3), add('t_def', 'DEF', 8)];
  ctx.slots = SLOTS.concat('K', 'DEF');
  const a = team(1, withK, 1);
  const b = team(2, theirsK, 1);
  const found = finder.proposeFor(ctx, a, b, finder.dropLosses(a, ctx));
  assert.ok(found.every((p) => !p.give.concat(p.get).some((id) => ['m_k', 't_k', 't_def'].includes(id))));
  const asked = Object.assign(base('redraft'), { slots: ctx.slots, focus: { target: 't_def' } });
  const f2 = finder.proposeFor(asked, a, b, finder.dropLosses(a, asked));
  assert.ok(f2.every((p) => p.get.includes('t_def')));
});

test('dynasty: a contender is only offered deals that add points, a rebuilder deals that add value', () => {
  const { ctx } = dyn();
  const contender = team(1, me, 0.95, ['pick:2027:1:1']);
  const seller = team(2, them, 0.05, ['pick:2027:1:2']);
  for (const p of finder.proposeFor(ctx, contender, seller, finder.dropLosses(contender, ctx))) {
    assert.ok(p.me.dPts >= 3, `contender gains ${p.me.dPts}`);
  }
  assert.equal(finder.worthIt({ mode: 'dynasty' }, 0.95, 'balanced', 1, 500, 1000), false); // a contender will not pay in points for value
  assert.equal(finder.worthIt({ mode: 'dynasty' }, 0.05, 'balanced', 40, 10, 1000), false); // and a rebuilder will not take points for nothing
  assert.equal(finder.worthIt({ mode: 'dynasty' }, 0.05, 'balanced', -40, 80, 1000), true);
  assert.equal(finder.worthIt({ mode: 'dynasty' }, 0.5, 'balanced', 5, 0, 1000), true); // in the hunt: points alone will do
  assert.equal(finder.worthIt({ mode: 'dynasty' }, 0.95, 'future', -20, 80, 1000), true); // chip says rebuild
});

test('a full roster cuts a spare part to make room, and in dynasty pays for it', () => {
  const { ctx } = dyn();
  ctx.canCut = () => true;
  const spareA = add('m_spare', 'RB', 0);
  const a = Object.assign(team(1, me.concat(spareA), 0.5), { players: me.concat(spareA), capacity: me.length + 1 });
  const b = Object.assign(team(2, them, 0.5), { players: them, capacity: them.length });
  const found = finder.proposeFor(ctx, a, b, finder.dropLosses(a, ctx));
  const uneven = found.filter((p) => p.get.length > p.give.length);
  assert.ok(uneven.every((p) => p.drops.me.includes('m_spare')), 'the 2-for-1 coming in cuts the spare');
});

test('starts count the weeks an incoming player is in the lineup', () => {
  const ctx = base('redraft');
  const a = team(1, me, 0.8);
  const b = team(2, them, 0.8);
  const [first] = finder.proposeFor(ctx, a, b, finder.dropLosses(a, ctx));
  assert.ok(first.me.starts.length > 0);
  assert.ok(first.me.starts.every((s) => s.weeks >= 1 && s.weeks <= ctx.weeks.length));
});

// Redraft with a consensus price (KeepTradeCut's fantasy values) alongside projections.
const redraftPriced = () => {
  const ctx = base('redraft');
  const price = { m_qb: 7000, m_rb1: 6000, m_rb2: 5200, m_rb3: 4500, m_rb4: 3800, m_wr1: 5000, m_wr2: 1500, t_qb: 6500, t_rb1: 4800, t_rb2: 1200, t_wr1: 6200, t_wr2: 4800, t_wr3: 4200, t_wr4: 3600 };
  ctx.consensus = true;
  ctx.pointValue = 400;
  ctx.rawOf = (id) => price[id] || 0;
  ctx.valueOf = (t, id) => price[id] || 0;
  ctx.sideValue = (vs) => Math.round(Math.pow(vs.reduce((a, b) => a + Math.pow(b, 2), 0), 1 / 2));
  return { ctx, price };
};

test('redraft consensus: the other side never loses more than a tenth on price, and you do not overpay by more than a few percent', () => {
  const { ctx } = redraftPriced();
  const a = team(1, me, 0.8);
  const b = team(2, them, 0.8);
  const found = finder.proposeFor(ctx, a, b, finder.dropLosses(a, ctx));
  assert.ok(found.length > 0);
  for (const p of found) {
    assert.ok(p.rawNetThem >= -finder.FAIR_TOLERANCE_REDRAFT, `they see ${p.rawNetThem}`);
    assert.ok(p.rawNetThem <= 0.07 + 1e-9, `you overpay by ${p.rawNetThem}`);
  }
});

test('redraft consensus: a team out of the race takes a deal on price, not on points', () => {
  const { ctx } = redraftPriced();
  const a = team(1, me, 0.9);
  const eliminated = team(2, them, 0.02);
  const found = finder.proposeFor(ctx, a, eliminated, finder.dropLosses(a, ctx));
  assert.ok(found.length > 0, 'an eliminated team still deals');
  assert.ok(found.every((p) => p.rawNetThem >= 0.03 - 1e-9 || p.them.dPts >= 2), 'it wins on consensus value or gains points');
  // The same deals do not clear the bar for a contender unless it gains points.
  const contender = team(3, them, 0.95);
  assert.ok(finder.proposeFor(ctx, a, contender, finder.dropLosses(a, ctx)).every((p) => p.them.dPts >= 2));
  assert.equal(finder.worthIt({ mode: 'redraft', consensus: true }, 0.02, 'balanced', -10, 400, 5000, 'them'), true);
  assert.equal(finder.worthIt({ mode: 'redraft', consensus: true }, 0.02, 'balanced', 10, 20, 5000, 'them'), false);
  assert.equal(finder.worthIt({ mode: 'redraft', consensus: true }, 0.9, 'balanced', 1, 900, 5000, 'me'), false);
});

test('playoff weeks count extra when a lineup is priced', () => {
  const { lineupPoints, restOfSeason } = require('../src/season/value.js');
  const w = [{ projOf: () => 10, isOut: () => false }, { projOf: () => 10, isOut: () => false, weight: 1.5 }];
  POS.solo = ['QB']; PTS.solo = 10;
  assert.deepEqual(lineupPoints(['QB'], ['solo'], w, () => ['QB']).perWeek, [10, 15]);
  assert.equal(restOfSeason('solo', w), 25);
});
