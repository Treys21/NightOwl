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
  // One size for every tool. Drag any edge or corner to change it; it's
  // remembered. Double-click the header to go back to the default.
  const DEFAULT_W = 430;
  const DEFAULT_H = 780;
  const MIN_W = 320;
  const MIN_H = 300;
  const GAP = 8; // keep this far inside the window
  const EDGES = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

  // The Night Owl mark ("Hybrid": cyan outer tube, pink inner tube); panel.css powers its tubes on.
  const BRAND = `
    <svg class="brand" viewBox="0 0 128 128" role="img" aria-label="Night Owl">
      <rect width="128" height="128" rx="30" fill="#140f2e"/>
      <rect class="outer" x="6" y="6" width="116" height="116" rx="28" fill="none" stroke="#3df5ff" stroke-width="7"/>
      <rect class="inner" x="17" y="17" width="94" height="94" rx="20" fill="none" stroke="#ff4fd8" stroke-width="5"/>
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
      <div class="source-note" role="status" hidden></div>
      ${EDGES.map((e) => `<div class="rz rz-${e}" data-edge="${e}" aria-hidden="true"></div>`).join('')}
    `;
    shadow.append(panel);
    document.documentElement.appendChild(host);

    wire();
    showOutages(NightOwl.api.unavailable());
    place();
    apply();
    enableResize();
    window.addEventListener('resize', () => { place(); slideIndicator(); });
    setTimeout(slideIndicator, 400); // again once webfonts settle
  }

  function unmountActive() {
    if (active) viewOf(active)?.unmount();
    active = null;
  }

  // Show the current tool and mount its view; everything else is unmounted.
  function apply() {
    const tool = toolOf(ui.tool);
    panel.classList.toggle('collapsed', ui.collapsed);
    place();
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

  const viewW = () => document.documentElement.clientWidth || window.innerWidth;
  const viewH = () => window.innerHeight;

  // Size and position from the saved ui, clamped to the window.
  function place() {
    const maxW = viewW() - GAP * 2;
    const maxH = viewH() - GAP * 2;
    const w = clamp(ui.w || DEFAULT_W, Math.min(MIN_W, maxW), maxW);
    const h = clamp(ui.h || Math.min(DEFAULT_H, Math.round(viewH() * 0.86)), Math.min(MIN_H, maxH), maxH);
    panel.style.width = `${w}px`;
    panel.style.height = ui.collapsed ? '' : `${h}px`;
    const x = ui.x === null ? viewW() - w - 20 : ui.x;
    const y = ui.y === null ? 80 : ui.y;
    panel.style.left = `${clamp(x, GAP, viewW() - w - GAP)}px`;
    panel.style.top = `${clamp(y, GAP, viewH() - (ui.collapsed ? 60 : h) - GAP)}px`;
  }

  // Eight invisible handles around the frame. Dragging one moves that edge
  // (or corner); the opposite edge stays put.
  function enableResize() {
    panel.querySelectorAll('.rz').forEach((handle) => {
      handle.addEventListener('pointerdown', (event) => {
        if (event.button !== 0 || ui.collapsed) return;
        event.preventDefault();
        handle.setPointerCapture(event.pointerId);
        const edge = handle.dataset.edge;
        const start = panel.getBoundingClientRect();
        const sx = event.clientX;
        const sy = event.clientY;
        panel.classList.add('resizing');

        const onMove = (e) => {
          const dx = e.clientX - sx;
          const dy = e.clientY - sy;
          let { left, top, width, height } = start;
          if (edge.includes('e')) width = clamp(width + dx, MIN_W, viewW() - left - GAP);
          if (edge.includes('s')) height = clamp(height + dy, MIN_H, viewH() - top - GAP);
          if (edge.includes('w')) {
            const w = clamp(width - dx, MIN_W, start.right - GAP);
            left = start.right - w;
            width = w;
          }
          if (edge.includes('n')) {
            const h = clamp(height - dy, MIN_H, start.bottom - GAP);
            top = start.bottom - h;
            height = h;
          }
          Object.assign(panel.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
          slideIndicator();
        };
        const onUp = () => {
          handle.removeEventListener('pointermove', onMove);
          handle.removeEventListener('pointerup', onUp);
          handle.removeEventListener('pointercancel', onUp);
          panel.classList.remove('resizing');
          const r = panel.getBoundingClientRect();
          Object.assign(ui, { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) });
          storage.saveUi({ x: ui.x, y: ui.y, w: ui.w, h: ui.h });
        };
        handle.addEventListener('pointermove', onMove);
        handle.addEventListener('pointerup', onUp);
        handle.addEventListener('pointercancel', onUp);
      });
    });
  }

  function resetSize() {
    Object.assign(ui, { w: null, h: null });
    storage.saveUi({ w: null, h: null });
    place();
    slideIndicator();
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
    panel.querySelector('header').addEventListener('dblclick', (e) => {
      if (!e.target.closest('button')) resetSize();
    });
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
        const r = panel.getBoundingClientRect();
        panel.style.left = `${clamp(originX + e.clientX - startX, GAP, viewW() - r.width - GAP)}px`;
        panel.style.top = `${clamp(originY + e.clientY - startY, GAP, viewH() - r.height - GAP)}px`;
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

  // A feed that stops answering is named, rather than its section just emptying.
  function showOutages(labels) {
    const note = panel && panel.querySelector('.source-note');
    if (!note) return;
    note.hidden = labels.length === 0;
    note.textContent = labels.length
      ? `${labels.join(' and ')} ${labels.length === 1 ? 'isn\'t' : 'aren\'t'} responding right now. Everything else keeps working, and it retries on its own.`
      : '';
  }
  NightOwl.api.onAvailability(showOutages);

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
