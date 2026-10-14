globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, teams, players, storage, account, dom } = NightOwl;
  const { escape: escapeHtml, short: num, percent: pct, dayTime: timeOf, dayTimeShort, windowTitle } = NightOwl.format;
  const { isPlaying, mine: rosterOf, displayWeek, seasonType: seasonTypeOf } = NightOwl.leagues;
  const core = NightOwl.bets;
  const windowsOf = (games) => NightOwl.lineups.windows(games);
  let root = null;
  const $ = (id) => root.querySelector(`#${id}`);

  const REFRESH_MS = 5 * 60000;
  const LIVE_MS = 20000;
  const PROPS_TTL_MS = 15 * 60000;
  const DEF_TTL_MS = 6 * 3600000;

  const state = {
    showOpp: false,
    ui: { q: '', pos: 'ALL', win: 'all', sort: 'kickoff' },
    open: new Set(),
    justOpened: new Set(),
    rendered: new Map(),
    renderedKeys: '',
    nfl: null,
    people: new Map(),
    games: [],
    lines: {},
    linesKey: '',
    ladders: {},
    propsAt: new Map(),
    ranks: {},
    ranksAt: 0,
    proj: {},
    live: {},
    hits: new Set(),
    previewing: false,
    fresh: new Set(),
    loadedAt: 0,
    timers: [],
    liveTimer: null,
    busy: false,
    error: null
  };


  const MARKUP = `
    <header class="bar">
      <div class="title"><strong id="bt-week">Bets</strong></div>
      <div class="actions">
        <div class="tabs" id="bt-who">
          <button data-who="mine" class="tab on">Mine</button>
          <button data-who="all" class="tab">+ Opponents</button>
        </div>
        <button id="bt-refresh" class="icon" title="Refresh now" aria-label="Refresh now">↻</button>
      </div>
    </header>
    <div class="tool-scroll">
      <div class="bt-toolbar">
        <div class="bt-tool-row">
          <input id="bt-q" type="search" placeholder="Search player or team…" autocomplete="off" spellcheck="false">
          <select id="bt-win" title="Games"></select>
          <select id="bt-sort" title="Sort">
            <option value="kickoff">Kickoff</option>
            <option value="td">TD odds</option>
            <option value="hit">Hit rate</option>
            <option value="lean">Proj vs line</option>
            <option value="exposure">My leagues</option>
          </select>
        </div>
        <div class="bt-tool-row chips" id="bt-pos">
          <button class="chip" data-pos="ALL">All</button><button class="chip" data-pos="QB">QB</button><button class="chip" data-pos="RB">RB</button><button class="chip" data-pos="WR">WR</button><button class="chip" data-pos="TE">TE</button><button class="chip" data-pos="K">K</button>
          <button class="chip ghost" id="bt-toggle-all">Expand all</button>
        </div>
      </div>
      <p id="bt-error" class="error" hidden></p>
      <div id="bt-body"><div class="skel" role="status" aria-label="Loading lines for your starters"><i></i><i></i><i></i></div></div>
      <p class="bt-legal">Lines: Sleeper Picks payouts and DraftKings (via ESPN). For information only, not betting advice. 21+, gamble responsibly · 1-800-GAMBLER.</p>
    </div>
  `;

  async function loadPeople(userId, season, week) {
    const playing = (await api.leagues(userId, season)).filter(isPlaying);
    state.leagueCount = playing.length;
    const people = new Map();
    const add = (playerId, leagueName, side) => {
      if (!playerId || playerId === '0') return;
      if (!people.has(playerId)) people.set(playerId, []);
      people.get(playerId).push({ leagueName, side });
    };
    await Promise.all(playing.map(async (league) => {
      const [rosters, matchups] = await Promise.all([api.rosters(league.league_id), api.matchups(league.league_id, week)]);
      const own = rosterOf(rosters, userId);
      if (!own) return;
      const pair = NightOwl.tracker.pickMatchup(matchups || [], own.roster_id);
      if (!pair) return;
      const name = league.name.trim();
      pair.mine.starters.forEach((playerId) => add(playerId, name, 'me'));
      if (pair.opp) pair.opp.starters.forEach((playerId) => add(playerId, name, 'opp'));
    }));
    state.people = people;
  }

  async function loadProps(force) {
    const shownTeams = new Set([...state.people.keys()].map((playerId) => players.info(playerId).team));
    const games = state.games.filter((g) => g.state !== 'post' && g.id && (shownTeams.has(g.home) || shownTeams.has(g.away)));
    for (const g of games) {
      if (!force && Date.now() - (state.propsAt.get(g.id) || 0) < PROPS_TTL_MS) continue;
      try {
        const ladders = core.parseMilestones(await api.propBets(g.id));
        for (const [espnId, list] of Object.entries(ladders)) {
          const playerId = players.byEspn(espnId);
          if (playerId) state.ladders[playerId] = list;
        }
        state.propsAt.set(g.id, Date.now());
      } catch (error) {
        console.warn('[Night Owl bets] props unavailable for', g.id, error.message || error);
        state.propsAt.set(g.id, Date.now());
      }
    }
  }

  async function load(force) {
    const { userId } = await account.resolve();
    const saved = await storage.get('bets.settings', {});
    state.showOpp = !!saved.showOpp;
    if (saved.pos) state.ui.pos = saved.pos;
    if (saved.sort) state.ui.sort = saved.sort;

    await players.load();
    state.nfl = await api.state();
    const season = state.nfl.season;
    const week = displayWeek(state.nfl);
    const seasonType = seasonTypeOf(state.nfl);

    await loadPeople(userId, season, week);

    try {
      state.games = NightOwl.lineups.parseGames(await api.kickoffs(season, week, seasonType));
    } catch (error) {
      console.warn('[Night Owl bets] ESPN games unavailable, using Sleeper dates', error);
      state.games = NightOwl.lineups.gamesFromSchedule(await api.schedule(season, seasonType), week);
    }

    const key = `${season}-${seasonType}-${week}`;
    const stored = await storage.get('bets.lines', null);
    const previous = stored && stored.key === key ? stored.lines : {};
    let fresh = {};
    try { fresh = core.parseLines(await api.lines()); } catch (error) { console.warn('[Night Owl bets] Sleeper lines unavailable', error); }
    state.lines = core.mergeLines(previous, fresh);
    state.linesKey = key;
    await storage.set({ 'bets.lines': { key, lines: state.lines } });

    if (force || Date.now() - state.ranksAt > DEF_TTL_MS) {
      try {
        state.ranks = core.defenseRanks(await api.defenseSeason(season, seasonType));
        state.ranksAt = Date.now();
      } catch (error) { console.warn('[Night Owl bets] defense stats unavailable', error); }
    }

    try {
      const rows = await api.weekProjections(season, week, seasonType);
      state.proj = {};
      for (const r of rows) state.proj[r.player_id] = r.stats || {};
    } catch (error) { console.warn('[Night Owl bets] projections unavailable', error); }

    await loadProps(force);
    await loadLive();
    state.loadedAt = Date.now();
  }

  async function loadLive() {
    if (!state.nfl || !state.games.some((g) => g.state !== 'pre')) return;
    const rows = await api.weekStats(state.nfl.season, displayWeek(state.nfl), seasonTypeOf(state.nfl));
    const live = {};
    for (const r of rows) live[r.player_id] = r.stats || {};
    state.fresh = new Set();
    for (const [playerId, markets] of Object.entries(state.lines)) {
      if (!state.people.has(playerId)) continue;
      for (const m of markets) {
        const p = core.progress(m, live[playerId]);
        const k = `${playerId}:${m.type}`;
        if (p && p.hit && !state.hits.has(k)) {
          if (state.loadedAt) state.fresh.add(k);
          state.hits.add(k);
        }
      }
    }
    state.live = live;
  }

  async function refresh(force) {
    if (!root || state.busy) return;
    state.busy = true;
    $('bt-refresh').classList.add('spin');
    try {
      await load(force);
      state.error = null;
    } catch (error) {
      console.error('[Night Owl bets]', error);
      state.error = NightOwl.format.errorText(error);
    } finally {
      state.busy = false;
      if (root) $('bt-refresh').classList.remove('spin');
      render();
      scheduleLive();
    }
  }

  function scheduleLive() {
    clearTimeout(state.liveTimer);
    if (!root || !state.games.some((g) => g.state === 'in')) return;
    state.liveTimer = setTimeout(async () => {
      try { await loadLive(); render(); } catch (error) { console.warn('[Night Owl bets] live stats', error); }
      scheduleLive();
    }, LIVE_MS);
  }

  function face(playerId, team) {
    return `<img class="face" alt="" src="${teams.photo(playerId, team)}" style="border-color:${teams.colors(team).primary}">`;
  }

  function sparkline(recent, line) {
    const values = recent.map((r) => r.value).filter((v) => v != null);
    if (!values.length) return '';
    const top = Math.max(line * 1.4, ...values, 1);
    const bars = recent.map((r) => {
      const h = Math.max(6, Math.round((r.value / top) * 100));
      return `<i class="${r.value > line ? 'over' : ''}" style="height:${h}%" title="${escapeHtml(r.opponent || '')} ${escapeHtml(r.date || '')}: ${num(r.value)}"></i>`;
    }).join('');
    return `<span class="bt-spark">${bars}<b style="bottom:${Math.round((line / top) * 100)}%"></b></span>`;
  }

  function marketRow(playerId, m, inPlay) {
    const hr = core.hitRate(m.recent, m.line);
    const projected = core.statValue(state.proj[playerId], m.keys);
    const live = inPlay ? core.progress(m, state.live[playerId]) : null;
    const k = `${playerId}:${m.type}`;
    const lean = projected != null && !m.td && !m.max ? Math.round((projected - m.line) * 10) / 10 : null;
    const recentTitle = m.recent.map((r) => `${r.opponent || ''} ${num(r.value)}`).join(' · ');
    return `<div class="bt-tr${live && live.hit ? ' hit' : ''}${state.fresh.has(k) ? ' just-hit' : ''}">
      <span class="bt-td-lbl">${escapeHtml(m.label)}</span>
      <span class="bt-td-line">${num(m.line)}</span>
      <span class="bt-td-odds" title="Over pays ${m.over || '–'}× · ${m.pOver != null ? pct(m.pOver) : '–'} implied">${m.over ? core.american(m.over) : '–'}</span>
      <span class="bt-td-odds" title="Under pays ${m.under || '–'}×">${m.under ? core.american(m.under) : '–'}</span>
      <span class="bt-td-l10${hr && hr.over * 2 > hr.games ? ' good' : ''}" title="Last ${m.recent.length}: ${escapeHtml(recentTitle)}">${sparkline(m.recent, m.line)}${hr ? `${hr.over}/${hr.games}` : '–'}</span>
      <span class="bt-td-proj ${lean > 0 ? 'up' : lean < 0 ? 'down' : ''}" title="${projected != null ? `Sleeper projects ${num(projected)}` : 'No projection for this stat'}">${lean != null ? `${lean > 0 ? '+' : ''}${num(lean)}` : '–'}</span>
      ${live ? `<span class="bt-tr-live${live.hit ? ' hit' : ''}"><i style="width:${Math.round(live.pct * 100)}%"></i><em>${live.hit ? '✓ ' : ''}${num(live.value)} / ${num(live.line)}</em></span>` : ''}
    </div>`;
  }

  function ladderRow(playerId, ladder, inPlay) {
    const market = (state.lines[playerId] || []).find((m) => m.keys.join() === ladder.keys.join() && !m.max);
    const values = market ? market.recent.map((r) => r.value).filter((v) => v != null) : [];
    const liveValue = inPlay ? (core.statValue(state.live[playerId], ladder.keys) ?? 0) : null;
    const rungs = core.trimRungs(ladder.rungs, market ? market.line : null).map((r) => {
      const rate = values.length ? values.filter((v) => v >= r).length / values.length : null;
      const reached = liveValue != null && liveValue >= r;
      return `<span class="bt-rung${reached ? ' reached' : ''}" title="${rate != null ? `${r}+ in ${Math.round(rate * values.length)} of last ${values.length}` : `${r}+`}">
        ${r}+${rate != null ? `<small>${pct(rate)}</small>` : ''}</span>`;
    }).join('');
    return `<div class="bt-ladder"><span class="bt-ladder-lbl">${escapeHtml(ladder.label)}</span><div class="bt-rungs">${rungs}</div></div>`;
  }

  function context(p, game) {
    if (!game) return '';
    const opponent = game.home === p.team ? game.away : game.home;
    const at = game.home === p.team ? 'vs' : '@';
    const rank = state.ranks[opponent] && state.ranks[opponent][p.pos === 'DEF' ? 'QB' : p.pos];
    const imp = core.impliedTotals(game);
    const parts = [`<span class="bt-opp"><img alt="" src="${teams.logo(opponent)}">${at} ${escapeHtml(opponent)}</span>`];
    if (rank && p.pos !== 'DEF') {
      const tone = rank.rank <= 8 ? 'good' : rank.rank >= 25 ? 'bad' : '';
      parts.push(`<span class="bt-rank ${tone}" title="${escapeHtml(opponent)} allows ${rank.perGame} fantasy pts/game to ${escapeHtml(p.pos)}s">${core.ordinal(rank.rank)} most to ${escapeHtml(p.pos)}s</span>`);
    }
    if (imp && imp.teams[p.team] != null) parts.push(`<span class="bt-chip">Team total <b>${num(imp.teams[p.team])}</b></span>`);
    if (imp) parts.push(`<span class="bt-chip">O/U <b>${num(imp.total)}</b>${imp.favorite ? ` · ${escapeHtml(imp.favorite)} −${num(imp.spread)}` : ''}</span>`);
    return `<div class="bt-ctx">${parts.join('')}</div>`;
  }

  function detail(playerId, spots, game, inPlay) {
    const p = players.info(playerId);
    const markets = state.lines[playerId] || [];
    const ladders = state.ladders[playerId] || [];
    const others = markets.filter((m) => !m.td);
    const td = markets.find((m) => m.td && m.type === 'anytime_touchdowns');
    const tdHr = td ? core.hitRate(td.recent, 0.5) : null;
    const spotChips = spots.map((s) => `<span class="impact ${s.side === 'me' ? 'helps' : 'hurts'}">${escapeHtml(s.leagueName)} · ${s.side === 'me' ? 'you' : 'opp'}</span>`).join('');
    return `<div class="bt-detail">
      <div class="impacts">${spotChips}</div>
      ${td && td.over ? `<div class="bt-tdline">Anytime TD <b class="am">${core.american(td.over)}</b> · ${pct(td.pOver)} implied${tdHr ? ` · scored in ${tdHr.over} of last ${tdHr.games}` : ''}${td.under ? ` · No <b class="am">${core.american(td.under)}</b>` : ''}</div>` : ''}
      ${context(p, game)}
      ${others.length ? `<div class="bt-table">
        <div class="bt-tr bt-th"><span>Line</span><span></span><span>Over</span><span>Under</span><span>Last 10</span><span>Proj</span></div>
        ${others.map((m) => marketRow(playerId, m, inPlay)).join('')}
      </div>` : '<p class="muted small">No player lines posted yet.</p>'}
      ${ladders.length ? `<div class="bt-ladders"><span class="bt-sub">DraftKings milestones · hit rate last 10</span>${ladders.map((l) => ladderRow(playerId, l, inPlay)).join('')}</div>` : ''}
    </div>`;
  }

  function item(playerId, spots, game, showWindow) {
    const p = players.info(playerId);
    const markets = state.lines[playerId] || [];
    const td = markets.find((m) => m.type === 'anytime_touchdowns');
    const key = core.keyMarket(markets, p.pos);
    const inPlay = state.previewing || !!(game && game.state !== 'pre');
    const liveTd = td && inPlay ? core.progress(td, state.live[playerId]) : null;
    const keyLive = key && inPlay ? core.progress(key, state.live[playerId]) : null;
    const keyHr = key ? core.hitRate(key.recent, key.line) : null;
    const keyProj = key ? core.statValue(state.proj[playerId], key.keys) : null;
    const keyLean = key && keyProj != null && !key.max ? keyProj - key.line : null;
    const hits = inPlay ? markets.filter((m) => { const pr = core.progress(m, state.live[playerId]); return pr && pr.hit; }).length : 0;
    const mine = spots.filter((s) => s.side === 'me').length;
    const theirs = spots.length - mine;
    const open = state.open.has(playerId);
    const keyHtml = key
      ? `<span class="bt-key">${keyLive
        ? `<span class="bt-key-live${keyLive.hit ? ' hit' : ''}">${keyLive.hit ? '✓ ' : ''}${num(keyLive.value)}</span> <span class="bt-key-lbl">of ${num(key.line)} ${escapeHtml(key.label)}</span>`
        : `<span class="bt-key-lbl">${escapeHtml(key.label)}</span> <b>${num(key.line)}</b>${keyHr ? ` <span class="bt-key-hr${keyHr.over * 2 > keyHr.games ? ' good' : ''}">${keyHr.over}/${keyHr.games}</span>` : ''}${keyLean != null && Math.abs(keyLean) >= 0.5 ? ` <span class="bt-key-lean ${keyLean > 0 ? 'up' : 'down'}">${keyLean > 0 ? '▲' : '▼'}</span>` : ''}`}</span>`
      : `<span class="muted small">${inPlay ? escapeHtml(core.liveLine(p.pos, state.live[playerId]) || 'No line for this game') : 'No lines yet'}</span>`;
    const justCashed = markets.some((m) => state.fresh.has(`${playerId}:${m.type}`));
    return `<details class="bt-item${mine ? ' mine' : ' theirs'}${state.showOpp ? ' mixed' : ''}${justCashed ? ' cashing' : ''}${!key && !inPlay ? ' nolines' : ''}${state.justOpened.has(playerId) ? ' opening' : ''}" data-key="p:${escapeHtml(playerId)}" data-pid="${escapeHtml(playerId)}" style="--tc:${teams.colors(p.team).primary}"${open ? ' open' : ''}>
      <summary>
        ${face(playerId, p.team)}
        <span class="bt-sum">
          <span class="bt-sum-top"><span class="ev-name">${escapeHtml(p.name)}</span><span class="muted small">${escapeHtml(p.pos)} · ${escapeHtml(p.team)}${showWindow && game ? ` · ${escapeHtml(timeOf(game.kickoff))}` : ''}</span></span>
          <span class="bt-sum-bot">${keyHtml}
            ${mine > 1 ? `<span class="bt-exp you" title="Starting in ${mine} of your leagues">${mine} leagues</span>` : ''}${theirs && (state.showOpp || !mine) ? `<span class="bt-exp opp" title="Starting for ${theirs} opponent${theirs > 1 ? 's' : ''}">opp ×${theirs}</span>` : ''}
            ${hits ? `<span class="bt-exp hit">✓ ${hits} hit</span>` : ''}</span>
        </span>
        ${td && td.over ? `<span class="bt-atd${liveTd && liveTd.hit ? ' hit' : ''}" title="Anytime TD ${core.american(td.over)} · ${pct(td.pOver)}"><b>${liveTd && liveTd.hit ? '✓ TD' : core.american(td.over)}</b><small>${liveTd && liveTd.hit ? 'scored' : `ATD ${pct(td.pOver)}`}</small></span>` : '<span></span>'}
        <span class="bt-chev">›</span>
      </summary>
      ${open ? detail(playerId, spots, game, inPlay) : ''}
    </details>`;
  }

  const SORT_LABELS = { kickoff: 'Kickoff', td: 'TD odds', hit: 'Hit rate', lean: 'Proj vs line', exposure: 'My leagues' };

  function renderToolbar(wins) {
    const ui = state.ui;
    const option = (id, label) => `<option value="${id}"${ui.win === id ? ' selected' : ''}>${label}</option>`;
    dom.setHtml($('bt-win'), [option('all', 'All games')]
      .concat(wins.some((w) => w.games.some((g) => g.state === 'in')) ? [option('live', 'Live now')] : [])
      .concat(wins.filter((w) => !w.games.every((g) => g.state === 'post')).map((w) => option(String(w.kickoff), w.approx ? new Date(w.kickoff).toLocaleDateString([], { weekday: 'short' }) : dayTimeShort(w.kickoff))))
      .join(''));
    for (const b of $('bt-pos').children) b.classList.toggle('on', b.dataset.pos === ui.pos);
    $('bt-sort').value = ui.sort;
    $('bt-toggle-all').textContent = state.open.size ? 'Collapse all' : 'Expand all';
    root.style.setProperty('--bt-tb', `${root.querySelector('.bt-toolbar').offsetHeight}px`);
  }

  function render() {
    if (!root) return;
    $('bt-error').hidden = !state.error;
    $('bt-error').textContent = state.error || '';
    if (state.nfl) $('bt-week').textContent = `Week ${displayWeek(state.nfl)}`;
    for (const b of $('bt-who').children) b.classList.toggle('on', (b.dataset.who === 'all') === state.showOpp);
    if (!state.loadedAt) {
      if (state.error) $('bt-body').innerHTML = '';
      return;
    }

    const ui = state.ui;
    const gameOf = new Map();
    for (const g of state.games) { gameOf.set(g.home, g); gameOf.set(g.away, g); }
    const wins = windowsOf(state.games);
    const phaseOf = (w) => (w.games.some((g) => g.state === 'in') ? 0 : w.games.every((g) => g.state === 'post') ? 2 : 1);
    const winOf = (team) => wins.find((w) => w.teams.has(team));
    renderToolbar(wins);

    const q = ui.q.trim().toLowerCase();
    const rows = [...state.people]
      .filter(([, spots]) => state.showOpp || spots.some((s) => s.side === 'me'))
      .map(([playerId, spots]) => ({ pid: playerId, spots, p: players.info(playerId) }))
      .map((r) => Object.assign(r, { game: gameOf.get(r.p.team), win: winOf(r.p.team) }))
      .filter((r) => r.win)
      .filter((r) => ui.pos === 'ALL' || r.p.pos === ui.pos)
      .filter((r) => !q || r.p.name.toLowerCase().includes(q) || r.p.team.toLowerCase() === q)
      .filter((r) => ui.win === 'all' || (ui.win === 'live' ? phaseOf(r.win) === 0 : String(r.win.kickoff) === ui.win));

    const mineFirst = (a, b) => (b.spots.some((s) => s.side === 'me') - a.spots.some((s) => s.side === 'me')) || b.spots.length - a.spots.length;
    const blocks = [];
    const header = (key, inner, count) => blocks.push({ key, html: `<h3 class="bt-group-h" data-key="${escapeHtml(key)}">${inner}<span>${count}</span></h3>` });
    if (ui.sort === 'kickoff') {
      const sortedWins = wins.slice().sort((a, b) => phaseOf(a) - phaseOf(b) || a.kickoff - b.kickoff);
      for (const w of sortedWins) {
        const list = rows.filter((r) => r.win === w).sort(mineFirst);
        if (!list.length) continue;
        const phase = phaseOf(w);
        const tag = phase === 0 ? '<span class="live-tag">LIVE</span> ' : phase === 2 ? '<span class="muted">Final · </span>' : '';
        header(`g:${w.kickoff}`, `${tag}${escapeHtml(windowTitle(w))}`, list.length);
        for (const r of list) blocks.push({ key: `p:${r.pid}`, html: item(r.pid, r.spots, r.game, false) });
      }
    } else {
      const score = (r) => (ui.sort === 'exposure'
        ? r.spots.filter((s) => s.side === 'me').length * 10 - r.spots.filter((s) => s.side === 'opp').length
        : core.SORTS[ui.sort](state.lines[r.pid], state.proj[r.pid]));
      const list = rows.slice().sort((a, b) => score(b) - score(a) || mineFirst(a, b));
      if (list.length) header(`s:${ui.sort}`, `Sorted by ${escapeHtml(SORT_LABELS[ui.sort])}`, list.length);
      for (const r of list) blocks.push({ key: `p:${r.pid}`, html: item(r.pid, r.spots, r.game, true) });
    }
    patch(blocks, q || ui.pos !== 'ALL' || ui.win !== 'all');
    state.justOpened.clear();
  }

  function patch(blocks, filtered) {
    const body = $('bt-body');
    const keys = blocks.map((b) => b.key).join('|');
    if (!blocks.length) {
      body.innerHTML = `<p class="muted small empty">${filtered ? 'No players match these filters.' : (state.leagueCount === 0 ? 'No in-season leagues right now.' : 'None of your starters have games left this week.')}</p>`;
      state.rendered = new Map();
      state.renderedKeys = '';
      return;
    }
    if (keys !== state.renderedKeys) {
      body.innerHTML = blocks.map((b) => b.html).join('');
    } else {
      const tpl = document.createElement('template');
      for (const b of blocks) {
        if (state.rendered.get(b.key) === b.html) continue;
        const element = body.querySelector(`[data-key="${CSS.escape(b.key)}"]`);
        if (!element) continue;
        tpl.innerHTML = b.html;
        element.replaceWith(tpl.content.firstElementChild);
      }
    }
    state.rendered = new Map(blocks.map((b) => [b.key, b.html]));
    state.renderedKeys = keys;
  }

  async function saveUi() {
    await storage.set({ 'bets.settings': { showOpp: state.showOpp, pos: state.ui.pos, sort: state.ui.sort } });
  }

  function preview() {
    if (!state.loadedAt) return;
    const real = state.live;
    const realHits = state.hits;
    const fake = {};
    for (const [playerId, markets] of Object.entries(state.lines)) {
      if (!state.people.has(playerId)) continue;
      const s = (fake[playerId] = {});
      for (const m of markets) {
        const share = 0.35 + Math.random() * 0.95;
        const target = (m.td ? 1 : m.line) * share;
        m.keys.forEach((k, i) => { s[k] = Math.round((i === 0 ? target : 0) * 10) / 10; });
      }
    }
    state.live = fake;
    state.previewing = true;
    state.hits = new Set();
    state.fresh = new Set();
    for (const [playerId, markets] of Object.entries(state.lines)) {
      for (const m of markets) {
        const p = core.progress(m, fake[playerId]);
        if (p && p.hit) state.fresh.add(`${playerId}:${m.type}`);
      }
    }
    render();
    setTimeout(() => { state.live = real; state.hits = realHits; state.fresh = new Set(); state.previewing = false; render(); }, 10000);
  }

  function mount(element) {
    if (root === element) return;
    root = element;
    root.classList.add('tool', 'intro');
    setTimeout(() => element.classList.remove('intro'), 1600);
    root.innerHTML = MARKUP;
    $('bt-refresh').addEventListener('click', () => refresh(true));
    root.querySelector('.title strong').title = 'Double-click to preview live tracking';
    root.querySelector('.title strong').addEventListener('dblclick', preview);
    $('bt-who').addEventListener('click', async (e) => {
      const who = e.target.dataset && e.target.dataset.who;
      if (!who) return;
      state.showOpp = who === 'all';
      await saveUi();
      render();
    });
    $('bt-q').addEventListener('input', (e) => { state.ui.q = e.target.value; render(); });
    $('bt-sort').addEventListener('change', async (e) => { state.ui.sort = e.target.value; await saveUi(); render(); });
    $('bt-pos').addEventListener('click', async (e) => {
      if (e.target.id === 'bt-toggle-all') {
        if (state.open.size) state.open.clear();
        else root.querySelectorAll('.bt-item').forEach((d) => state.open.add(d.dataset.pid));
        render();
        return;
      }
      const pos = e.target.dataset && e.target.dataset.pos;
      if (!pos) return;
      state.ui.pos = pos;
      await saveUi();
      render();
    });
    $('bt-win').addEventListener('change', (e) => {
      state.ui.win = e.target.value;
      render();
    });
    $('bt-body').addEventListener('toggle', (e) => {
      const d = e.target;
      if (!d.classList || !d.classList.contains('bt-item')) return;
      const playerId = d.dataset.pid;
      if (d.open === state.open.has(playerId)) return;
      if (d.open) { state.open.add(playerId); state.justOpened.add(playerId); } else state.open.delete(playerId);
      render();
    }, true);
    state.timers.push(setInterval(() => refresh(false), REFRESH_MS));
    render();
    refresh(false);
  }

  storage.onChanged((changes) => {
    if (changes.settings && root) refresh(true);
  });

  function unmount() {
    state.timers.forEach(clearInterval);
    state.timers = [];
    clearTimeout(state.liveTimer);
    root = null;
  }

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.bets = { mount, unmount };
})(globalThis.NightOwl);
