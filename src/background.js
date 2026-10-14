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

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id || !message || message.type !== 'nightowl-ktc') return false;
  fetch(globalThis.NightOwl.ktc.URLS[message.kind === 'redraft' ? 'redraft' : 'dynasty'], { credentials: 'omit', signal: AbortSignal.timeout(30000) })
    .then((res) => (res.ok ? res.text() : Promise.reject(new Error(`KeepTradeCut ${res.status}`))))
    .then(
      (html) => sendResponse({ ok: true, data: globalThis.NightOwl.ktc.parse(html) }),
      (error) => sendResponse({ ok: false, error: String(error.message || error) })
    );
  return true;
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id) return false;
  if (!message || message.type !== 'nightowl-fetch' || typeof message.url !== 'string') return false;
  if (!ALLOWED.some((prefix) => message.url.startsWith(prefix))) {
    sendResponse({ ok: false, error: 'host not allowed' });
    return false;
  }
  fetch(message.url, { signal: AbortSignal.timeout(api.TIMEOUT_MS) })
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`${res.status} ${message.url}`))))
    .then(
      (data) => sendResponse({ ok: true, data }),
      (error) => sendResponse({ ok: false, error: String(error.message || error) })
    );
  return true;
});

const ALARM = 'night-owl-lineups';
const SENT_KEY = 'alerts.sent';
const { api, storage, players, lineups, alerts, bets, leagues, account } = globalThis.NightOwl;
const ktcValues = globalThis.NightOwl.ktc;
const LINES_KEY = 'bets.lines';
const LINES_WINDOW_MS = 75 * 60000;

const schedule = () => chrome.alarms.create(ALARM, { periodInMinutes: 15, delayInMinutes: 1 });
const REFRESH_ALARM = 'night-owl-refresh';
const REFRESH_KEY = 'refresh.status';
const scheduleRefresh = () => chrome.alarms.create(REFRESH_ALARM, { periodInMinutes: 12 * 60, delayInMinutes: 2 });
chrome.runtime.onInstalled.addListener(() => { schedule(); scheduleRefresh(); });
chrome.runtime.onStartup.addListener(() => { schedule(); scheduleRefresh(); });
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM) checkLineups().catch((error) => console.warn('[Night Owl alerts]', error));
  if (alarm.name === REFRESH_ALARM) refreshData().catch((error) => console.warn('[Night Owl refresh]', error));
});

async function fetchKtc(kind) {
  const res = await fetch(globalThis.NightOwl.ktc.URLS[kind], { credentials: 'omit', signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`KeepTradeCut ${res.status}`);
  return globalThis.NightOwl.ktc.parse(await res.text());
}

async function refreshData() {
  const settings = await storage.getSettings();
  if (!settings.username) return;
  const status = { at: Date.now(), ok: [], failed: {} };
  const attempt = async (name, work) => {
    try { await work(); status.ok.push(name); } catch (error) { status.failed[name] = String((error && error.message) || error); }
  };
  await attempt('players', () => players.load());
  for (const kind of ['dynasty', 'redraft']) await attempt(`ktc-${kind}`, () => ktcValues.load(kind, players.list(), fetchKtc));
  await attempt('ringer', async () => {
    const [current, synced] = await Promise.all([storage.getRankings(), storage.get('ringer.synced', null)]);
    if (!globalThis.NightOwl.ringer.isUntouched(current, synced)) return;
    const result = await globalThis.NightOwl.ringer.fetchRankings(settings.format);
    if (!result.ok) throw new Error(result.reason);
    await storage.saveRankings(result.rankings, { markSynced: true });
  });
  await storage.set({ [REFRESH_KEY]: status });
}

async function checkLineups() {
  const settings = await storage.getSettings();
  if (!settings.username) return;
  const nfl = await api.state();
  if (nfl.season_type !== 'regular' && nfl.season_type !== 'post') return;
  const week = leagues.lookaheadWeek(nfl);
  const seasonType = leagues.seasonType(nfl);

  const games = lineups.parseGames(await api.kickoffs(nfl.season, week, seasonType));
  await saveClosingLines(games, `${nfl.season}-${seasonType}-${week}`).catch((error) => console.warn('[Night Owl lines]', error));
  if (settings.alerts === false) return;

  const { userId } = await account.resolve();
  const excluded = await account.excluded();
  const playing = (await api.leagues(userId, nfl.season)).filter((league) => leagues.isPlaying(league) && !excluded.has(league.league_id));
  if (!playing.length) return;

  const lineupsByLeague = (await Promise.all(playing.map(async (league) => {
    const [rosters, matchups] = await Promise.all([api.rosters(league.league_id), api.matchups(league.league_id, week)]);
    const roster = leagues.mine(rosters, userId);
    const set = roster && (matchups || []).find((m) => m.roster_id === roster.roster_id);
    return set ? { leagueId: league.league_id, name: league.name.trim(), starters: set.starters || [] } : null;
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
    teamOf: (playerId) => players.info(playerId).team,
    kickoffOf: (team) => (kickoff.has(team) ? kickoff.get(team) : games.length ? null : undefined),
    statusOf: (playerId) => injuries.get(players.espnId(playerId)) || null
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

async function saveClosingLines(games, key) {
  const now = Date.now();
  if (!games.some((g) => g.kickoff > now && g.kickoff - now < LINES_WINDOW_MS)) return;
  const saved = await storage.get(LINES_KEY, null);
  const previous = saved && saved.key === key ? saved.lines : {};
  const fresh = bets.parseLines(await api.lines());
  await storage.set({ [LINES_KEY]: { key, lines: bets.mergeLines(previous, fresh) } });
}

chrome.notifications.onClicked.addListener((id) => {
  const [kind, leagueId] = id.split('|');
  if (kind !== 'lineup' || !/^\d+$/.test(leagueId)) return;
  chrome.tabs.create({ url: `https://sleeper.com/leagues/${leagueId}/team` });
  chrome.notifications.clear(id);
});
