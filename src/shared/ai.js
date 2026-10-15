globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  function call(path, body) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({ type: 'nightowl-agent', path, body }, (reply) => {
        if (chrome.runtime.lastError) { reject(new Error('The extension was reloaded. Refresh the Sleeper tab.')); return; }
        if (!reply || !reply.ok) { reject(new Error((reply && reply.error) || 'The local agent did not answer.')); return; }
        resolve(reply.data);
      });
    });
  }

  async function configured() {
    const settings = await NightOwl.storage.getSettings();
    return Boolean(settings.agent && settings.agent.token);
  }

  NightOwl.ai = {
    configured,
    health: () => call('/health'),
    suggest: (view, options = {}) => call('/suggest', { view, mode: options.deep ? 'analyst' : 'direct', fresh: Boolean(options.fresh) }),
    chat: (view, messages, options = {}) => call('/chat', { view, messages, mode: options.deep ? 'analyst' : 'direct' })
  };
})(globalThis.NightOwl);
