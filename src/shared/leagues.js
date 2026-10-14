globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const NOT_STARTING = new Set(['BN', 'IR', 'TAXI']);
  const IDP_SLOTS = new Set(['DL', 'LB', 'DB', 'IDP_FLEX']);
  const SLOT_SHORT = { SUPER_FLEX: 'SF', REC_FLEX: 'RF', WRRB_FLEX: 'W/R' };

  const isPlaying = (league) => league.status === 'in_season' || league.status === 'post_season';

  const mine = (rosters, userId) =>
    (rosters || []).find((r) => r.owner_id === userId || (r.co_owners || []).includes(userId)) || null;

  const ownerNames = (users) => new Map((users || []).map((u) => [u.user_id, u.display_name || (u.metadata && u.metadata.team_name) || u.username || 'Manager']));

  const avatars = (users) => new Map((users || []).map((u) => [
    u.user_id,
    (u.metadata && u.metadata.avatar) || (u.avatar ? `https://sleepercdn.com/avatars/thumbs/${u.avatar}` : '')
  ]));

  const startingSlots = (league) => (league.roster_positions || []).filter((p) => !NOT_STARTING.has(p));

  const usesIdp = (slotLists) => slotLists.some((slots) => slots.some((s) => IDP_SLOTS.has(s)));

  const slotLabel = (slot) => SLOT_SHORT[slot] || slot || '';

  const displayWeek = (nfl) => nfl.display_week || nfl.week;

  const lookaheadWeek = (nfl) => Math.max(nfl.week || 0, nfl.display_week || 0) || 1;

  const seasonType = (nfl) => (nfl.season_type === 'post' ? 'post' : 'regular');

  const teamUrl = (leagueId) => `https://sleeper.com/leagues/${leagueId}/team`;

  NightOwl.leagues = {
    isPlaying, mine, ownerNames, avatars, startingSlots, usesIdp, slotLabel,
    displayWeek, lookaheadWeek, seasonType, teamUrl
  };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.leagues;
