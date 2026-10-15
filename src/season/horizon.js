globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { optimal } = NightOwl.season;

  const SEASON_GAMES = 17;
  const YEARS_AHEAD = 2;
  const NEGLIGIBLE_POINTS_PER_WEEK = 0.7;
  const MODEST_POINTS_PER_WEEK = 2.3;

  const ageMultiplier = (position, age, yearsAhead) => NightOwl.ageCurves.futureMultiplier(position, age, yearsAhead);

  function perGameRate(playerId, weeks) {
    let total = 0;
    let games = 0;
    for (const week of weeks) {
      if (week.isOut(playerId)) continue;
      const points = week.projOf(playerId);
      if (points > 0) { total += points; games++; }
    }
    return games ? total / games : 0;
  }

  function futureLineupPoints({ slots, pool, positionsOf, ageOf, weeks, isVirtual, replacementRate, yearsAhead }) {
    const seasonPoints = (playerId) => {
      if (isVirtual(playerId)) return replacementRate(playerId) * SEASON_GAMES;
      const position = (positionsOf(playerId) || [])[0];
      return perGameRate(playerId, weeks) * SEASON_GAMES * ageMultiplier(position, ageOf(playerId), yearsAhead);
    };
    return optimal(slots, pool, seasonPoints, positionsOf).points;
  }

  const without = (pool, leaving) => pool.filter((playerId) => !leaving.includes(playerId));

  function horizonImpact({ slots, positionsOf, ageOf, weeks, isVirtual, replacementRate, a: firstTeam, b: secondTeam, aGives, bGives }) {
    const side = (pool, gives, gets) => {
      const years = Array.from({ length: YEARS_AHEAD }, (_, index) => index + 1);
      return years.map((yearsAhead) => {
        const inputs = { slots, positionsOf, ageOf, weeks, isVirtual, replacementRate, yearsAhead };
        const before = futureLineupPoints(Object.assign({ pool }, inputs));
        const after = futureLineupPoints(Object.assign({ pool: without(pool, gives).concat(gets) }, inputs));
        return Math.round((after - before) * 10) / 10;
      });
    };
    return { a: side(firstTeam.pool, aGives, bGives), b: side(secondTeam.pool, bGives, aGives) };
  }

  function meaningfulness(pointsChange, weeksLeft) {
    const perWeek = Math.abs(pointsChange) / Math.max(1, weeksLeft);
    if (perWeek < NEGLIGIBLE_POINTS_PER_WEEK) return 'negligible';
    return perWeek < MODEST_POINTS_PER_WEEK ? 'modest' : 'significant';
  }

  const averageAge = (players) => {
    const ages = players.map((player) => player.age).filter(Boolean);
    return ages.length ? ages.reduce((total, age) => total + age, 0) / ages.length : null;
  };

  /**
   * Plain-language cautions about a trade, most important first.
   *   now      lineup points this season for you; future: points for each of the next seasons
   *   gives, gets   [{ name, age, position }]
   */
  function tradeNotes({ now, future, weeksLeft, season, gives, gets }) {
    const notes = [];
    const nowSize = meaningfulness(now, weeksLeft);
    if (nowSize === 'negligible' && (gives.length || gets.length)) notes.push("This season's lineup change is within projection noise. Don't pay for it.");
    const lastYear = future[future.length - 1];
    if (now > 0 && lastYear < 0) {
      const oldest = gets.slice().sort((x, y) => (y.age || 0) - (x.age || 0))[0];
      notes.push(`Helps now, but costs you by ${season + future.length}${oldest && oldest.age ? `: ${oldest.name} is ${oldest.age}` : ''}.`);
    } else if (now <= 0 && lastYear > 0) {
      notes.push(`Costs you now but pays off by ${season + future.length}.`);
    }
    const giveAge = averageAge(gives);
    const getAge = averageAge(gets);
    if (giveAge && getAge && Math.abs(getAge - giveAge) >= 2) {
      notes.push(`You get ${Math.abs(getAge - giveAge).toFixed(0)} years ${getAge > giveAge ? 'older' : 'younger'} (average age ${giveAge.toFixed(0)} to ${getAge.toFixed(0)}).`);
    }
    return notes;
  }

  NightOwl.horizon = { ageMultiplier, horizonImpact, meaningfulness, tradeNotes, perGameRate, YEARS_AHEAD, SEASON_GAMES };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.horizon;
