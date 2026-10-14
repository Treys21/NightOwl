// KeepTradeCut dynasty values: the crowd-sourced trade values most dynasty
// players quote ("a 2027 early 1st is worth 6,967"). KTC publishes no API; its
// rankings page embeds the whole table as JSON, which the background worker
// fetches (see background.js) and this module trims, matches to Sleeper
// players and caches for a day (KTC updates daily).
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const URL = 'https://keeptradecut.com/dynasty-rankings';
  const KEY = 'ktc.values.v3';
  const TTL_MS = 20 * 3600000;
  const STALE_OK_MS = 7 * 24 * 3600000; // an old table beats none when KTC is down
  // Consolidation: two 4,000s are worth less than one 6,500. A power mean of
  // the pieces reproduces that (close to KTC's own value adjustment).
  const EXPONENT = 1.5;

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
  function sideValue(values) {
    const vs = values.filter((v) => v > 0);
    if (!vs.length) return 0;
    return Math.round(Math.pow(vs.reduce((sum, v) => sum + Math.pow(v, EXPONENT), 0), 1 / EXPONENT));
  }

  /**
   * Today's values, { players: pid -> entry, picks }, from the cache when it is under a day
   * old. `fetchRows` gets the parsed table (injected: the background relay).
   */
  async function load(sleeperPlayers, fetchRows) {
    const storage = NightOwl.storage;
    const cached = await storage.get(KEY, null);
    if (cached && Date.now() - cached.at < TTL_MS) return cached.values;
    try {
      const rows = await fetchRows();
      const values = { players: matchAll(rows, sleeperPlayers), picks: pickValues(rows) };
      await storage.set({ [KEY]: { at: Date.now(), values } });
      return values;
    } catch (err) {
      if (cached && Date.now() - cached.at < STALE_OK_MS) return cached.values;
      throw err;
    }
  }

  NightOwl.ktc = { URL, parse, isSuperflex, pickValues, pickTier, pickValue, tepTier, valueIn, scoringFactor, matchAll, sideValue, load };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.ktc;
