globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, teams, players, storage, account, dom, projection, value, model, ktc, replacement } = NightOwl;
  const { isPlaying, mine: rosterOf, ownerNames, teamUrl } = NightOwl.leagues;
  const { escape: escapeHtml, percent, delta: signed, leagueSelect } = NightOwl.format;

  const REFRESH_MS = 15 * 60000;
  const SHOWN = 6;
  const STREAMERS = 3;
  const KIND = { 0: 'redraft', 1: 'keeper', 2: 'dynasty' };

  let root = null;
  const elementById = (elementId) => root.querySelector(`#${elementId}`);

  const state = {
    mode: 'waivers',
    draftMethod: 'linear',
    nfl: null,
    stats: {},
    remainingOf: null,
    ktc: null,
    ktcRedraft: null,
    ktcError: null,
    leagues: [],
    targets: new Map(),
    open: new Set(),
    history: { all: false },
    drafts: { draftId: null, color: 'slot' },
    finder: { leagueId: null, goal: 'balanced', shop: null, target: null, results: null, running: false, progress: '', error: null, token: 0 },
    trade: { leagueId: null, partner: null, give: new Set(), get: new Set(), result: null, token: 0 },
    base: new Map(),
    loadedAt: 0,
    generation: 0,
    timer: null,
    busy: false,
    thinking: false,
    error: null
  };

  const { isPick, pickOf, standingsRanks, PICK_ROUNDS } = NightOwl.moveValues;
  const leagueValues = NightOwl.moveValues.create(state);
  const { pickSlot, pickTierOf, ownedPicks, ordinalRound, restOfSeasonPoints, usesKtc, dynastyValue, worth } = leagueValues;

  const MARKUP = `
    <header class="bar">
      <div class="title quiet"><strong>Moves</strong></div>
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
  const positionsOf = (playerId) => players.info(playerId).positions;
  const WAIVER_MIN_GAIN = 1.5;
  const REFERENCE_PPG = 12;
  const REFERENCE_WEEKS = 11;
  const DROP_PROTECTED = 2000;
  const oddsLabel = (probability) => (probability >= 0.995 ? '>99%' : probability > 0 && probability < 0.005 ? '<1%' : percent(probability));

  async function load() {
    const { userId } = await account.resolve();
    const excluded = await account.excluded();
    state.draftMethod = (await storage.get('season.settings', {})).draftMethod || 'linear';
    await players.load();
    const nflState = await api.state();
    state.nfl = nflState;

    const playing = (await api.leagues(userId, nflState.season)).filter((league) => isPlaying(league) && !excluded.has(league.league_id));
    const leagues = (await Promise.all(playing.map(async (league) => {
      const { rosters, users, traded } = await api.leagueParts(league);
      const mine = rosterOf(rosters, userId);
      if (!mine) return null;
      const timeline = model.timeline(league, rosters, nflState);
      if (timeline.next >= timeline.playoffStart) return null;
      const thisWeek = timeline.inProgress ? await api.matchups(league.league_id, timeline.next) : [];
      const weeklyPoints = await model.playerPointsByWeek(league.league_id, timeline.finished).catch(() => ({}));
      return {
        weeklyPoints,
        leagueId: league.league_id,
        name: league.name.trim(),
        playoffTeams: timeline.playoffTeams,
        medianGame: timeline.medianGame,
        draft: KIND[(league.settings && league.settings.type) || 0] === 'redraft' ? null : {},
        draftRounds: (league.settings && league.settings.draft_rounds) || PICK_ROUNDS,
        capacity: (league.roster_positions || []).length + ((league.settings && league.settings.reserve_slots) || 0) + ((league.settings && league.settings.taxi_slots) || 0),
        traded,
        tradeDeadline: (league.settings && league.settings.trade_deadline) || 0,
        kind: KIND[(league.settings && league.settings.type) || 0] || 'redraft',
        mine,
        names: ownerNames(users),
        raw: {
          season: league.season,
          rosters,
          next: timeline.next,
          inProgress: timeline.inProgress,
          thisWeek: thisWeek || [],
          playoffStart: timeline.playoffStart,
          roundType: (league.settings && league.settings.playoff_round_type) || 0,
          slots: league.roster_positions || [],
          scoring: league.scoring_settings || {}
        }
      };
    }))).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));

    const [stats, remainingOf, nflSchedule] = await Promise.all([
      leagues.length ? model.projections(nflState.season, model.weeksNeeded(leagues), model.positionsFor(leagues.map((league) => league.raw.slots))) : {},
      leagues.some((league) => league.raw.inProgress) ? model.remainingByTeam(nflState.season, nflState.week) : Promise.resolve(() => 1),
      model.nflSchedule(nflState.season)
    ]);
    state.stats = stats;
    state.remainingOf = remainingOf;
    state.ktcError = null;
    if (leagues.some((league) => league.kind !== 'redraft')) {
      try { state.ktc = await ktc.load('dynasty', players.list(), api.ktcRows); } catch (error) {
        console.warn('[Night Owl moves] KeepTradeCut unavailable', error);
        state.ktc = null;
        state.ktcError = error.message || String(error);
      }
    }

    if (leagues.some((league) => league.kind === 'redraft')) {
      try { state.ktcRedraft = await ktc.load('redraft', players.list(), api.ktcRows); } catch (error) {
        console.warn('[Night Owl moves] KeepTradeCut redraft values unavailable', error);
        state.ktcRedraft = null;
      }
    }

    const projected = new Set();
    for (const week of Object.values(stats)) for (const playerId of Object.keys(week)) projected.add(playerId);
    for (const league of leagues) {
      league.weeks = model.valueWeeks(league, stats, nflSchedule);
      const taken = new Set(league.raw.rosters.flatMap((roster) => roster.players || []));
      league.free = [...projected].filter((playerId) => !taken.has(playerId));
      league.rep = replacement.wrap({
        slots: league.raw.slots, weeks: league.weeks, positionsOf,
        rates: replacement.levels(league.free, league.weeks, positionsOf, replacement.startingPositions(league.raw.slots), [...taken])
      });
      league.scale = pointScale(league);
      league.ranks = standingsRanks(league.raw.rosters);
      league.picks = league.kind === 'redraft' ? new Map() : ownedPicks(league);
      league.superflex = ktc.isSuperflex(league.raw.slots);
      league.tep = ktc.tepTier(league.raw.scoring);
      league.openSpots = Math.max(0, league.capacity - (league.mine.players || []).length);
    }
    state.leagues = leagues;
    state.generation++;
    state.targets.clear();
    state.base.clear();
    state.loadedAt = Date.now();
  }

  function pointScale(league) {
    if (!league.weeks.length) return 1;
    const starters = NightOwl.leagues.startingSlots({ roster_positions: league.raw.slots }).length || 1;
    const perStarter = league.raw.rosters.map((roster) => value.lineupPoints(league.raw.slots, model.activePool(roster), league.weeks.slice(0, 1), positionsOf).total / starters);
    const pointsPerStarter = perStarter.reduce((total, points) => total + points, 0) / perStarter.length;
    const clamp = (value, lowest, highest) => Math.max(lowest, Math.min(highest, value));
    return clamp(pointsPerStarter / REFERENCE_PPG, 0.5, 2) * clamp(league.weeks.length / REFERENCE_WEEKS, 0.4, 1.3);
  }

  async function projectPicks() {
    const generation = state.generation;
    for (const league of state.leagues) {
      if (!league.draft || league.slots) continue;
      await tick();
      if (!root || generation !== state.generation) return;
      try {
        const base = await model.projectLeague(league, { remainingOf: state.remainingOf, stats: state.stats, draftMethod: state.draftMethod });
        if (generation !== state.generation) return;
        state.base.set(league.leagueId, base);
        league.slots = new Map(projection.projectedDraft(base, { method: state.draftMethod }).map((team) => [team.rosterId, team.pick]));
        league.dyn = new Map();
        league.blend = new Map();
        render();
      } catch (error) {
        console.warn('[Night Owl moves] draft order projection failed', league.name, error);
      }
    }
  }

  async function analyze() {
    const generation = state.generation;
    for (const league of state.leagues) {
      if (state.targets.has(league.leagueId)) continue;
      await tick();
      if (!root || generation !== state.generation) return;
      const pool = model.activePool(league.mine);
      const droppable = leagueValues.usesKtc(league) ? pool.filter((playerId) => leagueValues.dynastyValue(league, playerId) < DROP_PROTECTED) : pool;
      state.targets.set(league.leagueId, value.waiverTargets({
        slots: league.raw.slots, pool, droppable, openSpots: league.openSpots,
        candidates: league.free, weeks: league.rep.weeks, positionsOf, minGain: WAIVER_MIN_GAIN * league.scale
      }));
      render();
    }
  }

  async function refresh() {
    if (state.busy || !root) return;
    state.busy = true;
    elementById('mv-refresh').classList.add('spin');
    try {
      await load();
      state.error = null;
    } catch (error) {
      console.error('[Night Owl moves]', error);
      state.error = NightOwl.format.errorText(error);
    } finally {
      state.busy = false;
      if (root) {
        elementById('mv-refresh').classList.remove('spin');
        keepTradeValid();
        render();
        analyze().then(projectPicks).then(() => state.mode === 'trade' && analyzeTrade()).then(loadHistories);
        state.finder.token++;
        state.finder.running = false;
        state.finder.results = null;
        if (state.mode === 'finder') finder().run();
        if (state.mode === 'trade') analyzeTrade();
      }
    }
  }

  const label = (playerId) => {
    const player = players.info(playerId);
    const injury = player.injury ? `<i class="mv-inj" title="${escapeHtml(player.injury)}">${escapeHtml(player.injury)}</i>` : '';
    return `<span class="mv-who"><img src="${teams.photo(playerId, player.team)}" alt="" loading="lazy"><span class="mv-nm"><b>${escapeHtml(player.name)}</b><small>${escapeHtml(player.pos)}${player.team ? ` · ${escapeHtml(player.team)}` : ''}${injury}</small></span></span>`;
  };


  function pickLabel(league, playerId, owner) {
    const pick = pickOf(playerId);
    const tier = pickTierOf(league, pick);
    const slot = pick.year === Number(league.raw.season) + 1 ? pickSlot(league, pick.from) : null;
    const own = pick.from === owner.roster_id;
    const from = own ? 'own pick' : `from ${escapeHtml(league.names.get((league.raw.rosters.find((roster) => roster.roster_id === pick.from) || {}).owner_id) || `Team ${pick.from}`)}`;
    return `<span class="mv-who"><span class="mv-pk">${String(pick.year).slice(2)}</span><span class="mv-nm"><b>${pick.year} ${slot ? `${pick.round}.${String(slot).padStart(2, '0')}` : `${tier[0].toUpperCase()}${tier.slice(1)} ${ordinalRound(pick.round)}`}</b><small>${slot ? `${tier} ${ordinalRound(pick.round)} · ` : ''}${from}</small></span></span>`;
  }

  function addRow(league, target, { by: rankBy }) {
    const drop = target.drop ? `<span class="mv-cut" title="The player your lineup misses least">cut ${escapeHtml(players.info(target.drop).name)}</span>` : '<span class="mv-cut">open spot</span>';
    return `<tr>
      <td>${label(target.pid)}</td>
      <td class="num" title="Projected next week">${target.next.toFixed(1)}</td>
      <td class="num up" title="Starter points he'd add ${rankBy === 'gain' ? 'over the rest of the season' : 'next week'}">${signed(rankBy === 'gain' ? target.gain : target.nowGain)}</td>
      <td class="mv-drop">${drop}</td>
    </tr>`;
  }

  function waiverBlock(league) {
    const targets = state.targets.get(league.leagueId);
    const week = league.weeks[0] && league.weeks[0].week;
    let head;
    let body = '';
    if (!targets) {
      head = '<span class="mv-best muted">Checking…</span>';
    } else if (!targets.length) {
      head = '<span class="mv-best muted">No upgrades</span>';
      body = '';
    } else {
      const best = targets[0];
      head = `<span class="mv-best up">${signed(best.gain)} pts · ${escapeHtml(players.info(best.pid).name)}</span>`;
      const long = targets.filter((target) => target.gain >= 0.05).slice(0, SHOWN);
      const quick = targets.filter((target) => target.nowGain >= 0.05).sort((a, b) => b.nowGain - a.nowGain).slice(0, STREAMERS);
      const tableHead = (rankBy) => `<thead><tr><th></th><th title="Projected points next week">Wk ${week}</th><th title="${rankBy === 'gain' ? 'Starter points added for the rest of the season' : 'Starter points added next week'}">${rankBy === 'gain' ? 'ROS' : 'Gain'}</th><th></th></tr></thead>`;
      body = `<h4 class="mv-h">Best for the rest of the season</h4>
        <table class="mv-table">${tableHead('gain')}<tbody>${long.map((target) => addRow(league, target, { by: 'gain' })).join('') || '<tr><td colspan="4" class="muted">No long-term upgrades</td></tr>'}</tbody></table>
        ${quick.length ? `<h4 class="mv-h">Best for week ${week}</h4>
        <table class="mv-table">${tableHead('now')}<tbody>${quick.map((target) => addRow(league, target, { by: 'now' })).join('')}</tbody></table>` : ''}
        <p class="muted small mv-note">Starter points your best lineup gains with him${league.kind !== 'redraft' ? ' this season (age and picks are not counted)' : ''}, after cutting the player your lineup misses least. Projections are Sleeper's.
        <a href="${teamUrl(league.leagueId)}" target="_blank" rel="noopener">Open in Sleeper</a></p>`;
    }
    return `<details class="mv-league" data-id="${escapeHtml(league.leagueId)}"${state.open.has(league.leagueId) ? ' open' : ''}>
      <summary><div class="mv-head"><span class="mv-name">${escapeHtml(league.name)}</span>${head}</div></summary>
      ${body}
    </details>`;
  }

  const tradeLeague = () => state.leagues.find((league) => league.leagueId === state.trade.leagueId) || null;
  const rosterById = (league, rosterId) => league.raw.rosters.find((roster) => roster.roster_id === rosterId) || null;
  const nameOf = (league, roster) => (roster ? league.names.get(roster.owner_id) || `Team ${roster.roster_id}` : '');

  function keepTradeValid() {
    const tradeState = state.trade;
    let league = tradeLeague();
    if (!league) { league = state.leagues[0] || null; tradeState.leagueId = league && league.leagueId; tradeState.partner = null; tradeState.give.clear(); tradeState.get.clear(); }
    if (!league) return;
    const partner = tradeState.partner && rosterById(league, tradeState.partner);
    if (!partner || partner.roster_id === league.mine.roster_id) { tradeState.partner = null; tradeState.get.clear(); }
    const holds = (roster, playerId) => (isPick(playerId) ? (league.picks.get(roster.roster_id) || []) : roster.players || []).includes(playerId);
    for (const playerId of [...tradeState.give]) if (!holds(league.mine, playerId)) tradeState.give.delete(playerId);
    for (const playerId of [...tradeState.get]) if (!partner || !holds(partner, playerId)) tradeState.get.delete(playerId);
  }


  function pickList(league, roster, chosen, kind) {
    const away = new Set([...(roster.reserve || []), ...(roster.taxi || [])]);
    const rows = (roster.players || []).slice().sort((a, b) => (usesKtc(league) ? leagueValues.blendedValue(league, b) - leagueValues.blendedValue(league, a) : 0) || restOfSeasonPoints(league, b) - restOfSeasonPoints(league, a));
    const picks = (league.picks.get(roster.roster_id) || []).filter((playerId) => dynastyValue(league, playerId) > 0 || chosen.has(playerId));
    const pickRows = usesKtc(league) ? picks.map((playerId) => `<label class="mv-pick${chosen.has(playerId) ? ' on' : ''}">
        <input type="checkbox" data-${kind}="${escapeHtml(playerId)}"${chosen.has(playerId) ? ' checked' : ''}>
        ${pickLabel(league, playerId, roster)}<span class="mv-ros" title="Draft pick value (KeepTradeCut, for this league's format)">${worth(dynastyValue(league, playerId))}</span>
      </label>`).join('') : '';
    return `<div class="mv-picks">${rows.map((playerId) => {
      const tag = (roster.reserve || []).includes(playerId) ? 'IR' : (roster.taxi || []).includes(playerId) ? 'taxi' : '';
      return `<label class="mv-pick${chosen.has(playerId) ? ' on' : ''}">
        <input type="checkbox" data-${kind}="${escapeHtml(playerId)}"${chosen.has(playerId) ? ' checked' : ''}>
        ${label(playerId)}${usesKtc(league)
          ? `<span class="mv-ros" title="Value: KeepTradeCut (${worth(dynastyValue(league, playerId))}, for this league's format and scoring) mixed with projected points over a free agent${tag ? `; on ${escapeHtml(tag)}` : ''}">${leagueValues.blendedValue(league, playerId) ? worth(leagueValues.blendedValue(league, playerId)) : '–'}</span>`
          : `<span class="mv-ros" title="Projected points rest of season">${away.has(playerId) ? escapeHtml(tag) : Math.round(restOfSeasonPoints(league, playerId))}</span>`}
      </label>`;
    }).join('')}${pickRows}</div>`;
  }

  const pointsDeltaHtml = (amount) => `<b class="${amount > 0 ? 'up' : amount < 0 ? 'down' : ''}">${signed(amount)}</b>`;

  function sideCard(league, who, roster, impact, base, after, futureChange) {
    const odds = (key, text) => `${text} ${oddsLabel(base.teams[roster.roster_id][key])} → <b>${oddsLabel(after.teams[roster.roster_id][key])}</b>`;
    const hasPlayoffs = league.playoffTeams > 0;
    const line = base && after && hasPlayoffs
      ? `<div class="mv-side-o">${odds('playoffOdds', 'Playoffs')}${after.bracket ? ` · ${odds('titleOdds', 'Title')}` : ''}</div>`
      : (state.thinking && hasPlayoffs ? '<div class="mv-side-o muted">Updating odds…</div>' : '');
    const season = Number(league.raw.season);
    const size = futureChange ? NightOwl.horizon.meaningfulness(impact.delta, league.weeks.length) : null;
    const sizeTag = size ? `<span class="mv-size ${size}">${size === 'negligible' ? 'within noise' : size}</span>` : '';
    const later = futureChange ? `<div class="mv-side-f"><span class="muted">Next seasons</span> ${futureChange.map((change, index) => `${season + index + 1} ${pointsDeltaHtml(change)}`).join(' · ')}</div>` : '';
    return `<div class="mv-side">
      <div class="mv-side-h">${escapeHtml(who)}</div>
      <div class="mv-side-n">${pointsDeltaHtml(impact.delta)}<span class="muted"> pts this season</span>${sizeTag}</div>
      ${later}
      ${line}
    </div>`;
  }

  function marketLine(league, partner, them) {
    const tradeState = state.trade;
    const send = sideValueOf(league, [...tradeState.give]);
    const get = sideValueOf(league, [...tradeState.get]);
    const net = get - send;
    const big = Math.max(send, get, 1);
    const redraft = leagueValues.consensus(league);
    const unpriced = [...tradeState.give, ...tradeState.get].filter((playerId) => !leagueValues.marketValue(league, playerId)).length;
    const format = `${league.superflex ? 'Superflex' : '1QB'}${league.tep ? ` TE${'+'.repeat(league.tep)}` : ''}`;
    let call = redraft ? 'Even on consensus value.' : 'Even by blended value.';
    if (Math.abs(net) / big >= 0.05) call = net > 0 ? `Favors you by ${worth(net)} (${Math.round(Math.abs(net) / big * 100)}%).` : `Favors ${escapeHtml(them)} by ${worth(-net)} (${Math.round(Math.abs(net) / big * 100)}%).`;
    return { net, html: `<div class="mv-dyn" title="${redraft ? 'Consensus value (KeepTradeCut redraft)' : 'KeepTradeCut mixed with projected points'} · ${format} · this league's scoring · extra players count over a free agent${unpriced ? ` · ${unpriced} unpriced player${unpriced === 1 ? '' : 's'} counted as zero` : ''}">
      <div class="mv-dyn-n"><span>You send <b>${worth(send)}</b></span><span>You get <b>${worth(get)}</b></span>${valueDeltaHtml(net)}</div>
      <p class="mv-verdict">${call}</p>
    </div>` };
  }
  const sideValueOf = (league, assetIds) => leagueValues.packageValue(league, assetIds);
  const valueDeltaHtml = (amount) => `<b class="${amount > 0 ? 'up' : amount < 0 ? 'down' : ''}">${amount > 0 ? '+' : amount < 0 ? '−' : ''}${worth(Math.abs(amount))}</b>`;

  function verdict(myImpact, them, names) {
    const a = myImpact.delta;
    const b = them.delta;
    if (Math.abs(a) < 0.5 && Math.abs(b) < 0.5) return 'basically even.';
    if (a >= 0 && b >= 0) return 'both lineups improve.';
    if (a <= 0 && b <= 0) return 'both lineups get worse, so this is about depth or the future.';
    return a > b ? `favors you by ${Math.abs(a - b).toFixed(1)} pts.` : `favors ${escapeHtml(names)} by ${Math.abs(a - b).toFixed(1)} pts.`;
  }

  function dynastyVerdict(nowChange, futureChange, weeksLeft) {
    const horizon = NightOwl.horizon;
    const nowSize = horizon.meaningfulness(nowChange, weeksLeft);
    const nowText = nowSize === 'negligible' ? 'no real change for you this season' : `${nowChange > 0 ? 'helps' : 'costs'} you ${Math.abs(nowChange).toFixed(1)} pts this season (${nowSize})`;
    const lastYear = futureChange[futureChange.length - 1];
    const laterSize = horizon.meaningfulness(lastYear, horizon.SEASON_GAMES);
    const laterText = laterSize === 'negligible' ? 'and about even after that' : `and ${lastYear > 0 ? 'helps' : 'costs'} you ${Math.abs(lastYear).toFixed(0)} pts by ${futureChange.length} seasons out`;
    return `${nowText}, ${laterText}.`;
  }

  function tradeNotesHtml(league, result) {
    const tradeState = state.trade;
    const describe = (playerId) => {
      const entry = state.ktc && state.ktc.players[playerId];
      return { name: players.info(playerId).name, age: entry ? entry.a : null, position: (league.rep.positionsOf(playerId) || [])[0] };
    };
    const notes = NightOwl.horizon.tradeNotes({
      now: result.impact.a.delta,
      future: result.horizon.a,
      weeksLeft: league.weeks.length,
      season: Number(league.raw.season),
      gives: [...tradeState.give].filter((playerId) => !isPick(playerId)).map(describe),
      gets: [...tradeState.get].filter((playerId) => !isPick(playerId)).map(describe)
    });
    return notes.length ? `<ul class="mv-notes">${notes.slice(0, 3).map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul>` : '';
  }

  function redraftNotesHtml(league) {
    const tradeState = state.trade;
    const named = (assetIds) => [...assetIds].filter((assetId) => !isPick(assetId));
    const notes = [];
    const hot = named(tradeState.give).find((playerId) => (leagueValues.formOf(league, playerId) || {}).signal === 'hot');
    const cold = named(tradeState.get).find((playerId) => (leagueValues.formOf(league, playerId) || {}).signal === 'cold');
    if (hot) notes.push(`${players.info(hot).name} is running hotter than his projection, which is a good time to sell.`);
    if (cold) notes.push(`${players.info(cold).name} is scoring under his projection with no change in role, which is a good time to buy.`);
    const given = named(tradeState.give).length;
    const received = named(tradeState.get).length;
    if (received - given >= 1) notes.push(`You take on ${received - given} extra roster ${received - given === 1 ? 'spot' : 'spots'}; the other side gets the star, so expect a higher price.`);
    if (given - received >= 1) notes.push('You consolidate into fewer, better players, which suits a team already in position to make the playoffs.');
    return notes.length ? `<ul class="mv-notes">${notes.slice(0, 3).map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul>` : '';
  }

  function tradeResult(league, partner) {
    const tradeState = state.trade;
    const result = tradeState.result;
    if (!result) return '';
    const them = nameOf(league, partner);
    const slots = league.capacity;
    const give = [...tradeState.give].filter((playerId) => !isPick(playerId)).length;
    const get = [...tradeState.get].filter((playerId) => !isPick(playerId)).length;
    const myCount = (league.mine.players || []).length - give + get;
    const theirCount = (partner.players || []).length - get + give;
    const warn = [];
    if (myCount > slots) warn.push(`You would need to drop ${myCount - slots}.`);
    if (theirCount > slots) warn.push(`${escapeHtml(them)} would need to drop ${theirCount - slots}.`);
    return `<div class="mv-result" title="Each lineup is re-set every remaining week on Sleeper's projections${league.kind !== 'redraft' ? '; later seasons use each player\'s per-game rate with an age curve for his position' : ''}. Odds replay the season ${model.SIMS.toLocaleString()} times with the trade done.">
      <div class="mv-sides">${sideCard(league, 'You', league.mine, result.impact.a, result.base, result.after, result.horizon && result.horizon.a)}${sideCard(league, them, partner, result.impact.b, result.base, result.after, result.horizon && result.horizon.b)}</div>
      ${usesKtc(league) || leagueValues.consensus(league) ? marketLine(league, partner, them).html : ''}
      <p class="mv-verdict mv-sub">${result.horizon ? `Lineups: ${dynastyVerdict(result.impact.a.delta, result.horizon.a, league.weeks.length)}` : `${usesKtc(league) || leagueValues.consensus(league) ? 'Lineups: ' : 'For this season: '}${verdict(result.impact.a, result.impact.b, them)}`}</p>
      ${result.horizon ? tradeNotesHtml(league, result) : league.kind === 'redraft' ? redraftNotesHtml(league) : ''}
      ${league.kind !== 'redraft' && state.ktcError ? '<p class="muted small">Dynasty values unavailable right now (KeepTradeCut could not be reached).</p>' : ''}
      ${warn.length ? `<p class="mv-warn small">${warn.join(' ')}</p>` : ''}
    </div>`;
  }

  function tradePane() {
    if (!state.leagues.length) return '<p class="empty muted">No league with a regular season left to play.</p>';
    const tradeState = state.trade;
    const league = tradeLeague() || state.leagues[0];
    const partner = tradeState.partner && rosterById(league, tradeState.partner);
    const others = league.raw.rosters.filter((roster) => roster.roster_id !== league.mine.roster_id).sort((a, b) => nameOf(league, a).localeCompare(nameOf(league, b)));
    return `<div class="mv-trade">
      <div class="mv-selects">
        ${leagueSelect(state.leagues, league.leagueId)}
        <select id="mv-partner" aria-label="Trade with">
          <option value="">Trade with…</option>
          ${others.map((roster) => `<option value="${roster.roster_id}"${partner && partner.roster_id === roster.roster_id ? ' selected' : ''}>${escapeHtml(nameOf(league, roster))}</option>`).join('')}
        </select>
      </div>
      ${partner ? `
        <h4 class="mv-h">You give</h4>${pickList(league, league.mine, tradeState.give, 'give')}
        <h4 class="mv-h">You get</h4>${pickList(league, partner, tradeState.get, 'get')}
        ${tradeResult(league, partner)}` : '<p class="muted small mv-note">Choose a team to trade with.</p>'}
    </div>`;
  }

  async function analyzeTrade() {
    const tradeState = state.trade;
    const league = tradeLeague();
    const partner = league && tradeState.partner && rosterById(league, tradeState.partner);
    const token = ++tradeState.token;
    state.thinking = false;
    if (!league || !partner || (!tradeState.give.size && !tradeState.get.size)) { tradeState.result = null; render(); return; }

    const give = [...tradeState.give].filter((playerId) => !isPick(playerId));
    const get = [...tradeState.get].filter((playerId) => !isPick(playerId));
    const impact = value.tradeImpact({
      slots: league.raw.slots, weeks: league.rep.weeks, positionsOf: league.rep.positionsOf,
      a: { pool: league.rep.pool(model.activePool(league.mine)) }, b: { pool: league.rep.pool(model.activePool(partner)) },
      aGives: give, bGives: get
    });
    const ktcAge = (playerId) => { const entry = state.ktc && state.ktc.players[playerId]; return entry ? entry.a : null; };
    const horizonImpact = usesKtc(league)
      ? NightOwl.horizon.horizonImpact({
        slots: league.raw.slots, positionsOf: league.rep.positionsOf, ageOf: ktcAge, weeks: league.weeks, isVirtual: league.rep.isVirtual, replacementRate: league.rep.rate,
        a: { pool: league.rep.pool(model.activePool(league.mine)) }, b: { pool: league.rep.pool(model.activePool(partner)) }, aGives: give, bGives: get
      })
      : null;
    tradeState.result = { impact, horizon: horizonImpact, base: state.base.get(league.leagueId) || null, after: null };
    state.thinking = league.playoffTeams > 0 && (give.length > 0 || get.length > 0);
    render();
    if (!state.thinking) return;

    try {
      await tick();
      const projectionOptions = { remainingOf: state.remainingOf, stats: state.stats };
      let base = state.base.get(league.leagueId);
      if (!base) { base = await model.projectLeague(league, projectionOptions); state.base.set(league.leagueId, base); }
      if (token !== tradeState.token) return;
      await tick();
      const after = await model.projectLeague(league, Object.assign({ rosters: value.applyTrade(league.raw.rosters, league.mine.roster_id, partner.roster_id, give, get) }, projectionOptions));
      if (token !== tradeState.token) return;
      tradeState.result = { impact, horizon: horizonImpact, base, after };
    } catch (error) {
      console.warn('[Night Owl moves] odds unavailable', error);
    } finally {
      if (token === tradeState.token) { state.thinking = false; if (root) render(); }
    }
  }

  let finderPane = null;
  const finderLeague = () => state.leagues.find((league) => league.leagueId === state.finder.leagueId) || state.leagues[0] || null;
  function finder() {
    finderPane = finderPane || NightOwl.movesFinder.create({
      state, V: leagueValues, label, pickLabel, nameOf, positionsOf, render, active: () => !!root,
      ensureHistory: (league) => history().ensure(league),
      league: () => { const league = finderLeague(); state.finder.leagueId = league && league.leagueId; return league; },
      openTrade
    });
    return finderPane;
  }

  function openTrade(item) {
    const league = finderLeague();
    const tradeState = state.trade;
    tradeState.leagueId = league.leagueId;
    tradeState.partner = item.partnerId;
    tradeState.give = new Set(item.give);
    tradeState.get = new Set(item.get);
    tradeState.result = null;
    state.mode = 'trade';
    storage.set({ 'moves.settings': { mode: state.mode } });
    render();
    analyzeTrade();
  }

  let historyPane = null;
  function history() {
    historyPane = historyPane || NightOwl.movesHistory.create({
      state, V: leagueValues, render, active: () => !!root,
      league: () => { const league = finderLeague(); state.finder.leagueId = league && league.leagueId; return league; }
    });
    return historyPane;
  }

  let draftsPane = null;
  function drafts() {
    draftsPane = draftsPane || NightOwl.movesDrafts.create({
      state, V: leagueValues, render, active: () => !!root, ensureHistory: (league) => history().ensure(league),
      league: () => { const league = finderLeague(); state.finder.leagueId = league && league.leagueId; return league; }
    });
    return draftsPane;
  }

  async function loadHistories() {
    const generation = state.generation;
    for (const league of state.leagues) {
      if (league.history || league.historyPromise) continue;
      await tick();
      if (!root || generation !== state.generation) return;
      await history().ensure(league);
      if (root && generation === state.generation && (state.mode === 'history' || state.mode === 'drafts')) render();
    }
  }

  function render() {
    if (!root) return;
    root.querySelectorAll('.mv-mode .tab').forEach((b) => b.classList.toggle('on', b.dataset.mode === state.mode));
    const error = elementById('mv-error');
    error.hidden = !state.error;
    error.textContent = state.error || '';
    if (!state.loadedAt) {
      if (state.error) dom.setHtml(elementById('mv-body'), '');
      return;
    }

    if (!state.leagues.length) {
      dom.setHtml(elementById('mv-body'), '<p class="empty muted">No league with a regular season left to play.</p>');
    } else if (state.mode === 'history') {
      dom.setHtml(elementById('mv-body'), history().pane());
    } else if (state.mode === 'drafts') {
      dom.setHtml(elementById('mv-body'), drafts().pane());
    } else if (state.mode === 'finder') {
      dom.setHtml(elementById('mv-body'), finder().pane());
    } else if (state.mode === 'waivers') {
      dom.setHtml(elementById('mv-body'), state.leagues.map(waiverBlock).join(''));
    } else {
      const body = elementById('mv-body');
      const scrolls = [...body.querySelectorAll('.mv-picks')].map((element) => element.scrollTop);
      if (dom.setHtml(body, tradePane())) body.querySelectorAll('.mv-picks').forEach((element, i) => { element.scrollTop = scrolls[i] || 0; });
    }
  }

  function bind() {
    const body = elementById('mv-body');
    elementById('mv-refresh').addEventListener('click', refresh);
    root.querySelector('.mv-mode').addEventListener('click', (event) => {
      const button = event.target.closest('[data-mode]');
      if (!button || button.dataset.mode === state.mode) return;
      state.mode = button.dataset.mode;
      storage.set({ 'moves.settings': { mode: state.mode } });
      keepTradeValid();
      render();
      if (state.mode === 'trade') analyzeTrade();
      if (state.mode === 'finder' && !state.finder.results && !state.finder.running) finder().run();
      if (state.mode === 'history' || state.mode === 'drafts') { const league = finderLeague(); if (league && !league.history) history().ensure(league).then(() => root && render()); }
    });
    dom.trackOpenDetails(body, state.open);
    body.addEventListener('click', (event) => {
      if (state.mode === 'finder') finder().click(event);
      else if (state.mode === 'history') history().click(event);
      else if (state.mode === 'drafts') drafts().click(event);
    });
    body.addEventListener('change', (event) => {
      if (state.mode === 'finder') { finder().change(event); return; }
      if (state.mode === 'history') { history().change(event); return; }
      if (state.mode === 'drafts') { drafts().change(event); return; }
      const tradeState = state.trade;
      const element = event.target;
      if (element.id === 'mv-league') {
        tradeState.leagueId = element.value; tradeState.partner = null; tradeState.give.clear(); tradeState.get.clear(); tradeState.result = null;
      } else if (element.id === 'mv-partner') {
        tradeState.partner = element.value ? Number(element.value) : null; tradeState.get.clear();
      } else if (element.dataset && (element.dataset.give || element.dataset.get)) {
        const set = element.dataset.give ? tradeState.give : tradeState.get;
        const playerId = element.dataset.give || element.dataset.get;
        if (element.checked) set.add(playerId); else set.delete(playerId);
      } else {
        return;
      }
      analyzeTrade();
    });
  }

  function mount(element) {
    if (root === element) return;
    root = element;
    root.classList.add('tool', 'intro');
    setTimeout(() => element.classList.remove('intro'), 1600);
    root.innerHTML = MARKUP;
    bind();
    storage.get('moves.settings', {}).then((prefs) => {
      if (prefs.mode && root === element) { state.mode = prefs.mode; render(); }
    });
    render();
    if (Date.now() - state.loadedAt > REFRESH_MS / 2) refresh();
    else { render(); analyze().then(projectPicks).then(loadHistories); }
    state.timer = setInterval(() => {
      if (Date.now() - state.loadedAt >= REFRESH_MS - 1000) refresh();
    }, 60000);
  }

  function unmount() {
    state.finder.token++;
    state.finder.running = false;
    clearInterval(state.timer);
    state.timer = null;
    root = null;
  }

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.moves = { mount, unmount };
})(globalThis.NightOwl);
