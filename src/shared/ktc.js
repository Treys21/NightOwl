globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const URLS = { dynasty: 'https://keeptradecut.com/dynasty-rankings', redraft: 'https://keeptradecut.com/fantasy-rankings' };
  const KEYS = { dynasty: 'ktc.values.v3', redraft: 'ktc.redraft.v1' };
  const TTL_MS = 20 * 3600000;
  const STALE_OK_MS = 7 * 24 * 3600000;
  const EXPONENT = 2.5;
  const EXPONENT_REDRAFT = 3;
  const EXPONENT_PACKAGE = 2;
  const REPLACEMENT_DYNASTY = 2000;
  const REPLACEMENT_REDRAFT = 1000;

  const tiers = (v) => [v.value, (v.tep || v).value, (v.tepp || v).value, (v.teppp || v).value];

  function parse(html) {
    const m = /id="ktc-players"[^>]*>([\s\S]*?)<\/script>/.exec(html || '');
    if (!m) throw new Error('KeepTradeCut changed its page');
    const rows = JSON.parse(m[1]);
    if (!Array.isArray(rows) || !rows.length) throw new Error('KeepTradeCut returned no players');
    return rows
      .filter((r) => r.oneQBValues && r.superflexValues)
      .map((r) => ({ n: r.playerName, p: r.position, t: r.team, a: r.age, v: tiers(r.oneQBValues), s: tiers(r.superflexValues) }));
  }

  const isSuperflex = (slots) => slots.includes('SUPER_FLEX') || slots.filter((s) => s === 'QB').length > 1;

  const PICK_NAME = /^(\d{4}) (Early|Mid|Late) (\d)(?:st|nd|rd|th)$/;

  function pickValues(rows) {
    const out = {};
    for (const r of rows) {
      const m = r.p === 'RDP' && PICK_NAME.exec(r.n);
      if (m) out[`${m[1]}:${m[3]}:${m[2].toLowerCase()}`] = { v: r.v[0], s: r.s[0] };
    }
    return out;
  }

  function pickTier(rank, teams) {
    const third = Math.max(1, Math.round(teams / 3));
    return rank <= third ? 'early' : rank > teams - third ? 'late' : 'mid';
  }

  function pickValue(picks, { year, round, tier, superflex }) {
    const hit = picks[`${year}:${round}:${tier}`];
    return hit ? (superflex ? hit.s : hit.v) : 0;
  }

  function pickBaseline(picks, { round, slot, teams, superflex }) {
    const year = Object.keys(picks).filter((k) => k.split(':')[1] === String(round)).map((k) => k.split(':')[0]).sort()[0];
    if (!year) return 0;
    const at = (tier) => pickValue(picks, { year, round, tier, superflex });
    const [early, mid, late] = [at('early'), at('mid'), at('late')];
    if (!early || !mid || !late) return 0;
    const t = (slot - 0.5) / Math.max(1, teams);
    const lerp = (a, b, x) => a + (b - a) * x;
    if (t <= 1 / 6) return early;
    if (t >= 5 / 6) return late;
    return t <= 0.5 ? lerp(early, mid, (t - 1 / 6) / (1 / 3)) : lerp(mid, late, (t - 0.5) / (1 / 3));
  }

  const tepTier = (scoring) => Math.max(0, Math.min(3, Math.round(((scoring && scoring.bonus_rec_te) || 0) / 0.5)));

  const valueIn = (entry, { superflex, tep }) => (superflex ? entry.s : entry.v)[entry.p === 'TE' ? tep : 0] || 0;

  const scoringFactor = (leaguePoints, pprPoints) => (leaguePoints > 0 && pprPoints > 0 ? Math.max(0.6, Math.min(1.4, leaguePoints / pprPoints)) : 1);

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

  function sideValue(values, exponent = EXPONENT) {
    const vs = values.filter((v) => v > 0);
    if (!vs.length) return 0;
    return Math.round(Math.pow(vs.reduce((sum, v) => sum + Math.pow(v, exponent), 0), 1 / exponent));
  }

  function packageValue(items, { exponent = EXPONENT_PACKAGE, replacement = 0 } = {}) {
    const priced = items.filter((i) => i.v > 0);
    const players = priced.filter((i) => !i.pick).sort((a, b) => b.v - a.v);
    const parts = priced.filter((i) => i.pick).map((i) => i.v)
      .concat(players.map((i, n) => (n === 0 ? i.v : Math.max(0, i.v - replacement))));
    return sideValue(parts, exponent);
  }

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

  NightOwl.ktc = { URLS, EXPONENT_REDRAFT, EXPONENT_PACKAGE, REPLACEMENT_DYNASTY, REPLACEMENT_REDRAFT, packageValue, parse, isSuperflex, pickValues, pickTier, pickValue, pickBaseline, tepTier, valueIn, scoringFactor, matchAll, sideValue, load };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.ktc;
