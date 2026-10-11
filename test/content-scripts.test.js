// Load every content script in manifest order, in one shared global like
// Chrome's isolated world, and check the pieces find each other. This catches
// a script listed before something it reads at load time.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const scripts = manifest.content_scripts[0].js;

function sandbox() {
  const noop = () => {};
  const chrome = {
    runtime: { id: 'test', getURL: (p) => p, sendMessage: noop },
    storage: { local: { get: (k, cb) => cb({}), set: (i, cb) => cb && cb(), remove: (k, cb) => cb && cb() }, onChanged: { addListener: noop } }
  };
  const document = { addEventListener: noop, hidden: false, getElementById: () => null };
  const context = { chrome, document, console, setTimeout, clearTimeout, setInterval: noop, location: { href: 'https://sleeper.com/' }, window: { addEventListener: noop } };
  context.globalThis = context;
  return vm.createContext(context);
}

test('content scripts load in order and register every tool', () => {
  const context = sandbox();
  for (const file of scripts.filter((f) => f !== 'src/panel/main.js')) {
    vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
  }
  const { NightOwl } = context;
  assert.deepEqual(Object.keys(NightOwl.views).sort(), ['bets', 'draft', 'lineups', 'live', 'season']);
  for (const view of Object.values(NightOwl.views)) {
    assert.equal(typeof view.mount, 'function');
    assert.equal(typeof view.unmount, 'function');
  }
  for (const mod of ['storage', 'dom', 'format', 'api', 'teams', 'players', 'scoring', 'tracker', 'lineups', 'bets', 'season', 'match', 'draftOrder', 'panel', 'draftBoard', 'badges']) {
    assert.ok(NightOwl[mod], `NightOwl.${mod} missing`);
  }
});

test('the entry point loads last', () => {
  assert.equal(scripts[scripts.length - 1], 'src/panel/main.js');
});

test('api names a failing feed and clears it on recovery', async () => {
  const context = sandbox();
  let espnUp = false;
  context.fetch = async (url) => (url.includes('espn.com') && !espnUp
    ? { ok: false, status: 503 }
    : { ok: true, json: async () => ({ events: [] }) });
  delete context.chrome.runtime.sendMessage; // use fetch directly
  vm.runInContext(fs.readFileSync(path.join(root, 'src/shared/api.js'), 'utf8'), context);
  const { api } = context.NightOwl;
  const seen = [];
  api.onAvailability((labels) => seen.push(labels.join()));
  await assert.rejects(api.kickoffs(2026, 5, 'regular'));
  assert.deepEqual(api.unavailable(), ['ESPN odds and kickoffs']);
  espnUp = true;
  await api.kickoffs(2026, 5, 'regular');
  assert.deepEqual(api.unavailable(), []);
  assert.deepEqual(seen, ['ESPN odds and kickoffs', '']);
});
