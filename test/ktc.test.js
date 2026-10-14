// KeepTradeCut values: parsing the page, format and scoring adjustments.
const test = require('node:test');
const assert = require('node:assert');

require('../src/draft/match-names.js');
const ktc = require('../src/shared/ktc.js');

const val = (v, tep, tepp, teppp) => ({ value: v, tep: { value: tep }, tepp: { value: tepp }, teppp: { value: teppp } });
const row = (playerName, position, team, one, sf, age = 25) => ({ playerName, position, team, age, oneQBValues: one, superflexValues: sf });
const page = (rows) => `<html><script id="ktc-players" type="application/json">${JSON.stringify(rows)}</script></html>`;

test('parsing reads players, draft picks and every tight-end tier', () => {
  const rows = ktc.parse(page([
    row('Josh Allen', 'QB', 'BUF', val(7000, 7000, 7000, 7000), val(9999, 9999, 9999, 9999)),
    row('Trey McBride', 'TE', 'ARI', val(6000, 6500, 7000, 7500), val(6100, 6600, 7100, 7600)),
    row('2027 Early 1st', 'RDP', null, val(1, 1, 1, 1), val(1, 1, 1, 1))
  ]));
  assert.deepEqual(rows.map((r) => r.n), ['Josh Allen', 'Trey McBride', '2027 Early 1st']);
  assert.deepEqual(rows[1].v, [6000, 6500, 7000, 7500]);
  assert.deepEqual(rows[1].s, [6100, 6600, 7100, 7600]);
  assert.throws(() => ktc.parse('<html></html>'), /changed its page/);
});

test('league format picks the value: superflex vs 1QB, and tight-end premium only for TEs', () => {
  const te = { p: 'TE', v: [6000, 6500, 7000, 7500], s: [6100, 6600, 7100, 7600] };
  const wr = { p: 'WR', v: [5000, 5000, 5000, 5000], s: [5100, 5100, 5100, 5100] };
  assert.equal(ktc.valueIn(te, { superflex: false, tep: 0 }), 6000);
  assert.equal(ktc.valueIn(te, { superflex: true, tep: 2 }), 7100);
  assert.equal(ktc.valueIn(wr, { superflex: false, tep: 3 }), 5000);
  assert.equal(ktc.isSuperflex(['QB', 'RB', 'SUPER_FLEX', 'BN']), true);
  assert.equal(ktc.isSuperflex(['QB', 'QB', 'RB']), true);
  assert.equal(ktc.isSuperflex(['QB', 'RB', 'FLEX']), false);
  assert.equal(ktc.tepTier({ bonus_rec_te: 0.5 }), 1);
  assert.equal(ktc.tepTier({ bonus_rec_te: 1.5 }), 3);
  assert.equal(ktc.tepTier({}), 0);
});

test('scoring shifts value by how the league treats the player compared with PPR', () => {
  assert.equal(ktc.scoringFactor(120, 160), 0.75); // a receiver in standard scoring
  assert.equal(ktc.scoringFactor(200, 200), 1);
  assert.equal(ktc.scoringFactor(500, 200), 1.4); // capped
  assert.equal(ktc.scoringFactor(10, 200), 0.6);
  assert.equal(ktc.scoringFactor(0, 200), 1); // no projection: leave the value alone
});

test('a trade side is worth less than its pieces added up, so depth does not buy a star', () => {
  assert.equal(ktc.sideValue([4000, 4000]) < 8000, true);
  assert.equal(ktc.sideValue([4000, 4000]) < ktc.sideValue([6500]), true);
  assert.equal(ktc.sideValue([5000]), 5000);
  assert.equal(ktc.sideValue([]), 0);
});

test('KTC names are matched to Sleeper players', () => {
  const rows = [{ n: 'Marvin Harrison Jr.', p: 'WR', t: 'ARI', a: 24, v: [8000, 8000, 8000, 8000], s: [8100, 8100, 8100, 8100] }];
  const found = ktc.matchAll(rows, [{ id: '99', name: 'Marvin Harrison', position: 'WR', team: 'ARI' }]);
  assert.equal(found['99'].p, 'WR');
  assert.deepEqual(found['99'].v, rows[0].v);
});

test('draft picks: priced by year, round and where in the round, in the league format', () => {
  const rows = ktc.parse(page([
    row('2027 Early 1st', 'RDP', null, val(7125, 7125, 7125, 7125), val(6967, 6967, 6967, 6967)),
    row('2027 Late 2nd', 'RDP', null, val(3980, 3980, 3980, 3980), val(3286, 3286, 3286, 3286)),
    row('Josh Allen', 'QB', 'BUF', val(7000, 7000, 7000, 7000), val(9999, 9999, 9999, 9999))
  ]));
  const picks = ktc.pickValues(rows);
  assert.deepEqual(Object.keys(picks).sort(), ['2027:1:early', '2027:2:late']);
  assert.equal(ktc.pickValue(picks, { year: 2027, round: 1, tier: 'early', superflex: true }), 6967);
  assert.equal(ktc.pickValue(picks, { year: 2027, round: 1, tier: 'early', superflex: false }), 7125);
  assert.equal(ktc.pickValue(picks, { year: 2031, round: 1, tier: 'mid', superflex: false }), 0);
  assert.deepEqual(Object.keys(ktc.matchAll(rows, [{ id: '1', name: 'Josh Allen', position: 'QB', team: 'BUF' }])), ['1']); // picks are not players
});

test('pick tier follows the standings: the worst teams pick early', () => {
  const tiers = Array.from({ length: 12 }, (_, i) => ktc.pickTier(i + 1, 12));
  assert.deepEqual(tiers, ['early', 'early', 'early', 'early', 'mid', 'mid', 'mid', 'mid', 'late', 'late', 'late', 'late']);
  assert.deepEqual([1, 5, 10].map((r) => ktc.pickTier(r, 10)), ['early', 'mid', 'late']);
});

test('projected draft slots turn into pick tiers: the team projected to finish last holds the early pick', () => {
  require('../src/lineups/core.js');
  require('../src/season/core.js');
  const projection = require('../src/season/project.js');
  const strength = { 1: 150, 2: 120, 3: 100, 4: 60 };
  const week = { pairs: [[1, 4], [2, 3]], teams: Object.fromEntries(Object.entries(strength).map(([id, m]) => [id, { mean: m, variance: 100 }])) };
  const teams = [1, 2, 3, 4].map((rosterId) => ({ rosterId, wins: 2, losses: 2, ties: 0, pf: 400, max: 450, efficiency: 1 }));
  const p = projection.projectSeason({ teams, weeks: [week, week], sims: 1500, seed: 3, draft: { method: 'linear' } });
  const order = projection.projectedDraft(p, { method: 'linear' });
  assert.equal(order[0].rosterId, 4); // the weakest roster picks first
  assert.equal(order[3].rosterId, 1);
  assert.equal(ktc.pickTier(order[0].pick, 12), 'early');
  assert.equal(ktc.pickTier(order[3].pick, 4), 'late');
});

test('redraft rankings list defenses and kickers as DST and PK: they match Sleeper DEF and K', () => {
  const rows = ktc.parse(page([
    row('Philadelphia Eagles', 'DST', 'PHI', val(3000, 3000, 3000, 3000), val(3000, 3000, 3000, 3000)),
    row('Brandon Aubrey', 'PK', 'DAL', val(2500, 2500, 2500, 2500), val(2500, 2500, 2500, 2500))
  ]));
  const found = ktc.matchAll(rows, [
    { id: 'PHI', name: 'Philadelphia Eagles', position: 'DEF', team: 'PHI' },
    { id: '77', name: 'Brandon Aubrey', position: 'K', team: 'DAL' }
  ]);
  assert.deepEqual(Object.keys(found).sort(), ['77', 'PHI']);
});

test('redraft packages are priced harder than dynasty ones: depth is replaceable on the wire', () => {
  assert.ok(ktc.sideValue([4000, 4000], ktc.EXPONENT_REDRAFT) < ktc.sideValue([4000, 4000]));
});

test('pick baseline: early, mid and late values blended along the round; none past the chart', () => {
  const ktc = require('../src/shared/ktc.js');
  const picks = { '2027:1:early': { v: 7000, s: 7000 }, '2027:1:mid': { v: 6000, s: 6000 }, '2027:1:late': { v: 5000, s: 5000 } };
  const at = (slot) => ktc.pickBaseline(picks, { round: 1, slot, teams: 12, superflex: false });
  assert.strictEqual(at(1), 7000);
  assert.strictEqual(at(12), 5000);
  assert.ok(at(6) < 7000 && at(6) > 5000 && at(5) >= at(8));
  assert.strictEqual(ktc.pickBaseline(picks, { round: 6, slot: 1, teams: 12, superflex: false }), 0);
});
