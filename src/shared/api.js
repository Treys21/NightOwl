globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const V1 = 'https://api.sleeper.app/v1';
  const SLEEPER_WEB = 'https://api.sleeper.com';
  const SLEEPER_APP = 'https://api.sleeper.app';
  const ESPN_SITE = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl';
  const ESPN_CORE = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl';

  const OFFENSE = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];
  const IDP = ['DL', 'LB', 'DB'];

  const TIMEOUT_MS = 20000;
  const timeoutSignal = () => (typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(TIMEOUT_MS) : undefined);

  /** @type {Array<[string, string, (url: string) => boolean]>} */
  const SOURCES = [
    ['picks', 'Sleeper Picks lines', (u) => u.startsWith(`${SLEEPER_APP}/lines`)],
    ['sleeper', 'Sleeper', (u) => u.startsWith(V1)],
    ['stats', 'Sleeper live stats', (u) => u.startsWith(SLEEPER_WEB)],
    ['espn', 'ESPN odds and kickoffs', (u) => u.includes('espn.com')]
  ];
  const down = new Map();
  const listeners = [];

  function track(url, ok) {
    const source = SOURCES.find(([, , match]) => match(url));
    if (!source) return;
    const [id, label] = source;
    const was = down.has(id);
    if (ok) down.delete(id); else down.set(id, label);
    if (was !== down.has(id)) listeners.forEach((fn) => fn([...down.values()]));
  }

  async function request(url, load) {
    try {
      const data = await load();
      track(url, true);
      return data;
    } catch (error) {
      if (globalThis.navigator && navigator.onLine === false) throw error;
      track(url, false);
      throw error;
    }
  }

  function getJson(url) {
    return request(url, async () => {
      const res = await fetch(url, { cache: 'no-store', signal: timeoutSignal() });
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      return res.json();
    });
  }

  function viaBackground(url) {
    const inPage = typeof document !== 'undefined';
    if (!inPage || !(globalThis.chrome && chrome.runtime && chrome.runtime.sendMessage)) return getJson(url);
    return request(url, () => new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`timed out: ${url}`)), TIMEOUT_MS + 2000);
      chrome.runtime.sendMessage({ type: 'nightowl-fetch', url }, (res) => {
        clearTimeout(timer);
        if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
        else if (!res || !res.ok) reject(new Error((res && res.error) || 'background fetch failed'));
        else resolve(res.data);
      });
    }));
  }

  function ktcRows(kind) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('timed out: KeepTradeCut')), 40000);
      chrome.runtime.sendMessage({ type: 'nightowl-ktc', kind }, (res) => {
        clearTimeout(timer);
        if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
        else if (!res || !res.ok) reject(new Error((res && res.error) || 'KeepTradeCut unavailable'));
        else resolve(res.data);
      });
    });
  }

  const positionsQuery = (positions) => (positions && positions.length ? positions : OFFENSE)
    .map((p) => `position[]=${encodeURIComponent(p)}`).join('&');

  NightOwl.api = {
    OFFENSE,
    TIMEOUT_MS,

    positionsFor: (slotLists) => (NightOwl.leagues.usesIdp(slotLists) ? OFFENSE.concat(IDP) : OFFENSE),

    unavailable: () => [...down.values()],
    onAvailability: (fn) => listeners.push(fn),

    state: () => getJson(`${V1}/state/nfl`),
    user: (username) => getJson(`${V1}/user/${encodeURIComponent(username)}`),
    leagues: (userId, season) => getJson(`${V1}/user/${userId}/leagues/nfl/${season}`),
    rosters: (leagueId) => getJson(`${V1}/league/${leagueId}/rosters`),
    users: (leagueId) => getJson(`${V1}/league/${leagueId}/users`),
    matchups: (leagueId, week) => getJson(`${V1}/league/${leagueId}/matchups/${week}`),
    league: (leagueId) => getJson(`${V1}/league/${leagueId}`),
    transactions: (leagueId, week) => getJson(`${V1}/league/${leagueId}/transactions/${week}`),
    tradedPicks: (leagueId) => getJson(`${V1}/league/${leagueId}/traded_picks`),
    leagueDrafts: (leagueId) => getJson(`${V1}/league/${leagueId}/drafts`),
    draft: (draftId) => getJson(`${V1}/draft/${draftId}`),
    draftPicks: (draftId) => getJson(`${V1}/draft/${draftId}/picks`),
    allPlayers: () => getJson(`${V1}/players/nfl`),

    schedule: (season, seasonType) => getJson(`${SLEEPER_WEB}/schedule/nfl/${seasonType}/${season}`),
    weekStats: (season, week, seasonType, positions) =>
      getJson(`${SLEEPER_WEB}/stats/nfl/${season}/${week}?season_type=${seasonType}&${positionsQuery(positions)}`),
    weekProjections: (season, week, seasonType, positions) =>
      getJson(`${SLEEPER_WEB}/projections/nfl/${season}/${week}?season_type=${seasonType}&${positionsQuery(positions)}`),
    defenseSeason: (season, seasonType) =>
      getJson(`${SLEEPER_WEB}/stats/nfl/${season}?season_type=${seasonType}&position[]=DEF`),
    lines: () => getJson(`${SLEEPER_APP}/lines/available?sport=nfl`),

    ktcRows,

    async kickoffs(season, week, seasonType) {
      const type = seasonType === 'post' ? 3 : 2;
      const data = await viaBackground(`${ESPN_SITE}/scoreboard?seasontype=${type}&week=${week}&dates=${season}`);
      return data.events || [];
    },
    injuries: () => viaBackground(`${ESPN_SITE}/injuries`),
    async propBets(eventId) {
      const base = `${ESPN_CORE}/events/${eventId}/competitions/${eventId}/odds/100/propBets?limit=1000`;
      const first = await viaBackground(base);
      const items = (first.items || []).slice();
      for (let page = 2; page <= Math.min(first.pageCount || 1, 4); page++) {
        const next = await viaBackground(`${base}&page=${page}`);
        items.push(...(next.items || []));
      }
      return items;
    }
  };
})(globalThis.NightOwl);
