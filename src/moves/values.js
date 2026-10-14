globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { season, value, ktc } = NightOwl;

  const PICK_ROUNDS = 4;
  const PICK_YEARS = 3;
  const PICK_PREMIUM = { 1: 1.1, 2: 1.05 };
  const REDRAFT_UNLISTED_CAP = 1200;

  const isPick = (pid) => String(pid).startsWith('pick:');
  const pickOf = (pid) => { const [, year, round, from] = String(pid).split(':'); return { year: Number(year), round: Number(round), from: Number(from) }; };

  function standingsRanks(rosters) {
    const pts = (ro) => ((ro.settings && ro.settings.fpts) || 0) + ((ro.settings && ro.settings.fpts_decimal) || 0) / 100;
    const order = rosters.slice().sort((a, b) => ((a.settings && a.settings.wins) || 0) - ((b.settings && b.settings.wins) || 0) || pts(a) - pts(b));
    return new Map(order.map((ro, i) => [ro.roster_id, i + 1]));
  }

  function create(state) {
    const pickSlot = (lg, rosterId) => (lg.slots && lg.slots.get(rosterId)) || lg.ranks.get(rosterId) || 1;

    const pickTierOf = (lg, pick) => (pick.year === Number(lg.raw.season) + 1 ? ktc.pickTier(pickSlot(lg, pick.from), lg.raw.rosters.length) : 'mid');

    function ownedPicks(lg) {
      const held = new Map(lg.raw.rosters.map((ro) => [ro.roster_id, []]));
      const rounds = Math.min(PICK_ROUNDS, (lg.draftRounds || PICK_ROUNDS));
      for (let year = Number(lg.raw.season) + 1; year <= Number(lg.raw.season) + PICK_YEARS; year++) {
        const owner = season.pickOwners(lg.traded, year);
        for (let round = 1; round <= rounds; round++) {
          for (const ro of lg.raw.rosters) {
            const to = owner(round, ro.roster_id);
            if (held.has(to)) held.get(to).push(`pick:${year}:${round}:${ro.roster_id}`);
          }
        }
      }
      return held;
    }

    const ordinalRound = (n) => `${n}${{ 1: 'st', 2: 'nd', 3: 'rd' }[n] || 'th'}`;

    const rosPoints = (lg, pid) => value.restOfSeason(pid, lg.weeks);
    const overReplacement = (lg, pid) => (lg.rep ? Math.max(0, lg.rep.over(pid)) : rosPoints(lg, pid));

    const usesKtc = (lg) => lg.kind !== 'redraft' && !!state.ktc;
    function dynastyValue(lg, pid) {
      lg.dyn = lg.dyn || new Map();
      if (lg.dyn.has(pid)) return lg.dyn.get(pid);
      if (isPick(pid)) {
        const pick = pickOf(pid);
        const tier = pickTierOf(lg, pick);
        const v = state.ktc ? Math.round(ktc.pickValue(state.ktc.picks, { year: pick.year, round: pick.round, tier, superflex: lg.superflex }) * (PICK_PREMIUM[pick.round] || 1)) : 0;
        lg.dyn.set(pid, v);
        return v;
      }
      const entry = state.ktc && state.ktc.players[pid];
      const out = entry ? Math.round(ktc.valueIn(entry, lg) * scoringFactor(lg, pid, state.ktc.players, 'dynasty')) : 0;
      lg.dyn.set(pid, out);
      return out;
    }

    const consensus = (lg) => lg.kind === 'redraft' && !!state.ktcRedraft;
    function redraftValue(lg, pid) {
      lg.red = lg.red || new Map();
      if (lg.red.has(pid)) return lg.red.get(pid);
      const entry = state.ktcRedraft && state.ktcRedraft.players[pid];
      let out = 0;
      if (entry) out = Math.round(ktc.valueIn(entry, lg) * scoringFactor(lg, pid, state.ktcRedraft.players, 'redraft'));
      else if (state.ktcRedraft) out = Math.min(REDRAFT_UNLISTED_CAP, Math.round(overReplacement(lg, pid) * pointValue(lg) * 0.6));
      lg.red.set(pid, out);
      return out;
    }

    const marketValue = (lg, pid) => (consensus(lg) ? redraftValue(lg, pid) : usesKtc(lg) ? blendedValue(lg, pid) : 0);

    function scoringRatio(lg, pid) {
      const plain = Object.assign({}, lg.raw.scoring, { bonus_rec_te: 0 });
      let mine = 0;
      let ppr = 0;
      for (const w of lg.weeks) {
        const row = state.stats[w.week] && state.stats[w.week][pid];
        mine += NightOwl.scoring.points(row, plain);
        ppr += (row && row.pts_ppr) || 0;
      }
      return mine > 0 && ppr > 0 ? mine / ppr : null;
    }

    function scoringFactor(lg, pid, listed, kind) {
      lg.ratioBase = lg.ratioBase || {};
      if (lg.ratioBase[kind] === undefined) {
        const ratios = Object.keys(listed).map((id) => scoringRatio(lg, id)).filter((r) => r !== null).sort((a, b) => a - b);
        lg.ratioBase[kind] = ratios.length ? ratios[Math.floor(ratios.length / 2)] : null;
      }
      const ratio = scoringRatio(lg, pid);
      return lg.ratioBase[kind] && ratio ? ktc.scoringFactor(ratio, lg.ratioBase[kind]) : 1;
    }
    const worth = (n) => Math.round(n).toLocaleString();

    const AGE_PRIME = 27;
    function windowFactor(lg, id, w) {
      if (isPick(id)) return w > 0.6 ? 0.97 : w < 0.3 ? 1.06 : 1;
      const entry = state.ktc && state.ktc.players[id];
      const age = entry && entry.a;
      if (!age) return 1;
      if (w < 0.3) return age > AGE_PRIME ? Math.max(0.7, 1 - 0.05 * (age - AGE_PRIME)) : age <= 23 ? 1.05 : 1;
      if (w > 0.6) return age > AGE_PRIME ? 1.03 : age <= 22 ? 0.97 : 1;
      return 1;
    }

    const MIX = { now: 0.45, mixed: 0.3, rebuild: 0.15 };
    const mixFor = (w) => (w > 0.6 ? MIX.now : w < 0.3 ? MIX.rebuild : MIX.mixed);
    const YOUTH_AGE = 23;
    const YOUTH_CAP = 4500;
    const YOUTH_HAIRCUT = 0.92;
    const PRODUCTION_CAP = 1.5;

    function blendedValue(lg, pid, mix = MIX.mixed) {
      const market = dynastyValue(lg, pid);
      if (!market || isPick(pid) || !lg.rep || !lg.rep.weeks.some((w) => !w.isOut(pid))) return market;
      lg.blend = lg.blend || new Map();
      const key = `${pid}:${mix}`;
      if (lg.blend.has(key)) return lg.blend.get(key);
      const production = Math.min(market * PRODUCTION_CAP, overReplacement(lg, pid) * pointValue(lg));
      let v = (1 - mix) * market + mix * production;
      const age = state.ktc && state.ktc.players[pid] && state.ktc.players[pid].a;
      if (age && age <= YOUTH_AGE && market < YOUTH_CAP) v *= YOUTH_HAIRCUT;
      v = Math.round(v);
      lg.blend.set(key, v);
      return v;
    }

    const valueFor = (lg, id, w) => blendedValue(lg, id, mixFor(w)) * windowFactor(lg, id, w);

    function pointValue(lg) {
      if (lg.pointPrice !== undefined) return lg.pointPrice;
      const listed = consensus(lg) ? state.ktcRedraft.players : state.ktc && state.ktc.players;
      const prices = [];
      for (const ro of lg.raw.rosters) {
        for (const id of ro.players || []) {
          if (!listed || !listed[id]) continue;
          const v = consensus(lg) ? redraftValue(lg, id) : dynastyValue(lg, id);
          const pts = overReplacement(lg, id);
          if (v >= 3000 && pts >= 12) prices.push(v / pts);
        }
      }
      prices.sort((a, b) => a - b);
      lg.pointPrice = prices.length ? prices[Math.floor(prices.length / 2)] : 50;
      return lg.pointPrice;
    }

    function pickAsset(lg, pick) {
      if (pick.player) return dynastyValue(lg, pick.player);
      if (pick.passed && state.ktc) {
        const chart = ktc.pickBaseline(state.ktc.picks, { round: pick.round, slot: pick.pos, teams: pick.teams, superflex: lg.superflex });
        if (chart) return Math.round(chart * (PICK_PREMIUM[pick.round] || 1));
      }
      return dynastyValue(lg, `pick:${pick.season}:${pick.round}:${pick.from}`);
    }

    function packageValue(lg, pids) {
      const items = pids.map((pid) => ({ v: marketValue(lg, pid), pick: isPick(pid) }));
      return ktc.packageValue(items, consensus(lg)
        ? { exponent: ktc.EXPONENT_REDRAFT, replacement: ktc.REPLACEMENT_REDRAFT }
        : { exponent: ktc.EXPONENT_PACKAGE, replacement: ktc.REPLACEMENT_DYNASTY });
    }

    return {
      pickAsset, packageValue, isPick, pickOf, standingsRanks, ownedPicks, pickSlot, pickTierOf, ordinalRound,
      rosPoints, overReplacement, usesKtc, consensus, dynastyValue, blendedValue, redraftValue, marketValue, valueFor, windowFactor, pointValue, worth
    };
  }

  NightOwl.moveValues = { create, isPick, pickOf, standingsRanks, PICK_ROUNDS, PICK_YEARS };
})(globalThis.NightOwl);
