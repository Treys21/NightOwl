// The floating toolkit panel: one shell with a Draft | Live | Lineups switch.
// Rendered into a shadow root so Sleeper's CSS can't bleed in and ours can't
// leak out. The Draft view (big board) is drawn here; Live and Lineups mount
// their own views into it. The inline badges are decoration on the board.
globalThis.SDR = globalThis.SDR || {};

(function (SDR) {
  'use strict';

  const HOST_ID = 'sdr-panel-host';
  SDR.live = globalThis.SLT.live;
  SDR.lineups = globalThis.SLT.lineupsView;
  SDR.bets = globalThis.SLT.betsView;
  const POSITIONS = ['ALL', 'QB', 'RB', 'WR', 'TE', 'K', 'DEF'];

  // Sleeper's own palette (read off sleeper.com): navy panels, teal accent
  // with navy ink on it, pink for bad news, blue-grey secondary text.
  const CSS = `
    :host { all: initial; }
    * { box-sizing: border-box; }
    .panel {
      position: fixed; width: 430px; max-height: 70vh; display: flex; flex-direction: column;
      /* Drag the bottom-right corner to resize; the size is remembered. */
      resize: both; min-width: 360px; max-width: min(760px, 96vw); min-height: 240px;
      font: 13.5px/1.4 Inter, Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #fff; border-radius: 18px; isolation: isolate;
      box-shadow: 0 24px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.04);
      z-index: 2147483647; overflow: hidden;
      animation: panel-in .5s cubic-bezier(.2,1.2,.4,1);
    }
    @keyframes panel-in { from { opacity: 0; transform: translateY(12px) scale(.97); } }
    /* Frame: a slowly turning gradient ring (the 1.5px gap between ::before and ::after). */
    .panel::before {
      content: ''; position: absolute; inset: -60%; z-index: -2;
      background: conic-gradient(from 0deg, #00ceb8, #56c9f8, #bd66ff, #f75c8d, #feae58, #00ceb8);
      animation: spin 9s linear infinite; opacity: .45; will-change: transform;
    }
    .panel.hot::before { animation-duration: 2.8s; opacity: 1; }
    /* Aurora: three soft colour fields drifting behind everything. */
    .panel::after {
      content: ''; position: absolute; inset: 1.5px; z-index: -1; border-radius: 16.5px;
      background:
        radial-gradient(60% 40% at 15% 10%, rgba(0,206,184,.12), transparent 70%),
        radial-gradient(55% 40% at 85% 45%, rgba(189,102,255,.09), transparent 70%),
        radial-gradient(60% 45% at 30% 95%, rgba(247,92,141,.07), transparent 70%),
        linear-gradient(180deg, #151a27, #11141e);
      background-size: 180% 180%, 180% 180%, 180% 180%, 100% 100%;
      background-position: 0% 0%, 100% 50%, 0% 100%, 0 0;
      /* Static on purpose: an animated background repaints everything above
         it every frame, which made scrolling the lists stutter. */
    }
    @keyframes spin { to { transform: rotate(1turn); } }
    @keyframes pillflow { to { background-position: 300% 0; } }
    @media (prefers-reduced-motion: reduce) { .panel, .panel::before, .panel::after, .brand .outer, .brand .inner, .brand .eyes, .brand .pupil, .switch .ind { animation: none; transition: none; } }
    .panel.tall { height: min(780px, 86vh); max-height: 96vh; }
    .panel.collapsed { height: auto; }
    .panel.collapsed .view { display: none; }
    .panel.collapsed header { border-radius: 16.5px; margin-bottom: 1.5px; border-bottom: 0; }
    .view { margin: 0 1.5px 1.5px; }
    header {
      display: flex; align-items: center; gap: 8px; padding: 9px 10px 9px 11px; margin: 1.5px 1.5px 0;
      background: linear-gradient(180deg, rgba(31,36,49,.95), rgba(24,28,40,.8));
      border-bottom: 1px solid rgba(58,70,91,.7); border-radius: 16.5px 16.5px 0 0;
      cursor: move; user-select: none;
    }
    /* The Night Owl mark (double neon frame): its tubes power on one after
       another when the panel opens — outer frame, inner frame, eyes — and the
       pupils blink now and then. */
    .brand { width: 26px; height: 26px; flex: none; display: block; filter: drop-shadow(0 0 5px rgba(255,79,216,.45)); }
    .brand .outer { animation: owl-on 1s .1s both; }
    .brand .inner { animation: owl-on 1s .45s both; }
    .brand .eyes { animation: owl-on 1s .8s both; }
    .brand .pupil { transform-box: fill-box; transform-origin: center; animation: owl-blink 5s 2.5s infinite; }
    @keyframes owl-on { 0% { opacity: .12; } 20% { opacity: 1; } 30% { opacity: .25; } 45% { opacity: 1; } 55% { opacity: .45; } 70%, 100% { opacity: 1; } }
    @keyframes owl-blink { 0%, 92%, 100% { transform: scaleY(1); } 95% { transform: scaleY(.1); } }
    .switch {
      position: relative; display: flex; flex: 1; padding: 3px; border-radius: 11px;
      background: rgba(0,0,0,.28); box-shadow: inset 0 1px 2px rgba(0,0,0,.4);
    }
    .switch .ind {
      position: absolute; top: 3px; bottom: 3px; left: 3px; width: 0; border-radius: 8px;
      background: linear-gradient(120deg, #00ceb8, #2fe6d2, #56c9f8, #00ceb8);
      background-size: 300% 100%; animation: pillflow 6s linear infinite;
      box-shadow: 0 4px 16px rgba(0,206,184,.45), inset 0 1px 0 rgba(255,255,255,.35);
      transition: left .4s cubic-bezier(.3,1.4,.5,1), width .4s cubic-bezier(.3,1.4,.5,1);
    }
    .switch button {
      position: relative; z-index: 1; flex: 1;
      font: 600 12.5px Poppins, sans-serif; border: 0; border-radius: 8px; padding: 5px 4px;
      background: none; color: #a3bbd3; cursor: pointer; transition: color .25s; white-space: nowrap;
    }
    .switch button:hover { color: #fff; }
    .switch button.on { color: #022047; }
    .status { font-size: 12px; color: #bfcfe0; }
    .status.warn { color: #feae58; }
    .status.err { color: #f75c8d; }
    .iconbtn {
      background: none; border: none; color: #8d9fbc; cursor: pointer;
      font-size: 16px; padding: 2px 6px; border-radius: 6px;
    }
    .iconbtn:hover { background: #262e3e; color: #fff; }
    .view { display: flex; flex-direction: column; min-height: 0; flex: 1; }
    .view[hidden] { display: none; }
    .view-live, .view-lineups, .view-bets { overflow: hidden; position: relative; }
    .turn {
      padding: 7px 12px; background: #00ceb8; color: #022047;
      font: 700 13px Poppins, sans-serif; text-align: center; letter-spacing: .03em;
    }
    .controls {
      display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
      padding: 8px 12px; border-bottom: 1px solid #3a465b;
    }
    .chip {
      background: #262e3e; border: 0; color: #a3bbd3;
      padding: 3px 10px; border-radius: 32px; font: 600 12px Poppins, sans-serif; cursor: pointer;
    }
    .chip.active { background: #00ceb8; color: #022047; }
    label.toggle { display: flex; align-items: center; gap: 5px; font-size: 12px; color: #a3bbd3; cursor: pointer; }
    label.toggle input { accent-color: #00ceb8; }
    .body { overflow: auto; flex: 1; }
    table { width: 100%; border-collapse: collapse; }
    th {
      position: sticky; top: 0; background: #1f2431; text-align: left;
      font: 600 12px Poppins, sans-serif; color: #8d9fbc; padding: 7px 10px; cursor: pointer;
      border-bottom: 1px solid #3a465b; white-space: nowrap;
    }
    th:hover { color: #fff; }
    td { padding: 6px 10px; border-bottom: 1px solid rgba(58,70,91,.5); white-space: nowrap; }
    tr.drafted { opacity: .4; }
    tr.drafted .name { text-decoration: line-through; }
    tr.mine { background: rgba(0,206,184,.12); }
    tr.unmatched .name { color: #feae58; }
    .name { font-weight: 600; }
    .meta { color: #bfcfe0; font-size: 12px; }
    .delta.value { color: #00ceb8; font-weight: 700; }
    .delta.reach { color: #f75c8d; font-weight: 700; }
    .empty { padding: 26px 16px; text-align: center; color: #a3bbd3; font-size: 13px; }
    tbody tr { transition: background .15s; }
    tbody tr:hover { background: rgba(163,187,211,.06); }
    .pos-pill { font: 700 11px Poppins, sans-serif; padding: 1px 7px; border-radius: 32px; background: #262e3e; }
    .pos-pill.QB { color: #fc2b6d; } .pos-pill.RB { color: #20ceb8; } .pos-pill.WR { color: #56c9f8; }
    .pos-pill.TE { color: #feae58; } .pos-pill.K { color: #bd66ff; } .pos-pill.DEF { color: #bf755d; }
    .chip { transition: transform .15s, background .2s; }
    .chip:active { transform: scale(.92); }
    .warnbar { padding: 6px 12px; font-size: 12px; color: #feae58; background: rgba(254,174,88,.08); }
  `;

  const COLUMNS = [
    { key: 'rank', label: 'Rk' },
    { key: 'name', label: 'Player' },
    { key: 'position', label: 'Pos' },
    { key: 'status', label: 'Status' },
    { key: 'delta', label: 'Δ' }
  ];

  let shadow = null;
  let ui = null;
  let lastState = { status: 'loading', rows: [] };

  const TOOLS = [
    { id: 'draft', label: 'Draft' },
    { id: 'live', label: 'Live' },
    { id: 'lineups', label: 'Lineups' },
    { id: 'bets', label: 'Bets' }
  ];
  const toolOf = (value) => (TOOLS.some((t) => t.id === value) ? value : 'draft');

  async function mount() {
    if (document.getElementById(HOST_ID)) return;
    ui = await SDR.storage.getUi();

    const host = document.createElement('div');
    host.id = HOST_ID;
    document.documentElement.appendChild(host);
    shadow = host.attachShadow({ mode: 'open' });

    SDR.dom.applyStyles(shadow, CSS);
    SDR.dom.applyStyles(shadow, globalThis.SLT.liveCss);
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.innerHTML = `
      <header>
        <svg class="brand" viewBox="0 0 128 128" role="img" aria-label="Night Owl">
          <rect width="128" height="128" rx="30" fill="#140f2e"/>
          <rect class="outer" x="6" y="6" width="116" height="116" rx="28" fill="none" stroke="#ff4fd8" stroke-width="7"/>
          <rect class="inner" x="17" y="17" width="94" height="94" rx="20" fill="none" stroke="#3df5ff" stroke-width="5"/>
          <g class="eyes">
            <circle cx="44" cy="65" r="16" fill="none" stroke="#ff4fd8" stroke-width="10"/>
            <circle cx="84" cy="65" r="16" fill="none" stroke="#ff4fd8" stroke-width="10"/>
            <circle class="pupil" cx="45" cy="64" r="6.5" fill="#3df5ff"/><circle class="pupil" cx="85" cy="64" r="6.5" fill="#3df5ff"/>
          </g>
        </svg>
        <div class="switch">
          <span class="ind"></span>
          ${TOOLS.map((t) => `<button data-tool="${t.id}">${t.label}</button>`).join('')}
        </div>
        <span class="status"></span>
        <button class="iconbtn" data-act="collapse"></button>
      </header>
      <div class="view view-draft"></div>
      <div class="view view-live"></div>
      <div class="view view-lineups"></div>
      <div class="view view-bets"></div>
    `;
    shadow.append(panel);

    wireShell(panel);
    applyTool(panel);
    positionPanel(panel);
    rememberSize(panel);
    setTimeout(() => slideIndicator(panel), 400); // after webfonts settle
    render(lastState);
  }

  // One tool at a time: the live tracker only exists (and only polls) while
  // Live is showing; the draft loop in content.js is stopped while it isn't.
  function applyTool(panel) {
    const tool = toolOf(ui.tool);
    // Live, Lineups and Bets get the tall panel.
    panel.classList.toggle('tall', tool !== 'draft');
    panel.style.height = ui.h && tool !== 'draft' && !ui.collapsed ? `${ui.h}px` : '';
    panel.classList.toggle('collapsed', ui.collapsed);
    panel.querySelectorAll('[data-tool]').forEach((b) => b.classList.toggle('on', b.dataset.tool === tool));
    slideIndicator(panel);
    panel.querySelector('[data-act="collapse"]').textContent = ui.collapsed ? '▢' : '—';

    const draftView = panel.querySelector('.view-draft');
    const liveView = panel.querySelector('.view-live');
    const lineupsView = panel.querySelector('.view-lineups');
    const betsView = panel.querySelector('.view-bets');
    draftView.hidden = tool !== 'draft';
    liveView.hidden = tool !== 'live';
    lineupsView.hidden = tool !== 'lineups';
    betsView.hidden = tool !== 'bets';
    panel.querySelector('.status').hidden = tool !== 'draft';

    // Live and Lineups render straight into the shadow root and poll only
    // while mounted.
    if (tool === 'live' && !ui.collapsed) SDR.live.mount(liveView);
    else SDR.live.unmount();
    if (tool === 'lineups' && !ui.collapsed) SDR.lineups.mount(lineupsView);
    else SDR.lineups.unmount();
    if (tool === 'bets' && !ui.collapsed) SDR.bets.mount(betsView);
    else SDR.bets.unmount();
  }

  // Save the size after the user drags the resize corner.
  function rememberSize(panel) {
    let timer = null;
    new ResizeObserver(() => {
      if (ui.collapsed) return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const w = panel.offsetWidth;
        const h = panel.offsetHeight;
        const patch = {};
        if (w && w !== ui.w && panel.style.width) patch.w = ui.w = w;
        if (h && panel.classList.contains('tall') && panel.style.height && h !== ui.h) patch.h = ui.h = h;
        if (Object.keys(patch).length) SDR.storage.saveUi(patch);
        slideIndicator(panel);
      }, 300);
    }).observe(panel);
  }

  // The glowing pill glides under whichever tool is active.
  function slideIndicator(panel) {
    requestAnimationFrame(() => {
      const on = panel.querySelector('.switch button.on');
      const ind = panel.querySelector('.switch .ind');
      if (!on || !ind) return;
      ind.style.left = `${on.offsetLeft}px`;
      ind.style.width = `${on.offsetWidth}px`;
    });
  }

  // silent: the caller (content.js routing) is already acting on the switch.
  async function setTool(tool, { silent = false } = {}) {
    if (ui.tool === tool) return;
    ui.tool = tool;
    await SDR.storage.saveUi({ tool });
    const panel = shadow && shadow.querySelector('.panel');
    if (panel) applyTool(panel);
    if (!silent) toolListeners.forEach((fn) => fn(tool));
  }

  const toolListeners = [];

  function positionPanel(panel) {
    if (ui.w) panel.style.width = `${ui.w}px`;
    // A remembered height applies to the tall tools; the board sizes to its rows.
    panel.style.height = ui.h && panel.classList.contains('tall') ? `${ui.h}px` : '';
    const x = ui.x === null ? window.innerWidth - (ui.w || 430) - 20 : ui.x;
    const y = ui.y === null ? 80 : ui.y;
    panel.style.left = `${clamp(x, 0, window.innerWidth - 100)}px`;
    panel.style.top = `${clamp(y, 0, window.innerHeight - 60)}px`;
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), Math.max(min, max));
  }

  function render(state) {
    lastState = state;
    if (!shadow) return;

    const panel = shadow.querySelector('.panel');
    const status = panel.querySelector('.status');
    status.className = `status ${state.statusKind || ''}`;
    status.textContent = state.message || '';

    const rows = sortRows(filterRows(state.rows || []));
    const unmatched = (state.rows || []).filter((r) => !r.matched).length;
    const view = panel.querySelector('.view-draft');

    view.innerHTML = `
      ${state.myTurn ? '<div class="turn">YOU ARE ON THE CLOCK</div>' : ''}
      <div class="controls">
        ${POSITIONS.map(
          (p) => `<button class="chip ${ui.position === p ? 'active' : ''}" data-pos="${p}">${p}</button>`
        ).join('')}
        <label class="toggle">
          <input type="checkbox" data-act="hide-drafted" ${ui.hideDrafted ? 'checked' : ''}/>
          hide drafted
        </label>
      </div>
      ${unmatched > 0
        ? `<div class="warnbar">${unmatched} ranked player${unmatched === 1 ? '' : 's'} didn't match a Sleeper player — check spelling in the popup.</div>`
        : ''}
      <div class="body">${renderTable(rows, state)}</div>
    `;

    positionPanel(panel);
    wire(view);
  }

  function renderTable(rows, state) {
    if (state.status === 'no-rankings') {
      return '<div class="empty">No rankings yet.<br/>Open the extension popup and hit <b>Sync from Ringer</b>, or add players there.</div>';
    }
    if (state.status === 'no-draft') {
      return '<div class="empty">No draft on this page.<br/>Open a mock or league draft to see the board — or switch to <b>Live</b>.</div>';
    }
    if (rows.length === 0) {
      return '<div class="empty">Nothing matches the current filter.</div>';
    }

    const head = COLUMNS.map((col) => {
      const arrow = ui.sortBy === col.key ? (ui.sortDir === 'asc' ? ' ▲' : ' ▼') : '';
      return `<th data-sort="${col.key}">${col.label}${arrow}</th>`;
    }).join('');

    const body = rows.map((row) => {
      const classes = [
        row.pickNo ? 'drafted' : '',
        row.byMe ? 'mine' : '',
        row.matched ? '' : 'unmatched'
      ].filter(Boolean).join(' ');

      const status = row.pickNo ? `#${row.pickNo}` : (row.matched ? 'available' : 'no match');
      const delta = row.delta === null || row.delta === undefined
        ? ''
        : `<span class="delta ${row.delta > 0 ? 'value' : 'reach'}">${row.delta > 0 ? '+' : ''}${row.delta}</span>`;

      return `
        <tr class="${classes}">
          <td>${row.rank}</td>
          <td><span class="name">${escapeHtml(row.name)}</span> <span class="meta">${escapeHtml(row.team || '')}</span></td>
          <td><span class="pos-pill ${escapeHtml(row.position || '')}">${escapeHtml(row.position || '')}</span></td>
          <td class="meta">${status}</td>
          <td>${delta}</td>
        </tr>`;
    }).join('');

    return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
  }

  function filterRows(rows) {
    return rows.filter((row) => {
      if (ui.hideDrafted && row.pickNo) return false;
      if (ui.position !== 'ALL' && row.position !== ui.position) return false;
      return true;
    });
  }

  function sortRows(rows) {
    const dir = ui.sortDir === 'asc' ? 1 : -1;
    const key = ui.sortBy;
    return rows.slice().sort((a, b) => {
      let av = a[key];
      let bv = b[key];
      if (key === 'status') {
        // Available players sort ahead of drafted ones.
        av = a.pickNo || Infinity;
        bv = b.pickNo || Infinity;
      }
      if (key === 'delta') {
        av = a.delta === null || a.delta === undefined ? -Infinity : a.delta;
        bv = b.delta === null || b.delta === undefined ? -Infinity : b.delta;
      }
      if (typeof av === 'string' || typeof bv === 'string') {
        return String(av || '').localeCompare(String(bv || '')) * dir;
      }
      return ((av || 0) - (bv || 0)) * dir;
    });
  }

  function wireShell(panel) {
    panel.querySelector('[data-act="collapse"]').addEventListener('click', async () => {
      ui.collapsed = !ui.collapsed;
      await SDR.storage.saveUi({ collapsed: ui.collapsed });
      applyTool(panel);
    });
    panel.querySelectorAll('[data-tool]').forEach((b) => {
      b.addEventListener('click', () => setTool(b.dataset.tool));
    });
    enableDrag(panel, panel.querySelector('header'));
  }

  function wire(panel) {
    panel.querySelectorAll('[data-pos]').forEach((chip) => {
      chip.addEventListener('click', async () => {
        ui.position = chip.dataset.pos;
        await SDR.storage.saveUi({ position: ui.position });
        render(lastState);
      });
    });

    const hideDrafted = panel.querySelector('[data-act="hide-drafted"]');
    if (hideDrafted) {
      hideDrafted.addEventListener('change', async () => {
        ui.hideDrafted = hideDrafted.checked;
        await SDR.storage.saveUi({ hideDrafted: ui.hideDrafted });
        render(lastState);
      });
    }

    panel.querySelectorAll('[data-sort]').forEach((th) => {
      th.addEventListener('click', async () => {
        const key = th.dataset.sort;
        ui.sortDir = ui.sortBy === key && ui.sortDir === 'asc' ? 'desc' : 'asc';
        ui.sortBy = key;
        await SDR.storage.saveUi({ sortBy: ui.sortBy, sortDir: ui.sortDir });
        render(lastState);
      });
    });
  }

  function enableDrag(panel, handle) {
    let startX = 0;
    let startY = 0;
    let originX = 0;
    let originY = 0;

    handle.addEventListener('mousedown', (event) => {
      if (event.target.closest('button')) return;

      startX = event.clientX;
      startY = event.clientY;
      originX = parseInt(panel.style.left, 10) || 0;
      originY = parseInt(panel.style.top, 10) || 0;
      event.preventDefault();

      const onMove = (moveEvent) => {
        panel.style.left = `${originX + moveEvent.clientX - startX}px`;
        panel.style.top = `${originY + moveEvent.clientY - startY}px`;
      };
      const onUp = () => {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        ui.x = parseInt(panel.style.left, 10);
        ui.y = parseInt(panel.style.top, 10);
        SDR.storage.saveUi({ x: ui.x, y: ui.y });
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  }

  function escapeHtml(text) {
    return String(text == null ? '' : text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  SDR.panel = {
    mount,
    render,
    setTool,
    tool: () => toolOf(ui && ui.tool),
    onToolChange: (fn) => toolListeners.push(fn),
    unmount: () => document.getElementById(HOST_ID)?.remove()
  };
})(globalThis.SDR);
