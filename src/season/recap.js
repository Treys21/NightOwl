// A season recap for one roster, from the weekly matchups and the waiver wire:
// the weeks the bench cost you, your most productive starter, the best player
// you picked up and the one you let go. Pure: no DOM, no network.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { optimal, biggestMiss } = NightOwl.season;
  const round1 = (n) => Math.round(n * 10) / 10;

  /**
   * Weekly lineup decisions for one roster.
   *   weekly  [{ week, rosters: { [rosterId]: { starters: [pid], points: { pid: pts } } } }]
   * -> { weeks: [{ week, actual, best, loss, miss }], totalLoss, mvp: { pid, pts, weeks } | null }
   *    miss is the single swap that would have gained the most (see season.biggestMiss)
   */
  function lineups(rosterId, weekly, slots, positionsOf) {
    const weeks = [];
    const started = new Map();
    for (const w of weekly) {
      const entry = w.rosters[rosterId];
      if (!entry || !entry.points) continue;
      const pointsOf = (pid) => entry.points[pid] || 0;
      const picked = (entry.starters || []).slice();
      const pool = Object.keys(entry.points);
      const actual = picked.reduce((sum, pid) => sum + (pid && pid !== '0' ? pointsOf(pid) : 0), 0);
      const best = optimal(slots, pool, pointsOf, positionsOf);
      const starters = picked.map((pid) => (pid && pid !== '0' ? pid : null));
      const bench = pool.filter((pid) => !starters.includes(pid));
      weeks.push({
        week: w.week, actual: round1(actual), best: round1(best.points), loss: round1(Math.max(0, best.points - actual)),
        miss: biggestMiss(slots, starters, bench, pointsOf, positionsOf)
      });
      for (const pid of starters) {
        if (!pid) continue;
        const s = started.get(pid) || { pts: 0, weeks: 0 };
        s.pts += pointsOf(pid);
        s.weeks++;
        started.set(pid, s);
      }
    }
    const top = [...started.entries()].sort((a, b) => b[1].pts - a[1].pts)[0];
    return {
      weeks,
      totalLoss: round1(weeks.reduce((sum, w) => sum + w.loss, 0)),
      mvp: top ? { pid: top[0], pts: round1(top[1].pts), weeks: top[1].weeks } : null
    };
  }

  /**
   * The best add and the biggest regret among a roster's waiver and free-agent moves.
   *   moves  [{ type, leg, adds, drops }] (any roster's; only this roster's count)
   * -> { bestAdd: { pid, week, started, onRoster } | null, regret: { pid, week, pts } | null, adds, drops }
   */
  function wire(rosterId, moves, weekly) {
    const mine = (map) => Object.entries(map || {}).filter(([, rid]) => rid === rosterId).map(([pid]) => pid);
    let bestAdd = null;
    let regret = null;
    let adds = 0;
    let drops = 0;
    for (const m of moves) {
      for (const pid of mine(m.adds)) {
        adds++;
        let startedPts = 0;
        let onRoster = 0;
        for (const w of weekly) {
          if (w.week <= (m.leg || 0)) continue;
          const entry = w.rosters[rosterId];
          if (!entry || !entry.points || entry.points[pid] == null) continue;
          onRoster += entry.points[pid];
          if ((entry.starters || []).includes(pid)) startedPts += entry.points[pid];
        }
        if (!bestAdd || startedPts > bestAdd.started) bestAdd = { pid, week: m.leg || 0, started: round1(startedPts), onRoster: round1(onRoster) };
      }
      for (const pid of mine(m.drops)) {
        drops++;
        // What he scored for whoever took him (or anyone) after you let him go.
        let pts = 0;
        for (const w of weekly) {
          if (w.week <= (m.leg || 0)) continue;
          for (const [rid, entry] of Object.entries(w.rosters)) {
            if (Number(rid) === rosterId || !entry.points || entry.points[pid] == null) continue;
            if ((entry.starters || []).includes(pid)) pts += entry.points[pid];
          }
        }
        if (!regret || pts > regret.pts) regret = { pid, week: m.leg || 0, pts: round1(pts) };
      }
    }
    return { bestAdd: bestAdd && bestAdd.started > 0 ? bestAdd : null, regret: regret && regret.pts > 0 ? regret : null, adds, drops };
  }

  NightOwl.recap = { lineups, wire };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.recap;
