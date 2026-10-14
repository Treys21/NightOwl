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
  const scripts = manifest.content_scripts[0].js.map((scriptPath) => `<script src="/${scriptPath}"></script>`).join('\n');
  return `<!doctype html><html><head><meta charset="utf-8"><title>Night Owl preview</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap">
<style>html,body{margin:0;height:100%;background:transparent}</style></head><body>
<script src="/tools/preview/shim.js"></script>
${scripts}
</body></html>`;
}

export function startServer(port = 8765) {
  const server = createServer(async (request, response) => {
    const url = new URL(request.url, 'http://localhost');
    try {
      if (url.pathname === '/' || url.pathname === '/preview') {
        response.writeHead(200, { 'content-type': 'text/html', 'cache-control': 'no-store' });
        return response.end(await page());
      }
      if (url.pathname === '/ktc') {
        const html = await (await fetch(ktc.URLS[url.searchParams.get('kind') === 'redraft' ? 'redraft' : 'dynasty'])).text();
        const rows = ktc.parse(html);
        response.writeHead(200, { 'content-type': 'application/json' });
        return response.end(JSON.stringify(rows));
      }
      if (url.pathname === '/relay') {
        const target = url.searchParams.get('url') || '';
        if (!RELAY_HOSTS.some((host) => target.startsWith(host))) {
          response.writeHead(403);
          return response.end('host not allowed');
        }
        const upstream = await fetch(target);
        response.writeHead(upstream.status, { 'content-type': 'application/json' });
        return response.end(Buffer.from(await upstream.arrayBuffer()));
      }
      const file = normalize(join(root, decodeURIComponent(url.pathname)));
      if (!file.startsWith(root)) {
        response.writeHead(403);
        return response.end();
      }
      const body = await readFile(file);
      response.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' });
      return response.end(body);
    } catch {
      response.writeHead(404);
      return response.end('not found');
    }
  });
  return new Promise((resolve) => server.listen(port, '127.0.0.1', () => resolve(server)));
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const port = Number(process.argv[2]) || 8765;
  await startServer(port);
  console.log(`Night Owl preview on http://127.0.0.1:${port}/?user=<sleeper username>&tool=live`);
}
