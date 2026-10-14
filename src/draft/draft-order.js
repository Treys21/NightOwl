globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  function slotForUser(draft, userId) {
    const order = draft && draft.draft_order;
    if (!order || !userId) return null;
    const slot = order[userId];
    return typeof slot === 'number' ? slot : null;
  }

  function slotOnClock(draft, overallPick) {
    const teams = draft && draft.settings && draft.settings.teams;
    if (!teams) return null;
    const round = Math.ceil(overallPick / teams);
    const indexInRound = ((overallPick - 1) % teams) + 1;
    const reversed = draft.type === 'snake' && round % 2 === 0;
    return reversed ? teams - indexInRound + 1 : indexInRound;
  }

  NightOwl.draftOrder = { slotForUser, slotOnClock };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.draftOrder;
