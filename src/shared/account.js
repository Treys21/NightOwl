// Who you are: the Sleeper username from settings and its user id, resolved
// once and shared by every tool (each one used to look it up for itself).
// The username and id are saved together by the popup and the first-run form,
// so a stored id belongs to the stored name.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, storage } = NightOwl;

  const NEED_USERNAME = 'Add your Sleeper username to get started.';
  let cache = null; // { username, userId }

  /** -> { username, userId }. Throws NEED_USERNAME, or when Sleeper has no such user. */
  async function resolve() {
    const settings = await storage.getSettings();
    const username = (settings.username || '').trim();
    if (!username) throw new Error(NEED_USERNAME);
    if (cache && cache.username === username) return cache;

    let userId = settings.userId;
    if (!userId) {
      const user = await api.user(username);
      if (!user || !user.user_id) throw new Error(`No Sleeper user named "${username}"`);
      userId = user.user_id;
      await storage.saveSettings({ userId });
    }
    cache = { username, userId };
    return cache;
  }

  /** League ids the user switched off in Live's settings. */
  async function excluded() {
    return new Set(((await storage.get('live.settings', {})).excluded) || []);
  }

  NightOwl.account = { resolve, excluded, NEED_USERNAME };
})(globalThis.NightOwl);
