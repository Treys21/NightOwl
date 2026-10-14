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
  const popup = fs.readFileSync(path.join(root, manifest.action.default_popup), 'utf8');
  for (const [, src] of popup.matchAll(/<script src="([^"]+)"/g)) files.push(path.join('src/popup', src));
  for (const f of files) assert.ok(fs.existsSync(path.join(root, f)), `missing ${f}`);
});

test('the panel stylesheets are exposed to the content script', () => {
  const shell = fs.readFileSync(path.join(root, 'src/panel/shell.js'), 'utf8');
  const sheets = [...shell.matchAll(/'(src\/styles\/[a-z-]+\.css)'/g)].map((m) => m[1]);
  assert.ok(sheets.length > 0);
  const exposed = manifest.web_accessible_resources.flatMap((r) => r.resources);
  assert.deepEqual(exposed, ['src/styles/*.css']);
  for (const f of sheets) assert.ok(fs.existsSync(path.join(root, f)), `missing ${f}`);
});

test('only the hosts the extension actually calls', () => {
  assert.deepEqual(manifest.host_permissions.slice().sort(), [
    'https://api.sleeper.app/*',
    'https://api.sleeper.com/*',
    'https://keeptradecut.com/*',
    'https://site.api.espn.com/*',
    'https://sleeper.com/*',
    'https://sports.core.api.espn.com/*',
    'https://theringer.com/*'
  ]);
  assert.deepEqual(manifest.permissions.slice().sort(), ['alarms', 'notifications', 'storage', 'unlimitedStorage']);
});

test('the background relay only forwards allow-listed hosts', () => {
  const bg = fs.readFileSync(path.join(root, manifest.background.service_worker), 'utf8');
  assert.match(bg, /ALLOWED = \['https:\/\/site\.api\.espn\.com\/', 'https:\/\/sports\.core\.api\.espn\.com\/'\]/);
});
