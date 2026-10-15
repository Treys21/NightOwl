globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, storage, players, match } = NightOwl;
  const { isPlaying, mine: rosterOf, ownerNames } = NightOwl.leagues;
  const { readScoringPlay } = NightOwl.weekReview;

  const CONCURRENT_GAME_REQUESTS = 4;
  const PLAYS_KEY = (season, week) => `live.plays.${season}.${week}`;

  /** The last finished week: Sleeper moves its week on after Monday night, so the week before the upcoming one. */
  function previousWeek(nflState) {
    const upcoming = NightOwl.leagues.lookaheadWeek(nflState);
    return nflState.season_type === 'regular' && upcoming > 1 ? upcoming - 1 : null;
  }

  async function inBatches(items, batchSize, load) {
    const results = [];
    for (let start = 0; start < items.length; start += batchSize) {
      results.push(...await Promise.all(items.slice(start, start + batchSize).map(load)));
    }
    return results;
  }

  /** Every scoring play of a finished week, read once and kept for good: a finished game never changes. */
  async function weekPlays(season, week) {
    const cached = await storage.get(PLAYS_KEY(season, week), null);
    if (cached) return cached;
    const events = await api.kickoffs(season, week, 'regular');
    const finished = events.filter((event) => event.status && event.status.type && event.status.type.state === 'post');
    const perGame = await inBatches(finished, CONCURRENT_GAME_REQUESTS, (event) => api.scoringPlays(event.id));
    const plays = perGame.flat();
    if (finished.length && finished.length === events.length) await storage.set({ [PLAYS_KEY(season, week)]: plays });
    return plays;
  }

  const startersOf = (matchup) => (matchup.starters || []).filter((playerId) => playerId && playerId !== '0');

  async function loadLeagueMatchups(league, userId, week) {
    const [rosters, users, matchups] = await Promise.all([api.rosters(league.league_id), api.users(league.league_id), api.matchups(league.league_id, week)]);
    const myRoster = rosterOf(rosters, userId);
    const myMatchup = myRoster && (matchups || []).find((matchup) => matchup.roster_id === myRoster.roster_id);
    if (!myMatchup || myMatchup.matchup_id == null) return null;
    const opponentMatchup = matchups.find((matchup) => matchup.matchup_id === myMatchup.matchup_id && matchup.roster_id !== myMatchup.roster_id);
    if (!opponentMatchup || !(myMatchup.points > 0 || opponentMatchup.points > 0)) return null;
    const opponentRoster = rosters.find((roster) => roster.roster_id === opponentMatchup.roster_id);
    const names = ownerNames(users);
    return {
      id: league.league_id,
      name: league.name.trim(),
      scoring: league.scoring_settings || {},
      mine: { points: myMatchup.points, starters: startersOf(myMatchup) },
      opponent: { name: (opponentRoster && names.get(opponentRoster.owner_id)) || 'Opponent', points: opponentMatchup.points, starters: startersOf(opponentMatchup) }
    };
  }

  function playerResolver() {
    const indexByTeam = new Map();
    return (name, team) => {
      if (!indexByTeam.has(team)) indexByTeam.set(team, match.buildIndex(players.list().filter((player) => player.team === team)));
      const hit = match.matchPlayer({ name, team }, indexByTeam.get(team));
      return hit ? hit.id : null;
    };
  }

  /**
   * Everything the "last week" view needs: each league's matchup, and the week's scoring plays (null when ESPN can't be reached).
   * -> { week, leagues, plays, playerIdOf } or { week: null }
   */
  async function loadLastWeek({ nflState, userId, excludedLeagueIds }) {
    const week = previousWeek(nflState);
    if (!week) return { week: null };
    const playing = (await api.leagues(userId, nflState.season)).filter((league) => isPlaying(league) && !excludedLeagueIds.includes(league.league_id));
    const [leagues, rawPlays] = await Promise.all([
      Promise.all(playing.map((league) => loadLeagueMatchups(league, userId, week))).then((loaded) => loaded.filter(Boolean)),
      weekPlays(nflState.season, week).catch(() => null)
    ]);
    return { week, leagues, plays: rawPlays ? rawPlays.map(readScoringPlay) : null, playerIdOf: playerResolver() };
  }

  NightOwl.liveWeekData = { loadLastWeek, previousWeek, weekPlays };
})(globalThis.NightOwl);
