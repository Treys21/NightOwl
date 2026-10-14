globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, scoring, teams, players, storage, account, dom } = NightOwl;
  const { escape: escapeHtml, tenths: fmt, windowTitle, countdown, dayTime } = NightOwl.format;
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
    collapsed: new Set(),
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

  const RISK_LABEL = { bye: 'Bye week', out: 'Out', questionable: 'Questionable' };
  const MOVE_VERB = { start: 'Start', slide: 'Slide', move: 'Slide', bench: 'Bench' };

  function optionChip(row, option, showProjection) {
    const direction = option.gain > 0 ? 'up' : option.gain < 0 ? 'down' : '';
    const effect = option.gain > 0 ? `gains ${fmt(option.gain)}` : option.gain < 0 ? `loses ${fmt(-option.gain)}` : 'is a wash';
    const verb = row.status === 'start' ? `Benching ${row.name} for` : `Starting ${row.name} over`;
    const slideNote = option.via ? ` (${option.via.name} slides to ${slotLabel(option.via.slot)})` : '';
    const title = `${verb} ${option.name} (${fmt(option.proj)} proj) ${effect}${slideNote}`;
    const sign = option.gain > 0 ? '+' : option.gain < 0 ? '−' : '±';
    const figure = showProjection ? fmt(option.proj) : `${sign}${fmt(Math.abs(option.gain))}`;
    return `<span class="lu-opt ${direction}" title="${escapeHtml(title)}">
      <b>${escapeHtml(option.name)}</b><span class="lu-opt-slot">${escapeHtml(slotLabel(option.slot))}</span>
      <span class="lu-gain ${showProjection ? '' : direction}">${figure}</span>
    </span>`;
  }

  function rowOptions(row) {
    const options = row.options || [];
    if (!options.length || row.locked || row.move) return '';
    const startsAtRisk = row.status === 'start' && core.riskOf(row);
    const improves = options[0].gain >= core.MIN_GAIN;
    if (!startsAtRisk && !improves) return '';
    const showProjection = !improves;
    const label = showProjection ? 'Backup' : row.status === 'start' ? 'Swap for' : 'Start over';
    const [best] = options;
    if (options.length === 1) {
      return `<div class="lu-row-options single"><span class="lu-row-options-label">${label}</span>${optionChip(row, best, showProjection)}</div>`;
    }
    return `<details class="lu-row-options">
      <summary><span class="lu-row-options-label">${label}</span>${optionChip(row, best, showProjection)}<span class="lu-row-options-more">+${options.length - 1} more</span></summary>
      <div class="lu-row-options-list">${options.slice(1).map((option) => optionChip(row, option, showProjection)).join('')}</div>
    </details>`;
  }

  function bestBanner(league) {
    if (!league.best || !league.best.moves.length) return '';
    return `<div class="lu-best">
      <div class="lu-best-head"><span>Best lineup</span><span class="lu-best-gain">+${fmt(league.best.gain)} pts</span></div>
      <ul class="lu-best-moves">${league.best.moves.map((move) => `<li class="lu-move ${move.type}">
        <span class="lu-move-verb">${MOVE_VERB[move.type]}</span><b>${escapeHtml(move.name)}</b>${move.slot ? `<span class="lu-move-slot">${escapeHtml(slotLabel(move.slot))}</span>` : ''}
      </li>`).join('')}</ul>
    </div>`;
  }

  function rowFlag(row) {
    if (row.status === 'ir' && row.injury === 'IR') return '';
    if (row.bye) return { text: RISK_LABEL.bye, tone: 'warn' };
    if (!row.injury) return '';
    const tone = core.OUT.has(row.injury) ? 'out' : 'warn';
    return { text: row.injury, tone };
  }

  function rowMove(row) {
    if (!row.move || row.locked) return '';
    const text = row.move === 'bench' ? 'Bench' : `${MOVE_VERB[row.move]} ${row.move === 'start' ? 'at' : 'to'} ${slotLabel(row.moveSlot)}`;
    return `<span class="lu-row-move ${row.move}">${row.move === 'start' ? '↑' : row.move === 'bench' ? '↓' : '↔'} ${escapeHtml(text)}</span>`;
  }

  function playerRow(league, row) {
    const risk = core.riskOf(row);
    const flag = rowFlag(row);
    const colors = teams.colors(row.team).primary;
    const scoresZero = row.status === 'start' && (row.bye || core.OUT.has(row.injury));
    const projection = row.status === 'ir' || row.status === 'taxi' ? '–' : scoresZero ? `<s>${fmt(row.proj)}</s>` : fmt(row.proj);
    const slotCell = row.status === 'start' ? slotLabel(row.slot) : row.status === 'bench' ? 'BN' : row.status === 'ir' ? 'IR' : 'TAXI';
    const extra = `${rowMove(row)}${rowOptions(row)}`;
    return `<li class="lu-row ${row.status}${risk === 'bye' || risk === 'out' ? ' at-risk' : ''}${row.move && !row.locked ? ' moving' : ''}" style="--tc:${colors}">
      <img class="lu-head" alt="" src="${teams.photo(row.pid, row.team)}" style="border-color:${colors}">
      <div class="lu-row-who">
        <span class="lu-name">${escapeHtml(row.name)}</span>
        <span class="lu-row-meta">${escapeHtml(row.pos)} · ${escapeHtml(row.team)}${flag ? ` <span class="lu-row-flag ${flag.tone}">${escapeHtml(flag.text)}</span>` : ''}</span>
      </div>
      <span class="lu-row-slot ${row.status}">${escapeHtml(slotCell)}</span>
      <span class="lu-row-proj${scoresZero ? ' zero' : ''}"${scoresZero ? ` title="Projected ${fmt(row.proj)}, but not expected to score"` : ''}>${projection}</span>
      ${extra ? `<div class="lu-row-extra">${extra}</div>` : ''}
    </li>`;
  }

  function emptySlotRow(slot) {
    return `<li class="lu-row vacant at-risk">
      <span class="lu-row-hole">+</span>
      <div class="lu-row-who"><span class="lu-name">Empty slot</span><span class="lu-row-meta">Fill before kickoff</span></div>
      <span class="lu-row-slot start">${escapeHtml(slotLabel(slot))}</span>
      <span class="lu-row-proj">–</span>
    </li>`;
  }

  function verdictChip(verdict) {
    if (verdict.state === 'fix') return `<span class="lu-block-verdict fix">${verdict.problems} to fix</span>`;
    if (verdict.state === 'better') return `<span class="lu-block-verdict better">+${fmt(verdict.gain)} available</span>`;
    return '<span class="lu-block-verdict set">✓ Set</span>';
  }

  function rowGroup(name, rows, renderRow, withColumns) {
    if (!rows.length) return '';
    return `<li class="lu-block-group"><span class="lu-block-group-name">${name}<i>${rows.length}</i></span>${withColumns ? '<span class="lu-block-group-column">Slot</span><span class="lu-block-group-column">Proj</span>' : ''}</li>${rows.map(renderRow).join('')}`;
  }

  function leagueBlock(league, rows, showBest) {
    const atRiskFirst = (a, b) => Number(!(core.riskOf(a) === 'bye' || core.riskOf(a) === 'out')) - Number(!(core.riskOf(b) === 'bye' || core.riskOf(b) === 'out'));
    const starters = rows.filter((row) => row.status === 'start').sort(atRiskFirst);
    const bench = rows.filter((row) => row.status === 'bench');
    const reserve = rows.filter((row) => row.status === 'ir' || row.status === 'taxi');
    const emptySlots = showBest ? league.empty : [];
    const renderRow = (row) => playerRow(league, row);
    return `<div class="lu-league">
      <div class="lu-league-head">
        <span class="lname">${escapeHtml(league.name)}</span>
        ${showBest ? verdictChip(core.verdictOf(league)) : ''}
        <a class="lu-edit" href="${teamUrl(league.leagueId)}">Edit lineup ↗</a>
      </div>
      ${showBest ? bestBanner(league) : ''}
      <ol class="lu-list">
        ${starters.length || emptySlots.length ? `<li class="lu-block-group"><span class="lu-block-group-name">Starters<i>${starters.length + emptySlots.length}</i></span><span class="lu-block-group-column">Slot</span><span class="lu-block-group-column">Proj</span></li>${emptySlots.map(emptySlotRow).join('')}${starters.map(renderRow).join('')}` : ''}
        ${rowGroup('Bench', bench, renderRow, !starters.length && !emptySlots.length)}
        ${rowGroup('IR and taxi', reserve, renderRow, false)}
      </ol>
    </div>`;
  }

  const ORDER = { start: 0, bench: 1, taxi: 2, ir: 3 };
  const sortRows = (rows) => rows.slice().sort((a, b) => ORDER[a.status] - ORDER[b.status] || (a.slotIndex ?? 99) - (b.slotIndex ?? 99) || b.proj - a.proj);

  function fixSentence(fix) {
    if (fix.kind === 'empty') return fix.replacement ? `Start ${fix.replacement} at ${slotLabel(fix.slot)}` : `Fill the empty ${slotLabel(fix.slot)} slot`;
    return fix.replacement ? `Start ${fix.replacement} over ${fix.playerName} (${fix.problem})` : `${fix.playerName} is ${fix.problem}: pick a replacement`;
  }

  function improvementSentence(improvement) {
    const starts = improvement.moves.filter((move) => move.type === 'start').map((move) => `${move.name}${move.slot ? ` at ${slotLabel(move.slot)}` : ''}`);
    const benches = improvement.moves.filter((move) => move.type === 'bench').map((move) => move.name);
    const startPart = starts.length ? `Start ${starts.slice(0, 2).join(', ')}` : '';
    const benchPart = benches.length ? `${startPart ? 'bench' : 'Bench'} ${benches[0]}` : '';
    const hiddenCount = Math.max(0, starts.length - 2) + Math.max(0, benches.length - 1);
    const sentence = [startPart, benchPart].filter(Boolean).join(', ') || `Better lineup (+${fmt(improvement.gain)} pts)`;
    return hiddenCount ? `${sentence} +${hiddenCount} more` : sentence;
  }

  function bannerDetail(summary, upcomingWindows) {
    const nextWindow = upcomingWindows[0];
    if (summary.status === 'improve') {
      const count = summary.improvements.length;
      return `+${fmt(summary.totalGain)} pts available in ${count} league${count === 1 ? '' : 's'}`;
    }
    if (!nextWindow) return '';
    if (nextWindow.approx) return 'Kickoff times unavailable';
    if (summary.status === 'fix') {
      const dueWindow = upcomingWindows[Math.min(...summary.fixes.map((fix) => fix.windowIndex))] || nextWindow;
      return `Before ${dayTime(dueWindow.kickoff)}`;
    }
    return `Next lock ${dayTime(nextWindow.kickoff)}`;
  }

  function statusBanner(summary, upcomingWindows) {
    const fixCount = summary.fixes.length;
    const heading = {
      fix: { icon: '!', title: `${fixCount} fix${fixCount === 1 ? '' : 'es'} needed` },
      improve: { icon: '↑', title: 'No fixes needed' },
      set: { icon: '✓', title: 'All set' }
    }[summary.status];
    const item = (text, leagueName, leagueId, extra = '') => `<li><a class="lu-top-item" href="${teamUrl(leagueId)}"><span class="lu-top-action">${escapeHtml(text)}</span><span class="lu-top-league">${escapeHtml(leagueName)}${extra}</span></a></li>`;
    const items = summary.status === 'fix'
      ? summary.fixes.map((fix) => item(fixSentence(fix), fix.leagueName, fix.leagueId))
      : summary.status === 'improve'
        ? summary.improvements.map((improvement) => item(improvementSentence(improvement), improvement.leagueName, improvement.leagueId, ` · +${fmt(improvement.gain)}`))
        : [];
    return `<section class="lu-top lu-top-${summary.status}">
      <div class="lu-top-head">
        <span class="lu-top-icon" aria-hidden="true">${heading.icon}</span>
        <div><strong class="lu-top-title">${escapeHtml(heading.title)}</strong><span class="lu-top-sub">${escapeHtml(bannerDetail(summary, upcomingWindows))}</span></div>
      </div>
      ${items.length ? `<ul class="lu-top-list">${items.join('')}</ul>` : ''}
    </section>`;
  }

  function windowStatus({ blocks, fixCount, possibleGain }) {
    if (!blocks.length) return '';
    if (fixCount) return `<span class="lu-win-status fix">${fixCount} to fix</span>`;
    if (possibleGain) return `<span class="lu-win-status tip">+${fmt(possibleGain)} available</span>`;
    return '<span class="lu-win-status set">✓ Set</span>';
  }

  function windowCard({ lockWindow, windowIndex, blocks, startersPlaying, fixCount, possibleGain }) {
    const isNext = windowIndex === 0;
    const isOpen = state.open.has(lockWindow.kickoff) || (isNext && !state.collapsed.has(lockWindow.kickoff));
    const soon = lockWindow.kickoff - Date.now() < 3600000;
    const withinHalfDay = lockWindow.kickoff - Date.now() < 12 * 3600000;
    const logos = lockWindow.games.slice(0, 8).map((game) => `<span class="lu-game"><img alt="" src="${teams.logo(game.away)}"><img alt="" src="${teams.logo(game.home)}"></span>`).join('');
    const lockText = lockWindow.approx ? '' : `<span class="lu-lock${soon ? ' soon' : ''}">${withinHalfDay ? ring(lockWindow.kickoff, soon) : ''}locks in ${countdown(lockWindow.kickoff)}</span>`;
    const startersText = startersPlaying ? `<span class="lu-win-count">${startersPlaying} of your starters</span>` : '';
    return `<details class="lu-window${isNext ? ' next' : ''}" data-k="${lockWindow.kickoff}"${isOpen ? ' open' : ''}>
      <summary>
        <div class="lu-win-main">
          <span class="lu-win-label">${isNext ? '<span class="lu-win-next">Next</span>' : ''}${escapeHtml(windowLabel(lockWindow))}</span>
          ${windowStatus({ blocks, fixCount, possibleGain })}
        </div>
        <div class="lu-win-sub">
          <div class="lu-games">${logos}</div>
          ${lockText}
          ${startersText}
        </div>
      </summary>
      ${blocks.length ? `<div class="lu-leagues">${blocks.join('')}</div>` : '<p class="muted small empty">Nobody on your rosters plays in this window.</p>'}
    </details>`;
  }

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
    const upcomingWindows = leagues.length ? wins : [];
    const summary = core.lineupSummary(leagues, upcomingWindows);

    if (!leagues.length) html.push('<p class="muted small empty">No in-season leagues right now.</p>');
    else if (!wins.length) html.push('<p class="muted small empty">Every game this week has kicked off. Lineups are locked.</p>');
    if (leagues.length && (wins.length || summary.fixes.length)) html.push(statusBanner(summary, upcomingWindows));

    const leaguesShown = new Set();
    upcomingWindows.forEach((lockWindow, windowIndex) => {
      const blocks = [];
      let startersPlaying = 0;
      let possibleGain = 0;
      for (const league of leagues) {
        const rows = sortRows(league.rows.filter((r) => lockWindow.teams.has(r.team)));
        if (!rows.length) continue;
        startersPlaying += rows.filter((r) => r.status === 'start').length;
        if (!leaguesShown.has(league.leagueId) && league.best && league.best.moves.length) possibleGain += league.best.gain;
        blocks.push(leagueBlock(league, rows, !leaguesShown.has(league.leagueId)));
        leaguesShown.add(league.leagueId);
      }
      const fixCount = summary.fixes.filter((fix) => fix.windowIndex === windowIndex).length;
      html.push(windowCard({ lockWindow, windowIndex, blocks, startersPlaying, fixCount, possibleGain }));
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
      if (e.target.open) {
        state.open.add(k);
        state.collapsed.delete(k);
      } else {
        state.open.delete(k);
        state.collapsed.add(k);
      }
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
