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

  const NAME_SELECTORS = [
    '[class*="player-name"]',
    '[class*="playerName"]',
    '[class*="name-container"]',
    '[class*="player-meta"] [class*="name"]'
  ];

  let rankByName = new Map();
  let observer = null;
  let styled = false;

  function update(rows) {
    rankByName = new Map(rows.map((row) => [NightOwl.match.normalizeName(row.name), row]));
    if (!styled) {
      NightOwl.dom.adoptCss(document, STYLE);
      styled = true;
    }
    decorate();
    observe();
  }

  function paint(badge, row) {
    badge.textContent = String(row.rank);
    badge.dataset.drafted = row.pickNo ? '1' : '0';
    badge.title = row.pickNo ? `Your rank ${row.rank}, taken at #${row.pickNo}` : `Your rank ${row.rank}`;
  }

  function decorate() {
    for (const selector of NAME_SELECTORS) {
      for (const element of document.querySelectorAll(selector)) {
        const existing = element.querySelector(`.${BADGE_CLASS}`);
        if (existing) {
          const row = rankByName.get(/** @type {HTMLElement} */ (existing).dataset.key);
          if (row) {
            paint(existing, row);
          } else {
            existing.remove();
            element.removeAttribute(MARKED_ATTR);
          }
          continue;
        }

        const text = (element.textContent || '').replace(/\s+/g, ' ').trim();
        if (!text || text.length > 40) continue;
        const key = NightOwl.match.normalizeName(text);
        const row = rankByName.get(key);
        if (!row) continue;

        const badge = document.createElement('span');
        badge.className = BADGE_CLASS;
        badge.dataset.key = key;
        paint(badge, row);
        element.setAttribute(MARKED_ATTR, '1');
        element.prepend(badge);
      }
    }
  }

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
          console.debug('[Night Owl badges]', err);
        }
      }, 400);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function stop() {
    if (observer) observer.disconnect();
    observer = null;
    document.querySelectorAll(`.${BADGE_CLASS}`).forEach((badge) => badge.remove());
    document.querySelectorAll(`[${MARKED_ATTR}]`).forEach((el) => el.removeAttribute(MARKED_ATTR));
  }

  NightOwl.badges = { update, stop };
})(globalThis.NightOwl);
