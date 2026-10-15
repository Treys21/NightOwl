globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const RETENTION_BY_POSITION = {
    QB: [[21, 0.6], [22, 0.72], [23, 0.82], [24, 0.9], [25, 0.96], [26, 1], [33, 1], [34, 0.93], [35, 0.84], [36, 0.74], [37, 0.63], [38, 0.52], [39, 0.42]],
    RB: [[21, 0.85], [22, 0.93], [23, 1], [24, 1], [25, 0.98], [26, 0.92], [27, 0.8], [28, 0.6], [29, 0.42], [30, 0.3], [31, 0.2], [32, 0.14]],
    WR: [[21, 0.78], [22, 0.85], [23, 0.92], [24, 0.97], [25, 1], [26, 0.95], [27, 0.85], [28, 0.72], [29, 0.6], [30, 0.48], [31, 0.36], [32, 0.26], [33, 0.18]],
    TE: [[21, 0.45], [22, 0.55], [23, 0.7], [24, 0.82], [25, 0.92], [26, 0.98], [27, 1], [29, 1], [30, 0.93], [31, 0.82], [32, 0.7], [33, 0.56], [34, 0.44]]
  };

  const FLOOR_RETENTION = 0.1;
  const REBUILDER_TWO_YEAR_RETENTION = 0.68;
  const LOW_LIQUIDITY_TWO_YEAR_RETENTION = 0.6;

  function retention(position, age) {
    const curve = RETENTION_BY_POSITION[position];
    if (!curve || !age) return 1;
    if (age <= curve[0][0]) return curve[0][1];
    for (let index = 1; index < curve.length; index++) {
      const [laterAge, laterShare] = curve[index];
      if (age <= laterAge) {
        const [earlierAge, earlierShare] = curve[index - 1];
        return earlierShare + (laterShare - earlierShare) * ((age - earlierAge) / (laterAge - earlierAge));
      }
    }
    return Math.max(FLOOR_RETENTION, curve[curve.length - 1][1]);
  }

  function futureMultiplier(position, age, yearsAhead) {
    if (!age || !RETENTION_BY_POSITION[position]) return 1;
    return retention(position, age + yearsAhead) / retention(position, age);
  }

  const twoYearRetention = (position, age) => futureMultiplier(position, age, 2);

  const losesTooMuchForRebuild = (position, age) => twoYearRetention(position, age) < REBUILDER_TWO_YEAR_RETENTION;
  const hardToMove = (position, age) => twoYearRetention(position, age) < LOW_LIQUIDITY_TWO_YEAR_RETENTION;

  NightOwl.ageCurves = { retention, futureMultiplier, twoYearRetention, losesTooMuchForRebuild, hardToMove };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.ageCurves;
