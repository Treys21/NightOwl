const ESPN_TO_SLEEPER_TEAM = { WSH: 'WAS' };

function trimScoringPlays(summary) {
  const game = summary && summary.header && summary.header.competitions && summary.header.competitions[0];
  const teams = ((game && game.competitors) || []).map((competitor) => competitor.team && competitor.team.abbreviation).filter(Boolean);
  const gameLabel = teams.length === 2 ? `${teams[1]} @ ${teams[0]}` : '';
  return ((summary && summary.scoringPlays) || []).map((play) => ({
    id: String(play.id),
    text: play.text || '',
    quarter: play.period && play.period.number,
    clock: play.clock && play.clock.displayValue,
    team: play.team && (ESPN_TO_SLEEPER_TEAM[play.team.abbreviation] || play.team.abbreviation),
    game: gameLabel,
    awayScore: play.awayScore,
    homeScore: play.homeScore
  }));
}

const summaryUrl = (eventId) => `https://site.api.espn.com/apis/site/v2/sports/football/nfl/summary?event=${eventId}`;
const isEventId = (value) => /^\d+$/.test(String(value));

if (typeof module !== 'undefined') module.exports = { trimScoringPlays, summaryUrl, isEventId };
if (typeof globalThis !== 'undefined') globalThis.NightOwlEspnPlays = { trimScoringPlays, summaryUrl, isEventId };
