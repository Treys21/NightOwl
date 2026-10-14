globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const KEY = 'live.players.v4';
  const TTL_MS = 24 * 3600000;
  const FANTASY = new Set(['QB', 'RB', 'WR', 'TE', 'K', 'DEF']);

  const RETIRED_KEYS = ['live.players', 'live.players.v2', 'live.players.v3', 'playersCache'];

  let map = {};
  let ready = false;
  let loading = null;
  let espnIndex = null;

  function compact(raw) {
    const next = {};
    for (const [playerId, rawPlayer] of Object.entries(raw)) {
      if (!rawPlayer) continue;
      const name = rawPlayer.position === 'DEF'
        ? `${rawPlayer.first_name} ${rawPlayer.last_name}`
        : (rawPlayer.full_name || `${rawPlayer.first_name || ''} ${rawPlayer.last_name || ''}`.trim());
      next[playerId] = [
        name,
        rawPlayer.position || '',
        rawPlayer.team || '',
        rawPlayer.number == null ? '' : String(rawPlayer.number),
        rawPlayer.injury_status || '',
        (rawPlayer.fantasy_positions || []).join(','),
        rawPlayer.espn_id == null ? '' : String(rawPlayer.espn_id)
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
      } catch (error) {
        if (!cached) throw error;
        map = cached.map;
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

  function remember(playerId, name, position, team) {
    if (!map[playerId]) map[playerId] = [name, position, team, '', '', position, ''];
  }

  function info(playerId) {
    const entry = map[playerId];
    if (entry) {
      return {
        name: entry[0], pos: entry[1], team: entry[2], number: entry[3] || '',
        injury: entry[4] || null, positions: entry[5] ? entry[5].split(',') : [entry[1]]
      };
    }
    const def = NightOwl.teams.isDefenseId(playerId);
    return { name: playerId, pos: def ? 'DEF' : '', team: def ? playerId : '', number: '', injury: null, positions: def ? ['DEF'] : [] };
  }

  function list() {
    const out = [];
    for (const [playerId, entry] of Object.entries(map)) {
      const position = entry[1] || (entry[5] ? entry[5].split(',')[0] : '');
      if (FANTASY.has(position)) out.push({ id: playerId, name: entry[0], position, team: entry[2] });
    }
    return out;
  }

  function byEspn(espnId) {
    if (!espnIndex) {
      espnIndex = new Map();
      for (const [playerId, entry] of Object.entries(map)) if (entry[6]) espnIndex.set(entry[6], playerId);
    }
    return espnIndex.get(String(espnId)) || null;
  }

  const espnId = (playerId) => (map[playerId] && map[playerId][6]) || '';

  NightOwl.players = { load, info, list, remember, byEspn, espnId };
})(globalThis.NightOwl);
