globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const fit = NightOwl.marketFit;
  const POSITIONS = ['QB', 'RB', 'WR', 'TE'];
  const TOP_VALUE = 10000;
  const MAX_RANK = 450;
  const PICK_YEARS_LISTED = 4;
  const PICK_TIER_FACTOR = { early: 1.08, mid: 1, late: 0.92 };
  const EXPONENT_PACKAGE = fit.gamma;
  const REPLACEMENT_RANK = 200;
  const REPLACEMENT_AGE = 26;

  function playerLog(entry, superflex) {
    const rank = entry.rank;
    const years = (entry.age - 25) / 5;
    const w = fit.w;
    let total = w[0] + w[1] * Math.log(rank) + w[2] * (rank / 100) + w[3] * years + w[4] * years * years;
    POSITIONS.forEach((position, index) => { if (entry.position === position) total += w[5 + index]; });
    if (entry.position === 'QB' && superflex) total += w[9];
    return total;
  }

  const pickLog = (round, yearsOut) => fit.w[10] + (round === 1 ? fit.w[11] : 0) + (round === 2 ? fit.w[12] : 0) + (round === 3 ? fit.w[13] : 0) + fit.w[14] * yearsOut;

  const REFERENCE = Math.max(...POSITIONS.map((position) => playerLog({ rank: 1, age: 25, position }, true)));
  const scaled = (logValue) => Math.max(1, Math.round(TOP_VALUE * Math.exp(logValue - REFERENCE)));
  const REPLACEMENT_DYNASTY = scaled(playerLog({ rank: REPLACEMENT_RANK, age: REPLACEMENT_AGE, position: 'WR' }, false));

  const isSuperflex = (slots) => slots.includes('SUPER_FLEX') || slots.filter((slot) => slot === 'QB').length > 1;

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
    const valueAt = (tier) => pickValue(picks, { year, round, tier, superflex });
    const [earlyValue, midValue, lateValue] = [valueAt('early'), valueAt('mid'), valueAt('late')];
    if (!earlyValue || !midValue || !lateValue) return 0;
    const shareOfRound = (slot - 0.5) / Math.max(1, teams);
    const lerp = (from, to, fraction) => from + (to - from) * fraction;
    if (shareOfRound <= 1 / 6) return earlyValue;
    if (shareOfRound >= 5 / 6) return lateValue;
    return shareOfRound <= 0.5 ? lerp(earlyValue, midValue, (shareOfRound - 1 / 6) / (1 / 3)) : lerp(midValue, lateValue, (shareOfRound - 0.5) / (1 / 3));
  }

  const tepTier = (scoring) => Math.max(0, Math.min(3, Math.round(((scoring && scoring.bonus_rec_te) || 0) / 0.5)));

  const valueIn = (entry, { superflex, tep }) => (superflex ? entry.s : entry.v)[entry.p === 'TE' ? tep : 0] || 0;

  const scoringFactor = (leaguePoints, pprPoints) => (leaguePoints > 0 && pprPoints > 0 ? Math.max(0.6, Math.min(1.4, leaguePoints / pprPoints)) : 1);

  function sideValue(values, exponent = EXPONENT_PACKAGE) {
    const positiveValues = values.filter((value) => value > 0);
    if (!positiveValues.length) return 0;
    return Math.round(Math.pow(positiveValues.reduce((sum, value) => sum + Math.pow(value, exponent), 0), 1 / exponent));
  }

  function packageValue(items, { exponent = EXPONENT_PACKAGE, replacement = 0 } = {}) {
    const priced = items.filter((i) => i.v > 0);
    const players = priced.filter((i) => !i.pick).sort((a, b) => b.v - a.v);
    const parts = priced.filter((i) => i.pick).map((i) => i.v)
      .concat(players.map((i, index) => (index === 0 ? i.v : Math.max(0, i.v - replacement))));
    return sideValue(parts, exponent);
  }

  function pickValues(season) {
    const out = {};
    for (let yearsOut = 1; yearsOut <= PICK_YEARS_LISTED; yearsOut++) {
      for (let round = 1; round <= 4; round++) {
        for (const tier of Object.keys(PICK_TIER_FACTOR)) {
          const value = Math.max(1, Math.round(scaled(pickLog(round, yearsOut)) * PICK_TIER_FACTOR[tier]));
          out[`${Number(season) + yearsOut}:${round}:${tier}`] = { v: value, s: value };
        }
      }
    }
    return out;
  }

  function build(listed, season) {
    const entries = {};
    for (const player of listed) {
      if (!POSITIONS.includes(player.position) || !player.searchRank || player.searchRank > MAX_RANK) continue;
      const entry = { rank: player.searchRank, age: player.age || 25, position: player.position };
      const oneQb = scaled(playerLog(entry, false));
      const superflex = scaled(playerLog(entry, true));
      entries[player.id] = { p: player.position, a: player.age || 25, v: [oneQb, oneQb, oneQb, oneQb], s: [superflex, superflex, superflex, superflex] };
    }
    return { players: entries, picks: pickValues(season) };
  }

  NightOwl.marketValues = { EXPONENT_PACKAGE, REPLACEMENT_DYNASTY, packageValue, isSuperflex, pickValues, pickTier, pickValue, pickBaseline, tepTier, valueIn, scoringFactor, sideValue, build };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.marketValues;
