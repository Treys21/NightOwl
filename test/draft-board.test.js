const test = require('node:test');
const assert = require('node:assert');

require('../src/shared/format.js');
const { filterRows, sortRows } = require('../src/draft/board.js');

const rows = [
  { rank: 1, name: 'Bijan Robinson', position: 'RB', pickNo: 2, delta: 1, matched: true },
  { rank: 2, name: 'Ja\'Marr Chase', position: 'WR', pickNo: null, delta: null, matched: true },
  { rank: 3, name: 'Josh Allen', position: 'QB', pickNo: 1, delta: -2, matched: true },
  { rank: 4, name: 'Puka Nacua', position: 'WR', pickNo: null, delta: null, matched: false }
];
const prefs = (patch) => Object.assign({ position: 'ALL', hideDrafted: false, sortBy: 'rank', sortDir: 'asc' }, patch);
const names = (list) => list.map((r) => r.rank);

test('filters by position and drafted status', () => {
  assert.deepEqual(names(filterRows(rows, prefs({ position: 'WR' }))), [2, 4]);
  assert.deepEqual(names(filterRows(rows, prefs({ hideDrafted: true }))), [2, 4]);
  assert.deepEqual(names(filterRows(rows, prefs())), [1, 2, 3, 4]);
});

test('status sorts available players ahead of drafted ones, by pick', () => {
  assert.deepEqual(names(sortRows(rows, prefs({ sortBy: 'status' }))), [2, 4, 3, 1]);
});

test('delta sorts values first when descending, unpicked last', () => {
  assert.deepEqual(names(sortRows(rows, prefs({ sortBy: 'delta', sortDir: 'desc' }))), [1, 3, 2, 4]);
});

test('names sort alphabetically and rank sorts numerically', () => {
  assert.deepEqual(names(sortRows(rows, prefs({ sortBy: 'name' }))), [1, 2, 3, 4]);
  assert.deepEqual(names(sortRows(rows, prefs({ sortDir: 'desc' }))), [4, 3, 2, 1]);
});
