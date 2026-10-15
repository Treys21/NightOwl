globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const DEFAULT_URL = 'http://127.0.0.1:8787';
  const PATHS = ['/health', '/suggest', '/chat'];
  const HEALTH_TIMEOUT_MS = 8000;
  const ASK_TIMEOUT_MS = 240000;

  function baseUrl(text) {
    try {
      const parsed = new URL(String(text || DEFAULT_URL));
      if (parsed.protocol !== 'http:' || parsed.hostname !== '127.0.0.1') return null;
      return parsed.origin;
    } catch (error) {
      return null;
    }
  }

  function request(settings, message) {
    const agent = (settings && settings.agent) || {};
    const origin = baseUrl(agent.url);
    if (!origin) return { error: 'The local agent address must be http://127.0.0.1 with a port.' };
    if (!agent.token) return { error: 'Paste the local agent token in the Night Owl popup.' };
    if (!PATHS.includes(message.path)) return { error: 'Unknown agent request.' };
    const headers = { 'x-night-owl-token': String(agent.token) };
    const init = { credentials: 'omit', headers };
    if (message.path !== '/health') {
      init.method = 'POST';
      headers['content-type'] = 'application/json';
      init.body = JSON.stringify(message.body || {});
    }
    return { url: origin + message.path, init, timeout: message.path === '/health' ? HEALTH_TIMEOUT_MS : ASK_TIMEOUT_MS };
  }

  NightOwl.agent = { DEFAULT_URL, PATHS, baseUrl, request };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.agent;
