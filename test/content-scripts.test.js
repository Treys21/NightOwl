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
    storage: { local: { get: (k, callback) => callback({}), set: (i, callback) => callback && callback(), remove: (k, callback) => callback && callback() }, onChanged: { addListener: noop } }
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
  assert.deepEqual(Object.keys(NightOwl.views).sort(), ['bets', 'draft', 'lineups', 'live', 'moves', 'season']);
  for (const view of Object.values(NightOwl.views)) {
    assert.equal(typeof view.mount, 'function');
    assert.equal(typeof view.unmount, 'function');
  }
  for (const mod of ['storage', 'dom', 'format', 'leagues', 'api', 'account', 'teams', 'players', 'scoring', 'tracker', 'lineups', 'bets', 'season', 'value', 'model', 'finder', 'moveValues', 'movesFinder', 'movesHistory', 'tradeHistory', 'tradeLoader', 'path', 'recap', 'seasonExtras', 'ktc', 'match', 'draftOrder', 'panel', 'draftBoard', 'badges']) {
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
  delete context.chrome.runtime.sendMessage;
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

test('the background worker starts, with every script it imports', () => {
  const noop = () => {};
  const listeners = [];
  const event = () => ({ addListener: (fn) => listeners.push(fn) });
  const context = {
    console, setTimeout, clearTimeout, fetch: async () => ({ ok: false }),
    chrome: {
      runtime: { id: 'test', getURL: (p) => p, onMessage: event(), onInstalled: event(), onStartup: event() },
      storage: { local: { get: (k, callback) => callback({}), set: (i, callback) => callback && callback(), remove: (k, callback) => callback && callback() }, onChanged: event() },
      alarms: { create: noop, onAlarm: event() },
      notifications: { create: noop, clear: noop, onClicked: event() },
      tabs: { create: noop }
    }
  };
  context.globalThis = context;
  context.importScripts = (...files) => files.forEach((f) =>
    vm.runInContext(fs.readFileSync(path.join(root, 'src', f), 'utf8'), context, { filename: f }));
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, manifest.background.service_worker), 'utf8'), context);
  assert.ok(context.NightOwl.alerts && context.NightOwl.api.injuries);
  assert.equal(listeners.length, 6);
});
