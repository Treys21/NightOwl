// Replacement level, byes and the fading of far-off projections: what a player
// is worth is what he scores over the free agent you would start in his place,
// not over an empty slot. Pure: no DOM, no network.
//
// Why it matters for trades. A lineup with no quarterback in a bye week scores
// zero there, so any quarterback "adds" a full week of points; in truth a
// streamer fills that slot for free. Measured against replacement, a backup
// quarterback is worth the bye and injury weeks he covers over the best free
// agent, and a starter is worth what he adds over one.
//
//   levels      points per game of the free agent a team would start, by position
//   wrap        weeks, positions and pools with those free agents in every lineup,
//               and projections that fade toward them the further out they are
//   nflByes     the NFL schedule as who plays when, to tell a bye from an absence
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { canPlay, NOT_STARTING_SLOTS } = NightOwl.lineups;

  // Free agents averaged for the level: the best one is a waiver claim away for
  // one manager only, the third is what a typical manager can really get.
  const LEVEL_RANKS = 3;
  // At most this many free agents of a position in one lineup (byes and injuries rarely hit more).
  const MAX_FILL = 3;
  // Each week further out, a projection keeps this share of itself: injuries,
  // role changes and trades make a week-14 projection less certain than next
  // week's, so it drifts toward what a free agent would give.
  const FADE = 0.985;

  const VIRTUAL = 'rep:';
  const isVirtual = (pid) => String(pid).startsWith(VIRTUAL);

  /** Sleeper's NFL schedule rows ({ week, home, away }) -> { week: [teams playing] }. */
  function playing(games) {
    const out = {};
    for (const g of games || []) {
      if (!g || !g.week) continue;
      (out[g.week] = out[g.week] || new Set()).add(g.home).add(g.away);
    }
    return Object.fromEntries(Object.entries(out).map(([w, teams]) => [w, [...teams]]));
  }

  const SCHEDULE_TTL_MS = 24 * 3600000;

  /**
   * The season's NFL schedule as { week: [teams playing] }, cached for a day (it is fixed once published).
   * Shared by the tools and the background refresh, so a warm cache is a warm cache for both.
   */
  async function schedule(seasonYear) {
    const { api, storage } = NightOwl;
    const key = `season.nflschedule.${seasonYear}`;
    const cached = await storage.get(key, null);
    if (cached && Date.now() - cached.at < SCHEDULE_TTL_MS) return cached.weeks;
    try {
      const weeks = playing(await api.schedule(seasonYear, 'regular'));
      if (Object.keys(weeks).length) {
        await storage.set({ [key]: { at: Date.now(), weeks } });
        return weeks;
      }
    } catch { /* fall through to whatever is cached */ }
    return (cached && cached.weeks) || null; // without it, byes show up as missing projections: still zero, just less exact
  }

  /**
   * Is this team off that week? Only when the week's schedule is known and the
   * team has no game in it: an unknown team (a free agent, a typo) is never "on bye".
   */
  function onBye(schedule, team, week) {
    const teams = schedule && schedule[week];
    return !!(teams && teams.length && team && !teams.includes(team));
  }

  // Below this a "starter" is a roster filler, not a player anyone would start in a hole.
  const MIN_STARTABLE = 3;

  /**
   * The free agent a team would start at each position, as points per game
   * (the mean of the best few by rest-of-season points who play most weeks).
   * Where the league has picked a position clean (every quarterback in a
   * superflex league), the weakest rostered players who still project to play
   * stand in: that is what a team with a hole there scrapes together.
   *   free        pids nobody on the league's rosters holds
   *   weeks       [{ projOf, isOut }]
   *   positionsOf pid -> positions
   *   positions   the positions to price
   *   rostered    pids on rosters (for the fallback)
   * -> Map position -> points per game
   */
  function levels(free, weeks, positionsOf, positions, rostered = []) {
    const need = Math.min(3, weeks.length);
    const sample = (pids) => {
      const byPos = new Map();
      for (const pid of pids) {
        const pos = (positionsOf(pid) || [])[0];
        if (!positions.has(pos)) continue;
        let total = 0;
        let games = 0;
        for (const w of weeks) {
          if (w.isOut(pid)) continue;
          const p = w.projOf(pid);
          if (p > 0) { total += p; games++; }
        }
        if (games < need || !games) continue;
        if (!byPos.has(pos)) byPos.set(pos, []);
        byPos.get(pos).push({ total, rate: total / games });
      }
      return byPos;
    };
    const open = sample(free);
    const taken = rostered.length ? sample(rostered) : new Map();
    const out = new Map();
    for (const pos of positions) {
      const best = (open.get(pos) || []).sort((a, b) => b.total - a.total).slice(0, LEVEL_RANKS);
      if (best.length < LEVEL_RANKS) {
        const scraps = (taken.get(pos) || []).filter((x) => x.rate >= MIN_STARTABLE).sort((a, b) => a.total - b.total);
        best.push(...scraps.slice(0, LEVEL_RANKS - best.length));
      }
      out.set(pos, best.length ? best.reduce((s, x) => s + x.rate, 0) / best.length : 0);
    }
    return out;
  }

  /** The positions a league's lineup can start. */
  function startingPositions(slots) {
    const all = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF', 'DL', 'LB', 'DB'];
    const starting = slots.filter((s) => !NOT_STARTING_SLOTS.has(s));
    return new Set(all.filter((p) => starting.some((s) => canPlay(s, [p]))));
  }

  /**
   * Put replacement level into a league's lineups.
   *   slots, weeks, positionsOf   as the value engine takes them
   *   rates    levels() output
   * -> { weeks, positionsOf, pool(pids), isVirtual, rate(pos), over(pid) }
   *   weeks         the same weeks with projections faded toward replacement and free agents never "out"
   *   positionsOf   knows the stand-ins' positions
   *   pool(pids)    the pids plus the stand-ins a lineup may draw on
   *   over(pid)     a player's points over replacement across the weeks he plays
   */
  function wrap({ slots, weeks, positionsOf, rates, fade = FADE }) {
    const starting = slots.filter((s) => !NOT_STARTING_SLOTS.has(s));
    const stand = [];
    for (const [pos, rate] of rates) {
      if (!(rate > 0)) continue;
      const fits = starting.filter((s) => canPlay(s, [pos])).length;
      for (let i = 0; i < Math.min(MAX_FILL, fits); i++) stand.push(`${VIRTUAL}${pos}:${i}`);
    }
    const posOf = (pid) => (isVirtual(pid) ? [String(pid).split(':')[1]] : positionsOf(pid));
    const rateOf = (pid) => rates.get(isVirtual(pid) ? String(pid).split(':')[1] : (positionsOf(pid) || [])[0]) || 0;
    const wrapped = weeks.map((w, k) => {
      const keep = Math.pow(fade, k + 1);
      return Object.assign({}, w, {
        isOut: (pid) => !isVirtual(pid) && w.isOut(pid),
        projOf: (pid) => {
          if (isVirtual(pid)) return rateOf(pid);
          const p = w.projOf(pid);
          return p > 0 ? keep * p + (1 - keep) * rateOf(pid) : 0;
        }
      });
    });
    const over = (pid) => {
      let total = 0;
      for (const w of wrapped) {
        if (w.isOut(pid)) continue;
        const p = w.projOf(pid);
        if (p > 0) total += (p - rateOf(pid)) * (w.weight || 1);
      }
      return total;
    };
    return { weeks: wrapped, positionsOf: posOf, pool: (pids) => pids.concat(stand), isVirtual, rate: rateOf, over, stand };
  }

  NightOwl.replacement = { levels, wrap, playing, schedule, onBye, startingPositions, isVirtual, FADE, LEVEL_RANKS, MAX_FILL };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.replacement;
