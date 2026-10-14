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
  const paramsOf = (context) => Object.assign({}, DEFAULTS, context.params || {});
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

  function dropLosses(team, context) {
    const base = lineupPoints(context.slots, team.pool, context.weeks, context.positionsOf).total;
    const out = new Map();
    for (const id of team.pool) {
      if (context.isVirtual && context.isVirtual(id)) continue;
      out.set(id, Math.max(0, base - lineupPoints(context.slots, team.pool.filter((p) => p !== id), context.weeks, context.positionsOf).total));
    }
    return { base, out };
  }

  function addGains(team, base, ids, context) {
    const out = new Map();
    for (const id of ids) {
      out.set(id, Math.max(0, lineupPoints(context.slots, team.pool.concat(id), context.weeks, context.positionsOf).total - base));
    }
    return out;
  }

  const valueWeight = (w) => 0.1 + 0.5 * (1 - w);

  function valueGain(context, team, w, give, get) {
    const v = (id) => context.valueOf(team, id, w);
    return context.sideValue(get.map(v), get.map(context.isPick)) - context.sideValue(give.map(v), give.map(context.isPick));
  }

  function utility(context, team, w, give, get, dPts) {
    if (context.mode === 'redraft') {
      const gain = context.consensus ? valueGain(context, team, w, give, get) / context.pointValue : 0;
      return dPts * motivationOf(w) + valueWeight(w) * gain;
    }
    return valueGain(context, team, w, give, get) + lambdaOf(w) * context.pointValue * dPts;
  }

  function worthIt(context, w, goal, dPts, dValue, size, side) {
    const P = paramsOf(context);
    if (context.mode === 'redraft') {
      if (!context.consensus) return dPts >= (side === 'me' ? P.minPoints.me : P.minPoints.them);
      if (w < P.outOfIt) return dValue >= P.minValue.rebuild * size;
      return dPts >= (side === 'me' ? P.minPoints.me : P.minPoints.them);
    }
    const stance = goal === 'now' ? 'now' : goal === 'future' ? 'rebuild' : w >= 0.6 ? 'now' : w < 0.3 ? 'rebuild' : 'mixed';
    if (stance === 'now') return dPts >= P.minPoints.me;
    if (stance === 'rebuild') return dValue >= P.minValue.rebuild * size;
    return (dPts >= P.minPoints.me && dValue >= -P.mixedFloor * size) || dValue >= P.minValue.mixed * size;
  }

  function startsAmong(context, pool, ids) {
    const starting = context.slots.filter((s) => !NOT_STARTING.has(s));
    const seen = new Map(ids.map((id) => [id, new Map()]));
    for (const w of context.weeks) {
      const best = optimal(context.slots, pool, (playerId) => (w.isOut(playerId) ? 0 : w.projOf(playerId)), context.positionsOf);
      best.starters.forEach((playerId, i) => {
        if (playerId && seen.has(playerId)) seen.get(playerId).set(starting[i], (seen.get(playerId).get(starting[i]) || 0) + 1);
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

  function priceGate(context, P, goal, rawGive, rawGet) {
    const size = Math.max(rawGive, rawGet, 1);
    if ((rawGive - rawGet) / size < -(context.mode === 'redraft' ? P.fairToleranceRedraft : context.fairTolerance || P.fairTolerance)) return 'theyLose';
    if ((rawGet - rawGive) / size < -(context.mode === 'redraft' ? P.overpayRedraft : P.overpay)[goal]) return 'youOverpay';
    return null;
  }

  function exactGate(context, P, goal, sides) {
    const { wMe, wThem, size, uMe, uThem, dMe, dThem, vMe, vThem } = sides;
    if (context.mode === 'redraft' && !context.consensus) {
      if (dMe < P.minPoints.me || dThem < P.minPoints.them) return 'noUpgrade';
      return null;
    }
    const scale = context.mode === 'redraft' ? 0 : 1;
    if (uMe < P.minUtility.me * size * scale || uThem < P.minUtility.them * size * scale) return 'exactUtility';
    if (!worthIt(context, wMe, goal, dMe, vMe, size, 'me')) return 'notWorthMe';
    if (!worthIt(context, wThem, 'balanced', dThem, vThem, size, 'them')) return 'notWorthThem';
    return null;
  }

  function judge(context, me, other, give, get) {
    const P = paramsOf(context);
    const goal = context.goal || 'balanced';
    const wMe = goal === 'now' ? 1 : goal === 'future' ? 0 : me.w;
    const wThem = other.w;
    const players = (ids) => ids.filter((id) => !context.isPick(id));
    const raw = (ids) => context.sideValue(ids.map((id) => context.rawOf(id)), ids.map(context.isPick));
    const rawGive = raw(give);
    const rawGet = raw(get);
    const size = Math.max(rawGive, rawGet, 1);
    const rawNetThem = (rawGive - rawGet) / size;
    const impact = tradeImpact({
      slots: context.slots, weeks: context.weeks, positionsOf: context.positionsOf,
      a: { pool: me.pool }, b: { pool: other.pool }, aGives: players(give), bGives: players(get)
    });
    const uMe = utility(context, me, wMe, give, get, impact.a.delta);
    const uThem = utility(context, other, wThem, get, give, impact.b.delta);
    const reason = priceGate(context, P, goal, rawGive, rawGet) || exactGate(context, P, goal, {
      wMe, wThem, size, uMe, uThem, dMe: impact.a.delta, dThem: impact.b.delta,
      vMe: context.mode === 'redraft' && !context.consensus ? 0 : valueGain(context, me, wMe, give, get),
      vThem: context.mode === 'redraft' && !context.consensus ? 0 : valueGain(context, other, wThem, get, give)
    });
    return { ok: !reason, reason, impact, rawNetThem, size, uMe, uThem };
  }

  function proposeFor(context, me, other, mine) {
    const P = paramsOf(context);
    const goal = context.goal || 'balanced';
    const wMe = goal === 'now' ? 1 : goal === 'future' ? 0 : me.w;
    const wThem = other.w;
    const lamMe = context.mode === 'redraft' ? motivationOf(wMe) : lambdaOf(wMe) * context.pointValue;
    const lamThem = context.mode === 'redraft' ? motivationOf(wThem) : lambdaOf(wThem) * context.pointValue;
    const val = (team, w, id) => (context.mode !== 'redraft' ? context.valueOf(team, id, w) : context.consensus ? (valueWeight(w) * context.valueOf(team, id, w)) / context.pointValue : 0);

    const theirs = dropLosses(other, context);
    const myGain = addGains(me, mine.base, other.assets.filter((id) => !context.isPick(id)), context);
    const theirGain = addGains(other, theirs.base, me.assets.filter((id) => !context.isPick(id)), context);
    const dropMe = (id) => mine.out.get(id) || 0;
    const dropThem = (id) => theirs.out.get(id) || 0;

    const giveScore = (id) => val(other, wThem, id) + lamThem * (theirGain.get(id) || 0) - val(me, wMe, id) - lamMe * dropMe(id);
    const askScore = (id) => val(me, wMe, id) + lamMe * (myGain.get(id) || 0) - val(other, wThem, id) - lamThem * dropThem(id);
    const top = (ids, score, must) => {
      const room = SIDE_SHOWN - (must ? 1 : 0);
      const best = (list) => list.slice().sort((a, b) => score(b) - score(a));
      const rest = ids.filter((id) => id !== must);
      const picks = best(rest.filter(context.isPick));
      const moving = best(rest.filter((id) => !context.isPick(id)));
      const takePicks = Math.min(picks.length, Math.max(PICKS_SHOWN, room - moving.length));
      const ranked = moving.slice(0, room - takePicks).concat(picks.slice(0, takePicks));
      return must ? [must].concat(ranked) : ranked;
    };
    const focus = context.focus || {};
    const shop = focus.shop && me.assets.includes(focus.shop) ? focus.shop : null;
    const target = focus.target && other.assets.includes(focus.target) ? focus.target : null;
    if ((focus.shop && !shop) || (focus.target && !target)) return [];
    const chip = (id) => context.isPick(id) || id === shop || id === target || !NOT_TRADE_CHIPS.has((context.positionsOf(id) || [])[0]);
    const gives = top(me.assets.filter(chip), giveScore, shop);
    const asks = top(other.assets.filter(chip), askScore, target);

    const players = (ids) => ids.filter((id) => !context.isPick(id));
    const spare = (team, loss) => (team.players || []).filter((id) => !loss(id) && context.canCut(id)).sort((a, b) => context.rawOf(a) - context.rawOf(b));
    const dustMe = spare(me, dropMe);
    const dustThem = spare(other, dropThem);
    const cutCost = (team, w, ids) => (context.mode === 'dynasty' ? ids.reduce((acc, id) => acc + context.valueOf(team, id, w), 0) : 0);
    const raw = (ids) => context.sideValue(ids.map((id) => context.rawOf(id)), ids.map(context.isPick));
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
        const priceFail = priceGate(context, P, goal, rawGive, rawGet);
        if (priceFail) continue;
        if (get.some((id) => !context.isPick(id) && id !== target && !(myGain.get(id) > 0) && context.rawOf(id) < DEAD_WEIGHT * size)) continue;
        if (give.some((id) => !context.isPick(id) && id !== shop && !(theirGain.get(id) > 0) && context.rawOf(id) < DEAD_WEIGHT * size)) continue;
        const dMe = sum(players(get).map((id) => myGain.get(id) || 0)) - sum(players(give).map(dropMe));
        const dThem = sum(players(give).map((id) => theirGain.get(id) || 0)) - sum(players(get).map(dropThem));
        const uMe = utility(context, me, wMe, give, get, dMe) - cutMe;
        const uThem = utility(context, other, wThem, get, give, dThem) - cutThem;
        if (uMe <= 0 || uThem <= 0) continue;
        approx.push({ give, get, size, drops: { me: dropsMe, them: dropsThem }, score: Math.sqrt(uMe * uThem) / (context.mode === 'redraft' ? 1 : size) });
      }
    }
    approx.sort((a, b) => b.score - a.score);

    const exact = [];
    for (const c of approx.slice(0, EXACT_PER_PARTNER)) {
      const gp = players(c.give);
      const ap = players(c.get);
      const impact = tradeImpact({
        slots: context.slots, weeks: context.weeks, positionsOf: context.positionsOf,
        a: { pool: me.pool }, b: { pool: other.pool }, aGives: gp, bGives: ap
      });
      const uMe = utility(context, me, wMe, c.give, c.get, impact.a.delta) - cutCost(me, wMe, c.drops.me);
      const uThem = utility(context, other, wThem, c.get, c.give, impact.b.delta) - cutCost(other, wThem, c.drops.them);
      const unfit = exactGate(context, P, goal, {
        wMe, wThem, size: c.size, uMe, uThem, dMe: impact.a.delta, dThem: impact.b.delta,
        vMe: valueGain(context, me, wMe, c.give, c.get), vThem: valueGain(context, other, wThem, c.get, c.give)
      });
      if (unfit) continue;
      const rawNetThem = (raw(c.give) - raw(c.get)) / c.size;
      const share = context.mode === 'redraft' ? Math.min(Math.max(uThem, 0) / 10, 1) : Math.min(uThem / c.size / 0.12, 1);
      const fair = context.mode === 'redraft' && !context.consensus ? 0.5 : Math.max(0, Math.min(1, 0.5 + rawNetThem / 0.2));
      const care = context.mode === 'redraft' ? (motivationOf(wThem) - 0.45) / 0.55 : 0.5 + 0.5 * Math.abs(wThem - 0.5) * 2 * 0.5;
      const appetite = 0.8 + 0.4 * (other.appetite == null ? 0.5 : other.appetite);
      const likelihood = Math.max(0.05, Math.min(0.95, (0.15 + 0.35 * share + 0.3 * fair + 0.2 * care) * appetite));
      const priced = context.mode === 'dynasty' || context.consensus;
      const fairness = priced ? 1 - 2.5 * Math.max(0, rawNetThem - 0.04) - 1.5 * Math.max(0, -rawNetThem - 0.04) : 1;
      const quality = Math.max(0.1, fairness) * (context.mode === 'redraft' ? Math.sqrt(uMe * uThem) : Math.sqrt(uMe * uThem) / c.size);
      const entry = {
        partnerId: other.id, give: c.give, get: c.get, size: c.size, drops: c.drops,
        me: { dPts: impact.a.delta, utility: uMe, wMe, starts: startsAmong(context, me.pool.filter((id) => !gp.includes(id)).concat(ap), ap) },
        them: { dPts: impact.b.delta, utility: uThem, starts: startsAmong(context, other.pool.filter((id) => !ap.includes(id)).concat(gp), gp) },
        rawNetThem, likelihood, score: quality * (0.6 + 0.4 * likelihood)
      };
      exact.push(entry);
      const lastItem = entry;
      const regular = lastItem.me.starts.length ? lastItem.me.starts[0].weeks / context.weeks.length : 0;
      lastItem.score *= 0.7 + 0.3 * Math.min(1, regular / 0.6);
    }
    exact.sort((a, b) => b.score - a.score);

    const out = [];
    const asked = new Set();
    const offered = new Set();
    const withPicks = (p) => p.give.concat(p.get).some(context.isPick);
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
