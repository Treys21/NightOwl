// Name matching is the one piece of pure logic worth testing — everything else
// depends on live DOM or the network.
//   node --test test/
const test = require('node:test');
const assert = require('node:assert');

const { normalizeName, normalizePosition, buildIndex, matchPlayer } = require('../src/draft/match-names.js');

test('normalizeName strips punctuation, case, and accents', () => {
  assert.equal(normalizeName('A.J. Brown'), 'aj brown');
  assert.equal(normalizeName("De'Von Achane"), 'devon achane');
  assert.equal(normalizeName('Amon-Ra St. Brown'), 'amonra st brown');
  assert.equal(normalizeName('Álvin Kamara'), 'alvin kamara');
});

test('normalizeName drops generational suffixes', () => {
  assert.equal(normalizeName('Marvin Harrison Jr.'), 'marvin harrison');
  assert.equal(normalizeName('Odell Beckham Jr'), 'odell beckham');
  assert.equal(normalizeName('Michael Pittman Jr.'), 'michael pittman');
  assert.equal(normalizeName('Ken Walker III'), 'ken walker');
});

test('normalizeName keeps two-word names whose last token looks like a suffix', () => {
  // "V" here is the surname, not a generational suffix.
  assert.equal(normalizeName('Chris V'), 'chris v');
});

test('normalizePosition folds D/ST spellings onto DEF', () => {
  assert.equal(normalizePosition('D/ST'), 'DEF');
  assert.equal(normalizePosition('dst'), 'DEF');
  assert.equal(normalizePosition('Defense'), 'DEF');
  assert.equal(normalizePosition('rb'), 'RB');
});

test('matchPlayer resolves a straightforward name', () => {
  const index = buildIndex([
    { id: '1', name: "Ja'Marr Chase", position: 'WR', team: 'CIN' },
    { id: '2', name: 'Bijan Robinson', position: 'RB', team: 'ATL' }
  ]);
  const match = matchPlayer({ name: 'Bijan Robinson', position: 'RB', team: 'ATL' }, index);
  assert.equal(match.id, '2');
});

test('matchPlayer matches across suffix and punctuation differences', () => {
  const index = buildIndex([{ id: '9', name: 'Marvin Harrison Jr.', position: 'WR', team: 'ARI' }]);
  const match = matchPlayer({ name: 'Marvin Harrison', position: 'WR', team: 'ARI' }, index);
  assert.equal(match.id, '9');
});

test('matchPlayer disambiguates duplicate names by position', () => {
  const index = buildIndex([
    { id: 'a', name: 'Michael Carter', position: 'RB', team: 'ARI' },
    { id: 'b', name: 'Michael Carter', position: 'WR', team: 'NYJ' }
  ]);
  assert.equal(matchPlayer({ name: 'Michael Carter', position: 'WR' }, index).id, 'b');
});

test('matchPlayer returns null rather than guessing when ambiguous', () => {
  const index = buildIndex([
    { id: 'a', name: 'Josh Allen', position: 'QB', team: 'BUF' },
    { id: 'b', name: 'Josh Allen', position: 'QB', team: 'JAX' }
  ]);
  assert.equal(matchPlayer({ name: 'Josh Allen', position: 'QB', team: 'SEA' }, index), null);
});

test('matchPlayer falls back to last name + position + team for nicknames', () => {
  // Real case: The Ringer says "Kenneth Gainwell", Sleeper says "Kenny Gainwell".
  const index = buildIndex([{ id: '7567', name: 'Kenny Gainwell', position: 'RB', team: 'TB' }]);
  assert.equal(matchPlayer({ name: 'Kenneth Gainwell', position: 'RB', team: 'TB' }, index).id, '7567');
});

test('the nickname fallback refuses to fire when the team disagrees', () => {
  const index = buildIndex([{ id: '7567', name: 'Kenny Gainwell', position: 'RB', team: 'TB' }]);
  assert.equal(matchPlayer({ name: 'Kenneth Gainwell', position: 'RB', team: 'PHI' }, index), null);
});

test('the nickname fallback refuses to fire when two players fit', () => {
  const index = buildIndex([
    { id: 'a', name: 'Mike Williams', position: 'WR', team: 'NYJ' },
    { id: 'b', name: 'Michael Williams', position: 'WR', team: 'NYJ' }
  ]);
  assert.equal(matchPlayer({ name: 'Mickey Williams', position: 'WR', team: 'NYJ' }, index), null);
});

test('matchPlayer returns null for an unknown player', () => {
  const index = buildIndex([{ id: '1', name: 'Bijan Robinson', position: 'RB', team: 'ATL' }]);
  assert.equal(matchPlayer({ name: 'Nobody At All', position: 'RB' }, index), null);
});

test('defenses match on team rather than person name', () => {
  const index = buildIndex([{ id: 'SF', name: 'San Francisco', position: 'DEF', team: 'SF' }]);
  const match = matchPlayer({ name: '49ers D/ST', position: 'D/ST', team: 'SF' }, index);
  assert.equal(match.id, 'SF');
});
