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
        .then((res) => {
          if (!res.ok) throw new Error(`${res.status} ${path}`);
          return res.text();
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

  function setHtml(el, html) {
    if (rendered.get(el) === html) return false;
    rendered.set(el, html);
    el.innerHTML = html;
    return true;
  }

  function hideBrokenImages(root) {
    root.addEventListener('error', (e) => {
      if (e.target && e.target.tagName === 'IMG') e.target.style.visibility = 'hidden';
    }, true);
  }

  NightOwl.dom = { adoptStyles, adoptCss, setHtml, hideBrokenImages };
})(globalThis.NightOwl);
