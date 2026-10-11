// Ringer player names never match Sleeper's strings exactly, so both sides get
// normalized before comparison. Pure logic — also loaded by test/match-names.test.js.
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

  // "A.J. Brown Jr." -> "aj brown"
  function normalizeName(name) {
    if (!name) return '';
    return String(name)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // strip accents
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // strip periods, apostrophes, hyphens
      .split(/\s+/)
      .filter((part, index, parts) => {
        if (!part) return false;
        // Only drop a suffix when it trails a real name, so "Ivy" style names survive.
        return !(index === parts.length - 1 && index > 1 && SUFFIXES.has(part));
      })
      .join(' ')
      .trim();
  }

  // Defenses are listed by city/team rather than a person's name.
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

  /**
   * Build a lookup from Sleeper's player list.
   *
   * Two indexes: exact normalized name, plus last name + position + team. The
   * second catches nickname mismatches the first can't — The Ringer lists
   * "Kenneth Gainwell" where Sleeper has "Kenny Gainwell". Ambiguous keys are
   * kept as arrays so a tie is resolved deliberately, never guessed.
   */
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

  /**
   * Resolve one ranking entry to a Sleeper player.
   * Returns the matched player, or null when nothing is confident enough —
   * callers surface nulls in the UI rather than dropping the row.
   */
  function matchPlayer(ranking, index) {
    const position = normalizePosition(ranking.position);
    const team = (ranking.team || '').toUpperCase();
    const candidates = index.byName.get(keyFor(ranking));

    if (candidates && candidates.length === 1) return candidates[0];

    if (candidates && candidates.length > 1) {
      const byBoth = candidates.find(
        (c) => normalizePosition(c.position) === position && (c.team || '').toUpperCase() === team
      );
      if (byBoth) return byBoth;

      const byPosition = candidates.filter((c) => normalizePosition(c.position) === position);
      if (byPosition.length === 1) return byPosition[0];
      return null; // genuinely ambiguous — surface it rather than guess
    }

    // Nickname fallback: only trusted when position and team both agree and
    // exactly one player fits, so it can't quietly grab the wrong guy.
    if (!team || !position) return null;
    const fallback = index.byLastPosTeam.get(lastNameKey(ranking));
    return fallback && fallback.length === 1 ? fallback[0] : null;
  }

  const api = { normalizeName, normalizePosition, keyFor, buildIndex, matchPlayer };
  NightOwl.match = api;

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(globalThis.NightOwl);
