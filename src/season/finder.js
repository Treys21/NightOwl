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
  const paramsOf = (ctx) => Object.assign({}, DEFAULTS, ctx.params || {});
  const FAIR_TOLERANCE = DEFAULTS.fairTolerance;
  const FAIR_TOLERANCE_REDRAFT = DEFAULTS.fairToleranceRedraft;

  const contention = (playoffOdds) => Math.max(0, Math.min(1, ((playoffOdds || 0) - 0.1) / 0.5));
  const lambdaOf = (w) => 0.45 * w - 0.15 * (1 - w);
  const motivationOf = (w) => 0.45 + 0.55 * w;

  const sum = (xs) => xs.reduce((a, b) => a + b, 0);

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

  function dropLosses(team, ctx) {
    const base = lineupPoints(ctx.slots, team.pool, ctx.weeks, ctx.positionsOf).total;
    const out = new Map();
    for (const id of team.pool) {
      if (ctx.isVirtual && ctx.isVirtual(id)) continue;
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

  const valueWeight = (w) => 0.1 + 0.5 * (1 - w);

  function valueGain(ctx, team, w, give, get) {
    const v = (id) => ctx.valueOf(team, id, w);
    return ctx.sideValue(get.map(v), get.map(ctx.isPick)) - ctx.sideValue(give.map(v), give.map(ctx.isPick));
  }

  function utility(ctx, team, w, give, get, dPts) {
    if (ctx.mode === 'redraft') {
      const gain = ctx.consensus ? valueGain(ctx, team, w, give, get) / ctx.pointValue : 0;
      return dPts * motivationOf(w) + valueWeight(w) * gain;
    }
    return valueGain(ctx, team, w, give, get) + lambdaOf(w) * ctx.pointValue * dPts;
  }

  function worthIt(ctx, w, goal, dPts, dValue, size, side) {
    const P = paramsOf(ctx);
    if (ctx.mode === 'redraft') {
      if (!ctx.consensus) return dPts >= (side === 'me' ? P.minPoints.me : P.minPoints.them);
      if (w < P.outOfIt) return dValue >= P.minValue.rebuild * size;
      return dPts >= (side === 'me' ? P.minPoints.me : P.minPoints.them);
    }
    const stance = goal === 'now' ? 'now' : goal === 'future' ? 'rebuild' : w >= 0.6 ? 'now' : w < 0.3 ? 'rebuild' : 'mixed';
    if (stance === 'now') return dPts >= P.minPoints.me;
    if (stance === 'rebuild') return dValue >= P.minValue.rebuild * size;
    return (dPts >= P.minPoints.me && dValue >= -P.mixedFloor * size) || dValue >= P.minValue.mixed * size;
  }

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

  function priceGate(ctx, P, goal, rawGive, rawGet) {
    const size = Math.max(rawGive, rawGet, 1);
    if ((rawGive - rawGet) / size < -(ctx.mode === 'redraft' ? P.fairToleranceRedraft : ctx.fairTolerance || P.fairTolerance)) return 'theyLose';
    if ((rawGet - rawGive) / size < -(ctx.mode === 'redraft' ? P.overpayRedraft : P.overpay)[goal]) return 'youOverpay';
    return null;
  }

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

  function judge(ctx, me, other, give, get) {
    const P = paramsOf(ctx);
    const goal = ctx.goal || 'balanced';
    const wMe = goal === 'now' ? 1 : goal === 'future' ? 0 : me.w;
    const wThem = other.w;
    const players = (ids) => ids.filter((id) => !ctx.isPick(id));
    const raw = (ids) => ctx.sideValue(ids.map((id) => ctx.rawOf(id)), ids.map(ctx.isPick));
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

  function proposeFor(ctx, me, other, mine) {
    const P = paramsOf(ctx);
    const goal = ctx.goal || 'balanced';
    const wMe = goal === 'now' ? 1 : goal === 'future' ? 0 : me.w;
    const wThem = other.w;
    const lamMe = ctx.mode === 'redraft' ? motivationOf(wMe) : lambdaOf(wMe) * ctx.pointValue;
    const lamThem = ctx.mode === 'redraft' ? motivationOf(wThem) : lambdaOf(wThem) * ctx.pointValue;
    const val = (team, w, id) => (ctx.mode !== 'redraft' ? ctx.valueOf(team, id, w) : ctx.consensus ? (valueWeight(w) * ctx.valueOf(team, id, w)) / ctx.pointValue : 0);

    const theirs = dropLosses(other, ctx);
    const myGain = addGains(me, mine.base, other.assets.filter((id) => !ctx.isPick(id)), ctx);
    const theirGain = addGains(other, theirs.base, me.assets.filter((id) => !ctx.isPick(id)), ctx);
    const dropMe = (id) => mine.out.get(id) || 0;
    const dropThem = (id) => theirs.out.get(id) || 0;

    const giveScore = (id) => val(other, wThem, id) + lamThem * (theirGain.get(id) || 0) - val(me, wMe, id) - lamMe * dropMe(id);
    const askScore = (id) => val(me, wMe, id) + lamMe * (myGain.get(id) || 0) - val(other, wThem, id) - lamThem * dropThem(id);
    const top = (ids, score, must) => {
      const room = SIDE_SHOWN - (must ? 1 : 0);
      const best = (list) => list.slice().sort((a, b) => score(b) - score(a));
      const rest = ids.filter((id) => id !== must);
      const picks = best(rest.filter(ctx.isPick));
      const moving = best(rest.filter((id) => !ctx.isPick(id)));
      const takePicks = Math.min(picks.length, Math.max(PICKS_SHOWN, room - moving.length));
      const ranked = moving.slice(0, room - takePicks).concat(picks.slice(0, takePicks));
      return must ? [must].concat(ranked) : ranked;
    };
    const focus = ctx.focus || {};
    const shop = focus.shop && me.assets.includes(focus.shop) ? focus.shop : null;
    const target = focus.target && other.assets.includes(focus.target) ? focus.target : null;
    if ((focus.shop && !shop) || (focus.target && !target)) return [];
    const chip = (id) => ctx.isPick(id) || id === shop || id === target || !NOT_TRADE_CHIPS.has((ctx.positionsOf(id) || [])[0]);
    const gives = top(me.assets.filter(chip), giveScore, shop);
    const asks = top(other.assets.filter(chip), askScore, target);

    const players = (ids) => ids.filter((id) => !ctx.isPick(id));
    const spare = (team, loss) => (team.players || []).filter((id) => !loss(id) && ctx.canCut(id)).sort((a, b) => ctx.rawOf(a) - ctx.rawOf(b));
    const dustMe = spare(me, dropMe);
    const dustThem = spare(other, dropThem);
    const cutCost = (team, w, ids) => (ctx.mode === 'dynasty' ? ids.reduce((acc, id) => acc + ctx.valueOf(team, id, w), 0) : 0);
    const raw = (ids) => ctx.sideValue(ids.map((id) => ctx.rawOf(id)), ids.map(ctx.isPick));
    const approx = [];
    for (const give of subsets(gives, 2)) {
      if (shop && !give.includes(shop)) continue;
      for (const get of subsets(asks, 2)) {
        if (target && !get.includes(target)) continue;
        const gp = players(give).length;
        const ap = players(get).length;
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
        if (get.some((id) => !ctx.isPick(id) && id !== target && !(myGain.get(id) > 0) && ctx.rawOf(id) < DEAD_WEIGHT * size)) continue;
        if (give.some((id) => !ctx.isPick(id) && id !== shop && !(theirGain.get(id) > 0) && ctx.rawOf(id) < DEAD_WEIGHT * size)) continue;
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
      const share = ctx.mode === 'redraft' ? Math.min(Math.max(uThem, 0) / 10, 1) : Math.min(uThem / c.size / 0.12, 1);
      const fair = ctx.mode === 'redraft' && !ctx.consensus ? 0.5 : Math.max(0, Math.min(1, 0.5 + rawNetThem / 0.2));
      const care = ctx.mode === 'redraft' ? (motivationOf(wThem) - 0.45) / 0.55 : 0.5 + 0.5 * Math.abs(wThem - 0.5) * 2 * 0.5;
      const appetite = 0.8 + 0.4 * (other.appetite == null ? 0.5 : other.appetite);
      const likelihood = Math.max(0.05, Math.min(0.95, (0.15 + 0.35 * share + 0.3 * fair + 0.2 * care) * appetite));
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
      const lastItem = entry;
      const regular = lastItem.me.starts.length ? lastItem.me.starts[0].weeks / ctx.weeks.length : 0;
      lastItem.score *= 0.7 + 0.3 * Math.min(1, regular / 0.6);
    }
    exact.sort((a, b) => b.score - a.score);

    const out = [];
    const asked = new Set();
    const offered = new Set();
    const withPicks = (p) => p.give.concat(p.get).some(ctx.isPick);
    const take = (list, limit) => {
      let n = 0;
      for (const p of list) {
        if (n === limit) break;
        const a = p.get.slice().sort().join();
        const g = p.give.slice().sort().join();
        if (asked.has(a) || offered.has(g)) continue;
        asked.add(a); offered.add(g);
        out.push(p);
        n++;
      }
    };
    take(exact.filter((p) => !withPicks(p)), KEEP_PER_PARTNER / 2);
    take(exact.filter(withPicks), KEEP_PER_PARTNER / 2);
    take(exact, KEEP_PER_PARTNER - out.length);
    out.sort((a, b) => b.score - a.score);
    return out;
  }

  NightOwl.finder = { proposeFor, judge, dropLosses, contention, lambdaOf, motivationOf, subsets, worthIt, valueGain, DEFAULTS, paramsOf, FAIR_TOLERANCE, FAIR_TOLERANCE_REDRAFT };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.finder;
