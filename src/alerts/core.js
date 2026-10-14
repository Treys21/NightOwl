globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const WONT_PLAY = new Set(['Out', 'Injured Reserve', 'Suspension', 'Doubtful', 'Physically Unable to Perform']);

  function parseInjuries(feed) {
    const out = new Map();
    for (const team of (feed && feed.injuries) || []) {
      for (const item of team.injuries || []) {
        const athlete = item.athlete || {};
        const link = (athlete.links || []).map((l) => l.href || '').find((h) => /\/id\/\d+/.test(h)) || '';
        const id = athlete.id || (link.match(/\/id\/(\d+)/) || [])[1];
        if (id) out.set(String(id), { status: item.status || '', note: item.shortComment || '' });
      }
    }
    return out;
  }

  function findAlerts({ leagues, statusOf, teamOf, kickoffOf, week, now, sent = new Set() }) {
    const byPlayer = new Map();
    for (const league of leagues) {
      for (const playerId of league.starters || []) {
        if (!playerId || playerId === '0') continue;
        const team = teamOf(playerId);
        const kickoff = team ? kickoffOf(team) : undefined;
        if (kickoff === undefined) continue;
        const status = kickoff === null ? 'Bye' : (statusOf(playerId) || {}).status;
        if (status !== 'Bye' && !WONT_PLAY.has(status)) continue;
        if (kickoff !== null && kickoff <= now) continue;
        const key = `${week}:${playerId}:${status}`;
        if (sent.has(key)) continue;
        if (!byPlayer.has(playerId)) {
          byPlayer.set(playerId, { key, pid: playerId, status, note: status === 'Bye' ? '' : (statusOf(playerId) || {}).note || '', kickoff, leagues: [] });
        }
        byPlayer.get(playerId).leagues.push({ leagueId: league.leagueId, name: league.name });
      }
    }
    return [...byPlayer.values()];
  }

  function message(alert, name) {
    const where = alert.leagues.map((l) => l.name).join(', ');
    const what = alert.status === 'Bye' ? 'is on bye' : alert.status === 'Injured Reserve' ? 'is on injured reserve' : `is ${alert.status.toLowerCase()}`;
    return {
      title: `${name} ${what}`,
      body: `Still in your lineup in ${where}.${alert.note ? ` ${alert.note}` : ''}`
    };
  }

  NightOwl.alerts = { parseInjuries, findAlerts, message, WONT_PLAY };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.alerts;
