// Fetches and caches a league's trade history: the trades of every season the
// league has run (following previous_league_id back to its first), who owned each roster then,
// and the weekly points the players scored since. Finished weeks and seasons
// never change, so each is fetched once.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, storage, tradeHistory, tradeDrafts } = NightOwl;

  const RECENT = 2; // seasons that set the league's price tolerance
  const MAX_SEASONS = 12; // a safety stop; leagues rarely run this long
  const LAST_WEEK = 18;
  const CHUNK = 6; // requests in flight

  async function inChunks(items, fn) {
    const out = [];
    for (let i = 0; i < items.length; i += CHUNK) out.push(...await Promise.all(items.slice(i, i + CHUNK).map(fn)));
    return out;
  }

  /** [{ leagueId, season }] for this league and every season before it, newest first. */
  async function chain(leagueId, season) {
    const out = [{ leagueId, season: String(season) }];
    let lg = await api.league(leagueId);
    while (out.length < MAX_SEASONS && lg && lg.previous_league_id && lg.previous_league_id !== '0') {
      lg = await api.league(lg.previous_league_id);
      if (!lg) break;
      out.push({ leagueId: lg.league_id, season: String(lg.season) });
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

  /**
   * A league-season's completed drafts, picks trimmed to what grading needs, cached for good
   * (a finished draft never changes). -> [{ id, season, type, rounds, teams, slotToRoster, picks: [{ no, round, slot, by, pid }] }]
   */
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
    // Nothing to remember while a draft is still to come: only cache a league-season once it has a finished draft or has ended.
    if (out.length) await storage.set({ [key]: out });
    return out;
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
    const drafts = [];
    for (const s of seasons) {
      const current = s.season === String(nfl.season);
      const lastWeek = current ? Math.max(1, nfl.week) : LAST_WEEK;
      const [{ trades: tradeTx }, rosters] = await Promise.all([rows(s.leagueId, lastWeek), api.rosters(s.leagueId).catch(() => [])]);
      const owners = Object.fromEntries((rosters || []).map((ro) => [ro.roster_id, ro.owner_id]));
      const trades = tradeHistory.parse(tradeTx, s.season);
      drafts.push(...await draftsOf(s.leagueId).catch(() => []));
      // What the players started after each deal: through last week for this season, the whole season for finished ones (cached for good).
      const earliest = trades.length ? Math.min(...trades.map((t) => t.week)) : null;
      const weekly = earliest != null ? await weeklyPoints(s.leagueId, earliest, current ? Math.max(0, nfl.week - 1) : LAST_WEEK) : [];
      for (const trade of trades) {
        const real = tradeHistory.realized(trade, weekly);
        all.push({ trade, grades: null, real, owners });
      }
    }
    // A pick traded away and since spent is worth the player it became, not nothing: name him on the pick.
    const spent = tradeDrafts.index(drafts);
    for (const { trade } of all) {
      for (const side of Object.values(trade.sides)) {
        for (const pick of side.gotPicks.concat(side.gavePicks)) {
          const hit = tradeDrafts.resolve(spent, pick);
          if (hit) pick.player = hit.pid;
        }
      }
    }
    for (const g of all) g.grades = tradeHistory.grade(g.trade, ctx, g.real);
    all.sort((a, b) => b.trade.at - a.trade.at);
    // How far off an even price this league's deals sit is read from recent seasons: older trades are graded on today's
    // values, which carry years of hindsight (a rookie who busted, a pick that hit) and would make every league look reckless.
    const recentSeasons = new Set(seasons.slice(0, RECENT).map((x) => x.season));
    const recent = all.filter((g) => recentSeasons.has(String(g.trade.season)));
    // A manager is one person across seasons: group by who owned the roster then.
    const ownersOf = new Map(all.map((g) => [g.trade, g.owners]));
    const profiles = tradeHistory.profiles(all, (trade, rid) => (ownersOf.get(trade) || {})[rid] || `${trade.season}:${rid}`);
    return { graded: all, drafts, profiles, band: tradeHistory.league(recent, Math.min(seasons.length, RECENT)), seasons: seasons.map((s) => s.season) };
  }

  NightOwl.tradeLoader = { load, chain, rows, weeklyPoints, draftsOf };
})(globalThis.NightOwl);
