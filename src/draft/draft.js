globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, storage, players, account, match, draftOrder, draftBoard, badges } = NightOwl;

  const POLL_MS = 3000;
  const MAX_BACKOFF_MS = 30000;

  let root = null;
  let session = 0;
  let preferences = null;
  let timer = null;
  let backoffMs = 0;

  let draftId = null;
  let draft = null;
  let userId = null;
  let index = null;
  let rankings = [];
  let board = { status: 'loading', rows: [], myTurn: false, message: '', kind: '' };

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
    const drafts = await api.leagueDrafts(route.id);
    if (!Array.isArray(drafts) || drafts.length === 0) return null;
    return drafts.reduce((total, draft) => ((draft.created || 0) > (total.created || 0) ? draft : total)).draft_id;
  }

  async function resolveUserId() {
    try {
      return (await account.resolve()).userId;
    } catch {
      return null;
    }
  }

  function buildRows(picks) {
    const pickByPlayer = new Map();
    for (const pick of picks) if (pick.player_id) pickByPlayer.set(String(pick.player_id), pick);

    return rankings.map((ranking) => {
      const player = match.matchPlayer(ranking, index);
      const pick = player ? pickByPlayer.get(String(player.id)) : null;
      const pickNo = pick ? pick.pick_no : null;
      return {
        rank: ranking.rank,
        name: ranking.name,
        position: match.normalizePosition(ranking.position || (player && player.position)),
        team: ranking.team || (player && player.team) || '',
        matched: Boolean(player),
        pickNo,
        delta: pickNo ? pickNo - ranking.rank : null,
        byMe: Boolean(pick && userId && String(pick.picked_by) === String(userId))
      };
    });
  }

  function isMyTurn(picks) {
    const mySlot = draftOrder.slotForUser(draft, userId);
    if (mySlot === null || draft.status !== 'drafting') return false;
    return draftOrder.slotOnClock(draft, picks.length + 1) === mySlot;
  }

  function statusText(picks) {
    if (draft.status === 'pre_draft') return 'pre-draft';
    if (draft.status === 'complete') return `complete · ${picks.length} picks`;
    const teams = (draft.settings && draft.settings.teams) || 0;
    return teams ? `rd ${Math.ceil((picks.length + 1) / teams)} · pick ${picks.length + 1}` : '';
  }

  function render() {
    if (root) draftBoard.render(root, board, preferences, render);
  }

  function showBoard(next, message = '', kind = '') {
    board = Object.assign({ message, kind }, next);
    render();
  }

  async function pollDraft(sessionId) {
    if (sessionId !== session) return;
    clearTimeout(timer);
    try {
      const [nextDraft, picks = []] = await Promise.all([api.draft(draftId), api.draftPicks(draftId)]);
      if (sessionId !== session) return;
      draft = nextDraft;
      const rows = buildRows(picks);
      showBoard({ status: rankings.length ? 'ok' : 'no-rankings', rows, myTurn: isMyTurn(picks) }, statusText(picks));
      badges.update(rows);
      backoffMs = 0;
    } catch (error) {
      if (sessionId !== session) return;
      backoffMs = Math.min(backoffMs ? backoffMs * 2 : POLL_MS, MAX_BACKOFF_MS);
      showBoard(Object.assign({}, board, { message: 'reconnecting…', kind: 'warn' }));
      console.warn('[Night Owl draft] poll failed', error);
    }
    clearTimeout(timer);
    timer = setTimeout(() => pollDraft(sessionId), backoffMs || POLL_MS);
  }

  async function start() {
    stopPolling();
    const sessionId = session;
    const route = parseRoute(location.href);
    showBoard({ status: route ? 'loading' : 'no-draft', rows: [] });
    if (!route) return;

    try {
      draftId = await resolveDraftId(route);
      if (sessionId !== session) return;
      if (!draftId) {
        showBoard({ status: 'no-draft', rows: [] });
        return;
      }
      [rankings, userId] = await Promise.all([storage.getRankings(), resolveUserId(), players.load()]);
      if (sessionId !== session) return;
      index = match.buildIndex(players.list());
    } catch (error) {
      console.warn('[Night Owl draft] could not load the draft', error);
      if (sessionId === session) showBoard({ status: 'error', rows: [] }, 'load failed', 'err');
      return;
    }
    pollDraft(sessionId);
  }

  function stopPolling() {
    session++;
    clearTimeout(timer);
    timer = null;
    backoffMs = 0;
    draftId = null;
  }

  storage.onChanged(async (changes) => {
    if (!root || !draftId || !(changes.rankings || changes.settings)) return;
    const sessionId = session;
    if (changes.settings) userId = await resolveUserId();
    rankings = await storage.getRankings();
    pollDraft(sessionId);
  });

  async function mount(element) {
    root = element;
    preferences = await storage.getUi();
    if (root === element) start();
  }

  function unmount() {
    stopPolling();
    badges.stop();
    root = null;
  }

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.draft = { mount, unmount, navigated: start };
})(globalThis.NightOwl);
