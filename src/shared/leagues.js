globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const NOT_STARTING = new Set(['BN', 'IR', 'TAXI']);
  const IDP_SLOTS = new Set(['DL', 'LB', 'DB', 'IDP_FLEX']);
  const SLOT_SHORT = { SUPER_FLEX: 'SF', REC_FLEX: 'RF', WRRB_FLEX: 'W/R' };

  const isPlaying = (league) => league.status === 'in_season' || league.status === 'post_season';

  const mine = (rosters, userId) =>
    (rosters || []).find((roster) => roster.owner_id === userId || (roster.co_owners || []).includes(userId)) || null;

  const ownerNames = (users) => new Map((users || []).map((user) => [user.user_id, user.display_name || (user.metadata && user.metadata.team_name) || user.username || 'Manager']));

  const avatars = (users) => new Map((users || []).map((user) => [
    user.user_id,
    (user.metadata && user.metadata.avatar) || (user.avatar ? `https://sleepercdn.com/avatars/thumbs/${user.avatar}` : '')
  ]));

  const startingSlots = (league) => (league.roster_positions || []).filter((slot) => !NOT_STARTING.has(slot));

  const usesIdp = (slotLists) => slotLists.some((slots) => slots.some((slot) => IDP_SLOTS.has(slot)));

  const slotLabel = (slot) => SLOT_SHORT[slot] || slot || '';

  const displayWeek = (nflState) => nflState.display_week || nflState.week;

  const lookaheadWeek = (nflState) => Math.max(nflState.week || 0, nflState.display_week || 0) || 1;

  const seasonType = (nflState) => (nflState.season_type === 'post' ? 'post' : 'regular');

  const teamUrl = (leagueId) => `https://sleeper.com/leagues/${leagueId}/team`;

  const keepsPlayers = (league) => Boolean(league.settings) && (league.settings.type === 1 || league.settings.type === 2);

  NightOwl.leagues = {
    keepsPlayers, isPlaying, mine, ownerNames, avatars, startingSlots, usesIdp, slotLabel,
    displayWeek, lookaheadWeek, seasonType, teamUrl
  };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.leagues;
