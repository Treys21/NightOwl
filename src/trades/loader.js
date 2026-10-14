// Fetches and caches a league's trade history: the trades of this season and
// the one before (following previous_league_id), who owned each roster then,
// and the weekly points the players scored since. Finished weeks and seasons
// never change, so each is fetched once.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, storage, tradeHistory } = NightOwl;

  const SEASONS = 2; // this one and the last
  const LAST_WEEK = 18;
  const CHUNK = 6; // requests in flight

  async function inChunks(items, fn) {
    const out = [];
    for (let i = 0; i < items.length; i += CHUNK) out.push(...await Promise.all(items.slice(i, i + CHUNK).map(fn)));
    return out;
  }

  /** [{ leagueId, season }] for this league and the seasons before it. */
  async function chain(leagueId, season) {
    const out = [{ leagueId, season: String(season) }];
    let id = leagueId;
    while (out.length < SEASONS) {
      const lg = await api.league(id);
      if (!lg || !lg.previous_league_id || lg.previous_league_id === '0') break;
      const prev = await api.league(lg.previous_league_id);
      if (!prev) break;
      out.push({ leagueId: prev.league_id, season: String(prev.season) });
      id = prev.league_id;
    }
    return out;
  }

  /**
   * A league-season's completed transactions, split into trades and the
   * waiver and free-agent moves (just who was added and dropped), finished
   * weeks cached for good. -> { trades: [raw trade rows], moves: [{ type, leg, adds, drops, roster_ids, created }] }
   */
  async function rows(leagueId, lastWeek) {
    const key = `trades.rows.v2.${leagueId}`;
    const cached = await storage.get(key, { weeks: {} });
    const weeks = [];
    for (let w = 1; w <= lastWeek; w++) if (!cached.weeks[w] || w >= lastWeek) weeks.push(w); // the live week is always refetched
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

  /** Weekly matchups (starters and points per roster) for weeks after `from`, cached once played. */
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

  /**
   * A league's trades, graded.
   *   lg     { leagueId, raw: { season } }
   *   nfl    state/nfl (the current week)
   *   ctx    { assetValue, sideValue }: how the market prices an asset now (see history.grade)
   * -> { graded: [{ trade, grades, real, owners }], profiles (by user id), band }
   */
  async function load(lg, nfl, ctx) {
    const seasons = await chain(lg.leagueId, lg.raw.season);
    const all = [];
    for (const s of seasons) {
      const current = s.season === String(nfl.season);
      const lastWeek = current ? Math.max(1, nfl.week) : LAST_WEEK;
      const [{ trades: tradeTx }, rosters] = await Promise.all([rows(s.leagueId, lastWeek), api.rosters(s.leagueId).catch(() => [])]);
      const owners = Object.fromEntries((rosters || []).map((ro) => [ro.roster_id, ro.owner_id]));
      const trades = tradeHistory.parse(tradeTx, s.season);
      // Only this season's trades have a stretch of play after them worth reading; older ones are graded on the market alone.
      const earliest = trades.length ? Math.min(...trades.map((t) => t.week)) : null;
      const weekly = current && earliest != null ? await weeklyPoints(s.leagueId, earliest, Math.max(0, nfl.week - 1)) : [];
      for (const trade of trades) {
        const real = current ? tradeHistory.realized(trade, weekly) : null;
        all.push({ trade, grades: tradeHistory.grade(trade, ctx, real), real, owners });
      }
    }
    all.sort((a, b) => b.trade.at - a.trade.at);
    // A manager is one person across seasons: group by who owned the roster then.
    const ownersOf = new Map(all.map((g) => [g.trade, g.owners]));
    const profiles = tradeHistory.profiles(all, (trade, rid) => (ownersOf.get(trade) || {})[rid] || `${trade.season}:${rid}`);
    return { graded: all, profiles, band: tradeHistory.league(all, seasons.length), seasons: seasons.map((s) => s.season) };
  }

  NightOwl.tradeLoader = { load, chain, rows, weeklyPoints };
})(globalThis.NightOwl);
