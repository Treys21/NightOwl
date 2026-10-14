globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, storage, tradeHistory, tradeDrafts } = NightOwl;

  const RECENT = 2;
  const MAX_SEASONS = 12;
  const LAST_WEEK = 18;
  const CHUNK = 6;

  async function inChunks(items, work) {
    const out = [];
    for (let i = 0; i < items.length; i += CHUNK) out.push(...await Promise.all(items.slice(i, i + CHUNK).map(work)));
    return out;
  }

  async function chain(leagueId, season) {
    const out = [{ leagueId, season: String(season) }];
    let league = await api.league(leagueId);
    while (out.length < MAX_SEASONS && league && league.previous_league_id && league.previous_league_id !== '0') {
      league = await api.league(league.previous_league_id);
      if (!league) break;
      out.push({ leagueId: league.league_id, season: String(league.season) });
    }
    return out;
  }

  async function rows(leagueId, lastWeek) {
    const key = `trades.rows.v2.${leagueId}`;
    const cached = await storage.get(key, { weeks: {} });
    const weeks = [];
    for (let week = 1; week <= lastWeek; week++) if (!cached.weeks[week] || week >= lastWeek) weeks.push(week);
    const fetched = await inChunks(weeks, (week) => api.transactions(leagueId, week).then((all) => {
      const done = (all || []).filter((transaction) => transaction.status === 'complete');
      return [week, {
        t: done.filter((transaction) => transaction.type === 'trade'),
        m: done.filter((transaction) => transaction.type !== 'trade').map((transaction) => ({ type: transaction.type, leg: transaction.leg, adds: transaction.adds, drops: transaction.drops, roster_ids: transaction.roster_ids, created: transaction.created }))
      }];
    }).catch(() => [week, null]));
    let changed = false;
    for (const [week, entry] of fetched) if (entry) { cached.weeks[week] = entry; changed = true; }
    if (changed) await storage.set({ [key]: cached });
    const all = Object.values(cached.weeks);
    return { trades: all.flatMap((event) => event.t), moves: all.flatMap((event) => event.m) };
  }

  async function draftsOf(leagueId) {
    const key = `trades.drafts.v1.${leagueId}`;
    const cached = await storage.get(key, null);
    if (cached) return cached;
    const listed = (await api.leagueDrafts(leagueId).catch(() => null)) || [];
    const done = listed.filter((draft) => draft.status === 'complete');
    const out = [];
    for (const draft of done) {
      const [info, picks] = await Promise.all([api.draft(draft.draft_id).catch(() => draft), api.draftPicks(draft.draft_id).catch(() => null)]);
      if (!picks || !picks.length) continue;
      out.push({
        id: draft.draft_id, season: String(draft.season), type: draft.type,
        rounds: (draft.settings && draft.settings.rounds) || Math.max(...picks.map((pick) => pick.round)),
        teams: (draft.settings && draft.settings.teams) || 0,
        slotToRoster: (info && info.slot_to_roster_id) || null,
        picks: picks.filter((pick) => pick.player_id).map((pick) => ({ no: pick.pick_no, round: pick.round, slot: pick.draft_slot, by: pick.roster_id, pid: pick.player_id }))
      });
    }
    if (out.length) await storage.set({ [key]: out });
    return out;
  }

  async function weeklyPoints(leagueId, from, lastPlayed) {
    const key = `trades.points.${leagueId}`;
    const cached = await storage.get(key, {});
    const need = [];
    for (let week = from + 1; week <= lastPlayed; week++) if (!cached[week] || week === lastPlayed) need.push(week);
    const fetched = await inChunks(need, (week) => api.matchups(leagueId, week).then((rows) => [week, rows]).catch(() => [week, null]));
    let changed = false;
    for (const [week, rows] of fetched) {
      if (!rows) continue;
      const rosters = {};
      for (const row of rows) rosters[row.roster_id] = { starters: (row.starters || []).filter((playerId) => playerId && playerId !== '0'), points: row.players_points || {} };
      cached[week] = rosters;
      changed = true;
    }
    if (changed) await storage.set({ [key]: cached });
    const out = [];
    for (let week = from + 1; week <= lastPlayed; week++) if (cached[week]) out.push({ week: week, rosters: cached[week] });
    return out;
  }

  async function load(league, nfl, context) {
    const seasons = await chain(league.leagueId, league.raw.season);
    const all = [];
    const drafts = [];
    for (const season of seasons) {
      const current = season.season === String(nfl.season);
      const lastWeek = current ? Math.max(1, nfl.week) : LAST_WEEK;
      const [{ trades: tradeTx }, rosters] = await Promise.all([rows(season.leagueId, lastWeek), api.rosters(season.leagueId).catch(() => [])]);
      const owners = Object.fromEntries((rosters || []).map((roster) => [roster.roster_id, roster.owner_id]));
      const trades = tradeHistory.parse(tradeTx, season.season);
      drafts.push(...await draftsOf(season.leagueId).catch(() => []));
      const earliest = trades.length ? Math.min(...trades.map((trade) => trade.week)) : null;
      const weekly = earliest != null ? await weeklyPoints(season.leagueId, earliest, current ? Math.max(0, nfl.week - 1) : LAST_WEEK) : [];
      for (const trade of trades) {
        const real = tradeHistory.realized(trade, weekly);
        all.push({ trade, grades: null, real, owners });
      }
    }
    tradeDrafts.settle(all.map((gradedTrade) => gradedTrade.trade), tradeDrafts.index(drafts));
    for (const gradedTrade of all) gradedTrade.grades = tradeHistory.grade(gradedTrade.trade, context, gradedTrade.real);
    all.sort((a, b) => b.trade.at - a.trade.at);
    const recentSeasons = new Set(seasons.slice(0, RECENT).map((season) => season.season));
    const recent = all.filter((gradedTrade) => recentSeasons.has(String(gradedTrade.trade.season)));
    const ownersOf = new Map(all.map((gradedTrade) => [gradedTrade.trade, gradedTrade.owners]));
    const profiles = tradeHistory.profiles(all, (trade, rosterId) => (ownersOf.get(trade) || {})[rosterId] || `${trade.season}:${rosterId}`);
    return { graded: all, drafts, profiles, band: tradeHistory.league(recent, Math.min(seasons.length, RECENT)), seasons: seasons.map((season) => season.season) };
  }

  NightOwl.tradeLoader = { load, chain, rows, weeklyPoints, draftsOf };
})(globalThis.NightOwl);
