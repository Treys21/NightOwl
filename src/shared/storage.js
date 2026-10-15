globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const DEFAULTS = {
    settings: { username: '', userId: null, format: 'half-ppr', alerts: true, agent: { url: 'http://127.0.0.1:8787', token: '' } },
    rankings: [],
    ui: {
      x: null,
      y: null,
      w: null,
      h: null,
      collapsed: false,
      tool: 'live',
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

  const set = (items) => new Promise((resolve) => chrome.storage.local.set(items, () => resolve()));
  const remove = (keys) => new Promise((resolve) => chrome.storage.local.remove(keys, () => resolve()));

  async function merged(key, patch) {
    const current = Object.assign({}, DEFAULTS[key], await get(key, {}));
    if (patch) {
      Object.assign(current, patch);
      await set({ [key]: current });
    }
    return current;
  }

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
    async saveRankings(rankings, { markSynced = false } = {}) {
      if (!Array.isArray(rankings) || rankings.length === 0) return false;
      const items = { rankings: renumber(rankings) };
      if (markSynced) {
        items.lastSynced = Date.now();
        items['ringer.synced'] = items.rankings.map((ranking) => `${ranking.name}|${ranking.position}`);
      }
      await set(items);
      return true;
    },
    clearRankings: () => set({ rankings: [] }),

    onChanged(callback) {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local') callback(changes);
      });
    }
  };
})(globalThis.NightOwl);
