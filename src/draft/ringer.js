globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const RINGER_URL = 'https://theringer.com/fantasy-football/2026-preseason';

  const FORMATS = [
    { id: 'half-ppr', label: 'Half PPR' },
    { id: 'ppr', label: 'PPR' },
    { id: 'zero-ppr', label: 'Zero PPR' },
    { id: 'superflex', label: 'Superflex' }
  ];

  const UNRANKED = 9000;

  const TEAM_ABBR = {
    '49ers': 'SF', Bears: 'CHI', Bengals: 'CIN', Bills: 'BUF', Broncos: 'DEN',
    Browns: 'CLE', Buccaneers: 'TB', Cardinals: 'ARI', Chargers: 'LAC', Chiefs: 'KC',
    Colts: 'IND', Commanders: 'WAS', Cowboys: 'DAL', Dolphins: 'MIA', Eagles: 'PHI',
    Falcons: 'ATL', Giants: 'NYG', Jaguars: 'JAX', Jets: 'NYJ', Lions: 'DET',
    Packers: 'GB', Panthers: 'CAR', Patriots: 'NE', Raiders: 'LV', Rams: 'LAR',
    Ravens: 'BAL', Saints: 'NO', Seahawks: 'SEA', Steelers: 'PIT', Texans: 'HOU',
    Titans: 'TEN', Vikings: 'MIN'
  };

  const PUSH_RE = /self\.__next_f\.push\(\[\d+,("(?:[^"\\]|\\[\s\S])*")\]\)/g;

  function parseJsonOrNull(text) {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  function readPayload(html) {
    let payload = '';
    let match;
    PUSH_RE.lastIndex = 0;
    while ((match = PUSH_RE.exec(html)) !== null) {
      const chunk = parseJsonOrNull(match[1]);
      if (chunk !== null) payload += chunk;
    }
    return payload;
  }

  function extractPlayers(payload) {
    const key = payload.indexOf('"players":[');
    if (key === -1) return null;

    const start = payload.indexOf('[', key);
    let depth = 0;
    let inString = false;
    let escaped = false;

    for (let i = start; i < payload.length; i++) {
      const char = payload[i];

      if (escaped) { escaped = false; continue; }
      if (char === '\\') { escaped = true; continue; }
      if (char === '"') { inString = !inString; continue; }
      if (inString) continue;

      if (char === '[') depth++;
      else if (char === ']') {
        depth--;
        if (depth === 0) {
          try {
            return JSON.parse(payload.slice(start, i + 1));
          } catch {
            return null;
          }
        }
      }
    }
    return null;
  }

  function parseValue(raw) {
    if (typeof raw === 'number') return raw;
    if (typeof raw !== 'string') return null;
    const digits = raw.replace(/[^0-9]/g, '');
    return digits === '' ? null : Number(digits);
  }

  function toRankings(players, format) {
    return players
      .filter((player) => {
        const rank = player.rankings && player.rankings[format];
        return typeof rank === 'number' && rank < UNRANKED;
      })
      .sort((a, b) => a.rankings[format] - b.rankings[format])
      .map((player) => ({
        rank: player.rankings[format],
        name: player.name,
        position: (player.position || '').toUpperCase(),
        team: TEAM_ABBR[player.team] || '',
        positionRank: (player.positionalRankings && player.positionalRankings[format]) || null,
        value: parseValue(player.auctionValues && player.auctionValues[format])
      }));
  }

  function parseHtml(html, format) {
    const players = extractPlayers(readPayload(html));
    if (!players || players.length === 0) {
      return { ok: false, rankings: [], reason: "Couldn't find the rankings data in the page." };
    }

    const rankings = toRankings(players, format);
    if (rankings.length === 0) {
      return { ok: false, rankings: [], reason: `No players ranked for ${format}.` };
    }
    return { ok: true, rankings };
  }

  async function fetchRankings(format) {
    let html;
    try {
      const response = await fetch(RINGER_URL, { credentials: 'omit', signal: AbortSignal.timeout(20000) });
      if (!response.ok) {
        return { ok: false, rankings: [], reason: `The Ringer returned ${response.status}.` };
      }
      html = await response.text();
    } catch {
      return { ok: false, rankings: [], reason: "Couldn't reach theringer.com." };
    }
    return parseHtml(html, format);
  }

  const fingerprint = (rankings) => (rankings || []).map((r) => `${r.name}|${r.position}`);

  function isUntouched(current, synced) {
    if (!current || !current.length) return true;
    const now = fingerprint(current);
    return Array.isArray(synced) && synced.length === now.length && synced.every((k, i) => k === now[i]);
  }

  const api = { RINGER_URL, fingerprint, isUntouched, FORMATS, TEAM_ABBR, readPayload, extractPlayers, toRankings, parseHtml, fetchRankings };
  NightOwl.ringer = api;

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(globalThis.NightOwl);
