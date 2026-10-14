// Background worker.
//
// 1. Fetch relay. ESPN's APIs refuse requests that carry a sleeper.com Origin
//    (403) but answer the extension's own, so content scripts ask this worker
//    for kickoff times, game odds and DraftKings props. Only messages from this
//    extension, for allow-listed hosts, are relayed.
// 2. Lineup alerts. Every 15 minutes, check your starters in every league
//    against ESPN's injury report and notify once when one is out, on injured
//    reserve, or on bye before his game locks.
// 3. Scheduled refresh of what has no API. KeepTradeCut's values and The Ringer's rankings
//    are web pages the extension reads, so twice a day this worker fetches them and keeps the
//    result, and a tab opens on today's numbers. (Sleeper and ESPN have APIs and stay live.)
importScripts(
  'shared/storage.js',
  'shared/leagues.js',
  'shared/ktc.js',
  'shared/api.js',
  'shared/account.js',
  'shared/teams.js',
  'shared/players.js',
  'draft/match-names.js',
  'draft/ringer.js',
  'lineups/core.js',
  'bets/core.js',
  'alerts/core.js'
);

const ALLOWED = ['https://site.api.espn.com/', 'https://sports.core.api.espn.com/'];

// KeepTradeCut's dynasty and redraft values: fetched here (the page is 2.7 MB; only the
// trimmed table goes back to the tab).
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id || !msg || msg.type !== 'nightowl-ktc') return false;
  fetch(globalThis.NightOwl.ktc.URLS[msg.kind === 'redraft' ? 'redraft' : 'dynasty'], { credentials: 'omit', signal: AbortSignal.timeout(30000) })
    .then((res) => (res.ok ? res.text() : Promise.reject(new Error(`KeepTradeCut ${res.status}`))))
    .then(
      (html) => sendResponse({ ok: true, data: globalThis.NightOwl.ktc.parse(html) }),
      (err) => sendResponse({ ok: false, error: String(err.message || err) })
    );
  return true;
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id) return false;
  if (!msg || msg.type !== 'nightowl-fetch' || typeof msg.url !== 'string') return false;
  if (!ALLOWED.some((prefix) => msg.url.startsWith(prefix))) {
    sendResponse({ ok: false, error: 'host not allowed' });
    return false;
  }
  fetch(msg.url, { signal: AbortSignal.timeout(api.TIMEOUT_MS) })
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`${res.status} ${msg.url}`))))
    .then(
      (data) => sendResponse({ ok: true, data }),
      (err) => sendResponse({ ok: false, error: String(err.message || err) })
    );
  return true; // respond asynchronously
});

// ---- lineup alerts ------------------------------------------------------

const ALARM = 'night-owl-lineups';
const SENT_KEY = 'alerts.sent';
const { api, storage, players, lineups, alerts, bets, leagues, account } = globalThis.NightOwl;
const ktcValues = globalThis.NightOwl.ktc;
const LINES_KEY = 'bets.lines';
const LINES_WINDOW_MS = 75 * 60000; // save closing lines in the hour before kickoff

const schedule = () => chrome.alarms.create(ALARM, { periodInMinutes: 15, delayInMinutes: 1 });
const REFRESH_ALARM = 'night-owl-refresh';
const REFRESH_KEY = 'refresh.status';
const scheduleRefresh = () => chrome.alarms.create(REFRESH_ALARM, { periodInMinutes: 12 * 60, delayInMinutes: 2 });
chrome.runtime.onInstalled.addListener(() => { schedule(); scheduleRefresh(); });
chrome.runtime.onStartup.addListener(() => { schedule(); scheduleRefresh(); });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM) checkLineups().catch((err) => console.warn('[Night Owl alerts]', err));
  if (alarm.name === REFRESH_ALARM) refreshData().catch((err) => console.warn('[Night Owl refresh]', err));
});

// KeepTradeCut's page is 2.7 MB; only the trimmed table is kept.
async function fetchKtc(kind) {
  const res = await fetch(globalThis.NightOwl.ktc.URLS[kind], { credentials: 'omit', signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`KeepTradeCut ${res.status}`);
  return globalThis.NightOwl.ktc.parse(await res.text());
}

// Runs every 12 hours. Each loader keeps its own cache (KeepTradeCut's is good for 20 hours), so this only
// fetches what has gone stale; what it learns is saved for the popup to show.
async function refreshData() {
  const settings = await storage.getSettings();
  if (!settings.username) return; // nothing to warm for until someone has set up
  const status = { at: Date.now(), ok: [], failed: {} };
  const attempt = async (name, work) => {
    try { await work(); status.ok.push(name); } catch (err) { status.failed[name] = String((err && err.message) || err); }
  };
  await attempt('players', () => players.load()); // KeepTradeCut rows are matched to these
  for (const kind of ['dynasty', 'redraft']) await attempt(`ktc-${kind}`, () => ktcValues.load(kind, players.list(), fetchKtc));
  // The Ringer's draft rankings: only a board nobody has edited is replaced (see ringer.isUntouched).
  await attempt('ringer', async () => {
    const [current, synced] = await Promise.all([storage.getRankings(), storage.get('ringer.synced', null)]);
    if (!globalThis.NightOwl.ringer.isUntouched(current, synced)) return;
    const result = await globalThis.NightOwl.ringer.fetchRankings(settings.format);
    if (!result.ok) throw new Error(result.reason);
    await storage.saveRankings(result.rankings, { markSynced: true });
  });
  await storage.set({ [REFRESH_KEY]: status });
}

// Runs every 15 minutes: keep closing lines, then check lineups.
async function checkLineups() {
  const settings = await storage.getSettings();
  if (!settings.username) return;
  const nfl = await api.state();
  if (nfl.season_type !== 'regular' && nfl.season_type !== 'post') return;
  // Look ahead: Sleeper's display_week stays on the week just played until
  // midweek, which would hide Thursday's lineups from the check.
  const week = leagues.lookaheadWeek(nfl);
  const seasonType = leagues.seasonType(nfl);

  const games = lineups.parseGames(await api.kickoffs(nfl.season, week, seasonType));
  await saveClosingLines(games, `${nfl.season}-${seasonType}-${week}`).catch((err) => console.warn('[Night Owl lines]', err));
  if (settings.alerts === false) return;

  const { userId } = await account.resolve();
  const excluded = await account.excluded();
  const playing = (await api.leagues(userId, nfl.season)).filter((lg) => leagues.isPlaying(lg) && !excluded.has(lg.league_id));
  if (!playing.length) return;

  const lineupsByLeague = (await Promise.all(playing.map(async (lg) => {
    const [rosters, matchups] = await Promise.all([api.rosters(lg.league_id), api.matchups(lg.league_id, week)]);
    const roster = leagues.mine(rosters, userId);
    const set = roster && (matchups || []).find((m) => m.roster_id === roster.roster_id);
    return set ? { leagueId: lg.league_id, name: lg.name.trim(), starters: set.starters || [] } : null;
  }))).filter(Boolean);

  const [injuries] = await Promise.all([api.injuries().then(alerts.parseInjuries), players.load()]);
  const kickoff = new Map();
  for (const g of games) { kickoff.set(g.home, g.kickoff); kickoff.set(g.away, g.kickoff); }

  const sent = new Set(await storage.get(SENT_KEY, []));
  const found = alerts.findAlerts({
    leagues: lineupsByLeague,
    week: `${nfl.season}-${seasonType}-${week}`,
    now: Date.now(),
    sent,
    teamOf: (pid) => players.info(pid).team,
    kickoffOf: (team) => (kickoff.has(team) ? kickoff.get(team) : games.length ? null : undefined),
    statusOf: (pid) => injuries.get(players.espnId(pid)) || null
  });

  for (const alert of found) {
    const { title, body } = alerts.message(alert, players.info(alert.pid).name);
    chrome.notifications.create(`lineup|${alert.leagues[0].leagueId}|${alert.key}`, {
      type: 'basic',
      iconUrl: chrome.runtime.getURL('icons/icon128.png'),
      title,
      message: body,
      priority: 1
    });
    sent.add(alert.key);
  }
  if (found.length) await storage.set({ [SENT_KEY]: [...sent].slice(-300) });
}

// Sleeper pulls a player's lines at kickoff. Merge in the latest ones shortly
// before each game so Bets can still show the closing line and live progress,
// even if the Bets tab wasn't open then.
async function saveClosingLines(games, key) {
  const now = Date.now();
  if (!games.some((g) => g.kickoff > now && g.kickoff - now < LINES_WINDOW_MS)) return;
  const saved = await storage.get(LINES_KEY, null);
  const previous = saved && saved.key === key ? saved.lines : {};
  const fresh = bets.parseLines(await api.lines());
  await storage.set({ [LINES_KEY]: { key, lines: bets.mergeLines(previous, fresh) } });
}

// Clicking an alert opens that league's team page, where the lineup is set.
chrome.notifications.onClicked.addListener((id) => {
  const [kind, leagueId] = id.split('|');
  if (kind !== 'lineup' || !/^\d+$/.test(leagueId)) return;
  chrome.tabs.create({ url: `https://sleeper.com/leagues/${leagueId}/team` });
  chrome.notifications.clear(id);
});
