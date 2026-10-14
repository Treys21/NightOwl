globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { assign, canPlay, NOT_STARTING_SLOTS } = NightOwl.lineups;
  const round1 = (value) => Math.round(value * 10) / 10;
  const round2 = (value) => Math.round(value * 100) / 100;

  function optimal(slots, pids, pointsOf, positionsOf) {
    const starting = slots.filter((slot) => !NOT_STARTING_SLOTS.has(slot));
    const pool = pids.map((playerId) => ({ pid: playerId, pts: pointsOf(playerId) || 0, positions: positionsOf(playerId) }));
    const picks = assign(starting, pool, (slot, candidate) => (canPlay(slot, candidate.positions) ? candidate.pts : null));
    return {
      points: round2(picks.reduce((sum, pick) => sum + (pick ? pick.pts : 0), 0)),
      starters: picks.map((pick) => (pick ? pick.pid : null))
    };
  }

  function biggestMiss(slots, starters, bench, pointsOf, positionsOf) {
    const starting = slots.filter((slot) => !NOT_STARTING_SLOTS.has(slot));
    let best = null;
    starting.forEach((slot, i) => {
      const out = starters[i];
      const outPts = out ? pointsOf(out) || 0 : 0;
      for (const playerId of bench) {
        if (!canPlay(slot, positionsOf(playerId))) continue;
        const gain = (pointsOf(playerId) || 0) - outPts;
        if (gain > 0 && (!best || gain > best.gain)) best = { in: playerId, out, slot, gain: round2(gain) };
      }
    });
    return best;
  }

  function allPlay(weeks, { medianGame = false } = {}) {
    const out = {};
    for (const week of weeks) {
      const ids = Object.keys(week).filter((rosterId) => week[rosterId] != null);
      for (const rosterId of ids) {
        const record = out[rosterId] || (out[rosterId] = { w: 0, l: 0, t: 0, expected: 0 });
        let beat = 0;
        for (const other of ids) {
          if (other === rosterId) continue;
          if (week[rosterId] > week[other]) { record.w++; beat++; } else if (week[rosterId] < week[other]) record.l++; else { record.t++; beat += 0.5; }
        }
        if (ids.length > 1) record.expected += beat / (ids.length - 1);
        if (medianGame && ids.length > 1) {
          const above = ids.filter((other) => week[other] > week[rosterId]).length;
          const half = ids.length / 2;
          record.expected += above < half - (ids.length % 2 ? 0.5 : 0) ? 1 : 0;
        }
      }
    }
    for (const record of Object.values(out)) record.expected = round2(record.expected);
    return out;
  }

  const points = (whole, decimal) => (whole || 0) + (decimal || 0) / 100;

  function standings(rosters, weeks, options = {}) {
    const allPlayRecords = allPlay(weeks, options);
    const rows = rosters.map((roster) => {
      const rosterSettings = roster.settings || {};
      const pointsFor = points(rosterSettings.fpts, rosterSettings.fpts_decimal);
      const max = points(rosterSettings.ppts, rosterSettings.ppts_decimal);
      const record = allPlayRecords[roster.roster_id] || { w: 0, l: 0, t: 0, expected: 0 };
      const wins = rosterSettings.wins || 0;
      return {
        rosterId: roster.roster_id,
        ownerId: roster.owner_id,
        coOwners: roster.co_owners || [],
        wins,
        losses: rosterSettings.losses || 0,
        ties: rosterSettings.ties || 0,
        pf: round2(pointsFor),
        pa: round2(points(rosterSettings.fpts_against, rosterSettings.fpts_against_decimal)),
        max: max ? round2(max) : null,
        efficiency: max ? pointsFor / max : null,
        allPlay: record,
        luck: weeks.length ? round1(wins + (rosterSettings.ties || 0) / 2 - record.expected) : null
      };
    });
    rows.sort((a, b) => (b.wins + b.ties / 2) - (a.wins + a.ties / 2) || b.pf - a.pf);
    rows.forEach((row, i) => { row.rank = i + 1; });
    return rows;
  }

  function phi(zScore) {
    const erfTerm = 1 / (1 + 0.3275911 * Math.abs(zScore) / Math.SQRT2);
    const erfApproximation = 1 - (((((1.061405429 * erfTerm - 1.453152027) * erfTerm) + 1.421413741) * erfTerm - 0.284496736) * erfTerm + 0.254829592) * erfTerm * Math.exp(-zScore * zScore / 2);
    return zScore >= 0 ? (1 + erfApproximation) / 2 : (1 - erfApproximation) / 2;
  }

  const SPREAD = 0.5;

  function outlook(starters) {
    let mean = 0;
    let variance = 0;
    for (const starter of starters) {
      const left = Math.max(0, Math.min(1, starter.remaining || 0));
      const projected = Math.max(0, starter.proj || 0);
      mean += (starter.points || 0) + projected * left;
      variance += (SPREAD * projected) ** 2 * left;
    }
    return { mean: round2(mean), variance };
  }

  function winProbability(teamOutlook, opponent) {
    const standardDeviation = Math.sqrt(teamOutlook.variance + opponent.variance);
    if (standardDeviation === 0) return teamOutlook.mean > opponent.mean ? 1 : teamOutlook.mean < opponent.mean ? 0 : 0.5;
    return phi((teamOutlook.mean - opponent.mean) / standardDeviation);
  }

  function rng(seed) {
    let generatorState = seed >>> 0;
    return () => {
      generatorState = (generatorState + 0x6d2b79f5) >>> 0;
      let mixed = generatorState;
      mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
      mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);
      return ((mixed ^ (mixed >>> 14)) >>> 0) / 4294967296;
    };
  }
  const hash = (text) => [...String(text)].reduce((total, character) => Math.imul(total ^ character.charCodeAt(0), 16777619), 2166136261);

  function teamStrength(weeks, rosterId) {
    const all = weeks.flatMap((week) => Object.values(week)).filter((score) => score != null);
    const leagueMean = all.length ? all.reduce((total, score) => total + score, 0) / all.length : 100;
    const mine = weeks.map((week) => week[rosterId]).filter((score) => score != null);
    const weekCount = mine.length;
    const average = weekCount ? mine.reduce((total, score) => total + score, 0) / weekCount : leagueMean;
    const PRIOR = 3;
    const mean = (average * weekCount + leagueMean * PRIOR) / (weekCount + PRIOR);
    const standardDeviation = Math.max(leagueMean * 0.12, weekCount > 1 ? Math.sqrt(mine.reduce((total, score) => total + (score - average) ** 2, 0) / (weekCount - 1)) : leagueMean * 0.18);
    return { mean, sd: standardDeviation };
  }

  function playoffOdds({ teams, schedule, playoffTeams, medianGame = false, sims = 2000, seed = 1 }) {
    const made = Object.fromEntries(teams.map((team) => [team.rosterId, 0]));
    if (!playoffTeams || !teams.length) return made;
    const rand = rng(seed);
    const normal = () => {
      const uniform = Math.max(rand(), 1e-12);
      return Math.sqrt(-2 * Math.log(uniform)) * Math.cos(2 * Math.PI * rand());
    };
    const byId = new Map(teams.map((team) => [team.rosterId, team]));
    for (let simulationIndex = 0; simulationIndex < sims; simulationIndex++) {
      const wins = new Map(teams.map((team) => [team.rosterId, team.wins + (team.ties || 0) / 2]));
      const pointsFor = new Map(teams.map((team) => [team.rosterId, team.pf]));
      for (const week of schedule) {
        const score = new Map();
        for (const team of teams) {
          const weeklyScore = Math.max(0, team.mean + team.sd * normal());
          score.set(team.rosterId, weeklyScore);
          pointsFor.set(team.rosterId, pointsFor.get(team.rosterId) + weeklyScore);
        }
        for (const [firstTeamId, secondTeamId] of week) {
          if (!byId.has(firstTeamId) || !byId.has(secondTeamId)) continue;
          const winner = score.get(firstTeamId) >= score.get(secondTeamId) ? firstTeamId : secondTeamId;
          wins.set(winner, wins.get(winner) + 1);
        }
        if (medianGame) {
          const order = [...score.entries()].sort((a, b) => b[1] - a[1]);
          for (let i = 0; i < Math.floor(order.length / 2); i++) wins.set(order[i][0], wins.get(order[i][0]) + 1);
        }
      }
      const ranked = teams.map((team) => team.rosterId).sort((a, b) => wins.get(b) - wins.get(a) || pointsFor.get(b) - pointsFor.get(a));
      for (let i = 0; i < Math.min(playoffTeams, ranked.length); i++) made[ranked[i]]++;
    }
    for (const rosterId of Object.keys(made)) made[rosterId] /= sims;
    return made;
  }

  function asItStands(rosters, matchups, maxOf, { medianGame = false } = {}) {
    const pointsByRoster = new Map(matchups.map((matchup) => [matchup.roster_id, matchup.points || 0]));
    const result = new Map(matchups.map((matchup) => [matchup.roster_id, { w: 0, l: 0, t: 0, against: 0 }]));
    const pairs = new Map();
    for (const matchup of matchups) {
      if (matchup.matchup_id == null) continue;
      if (!pairs.has(matchup.matchup_id)) pairs.set(matchup.matchup_id, []);
      pairs.get(matchup.matchup_id).push(matchup.roster_id);
    }
    for (const [firstTeamId, secondTeamId] of pairs.values()) {
      if (secondTeamId == null) continue;
      const firstPoints = pointsByRoster.get(firstTeamId);
      const secondPoints = pointsByRoster.get(secondTeamId);
      result.get(firstTeamId)[firstPoints > secondPoints ? 'w' : firstPoints < secondPoints ? 'l' : 't']++;
      result.get(secondTeamId)[secondPoints > firstPoints ? 'w' : secondPoints < firstPoints ? 'l' : 't']++;
      result.get(firstTeamId).against += secondPoints;
      result.get(secondTeamId).against += firstPoints;
    }
    if (medianGame) {
      const order = [...pointsByRoster.entries()].sort((a, b) => b[1] - a[1]);
      order.forEach(([rosterId], i) => { result.get(rosterId)[i < Math.floor(order.length / 2) ? 'w' : 'l']++; });
    }
    return rosters.map((roster) => {
      const rosterSettings = roster.settings || {};
      const add = result.get(roster.roster_id) || { w: 0, l: 0, t: 0, against: 0 };
      const max = maxOf(roster.roster_id);
      return Object.assign({}, roster, {
        settings: Object.assign({}, rosterSettings, {
          wins: (rosterSettings.wins || 0) + add.w,
          losses: (rosterSettings.losses || 0) + add.l,
          ties: (rosterSettings.ties || 0) + add.t,
          fpts: points(rosterSettings.fpts, rosterSettings.fpts_decimal) + (pointsByRoster.get(roster.roster_id) || 0),
          fpts_decimal: 0,
          fpts_against: points(rosterSettings.fpts_against, rosterSettings.fpts_against_decimal) + add.against,
          fpts_against_decimal: 0,
          ppts: max == null ? rosterSettings.ppts : points(rosterSettings.ppts, rosterSettings.ppts_decimal) + max,
          ppts_decimal: max == null ? rosterSettings.ppts_decimal : 0
        })
      });
    });
  }

  function weeksRecorded(rosters, { medianGame = false } = {}) {
    const games = Math.max(0, ...rosters.map((roster) => {
      const rosterSettings = roster.settings || {};
      return (rosterSettings.wins || 0) + (rosterSettings.losses || 0) + (rosterSettings.ties || 0);
    }));
    return Math.floor(games / (medianGame ? 2 : 1));
  }

  const DRAFT_WIN_WEIGHT = 0.3;

  const minMax = (values) => {
    const low = Math.min(...values);
    const high = Math.max(...values);
    return values.map((value) => (high > low ? (value - low) / (high - low) : 0));
  };

  function draftOrder(teams, { method = 'linear', winWeight = DRAFT_WIN_WEIGHT } = {}) {
    if (!teams.length) return [];
    const wins = teams.map((team) => team.wins || 0);
    const maxes = teams.map((team) => team.max || 0);
    let winScores;
    let maxScores;
    if (method === 'inverse') {
      const top = Math.max(...wins);
      const best = Math.max(...maxes);
      winScores = minMax(wins.map((win) => (top + 1) / (win + 1)));
      const inverted = maxes.map((max) => (max > 0 ? best / max : null));
      const worst = Math.max(1, ...inverted.filter((ratio) => ratio != null));
      maxScores = minMax(inverted.map((ratio) => (ratio == null ? worst : ratio)));
    } else {
      winScores = minMax(wins.map((win) => -win));
      maxScores = minMax(maxes.map((max) => -max));
    }
    return teams
      .map((team, i) => Object.assign({}, team, {
        winScore: winScores[i],
        maxScore: maxScores[i],
        score: winWeight * winScores[i] + (1 - winWeight) * maxScores[i]
      }))
      .sort((a, b) => b.score - a.score || (a.wins || 0) - (b.wins || 0) || (a.max || 0) - (b.max || 0) || a.rosterId - b.rosterId)
      .map((team, i) => Object.assign(team, { pick: i + 1 }));
  }

  function pickOwners(tradedPicks, season) {
    const owners = new Map();
    for (const tradedPick of tradedPicks || []) {
      if (String(tradedPick.season) === String(season)) owners.set(`${tradedPick.round}:${tradedPick.roster_id}`, tradedPick.owner_id);
    }
    return (round, rosterId) => owners.get(`${round}:${rosterId}`) ?? rosterId;
  }

  const percentile = (value, all) => {
    const below = all.filter((otherValue) => otherValue < value).length;
    const equal = all.filter((otherValue) => otherValue === value).length;
    return all.length ? (below + equal / 2) / all.length : 0.5;
  };

  function powerRatings(rows, weeks) {
    const stats = rows.map((row) => {
      const scores = weeks.map((week) => week[row.rosterId]).filter((score) => score != null);
      const games = row.wins + row.losses + row.ties;
      const average = scores.length ? scores.reduce((total, score) => total + score, 0) / scores.length : 0;
      const standardDeviation = scores.length > 1 ? Math.sqrt(scores.reduce((total, score) => total + (score - average) ** 2, 0) / scores.length) : 0;
      const last = scores.slice(-3);
      const form = last.length === 3 ? (last[2] * 3 + last[1] * 2 + last[0]) / 6 : average;
      return { id: row.rosterId, pct: games ? (row.wins + row.ties / 2) / games : 0, avg: average, sd: standardDeviation, form };
    });
    const pcts = stats.map((stat) => stat.pct);
    const averages = stats.map((stat) => stat.avg);
    const standardDeviations = stats.map((stat) => stat.sd);
    const out = {};
    for (const stat of stats) {
      const consistency = Math.max(...standardDeviations) > 0 ? 1 - percentile(stat.sd, standardDeviations) : 0.5;
      const rating = 0.35 * percentile(stat.pct, pcts) + 0.35 * percentile(stat.avg, averages) + 0.15 * consistency + 0.15 * percentile(stat.form, averages);
      out[stat.id] = round1(rating * 100);
    }
    return out;
  }

  NightOwl.season = {
    optimal, biggestMiss, allPlay, standings, outlook, winProbability, phi, teamStrength, playoffOdds, hash,
    asItStands, weeksRecorded, draftOrder, pickOwners, powerRatings, DRAFT_WIN_WEIGHT
  };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.season;
