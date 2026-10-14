(function (NightOwl) {
  'use strict';

  const byId = (elementId) => /** @type {any} */ (document.getElementById(elementId));

  const listEl = byId('list');
  const formatEl = byId('format');
  const syncedEl = byId('synced');
  const usernameEl = byId('username');
  const userStatusEl = byId('user-status');
  const rankStatusEl = byId('rank-status');
  const timeAgo = (timestamp) => {
    const mins = Math.round((Date.now() - timestamp) / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    if (mins < 24 * 60) return `${Math.round(mins / 60)}h ago`;
    return new Date(timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' });
  };
  const status = (element, text, tone = '') => { element.textContent = text; element.className = `status ${tone}`; };
  const escapeHtml = NightOwl.format.escape;

  let rankings = [];
  let dragIndex = null;
  let isInTab = false;

  async function init() {
    chrome.tabs.getCurrent((tab) => {
      isInTab = Boolean(tab);
      byId('open-tab').hidden = isInTab;
    });

    rankings = await NightOwl.storage.getRankings();
    const settings = await NightOwl.storage.getSettings();

    formatEl.innerHTML = NightOwl.ringer.FORMATS.map(
      (format) => `<option value="${format.id}">${format.label}</option>`
    ).join('');
    formatEl.value = settings.format || 'half-ppr';
    formatEl.addEventListener('change', () => NightOwl.storage.saveSettings({ format: formatEl.value }));

    const alertsEl = byId('alerts');
    alertsEl.checked = settings.alerts !== false;
    alertsEl.addEventListener('change', () => NightOwl.storage.saveSettings({ alerts: alertsEl.checked }));

    usernameEl.value = settings.username || '';
    if (settings.userId) status(userStatusEl, `✓ Connected as ${settings.username}`, 'ok');
    else status(userStatusEl, settings.username ? 'Not found yet. Check the spelling, then Save.' : 'Add your username to turn on Live, Lineups, Bets and Season.');

    const lastSynced = await NightOwl.storage.getLastSynced();
    syncedEl.textContent = lastSynced ? `synced ${timeAgo(lastSynced)}` : 'not synced yet';

    render();
  }

  function render() {
    if (rankings.length === 0) {
      listEl.innerHTML = '<li class="empty">No players yet. Sync from The Ringer or add one above.</li>';
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

  async function persist() {
    if (rankings.length === 0) {
      await NightOwl.storage.clearRankings();
    } else {
      await NightOwl.storage.saveRankings(rankings);
      rankings = NightOwl.storage.renumber(rankings);
    }
    render();
  }

  byId('add').addEventListener('click', async () => {
    const nameEl = byId('add-name');
    const positionInput = byId('add-pos');
    const teamEl = byId('add-team');
    const name = nameEl.value.trim();
    if (!name) return;

    rankings.push({
      rank: rankings.length + 1,
      name,
      position: positionInput.value.trim().toUpperCase(),
      team: teamEl.value.trim().toUpperCase()
    });
    nameEl.value = positionInput.value = teamEl.value = '';
    await persist();
  });

  byId('save-user').addEventListener('click', async () => {
    const username = usernameEl.value.trim();
    if (!username) return;
    status(userStatusEl, 'Looking you up…');
    try {
      const user = await NightOwl.api.user(username);
      if (user && user.user_id) {
        await NightOwl.storage.saveSettings({ username, userId: user.user_id });
        status(userStatusEl, `✓ Connected as ${username}`, 'ok');
      } else {
        await NightOwl.storage.saveSettings({ username, userId: null });
        status(userStatusEl, `No Sleeper user named "${username}"`, 'bad');
      }
    } catch {
      status(userStatusEl, "Couldn't reach Sleeper. Try again.", 'bad');
    }
  });

  const syncButton = byId('sync');
  syncButton.addEventListener('click', async () => {
    const format = formatEl.value;
    syncButton.disabled = true;
    syncButton.textContent = 'Syncing…';

    const result = await NightOwl.ringer.fetchRankings(format);

    if (result.ok) {
      rankings = result.rankings;
      await NightOwl.storage.saveRankings(rankings, { markSynced: true });
      rankings = await NightOwl.storage.getRankings();
      syncedEl.textContent = 'synced just now';
      status(rankStatusEl, `✓ ${rankings.length} players from The Ringer`, 'ok');
      render();
    } else {
      status(rankStatusEl, result.reason, 'bad');
    }

    syncButton.disabled = false;
    syncButton.textContent = 'Sync from Ringer';
  });

  byId('export').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(rankings, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'night-owl-rankings.json';
    link.click();
    URL.revokeObjectURL(link.href);
  });

  const importFile = byId('import-file');

  function openInTab() {
    chrome.tabs.create({ url: chrome.runtime.getURL('src/popup/popup.html') });
  }

  byId('open-tab').addEventListener('click', openInTab);

  byId('import').addEventListener('click', () => {
    if (!isInTab) {
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
      status(rankStatusEl, "Couldn't read that file.", 'bad');
    }
  });

  init();
})(globalThis.NightOwl);
