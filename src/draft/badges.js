// Best-effort rank badges on Sleeper's own player rows in a draft room.
//
// This is the deliberately fragile half of the Draft tool: it depends on
// Sleeper's internal markup, which changes without notice. Every selector guess
// lives here, and when none match the module does nothing — the board stays
// authoritative and unaffected.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const BADGE_CLASS = 'night-owl-rank';
  const MARKED_ATTR = 'data-night-owl-ranked';
  const STYLE = `
    .${BADGE_CLASS} {
      display: inline-block; margin-right: 6px; padding: 1px 5px; border-radius: 4px;
      background: #00ceb8; color: #022047;
      font-size: 10px; font-weight: 700; line-height: 1.5; vertical-align: middle;
    }
    .${BADGE_CLASS}[data-drafted="1"] { background: #3a465b; color: #bfcfe0; }
  `;

  // Ordered guesses at Sleeper's player-row name element.
  const NAME_SELECTORS = [
    '[class*="player-name"]',
    '[class*="playerName"]',
    '[class*="name-container"]',
    '[class*="player-meta"] [class*="name"]'
  ];

  let rankByName = new Map();
  let observer = null;
  let styled = false;

  /** @param rows [{ name, rank, pickNo }] from the board */
  function update(rows) {
    rankByName = new Map(rows.map((row) => [NightOwl.match.normalizeName(row.name), row]));
    if (!styled) {
      NightOwl.dom.adoptCss(document, STYLE);
      styled = true;
    }
    decorate();
    observe();
  }

  function decorate() {
    for (const selector of NAME_SELECTORS) {
      for (const element of document.querySelectorAll(selector)) {
        if (element.hasAttribute(MARKED_ATTR) || element.querySelector(`.${BADGE_CLASS}`)) continue;

        const text = (element.textContent || '').replace(/\s+/g, ' ').trim();
        if (!text || text.length > 40) continue;
        const row = rankByName.get(NightOwl.match.normalizeName(text));
        if (!row) continue;

        const badge = document.createElement('span');
        badge.className = BADGE_CLASS;
        badge.textContent = String(row.rank);
        badge.dataset.drafted = row.pickNo ? '1' : '0';
        badge.title = row.pickNo ? `Your rank ${row.rank} — taken at #${row.pickNo}` : `Your rank ${row.rank}`;
        element.setAttribute(MARKED_ATTR, '1');
        element.prepend(badge);
      }
    }
  }

  // Sleeper re-renders constantly; re-decorate on DOM churn, throttled.
  function observe() {
    if (observer) return;
    let pending = false;
    observer = new MutationObserver(() => {
      if (pending) return;
      pending = true;
      setTimeout(() => {
        pending = false;
        try {
          decorate();
        } catch (err) {
          console.debug('[Night Owl badges]', err); // never let badges break the page
        }
      }, 400);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  /** Remove every badge and stop watching the page. */
  function stop() {
    if (observer) observer.disconnect();
    observer = null;
    document.querySelectorAll(`.${BADGE_CLASS}`).forEach((badge) => badge.remove());
    document.querySelectorAll(`[${MARKED_ATTR}]`).forEach((el) => el.removeAttribute(MARKED_ATTR));
  }

  NightOwl.badges = { update, stop };
})(globalThis.NightOwl);
