globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { round1 } = NightOwl.numbers;
  const { optimal, biggestMiss } = NightOwl.season;

  function lineups(rosterId, weekly, slots, positionsOf) {
    const weeks = [];
    const started = new Map();
    for (const weekRecord of weekly) {
      const entry = weekRecord.rosters[rosterId];
      if (!entry || !entry.points) continue;
      const pointsOf = (playerId) => entry.points[playerId] || 0;
      const picked = (entry.starters || []).slice();
      const pool = Object.keys(entry.points);
      const actual = picked.reduce((sum, playerId) => sum + (playerId && playerId !== '0' ? pointsOf(playerId) : 0), 0);
      const best = optimal(slots, pool, pointsOf, positionsOf);
      const starters = picked.map((playerId) => (playerId && playerId !== '0' ? playerId : null));
      const bench = pool.filter((playerId) => !starters.includes(playerId));
      weeks.push({
        week: weekRecord.week, actual: round1(actual), best: round1(best.points), loss: round1(Math.max(0, best.points - actual)),
        miss: biggestMiss(slots, starters, bench, pointsOf, positionsOf)
      });
      for (const playerId of starters) {
        if (!playerId) continue;
        const playerTotals = started.get(playerId) || { pts: 0, weeks: 0 };
        playerTotals.pts += pointsOf(playerId);
        playerTotals.weeks++;
        started.set(playerId, playerTotals);
      }
    }
    const top = [...started.entries()].sort((a, b) => b[1].pts - a[1].pts)[0];
    return {
      weeks,
      totalLoss: round1(weeks.reduce((sum, week) => sum + week.loss, 0)),
      mvp: top ? { pid: top[0], pts: round1(top[1].pts), weeks: top[1].weeks } : null,
      scorers: [...started.entries()].sort((a, b) => b[1].pts - a[1].pts).slice(0, 3).map(([pid, totals]) => ({ pid, pts: round1(totals.pts), weeks: totals.weeks }))
    };
  }

  function wire(rosterId, moves, weekly) {
    const mine = (map) => Object.entries(map || {}).filter(([, rid]) => rid === rosterId).map(([playerId]) => playerId);
    let bestAdd = null;
    let regret = null;
    let adds = 0;
    let drops = 0;
    for (const move of moves) {
      for (const playerId of mine(move.adds)) {
        adds++;
        let startedPts = 0;
        let onRoster = 0;
        for (const weekRecord of weekly) {
          if (weekRecord.week <= (move.leg || 0)) continue;
          const entry = weekRecord.rosters[rosterId];
          if (!entry || !entry.points || entry.points[playerId] == null) continue;
          onRoster += entry.points[playerId];
          if ((entry.starters || []).includes(playerId)) startedPts += entry.points[playerId];
        }
        if (!bestAdd || startedPts > bestAdd.started) bestAdd = { pid: playerId, week: move.leg || 0, started: round1(startedPts), onRoster: round1(onRoster) };
      }
      for (const playerId of mine(move.drops)) {
        drops++;
        let points = 0;
        for (const weekRecord of weekly) {
          if (weekRecord.week <= (move.leg || 0)) continue;
          for (const [rid, entry] of Object.entries(weekRecord.rosters)) {
            if (Number(rid) === rosterId || !entry.points || entry.points[playerId] == null) continue;
            if ((entry.starters || []).includes(playerId)) points += entry.points[playerId];
          }
        }
        if (!regret || points > regret.pts) regret = { pid: playerId, week: move.leg || 0, pts: round1(points) };
      }
    }
    return { bestAdd: bestAdd && bestAdd.started > 0 ? bestAdd : null, regret: regret && regret.pts > 0 ? regret : null, adds, drops };
  }

  NightOwl.recap = { lineups, wire };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.recap;
