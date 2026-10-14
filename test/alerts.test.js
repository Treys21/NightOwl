const test = require('node:test');
const assert = require('node:assert');

const alerts = require('../src/alerts/core.js');

test('parses ESPN injuries by athlete id, from the id field or the player link', () => {
  const feed = { injuries: [{ injuries: [
    { status: 'Out', shortComment: 'Ruled out Friday.', athlete: { id: '111' } },
    { status: 'Injured Reserve', athlete: { links: [{ href: 'https://www.espn.com/nfl/player/_/id/222/someone' }] } },
    { status: 'Active', athlete: {} }
  ] }] };
  const map = alerts.parseInjuries(feed);
  assert.deepEqual(map.get('111'), { status: 'Out', note: 'Ruled out Friday.' });
  assert.equal(map.get('222').status, 'Injured Reserve');
  assert.equal(map.size, 2);
});

const now = Date.parse('2026-10-11T12:00:00-04:00');
const kick = { DAL: now + 3600000, PHI: now - 600000, KC: null };
const base = {
  week: 5,
  now,
  teamOf: (pid) => ({ lamb: 'DAL', hurts: 'PHI', kelce: 'KC', dak: 'DAL' })[pid],
  kickoffOf: (team) => kick[team],
  statusOf: (pid) => ({ lamb: { status: 'Out', note: 'Hamstring.' }, hurts: { status: 'Out' }, dak: { status: 'Questionable' } })[pid] || null
};

test('alerts for out and bye starters before lock, one per player across leagues', () => {
  const found = alerts.findAlerts({ ...base, leagues: [
    { leagueId: 'a', name: 'Office', starters: ['lamb', 'hurts', 'kelce', 'dak'] },
    { leagueId: 'b', name: 'Dynasty', starters: ['lamb', '0'] }
  ] });
  assert.deepEqual(found.map((f) => [f.pid, f.status, f.leagues.map((l) => l.name)]), [
    ['lamb', 'Out', ['Office', 'Dynasty']],
    ['kelce', 'Bye', ['Office']]
  ]);
  const msg = alerts.message(found[0], 'CeeDee Lamb');
  assert.equal(msg.title, 'CeeDee Lamb is out');
  assert.equal(msg.body, 'Still in your lineup in Office, Dynasty. Hamstring.');
});

test('never repeats an alert that was already sent', () => {
  const found = alerts.findAlerts({ ...base, leagues: [{ leagueId: 'a', name: 'Office', starters: ['lamb'] }], sent: new Set(['5:lamb:Out']) });
  assert.equal(found.length, 0);
});
