// Moves tool for the floating panel: roster moves priced in lineup points.
//
//   Waivers  the free agents who would raise each of your lineups for the rest
//            of the season, with the player to cut, and who helps most next week.
//   Trade    pick what you give and get with any team in a league: what each
//            lineup gains or loses, and how both teams' playoff and title odds
//            move when the season is played out again with the trade done.
//
// Information only: Sleeper has no API to make a claim or offer a trade.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, teams, players, storage, account, dom, projection, value, model, ktc, replacement } = NightOwl;
  const { isPlaying, mine: rosterOf, teamNames, teamUrl } = NightOwl.leagues;
  const { escape: esc, percent } = NightOwl.format;

  const REFRESH_MS = 15 * 60000;
  const SHOWN = 6; // adds listed per league
  const STREAMERS = 3; // next-week adds listed per league
  const KIND = { 0: 'redraft', 1: 'keeper', 2: 'dynasty' }; // settings.type

  let root = null;
  const $ = (id) => root.querySelector(`#${id}`);

  const state = {
    mode: 'waivers', // or 'trade', 'finder', 'history' or 'drafts'
    draftMethod: 'linear', // how the league sorts its draft order (see season.draftOrder); the Season tab's setting
    nfl: null,
    stats: {},
    remainingOf: null,
    ktc: null, // KeepTradeCut dynasty values { players, picks }, once loaded (dynasty and keeper leagues)
    ktcRedraft: null, // KeepTradeCut fantasy (redraft) values { players }, for redraft leagues
    ktcError: null,
    leagues: [], // see load()
    targets: new Map(), // league id -> waiver targets
    open: new Set(), // league ids expanded
    history: { all: false }, // the trade history pane: whether the whole list is open
    drafts: { draftId: null }, // the drafts pane: which draft is showing
    finder: { leagueId: null, goal: 'balanced', shop: null, target: null, results: null, running: false, progress: '', error: null, token: 0 },
    trade: { leagueId: null, partner: null, give: new Set(), get: new Set(), result: null, token: 0 },
    base: new Map(), // league id -> projection with today's rosters
    loadedAt: 0,
    generation: 0, // bumped by each load, so work begun on older data can tell
    timer: null,
    busy: false,
    thinking: false,
    error: null
  };

  const { isPick, pickOf, standingsRanks, PICK_ROUNDS } = NightOwl.moveValues;
  const V = NightOwl.moveValues.create(state);
  const { pickSlot, pickTierOf, ownedPicks, ordinalRound, rosPoints, usesKtc, dynastyValue, worth } = V;

  const MARKUP = `
    <header class="bar">
      <div class="title"><strong>Moves</strong></div>
      <div class="actions">
        <div class="tabs mv-mode" role="group" aria-label="Moves">
          <button type="button" class="tab" data-mode="waivers" title="Free agents who would improve your lineups">Waivers</button>
          <button type="button" class="tab" data-mode="trade" title="What a trade does to both teams">Trade</button>
          <button type="button" class="tab" data-mode="finder" title="Trades the other manager would accept and you would want">Finder</button>
          <button type="button" class="tab" data-mode="history" title="Every trade in the league, graded">History</button>
          <button type="button" class="tab" data-mode="drafts" title="Each draft as a board, every pick graded against the picks around it">Drafts</button>
        </div>
        <button id="mv-refresh" class="icon" title="Refresh now" aria-label="Refresh now">↻</button>
      </div>
    </header>
    <div class="tool-scroll">
      <p id="mv-error" class="error" hidden></p>
      <div id="mv-body"><div class="skel" role="status" aria-label="Loading your leagues"><i></i><i></i><i></i></div></div>
    </div>
  `;

  const tick = () => new Promise((resolve) => setTimeout(resolve));
  const positionsOf = (pid) => players.info(pid).positions;
  const WAIVER_MIN_GAIN = 1.5; // rest-of-season points a free agent must add (typical league)
  const REFERENCE_PPG = 12; // points per starter per week in a typical league
  const REFERENCE_WEEKS = 11; // weeks left the finder's point thresholds were set for
  const DROP_PROTECTED = 2000; // KeepTradeCut value above which a dynasty player isn't offered as the drop
  const signed = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(1)}`;
  const oddsLabel = (p) => (p >= 0.995 ? '>99%' : p > 0 && p < 0.005 ? '<1%' : percent(p));

  // ---- data -------------------------------------------------------------

  async function load() {
    const { userId } = await account.resolve();
    const excluded = await account.excluded();
    state.draftMethod = (await storage.get('season.settings', {})).draftMethod || 'linear';
    await players.load();
    const nfl = await api.state();
    state.nfl = nfl;

    const playing = (await api.leagues(userId, nfl.season)).filter((lg) => isPlaying(lg) && !excluded.has(lg.league_id));
    const leagues = (await Promise.all(playing.map(async (lg) => {
      const keeps = lg.settings && (lg.settings.type === 1 || lg.settings.type === 2);
      const [rosters, users, traded] = await Promise.all([
        api.rosters(lg.league_id),
        api.users(lg.league_id),
        keeps ? api.tradedPicks(lg.league_id).catch(() => []) : Promise.resolve([])
      ]);
      const mine = rosterOf(rosters, userId);
      if (!mine) return null;
      const t = model.timeline(lg, rosters, nfl);
      if (t.next >= t.playoffStart) return null; // regular season over: nothing to add for
      const thisWeek = t.inProgress ? await api.matchups(lg.league_id, t.next) : [];
      return {
        leagueId: lg.league_id,
        name: lg.name.trim(),
        playoffTeams: t.playoffTeams,
        medianGame: t.medianGame,
        draft: KIND[(lg.settings && lg.settings.type) || 0] === 'redraft' ? null : {}, // keeper and dynasty leagues project their draft order
        draftRounds: (lg.settings && lg.settings.draft_rounds) || PICK_ROUNDS,
        // Roster spots: the lineup and bench, plus the separate IR and taxi slots.
        capacity: (lg.roster_positions || []).length + ((lg.settings && lg.settings.reserve_slots) || 0) + ((lg.settings && lg.settings.taxi_slots) || 0),
        traded,
        tradeDeadline: (lg.settings && lg.settings.trade_deadline) || 0,
        kind: KIND[(lg.settings && lg.settings.type) || 0] || 'redraft',
        mine,
        names: teamNames(users),
        raw: {
          season: lg.season,
          rosters,
          next: t.next,
          inProgress: t.inProgress,
          thisWeek: thisWeek || [],
          playoffStart: t.playoffStart,
          roundType: (lg.settings && lg.settings.playoff_round_type) || 0,
          slots: lg.roster_positions || [],
          scoring: lg.scoring_settings || {}
        }
      };
    }))).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));

    const [stats, remainingOf, nflSchedule] = await Promise.all([
      leagues.length ? model.projections(nfl.season, model.weeksNeeded(leagues), model.positionsFor(leagues.map((lg) => lg.raw.slots))) : {},
      leagues.some((lg) => lg.raw.inProgress) ? model.remainingByTeam(nfl.season, nfl.week) : Promise.resolve(() => 1),
      model.nflSchedule(nfl.season)
    ]);
    state.stats = stats;
    state.remainingOf = remainingOf;
    state.ktcError = null;
    if (leagues.some((lg) => lg.kind !== 'redraft')) {
      // Dynasty values update daily; a failure only costs the dynasty view.
      try { state.ktc = await ktc.load('dynasty', players.list(), api.ktcRows); } catch (err) {
        console.warn('[Night Owl moves] KeepTradeCut unavailable', err);
        state.ktc = null;
        state.ktcError = err.message || String(err);
      }
    }

    if (leagues.some((lg) => lg.kind === 'redraft')) {
      // Redraft consensus is only for judging fairness; without it, deals are judged on projections alone.
      try { state.ktcRedraft = await ktc.load('redraft', players.list(), api.ktcRows); } catch (err) {
        console.warn('[Night Owl moves] KeepTradeCut redraft values unavailable', err);
        state.ktcRedraft = null;
      }
    }

    // Everyone with a real projection is a candidate; the ones on a roster here are not free.
    const projected = new Set();
    for (const week of Object.values(stats)) for (const pid of Object.keys(week)) projected.add(pid);
    for (const lg of leagues) {
      lg.weeks = model.valueWeeks(lg, stats, nflSchedule);
      const taken = new Set(lg.raw.rosters.flatMap((ro) => ro.players || []));
      lg.free = [...projected].filter((pid) => !taken.has(pid));
      // Trades are priced over replacement: the free agent a team would start in a slot it can't fill, on a bye or in an injury.
      lg.rep = replacement.wrap({
        slots: lg.raw.slots, weeks: lg.weeks, positionsOf,
        rates: replacement.levels(lg.free, lg.weeks, positionsOf, replacement.startingPositions(lg.raw.slots), [...taken])
      });
      lg.scale = pointScale(lg);
      lg.ranks = standingsRanks(lg.raw.rosters);
      lg.picks = lg.kind === 'redraft' ? new Map() : ownedPicks(lg);
      lg.superflex = ktc.isSuperflex(lg.raw.slots);
      lg.tep = ktc.tepTier(lg.raw.scoring);
      lg.openSpots = Math.max(0, lg.capacity - (lg.mine.players || []).length);
    }
    state.leagues = leagues;
    state.generation++;
    state.targets.clear();
    state.base.clear();
    state.loadedAt = Date.now();
  }

  // How big a lineup upgrade has to be to matter in this league, against a typical one (1): leagues that
  // score more per starter, or have more weeks to run, need more points before a change is worth making.
  function pointScale(lg) {
    if (!lg.weeks.length) return 1;
    const starters = NightOwl.leagues.startingSlots({ roster_positions: lg.raw.slots }).length || 1;
    const perStarter = lg.raw.rosters.map((ro) => value.lineupPoints(lg.raw.slots, model.activePool(ro), lg.weeks.slice(0, 1), positionsOf).total / starters);
    const ppg = perStarter.reduce((a, b) => a + b, 0) / perStarter.length;
    const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
    return clamp(ppg / REFERENCE_PPG, 0.5, 2) * clamp(lg.weeks.length / REFERENCE_WEEKS, 0.4, 1.3);
  }

  // Draft order for each keeper and dynasty league, from the simulated season.
  // The same run is the baseline the trade odds compare against.
  async function projectPicks() {
    const generation = state.generation;
    for (const lg of state.leagues) {
      if (!lg.draft || lg.slots) continue;
      await tick();
      if (!root || generation !== state.generation) return;
      try {
        const base = await model.projectLeague(lg, { remainingOf: state.remainingOf, stats: state.stats, draftMethod: state.draftMethod });
        if (generation !== state.generation) return;
        state.base.set(lg.leagueId, base);
        lg.slots = new Map(projection.projectedDraft(base, { method: state.draftMethod }).map((t) => [t.rosterId, t.pick]));
        lg.dyn = new Map(); // pick values were priced on standings alone
        lg.blend = new Map();
        render();
      } catch (err) {
        console.warn('[Night Owl moves] draft order projection failed', lg.name, err);
      }
    }
  }

  // Waiver math for every league, one at a time so Sleeper's page never stalls.
  async function analyze() {
    const generation = state.generation;
    for (const lg of state.leagues) {
      if (state.targets.has(lg.leagueId)) continue;
      await tick();
      if (!root || generation !== state.generation) return; // closed, or a newer load took over
      const pool = model.activePool(lg.mine);
      // Keeper and dynasty rosters hold players for years: never suggest cutting one the market values.
      const droppable = V.usesKtc(lg) ? pool.filter((pid) => V.dynastyValue(lg, pid) < DROP_PROTECTED) : pool;
      state.targets.set(lg.leagueId, value.waiverTargets({
        slots: lg.raw.slots, pool, droppable, openSpots: lg.openSpots,
        candidates: lg.free, weeks: lg.rep.weeks, positionsOf, minGain: WAIVER_MIN_GAIN * lg.scale // projections fade with distance, byes are real weeks off
      }));
      render();
    }
  }

  async function refresh() {
    if (state.busy || !root) return;
    state.busy = true;
    $('mv-refresh').classList.add('spin');
    try {
      await load();
      state.error = null;
    } catch (err) {
      console.error('[Night Owl moves]', err);
      state.error = err.message || String(err);
    } finally {
      state.busy = false;
      if (root) {
        $('mv-refresh').classList.remove('spin');
        keepTradeValid();
        render();
        analyze().then(projectPicks).then(() => state.mode === 'trade' && analyzeTrade()).then(loadHistories);
        // Whatever search was under way used the old data: drop it, so the tab can start a fresh one.
        state.finder.token++;
        state.finder.running = false;
        state.finder.results = null;
        if (state.mode === 'finder') finder().run();
        if (state.mode === 'trade') analyzeTrade();
      }
    }
  }

  // ---- waivers ------------------------------------------------------------

  const label = (pid) => {
    const p = players.info(pid);
    const injury = p.injury ? `<i class="mv-inj" title="${esc(p.injury)}">${esc(p.injury)}</i>` : '';
    return `<span class="mv-who"><img src="${teams.photo(pid, p.team)}" alt="" loading="lazy"><span class="mv-nm"><b>${esc(p.name)}</b><small>${esc(p.pos)}${p.team ? ` · ${esc(p.team)}` : ''}${injury}</small></span></span>`;
  };


  function pickLabel(lg, pid, owner) {
    const pick = pickOf(pid);
    const tier = pickTierOf(lg, pick);
    const slot = pick.year === Number(lg.raw.season) + 1 ? pickSlot(lg, pick.from) : null;
    const own = pick.from === owner.roster_id;
    const from = own ? 'own pick' : `from ${esc(lg.names.get((lg.raw.rosters.find((r) => r.roster_id === pick.from) || {}).owner_id) || `Team ${pick.from}`)}`;
    return `<span class="mv-who"><span class="mv-pk">${String(pick.year).slice(2)}</span><span class="mv-nm"><b>${pick.year} ${slot ? `${pick.round}.${String(slot).padStart(2, '0')}` : `${tier[0].toUpperCase()}${tier.slice(1)} ${ordinalRound(pick.round)}`}</b><small>${slot ? `${tier} ${ordinalRound(pick.round)} · ` : ''}${from}</small></span></span>`;
  }

  function addRow(lg, t, { by }) {
    const drop = t.drop ? `<span class="mv-cut" title="The player your lineup misses least">cut ${esc(players.info(t.drop).name)}</span>` : '<span class="mv-cut">open spot</span>';
    return `<tr>
      <td>${label(t.pid)}</td>
      <td class="num" title="Projected next week">${t.next.toFixed(1)}</td>
      <td class="num up" title="Starter points he'd add ${by === 'gain' ? 'over the rest of the season' : 'next week'}">${signed(by === 'gain' ? t.gain : t.nowGain)}</td>
      <td class="mv-drop">${drop}</td>
    </tr>`;
  }

  function waiverBlock(lg) {
    const targets = state.targets.get(lg.leagueId);
    const week = lg.weeks[0] && lg.weeks[0].week;
    let head;
    let body = '';
    if (!targets) {
      head = '<span class="mv-best muted">Checking…</span>';
    } else if (!targets.length) {
      head = '<span class="mv-best muted">No upgrades</span>';
      body = '<p class="muted small mv-note">No free agent would start for you, even after cutting your least useful player.</p>';
    } else {
      const best = targets[0];
      head = `<span class="mv-best up">${signed(best.gain)} pts · ${esc(players.info(best.pid).name)}</span>`;
      const long = targets.filter((t) => t.gain >= 0.05).slice(0, SHOWN);
      const quick = targets.filter((t) => t.nowGain >= 0.05).sort((a, b) => b.nowGain - a.nowGain).slice(0, STREAMERS);
      const th = (by) => `<thead><tr><th></th><th title="Projected points next week">Wk ${week}</th><th title="${by === 'gain' ? 'Starter points added for the rest of the season' : 'Starter points added next week'}">${by === 'gain' ? 'ROS' : 'Gain'}</th><th></th></tr></thead>`;
      body = `<h4 class="mv-h">Best for the rest of the season</h4>
        <table class="mv-table">${th('gain')}<tbody>${long.map((t) => addRow(lg, t, { by: 'gain' })).join('') || '<tr><td colspan="4" class="muted">No long-term upgrades</td></tr>'}</tbody></table>
        ${quick.length ? `<h4 class="mv-h">Best for week ${week}</h4>
        <table class="mv-table">${th('now')}<tbody>${quick.map((t) => addRow(lg, t, { by: 'now' })).join('')}</tbody></table>` : ''}
        <p class="muted small mv-note">Starter points your best lineup gains with him${lg.kind !== 'redraft' ? ' this season (age and picks are not counted)' : ''}, after cutting the player your lineup misses least. Projections are Sleeper's.
        <a href="${teamUrl(lg.leagueId)}" target="_blank" rel="noopener">Open in Sleeper</a></p>`;
    }
    return `<details class="mv-league" data-id="${esc(lg.leagueId)}"${state.open.has(lg.leagueId) ? ' open' : ''}>
      <summary><div class="mv-head"><span class="mv-name">${esc(lg.name)}</span>${head}</div></summary>
      ${body}
    </details>`;
  }

  // ---- trade ------------------------------------------------------------

  const tradeLeague = () => state.leagues.find((lg) => lg.leagueId === state.trade.leagueId) || null;
  const rosterById = (lg, id) => lg.raw.rosters.find((ro) => ro.roster_id === id) || null;
  const nameOf = (lg, ro) => (ro ? lg.names.get(ro.owner_id) || `Team ${ro.roster_id}` : '');

  // Selections survive a refresh only while they still make sense.
  function keepTradeValid() {
    const t = state.trade;
    let lg = tradeLeague();
    if (!lg) { lg = state.leagues[0] || null; t.leagueId = lg && lg.leagueId; t.partner = null; t.give.clear(); t.get.clear(); }
    if (!lg) return;
    const partner = t.partner && rosterById(lg, t.partner);
    if (!partner || partner.roster_id === lg.mine.roster_id) { t.partner = null; t.get.clear(); }
    const holds = (ro, pid) => (isPick(pid) ? (lg.picks.get(ro.roster_id) || []) : ro.players || []).includes(pid);
    for (const pid of [...t.give]) if (!holds(lg.mine, pid)) t.give.delete(pid);
    for (const pid of [...t.get]) if (!partner || !holds(partner, pid)) t.get.delete(pid);
  }


  function pickList(lg, ro, chosen, kind) {
    const away = new Set([...(ro.reserve || []), ...(ro.taxi || [])]);
    const rows = (ro.players || []).slice().sort((a, b) => (usesKtc(lg) ? V.blendedValue(lg, b) - V.blendedValue(lg, a) : 0) || rosPoints(lg, b) - rosPoints(lg, a));
    const picks = (lg.picks.get(ro.roster_id) || []).filter((pid) => dynastyValue(lg, pid) > 0 || chosen.has(pid));
    const pickRows = usesKtc(lg) ? picks.map((pid) => `<label class="mv-pick${chosen.has(pid) ? ' on' : ''}">
        <input type="checkbox" data-${kind}="${esc(pid)}"${chosen.has(pid) ? ' checked' : ''}>
        ${pickLabel(lg, pid, ro)}<span class="mv-ros" title="Draft pick value (KeepTradeCut, for this league's format)">${worth(dynastyValue(lg, pid))}</span>
      </label>`).join('') : '';
    return `<div class="mv-picks">${rows.map((pid) => {
      const tag = (ro.reserve || []).includes(pid) ? 'IR' : (ro.taxi || []).includes(pid) ? 'taxi' : '';
      return `<label class="mv-pick${chosen.has(pid) ? ' on' : ''}">
        <input type="checkbox" data-${kind}="${esc(pid)}"${chosen.has(pid) ? ' checked' : ''}>
        ${label(pid)}${usesKtc(lg)
          ? `<span class="mv-ros" title="Value: KeepTradeCut (${worth(dynastyValue(lg, pid))}, for this league's format and scoring) mixed with projected points over a free agent${tag ? `; on ${esc(tag)}` : ''}">${V.blendedValue(lg, pid) ? worth(V.blendedValue(lg, pid)) : '–'}</span>`
          : `<span class="mv-ros" title="Projected points rest of season">${away.has(pid) ? esc(tag) : Math.round(rosPoints(lg, pid))}</span>`}
      </label>`;
    }).join('')}${pickRows}</div>`;
  }

  const delta = (n) => `<b class="${n > 0 ? 'up' : n < 0 ? 'down' : ''}">${signed(n)}</b>`;

  function sideCard(lg, who, ro, impact, base, after) {
    const odds = (key, text) => (base && after
      ? `<span title="${text}">${text.split(' ')[0]} ${oddsLabel(base.teams[ro.roster_id][key])} → <b>${oddsLabel(after.teams[ro.roster_id][key])}</b></span>` : '');
    const hasPlayoffs = lg.playoffTeams > 0;
    const full = (ro.players || []).length;
    return `<div class="mv-side">
      <div class="mv-side-h">${esc(who)}</div>
      <div class="mv-side-n">${delta(impact.delta)}<span class="muted"> pts rest of season</span></div>
      ${base && after && hasPlayoffs ? `<div class="mv-side-o">${odds('playoffOdds', 'Playoffs')}${after.bracket ? odds('titleOdds', 'Title') : ''}</div>` : (state.thinking && hasPlayoffs ? '<div class="mv-side-o muted">Updating odds…</div>' : '')}
      <small class="muted">${full} players</small>
    </div>`;
  }

  // The market's value of both sides (dynasty values, or redraft consensus), packages priced so depth doesn't buy a star.
  function marketLine(lg, partner, them) {
    const t = state.trade;
    const send = sideValueOf(lg, [...t.give]);
    const get = sideValueOf(lg, [...t.get]);
    const net = get - send;
    const big = Math.max(send, get, 1);
    const redraft = V.consensus(lg);
    const unpriced = [...t.give, ...t.get].filter((pid) => !V.marketValue(lg, pid)).length;
    const format = `${lg.superflex ? 'Superflex' : '1QB'}${lg.tep ? ` TE${'+'.repeat(lg.tep)}` : ''}`;
    let call = redraft ? 'Even on consensus value.' : 'Even by blended value.';
    if (Math.abs(net) / big >= 0.05) call = net > 0 ? `Favors you by ${worth(net)} (${Math.round(Math.abs(net) / big * 100)}%).` : `Favors ${esc(them)} by ${worth(-net)} (${Math.round(Math.abs(net) / big * 100)}%).`;
    return { net, html: `<div class="mv-dyn">
      <div class="mv-dyn-h">${redraft ? 'Consensus value' : 'Dynasty value'} <small class="muted">KeepTradeCut ${redraft ? 'redraft' : 'mixed with projected points'} · ${format} · this league's scoring · extra players count over a free agent</small></div>
      <div class="mv-dyn-n"><span>You send <b>${worth(send)}</b></span><span>You get <b>${worth(get)}</b></span>${delta2(net)}</div>
      <p class="mv-verdict">${call}</p>
      ${unpriced ? `<p class="muted small">${unpriced} player${unpriced === 1 ? ' has' : 's have'} no KeepTradeCut value (counted as zero).</p>` : ''}
    </div>` };
  }
  const sideValueOf = (lg, pids) => V.packageValue(lg, pids);
  const delta2 = (n) => `<b class="${n > 0 ? 'up' : n < 0 ? 'down' : ''}">${n > 0 ? '+' : n < 0 ? '−' : ''}${worth(Math.abs(n))}</b>`;

  function verdict(me, them, names) {
    const a = me.delta;
    const b = them.delta;
    if (Math.abs(a) < 0.5 && Math.abs(b) < 0.5) return 'basically even.';
    if (a >= 0 && b >= 0) return 'both lineups improve.';
    if (a <= 0 && b <= 0) return 'both lineups get worse, so this is about depth or the future.';
    return a > b ? `favors you by ${Math.abs(a - b).toFixed(1)} pts.` : `favors ${esc(names)} by ${Math.abs(a - b).toFixed(1)} pts.`;
  }

  function tradeResult(lg, partner) {
    const t = state.trade;
    const r = t.result;
    if (!r) return '<p class="muted small mv-note">Pick what you would give and what you would get.</p>';
    const them = nameOf(lg, partner);
    const slots = lg.capacity;
    const give = [...t.give].filter((pid) => !isPick(pid)).length;
    const get = [...t.get].filter((pid) => !isPick(pid)).length;
    const myCount = (lg.mine.players || []).length - give + get;
    const theirCount = (partner.players || []).length - get + give;
    const warn = [];
    if (myCount > slots) warn.push(`You would need to drop ${myCount - slots}.`);
    if (theirCount > slots) warn.push(`${esc(them)} would need to drop ${theirCount - slots}.`);
    return `<div class="mv-result">
      <div class="mv-sides">${sideCard(lg, 'You', lg.mine, r.impact.a, r.base, r.after)}${sideCard(lg, them, partner, r.impact.b, r.base, r.after)}</div>
      ${usesKtc(lg) || V.consensus(lg) ? marketLine(lg, partner, them).html : ''}
      <p class="mv-verdict">${usesKtc(lg) || V.consensus(lg) ? 'Lineups: ' : 'For this season: '}${verdict(r.impact.a, r.impact.b, them)}</p>
      ${lg.kind !== 'redraft' && state.ktcError ? '<p class="muted small">Dynasty values unavailable right now (KeepTradeCut could not be reached).</p>' : ''}
      ${warn.length ? `<p class="mv-warn small">${warn.join(' ')}</p>` : ''}
      <p class="muted small mv-note">Each lineup is re-set every remaining week on Sleeper's projections${lg.kind !== 'redraft' ? '; age is not counted here' : ''}. Odds replay the season ${model.SIMS.toLocaleString()} times with the trade done.</p>
    </div>`;
  }

  function tradePane() {
    if (!state.leagues.length) return '<p class="empty muted">No league with a regular season left to play.</p>';
    const t = state.trade;
    const lg = tradeLeague() || state.leagues[0];
    const partner = t.partner && rosterById(lg, t.partner);
    const others = lg.raw.rosters.filter((ro) => ro.roster_id !== lg.mine.roster_id).sort((a, b) => nameOf(lg, a).localeCompare(nameOf(lg, b)));
    return `<div class="mv-trade">
      <div class="mv-selects">
        <select id="mv-league" aria-label="League">${state.leagues.map((l) => `<option value="${esc(l.leagueId)}"${l.leagueId === lg.leagueId ? ' selected' : ''}>${esc(l.name)}</option>`).join('')}</select>
        <select id="mv-partner" aria-label="Trade with">
          <option value="">Trade with…</option>
          ${others.map((ro) => `<option value="${ro.roster_id}"${partner && partner.roster_id === ro.roster_id ? ' selected' : ''}>${esc(nameOf(lg, ro))}</option>`).join('')}
        </select>
      </div>
      ${partner ? `
        <h4 class="mv-h">You give</h4>${pickList(lg, lg.mine, t.give, 'give')}
        <h4 class="mv-h">You get</h4>${pickList(lg, partner, t.get, 'get')}
        ${tradeResult(lg, partner)}` : '<p class="muted small mv-note">Choose a team to trade with.</p>'}
    </div>`;
  }

  // Lineup points are instant; the odds replay the season (a few hundred ms
  // for the pair of runs), so they fill in when ready and a newer pick wins.
  async function analyzeTrade() {
    const t = state.trade;
    const lg = tradeLeague();
    const partner = lg && t.partner && rosterById(lg, t.partner);
    const token = ++t.token;
    state.thinking = false;
    if (!lg || !partner || (!t.give.size && !t.get.size)) { t.result = null; render(); return; }

    // Picks change hands but never a lineup: only players go through the lineup and odds math.
    const give = [...t.give].filter((pid) => !isPick(pid));
    const get = [...t.get].filter((pid) => !isPick(pid));
    const impact = value.tradeImpact({
      slots: lg.raw.slots, weeks: lg.rep.weeks, positionsOf: lg.rep.positionsOf,
      a: { pool: lg.rep.pool(model.activePool(lg.mine)) }, b: { pool: lg.rep.pool(model.activePool(partner)) },
      aGives: give, bGives: get
    });
    t.result = { impact, base: state.base.get(lg.leagueId) || null, after: null };
    state.thinking = lg.playoffTeams > 0 && (give.length > 0 || get.length > 0);
    render();
    if (!state.thinking) return; // picks only (or no playoffs): nothing for the season replay to change

    try {
      await tick();
      const opts = { remainingOf: state.remainingOf, stats: state.stats };
      let base = state.base.get(lg.leagueId);
      if (!base) { base = await model.projectLeague(lg, opts); state.base.set(lg.leagueId, base); }
      if (token !== t.token) return;
      await tick();
      const after = await model.projectLeague(lg, Object.assign({ rosters: value.applyTrade(lg.raw.rosters, lg.mine.roster_id, partner.roster_id, give, get) }, opts));
      if (token !== t.token) return;
      t.result = { impact, base, after };
    } catch (err) {
      console.warn('[Night Owl moves] odds unavailable', err);
    } finally {
      if (token === t.token) { state.thinking = false; if (root) render(); }
    }
  }

  // ---- finder ----

  let finderPane = null;
  const finderLeague = () => state.leagues.find((lg) => lg.leagueId === state.finder.leagueId) || state.leagues[0] || null;
  function finder() {
    finderPane = finderPane || NightOwl.movesFinder.create({
      state, V, label, pickLabel, nameOf, positionsOf, render, active: () => !!root,
      ensureHistory: (lg) => history().ensure(lg),
      league: () => { const lg = finderLeague(); state.finder.leagueId = lg && lg.leagueId; return lg; },
      openTrade
    });
    return finderPane;
  }

  // Send a proposal to the trade analyzer, ready to adjust.
  function openTrade(item) {
    const lg = finderLeague();
    const t = state.trade;
    t.leagueId = lg.leagueId;
    t.partner = item.partnerId;
    t.give = new Set(item.give);
    t.get = new Set(item.get);
    t.result = null;
    state.mode = 'trade';
    storage.set({ 'moves.settings': { mode: state.mode } });
    render();
    analyzeTrade();
  }

  // ---- history ----

  let historyPane = null;
  function history() {
    historyPane = historyPane || NightOwl.movesHistory.create({
      state, V, render, active: () => !!root,
      league: () => { const lg = finderLeague(); state.finder.leagueId = lg && lg.leagueId; return lg; }
    });
    return historyPane;
  }

  let draftsPane = null;
  function drafts() {
    draftsPane = draftsPane || NightOwl.movesDrafts.create({
      state, V, render, active: () => !!root, ensureHistory: (lg) => history().ensure(lg),
      league: () => { const lg = finderLeague(); state.finder.leagueId = lg && lg.leagueId; return lg; }
    });
    return draftsPane;
  }

  // Trade history for every league, one at a time and in the background: the
  // finder uses it to judge who deals and how far off an even price they go.
  async function loadHistories() {
    const generation = state.generation;
    for (const lg of state.leagues) {
      if (lg.history || lg.historyPromise) continue;
      await tick();
      if (!root || generation !== state.generation) return;
      await history().ensure(lg);
      if (root && generation === state.generation && (state.mode === 'history' || state.mode === 'drafts')) render();
    }
  }

  // ---- view -------------------------------------------------------------

  function render() {
    if (!root) return;
    root.querySelectorAll('.mv-mode .tab').forEach((b) => b.classList.toggle('on', b.dataset.mode === state.mode));
    const err = $('mv-error');
    err.hidden = !state.error;
    err.textContent = state.error || '';
    if (!state.loadedAt) return;

    if (!state.leagues.length) {
      dom.setHtml($('mv-body'), '<p class="empty muted">No league with a regular season left to play.</p>');
    } else if (state.mode === 'history') {
      dom.setHtml($('mv-body'), history().pane());
    } else if (state.mode === 'drafts') {
      dom.setHtml($('mv-body'), drafts().pane());
    } else if (state.mode === 'finder') {
      dom.setHtml($('mv-body'), finder().pane());
    } else if (state.mode === 'waivers') {
      dom.setHtml($('mv-body'), state.leagues.map(waiverBlock).join(''));
    } else {
      // Ticking a player redraws the pane; the two lists must keep their scroll.
      const body = $('mv-body');
      const scrolls = [...body.querySelectorAll('.mv-picks')].map((el) => el.scrollTop);
      if (dom.setHtml(body, tradePane())) body.querySelectorAll('.mv-picks').forEach((el, i) => { el.scrollTop = scrolls[i] || 0; });
    }
  }

  function bind() {
    const body = $('mv-body');
    $('mv-refresh').addEventListener('click', refresh);
    root.querySelector('.mv-mode').addEventListener('click', (e) => {
      const btn = e.target.closest('[data-mode]');
      if (!btn || btn.dataset.mode === state.mode) return;
      state.mode = btn.dataset.mode;
      storage.set({ 'moves.settings': { mode: state.mode } });
      keepTradeValid();
      render();
      if (state.mode === 'trade') analyzeTrade();
      if (state.mode === 'finder' && !state.finder.results && !state.finder.running) finder().run();
      if (state.mode === 'history' || state.mode === 'drafts') { const lg = finderLeague(); if (lg && !lg.history) history().ensure(lg).then(() => root && render()); }
    });
    body.addEventListener('toggle', (e) => {
      const id = e.target.dataset && e.target.dataset.id;
      if (!id) return;
      if (e.target.open) state.open.add(id); else state.open.delete(id);
    }, true);
    body.addEventListener('click', (e) => {
      if (state.mode === 'finder') finder().click(e);
      else if (state.mode === 'history') history().click(e);
    });
    body.addEventListener('change', (e) => {
      if (state.mode === 'finder') { finder().change(e); return; }
      if (state.mode === 'history') { history().change(e); return; }
      if (state.mode === 'drafts') { drafts().change(e); return; }
      const t = state.trade;
      const el = e.target;
      if (el.id === 'mv-league') {
        t.leagueId = el.value; t.partner = null; t.give.clear(); t.get.clear(); t.result = null;
      } else if (el.id === 'mv-partner') {
        t.partner = el.value ? Number(el.value) : null; t.get.clear();
      } else if (el.dataset && (el.dataset.give || el.dataset.get)) {
        const set = el.dataset.give ? t.give : t.get;
        const pid = el.dataset.give || el.dataset.get;
        if (el.checked) set.add(pid); else set.delete(pid);
      } else {
        return;
      }
      analyzeTrade();
    });
  }

  function mount(el) {
    if (root === el) return;
    root = el;
    root.classList.add('tool', 'intro');
    setTimeout(() => el.classList.remove('intro'), 1600);
    root.innerHTML = MARKUP;
    bind();
    storage.get('moves.settings', {}).then((prefs) => {
      if (prefs.mode && root === el) { state.mode = prefs.mode; render(); }
    });
    render();
    if (Date.now() - state.loadedAt > REFRESH_MS / 2) refresh();
    else { render(); analyze().then(projectPicks).then(loadHistories); }
    state.timer = setInterval(() => {
      if (Date.now() - state.loadedAt >= REFRESH_MS - 1000) refresh();
    }, 60000);
  }

  function unmount() {
    state.finder.token++; // stops a search in progress
    state.finder.running = false;
    clearInterval(state.timer);
    state.timer = null;
    root = null;
  }

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.moves = { mount, unmount };
})(globalThis.NightOwl);
