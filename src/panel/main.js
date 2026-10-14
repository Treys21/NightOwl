(function (NightOwl) {
  'use strict';

  const { panel } = NightOwl;
  const isDraftRoom = (url) => /\/draft\/[a-z]+\/\d+/i.test(url);

  let currentUrl = location.href;

  async function onNavigate() {
    if (location.href === currentUrl) return;
    currentUrl = location.href;
    if (isDraftRoom(currentUrl) && panel.tool() !== 'draft') await panel.setTool('draft');
    else panel.navigated();
  }

  window.addEventListener('popstate', onNavigate);
  const watcher = setInterval(() => {
    if (!chrome.runtime || !chrome.runtime.id) {
      clearInterval(watcher);
      panel.destroy();
      return;
    }
    onNavigate();
    panel.mount();
  }, 1000);

  (async () => {
    await panel.mount();
    if (isDraftRoom(location.href)) await panel.setTool('draft');
  })().catch((err) => console.error('[Night Owl] failed to start', err));
})(globalThis.NightOwl);
