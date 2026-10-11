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

  NightOwl.format = { escape, points, tenths, short, signed, percent, dayTime, dayTimeShort, clock, countdown };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.format;
