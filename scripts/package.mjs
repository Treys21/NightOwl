import { readFileSync, mkdirSync, rmSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
execFileSync(process.execPath, [join(root, 'scripts/check.mjs')], { stdio: 'inherit' });

const { version } = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'));
const out = join(root, 'dist', `night-owl-v${version}.zip`);
mkdirSync(join(root, 'dist'), { recursive: true });
rmSync(out, { force: true });
execFileSync('zip', ['-rq', out, 'manifest.json', 'LICENSE', 'src', 'icons', '-x', '*.DS_Store', 'icons/src/*'], { cwd: root, stdio: 'inherit' });
const latest = join(root, 'dist', 'night-owl.zip');
copyFileSync(out, latest);
console.log(`✔ ${out}\n✔ ${latest}`);
