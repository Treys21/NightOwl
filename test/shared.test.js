// Shared plumbing: league helpers, the account lookup, the DOM memo, the
// request timeout, and the draft board's refusal to redraw an unchanged board.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const leagues = require('../src/shared/leagues.js');
const format = require('../src/shared/format.js');

const root = path.join(__dirname, '..');
// Load source files into one fresh global, like a content script's isolated world.
function load(files, extra = {}) {
  const store = {};
  const chrome = {
    runtime: { id: 'test', getURL: (p) => p },
    storage: {
      local: {
        get: (key, cb) => cb({ [key]: store[key] }),
        set: (items, cb) => { Object.assign(store, items); if (cb) cb(); },
        remove: (keys, cb) => { for (const k of [].concat(keys)) delete store[k]; if (cb) cb(); }
      },
      onChanged: { addListener() {} }
    }
  };
  const context = { chrome, console, setTimeout, clearTimeout, AbortSignal, ...extra };
  context.globalThis = context;
  vm.createContext(context);
  for (const file of files) vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  return { context, store, NightOwl: context.NightOwl };
}

test('league helpers: which leagues count, which roster is yours, names', () => {
  assert.equal(leagues.isPlaying({ status: 'in_season' }), true);
  assert.equal(leagues.isPlaying({ status: 'post_season' }), true);
  assert.equal(leagues.isPlaying({ status: 'drafting' }), false);
  assert.equal(leagues.isPlaying({ status: 'complete' }), false);

  const rosters = [{ roster_id: 1, owner_id: 'a' }, { roster_id: 2, owner_id: 'b', co_owners: ['me'] }];
  assert.equal(leagues.mine(rosters, 'a').roster_id, 1);
  assert.equal(leagues.mine(rosters, 'me').roster_id, 2, 'co-owners count');
  assert.equal(leagues.mine(rosters, 'nobody'), null);
  assert.equal(leagues.mine(null, 'a'), null);

  const users = [
    { user_id: 'a', display_name: 'Ann', avatar: 'abc', metadata: { team_name: 'Ann\'s Aces' } },
    { user_id: 'b', display_name: 'Bob', avatar: null, metadata: {} },
    { user_id: 'c', display_name: 'Cy', avatar: 'xyz', metadata: { avatar: 'https://cdn/custom.png' } }
  ];
  const names = leagues.teamNames(users);
  assert.equal(names.get('a'), "Ann's Aces");
  assert.equal(names.get('b'), 'Bob');
  const faces = leagues.avatars(users);
  assert.equal(faces.get('a'), 'https://sleepercdn.com/avatars/thumbs/abc');
  assert.equal(faces.get('b'), '');
  assert.equal(faces.get('c'), 'https://cdn/custom.png');
});

test('league helpers: slots, IDP and labels', () => {
  const lg = { roster_positions: ['QB', 'RB', 'SUPER_FLEX', 'DL', 'BN', 'BN', 'IR', 'TAXI'] };
  assert.deepEqual(leagues.startingSlots(lg), ['QB', 'RB', 'SUPER_FLEX', 'DL']);
  assert.equal(leagues.usesIdp([['QB', 'RB'], ['QB', 'LB']]), true);
  assert.equal(leagues.usesIdp([['QB', 'RB'], ['WR']]), false);
  assert.equal(leagues.usesIdp([]), false);
  assert.equal(leagues.slotLabel('SUPER_FLEX'), 'SF');
  assert.equal(leagues.slotLabel('WRRB_FLEX'), 'W/R');
  assert.equal(leagues.slotLabel('QB'), 'QB');
  assert.equal(leagues.slotLabel(undefined), '');
  assert.equal(leagues.teamUrl('123'), 'https://sleeper.com/leagues/123/team');
});

test('the week to show: display_week lags after Monday night, lookahead does not', () => {
  // Tuesday after week 5: Sleeper says week 6, but display_week is still 5.
  const tuesday = { week: 6, display_week: 5, season_type: 'regular' };
  assert.equal(leagues.displayWeek(tuesday), 5);
  assert.equal(leagues.lookaheadWeek(tuesday), 6);
  // Midweek they agree.
  assert.equal(leagues.lookaheadWeek({ week: 6, display_week: 6 }), 6);
  // Preseason or missing numbers never give week 0.
  assert.equal(leagues.lookaheadWeek({ week: 0, display_week: 0 }), 1);
  assert.equal(leagues.displayWeek({ week: 3, display_week: 0 }), 3);
  assert.equal(leagues.seasonType({ season_type: 'post' }), 'post');
  assert.equal(leagues.seasonType({ season_type: 'regular' }), 'regular');
  assert.equal(leagues.seasonType({ season_type: 'off' }), 'regular');
});

test('a kickoff window is titled by its games', () => {
  const w = (n) => ({ kickoff: Date.parse('2026-10-18T17:00:00Z'), games: Array.from({ length: n }, (_, i) => ({ away: `A${i}`, home: `H${i}` })) });
  assert.match(format.windowTitle(w(7)), /· 7 games$/);
  assert.match(format.windowTitle(w(2)), /· A0 @ H0, A1 @ H1$/);
  assert.match(format.windowTitle(w(1)), /· A0 @ H0$/);
});

test('account: resolves once, prefers the stored id, looks up and saves when missing', async () => {
  const lookups = [];
  const api = { user: async (name) => { lookups.push(name); return name === 'ghost' ? null : { user_id: `id-${name}` }; } };
  const { NightOwl, store } = load(['src/shared/storage.js', 'src/shared/account.js'], { NightOwl: { api } });

  // No username yet.
  await assert.rejects(NightOwl.account.resolve(), { message: NightOwl.account.NEED_USERNAME });

  // A stored id is trusted: no lookup.
  store.settings = { username: 'ann', userId: 'stored-1' };
  assert.deepEqual({ ...await NightOwl.account.resolve() }, { username: 'ann', userId: 'stored-1' });
  assert.deepEqual(lookups, []);

  // A new username with no id is looked up once, saved, and cached.
  store.settings = { username: 'bob', userId: null };
  assert.equal((await NightOwl.account.resolve()).userId, 'id-bob');
  assert.equal((await NightOwl.account.resolve()).userId, 'id-bob');
  assert.deepEqual(lookups, ['bob']);
  assert.equal(store.settings.userId, 'id-bob', 'the id is saved for next time');

  // An unknown user is an error, not a silent null.
  store.settings = { username: 'ghost', userId: null };
  await assert.rejects(NightOwl.account.resolve(), /No Sleeper user named "ghost"/);

  // League exclusions come from Live's settings.
  store['live.settings'] = { excluded: ['1', '2'] };
  assert.deepEqual([...await NightOwl.account.excluded()], ['1', '2']);
});

test('dom.setHtml only touches an element when its markup changes', () => {
  const { NightOwl } = load(['src/shared/dom.js']);
  let writes = 0;
  const el = { set innerHTML(v) { writes++; this.html = v; } };
  assert.equal(NightOwl.dom.setHtml(el, '<b>1</b>'), true);
  assert.equal(NightOwl.dom.setHtml(el, '<b>1</b>'), false);
  assert.equal(NightOwl.dom.setHtml(el, '<b>2</b>'), true);
  assert.equal(writes, 2);
  // Separate elements are tracked separately.
  const other = { set innerHTML(v) { this.html = v; } };
  assert.equal(NightOwl.dom.setHtml(other, '<b>2</b>'), true);
});

test('api: positions follow IDP leagues, and every request carries a timeout signal', async () => {
  let init;
  const { NightOwl } = load(['src/shared/leagues.js', 'src/shared/api.js'], {
    fetch: async (url, opts) => { init = opts; return { ok: true, json: async () => ({}) }; }
  });
  const { api } = NightOwl;
  assert.deepEqual(api.positionsFor([['QB', 'RB']]), api.OFFENSE);
  assert.deepEqual(api.positionsFor([['QB', 'DL']]), [...api.OFFENSE, 'DL', 'LB', 'DB']);
  await api.state();
  assert.ok(init.signal, 'a timeout signal is attached');
  assert.equal(typeof init.signal.aborted, 'boolean');
});

test('api: a request that fails is reported, not left pending', async () => {
  const { NightOwl } = load(['src/shared/leagues.js', 'src/shared/api.js'], {
    fetch: async () => { throw new Error('The operation timed out'); }
  });
  await assert.rejects(NightOwl.api.state(), /timed out/);
  assert.deepEqual(NightOwl.api.unavailable(), ['Sleeper']);
});

test('the draft board redraws only when something changed, and keeps its scroll', () => {
  const { NightOwl } = load(['src/shared/storage.js', 'src/shared/dom.js', 'src/shared/format.js', 'src/draft/board.js']);
  const bodies = [];
  const listeners = {};
  const el = {
    addEventListener: (type, fn) => { listeners[type] = fn; },
    querySelector: (sel) => (sel === '.body' ? bodies[bodies.length - 1] || null : null),
    set innerHTML(v) { this.html = v; bodies.push({ scrollTop: 0 }); } // a redraw makes a fresh, unscrolled body
  };
  const prefs = { position: 'ALL', hideDrafted: false, sortBy: 'rank', sortDir: 'asc' };
  const rows = (n) => Array.from({ length: n }, (_, i) => ({ rank: i + 1, name: `Player ${i}`, position: 'WR', team: 'KC', matched: true, pickNo: null, delta: null }));
  const draw = (n) => NightOwl.draftBoard.render(el, { status: 'ok', rows: rows(n), myTurn: false, message: 'rd 1 · pick 2', kind: '' }, prefs, () => {});

  draw(30);
  assert.equal(bodies.length, 1);
  bodies[0].scrollTop = 420; // the reader scrolled down the list

  draw(30); // the next poll: nothing changed
  assert.equal(bodies.length, 1, 'an unchanged board is not redrawn');
  assert.equal(bodies[0].scrollTop, 420);

  draw(29); // a pick landed: the table changes
  assert.equal(bodies.length, 2);
  assert.equal(bodies[1].scrollTop, 420, 'the reader keeps their place');

  // Events are delegated, bound once.
  assert.equal(typeof listeners.click, 'function');
  assert.equal(typeof listeners.change, 'function');
});
