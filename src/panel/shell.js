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
    { id: 'live', label: 'Live' },
    { id: 'lineups', label: 'Lineups' },
    { id: 'season', label: 'Season' },
    { id: 'moves', label: 'Moves' },
    { id: 'draft', label: 'Draft' },
    { id: 'bets', label: 'Bets' }
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

  let uiState = null;
  let panel = null;
  let mounting = null;
  let active = null;
  let needsSetup = false;

  const toolOf = (value) => (TOOLS.some((tool) => tool.id === value) ? value : 'live');
  const viewOf = (toolId) => NightOwl.views && NightOwl.views[toolId];
  const clamp = (value, min, max) => Math.min(Math.max(value, min), Math.max(min, max));

  function mount() {
    if (panel && panel.isConnected) return Promise.resolve();
    mounting = mounting || build().finally(() => { mounting = null; });
    return mounting;
  }

  async function build() {
    unmountActive();
    document.getElementById(HOST_ID)?.remove();
    uiState = await storage.getUi();
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
          ${TOOLS.map((tool, i) => `<button role="tab" data-tool="${tool.id}" title="${tool.label} (Alt+Shift+${i + 1})">${tool.label}</button>`).join('')}
        </div>
        <button class="iconbtn" data-act="collapse"></button>
      </header>
      ${TOOLS.map((tool) => `<div class="view view-${tool.id}" hidden></div>`).join('')}
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
      ${EDGES.map((event) => `<div class="rz rz-${event}" data-edge="${event}" aria-hidden="true"></div>`).join('')}
    `;
    shadow.append(panel);
    document.documentElement.appendChild(host);

    wirePanelEvents();
    wireSetup();
    showOutages(NightOwl.api.unavailable());
    apply();
    enableResize();
    setTimeout(slideIndicator, 400);
    if (typeof ResizeObserver !== 'undefined') {
      const watcher = new ResizeObserver(slideIndicator);
      panel.querySelectorAll('.switch, .switch button').forEach((element) => watcher.observe(element));
    }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(slideIndicator);
  }

  window.addEventListener('resize', () => {
    if (!panel) return;
    place();
    slideIndicator();
  });

  const scrolled = new Map();
  const scroller = (toolId) => panel && panel.querySelector(`.view-${toolId} .tool-scroll`);

  function saveScroll() {
    const box = active && scroller(active);
    if (box) scrolled.set(active, box.scrollTop);
  }

  function unmountActive() {
    if (active) viewOf(active)?.unmount();
    active = null;
  }

  function restoreScroll(toolId) {
    const top = scrolled.get(toolId);
    if (!top) return;
    for (const delay of [0, 300, 1200]) {
      setTimeout(() => {
        const box = active === toolId && scroller(toolId);
        if (box && box.scrollTop < top && box.scrollHeight - box.clientHeight >= top) box.scrollTop = top;
      }, delay);
    }
  }

  function onShortcut(event) {
    if (!panel || !event.altKey || !event.shiftKey || event.ctrlKey || event.metaKey) return;
    const digitKey = /^Digit([1-9])$/.exec(event.code);
    if (digitKey && TOOLS[Number(digitKey[1]) - 1]) {
      event.preventDefault();
      if (uiState.collapsed) { uiState.collapsed = false; storage.saveUi({ collapsed: false }); }
      setTool(TOOLS[Number(digitKey[1]) - 1].id).then(apply);
    } else if (event.code === 'KeyM') {
      event.preventDefault();
      uiState.collapsed = !uiState.collapsed;
      storage.saveUi({ collapsed: uiState.collapsed });
      apply();
    }
  }

  function apply() {
    saveScroll();
    const tool = toolOf(uiState.tool);
    panel.classList.toggle('collapsed', uiState.collapsed);
    place();
    panel.querySelectorAll('[data-tool]').forEach((tabButton) => {
      const isActive = tabButton.dataset.tool === tool;
      tabButton.classList.toggle('on', isActive);
      tabButton.setAttribute('aria-selected', String(isActive));
    });
    const collapse = panel.querySelector('[data-act="collapse"]');
    collapse.textContent = uiState.collapsed ? '▢' : '—';
    collapse.title = uiState.collapsed ? 'Expand' : 'Minimize';
    collapse.setAttribute('aria-label', collapse.title);
    const setup = needsSetup && tool !== 'draft' && !uiState.collapsed;
    for (const toolInfo of TOOLS) panel.querySelector(`.view-${toolInfo.id}`).hidden = setup || toolInfo.id !== tool;
    panel.querySelector('.setup').hidden = !setup;
    panel.classList.toggle('setting-up', setup);
    slideIndicator();

    const next = uiState.collapsed || setup ? null : tool;
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
    if (uiState.tool === tool) return;
    uiState.tool = tool;
    storage.saveUi({ tool });
    apply();
  }

  function slideIndicator() {
    requestAnimationFrame(() => {
      const activeButton = panel && panel.querySelector('.switch button.on');
      const indicator = panel && panel.querySelector('.switch .ind');
      if (!activeButton || !indicator) return;
      indicator.style.left = `${activeButton.offsetLeft}px`;
      indicator.style.width = `${activeButton.offsetWidth}px`;
    });
  }

  const viewW = () => document.documentElement.clientWidth || window.innerWidth;
  const viewH = () => window.innerHeight;

  function place() {
    const maxW = viewW() - GAP * 2;
    const maxH = viewH() - GAP * 2;
    const width = clamp(uiState.w || DEFAULT_W, Math.min(MIN_W, maxW), maxW);
    const height = clamp(uiState.h || Math.min(DEFAULT_H, Math.round(viewH() * 0.86)), Math.min(MIN_H, maxH), maxH);
    panel.style.width = `${width}px`;
    panel.style.height = uiState.collapsed ? '' : `${height}px`;
    const left = uiState.x === null ? viewW() - width - 20 : uiState.x;
    const top = uiState.y === null ? 80 : uiState.y;
    panel.style.left = `${clamp(left, GAP, viewW() - width - GAP)}px`;
    panel.style.top = `${clamp(top, GAP, viewH() - (uiState.collapsed ? 60 : height) - GAP)}px`;
  }

  function enableResize() {
    panel.querySelectorAll('.rz').forEach((handle) => {
      handle.addEventListener('pointerdown', (event) => {
        if (event.button !== 0 || uiState.collapsed) return;
        event.preventDefault();
        handle.setPointerCapture(event.pointerId);
        const edge = handle.dataset.edge;
        const start = panel.getBoundingClientRect();
        const startX = event.clientX;
        const startY = event.clientY;
        panel.classList.add('resizing');

        const onMove = (event) => {
          const deltaX = event.clientX - startX;
          const deltaY = event.clientY - startY;
          let { left, top, width, height } = start;
          if (edge.includes('e')) width = clamp(width + deltaX, MIN_W, viewW() - left - GAP);
          if (edge.includes('s')) height = clamp(height + deltaY, MIN_H, viewH() - top - GAP);
          if (edge.includes('w')) {
            const newWidth = clamp(width - deltaX, MIN_W, start.right - GAP);
            left = start.right - newWidth;
            width = newWidth;
          }
          if (edge.includes('n')) {
            const newHeight = clamp(height - deltaY, MIN_H, start.bottom - GAP);
            top = start.bottom - newHeight;
            height = newHeight;
          }
          Object.assign(panel.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` });
          slideIndicator();
        };
        const onUp = () => {
          handle.removeEventListener('pointermove', onMove);
          handle.removeEventListener('pointerup', onUp);
          handle.removeEventListener('pointercancel', onUp);
          panel.classList.remove('resizing');
          const bounds = panel.getBoundingClientRect();
          Object.assign(uiState, { x: Math.round(bounds.left), y: Math.round(bounds.top), w: Math.round(bounds.width), h: Math.round(bounds.height) });
          storage.saveUi({ x: uiState.x, y: uiState.y, w: uiState.w, h: uiState.h });
        };
        handle.addEventListener('pointermove', onMove);
        handle.addEventListener('pointerup', onUp);
        handle.addEventListener('pointercancel', onUp);
      });
    });
  }

  function resetSize() {
    Object.assign(uiState, { w: null, h: null });
    storage.saveUi({ w: null, h: null });
    place();
    slideIndicator();
  }

  function wirePanelEvents() {
    document.removeEventListener('keydown', onShortcut, true);
    document.addEventListener('keydown', onShortcut, true);
    panel.querySelector('[data-act="collapse"]').addEventListener('click', () => {
      uiState.collapsed = !uiState.collapsed;
      storage.saveUi({ collapsed: uiState.collapsed });
      apply();
    });
    panel.querySelectorAll('[data-tool]').forEach((tabButton) => {
      tabButton.addEventListener('click', () => setTool(tabButton.dataset.tool));
    });
    enableDrag(panel.querySelector('header'));
    panel.querySelector('header').addEventListener('dblclick', (event) => {
      if (!event.target.closest('button')) resetSize();
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

      const onMove = (event) => {
        const bounds = panel.getBoundingClientRect();
        panel.style.left = `${clamp(originX + event.clientX - startX, GAP, viewW() - bounds.width - GAP)}px`;
        panel.style.top = `${clamp(originY + event.clientY - startY, GAP, viewH() - bounds.height - GAP)}px`;
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        uiState.x = parseInt(panel.style.left, 10);
        uiState.y = parseInt(panel.style.top, 10);
        storage.saveUi({ x: uiState.x, y: uiState.y });
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
    const message = form.querySelector('.setup-msg');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = form.username.value.trim();
      if (!username) return;
      const button = form.querySelector('button');
      button.disabled = true;
      message.textContent = 'Looking you up…';
      try {
        const user = await NightOwl.api.user(username);
        if (user && user.user_id) {
          message.textContent = '';
          await storage.saveSettings({ username, userId: user.user_id });
        } else {
          message.textContent = `No Sleeper user named "${username}". Check the spelling.`;
        }
      } catch {
        message.textContent = "Couldn't reach Sleeper. Try again in a moment.";
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
    tool: () => toolOf(uiState && uiState.tool)
  };
})(globalThis.NightOwl);
