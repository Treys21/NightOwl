globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const MAX_SUGGESTIONS = 3;
  const MAX_SIDE = 2;

  function parseJson(text) {
    const trimmed = String(text || '').trim().replace(/^```(?:json)?/i, '').replace(/```$/, '').trim();
    try { return JSON.parse(trimmed); } catch (error) {
      const start = trimmed.indexOf('{');
      const end = trimmed.lastIndexOf('}');
      if (start < 0 || end <= start) return null;
      try { return JSON.parse(trimmed.slice(start, end + 1)); } catch (inner) { return null; }
    }
  }

  function suggestions(text, view) {
    const parsed = typeof text === 'string' ? parseJson(text) : text;
    if (!parsed || !Array.isArray(parsed.suggestions)) return { ok: false, errors: ['not-json'], suggestions: [] };
    const mine = new Set(view.me.players.map((player) => player.id));
    const partners = new Map(view.partners.map((partner) => [String(partner.rosterId), new Set(partner.players.map((player) => player.id))]));
    const candidates = new Map(view.candidates.map((candidate) => [candidate.key, candidate]));
    const errors = [];
    const out = [];
    const seen = new Set();

    for (const entry of parsed.suggestions.slice(0, MAX_SUGGESTIONS)) {
      let deal = null;
      const pitch = String((entry && entry.pitch) || '').slice(0, 280);
      if (entry && entry.candidate) {
        const candidate = candidates.get(String(entry.candidate));
        if (!candidate) { errors.push(`unknown-candidate:${entry.candidate}`); continue; }
        deal = { source: 'candidate', key: candidate.key, partnerId: candidate.partnerId, give: candidate.give, get: candidate.get, pitch };
      } else if (entry && Array.isArray(entry.give) && Array.isArray(entry.get)) {
        const partnerKey = String(entry.partnerId);
        const roster = partners.get(partnerKey);
        const give = entry.give.map(String);
        const get = entry.get.map(String);
        if (!roster) { errors.push(`unknown-partner:${entry.partnerId}`); continue; }
        if (!give.length || !get.length || give.length > MAX_SIDE || get.length > MAX_SIDE) { errors.push('bad-size'); continue; }
        if (!give.every((id) => mine.has(id))) { errors.push('give-not-mine'); continue; }
        if (!get.every((id) => roster.has(id))) { errors.push('get-not-theirs'); continue; }
        deal = { source: 'custom', partnerId: Number(entry.partnerId), give, get, pitch };
      } else {
        errors.push('bad-entry');
        continue;
      }
      const signature = `${deal.partnerId}|${deal.give.slice().sort().join()}|${deal.get.slice().sort().join()}`;
      if (seen.has(signature)) { errors.push('duplicate'); continue; }
      seen.add(signature);
      out.push(deal);
    }
    return { ok: out.length > 0, errors, suggestions: out };
  }

  NightOwl.aiValidate = { suggestions, parseJson, MAX_SUGGESTIONS };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.aiValidate;
