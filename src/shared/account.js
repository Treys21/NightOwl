globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, storage } = NightOwl;

  const NEED_USERNAME = 'Add your Sleeper username to get started.';
  let cache = null;

  async function resolve() {
    const settings = await storage.getSettings();
    const username = (settings.username || '').trim();
    if (!username) throw new Error(NEED_USERNAME);
    if (cache && cache.username === username) return cache;

    let userId = settings.userId;
    if (!userId) {
      const user = await api.user(username);
      if (!user || !user.user_id) throw new Error(`No Sleeper user named "${username}". Check the spelling in Night Owl's settings (the toolbar icon).`);
      userId = user.user_id;
      await storage.saveSettings({ userId });
    }
    cache = { username, userId };
    return cache;
  }

  async function excluded() {
    return new Set(((await storage.get('live.settings', {})).excluded) || []);
  }

  NightOwl.account = { resolve, excluded, NEED_USERNAME };
})(globalThis.NightOwl);
