globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { assign, canPlay, NOT_STARTING_SLOTS } = NightOwl.lineups;
  const round1 = (n) => Math.round(n * 10) / 10;
  const round2 = (n) => Math.round(n * 100) / 100;

  function optimal(slots, pids, pointsOf, positionsOf) {
    const starting = slots.filter((s) => !NOT_STARTING_SLOTS.has(s));
    const pool = pids.map((pid) => ({ pid, pts: pointsOf(pid) || 0, positions: positionsOf(pid) }));
    const picks = assign(starting, pool, (slot, p) => (canPlay(slot, p.positions) ? p.pts : null));
    return {
      points: round2(picks.reduce((sum, p) => sum + (p ? p.pts : 0), 0)),
      starters: picks.map((p) => (p ? p.pid : null))
    };
  }

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

  function phi(z) {
    const t = 1 / (1 + 0.3275911 * Math.abs(z) / Math.SQRT2);
    const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-z * z / 2);
    return z >= 0 ? (1 + y) / 2 : (1 - y) / 2;
  }

  const SPREAD = 0.5;

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

  function winProbability(me, opp) {
    const sd = Math.sqrt(me.variance + opp.variance);
    if (sd === 0) return me.mean > opp.mean ? 1 : me.mean < opp.mean ? 0 : 0.5;
    return phi((me.mean - opp.mean) / sd);
  }

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

  function teamStrength(weeks, rosterId) {
    const all = weeks.flatMap((w) => Object.values(w)).filter((v) => v != null);
    const leagueMean = all.length ? all.reduce((a, b) => a + b, 0) / all.length : 100;
    const mine = weeks.map((w) => w[rosterId]).filter((v) => v != null);
    const n = mine.length;
    const avg = n ? mine.reduce((a, b) => a + b, 0) / n : leagueMean;
    const PRIOR = 3;
    const mean = (avg * n + leagueMean * PRIOR) / (n + PRIOR);
    const sd = Math.max(leagueMean * 0.12, n > 1 ? Math.sqrt(mine.reduce((a, b) => a + (b - avg) ** 2, 0) / (n - 1)) : leagueMean * 0.18);
    return { mean, sd };
  }

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

  function asItStands(rosters, matchups, maxOf, { medianGame = false } = {}) {
    const pts = new Map(matchups.map((m) => [m.roster_id, m.points || 0]));
    const result = new Map(matchups.map((m) => [m.roster_id, { w: 0, l: 0, t: 0, against: 0 }]));
    const pairs = new Map();
    for (const m of matchups) {
      if (m.matchup_id == null) continue;
      if (!pairs.has(m.matchup_id)) pairs.set(m.matchup_id, []);
      pairs.get(m.matchup_id).push(m.roster_id);
    }
    for (const [a, b] of pairs.values()) {
      if (b == null) continue;
      const pa = pts.get(a);
      const pb = pts.get(b);
      result.get(a)[pa > pb ? 'w' : pa < pb ? 'l' : 't']++;
      result.get(b)[pb > pa ? 'w' : pb < pa ? 'l' : 't']++;
      result.get(a).against += pb;
      result.get(b).against += pa;
    }
    if (medianGame) {
      const order = [...pts.entries()].sort((x, y) => y[1] - x[1]);
      order.forEach(([id], i) => { result.get(id)[i < Math.floor(order.length / 2) ? 'w' : 'l']++; });
    }
    return rosters.map((r) => {
      const s = r.settings || {};
      const add = result.get(r.roster_id) || { w: 0, l: 0, t: 0, against: 0 };
      const max = maxOf(r.roster_id);
      return Object.assign({}, r, {
        settings: Object.assign({}, s, {
          wins: (s.wins || 0) + add.w,
          losses: (s.losses || 0) + add.l,
          ties: (s.ties || 0) + add.t,
          fpts: points(s.fpts, s.fpts_decimal) + (pts.get(r.roster_id) || 0),
          fpts_decimal: 0,
          fpts_against: points(s.fpts_against, s.fpts_against_decimal) + add.against,
          fpts_against_decimal: 0,
          ppts: max == null ? s.ppts : points(s.ppts, s.ppts_decimal) + max,
          ppts_decimal: max == null ? s.ppts_decimal : 0
        })
      });
    });
  }

  function weeksRecorded(rosters, { medianGame = false } = {}) {
    const games = Math.max(0, ...rosters.map((r) => {
      const s = r.settings || {};
      return (s.wins || 0) + (s.losses || 0) + (s.ties || 0);
    }));
    return Math.floor(games / (medianGame ? 2 : 1));
  }

  const DRAFT_WIN_WEIGHT = 0.3;

  const minMax = (values) => {
    const lo = Math.min(...values);
    const hi = Math.max(...values);
    return values.map((v) => (hi > lo ? (v - lo) / (hi - lo) : 0));
  };

  function draftOrder(teams, { method = 'linear', winWeight = DRAFT_WIN_WEIGHT } = {}) {
    if (!teams.length) return [];
    const wins = teams.map((t) => t.wins || 0);
    const maxes = teams.map((t) => t.max || 0);
    let winScores;
    let maxScores;
    if (method === 'inverse') {
      const top = Math.max(...wins);
      const best = Math.max(...maxes);
      winScores = minMax(wins.map((w) => (top + 1) / (w + 1)));
      const inverted = maxes.map((m) => (m > 0 ? best / m : null));
      const worst = Math.max(1, ...inverted.filter((v) => v != null));
      maxScores = minMax(inverted.map((v) => (v == null ? worst : v)));
    } else {
      winScores = minMax(wins.map((w) => -w));
      maxScores = minMax(maxes.map((m) => -m));
    }
    return teams
      .map((t, i) => Object.assign({}, t, {
        winScore: winScores[i],
        maxScore: maxScores[i],
        score: winWeight * winScores[i] + (1 - winWeight) * maxScores[i]
      }))
      .sort((a, b) => b.score - a.score || (a.wins || 0) - (b.wins || 0) || (a.max || 0) - (b.max || 0) || a.rosterId - b.rosterId)
      .map((t, i) => Object.assign(t, { pick: i + 1 }));
  }

  function pickOwners(tradedPicks, season) {
    const owners = new Map();
    for (const p of tradedPicks || []) {
      if (String(p.season) === String(season)) owners.set(`${p.round}:${p.roster_id}`, p.owner_id);
    }
    return (round, rosterId) => owners.get(`${round}:${rosterId}`) ?? rosterId;
  }

  const percentile = (value, all) => {
    const below = all.filter((v) => v < value).length;
    const equal = all.filter((v) => v === value).length;
    return all.length ? (below + equal / 2) / all.length : 0.5;
  };

  function powerRatings(rows, weeks) {
    const stats = rows.map((r) => {
      const scores = weeks.map((w) => w[r.rosterId]).filter((v) => v != null);
      const games = r.wins + r.losses + r.ties;
      const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      const sd = scores.length > 1 ? Math.sqrt(scores.reduce((a, b) => a + (b - avg) ** 2, 0) / scores.length) : 0;
      const last = scores.slice(-3);
      const form = last.length === 3 ? (last[2] * 3 + last[1] * 2 + last[0]) / 6 : avg;
      return { id: r.rosterId, pct: games ? (r.wins + r.ties / 2) / games : 0, avg, sd, form };
    });
    const pcts = stats.map((s) => s.pct);
    const avgs = stats.map((s) => s.avg);
    const sds = stats.map((s) => s.sd);
    const out = {};
    for (const s of stats) {
      const consistency = Math.max(...sds) > 0 ? 1 - percentile(s.sd, sds) : 0.5;
      const rating = 0.35 * percentile(s.pct, pcts) + 0.35 * percentile(s.avg, avgs) + 0.15 * consistency + 0.15 * percentile(s.form, avgs);
      out[s.id] = round1(rating * 100);
    }
    return out;
  }

  NightOwl.season = {
    optimal, biggestMiss, allPlay, standings, outlook, winProbability, phi, teamStrength, playoffOdds, hash,
    asItStands, weeksRecorded, draftOrder, pickOwners, powerRatings, DRAFT_WIN_WEIGHT
  };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.season;
