globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { points, statDelta, deltaPoints, describe, round2 } = NightOwl.scoring;

  function pickMatchup(matchups, myRosterId) {
    const mine = matchups.find((m) => m.roster_id === myRosterId);
    if (!mine) return null;
    const opponent = mine.matchup_id == null
      ? null
      : matchups.find((m) => m.matchup_id === mine.matchup_id && m.roster_id !== myRosterId) || null;
    const side = (m) => m && {
      rosterId: m.roster_id,
      slots: m.starters || [],
      starters: (m.starters || []).filter((playerId) => playerId && playerId !== '0')
    };
    return { mine: side(mine), opp: side(opponent) };
  }

  function watchList(leagues) {
    const out = new Map();
    const add = (playerId, leagueId, side) => {
      if (!out.has(playerId)) out.set(playerId, []);
      out.get(playerId).push({ leagueId, side });
    };
    for (const league of leagues) {
      if (!league.matchup) continue;
      for (const playerId of league.matchup.mine.starters) add(playerId, league.leagueId, 'me');
      if (league.matchup.opp) for (const playerId of league.matchup.opp.starters) add(playerId, league.leagueId, 'opp');
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

  function diffEvents(prev, cur, leagues, info, ts) {
    const byId = new Map(leagues.map((league) => [league.leagueId, league]));
    const events = [];
    for (const [playerId, spots] of watchList(leagues)) {
      if (!(playerId in prev)) continue;
      const delta = statDelta(prev[playerId], cur[playerId]);
      if (!Object.keys(delta).length) continue;

      const impacts = spots.map(({ leagueId, side }) => {
        const league = byId.get(leagueId);
        return { leagueId, leagueName: league.name, side, pts: deltaPoints(delta, league.scoring) };
      });
      if (impacts.every((i) => i.pts === 0)) continue;

      const net = round2(impacts.reduce((s, i) => s + (i.side === 'me' ? i.pts : -i.pts), 0));
      const p = info(playerId);
      events.push({
        id: `${ts}-${playerId}`,
        ts,
        pid: playerId,
        name: p.name,
        pos: p.pos,
        team: p.team,
        text: describe(delta, spots.map((s) => byId.get(s.leagueId).scoring)),
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
