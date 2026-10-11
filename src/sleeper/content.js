// Orchestrator for the Sleeper side: resolve the draft, poll it, build the board.
//
// Polling deliberately lives here rather than in a background service worker —
// MV3 workers are killed after ~30s idle and chrome.alarms fires at most once a
// minute, far too slow to feel live. While this tab is open we poll; when it
// closes, polling stops on its own.
(function (SDR) {
  'use strict';

  const POLL_MS = 3000;
  const MAX_BACKOFF_MS = 30000;

  // Set localStorage['sdr-debug'] = '1' on sleeper.com to trace routing and
  // polling in the console; quiet otherwise. Warnings always show.
  const DEBUG = (() => { try { return localStorage.getItem('sdr-debug') === '1'; } catch { return false; } })();
  const log = DEBUG ? (...args) => console.info('[SDR]', ...args) : () => {};
  const warn = (...args) => console.warn('[SDR]', ...args);

  log('content script loaded');

  let draftId = null;
  let draft = null;
  let mySlot = null;
  let userId = null;
  let playersIndex = null;
  let rankings = [];
  let timer = null;
  let backoffMs = 0;
  let currentUrl = location.href;

  // ---------------------------------------------------------------- routing

  // /draft/nfl/<draft_id> on mocks; league pages carry a league_id instead and
  // the draft has to be resolved through the league.
  function parseRoute(url) {
    const draftMatch = url.match(/\/draft\/[a-z]+\/(\d+)/i);
    if (draftMatch) return { kind: 'draft', id: draftMatch[1] };

    const leagueMatch = url.match(/\/leagues\/(\d+)/);
    if (leagueMatch) return { kind: 'league', id: leagueMatch[1] };

    return null;
  }

  async function resolveDraftId(route) {
    if (!route) return null;
    if (route.kind === 'draft') return route.id;

    const drafts = await SDR.api.getLeagueDrafts(route.id);
    if (!Array.isArray(drafts) || drafts.length === 0) return null;
    // Most recent draft for the league; mirrors what the site itself shows.
    const sorted = drafts.slice().sort((a, b) => (b.created || 0) - (a.created || 0));
    return sorted[0].draft_id;
  }

  // ------------------------------------------------------------------ data

  async function loadStaticData() {
    rankings = await SDR.storage.getRankings();

    const settings = await SDR.storage.getSettings();
    userId = settings.userId;
    if (!userId && settings.username) {
      try {
        const user = await SDR.api.getUser(settings.username);
        userId = user && user.user_id;
        if (userId) await SDR.storage.saveSettings({ userId });
      } catch {
        userId = null; // "your turn" highlighting degrades; everything else works
      }
    }

    const players = await SDR.api.getPlayers();
    playersIndex = SDR.match.buildIndex(players);
  }

  function buildRows(picks) {
    const pickByPlayerId = new Map();
    for (const pick of picks || []) {
      if (pick.player_id) pickByPlayerId.set(String(pick.player_id), pick);
    }

    return rankings.map((ranking) => {
      const player = playersIndex ? SDR.match.matchPlayer(ranking, playersIndex) : null;
      const pick = player ? pickByPlayerId.get(String(player.id)) : null;
      const pickNo = pick ? pick.pick_no : null;

      return {
        rank: ranking.rank,
        name: ranking.name,
        position: SDR.match.normalizePosition(ranking.position || (player && player.position)),
        team: ranking.team || (player && player.team) || '',
        matched: Boolean(player),
        pickNo,
        // Positive = fell past where you had them (value); negative = went early (reach).
        delta: pickNo ? pickNo - ranking.rank : null,
        byMe: Boolean(pick && userId && String(pick.picked_by) === String(userId))
      };
    });
  }

  function isMyTurn(picks) {
    if (!draft || mySlot === null || draft.status !== 'drafting') return false;
    const onClock = SDR.api.slotOnClock(draft, (picks ? picks.length : 0) + 1);
    return onClock === mySlot;
  }

  // ------------------------------------------------------------------ loop

  let loggedFirstTick = false;

  async function tick() {
    if (SDR.panel.tool() !== 'draft') return;
    try {
      // Sleeper re-renders aggressively; if it tore our host out, put it back.
      await SDR.panel.mount();

      draft = await SDR.api.getDraft(draftId);
      mySlot = SDR.api.slotForUser(draft, userId);
      const picks = await SDR.api.getDraftPicks(draftId);

      const rows = buildRows(picks);
      const myTurn = isMyTurn(picks);

      SDR.panel.render({
        status: rankings.length === 0 ? 'no-rankings' : 'ok',
        message: statusMessage(picks),
        rows,
        myTurn
      });
      SDR.badges.update(rows);

      if (!loggedFirstTick) {
        loggedFirstTick = true;
        log(
          'live:', draft.status,
          '| picks', picks.length,
          '| matched', rows.filter((r) => r.matched).length + '/' + rows.length,
          '| my slot', mySlot
        );
      }

      backoffMs = 0;
    } catch (error) {
      // Keep the last good board on screen and back off rather than going blank.
      backoffMs = Math.min(backoffMs ? backoffMs * 2 : POLL_MS, MAX_BACKOFF_MS);
      SDR.panel.render(
        Object.assign({}, lastGoodState(), {
          message: 'reconnecting…',
          statusKind: 'warn'
        })
      );
      warn('poll failed', error);
    }

    schedule();
  }

  let lastState = { status: 'loading', rows: [] };
  function lastGoodState() {
    return lastState;
  }

  // Wrap render so the reconnecting branch can reuse the last good rows.
  const rawRender = SDR.panel.render;
  SDR.panel.render = (state) => {
    if (state.status === 'ok' || state.rows?.length) lastState = state;
    rawRender(state);
  };

  function statusMessage(picks) {
    const count = picks ? picks.length : 0;
    if (!draft) return '';
    if (draft.status === 'pre_draft') return 'pre-draft';
    if (draft.status === 'complete') return `complete · ${count} picks`;
    const teams = draft.settings?.teams || 0;
    const round = teams ? Math.ceil((count + 1) / teams) : 0;
    return `rd ${round} · pick ${count + 1}`;
  }

  function schedule() {
    clearTimeout(timer);
    timer = setTimeout(tick, backoffMs || POLL_MS);
  }

  function stop() {
    clearTimeout(timer);
    timer = null;
  }

  // ------------------------------------------------------------------ boot

  async function start() {
    const route = parseRoute(location.href);
    log('start', location.pathname, 'route=', route);

    // The panel lives on every sleeper.com page so Live is always one click away.
    await SDR.panel.mount();
    // A draft room always opens on the board.
    if (route && route.kind === 'draft') await SDR.panel.setTool('draft', { silent: true });
    if (SDR.panel.tool() !== 'draft') {
      stop();
      return;
    }

    if (!route) {
      stop();
      SDR.panel.render({ status: 'no-draft', message: '', rows: [] });
      return;
    }

    log('panel mounted');

    try {
      draftId = await resolveDraftId(route);
    } catch (error) {
      warn('could not resolve draft id', error);
      draftId = null;
    }
    log('draftId=', draftId);

    if (!draftId) {
      SDR.panel.render({ status: 'no-draft', message: '', rows: [] });
      return;
    }

    try {
      await loadStaticData();
    } catch (error) {
      warn('could not load rankings/players', error);
      SDR.panel.render({ status: 'no-draft', message: 'load failed', statusKind: 'err', rows: [] });
      return;
    }
    log('rankings=', rankings.length, 'players indexed=', playersIndex ? playersIndex.byName.size : 0);

    if (rankings.length === 0) {
      SDR.panel.render({ status: 'no-rankings', message: '', rows: [] });
    }
    tick();
  }

  // Sleeper is a SPA: watch for client-side navigation instead of assuming loads.
  function watchNavigation() {
    const onChange = () => {
      if (location.href === currentUrl) return;
      currentUrl = location.href;
      stop();
      start();
    };

    for (const method of ['pushState', 'replaceState']) {
      const original = history[method];
      history[method] = function (...args) {
        const result = original.apply(this, args);
        setTimeout(onChange, 0);
        return result;
      };
    }
    window.addEventListener('popstate', onChange);
    setInterval(onChange, 1500); // fallback for navigations that bypass both
  }

  // Rankings edited in the popup should show up without a reload.
  SDR.storage.onChanged(async (changes) => {
    if (changes.rankings && draftId) {
      rankings = await SDR.storage.getRankings();
      tick();
    }
  });

  // Draft and Live never run together: switching tools stops the other's polling.
  SDR.panel.onToolChange((tool) => {
    stop();
    if (tool === 'draft') start();
  });

  watchNavigation();
  start();
})(globalThis.SDR);
