globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { winProbability } = NightOwl.season;
  const round2 = (n) => Math.round(n * 100) / 100;

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

  function leverage(win, lose, rosterId) {
    const w = win.teams[rosterId];
    const l = lose.teams[rosterId];
    return {
      win: { playoffs: w.playoffOdds, title: w.titleOdds },
      lose: { playoffs: l.playoffOdds, title: l.titleOdds },
      swing: Math.round((w.playoffOdds - l.playoffOdds) * 1000) / 1000
    };
  }

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
      if (p < 0.5) break;
    }
    return out.length ? out : null;
  }

  NightOwl.path = { schedule, needs, leverage, route };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.path;
