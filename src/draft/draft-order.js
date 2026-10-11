// Draft-order math for the "you are on the clock" banner. Pure; tested against
// 204 real picks from a completed 12-team snake draft.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  /** Slot this user drafts from, or null if they aren't in this draft. */
  function slotForUser(draft, userId) {
    const order = draft && draft.draft_order;
    if (!order || !userId) return null;
    const slot = order[userId];
    return typeof slot === 'number' ? slot : null;
  }

  /** Slot on the clock for an overall pick number (1-based). Snake drafts reverse on even rounds. */
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
