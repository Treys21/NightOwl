globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const roundTo = (places) => {
    const scale = 10 ** places;
    return (value) => Math.round(value * scale) / scale;
  };

  const round1 = roundTo(1);
  const round2 = roundTo(2);

  NightOwl.numbers = { round1, round2 };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.numbers;
