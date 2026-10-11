// The Ringer's rankings, read from the data the page ships rather than the table
// it renders.
//
// The article is a Next.js app that embeds its complete dataset in the RSC
// payload (`self.__next_f.push([...])` script tags): 424 players, each with a
// rank per scoring format, positional rank, auction value, and team. Reading
// that is exact and stable, where scraping the rendered table meant fighting
// duplicated headshot alt-text, nickname teams, and lazy client-side rendering.
//
// Note: the Google Sheet the article links for its printable PDF is a DIFFERENT
// snapshot and disagrees with the page (it had McCaffrey 4th where the page has
// Nacua). The page payload is the source of truth.
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

  // 9999 marks "unranked in this format".
  const UNRANKED = 9000;

  // The payload uses team nicknames; Sleeper uses abbreviations. Mapping here
  // keeps defense matching and tie-breaks working. (The sheet says JAC where
  // Sleeper says JAX — going through nicknames sidesteps that too.)
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

  /** Reassemble the streamed RSC payload from the page's script tags. */
  function readPayload(html) {
    let payload = '';
    let match;
    PUSH_RE.lastIndex = 0;
    while ((match = PUSH_RE.exec(html)) !== null) {
      try {
        payload += JSON.parse(match[1]);
      } catch {
        // A chunk that isn't a clean string literal is not the one we need.
      }
    }
    return payload;
  }

  /** Pull the balanced `"players":[...]` array out of the payload. */
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

  /** Auction values arrive as strings with a doubled sigil: "$$65" -> 65. */
  function parseValue(raw) {
    if (typeof raw === 'number') return raw;
    if (typeof raw !== 'string') return null;
    const digits = raw.replace(/[^0-9]/g, '');
    return digits === '' ? null : Number(digits);
  }

  /** Shape the raw payload into ranking rows for the chosen format. */
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
        // Kept for context; the board doesn't display these yet.
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

  /**
   * Fetch and parse. Runs from the popup/options page, which has host
   * permission for theringer.com — so syncing never requires visiting the site.
   */
  async function fetchRankings(format) {
    let html;
    try {
      const response = await fetch(RINGER_URL, { credentials: 'omit' });
      if (!response.ok) {
        return { ok: false, rankings: [], reason: `The Ringer returned ${response.status}.` };
      }
      html = await response.text();
    } catch {
      return { ok: false, rankings: [], reason: "Couldn't reach theringer.com." };
    }
    return parseHtml(html, format);
  }

  const api = { RINGER_URL, FORMATS, TEAM_ABBR, readPayload, extractPlayers, toRankings, parseHtml, fetchRankings };
  NightOwl.ringer = api;

  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(globalThis.NightOwl);
