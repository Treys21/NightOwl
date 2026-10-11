// The floating panel: one draggable, resizable shell with a Draft | Live |
// Lineups | Bets switch. It lives in a shadow root so Sleeper's CSS can't bleed
// in and ours can't leak out.
//
// Each tool is a view — { mount(el), unmount(), navigated?() } registered on
// NightOwl.views — and exactly one is mounted at a time: a hidden or collapsed
// tool does no work and makes no requests.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { storage, dom } = NightOwl;

  const HOST_ID = 'night-owl-host';
  const STYLES = [
    'src/styles/panel.css',
    'src/styles/draft.css',
    'src/styles/common.css',
    'src/styles/live.css',
    'src/styles/bets.css',
    'src/styles/lineups.css'
  ];
  const TOOLS = [
    { id: 'draft', label: 'Draft' },
    { id: 'live', label: 'Live' },
    { id: 'lineups', label: 'Lineups' },
    { id: 'bets', label: 'Bets' }
  ];
  const DEFAULT_WIDTH = 430;

  // The Night Owl mark (double neon frame); panel.css powers its tubes on.
  const BRAND = `
    <svg class="brand" viewBox="0 0 128 128" role="img" aria-label="Night Owl">
      <rect width="128" height="128" rx="30" fill="#140f2e"/>
      <rect class="outer" x="6" y="6" width="116" height="116" rx="28" fill="none" stroke="#ff4fd8" stroke-width="7"/>
      <rect class="inner" x="17" y="17" width="94" height="94" rx="20" fill="none" stroke="#3df5ff" stroke-width="5"/>
      <g class="eyes">
        <circle cx="44" cy="65" r="16" fill="none" stroke="#ff4fd8" stroke-width="10"/>
        <circle cx="84" cy="65" r="16" fill="none" stroke="#ff4fd8" stroke-width="10"/>
        <circle class="pupil" cx="45" cy="64" r="6.5" fill="#3df5ff"/>
        <circle class="pupil" cx="85" cy="64" r="6.5" fill="#3df5ff"/>
      </g>
    </svg>`;

  let ui = null;
  let panel = null;
  let mounting = null;
  let active = null; // id of the mounted view, if any

  const toolOf = (value) => (TOOLS.some((t) => t.id === value) ? value : 'live');
  const viewOf = (id) => NightOwl.views && NightOwl.views[id];
  const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));

  /** Create the panel (idempotent). Sleeper re-renders aggressively; if it tore
      the host out, this puts it back. */
  function mount() {
    if (panel && panel.isConnected) return Promise.resolve();
    mounting = mounting || build().finally(() => { mounting = null; });
    return mounting;
  }

  async function build() {
    unmountActive();
    document.getElementById(HOST_ID)?.remove();
    ui = await storage.getUi();

    const host = document.createElement('div');
    host.id = HOST_ID;
    const shadow = host.attachShadow({ mode: 'open' });
    await dom.adoptStyles(shadow, STYLES); // before first paint: no unstyled flash

    panel = document.createElement('div');
    panel.className = 'panel';
    panel.innerHTML = `
      <header>
        ${BRAND}
        <div class="switch" role="tablist">
          <span class="ind"></span>
          ${TOOLS.map((t) => `<button role="tab" data-tool="${t.id}">${t.label}</button>`).join('')}
        </div>
        <button class="iconbtn" data-act="collapse"></button>
      </header>
      ${TOOLS.map((t) => `<div class="view view-${t.id}" hidden></div>`).join('')}
    `;
    shadow.append(panel);
    document.documentElement.appendChild(host);

    wire();
    place();
    apply();
    watchSize();
    setTimeout(slideIndicator, 400); // again once webfonts settle
  }

  function unmountActive() {
    if (active) viewOf(active)?.unmount();
    active = null;
  }

  // Show the current tool and mount its view; everything else is unmounted.
  function apply() {
    const tool = toolOf(ui.tool);
    const tall = tool !== 'draft'; // the board sizes to its rows
    panel.classList.toggle('tall', tall);
    panel.classList.toggle('collapsed', ui.collapsed);
    panel.style.height = ui.h && tall && !ui.collapsed ? `${ui.h}px` : '';
    panel.querySelectorAll('[data-tool]').forEach((b) => {
      const on = b.dataset.tool === tool;
      b.classList.toggle('on', on);
      b.setAttribute('aria-selected', String(on));
    });
    const collapse = panel.querySelector('[data-act="collapse"]');
    collapse.textContent = ui.collapsed ? '▢' : '—';
    collapse.title = ui.collapsed ? 'Expand' : 'Collapse';
    for (const t of TOOLS) panel.querySelector(`.view-${t.id}`).hidden = t.id !== tool;
    slideIndicator();

    const next = ui.collapsed ? null : tool;
    if (next === active) return;
    unmountActive();
    if (next && viewOf(next)) {
      active = next;
      viewOf(next).mount(panel.querySelector(`.view-${next}`));
    }
  }

  async function setTool(tool) {
    tool = toolOf(tool);
    await mount();
    if (ui.tool === tool) return;
    ui.tool = tool;
    storage.saveUi({ tool });
    apply();
  }

  // The glowing pill glides under whichever tool is active.
  function slideIndicator() {
    requestAnimationFrame(() => {
      const on = panel && panel.querySelector('.switch button.on');
      const ind = panel && panel.querySelector('.switch .ind');
      if (!on || !ind) return;
      ind.style.left = `${on.offsetLeft}px`;
      ind.style.width = `${on.offsetWidth}px`;
    });
  }

  function place() {
    if (ui.w) panel.style.width = `${ui.w}px`;
    const width = ui.w || DEFAULT_WIDTH;
    const x = ui.x === null ? window.innerWidth - width - 20 : ui.x;
    const y = ui.y === null ? 80 : ui.y;
    panel.style.left = `${clamp(x, 0, window.innerWidth - 100)}px`;
    panel.style.top = `${clamp(y, 0, window.innerHeight - 60)}px`;
  }

  // Remember the size after the user drags the resize corner.
  function watchSize() {
    let timer = null;
    new ResizeObserver(() => {
      if (ui.collapsed) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const patch = {};
        const w = panel.offsetWidth;
        const h = panel.offsetHeight;
        if (w && w !== ui.w && panel.style.width) patch.w = ui.w = w;
        if (h && h !== ui.h && panel.classList.contains('tall') && panel.style.height) patch.h = ui.h = h;
        if (Object.keys(patch).length) storage.saveUi(patch);
        slideIndicator();
      }, 300);
    }).observe(panel);
  }

  function wire() {
    panel.querySelector('[data-act="collapse"]').addEventListener('click', () => {
      ui.collapsed = !ui.collapsed;
      storage.saveUi({ collapsed: ui.collapsed });
      apply();
    });
    panel.querySelectorAll('[data-tool]').forEach((b) => {
      b.addEventListener('click', () => setTool(b.dataset.tool));
    });
    enableDrag(panel.querySelector('header'));
  }

  function enableDrag(handle) {
    handle.addEventListener('mousedown', (event) => {
      if (event.button !== 0 || event.target.closest('button')) return;
      event.preventDefault();
      const startX = event.clientX;
      const startY = event.clientY;
      const originX = parseInt(panel.style.left, 10) || 0;
      const originY = parseInt(panel.style.top, 10) || 0;

      const onMove = (e) => {
        panel.style.left = `${clamp(originX + e.clientX - startX, 0, window.innerWidth - 100)}px`;
        panel.style.top = `${clamp(originY + e.clientY - startY, 0, window.innerHeight - 40)}px`;
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        ui.x = parseInt(panel.style.left, 10);
        ui.y = parseInt(panel.style.top, 10);
        storage.saveUi({ x: ui.x, y: ui.y });
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  }

  /** The page URL changed (Sleeper is a single-page app). */
  function navigated() {
    if (active) viewOf(active)?.navigated?.();
  }

  NightOwl.panel = {
    mount,
    setTool,
    navigated,
    tool: () => toolOf(ui && ui.tool)
  };
})(globalThis.NightOwl);
