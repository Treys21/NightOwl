// What things are worth in a league, for the Moves tool: draft picks (who
// holds them, where they land), KeepTradeCut values in the league's format and
// scoring, and the price of a lineup point. One valuer per view, reading the
// view's loaded state.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { season, value, ktc } = NightOwl;

  const PICK_ROUNDS = 4; // rounds KeepTradeCut prices
  const PICK_YEARS = 3; // drafts ahead that can be traded
  // KeepTradeCut prices picks a little under what managers pay for them, the first round most: a pick is
  // liquid, takes no roster spot and is the currency every contender and rebuilder in a league accepts.
  const PICK_PREMIUM = { 1: 1.1, 2: 1.05 };
  const REDRAFT_UNLISTED_CAP = 1200; // consensus value given to a player the redraft rankings don't list

  // A pick is traded like a player: its id carries the draft year, the round
  // and the roster it originally belonged to ("pick:2027:1:4").
  const isPick = (pid) => String(pid).startsWith('pick:');
  const pickOf = (pid) => { const [, year, round, from] = String(pid).split(':'); return { year: Number(year), round: Number(round), from: Number(from) }; };

  /** Standings order, worst first (rank 1 picks first): wins, then points. */
  function standingsRanks(rosters) {
    const pts = (ro) => ((ro.settings && ro.settings.fpts) || 0) + ((ro.settings && ro.settings.fpts_decimal) || 0) / 100;
    const order = rosters.slice().sort((a, b) => ((a.settings && a.settings.wins) || 0) - ((b.settings && b.settings.wins) || 0) || pts(a) - pts(b));
    return new Map(order.map((ro, i) => [ro.roster_id, i + 1]));
  }

  function create(state) {
    /**
     * Where a team's pick will land in the next draft (1 = first). The best
     * guess is the season played out 2,000 times (standings, then every
     * remaining week's projected lineups and the playoffs) and sorted by the
     * league's draft formula; until that runs, today's standings stand in.
     */
    const pickSlot = (lg, rosterId) => (lg.slots && lg.slots.get(rosterId)) || lg.ranks.get(rosterId) || 1;

    /** Early, mid or late for a pick. Only the next draft has a guessable slot; later ones are priced mid. */
    const pickTierOf = (lg, pick) => (pick.year === Number(lg.raw.season) + 1 ? ktc.pickTier(pickSlot(lg, pick.from), lg.raw.rosters.length) : 'mid');

    /** roster id -> the future picks that roster holds right now, after trades. */
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
    // Points over the free agent who would take his place: what a player really adds to a lineup.
    const overReplacement = (lg, pid) => (lg.rep ? Math.max(0, lg.rep.over(pid)) : rosPoints(lg, pid));

    // Dynasty and keeper leagues price players for the long run: KeepTradeCut's
    // value in the league's format (superflex or 1QB, tight-end premium), scaled
    // by how this league's scoring treats the player against KTC's PPR baseline
    // (projected points in the league over projected PPR points). Redraft has no
    // long run: a player is worth the points he scores here.
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

    // Redraft leagues price players on KeepTradeCut's fantasy rankings: what the
    // season-long crowd would pay for the rest of this season. The few players
    // it doesn't list are priced off their projection, capped low.
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

    /** What the market says a player is worth in this league: dynasty values for keeper and dynasty leagues, fantasy (redraft) values for redraft. 0 when the market is not loaded. */
    const marketValue = (lg, pid) => (consensus(lg) ? redraftValue(lg, pid) : usesKtc(lg) ? dynastyValue(lg, pid) : 0);

    // League points over PPR points for the rest of the season, unadjusted.
    function scoringRatio(lg, pid) {
      // Tight-end premium is already in KTC's TE+ columns: score without it.
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

    // A standard league scores every skill player below PPR; that lowers everyone
    // alike and says nothing about who is worth more. What matters is a player's
    // ratio against the league's typical one, so a receiver loses to a runner in
    // standard scoring but picks keep their value against players.
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

    // ---- a team's window ------------------------------------------------

    // Contenders pay for production now; rebuilders discount age and want picks.
    // w runs from 0 (rebuilding) to 1 (contending).
    const AGE_PRIME = 27;
    function windowFactor(lg, id, w) {
      if (isPick(id)) return w > 0.6 ? 0.97 : w < 0.3 ? 1.06 : 1; // contenders and rebuilders differ by a few percent, not the 20% that made picks the cheap thing to give
      const entry = state.ktc && state.ktc.players[id];
      const age = entry && entry.a;
      if (!age) return 1;
      if (w < 0.3) return age > AGE_PRIME ? Math.max(0.7, 1 - 0.05 * (age - AGE_PRIME)) : age <= 23 ? 1.05 : 1;
      if (w > 0.6) return age > AGE_PRIME ? 1.03 : age <= 22 ? 0.97 : 1;
      return 1;
    }

    /** KeepTradeCut value a team sees in an asset, given its window. */
    const valueFor = (lg, id, w) => dynastyValue(lg, id) * windowFactor(lg, id, w);

    /** Value units one rest-of-season lineup point over replacement is worth in this league (market value per point above a free agent, for players who matter). */
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

    return {
      isPick, pickOf, standingsRanks, ownedPicks, pickSlot, pickTierOf, ordinalRound,
      rosPoints, overReplacement, usesKtc, consensus, dynastyValue, redraftValue, marketValue, valueFor, windowFactor, pointValue, worth
    };
  }

  NightOwl.moveValues = { create, isPick, pickOf, standingsRanks, PICK_ROUNDS, PICK_YEARS };
})(globalThis.NightOwl);
