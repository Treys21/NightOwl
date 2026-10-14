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
    'src/styles/lineups.css',
    'src/styles/season.css',
    'src/styles/moves.css'
  ];
  const TOOLS = [
    { id: 'draft', label: 'Draft' },
    { id: 'live', label: 'Live' },
    { id: 'lineups', label: 'Lineups' },
    { id: 'bets', label: 'Bets' },
    { id: 'season', label: 'Season' },
    { id: 'moves', label: 'Moves' }
  ];
  const DEFAULT_W = 430;
  const DEFAULT_H = 780;
  const MIN_W = 320;
  const MIN_H = 300;
  const GAP = 8;
  const EDGES = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

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
  let active = null;
  let needsSetup = false;

  const toolOf = (value) => (TOOLS.some((t) => t.id === value) ? value : 'live');
  const viewOf = (id) => NightOwl.views && NightOwl.views[id];
  const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));

  function mount() {
    if (panel && panel.isConnected) return Promise.resolve();
    mounting = mounting || build().finally(() => { mounting = null; });
    return mounting;
  }

  async function build() {
    unmountActive();
    document.getElementById(HOST_ID)?.remove();
    ui = await storage.getUi();
    needsSetup = !(await storage.getSettings()).username;

    const host = document.createElement('div');
    host.id = HOST_ID;
    const shadow = host.attachShadow({ mode: 'open' });
    dom.hideBrokenImages(shadow);
    await dom.adoptStyles(shadow, STYLES);

    panel = document.createElement('div');
    panel.className = 'panel';
    panel.innerHTML = `
      <header>
        ${BRAND}
        <div class="switch" role="tablist">
          <span class="ind"></span>
          ${TOOLS.map((t, i) => `<button role="tab" data-tool="${t.id}" title="${t.label} (Alt+Shift+${i + 1})">${t.label}</button>`).join('')}
        </div>
        <button class="iconbtn" data-act="collapse"></button>
      </header>
      ${TOOLS.map((t) => `<div class="view view-${t.id}" hidden></div>`).join('')}
      <form class="setup" hidden>
        <div class="setup-mark">${BRAND}</div>
        <h2>Welcome to Night Owl</h2>
        <p>Type your Sleeper username to see your leagues.</p>
        <div class="setup-row">
          <input name="username" type="text" placeholder="Sleeper username" autocomplete="username" spellcheck="false" aria-label="Sleeper username" required>
          <button type="submit">Start</button>
        </div>
        <p class="setup-msg" role="status"></p>
        <p class="setup-note">It's the name on your Sleeper profile. Night Owl only reads public league data, and nothing leaves your browser.</p>
      </form>
      <div class="source-note" role="status" hidden></div>
      ${EDGES.map((e) => `<div class="rz rz-${e}" data-edge="${e}" aria-hidden="true"></div>`).join('')}
    `;
    shadow.append(panel);
    document.documentElement.appendChild(host);

    wire();
    wireSetup();
    showOutages(NightOwl.api.unavailable());
    apply();
    enableResize();
    setTimeout(slideIndicator, 400);
    if (typeof ResizeObserver !== 'undefined') {
      const watcher = new ResizeObserver(slideIndicator);
      panel.querySelectorAll('.switch, .switch button').forEach((el) => watcher.observe(el));
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(slideIndicator);
  }

  window.addEventListener('resize', () => {
    if (!panel) return;
    place();
    slideIndicator();
  });

  const scrolled = new Map();
  const scroller = (id) => panel && panel.querySelector(`.view-${id} .tool-scroll`);

  function saveScroll() {
    const box = active && scroller(active);
    if (box) scrolled.set(active, box.scrollTop);
  }

  function unmountActive() {
    if (active) viewOf(active)?.unmount();
    active = null;
  }

  function restoreScroll(id) {
    const top = scrolled.get(id);
    if (!top) return;
    for (const delay of [0, 300, 1200]) {
      setTimeout(() => {
        const box = active === id && scroller(id);
        if (box && box.scrollTop < top && box.scrollHeight - box.clientHeight >= top) box.scrollTop = top;
      }, delay);
    }
  }

  function onShortcut(e) {
    if (!panel || !e.altKey || !e.shiftKey || e.ctrlKey || e.metaKey) return;
    const n = /^Digit([1-9])$/.exec(e.code);
    if (n && TOOLS[Number(n[1]) - 1]) {
      e.preventDefault();
      if (ui.collapsed) { ui.collapsed = false; storage.saveUi({ collapsed: false }); }
      setTool(TOOLS[Number(n[1]) - 1].id).then(apply);
    } else if (e.code === 'KeyM') {
      e.preventDefault();
      ui.collapsed = !ui.collapsed;
      storage.saveUi({ collapsed: ui.collapsed });
      apply();
    }
  }

  function apply() {
    saveScroll();
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
    collapse.title = ui.collapsed ? 'Expand' : 'Minimize';
    collapse.setAttribute('aria-label', collapse.title);
    const setup = needsSetup && tool !== 'draft' && !ui.collapsed;
    for (const t of TOOLS) panel.querySelector(`.view-${t.id}`).hidden = setup || t.id !== tool;
    panel.querySelector('.setup').hidden = !setup;
    panel.classList.toggle('setting-up', setup);
    slideIndicator();

    const next = ui.collapsed || setup ? null : tool;
    if (next === active) return;
    unmountActive();
    if (next && viewOf(next)) {
      active = next;
      viewOf(next).mount(panel.querySelector(`.view-${next}`));
      restoreScroll(next);
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
    document.removeEventListener('keydown', onShortcut, true);
    document.addEventListener('keydown', onShortcut, true);
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

  function showOutages(labels) {
    const note = panel && panel.querySelector('.source-note');
    if (!note) return;
    note.hidden = labels.length === 0;
    note.textContent = labels.length
      ? `${labels.join(' and ')} ${labels.length === 1 ? 'isn\'t' : 'aren\'t'} responding right now. Everything else keeps working, and it retries on its own.`
      : '';
  }
  NightOwl.api.onAvailability(showOutages);

  function wireSetup() {
    const form = panel.querySelector('.setup');
    const msg = form.querySelector('.setup-msg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = form.username.value.trim();
      if (!username) return;
      const button = form.querySelector('button');
      button.disabled = true;
      msg.textContent = 'Looking you up…';
      try {
        const user = await NightOwl.api.user(username);
        if (user && user.user_id) {
          msg.textContent = '';
          await storage.saveSettings({ username, userId: user.user_id });
        } else {
          msg.textContent = `No Sleeper user named "${username}". Check the spelling.`;
        }
      } catch {
        msg.textContent = "Couldn't reach Sleeper. Try again in a moment.";
      } finally {
        button.disabled = false;
      }
    });
  }

  storage.onChanged((changes) => {
    if (!changes.settings || !panel) return;
    const next = !((changes.settings.newValue || {}).username);
    if (next !== needsSetup) {
      needsSetup = next;
      apply();
    }
  });

  function destroy() {
    unmountActive();
    document.removeEventListener('keydown', onShortcut, true);
    document.getElementById(HOST_ID)?.remove();
    panel = null;
  }

  function navigated() {
    if (active) viewOf(active)?.navigated?.();
  }

  NightOwl.panel = {
    mount,
    destroy,
    setTool,
    navigated,
    tool: () => toolOf(ui && ui.tool)
  };
})(globalThis.NightOwl);
