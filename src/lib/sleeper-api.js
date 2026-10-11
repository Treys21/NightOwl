// All Sleeper API access. The public API sends `access-control-allow-origin: *`,
// so content scripts can call it directly — no background relay needed.
globalThis.SDR = globalThis.SDR || {};

(function (SDR) {
  'use strict';

  const BASE = 'https://api.sleeper.app/v1';
  const FANTASY_POSITIONS = new Set(['QB', 'RB', 'WR', 'TE', 'K', 'DEF']);
  const PLAYERS_TTL_MS = 24 * 60 * 60 * 1000; // players/nfl is multi-MB; once a day is plenty

  async function getJson(path) {
    const response = await fetch(`${BASE}${path}`);
    if (!response.ok) throw new Error(`Sleeper API ${response.status} for ${path}`);
    return response.json();
  }

  const api = {
    getUser: (username) => getJson(`/user/${encodeURIComponent(username)}`),
    getLeagueDrafts: (leagueId) => getJson(`/league/${leagueId}/drafts`),
    getDraft: (draftId) => getJson(`/draft/${draftId}`),
    getDraftPicks: (draftId) => getJson(`/draft/${draftId}/picks`),

    /**
     * Full player dictionary, trimmed to the fields the board needs and cached.
     * Refetching this on every page load would be several megabytes each time.
     */
    async getPlayers({ force = false } = {}) {
      const cached = await SDR.storage.getPlayersCache();
      const fresh = cached && Date.now() - cached.fetchedAt < PLAYERS_TTL_MS;
      if (cached && fresh && !force) return cached.players;

      try {
        const raw = await getJson('/players/nfl');
        const players = reducePlayers(raw);
        await SDR.storage.savePlayersCache(players);
        return players;
      } catch (error) {
        // A stale cache beats no board at all.
        if (cached) return cached.players;
        throw error;
      }
    },

    /** Slot this user drafts from, or null if they aren't in this draft. */
    slotForUser(draft, userId) {
      const order = draft && draft.draft_order;
      if (!order || !userId) return null;
      const slot = order[userId];
      return typeof slot === 'number' ? slot : null;
    },

    /**
     * Which slot is on the clock for a given overall pick number (1-indexed).
     * Snake drafts reverse direction on even rounds.
     */
    slotOnClock(draft, overallPick) {
      const teams = draft && draft.settings && draft.settings.teams;
      if (!teams) return null;
      const round = Math.ceil(overallPick / teams);
      const indexInRound = ((overallPick - 1) % teams) + 1;
      const isSnake = draft.type === 'snake';
      const reversed = isSnake && round % 2 === 0;
      return reversed ? teams - indexInRound + 1 : indexInRound;
    }
  };

  function reducePlayers(raw) {
    const players = [];
    for (const id of Object.keys(raw)) {
      const player = raw[id];
      if (!player) continue;
      const position = player.position || player.fantasy_positions?.[0];
      if (!FANTASY_POSITIONS.has(position)) continue;
      players.push({
        id,
        name: player.full_name || `${player.first_name || ''} ${player.last_name || ''}`.trim(),
        position,
        team: player.team || ''
      });
    }
    return players;
  }

  SDR.api = api;

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(globalThis.SDR);
