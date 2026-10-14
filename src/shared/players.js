// One compact, shared copy of Sleeper's player directory: name, position, team,
// jersey number, injury status, eligible positions, ESPN id. /players/nfl is
// ~5 MB, so it is fetched at most once a day (Sleeper's request) and cached.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const KEY = 'live.players.v4';
  const TTL_MS = 24 * 3600000;
  const FANTASY = new Set(['QB', 'RB', 'WR', 'TE', 'K', 'DEF']);

  // Earlier versions cached the directory under these keys (~5 MB each).
  const RETIRED_KEYS = ['live.players', 'live.players.v2', 'live.players.v3', 'playersCache'];

  // pid -> [name, position, team, number, injury, positionsCsv, espnId]
  let map = {};
  let ready = false;
  let loading = null;
  let espnIndex = null; // espn athlete id -> pid, built on first use

  function compact(raw) {
    const next = {};
    for (const [pid, p] of Object.entries(raw)) {
      if (!p) continue;
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
    return next;
  }

  async function fetchAll() {
    NightOwl.storage.remove(RETIRED_KEYS);
    const cached = await NightOwl.storage.get(KEY, null);
    if (cached && Date.now() - cached.at < TTL_MS) {
      map = cached.map;
    } else {
      try {
        map = compact(await NightOwl.api.allPlayers());
        await NightOwl.storage.set({ [KEY]: { at: Date.now(), map } });
      } catch (err) {
        if (!cached) throw err;
        map = cached.map; // a stale directory beats none
      }
    }
    espnIndex = null;
    ready = true;
  }

  function load() {
    if (ready) return Promise.resolve();
    loading = loading || fetchAll().finally(() => { loading = null; });
    return loading;
  }

  // Stat rows carry names for players the directory hasn't seen yet.
  function remember(pid, name, pos, team) {
    if (!map[pid]) map[pid] = [name, pos, team, '', '', pos, ''];
  }

  function info(pid) {
    const p = map[pid];
    if (p) {
      return {
        name: p[0], pos: p[1], team: p[2], number: p[3] || '',
        injury: p[4] || null, positions: p[5] ? p[5].split(',') : [p[1]]
      };
    }
    const def = NightOwl.teams.isDefenseId(pid);
    return { name: pid, pos: def ? 'DEF' : '', team: def ? pid : '', number: '', injury: null, positions: def ? ['DEF'] : [] };
  }

  /** Fantasy-relevant players as [{ id, name, position, team }] (for name matching). */
  function list() {
    const out = [];
    for (const [id, p] of Object.entries(map)) {
      const position = p[1] || (p[5] ? p[5].split(',')[0] : '');
      if (FANTASY.has(position)) out.push({ id, name: p[0], position, team: p[2] });
    }
    return out;
  }

  /** Sleeper player id for an ESPN athlete id (ESPN props are keyed that way). */
  function byEspn(espnId) {
    if (!espnIndex) {
      espnIndex = new Map();
      for (const [pid, p] of Object.entries(map)) if (p[6]) espnIndex.set(p[6], pid);
    }
    return espnIndex.get(String(espnId)) || null;
  }

  /** ESPN athlete id for a Sleeper player id, or ''. */
  const espnId = (pid) => (map[pid] && map[pid][6]) || '';

  NightOwl.players = { load, info, list, remember, byEspn, espnId };
})(globalThis.NightOwl);
