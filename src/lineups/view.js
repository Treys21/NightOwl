// Lineups tool for the floating panel: walks the week's kickoff windows in
// order and, for the next one to lock, shows every player you roster from
// those teams — starting or benched, in every league — with swaps worth a
// look. Lineups are edited in Sleeper itself; each league links straight there.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, scoring, teams, players, storage, account, dom } = NightOwl;
  const { escape: esc, tenths: fmt, windowTitle, countdown } = NightOwl.format;
  const { isPlaying, mine, startingSlots, slotLabel, lookaheadWeek, seasonType: seasonTypeOf, teamUrl } = NightOwl.leagues;
  const core = NightOwl.lineups;
  let root = null;
  const $ = (id) => root.querySelector(`#${id}`);

  const REFRESH_MS = 60000; // you may be editing lineups in this very tab
  const TICK_MS = 30000; // countdowns
  const PROJ_TTL_MS = 15 * 60000;
  const KICKOFF_TTL_MS = 5 * 60000;

  const state = {
    excluded: new Set(),
    nfl: null,
    leagues: [], // [{ leagueId, name, slots, scoring, roster }]
    games: [],
    gamesAt: 0,
    proj: {},
    projAt: 0,
    loadedAt: 0,
    open: new Set(), // window kickoffs the user expanded
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

  // ---- data -------------------------------------------------------------
  async function load(force) {
    const { userId } = await account.resolve();
    state.excluded = await account.excluded();

    await players.load();
    state.nfl = await api.state();
    const season = state.nfl.season;
    // Lineups look ahead: Sleeper moves `week` on as soon as the last game
    // ends, while `display_week` stays on the finished week until midweek.
    const week = lookaheadWeek(state.nfl);
    const seasonType = seasonTypeOf(state.nfl);

    const playing = (await api.leagues(userId, season)).filter(isPlaying);
    state.leagues = (await Promise.all(playing.map(async (lg) => {
      const [rosters, matchups] = await Promise.all([api.rosters(lg.league_id), api.matchups(lg.league_id, week)]);
      const own = mine(rosters, userId);
      if (!own) return null;
      // The week's matchup holds the lineup you actually set; the roster's own
      // `starters` can lag behind it (it still showed a benched player and an
      // empty slot that had been filled).
      const set = (matchups || []).find((m) => m.roster_id === own.roster_id);
      const roster = set
        ? Object.assign({}, own, { starters: set.starters || own.starters, players: set.players || own.players })
        : own;
      return {
        leagueId: lg.league_id,
        name: lg.name.trim(),
        slots: startingSlots(lg),
        scoring: lg.scoring_settings || {},
        roster
      };
    }))).filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));

    if (force || Date.now() - state.gamesAt > KICKOFF_TTL_MS) {
      try {
        state.games = core.parseGames(await api.kickoffs(season, week, seasonType));
      } catch (err) {
        console.warn('[Night Owl lineups] ESPN kickoffs unavailable, using Sleeper dates', err);
        state.games = core.gamesFromSchedule(await api.schedule(season, seasonType), week);
      }
      state.gamesAt = Date.now();
    }
    if (force || Date.now() - state.projAt > PROJ_TTL_MS) {
      const rows = await api.weekProjections(season, week, seasonType, api.positionsFor(state.leagues.map((lg) => lg.slots)));
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
    } catch (err) {
      console.error('[Night Owl lineups]', err);
      state.error = err.message || String(err);
    } finally {
      state.busy = false;
      if (root) $('lu-refresh').classList.remove('spin');
      render();
    }
  }

  // ---- view -------------------------------------------------------------

  // A ring that empties over the last 12 hours before lock.
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
    const projected = (pid, sc) => scoring.points(state.proj[pid], sc);
    const leagues = state.leagues
      .filter((lg) => !state.excluded.has(lg.leagueId))
      .map((lg) => Object.assign({}, lg, core.lineup(lg, lg.roster, players.info, projected, kickoffOf, now)));
    return { leagues, wins: core.windows(state.games).filter((w) => !w.started && w.kickoff > now) };
  }

  // Every valid swap for this player, best first: the top few as chips, the
  // rest behind "+N more". Each chip's number is what that swap would do to
  // your lineup's projection: teal + means the swap helps, grey − means it hurts.
  function optionsList(r) {
    if (!r.options || !r.options.length) return '';
    // With nothing to gain, the list is a backup plan: show projections, not
    // a row of negative "gains".
    const anyGain = r.options.some((o) => o.gain > 0);
    // What the list is (left) and what its numbers are (right, over them).
    const [label, unit] = !anyGain && r.status === 'start' ? ['Backup if he sits', 'proj']
      : [r.status === 'start' ? 'Swap out for' : 'Start over', anyGain ? 'pts gained' : 'pts lost'];
    const chip = (o) => {
      const cls = o.gain > 0 ? 'up' : o.gain < 0 ? 'down' : '';
      const effect = o.gain > 0 ? `gains ${fmt(o.gain)}` : o.gain < 0 ? `loses ${fmt(-o.gain)}` : 'is a wash';
      const where = o.via
        ? `${esc(slotLabel(o.slot))} (${esc(o.via.name)} moves to ${esc(slotLabel(o.via.slot))})`
        : esc(slotLabel(o.slot));
      const title = r.status === 'start'
        ? `Benching ${r.name} for ${o.name} (${fmt(o.proj)} proj) ${effect}`
        : `Starting ${r.name} over ${o.name} (${fmt(o.proj)} proj) ${effect}`;
      return `<span class="lu-opt ${cls}" title="${esc(title)}${o.via ? ` (${esc(o.via.name)} slides to ${esc(slotLabel(o.via.slot))})` : ''}">
        <b>${esc(o.name)}</b><span class="lu-opt-slot">${where}</span>${!anyGain && r.status === 'start'
    ? `<span class="lu-gain">${fmt(o.proj)}</span>`
    : `<span class="lu-gain ${cls}">${o.gain > 0 ? '+' : o.gain < 0 ? '−' : '±'}${fmt(Math.abs(o.gain))}</span>`}</span>`;
    };
    const top = r.options.slice(0, 3).map(chip).join('');
    const rest = r.options.slice(3);
    return `<div class="lu-opts${anyGain ? '' : ' quiet'}"><span class="lu-opts-label"><span>${label}</span><span>${unit}</span></span>${top}${rest.length
      ? `<details class="lu-more"><summary>+${rest.length} more</summary>${rest.map(chip).join('')}</details>` : ''}</div>`;
  }

  // The solver's verdict for one league: the exact moves to the best lineup.
  function bestBanner(lg) {
    if (!lg.best || !lg.best.moves.length) return '';
    const verb = { start: 'Start', move: 'Slide', bench: 'Bench' };
    return `<div class="lu-best">
      <div class="lu-best-head"><span>Optimal lineup</span><span class="lu-best-gain">+${fmt(lg.best.gain)} proj</span></div>
      <div class="lu-best-moves">${lg.best.moves.map((m) => `<span class="lu-move ${m.type}">${verb[m.type]} <b>${esc(m.name)}</b>${m.slot ? ` → ${esc(slotLabel(m.slot))}` : ''}</span>`).join('')}</div>
    </div>`;
  }

  function playerRow(lg, r) {
    const tag = r.status === 'start'
      ? `<span class="lu-pill start">${esc(slotLabel(r.slot))}</span>`
      : `<span class="lu-pill ${r.status}">${r.status === 'ir' ? 'IR' : r.status === 'taxi' ? 'TAXI' : 'BENCH'}</span>`;
    const inj = r.injury ? `<span class="lu-inj ${core.OUT.has(r.injury) ? 'out' : ''}">${esc(r.injury === 'Questionable' ? 'Q' : r.injury)}</span>` : '';
    const head = teams.photo(r.pid, r.team);
    const notes = r.notes.map((n) => `<div class="lu-note ${n.kind}">${n.kind === 'swap' ? '⇄' : '⚠'} ${esc(n.text)}</div>`).join('');
    const opts = optionsList(r);
    return `<li class="lu-row ${r.status}${r.notes.some((n) => n.kind !== 'info') ? ' flagged' : ''}" style="--tc:${teams.colors(r.team).primary}">
      <img class="lu-head" alt="" src="${head}" style="border-color:${teams.colors(r.team).primary}">
      <div class="lu-main">
        <div><span class="lu-name">${esc(r.name)}</span> <span class="muted small">${esc(r.pos)} · ${esc(r.team)}</span> ${inj}</div>
      </div>
      <div class="lu-side">${tag}<span class="lu-proj">${fmt(r.proj)}</span>${r.inBest && lg.best && lg.best.moves.length ? '<span class="lu-inbest" title="In the optimal lineup">★ best</span>' : ''}</div>
      <div class="lu-extra">${notes}${opts}</div>
    </li>`;
  }

  function leagueBlock(lg, rows, showBest) {
    const flags = rows.filter((r) => r.notes.some((n) => n.kind !== 'info')).length;
    return `<div class="lu-league">
      <div class="lu-league-head">
        <span class="lname">${esc(lg.name)}</span>
        ${flags ? `<span class="lu-flagcount">${flags} to fix</span>` : ''}
        <a class="lu-edit" href="${teamUrl(lg.leagueId)}">Edit lineup ↗</a>
      </div>
      ${showBest ? bestBanner(lg) : ''}
      <ol class="lu-list">${rows.map((r) => playerRow(lg, r)).join('')}</ol>
    </div>`;
  }

  // Starting and benched first, then IR/taxi; within each, best projection first.
  const ORDER = { start: 0, bench: 1, taxi: 2, ir: 3 };
  const sortRows = (rows) => rows.slice().sort((a, b) => ORDER[a.status] - ORDER[b.status] || (a.slotIndex ?? 99) - (b.slotIndex ?? 99) || b.proj - a.proj);

  function render() {
    if (!root) return;
    $('lu-error').hidden = !state.error;
    $('lu-error').textContent = state.error || '';
    if (state.nfl) {
      $('lu-week').textContent = `Week ${lookaheadWeek(state.nfl)}`;
      // Early in the week the other tools still recap the week just played.
      $('lu-sub').textContent = lookaheadWeek(state.nfl) > (state.nfl.display_week || 0) ? 'upcoming' : '';
    }
    if (!state.loadedAt) {
      if (state.error) $('lu-body').innerHTML = ''; // no endless placeholders under an error
      return;
    }

    const { leagues, wins } = computed();
    const html = [];

    // Starters with no game this week, anywhere.
    const byes = leagues.flatMap((lg) => lg.rows.filter((r) => r.status === 'start' && r.bye).map((r) => ({ lg, r })));
    const empties = leagues.filter((lg) => lg.empty.length);
    if (byes.length || empties.length) {
      html.push(`<div class="lu-alert">
        <strong>Fix before kickoff</strong>
        ${byes.map(({ lg, r }) => `<div>${esc(r.name)} is on bye but starting in <a href="${teamUrl(lg.leagueId)}">${esc(lg.name)}</a></div>`).join('')}
        ${empties.map((lg) => `<div>Empty ${esc(lg.empty.join(', '))} slot${lg.empty.length > 1 ? 's' : ''} in <a href="${teamUrl(lg.leagueId)}">${esc(lg.name)}</a></div>`).join('')}
      </div>`);
    }

    if (!wins.length) html.push('<p class="muted small empty">Every game this week has kicked off. Lineups are locked.</p>');

    // Each league's optimal-lineup banner shows once, in its first upcoming window.
    const bannered = new Set();
    wins.forEach((w, i) => {
      const blocks = [];
      let starting = 0;
      let benched = 0;
      let flags = 0;
      let better = 0; // leagues where the best lineup beats yours
      for (const lg of leagues) {
        const rows = sortRows(lg.rows.filter((r) => w.teams.has(r.team)));
        if (!rows.length) continue;
        starting += rows.filter((r) => r.status === 'start').length;
        benched += rows.filter((r) => r.status === 'bench').length;
        flags += rows.filter((r) => r.notes.some((n) => n.kind !== 'info')).length;
        if (!bannered.has(lg.leagueId) && lg.best && lg.best.moves.length) better++;
        blocks.push(leagueBlock(lg, rows, !bannered.has(lg.leagueId)));
        bannered.add(lg.leagueId);
      }
      const open = i === 0 || state.open.has(w.kickoff);
      const soon = w.kickoff - Date.now() < 3600000;
      // The count is what's on screen: flagged rows plus the Fix before
      // kickoff items. "All set" also needs no better lineup on offer.
      const toFix = flags + (i === 0 ? byes.length + empties.length : 0);
      const allSet = i === 0 && blocks.length && !toFix && !better;
      const logos = w.games.slice(0, 8).map((g) => `<span class="lu-game"><img alt="" src="${teams.logo(g.away)}"><img alt="" src="${teams.logo(g.home)}"></span>`).join('');
      html.push(`<details class="lu-window${i === 0 ? ' next' : ''}" data-k="${w.kickoff}"${open ? ' open' : ''}>
        <summary>
          ${i === 0 ? '<span class="lu-eyebrow">Next lock</span>' : ''}
          <div class="lu-when">
            <span class="lu-label">${esc(windowLabel(w))}</span>
            <span class="lu-lock${soon ? ' soon' : ''}">${w.kickoff - Date.now() < 12 * 3600000 ? ring(w.kickoff, soon) : ''}locks in ${countdown(w.kickoff)}</span>
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

  // ---- mount ------------------------------------------------------------
  function mount(el) {
    if (root === el) return;
    root = el;
    root.classList.add('tool', 'intro');
    setTimeout(() => el.classList.remove('intro'), 1600);
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

  // Coming back to the tab after editing a lineup elsewhere: pick it up now.
  document.addEventListener('visibilitychange', () => {
    if (root && !document.hidden && Date.now() - state.loadedAt > 10000) refresh(false);
  });

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.lineups = { mount, unmount };
})(globalThis.NightOwl);
