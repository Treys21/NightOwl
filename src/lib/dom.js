// Style injection helper.
//
// A <style> element created by script can be refused by a strict page
// `style-src` CSP. Constructed stylesheets go through CSSOM, which CSP does not
// govern, so they're the safer primary path — with a <style> fallback for the
// rare engine that lacks adoptedStyleSheets.
globalThis.SDR = globalThis.SDR || {};

(function (SDR) {
  'use strict';

  /**
   * @param root a Document, ShadowRoot, or any node with adoptedStyleSheets
   * @param cssText the stylesheet source
   */
  function applyStyles(root, cssText) {
    try {
      if ('adoptedStyleSheets' in root) {
        const sheet = new CSSStyleSheet();
        sheet.replaceSync(cssText);
        root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
        return;
      }
    } catch {
      // fall through to the element-based path
    }

    const style = document.createElement('style');
    style.textContent = cssText;
    (root.head || root).appendChild(style);
  }

  SDR.dom = { applyStyles };
})(globalThis.SDR);
