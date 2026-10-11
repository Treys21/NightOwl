// The manifest is the contract with Chrome: keep it consistent with the code.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

test('manifest and package.json agree on the version', () => {
  assert.equal(manifest.version, pkg.version);
});

test('every script, page and icon the manifest references exists', () => {
  const files = [
    ...manifest.content_scripts.flatMap((c) => c.js),
    manifest.background.service_worker,
    manifest.action.default_popup,
    ...Object.values(manifest.icons),
    ...Object.values(manifest.action.default_icon)
  ];
  for (const f of files) assert.ok(fs.existsSync(path.join(root, f)), `missing ${f}`);
});

test('content scripts load core modules before the views that use them', () => {
  const js = manifest.content_scripts[0].js;
  const before = (a, b) => assert.ok(js.indexOf(a) < js.indexOf(b), `${a} must load before ${b}`);
  before('src/live/scoring.js', 'src/live/tracker.js');
  before('src/live/lineups-core.js', 'src/live/lineups.js');
  before('src/live/bets-core.js', 'src/live/bets.js');
  before('src/live/bets.js', 'src/sleeper/panel.js');
  before('src/sleeper/panel.js', 'src/sleeper/content.js');
});

test('only the hosts the extension actually calls', () => {
  assert.deepEqual(manifest.host_permissions.slice().sort(), [
    'https://api.sleeper.app/*',
    'https://api.sleeper.com/*',
    'https://site.api.espn.com/*',
    'https://sleeper.com/*',
    'https://sports.core.api.espn.com/*',
    'https://theringer.com/*'
  ]);
  assert.deepEqual(manifest.permissions.slice().sort(), ['storage', 'unlimitedStorage']);
});

test('the background relay only forwards allow-listed hosts', () => {
  const bg = fs.readFileSync(path.join(root, manifest.background.service_worker), 'utf8');
  assert.match(bg, /ALLOWED = \['https:\/\/site\.api\.espn\.com\/', 'https:\/\/sports\.core\.api\.espn\.com\/'\]/);
});
