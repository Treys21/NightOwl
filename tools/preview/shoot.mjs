/* global document -- used inside page.evaluate callbacks, which run in the browser */
import { mkdir } from 'node:fs/promises';
import { parseArgs } from 'node:util';
import puppeteer from 'puppeteer-core';
import { startServer } from './server.mjs';

const { values: options } = parseArgs({
  options: {
    user: { type: 'string', default: process.env.SLEEPER_USER || '' },
    tools: { type: 'string', default: 'live,lineups,bets,season,moves,draft' },
    sizes: { type: 'string', default: '440x800,320x480,900x640' },
    out: { type: 'string', default: '.preview' },
    port: { type: 'string', default: '8766' }
  }
});
if (!options.user) {
  console.error('Usage: npm run preview -- --user <sleeper username>');
  process.exit(1);
}

const CHROME = process.env.CHROME || {
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  win32: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
}[process.platform] || '/usr/bin/google-chrome';
const WAIT = { live: 14000, bets: 16000, lineups: 10000, season: 12000, moves: 14000, draft: 10000 };
const RANKINGS = ['Bijan Robinson|RB', "Ja'Marr Chase|WR", 'Jahmyr Gibbs|RB', 'CeeDee Lamb|WR', 'Justin Jefferson|WR',
  'Saquon Barkley|RB', 'Puka Nacua|WR', 'Malik Nabers|WR', 'Amon-Ra St. Brown|WR', 'Ashton Jeanty|RB', 'Brock Bowers|TE',
  'Nico Collins|WR', 'Lamar Jackson|QB', 'Josh Allen|QB', 'Derrick Henry|RB', 'Trey McBride|TE']
  .map((entry, i) => ({ rank: i + 1, name: entry.split('|')[0], position: entry.split('|')[1] }));
const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

async function draftRoute(user) {
  const sleeper = (path) => fetch(`https://api.sleeper.app/v1${path}`).then((response) => response.json());
  const state = await sleeper('/state/nfl');
  const sleeperUser = await sleeper(`/user/${encodeURIComponent(user)}`);
  const leagues = await sleeper(`/user/${sleeperUser.user_id}/leagues/nfl/${state.season}`);
  return leagues[0] ? `/leagues/${leagues[0].league_id}/draft` : '';
}

const port = Number(options.port);
const server = await startServer(port);
await mkdir(options.out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const sizes = options.sizes.split(',').map((size) => size.split('x').map(Number));
const saved = [];

try {
  for (const tool of options.tools.split(',')) {
    const extra = tool === 'draft' ? { route: await draftRoute(options.user), picks: '16', rankings: JSON.stringify(RANKINGS) }
      : tool === 'lineups' ? { stage: '1' } : {};
    for (const [width, height] of sizes) {
      const page = await browser.newPage();
      page.on('pageerror', (err) => console.warn(`  ${tool} ${width}x${height}: ${err.message}`));
      await page.setViewport({ width: width + 40, height: height + 40, deviceScaleFactor: 2 });
      const query = new URLSearchParams({ user: options.user, tool, w: String(width), h: String(height), ...extra });
      await page.goto(`http://127.0.0.1:${port}/?${query}`, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.getElementById('night-owl-host'), { timeout: 15000 });
      await sleep(WAIT[tool] || 10000);
      const panel = await page.evaluateHandle(() => document.getElementById('night-owl-host').shadowRoot.querySelector('.panel'));
      const file = `${options.out}/${tool}-${width}x${height}.png`;
      await panel.screenshot({ path: file, omitBackground: true });
      saved.push(file);
      console.log(file);
      await page.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}
console.log(`\n${saved.length} screenshots in ${options.out}/`);
