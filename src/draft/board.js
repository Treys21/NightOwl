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

  const missing = (value) => value === null || value === undefined;

  function filterRows(rows, preferences) {
    return rows.filter((row) => !(preferences.hideDrafted && row.pickNo)
      && (preferences.position === 'ALL' || row.position === preferences.position));
  }

  function sortValue(row, key) {
    if (key === 'status') return row.pickNo || 0;
    if (key === 'delta') return missing(row.delta) ? -Infinity : row.delta;
    return row[key];
  }

  function sortRows(rows, preferences) {
    const direction = preferences.sortDir === 'asc' ? 1 : -1;
    const sinkDrafted = preferences.sortBy !== 'status' && preferences.sortBy !== 'delta';
    return rows.slice().sort((a, b) => {
      if (sinkDrafted && !a.pickNo !== !b.pickNo) return a.pickNo ? 1 : -1;
      const leftValue = sortValue(a, preferences.sortBy);
      const rightValue = sortValue(b, preferences.sortBy);
      if (typeof leftValue === 'string' || typeof rightValue === 'string') return String(leftValue || '').localeCompare(String(rightValue || '')) * direction;
      if (leftValue === rightValue) return 0;
      return (leftValue < rightValue ? -1 : 1) * direction;
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

  function tableHtml(rows, preferences) {
    const head = COLUMNS.map((column) => {
      const arrow = preferences.sortBy === column.key ? `<span class="sort">${preferences.sortDir === 'asc' ? '↑' : '↓'}</span>` : '';
      return `<th data-sort="${column.key}"${column.title ? ` title="${escapeHtml(column.title)}"` : ''}>${column.label}${arrow}</th>`;
    }).join('');
    return `<table><thead><tr>${head}</tr></thead><tbody>${rows.map(rowHtml).join('')}</tbody></table>`;
  }

  const live = new WeakMap();

  function bindEvents(element) {
    const change = (patch) => {
      const { prefs: preferences, onChange } = live.get(element);
      Object.assign(preferences, patch);
      NightOwl.storage.saveUi(patch);
      onChange();
    };
    element.addEventListener('click', (event) => {
      const chip = event.target.closest('[data-pos]');
      if (chip) return change({ position: chip.dataset.pos });
      const header = event.target.closest('[data-sort]');
      if (header) {
        const { prefs: preferences } = live.get(element);
        const key = header.dataset.sort;
        change({ sortBy: key, sortDir: preferences.sortBy === key && preferences.sortDir === 'asc' ? 'desc' : 'asc' });
      }
      return undefined;
    });
    element.addEventListener('change', (event) => {
      if (event.target.matches('[data-act="hide-drafted"]')) change({ hideDrafted: event.target.checked });
    });
  }

  /**
   * @param {Element} element
   * @param {{status?: string, rows?: any[], myTurn?: boolean, message?: string, kind?: string}} state
   * @param {any} preferences
   * @param {() => void} onChange
   */
  function render(element, state, preferences, onChange) {
    if (!live.has(element)) bindEvents(element);
    live.set(element, { prefs: preferences, onChange });
    const allRows = state.rows || [];
    const rows = sortRows(filterRows(allRows, preferences), preferences);
    const unmatched = allRows.filter((allRow) => !allRow.matched).length;
    const body = state.status !== 'ok'
      ? `<div class="empty">${EMPTY[state.status] || EMPTY.loading}</div>`
      : rows.length ? tableHtml(rows, preferences) : '<div class="empty">Nothing matches the current filter.</div>';

    const html = `
      ${state.myTurn ? `<div class="turn">You're on the clock${state.message ? ` · ${escapeHtml(state.message)}` : ''}</div>` : ''}
      ${state.status !== 'ok' ? '' : `<div class="controls">
        ${POSITIONS.map((position) => `<button class="chip ${preferences.position === position ? 'active' : ''}" data-pos="${position}">${position === 'ALL' ? 'All' : position}</button>`).join('')}
        <label class="toggle"><input type="checkbox" data-act="hide-drafted" ${preferences.hideDrafted ? 'checked' : ''}/> Hide drafted</label>
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
