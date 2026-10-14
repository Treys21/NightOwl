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
            const holderId = owner(round, roster.roster_id);
            if (held.has(holderId)) held.get(holderId).push(`pick:${year}:${round}:${roster.roster_id}`);
          }
        }
      }
      return held;
    }

    const ordinalRound = (roundNumber) => `${roundNumber}${{ 1: 'st', 2: 'nd', 3: 'rd' }[roundNumber] || 'th'}`;

    const restOfSeasonPoints = (league, playerId) => value.restOfSeason(playerId, league.weeks);
    const overReplacement = (league, playerId) => (league.rep ? Math.max(0, league.rep.over(playerId)) : restOfSeasonPoints(league, playerId));

    const usesKtc = (league) => league.kind !== 'redraft' && !!state.ktc;
    function dynastyValue(league, playerId) {
      league.dyn = league.dyn || new Map();
      if (league.dyn.has(playerId)) return league.dyn.get(playerId);
      if (isPick(playerId)) {
        const pick = pickOf(playerId);
        const tier = pickTierOf(league, pick);
        const chartValue = state.ktc ? Math.round(ktc.pickValue(state.ktc.picks, { year: pick.year, round: pick.round, tier, superflex: league.superflex }) * (PICK_PREMIUM[pick.round] || 1)) : 0;
        league.dyn.set(playerId, chartValue);
        return chartValue;
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
      let pprPoints = 0;
      for (const week of league.weeks) {
        const row = state.stats[week.week] && state.stats[week.week][playerId];
        mine += NightOwl.scoring.points(row, plain);
        pprPoints += (row && row.pts_ppr) || 0;
      }
      return mine > 0 && pprPoints > 0 ? mine / pprPoints : null;
    }

    function scoringFactor(league, playerId, listed, kind) {
      league.ratioBase = league.ratioBase || {};
      if (league.ratioBase[kind] === undefined) {
        const ratios = Object.keys(listed).map((playerId) => scoringRatio(league, playerId)).filter((ratio) => ratio !== null).sort((a, b) => a - b);
        league.ratioBase[kind] = ratios.length ? ratios[Math.floor(ratios.length / 2)] : null;
      }
      const ratio = scoringRatio(league, playerId);
      return league.ratioBase[kind] && ratio ? ktc.scoringFactor(ratio, league.ratioBase[kind]) : 1;
    }
    const worth = (amount) => Math.round(amount).toLocaleString();

    const AGE_PRIME = 27;
    function windowFactor(league, assetId, contentionLevel) {
      if (isPick(assetId)) return contentionLevel > 0.6 ? 0.97 : contentionLevel < 0.3 ? 1.06 : 1;
      const entry = state.ktc && state.ktc.players[assetId];
      const age = entry && entry.a;
      if (!age) return 1;
      if (contentionLevel < 0.3) return age > AGE_PRIME ? Math.max(0.7, 1 - 0.05 * (age - AGE_PRIME)) : age <= 23 ? 1.05 : 1;
      if (contentionLevel > 0.6) return age > AGE_PRIME ? 1.03 : age <= 22 ? 0.97 : 1;
      return 1;
    }

    const MIX = { now: 0.45, mixed: 0.3, rebuild: 0.15 };
    const productionMixFor = (contentionLevel) => (contentionLevel > 0.6 ? MIX.now : contentionLevel < 0.3 ? MIX.rebuild : MIX.mixed);
    const YOUTH_AGE = 23;
    const YOUTH_CAP = 4500;
    const YOUTH_HAIRCUT = 0.92;
    const PRODUCTION_CAP = 1.5;

    function blendedValue(league, playerId, mix = MIX.mixed) {
      const market = dynastyValue(league, playerId);
      if (!market || isPick(playerId) || !league.rep || !league.rep.weeks.some((week) => !week.isOut(playerId))) return market;
      league.blend = league.blend || new Map();
      const key = `${playerId}:${mix}`;
      if (league.blend.has(key)) return league.blend.get(key);
      const production = Math.min(market * PRODUCTION_CAP, overReplacement(league, playerId) * pointValue(league));
      let blended = (1 - mix) * market + mix * production;
      const age = state.ktc && state.ktc.players[playerId] && state.ktc.players[playerId].a;
      if (age && age <= YOUTH_AGE && market < YOUTH_CAP) blended *= YOUTH_HAIRCUT;
      blended = Math.round(blended);
      league.blend.set(key, blended);
      return blended;
    }

    const valueFor = (league, assetId, contentionLevel) => blendedValue(league, assetId, productionMixFor(contentionLevel)) * windowFactor(league, assetId, contentionLevel);

    function pointValue(league) {
      if (league.pointPrice !== undefined) return league.pointPrice;
      const listed = consensus(league) ? state.ktcRedraft.players : state.ktc && state.ktc.players;
      const prices = [];
      for (const roster of league.raw.rosters) {
        for (const playerId of roster.players || []) {
          if (!listed || !listed[playerId]) continue;
          const value = consensus(league) ? redraftValue(league, playerId) : dynastyValue(league, playerId);
          const points = overReplacement(league, playerId);
          if (value >= 3000 && points >= 12) prices.push(value / points);
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

    function packageValue(league, assetIds) {
      const items = assetIds.map((playerId) => ({ v: marketValue(league, playerId), pick: isPick(playerId) }));
      return ktc.packageValue(items, consensus(league)
        ? { exponent: ktc.EXPONENT_REDRAFT, replacement: ktc.REPLACEMENT_REDRAFT }
        : { exponent: ktc.EXPONENT_PACKAGE, replacement: ktc.REPLACEMENT_DYNASTY });
    }

    return {
      pickAsset, packageValue, isPick, pickOf, standingsRanks, ownedPicks, pickSlot, pickTierOf, ordinalRound,
      restOfSeasonPoints, overReplacement, usesKtc, consensus, dynastyValue, blendedValue, redraftValue, marketValue, valueFor, windowFactor, pointValue, worth
    };
  }

  NightOwl.moveValues = { create, isPick, pickOf, standingsRanks, PICK_ROUNDS, PICK_YEARS };
})(globalThis.NightOwl);
