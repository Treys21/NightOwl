// Trade finder: proposals the other manager would plausibly accept and you
// would actually want, for one league. Pure: no DOM, no network.
//
// How a proposal is judged. Each side has a utility in the league's currency:
//
//   dynasty   value units (KeepTradeCut, as each team sees them) plus lineup
//             points over the rest of the season at the market's price per
//             point, weighted by the team's window: contenders pay for points
//             now, rebuilders discount them and prefer youth and picks.
//   redraft   lineup points over the rest of the season, nothing else matters;
//             a team that is out of the race is less motivated to deal.
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
  const FAIR_TOLERANCE = 0.08; // the other side may lose this much of the deal's size on consensus value
  const OVERPAY_TOLERANCE = { balanced: 0.15, now: 0.25, future: 0.12 }; // and you this much
  const MIN_UTILITY = { me: 0.03, them: 0.02 }; // as a share of the deal's size
  const MIN_POINTS = { me: 3, them: 2 }; // lineup points a side must gain to call a deal an upgrade
  const MIN_VALUE = { rebuild: 0.04, mixed: 0.05 }; // dynasty: value a side must gain, as a share of the deal's size
  const NOT_TRADE_CHIPS = new Set(['K', 'DEF']); // streamable: nobody trades for them

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

  /** The value a team gains in its own eyes, window and all (dynasty). */
  function valueGain(ctx, team, w, give, get) {
    const v = (id) => ctx.valueOf(team, id, w);
    return ctx.sideValue(get.map(v)) - ctx.sideValue(give.map(v));
  }

  /** What a team gets out of a deal, in its own currency. */
  function utility(ctx, team, w, give, get, dPts) {
    if (ctx.mode === 'redraft') return dPts * motivationOf(w);
    return valueGain(ctx, team, w, give, get) + lambdaOf(w) * ctx.pointValue * dPts;
  }

  /**
   * Would a team with this outlook call the deal worth doing? A contender wants
   * more points now; a rebuilder wants more value; in between, either one, as
   * long as it isn't giving the other away. Nobody does a deal because the
   * calculator reads 2% their way.
   */
  function worthIt(ctx, w, goal, dPts, dValue, size) {
    if (ctx.mode === 'redraft') return true; // checked on points alone
    const stance = goal === 'now' ? 'now' : goal === 'future' ? 'rebuild' : w >= 0.6 ? 'now' : w < 0.3 ? 'rebuild' : 'mixed';
    if (stance === 'now') return dPts >= MIN_POINTS.me;
    if (stance === 'rebuild') return dValue >= MIN_VALUE.rebuild * size;
    return (dPts >= MIN_POINTS.me && dValue >= -0.03 * size) || dValue >= MIN_VALUE.mixed * size;
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

  /**
   * Plausible deals with one partner, best first.
   *   ctx    { mode, slots, weeks, positionsOf, valueOf(team, id, w), rawOf(id), sideValue(values),
   *            pointValue, isPick(id), canCut(id), goal, focus: { shop, target } }
   *   me, other   { id, pool, assets, players, count, capacity, w }
   *   mine   dropLosses() of my team, computed once per search
   */
  function proposeFor(ctx, me, other, mine) {
    const goal = ctx.goal || 'balanced';
    const wMe = goal === 'now' ? 1 : goal === 'future' ? 0 : me.w;
    const wThem = other.w;
    const lamMe = ctx.mode === 'redraft' ? motivationOf(wMe) : lambdaOf(wMe) * ctx.pointValue;
    const lamThem = ctx.mode === 'redraft' ? motivationOf(wThem) : lambdaOf(wThem) * ctx.pointValue;
    // Redraft has no market value to weigh, only what each lineup gains and loses.
    const val = (team, w, id) => (ctx.mode === 'redraft' ? 0 : ctx.valueOf(team, id, w));

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
    const st = ctx.stats || {};
    const bump = (k) => { st[k] = (st[k] || 0) + 1; };
    const approx = [];
    for (const give of subsets(gives, 2)) {
      if (shop && !give.includes(shop)) continue;
      for (const get of subsets(asks, 2)) {
        if (target && !get.includes(target)) continue;
        const gp = players(give).length;
        const ap = players(get).length;
        bump('combos');
        // A full roster can still take more players than it sends if it has spare parts to cut.
        const overMe = me.count - gp + ap - me.capacity;
        const overThem = other.count - ap + gp - other.capacity;
        const dropsMe = overMe > 0 ? dustMe.filter((id) => !give.includes(id)).slice(0, overMe) : [];
        const dropsThem = overThem > 0 ? dustThem.filter((id) => !get.includes(id)).slice(0, overThem) : [];
        if (dropsMe.length < overMe || dropsThem.length < overThem) { bump('roster'); continue; }
        const cutMe = cutCost(me, wMe, dropsMe);
        const cutThem = cutCost(other, wThem, dropsThem);
        const rawGive = raw(give);
        const rawGet = raw(get);
        const size = Math.max(rawGive, rawGet, 1);
        if ((rawGive - rawGet) / size < -FAIR_TOLERANCE) { bump('theyLose'); continue; } // they would see a rip-off
        if ((rawGet - rawGive) / size < -OVERPAY_TOLERANCE[goal]) { bump('youOverpay'); continue; } // and you are overpaying
        const dMe = sum(players(get).map((id) => myGain.get(id) || 0)) - sum(players(give).map(dropMe));
        const dThem = sum(players(give).map((id) => theirGain.get(id) || 0)) - sum(players(get).map(dropThem));
        const uMe = utility(ctx, me, wMe, give, get, dMe) - cutMe;
        const uThem = utility(ctx, other, wThem, get, give, dThem) - cutThem;
        if (uMe <= 0 || uThem <= 0) { bump(uMe <= 0 ? 'noGainMe' : 'noGainThem'); continue; }
        bump('approx');
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
      if (ctx.mode === 'redraft') {
        if (impact.a.delta < MIN_POINTS.me || impact.b.delta < MIN_POINTS.them) continue;
      } else {
        if (uMe < MIN_UTILITY.me * c.size || uThem < MIN_UTILITY.them * c.size) { bump('exactUtility'); continue; }
        if (!worthIt(ctx, wMe, goal, impact.a.delta, valueGain(ctx, me, wMe, c.give, c.get), c.size)) { bump('notWorthMe'); continue; }
        if (!worthIt(ctx, wThem, 'balanced', impact.b.delta, valueGain(ctx, other, wThem, c.get, c.give), c.size)) { bump('notWorthThem'); continue; }
      }
      const rawNetThem = (raw(c.give) - raw(c.get)) / c.size;
      // How likely a yes is: how much they gain, how they see the price, how much they care.
      const share = ctx.mode === 'redraft' ? Math.min(impact.b.delta / 10, 1) : Math.min(uThem / c.size / 0.12, 1);
      const fair = ctx.mode === 'redraft' ? 0.5 : Math.max(0, Math.min(1, 0.5 + rawNetThem / 0.2));
      const care = ctx.mode === 'redraft' ? (motivationOf(wThem) - 0.45) / 0.55 : 0.5 + 0.5 * Math.abs(wThem - 0.5) * 2 * 0.5;
      const likelihood = Math.max(0.05, Math.min(0.95, 0.15 + 0.35 * share + 0.3 * fair + 0.2 * care));
      const quality = ctx.mode === 'redraft' ? Math.sqrt(uMe * uThem) : Math.sqrt(uMe * uThem) / c.size;
      exact.push({
        partnerId: other.id, give: c.give, get: c.get, size: c.size, drops: c.drops,
        me: { dPts: impact.a.delta, utility: uMe, wMe, starts: startsAmong(ctx, me.pool.filter((id) => !gp.includes(id)).concat(ap), ap) },
        them: { dPts: impact.b.delta, utility: uThem, starts: startsAmong(ctx, other.pool.filter((id) => !ap.includes(id)).concat(gp), gp) },
        rawNetThem, likelihood, score: quality * (0.6 + 0.4 * likelihood)
      });
      // Deals that bring in a real starter beat ones that only add a bench body.
      const lastItem = exact[exact.length - 1];
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

  NightOwl.finder = { proposeFor, dropLosses, contention, lambdaOf, motivationOf, subsets, worthIt, valueGain, FAIR_TOLERANCE };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.finder;
