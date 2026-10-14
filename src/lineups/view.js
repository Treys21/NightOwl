globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, scoring, teams, players, storage, account, dom } = NightOwl;
  const { escape: escapeHtml, tenths: fmt, windowTitle, countdown } = NightOwl.format;
  const { isPlaying, mine, startingSlots, slotLabel, lookaheadWeek, seasonType: seasonTypeOf, teamUrl } = NightOwl.leagues;
  const core = NightOwl.lineups;
  let root = null;
  const $ = (id) => root.querySelector(`#${id}`);

  const REFRESH_MS = 60000;
  const TICK_MS = 30000;
  const PROJ_TTL_MS = 15 * 60000;
  const KICKOFF_TTL_MS = 5 * 60000;

  const state = {
    excluded: new Set(),
    nfl: null,
    leagues: [],
    games: [],
    gamesAt: 0,
    proj: {},
    projAt: 0,
    loadedAt: 0,
    open: new Set(),
    timers: [],
    busy: false,
    error: null
  };


  const MARKUP = `
    <header class="bar">
      <div class="title"><strong id="lu-week">Lineups</strong><span id="lu-sub" class="muted small"></span></div>
      <div class="actions"><button id="lu-refresh" class="icon" title="Refresh now" aria-label="Refresh now">↻</button></div>
    </header>
    <div class="tool-scroll">
      <p id="lu-error" class="error" hidden></p>
      <div id="lu-body"><div class="skel" role="status" aria-label="Loading your rosters"><i></i><i></i><i></i></div></div>
    </div>
  `;

  async function load(force) {
    const { userId } = await account.resolve();
    state.excluded = await account.excluded();

    await players.load();
    state.nfl = await api.state();
    const season = state.nfl.season;
    const week = lookaheadWeek(state.nfl);
    const seasonType = seasonTypeOf(state.nfl);

    const playing = (await api.leagues(userId, season)).filter(isPlaying);
    state.leagues = (await Promise.all(playing.map(async (league) => {
      const [rosters, matchups] = await Promise.all([api.rosters(league.league_id), api.matchups(league.league_id, week)]);
      const own = mine(rosters, userId);
      if (!own) return null;
      const set = (matchups || []).find((m) => m.roster_id === own.roster_id);
      const roster = set
        ? Object.assign({}, own, { starters: set.starters || own.starters, players: set.players || own.players })
        : own;
      return {
        leagueId: league.league_id,
        name: league.name.trim(),
        slots: startingSlots(league),
        scoring: league.scoring_settings || {},
        roster
      };
    }))).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));

    if (force || Date.now() - state.gamesAt > KICKOFF_TTL_MS) {
      try {
        state.games = core.parseGames(await api.kickoffs(season, week, seasonType));
      } catch (error) {
        console.warn('[Night Owl lineups] ESPN kickoffs unavailable, using Sleeper dates', error);
        state.games = core.gamesFromSchedule(await api.schedule(season, seasonType), week);
      }
      state.gamesAt = Date.now();
    }
    if (force || Date.now() - state.projAt > PROJ_TTL_MS) {
      const rows = await api.weekProjections(season, week, seasonType, api.positionsFor(state.leagues.map((league) => league.slots)));
      state.proj = {};
      for (const r of rows) state.proj[r.player_id] = r.stats || {};
      state.projAt = Date.now();
    }
    state.loadedAt = Date.now();
  }

  async function refresh(force) {
    if (!root || state.busy) return;
    state.busy = true;
    $('lu-refresh').classList.add('spin');
    try {
      await load(force);
      state.error = null;
    } catch (error) {
      console.error('[Night Owl lineups]', error);
      state.error = NightOwl.format.errorText(error);
    } finally {
      state.busy = false;
      if (root) $('lu-refresh').classList.remove('spin');
      render();
    }
  }

  function ring(kickoff, soon) {
    const left = Math.max(0, Math.min(1, (kickoff - Date.now()) / (12 * 3600000)));
    const c = 2 * Math.PI * 9;
    return `<svg class="lu-ring${soon ? ' soon' : ''}" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" class="track"/>
      <circle cx="12" cy="12" r="9" class="fill" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - left)}"/>
    </svg>`;
  }

  function windowLabel(w) {
    if (w.approx) {
      const day = new Date(w.kickoff).toLocaleDateString([], { weekday: 'short' });
      return `${day} · ${w.games.length} game${w.games.length > 1 ? 's' : ''} · times unavailable`;
    }
    return windowTitle(w);
  }

  function computed() {
    const now = Date.now();
    const kickoffByTeam = new Map();
    for (const g of state.games) { kickoffByTeam.set(g.home, g.kickoff); kickoffByTeam.set(g.away, g.kickoff); }
    const kickoffOf = (t) => (kickoffByTeam.has(t) ? kickoffByTeam.get(t) : null);
    const projected = (playerId, sc) => scoring.points(state.proj[playerId], sc);
    const leagues = state.leagues
      .filter((league) => !state.excluded.has(league.leagueId))
      .map((league) => Object.assign({}, league, core.lineup(league, league.roster, players.info, projected, kickoffOf, now)));
    return { leagues, wins: core.windows(state.games).filter((w) => !w.started && w.kickoff > now) };
  }

  function optionsList(r) {
    if (!r.options || !r.options.length) return '';
    const anyGain = r.options.some((o) => o.gain > 0);
    const [label, unit] = !anyGain && r.status === 'start' ? ['Backup if he sits', 'proj']
      : [r.status === 'start' ? 'Swap out for' : 'Start over', anyGain ? 'pts gained' : 'pts lost'];
    const chip = (o) => {
      const cls = o.gain > 0 ? 'up' : o.gain < 0 ? 'down' : '';
      const effect = o.gain > 0 ? `gains ${fmt(o.gain)}` : o.gain < 0 ? `loses ${fmt(-o.gain)}` : 'is a wash';
      const where = o.via
        ? `${escapeHtml(slotLabel(o.slot))} (${escapeHtml(o.via.name)} moves to ${escapeHtml(slotLabel(o.via.slot))})`
        : escapeHtml(slotLabel(o.slot));
      const title = r.status === 'start'
        ? `Benching ${r.name} for ${o.name} (${fmt(o.proj)} proj) ${effect}`
        : `Starting ${r.name} over ${o.name} (${fmt(o.proj)} proj) ${effect}`;
      return `<span class="lu-opt ${cls}" title="${escapeHtml(title)}${o.via ? ` (${escapeHtml(o.via.name)} slides to ${escapeHtml(slotLabel(o.via.slot))})` : ''}">
        <b>${escapeHtml(o.name)}</b><span class="lu-opt-slot">${where}</span>${!anyGain && r.status === 'start'
    ? `<span class="lu-gain">${fmt(o.proj)}</span>`
    : `<span class="lu-gain ${cls}">${o.gain > 0 ? '+' : o.gain < 0 ? '−' : '±'}${fmt(Math.abs(o.gain))}</span>`}</span>`;
    };
    const shown = anyGain ? 3 : 1;
    const top = r.options.slice(0, shown).map(chip).join('');
    const rest = r.options.slice(shown);
    return `<div class="lu-opts${anyGain ? '' : ' quiet'}"><span class="lu-opts-label"><span>${label}</span><span>${unit}</span></span>${top}${rest.length
      ? `<details class="lu-more"><summary>+${rest.length} more</summary>${rest.map(chip).join('')}</details>` : ''}</div>`;
  }

  function bestBanner(league) {
    if (!league.best || !league.best.moves.length) return '';
    const verb = { start: 'Start', move: 'Slide', bench: 'Bench' };
    return `<div class="lu-best">
      <div class="lu-best-head"><span>Optimal lineup</span><span class="lu-best-gain">+${fmt(league.best.gain)} proj</span></div>
      <div class="lu-best-moves">${league.best.moves.map((m) => `<span class="lu-move ${m.type}">${verb[m.type]} <b>${escapeHtml(m.name)}</b>${m.slot ? ` → ${escapeHtml(slotLabel(m.slot))}` : ''}</span>`).join('')}</div>
    </div>`;
  }

  function playerRow(league, r) {
    const tag = r.status === 'start'
      ? `<span class="lu-pill start">${escapeHtml(slotLabel(r.slot))}</span>`
      : `<span class="lu-pill ${r.status}">${r.status === 'ir' ? 'IR' : r.status === 'taxi' ? 'TAXI' : 'BENCH'}</span>`;
    const inj = r.injury ? `<span class="lu-inj ${core.OUT.has(r.injury) ? 'out' : ''}">${escapeHtml(r.injury === 'Questionable' ? 'Q' : r.injury)}</span>` : '';
    const head = teams.photo(r.pid, r.team);
    const notes = r.notes.map((n) => `<div class="lu-note ${n.kind}">${n.kind === 'swap' ? '⇄' : '⚠'} ${escapeHtml(n.text)}</div>`).join('');
    const opts = optionsList(r);
    return `<li class="lu-row ${r.status}${r.notes.some((n) => n.kind !== 'info') ? ' flagged' : ''}" style="--tc:${teams.colors(r.team).primary}">
      <img class="lu-head" alt="" src="${head}" style="border-color:${teams.colors(r.team).primary}">
      <div class="lu-main">
        <div><span class="lu-name">${escapeHtml(r.name)}</span> <span class="muted small">${escapeHtml(r.pos)} · ${escapeHtml(r.team)}</span> ${inj}</div>
      </div>
      <div class="lu-side">${tag}<span class="lu-proj">${fmt(r.proj)}</span>${r.inBest && league.best && league.best.moves.length ? '<span class="lu-inbest" title="In the optimal lineup">★ best</span>' : ''}</div>
      <div class="lu-extra">${notes}${opts}</div>
    </li>`;
  }

  function leagueBlock(league, rows, showBest) {
    const flags = rows.filter((r) => r.notes.some((n) => n.kind !== 'info')).length;
    return `<div class="lu-league">
      <div class="lu-league-head">
        <span class="lname">${escapeHtml(league.name)}</span>
        ${flags ? `<span class="lu-flagcount">${flags} to fix</span>` : ''}
        <a class="lu-edit" href="${teamUrl(league.leagueId)}">Edit lineup ↗</a>
      </div>
      ${showBest ? bestBanner(league) : ''}
      <ol class="lu-list">${rows.map((r) => playerRow(league, r)).join('')}</ol>
    </div>`;
  }

  const ORDER = { start: 0, bench: 1, taxi: 2, ir: 3 };
  const sortRows = (rows) => rows.slice().sort((a, b) => ORDER[a.status] - ORDER[b.status] || (a.slotIndex ?? 99) - (b.slotIndex ?? 99) || b.proj - a.proj);

  function render() {
    if (!root) return;
    $('lu-error').hidden = !state.error;
    $('lu-error').textContent = state.error || '';
    if (state.nfl) {
      $('lu-week').textContent = `Week ${lookaheadWeek(state.nfl)}`;
      $('lu-sub').textContent = lookaheadWeek(state.nfl) > (state.nfl.display_week || 0) ? 'upcoming' : '';
    }
    if (!state.loadedAt) {
      if (state.error) $('lu-body').innerHTML = '';
      return;
    }

    const { leagues, wins } = computed();
    const html = [];

    const byes = leagues.flatMap((league) => league.rows.filter((r) => r.status === 'start' && r.bye).map((r) => ({ lg: league, r })));
    const empties = leagues.filter((league) => league.empty.length);
    if (byes.length || empties.length) {
      html.push(`<div class="lu-alert">
        <strong>Fix before kickoff</strong>
        ${byes.map(({ lg: league, r }) => `<div>${escapeHtml(r.name)} is on bye but starting in <a href="${teamUrl(league.leagueId)}">${escapeHtml(league.name)}</a></div>`).join('')}
        ${empties.map((league) => `<div>Empty ${escapeHtml(league.empty.join(', '))} slot${league.empty.length > 1 ? 's' : ''} in <a href="${teamUrl(league.leagueId)}">${escapeHtml(league.name)}</a></div>`).join('')}
      </div>`);
    }

    const shownWins = leagues.length ? wins : [];
    if (!leagues.length) html.push('<p class="muted small empty">No in-season leagues right now.</p>');
    else if (!wins.length) html.push('<p class="muted small empty">Every game this week has kicked off. Lineups are locked.</p>');

    const bannered = new Set();
    shownWins.forEach((w, i) => {
      const blocks = [];
      let starting = 0;
      let benched = 0;
      let flags = 0;
      let better = 0;
      for (const league of leagues) {
        const rows = sortRows(league.rows.filter((r) => w.teams.has(r.team)));
        if (!rows.length) continue;
        starting += rows.filter((r) => r.status === 'start').length;
        benched += rows.filter((r) => r.status === 'bench').length;
        flags += rows.filter((r) => r.notes.some((n) => n.kind !== 'info')).length;
        if (!bannered.has(league.leagueId) && league.best && league.best.moves.length) better++;
        blocks.push(leagueBlock(league, rows, !bannered.has(league.leagueId)));
        bannered.add(league.leagueId);
      }
      const open = i === 0 || state.open.has(w.kickoff);
      const soon = w.kickoff - Date.now() < 3600000;
      const toFix = flags + (i === 0 ? byes.length + empties.length : 0);
      const allSet = i === 0 && blocks.length && !toFix && !better;
      const logos = w.games.slice(0, 8).map((g) => `<span class="lu-game"><img alt="" src="${teams.logo(g.away)}"><img alt="" src="${teams.logo(g.home)}"></span>`).join('');
      html.push(`<details class="lu-window${i === 0 ? ' next' : ''}" data-k="${w.kickoff}"${open ? ' open' : ''}>
        <summary>
          ${i === 0 ? '<span class="lu-eyebrow">Next lock</span>' : ''}
          <div class="lu-when">
            <span class="lu-label">${escapeHtml(windowLabel(w))}</span>
            ${w.approx ? '' : `<span class="lu-lock${soon ? ' soon' : ''}">${w.kickoff - Date.now() < 12 * 3600000 ? ring(w.kickoff, soon) : ''}locks in ${countdown(w.kickoff)}</span>`}
          </div>
          <div class="lu-meta">
            <div class="lu-games">${logos}</div>
            <div class="lu-counts">${starting} starting · ${benched} benched${toFix ? ` · <span class="lu-flagcount">${toFix} to fix</span>` : ''}${allSet ? '<span class="lu-allset">✓ All set</span>' : ''}</div>
          </div>
        </summary>
        ${blocks.length ? `<div class="lu-leagues">${blocks.join('')}</div>` : '<p class="muted small empty">Nobody on your rosters plays in this window.</p>'}
      </details>`);
    });

    dom.setHtml($('lu-body'), html.join(''));
  }

  function mount(element) {
    if (root === element) return;
    root = element;
    root.classList.add('tool', 'intro');
    setTimeout(() => element.classList.remove('intro'), 1600);
    root.innerHTML = MARKUP;
    $('lu-refresh').addEventListener('click', () => refresh(true));
    $('lu-body').addEventListener('toggle', (e) => {
      const k = Number(e.target.dataset && e.target.dataset.k);
      if (!k) return;
      if (e.target.open) state.open.add(k); else state.open.delete(k);
    }, true);
    state.timers.push(setInterval(() => refresh(false), REFRESH_MS));
    state.timers.push(setInterval(render, TICK_MS));
    render();
    refresh(false);
  }

  storage.onChanged((changes) => {
    if (changes.settings && root) refresh(true);
  });

  function unmount() {
    state.timers.forEach(clearInterval);
    state.timers = [];
    root = null;
  }

  document.addEventListener('visibilitychange', () => {
    if (root && !document.hidden && Date.now() - state.loadedAt > 10000) refresh(false);
  });

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.lineups = { mount, unmount };
})(globalThis.NightOwl);
