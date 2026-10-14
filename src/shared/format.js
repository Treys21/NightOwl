globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  const escape = (value) => String(value == null ? '' : value).replace(/[&<>"']/g, (character) => ESCAPES[character]);

  const points = (value) => (value == null ? '–' : (Math.round(value * 100) / 100).toString());

  const tenths = (value) => (value == null ? '–' : (Math.round(value * 10) / 10).toFixed(1));

  const short = (value) => (value == null ? '–' : (Math.round(value * 10) / 10).toString());

  const signed = (value, format = points) => `${value > 0 ? '+' : value < 0 ? '−' : '±'}${format(Math.abs(value))}`;

  const percent = (probability) => `${Math.round(probability * 100)}%`;

  const dayTime = (timestamp) => new Date(timestamp).toLocaleString([], { weekday: 'short', hour: 'numeric', minute: '2-digit' });

  function dayTimeShort(timestamp) {
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      .replace(/:00(?=\s)/, '')
      .replace(/\s?(AM|PM)/i, (match, meridiem) => meridiem.toLowerCase()[0]);
    return `${date.toLocaleDateString([], { weekday: 'short' })} ${time}`;
  }

  const dayOf = (kickoffWindow) => (kickoffWindow.approx ? new Date(kickoffWindow.kickoff).toLocaleDateString([], { weekday: 'short' }) : dayTime(kickoffWindow.kickoff));
  const windowTitle = (kickoffWindow) => (kickoffWindow.games.length > 2
    ? `${dayOf(kickoffWindow)} · ${kickoffWindow.games.length} games`
    : `${dayOf(kickoffWindow)} · ${kickoffWindow.games.map((game) => `${game.away} @ ${game.home}`).join(', ')}`);

  function errorText(error) {
    const text = String((error && error.message) || error || '');
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

  const clock = (timestamp, seconds = false) => new Date(timestamp).toLocaleTimeString([], seconds
    ? { hour: 'numeric', minute: '2-digit', second: '2-digit' }
    : { hour: 'numeric', minute: '2-digit' });

  function countdown(targetTime, now = Date.now()) {
    const mins = Math.max(0, Math.round((targetTime - now) / 60000));
    if (mins < 60) return `${mins}m`;
    const hours = Math.floor(mins / 60);
    return hours < 24 ? `${hours}h ${mins % 60}m` : `${Math.floor(hours / 24)}d ${hours % 24}h`;
  }

  NightOwl.format = { escape, points, tenths, short, signed, percent, dayTime, dayTimeShort, windowTitle, errorText, clock, countdown };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.format;
