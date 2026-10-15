const test = require('node:test');
const assert = require('node:assert');

require('../src/shared/numbers.js');
const core = require('../src/lineups/core.js');

const event = (date, away, home, state = 'pre') => ({
  date,
  status: { type: { state } },
  competitions: [{ competitors: [
    { homeAway: 'away', team: { abbreviation: away } },
    { homeAway: 'home', team: { abbreviation: home } }
  ] }]
});

const espn = [
  event('2026-10-11T17:00Z', 'NYG', 'WSH'),
  event('2026-10-11T13:30Z', 'PHI', 'JAX'),
  event('2026-10-09T00:15Z', 'TB', 'DAL', 'post'),
  event('2026-10-11T17:00Z', 'CHI', 'GB')
];

test('games become kickoff windows in order, with ESPN codes mapped to Sleeper', () => {
  const wins = core.windows(core.parseGames(espn));
  assert.deepEqual(wins.map((lockWindow) => lockWindow.games.length), [1, 1, 2]);
  assert.ok(wins[0].started);
  assert.deepEqual([...wins[1].teams].sort(), ['JAX', 'PHI']);
  assert.ok(wins[2].teams.has('WAS'), 'WSH -> WAS');
});

const SLOTS = ['QB', 'RB', 'WR', 'FLEX', 'K'];
const PLAYERS = {
  qb: { name: 'Hurts', pos: 'QB', team: 'PHI' },
  rb: { name: 'Etienne', pos: 'RB', team: 'JAX' },
  wr: { name: 'Thomas', pos: 'WR', team: 'JAX' },
  flex: { name: 'Slowpoke', pos: 'TE', team: 'GB' },
  k: { name: 'Kicker', pos: 'K', team: 'BYE' },
  stud: { name: 'Benchstud', pos: 'WR', team: 'PHI' },
  hurt: { name: 'Hurt', pos: 'RB', team: 'GB', injury: 'Out' },
  irguy: { name: 'Stash', pos: 'RB', team: 'GB' }
};
const PROJ = { qb: 22, rb: 14, wr: 12, flex: 4, k: 8, stud: 15, hurt: 18, irguy: 9 };
const KICKOFF = { PHI: 2000, JAX: 2000, GB: 3000 };

const info = (playerId) => Object.assign({ positions: [PLAYERS[playerId].pos] }, PLAYERS[playerId]);
const projected = (playerId) => PROJ[playerId] || 0;
const kickoffOf = (team) => (team in KICKOFF ? KICKOFF[team] : null);
const roster = {
  starters: ['qb', 'rb', 'wr', 'flex', 'k'],
  players: ['qb', 'rb', 'wr', 'flex', 'k', 'stud', 'hurt', 'irguy'],
  reserve: ['irguy']
};
const run = (now = 1000, lineupRoster = roster) => core.lineup({ slots: SLOTS, scoring: {} }, lineupRoster, info, projected, kickoffOf, now);
const byPid = (out) => new Map(out.rows.map((row) => [row.pid, row]));

test('every rostered player is listed as starting, bench or IR with their slot', () => {
  const rows = byPid(run());
  assert.equal(rows.get('qb').status, 'start');
  assert.equal(rows.get('qb').slot, 'QB');
  assert.equal(rows.get('flex').slot, 'FLEX');
  assert.equal(rows.get('stud').status, 'bench');
  assert.equal(rows.get('irguy').status, 'ir');
});

test('the best lineup is found and turned into moves', () => {
  const out = run();
  assert.equal(out.best.gain, 11);
  assert.deepEqual(out.best.moves.map((move) => [move.type, move.name, move.slot]), [
    ['start', 'Benchstud', 'FLEX'],
    ['bench', 'Slowpoke', undefined]
  ]);
  const rows = byPid(out);
  assert.match(rows.get('stud').notes[0].text, /Start him at FLEX: \+11 for your lineup/);
  assert.match(rows.get('flex').notes[0].text, /Bench him/);
  assert.ok(rows.get('stud').inBest);
  assert.ok(!rows.get('flex').inBest);
});

test('injured bench players are never suggested or offered', () => {
  const rows = byPid(run());
  assert.equal(rows.get('hurt').notes.length, 0);
  assert.equal(rows.get('hurt').options.length, 0);
  assert.ok(!rows.get('rb').options.some((option) => option.name === 'Hurt'));
});

test('starters on bye are flagged', () => {
  const rows = byPid(run());
  assert.ok(rows.get('k').bye);
  assert.match(rows.get('k').notes[0].text, /On bye/);
});

test('an Out starter counts as zero, so a healthy bench option is offered', () => {
  const lineupRoster = Object.assign({}, roster, {
    starters: ['qb', 'hurt', 'wr', 'flex', 'k'],
    players: roster.players.concat(['rb'])
  });
  const rows = byPid(run(1000, lineupRoster));
  assert.match(rows.get('hurt').notes[0].text, /Out, likely scores zero/);
  assert.match(rows.get('rb').notes[0].text, /Start him at RB/);
});

test('players whose game has kicked off are locked: no swaps into or out of them', () => {
  const rows = byPid(run(2500));
  assert.ok(rows.get('stud').locked);
  assert.equal(rows.get('stud').notes.length, 0);
});

test('empty starting slots are reported', () => {
  const lineupRoster = Object.assign({}, roster, { starters: ['qb', 'rb', 'wr', '0', 'k'] });
  const out = run(1000, lineupRoster);
  assert.deepEqual(out.empty, ['FLEX']);
  assert.match(byPid(out).get('stud').notes[0].text, /Start him at FLEX/);
  assert.ok(byPid(out).get('stud').options.some((option) => option.name === 'Empty FLEX'));
});

test('slot eligibility follows Sleeper flex rules', () => {
  assert.ok(core.canPlay('SUPER_FLEX', ['QB']));
  assert.ok(!core.canPlay('FLEX', ['QB']));
  assert.ok(core.canPlay('REC_FLEX', ['TE']));
  assert.ok(!core.canPlay('REC_FLEX', ['RB']));
});

test('a bench player lists every starter he could push out, best first', () => {
  const options = byPid(run()).get('stud').options;
  assert.deepEqual(options.map((option) => [option.name, option.slot, option.gain]), [['Slowpoke', 'FLEX', 11], ['Thomas', 'WR', 3]]);
});

test('starters list every bench player who could take their spot, skipping byes, injuries, wrong positions', () => {
  const rows = byPid(run());
  assert.deepEqual(rows.get('wr').options.map((option) => option.name), ['Benchstud']);
  assert.equal(rows.get('wr').options[0].gain, 3);
  assert.deepEqual(rows.get('rb').options, []);
  assert.deepEqual(rows.get('k').options, []);
});

test('flex chains: a bench RB can replace the WR by sliding the FLEX RB... and a TE via the FLEX', () => {
  const slots = ['RB', 'WR', 'FLEX'];
  const PROJECTIONS = {
    rb1: { name: 'RB1', pos: 'RB', team: 'GB' },
    wr1: { name: 'WR1', pos: 'WR', team: 'GB' },
    flexwr: { name: 'FlexWR', pos: 'WR', team: 'GB' },
    rb2: { name: 'RB2', pos: 'RB', team: 'GB' }
  };
  const projectionsByPlayer = { rb1: 15, wr1: 6, flexwr: 9, rb2: 12 };
  const out = core.lineup({ slots, scoring: {} }, { starters: ['rb1', 'wr1', 'flexwr'], players: Object.keys(PROJECTIONS) },
    (playerId) => Object.assign({ positions: [PROJECTIONS[playerId].pos] }, PROJECTIONS[playerId]), (playerId) => projectionsByPlayer[playerId], () => 3000, 1000);
  const rows = new Map(out.rows.map((row) => [row.pid, row]));
  const viaChain = rows.get('rb2').options.find((option) => option.name === 'WR1');
  assert.deepEqual(viaChain, { pid: 'wr1', name: 'WR1', proj: 6, gain: 6, slot: 'FLEX', via: { name: 'FlexWR', slot: 'WR' } });
  assert.equal(out.best.gain, 6);
  assert.deepEqual(out.best.moves.map((move) => [move.type, move.name, move.slot]),
    [['start', 'RB2', 'FLEX'], ['move', 'FlexWR', 'WR'], ['bench', 'WR1', undefined]]);
});

test('the solver leaves a good lineup alone (no churn on ties)', () => {
  const lineupRoster = Object.assign({}, roster, { starters: ['qb', 'rb', 'wr', 'stud', 'k'] });
  const out = run(1000, lineupRoster);
  assert.equal(out.best.moves.length, 0);
  assert.ok(out.best.gain < core.MIN_GAIN);
});

test('locked players never move and are never offered', () => {
  const out = run(2500);
  const rows = byPid(out);
  assert.deepEqual(rows.get('stud').options, []);
  assert.ok(!out.best.moves.some((move) => ['qb', 'rb', 'wr', 'stud'].includes(move.pid)));
});

test('without ESPN, Sleeper schedule dates still make day windows', () => {
  const games = core.gamesFromSchedule([
    { week: 5, date: '2026-10-11', home: 'GB', away: 'CHI', status: 'pre_game' },
    { week: 5, date: '2026-10-08', home: 'DAL', away: 'TB', status: 'complete' },
    { week: 5, date: '2026-10-11', home: 'NE', away: 'LV', status: 'pre_game' },
    { week: 6, date: '2026-10-18', home: 'KC', away: 'DEN', status: 'pre_game' }
  ], 5);
  const wins = core.windows(games);
  assert.equal(wins.length, 2);
  assert.ok(wins[0].started && wins[0].approx);
  assert.deepEqual([...wins[1].teams].sort(), ['CHI', 'GB', 'LV', 'NE']);
});

test('swap gains read the same way from both sides of a swap', () => {
  const rows = byPid(run());
  const fromStarter = rows.get('wr').options.find((option) => option.name === 'Benchstud').gain;
  const fromBench = rows.get('stud').options.find((option) => option.name === 'Thomas').gain;
  assert.equal(fromStarter, 3);
  assert.equal(fromBench, 3);
});

test('swapping out a starter who projects more is negative', () => {
  const lineupRoster = Object.assign({}, roster, { starters: ['qb', 'rb', 'stud', 'flex', 'k'] });
  const rows = byPid(run(1000, lineupRoster));
  assert.equal(rows.get('stud').options.find((option) => option.name === 'Thomas').gain, -3);
});

const leagueOf = (starters, kickoffs = () => 2000) => Object.assign(
  { leagueId: 'L1', name: 'Alpha' },
  core.lineup({ slots: SLOTS, scoring: {} }, Object.assign({}, roster, { starters }), info, projected, kickoffs, 1000)
);
const upcoming = [{ teams: new Set(['PHI', 'JAX']) }, { teams: new Set(['GB']) }];

test('an empty slot is a fix, and names the player the best lineup would start there', () => {
  const [fix] = core.startersToFix(leagueOf(['qb', 'rb', '0', 'flex', 'k']));
  assert.equal(fix.kind, 'empty');
  assert.equal(fix.slot, 'WR');
  assert.equal(fix.replacement, 'Benchstud');
});

test('a starter on bye is a fix with the best bench replacement', () => {
  const byeLeague = leagueOf(['qb', 'rb', 'wr', 'flex', 'k'], (team) => (team === 'GB' ? null : 2000));
  const [fix] = core.startersToFix(byeLeague);
  assert.equal(fix.kind, 'bye');
  assert.equal(fix.playerName, 'Slowpoke');
  assert.equal(fix.problem, 'on bye');
  assert.equal(fix.replacement, 'Benchstud');
});

test('a starter ruled out is a fix with the best healthy bench option', () => {
  const [fix] = core.startersToFix(leagueOf(['qb', 'rb', 'wr', 'hurt', 'k']));
  assert.equal(fix.kind, 'out');
  assert.equal(fix.playerName, 'Hurt');
  assert.equal(fix.problem, 'out');
  assert.equal(fix.replacement, 'Benchstud');
});

test('a starter with no bench option is still a fix, just without a name to start instead', () => {
  const [fix] = core.startersToFix(leagueOf(['qb', 'rb', 'wr', 'flex', 'k'], (team) => (team === 'BYE' ? null : 2000)));
  assert.equal(fix.kind, 'bye');
  assert.equal(fix.playerName, 'Kicker');
  assert.equal(fix.replacement, null);
});

test('players whose game has kicked off are never a fix', () => {
  const lockedLeague = Object.assign({ leagueId: 'L1', name: 'Alpha' }, core.lineup({ slots: SLOTS, scoring: {} }, roster, info, projected, kickoffOf, 5000));
  assert.deepEqual(core.startersToFix(lockedLeague).filter((fix) => fix.kind === 'out'), []);
});

test('the summary says fix, improve or set, and puts each fix in the window it is due before', () => {
  const broken = core.lineupSummary([leagueOf(['qb', 'rb', 'wr', 'hurt', 'k'])], upcoming);
  assert.equal(broken.status, 'fix');
  assert.equal(broken.fixes[0].windowIndex, 1, 'his own game is in the GB window');

  const emptySlot = core.lineupSummary([leagueOf(['qb', 'rb', '0', 'flex', 'k'])], upcoming);
  assert.equal(emptySlot.fixes[0].windowIndex, 0, 'a hole is fixed before the first lock');

  const improvable = core.lineupSummary([leagueOf(['qb', 'rb', 'wr', 'flex', 'k'], () => 2000)], upcoming);
  assert.equal(improvable.status, 'improve');
  assert.equal(improvable.improvements[0].leagueName, 'Alpha');
  assert.ok(improvable.improvements[0].moves.some((move) => move.type === 'start' && move.name === 'Benchstud'), 'it says who to start');
  assert.ok(improvable.totalGain >= core.MIN_GAIN);

  const ready = core.lineupSummary([leagueOf(['qb', 'rb', 'stud', 'wr', 'k'], () => 2000)], upcoming);
  assert.equal(ready.status, 'set');
  assert.deepEqual(ready.fixes, []);
});

test('each player the best lineup moves carries the move and the slot it asks for', () => {
  const rows = byPid(run());
  assert.equal(rows.get('stud').move, 'start');
  assert.equal(rows.get('stud').moveSlot, 'FLEX');
  assert.equal(rows.get('flex').move, 'bench');
  assert.equal(rows.get('flex').moveSlot, null);
  assert.equal(rows.get('qb').move, null);
});

test('a starter is at risk when he is on bye, out, or questionable, and only before his game', () => {
  const rows = byPid(run());
  assert.equal(core.riskOf(rows.get('k')), 'bye');
  assert.equal(core.riskOf(rows.get('qb')), null);
  assert.equal(core.riskOf(rows.get('stud')), null, 'a bench player is not a lineup risk');

  const outStarter = byPid(run(1000, Object.assign({}, roster, { starters: ['qb', 'hurt', 'wr', 'flex', 'k'] })));
  assert.equal(core.riskOf(outStarter.get('hurt')), 'out');

  const questionable = Object.assign({}, rows.get('qb'), { injury: 'Questionable' });
  assert.equal(core.riskOf(questionable), 'questionable');
  assert.equal(core.riskOf(Object.assign({}, questionable, { locked: true })), null, 'once he has played there is nothing to fix');
});

test('the verdict for a league is fix, better or set, in that order of importance', () => {
  const fix = core.verdictOf(run());
  assert.equal(fix.state, 'fix', 'the kicker is on bye');
  assert.equal(fix.problems, 1);

  const empty = core.verdictOf(run(1000, Object.assign({}, roster, { starters: ['qb', 'rb', 'wr', '0', 'k'] })));
  assert.equal(empty.state, 'fix');
  assert.ok(empty.problems >= 2, 'the hole and the bye kicker both count');

  const better = core.verdictOf({ rows: [], empty: [], best: { gain: 6.4, moves: [{ type: 'start' }] } });
  assert.deepEqual(better, { state: 'better', problems: 0, gain: 6.4 });

  const set = core.verdictOf({ rows: [], empty: [], best: { gain: 0, moves: [] } });
  assert.deepEqual(set, { state: 'set', problems: 0, gain: 0 });
});
