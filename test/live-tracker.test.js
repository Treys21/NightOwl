// The live feed is only useful if its numbers are Sleeper's numbers. The
// fixture is real week-4 data from two leagues with different scoring
// (stat lines + each league's scoring_settings + Sleeper's matchup totals).
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

globalThis.SLT = {};
const scoring = require('../src/live/scoring.js');
const tracker = require('../src/live/tracker.js');

const fixture = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/live-week4.json'), 'utf8'));
const leagueIds = Object.keys(fixture.leagues);

function leagueCtx(leagueId, rosterId) {
  const lg = fixture.leagues[leagueId];
  return { leagueId, name: lg.name, scoring: lg.scoring, matchup: tracker.pickMatchup(lg.matchups, rosterId) };
}

const info = (pid) => ({ name: pid, pos: '', team: '' });

test('fixture leagues really do score differently', () => {
  const [a, b] = leagueIds.map((id) => fixture.leagues[id].scoring);
  assert.notDeepStrictEqual(a, b);
});

test('live team totals match Sleeper matchup points in every league', () => {
  for (const leagueId of leagueIds) {
    for (const team of fixture.leagues[leagueId].matchups) {
      if (team.matchup_id == null) continue;
      const [row] = tracker.scoreboard([leagueCtx(leagueId, team.roster_id)], fixture.stats);
      assert.ok(Math.abs(row.mine - team.points) < 0.011, `${leagueId} roster ${team.roster_id}: ${row.mine} vs ${team.points}`);
    }
  }
});

test('pickMatchup finds the opponent sharing my matchup_id', () => {
  const m = tracker.pickMatchup([
    { roster_id: 1, matchup_id: 3, starters: ['a', '0'] },
    { roster_id: 2, matchup_id: 4, starters: ['b'] },
    { roster_id: 5, matchup_id: 3, starters: ['c'] }
  ], 1);
  assert.equal(m.opp.rosterId, 5);
  assert.deepEqual(m.mine.starters, ['a']); // empty slot dropped
  assert.deepEqual(m.mine.slots, ['a', '0']); // but kept for slot alignment
});

test('pickMatchup handles a bye (no matchup_id)', () => {
  const m = tracker.pickMatchup([{ roster_id: 1, matchup_id: null, starters: ['a'] }], 1);
  assert.equal(m.opp, null);
});

// Two leagues, one PPR one half-PPR with first-down points. Lamb is my
// starter in A and my opponent's starter in B.
const ppr = { rec: 1, rec_yd: 0.1, rec_td: 6 };
const halfFd = { rec: 0.5, rec_yd: 0.1, rec_td: 6, rec_fd: 0.5 };
const leagues = [
  { leagueId: 'A', name: 'League A', scoring: ppr, matchup: { mine: { starters: ['LAMB'] }, opp: { starters: ['X'] } } },
  { leagueId: 'B', name: 'League B', scoring: halfFd, matchup: { mine: { starters: ['Y'] }, opp: { starters: ['LAMB'] } } }
];

test('a 15-yard catch is scored separately in each league, signed by side', () => {
  const prev = { LAMB: { rec: 3, rec_yd: 40 }, X: {}, Y: {} };
  const cur = { LAMB: { rec: 4, rec_yd: 55, rec_fd: 1 }, X: {}, Y: {} };
  const [ev] = tracker.diffEvents(prev, cur, leagues, info, 1);
  const a = ev.impacts.find((i) => i.leagueId === 'A');
  const b = ev.impacts.find((i) => i.leagueId === 'B');
  assert.equal(a.side, 'me');
  assert.equal(a.pts, 2.5); // 1 + 1.5
  assert.equal(b.side, 'opp');
  assert.equal(b.pts, 2.5); // 0.5 + 1.5 + 0.5 first down
  assert.equal(ev.net, 0);
  assert.match(ev.text, /\+1 rec · \+15 rec yds/);
});

test('players with no stat change produce no event', () => {
  const snap = { LAMB: { rec: 3 }, X: {}, Y: {} };
  assert.equal(tracker.diffEvents(snap, snap, leagues, info, 1).length, 0);
});

test('a player not in the previous snapshot becomes baseline, not one giant event', () => {
  const events = tracker.diffEvents({ X: {}, Y: {} }, { LAMB: { rec: 8, rec_yd: 120 } }, leagues, info, 1);
  assert.equal(events.length, 0);
});

test('first play after kickoff counts ({} means tracked with no stats yet)', () => {
  const events = tracker.diffEvents({ LAMB: {}, X: {}, Y: {} }, { LAMB: { rec: 1, rec_yd: 9 } }, leagues, info, 1);
  assert.equal(events.length, 1);
});

test('stat corrections come through as negative deltas', () => {
  const [ev] = tracker.diffEvents({ LAMB: { rec_td: 1 }, X: {}, Y: {} }, { LAMB: { rec_td: 0 } }, leagues, info, 1);
  assert.equal(ev.impacts.find((i) => i.leagueId === 'A').pts, -6);
  assert.equal(ev.net, 0); // -6 for me in A, -(-6) via opponent in B
});

test('defense points-allowed tiers net out to the real change', () => {
  const def = { pts_allow_14_20: 1, pts_allow_21_27: 0 };
  const lg = [{ leagueId: 'D', name: 'D', scoring: def, matchup: { mine: { starters: ['DAL'] }, opp: null } }];
  const [ev] = tracker.diffEvents(
    { DAL: { pts_allow: 17, pts_allow_14_20: 1 } },
    { DAL: { pts_allow: 24, pts_allow_21_27: 1 } },
    lg, info, 1
  );
  assert.equal(ev.net, -1);
  assert.equal(ev.text, '+7 pts allowed'); // tier keys hidden
});

test('trimSnapshot keeps only watched players, {} for no stats yet', () => {
  const snap = tracker.trimSnapshot({ LAMB: { rec: 1 }, OTHER: { rec: 9 } }, leagues);
  assert.deepEqual(snap, { LAMB: { rec: 1 }, X: {}, Y: {} });
});

test('describe hides unscored noise but keeps yards', () => {
  const text = scoring.describe({ rec: 1, rec_yd: 15, tm_off_snp: 1, rec_tgt: 1 }, [ppr]);
  assert.equal(text, '+1 rec · +15 rec yds');
});

const teams = require('../src/live/teams.js');

test('every NFL team has colors, and jersey numbers stay readable', () => {
  assert.equal(teams.inkOn('#FFB612'), '#101820'); // PIT gold -> dark numbers
  assert.equal(teams.inkOn('#003594'), '#ffffff'); // DAL blue -> white numbers
  assert.equal(teams.colors('DAL').primary, '#003594');
  assert.equal(teams.colors('XXX').primary, '#262e3e'); // unknown team falls back
  assert.equal(teams.logo('TB'), 'https://sleepercdn.com/images/team_logos/nfl/tb.png');
});
