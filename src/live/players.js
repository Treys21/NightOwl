// Shared, compact copy of Sleeper's player directory for the Live and Lineups
// tools: name, position, team, jersey number, injury, eligible positions.
// /players/nfl is ~5MB, so it's fetched at most once a day (Sleeper's ask).
globalThis.SLT = globalThis.SLT || {};

(function (SLT) {
  'use strict';

  const KEY = 'live.players.v4';
  const TTL_MS = 24 * 3600000;
  const TEAM_CODE = /^[A-Z]{2,3}$/;
  let map = {};
  let loading = null;
  let espnIndex = null; // espn athlete id -> sleeper pid, built on first use

  const store = {
    get: (key) => new Promise((resolve) => chrome.storage.local.get(key, (r) => resolve(r[key]))),
    set: (items) => new Promise((resolve) => chrome.storage.local.set(items, resolve))
  };

  // Earlier versions cached the directory under these keys (~5MB each).
  chrome.storage.local.remove(['live.players', 'live.players.v2', 'live.players.v3']);

  async function fetchAll() {
    const cached = await store.get(KEY);
    if (cached && Date.now() - cached.at < TTL_MS) {
      map = cached.map;
      espnIndex = null;
      return;
    }
    const res = await fetch('https://api.sleeper.app/v1/players/nfl');
    if (!res.ok) throw new Error(`players ${res.status}`);
    const raw = await res.json();
    const next = {};
    for (const [pid, p] of Object.entries(raw)) {
      const name = p.position === 'DEF'
        ? `${p.first_name} ${p.last_name}`
        : (p.full_name || `${p.first_name || ''} ${p.last_name || ''}`.trim());
      next[pid] = [
        name,
        p.position || '',
        p.team || '',
        p.number == null ? '' : String(p.number),
        p.injury_status || '',
        (p.fantasy_positions || []).join(','),
        p.espn_id == null ? '' : String(p.espn_id)
      ];
    }
    map = next;
    espnIndex = null;
    await store.set({ [KEY]: { at: Date.now(), map } });
  }

  function load() {
    if (Object.keys(map).length) return Promise.resolve();
    loading = loading || fetchAll().finally(() => { loading = null; });
    return loading;
  }

  // Stat rows carry names for players the directory hasn't seen yet.
  function remember(pid, name, pos, team) {
    if (!map[pid]) map[pid] = [name, pos, team, '', '', pos];
  }

  function info(pid) {
    const p = map[pid];
    if (p) {
      return {
        name: p[0], pos: p[1], team: p[2], number: p[3] || '',
        injury: p[4] || null, positions: p[5] ? p[5].split(',') : [p[1]]
      };
    }
    const def = TEAM_CODE.test(pid);
    return { name: pid, pos: def ? 'DEF' : '', team: def ? pid : '', number: '', injury: null, positions: def ? ['DEF'] : [] };
  }

  // Sleeper player id for an ESPN athlete id (ESPN props are keyed that way).
  function byEspn(espnId) {
    if (!espnIndex) {
      espnIndex = new Map();
      for (const [pid, p] of Object.entries(map)) if (p[6]) espnIndex.set(p[6], pid);
    }
    return espnIndex.get(String(espnId)) || null;
  }

  SLT.players = { load, info, remember, byEspn, loaded: () => Object.keys(map).length > 0 };
})(globalThis.SLT);
