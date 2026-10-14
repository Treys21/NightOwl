const test = require('node:test');
const assert = require('node:assert');

require('../src/lineups/core.js');
require('../src/season/core.js');
const projection = require('../src/season/project.js');
const path = require('../src/season/path.js');

test('schedule: each remaining opponent, with your chance in the game; a bye is skipped', () => {
  const teamForecast = (mean) => ({ mean, variance: 100 });
  const forecast = { weeks: [
    { week: 7, pairs: [[1, 2], [3, 4]], teams: { 1: teamForecast(120), 2: teamForecast(100), 3: teamForecast(90), 4: teamForecast(90) } },
    { week: 8, pairs: [[3, 4]], teams: { 1: teamForecast(120), 3: teamForecast(90), 4: teamForecast(90) } },
    { week: 9, pairs: [[1, 4], [2, 3]], teams: { 1: teamForecast(100), 2: teamForecast(100), 3: teamForecast(90), 4: teamForecast(130) } }
  ] };
  const schedule = path.schedule(forecast, 1);
  assert.deepEqual(schedule.map((game) => [game.week, game.oppId]), [[7, 2], [9, 4]]);
  assert.ok(schedule[0].p > 0.7 && schedule[1].p < 0.2, `${schedule[0].p} / ${schedule[1].p}`);
});

test('needs: cumulative playoff chance by wins, hiding totals that will not happen', () => {
  const rows = [{ wins: 5, p: 0.05, make: 0 }, { wins: 6, p: 0.25, make: 0.1 }, { wins: 7, p: 0.4, make: 0.7 }, { wins: 8, p: 0.29, make: 1 }, { wins: 9, p: 0.01, make: 1 }];
  const needs = path.needs(rows);
  assert.deepEqual(needs.map((need) => need.atLeast), [5, 6, 7, 8]);
  assert.ok(Math.abs(needs[0].p - 1) < 1e-9);
  const seven = needs.find((need) => need.atLeast === 7);
  assert.ok(Math.abs(seven.make - (0.4 * 0.7 + 0.29 + 0.01) / 0.7) < 1e-9);
  assert.deepEqual(path.needs([]), []);
});

const strength = { 1: 100, 2: 100, 3: 100, 4: 60 };
const weekOf = (pairs) => ({ pairs, teams: Object.fromEntries(Object.entries(strength).map(([rosterId, mean]) => [rosterId, { mean: mean, variance: 150 }])) });
const TEAMS = [1, 2, 3, 4].map((rosterId) => ({ rosterId, wins: 1, losses: 1, ties: 0, pf: 200, max: 220, efficiency: 1 }));
const run = (extra = {}) => projection.projectSeason(Object.assign({
  teams: TEAMS, weeks: [weekOf([[1, 2], [3, 4]]), weekOf([[1, 3], [2, 4]])],
  playoff: { format: projection.bracketFormat(2, 8, 0), teams: { 8: weekOf([]).teams } }, sims: 3000, seed: 11
}, extra));

test('a forced game decides it and moves your odds the way you would expect', () => {
  const win = run({ forced: { weekIndex: 0, winner: 1 } });
  const lose = run({ forced: { weekIndex: 0, winner: 2 } });
  const lev = path.leverage(win, lose, 1);
  assert.ok(lev.win.playoffs > lev.lose.playoffs, `${lev.win.playoffs} vs ${lev.lose.playoffs}`);
  assert.ok(lev.swing > 0.1);
  assert.ok(win.teams[1].winOdds.every((entry) => entry.wins >= 2));
  assert.ok(lose.teams[1].winOdds.every((entry) => entry.wins <= 2 + 1));
});

test('win totals add to one, and the playoff chance rises with wins', () => {
  const projected = run();
  const odds = projected.teams[1].winOdds;
  assert.ok(Math.abs(odds.reduce((total, entry) => total + entry.p, 0) - 1) < 1e-9);
  const needs = path.needs(odds);
  for (let i = 1; i < needs.length; i++) assert.ok(needs[i].make >= needs[i - 1].make - 1e-9);
});

test('route: your games through the projected bracket, until the favorite goes the other way', () => {
  const bracket = {
    rounds: [
      { label: 'Semifinals', weeks: [15], matches: [
        { top: { seed: 1, rosterId: 10 }, bottom: { seed: 4, rosterId: 13 }, pTop: 0.8 },
        { top: { seed: 2, rosterId: 11 }, bottom: { seed: 3, rosterId: 12 }, pTop: 0.4 }
      ] },
      { label: 'Championship', weeks: [16], matches: [{ top: { seed: 1, rosterId: 10 }, bottom: { seed: 3, rosterId: 12 }, pTop: 0.6 }] }
    ]
  };
  const first = path.route(bracket, 10);
  assert.deepEqual(first.map((step) => [step.label, step.opponent.rosterId, step.p]), [['Semifinals', 13, 0.8], ['Championship', 12, 0.6]]);
  const underdog = path.route(bracket, 11);
  assert.equal(underdog.length, 1);
  assert.equal(underdog[0].p, 0.4);
  assert.equal(path.route(bracket, 99), null);
  assert.equal(path.route(null, 10), null);
});
