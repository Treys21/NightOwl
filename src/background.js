importScripts(
  'shared/numbers.js',
  'shared/storage.js',
  'shared/leagues.js',
  'shared/espn-plays.js',
  'shared/agent.js',
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

const errorMessage = (error) => String(error.message || error);

function relay(type, prepare) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (sender.id !== chrome.runtime.id || !message || message.type !== type) return false;
    const request = prepare(message);
    if (request.error) {
      sendResponse({ ok: false, error: request.error });
      return false;
    }
    fetch(request.url, { credentials: 'omit', signal: AbortSignal.timeout(request.timeout) })
      .then((response) => (response.ok ? request.read(response) : Promise.reject(new Error(request.failure(response)))))
      .then(
        (data) => sendResponse({ ok: true, data }),
        (error) => sendResponse({ ok: false, error: errorMessage(error) })
      );
    return true;
  });
}

relay('nightowl-scoring-plays', (message) => {
  const { trimScoringPlays, summaryUrl, isEventId } = globalThis.NightOwlEspnPlays;
  if (!isEventId(message.eventId)) return { error: 'bad event id' };
  return {
    url: summaryUrl(message.eventId),
    timeout: api.TIMEOUT_MS,
    read: (response) => response.json().then(trimScoringPlays),
    failure: (response) => `ESPN ${response.status}`
  };
});

relay('nightowl-fetch', (message) => {
  if (typeof message.url !== 'string') return { error: 'bad url' };
  if (!ALLOWED.some((prefix) => message.url.startsWith(prefix))) return { error: 'host not allowed' };
  return {
    url: message.url,
    timeout: api.TIMEOUT_MS,
    read: (response) => response.json(),
    failure: (response) => `${response.status} ${message.url}`
  };
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id || !message || message.type !== 'nightowl-agent') return false;
  globalThis.NightOwl.storage.getSettings().then((settings) => {
    const prepared = globalThis.NightOwl.agent.request(settings, message);
    if (prepared.error) { sendResponse({ ok: false, error: prepared.error }); return; }
    return fetch(prepared.url, Object.assign({ signal: AbortSignal.timeout(prepared.timeout) }, prepared.init))
      .then((response) => response.json().then((data) => (response.ok ? sendResponse({ ok: true, data }) : sendResponse({ ok: false, error: data && data.error === 'bad-token' ? 'The token does not match the local agent.' : (data && data.error) || `Local agent ${response.status}` }))))
      .catch((error) => sendResponse({ ok: false, error: error && error.name === 'TimeoutError' ? 'The local agent took too long.' : 'Cannot reach the local agent. Is it running?' }));
  });
  return true;
});

const ALARM = 'night-owl-lineups';
const SENT_KEY = 'alerts.sent';
const { api, storage, players, lineups, alerts, bets, leagues, account } = globalThis.NightOwl;
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

async function refreshData() {
  const settings = await storage.getSettings();
  if (!settings.username) return;
  const status = { at: Date.now(), ok: [], failed: {} };
  const attempt = async (name, work) => {
    try { await work(); status.ok.push(name); } catch (error) { status.failed[name] = String((error && error.message) || error); }
  };
  await attempt('players', () => players.load());
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
  const nflState = await api.state();
  if (nflState.season_type !== 'regular' && nflState.season_type !== 'post') return;
  const week = leagues.lookaheadWeek(nflState);
  const seasonType = leagues.seasonType(nflState);

  const games = lineups.parseGames(await api.kickoffs(nflState.season, week, seasonType));
  await saveClosingLines(games, `${nflState.season}-${seasonType}-${week}`).catch((error) => console.warn('[Night Owl lines]', error));
  if (settings.alerts === false) return;

  const { userId } = await account.resolve();
  const excluded = await account.excluded();
  const playing = (await api.leagues(userId, nflState.season)).filter((league) => leagues.isPlaying(league) && !excluded.has(league.league_id));
  if (!playing.length) return;

  const lineupsByLeague = (await Promise.all(playing.map(async (league) => {
    const [rosters, matchups] = await Promise.all([api.rosters(league.league_id), api.matchups(league.league_id, week)]);
    const roster = leagues.mine(rosters, userId);
    const set = roster && (matchups || []).find((matchup) => matchup.roster_id === roster.roster_id);
    return set ? { leagueId: league.league_id, name: league.name.trim(), starters: set.starters || [] } : null;
  }))).filter(Boolean);

  const [injuries] = await Promise.all([api.injuries().then(alerts.parseInjuries), players.load()]);
  const kickoff = new Map();
  for (const game of games) { kickoff.set(game.home, game.kickoff); kickoff.set(game.away, game.kickoff); }

  const sent = new Set(await storage.get(SENT_KEY, []));
  const found = alerts.findAlerts({
    leagues: lineupsByLeague,
    week: `${nflState.season}-${seasonType}-${week}`,
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
  if (!games.some((game) => game.kickoff > now && game.kickoff - now < LINES_WINDOW_MS)) return;
  const saved = await storage.get(LINES_KEY, null);
  const previous = saved && saved.key === key ? saved.lines : {};
  const fresh = bets.parseLines(await api.lines());
  await storage.set({ [LINES_KEY]: { key, lines: bets.mergeLines(previous, fresh) } });
}

chrome.notifications.onClicked.addListener((notificationId) => {
  const [kind, leagueId] = notificationId.split('|');
  if (kind !== 'lineup' || !/^\d+$/.test(leagueId)) return;
  chrome.tabs.create({ url: `https://sleeper.com/leagues/${leagueId}/team` });
  chrome.notifications.clear(notificationId);
});
