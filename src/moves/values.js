globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { season, value, ktc } = NightOwl;

  const PICK_ROUNDS = 4;
  const PICK_YEARS = 3;
  const PICK_PREMIUM = { 1: 1.1, 2: 1.05 };
  const REDRAFT_UNLISTED_CAP = 1200;

  const isPick = (playerId) => String(playerId).startsWith('pick:');
  const pickOf = (playerId) => { const [, year, round, from] = String(playerId).split(':'); return { year: Number(year), round: Number(round), from: Number(from) }; };

  function standingsRanks(rosters) {
    const points = (roster) => ((roster.settings && roster.settings.fpts) || 0) + ((roster.settings && roster.settings.fpts_decimal) || 0) / 100;
    const order = rosters.slice().sort((a, b) => ((a.settings && a.settings.wins) || 0) - ((b.settings && b.settings.wins) || 0) || points(a) - points(b));
    return new Map(order.map((roster, i) => [roster.roster_id, i + 1]));
  }

  function create(state) {
    const pickSlot = (league, rosterId) => (league.slots && league.slots.get(rosterId)) || league.ranks.get(rosterId) || 1;

    const pickTierOf = (league, pick) => (pick.year === Number(league.raw.season) + 1 ? ktc.pickTier(pickSlot(league, pick.from), league.raw.rosters.length) : 'mid');

    function ownedPicks(league) {
      const held = new Map(league.raw.rosters.map((roster) => [roster.roster_id, []]));
      const rounds = Math.min(PICK_ROUNDS, (league.draftRounds || PICK_ROUNDS));
      for (let year = Number(league.raw.season) + 1; year <= Number(league.raw.season) + PICK_YEARS; year++) {
        const owner = season.pickOwners(league.traded, year);
        for (let round = 1; round <= rounds; round++) {
          for (const roster of league.raw.rosters) {
            const to = owner(round, roster.roster_id);
            if (held.has(to)) held.get(to).push(`pick:${year}:${round}:${roster.roster_id}`);
          }
        }
      }
      return held;
    }

    const ordinalRound = (n) => `${n}${{ 1: 'st', 2: 'nd', 3: 'rd' }[n] || 'th'}`;

    const rosPoints = (league, playerId) => value.restOfSeason(playerId, league.weeks);
    const overReplacement = (league, playerId) => (league.rep ? Math.max(0, league.rep.over(playerId)) : rosPoints(league, playerId));

    const usesKtc = (league) => league.kind !== 'redraft' && !!state.ktc;
    function dynastyValue(league, playerId) {
      league.dyn = league.dyn || new Map();
      if (league.dyn.has(playerId)) return league.dyn.get(playerId);
      if (isPick(playerId)) {
        const pick = pickOf(playerId);
        const tier = pickTierOf(league, pick);
        const v = state.ktc ? Math.round(ktc.pickValue(state.ktc.picks, { year: pick.year, round: pick.round, tier, superflex: league.superflex }) * (PICK_PREMIUM[pick.round] || 1)) : 0;
        league.dyn.set(playerId, v);
        return v;
      }
      const entry = state.ktc && state.ktc.players[playerId];
      const out = entry ? Math.round(ktc.valueIn(entry, league) * scoringFactor(league, playerId, state.ktc.players, 'dynasty')) : 0;
      league.dyn.set(playerId, out);
      return out;
    }

    const consensus = (league) => league.kind === 'redraft' && !!state.ktcRedraft;
    function redraftValue(league, playerId) {
      league.red = league.red || new Map();
      if (league.red.has(playerId)) return league.red.get(playerId);
      const entry = state.ktcRedraft && state.ktcRedraft.players[playerId];
      let out = 0;
      if (entry) out = Math.round(ktc.valueIn(entry, league) * scoringFactor(league, playerId, state.ktcRedraft.players, 'redraft'));
      else if (state.ktcRedraft) out = Math.min(REDRAFT_UNLISTED_CAP, Math.round(overReplacement(league, playerId) * pointValue(league) * 0.6));
      league.red.set(playerId, out);
      return out;
    }

    const marketValue = (league, playerId) => (consensus(league) ? redraftValue(league, playerId) : usesKtc(league) ? blendedValue(league, playerId) : 0);

    function scoringRatio(league, playerId) {
      const plain = Object.assign({}, league.raw.scoring, { bonus_rec_te: 0 });
      let mine = 0;
      let ppr = 0;
      for (const w of league.weeks) {
        const row = state.stats[w.week] && state.stats[w.week][playerId];
        mine += NightOwl.scoring.points(row, plain);
        ppr += (row && row.pts_ppr) || 0;
      }
      return mine > 0 && ppr > 0 ? mine / ppr : null;
    }

    function scoringFactor(league, playerId, listed, kind) {
      league.ratioBase = league.ratioBase || {};
      if (league.ratioBase[kind] === undefined) {
        const ratios = Object.keys(listed).map((id) => scoringRatio(league, id)).filter((r) => r !== null).sort((a, b) => a - b);
        league.ratioBase[kind] = ratios.length ? ratios[Math.floor(ratios.length / 2)] : null;
      }
      const ratio = scoringRatio(league, playerId);
      return league.ratioBase[kind] && ratio ? ktc.scoringFactor(ratio, league.ratioBase[kind]) : 1;
    }
    const worth = (n) => Math.round(n).toLocaleString();

    const AGE_PRIME = 27;
    function windowFactor(league, id, w) {
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

    function blendedValue(league, playerId, mix = MIX.mixed) {
      const market = dynastyValue(league, playerId);
      if (!market || isPick(playerId) || !league.rep || !league.rep.weeks.some((w) => !w.isOut(playerId))) return market;
      league.blend = league.blend || new Map();
      const key = `${playerId}:${mix}`;
      if (league.blend.has(key)) return league.blend.get(key);
      const production = Math.min(market * PRODUCTION_CAP, overReplacement(league, playerId) * pointValue(league));
      let v = (1 - mix) * market + mix * production;
      const age = state.ktc && state.ktc.players[playerId] && state.ktc.players[playerId].a;
      if (age && age <= YOUTH_AGE && market < YOUTH_CAP) v *= YOUTH_HAIRCUT;
      v = Math.round(v);
      league.blend.set(key, v);
      return v;
    }

    const valueFor = (league, id, w) => blendedValue(league, id, mixFor(w)) * windowFactor(league, id, w);

    function pointValue(league) {
      if (league.pointPrice !== undefined) return league.pointPrice;
      const listed = consensus(league) ? state.ktcRedraft.players : state.ktc && state.ktc.players;
      const prices = [];
      for (const roster of league.raw.rosters) {
        for (const id of roster.players || []) {
          if (!listed || !listed[id]) continue;
          const v = consensus(league) ? redraftValue(league, id) : dynastyValue(league, id);
          const points = overReplacement(league, id);
          if (v >= 3000 && points >= 12) prices.push(v / points);
        }
      }
      prices.sort((a, b) => a - b);
      league.pointPrice = prices.length ? prices[Math.floor(prices.length / 2)] : 50;
      return league.pointPrice;
    }

    function pickAsset(league, pick) {
      if (pick.player) return dynastyValue(league, pick.player);
      if (pick.passed && state.ktc) {
        const chart = ktc.pickBaseline(state.ktc.picks, { round: pick.round, slot: pick.pos, teams: pick.teams, superflex: league.superflex });
        if (chart) return Math.round(chart * (PICK_PREMIUM[pick.round] || 1));
      }
      return dynastyValue(league, `pick:${pick.season}:${pick.round}:${pick.from}`);
    }

    function packageValue(league, pids) {
      const items = pids.map((playerId) => ({ v: marketValue(league, playerId), pick: isPick(playerId) }));
      return ktc.packageValue(items, consensus(league)
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
