// Cross-league bookkeeping: who is starting where, live matchup scores, and
// turning two stat snapshots into scoring events with per-league impact.
// Pure functions — no chrome.* or fetch — so they run under node --test.
globalThis.SLT = globalThis.SLT || {};

(function (SLT) {
  'use strict';

  const { points, statDelta, deltaPoints, describe, round2 } = SLT.scoring;

  // matchups: GET /league/<id>/matchups/<week>. Returns { mine, opp } entries
  // of { rosterId, starters }, opp null on a bye / median-only week.
  function pickMatchup(matchups, myRosterId) {
    const mine = matchups.find((m) => m.roster_id === myRosterId);
    if (!mine) return null;
    const opp = mine.matchup_id == null
      ? null
      : matchups.find((m) => m.matchup_id === mine.matchup_id && m.roster_id !== myRosterId) || null;
    const side = (m) => m && {
      rosterId: m.roster_id,
      // slots lines up with the league's starting roster_positions ('0' = empty).
      slots: m.starters || [],
      starters: (m.starters || []).filter((pid) => pid && pid !== '0')
    };
    return { mine: side(mine), opp: side(opp) };
  }

  // pid -> [{ leagueId, side: 'me' | 'opp' }] over every tracked league.
  function watchList(leagues) {
    const out = new Map();
    const add = (pid, leagueId, side) => {
      if (!out.has(pid)) out.set(pid, []);
      out.get(pid).push({ leagueId, side });
    };
    for (const lg of leagues) {
      if (!lg.matchup) continue;
      for (const pid of lg.matchup.mine.starters) add(pid, lg.leagueId, 'me');
      if (lg.matchup.opp) for (const pid of lg.matchup.opp.starters) add(pid, lg.leagueId, 'opp');
    }
    return out;
  }

  function sideTotal(side, stats, scoring) {
    if (!side) return null;
    return round2(side.starters.reduce((sum, pid) => sum + points(stats[pid], scoring), 0));
  }

  // [{ leagueId, mine, opp, margin }] live from the current stat snapshot.
  function scoreboard(leagues, stats) {
    return leagues.filter((lg) => lg.matchup).map((lg) => {
      const mine = sideTotal(lg.matchup.mine, stats, lg.scoring);
      const opp = sideTotal(lg.matchup.opp, stats, lg.scoring);
      return { leagueId: lg.leagueId, mine, opp, margin: opp == null ? null : round2(mine - opp) };
    });
  }

  // Compare two snapshots ({ pid: stats }) and emit one event per watched
  // player whose fantasy points moved in at least one league they start in.
  // A pid missing from `prev` wasn't being tracked yet: it becomes the
  // baseline instead of replaying their whole game as one event.
  function diffEvents(prev, cur, leagues, info, ts) {
    const byId = new Map(leagues.map((lg) => [lg.leagueId, lg]));
    const events = [];
    for (const [pid, spots] of watchList(leagues)) {
      if (!(pid in prev)) continue;
      const delta = statDelta(prev[pid], cur[pid]);
      if (!Object.keys(delta).length) continue;

      const impacts = spots.map(({ leagueId, side }) => {
        const lg = byId.get(leagueId);
        return { leagueId, leagueName: lg.name, side, pts: deltaPoints(delta, lg.scoring) };
      });
      if (impacts.every((i) => i.pts === 0)) continue;

      const net = round2(impacts.reduce((s, i) => s + (i.side === 'me' ? i.pts : -i.pts), 0));
      const p = info(pid);
      events.push({
        id: `${ts}-${pid}`,
        ts,
        pid,
        name: p.name,
        pos: p.pos,
        team: p.team,
        text: describe(delta, spots.map((s) => byId.get(s.leagueId).scoring)),
        impacts,
        net
      });
    }
    // Biggest swings first within one poll.
    return events.sort((a, b) => Math.abs(b.net) - Math.abs(a.net));
  }

  // Keep only watched players in the stored snapshot; {} marks "tracked, no
  // stats yet" so their first play still counts as an event.
  function trimSnapshot(stats, leagues) {
    const out = {};
    for (const pid of watchList(leagues).keys()) out[pid] = stats[pid] || {};
    return out;
  }

  SLT.tracker = { pickMatchup, watchList, scoreboard, diffEvents, trimSnapshot };
})(globalThis.SLT);

if (typeof module !== 'undefined') module.exports = globalThis.SLT.tracker;
