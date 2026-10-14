const test = require('node:test');
const assert = require('node:assert');

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
  assert.deepEqual(wins.map((w) => w.games.length), [1, 1, 2]);
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

const info = (pid) => Object.assign({ positions: [PLAYERS[pid].pos] }, PLAYERS[pid]);
const projected = (pid) => PROJ[pid] || 0;
const kickoffOf = (t) => (t in KICKOFF ? KICKOFF[t] : null);
const roster = {
  starters: ['qb', 'rb', 'wr', 'flex', 'k'],
  players: ['qb', 'rb', 'wr', 'flex', 'k', 'stud', 'hurt', 'irguy'],
  reserve: ['irguy']
};
const run = (now = 1000, r = roster) => core.lineup({ slots: SLOTS, scoring: {} }, r, info, projected, kickoffOf, now);
const byPid = (out) => new Map(out.rows.map((r) => [r.pid, r]));

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
  assert.deepEqual(out.best.moves.map((m) => [m.type, m.name, m.slot]), [
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
  assert.ok(!rows.get('rb').options.some((o) => o.name === 'Hurt'));
});

test('starters on bye are flagged', () => {
  const rows = byPid(run());
  assert.ok(rows.get('k').bye);
  assert.match(rows.get('k').notes[0].text, /On bye/);
});

test('an Out starter counts as zero, so a healthy bench option is offered', () => {
  const r = Object.assign({}, roster, {
    starters: ['qb', 'hurt', 'wr', 'flex', 'k'],
    players: roster.players.concat(['rb'])
  });
  const rows = byPid(run(1000, r));
  assert.match(rows.get('hurt').notes[0].text, /Out, likely scores zero/);
  assert.match(rows.get('rb').notes[0].text, /Start him at RB/);
});

test('players whose game has kicked off are locked: no swaps into or out of them', () => {
  const rows = byPid(run(2500));
  assert.ok(rows.get('stud').locked);
  assert.equal(rows.get('stud').notes.length, 0);
});

test('empty starting slots are reported', () => {
  const r = Object.assign({}, roster, { starters: ['qb', 'rb', 'wr', '0', 'k'] });
  const out = run(1000, r);
  assert.deepEqual(out.empty, ['FLEX']);
  assert.match(byPid(out).get('stud').notes[0].text, /Start him at FLEX/);
  assert.ok(byPid(out).get('stud').options.some((o) => o.name === 'Empty FLEX'));
});

test('slot eligibility follows Sleeper flex rules', () => {
  assert.ok(core.canPlay('SUPER_FLEX', ['QB']));
  assert.ok(!core.canPlay('FLEX', ['QB']));
  assert.ok(core.canPlay('REC_FLEX', ['TE']));
  assert.ok(!core.canPlay('REC_FLEX', ['RB']));
});

test('a bench player lists every starter he could push out, best first', () => {
  const opts = byPid(run()).get('stud').options;
  assert.deepEqual(opts.map((o) => [o.name, o.slot, o.gain]), [['Slowpoke', 'FLEX', 11], ['Thomas', 'WR', 3]]);
});

test('starters list every bench player who could take their spot, skipping byes, injuries, wrong positions', () => {
  const rows = byPid(run());
  assert.deepEqual(rows.get('wr').options.map((o) => o.name), ['Benchstud']);
  assert.equal(rows.get('wr').options[0].gain, 3);
  assert.deepEqual(rows.get('rb').options, []);
  assert.deepEqual(rows.get('k').options, []);
});

test('flex chains: a bench RB can replace the WR by sliding the FLEX RB... and a TE via the FLEX', () => {
  const slots = ['RB', 'WR', 'FLEX'];
  const P = {
    rb1: { name: 'RB1', pos: 'RB', team: 'GB' },
    wr1: { name: 'WR1', pos: 'WR', team: 'GB' },
    flexwr: { name: 'FlexWR', pos: 'WR', team: 'GB' },
    rb2: { name: 'RB2', pos: 'RB', team: 'GB' }
  };
  const pr = { rb1: 15, wr1: 6, flexwr: 9, rb2: 12 };
  const out = core.lineup({ slots, scoring: {} }, { starters: ['rb1', 'wr1', 'flexwr'], players: Object.keys(P) },
    (pid) => Object.assign({ positions: [P[pid].pos] }, P[pid]), (pid) => pr[pid], () => 3000, 1000);
  const rows = new Map(out.rows.map((r) => [r.pid, r]));
  const viaChain = rows.get('rb2').options.find((o) => o.name === 'WR1');
  assert.deepEqual(viaChain, { pid: 'wr1', name: 'WR1', proj: 6, gain: 6, slot: 'FLEX', via: { name: 'FlexWR', slot: 'WR' } });
  assert.equal(out.best.gain, 6);
  assert.deepEqual(out.best.moves.map((m) => [m.type, m.name, m.slot]),
    [['start', 'RB2', 'FLEX'], ['move', 'FlexWR', 'WR'], ['bench', 'WR1', undefined]]);
});

test('the solver leaves a good lineup alone (no churn on ties)', () => {
  const r = Object.assign({}, roster, { starters: ['qb', 'rb', 'wr', 'stud', 'k'] });
  const out = run(1000, r);
  assert.equal(out.best.moves.length, 0);
  assert.ok(out.best.gain < core.MIN_GAIN);
});

test('locked players never move and are never offered', () => {
  const out = run(2500);
  const rows = byPid(out);
  assert.deepEqual(rows.get('stud').options, []);
  assert.ok(!out.best.moves.some((m) => ['qb', 'rb', 'wr', 'stud'].includes(m.pid)));
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
  const fromStarter = rows.get('wr').options.find((o) => o.name === 'Benchstud').gain;
  const fromBench = rows.get('stud').options.find((o) => o.name === 'Thomas').gain;
  assert.equal(fromStarter, 3);
  assert.equal(fromBench, 3);
});

test('swapping out a starter who projects more is negative', () => {
  const r = Object.assign({}, roster, { starters: ['qb', 'rb', 'stud', 'flex', 'k'] });
  const rows = byPid(run(1000, r));
  assert.equal(rows.get('stud').options.find((o) => o.name === 'Thomas').gain, -3);
});
