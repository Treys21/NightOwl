globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const ELIGIBLE = {
    QB: ['QB'], RB: ['RB'], WR: ['WR'], TE: ['TE'], K: ['K'], DEF: ['DEF'],
    FLEX: ['RB', 'WR', 'TE'], SUPER_FLEX: ['QB', 'RB', 'WR', 'TE'], REC_FLEX: ['WR', 'TE'],
    WRRB_FLEX: ['WR', 'RB'], DL: ['DL'], LB: ['LB'], DB: ['DB'], IDP_FLEX: ['DL', 'LB', 'DB']
  };
  const NOT_STARTING_SLOTS = new Set(['BN', 'IR', 'TAXI']);
  const OUT = new Set(['Out', 'IR', 'PUP', 'Sus', 'NA', 'Doubtful']);
  const MIN_GAIN = 1;

  const ESPN_TO_SLEEPER = { WSH: 'WAS' };
  const round1 = (n) => Math.round(n * 10) / 10;
  const team = (abbr) => ESPN_TO_SLEEPER[abbr] || abbr;

  function parseGames(espnEvents) {
    return (espnEvents || []).map((e) => {
      const comp = e.competitions && e.competitions[0];
      const competitors = (comp && comp.competitors) || [];
      const away = competitors.find((c) => c.homeAway === 'away');
      const home = competitors.find((c) => c.homeAway === 'home');
      const odds = comp && comp.odds && comp.odds[0];
      return {
        id: e.id,
        kickoff: Date.parse(e.date),
        away: team(away ? away.team.abbreviation : ''),
        home: team(home ? home.team.abbreviation : ''),
        started: e.status && e.status.type && e.status.type.state !== 'pre',
        state: e.status && e.status.type ? e.status.type.state : 'pre',
        remaining: remainingShare(e.status),
        odds: odds ? { details: odds.details || '', overUnder: odds.overUnder } : null
      };
    }).sort((a, b) => a.kickoff - b.kickoff);
  }

  function remainingShare(status) {
    const state = status && status.type ? status.type.state : 'pre';
    if (state === 'pre') return 1;
    if (state === 'post') return 0;
    const period = status.period || 1;
    if (period > 4) return 0.02;
    const clock = Math.max(0, Math.min(900, Number(status.clock) || 0));
    return ((4 - period) * 900 + clock) / 3600;
  }

  function gamesFromSchedule(schedule, week) {
    return (schedule || []).filter((g) => g.week === week).map((g) => {
      const noonish = Date.parse(`${g.date}T13:00:00-04:00`);
      return {
        kickoff: noonish,
        away: g.away,
        home: g.home,
        started: g.status !== 'pre_game',
        remaining: g.status === 'pre_game' ? 1 : g.status === 'complete' ? 0 : 0.5,
        approx: true
      };
    }).sort((a, b) => a.kickoff - b.kickoff);
  }

  function windows(games) {
    const out = [];
    for (const g of games) {
      let w = out[out.length - 1];
      if (!w || w.kickoff !== g.kickoff) {
        w = { kickoff: g.kickoff, games: [], teams: new Set(), started: g.started, approx: !!g.approx };
        out.push(w);
      }
      w.games.push(g);
      w.teams.add(g.home).add(g.away);
      w.started = w.started && g.started;
    }
    return out;
  }

  function assign(slots, players, weight) {
    const n = slots.length;
    const m = Math.max(players.length, n) + n;
    const BIG = 1e6;
    const cost = (i, j) => {
      if (j >= players.length) return j >= m - n ? BIG / 2 : BIG;
      const w = weight(slots[i], players[j], i);
      return w == null ? BIG : -w;
    };
    const u = new Array(n + 1).fill(0);
    const v = new Array(m + 1).fill(0);
    const p = new Array(m + 1).fill(0);
    const way = new Array(m + 1).fill(0);
    for (let i = 1; i <= n; i++) {
      p[0] = i;
      let j0 = 0;
      const minv = new Array(m + 1).fill(Infinity);
      const used = new Array(m + 1).fill(false);
      do {
        used[j0] = true;
        const i0 = p[j0];
        let delta = Infinity;
        let j1 = 0;
        for (let j = 1; j <= m; j++) {
          if (used[j]) continue;
          const cur = cost(i0 - 1, j - 1) - u[i0] - v[j];
          if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
          if (minv[j] < delta) { delta = minv[j]; j1 = j; }
        }
        for (let j = 0; j <= m; j++) {
          if (used[j]) { u[p[j]] += delta; v[j] -= delta; } else minv[j] -= delta;
        }
        j0 = j1;
      } while (p[j0] !== 0);
      do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0);
    }
    const out = new Array(n).fill(null);
    for (let j = 1; j <= m; j++) {
      if (p[j] && j - 1 < players.length && cost(p[j] - 1, j - 1) < BIG / 2) out[p[j] - 1] = players[j - 1];
    }
    return out;
  }

  const canPlay = (slot, positions) => (ELIGIBLE[slot] || [slot]).some((p) => positions.includes(p));

  function lineup(league, roster, info, projected, kickoffOf, now) {
    const starters = roster.starters || [];
    const reserve = new Set(roster.reserve || []);
    const taxi = new Set(roster.taxi || []);
    const starting = new Map();
    starters.forEach((pid, i) => { if (pid && pid !== '0') starting.set(pid, i); });

    const row = (pid) => {
      const p = info(pid);
      const kickoff = kickoffOf(p.team);
      const slotIndex = starting.has(pid) ? starting.get(pid) : null;
      return {
        pid,
        name: p.name,
        pos: p.pos,
        team: p.team,
        positions: p.positions && p.positions.length ? p.positions : [p.pos],
        injury: p.injury || null,
        kickoff,
        locked: kickoff != null && kickoff <= now,
        bye: kickoff == null,
        status: slotIndex != null ? 'start' : reserve.has(pid) ? 'ir' : taxi.has(pid) ? 'taxi' : 'bench',
        slot: slotIndex != null ? league.slots[slotIndex] : null,
        slotIndex,
        proj: projected(pid, league.scoring),
        notes: []
      };
    };

    const rows = [...new Set([...(roster.players || []), ...starting.keys()])].map(row);
    const byPid = new Map(rows.map((r) => [r.pid, r]));
    const effective = (r) => (r.bye || OUT.has(r.injury) ? 0 : r.proj);

    for (const r of rows) {
      if (r.status !== 'start' || r.locked) continue;
      if (r.bye) r.notes.push({ kind: 'warn', text: 'On bye, so this slot scores zero' });
      else if (OUT.has(r.injury)) r.notes.push({ kind: 'warn', text: `${r.injury}, likely scores zero` });
      else if (r.injury === 'Questionable') r.notes.push({ kind: 'info', text: 'Questionable: check before lock' });
    }

    const available = (r) => !r.locked && !r.bye && !OUT.has(r.injury);
    const open = (i) => { const s = byPid.get(starters[i]); return !s || !s.locked; };

    const openSlots = starters.map((_, i) => i).filter(open);
    const pool = rows.filter((r) => !r.locked && (r.status === 'start' || r.status === 'bench'));
    const best = assign(openSlots.map((i) => league.slots[i]), pool, (slot, r, k) => {
      if (!canPlay(slot, r.positions)) return null;
      return effective(r) + (r.slotIndex === openSlots[k] ? 1e-3 : 0);
    });
    const bestSlotOf = new Map();
    best.forEach((r, k) => { if (r) bestSlotOf.set(r.pid, openSlots[k]); });
    const currentTotal = openSlots.reduce((t, i) => t + (byPid.has(starters[i]) ? effective(byPid.get(starters[i])) : 0), 0);
    const bestTotal = best.reduce((t, r) => t + (r ? effective(r) : 0), 0);
    const gain = round1(bestTotal - currentTotal);
    const moves = [];
    if (gain >= MIN_GAIN) {
      for (const r of pool) {
        const now = r.status === 'start' ? r.slotIndex : null;
        const then = bestSlotOf.has(r.pid) ? bestSlotOf.get(r.pid) : null;
        if (now === then) continue;
        if (then == null) moves.push({ type: 'bench', name: r.name, pid: r.pid });
        else if (now == null) moves.push({ type: 'start', name: r.name, pid: r.pid, slot: league.slots[then] });
        else moves.push({ type: 'move', name: r.name, pid: r.pid, slot: league.slots[then] });
      }
      const order = { start: 0, move: 1, bench: 2 };
      moves.sort((x, y) => order[x.type] - order[y.type]);
      for (const m of moves) {
        const r = byPid.get(m.pid);
        if (m.type === 'start') r.notes.push({ kind: 'swap', text: `Start him at ${m.slot}: +${gain} for your lineup` });
        if (m.type === 'bench') r.notes.push({ kind: 'swap', text: `Bench him: +${gain} for your lineup` });
        if (m.type === 'move') r.notes.push({ kind: 'info', text: `Slide to ${m.slot} in the best lineup` });
      }
    }
    for (const r of rows) r.inBest = bestSlotOf.has(r.pid) || (r.locked && r.status === 'start');

    const swapPath = (b, i) => {
      if (canPlay(league.slots[i], b.positions)) return { slot: league.slots[i], via: null };
      for (let j = 0; j < starters.length; j++) {
        if (j === i || !open(j)) continue;
        const t = byPid.get(starters[j]);
        if (t && canPlay(league.slots[j], b.positions) && canPlay(league.slots[i], t.positions)) {
          return { slot: league.slots[j], via: { name: t.name, slot: league.slots[i] } };
        }
      }
      return null;
    };
    for (const r of rows) {
      r.options = [];
      if (r.locked) continue;
      if (r.status === 'start') {
        for (const b of rows) {
          if (b.status !== 'bench' || !available(b)) continue;
          const path = swapPath(b, r.slotIndex);
          if (path) r.options.push({ pid: b.pid, name: b.name, proj: b.proj, gain: round1(b.proj - effective(r)), slot: path.slot, via: path.via });
        }
        r.options.sort((x, y) => y.gain - x.gain);
      } else if (r.status === 'bench' && available(r)) {
        starters.forEach((pid, i) => {
          if (!open(i)) return;
          const s = byPid.get(pid);
          const path = swapPath(r, i);
          if (!path) return;
          const value = s ? effective(s) : 0;
          r.options.push({ pid: s ? s.pid : null, name: s ? s.name : `Empty ${league.slots[i]}`, proj: value, gain: round1(r.proj - value), slot: path.slot, via: path.via });
        });
        r.options.sort((x, y) => y.gain - x.gain);
      }
    }

    const empty = starters
      .map((pid, i) => ((!pid || pid === '0') ? league.slots[i] : null))
      .filter(Boolean);
    return { rows, empty, best: { gain, moves } };
  }

  NightOwl.lineups = {
    parseGames, gamesFromSchedule, windows, lineup, assign, canPlay, remainingShare, NOT_STARTING_SLOTS, OUT, MIN_GAIN
  };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.lineups;
