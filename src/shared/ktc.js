// KeepTradeCut values: the crowd-sourced trade values most players quote ("a
// 2027 early 1st is worth 6,967"). Dynasty rankings price players and picks for
// the long run; the fantasy (redraft) rankings price players for this season.
// KTC publishes no API; each rankings page embeds the whole table as JSON,
// which the background worker fetches (see background.js) and this module
// trims, matches to Sleeper players and caches for a day (KTC updates daily).
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const URLS = { dynasty: 'https://keeptradecut.com/dynasty-rankings', redraft: 'https://keeptradecut.com/fantasy-rankings' };
  const KEYS = { dynasty: 'ktc.values.v3', redraft: 'ktc.redraft.v1' };
  const TTL_MS = 20 * 3600000;
  const STALE_OK_MS = 7 * 24 * 3600000; // an old table beats none when KTC is down
  // Consolidation: two 4,000s are worth far less than one 8,000. A power mean of
  // the pieces reproduces that. The exponent was fitted to real trades (tools/backtest
  // finds the one under which real dynasty deals look most even: 2.5, against a
  // median 23% gap at 1.5). Redraft has too few trades to fit, and the waiver wire
  // replaces depth for free, so it is priced a little harder still.
  const EXPONENT = 2.5;
  const EXPONENT_REDRAFT = 3;
  // A package is priced differently from a sum: past his best player, each extra body is worth only what he
  // adds over the free agent a team would roster instead (he takes a roster spot and bumps one), and what
  // is left is consolidated by a power mean. Dynasty bench players below this are free to find; a pick
  // takes no roster spot and counts in full.
  const EXPONENT_PACKAGE = 2;
  const REPLACEMENT_DYNASTY = 2000;
  const REPLACEMENT_REDRAFT = 1000;

  const tiers = (v) => [v.value, (v.tep || v).value, (v.tepp || v).value, (v.teppp || v).value];

  /**
   * The embedded table out of the rankings page ->
   * [{ n, p, t, a, v, s }]: name, position, team, age, and the value in 1QB (v)
   * and superflex (s) leagues as [base, TE+, TE++, TE+++] (KTC prices tight-end
   * premium scoring separately: +0.5, +1 and +1.5 per TE reception).
   */
  function parse(html) {
    const m = /id="ktc-players"[^>]*>([\s\S]*?)<\/script>/.exec(html || '');
    if (!m) throw new Error('KeepTradeCut changed its page');
    const rows = JSON.parse(m[1]);
    if (!Array.isArray(rows) || !rows.length) throw new Error('KeepTradeCut returned no players');
    return rows
      .filter((r) => r.oneQBValues && r.superflexValues)
      .map((r) => ({ n: r.playerName, p: r.position, t: r.team, a: r.age, v: tiers(r.oneQBValues), s: tiers(r.superflexValues) }));
  }

  /** Does this league start two quarterbacks (superflex)? KTC publishes a value per format. */
  const isSuperflex = (slots) => slots.includes('SUPER_FLEX') || slots.filter((s) => s === 'QB').length > 1;

  // Draft picks are rows too ("2027 Early 1st"); KTC prices rounds 1-4.
  const PICK_NAME = /^(\d{4}) (Early|Mid|Late) (\d)(?:st|nd|rd|th)$/;

  /** Pick values keyed `${year}:${round}:${tier}` -> { v, s } (1QB, superflex), from the parsed rows. */
  function pickValues(rows) {
    const out = {};
    for (const r of rows) {
      const m = r.p === 'RDP' && PICK_NAME.exec(r.n);
      if (m) out[`${m[1]}:${m[3]}:${m[2].toLowerCase()}`] = { v: r.v[0], s: r.s[0] };
    }
    return out;
  }

  /**
   * Early, mid or late: where a team's pick falls in the round, from where it
   * sits in the standings (rank 1 = the worst team, who picks first).
   */
  function pickTier(rank, teams) {
    const third = Math.max(1, Math.round(teams / 3));
    return rank <= third ? 'early' : rank > teams - third ? 'late' : 'mid';
  }

  /** What KTC gives a pick, or 0 when it doesn't price that year or round. */
  function pickValue(picks, { year, round, tier, superflex }) {
    const hit = picks[`${year}:${round}:${tier}`];
    return hit ? (superflex ? hit.s : hit.v) : 0;
  }

  /** Tight-end premium tier (0-3) a league's scoring pays: +0.5 per TE reception is 1. */
  const tepTier = (scoring) => Math.max(0, Math.min(3, Math.round(((scoring && scoring.bonus_rec_te) || 0) / 0.5)));

  /** The value KTC gives a matched player in a league's format. */
  const valueIn = (entry, { superflex, tep }) => (superflex ? entry.s : entry.v)[entry.p === 'TE' ? tep : 0] || 0;

  /**
   * KTC's values assume PPR scoring. A league that pays a player's position
   * less (a receiver in standard scoring) or more (6-point passing TDs) than
   * PPR shifts his worth: scale by his projected points in the league's
   * scoring over his projected PPR points, within a believable range.
   */
  const scoringFactor = (leaguePoints, pprPoints) => (leaguePoints > 0 && pprPoints > 0 ? Math.max(0.6, Math.min(1.4, leaguePoints / pprPoints)) : 1);

  /** Sleeper pid -> { p, a, v, s } for every KTC player we can match with confidence. */
  function matchAll(rows, sleeperPlayers) {
    const { buildIndex, matchPlayer } = NightOwl.match;
    const index = buildIndex(sleeperPlayers);
    const out = {};
    for (const r of rows) {
      if (r.p === 'RDP') continue;
      const hit = matchPlayer({ name: r.n, position: r.p, team: r.t }, index);
      if (hit) out[hit.id] = { p: r.p, a: r.a, v: r.v, s: r.s };
    }
    return out;
  }

  /** Value of a trade side: the pieces' power mean, so depth doesn't buy a star. */
  function sideValue(values, exponent = EXPONENT) {
    const vs = values.filter((v) => v > 0);
    if (!vs.length) return 0;
    return Math.round(Math.pow(vs.reduce((sum, v) => sum + Math.pow(v, exponent), 0), 1 / exponent));
  }

  /**
   * What a package is worth. items: [{ v, pick }]. The best player counts in full; every other player
   * counts only above `replacement`; picks count in full. Then the power mean, so depth doesn't buy a star.
   * With no replacement it is sideValue.
   */
  function packageValue(items, { exponent = EXPONENT_PACKAGE, replacement = 0 } = {}) {
    const priced = items.filter((i) => i.v > 0);
    const players = priced.filter((i) => !i.pick).sort((a, b) => b.v - a.v);
    const parts = priced.filter((i) => i.pick).map((i) => i.v)
      .concat(players.map((i, n) => (n === 0 ? i.v : Math.max(0, i.v - replacement))));
    return sideValue(parts, exponent);
  }

  /**
   * Today's values from the cache when it is under a day old.
   *   kind         'dynasty' -> { players: pid -> entry, picks } | 'redraft' -> { players }
   *   fetchRows    (kind) -> the parsed table (injected: the background relay)
   */
  async function load(kind, sleeperPlayers, fetchRows) {
    const storage = NightOwl.storage;
    const cached = await storage.get(KEYS[kind], null);
    if (cached && Date.now() - cached.at < TTL_MS) return cached.values;
    try {
      const rows = await fetchRows(kind);
      const values = { players: matchAll(rows, sleeperPlayers) };
      if (kind === 'dynasty') values.picks = pickValues(rows);
      await storage.set({ [KEYS[kind]]: { at: Date.now(), values } });
      return values;
    } catch (err) {
      if (cached && Date.now() - cached.at < STALE_OK_MS) return cached.values;
      throw err;
    }
  }

  NightOwl.ktc = { URLS, EXPONENT_REDRAFT, EXPONENT_PACKAGE, REPLACEMENT_DYNASTY, REPLACEMENT_REDRAFT, packageValue, parse, isSuperflex, pickValues, pickTier, pickValue, tepTier, valueIn, scoringFactor, matchAll, sideValue, load };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.ktc;
