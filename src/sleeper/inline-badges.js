// Best-effort rank badges on Sleeper's own player rows.
//
// This is the deliberately fragile half of the overlay: it depends on Sleeper's
// internal markup, which changes without notice. Every selector guess lives here,
// and when none of them match the module does nothing at all — the panel stays
// authoritative and unaffected.
globalThis.SDR = globalThis.SDR || {};

(function (SDR) {
  'use strict';

  const BADGE_CLASS = 'sdr-rank-badge';
  const MARKED_ATTR = 'data-sdr-badged';

  // Ordered guesses at Sleeper's player-row name element.
  const NAME_SELECTORS = [
    '[class*="player-name"]',
    '[class*="playerName"]',
    '[class*="name-container"]',
    '[class*="player-meta"] [class*="name"]'
  ];

  let rankByName = new Map();
  let observer = null;
  let styleInjected = false;

  function injectStyle() {
    if (styleInjected) return;
    SDR.dom.applyStyles(document, `
      .${BADGE_CLASS} {
        display: inline-block; margin-right: 6px; padding: 1px 5px;
        border-radius: 4px; background: #2f6feb; color: #fff;
        font-size: 10px; font-weight: 700; line-height: 1.5; vertical-align: middle;
      }
      .${BADGE_CLASS}[data-drafted="1"] { background: #5f6368; }
    `);
    styleInjected = true;
  }

  /** @param rows [{ name, rank, pickNo }] */
  function update(rows) {
    rankByName = new Map();
    for (const row of rows) {
      rankByName.set(SDR.match.normalizeName(row.name), row);
    }
    injectStyle();
    decorate();
    startObserving();
  }

  function decorate() {
    let matchedAny = false;

    for (const selector of NAME_SELECTORS) {
      let elements;
      try {
        elements = document.querySelectorAll(selector);
      } catch {
        continue; // a bad selector must never break the loop
      }

      for (const element of elements) {
        if (element.hasAttribute(MARKED_ATTR)) continue;
        if (element.querySelector(`.${BADGE_CLASS}`)) continue;

        const text = (element.textContent || '').replace(/\s+/g, ' ').trim();
        if (!text || text.length > 40) continue;

        const row = rankByName.get(SDR.match.normalizeName(text));
        if (!row) continue;

        const badge = document.createElement('span');
        badge.className = BADGE_CLASS;
        badge.textContent = String(row.rank);
        badge.dataset.drafted = row.pickNo ? '1' : '0';
        badge.title = row.pickNo ? `Your rank ${row.rank} — taken at #${row.pickNo}` : `Your rank ${row.rank}`;

        element.setAttribute(MARKED_ATTR, '1');
        element.prepend(badge);
        matchedAny = true;
      }
    }

    return matchedAny;
  }

  function startObserving() {
    if (observer) return;
    // Sleeper re-renders constantly; re-decorate on DOM churn, throttled.
    let pending = false;
    observer = new MutationObserver(() => {
      if (pending) return;
      pending = true;
      setTimeout(() => {
        pending = false;
        try {
          decorate();
        } catch {
          // Never let badge failures surface — the panel is what matters.
        }
      }, 400);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function clear() {
    document.querySelectorAll(`.${BADGE_CLASS}`).forEach((badge) => badge.remove());
    document.querySelectorAll(`[${MARKED_ATTR}]`).forEach((el) => el.removeAttribute(MARKED_ATTR));
  }

  SDR.badges = { update, clear };
})(globalThis.SDR);
