globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const sum = (values) => values.reduce((total, value) => total + value, 0);
  const median = (values) => {
    if (!values.length) return null;
    const sorted = values.slice().sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  };

  function parse(transactions, season) {
    const out = [];
    for (const transaction of transactions || []) {
      if (!transaction || transaction.type !== 'trade' || transaction.status !== 'complete') continue;
      const ids = (transaction.roster_ids || []).slice();
      if (ids.length < 2) continue;
      const sides = {};
      for (const rosterId of ids) sides[rosterId] = { got: [], gave: [], gotPicks: [], gavePicks: [] };
      for (const [playerId, rosterId] of Object.entries(transaction.adds || {})) if (sides[rosterId]) sides[rosterId].got.push(playerId);
      for (const [playerId, rosterId] of Object.entries(transaction.drops || {})) if (sides[rosterId]) sides[rosterId].gave.push(playerId);
      for (const tradedPick of transaction.draft_picks || []) {
        const pick = { season: String(tradedPick.season), round: tradedPick.round, from: tradedPick.roster_id };
        if (sides[tradedPick.owner_id]) sides[tradedPick.owner_id].gotPicks.push(pick);
        if (sides[tradedPick.previous_owner_id]) sides[tradedPick.previous_owner_id].gavePicks.push(pick);
      }
      out.push({ id: transaction.transaction_id, season: String(season), week: transaction.leg || 1, at: transaction.created || 0, sides });
    }
    return out.sort((a, b) => b.at - a.at);
  }

  function realized(trade, weekly) {
    const out = {};
    for (const [rosterId, side] of Object.entries(trade.sides)) {
      let started = 0;
      let bench = 0;
      for (const weekEntry of weekly) {
        if (weekEntry.week <= trade.week) continue;
        const entry = weekEntry.rosters[rosterId];
        if (!entry) continue;
        const starters = new Set(entry.starters || []);
        for (const playerId of side.got) {
          const points = entry.points && entry.points[playerId];
          if (points == null) continue;
          if (starters.has(playerId)) started += points; else bench += points;
        }
      }
      out[rosterId] = { started: Math.round(started * 10) / 10, bench: Math.round(bench * 10) / 10 };
    }
    return out;
  }

  const LETTERS = [[0.4, 'A+'], [0.3, 'A'], [0.22, 'A-'], [0.16, 'B+'], [0.11, 'B'], [0.07, 'B-'], [0.035, 'C+'], [-0.035, 'C'], [-0.07, 'C-'], [-0.11, 'D+'], [-0.16, 'D'], [-0.22, 'D-']];
  const letterFor = (score) => (LETTERS.find(([min]) => score >= min) || [0, 'F'])[1];
  const toneOf = (letter) => letter[0];

  function grade(trade, context, real) {
    const ids = Object.keys(trade.sides);
    const assets = (rosterId, which) => {
      const side = trade.sides[rosterId];
      return (which === 'got' ? side.got : side.gave).map((playerId) => ({ pid: playerId })).concat((which === 'got' ? side.gotPicks : side.gavePicks).map((pick) => ({ pick })));
    };
    const out = {};
    for (const rosterId of ids) {
      const got = context.sideValue(assets(rosterId, 'got').map(context.assetValue));
      const gave = context.sideValue(assets(rosterId, 'gave').map(context.assetValue));
      const size = Math.max(got, gave, 1);
      const valueNet = got - gave;
      const others = ids.filter((otherId) => otherId !== rosterId);
      const mine = real && real[rosterId] ? real[rosterId].started : 0;
      const theirs = sum(others.map((other) => (real && real[other] ? real[other].started : 0)));
      const ptsNet = mine - theirs;
      const hasValue = got > 0 || gave > 0;
      const ptsSize = Math.max(mine, theirs, hasValue ? 60 : 30);
      const valuePct = hasValue ? valueNet / size : 0;
      const ptsPct = ptsNet / ptsSize;
      const score = hasValue ? 0.85 * valuePct + 0.15 * ptsPct : ptsPct;
      out[rosterId] = { valueNet, valuePct, ptsNet: Math.round(ptsNet * 10) / 10, ptsPct, score, letter: letterFor(score), tone: toneOf(letterFor(score)) };
    }
    return out;
  }

  function profiles(graded, keyOf = (trade, rosterId) => rosterId) {
    const out = {};
    for (const { trade, grades } of graded) {
      for (const [rosterId, side] of Object.entries(trade.sides)) {
        const key = keyOf(trade, rosterId);
        const profile = out[key] || (out[key] = { trades: 0, pcts: [], picks: 0, assets: 0, gave: 0, got: 0, partners: {} });
        profile.trades++;
        profile.pcts.push(grades[rosterId].valuePct);
        profile.picks += side.gotPicks.length + side.gavePicks.length;
        profile.assets += side.got.length + side.gave.length + side.gotPicks.length + side.gavePicks.length;
        profile.gave += side.gave.length;
        profile.got += side.got.length;
        for (const otherRosterId of Object.keys(trade.sides)) if (otherRosterId !== rosterId) profile.partners[keyOf(trade, otherRosterId)] = (profile.partners[keyOf(trade, otherRosterId)] || 0) + 1;
      }
    }
    const done = {};
    for (const [rosterId, profile] of Object.entries(out)) {
      done[rosterId] = {
        trades: profile.trades,
        avgPct: Math.round(sum(profile.pcts) / profile.pcts.length * 1000) / 1000,
        picksShare: profile.assets ? profile.picks / profile.assets : 0,
        avgGave: profile.gave / profile.trades,
        avgGot: profile.got / profile.trades,
        partners: profile.partners
      };
    }
    return done;
  }

  function league(graded, seasons) {
    const abs = [];
    for (const { grades } of graded) for (const grade of Object.values(grades)) if (grade.valuePct) abs.push(Math.abs(grade.valuePct));
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
