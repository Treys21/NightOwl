// What a roster move is worth: the points a lineup gains over the rest of the
// season. Waiver adds and trades are both "change the roster, set the best
// lineup every remaining week, compare". Pure: no DOM, no network.
//
//   weeks   one entry per remaining week, index 0 = the next one:
//           { projOf: pid -> projected points, isOut: pid -> true when he won't play,
//             weight?: how much the week counts (playoff weeks count extra) }
//   pool    the players who can start (roster minus IR and taxi)
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { optimal } = NightOwl.season;
  const round1 = (n) => Math.round(n * 10) / 10;

  // Candidates scanned per position before the lineup math: enough to find
  // every real upgrade, few enough that a league answers in well under a second.
  const SCAN_PER_POSITION = 14;
  // Players weighed as the one to drop (the ones the lineup misses least).
  const DROP_OPTIONS = 3;
  const MIN_GAIN = 0.05;

  /** Starter points per remaining week, and their sum, for the best lineup this pool can set. */
  function lineupPoints(slots, pool, weeks, positionsOf) {
    const perWeek = weeks.map((w) => optimal(slots, pool, (pid) => (w.isOut(pid) ? 0 : w.projOf(pid)), positionsOf).points * (w.weight || 1));
    return { total: perWeek.reduce((a, b) => a + b, 0), perWeek };
  }

  /** A player's projected points over the remaining weeks (zero while he's out). */
  const restOfSeason = (pid, weeks) => weeks.reduce((sum, w) => sum + (w.isOut(pid) ? 0 : w.projOf(pid) * (w.weight || 1)), 0);

  /**
   * Free agents who would raise your lineup, best first.
   *   slots, pool, weeks, positionsOf   as above
   *   droppable   players you could cut (not IR or taxi)
   *   openSpots   empty roster spots: when there is one, nobody has to go
   *   candidates  free-agent pids
   *   minGain     starter points a free agent must add (rest of season; half of it counts for next week alone)
   * -> [{ pid, gain, nowGain, drop, ros, next }]
   *    gain     starter points added over the rest of the season
   *    nowGain  the same for next week alone
   *    drop     the player to cut for him (null with an open spot)
   *    ros      his projected points rest of season; next: next week
   */
  function waiverTargets({ slots, pool, droppable, openSpots = 0, candidates, weeks, positionsOf, minGain = MIN_GAIN }) {
    if (!weeks.length) return [];
    const base = lineupPoints(slots, pool, weeks, positionsOf);

    // Narrow the field to the best few at each position by projection alone.
    const byPosition = new Map();
    for (const pid of candidates) {
      const ros = restOfSeason(pid, weeks);
      if (ros <= 0) continue;
      const pos = (positionsOf(pid) || [])[0] || '?';
      if (!byPosition.has(pos)) byPosition.set(pos, []);
      byPosition.get(pos).push({ pid, ros });
    }
    const scan = [...byPosition.values()].flatMap((list) => list.sort((a, b) => b.ros - a.ros).slice(0, SCAN_PER_POSITION));

    // Who the lineup misses least: cutting him costs the fewest starter points.
    let drops = [null];
    if (openSpots <= 0) {
      drops = droppable
        .map((pid) => ({ pid, loss: base.total - lineupPoints(slots, pool.filter((p) => p !== pid), weeks, positionsOf).total, ros: restOfSeason(pid, weeks) }))
        .sort((a, b) => a.loss - b.loss || a.ros - b.ros)
        .slice(0, DROP_OPTIONS)
        .map((d) => d.pid);
      if (!drops.length) return [];
    }

    const out = [];
    for (const { pid, ros } of scan) {
      let best = null;
      for (const drop of drops) {
        const next = lineupPoints(slots, pool.filter((p) => p !== drop).concat(pid), weeks, positionsOf);
        const gain = next.total - base.total;
        if (!best || gain > best.gain) best = { gain, nowGain: next.perWeek[0] - base.perWeek[0], drop };
      }
      if (best.gain >= minGain || best.nowGain >= minGain * 0.5) {
        out.push({ pid, gain: round1(best.gain), nowGain: round1(best.nowGain), drop: best.drop, ros: round1(ros), next: round1(weeks[0].isOut(pid) ? 0 : weeks[0].projOf(pid)) });
      }
    }
    return out.sort((a, b) => b.gain - a.gain || b.nowGain - a.nowGain);
  }

  const swap = (pool, out, inn) => {
    const gone = new Set(out);
    return pool.filter((p) => !gone.has(p)).concat(inn);
  };

  /**
   * The lineup points each side of a trade gains or loses.
   *   a, b   { pool } for the two teams
   *   aGives, bGives   pids that change hands (aGives go to b)
   * -> { a, b } each { before, after, delta, perWeek: [delta per week] }
   */
  function tradeImpact({ slots, weeks, positionsOf, a, b, aGives, bGives }) {
    const side = (pool, gives, gets) => {
      const before = lineupPoints(slots, pool, weeks, positionsOf);
      const after = lineupPoints(slots, swap(pool, gives, gets), weeks, positionsOf);
      return {
        before: round1(before.total),
        after: round1(after.total),
        delta: round1(after.total - before.total),
        perWeek: after.perWeek.map((v, i) => round1(v - before.perWeek[i]))
      };
    };
    return { a: side(a.pool, aGives, bGives), b: side(b.pool, bGives, aGives) };
  }

  /** The league's rosters after a trade: aId gives aGives to bId and gets bGives. */
  function applyTrade(rosters, aId, bId, aGives, bGives) {
    const move = (ro, out, inn) => {
      const gone = new Set(out);
      const keep = (list) => (list || []).filter((p) => !gone.has(p));
      return Object.assign({}, ro, {
        players: keep(ro.players).concat(inn),
        starters: keep(ro.starters),
        reserve: keep(ro.reserve),
        taxi: keep(ro.taxi)
      });
    };
    return rosters.map((ro) => {
      if (ro.roster_id === aId) return move(ro, aGives, bGives);
      if (ro.roster_id === bId) return move(ro, bGives, aGives);
      return ro;
    });
  }

  NightOwl.value = { lineupPoints, restOfSeason, waiverTargets, tradeImpact, applyTrade };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.value;
