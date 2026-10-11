// chrome.storage.local, promisified, plus typed helpers for the keys more than
// one module reads. Every content script, the popup, and the tests share it.
//
// Keys: settings, rankings, lastSynced, ui — and per-tool caches prefixed
// live.*, bets.* (see each tool). Never rename a key without migrating it:
// people's saved rankings and settings live under them.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const DEFAULTS = {
    settings: { username: '', userId: null, format: 'half-ppr' },
    rankings: [], // [{ rank, name, position, team }]
    ui: {
      x: null,
      y: null,
      w: null,
      h: null,
      collapsed: false,
      tool: 'live', // 'draft' | 'live' | 'lineups' | 'bets' | 'season'
      sortBy: 'rank',
      sortDir: 'asc',
      position: 'ALL',
      hideDrafted: false
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

  const set = (items) => new Promise((resolve) => chrome.storage.local.set(items, resolve));
  const remove = (keys) => new Promise((resolve) => chrome.storage.local.remove(keys, resolve));

  async function merged(key, patch) {
    const current = Object.assign({}, DEFAULTS[key], await get(key, {}));
    if (patch) {
      Object.assign(current, patch);
      await set({ [key]: current });
    }
    return current;
  }

  // Ranks are always 1..n in array order, so reorder and delete stay consistent.
  const renumber = (rankings) => rankings.map((player, index) => Object.assign({}, player, { rank: index + 1 }));

  NightOwl.storage = {
    DEFAULTS,
    get,
    set,
    remove,
    renumber,

    getSettings: () => merged('settings'),
    saveSettings: (patch) => merged('settings', patch),
    getUi: () => merged('ui'),
    saveUi: (patch) => merged('ui', patch),

    getRankings: () => get('rankings', DEFAULTS.rankings),
    getLastSynced: () => get('lastSynced', null),
    // Never clobber a good board with an empty one: a failed sync is a no-op.
    async saveRankings(rankings, { markSynced = false } = {}) {
      if (!Array.isArray(rankings) || rankings.length === 0) return false;
      const items = { rankings: renumber(rankings) };
      if (markSynced) items.lastSynced = Date.now();
      await set(items);
      return true;
    },
    // Deliberately emptying the board (deleting every row) bypasses that guard.
    clearRankings: () => set({ rankings: [] }),

    onChanged(callback) {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local') callback(changes);
      });
    }
  };
})(globalThis.NightOwl);
