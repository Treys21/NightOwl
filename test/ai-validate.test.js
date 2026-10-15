const test = require('node:test');
const assert = require('node:assert');
const validate = require('../src/ai/validate.js');
const prompts = require('../src/ai/prompts.js');

const player = (id, name, extra) => Object.assign({ id, name, pos: 'WR', age: 25, team: 'AAA', market: 1000, projected: 80, lineupValue: 10 }, extra);
const view = {
  league: { kind: 'redraft', teams: 12, week: 5, weeksLeft: 8, playoffStart: 15, playoffTeams: 6, slots: ['QB', 'RB', 'WR', 'BN'], superflex: false, tightEndPremium: false, scoring: { reception: 1, passTouchdown: 4 } },
  me: { rosterId: 1, record: '3-2', rank: 4, pointsFor: 640, window: 0.6, players: [player('a1', 'Alpha'), player('a2', 'Bravo'), player('a3', 'Charlie')] },
  partners: [{ rosterId: 2, record: '1-4', rank: 11, pointsFor: 500, window: 0.1, players: [player('b1', 'Delta'), player('b2', 'Echo')] }],
  candidates: [{ key: 'c1', partnerId: 2, give: ['a1'], get: ['b1'], static: { myPoints: 8, theirPoints: 2, fairnessToThem: 0.02, likelihood: 0.7 } }]
};

test('accepts a candidate key and a valid custom deal', () => {
  const reply = JSON.stringify({ suggestions: [{ candidate: 'c1', pitch: 'good' }, { partnerId: 2, give: ['a2'], get: ['b2'], pitch: 'also good' }] });
  const result = validate.suggestions(reply, view);
  assert.strictEqual(result.ok, true);
  assert.strictEqual(result.suggestions.length, 2);
  assert.strictEqual(result.suggestions[0].source, 'candidate');
  assert.deepStrictEqual(result.suggestions[1].get, ['b2']);
});

test('rejects invented players, wrong sides and oversized deals', () => {
  const reply = { suggestions: [
    { partnerId: 2, give: ['zz'], get: ['b1'] },
    { partnerId: 2, give: ['a1'], get: ['a2'] },
    { partnerId: 9, give: ['a1'], get: ['b1'] },
    { partnerId: 2, give: ['a1', 'a2', 'a3'], get: ['b1'] },
    { candidate: 'c9' }
  ] };
  const result = validate.suggestions(reply, view);
  assert.strictEqual(result.ok, false);
  assert.deepStrictEqual(result.errors, ['give-not-mine', 'get-not-theirs', 'unknown-partner:9', 'bad-size', 'unknown-candidate:c9']);
});

test('tolerates a markdown fence, drops duplicates and caps at three', () => {
  const fenced = '```json\n' + JSON.stringify({ suggestions: [{ candidate: 'c1' }, { candidate: 'c1' }, { partnerId: 2, give: ['a2'], get: ['b2'] }, { partnerId: 2, give: ['a3'], get: ['b2'] }, { partnerId: 2, give: ['a2'], get: ['b1'] }] }) + '\n```';
  const result = validate.suggestions(fenced, view);
  assert.strictEqual(result.ok, true);
  assert.strictEqual(result.suggestions.length, 3);
  assert.ok(result.errors.includes('duplicate'));
});

test('returns not-json for garbage', () => {
  assert.deepStrictEqual(validate.suggestions('sorry I cannot', view).errors, ['not-json']);
});

test('prompt includes every candidate, both rosters and the league guide', () => {
  const built = prompts.build(view);
  assert.match(built.system, /redraft/);
  assert.match(built.system, /sell high/);
  assert.ok(built.user.includes('Alpha') && built.user.includes('Delta') && built.user.includes('c1 | partnerId 2'));
  const dynasty = prompts.build(Object.assign({}, view, { league: Object.assign({}, view.league, { kind: 'dynasty' }) }));
  assert.match(dynasty.system, /age curve/);
});
