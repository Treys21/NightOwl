globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { points, statDelta, deltaPoints, describe } = NightOwl.scoring;
  const { round2 } = NightOwl.numbers;

  function pickMatchup(matchups, myRosterId) {
    const mine = matchups.find((matchup) => matchup.roster_id === myRosterId);
    if (!mine) return null;
    const opponent = mine.matchup_id == null
      ? null
      : matchups.find((matchup) => matchup.matchup_id === mine.matchup_id && matchup.roster_id !== myRosterId) || null;
    const side = (matchup) => matchup && {
      rosterId: matchup.roster_id,
      slots: matchup.starters || [],
      starters: (matchup.starters || []).filter((playerId) => playerId && playerId !== '0')
    };
    return { mine: side(mine), opp: side(opponent) };
  }

  function watchList(leagues) {
    const out = new Map();
    const addSpot = (playerId, leagueId, side) => {
      if (!out.has(playerId)) out.set(playerId, []);
      out.get(playerId).push({ leagueId, side });
    };
    for (const league of leagues) {
      if (!league.matchup) continue;
      for (const playerId of league.matchup.mine.starters) addSpot(playerId, league.leagueId, 'me');
      if (league.matchup.opp) for (const playerId of league.matchup.opp.starters) addSpot(playerId, league.leagueId, 'opp');
    }
    return out;
  }

  function sideTotal(side, stats, scoring) {
    if (!side) return null;
    return round2(side.starters.reduce((sum, playerId) => sum + points(stats[playerId], scoring), 0));
  }

  function scoreboard(leagues, stats) {
    return leagues.filter((league) => league.matchup).map((league) => {
      const mine = sideTotal(league.matchup.mine, stats, league.scoring);
      const opponent = sideTotal(league.matchup.opp, stats, league.scoring);
      return { leagueId: league.leagueId, mine, opp: opponent, margin: opponent == null ? null : round2(mine - opponent) };
    });
  }

  function diffEvents(previous, current, leagues, info, timestamp) {
    const byId = new Map(leagues.map((league) => [league.leagueId, league]));
    const events = [];
    for (const [playerId, spots] of watchList(leagues)) {
      if (!(playerId in previous)) continue;
      const delta = statDelta(previous[playerId], current[playerId]);
      if (!Object.keys(delta).length) continue;

      const impacts = spots.map(({ leagueId, side }) => {
        const league = byId.get(leagueId);
        return { leagueId, leagueName: league.name, side, pts: deltaPoints(delta, league.scoring) };
      });
      if (impacts.every((i) => i.pts === 0)) continue;

      const net = round2(impacts.reduce((total, i) => total + (i.side === 'me' ? i.pts : -i.pts), 0));
      const player = info(playerId);
      events.push({
        id: `${timestamp}-${playerId}`,
        ts: timestamp,
        pid: playerId,
        name: player.name,
        pos: player.pos,
        team: player.team,
        text: describe(delta, spots.map((spot) => byId.get(spot.leagueId).scoring)),
        impacts,
        net
      });
    }
    return events.sort((a, b) => Math.abs(b.net) - Math.abs(a.net));
  }

  function trimSnapshot(stats, leagues) {
    const out = {};
    for (const playerId of watchList(leagues).keys()) out[playerId] = stats[playerId] || {};
    return out;
  }

  NightOwl.tracker = { pickMatchup, watchList, scoreboard, diffEvents, trimSnapshot };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.tracker;
