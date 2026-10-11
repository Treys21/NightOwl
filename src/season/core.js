// Season math, across all your leagues. Pure: no DOM, no network.
//
//   all-play  your record if you'd played every team every week; it takes the
//             schedule out of the picture
//   luck      actual wins minus the wins your weekly scores "deserved"
//             (expected wins = share of the league you outscored each week)
//   max       the best lineup you could have set from your roster, on the
//             points players actually scored (Sleeper's "max points")
//   win %     chance to win a live matchup, from current points plus each
//             starter's projection for the part of his game that's left
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { assign, canPlay, NOT_STARTING_SLOTS } = NightOwl.lineups;
  const round1 = (n) => Math.round(n * 10) / 10;
  const round2 = (n) => Math.round(n * 100) / 100;

  /**
   * Best lineup on actual points.
   *   slots        roster_positions (BN/IR/TAXI are ignored)
   *   pids         players available that week (roster minus IR and taxi)
   *   pointsOf     pid -> points scored
   *   positionsOf  pid -> eligible positions
   * -> { points, starters: [pid|null per starting slot] }
   */
  function optimal(slots, pids, pointsOf, positionsOf) {
    const starting = slots.filter((s) => !NOT_STARTING_SLOTS.has(s));
    const pool = pids.map((pid) => ({ pid, pts: pointsOf(pid) || 0, positions: positionsOf(pid) }));
    const picks = assign(starting, pool, (slot, p) => (canPlay(slot, p.positions) ? p.pts : null));
    return {
      points: round2(picks.reduce((sum, p) => sum + (p ? p.pts : 0), 0)),
      starters: picks.map((p) => (p ? p.pid : null))
    };
  }

  /**
   * The single change that would have gained the most: a bench player who
   * outscored a starter he could have replaced.
   * -> { in, out, gain } or null
   */
  function biggestMiss(slots, starters, bench, pointsOf, positionsOf) {
    const starting = slots.filter((s) => !NOT_STARTING_SLOTS.has(s));
    let best = null;
    starting.forEach((slot, i) => {
      const out = starters[i];
      const outPts = out ? pointsOf(out) || 0 : 0;
      for (const pid of bench) {
        if (!canPlay(slot, positionsOf(pid))) continue;
        const gain = (pointsOf(pid) || 0) - outPts;
        if (gain > 0 && (!best || gain > best.gain)) best = { in: pid, out, slot, gain: round2(gain) };
      }
    });
    return best;
  }

  /**
   * weeks: [{ [rosterId]: points }] for completed weeks.
   * -> { [rosterId]: { w, l, t, expected } } where expected = sum of each week's
   *    share of other teams outscored (a tie counts half). In leagues that
   *    also play the league median each week, that game's result follows from
   *    the score alone, so it's added to expected as it happened.
   */
  function allPlay(weeks, { medianGame = false } = {}) {
    const out = {};
    for (const week of weeks) {
      const ids = Object.keys(week).filter((id) => week[id] != null);
      for (const id of ids) {
        const rec = out[id] || (out[id] = { w: 0, l: 0, t: 0, expected: 0 });
        let beat = 0;
        for (const other of ids) {
          if (other === id) continue;
          if (week[id] > week[other]) { rec.w++; beat++; } else if (week[id] < week[other]) rec.l++; else { rec.t++; beat += 0.5; }
        }
        if (ids.length > 1) rec.expected += beat / (ids.length - 1);
        if (medianGame && ids.length > 1) {
          // Top half of the league wins the median game.
          const above = ids.filter((other) => week[other] > week[id]).length;
          const half = ids.length / 2;
          rec.expected += above < half - (ids.length % 2 ? 0.5 : 0) ? 1 : 0;
        }
      }
    }
    for (const rec of Object.values(out)) rec.expected = round2(rec.expected);
    return out;
  }

  const points = (whole, decimal) => (whole || 0) + (decimal || 0) / 100;

  /**
   * rosters: Sleeper rosters (settings carry wins, losses, ties, fpts, ppts...)
   * weeks:   completed weeks' scores, as for allPlay
   * options: { medianGame } when the league also plays the median each week
   * -> rows ranked like Sleeper (wins, then points for), each with all-play,
   *    luck and lineup efficiency.
   */
  function standings(rosters, weeks, options = {}) {
    const ap = allPlay(weeks, options);
    const rows = rosters.map((r) => {
      const s = r.settings || {};
      const pf = points(s.fpts, s.fpts_decimal);
      const max = points(s.ppts, s.ppts_decimal);
      const rec = ap[r.roster_id] || { w: 0, l: 0, t: 0, expected: 0 };
      const wins = s.wins || 0;
      return {
        rosterId: r.roster_id,
        ownerId: r.owner_id,
        coOwners: r.co_owners || [],
        wins,
        losses: s.losses || 0,
        ties: s.ties || 0,
        pf: round2(pf),
        pa: round2(points(s.fpts_against, s.fpts_against_decimal)),
        max: max ? round2(max) : null,
        efficiency: max ? pf / max : null,
        allPlay: rec,
        luck: weeks.length ? round1(wins + (s.ties || 0) / 2 - rec.expected) : null
      };
    });
    rows.sort((a, b) => (b.wins + b.ties / 2) - (a.wins + a.ties / 2) || b.pf - a.pf);
    rows.forEach((row, i) => { row.rank = i + 1; });
    return rows;
  }

  // Standard normal CDF (Abramowitz-Stegun 7.1.26, error < 1.5e-7).
  function phi(z) {
    const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z / 2);
    return z >= 0 ? (1 + y) / 2 : (1 - y) / 2;
  }

  // A player's final score is roughly normal around his projection, with a
  // spread about half the projection (fantasy points are noisy).
  const SPREAD = 0.5;

  /**
   * One side's expected final score and variance.
   *   starters: [{ points, proj, remaining }] where remaining is the share of
   *   his game left (1 before kickoff, 0 when final or on bye).
   */
  function outlook(starters) {
    let mean = 0;
    let variance = 0;
    for (const s of starters) {
      const left = Math.max(0, Math.min(1, s.remaining || 0));
      const proj = Math.max(0, s.proj || 0);
      mean += (s.points || 0) + proj * left;
      variance += (SPREAD * proj) ** 2 * left;
    }
    return { mean: round2(mean), variance };
  }

  /** Chance (0-1) that `me` finishes ahead of `opp`. */
  function winProbability(me, opp) {
    const sd = Math.sqrt(me.variance + opp.variance);
    if (sd === 0) return me.mean > opp.mean ? 1 : me.mean < opp.mean ? 0 : 0.5;
    return phi((me.mean - opp.mean) / sd);
  }

  // Small seeded PRNG (mulberry32) so odds don't jitter between refreshes.
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const hash = (text) => [...String(text)].reduce((h, c) => Math.imul(h ^ c.charCodeAt(0), 16777619), 2166136261);

  /**
   * Each team's scoring as mean and spread, from its weekly scores, pulled
   * toward the league average early in the season (few weeks = noisy).
   */
  function teamStrength(weeks, rosterId) {
    const all = weeks.flatMap((w) => Object.values(w)).filter((v) => v != null);
    const leagueMean = all.length ? all.reduce((a, b) => a + b, 0) / all.length : 100;
    const mine = weeks.map((w) => w[rosterId]).filter((v) => v != null);
    const n = mine.length;
    const avg = n ? mine.reduce((a, b) => a + b, 0) / n : leagueMean;
    const PRIOR = 3; // weeks of league-average weight
    const mean = (avg * n + leagueMean * PRIOR) / (n + PRIOR);
    const sd = Math.max(leagueMean * 0.12, n > 1 ? Math.sqrt(mine.reduce((a, b) => a + (b - avg) ** 2, 0) / (n - 1)) : leagueMean * 0.18);
    return { mean, sd };
  }

  /**
   * Chance each team makes the playoffs, by simulating the rest of the
   * regular season many times.
   *   teams:     [{ rosterId, wins, ties, pf, mean, sd }]
   *   schedule:  remaining weeks, each a list of [rosterIdA, rosterIdB] pairs
   *   playoffTeams, medianGame, sims, seed
   * -> { [rosterId]: probability }
   */
  function playoffOdds({ teams, schedule, playoffTeams, medianGame = false, sims = 2000, seed = 1 }) {
    const made = Object.fromEntries(teams.map((t) => [t.rosterId, 0]));
    if (!playoffTeams || !teams.length) return made;
    const rand = rng(seed);
    const normal = () => {
      const u = Math.max(rand(), 1e-12);
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
    };
    const byId = new Map(teams.map((t) => [t.rosterId, t]));
    for (let s = 0; s < sims; s++) {
      const wins = new Map(teams.map((t) => [t.rosterId, t.wins + (t.ties || 0) / 2]));
      const pf = new Map(teams.map((t) => [t.rosterId, t.pf]));
      for (const week of schedule) {
        const score = new Map();
        for (const t of teams) {
          const v = Math.max(0, t.mean + t.sd * normal());
          score.set(t.rosterId, v);
          pf.set(t.rosterId, pf.get(t.rosterId) + v);
        }
        for (const [a, b] of week) {
          if (!byId.has(a) || !byId.has(b)) continue;
          const winner = score.get(a) >= score.get(b) ? a : b;
          wins.set(winner, wins.get(winner) + 1);
        }
        if (medianGame) {
          const order = [...score.entries()].sort((x, y) => y[1] - x[1]);
          for (let i = 0; i < Math.floor(order.length / 2); i++) wins.set(order[i][0], wins.get(order[i][0]) + 1);
        }
      }
      const ranked = teams.map((t) => t.rosterId).sort((a, b) => wins.get(b) - wins.get(a) || pf.get(b) - pf.get(a));
      for (let i = 0; i < Math.min(playoffTeams, ranked.length); i++) made[ranked[i]]++;
    }
    for (const id of Object.keys(made)) made[id] /= sims;
    return made;
  }

  NightOwl.season = { optimal, biggestMiss, allPlay, standings, outlook, winProbability, phi, teamStrength, playoffOdds, hash };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.season;
