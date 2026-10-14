globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const SUFFIXES = new Set(['jr', 'sr', 'ii', 'iii', 'iv', 'v']);

  const POSITION_ALIASES = {
    'D/ST': 'DEF',
    DST: 'DEF',
    'D-ST': 'DEF',
    DEFENSE: 'DEF',
    DEF: 'DEF',
    PK: 'K',
    K: 'K'
  };

  function normalizePosition(position) {
    if (!position) return '';
    const upper = String(position).toUpperCase().trim();
    return POSITION_ALIASES[upper] || upper;
  }

  function normalizeName(name) {
    if (!name) return '';
    return String(name)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((part, index, parts) => {
        if (!part) return false;
        return !(index === parts.length - 1 && index > 1 && SUFFIXES.has(part));
      })
      .join(' ')
      .trim();
  }

  function defenseKey(name, team) {
    if (team) return `def ${String(team).toLowerCase()}`;
    return `def ${normalizeName(name).replace(/\b(defense|dst|d st)\b/g, '').trim()}`;
  }

  function keyFor(player) {
    const position = normalizePosition(player.position);
    if (position === 'DEF') return defenseKey(player.name, player.team);
    return normalizeName(player.name);
  }

  function lastNameKey(player) {
    const parts = normalizeName(player.name).split(' ');
    const last = parts[parts.length - 1] || '';
    return `${last}|${normalizePosition(player.position)}|${(player.team || '').toUpperCase()}`;
  }

  function buildIndex(sleeperPlayers) {
    const byName = new Map();
    const byLastPosTeam = new Map();

    for (const player of sleeperPlayers) {
      const key = keyFor(player);
      if (key) {
        if (!byName.has(key)) byName.set(key, []);
        byName.get(key).push(player);
      }

      const lastKey = lastNameKey(player);
      if (!byLastPosTeam.has(lastKey)) byLastPosTeam.set(lastKey, []);
      byLastPosTeam.get(lastKey).push(player);
    }

    return { byName, byLastPosTeam };
  }

  function matchPlayer(ranking, index) {
    const position = normalizePosition(ranking.position);
    const team = (ranking.team || '').toUpperCase();
    const candidates = index.byName.get(keyFor(ranking));

    if (candidates && candidates.length === 1) return candidates[0];

    if (candidates && candidates.length > 1) {
      const byBoth = candidates.find(
        (candidate) => normalizePosition(candidate.position) === position && (candidate.team || '').toUpperCase() === team
      );
      if (byBoth) return byBoth;

      const byPosition = candidates.filter((candidate) => normalizePosition(candidate.position) === position);
      if (byPosition.length === 1) return byPosition[0];
      return null;
    }

    if (!team || !position) return null;
    const fallback = index.byLastPosTeam.get(lastNameKey(ranking));
    return fallback && fallback.length === 1 ? fallback[0] : null;
  }

  const api = { normalizeName, normalizePosition, keyFor, buildIndex, matchPlayer };
  NightOwl.match = api;

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(globalThis.NightOwl);
