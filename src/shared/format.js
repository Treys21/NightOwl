globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  const escape = (value) => String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

  const points = (n) => (n == null ? '–' : (Math.round(n * 100) / 100).toString());

  const tenths = (n) => (n == null ? '–' : (Math.round(n * 10) / 10).toFixed(1));

  const short = (n) => (n == null ? '–' : (Math.round(n * 10) / 10).toString());

  const signed = (n, format = points) => `${n > 0 ? '+' : n < 0 ? '−' : '±'}${format(Math.abs(n))}`;

  const percent = (p) => `${Math.round(p * 100)}%`;

  const dayTime = (ms) => new Date(ms).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' });

  function dayTimeShort(ms) {
    const d = new Date(ms);
    const time = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      .replace(/:00(?=\s)/, '')
      .replace(/\s?(AM|PM)/i, (m, ap) => ap.toLowerCase()[0]);
    return `${d.toLocaleDateString([], { weekday: 'short' })} ${time}`;
  }

  const dayOf = (w) => (w.approx ? new Date(w.kickoff).toLocaleDateString([], { weekday: 'short' }) : dayTime(w.kickoff));
  const windowTitle = (w) => (w.games.length > 2
    ? `${dayOf(w)} · ${w.games.length} games`
    : `${dayOf(w)} · ${w.games.map((g) => `${g.away} @ ${g.home}`).join(', ')}`);

  function errorText(err) {
    const text = String((err && err.message) || err || '');
    if (/failed to fetch|networkerror|network request failed|load failed|timed out|timeout|aborted/i.test(text)) return "Couldn't load this right now. It retries on its own.";
    const status = /^(\d{3}) /.exec(text);
    if (status) {
      const code = Number(status[1]);
      if (code === 429) return 'Too many requests just now. It slows down and retries on its own.';
      if (code >= 500) return `The data source had a problem (${code}). It retries on its own.`;
      return `The data source refused the request (${code}).`;
    }
    return text || 'Something went wrong.';
  }

  const clock = (ms, seconds = false) => new Date(ms).toLocaleTimeString([], seconds
    ? { hour: 'numeric', minute: '2-digit', second: '2-digit' }
    : { hour: 'numeric', minute: '2-digit' });

  function countdown(ms, now = Date.now()) {
    const mins = Math.max(0, Math.round((ms - now) / 60000));
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    return h < 24 ? `${h}h ${mins % 60}m` : `${Math.floor(h / 24)}d ${h % 24}h`;
  }

  NightOwl.format = { escape, points, tenths, short, signed, percent, dayTime, dayTimeShort, windowTitle, errorText, clock, countdown };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.format;
