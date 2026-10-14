// Draft view: resolve the draft on this page, poll it, and keep the big board
// and the inline rank badges current.
//
// Polling lives here rather than in the background worker on purpose: MV3
// workers are killed after ~30s idle and chrome.alarms fires at most once a
// minute, far too slow to feel live. It runs only while the Draft tool is
// showing in an open tab.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { api, storage, players, account, match, draftOrder, draftBoard, badges } = NightOwl;

  const POLL_MS = 3000;
  const MAX_BACKOFF_MS = 30000;

  let root = null;
  let session = 0; // bumped on every (re)start so stale async work bails out
  let prefs = null;
  let timer = null;
  let backoffMs = 0;

  let draftId = null;
  let draft = null;
  let userId = null;
  let index = null; // name index over Sleeper's players
  let rankings = [];
  let board = { status: 'loading', rows: [], myTurn: false, message: '', kind: '' };

  // /draft/nfl/<draft_id> in a draft room; league pages carry a league id and
  // the draft is resolved through the league.
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
    // The league's most recent draft, as the site itself shows.
    return drafts.reduce((a, b) => ((b.created || 0) > (a.created || 0) ? b : a)).draft_id;
  }

  // The board works without a username; only "you're on the clock" needs it.
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
        // Positive = fell past where you had him (value); negative = went early (reach).
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
    if (root) draftBoard.render(root, board, prefs, render);
  }

  function show(next, message = '', kind = '') {
    board = Object.assign({ message, kind }, next);
    render();
  }

  async function tick(id) {
    if (id !== session) return;
    clearTimeout(timer);
    try {
      const [nextDraft, picks = []] = await Promise.all([api.draft(draftId), api.draftPicks(draftId)]);
      if (id !== session) return;
      draft = nextDraft;
      const rows = buildRows(picks);
      show({ status: rankings.length ? 'ok' : 'no-rankings', rows, myTurn: isMyTurn(picks) }, statusText(picks));
      badges.update(rows);
      backoffMs = 0;
    } catch (err) {
      if (id !== session) return;
      // Keep the last good board on screen and back off rather than going blank.
      backoffMs = Math.min(backoffMs ? backoffMs * 2 : POLL_MS, MAX_BACKOFF_MS);
      show(Object.assign({}, board, { message: 'reconnecting…', kind: 'warn' }));
      console.warn('[Night Owl draft] poll failed', err);
    }
    clearTimeout(timer);
    timer = setTimeout(() => tick(id), backoffMs || POLL_MS);
  }

  async function start() {
    stop();
    const id = session;
    const route = parseRoute(location.href);
    show({ status: route ? 'loading' : 'no-draft', rows: [] });
    if (!route) return;

    try {
      draftId = await resolveDraftId(route);
      if (id !== session) return;
      if (!draftId) {
        show({ status: 'no-draft', rows: [] });
        return;
      }
      [rankings, userId] = await Promise.all([storage.getRankings(), resolveUserId(), players.load()]);
      if (id !== session) return;
      index = match.buildIndex(players.list());
    } catch (err) {
      console.warn('[Night Owl draft] could not load the draft', err);
      if (id === session) show({ status: 'error', rows: [] }, 'load failed', 'err');
      return;
    }
    tick(id);
  }

  function stop() {
    session++;
    clearTimeout(timer);
    timer = null;
    backoffMs = 0;
    draftId = null;
  }

  // Rankings edited in the popup show up without a reload.
  storage.onChanged(async (changes) => {
    if (!root || !draftId || !(changes.rankings || changes.settings)) return;
    const id = session;
    if (changes.settings) userId = await resolveUserId();
    rankings = await storage.getRankings();
    tick(id);
  });

  async function mount(el) {
    root = el;
    prefs = await storage.getUi();
    if (root === el) start();
  }

  function unmount() {
    stop();
    badges.stop();
    root = null;
  }

  NightOwl.views = NightOwl.views || {};
  NightOwl.views.draft = { mount, unmount, navigated: start };
})(globalThis.NightOwl);
