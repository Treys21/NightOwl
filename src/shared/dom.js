globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const cache = new Map();

  function sheetFrom(cssText) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(cssText);
    return sheet;
  }

  function loadSheet(path) {
    if (!cache.has(path)) {
      cache.set(path, fetch(chrome.runtime.getURL(path))
        .then((response) => {
          if (!response.ok) throw new Error(`${response.status} ${path}`);
          return response.text();
        })
        .then(sheetFrom));
    }
    return cache.get(path);
  }

  async function adoptStyles(root, paths) {
    const sheets = await Promise.all(paths.map(loadSheet));
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, ...sheets];
  }

  function adoptCss(root, cssText) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheetFrom(cssText)];
  }

  const rendered = new WeakMap();

  function setHtml(element, html) {
    if (rendered.get(element) === html) return false;
    rendered.set(element, html);
    element.innerHTML = html;
    return true;
  }

  function hideBrokenImages(root) {
    root.addEventListener('error', (event) => {
      if (event.target && event.target.tagName === 'IMG') event.target.style.visibility = 'hidden';
    }, true);
  }

  function trackOpenDetails(container, openIds) {
    container.addEventListener('toggle', (event) => {
      const id = event.target.dataset && event.target.dataset.id;
      if (!id) return;
      if (event.target.open) openIds.add(id); else openIds.delete(id);
    }, true);
  }

  NightOwl.dom = { adoptStyles, adoptCss, setHtml, hideBrokenImages, trackOpenDetails };
})(globalThis.NightOwl);
