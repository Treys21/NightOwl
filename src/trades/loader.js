globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, storage, tradeHistory, tradeDrafts } = NightOwl;

  const RECENT = 2;
  const MAX_SEASONS = 12;
  const LAST_WEEK = 18;
  const CHUNK = 6;

  async function inChunks(items, fn) {
    const out = [];
    for (let i = 0; i < items.length; i += CHUNK) out.push(...await Promise.all(items.slice(i, i + CHUNK).map(fn)));
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
    for (let w = 1; w <= lastWeek; w++) if (!cached.weeks[w] || w >= lastWeek) weeks.push(w);
    const fetched = await inChunks(weeks, (w) => api.transactions(leagueId, w).then((all) => {
      const done = (all || []).filter((t) => t.status === 'complete');
      return [w, {
        t: done.filter((t) => t.type === 'trade'),
        m: done.filter((t) => t.type !== 'trade').map((t) => ({ type: t.type, leg: t.leg, adds: t.adds, drops: t.drops, roster_ids: t.roster_ids, created: t.created }))
      }];
    }).catch(() => [w, null]));
    let changed = false;
    for (const [w, entry] of fetched) if (entry) { cached.weeks[w] = entry; changed = true; }
    if (changed) await storage.set({ [key]: cached });
    const all = Object.values(cached.weeks);
    return { trades: all.flatMap((e) => e.t), moves: all.flatMap((e) => e.m) };
  }

  async function draftsOf(leagueId) {
    const key = `trades.drafts.v1.${leagueId}`;
    const cached = await storage.get(key, null);
    if (cached) return cached;
    const listed = (await api.leagueDrafts(leagueId).catch(() => null)) || [];
    const done = listed.filter((d) => d.status === 'complete');
    const out = [];
    for (const d of done) {
      const [info, picks] = await Promise.all([api.draft(d.draft_id).catch(() => d), api.draftPicks(d.draft_id).catch(() => null)]);
      if (!picks || !picks.length) continue;
      out.push({
        id: d.draft_id, season: String(d.season), type: d.type,
        rounds: (d.settings && d.settings.rounds) || Math.max(...picks.map((p) => p.round)),
        teams: (d.settings && d.settings.teams) || 0,
        slotToRoster: (info && info.slot_to_roster_id) || null,
        picks: picks.filter((p) => p.player_id).map((p) => ({ no: p.pick_no, round: p.round, slot: p.draft_slot, by: p.roster_id, pid: p.player_id }))
      });
    }
    if (out.length) await storage.set({ [key]: out });
    return out;
  }

  async function weeklyPoints(leagueId, from, lastPlayed) {
    const key = `trades.points.${leagueId}`;
    const cached = await storage.get(key, {});
    const need = [];
    for (let w = from + 1; w <= lastPlayed; w++) if (!cached[w] || w === lastPlayed) need.push(w);
    const fetched = await inChunks(need, (w) => api.matchups(leagueId, w).then((rows) => [w, rows]).catch(() => [w, null]));
    let changed = false;
    for (const [w, rows] of fetched) {
      if (!rows) continue;
      const rosters = {};
      for (const m of rows) rosters[m.roster_id] = { starters: (m.starters || []).filter((p) => p && p !== '0'), points: m.players_points || {} };
      cached[w] = rosters;
      changed = true;
    }
    if (changed) await storage.set({ [key]: cached });
    const out = [];
    for (let w = from + 1; w <= lastPlayed; w++) if (cached[w]) out.push({ week: w, rosters: cached[w] });
    return out;
  }

  async function load(league, nfl, context) {
    const seasons = await chain(league.leagueId, league.raw.season);
    const all = [];
    const drafts = [];
    for (const s of seasons) {
      const current = s.season === String(nfl.season);
      const lastWeek = current ? Math.max(1, nfl.week) : LAST_WEEK;
      const [{ trades: tradeTx }, rosters] = await Promise.all([rows(s.leagueId, lastWeek), api.rosters(s.leagueId).catch(() => [])]);
      const owners = Object.fromEntries((rosters || []).map((roster) => [roster.roster_id, roster.owner_id]));
      const trades = tradeHistory.parse(tradeTx, s.season);
      drafts.push(...await draftsOf(s.leagueId).catch(() => []));
      const earliest = trades.length ? Math.min(...trades.map((t) => t.week)) : null;
      const weekly = earliest != null ? await weeklyPoints(s.leagueId, earliest, current ? Math.max(0, nfl.week - 1) : LAST_WEEK) : [];
      for (const trade of trades) {
        const real = tradeHistory.realized(trade, weekly);
        all.push({ trade, grades: null, real, owners });
      }
    }
    tradeDrafts.settle(all.map((g) => g.trade), tradeDrafts.index(drafts));
    for (const g of all) g.grades = tradeHistory.grade(g.trade, context, g.real);
    all.sort((a, b) => b.trade.at - a.trade.at);
    const recentSeasons = new Set(seasons.slice(0, RECENT).map((x) => x.season));
    const recent = all.filter((g) => recentSeasons.has(String(g.trade.season)));
    const ownersOf = new Map(all.map((g) => [g.trade, g.owners]));
    const profiles = tradeHistory.profiles(all, (trade, rosterId) => (ownersOf.get(trade) || {})[rosterId] || `${trade.season}:${rosterId}`);
    return { graded: all, drafts, profiles, band: tradeHistory.league(recent, Math.min(seasons.length, RECENT)), seasons: seasons.map((s) => s.season) };
  }

  NightOwl.tradeLoader = { load, chain, rows, weeklyPoints, draftsOf };
})(globalThis.NightOwl);
