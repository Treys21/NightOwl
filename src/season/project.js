globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { optimal, outlook, phi, draftOrder, DRAFT_WIN_WEIGHT } = NightOwl.season;
  const round1 = (n) => Math.round(n * 10) / 10;
  const round2 = (n) => Math.round(n * 100) / 100;

  const OUT_FOR_SEASON = new Set(['IR', 'PUP', 'Sus', 'NA']);
  const OUT_THIS_WEEK = new Set(['Out', 'Doubtful']);

  const DEFAULT_EFFICIENCY = 0.92;
  const clampEfficiency = (e) => (e == null || !isFinite(e) ? DEFAULT_EFFICIENCY : Math.max(0.8, Math.min(1, e)));

  function teamWeek(slots, pool, projOf, positionsOf, isOut) {
    const best = optimal(slots, pool, (pid) => (isOut(pid) ? 0 : projOf(pid)), positionsOf);
    const starters = best.starters.filter(Boolean);
    const o = outlook(starters.map((pid) => ({ points: 0, proj: isOut(pid) ? 0 : projOf(pid), remaining: 1 })));
    return { mean: o.mean, variance: o.variance, starters };
  }

  function availability(injuryOf) {
    return (weekIndex) => (pid) => {
      const status = injuryOf(pid);
      return OUT_FOR_SEASON.has(status) || (weekIndex === 0 && OUT_THIS_WEEK.has(status));
    };
  }

  function slotOrder(size) {
    let order = [1, 2];
    while (order.length < size) {
      const n = order.length * 2;
      order = order.flatMap((s) => [s, n + 1 - s]);
    }
    return order;
  }

  function bracketFormat(playoffTeams, playoffStart, roundType = 0) {
    if (!playoffTeams || playoffTeams < 2) return null;
    const rounds = Math.ceil(Math.log2(playoffTeams));
    const size = 2 ** rounds;
    const order = slotOrder(size);
    const firstRound = [];
    for (let i = 0; i < order.length; i += 2) {
      const a = order[i];
      const b = order[i + 1];
      firstRound.push([a, b <= playoffTeams ? b : null]);
    }
    const out = [];
    let week = playoffStart;
    for (let r = 1; r <= rounds; r++) {
      const final = r === rounds;
      const span = roundType === 2 || (roundType === 1 && final) ? 2 : 1;
      const weeks = Array.from({ length: span }, (_, i) => week + i);
      week += span;
      const left = rounds - r;
      out.push({ round: r, label: final ? 'Championship' : left === 1 ? 'Semifinals' : left === 2 ? 'Quarterfinals' : `Round ${r}`, weeks });
    }
    return { rounds: out, firstRound };
  }

  const playoffWeeks = (format) => (format ? format.rounds.flatMap((r) => r.weeks) : []);

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

  const rankTeams = (ids, wins, pf) => ids.slice().sort((a, b) => wins.get(b) - wins.get(a) || pf.get(b) - pf.get(a) || a - b);

  function projectSeason({ teams, weeks, playoff = null, medianGame = false, sims = 2000, seed = 1, draft = null, forced = null }) {
    const ids = teams.map((t) => t.rosterId);
    const byId = new Map(teams.map((t) => [t.rosterId, t]));
    const eff = new Map(teams.map((t) => [t.rosterId, clampEfficiency(t.efficiency)]));
    const rand = rng(seed);
    let spare = null;
    const normal = () => {
      if (spare != null) { const s = spare; spare = null; return s; }
      const u = Math.max(rand(), 1e-12);
      const v = rand();
      const r = Math.sqrt(-2 * Math.log(u));
      spare = r * Math.sin(2 * Math.PI * v);
      return r * Math.cos(2 * Math.PI * v);
    };
    const draw = (o) => (o ? Math.max(0, o.mean + Math.sqrt(o.variance) * normal()) : 0);

    const format = playoff && playoff.format;
    const playoffTeams = format ? Math.min(ids.length, format.firstRound.flat().filter(Boolean).length) : 0;
    const acc = new Map(ids.map((id) => [id, {
      wins: 0, losses: 0, ties: 0, pf: 0, max: 0, rank: 0,
      playoffs: 0, bye: 0, final: 0, title: 0,
      winHist: new Map(), madeByWins: new Map(),
      seeds: new Array(ids.length + 1).fill(0), picks: new Array(ids.length + 1).fill(0), pick: 0
    }]));

    for (let s = 0; s < sims; s++) {
      const wins = new Map(teams.map((t) => [t.rosterId, t.wins + (t.ties || 0) / 2]));
      const losses = new Map(teams.map((t) => [t.rosterId, t.losses || 0]));
      const pf = new Map(teams.map((t) => [t.rosterId, t.pf || 0]));
      const max = new Map(teams.map((t) => [t.rosterId, t.max || 0]));

      for (let wi = 0; wi < weeks.length; wi++) {
        const wk = weeks[wi];
        const score = new Map();
        for (const id of ids) {
          const o = wk.teams[id];
          const full = draw(o);
          const actual = o && o.lineupSet ? full : full * eff.get(id);
          score.set(id, actual);
          pf.set(id, pf.get(id) + actual);
          max.set(id, max.get(id) + full);
        }
        for (const [a, b] of wk.pairs) {
          if (!byId.has(a) || !byId.has(b)) continue;
          const force = forced && wi === forced.weekIndex && (a === forced.winner || b === forced.winner);
          const [w, l] = force ? (a === forced.winner ? [a, b] : [b, a]) : score.get(a) >= score.get(b) ? [a, b] : [b, a];
          wins.set(w, wins.get(w) + 1);
          losses.set(l, losses.get(l) + 1);
        }
        if (medianGame) {
          const order = ids.slice().sort((x, y) => score.get(y) - score.get(x));
          order.forEach((id, i) => {
            if (i < Math.floor(order.length / 2)) wins.set(id, wins.get(id) + 1);
            else losses.set(id, losses.get(id) + 1);
          });
        }
      }

      const ranked = rankTeams(ids, wins, pf);
      ranked.forEach((id, i) => {
        const a = acc.get(id);
        a.rank += i + 1;
        a.seeds[i + 1]++;
        const total = wins.get(id);
        a.winHist.set(total, (a.winHist.get(total) || 0) + 1);
        if (i < playoffTeams) { a.playoffs++; a.madeByWins.set(total, (a.madeByWins.get(total) || 0) + 1); }
      });

      if (format && playoffTeams >= 2) {
        const seedOf = (n) => (n <= playoffTeams ? ranked[n - 1] : null);
        let alive = format.firstRound.map(([a, b]) => [seedOf(a), b == null ? null : seedOf(b)]);
        for (const pair of alive) if (pair[1] == null && pair[0] != null) acc.get(pair[0]).bye++;
        for (let r = 0; r < format.rounds.length; r++) {
          const round = format.rounds[r];
          const total = (id) => round.weeks.reduce((sum, w) => sum + draw(playoff.teams[w] && playoff.teams[w][id]) * eff.get(id), 0);
          const winners = alive.map(([a, b]) => {
            if (b == null) return a;
            if (a == null) return b;
            const sa = total(a);
            const sb = total(b);
            return sa > sb || (sa === sb && ranked.indexOf(a) < ranked.indexOf(b)) ? a : b;
          });
          if (r === format.rounds.length - 1) {
            const [a, b] = alive[0];
            if (a != null) acc.get(a).final++;
            if (b != null) acc.get(b).final++;
            acc.get(winners[0]).title++;
          }
          alive = [];
          for (let i = 0; i < winners.length; i += 2) alive.push([winners[i], winners[i + 1] == null ? null : winners[i + 1]]);
        }
      }

      if (draft) {
        const picks = draftOrder(ids.map((id) => ({ rosterId: id, wins: wins.get(id), max: max.get(id) })), draft);
        for (const p of picks) {
          const a = acc.get(p.rosterId);
          a.picks[p.pick]++;
          a.pick += p.pick;
        }
      }

      for (const id of ids) {
        const a = acc.get(id);
        a.wins += wins.get(id);
        a.losses += losses.get(id);
        a.pf += pf.get(id);
        a.max += max.get(id);
      }
    }

    const out = {};
    for (const id of ids) {
      const a = acc.get(id);
      const t = byId.get(id);
      out[id] = {
        rosterId: id,
        wins: round1(a.wins / sims),
        losses: round1(a.losses / sims),
        ties: t.ties || 0,
        pf: round2(a.pf / sims),
        max: round2(a.max / sims),
        avgRank: round2(a.rank / sims),
        seedOdds: a.seeds.slice(1).map((n) => n / sims),
        winOdds: [...a.winHist.entries()].sort((x, y) => x[0] - y[0]).map(([w, n]) => ({ wins: w, p: n / sims, make: (a.madeByWins.get(w) || 0) / n })),
        playoffOdds: a.playoffs / sims,
        byeOdds: a.bye / sims,
        finalOdds: a.final / sims,
        titleOdds: a.title / sims,
        pickOdds: draft ? a.picks.slice(1).map((n) => n / sims) : null,
        avgPick: draft ? round2(a.pick / sims) : null
      };
    }
    const order = ids.slice().sort((x, y) => out[x].avgRank - out[y].avgRank || out[y].wins - out[x].wins || x - y);
    return { teams: out, order, bracket: format ? chalkBracket(format, order.slice(0, playoffTeams), playoff.teams, eff) : null };
  }

  function chalkBracket(format, seeds, weekly, eff) {
    const seedOf = (n) => (n <= seeds.length ? { seed: n, rosterId: seeds[n - 1] } : null);
    let alive = format.firstRound.map(([a, b]) => [seedOf(a), b == null ? null : seedOf(b)]);
    const rounds = [];
    for (const round of format.rounds) {
      const stats = (side) => {
        if (!side) return null;
        let mean = 0;
        let variance = 0;
        for (const w of round.weeks) {
          const o = weekly[w] && weekly[w][side.rosterId];
          const e = eff.get(side.rosterId) || DEFAULT_EFFICIENCY;
          if (o) { mean += o.mean * e; variance += o.variance * e * e; }
        }
        return { mean: round1(mean), variance };
      };
      const matches = alive.map(([a, b]) => {
        const sa = stats(a);
        const sb = stats(b);
        let pTop = 1;
        if (a && b) {
          const sd = Math.sqrt(sa.variance + sb.variance);
          pTop = sd > 0 ? phi((sa.mean - sb.mean) / sd) : sa.mean >= sb.mean ? 1 : 0;
        } else if (!a) pTop = 0;
        return {
          top: a && Object.assign({}, a, { points: sa.mean }),
          bottom: b && Object.assign({}, b, { points: sb.mean }),
          pTop: round2(pTop)
        };
      });
      rounds.push(Object.assign({}, round, { matches }));
      const winners = matches.map((m) => (m.bottom == null ? m.top : m.top == null ? m.bottom : m.pTop >= 0.5 ? m.top : m.bottom));
      alive = [];
      for (let i = 0; i < winners.length; i += 2) alive.push([winners[i] && { seed: winners[i].seed, rosterId: winners[i].rosterId }, winners[i + 1] ? { seed: winners[i + 1].seed, rosterId: winners[i + 1].rosterId } : null]);
    }
    const last = rounds[rounds.length - 1].matches[0];
    const champion = last.bottom == null ? last.top : last.top == null ? last.bottom : last.pTop >= 0.5 ? last.top : last.bottom;
    return { rounds, champion: champion && { seed: champion.seed, rosterId: champion.rosterId } };
  }

  function projectedDraft(projection, { method = 'linear', winWeight = DRAFT_WIN_WEIGHT } = {}) {
    const rows = Object.values(projection.teams).map((t) => ({ rosterId: t.rosterId, wins: t.wins, max: t.max, odds: t.pickOdds, avgPick: t.avgPick }));
    return draftOrder(rows, { method, winWeight });
  }

  NightOwl.projection = {
    teamWeek, availability, bracketFormat, playoffWeeks, slotOrder, projectSeason, chalkBracket, projectedDraft,
    DEFAULT_EFFICIENCY, OUT_FOR_SEASON, OUT_THIS_WEEK
  };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.projection;
