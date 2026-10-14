import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const manifest = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'));
const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const problems = [];

if (manifest.version !== packageJson.version) problems.push(`version mismatch: manifest ${manifest.version} vs package.json ${packageJson.version}`);

const referenced = [
  ...manifest.content_scripts.flatMap((contentScript) => contentScript.js || []),
  manifest.background && manifest.background.service_worker,
  manifest.action && manifest.action.default_popup,
  ...Object.values(manifest.icons || {}),
  ...Object.values((manifest.action && manifest.action.default_icon) || {})
].filter(Boolean);
for (const file of referenced) if (!existsSync(join(root, file))) problems.push(`missing: ${file}`);

const walk = (dir) => readdirSync(dir).flatMap((entry) => {
  const entryPath = join(dir, entry);
  return statSync(entryPath).isDirectory() ? walk(entryPath) : [entryPath];
});
for (const file of walk(join(root, 'src')).filter((scriptPath) => scriptPath.endsWith('.js'))) {
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
  } catch (err) {
    problems.push(`syntax: ${file}\n${err.stderr}`);
  }
  if (/\bdomanik\b/.test(readFileSync(file, 'utf8'))) problems.push(`personal username hardcoded in ${file}`);
}

if (problems.length) {
  console.error(problems.map((problem) => `✖ ${problem}`).join('\n'));
  process.exit(1);
}
console.log(`✔ manifest ${manifest.version}: ${referenced.length} referenced files present, all scripts parse`);
