globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const escapeHtml = NightOwl.format.escape;

  const POSITIONS = ['ALL', 'QB', 'RB', 'WR', 'TE', 'K', 'DEF'];
  const COLUMNS = [
    { key: 'rank', label: 'Rk' },
    { key: 'name', label: 'Player' },
    { key: 'position', label: 'Pos' },
    { key: 'status', label: 'Pick', title: 'Overall pick he went at' },
    { key: 'delta', label: 'Value', title: 'Pick minus your rank: + fell to a value, − went early' }
  ];
  const EMPTY = {
    loading: 'Loading the draft…',
    'no-rankings': 'No rankings yet.<br/>Open the extension popup and hit <b>Sync from Ringer</b>, or add players there.',
    'no-draft': 'No draft on this page.<br/>Open a mock or league draft to see the board, or switch to <b>Live</b>.',
    error: 'Couldn\'t load this draft. Check your connection, then reopen the Draft tab.'
  };

  const missing = (n) => n === null || n === undefined;

  function filterRows(rows, prefs) {
    return rows.filter((row) => !(prefs.hideDrafted && row.pickNo)
      && (prefs.position === 'ALL' || row.position === prefs.position));
  }

  function sortValue(row, key) {
    if (key === 'status') return row.pickNo || 0;
    if (key === 'delta') return missing(row.delta) ? -Infinity : row.delta;
    return row[key];
  }

  function sortRows(rows, prefs) {
    const dir = prefs.sortDir === 'asc' ? 1 : -1;
    const sinkDrafted = prefs.sortBy !== 'status' && prefs.sortBy !== 'delta';
    return rows.slice().sort((a, b) => {
      if (sinkDrafted && !a.pickNo !== !b.pickNo) return a.pickNo ? 1 : -1;
      const av = sortValue(a, prefs.sortBy);
      const bv = sortValue(b, prefs.sortBy);
      if (typeof av === 'string' || typeof bv === 'string') return String(av || '').localeCompare(String(bv || '')) * dir;
      if (av === bv) return 0;
      return (av < bv ? -1 : 1) * dir;
    });
  }

  function rowHtml(row) {
    const classes = [row.pickNo && 'drafted', row.byMe && 'mine', !row.matched && 'unmatched'].filter(Boolean).join(' ');
    const status = row.pickNo ? `#${row.pickNo}` : (row.matched ? '' : 'no match');
    const delta = missing(row.delta)
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
  }

  function tableHtml(rows, prefs) {
    const head = COLUMNS.map((col) => {
      const arrow = prefs.sortBy === col.key ? `<span class="sort">${prefs.sortDir === 'asc' ? '↑' : '↓'}</span>` : '';
      return `<th data-sort="${col.key}"${col.title ? ` title="${escapeHtml(col.title)}"` : ''}>${col.label}${arrow}</th>`;
    }).join('');
    return `<table><thead><tr>${head}</tr></thead><tbody>${rows.map(rowHtml).join('')}</tbody></table>`;
  }

  const live = new WeakMap();

  function bind(element) {
    const change = (patch) => {
      const { prefs, onChange } = live.get(element);
      Object.assign(prefs, patch);
      NightOwl.storage.saveUi(patch);
      onChange();
    };
    element.addEventListener('click', (e) => {
      const chip = e.target.closest('[data-pos]');
      if (chip) return change({ position: chip.dataset.pos });
      const th = e.target.closest('[data-sort]');
      if (th) {
        const { prefs } = live.get(element);
        const key = th.dataset.sort;
        change({ sortBy: key, sortDir: prefs.sortBy === key && prefs.sortDir === 'asc' ? 'desc' : 'asc' });
      }
      return undefined;
    });
    element.addEventListener('change', (e) => {
      if (e.target.matches('[data-act="hide-drafted"]')) change({ hideDrafted: e.target.checked });
    });
  }

  /**
   * @param {Element} element
   * @param {{status?: string, rows?: any[], myTurn?: boolean, message?: string, kind?: string}} state
   * @param {any} prefs
   * @param {() => void} onChange
   */
  function render(element, state, prefs, onChange) {
    if (!live.has(element)) bind(element);
    live.set(element, { prefs, onChange });
    const allRows = state.rows || [];
    const rows = sortRows(filterRows(allRows, prefs), prefs);
    const unmatched = allRows.filter((r) => !r.matched).length;
    const body = state.status !== 'ok'
      ? `<div class="empty">${EMPTY[state.status] || EMPTY.loading}</div>`
      : rows.length ? tableHtml(rows, prefs) : '<div class="empty">Nothing matches the current filter.</div>';

    const html = `
      ${state.myTurn ? `<div class="turn">You're on the clock${state.message ? ` · ${escapeHtml(state.message)}` : ''}</div>` : ''}
      ${state.status !== 'ok' ? '' : `<div class="controls">
        ${POSITIONS.map((p) => `<button class="chip ${prefs.position === p ? 'active' : ''}" data-pos="${p}">${p === 'ALL' ? 'All' : p}</button>`).join('')}
        <label class="toggle"><input type="checkbox" data-act="hide-drafted" ${prefs.hideDrafted ? 'checked' : ''}/> Hide drafted</label>
        <span class="status ${state.kind || ''}">${state.myTurn ? '' : escapeHtml(state.message || '')}</span>
      </div>`}
      ${unmatched > 0 && state.status === 'ok'
        ? `<div class="warnbar">${unmatched} ranked player${unmatched === 1 ? '' : 's'} didn't match a Sleeper player. Check the spelling in the popup.</div>`
        : ''}
      <div class="body">${body}</div>
    `;

    const old = element.querySelector('.body');
    const scroll = old ? old.scrollTop : 0;
    if (!NightOwl.dom.setHtml(element, html)) return;
    const next = element.querySelector('.body');
    if (next) next.scrollTop = scroll;
  }

  NightOwl.draftBoard = { render, filterRows, sortRows };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.draftBoard;
