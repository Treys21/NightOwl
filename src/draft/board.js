// The draft big board: your rankings, with who's been taken, by whom, and how
// far each pick landed from where you had him. Rendering only — draft.js owns
// the data. Filter and sort choices persist in the ui settings.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const esc = NightOwl.format.escape;

  const POSITIONS = ['ALL', 'QB', 'RB', 'WR', 'TE', 'K', 'DEF'];
  const COLUMNS = [
    { key: 'rank', label: 'Rk' },
    { key: 'name', label: 'Player' },
    { key: 'position', label: 'Pos' },
    { key: 'status', label: 'Status' },
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
    if (key === 'status') return row.pickNo || 0; // ascending: available first, then by pick
    if (key === 'delta') return missing(row.delta) ? -Infinity : row.delta;
    return row[key];
  }

  function sortRows(rows, prefs) {
    const dir = prefs.sortDir === 'asc' ? 1 : -1;
    // Who's still available matters most: drafted players sink below them,
    // except when sorting by status or value, which are about the picks.
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
    const status = row.pickNo ? `#${row.pickNo}` : (row.matched ? 'available' : 'no match');
    const delta = missing(row.delta)
      ? ''
      : `<span class="delta ${row.delta > 0 ? 'value' : 'reach'}">${row.delta > 0 ? '+' : ''}${row.delta}</span>`;
    return `
      <tr class="${classes}">
        <td>${row.rank}</td>
        <td><span class="name">${esc(row.name)}</span> <span class="meta">${esc(row.team || '')}</span></td>
        <td><span class="pos-pill ${esc(row.position || '')}">${esc(row.position || '')}</span></td>
        <td class="meta">${status}</td>
        <td>${delta}</td>
      </tr>`;
  }

  function tableHtml(rows, prefs) {
    const head = COLUMNS.map((col) => {
      const arrow = prefs.sortBy === col.key ? (prefs.sortDir === 'asc' ? ' ▲' : ' ▼') : '';
      return `<th data-sort="${col.key}"${col.title ? ` title="${esc(col.title)}"` : ''}>${col.label}${arrow}</th>`;
    }).join('');
    return `<table><thead><tr>${head}</tr></thead><tbody>${rows.map(rowHtml).join('')}</tbody></table>`;
  }

  /**
   * Draw the board into el.
   * @param state { status, rows, myTurn, message, kind } from draft.js
   * @param prefs the ui settings (position, hideDrafted, sortBy, sortDir); edited in place
   * @param onChange called after the user changes a filter or sort
   */
  function render(el, state, prefs, onChange) {
    const allRows = state.rows || [];
    const rows = sortRows(filterRows(allRows, prefs), prefs);
    const unmatched = allRows.filter((r) => !r.matched).length;
    const body = state.status !== 'ok'
      ? `<div class="empty">${EMPTY[state.status] || EMPTY.loading}</div>`
      : rows.length ? tableHtml(rows, prefs) : '<div class="empty">Nothing matches the current filter.</div>';

    el.innerHTML = `
      ${state.myTurn ? `<div class="turn">You're on the clock${state.message ? ` · ${esc(state.message)}` : ''}</div>` : ''}
      <div class="controls">
        ${POSITIONS.map((p) => `<button class="chip ${prefs.position === p ? 'active' : ''}" data-pos="${p}">${p}</button>`).join('')}
        <label class="toggle"><input type="checkbox" data-act="hide-drafted" ${prefs.hideDrafted ? 'checked' : ''}/> hide drafted</label>
        <span class="status ${state.kind || ''}">${state.myTurn ? '' : esc(state.message || '')}</span>
      </div>
      ${unmatched > 0 && state.status === 'ok'
        ? `<div class="warnbar">${unmatched} ranked player${unmatched === 1 ? '' : 's'} didn't match a Sleeper player. Check the spelling in the popup.</div>`
        : ''}
      <div class="body">${body}</div>
    `;

    const change = (patch) => {
      Object.assign(prefs, patch);
      NightOwl.storage.saveUi(patch);
      onChange();
    };
    el.querySelectorAll('[data-pos]').forEach((chip) => {
      chip.addEventListener('click', () => change({ position: chip.dataset.pos }));
    });
    el.querySelector('[data-act="hide-drafted"]').addEventListener('change', (e) => change({ hideDrafted: e.target.checked }));
    el.querySelectorAll('[data-sort]').forEach((th) => {
      th.addEventListener('click', () => {
        const key = th.dataset.sort;
        change({ sortBy: key, sortDir: prefs.sortBy === key && prefs.sortDir === 'asc' ? 'desc' : 'asc' });
      });
    });
  }

  NightOwl.draftBoard = { render, filterRows, sortRows };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.draftBoard;
