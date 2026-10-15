globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const LEADER_AT_OR_ABOVE = 0.6;
  const LONG_SHOT_BELOW = 0.15;
  const PLAYOFF_WEEK_WEIGHT = { leader: 1.8, hunt: 1.5, longShot: 0.8 };
  const REGULAR_WEEK_WEIGHT = 1;
  const MIN_GAMES_FOR_FORM = 2;
  const HOT_RATIO = 1.35;
  const COLD_RATIO = 0.6;
  const MIN_POINTS_GAP_FOR_FORM = 4;
  const EXTRA_BODY_PREMIUM = 0.07;
  const SHAPE_BONUS = 0.06;

  function stanceOf(playoffOdds) {
    if (playoffOdds === null || playoffOdds === undefined) return 'hunt';
    if (playoffOdds >= LEADER_AT_OR_ABOVE) return 'leader';
    return playoffOdds < LONG_SHOT_BELOW ? 'longShot' : 'hunt';
  }

  const stanceLabel = (stance) => ({ leader: 'Playoff team', hunt: 'In the hunt', longShot: 'Long shot' }[stance]);

  const weekWeight = (isPlayoffWeek, stance) => (isPlayoffWeek ? PLAYOFF_WEEK_WEIGHT[stance] || PLAYOFF_WEEK_WEIGHT.hunt : REGULAR_WEEK_WEIGHT);

  /**
   * Is a player running well above or below what his projection says he is? Recent points are a noisy read of his true level,
   * so a hot streak is a reason to sell, a cold one a reason to buy, when the projection (built from usage) has not moved.
   */
  function formSignal({ recentPoints, projectedPerGame }) {
    const played = recentPoints.filter((points) => points !== null && points !== undefined);
    if (played.length < MIN_GAMES_FOR_FORM || !(projectedPerGame > 0)) return null;
    const recentPerGame = played.reduce((total, points) => total + points, 0) / played.length;
    const gap = recentPerGame - projectedPerGame;
    const ratio = recentPerGame / projectedPerGame;
    if (ratio >= HOT_RATIO && gap >= MIN_POINTS_GAP_FOR_FORM) return { signal: 'hot', recentPerGame, projectedPerGame, ratio };
    if (ratio <= COLD_RATIO && gap <= -MIN_POINTS_GAP_FOR_FORM) return { signal: 'cold', recentPerGame, projectedPerGame, ratio };
    return null;
  }

  /**
   * The share of a deal's price the side taking MORE bodies has to add: each extra player costs a roster spot.
   * Returns the multiplier applied to what that side gives (1 when the counts are even).
   */
  function extraBodyPremium(bodiesReceived, bodiesSent) {
    const extra = Math.max(0, bodiesReceived - bodiesSent);
    return 1 + EXTRA_BODY_PREMIUM * extra;
  }

  /**
   * Which shape of deal suits a team: a leader wants one better player for its depth (consolidation); a team still in the
   * hunt wants two solid weekly starters for one star; a long shot has little to gain either way.
   */
  function shapeFit(stance, bodiesReceived, bodiesSent) {
    if (bodiesReceived === bodiesSent) return 1;
    const consolidating = bodiesReceived < bodiesSent;
    if (stance === 'leader') return consolidating ? 1 + SHAPE_BONUS : 1 - SHAPE_BONUS;
    if (stance === 'hunt') return consolidating ? 1 - SHAPE_BONUS : 1 + SHAPE_BONUS;
    return 1;
  }

  NightOwl.redraftValues = { stanceOf, stanceLabel, weekWeight, formSignal, extraBodyPremium, shapeFit, LEADER_AT_OR_ABOVE, LONG_SHOT_BELOW };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.redraftValues;
