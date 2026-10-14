// Local preview server: serves the repo, a page that loads every content
// script in manifest order (with tools/preview/shim.js standing in for the
// extension), and the ESPN relay the background worker normally provides.
//
//   node tools/preview/server.mjs [port]   then open http://127.0.0.1:8765/?user=<name>
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const ktc = createRequire(import.meta.url)('../../src/shared/ktc.js');

const root = fileURLToPath(new URL('../..', import.meta.url));
const TYPES = { '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.html': 'text/html' };
const RELAY_HOSTS = ['https://site.api.espn.com/', 'https://sports.core.api.espn.com/'];

async function page() {
  const manifest = JSON.parse(await readFile(join(root, 'manifest.json'), 'utf8'));
  const scripts = manifest.content_scripts[0].js.map((f) => `<script src="/${f}"></script>`).join('\n');
  return `<!doctype html><html><head><meta charset="utf-8"><title>Night Owl preview</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap">
<style>html,body{margin:0;height:100%;background:transparent}</style></head><body>
<script src="/tools/preview/shim.js"></script>
${scripts}
</body></html>`;
}

export function startServer(port = 8765) {
  const server = createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    try {
      if (url.pathname === '/' || url.pathname === '/preview') {
        res.writeHead(200, { 'content-type': 'text/html', 'cache-control': 'no-store' });
        return res.end(await page());
      }
      if (url.pathname === '/ktc') {
        // What the background worker does: fetch the page, send the trimmed table.
        const html = await (await fetch(ktc.URLS[url.searchParams.get('kind') === 'redraft' ? 'redraft' : 'dynasty'])).text();
        const rows = ktc.parse(html);
        res.writeHead(200, { 'content-type': 'application/json' });
        return res.end(JSON.stringify(rows));
      }
      if (url.pathname === '/relay') {
        const target = url.searchParams.get('url') || '';
        if (!RELAY_HOSTS.some((h) => target.startsWith(h))) {
          res.writeHead(403);
          return res.end('host not allowed');
        }
        const upstream = await fetch(target);
        res.writeHead(upstream.status, { 'content-type': 'application/json' });
        return res.end(Buffer.from(await upstream.arrayBuffer()));
      }
      const file = normalize(join(root, decodeURIComponent(url.pathname)));
      if (!file.startsWith(root)) {
        res.writeHead(403);
        return res.end();
      }
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
      return res.end(body);
    } catch {
      res.writeHead(404);
      return res.end('not found');
    }
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const port = Number(process.argv[2]) || 8765;
  await startServer(port);
  console.log(`Night Owl preview on http://127.0.0.1:${port}/?user=<sleeper username>&tool=live`);
}
