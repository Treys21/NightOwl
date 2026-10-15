const test = require('node:test');
const assert = require('node:assert');

require('../src/shared/numbers.js');
require('../src/lineups/core.js');
require('../src/season/core.js');
const projection = require('../src/season/project.js');

const sum = (values) => values.reduce((total, value) => total + value, 0);
const close = (actual, expected, tolerance, message) => assert.ok(Math.abs(actual - expected) <= tolerance, `${message}: ${actual} vs ${expected}`);

test('bracket formats match Sleeper: byes to the top seeds, no reseeding', () => {
  const six = projection.bracketFormat(6, 15, 0);
  assert.deepEqual(six.firstRound, [[1, null], [4, 5], [2, null], [3, 6]]);
  assert.deepEqual(six.rounds.map((round) => [round.label, round.weeks]), [['Quarterfinals', [15]], ['Semifinals', [16]], ['Championship', [17]]]);
  assert.deepEqual(projection.bracketFormat(4, 15, 0).firstRound, [[1, 4], [2, 3]]);
  assert.deepEqual(projection.bracketFormat(8, 15, 0).firstRound, [[1, 8], [4, 5], [2, 7], [3, 6]]);
  assert.deepEqual(projection.bracketFormat(4, 15, 1).rounds.map((round) => round.weeks), [[15], [16, 17]]);
  assert.deepEqual(projection.playoffWeeks(projection.bracketFormat(4, 14, 2)), [14, 15, 16, 17]);
  assert.equal(projection.bracketFormat(0, 15), null);
});

test('a team week starts the best projected lineup and skips players who are out', () => {
  const proj = { qb: 20, rb1: 15, rb2: 12, rb3: 14, wr: 10 };
  const positions = { qb: ['QB'], rb1: ['RB'], rb2: ['RB'], rb3: ['RB'], wr: ['WR'] };
  const out = new Set(['rb1']);
  const week = projection.teamWeek(['QB', 'RB', 'WR', 'BN'], Object.keys(proj), (playerId) => proj[playerId], (playerId) => positions[playerId], (playerId) => out.has(playerId));
  assert.deepEqual(week.starters.sort(), ['qb', 'rb3', 'wr']);
  assert.equal(week.mean, 44);
  close(week.variance, 10 * 10 + 7 * 7 + 5 * 5, 1e-9, 'variance = sum of (half projection)^2');
  const avail = projection.availability((playerId) => ({ a: 'IR', b: 'Out', c: 'Questionable' })[playerId]);
  assert.equal(avail(0)('a'), true);
  assert.equal(avail(3)('a'), true);
  assert.equal(avail(0)('b'), true);
  assert.equal(avail(1)('b'), false);
  assert.equal(avail(0)('c'), false);
});

const strength = { 1: 150, 2: 110, 3: 110, 4: 70 };
const weekOf = (pairs) => ({ pairs, teams: Object.fromEntries(Object.entries(strength).map(([rosterId, mean]) => [rosterId, { mean: mean, variance: 100 }])) });
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
    weeks: [weekOf([[1, 4], [2, 3]]), weekOf([[1, 2], [3, 4]])],
    playoff: { format, teams: { 8: weekOf([]).teams } },
    sims: 3000,
    seed: 7,
    draft: { method: 'linear' },
    ...extra
  });
}

test('the simulation keeps its books: records, odds and picks add up', () => {
  const projected = run();
  for (const rosterId of [1, 2, 3, 4]) {
    const team = projected.teams[rosterId];
    close(team.wins + team.losses, 7, 1e-9, `team ${rosterId} plays 7 games`);
    close(sum(team.seedOdds), 1, 1e-9, `team ${rosterId} seed odds`);
    close(sum(team.pickOdds), 1, 1e-9, `team ${rosterId} pick odds`);
  }
  close(sum([1, 2, 3, 4].map((rosterId) => projected.teams[rosterId].playoffOdds)), 2, 1e-9, 'two playoff spots');
  close(sum([1, 2, 3, 4].map((rosterId) => projected.teams[rosterId].titleOdds)), 1, 1e-9, 'one champion');
  close(sum([1, 2, 3, 4].map((rosterId) => projected.teams[rosterId].finalOdds)), 2, 1e-9, 'two finalists');
  assert.ok(projected.teams[1].wins > 5.9, `team 1 wins ${projected.teams[1].wins}`);
  assert.ok(projected.teams[1].playoffOdds > 0.99);
  assert.ok(projected.teams[4].playoffOdds < 0.01);
  assert.ok(projected.teams[1].titleOdds > 0.85);
  assert.deepEqual(projected.order, [1, 3, 2, 4]);
  assert.ok(projected.teams[3].wins > projected.teams[2].wins);
  assert.ok(projected.teams[4].pickOdds[0] > 0.99);
  assert.deepEqual(run().teams, projected.teams);
});

test('max points add the full lineup; points for are scaled by efficiency', () => {
  const projected = run({ teams: TEAMS.map((team) => (team.rosterId === 2 ? { ...team, efficiency: 0.8 } : team)) });
  close(projected.teams[2].max - 600, 220, 6, 'max points added');
  close(projected.teams[2].pf - 550, 176, 6, 'points for added');
});

test('the median game adds a game a week', () => {
  const projected = run({ medianGame: true });
  close(projected.teams[1].wins + projected.teams[1].losses, 9, 1e-9, 'two median games');
  assert.ok(projected.teams[1].wins > 7.9);
});

test('the chalk bracket advances favorites with win chances', () => {
  const format = projection.bracketFormat(6, 15, 0);
  const means = { 1: 140, 2: 130, 3: 120, 4: 110, 5: 100, 6: 90 };
  const weekly = {};
  for (const week of [15, 16, 17]) weekly[week] = Object.fromEntries(Object.entries(means).map(([rosterId, mean]) => [rosterId, { mean: mean, variance: 225 }]));
  const eff = new Map(Object.keys(means).map((rosterId) => [Number(rosterId), 1]));
  const bracket = projection.chalkBracket(format, [1, 2, 3, 4, 5, 6], weekly, eff);
  const [quarters, semis, final] = bracket.rounds;
  assert.deepEqual(quarters.matches.map((match) => [match.top && match.top.seed, match.bottom && match.bottom.seed]), [[1, null], [4, 5], [2, null], [3, 6]]);
  assert.equal(quarters.matches[0].pTop, 1);
  close(quarters.matches[1].pTop, 0.68, 0.01, '4 over 5 by 10 with sd 21.2');
  assert.deepEqual(semis.matches.map((match) => [match.top.seed, match.bottom.seed]), [[1, 4], [2, 3]]);
  assert.deepEqual([final.matches[0].top.seed, final.matches[0].bottom.seed], [1, 2]);
  assert.deepEqual(bracket.champion, { seed: 1, rosterId: 1 });
  assert.equal(final.matches[0].top.points, 140);
});

test('the projected draft order uses projected wins and max points', () => {
  const projected = run();
  const picks = projection.projectedDraft(projected, { method: 'linear' });
  assert.equal(picks[0].rosterId, 4);
  assert.equal(picks[picks.length - 1].rosterId, 1);
  assert.ok(picks[0].odds[0] > 0.99);
});

test('first-round exits and the third-place game are counted: four teams in, two lose in the semifinals, one wins third', () => {
  const fourTeams = [1, 2, 3, 4].map((rosterId) => ({ rosterId, wins: 5 - rosterId, losses: rosterId, ties: 0, pf: 500 - rosterId * 10, max: 550, efficiency: 1 }));
  const format = projection.bracketFormat(4, 8, 0);
  const noGames = weekOf([]).teams;
  const projected = projection.projectSeason({
    teams: fourTeams,
    weeks: [weekOf([[1, 2], [3, 4]])],
    playoff: { format, teams: { 8: noGames, 9: noGames } },
    sims: 2000,
    seed: 11
  });
  const rosterIds = [1, 2, 3, 4];
  close(sum(rosterIds.map((rosterId) => projected.teams[rosterId].firstRoundExitOdds)), 2, 1e-9, 'two teams lose their first game');
  close(sum(rosterIds.map((rosterId) => projected.teams[rosterId].thirdPlaceOdds)), 1, 1e-9, 'one team wins third place');
});
