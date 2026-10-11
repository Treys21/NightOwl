// Public Sleeper endpoints (no auth). api.sleeper.app is the documented v1
// API; api.sleeper.com serves the live weekly stat lines and schedule.
globalThis.SLT = globalThis.SLT || {};

(function (SLT) {
  'use strict';

  const V1 = 'https://api.sleeper.app/v1';
  const WEB = 'https://api.sleeper.com';

  function relay(url) {
    if (!(globalThis.chrome && chrome.runtime && chrome.runtime.sendMessage)) return getJson(url);
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'slt-fetch', url }, (res) => {
        if (chrome.runtime.lastError) reject(new Error(chrome.runtime.lastError.message));
        else if (!res || !res.ok) reject(new Error((res && res.error) || 'relay failed'));
        else resolve(res.data);
      });
    });
  }

  async function getJson(url) {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    return res.json();
  }

  // Every skill position a lineup can start; IDP rows are only requested
  // when a tracked league actually starts IDP players (they are most of the payload).
  const OFFENSE = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'];

  SLT.api = {
    state: () => getJson(`${V1}/state/nfl`),
    user: (username) => getJson(`${V1}/user/${encodeURIComponent(username)}`),
    leagues: (userId, season) => getJson(`${V1}/user/${userId}/leagues/nfl/${season}`),
    rosters: (leagueId) => getJson(`${V1}/league/${leagueId}/rosters`),
    users: (leagueId) => getJson(`${V1}/league/${leagueId}/users`),
    matchups: (leagueId, week) => getJson(`${V1}/league/${leagueId}/matchups/${week}`),
    schedule: (season, seasonType) => getJson(`${WEB}/schedule/nfl/${seasonType}/${season}`),

    // -> [{ player_id, team, game_id, stats, player: { first_name, last_name, position } }]
    async weekStats(season, week, seasonType, positions) {
      const pos = (positions && positions.length ? positions : OFFENSE)
        .map((p) => `position[]=${encodeURIComponent(p)}`).join('&');
      return getJson(`${WEB}/stats/nfl/${season}/${week}?season_type=${seasonType}&${pos}`);
    },

    // Same stat keys as weekStats, as forecasts: score them with each
    // league's scoring_settings to get projected points.
    async weekProjections(season, week, seasonType, positions) {
      const pos = (positions && positions.length ? positions : OFFENSE)
        .map((p) => `position[]=${encodeURIComponent(p)}`).join('&');
      return getJson(`${WEB}/projections/nfl/${season}/${week}?season_type=${seasonType}&${pos}`);
    },

    // Sleeper's schedule only has dates; ESPN's scoreboard has kickoff times.
    // ESPN rejects a sleeper.com Origin, so the background worker fetches it.
    async kickoffs(season, week, seasonType) {
      const type = seasonType === 'post' ? 3 : 2;
      const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=${type}&week=${week}&dates=${season}`;
      const data = await relay(url);
      return data.events || [];
    },

    // Sleeper Picks lines for every sport (player over/unders with payouts and
    // recent results). Filtered to the NFL by SLT.bets.parseLines.
    lines: () => getJson(`${V1.replace('/v1', '')}/lines/available?sport=nfl`),

    // Season totals per team defense, including fantasy points allowed by position.
    defenseSeason: (season, seasonType) => getJson(`${WEB}/stats/nfl/${season}?season_type=${seasonType}&position[]=DEF`),

    // DraftKings player props for one ESPN event (all pages), via the relay.
    async propBets(eventId) {
      const base = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${eventId}/competitions/${eventId}/odds/100/propBets?limit=1000`;
      const first = await relay(base);
      const items = (first.items || []).slice();
      for (let page = 2; page <= Math.min(first.pageCount || 1, 4); page++) {
        const next = await relay(`${base}&page=${page}`);
        items.push(...(next.items || []));
      }
      return items;
    },

    OFFENSE
  };
})(globalThis.SLT);
