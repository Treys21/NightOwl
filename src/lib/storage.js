// Thin typed wrappers over chrome.storage.local. Shared by every content script
// and the popup, which all run as classic scripts in the same isolated world.
globalThis.SDR = globalThis.SDR || {};

(function (SDR) {
  'use strict';

  const KEYS = {
    rankings: 'rankings',
    settings: 'settings',
    playersCache: 'playersCache',
    ui: 'ui'
  };

  const DEFAULTS = {
    // [{ rank, name, position, team, sleeperPlayerId? }]
    rankings: [],
    lastSynced: null,
    settings: { username: '', userId: null, format: 'half-ppr' },
    // { fetchedAt, players: [{ id, name, position, team }] }
    playersCache: null,
    ui: {
      x: null,
      y: null,
      collapsed: false,
      sortBy: 'rank',
      sortDir: 'asc',
      position: 'ALL',
      hideDrafted: false,
      tool: 'live' // 'draft' | 'live' — which tool the floating panel shows
    }
  };

  function get(key, fallback) {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        const value = result[key];
        resolve(value === undefined || value === null ? fallback : value);
      });
    });
  }

  function set(items) {
    return new Promise((resolve) => chrome.storage.local.set(items, resolve));
  }

  SDR.storage = {
    KEYS,
    DEFAULTS,

    getRankings: () => get(KEYS.rankings, DEFAULTS.rankings),
    getLastSynced: () => get('lastSynced', DEFAULTS.lastSynced),

    // Never clobber a good board with an empty one — a failed scrape must be a no-op.
    async saveRankings(rankings, { markSynced = false } = {}) {
      if (!Array.isArray(rankings) || rankings.length === 0) return false;
      const items = { [KEYS.rankings]: renumber(rankings) };
      if (markSynced) items.lastSynced = Date.now();
      await set(items);
      return true;
    },

    async getSettings() {
      const stored = await get(KEYS.settings, {});
      return Object.assign({}, DEFAULTS.settings, stored);
    },
    async saveSettings(patch) {
      const current = await this.getSettings();
      await set({ [KEYS.settings]: Object.assign({}, current, patch) });
    },

    getPlayersCache: () => get(KEYS.playersCache, DEFAULTS.playersCache),
    savePlayersCache: (players) =>
      set({ [KEYS.playersCache]: { fetchedAt: Date.now(), players } }),

    async getUi() {
      const stored = await get(KEYS.ui, {});
      return Object.assign({}, DEFAULTS.ui, stored);
    },
    async saveUi(patch) {
      const current = await this.getUi();
      await set({ [KEYS.ui]: Object.assign({}, current, patch) });
    },

    onChanged(callback) {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local') callback(changes);
      });
    }
  };

  // Ranks are always 1..n in array order, so drag-reorder and delete stay consistent.
  function renumber(rankings) {
    return rankings.map((player, index) => Object.assign({}, player, { rank: index + 1 }));
  }
  SDR.storage.renumber = renumber;
})(globalThis.SDR);
