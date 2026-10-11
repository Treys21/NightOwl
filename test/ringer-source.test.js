// The rankings parser reads the dataset a Next.js page embeds in its RSC
// payload (self.__next_f.push chunks). The fixture is SYNTHETIC: the same
// structure as The Ringer's page, with invented ranks and values, split across
// several chunks so reassembly is exercised. (A real page capture was used to
// build the parser; it isn't redistributed here.)
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

globalThis.SDR = {};
const ringer = require('../src/lib/ringer-source.js');

const html = fs.readFileSync(path.join(__dirname, 'fixtures', 'rankings-synthetic.html'), 'utf8');

test('reassembles the payload across chunks and extracts every player', () => {
  const players = ringer.extractPlayers(ringer.readPayload(html));
  assert.equal(players.length, 15);
  assert.equal(players[0].name, 'Bijan Robinson');
  assert.ok(players[0].rankings['half-ppr']);
});

test('half-PPR board comes out in rank order', () => {
  const { ok, rankings } = ringer.parseHtml(html, 'half-ppr');
  assert.equal(ok, true);
  assert.deepEqual(
    rankings.slice(0, 5).map((r) => `${r.rank} ${r.name}`),
    ['1 Bijan Robinson', '2 Ja’Marr Chase', '3 Christian McCaffrey', '4 Justin Jefferson', '5 Ashton Jeanty']
  );
});

test('players unranked in a format (9999) are left out', () => {
  const half = ringer.parseHtml(html, 'half-ppr').rankings.map((r) => r.name);
  assert.ok(!half.includes('Dynasty Only Prospect'));
  assert.equal(half.length, 14);
  const superflex = ringer.parseHtml(html, 'superflex').rankings.map((r) => r.name);
  assert.ok(!superflex.includes('Travis Kelce'));
});

test('teams are converted to Sleeper abbreviations', () => {
  const { rankings } = ringer.parseHtml(html, 'half-ppr');
  const byName = new Map(rankings.map((r) => [r.name, r]));
  assert.equal(byName.get('Christian McCaffrey').team, 'SF'); // 49ers
  assert.equal(byName.get('Ashton Jeanty').team, 'LV'); // Raiders
  assert.equal(byName.get('Puka Nacua').team, 'LAR'); // Rams
});

test('positions are upper-cased and carry positional rank and auction value', () => {
  const top = ringer.parseHtml(html, 'half-ppr').rankings[0];
  assert.equal(top.position, 'RB');
  assert.equal(top.positionRank, 1);
  assert.equal(top.value, 62); // "$$62" -> 62
});

test('superflex is a genuinely different board', () => {
  const half = ringer.parseHtml(html, 'half-ppr').rankings;
  const superflex = ringer.parseHtml(html, 'superflex').rankings;
  assert.equal(half[0].name, 'Bijan Robinson');
  assert.equal(superflex[0].position, 'QB'); // quarterbacks jump in superflex
});

test('every scoring format produces a board with unique ascending ranks', () => {
  for (const format of ['half-ppr', 'ppr', 'zero-ppr', 'superflex']) {
    const result = ringer.parseHtml(html, format);
    assert.equal(result.ok, true, `${format} should parse`);
    const ranks = result.rankings.map((r) => r.rank);
    assert.deepEqual(ranks, [...ranks].sort((a, b) => a - b));
    assert.equal(new Set(ranks).size, ranks.length);
  }
});

test('defenses keep a matchable team', () => {
  const defenses = ringer.parseHtml(html, 'half-ppr').rankings.filter((r) => r.position === 'DEF');
  assert.equal(defenses.length, 1);
  assert.equal(defenses[0].team, 'DAL');
});

test('reports cleanly on a page with no payload', () => {
  const result = ringer.parseHtml('<html><body>paywall</body></html>', 'half-ppr');
  assert.equal(result.ok, false);
  assert.equal(result.rankings.length, 0);
  assert.match(result.reason, /find the rankings data/);
});

test('reports cleanly for a format nobody is ranked in', () => {
  const result = ringer.parseHtml(html, 'not-a-format');
  assert.equal(result.ok, false);
  assert.match(result.reason, /No players ranked/);
});
