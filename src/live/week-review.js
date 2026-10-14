globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { points: fantasyPoints } = NightOwl.scoring;

  const PASS_TOUCHDOWN = /^(.+?) (\d+) Yd pass from (.+?)(?: \(|$)/i;
  const RUSH_TOUCHDOWN = /^(.+?) (\d+) Yd Rush(?: \(|$)/i;
  const FIELD_GOAL = /^(.+?) (\d+) Yd Field Goal/i;

  const LONG_PLAY_YARDS = 40;
  const VERY_LONG_PLAY_YARDS = 50;
  const FIELD_GOAL_BUCKETS = [[0, 19], [20, 29], [30, 39], [40, 49]];
  const FIELD_GOAL_FIFTY_PLUS = 50;
  const SHOWN_INSIGHTS = 5;
  const ESPN_TO_SLEEPER_TEAM = { WSH: 'WAS' };

  const roundTenth = (number) => Math.round(number * 10) / 10;

  function receivingStats(yards) {
    const stats = { rec: 1, rec_yd: yards, rec_td: 1, rec_fd: 1 };
    if (yards >= LONG_PLAY_YARDS) Object.assign(stats, { rec_40p: 1, bonus_rec_td_40p: 1 });
    if (yards >= VERY_LONG_PLAY_YARDS) stats.bonus_rec_td_50p = 1;
    return stats;
  }

  function passingStats(yards) {
    const stats = { pass_cmp: 1, pass_att: 1, pass_yd: yards, pass_td: 1, pass_fd: 1 };
    if (yards >= LONG_PLAY_YARDS) Object.assign(stats, { pass_cmp_40p: 1, bonus_pass_td_40p: 1 });
    if (yards >= VERY_LONG_PLAY_YARDS) stats.bonus_pass_td_50p = 1;
    return stats;
  }

  function rushingStats(yards) {
    const stats = { rush_att: 1, rush_yd: yards, rush_td: 1, rush_fd: 1 };
    if (yards >= LONG_PLAY_YARDS) Object.assign(stats, { rush_40p: 1, bonus_rush_td_40p: 1 });
    if (yards >= VERY_LONG_PLAY_YARDS) stats.bonus_rush_td_50p = 1;
    return stats;
  }

  function fieldGoalStats(yards) {
    const stats = { fgm: 1 };
    const bucket = FIELD_GOAL_BUCKETS.find(([low, high]) => yards >= low && yards <= high);
    stats[bucket ? `fgm_${bucket[0]}_${bucket[1]}` : `fgm_${FIELD_GOAL_FIFTY_PLUS}p`] = 1;
    return stats;
  }

  /**
   * One ESPN scoring play ({ id, text, quarter, clock, team, game }) -> the play with the players in it and the stats it gave each.
   * Touchdowns and field goals are priced; anything else (returns, safeties) is kept with no participants.
   */
  function readScoringPlay(rawPlay) {
    const team = ESPN_TO_SLEEPER_TEAM[rawPlay.team] || rawPlay.team;
    const base = { id: rawPlay.id, text: rawPlay.text, quarter: rawPlay.quarter, clock: rawPlay.clock, team, game: rawPlay.game, kind: 'other', participants: [] };
    const text = String(rawPlay.text || '');
    const pass = PASS_TOUCHDOWN.exec(text);
    if (pass) {
      const yards = Number(pass[2]);
      return Object.assign(base, {
        kind: 'pass',
        yards,
        participants: [
          { name: pass[1], team, role: 'scorer', stats: receivingStats(yards) },
          { name: pass[3], team, role: 'passer', stats: passingStats(yards) }
        ]
      });
    }
    const rush = RUSH_TOUCHDOWN.exec(text);
    if (rush) {
      const yards = Number(rush[2]);
      return Object.assign(base, { kind: 'rush', yards, participants: [{ name: rush[1], team, role: 'scorer', stats: rushingStats(yards) }] });
    }
    const fieldGoal = FIELD_GOAL.exec(text);
    if (fieldGoal) {
      const yards = Number(fieldGoal[2]);
      return Object.assign(base, { kind: 'fieldGoal', yards, participants: [{ name: fieldGoal[1], team, role: 'kicker', stats: fieldGoalStats(yards) }] });
    }
    return base;
  }

  const sideOf = (league, playerId) => {
    if (league.mine.starters.includes(playerId)) return 'mine';
    if (league.opponent.starters.includes(playerId)) return 'theirs';
    return null;
  };

  /** How a league's matchup ended: margin from your side, and whether you won. */
  function leagueResult(league) {
    const margin = roundTenth(league.mine.points - league.opponent.points);
    return { leagueId: league.id, leagueName: league.name, opponentName: league.opponent.name, myPoints: league.mine.points, theirPoints: league.opponent.points, margin, won: margin > 0, lost: margin < 0 };
  }

  /** Would the result have flipped without these points? Positive points help you; negative points help the opponent. */
  function decidedResult(result, swing) {
    if (result.won) return swing > 0 && swing > result.margin;
    if (result.lost) return swing < 0 && -swing > -result.margin;
    return false;
  }

  /**
   * Price every scoring play in every league, from the starters on each side.
   *   leagues      [{ id, name, scoring, mine: { points, starters }, opponent: { name, points, starters } }]
   *   plays        readScoringPlay() output
   *   playerIdOf   (name, team) -> Sleeper player id or null
   * -> { results, plays: [{ play, entries: [{ leagueId, net, flipped, participants }] }], insights }
   */
  function reviewWeek({ leagues, plays, playerIdOf }) {
    const results = leagues.map(leagueResult);
    const resultOf = new Map(results.map((result) => [result.leagueId, result]));
    const pricedPlays = [];

    for (const play of plays) {
      const participants = play.participants
        .map((participant) => Object.assign({}, participant, { playerId: playerIdOf(participant.name, participant.team) }))
        .filter((participant) => participant.playerId);
      if (!participants.length) continue;
      const entries = [];
      for (const league of leagues) {
        const touching = participants
          .map((participant) => ({ participant, side: sideOf(league, participant.playerId) }))
          .filter((item) => item.side)
          .map(({ participant, side }) => {
            const earned = roundTenth(fantasyPoints(participant.stats, league.scoring));
            return { playerId: participant.playerId, role: participant.role, side, points: side === 'mine' ? earned : -earned };
          })
          .filter((item) => item.points !== 0);
        if (!touching.length) continue;
        const net = roundTenth(touching.reduce((total, item) => total + item.points, 0));
        entries.push({ leagueId: league.id, net, flipped: decidedResult(resultOf.get(league.id), net), participants: touching });
      }
      if (entries.length) pricedPlays.push({ play, participants, entries });
    }

    return { results, plays: pricedPlays, insights: buildInsights(pricedPlays, resultOf) };
  }

  function swingByPlayerAndLeague(pricedPlays) {
    const swings = new Map();
    for (const { entries } of pricedPlays) {
      for (const entry of entries) {
        for (const item of entry.participants) {
          if (!swings.has(item.playerId)) swings.set(item.playerId, new Map());
          const byLeague = swings.get(item.playerId);
          byLeague.set(entry.leagueId, roundTenth((byLeague.get(entry.leagueId) || 0) + item.points));
        }
      }
    }
    return swings;
  }

  function playerInsights(swings, resultOf) {
    const insights = [];
    for (const [playerId, byLeague] of swings) {
      const leagues = [...byLeague].map(([leagueId, points]) => {
        const result = resultOf.get(leagueId);
        return { leagueId, leagueName: result.leagueName, points, margin: result.margin, won: result.won, decided: decidedResult(result, points) };
      });
      const helped = leagues.filter((league) => league.points > 0);
      const hurt = leagues.filter((league) => league.points < 0);
      const decidedCount = leagues.filter((league) => league.decided).length;
      if (!decidedCount && leagues.length < 2) continue;
      const kind = helped.length && hurt.length ? 'mixed' : hurt.length ? 'cost' : 'rescue';
      const size = leagues.reduce((total, league) => total + Math.abs(league.points), 0);
      insights.push({ kind, playerId, leagues, score: decidedCount * 100 + leagues.length * 10 + size });
    }
    return insights;
  }

  function connectionInsights(pricedPlays, resultOf) {
    const connections = new Map();
    for (const { play, participants, entries } of pricedPlays) {
      if (play.kind !== 'pass') continue;
      const scorer = participants.find((participant) => participant.role === 'scorer');
      const passer = participants.find((participant) => participant.role === 'passer');
      if (!scorer || !passer) continue;
      const key = `${passer.playerId}>${scorer.playerId}`;
      if (!connections.has(key)) connections.set(key, { passerId: passer.playerId, scorerId: scorer.playerId, touchdowns: 0, netByLeague: new Map() });
      const connection = connections.get(key);
      connection.touchdowns++;
      for (const entry of entries) connection.netByLeague.set(entry.leagueId, roundTenth((connection.netByLeague.get(entry.leagueId) || 0) + entry.net));
    }
    return [...connections.values()].map((connection) => {
      const leagues = [...connection.netByLeague].map(([leagueId, points]) => {
        const result = resultOf.get(leagueId);
        return { leagueId, leagueName: result.leagueName, points, margin: result.margin, won: result.won, decided: decidedResult(result, points) };
      });
      const size = leagues.reduce((total, league) => total + Math.abs(league.points), 0);
      const decidedCount = leagues.filter((league) => league.decided).length;
      return { kind: 'connection', playerId: connection.scorerId, partnerId: connection.passerId, touchdowns: connection.touchdowns, leagues, score: decidedCount * 100 + leagues.length * 10 + size };
    }).filter((insight) => insight.leagues.length);
  }

  function buildInsights(pricedPlays, resultOf) {
    const swings = swingByPlayerAndLeague(pricedPlays);
    const players = playerInsights(swings, resultOf);
    const connections = connectionInsights(pricedPlays, resultOf).filter((insight) => insight.leagues.some((league) => league.decided) || insight.leagues.length >= 2);
    return players.concat(connections).sort((first, second) => second.score - first.score).slice(0, SHOWN_INSIGHTS);
  }

  const pointsText = (points) => `${points > 0 ? '+' : points < 0 ? '−' : ''}${Math.abs(points).toFixed(1)}`;
  const leagueCount = (count) => `${count} league${count === 1 ? '' : 's'}`;

  /** The one-line headline for an insight, given a function that names a player. */
  function insightTitle(insight, nameOf) {
    const name = nameOf(insight.playerId);
    const decidedWins = insight.leagues.filter((league) => league.decided && league.won).length;
    const decidedLosses = insight.leagues.filter((league) => league.decided && !league.won).length;
    if (insight.kind === 'connection') {
      const passer = nameOf(insight.partnerId);
      const touchdowns = insight.touchdowns === 1 ? '1 touchdown' : `${insight.touchdowns} touchdowns`;
      return `${passer} to ${name}: ${touchdowns}`;
    }
    if (insight.kind === 'cost') return decidedLosses ? `${name} cost you ${leagueCount(decidedLosses)}` : `${name} hurt you in ${leagueCount(insight.leagues.length)}`;
    if (insight.kind === 'rescue') return decidedWins ? `${name} won you ${leagueCount(decidedWins)}` : `${name} helped you in ${leagueCount(insight.leagues.length)}`;
    return `${name} helped in ${leagueCount(insight.leagues.filter((league) => league.points > 0).length)} and hurt in ${leagueCount(insight.leagues.filter((league) => league.points < 0).length)}`;
  }

  /** How one league line of an insight reads: "Blood Feud +13.5, won by 6". */
  function leagueLine(league) {
    const margin = Math.abs(league.margin).toFixed(1);
    const outcome = league.won ? `won by ${margin}` : league.margin < 0 ? `lost by ${margin}` : 'tied';
    return { text: `${league.leagueName} ${pointsText(league.points)}`, outcome, decided: league.decided, tone: league.points > 0 ? 'up' : 'down' };
  }

  NightOwl.weekReview = { readScoringPlay, reviewWeek, insightTitle, leagueLine, decidedResult, pointsText };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.weekReview;
