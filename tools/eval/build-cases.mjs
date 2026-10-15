import { parseArgs } from 'node:util';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { nightOwl, loadWorld, seededRandom, hashNumber, writeJson, EVAL_DIR } from './lib/env.mjs';
import { loadSeason, kindOf, playedThrough, rostersAt, standingsBefore, windowsFromStandings, prepare, buildContext, teamOf, actualPoints, LAST_WEEK } from './lib/league.mjs';
import { scoreCase, DEFAULT_QUALITY } from './quality.mjs';

const { values: options } = parseArgs({ options: {
  leagues: { type: 'string' },
  weeks: { type: 'string', default: '4,7,10' },
  teams: { type: 'string', default: '2' },
  candidates: { type: 'string', default: '12' },
  limit: { type: 'string', default: '40' },
  accept: { type: 'string', default: String(DEFAULT_QUALITY.acceptThreshold) },
  'heldout-share': { type: 'string', default: '0.3' }
} });

if (!options.leagues) { console.error('usage: node tools/eval/build-cases.mjs --leagues <file with league ids | id,id,...> [--weeks 4,7,10] [--teams 2] [--limit 40] [--accept 0.7]'); process.exit(1); }
const leagueIds = (/^\d+(,\d+)*$/.test(options.leagues) ? options.leagues.split(',') : readFileSync(options.leagues, 'utf8').split(/\s+/)).filter(Boolean);
const WEEKS = options.weeks.split(',').map(Number);
const TEAMS_PER_WEEK = Number(options.teams);
const CANDIDATES = Number(options.candidates);
const LIMIT = Number(options.limit);
const ACCEPT = Number(options.accept);
const HELD_OUT = Number(options['heldout-share']);

const world = await loadWorld();
const sum = (values) => values.reduce((total, value) => total + value, 0);
const round = (value, places = 1) => Math.round(value * 10 ** places) / 10 ** places;

const kept = [];
const dropped = {};
let considered = 0;

for (const leagueId of leagueIds) {
  if (kept.length >= LIMIT) break;
  const season = await loadSeason(leagueId);
  if (!season) { dropped['league-unavailable'] = (dropped['league-unavailable'] || 0) + 1; continue; }
  const league = season.league;
  const kind = kindOf(league);
  const playoffStart = (league.settings && league.settings.playoff_week_start) || 15;
  const complete = playedThrough(season) >= playoffStart;
  const split = hashNumber(`split:${league.league_id}`) / 0xffffffff < HELD_OUT ? 'heldout' : 'tuning';
  const active = season.rosters.filter((roster) => roster.owner_id);
  const unplayed = (rosterId) => {
    let zeroWeeks = 0;
    for (let week = 1; week < playoffStart; week++) {
      const row = (season.matchups[week] || []).find((entry) => entry.roster_id === rosterId);
      if (!row || !(row.points > 0)) zeroWeeks++;
    }
    return zeroWeeks >= 3;
  };

  if (active.length < season.rosters.length - 1 || season.rosters.filter((roster) => unplayed(roster.roster_id)).length > 1) { dropped['league-has-abandoned-teams'] = (dropped['league-has-abandoned-teams'] || 0) + 1; continue; }

  for (const week of WEEKS) {
    if (kept.length >= LIMIT) break;
    if (week > playoffStart - 1) continue;
    const random = seededRandom(hashNumber(`${league.league_id}:${week}`));
    const order = active.slice().sort(() => random() - 0.5).slice(0, TEAMS_PER_WEEK);
    const rosterPlayers = rostersAt(season, week);
    const preparation = await prepare(world, season, week, rosterPlayers);
    if (!preparation) { dropped['no-projections'] = (dropped['no-projections'] || 0) + 1; continue; }
    const standings = standingsBefore(season, week);
    const windows = windowsFromStandings(standings, week);
    const context = buildContext(world, preparation);

    const truthWeeks = [];
    for (let current = week; current <= LAST_WEEK; current++) {
      if (!(season.matchups[current] || []).length) continue;
      const points = actualPoints(season, current);
      truthWeeks.push({ week: current, weight: current >= playoffStart ? 1 : 1, playoff: current >= playoffStart, points });
    }

    for (const rosterId of order.map((roster) => roster.roster_id)) {
      considered++;
      const mine = teamOf(world, season, rosterId, rosterPlayers, windows.get(rosterId));
      const baseline = nightOwl.finder.dropLosses(mine, context);
      const pool = [];
      for (const partnerRoster of active) {
        if (partnerRoster.roster_id === rosterId || unplayed(partnerRoster.roster_id)) continue;
        const partner = teamOf(world, season, partnerRoster.roster_id, rosterPlayers, windows.get(partnerRoster.roster_id));
        for (const deal of nightOwl.finder.proposeFor(context, mine, partner, baseline)) pool.push(deal);
      }
      pool.sort((a, b) => b.score - a.score);
      const top = pool.slice(0, CANDIDATES);

      const lopsided = top.filter((deal) => Math.abs(deal.rawNetThem) > 0.3).length / Math.max(1, top.length);
      const meta = {
        seasonComplete: complete, actingTeamAbandoned: unplayed(rosterId), weeksLeft: truthWeeks.length,
        candidateCount: top.length, teams: season.rosters.length, marketValuesFromToday: kind !== 'redraft', lopsidedShare: lopsided
      };
      const quality = scoreCase(meta, { acceptThreshold: ACCEPT });
      if (!quality.accepted) {
        for (const reason of quality.reasons) dropped[reason] = (dropped[reason] || 0) + 1;
        continue;
      }

      const need = baseline.out;
      const playerView = (playerId) => {
        const info = world.info[playerId] || {};
        const projected = sum(preparation.weeks.map((entry) => entry.projOf(playerId)));
        return { id: playerId, name: info.name || playerId, pos: (world.positionsOf(playerId)[0]) || info.pos, age: info.age, team: info.team, market: Math.round(context.rawOf(playerId)), projected: round(projected), lineupValue: round(need.get(playerId) || 0) };
      };
      const teamView = (rosterIdValue) => {
        const standing = standings.get(rosterIdValue);
        const ids = [...rosterPlayers.get(rosterIdValue)].filter((playerId) => world.positionsOf(playerId).length);
        const players = ids.map(playerView).sort((a, b) => b.projected - a.projected);
        return { rosterId: rosterIdValue, record: `${standing.wins}-${standing.losses}`, rank: standing.rank, pointsFor: round(standing.pointsFor), window: round(windows.get(rosterIdValue), 2), players };
      };
      const partnerIds = [...new Set(top.map((deal) => deal.partnerId))];
      const partnerBaselines = new Map(partnerIds.map((partnerId) => [partnerId, nightOwl.finder.dropLosses(teamOf(world, season, partnerId, rosterPlayers, windows.get(partnerId)), context)]));
      const partnerView = (partnerId) => {
        const view = teamView(partnerId);
        const baselineOut = partnerBaselines.get(partnerId).out;
        for (const player of view.players) player.lineupValue = round(baselineOut.get(player.id) || 0);
        return view;
      };

      const caseId = `${league.league_id}-w${week}-r${rosterId}`;
      const view = {
        id: caseId,
        league: { kind, teams: season.rosters.length, week, weeksLeft: preparation.weeks.length, playoffStart, playoffTeams: (league.settings && league.settings.playoff_teams) || null, slots: preparation.slots, superflex: preparation.fakeLeague.superflex, tightEndPremium: Boolean(preparation.fakeLeague.tep), scoring: { reception: (league.scoring_settings || {}).rec || 0, passTouchdown: (league.scoring_settings || {}).pass_td || 4 } },
        me: teamView(rosterId),
        partners: partnerIds.map(partnerView),
        candidates: top.map((deal, index) => ({ key: `c${index + 1}`, partnerId: deal.partnerId, give: deal.give, get: deal.get, static: { myPoints: round(deal.me.dPts), theirPoints: round(deal.them.dPts), fairnessToThem: round(deal.rawNetThem, 2), likelihood: round(deal.likelihood, 2) } }))
      };
      const truth = { id: caseId, rosterId, kind, slots: preparation.slots, playoffStart, weeks: truthWeeks };
      writeJson(join(EVAL_DIR, 'cases', `${caseId}.json`), { id: caseId, split, meta, quality, rosterId, leagueId: league.league_id, season: league.season, week, kind, view });
      writeJson(join(EVAL_DIR, 'truth', `${caseId}.json`), truth);
      kept.push({ id: caseId, split, kind, quality: quality.score });
      if (kept.length >= LIMIT) break;
    }
  }
}

const byKind = (kind) => kept.filter((entry) => (kind === 'redraft' ? entry.kind === 'redraft' : entry.kind !== 'redraft'));
console.log(`considered ${considered} cases, kept ${kept.length} at quality >= ${ACCEPT}`);
console.log(`  redraft ${byKind('redraft').length} · dynasty/keeper ${byKind('dynasty').length}`);
console.log(`  tuning ${kept.filter((entry) => entry.split === 'tuning').length} · held-out ${kept.filter((entry) => entry.split === 'heldout').length}`);
console.log(`  dropped: ${JSON.stringify(dropped)}`);
writeJson(join(EVAL_DIR, 'cases-index.json'), kept);
