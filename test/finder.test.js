const test = require('node:test');
const assert = require('node:assert');

require('../src/lineups/core.js');
require('../src/season/core.js');
require('../src/season/value.js');
require('../src/valuation/age-curves.js');
require('../src/valuation/redraft-values.js');
const finder = require('../src/season/finder.js');

const SLOTS = ['QB', 'RB', 'RB', 'WR', 'WR', 'FLEX', 'BN', 'BN', 'BN'];
const POS = {};
const PTS = {};
const add = (playerId, position, points) => { POS[playerId] = [position]; PTS[playerId] = points; return playerId; };
const weeks = (weekCount) => Array.from({ length: weekCount }, () => ({ projOf: (playerId) => PTS[playerId] || 0, isOut: () => false }));

const myPlayers = ['m_qb', 'm_rb1', 'm_rb2', 'm_rb3', 'm_rb4', 'm_wr1', 'm_wr2'];
const theirPlayers = ['t_qb', 't_rb1', 't_rb2', 't_wr1', 't_wr2', 't_wr3', 't_wr4'];
add('m_qb', 'QB', 20); add('m_rb1', 'RB', 16); add('m_rb2', 'RB', 15); add('m_rb3', 'RB', 14); add('m_rb4', 'RB', 13);
add('m_wr1', 'WR', 14); add('m_wr2', 'WR', 6);
add('t_qb', 'QB', 19); add('t_rb1', 'RB', 15); add('t_rb2', 'RB', 5); add('t_wr1', 'WR', 15); add('t_wr2', 'WR', 14); add('t_wr3', 'WR', 13); add('t_wr4', 'WR', 12);

const base = (mode) => ({
  mode, slots: SLOTS, weeks: weeks(8), positionsOf: (playerId) => POS[playerId], pointValue: 50,
  isPick: (playerId) => playerId.startsWith('pick:'),
  canCut: () => false,
  rawOf: (playerId) => (PTS[playerId] || 0) * 100,
  valueOf: (team, playerId) => (PTS[playerId] || 0) * 100,
  sideValue: (values) => values.reduce((total, value) => total + value, 0),
  goal: 'balanced', focus: {}
});
const team = (playerId, pool, outlook, picks = []) => ({ id: playerId, pool, assets: pool.concat(picks), count: pool.length, capacity: 9, w: outlook });

test('redraft: a deal that fills each side\'s hole is proposed, and both lineups gain', () => {
  const context = base('redraft');
  const myTeam = team(1, myPlayers, 0.8);
  const theirTeam = team(2, theirPlayers, 0.8);
  const found = finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context));
  assert.ok(found.length > 0, 'something is proposed');
  for (const proposal of found) {
    assert.ok(proposal.me.dPts >= 1.5 && proposal.them.dPts >= 1, `both gain: ${proposal.me.dPts} / ${proposal.them.dPts}`);
  }
  assert.ok(found.some((proposal) => proposal.give.some((playerId) => playerId.startsWith('m_rb')) && proposal.get.some((playerId) => playerId.startsWith('t_wr'))));
});

test('redraft: never proposes a deal that makes either lineup worse', () => {
  const context = base('redraft');
  const myTeam = team(1, myPlayers, 1);
  const theirTeam = team(2, theirPlayers, 1);
  const found = finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context));
  assert.ok(found.every((proposal) => proposal.me.dPts > 0 && proposal.them.dPts > 0));
});

test('nothing to propose when neither side has a need the other can fill', () => {
  const context = base('redraft');
  const twin = ['x_qb', 'x_rb1', 'x_rb2', 'x_rb3', 'x_wr1', 'x_wr2'];
  [['x_qb', 'QB', 20], ['x_rb1', 'RB', 16], ['x_rb2', 'RB', 15], ['x_rb3', 'RB', 14], ['x_wr1', 'WR', 14], ['x_wr2', 'WR', 13]].forEach((entry) => add(...entry));
  const myTeam = team(1, ['m_qb', 'm_rb1', 'm_rb2', 'm_rb3', 'm_wr1', 'm_wr2'], 1);
  const theirTeam = team(3, twin, 1);
  const found = finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context));
  assert.ok(found.every((proposal) => proposal.me.dPts >= 1.5), 'only real upgrades');
});

test('roster limits: a deal that overfills a full roster is not proposed', () => {
  const context = base('redraft');
  const myTeam = Object.assign(team(1, myPlayers, 0.8), { capacity: myPlayers.length });
  const theirTeam = Object.assign(team(2, theirPlayers, 0.8), { capacity: theirPlayers.length });
  const found = finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context));
  assert.ok(found.every((proposal) => proposal.give.length === proposal.get.length), 'only even swaps on full rosters');
});

test('shop and target: every proposal includes the player you are shopping or after', () => {
  const context = Object.assign(base('redraft'), { focus: { shop: 'm_rb3' } });
  const myTeam = team(1, myPlayers, 0.8);
  const theirTeam = team(2, theirPlayers, 0.8);
  const found = finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context));
  assert.ok(found.length > 0 && found.every((proposal) => proposal.give.includes('m_rb3')));
  const ctx2 = Object.assign(base('redraft'), { focus: { target: 't_wr2' } });
  const targetedProposals = finder.proposeFor(ctx2, myTeam, theirTeam, finder.dropLosses(myTeam, ctx2));
  assert.ok(targetedProposals.every((proposal) => proposal.get.includes('t_wr2')));
  assert.deepEqual(finder.proposeFor(Object.assign(base('redraft'), { focus: { target: 'nobody' } }), myTeam, theirTeam, finder.dropLosses(myTeam, context)), []);
});

const isDynasty = () => {
  const context = base('dynasty');
  const ktc = { m_qb: 7000, m_rb1: 6000, m_rb2: 5200, m_rb3: 3000, m_rb4: 2500, m_wr1: 5000, m_wr2: 1500, t_qb: 6500, t_rb1: 4800, t_rb2: 1200, t_wr1: 6200, t_wr2: 4000, t_wr3: 3500, t_wr4: 3000, 'pick:2027:1:2': 5000, 'pick:2027:1:1': 5200 };
  const ages = { m_rb1: 30, m_rb2: 29, t_wr1: 22, t_wr2: 23 };
  context.rawOf = (playerId) => ktc[playerId] || 0;
  context.valueOf = (team, playerId, outlook) => {
    const age = ages[playerId] || 26;
    let value = ktc[playerId] || 0;
    if (context.isPick(playerId)) value *= outlook > 0.6 ? 0.92 : outlook < 0.3 ? 1.12 : 1;
    else if (age > 27) value *= outlook < 0.3 ? Math.max(0.7, 1 - 0.05 * (age - 27)) : 1.03;
    return value;
  };
  context.sideValue = (values) => Math.round(Math.pow(values.reduce((total, value) => total + Math.pow(value, 1.5), 0), 1 / 1.5));
  return { ctx: context, ktc };
};

test('dynasty: never asks them to take a loss on consensus value', () => {
  const { ctx: context } = isDynasty();
  const myTeam = team(1, myPlayers, 0.9, ['pick:2027:1:1']);
  const theirTeam = team(2, theirPlayers, 0.1, ['pick:2027:1:2']);
  const found = finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context));
  assert.ok(found.length > 0, 'a contender and a rebuilder find a deal');
  for (const proposal of found) {
    assert.ok(proposal.rawNetThem >= -finder.FAIR_TOLERANCE, `partner sees ${proposal.rawNetThem}`);
    assert.ok(proposal.likelihood > 0 && proposal.likelihood < 1);
  }
});

test('dynasty: the rebuilder is offered picks and youth for veterans, not the reverse', () => {
  const { ctx: context } = isDynasty();
  const myTeam = team(1, myPlayers, 0.95, ['pick:2027:1:1']);
  const theirTeam = team(2, theirPlayers, 0.05, ['pick:2027:1:2']);
  const found = finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context));
  const best = found[0];
  assert.ok(best, 'a deal exists');
  const vetsToThem = best.give.filter((playerId) => ['m_rb1', 'm_rb2'].includes(playerId)).length + best.give.filter((playerId) => playerId.startsWith('pick:')).length;
  assert.ok(vetsToThem > 0, `gives ${best.give}`);
});

test('goal chips change what you are asked to accept: win now wants points, rebuild wants value', () => {
  const myTeam = team(1, myPlayers, 0.5, ['pick:2027:1:1']);
  const theirTeam = team(2, theirPlayers, 0.5, ['pick:2027:1:2']);
  const run = (goal) => { const { ctx: context } = isDynasty(); context.goal = goal; return finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context)); };
  assert.ok(run('now').every((proposal) => proposal.me.dPts >= 3), 'win now: every deal adds points');
  const { ctx: context } = isDynasty();
  for (const proposal of run('future')) {
    assert.ok(finder.valueGain(context, myTeam, 0, proposal.give, proposal.get) >= 0.04 * proposal.size, 'rebuild: every deal adds value');
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
  const context = base('redraft');
  const withK = ['m_qb', 'm_rb1', 'm_rb2', 'm_rb3', 'm_wr1', 'm_wr2', add('m_k', 'K', 9)];
  const theirsK = ['t_qb', 't_rb1', 't_wr1', 't_wr2', 't_wr3', add('t_k', 'K', 3), add('t_def', 'DEF', 8)];
  context.slots = SLOTS.concat('K', 'DEF');
  const myTeam = team(1, withK, 1);
  const theirTeam = team(2, theirsK, 1);
  const found = finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context));
  assert.ok(found.every((proposal) => !proposal.give.concat(proposal.get).some((playerId) => ['m_k', 't_k', 't_def'].includes(playerId))));
  const asked = Object.assign(base('redraft'), { slots: context.slots, focus: { target: 't_def' } });
  const targetedProposals = finder.proposeFor(asked, myTeam, theirTeam, finder.dropLosses(myTeam, asked));
  assert.ok(targetedProposals.every((proposal) => proposal.get.includes('t_def')));
});

test('dynasty: a contender is only offered deals that add points, a rebuilder deals that add value', () => {
  const { ctx: context } = isDynasty();
  const contender = team(1, myPlayers, 0.95, ['pick:2027:1:1']);
  const seller = team(2, theirPlayers, 0.05, ['pick:2027:1:2']);
  for (const proposal of finder.proposeFor(context, contender, seller, finder.dropLosses(contender, context))) {
    assert.ok(proposal.me.dPts >= 3, `contender gains ${proposal.me.dPts}`);
  }
  assert.equal(finder.worthIt({ mode: 'dynasty' }, 0.95, 'balanced', 1, 500, 1000), false);
  assert.equal(finder.worthIt({ mode: 'dynasty' }, 0.05, 'balanced', 40, 10, 1000), false);
  assert.equal(finder.worthIt({ mode: 'dynasty' }, 0.05, 'balanced', -40, 80, 1000), true);
  assert.equal(finder.worthIt({ mode: 'dynasty' }, 0.5, 'balanced', 5, 0, 1000), true);
  assert.equal(finder.worthIt({ mode: 'dynasty' }, 0.95, 'future', -20, 80, 1000), true);
});

test('a full roster cuts a spare part to make room, and in dynasty pays for it', () => {
  const { ctx: context } = isDynasty();
  context.canCut = () => true;
  const spareA = add('m_spare', 'RB', 0);
  const myTeam = Object.assign(team(1, myPlayers.concat(spareA), 0.5), { players: myPlayers.concat(spareA), capacity: myPlayers.length + 1 });
  const theirTeam = Object.assign(team(2, theirPlayers, 0.5), { players: theirPlayers, capacity: theirPlayers.length });
  const found = finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context));
  const uneven = found.filter((proposal) => proposal.get.length > proposal.give.length);
  assert.ok(uneven.every((proposal) => proposal.drops.me.includes('m_spare')), 'the 2-for-1 coming in cuts the spare');
});

test('starts count the weeks an incoming player is in the lineup', () => {
  const context = base('redraft');
  const myTeam = team(1, myPlayers, 0.8);
  const theirTeam = team(2, theirPlayers, 0.8);
  const [first] = finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context));
  assert.ok(first.me.starts.length > 0);
  assert.ok(first.me.starts.every((start) => start.weeks >= 1 && start.weeks <= context.weeks.length));
});

const redraftPriced = () => {
  const context = base('redraft');
  const price = { m_qb: 7000, m_rb1: 6000, m_rb2: 5200, m_rb3: 4500, m_rb4: 3800, m_wr1: 5000, m_wr2: 1500, t_qb: 6500, t_rb1: 4800, t_rb2: 1200, t_wr1: 6200, t_wr2: 4800, t_wr3: 4200, t_wr4: 3600 };
  context.consensus = true;
  context.pointValue = 400;
  context.rawOf = (playerId) => price[playerId] || 0;
  context.valueOf = (team, playerId) => price[playerId] || 0;
  context.sideValue = (values) => Math.round(Math.pow(values.reduce((total, value) => total + Math.pow(value, 2), 0), 1 / 2));
  return { ctx: context, price };
};

test('redraft consensus: the other side never loses more than a tenth on price, and you do not overpay by more than a few percent', () => {
  const { ctx: context } = redraftPriced();
  const myTeam = team(1, myPlayers, 0.8);
  const theirTeam = team(2, theirPlayers, 0.8);
  const found = finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context));
  assert.ok(found.length > 0);
  for (const proposal of found) {
    assert.ok(proposal.rawNetThem >= -finder.FAIR_TOLERANCE_REDRAFT, `they see ${proposal.rawNetThem}`);
    assert.ok(proposal.rawNetThem <= 0.07 + 1e-9, `you overpay by ${proposal.rawNetThem}`);
  }
});

test('redraft consensus: a team out of the race takes a deal on price, not on points', () => {
  const { ctx: context } = redraftPriced();
  const myTeam = team(1, myPlayers, 0.9);
  const eliminated = team(2, theirPlayers, 0.02);
  const found = finder.proposeFor(context, myTeam, eliminated, finder.dropLosses(myTeam, context));
  assert.ok(found.length > 0, 'an eliminated team still deals');
  assert.ok(found.every((proposal) => proposal.rawNetThem >= 0.03 - 1e-9 || proposal.them.dPts >= 2), 'it wins on consensus value or gains points');
  const contender = team(3, theirPlayers, 0.95);
  assert.ok(finder.proposeFor(context, myTeam, contender, finder.dropLosses(myTeam, context)).every((proposal) => proposal.them.dPts >= 2));
  assert.equal(finder.worthIt({ mode: 'redraft', consensus: true }, 0.02, 'balanced', -10, 400, 5000, 'them'), true);
  assert.equal(finder.worthIt({ mode: 'redraft', consensus: true }, 0.02, 'balanced', 10, 20, 5000, 'them'), false);
  assert.equal(finder.worthIt({ mode: 'redraft', consensus: true }, 0.9, 'balanced', 1, 900, 5000, 'me'), false);
});

test('playoff weeks count extra when a lineup is priced', () => {
  const { lineupPoints, restOfSeason } = require('../src/season/value.js');
  const weekEntries = [{ projOf: () => 10, isOut: () => false }, { projOf: () => 10, isOut: () => false, weight: 1.5 }];
  POS.solo = ['QB']; PTS.solo = 10;
  assert.deepEqual(lineupPoints(['QB'], ['solo'], weekEntries, () => ['QB']).perWeek, [10, 15]);
  assert.equal(restOfSeason('solo', weekEntries), 25);
});

test('judge: a deal someone made goes through the same gates the search applies', () => {
  const context = base('redraft');
  const myTeam = team(1, myPlayers, 0.8);
  const theirTeam = team(2, theirPlayers, 0.8);
  const good = finder.judge(context, myTeam, theirTeam, ['m_rb3'], ['t_wr2']);
  assert.equal(good.ok, true);
  assert.ok(good.impact.a.delta >= 3 && good.impact.b.delta >= 2);
  const bad = finder.judge(context, myTeam, theirTeam, ['m_qb'], ['t_rb2']);
  assert.equal(bad.ok, false);
  assert.ok(['noUpgrade', 'youOverpay'].includes(bad.reason), bad.reason);
  const { ctx: dctx } = isDynasty();
  const rip = finder.judge(dctx, team(1, myPlayers, 0.9), team(2, theirPlayers, 0.1), ['m_rb4'], ['t_wr1']);
  assert.equal(rip.ok, false);
  assert.ok(rip.rawNetThem < 0);
});

test('parameters can be overridden, which is how the backtest tries other ones', () => {
  const context = base('redraft');
  const myTeam = team(1, myPlayers, 0.8);
  const theirTeam = team(2, theirPlayers, 0.8);
  assert.equal(finder.judge(context, myTeam, theirTeam, ['m_rb3'], ['t_wr2']).ok, true);
  const strict = Object.assign({}, context, { params: { minPoints: { me: 500, them: 500 } } });
  assert.equal(finder.judge(strict, myTeam, theirTeam, ['m_rb3'], ['t_wr2']).ok, false);
  assert.equal(finder.paramsOf(context).fairTolerance, finder.DEFAULTS.fairTolerance);
});

test('picks never crowd players out of the shortlist: players alone still get proposed', () => {
  const context = Object.assign(base('dynasty'), { pointValue: 50, valueOf: (team, playerId) => (playerId.startsWith('pick:') ? 1500 : (PTS[playerId] || 0) * 100), rawOf: (playerId) => (playerId.startsWith('pick:') ? 1500 : (PTS[playerId] || 0) * 100) });
  const picks = ['pick:2027:1:1', 'pick:2028:1:1', 'pick:2029:1:1', 'pick:2027:2:1', 'pick:2028:2:1'];
  const myTeam = Object.assign(team(1, myPlayers, 0.8, picks), { count: myPlayers.length });
  const theirTeam = team(2, theirPlayers, 0.3);
  const found = finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context));
  assert.ok(found.some((proposal) => !proposal.give.concat(proposal.get).some(context.isPick)), 'a players-only deal is among them');
});

test('a throw-in who starts for nobody and is worth little is not padded into a deal', () => {
  const context = base('redraft');
  add('m_scrub', 'RB', 1);
  const myTeam = team(1, myPlayers.concat('m_scrub'), 0.8);
  const theirTeam = team(2, theirPlayers, 0.8);
  for (const proposal of finder.proposeFor(context, myTeam, theirTeam, finder.dropLosses(myTeam, context))) assert.ok(!proposal.give.includes('m_scrub'));
});

test('a rebuilding team is not offered an aging player, a contender is', () => {
  const context = Object.assign(base('dynasty'), { ageOf: (assetId) => ({ m_rb1: 27, m_rb2: 27, m_rb3: 27, m_rb4: 27 }[assetId] || 24) });
  const myTeam = team(1, myPlayers, 0.8);
  const rebuilding = team(2, theirPlayers, 0.1);
  const contending = team(3, theirPlayers, 0.9);
  const aging = (proposal) => proposal.give.some((assetId) => assetId.startsWith('m_rb'));
  const toRebuilder = finder.proposeFor(context, myTeam, rebuilding, finder.dropLosses(myTeam, context));
  assert.ok(!toRebuilder.some(aging), 'no 27-year-old running back goes to a rebuilding team');
  const toContender = finder.proposeFor(context, myTeam, contending, finder.dropLosses(myTeam, context));
  assert.ok(toContender.some(aging), 'the same player is fine for a contender');
});
