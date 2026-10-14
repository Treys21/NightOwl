// Trade finder: proposals the other manager would plausibly accept and you
// would actually want, for one league. Pure: no DOM, no network.
//
// How a proposal is judged. Each side has a utility in the league's currency:
//
//   dynasty   value units (KeepTradeCut, as each team sees them) plus lineup
//             points over the rest of the season at the market's price per
//             point, weighted by the team's window: contenders pay for points
//             now, rebuilders discount them and prefer youth and picks.
//   redraft   lineup points over the rest of the season (playoff weeks count
//             extra), because a title is won on points. A team out of the race
//             cares little about points and judges a deal by consensus value
//             (KeepTradeCut's redraft values) instead.
//
// A deal is a candidate only when BOTH utilities are positive (people accept
// trades they win in their own eyes) and the consensus value is not lopsided
// against the other side (they'd see a rip-off on the calculator). Candidates
// are found cheaply from each player's marginal effect on each lineup, then
// scored exactly by re-setting both lineups every remaining week.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { lineupPoints, tradeImpact } = NightOwl.value;
  const { optimal } = NightOwl.season;
  const NOT_STARTING = new Set(['BN', 'IR', 'TAXI']);

  const SIDE_SHOWN = 7; // assets per side considered when building deals
  const KEEP_PER_PARTNER = 3;
  const EXACT_PER_PARTNER = 18; // deals scored exactly per partner
  const NOT_TRADE_CHIPS = new Set(['K', 'DEF']); // streamable: nobody trades for them

  // The numbers that decide what counts as a deal both sides would take. They
  // were tuned against real trades (tools/backtest); ctx.params overrides them
  // so the backtest can try others.
  const DEFAULTS = {
    fairTolerance: 0.12, // the other side may lose this much of the deal's size on consensus value (dynasty): real deals in the backtest sit a median 12% off even
    fairToleranceRedraft: 0.1, // redraft consensus is noisier
    overpay: { balanced: 0.2, now: 0.3, future: 0.15 }, // and you this much (dynasty)
    overpayRedraft: { balanced: 0.07, now: 0.12, future: 0.07 }, // redraft prices are for fair deals: the edge is production and fit, not a premium
    minUtility: { me: 0.03, them: 0.02 }, // as a share of the deal's size
    minPoints: { me: 3, them: 2 }, // lineup points a side must gain to call a deal an upgrade
    minValue: { rebuild: 0.04, mixed: 0.05 }, // dynasty: value a side must gain, as a share of the deal's size
    mixedFloor: 0.03, // dynasty, a team between contending and rebuilding that gains points may give up this much of the deal's size in value
    outOfIt: 0.25 // redraft: below this window a team is out of the race
  };
  const paramsOf = (ctx) => Object.assign({}, DEFAULTS, ctx.params || {});
  const FAIR_TOLERANCE = DEFAULTS.fairTolerance;
  const FAIR_TOLERANCE_REDRAFT = DEFAULTS.fairToleranceRedraft;

  /** 0 (out of it) to 1 (contender) from playoff odds. */
  const contention = (playoffOdds) => Math.max(0, Math.min(1, ((playoffOdds || 0) - 0.1) / 0.5));
  /** Price of lineup points in dynasty value, by window: contenders pay up, rebuilders discount them. */
  const lambdaOf = (w) => 0.45 * w - 0.15 * (1 - w);
  /** Redraft: how much a team cares about a lineup upgrade. */
  const motivationOf = (w) => 0.45 + 0.55 * w;

  const sum = (xs) => xs.reduce((a, b) => a + b, 0);

  /** Every subset of items with 1..max members. */
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

  /** Lineup points lost if a player left (per player in the pool), and gained if one arrived (per candidate). */
  function dropLosses(team, ctx) {
    const base = lineupPoints(ctx.slots, team.pool, ctx.weeks, ctx.positionsOf).total;
    const out = new Map();
    for (const id of team.pool) {
      out.set(id, Math.max(0, base - lineupPoints(ctx.slots, team.pool.filter((p) => p !== id), ctx.weeks, ctx.positionsOf).total));
    }
    return { base, out };
  }

  function addGains(team, base, ids, ctx) {
    const out = new Map();
    for (const id of ids) {
      out.set(id, Math.max(0, lineupPoints(ctx.slots, team.pool.concat(id), ctx.weeks, ctx.positionsOf).total - base));
    }
    return out;
  }

  /** In redraft, how much a team's view of a deal comes from consensus value rather than its lineup: eliminated teams care about the former. */
  const valueWeight = (w) => 0.1 + 0.5 * (1 - w);

  /** The value a team gains in its own eyes, window and all (dynasty). */
  function valueGain(ctx, team, w, give, get) {
    const v = (id) => ctx.valueOf(team, id, w);
    return ctx.sideValue(get.map(v)) - ctx.sideValue(give.map(v));
  }

  /** What a team gets out of a deal, in its own currency. */
  function utility(ctx, team, w, give, get, dPts) {
    if (ctx.mode === 'redraft') {
      // Points first; with a consensus price, the value gained (in points) counts more the less the team cares about its lineup.
      const gain = ctx.consensus ? valueGain(ctx, team, w, give, get) / ctx.pointValue : 0;
      return dPts * motivationOf(w) + valueWeight(w) * gain;
    }
    return valueGain(ctx, team, w, give, get) + lambdaOf(w) * ctx.pointValue * dPts;
  }

  /**
   * Would a team with this outlook call the deal worth doing? A contender wants
   * more points now; a rebuilder wants more value; in between, either one, as
   * long as it isn't giving the other away. Nobody does a deal because the
   * calculator reads 2% their way.
   */
  function worthIt(ctx, w, goal, dPts, dValue, size, side) {
    const P = paramsOf(ctx);
    if (ctx.mode === 'redraft') {
      if (!ctx.consensus) return dPts >= (side === 'me' ? P.minPoints.me : P.minPoints.them);
      // Out of the race, a deal has to read as a win on consensus value; otherwise it has to add points.
      if (w < P.outOfIt) return dValue >= P.minValue.rebuild * size;
      return dPts >= (side === 'me' ? P.minPoints.me : P.minPoints.them);
    }
    const stance = goal === 'now' ? 'now' : goal === 'future' ? 'rebuild' : w >= 0.6 ? 'now' : w < 0.3 ? 'rebuild' : 'mixed';
    if (stance === 'now') return dPts >= P.minPoints.me;
    if (stance === 'rebuild') return dValue >= P.minValue.rebuild * size;
    return (dPts >= P.minPoints.me && dValue >= -P.mixedFloor * size) || dValue >= P.minValue.mixed * size;
  }

  /**
   * How the players a team receives would be used: for each one who starts in
   * any remaining week, the slot he fills most often and the weeks he starts.
   * -> [{ id, slot, weeks }], most weeks first, plus the number of weeks looked at
   */
  function startsAmong(ctx, pool, ids) {
    const starting = ctx.slots.filter((s) => !NOT_STARTING.has(s));
    const seen = new Map(ids.map((id) => [id, new Map()]));
    for (const w of ctx.weeks) {
      const best = optimal(ctx.slots, pool, (pid) => (w.isOut(pid) ? 0 : w.projOf(pid)), ctx.positionsOf);
      best.starters.forEach((pid, i) => {
        if (pid && seen.has(pid)) seen.get(pid).set(starting[i], (seen.get(pid).get(starting[i]) || 0) + 1);
      });
    }
    const out = [];
    for (const [id, slots] of seen) {
      const weeks = sum([...slots.values()]);
      if (!weeks) continue;
      const slot = [...slots.entries()].sort((x, y) => y[1] - x[1])[0][0];
      out.push({ id, slot, weeks });
    }
    return out.sort((x, y) => y.weeks - x.weeks);
  }

  /** Is the price one the other side would take, and one you would pay? -> the rule it breaks, or null. */
  function priceGate(ctx, P, goal, rawGive, rawGet) {
    const size = Math.max(rawGive, rawGet, 1);
    if ((rawGive - rawGet) / size < -(ctx.mode === 'redraft' ? P.fairToleranceRedraft : ctx.fairTolerance || P.fairTolerance)) return 'theyLose'; // they would see a rip-off
    if ((rawGet - rawGive) / size < -(ctx.mode === 'redraft' ? P.overpayRedraft : P.overpay)[goal]) return 'youOverpay'; // and you are overpaying
    return null;
  }

  /** With the lineups re-set: does each side come out ahead in its own terms? -> the rule it breaks, or null. */
  function exactGate(ctx, P, goal, sides) {
    const { wMe, wThem, size, uMe, uThem, dMe, dThem, vMe, vThem } = sides;
    if (ctx.mode === 'redraft' && !ctx.consensus) {
      if (dMe < P.minPoints.me || dThem < P.minPoints.them) return 'noUpgrade';
      return null;
    }
    const scale = ctx.mode === 'redraft' ? 0 : 1;
    if (uMe < P.minUtility.me * size * scale || uThem < P.minUtility.them * size * scale) return 'exactUtility';
    if (!worthIt(ctx, wMe, goal, dMe, vMe, size, 'me')) return 'notWorthMe';
    if (!worthIt(ctx, wThem, 'balanced', dThem, vThem, size, 'them')) return 'notWorthThem';
    return null;
  }

  /**
   * Would the finder have accepted this specific deal? The same gates the
   * search applies, for a deal someone actually made (the backtest asks this of
   * real trades). -> { ok, reason, impact, rawNetThem, size, uMe, uThem }
   */
  function judge(ctx, me, other, give, get) {
    const P = paramsOf(ctx);
    const goal = ctx.goal || 'balanced';
    const wMe = goal === 'now' ? 1 : goal === 'future' ? 0 : me.w;
    const wThem = other.w;
    const players = (ids) => ids.filter((id) => !ctx.isPick(id));
    const raw = (ids) => ctx.sideValue(ids.map((id) => ctx.rawOf(id)));
    const rawGive = raw(give);
    const rawGet = raw(get);
    const size = Math.max(rawGive, rawGet, 1);
    const rawNetThem = (rawGive - rawGet) / size;
    const impact = tradeImpact({
      slots: ctx.slots, weeks: ctx.weeks, positionsOf: ctx.positionsOf,
      a: { pool: me.pool }, b: { pool: other.pool }, aGives: players(give), bGives: players(get)
    });
    const uMe = utility(ctx, me, wMe, give, get, impact.a.delta);
    const uThem = utility(ctx, other, wThem, get, give, impact.b.delta);
    const reason = priceGate(ctx, P, goal, rawGive, rawGet) || exactGate(ctx, P, goal, {
      wMe, wThem, size, uMe, uThem, dMe: impact.a.delta, dThem: impact.b.delta,
      vMe: ctx.mode === 'redraft' && !ctx.consensus ? 0 : valueGain(ctx, me, wMe, give, get),
      vThem: ctx.mode === 'redraft' && !ctx.consensus ? 0 : valueGain(ctx, other, wThem, get, give)
    });
    return { ok: !reason, reason, impact, rawNetThem, size, uMe, uThem };
  }

  /**
   * Plausible deals with one partner, best first.
   *   ctx    { mode, slots, weeks, positionsOf, valueOf(team, id, w), rawOf(id), sideValue(values),
   *            pointValue, isPick(id), canCut(id), goal, focus: { shop, target }, fairTolerance? }
   *   me, other   { id, pool, assets, players, count, capacity, w, appetite? }
   *   mine   dropLosses() of my team, computed once per search
   */
  function proposeFor(ctx, me, other, mine) {
    const P = paramsOf(ctx);
    const goal = ctx.goal || 'balanced';
    const wMe = goal === 'now' ? 1 : goal === 'future' ? 0 : me.w;
    const wThem = other.w;
    const lamMe = ctx.mode === 'redraft' ? motivationOf(wMe) : lambdaOf(wMe) * ctx.pointValue;
    const lamThem = ctx.mode === 'redraft' ? motivationOf(wThem) : lambdaOf(wThem) * ctx.pointValue;
    // Redraft weighs lineup points (and, for teams out of the race, consensus value in points); dynasty weighs value units.
    const val = (team, w, id) => (ctx.mode !== 'redraft' ? ctx.valueOf(team, id, w) : ctx.consensus ? (valueWeight(w) * ctx.valueOf(team, id, w)) / ctx.pointValue : 0);

    const theirs = dropLosses(other, ctx);
    const myGain = addGains(me, mine.base, other.assets.filter((id) => !ctx.isPick(id)), ctx);
    const theirGain = addGains(other, theirs.base, me.assets.filter((id) => !ctx.isPick(id)), ctx);
    const dropMe = (id) => mine.out.get(id) || 0;
    const dropThem = (id) => theirs.out.get(id) || 0;

    // What each asset is worth to the side that would receive it, less what the other side loses.
    const giveScore = (id) => val(other, wThem, id) + lamThem * (theirGain.get(id) || 0) - val(me, wMe, id) - lamMe * dropMe(id);
    const askScore = (id) => val(me, wMe, id) + lamMe * (myGain.get(id) || 0) - val(other, wThem, id) - lamThem * dropThem(id);
    const top = (ids, score, must) => {
      const ranked = ids.filter((id) => id !== must).sort((a, b) => score(b) - score(a)).slice(0, SIDE_SHOWN - (must ? 1 : 0));
      return must ? [must].concat(ranked) : ranked;
    };
    const focus = ctx.focus || {};
    const shop = focus.shop && me.assets.includes(focus.shop) ? focus.shop : null;
    const target = focus.target && other.assets.includes(focus.target) ? focus.target : null;
    if ((focus.shop && !shop) || (focus.target && !target)) return [];
    // Kickers and defenses are streamed, not traded for, unless you asked about one.
    const chip = (id) => ctx.isPick(id) || id === shop || id === target || !NOT_TRADE_CHIPS.has((ctx.positionsOf(id) || [])[0]);
    const gives = top(me.assets.filter(chip), giveScore, shop);
    const asks = top(other.assets.filter(chip), askScore, target);

    const players = (ids) => ids.filter((id) => !ctx.isPick(id));
    // What a full roster cuts: players outside every lineup, cheapest first. In dynasty a cut costs what the player is worth.
    const spare = (team, loss) => (team.players || []).filter((id) => !loss(id) && ctx.canCut(id)).sort((a, b) => ctx.rawOf(a) - ctx.rawOf(b));
    const dustMe = spare(me, dropMe);
    const dustThem = spare(other, dropThem);
    const cutCost = (team, w, ids) => (ctx.mode === 'dynasty' ? ids.reduce((acc, id) => acc + ctx.valueOf(team, id, w), 0) : 0);
    const raw = (ids) => ctx.sideValue(ids.map((id) => ctx.rawOf(id)));
    const approx = [];
    for (const give of subsets(gives, 2)) {
      if (shop && !give.includes(shop)) continue;
      for (const get of subsets(asks, 2)) {
        if (target && !get.includes(target)) continue;
        const gp = players(give).length;
        const ap = players(get).length;
        // A full roster can still take more players than it sends if it has spare parts to cut.
        const overMe = me.count - gp + ap - me.capacity;
        const overThem = other.count - ap + gp - other.capacity;
        const dropsMe = overMe > 0 ? dustMe.filter((id) => !give.includes(id)).slice(0, overMe) : [];
        const dropsThem = overThem > 0 ? dustThem.filter((id) => !get.includes(id)).slice(0, overThem) : [];
        if (dropsMe.length < overMe || dropsThem.length < overThem) continue;
        const cutMe = cutCost(me, wMe, dropsMe);
        const cutThem = cutCost(other, wThem, dropsThem);
        const rawGive = raw(give);
        const rawGet = raw(get);
        const size = Math.max(rawGive, rawGet, 1);
        const priceFail = priceGate(ctx, P, goal, rawGive, rawGet);
        if (priceFail) continue;
        const dMe = sum(players(get).map((id) => myGain.get(id) || 0)) - sum(players(give).map(dropMe));
        const dThem = sum(players(give).map((id) => theirGain.get(id) || 0)) - sum(players(get).map(dropThem));
        const uMe = utility(ctx, me, wMe, give, get, dMe) - cutMe;
        const uThem = utility(ctx, other, wThem, get, give, dThem) - cutThem;
        if (uMe <= 0 || uThem <= 0) continue;
        approx.push({ give, get, size, drops: { me: dropsMe, them: dropsThem }, score: Math.sqrt(uMe * uThem) / (ctx.mode === 'redraft' ? 1 : size) });
      }
    }
    approx.sort((a, b) => b.score - a.score);

    const exact = [];
    for (const c of approx.slice(0, EXACT_PER_PARTNER)) {
      const gp = players(c.give);
      const ap = players(c.get);
      const impact = tradeImpact({
        slots: ctx.slots, weeks: ctx.weeks, positionsOf: ctx.positionsOf,
        a: { pool: me.pool }, b: { pool: other.pool }, aGives: gp, bGives: ap
      });
      const uMe = utility(ctx, me, wMe, c.give, c.get, impact.a.delta) - cutCost(me, wMe, c.drops.me);
      const uThem = utility(ctx, other, wThem, c.get, c.give, impact.b.delta) - cutCost(other, wThem, c.drops.them);
      const unfit = exactGate(ctx, P, goal, {
        wMe, wThem, size: c.size, uMe, uThem, dMe: impact.a.delta, dThem: impact.b.delta,
        vMe: valueGain(ctx, me, wMe, c.give, c.get), vThem: valueGain(ctx, other, wThem, c.get, c.give)
      });
      if (unfit) continue;
      const rawNetThem = (raw(c.give) - raw(c.get)) / c.size;
      // How likely a yes is: how much they gain, how they see the price, how much they care.
      const share = ctx.mode === 'redraft' ? Math.min(Math.max(uThem, 0) / 10, 1) : Math.min(uThem / c.size / 0.12, 1);
      const fair = ctx.mode === 'redraft' && !ctx.consensus ? 0.5 : Math.max(0, Math.min(1, 0.5 + rawNetThem / 0.2));
      const care = ctx.mode === 'redraft' ? (motivationOf(wThem) - 0.45) / 0.55 : 0.5 + 0.5 * Math.abs(wThem - 0.5) * 2 * 0.5;
      // Managers who trade a lot say yes more; one who never has is a long shot whatever the deal.
      const appetite = 0.8 + 0.4 * (other.appetite == null ? 0.5 : other.appetite);
      const likelihood = Math.max(0.05, Math.min(0.95, (0.15 + 0.35 * share + 0.3 * fair + 0.2 * care) * appetite));
      // A fair price wins: little is lost for being a few percent off, a lot for a lopsided deal in either direction.
      const priced = ctx.mode === 'dynasty' || ctx.consensus;
      const fairness = priced ? 1 - 2.5 * Math.max(0, rawNetThem - 0.04) - 1.5 * Math.max(0, -rawNetThem - 0.04) : 1;
      const quality = Math.max(0.1, fairness) * (ctx.mode === 'redraft' ? Math.sqrt(uMe * uThem) : Math.sqrt(uMe * uThem) / c.size);
      const entry = {
        partnerId: other.id, give: c.give, get: c.get, size: c.size, drops: c.drops,
        me: { dPts: impact.a.delta, utility: uMe, wMe, starts: startsAmong(ctx, me.pool.filter((id) => !gp.includes(id)).concat(ap), ap) },
        them: { dPts: impact.b.delta, utility: uThem, starts: startsAmong(ctx, other.pool.filter((id) => !ap.includes(id)).concat(gp), gp) },
        rawNetThem, likelihood, score: quality * (0.6 + 0.4 * likelihood)
      };
      exact.push(entry);
      // Deals that bring in a real starter beat ones that only add a bench body.
      const lastItem = entry;
      const regular = lastItem.me.starts.length ? lastItem.me.starts[0].weeks / ctx.weeks.length : 0;
      lastItem.score *= 0.7 + 0.3 * Math.min(1, regular / 0.6);
    }
    exact.sort((a, b) => b.score - a.score);

    // Variety: one deal per distinct thing asked for, and per distinct thing given.
    const out = [];
    const asked = new Set();
    const offered = new Set();
    for (const p of exact) {
      const a = p.get.slice().sort().join();
      const g = p.give.slice().sort().join();
      if (asked.has(a) || offered.has(g)) continue;
      asked.add(a); offered.add(g);
      out.push(p);
      if (out.length === KEEP_PER_PARTNER) break;
    }
    return out;
  }

  NightOwl.finder = { proposeFor, judge, dropLosses, contention, lambdaOf, motivationOf, subsets, worthIt, valueGain, DEFAULTS, paramsOf, FAIR_TOLERANCE, FAIR_TOLERANCE_REDRAFT };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.finder;
