globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const sum = (xs) => xs.reduce((a, b) => a + b, 0);
  const median = (xs) => {
    if (!xs.length) return null;
    const s = xs.slice().sort((a, b) => a - b);
    const mid = Math.floor(s.length / 2);
    return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
  };

  function parse(transactions, season) {
    const out = [];
    for (const tx of transactions || []) {
      if (!tx || tx.type !== 'trade' || tx.status !== 'complete') continue;
      const ids = (tx.roster_ids || []).slice();
      if (ids.length < 2) continue;
      const sides = {};
      for (const id of ids) sides[id] = { got: [], gave: [], gotPicks: [], gavePicks: [] };
      for (const [pid, rid] of Object.entries(tx.adds || {})) if (sides[rid]) sides[rid].got.push(pid);
      for (const [pid, rid] of Object.entries(tx.drops || {})) if (sides[rid]) sides[rid].gave.push(pid);
      for (const p of tx.draft_picks || []) {
        const pick = { season: String(p.season), round: p.round, from: p.roster_id };
        if (sides[p.owner_id]) sides[p.owner_id].gotPicks.push(pick);
        if (sides[p.previous_owner_id]) sides[p.previous_owner_id].gavePicks.push(pick);
      }
      out.push({ id: tx.transaction_id, season: String(season), week: tx.leg || 1, at: tx.created || 0, sides });
    }
    return out.sort((a, b) => b.at - a.at);
  }

  function realized(trade, weekly) {
    const out = {};
    for (const [rid, side] of Object.entries(trade.sides)) {
      let started = 0;
      let bench = 0;
      for (const w of weekly) {
        if (w.week <= trade.week) continue;
        const entry = w.rosters[rid];
        if (!entry) continue;
        const starters = new Set(entry.starters || []);
        for (const pid of side.got) {
          const pts = entry.points && entry.points[pid];
          if (pts == null) continue;
          if (starters.has(pid)) started += pts; else bench += pts;
        }
      }
      out[rid] = { started: Math.round(started * 10) / 10, bench: Math.round(bench * 10) / 10 };
    }
    return out;
  }

  const LETTERS = [[0.4, 'A+'], [0.3, 'A'], [0.22, 'A-'], [0.16, 'B+'], [0.11, 'B'], [0.07, 'B-'], [0.035, 'C+'], [-0.035, 'C'], [-0.07, 'C-'], [-0.11, 'D+'], [-0.16, 'D'], [-0.22, 'D-']];
  const letterFor = (score) => (LETTERS.find(([min]) => score >= min) || [0, 'F'])[1];
  const toneOf = (letter) => letter[0];

  function grade(trade, ctx, real) {
    const ids = Object.keys(trade.sides);
    const assets = (rid, which) => {
      const s = trade.sides[rid];
      return (which === 'got' ? s.got : s.gave).map((pid) => ({ pid })).concat((which === 'got' ? s.gotPicks : s.gavePicks).map((pick) => ({ pick })));
    };
    const out = {};
    for (const rid of ids) {
      const got = ctx.sideValue(assets(rid, 'got').map(ctx.assetValue));
      const gave = ctx.sideValue(assets(rid, 'gave').map(ctx.assetValue));
      const size = Math.max(got, gave, 1);
      const valueNet = got - gave;
      const others = ids.filter((o) => o !== rid);
      const mine = real && real[rid] ? real[rid].started : 0;
      const theirs = sum(others.map((o) => (real && real[o] ? real[o].started : 0)));
      const ptsNet = mine - theirs;
      const hasValue = got > 0 || gave > 0;
      const ptsSize = Math.max(mine, theirs, hasValue ? 60 : 30);
      const valuePct = hasValue ? valueNet / size : 0;
      const ptsPct = ptsNet / ptsSize;
      const score = hasValue ? 0.85 * valuePct + 0.15 * ptsPct : ptsPct;
      out[rid] = { valueNet, valuePct, ptsNet: Math.round(ptsNet * 10) / 10, ptsPct, score, letter: letterFor(score), tone: toneOf(letterFor(score)) };
    }
    return out;
  }

  function profiles(graded, keyOf = (trade, rid) => rid) {
    const out = {};
    for (const { trade, grades } of graded) {
      for (const [rid, side] of Object.entries(trade.sides)) {
        const key = keyOf(trade, rid);
        const p = out[key] || (out[key] = { trades: 0, pcts: [], picks: 0, assets: 0, gave: 0, got: 0, partners: {} });
        p.trades++;
        p.pcts.push(grades[rid].valuePct);
        p.picks += side.gotPicks.length + side.gavePicks.length;
        p.assets += side.got.length + side.gave.length + side.gotPicks.length + side.gavePicks.length;
        p.gave += side.gave.length;
        p.got += side.got.length;
        for (const o of Object.keys(trade.sides)) if (o !== rid) p.partners[keyOf(trade, o)] = (p.partners[keyOf(trade, o)] || 0) + 1;
      }
    }
    const done = {};
    for (const [rid, p] of Object.entries(out)) {
      done[rid] = {
        trades: p.trades,
        avgPct: Math.round(sum(p.pcts) / p.pcts.length * 1000) / 1000,
        picksShare: p.assets ? p.picks / p.assets : 0,
        avgGave: p.gave / p.trades,
        avgGot: p.got / p.trades,
        partners: p.partners
      };
    }
    return done;
  }

  function league(graded, seasons) {
    const abs = [];
    for (const { grades } of graded) for (const g of Object.values(grades)) if (g.valuePct) abs.push(Math.abs(g.valuePct));
    const med = median(abs);
    return {
      count: graded.length,
      perSeason: seasons ? graded.length / seasons : graded.length,
      medianAbsPct: med,
      tolerance: graded.length >= 4 && med != null ? Math.max(0.06, Math.min(0.2, med * 1.25)) : null
    };
  }

  NightOwl.tradeHistory = { parse, realized, grade, profiles, league, letterFor, toneOf };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.tradeHistory;
