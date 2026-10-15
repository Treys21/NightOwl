globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { round1, round2 } = NightOwl.numbers;
  const { optimal, outlook, phi, rng, draftOrder, DRAFT_WIN_WEIGHT } = NightOwl.season;

  const OUT_FOR_SEASON = new Set(['IR', 'PUP', 'Sus', 'NA']);
  const OUT_THIS_WEEK = new Set(['Out', 'Doubtful']);

  const DEFAULT_EFFICIENCY = 0.92;
  const clampEfficiency = (event) => (event == null || !isFinite(event) ? DEFAULT_EFFICIENCY : Math.max(0.8, Math.min(1, event)));

  function teamWeek(slots, pool, projOf, positionsOf, isOut) {
    const best = optimal(slots, pool, (playerId) => (isOut(playerId) ? 0 : projOf(playerId)), positionsOf);
    const starters = best.starters.filter(Boolean);
    const teamOutlook = outlook(starters.map((playerId) => ({ points: 0, proj: isOut(playerId) ? 0 : projOf(playerId), remaining: 1 })));
    return { mean: teamOutlook.mean, variance: teamOutlook.variance, starters };
  }

  function availability(injuryOf) {
    return (weekIndex) => (playerId) => {
      const status = injuryOf(playerId);
      return OUT_FOR_SEASON.has(status) || (weekIndex === 0 && OUT_THIS_WEEK.has(status));
    };
  }

  function slotOrder(size) {
    let order = [1, 2];
    while (order.length < size) {
      const nextSize = order.length * 2;
      order = order.flatMap((seed) => [seed, nextSize + 1 - seed]);
    }
    return order;
  }

  function bracketFormat(playoffTeams, playoffStart, roundType = 0) {
    if (!playoffTeams || playoffTeams < 2) return null;
    const rounds = Math.ceil(Math.log2(playoffTeams));
    const size = 2 ** rounds;
    const order = slotOrder(size);
    const firstRound = [];
    for (let i = 0; i < order.length; i += 2) {
      const topSeed = order[i];
      const bottomSeed = order[i + 1];
      firstRound.push([topSeed, bottomSeed <= playoffTeams ? bottomSeed : null]);
    }
    const out = [];
    let week = playoffStart;
    for (let roundNumber = 1; roundNumber <= rounds; roundNumber++) {
      const final = roundNumber === rounds;
      const span = roundType === 2 || (roundType === 1 && final) ? 2 : 1;
      const weeks = Array.from({ length: span }, (_, i) => week + i);
      week += span;
      const left = rounds - roundNumber;
      out.push({ round: roundNumber, label: final ? 'Championship' : left === 1 ? 'Semifinals' : left === 2 ? 'Quarterfinals' : `Round ${roundNumber}`, weeks });
    }
    return { rounds: out, firstRound };
  }

  const playoffWeeks = (format) => (format ? format.rounds.flatMap((round) => round.weeks) : []);

  const rankTeamsByRecord = (ids, wins, pointsFor) => ids.slice().sort((a, b) => wins.get(b) - wins.get(a) || pointsFor.get(b) - pointsFor.get(a) || a - b);

  function projectSeason({ teams, weeks, playoff = null, medianGame = false, sims = 2000, seed = 1, draft = null, forced = null }) {
    const ids = teams.map((team) => team.rosterId);
    const byId = new Map(teams.map((team) => [team.rosterId, team]));
    const efficiencyByTeam = new Map(teams.map((team) => [team.rosterId, clampEfficiency(team.efficiency)]));
    const rand = rng(seed);
    let spare = null;
    const normal = () => {
      if (spare != null) { const savedNormal = spare; spare = null; return savedNormal; }
      const uniform = Math.max(rand(), 1e-12);
      const uniformAngle = rand();
      const radius = Math.sqrt(-2 * Math.log(uniform));
      spare = radius * Math.sin(2 * Math.PI * uniformAngle);
      return radius * Math.cos(2 * Math.PI * uniformAngle);
    };
    const draw = (teamOutlook) => (teamOutlook ? Math.max(0, teamOutlook.mean + Math.sqrt(teamOutlook.variance) * normal()) : 0);

    const format = playoff && playoff.format;
    const playoffTeams = format ? Math.min(ids.length, format.firstRound.flat().filter(Boolean).length) : 0;
    const tally = new Map(ids.map((rosterId) => [rosterId, {
      wins: 0, losses: 0, ties: 0, pf: 0, max: 0, rank: 0,
      playoffs: 0, bye: 0, final: 0, title: 0, firstRoundExit: 0, thirdPlace: 0,
      winHist: new Map(), madeByWins: new Map(),
      seeds: new Array(ids.length + 1).fill(0), picks: new Array(ids.length + 1).fill(0), pick: 0
    }]));

    for (let simulation = 0; simulation < sims; simulation++) {
      const wins = new Map(teams.map((team) => [team.rosterId, team.wins + (team.ties || 0) / 2]));
      const losses = new Map(teams.map((team) => [team.rosterId, team.losses || 0]));
      const pointsFor = new Map(teams.map((team) => [team.rosterId, team.pf || 0]));
      const max = new Map(teams.map((team) => [team.rosterId, team.max || 0]));

      for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
        const weekForecast = weeks[weekIndex];
        const score = new Map();
        for (const rosterId of ids) {
          const teamOutlook = weekForecast.teams[rosterId];
          const full = draw(teamOutlook);
          const actual = teamOutlook && teamOutlook.lineupSet ? full : full * efficiencyByTeam.get(rosterId);
          score.set(rosterId, actual);
          pointsFor.set(rosterId, pointsFor.get(rosterId) + actual);
          max.set(rosterId, max.get(rosterId) + full);
        }
        for (const [firstTeamId, secondTeamId] of weekForecast.pairs) {
          if (!byId.has(firstTeamId) || !byId.has(secondTeamId)) continue;
          const isForcedGame = forced && weekIndex === forced.weekIndex && (firstTeamId === forced.winner || secondTeamId === forced.winner);
          const firstWins = isForcedGame ? firstTeamId === forced.winner : score.get(firstTeamId) >= score.get(secondTeamId);
          const [winnerId, loserId] = firstWins ? [firstTeamId, secondTeamId] : [secondTeamId, firstTeamId];
          wins.set(winnerId, wins.get(winnerId) + 1);
          losses.set(loserId, losses.get(loserId) + 1);
        }
        if (medianGame) {
          const order = ids.slice().sort((a, b) => score.get(b) - score.get(a));
          order.forEach((rosterId, i) => {
            if (i < Math.floor(order.length / 2)) wins.set(rosterId, wins.get(rosterId) + 1);
            else losses.set(rosterId, losses.get(rosterId) + 1);
          });
        }
      }

      const ranked = rankTeamsByRecord(ids, wins, pointsFor);
      ranked.forEach((rosterId, i) => {
        const teamTally = tally.get(rosterId);
        teamTally.rank += i + 1;
        teamTally.seeds[i + 1]++;
        const total = wins.get(rosterId);
        teamTally.winHist.set(total, (teamTally.winHist.get(total) || 0) + 1);
        if (i < playoffTeams) { teamTally.playoffs++; teamTally.madeByWins.set(total, (teamTally.madeByWins.get(total) || 0) + 1); }
      });

      if (format && playoffTeams >= 2) {
        const seedOf = (seedNumber) => (seedNumber <= playoffTeams ? ranked[seedNumber - 1] : null);
        let alive = format.firstRound.map(([topSeedNumber, bottomSeedNumber]) => [seedOf(topSeedNumber), bottomSeedNumber == null ? null : seedOf(bottomSeedNumber)]);
        for (const pair of alive) if (pair[1] == null && pair[0] != null) tally.get(pair[0]).bye++;
        const semifinalRound = format.rounds.length - 2;
        let semifinalLosers = [];
        for (let roundIndex = 0; roundIndex < format.rounds.length; roundIndex++) {
          const round = format.rounds[roundIndex];
          const total = (rosterId) => round.weeks.reduce((sum, week) => sum + draw(playoff.teams[week] && playoff.teams[week][rosterId]) * efficiencyByTeam.get(rosterId), 0);
          const losers = [];
          const winners = alive.map(([firstTeamId, secondTeamId]) => {
            if (secondTeamId == null) return firstTeamId;
            if (firstTeamId == null) return secondTeamId;
            const firstTotal = total(firstTeamId);
            const secondTotal = total(secondTeamId);
            const firstWins = firstTotal > secondTotal || (firstTotal === secondTotal && ranked.indexOf(firstTeamId) < ranked.indexOf(secondTeamId));
            losers.push(firstWins ? secondTeamId : firstTeamId);
            return firstWins ? firstTeamId : secondTeamId;
          });
          if (roundIndex === 0) for (const loser of losers) tally.get(loser).firstRoundExit++;
          if (roundIndex === semifinalRound) semifinalLosers = losers;
          if (roundIndex === format.rounds.length - 1) {
            const [firstFinalistId, secondFinalistId] = alive[0];
            if (firstFinalistId != null) tally.get(firstFinalistId).final++;
            if (secondFinalistId != null) tally.get(secondFinalistId).final++;
            tally.get(winners[0]).title++;
            if (semifinalLosers.length === 2) {
              const [first, second] = semifinalLosers;
              const firstScore = total(first);
              const secondScore = total(second);
              const thirdPlaceWinner = firstScore > secondScore || (firstScore === secondScore && ranked.indexOf(first) < ranked.indexOf(second)) ? first : second;
              tally.get(thirdPlaceWinner).thirdPlace++;
            }
          }
          alive = [];
          for (let i = 0; i < winners.length; i += 2) alive.push([winners[i], winners[i + 1] == null ? null : winners[i + 1]]);
        }
      }

      if (draft) {
        const picks = draftOrder(ids.map((rosterId) => ({ rosterId: rosterId, wins: wins.get(rosterId), max: max.get(rosterId) })), draft);
        for (const pick of picks) {
          const teamTally = tally.get(pick.rosterId);
          teamTally.picks[pick.pick]++;
          teamTally.pick += pick.pick;
        }
      }

      for (const rosterId of ids) {
        const teamTally = tally.get(rosterId);
        teamTally.wins += wins.get(rosterId);
        teamTally.losses += losses.get(rosterId);
        teamTally.pf += pointsFor.get(rosterId);
        teamTally.max += max.get(rosterId);
      }
    }

    const out = {};
    for (const rosterId of ids) {
      const teamTally = tally.get(rosterId);
      const team = byId.get(rosterId);
      out[rosterId] = {
        rosterId: rosterId,
        wins: round1(teamTally.wins / sims),
        losses: round1(teamTally.losses / sims),
        ties: team.ties || 0,
        pf: round2(teamTally.pf / sims),
        max: round2(teamTally.max / sims),
        avgRank: round2(teamTally.rank / sims),
        seedOdds: teamTally.seeds.slice(1).map((seed) => seed / sims),
        winOdds: [...teamTally.winHist.entries()].sort((a, b) => a[0] - b[0]).map(([winCount, occurrences]) => ({ wins: winCount, p: occurrences / sims, make: (teamTally.madeByWins.get(winCount) || 0) / occurrences })),
        playoffOdds: teamTally.playoffs / sims,
        byeOdds: teamTally.bye / sims,
        finalOdds: teamTally.final / sims,
        titleOdds: teamTally.title / sims,
        firstRoundExitOdds: teamTally.firstRoundExit / sims,
        thirdPlaceOdds: teamTally.thirdPlace / sims,
        pickOdds: draft ? teamTally.picks.slice(1).map((pick) => pick / sims) : null,
        avgPick: draft ? round2(teamTally.pick / sims) : null
      };
    }
    const order = ids.slice().sort((a, b) => out[a].avgRank - out[b].avgRank || out[b].wins - out[a].wins || a - b);
    return { teams: out, order, bracket: format ? chalkBracket(format, order.slice(0, playoffTeams), playoff.teams, efficiencyByTeam) : null };
  }

  function chalkBracket(format, seeds, weekly, efficiencyByTeam) {
    const seedOf = (seedNumber) => (seedNumber <= seeds.length ? { seed: seedNumber, rosterId: seeds[seedNumber - 1] } : null);
    let alive = format.firstRound.map(([topSeedNumber, bottomSeedNumber]) => [seedOf(topSeedNumber), bottomSeedNumber == null ? null : seedOf(bottomSeedNumber)]);
    const rounds = [];
    for (const round of format.rounds) {
      const stats = (side) => {
        if (!side) return null;
        let mean = 0;
        let variance = 0;
        for (const week of round.weeks) {
          const teamForecast = weekly[week] && weekly[week][side.rosterId];
          const efficiency = efficiencyByTeam.get(side.rosterId) || DEFAULT_EFFICIENCY;
          if (teamForecast) { mean += teamForecast.mean * efficiency; variance += teamForecast.variance * efficiency * efficiency; }
        }
        return { mean: round1(mean), variance };
      };
      const matches = alive.map(([topSide, bottomSide]) => {
        const topStats = stats(topSide);
        const bottomStats = stats(bottomSide);
        let pTop = 1;
        if (topSide && bottomSide) {
          const standardDeviation = Math.sqrt(topStats.variance + bottomStats.variance);
          pTop = standardDeviation > 0 ? phi((topStats.mean - bottomStats.mean) / standardDeviation) : topStats.mean >= bottomStats.mean ? 1 : 0;
        } else if (!topSide) pTop = 0;
        return {
          top: topSide && Object.assign({}, topSide, { points: topStats.mean }),
          bottom: bottomSide && Object.assign({}, bottomSide, { points: bottomStats.mean }),
          pTop: round2(pTop)
        };
      });
      rounds.push(Object.assign({}, round, { matches }));
      const winners = matches.map((match) => (match.bottom == null ? match.top : match.top == null ? match.bottom : match.pTop >= 0.5 ? match.top : match.bottom));
      alive = [];
      for (let i = 0; i < winners.length; i += 2) alive.push([winners[i] && { seed: winners[i].seed, rosterId: winners[i].rosterId }, winners[i + 1] ? { seed: winners[i + 1].seed, rosterId: winners[i + 1].rosterId } : null]);
    }
    const last = rounds[rounds.length - 1].matches[0];
    const champion = last.bottom == null ? last.top : last.top == null ? last.bottom : last.pTop >= 0.5 ? last.top : last.bottom;
    return { rounds, champion: champion && { seed: champion.seed, rosterId: champion.rosterId } };
  }

  function projectedDraft(projection, { method = 'linear', winWeight = DRAFT_WIN_WEIGHT } = {}) {
    const rows = Object.values(projection.teams).map((team) => ({ rosterId: team.rosterId, wins: team.wins, max: team.max, odds: team.pickOdds, avgPick: team.avgPick }));
    return draftOrder(rows, { method, winWeight });
  }

  NightOwl.projection = {
    teamWeek, availability, bracketFormat, playoffWeeks, slotOrder, projectSeason, chalkBracket, projectedDraft,
    DEFAULT_EFFICIENCY, OUT_FOR_SEASON, OUT_THIS_WEEK
  };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.projection;
