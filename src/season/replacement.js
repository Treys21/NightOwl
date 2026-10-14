globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { canPlay, NOT_STARTING_SLOTS } = NightOwl.lineups;

  const LEVEL_RANKS = 3;
  const MAX_FILL = 3;
  const FADE = 0.985;

  const VIRTUAL = 'rep:';
  const isVirtual = (playerId) => String(playerId).startsWith(VIRTUAL);

  function playing(games) {
    const out = {};
    for (const g of games || []) {
      if (!g || !g.week) continue;
      (out[g.week] = out[g.week] || new Set()).add(g.home).add(g.away);
    }
    return Object.fromEntries(Object.entries(out).map(([w, teams]) => [w, [...teams]]));
  }

  const SCHEDULE_TTL_MS = 24 * 3600000;

  async function schedule(seasonYear) {
    const { api, storage } = NightOwl;
    const key = `season.nflschedule.${seasonYear}`;
    const cached = await storage.get(key, null);
    if (cached && Date.now() - cached.at < SCHEDULE_TTL_MS) return cached.weeks;
    const games = await api.schedule(seasonYear, 'regular').catch(() => null);
    const weeks = playing(games);
    if (Object.keys(weeks).length) {
      await storage.set({ [key]: { at: Date.now(), weeks } });
      return weeks;
    }
    return (cached && cached.weeks) || null;
  }

  function onBye(schedule, team, week) {
    const teams = schedule && schedule[week];
    return !!(teams && teams.length && team && !teams.includes(team));
  }

  const MIN_STARTABLE = 3;

  function levels(free, weeks, positionsOf, positions, rostered = []) {
    const need = Math.min(3, weeks.length);
    const sample = (pids) => {
      const byPos = new Map();
      for (const playerId of pids) {
        const pos = (positionsOf(playerId) || [])[0];
        if (!positions.has(pos)) continue;
        let total = 0;
        let games = 0;
        for (const w of weeks) {
          if (w.isOut(playerId)) continue;
          const p = w.projOf(playerId);
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

  function startingPositions(slots) {
    const all = ['QB', 'RB', 'WR', 'TE', 'K', 'DEF', 'DL', 'LB', 'DB'];
    const starting = slots.filter((s) => !NOT_STARTING_SLOTS.has(s));
    return new Set(all.filter((p) => starting.some((s) => canPlay(s, [p]))));
  }

  function wrap({ slots, weeks, positionsOf, rates, fade = FADE }) {
    const starting = slots.filter((s) => !NOT_STARTING_SLOTS.has(s));
    const stand = [];
    for (const [pos, rate] of rates) {
      if (!(rate > 0)) continue;
      const fits = starting.filter((s) => canPlay(s, [pos])).length;
      for (let i = 0; i < Math.min(MAX_FILL, fits); i++) stand.push(`${VIRTUAL}${pos}:${i}`);
    }
    const posOf = (playerId) => (isVirtual(playerId) ? [String(playerId).split(':')[1]] : positionsOf(playerId));
    const rateOf = (playerId) => rates.get(isVirtual(playerId) ? String(playerId).split(':')[1] : (positionsOf(playerId) || [])[0]) || 0;
    const wrapped = weeks.map((w, k) => {
      const keep = Math.pow(fade, k + 1);
      return Object.assign({}, w, {
        isOut: (playerId) => !isVirtual(playerId) && w.isOut(playerId),
        projOf: (playerId) => {
          if (isVirtual(playerId)) return rateOf(playerId);
          const p = w.projOf(playerId);
          return p > 0 ? keep * p + (1 - keep) * rateOf(playerId) : 0;
        }
      });
    });
    const over = (playerId) => {
      let total = 0;
      for (const w of wrapped) {
        if (w.isOut(playerId)) continue;
        const p = w.projOf(playerId);
        if (p > 0) total += (p - rateOf(playerId)) * (w.weight || 1);
      }
      return total;
    };
    return { weeks: wrapped, positionsOf: posOf, pool: (pids) => pids.concat(stand), isVirtual, rate: rateOf, over, stand };
  }

  NightOwl.replacement = { levels, wrap, playing, schedule, onBye, startingPositions, isVirtual, FADE, LEVEL_RANKS, MAX_FILL };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.replacement;
