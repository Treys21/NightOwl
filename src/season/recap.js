globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { optimal, biggestMiss } = NightOwl.season;
  const round1 = (n) => Math.round(n * 10) / 10;

  function lineups(rosterId, weekly, slots, positionsOf) {
    const weeks = [];
    const started = new Map();
    for (const w of weekly) {
      const entry = w.rosters[rosterId];
      if (!entry || !entry.points) continue;
      const pointsOf = (playerId) => entry.points[playerId] || 0;
      const picked = (entry.starters || []).slice();
      const pool = Object.keys(entry.points);
      const actual = picked.reduce((sum, playerId) => sum + (playerId && playerId !== '0' ? pointsOf(playerId) : 0), 0);
      const best = optimal(slots, pool, pointsOf, positionsOf);
      const starters = picked.map((playerId) => (playerId && playerId !== '0' ? playerId : null));
      const bench = pool.filter((playerId) => !starters.includes(playerId));
      weeks.push({
        week: w.week, actual: round1(actual), best: round1(best.points), loss: round1(Math.max(0, best.points - actual)),
        miss: biggestMiss(slots, starters, bench, pointsOf, positionsOf)
      });
      for (const playerId of starters) {
        if (!playerId) continue;
        const s = started.get(playerId) || { pts: 0, weeks: 0 };
        s.pts += pointsOf(playerId);
        s.weeks++;
        started.set(playerId, s);
      }
    }
    const top = [...started.entries()].sort((a, b) => b[1].pts - a[1].pts)[0];
    return {
      weeks,
      totalLoss: round1(weeks.reduce((sum, w) => sum + w.loss, 0)),
      mvp: top ? { pid: top[0], pts: round1(top[1].pts), weeks: top[1].weeks } : null
    };
  }

  function wire(rosterId, moves, weekly) {
    const mine = (map) => Object.entries(map || {}).filter(([, rid]) => rid === rosterId).map(([playerId]) => playerId);
    let bestAdd = null;
    let regret = null;
    let adds = 0;
    let drops = 0;
    for (const m of moves) {
      for (const playerId of mine(m.adds)) {
        adds++;
        let startedPts = 0;
        let onRoster = 0;
        for (const w of weekly) {
          if (w.week <= (m.leg || 0)) continue;
          const entry = w.rosters[rosterId];
          if (!entry || !entry.points || entry.points[playerId] == null) continue;
          onRoster += entry.points[playerId];
          if ((entry.starters || []).includes(playerId)) startedPts += entry.points[playerId];
        }
        if (!bestAdd || startedPts > bestAdd.started) bestAdd = { pid: playerId, week: m.leg || 0, started: round1(startedPts), onRoster: round1(onRoster) };
      }
      for (const playerId of mine(m.drops)) {
        drops++;
        let points = 0;
        for (const w of weekly) {
          if (w.week <= (m.leg || 0)) continue;
          for (const [rid, entry] of Object.entries(w.rosters)) {
            if (Number(rid) === rosterId || !entry.points || entry.points[playerId] == null) continue;
            if ((entry.starters || []).includes(playerId)) points += entry.points[playerId];
          }
        }
        if (!regret || points > regret.pts) regret = { pid: playerId, week: m.leg || 0, pts: round1(points) };
      }
    }
    return { bestAdd: bestAdd && bestAdd.started > 0 ? bestAdd : null, regret: regret && regret.pts > 0 ? regret : null, adds, drops };
  }

  NightOwl.recap = { lineups, wire };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.recap;
