// Formatting shared by every view. Pure.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  /** Escape text for interpolation into HTML (content or quoted attributes). */
  const escape = (value) => String(value == null ? '' : value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

  /** Fantasy points: up to 2 decimals, trailing zeros dropped (12.5, 7, 0.04). */
  const points = (n) => (n == null ? '–' : (Math.round(n * 100) / 100).toString());

  /** One decimal, always shown (10.9). */
  const tenths = (n) => (n == null ? '–' : (Math.round(n * 10) / 10).toFixed(1));

  /** One decimal at most (61.5, 7). */
  const short = (n) => (n == null ? '–' : (Math.round(n * 10) / 10).toString());

  /** Signed with a real minus: +2.5, −3, ±0. */
  const signed = (n, format = points) => `${n > 0 ? '+' : n < 0 ? '−' : '±'}${format(Math.abs(n))}`;

  const percent = (p) => `${Math.round(p * 100)}%`;

  /** "Sun 1:00 PM" */
  const dayTime = (ms) => new Date(ms).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' });

  /** "Sun 1p", "Sun 9:30a" — compact, for chips. */
  function dayTimeShort(ms) {
    const d = new Date(ms);
    const time = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      .replace(/:00(?=\s)/, '')
      .replace(/\s?(AM|PM)/i, (m, ap) => ap.toLowerCase()[0]);
    return `${d.toLocaleDateString([], { weekday: 'short' })} ${time}`;
  }

  /** A kickoff window's title: "Sun 1:00 PM · 7 games", or the matchups when there are one or two. */
  // When ESPN is unreachable the schedule has only dates: say the day, never a made-up 1:00 PM.
  const dayOf = (w) => (w.approx ? new Date(w.kickoff).toLocaleDateString([], { weekday: 'short' }) : dayTime(w.kickoff));
  const windowTitle = (w) => (w.games.length > 2
    ? `${dayOf(w)} · ${w.games.length} games`
    : `${dayOf(w)} · ${w.games.map((g) => `${g.away} @ ${g.home}`).join(', ')}`);

  /**
   * What to tell someone when a load fails: a sentence, not the browser's "Failed to fetch".
   * The panel's source note names which feed is down; this says what to expect.
   */
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

  /** "8:21 PM", or "8:21:07 PM" with seconds. */
  const clock = (ms, seconds = false) => new Date(ms).toLocaleTimeString([], seconds
    ? { hour: 'numeric', minute: '2-digit', second: '2-digit' }
    : { hour: 'numeric', minute: '2-digit' });

  /** "12m", "3h 5m", "2d 4h" until a time. */
  function countdown(ms, now = Date.now()) {
    const mins = Math.max(0, Math.round((ms - now) / 60000));
    if (mins < 60) return `${mins}m`;
    const h = Math.floor(mins / 60);
    return h < 24 ? `${h}h ${mins % 60}m` : `${Math.floor(h / 24)}d ${h % 24}h`;
  }

  NightOwl.format = { escape, points, tenths, short, signed, percent, dayTime, dayTimeShort, windowTitle, errorText, clock, countdown };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.format;
