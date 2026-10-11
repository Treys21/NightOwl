// Styles for the panel's shadow root.
//
// The CSS lives in real files under src/styles/ (listed in the manifest's
// web_accessible_resources so a content script can fetch them). They are
// applied as constructed stylesheets: those go through CSSOM, which a page's
// style-src CSP does not govern, unlike an injected <style> element.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const cache = new Map(); // path -> Promise<CSSStyleSheet>

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

  /** Adopt the given stylesheet files into a ShadowRoot (or Document), in order. */
  async function adoptStyles(root, paths) {
    const sheets = await Promise.all(paths.map(loadSheet));
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, ...sheets];
  }

  /** Adopt an inline stylesheet (small, self-contained rules). */
  function adoptCss(root, cssText) {
    root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheetFrom(cssText)];
  }

  NightOwl.dom = { adoptStyles, adoptCss };
})(globalThis.NightOwl);
