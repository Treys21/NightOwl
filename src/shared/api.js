// Every network call the extension makes, in one place. All public, read-only
// endpoints; none needs auth.
//
//   api.sleeper.app/v1   documented Sleeper API: users, leagues, rosters,
//                        matchups, drafts, players, NFL state
//   api.sleeper.com      live stat lines, projections, schedule, Picks lines
//   ESPN (site/core)     kickoff times, game odds, DraftKings props — fetched
//                        through the background worker (see background.js)
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const V1 = 'https://api.sleeper.app/v1';
  const SLEEPER_WEB = 'https://api.sleeper.com';
  const SLEEPER_APP = 'https://api.sleeper.app';
  const ESPN_SITE = 'https://site.api.espn.com/apis/site/v2/sports/football/nfl';
  const ESPN_CORE = 'https://sports.core.api.espn.com/v2/sports/football/leagues/nfl';

  // Fantasy positions requested by default; IDP rows are added only for leagues
  // that start IDP players (they are most of the payload).
  const OFFENSE = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];
  const IDP = ['DL', 'LB', 'DB'];

  // A request that never answers would hold a tool's "busy" flag forever and
  // stop its polling for good, so every request gives up after this long.
  const TIMEOUT_MS = 20000;
  const timeoutSignal = () => (typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(TIMEOUT_MS) : undefined);

  // Which feed a URL belongs to, so an outage can be named in the panel.
  /** @type {Array<[string, string, (url: string) => boolean]>} */
  const SOURCES = [
    ['picks', 'Sleeper Picks lines', (u) => u.startsWith(`${SLEEPER_APP}/lines`)],
    ['sleeper', 'Sleeper', (u) => u.startsWith(V1)],
    ['stats', 'Sleeper live stats', (u) => u.startsWith(SLEEPER_WEB)],
    ['espn', 'ESPN odds and kickoffs', (u) => u.includes('espn.com')]
  ];
  const down = new Map(); // source id -> label, while its last request failed
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
    } catch (err) {
      // Offline is not an outage of any one feed.
      if (globalThis.navigator && navigator.onLine === false) throw err;
      track(url, false);
      throw err;
    }
  }

  function getJson(url) {
    return request(url, async () => {
      const res = await fetch(url, { cache: 'no-store', signal: timeoutSignal() });
      if (!res.ok) throw new Error(`${res.status} ${url}`);
      return res.json();
    });
  }

  // ESPN refuses requests carrying a sleeper.com Origin; the background worker
  // fetches them with the extension's own. The worker itself (no document),
  // and tests outside the extension, fetch directly.
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

  const positionsQuery = (positions) => (positions && positions.length ? positions : OFFENSE)
    .map((p) => `position[]=${encodeURIComponent(p)}`).join('&');

  NightOwl.api = {
    OFFENSE,
    TIMEOUT_MS,

    /** Positions to request for leagues with these starting-slot lists: IDP rows only when someone starts them. */
    positionsFor: (slotLists) => (NightOwl.leagues.usesIdp(slotLists) ? OFFENSE.concat(IDP) : OFFENSE),

    /** Feeds whose latest request failed, as labels. Cleared on their next success. */
    unavailable: () => [...down.values()],
    /** fn(labels) whenever that list changes. */
    onAvailability: (fn) => listeners.push(fn),

    // Sleeper v1
    state: () => getJson(`${V1}/state/nfl`),
    user: (username) => getJson(`${V1}/user/${encodeURIComponent(username)}`),
    leagues: (userId, season) => getJson(`${V1}/user/${userId}/leagues/nfl/${season}`),
    rosters: (leagueId) => getJson(`${V1}/league/${leagueId}/rosters`),
    users: (leagueId) => getJson(`${V1}/league/${leagueId}/users`),
    matchups: (leagueId, week) => getJson(`${V1}/league/${leagueId}/matchups/${week}`),
    // Future picks that changed hands: [{ season, round, roster_id, owner_id, previous_owner_id }]
    tradedPicks: (leagueId) => getJson(`${V1}/league/${leagueId}/traded_picks`),
    leagueDrafts: (leagueId) => getJson(`${V1}/league/${leagueId}/drafts`),
    draft: (draftId) => getJson(`${V1}/draft/${draftId}`),
    draftPicks: (draftId) => getJson(`${V1}/draft/${draftId}/picks`),
    allPlayers: () => getJson(`${V1}/players/nfl`), // ~5 MB: use NightOwl.players

    // Sleeper web
    schedule: (season, seasonType) => getJson(`${SLEEPER_WEB}/schedule/nfl/${seasonType}/${season}`),
    // -> [{ player_id, team, game_id, stats, player: { first_name, last_name, position } }]
    weekStats: (season, week, seasonType, positions) =>
      getJson(`${SLEEPER_WEB}/stats/nfl/${season}/${week}?season_type=${seasonType}&${positionsQuery(positions)}`),
    // Same stat keys as weekStats, as forecasts.
    weekProjections: (season, week, seasonType, positions) =>
      getJson(`${SLEEPER_WEB}/projections/nfl/${season}/${week}?season_type=${seasonType}&${positionsQuery(positions)}`),
    // Season totals per team defense, including fantasy points allowed by position.
    defenseSeason: (season, seasonType) =>
      getJson(`${SLEEPER_WEB}/stats/nfl/${season}?season_type=${seasonType}&position[]=DEF`),
    // Sleeper Picks player over/unders (every sport; NightOwl.bets keeps the NFL).
    lines: () => getJson(`${SLEEPER_APP}/lines/available?sport=nfl`),

    // ESPN (via the background worker)
    async kickoffs(season, week, seasonType) {
      const type = seasonType === 'post' ? 3 : 2;
      const data = await viaBackground(`${ESPN_SITE}/scoreboard?seasontype=${type}&week=${week}&dates=${season}`);
      return data.events || [];
    },
    // League-wide injury report: { injuries: [{ injuries: [{ status, athlete }] }] }.
    injuries: () => viaBackground(`${ESPN_SITE}/injuries`),
    // DraftKings player props for one ESPN event, all pages (capped at 4).
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
