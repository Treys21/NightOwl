const test = require('node:test');
const assert = require('node:assert');

globalThis.NightOwl = {};
require('../src/live/scoring.js');
const review = require('../src/live/week-review.js');

const PPR = { rec: 1, rec_yd: 0.1, rec_td: 6, pass_td: 4, pass_yd: 0.04, rush_td: 6, rush_yd: 0.1, fgm: 3 };
const STANDARD = { rec_yd: 0.1, rec_td: 6, pass_td: 4, pass_yd: 0.04 };

test('a passing touchdown is read as a catch for the receiver and a throw for the passer', () => {
  const play = review.readScoringPlay({ id: '1', text: "Ja'Marr Chase 25 Yd pass from Joe Burrow (Evan McPherson Kick)", quarter: 2, clock: '4:10', team: 'CIN' });
  assert.strictEqual(play.kind, 'pass');
  const [receiver, passer] = play.participants;
  assert.deepStrictEqual([receiver.name, receiver.role, receiver.stats.rec_yd], ["Ja'Marr Chase", 'scorer', 25]);
  assert.deepStrictEqual([passer.name, passer.role, passer.stats.pass_td], ['Joe Burrow', 'passer', 1]);
});

test('rushing touchdowns, field goals and returns are told apart, and Washington maps to Sleeper\'s abbreviation', () => {
  const rush = review.readScoringPlay({ id: '2', text: 'Javonte Williams 1 Yd Rush (Brandon Aubrey Kick)', team: 'WSH' });
  assert.strictEqual(rush.kind, 'rush');
  assert.strictEqual(rush.team, 'WAS');
  const fieldGoal = review.readScoringPlay({ id: '3', text: 'Brandon Aubrey 54 Yd Field Goal', team: 'DAL' });
  assert.strictEqual(fieldGoal.kind, 'fieldGoal');
  assert.strictEqual(fieldGoal.participants[0].stats.fgm_50p, 1);
  const missingBucket = review.readScoringPlay({ id: '4', text: 'Brandon Aubrey 41 Yd Field Goal', team: 'DAL' });
  assert.strictEqual(missingBucket.participants[0].stats.fgm_40_49, 1);
  const other = review.readScoringPlay({ id: '5', text: 'Someone 50 Yd Interception Return (Kick)', team: 'DAL' });
  assert.deepStrictEqual([other.kind, other.participants.length], ['other', 0]);
});

const ids = { chase: 'p-chase', burrow: 'p-burrow', stranger: 'p-stranger' };
const playerIdOf = (name) => ({ "Ja'Marr Chase": ids.chase, 'Joe Burrow': ids.burrow }[name] || null);
const leagueOf = (id, name, scoring, mine, opponent) => ({ id, name, scoring, mine, opponent });

function week() {
  const touchdown = review.readScoringPlay({ id: 'td', text: "Ja'Marr Chase 25 Yd pass from Joe Burrow (Evan McPherson Kick)", quarter: 2, clock: '4:10', team: 'CIN' });
  const leagues = [
    leagueOf('stack', 'Stack League', PPR, { points: 120, starters: [ids.chase, ids.burrow] }, { name: 'Rival A', points: 118, starters: [] }),
    leagueOf('foe', 'Foe League', PPR, { points: 90, starters: [] }, { name: 'Rival B', points: 95, starters: [ids.chase] }),
    leagueOf('foe2', 'Other Foe', STANDARD, { points: 100, starters: [] }, { name: 'Rival C', points: 104, starters: [ids.chase] }),
    leagueOf('quiet', 'Quiet League', PPR, { points: 110, starters: [] }, { name: 'Rival D', points: 80, starters: [] })
  ];
  return review.reviewWeek({ leagues, plays: [touchdown], playerIdOf });
}

test('a play is priced in each league\'s own scoring, for you and against you', () => {
  const { plays } = week();
  assert.strictEqual(plays.length, 1);
  const byLeague = Object.fromEntries(plays[0].entries.map((entry) => [entry.leagueId, entry]));
  assert.ok(byLeague.stack.net > 10, 'both the catch and the throw are yours');
  assert.ok(byLeague.foe.net < 0 && byLeague.foe2.net < 0, 'the opponent had the receiver');
  assert.ok(Math.abs(byLeague.foe.net) > Math.abs(byLeague.foe2.net), 'PPR pays the catch, standard does not');
  assert.ok(!byLeague.quiet, 'a league that never touched the play is left out');
});

test('a play that is bigger than the margin is marked as having decided the matchup', () => {
  const { plays } = week();
  const byLeague = Object.fromEntries(plays[0].entries.map((entry) => [entry.leagueId, entry]));
  assert.strictEqual(byLeague.stack.flipped, true, 'a 2-point win built on a 15-point play');
  assert.strictEqual(byLeague.foe.flipped, true, 'a 5-point loss to a 15-point play');
});

test('the digest names the player who cost you leagues, and the stack that won one', () => {
  const { insights } = week();
  const nameOf = (playerId) => ({ [ids.chase]: "Ja'Marr Chase", [ids.burrow]: 'Joe Burrow' }[playerId]);
  const titles = insights.map((insight) => review.insightTitle(insight, nameOf));
  assert.ok(titles.some((title) => /Chase (helped in 1 league and hurt in 2 leagues|cost you 2 leagues)/.test(title)), titles.join(' | '));
  assert.ok(titles.some((title) => /Joe Burrow to Ja'Marr Chase: 1 touchdown/.test(title)), titles.join(' | '));
  const connection = insights.find((insight) => insight.kind === 'connection');
  assert.ok(connection.leagues.some((league) => league.won && league.decided), 'the connection won the stack league');
});

test('results carry the margin and who won', () => {
  const { results } = week();
  const stack = results.find((result) => result.leagueId === 'stack');
  assert.deepStrictEqual([stack.margin, stack.won], [2, true]);
  const foe = results.find((result) => result.leagueId === 'foe');
  assert.deepStrictEqual([foe.margin, foe.lost], [-5, true]);
});

test('a play nobody in your leagues started is dropped; unmatched names are ignored', () => {
  const stranger = review.readScoringPlay({ id: 'x', text: 'Nobody Known 3 Yd Rush (Kick)', team: 'CIN' });
  const { plays } = review.reviewWeek({ leagues: [leagueOf('a', 'A', PPR, { points: 1, starters: [ids.chase] }, { name: 'B', points: 0, starters: [] })], plays: [stranger], playerIdOf });
  assert.strictEqual(plays.length, 0);
});

test('decidedResult: the play must be larger than the margin and on the right side', () => {
  const won = { won: true, lost: false, margin: 4 };
  const lost = { won: false, lost: true, margin: -4 };
  assert.ok(review.decidedResult(won, 6));
  assert.ok(!review.decidedResult(won, 3));
  assert.ok(!review.decidedResult(won, -9), 'a play for the other side did not win it');
  assert.ok(review.decidedResult(lost, -6));
  assert.ok(!review.decidedResult(lost, -3));
});
