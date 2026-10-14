// Your road through the rest of the season: each remaining opponent and your
// chance in the game, what finishing with each win total does to your playoff
// odds, how much the next game swings them, and the path through the projected
// bracket. Pure: no DOM, no network.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { winProbability } = NightOwl.season;
  const round2 = (n) => Math.round(n * 100) / 100;

  /**
   * Your remaining games.
   *   forecast  { weeks: [{ week, pairs, teams: { id: { mean, variance } } }] } (model.forecastWeeks)
   * -> [{ week, oppId, p, mean, oppMean }], p = your chance to win (a bye week is skipped)
   */
  function schedule(forecast, rosterId) {
    const out = [];
    for (const w of forecast.weeks) {
      const pair = w.pairs.find((p) => p.includes(rosterId));
      if (!pair) continue;
      const oppId = pair.find((id) => id !== rosterId);
      const me = w.teams[rosterId];
      const opp = w.teams[oppId];
      if (!me || !opp) continue;
      out.push({ week: w.week, oppId, p: round2(winProbability(me, opp)), mean: Math.round(me.mean * 10) / 10, oppMean: Math.round(opp.mean * 10) / 10 });
    }
    return out;
  }

  /**
   * What each final win total is worth, cumulatively.
   *   winOdds  projection.teams[id].winOdds: [{ wins, p, make }]
   * -> [{ atLeast, p, make }]: the chance to finish with at least that many wins, and to make the
   *    playoffs if you do. Totals too unlikely to matter (under 2%) are left out.
   */
  function needs(winOdds) {
    const rows = (winOdds || []).slice().sort((a, b) => a.wins - b.wins);
    const out = [];
    for (let i = 0; i < rows.length; i++) {
      const tail = rows.slice(i);
      const p = tail.reduce((sum, r) => sum + r.p, 0);
      const make = p > 0 ? tail.reduce((sum, r) => sum + r.p * r.make, 0) / p : 0;
      if (p >= 0.02 && Number.isInteger(rows[i].wins)) out.push({ atLeast: rows[i].wins, p, make });
    }
    return out;
  }

  /** How much the next game matters: your playoff and title odds if you win it and if you lose it. */
  function leverage(win, lose, rosterId) {
    const w = win.teams[rosterId];
    const l = lose.teams[rosterId];
    return {
      win: { playoffs: w.playoffOdds, title: w.titleOdds },
      lose: { playoffs: l.playoffOdds, title: l.titleOdds },
      swing: Math.round((w.playoffOdds - l.playoffOdds) * 1000) / 1000
    };
  }

  /**
   * Your games in the projected bracket (favorites advance).
   *   bracket  projection.bracket
   * -> [{ label, weeks, bye, seed, opponent: { rosterId, seed } | null, p }] up to the round you lose,
   *    or null when you are outside the bracket
   */
  function route(bracket, rosterId) {
    if (!bracket) return null;
    const out = [];
    for (const round of bracket.rounds) {
      const match = round.matches.find((m) => (m.top && m.top.rosterId === rosterId) || (m.bottom && m.bottom.rosterId === rosterId));
      if (!match) break;
      const top = match.top && match.top.rosterId === rosterId;
      const me = top ? match.top : match.bottom;
      const opp = top ? match.bottom : match.top;
      const p = opp ? (top ? match.pTop : 1 - match.pTop) : 1;
      out.push({ label: round.label, weeks: round.weeks, bye: !opp, seed: me.seed, opponent: opp ? { rosterId: opp.rosterId, seed: opp.seed } : null, p });
      if (p < 0.5) break; // the favorite goes through; you would be out here
    }
    return out.length ? out : null;
  }

  NightOwl.path = { schedule, needs, leverage, route };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.path;
