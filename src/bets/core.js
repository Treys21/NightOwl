globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const round1 = (value) => Math.round(value * 10) / 10;

  const ANYTIME_TOUCHDOWN_LINE = 0.5;

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
  const ORDER = Object.keys(MARKETS);

  const MILESTONES = {
    'Receiving Yards Milestones': { label: 'Rec yds', keys: ['rec_yd'] },
    'Rushing Yards Milestones': { label: 'Rush yds', keys: ['rush_yd'] },
    'Receptions Milestones': { label: 'Receptions', keys: ['rec'] },
    'Passing Yards Milestones': { label: 'Pass yds', keys: ['pass_yd'] },
    'Rushing + Receiving Yards Milestones': { label: 'Rush + rec yds', keys: ['rush_yd', 'rec_yd'] },
    'Passing Touchdown Milestones': { label: 'Pass TDs', keys: ['pass_td'] },
    'Rushing Attempts Milestones': { label: 'Carries', keys: ['rush_att'] }
  };

  function statValue(stats, keys) {
    if (!stats || !keys.length) return null;
    let total = 0;
    let seen = false;
    for (const key of keys) {
      if (stats[key] != null) { total += stats[key]; seen = true; }
    }
    return seen ? round1(total) : null;
  }

  function impliedOver(overMult, underMult) {
    const overImplied = overMult ? 1 / overMult : null;
    const underImplied = underMult ? 1 / underMult : null;
    if (overImplied != null && underImplied != null) return overImplied / (overImplied + underImplied);
    if (overImplied != null) return Math.min(1, overImplied);
    if (underImplied != null) return Math.max(0, 1 - underImplied);
    return null;
  }

  function american(multiplier) {
    const decimalOdds = Number(multiplier);
    if (!decimalOdds || decimalOdds <= 1) return null;
    const american = decimalOdds >= 2 ? Math.round((decimalOdds - 1) * 100) : -Math.round(100 / (decimalOdds - 1));
    return american > 0 ? `+${american}` : `${american}`;
  }

  function parseLines(raw) {
    const out = {};
    for (const entry of raw || []) {
      const first = entry.options && entry.options[0];
      if (!first || first.sport !== 'nfl' || entry.subject_type !== 'player') continue;
      const meta = MARKETS[entry.wager_type];
      if (!meta) continue;
      const over = entry.options.find((option) => option.outcome === 'over');
      const under = entry.options.find((option) => option.outcome === 'under');
      const line = Number((over || under || first).outcome_value);
      const overMult = over ? Number(over.payout_multiplier) : null;
      const underMult = under ? Number(under.payout_multiplier) : null;
      const playerId = String(entry.subject_id);
      (out[playerId] = out[playerId] || []).push({
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
    for (const playerId of Object.keys(out)) {
      const best = new Map();
      for (const market of out[playerId]) {
        const current = best.get(market.type);
        if (!current || market.updatedAt > current.updatedAt) best.set(market.type, market);
      }
      out[playerId] = [...best.values()].sort((a, b) => ORDER.indexOf(a.type) - ORDER.indexOf(b.type));
    }
    return out;
  }

  const LIVE_STATS = {
    QB: [['pass_yd', 'pass yds'], ['pass_td', 'TD'], ['rush_yd', 'rush yds']],
    RB: [['rush_yd', 'rush yds'], ['rec', 'rec'], ['rush_td', 'TD']],
    WR: [['rec', 'rec'], ['rec_yd', 'yds'], ['rec_td', 'TD']],
    TE: [['rec', 'rec'], ['rec_yd', 'yds'], ['rec_td', 'TD']],
    K: [['fgm', 'FG'], ['xpm', 'XP']]
  };
  function liveLine(position, stats) {
    const parts = (LIVE_STATS[position] || [])
      .filter(([key], i) => i < 2 || (stats && stats[key]))
      .map(([key, label]) => `${Math.round((stats && stats[key]) || 0)} ${label}`);
    return parts.length ? `${parts.join(' · ')} so far` : '';
  }

  function mergeLines(previous, fresh) {
    const out = Object.assign({}, previous || {});
    for (const [playerId, markets] of Object.entries(fresh || {})) {
      const byType = new Map((out[playerId] || []).map((market) => [market.type, market]));
      for (const market of markets) byType.set(market.type, market);
      out[playerId] = [...byType.values()].sort((a, b) => ORDER.indexOf(a.type) - ORDER.indexOf(b.type));
    }
    return out;
  }

  function hitRate(recent, line) {
    const values = (recent || []).map((game) => game.value).filter((value) => value != null);
    if (!values.length) return null;
    return { over: values.filter((value) => value > line).length, games: values.length };
  }

  function parseMilestones(items) {
    const byAthlete = new Map();
    for (const item of items || []) {
      const meta = MILESTONES[item.type && item.type.name];
      const target = item.current && item.current.target && item.current.target.value;
      const ref = item.athlete && item.athlete.$ref;
      if (!meta || target == null || !ref) continue;
      const match = ref.match(/athletes\/(\d+)/);
      if (!match) continue;
      const athleteId = match[1];
      if (!byAthlete.has(athleteId)) byAthlete.set(athleteId, new Map());
      const ladders = byAthlete.get(athleteId);
      if (!ladders.has(meta.label)) ladders.set(meta.label, { label: meta.label, keys: meta.keys, rungs: new Set() });
      ladders.get(meta.label).rungs.add(Number(target));
    }
    const out = {};
    for (const [athleteId, ladders] of byAthlete) {
      out[athleteId] = [...ladders.values()].map((ladder) => ({ label: ladder.label, keys: ladder.keys, rungs: [...ladder.rungs].sort((a, b) => a - b) }));
    }
    return out;
  }

  function impliedTotals(game) {
    const odds = game && game.odds;
    if (!odds || odds.overUnder == null) return null;
    const total = Number(odds.overUnder);
    const match = /^([A-Z]{2,4})\s+(-?\d+(?:\.\d+)?)$/.exec((odds.details || '').trim());
    const out = { total, spread: null, favorite: null, teams: {} };
    if (match) {
      const favorite = match[1] === 'WSH' ? 'WAS' : match[1];
      const spread = Math.abs(Number(match[2]));
      out.favorite = favorite;
      out.spread = spread;
      const underdog = favorite === game.home ? game.away : game.home;
      out.teams[favorite] = round1((total + spread) / 2);
      out.teams[underdog] = round1((total - spread) / 2);
    } else if (/even|pk/i.test(odds.details || '')) {
      out.teams[game.home] = out.teams[game.away] = round1(total / 2);
    }
    return out;
  }

  function defenseRanks(defRows) {
    const positions = ['QB', 'RB', 'WR', 'TE', 'K'];
    const perGame = (row, position) => {
      const stats = row.stats || {};
      const games = stats.gp || 1;
      return (stats[`fan_pts_allow_${position.toLowerCase()}`] || 0) / games;
    };
    const out = {};
    for (const position of positions) {
      [...(defRows || [])]
        .filter((row) => row.stats && row.stats.gp)
        .sort((a, b) => perGame(b, position) - perGame(a, position))
        .forEach((row, i) => {
          out[row.player_id] = out[row.player_id] || {};
          out[row.player_id][position] = { rank: i + 1, perGame: round1(perGame(row, position)) };
        });
    }
    return out;
  }

  function progress(market, liveStats) {
    if (!market.keys.length || !liveStats) return null;
    const value = statValue(liveStats, market.keys) ?? 0;
    const line = market.td ? ANYTIME_TOUCHDOWN_LINE : market.line;
    return { value, line, pct: line > 0 ? Math.min(1, value / line) : (value > 0 ? 1 : 0), hit: value > line };
  }

  function trimRungs(rungs, line, max = 6) {
    if (rungs.length <= max) return rungs.slice();
    const center = line != null ? line : rungs[Math.floor(rungs.length / 2)];
    return rungs.slice().sort((a, b) => Math.abs(a - center) - Math.abs(b - center) || a - b)
      .slice(0, max).sort((a, b) => a - b);
  }

  const KEY_BY_POS = {
    QB: ['passing_yards', 'passing_and_rushing_yards', 'passing_touchdowns'],
    RB: ['rushing_yards', 'rushing_and_receiving_yards', 'receptions'],
    WR: ['receiving_yards', 'receptions', 'rushing_and_receiving_yards'],
    TE: ['receiving_yards', 'receptions'],
    K: ['kicking_points', 'field_goal_made']
  };
  function keyMarket(markets, position) {
    const list = (markets || []).filter((market) => !market.td);
    for (const type of KEY_BY_POS[position] || []) {
      const market = list.find((candidate) => candidate.type === type);
      if (market) return market;
    }
    return list[0] || null;
  }

  const SORTS = {
    td: (markets) => {
      const touchdownMarket = (markets || []).find((market) => market.type === 'anytime_touchdowns');
      return touchdownMarket && touchdownMarket.pOver != null ? touchdownMarket.pOver : -1;
    },
    hit: (markets) => {
      let best = -1;
      for (const market of markets || []) {
        if (market.td || market.max) continue;
        const rate = hitRate(market.recent, market.line);
        if (rate && rate.games >= 4) best = Math.max(best, rate.over / rate.games);
      }
      return best;
    },
    lean: (markets, proj) => {
      let best = -Infinity;
      for (const market of markets || []) {
        if (market.td || market.max || !market.line) continue;
        const value = statValue(proj, market.keys);
        if (value != null) best = Math.max(best, (value - market.line) / market.line);
      }
      return best;
    }
  };

  function ordinal(number) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const lastTwoDigits = number % 100;
    return number + (suffixes[(lastTwoDigits - 20) % 10] || suffixes[lastTwoDigits] || suffixes[0]);
  }

  NightOwl.bets = {
    MARKETS, MILESTONES, ANYTIME_TOUCHDOWN_LINE, statValue, liveLine, impliedOver, american, parseLines, mergeLines, hitRate,
    parseMilestones, impliedTotals, defenseRanks, progress, ordinal, keyMarket, SORTS, trimRungs
  };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.bets;
