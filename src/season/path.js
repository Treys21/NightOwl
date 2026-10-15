globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { round1, round2 } = NightOwl.numbers;
  const { winProbability } = NightOwl.season;

  function schedule(forecast, rosterId) {
    const out = [];
    for (const week of forecast.weeks) {
      const pair = week.pairs.find((pair) => pair.includes(rosterId));
      if (!pair) continue;
      const opponentId = pair.find((teamId) => teamId !== rosterId);
      const myTeamWeek = week.teams[rosterId];
      const opponent = week.teams[opponentId];
      if (!myTeamWeek || !opponent) continue;
      out.push({ week: week.week, oppId: opponentId, p: round2(winProbability(myTeamWeek, opponent)), mean: round1(myTeamWeek.mean), oppMean: round1(opponent.mean) });
    }
    return out;
  }

  function needs(winOdds) {
    const rows = (winOdds || []).slice().sort((a, b) => a.wins - b.wins);
    const out = [];
    for (let i = 0; i < rows.length; i++) {
      const tail = rows.slice(i);
      const probability = tail.reduce((sum, row) => sum + row.p, 0);
      const make = probability > 0 ? tail.reduce((sum, row) => sum + row.p * row.make, 0) / probability : 0;
      if (probability >= 0.02 && Number.isInteger(rows[i].wins)) out.push({ atLeast: rows[i].wins, p: probability, make });
    }
    return out;
  }

  function leverage(win, lose, rosterId) {
    const ifWin = win.teams[rosterId];
    const ifLose = lose.teams[rosterId];
    return {
      win: { playoffs: ifWin.playoffOdds, title: ifWin.titleOdds },
      lose: { playoffs: ifLose.playoffOdds, title: ifLose.titleOdds },
      swing: Math.round((ifWin.playoffOdds - ifLose.playoffOdds) * 1000) / 1000
    };
  }

  function route(bracket, rosterId) {
    if (!bracket) return null;
    const out = [];
    for (const round of bracket.rounds) {
      const match = round.matches.find((match) => (match.top && match.top.rosterId === rosterId) || (match.bottom && match.bottom.rosterId === rosterId));
      if (!match) break;
      const top = match.top && match.top.rosterId === rosterId;
      const mySide = top ? match.top : match.bottom;
      const opponent = top ? match.bottom : match.top;
      const probability = opponent ? (top ? match.pTop : 1 - match.pTop) : 1;
      out.push({ label: round.label, weeks: round.weeks, bye: !opponent, seed: mySide.seed, opponent: opponent ? { rosterId: opponent.rosterId, seed: opponent.seed } : null, p: probability });
      if (probability < 0.5) break;
    }
    return out.length ? out : null;
  }

  NightOwl.path = { schedule, needs, leverage, route };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.path;
