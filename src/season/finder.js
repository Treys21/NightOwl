globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { lineupPoints, tradeImpact } = NightOwl.value;
  const { optimal } = NightOwl.season;
  const NOT_STARTING = new Set(['BN', 'IR', 'TAXI']);

  const SIDE_SHOWN = 7;
  const PICKS_SHOWN = 3;
  const KEEP_PER_PARTNER = 4;
  const EXACT_PER_PARTNER = 18;
  const NOT_TRADE_CHIPS = new Set(['K', 'DEF']);
  const DEAD_WEIGHT = 0.12;
  const REBUILDING_BELOW = 0.3;
  const DEFAULT_AGE_LIMIT = 28;
  const AGE_LIMIT_BY_POSITION = { QB: 33, RB: 26, WR: 28, TE: 29 };

  const DEFAULTS = {
    fairTolerance: 0.12,
    fairToleranceRedraft: 0.1,
    overpay: { balanced: 0.2, now: 0.3, future: 0.15 },
    overpayRedraft: { balanced: 0.07, now: 0.12, future: 0.07 },
    minUtility: { me: 0.03, them: 0.02 },
    minPoints: { me: 5, them: 3 },
    minValue: { rebuild: 0.04, mixed: 0.05 },
    mixedFloor: 0.03,
    outOfIt: 0.25
  };
  const paramsOf = (context) => Object.assign({}, DEFAULTS, context.params || {});
  const FAIR_TOLERANCE = DEFAULTS.fairTolerance;
  const FAIR_TOLERANCE_REDRAFT = DEFAULTS.fairToleranceRedraft;

  const contention = (playoffOdds) => Math.max(0, Math.min(1, ((playoffOdds || 0) - 0.1) / 0.5));
  const lambdaOf = (contentionWindow) => 0.45 * contentionWindow - 0.15 * (1 - contentionWindow);
  const motivationOf = (contentionWindow) => 0.45 + 0.55 * contentionWindow;

  const sum = (values) => values.reduce((total, value) => total + value, 0);

  function subsets(items, max) {
    const out = [];
    const walk = (start, picked) => {
      if (picked.length) out.push(picked.slice());
      if (picked.length === max) return;
      for (let i = start; i < items.length; i++) { picked.push(items[i]); walk(i + 1, picked); picked.pop(); }
    };
    walk(0, []);
    return out;
  }

  function dropLosses(team, context) {
    const base = lineupPoints(context.slots, team.pool, context.weeks, context.positionsOf).total;
    const out = new Map();
    for (const playerId of team.pool) {
      if (context.isVirtual && context.isVirtual(playerId)) continue;
      out.set(playerId, Math.max(0, base - lineupPoints(context.slots, team.pool.filter((otherPlayer) => otherPlayer !== playerId), context.weeks, context.positionsOf).total));
    }
    return { base, out };
  }

  function addGains(team, base, playerIds, context) {
    const out = new Map();
    for (const playerId of playerIds) {
      out.set(playerId, Math.max(0, lineupPoints(context.slots, team.pool.concat(playerId), context.weeks, context.positionsOf).total - base));
    }
    return out;
  }

  const valueWeight = (contentionWindow) => 0.1 + 0.5 * (1 - contentionWindow);

  function valueGain(context, team, contentionWindow, give, get) {
    const valueOfAsset = (assetId) => context.valueOf(team, assetId, contentionWindow);
    return context.sideValue(get.map(valueOfAsset), get.map(context.isPick)) - context.sideValue(give.map(valueOfAsset), give.map(context.isPick));
  }

  function utility(context, team, contentionWindow, give, get, pointChange) {
    if (context.mode === 'redraft') {
      const gain = context.consensus ? valueGain(context, team, contentionWindow, give, get) / context.pointValue : 0;
      return pointChange * motivationOf(contentionWindow) + valueWeight(contentionWindow) * gain;
    }
    return valueGain(context, team, contentionWindow, give, get) + lambdaOf(contentionWindow) * context.pointValue * pointChange;
  }

  function worthIt(context, contentionWindow, goal, pointChange, valueChange, size, side) {
    const limits = paramsOf(context);
    if (context.mode === 'redraft') {
      if (!context.consensus) return pointChange >= (side === 'me' ? limits.minPoints.me : limits.minPoints.them);
      if (contentionWindow < limits.outOfIt) return valueChange >= limits.minValue.rebuild * size;
      return pointChange >= (side === 'me' ? limits.minPoints.me : limits.minPoints.them);
    }
    const stance = goal === 'now' ? 'now' : goal === 'future' ? 'rebuild' : contentionWindow >= 0.6 ? 'now' : contentionWindow < 0.3 ? 'rebuild' : 'mixed';
    if (stance === 'now') return pointChange >= limits.minPoints.me;
    if (stance === 'rebuild') return valueChange >= limits.minValue.rebuild * size;
    return (pointChange >= limits.minPoints.me && valueChange >= -limits.mixedFloor * size) || valueChange >= limits.minValue.mixed * size;
  }

  function startsAmong(context, pool, incomingPlayerIds) {
    const starting = context.slots.filter((slot) => !NOT_STARTING.has(slot));
    const seen = new Map(incomingPlayerIds.map((playerId) => [playerId, new Map()]));
    for (const week of context.weeks) {
      const best = optimal(context.slots, pool, (playerId) => (week.isOut(playerId) ? 0 : week.projOf(playerId)), context.positionsOf);
      best.starters.forEach((playerId, i) => {
        if (playerId && seen.has(playerId)) seen.get(playerId).set(starting[i], (seen.get(playerId).get(starting[i]) || 0) + 1);
      });
    }
    const out = [];
    for (const [playerId, slots] of seen) {
      const weeks = sum([...slots.values()]);
      if (!weeks) continue;
      const slot = [...slots.entries()].sort((a, b) => b[1] - a[1])[0][0];
      out.push({ id: playerId, slot, weeks });
    }
    return out.sort((a, b) => b.weeks - a.weeks);
  }

  function priceGate(context, limits, goal, rawGive, rawGet) {
    const size = Math.max(rawGive, rawGet, 1);
    if ((rawGive - rawGet) / size < -(context.mode === 'redraft' ? limits.fairToleranceRedraft : context.fairTolerance || limits.fairTolerance)) return 'theyLose';
    if ((rawGet - rawGive) / size < -(context.mode === 'redraft' ? limits.overpayRedraft : limits.overpay)[goal]) return 'youOverpay';
    return null;
  }

  function exactGate(context, limits, goal, sides) {
    const { wMe: myWindow, wThem: theirWindow, size, uMe: myUtility, uThem: theirUtility, dMe: myPointChange, dThem: theirPointChange, vMe: myValueChange, vThem: theirValueChange } = sides;
    if (context.mode === 'redraft' && !context.consensus) {
      if (myPointChange < limits.minPoints.me || theirPointChange < limits.minPoints.them) return 'noUpgrade';
      return null;
    }
    const scale = context.mode === 'redraft' ? 0 : 1;
    if (myUtility < limits.minUtility.me * size * scale || theirUtility < limits.minUtility.them * size * scale) return 'exactUtility';
    if (!worthIt(context, myWindow, goal, myPointChange, myValueChange, size, 'me')) return 'notWorthMe';
    if (!worthIt(context, theirWindow, 'balanced', theirPointChange, theirValueChange, size, 'them')) return 'notWorthThem';
    return null;
  }

  function judge(context, myTeam, partner, give, get) {
    const limits = paramsOf(context);
    const goal = context.goal || 'balanced';
    const myWindow = goal === 'now' ? 1 : goal === 'future' ? 0 : myTeam.w;
    const theirWindow = partner.w;
    const players = (assetIds) => assetIds.filter((assetId) => !context.isPick(assetId));
    const rawPrice = (assetIds) => context.sideValue(assetIds.map((assetId) => context.rawOf(assetId)), assetIds.map(context.isPick));
    const rawGive = rawPrice(give);
    const rawGet = rawPrice(get);
    const size = Math.max(rawGive, rawGet, 1);
    const rawNetThem = (rawGive - rawGet) / size;
    const impact = tradeImpact({
      slots: context.slots, weeks: context.weeks, positionsOf: context.positionsOf,
      a: { pool: myTeam.pool }, b: { pool: partner.pool }, aGives: players(give), bGives: players(get)
    });
    const myUtility = utility(context, myTeam, myWindow, give, get, impact.a.delta);
    const theirUtility = utility(context, partner, theirWindow, get, give, impact.b.delta);
    const reason = priceGate(context, limits, goal, rawGive, rawGet) || exactGate(context, limits, goal, {
      wMe: myWindow, wThem: theirWindow, size, uMe: myUtility, uThem: theirUtility, dMe: impact.a.delta, dThem: impact.b.delta,
      vMe: context.mode === 'redraft' && !context.consensus ? 0 : valueGain(context, myTeam, myWindow, give, get),
      vThem: context.mode === 'redraft' && !context.consensus ? 0 : valueGain(context, partner, theirWindow, get, give)
    });
    return { ok: !reason, reason, impact, rawNetThem, size, uMe: myUtility, uThem: theirUtility };
  }

  function tooOldForRebuild(context, contentionWindow, assetIds) {
    if (context.mode !== 'dynasty' || !context.ageOf || contentionWindow >= REBUILDING_BELOW) return false;
    return assetIds.some((assetId) => {
      if (context.isPick(assetId)) return false;
      const age = context.ageOf(assetId);
      if (!age) return false;
      const position = (context.positionsOf(assetId) || [])[0];
      return age > (AGE_LIMIT_BY_POSITION[position] || DEFAULT_AGE_LIMIT);
    });
  }

  function proposeFor(context, myTeam, partner, myBaseline) {
    const limits = paramsOf(context);
    const goal = context.goal || 'balanced';
    const myWindow = goal === 'now' ? 1 : goal === 'future' ? 0 : myTeam.w;
    const theirWindow = partner.w;
    const myPointWeight = context.mode === 'redraft' ? motivationOf(myWindow) : lambdaOf(myWindow) * context.pointValue;
    const theirPointWeight = context.mode === 'redraft' ? motivationOf(theirWindow) : lambdaOf(theirWindow) * context.pointValue;
    const valueToSide = (team, contentionWindow, assetId) => (context.mode !== 'redraft' ? context.valueOf(team, assetId, contentionWindow) : context.consensus ? (valueWeight(contentionWindow) * context.valueOf(team, assetId, contentionWindow)) / context.pointValue : 0);

    const theirBaseline = dropLosses(partner, context);
    const myGain = addGains(myTeam, myBaseline.base, partner.assets.filter((asset) => !context.isPick(asset)), context);
    const theirGain = addGains(partner, theirBaseline.base, myTeam.assets.filter((asset) => !context.isPick(asset)), context);
    const myLoss = (assetId) => myBaseline.out.get(assetId) || 0;
    const theirLoss = (assetId) => theirBaseline.out.get(assetId) || 0;

    const giveScore = (assetId) => valueToSide(partner, theirWindow, assetId) + theirPointWeight * (theirGain.get(assetId) || 0) - valueToSide(myTeam, myWindow, assetId) - myPointWeight * myLoss(assetId);
    const askScore = (assetId) => valueToSide(myTeam, myWindow, assetId) + myPointWeight * (myGain.get(assetId) || 0) - valueToSide(partner, theirWindow, assetId) - theirPointWeight * theirLoss(assetId);
    const shortlist = (assetIds, score, must) => {
      const room = SIDE_SHOWN - (must ? 1 : 0);
      const best = (list) => list.slice().sort((a, b) => score(b) - score(a));
      const rest = assetIds.filter((assetId) => assetId !== must);
      const picks = best(rest.filter(context.isPick));
      const moving = best(rest.filter((assetId) => !context.isPick(assetId)));
      const takePicks = Math.min(picks.length, Math.max(PICKS_SHOWN, room - moving.length));
      const ranked = moving.slice(0, room - takePicks).concat(picks.slice(0, takePicks));
      return must ? [must].concat(ranked) : ranked;
    };
    const focus = context.focus || {};
    const shop = focus.shop && myTeam.assets.includes(focus.shop) ? focus.shop : null;
    const target = focus.target && partner.assets.includes(focus.target) ? focus.target : null;
    if ((focus.shop && !shop) || (focus.target && !target)) return [];
    const isTradeChip = (assetId) => context.isPick(assetId) || assetId === shop || assetId === target || !NOT_TRADE_CHIPS.has((context.positionsOf(assetId) || [])[0]);
    const gives = shortlist(myTeam.assets.filter(isTradeChip), giveScore, shop);
    const asks = shortlist(partner.assets.filter(isTradeChip), askScore, target);

    const players = (assetIds) => assetIds.filter((assetId) => !context.isPick(assetId));
    const spareParts = (team, loss) => (team.players || []).filter((playerId) => !loss(playerId) && context.canCut(playerId)).sort((a, b) => context.rawOf(a) - context.rawOf(b));
    const mySpareParts = spareParts(myTeam, myLoss);
    const theirSpareParts = spareParts(partner, theirLoss);
    const cutCost = (team, contentionWindow, assetIds) => (context.mode === 'dynasty' ? assetIds.reduce((total, playerId) => total + context.valueOf(team, playerId, contentionWindow), 0) : 0);
    const rawPrice = (assetIds) => context.sideValue(assetIds.map((assetId) => context.rawOf(assetId)), assetIds.map(context.isPick));
    const roughDeals = [];
    for (const give of subsets(gives, 2)) {
      if (shop && !give.includes(shop)) continue;
      for (const get of subsets(asks, 2)) {
        if (target && !get.includes(target)) continue;
        const givenPlayerCount = players(give).length;
        const askedPlayerCount = players(get).length;
        const myOverflow = myTeam.count - givenPlayerCount + askedPlayerCount - myTeam.capacity;
        const theirOverflow = partner.count - askedPlayerCount + givenPlayerCount - partner.capacity;
        const myCuts = myOverflow > 0 ? mySpareParts.filter((playerId) => !give.includes(playerId)).slice(0, myOverflow) : [];
        const theirCuts = theirOverflow > 0 ? theirSpareParts.filter((playerId) => !get.includes(playerId)).slice(0, theirOverflow) : [];
        if (myCuts.length < myOverflow || theirCuts.length < theirOverflow) continue;
        const myCutCost = cutCost(myTeam, myWindow, myCuts);
        const theirCutCost = cutCost(partner, theirWindow, theirCuts);
        const rawGive = rawPrice(give);
        const rawGet = rawPrice(get);
        const size = Math.max(rawGive, rawGet, 1);
        const priceFail = priceGate(context, limits, goal, rawGive, rawGet);
        if (priceFail) continue;
        if (tooOldForRebuild(context, theirWindow, give) || tooOldForRebuild(context, myWindow, get)) continue;
        if (get.some((assetId) => !context.isPick(assetId) && assetId !== target && !(myGain.get(assetId) > 0) && context.rawOf(assetId) < DEAD_WEIGHT * size)) continue;
        if (give.some((assetId) => !context.isPick(assetId) && assetId !== shop && !(theirGain.get(assetId) > 0) && context.rawOf(assetId) < DEAD_WEIGHT * size)) continue;
        const myPointChange = sum(players(get).map((assetId) => myGain.get(assetId) || 0)) - sum(players(give).map(myLoss));
        const theirPointChange = sum(players(give).map((assetId) => theirGain.get(assetId) || 0)) - sum(players(get).map(theirLoss));
        const myUtility = utility(context, myTeam, myWindow, give, get, myPointChange) - myCutCost;
        const theirUtility = utility(context, partner, theirWindow, get, give, theirPointChange) - theirCutCost;
        if (myUtility <= 0 || theirUtility <= 0) continue;
        roughDeals.push({ give, get, size, drops: { me: myCuts, them: theirCuts }, score: Math.sqrt(myUtility * theirUtility) / (context.mode === 'redraft' ? 1 : size) });
      }
    }
    roughDeals.sort((a, b) => b.score - a.score);

    const scoredDeals = [];
    for (const candidate of roughDeals.slice(0, EXACT_PER_PARTNER)) {
      const givenPlayers = players(candidate.give);
      const askedPlayers = players(candidate.get);
      const impact = tradeImpact({
        slots: context.slots, weeks: context.weeks, positionsOf: context.positionsOf,
        a: { pool: myTeam.pool }, b: { pool: partner.pool }, aGives: givenPlayers, bGives: askedPlayers
      });
      const myUtility = utility(context, myTeam, myWindow, candidate.give, candidate.get, impact.a.delta) - cutCost(myTeam, myWindow, candidate.drops.me);
      const theirUtility = utility(context, partner, theirWindow, candidate.get, candidate.give, impact.b.delta) - cutCost(partner, theirWindow, candidate.drops.them);
      const unfit = exactGate(context, limits, goal, {
        wMe: myWindow, wThem: theirWindow, size: candidate.size, uMe: myUtility, uThem: theirUtility, dMe: impact.a.delta, dThem: impact.b.delta,
        vMe: valueGain(context, myTeam, myWindow, candidate.give, candidate.get), vThem: valueGain(context, partner, theirWindow, candidate.get, candidate.give)
      });
      if (unfit) continue;
      const rawNetThem = (rawPrice(candidate.give) - rawPrice(candidate.get)) / candidate.size;
      const share = context.mode === 'redraft' ? Math.min(Math.max(theirUtility, 0) / 10, 1) : Math.min(theirUtility / candidate.size / 0.12, 1);
      const fair = context.mode === 'redraft' && !context.consensus ? 0.5 : Math.max(0, Math.min(1, 0.5 + rawNetThem / 0.2));
      const care = context.mode === 'redraft' ? (motivationOf(theirWindow) - 0.45) / 0.55 : 0.5 + 0.5 * Math.abs(theirWindow - 0.5) * 2 * 0.5;
      const appetite = 0.8 + 0.4 * (partner.appetite == null ? 0.5 : partner.appetite);
      const likelihood = Math.max(0.05, Math.min(0.95, (0.15 + 0.35 * share + 0.3 * fair + 0.2 * care) * appetite));
      const priced = context.mode === 'dynasty' || context.consensus;
      const fairness = priced ? 1 - 2.5 * Math.max(0, rawNetThem - 0.04) - 1.5 * Math.max(0, -rawNetThem - 0.04) : 1;
      const quality = Math.max(0.1, fairness) * (context.mode === 'redraft' ? Math.sqrt(myUtility * theirUtility) : Math.sqrt(myUtility * theirUtility) / candidate.size);
      const entry = {
        partnerId: partner.id, give: candidate.give, get: candidate.get, size: candidate.size, drops: candidate.drops,
        me: { dPts: impact.a.delta, utility: myUtility, wMe: myWindow, starts: startsAmong(context, myTeam.pool.filter((playerId) => !givenPlayers.includes(playerId)).concat(askedPlayers), askedPlayers) },
        them: { dPts: impact.b.delta, utility: theirUtility, starts: startsAmong(context, partner.pool.filter((playerId) => !askedPlayers.includes(playerId)).concat(givenPlayers), givenPlayers) },
        rawNetThem, likelihood, score: quality * (0.6 + 0.4 * likelihood)
      };
      scoredDeals.push(entry);
      const lastItem = entry;
      const regular = lastItem.me.starts.length ? lastItem.me.starts[0].weeks / context.weeks.length : 0;
      lastItem.score *= 0.7 + 0.3 * Math.min(1, regular / 0.6);
    }
    scoredDeals.sort((a, b) => b.score - a.score);

    const out = [];
    const asked = new Set();
    const offered = new Set();
    const withPicks = (proposal) => proposal.give.concat(proposal.get).some(context.isPick);
    const take = (list, limit) => {
      let takenCount = 0;
      for (const proposal of list) {
        if (takenCount === limit) break;
        const askedKey = proposal.get.slice().sort().join();
        const givenKey = proposal.give.slice().sort().join();
        if (asked.has(askedKey) || offered.has(givenKey)) continue;
        asked.add(askedKey); offered.add(givenKey);
        out.push(proposal);
        takenCount++;
      }
    };
    take(scoredDeals.filter((proposal) => !withPicks(proposal)), KEEP_PER_PARTNER / 2);
    take(scoredDeals.filter(withPicks), KEEP_PER_PARTNER / 2);
    take(scoredDeals, KEEP_PER_PARTNER - out.length);
    out.sort((a, b) => b.score - a.score);
    return out;
  }

  NightOwl.finder = { proposeFor, judge, dropLosses, contention, lambdaOf, motivationOf, subsets, worthIt, valueGain, DEFAULTS, paramsOf, FAIR_TOLERANCE, FAIR_TOLERANCE_REDRAFT };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.finder;
