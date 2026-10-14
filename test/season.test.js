const test = require('node:test');
const assert = require('node:assert');

require('../src/lineups/core.js');
const season = require('../src/season/core.js');
const lineups = globalThis.NightOwl.lineups;

test('all-play counts every team every week; ties are half a win', () => {
  const ap = season.allPlay([{ 1: 100, 2: 90, 3: 80, 4: 70 }, { 1: 60, 2: 90, 3: 90, 4: 50 }]);
  assert.deepEqual(ap[1], { w: 4, l: 2, t: 0, expected: 1.33 });
  assert.deepEqual(ap[2], { w: 4, l: 1, t: 1, expected: 1.5 });
  assert.deepEqual(ap[4], { w: 0, l: 6, t: 0, expected: 0 });
});

test('median game: the top half wins it, so it adds no luck', () => {
  const ap = season.allPlay([{ 1: 100, 2: 90, 3: 80, 4: 70 }, { 1: 100, 2: 60, 3: 90, 4: 50 }], { medianGame: true });
  assert.equal(ap[1].expected, 2 + 2);
  assert.equal(ap[2].expected, Math.round((2 / 3 + 1 + 1 / 3 + 0) * 100) / 100);
  assert.equal(ap[4].expected, 0);
});

test('standings rank by wins then points, with luck and efficiency', () => {
  const rosters = [
    { roster_id: 1, owner_id: 'a', settings: { wins: 1, losses: 1, fpts: 160, ppts: 200 } },
    { roster_id: 2, owner_id: 'b', settings: { wins: 2, losses: 0, fpts: 180, ppts: 190 } },
    { roster_id: 3, owner_id: 'c', settings: { wins: 1, losses: 1, fpts: 170, fpts_decimal: 50 } },
    { roster_id: 4, owner_id: 'd', settings: { wins: 0, losses: 2, fpts: 120 } }
  ];
  const rows = season.standings(rosters, [{ 1: 100, 2: 90, 3: 80, 4: 70 }, { 1: 60, 2: 90, 3: 90, 4: 50 }]);
  assert.deepEqual(rows.map((r) => r.rosterId), [2, 3, 1, 4]);
  const two = rows[0];
  assert.equal(two.luck, 0.5);
  assert.equal(Math.round(two.efficiency * 1000) / 1000, 0.947);
  assert.equal(rows[1].pf, 170.5);
  assert.equal(rows[1].max, null);
  assert.equal(rows[2].luck, -0.3);
});

test('best lineup on actual points respects slot eligibility and flex', () => {
  const pos = { qb: ['QB'], rb1: ['RB'], rb2: ['RB'], wr1: ['WR'], te: ['TE'] };
  const pts = { qb: 20, rb1: 5, rb2: 18, wr1: 12, te: 9 };
  const best = season.optimal(['QB', 'RB', 'WR', 'FLEX', 'BN'], Object.keys(pos), (p) => pts[p], (p) => pos[p]);
  assert.equal(best.points, 20 + 18 + 12 + 9);
  assert.deepEqual(best.starters, ['qb', 'rb2', 'wr1', 'te']);
  const miss = season.biggestMiss(['QB', 'RB', 'WR', 'FLEX'], ['qb', 'rb1', 'wr1', 'te'], ['rb2'], (p) => pts[p], (p) => pos[p]);
  assert.deepEqual(miss, { in: 'rb2', out: 'rb1', slot: 'RB', gain: 13 });
});

test('win probability: certain when games are over, even when tied and unplayed', () => {
  const done = (points) => season.outlook([{ points, proj: 15, remaining: 0 }]);
  assert.equal(season.winProbability(done(100), done(90)), 1);
  assert.equal(season.winProbability(done(90), done(100)), 0);
  const fresh = season.outlook([{ points: 0, proj: 15, remaining: 1 }]);
  assert.ok(Math.abs(season.winProbability(fresh, fresh) - 0.5) < 1e-6);
  const ahead = season.outlook([{ points: 20, proj: 15, remaining: 0.5 }]);
  const behind = season.outlook([{ points: 5, proj: 15, remaining: 0.5 }]);
  const p = season.winProbability(ahead, behind);
  assert.ok(p > 0.9 && p < 1, `ahead by 15 at half: ${p}`);
  assert.ok(Math.abs(season.phi(1.96) - 0.975) < 1e-4);
});

test('remaining share of a game from ESPN status', () => {
  assert.equal(lineups.remainingShare({ type: { state: 'pre' } }), 1);
  assert.equal(lineups.remainingShare({ type: { state: 'post' } }), 0);
  assert.equal(lineups.remainingShare({ type: { state: 'in' }, period: 3, clock: 450 }), (900 + 450) / 3600);
  assert.equal(lineups.remainingShare({ type: { state: 'in' }, period: 5, clock: 300 }), 0.02);
});

test('team strength pulls a short track record toward the league average', () => {
  const weeks = [{ 1: 150, 2: 100, 3: 100, 4: 50 }];
  const strong = season.teamStrength(weeks, 1);
  assert.ok(strong.mean > 100 && strong.mean < 150, String(strong.mean));
  assert.ok(strong.sd > 0);
});

test('playoff odds: clinched, eliminated, and a coin flip', () => {
  const team = (rosterId, wins, pf = 500) => ({ rosterId, wins, ties: 0, pf, mean: 100, sd: 15 });
  const teams = [team(1, 9), team(2, 6), team(3, 6), team(4, 3)];
  const odds = season.playoffOdds({ teams, schedule: [[[1, 4], [2, 3]]], playoffTeams: 2, sims: 4000, seed: 7 });
  assert.equal(odds[1], 1);
  assert.equal(odds[4], 0);
  assert.ok(Math.abs(odds[2] - 0.5) < 0.05, `even teams ~50%: ${odds[2]}`);
  assert.ok(Math.abs(odds[2] + odds[3] - 1) < 1e-9);
  assert.deepEqual(season.playoffOdds({ teams, schedule: [[[1, 4], [2, 3]]], playoffTeams: 2, sims: 4000, seed: 7 }), odds);
});

test('playoff odds count the median game', () => {
  const teams = [1, 2, 3, 4].map((id) => ({ rosterId: id, wins: id === 4 ? 2 : 0, ties: 0, pf: 0, mean: id === 4 ? 200 : 80, sd: 1 }));
  const odds = season.playoffOdds({ teams, schedule: [[[1, 2], [3, 4]]], playoffTeams: 1, medianGame: true, sims: 200 });
  assert.equal(odds[4], 1);
});

const LEAGUE = [
  ['Drakeo', 23, 2627.20], ['Horton', 18, 2624.28], ['Njigbas', 17, 2505.78], ['Griddy', 16, 2424.04],
  ['Troy', 16, 2436.76], ['Deebo', 16, 2440.68], ['Buttqin', 14, 2284.06], ['FutureHOF', 12, 2316.72],
  ['Herb', 8, 2142.74], ['Jeanty', 0, 1616.12]
].map(([name, wins, max], i) => ({ rosterId: i + 1, name, wins, max }));
const order = (picks) => picks.map((t) => t.name);
const score = (picks, name) => Math.round(picks.find((t) => t.name === name).score * 1e4) / 1e4;

test('draft order, linear: 30% wins + 70% max points, worst first', () => {
  const picks = season.draftOrder(LEAGUE, { method: 'linear' });
  assert.deepEqual(order(picks), ['Jeanty', 'Herb', 'FutureHOF', 'Buttqin', 'Griddy', 'Troy', 'Deebo', 'Njigbas', 'Horton', 'Drakeo']);
  assert.equal(score(picks, 'Jeanty'), 1);
  assert.equal(score(picks, 'Herb'), 0.5311);
  assert.equal(score(picks, 'FutureHOF'), 0.3584);
  assert.equal(score(picks, 'Buttqin'), 0.355);
  assert.equal(score(picks, 'Horton'), 0.0672);
  assert.equal(score(picks, 'Drakeo'), 0);
  assert.deepEqual(picks.map((t) => t.pick), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('draft order, inverse: the bottom pulls away, and 3 and 4 swap', () => {
  const picks = season.draftOrder(LEAGUE, { method: 'inverse' });
  assert.deepEqual(order(picks), ['Jeanty', 'Herb', 'Buttqin', 'FutureHOF', 'Griddy', 'Troy', 'Deebo', 'Njigbas', 'Horton', 'Drakeo']);
  assert.equal(score(picks, 'Herb'), 0.2747);
  assert.equal(score(picks, 'Buttqin'), 0.1759);
  assert.equal(score(picks, 'FutureHOF'), 0.161);
  assert.equal(score(picks, 'Griddy'), 0.0991);
  assert.equal(score(picks, 'Horton'), 0.0047);
});

test('draft order before any games: no NaN, falls back to roster order', () => {
  const blank = [1, 2, 3].map((rosterId) => ({ rosterId, wins: 0, max: 0 }));
  for (const method of ['linear', 'inverse']) {
    const picks = season.draftOrder(blank, { method });
    assert.deepEqual(picks.map((t) => t.rosterId), [1, 2, 3]);
    assert.ok(picks.every((t) => t.score === 0));
  }
  const partial = season.draftOrder([{ rosterId: 1, wins: 1, max: 200 }, { rosterId: 2, wins: 1, max: 0 }], { method: 'inverse' });
  assert.equal(partial[0].rosterId, 2);
});

test('pick owners follow trades for that season only', () => {
  const owner = season.pickOwners([
    { season: '2027', round: 1, roster_id: 3, owner_id: 7 },
    { season: '2028', round: 1, roster_id: 4, owner_id: 7 }
  ], 2027);
  assert.equal(owner(1, 3), 7);
  assert.equal(owner(2, 3), 3);
  assert.equal(owner(1, 4), 4);
});

test('as it stands: leaders win, the top half wins the median, totals grow', () => {
  const rosters = [1, 2, 3, 4].map((id) => ({ roster_id: id, settings: { wins: 2, losses: 2, fpts: 400, fpts_decimal: 50, ppts: 450 } }));
  const matchups = [
    { roster_id: 1, matchup_id: 1, points: 90 }, { roster_id: 2, matchup_id: 1, points: 60 },
    { roster_id: 3, matchup_id: 2, points: 70 }, { roster_id: 4, matchup_id: 2, points: 70 }
  ];
  const next = season.asItStands(rosters, matchups, (id) => (id === 1 ? 100 : null), { medianGame: true });
  const s = Object.fromEntries(next.map((r) => [r.roster_id, r.settings]));
  assert.deepEqual([s[1].wins, s[1].losses, s[1].ties], [4, 2, 0]);
  assert.deepEqual([s[2].wins, s[2].losses, s[2].ties], [2, 4, 0]);
  assert.equal(s[3].ties + s[4].ties, 2);
  assert.equal(s[3].wins + s[4].wins, 5);
  assert.equal(s[1].fpts, 490.5);
  assert.equal(s[1].fpts_against, 60);
  assert.equal(s[1].ppts, 550);
  assert.equal(s[2].ppts, 450);
  assert.equal(rosters[0].settings.wins, 2);
  assert.equal(season.weeksRecorded(next, { medianGame: true }), 3);
  assert.equal(season.weeksRecorded(rosters), 4);
});

test('power ratings: the best, steadiest, hottest team rates highest', () => {
  const rows = [
    { rosterId: 1, wins: 3, losses: 0, ties: 0 },
    { rosterId: 2, wins: 1, losses: 2, ties: 0 },
    { rosterId: 3, wins: 2, losses: 1, ties: 0 }
  ];
  const weeks = [{ 1: 120, 2: 80, 3: 140 }, { 1: 121, 2: 150, 3: 60 }, { 1: 122, 2: 70, 3: 130 }];
  const r = season.powerRatings(rows, weeks);
  assert.ok(r[1] > r[3] && r[1] > r[2], JSON.stringify(r));
  assert.ok(Object.values(r).every((v) => v >= 0 && v <= 100));
});
