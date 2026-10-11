// Entry point (the last content script): put the panel on every sleeper.com
// page and follow Sleeper's client-side navigation. Opening a draft room
// switches to the Draft tool.
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

  // pushState/replaceState aren't observable from a content script's isolated
  // world, so poll the URL (cheap) and also catch back/forward right away.
  window.addEventListener('popstate', onNavigate);
  setInterval(() => {
    onNavigate();
    panel.mount(); // Sleeper occasionally replaces <html>'s children; come back
  }, 1000);

  (async () => {
    await panel.mount();
    if (isDraftRoom(location.href)) await panel.setTool('draft');
  })().catch((err) => console.error('[Night Owl] failed to start', err));
})(globalThis.NightOwl);
