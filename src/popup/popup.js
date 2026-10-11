// Rankings editor + settings. This is the authoritative fallback whenever the
// Ringer scrape breaks, or you simply disagree with a ranking.
(function (SDR) {
  'use strict';

  const listEl = document.getElementById('list');
  const formatEl = document.getElementById('format');
  const syncedEl = document.getElementById('synced');
  const usernameEl = document.getElementById('username');
  const userStatusEl = document.getElementById('user-status');

  let rankings = [];
  let dragIndex = null;
  // The same page serves as both the toolbar popup and the options tab.
  // File import only works in the tab: Chrome tears down a popup as soon as the
  // OS file dialog takes focus, so the change event would never fire.
  let inTab = false;

  async function init() {
    chrome.tabs.getCurrent((tab) => {
      inTab = Boolean(tab);
      document.getElementById('open-tab').hidden = inTab;
    });

    rankings = await SDR.storage.getRankings();
    const settings = await SDR.storage.getSettings();

    formatEl.innerHTML = SDR.ringer.FORMATS.map(
      (f) => `<option value="${f.id}">${f.label}</option>`
    ).join('');
    formatEl.value = settings.format || 'half-ppr';
    formatEl.addEventListener('change', () => SDR.storage.saveSettings({ format: formatEl.value }));

    usernameEl.value = settings.username || '';
    userStatusEl.textContent = settings.userId ? `user id ${settings.userId}` : 'not resolved yet';

    const lastSynced = await SDR.storage.getLastSynced();
    syncedEl.textContent = lastSynced
      ? `synced ${new Date(lastSynced).toLocaleString()}`
      : 'never synced';

    render();
  }

  function render() {
    if (rankings.length === 0) {
      listEl.innerHTML = '<div class="empty">No players yet. Sync from The Ringer or add one above.</div>';
      return;
    }

    listEl.innerHTML = rankings
      .map(
        (player, index) => `
        <li draggable="true" data-index="${index}">
          <span class="rank">${player.rank}</span>
          <span class="name">${escapeHtml(player.name)}</span>
          <span class="meta">${escapeHtml(player.position || '')} ${escapeHtml(player.team || '')}</span>
          <button class="del" data-del="${index}" title="Remove">×</button>
        </li>`
      )
      .join('');

    listEl.querySelectorAll('[data-del]').forEach((button) => {
      button.addEventListener('click', async () => {
        rankings.splice(Number(button.dataset.del), 1);
        await persist();
      });
    });

    listEl.querySelectorAll('li').forEach(wireDrag);
  }

  function wireDrag(item) {
    item.addEventListener('dragstart', () => {
      dragIndex = Number(item.dataset.index);
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', () => item.classList.remove('dragging'));
    item.addEventListener('dragover', (event) => {
      event.preventDefault();
      item.classList.add('over');
    });
    item.addEventListener('dragleave', () => item.classList.remove('over'));
    item.addEventListener('drop', async (event) => {
      event.preventDefault();
      item.classList.remove('over');
      const target = Number(item.dataset.index);
      if (dragIndex === null || dragIndex === target) return;
      const [moved] = rankings.splice(dragIndex, 1);
      rankings.splice(target, 0, moved);
      dragIndex = null;
      await persist();
    });
  }

  // Deleting down to an empty board has to be allowed, but saveRankings refuses
  // empty lists (so a failed scrape can't wipe the board) — clear the key directly.
  async function persist() {
    if (rankings.length === 0) {
      await new Promise((resolve) => chrome.storage.local.set({ rankings: [] }, resolve));
    } else {
      await SDR.storage.saveRankings(rankings);
      rankings = SDR.storage.renumber(rankings);
    }
    render();
  }

  document.getElementById('add').addEventListener('click', async () => {
    const nameEl = document.getElementById('add-name');
    const posEl = document.getElementById('add-pos');
    const teamEl = document.getElementById('add-team');
    const name = nameEl.value.trim();
    if (!name) return;

    rankings.push({
      rank: rankings.length + 1,
      name,
      position: posEl.value.trim().toUpperCase(),
      team: teamEl.value.trim().toUpperCase()
    });
    nameEl.value = posEl.value = teamEl.value = '';
    await persist();
  });

  document.getElementById('save-user').addEventListener('click', async () => {
    const username = usernameEl.value.trim();
    if (!username) return;
    userStatusEl.textContent = 'resolving…';
    try {
      const user = await SDR.api.getUser(username);
      if (user && user.user_id) {
        await SDR.storage.saveSettings({ username, userId: user.user_id });
        userStatusEl.textContent = `user id ${user.user_id}`;
      } else {
        await SDR.storage.saveSettings({ username, userId: null });
        userStatusEl.textContent = 'no such Sleeper user';
      }
    } catch {
      userStatusEl.textContent = "couldn't reach Sleeper — try again";
    }
  });

  const syncButton = document.getElementById('sync');
  syncButton.addEventListener('click', async () => {
    const format = formatEl.value;
    syncButton.disabled = true;
    syncButton.textContent = 'Syncing…';

    // Fetched straight from the extension page — no need to open The Ringer.
    const result = await SDR.ringer.fetchRankings(format);

    if (result.ok) {
      rankings = result.rankings;
      await SDR.storage.saveRankings(rankings, { markSynced: true });
      rankings = await SDR.storage.getRankings();
      syncedEl.textContent = `synced ${new Date().toLocaleString()}`;
      userStatusEl.textContent = `${rankings.length} players from The Ringer (${format})`;
      render();
    } else {
      // A failed sync leaves the existing board untouched.
      userStatusEl.textContent = result.reason;
    }

    syncButton.disabled = false;
    syncButton.textContent = 'Sync from Ringer';
  });

  document.getElementById('export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(rankings, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sleeper-big-board.json';
    link.click();
    URL.revokeObjectURL(link.href);
  });

  const importFile = document.getElementById('import-file');

  // Opened as a plain tab rather than via chrome.runtime.openOptionsPage():
  // this page doubles as the toolbar popup, and Chrome refuses to treat one
  // file as both ("Could not create an options page").
  function openInTab() {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/popup/popup.html') });
  }

  document.getElementById('open-tab').addEventListener('click', openInTab);

  document.getElementById('import').addEventListener('click', () => {
    if (!inTab) {
      // The file dialog steals focus and Chrome tears the popup down with it,
      // so the change event would never fire. Do it in a tab instead.
      openInTab();
      return;
    }
    importFile.click();
  });
  importFile.addEventListener('change', async () => {
    const file = importFile.files && importFile.files[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error('empty');
      rankings = parsed
        .filter((entry) => entry && entry.name)
        .map((entry) => ({
          rank: entry.rank,
          name: String(entry.name),
          position: (entry.position || '').toUpperCase(),
          team: (entry.team || '').toUpperCase()
        }));
      await persist();
    } catch {
      userStatusEl.textContent = "couldn't read that file";
    }
  });

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text == null ? '' : text;
    return div.innerHTML;
  }

  init();
})(globalThis.SDR);
