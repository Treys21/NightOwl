// Betting context for your starters: Sleeper Picks lines (with payouts and
// recent results), ESPN/DraftKings milestones and game lines, defense-vs-
// position ranks, and how each player is tracking against each line live.
// Pure functions — no chrome.* or fetch — so they run under node --test.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const round1 = (n) => Math.round(n * 10) / 10;

  // Sleeper wager_type -> label and the stat keys (summed) that settle it.
  const MARKETS = {
    passing_yards: { label: 'Pass yds', keys: ['pass_yd'] },
    passing_touchdowns: { label: 'Pass TDs', keys: ['pass_td'] },
    pass_completions: { label: 'Completions', keys: ['pass_cmp'] },
    passing_attempts: { label: 'Pass att', keys: ['pass_att'] },
    interceptions: { label: 'INTs thrown', keys: ['pass_int'] },
    longest_passing_completion: { label: 'Longest comp', keys: ['pass_lng'], max: true },
    passing_and_rushing_yards: { label: 'Pass + rush yds', keys: ['pass_yd', 'rush_yd'] },
    rushing_yards: { label: 'Rush yds', keys: ['rush_yd'] },
    rushing_attempts: { label: 'Carries', keys: ['rush_att'] },
    longest_rush: { label: 'Longest rush', keys: ['rush_lng'], max: true },
    receiving_yards: { label: 'Rec yds', keys: ['rec_yd'] },
    receptions: { label: 'Receptions', keys: ['rec'] },
    longest_reception: { label: 'Longest rec', keys: ['rec_lng'], max: true },
    rushing_and_receiving_yards: { label: 'Rush + rec yds', keys: ['rush_yd', 'rec_yd'] },
    anytime_touchdowns: { label: 'Anytime TD', keys: ['rush_td', 'rec_td', 'def_td', 'st_td'], td: true },
    first_touchdown: { label: 'First TD', keys: [], td: true },
    kicking_points: { label: 'Kicking pts', keys: ['kick_pts'] },
    field_goal_made: { label: 'FGs made', keys: ['fgm'] },
    extra_point_made: { label: 'XPs made', keys: ['xpm'] },
    sacks: { label: 'Sacks', keys: ['idp_sack'] },
    tackles: { label: 'Solo tackles', keys: ['idp_tkl_solo'] },
    assists: { label: 'Ast tackles', keys: ['idp_tkl_ast'] },
    tackles_and_assists: { label: 'Tackles + ast', keys: ['idp_tkl_solo', 'idp_tkl_ast'] }
  };
  // Display order within a player card.
  const ORDER = Object.keys(MARKETS);

  // ESPN/DraftKings milestone ladders -> the same stat keys.
  const MILESTONES = {
    'Receiving Yards Milestones': { label: 'Rec yds', keys: ['rec_yd'] },
    'Rushing Yards Milestones': { label: 'Rush yds', keys: ['rush_yd'] },
    'Receptions Milestones': { label: 'Receptions', keys: ['rec'] },
    'Passing Yards Milestones': { label: 'Pass yds', keys: ['pass_yd'] },
    'Rushing + Receiving Yards Milestones': { label: 'Rush + rec yds', keys: ['rush_yd', 'rec_yd'] },
    'Passing Touchdown Milestones': { label: 'Pass TDs', keys: ['pass_td'] },
    'Rushing Attempts Milestones': { label: 'Carries', keys: ['rush_att'] }
  };

  // Value of a market from a stat line (live stats or projections); null when
  // the line has none of the keys (e.g. projections never include "longest").
  function statValue(stats, keys) {
    if (!stats || !keys.length) return null;
    let total = 0;
    let seen = false;
    for (const k of keys) {
      if (stats[k] != null) { total += stats[k]; seen = true; }
    }
    return seen ? round1(total) : null;
  }

  // Pick'em payouts -> probability of the over, with the house margin removed
  // when both sides are priced.
  function impliedOver(overMult, underMult) {
    const o = overMult ? 1 / overMult : null;
    const u = underMult ? 1 / underMult : null;
    if (o != null && u != null) return o / (o + u);
    if (o != null) return Math.min(1, o);
    if (u != null) return Math.max(0, 1 - u);
    return null;
  }

  // Payout multiplier (decimal odds: 2.34 returns $2.34 per $1) -> American
  // odds as a sportsbook shows them: 2.34 -> "+134", 1.41 -> "-244".
  function american(mult) {
    const d = Number(mult);
    if (!d || d <= 1) return null;
    const v = d >= 2 ? Math.round((d - 1) * 100) : -Math.round(100 / (d - 1));
    return v > 0 ? `+${v}` : `${v}`;
  }

  // Sleeper /lines/available (every sport) -> { pid: [market, ...] } for NFL.
  //   market: { type, label, keys, line, over, under, pOver, recent: [{date, opponent, value}], gameId, updatedAt }
  function parseLines(raw) {
    const out = {};
    for (const entry of raw || []) {
      const first = entry.options && entry.options[0];
      if (!first || first.sport !== 'nfl' || entry.subject_type !== 'player') continue;
      const meta = MARKETS[entry.wager_type];
      if (!meta) continue;
      const over = entry.options.find((o) => o.outcome === 'over');
      const under = entry.options.find((o) => o.outcome === 'under');
      const line = Number((over || under || first).outcome_value);
      const overMult = over ? Number(over.payout_multiplier) : null;
      const underMult = under ? Number(under.payout_multiplier) : null;
      const pid = String(entry.subject_id);
      (out[pid] = out[pid] || []).push({
        type: entry.wager_type,
        label: meta.label,
        keys: meta.keys,
        td: !!meta.td,
        max: !!meta.max,
        line,
        over: overMult,
        under: underMult,
        pOver: impliedOver(overMult, underMult),
        recent: ((entry.recent_performance && entry.recent_performance.values) || []).slice(-10),
        gameId: entry.game_id,
        updatedAt: entry.updated_at || 0
      });
    }
    for (const pid of Object.keys(out)) {
      // One market per type: the most recently updated.
      const best = new Map();
      for (const m of out[pid]) {
        const cur = best.get(m.type);
        if (!cur || m.updatedAt > cur.updatedAt) best.set(m.type, m);
      }
      out[pid] = [...best.values()].sort((a, b) => ORDER.indexOf(a.type) - ORDER.indexOf(b.type));
    }
    return out;
  }

  // Lines vanish at kickoff; keep the last known (closing) line per player and
  // market so live progress still has something to track against.
  function mergeLines(previous, fresh) {
    const out = Object.assign({}, previous || {});
    for (const [pid, markets] of Object.entries(fresh || {})) {
      const byType = new Map((out[pid] || []).map((m) => [m.type, m]));
      for (const m of markets) byType.set(m.type, m);
      out[pid] = [...byType.values()].sort((a, b) => ORDER.indexOf(a.type) - ORDER.indexOf(b.type));
    }
    return out;
  }

  // How often the player cleared this line in the games Sleeper lists.
  function hitRate(recent, line) {
    const values = (recent || []).map((r) => r.value).filter((v) => v != null);
    if (!values.length) return null;
    return { over: values.filter((v) => v > line).length, games: values.length };
  }

  // ESPN propBets items -> { espnAthleteId: [{ label, keys, rungs: [25, 40, ...] }] }.
  function parseMilestones(items) {
    const byAthlete = new Map();
    for (const it of items || []) {
      const meta = MILESTONES[it.type && it.type.name];
      const target = it.current && it.current.target && it.current.target.value;
      const ref = it.athlete && it.athlete.$ref;
      if (!meta || target == null || !ref) continue;
      const m = ref.match(/athletes\/(\d+)/);
      if (!m) continue;
      const id = m[1];
      if (!byAthlete.has(id)) byAthlete.set(id, new Map());
      const ladders = byAthlete.get(id);
      if (!ladders.has(meta.label)) ladders.set(meta.label, { label: meta.label, keys: meta.keys, rungs: new Set() });
      ladders.get(meta.label).rungs.add(Number(target));
    }
    const out = {};
    for (const [id, ladders] of byAthlete) {
      out[id] = [...ladders.values()].map((l) => ({ label: l.label, keys: l.keys, rungs: [...l.rungs].sort((a, b) => a - b) }));
    }
    return out;
  }

  // ESPN game odds ("JAX -7.5", total 41.5) -> implied points per team.
  function impliedTotals(game) {
    const odds = game && game.odds;
    if (!odds || odds.overUnder == null) return null;
    const total = Number(odds.overUnder);
    const m = /^([A-Z]{2,4})\s+(-?\d+(?:\.\d+)?)$/.exec((odds.details || '').trim());
    const out = { total, spread: null, favorite: null, teams: {} };
    if (m) {
      const fav = m[1] === 'WSH' ? 'WAS' : m[1];
      const spread = Math.abs(Number(m[2]));
      out.favorite = fav;
      out.spread = spread;
      const dog = fav === game.home ? game.away : game.home;
      out.teams[fav] = round1((total + spread) / 2);
      out.teams[dog] = round1((total - spread) / 2);
    } else if (/even|pk/i.test(odds.details || '')) {
      out.teams[game.home] = out.teams[game.away] = round1(total / 2);
    }
    return out;
  }

  // Sleeper season DEF stat rows -> { TEAM: { QB: rank, RB: rank, ... } },
  // rank 1 = allows the most fantasy points per game to that position.
  function defenseRanks(defRows) {
    const positions = ['QB', 'RB', 'WR', 'TE', 'K'];
    const per = (row, pos) => {
      const s = row.stats || {};
      const games = s.gp || 1;
      return (s[`fan_pts_allow_${pos.toLowerCase()}`] || 0) / games;
    };
    const out = {};
    for (const pos of positions) {
      [...(defRows || [])]
        .filter((r) => r.stats && r.stats.gp)
        .sort((a, b) => per(b, pos) - per(a, pos))
        .forEach((r, i) => {
          out[r.player_id] = out[r.player_id] || {};
          out[r.player_id][pos] = { rank: i + 1, perGame: round1(per(r, pos)) };
        });
    }
    return out;
  }

  // Where a market stands live: current value, share of the line, and whether
  // the over has already cashed.
  function progress(market, liveStats) {
    if (!market.keys.length || !liveStats) return null;
    // In the game but no stat yet: that's zero, not unknown.
    const value = statValue(liveStats, market.keys) ?? 0;
    const line = market.td ? 0.5 : market.line;
    return { value, line, pct: line > 0 ? Math.min(1, value / line) : (value > 0 ? 1 : 0), hit: value > line };
  }

  // A ladder can run 16 rungs deep (40+ ... 190+); keep the `max` rungs
  // closest to the player's line (or the ladder's middle when there's none).
  function trimRungs(rungs, line, max = 6) {
    if (rungs.length <= max) return rungs.slice();
    const center = line != null ? line : rungs[Math.floor(rungs.length / 2)];
    return rungs.slice().sort((a, b) => Math.abs(a - center) - Math.abs(b - center) || a - b)
      .slice(0, max).sort((a, b) => a - b);
  }

  // The one line that best sums a player up in a collapsed row.
  const KEY_BY_POS = {
    QB: ['passing_yards', 'passing_and_rushing_yards', 'passing_touchdowns'],
    RB: ['rushing_yards', 'rushing_and_receiving_yards', 'receptions'],
    WR: ['receiving_yards', 'receptions', 'rushing_and_receiving_yards'],
    TE: ['receiving_yards', 'receptions'],
    K: ['kicking_points', 'field_goal_made']
  };
  function keyMarket(markets, pos) {
    const list = (markets || []).filter((m) => !m.td);
    for (const type of KEY_BY_POS[pos] || []) {
      const m = list.find((x) => x.type === type);
      if (m) return m;
    }
    return list[0] || null;
  }

  // Sort scores for the Bets list (higher first). proj: the player's
  // projected stat line.
  const SORTS = {
    td: (markets) => {
      const td = (markets || []).find((m) => m.type === 'anytime_touchdowns');
      return td && td.pOver != null ? td.pOver : -1;
    },
    hit: (markets) => {
      let best = -1;
      for (const m of markets || []) {
        if (m.td || m.max) continue;
        const hr = hitRate(m.recent, m.line);
        if (hr && hr.games >= 4) best = Math.max(best, hr.over / hr.games);
      }
      return best;
    },
    lean: (markets, proj) => {
      let best = -Infinity;
      for (const m of markets || []) {
        if (m.td || m.max || !m.line) continue;
        const v = statValue(proj, m.keys);
        if (v != null) best = Math.max(best, (v - m.line) / m.line);
      }
      return best;
    }
  };

  // 1st, 2nd, 3rd, 4th...
  function ordinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  NightOwl.bets = {
    MARKETS, MILESTONES, statValue, impliedOver, american, parseLines, mergeLines, hitRate,
    parseMilestones, impliedTotals, defenseRanks, progress, ordinal, keyMarket, SORTS, trimRungs
  };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.bets;
