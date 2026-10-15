globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const SEASON_GAMES = 17;
  const SEASONS_AHEAD = 4;
  const CONTENDER_YEARLY_DISCOUNT = 0.7;
  const REBUILDER_YEARLY_DISCOUNT = 0.97;
  const CONTENDER_THIS_SEASON_WEIGHT = 1.2;
  const REBUILDER_THIS_SEASON_WEIGHT = 0.6;
  const NEUTRAL_CONTENTION = 0.5;
  const PRODUCTION_TRUST_BY_AGE = [[22, 0.1], [23, 0.2], [24, 0.35], [25, 0.5]];
  const PRODUCTION_VALUE_CAP = 1.5;

  const between = (low, high, share) => low + (high - low) * share;
  const clampShare = (share) => Math.max(0, Math.min(1, share));

  function seasonWeights(contention) {
    const share = clampShare(contention);
    const discount = between(REBUILDER_YEARLY_DISCOUNT, CONTENDER_YEARLY_DISCOUNT, share);
    const weights = [between(REBUILDER_THIS_SEASON_WEIGHT, CONTENDER_THIS_SEASON_WEIGHT, share)];
    for (let year = 1; year <= SEASONS_AHEAD; year++) weights.push(Math.pow(discount, year));
    return weights;
  }

  function productionStream({ restOfSeasonPoints, gamesLeft, perGameRate, replacementRate, position, age, thisSeasonOverReplacement = null }) {
    const thisSeason = thisSeasonOverReplacement !== null ? Math.max(0, thisSeasonOverReplacement) : Math.max(0, restOfSeasonPoints - replacementRate * gamesLeft);
    const stream = [thisSeason];
    for (let year = 1; year <= SEASONS_AHEAD; year++) {
      const points = perGameRate * SEASON_GAMES * NightOwl.ageCurves.futureMultiplier(position, age, year);
      stream.push(Math.max(0, points - replacementRate * SEASON_GAMES));
    }
    return stream;
  }

  const weightedProduction = (stream, contention) => {
    const weights = seasonWeights(contention);
    return stream.reduce((total, points, year) => total + points * weights[year], 0);
  };

  function productionTrust(age, hasProjection) {
    if (!hasProjection) return 0;
    if (!age) return PRODUCTION_TRUST_BY_AGE[PRODUCTION_TRUST_BY_AGE.length - 1][1];
    for (const [limitAge, trust] of PRODUCTION_TRUST_BY_AGE) if (age <= limitAge) return trust;
    return PRODUCTION_TRUST_BY_AGE[PRODUCTION_TRUST_BY_AGE.length - 1][1];
  }

  function blendedValue({ marketValue, productionValue, age, hasProjection }) {
    if (!marketValue) return 0;
    const trust = productionTrust(age, hasProjection);
    const production = Math.min(marketValue * PRODUCTION_VALUE_CAP, productionValue);
    return Math.round((1 - trust) * marketValue + trust * production);
  }

  const median = (numbers) => {
    const sorted = numbers.slice().sort((a, b) => a - b);
    return sorted.length ? sorted[Math.floor(sorted.length / 2)] : null;
  };

  function priceOfProduction(samples) {
    return median(samples.filter((sample) => sample.marketValue >= 3000 && sample.neutralProduction >= 12).map((sample) => sample.marketValue / sample.neutralProduction));
  }

  NightOwl.dynastyValues = { seasonWeights, productionStream, weightedProduction, productionTrust, blendedValue, priceOfProduction, NEUTRAL_CONTENTION, SEASON_GAMES, SEASONS_AHEAD };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.dynastyValues;
