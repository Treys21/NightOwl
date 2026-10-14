const test = require('node:test');
const assert = require('node:assert');

require('../src/lineups/core.js');
require('../src/season/core.js');
const projection = require('../src/season/project.js');

const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const close = (a, b, eps, message) => assert.ok(Math.abs(a - b) <= eps, `${message}: ${a} vs ${b}`);

test('bracket formats match Sleeper: byes to the top seeds, no reseeding', () => {
  const six = projection.bracketFormat(6, 15, 0);
  assert.deepEqual(six.firstRound, [[1, null], [4, 5], [2, null], [3, 6]]);
  assert.deepEqual(six.rounds.map((r) => [r.label, r.weeks]), [['Quarterfinals', [15]], ['Semifinals', [16]], ['Championship', [17]]]);
  assert.deepEqual(projection.bracketFormat(4, 15, 0).firstRound, [[1, 4], [2, 3]]);
  assert.deepEqual(projection.bracketFormat(8, 15, 0).firstRound, [[1, 8], [4, 5], [2, 7], [3, 6]]);
  assert.deepEqual(projection.bracketFormat(4, 15, 1).rounds.map((r) => r.weeks), [[15], [16, 17]]);
  assert.deepEqual(projection.playoffWeeks(projection.bracketFormat(4, 14, 2)), [14, 15, 16, 17]);
  assert.equal(projection.bracketFormat(0, 15), null);
});

test('a team week starts the best projected lineup and skips players who are out', () => {
  const proj = { qb: 20, rb1: 15, rb2: 12, rb3: 14, wr: 10 };
  const pos = { qb: ['QB'], rb1: ['RB'], rb2: ['RB'], rb3: ['RB'], wr: ['WR'] };
  const out = new Set(['rb1']);
  const week = projection.teamWeek(['QB', 'RB', 'WR', 'BN'], Object.keys(proj), (p) => proj[p], (p) => pos[p], (p) => out.has(p));
  assert.deepEqual(week.starters.sort(), ['qb', 'rb3', 'wr']);
  assert.equal(week.mean, 44);
  close(week.variance, 10 * 10 + 7 * 7 + 5 * 5, 1e-9, 'variance = sum of (half projection)^2');
  const avail = projection.availability((p) => ({ a: 'IR', b: 'Out', c: 'Questionable' })[p]);
  assert.equal(avail(0)('a'), true);
  assert.equal(avail(3)('a'), true);
  assert.equal(avail(0)('b'), true);
  assert.equal(avail(1)('b'), false);
  assert.equal(avail(0)('c'), false);
});

const strength = { 1: 150, 2: 110, 3: 110, 4: 70 };
const wk = (pairs) => ({ pairs, teams: Object.fromEntries(Object.entries(strength).map(([id, m]) => [id, { mean: m, variance: 100 }])) });
const TEAMS = [
  { rosterId: 1, wins: 4, losses: 1, ties: 0, pf: 600, max: 650, efficiency: 1 },
  { rosterId: 2, wins: 3, losses: 2, ties: 0, pf: 550, max: 600, efficiency: 1 },
  { rosterId: 3, wins: 3, losses: 2, ties: 0, pf: 540, max: 590, efficiency: 1 },
  { rosterId: 4, wins: 0, losses: 5, ties: 0, pf: 400, max: 450, efficiency: 1 }
];

function run(extra = {}) {
  const format = projection.bracketFormat(2, 8, 0);
  return projection.projectSeason({
    teams: TEAMS,
    weeks: [wk([[1, 4], [2, 3]]), wk([[1, 2], [3, 4]])],
    playoff: { format, teams: { 8: wk([]).teams } },
    sims: 3000,
    seed: 7,
    draft: { method: 'linear' },
    ...extra
  });
}

test('the simulation keeps its books: records, odds and picks add up', () => {
  const p = run();
  for (const id of [1, 2, 3, 4]) {
    const t = p.teams[id];
    close(t.wins + t.losses, 7, 1e-9, `team ${id} plays 7 games`);
    close(sum(t.seedOdds), 1, 1e-9, `team ${id} seed odds`);
    close(sum(t.pickOdds), 1, 1e-9, `team ${id} pick odds`);
  }
  close(sum([1, 2, 3, 4].map((id) => p.teams[id].playoffOdds)), 2, 1e-9, 'two playoff spots');
  close(sum([1, 2, 3, 4].map((id) => p.teams[id].titleOdds)), 1, 1e-9, 'one champion');
  close(sum([1, 2, 3, 4].map((id) => p.teams[id].finalOdds)), 2, 1e-9, 'two finalists');
  assert.ok(p.teams[1].wins > 5.9, `team 1 wins ${p.teams[1].wins}`);
  assert.ok(p.teams[1].playoffOdds > 0.99);
  assert.ok(p.teams[4].playoffOdds < 0.01);
  assert.ok(p.teams[1].titleOdds > 0.85);
  assert.deepEqual(p.order, [1, 3, 2, 4]);
  assert.ok(p.teams[3].wins > p.teams[2].wins);
  assert.ok(p.teams[4].pickOdds[0] > 0.99);
  assert.deepEqual(run().teams, p.teams);
});

test('max points add the full lineup; points for are scaled by efficiency', () => {
  const p = run({ teams: TEAMS.map((t) => (t.rosterId === 2 ? { ...t, efficiency: 0.8 } : t)) });
  close(p.teams[2].max - 600, 220, 6, 'max points added');
  close(p.teams[2].pf - 550, 176, 6, 'points for added');
});

test('the median game adds a game a week', () => {
  const p = run({ medianGame: true });
  close(p.teams[1].wins + p.teams[1].losses, 9, 1e-9, 'two median games');
  assert.ok(p.teams[1].wins > 7.9);
});

test('the chalk bracket advances favorites with win chances', () => {
  const format = projection.bracketFormat(6, 15, 0);
  const means = { 1: 140, 2: 130, 3: 120, 4: 110, 5: 100, 6: 90 };
  const weekly = {};
  for (const w of [15, 16, 17]) weekly[w] = Object.fromEntries(Object.entries(means).map(([id, m]) => [id, { mean: m, variance: 225 }]));
  const eff = new Map(Object.keys(means).map((id) => [Number(id), 1]));
  const b = projection.chalkBracket(format, [1, 2, 3, 4, 5, 6], weekly, eff);
  const [quarters, semis, final] = b.rounds;
  assert.deepEqual(quarters.matches.map((m) => [m.top && m.top.seed, m.bottom && m.bottom.seed]), [[1, null], [4, 5], [2, null], [3, 6]]);
  assert.equal(quarters.matches[0].pTop, 1);
  close(quarters.matches[1].pTop, 0.68, 0.01, '4 over 5 by 10 with sd 21.2');
  assert.deepEqual(semis.matches.map((m) => [m.top.seed, m.bottom.seed]), [[1, 4], [2, 3]]);
  assert.deepEqual([final.matches[0].top.seed, final.matches[0].bottom.seed], [1, 2]);
  assert.deepEqual(b.champion, { seed: 1, rosterId: 1 });
  assert.equal(final.matches[0].top.points, 140);
});

test('the projected draft order uses projected wins and max points', () => {
  const p = run();
  const picks = projection.projectedDraft(p, { method: 'linear' });
  assert.equal(picks[0].rosterId, 4);
  assert.equal(picks[picks.length - 1].rosterId, 1);
  assert.ok(picks[0].odds[0] > 0.99);
});
