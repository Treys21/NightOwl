// League plumbing every tool used to repeat: which leagues count, which roster
// is yours, team names, the NFL week to show, and what a player id looks like.
// Pure: no DOM, no network, so it runs under node --test.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const NOT_STARTING = new Set(['BN', 'IR', 'TAXI']);
  const IDP_SLOTS = new Set(['DL', 'LB', 'DB', 'IDP_FLEX']);
  const SLOT_SHORT = { SUPER_FLEX: 'SF', REC_FLEX: 'RF', WRRB_FLEX: 'W/R' };

  /** Leagues whose games are being played (not drafting, not finished). */
  const isPlaying = (league) => league.status === 'in_season' || league.status === 'post_season';

  /** Your roster in a league (owner or co-owner), or null. */
  const mine = (rosters, userId) =>
    (rosters || []).find((r) => r.owner_id === userId || (r.co_owners || []).includes(userId)) || null;

  /** user id -> the manager's own name (their Sleeper display name), which is what people recognise; the team name only when there is no display name. */
  const ownerNames = (users) => new Map((users || []).map((u) => [u.user_id, u.display_name || (u.metadata && u.metadata.team_name) || u.username || 'Manager']));

  /** user id -> avatar URL ('' when there is none). */
  const avatars = (users) => new Map((users || []).map((u) => [
    u.user_id,
    (u.metadata && u.metadata.avatar) || (u.avatar ? `https://sleepercdn.com/avatars/thumbs/${u.avatar}` : '')
  ]));

  /** The slots that start (roster_positions minus bench, IR and taxi), in order. */
  const startingSlots = (league) => (league.roster_positions || []).filter((p) => !NOT_STARTING.has(p));

  /** Does any of these slot lists start IDP players? (IDP rows are most of the stats payload.) */
  const usesIdp = (slotLists) => slotLists.some((slots) => slots.some((s) => IDP_SLOTS.has(s)));

  /** "SUPER_FLEX" -> "SF", for tight columns. */
  const slotLabel = (slot) => SLOT_SHORT[slot] || slot || '';

  /**
   * The week most tools show. Sleeper's display_week stays on the week just
   * played until midweek, so the last scores stay visible.
   */
  const displayWeek = (nfl) => nfl.display_week || nfl.week;

  /**
   * The week to look ahead to. Sleeper moves `week` on as soon as Monday's game
   * ends, while display_week lags: lineups and alerts care about what's next.
   */
  const lookaheadWeek = (nfl) => Math.max(nfl.week || 0, nfl.display_week || 0) || 1;

  /** The season type stats, schedules and lines are filed under. */
  const seasonType = (nfl) => (nfl.season_type === 'post' ? 'post' : 'regular');

  /** Where you set a lineup. */
  const teamUrl = (leagueId) => `https://sleeper.com/leagues/${leagueId}/team`;

  NightOwl.leagues = {
    isPlaying, mine, ownerNames, avatars, startingSlots, usesIdp, slotLabel,
    displayWeek, lookaheadWeek, seasonType, teamUrl
  };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.leagues;
