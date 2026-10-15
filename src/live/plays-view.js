globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { teams } = NightOwl;
  const { escape: escapeHtml, points: formatPoints, signed, clock: clockOf, short: shortNumber } = NightOwl.format;

  const BIG_PTS = 4;

  function create({ state }) {
    const maxImpact = (event) => Math.max(0, ...event.impacts.map((impact) => Math.abs(impact.pts)));

    function isBig(event) {
      return /TD|safety|2-pt/.test(event.text) || maxImpact(event) >= BIG_PTS;
    }

    const impactForMe = (impact) => (impact.side === 'me' ? impact.pts : -impact.pts);

    function shownImpacts(event) {
      return state.league ? event.impacts.filter((impact) => impact.leagueId === state.league) : event.impacts;
    }

    function impactChips(event) {
      return shownImpacts(event).map((impact) => {
        const signedPoints = impactForMe(impact);
        const className = signedPoints > 0 ? 'helps' : signedPoints < 0 ? 'hurts' : 'zero';
        return `<span class="impact ${className}" title="${impact.side === 'me' ? 'Your starter' : "Your opponent's starter"} in ${escapeHtml(impact.leagueName)}">${escapeHtml(impact.leagueName)} <b>${signed(signedPoints, shortNumber)}</b></span>`;
      }).join('');
    }

    function moodOf(event) {
      const impactValues = shownImpacts(event).map(impactForMe).filter((value) => value !== 0);
      if (!impactValues.length) return 'even';
      if (impactValues.every((value) => value > 0)) return 'good';
      if (impactValues.every((value) => value < 0)) return 'bad';
      return 'even';
    }

    function playValue(event) {
      const points = [...new Set(event.impacts.map((impact) => impact.pts))].sort((x, y) => x - y);
      if (points.length === 1) return `${signed(points[0])}<small> pts</small>`;
      return `${signed(points[0])}–${formatPoints(points[points.length - 1])}<small> pts</small>`;
    }

    function matchesFilters(event) {
      const shown = shownImpacts(event);
      if (!shown.length) return false;
      if (state.bigOnly && !isBig(event)) return false;
      if (state.filter === 'all') return true;
      const impactValues = shown.map(impactForMe);
      return state.filter === 'good' ? impactValues.some((value) => value > 0) : impactValues.some((value) => value < 0);
    }

    function playRow(event, isNew) {
      const mood = moodOf(event);
      return `<li class="ev ${mood === 'even' ? '' : mood}${isNew ? ' new' : ''}${isBig(event) ? ' major' : ''}" style="--tc:${teams.colors(event.team).primary}">
          <div class="ev-top">
            <span class="ev-who">${teams.face(event.pid, event.team)}<span><span class="ev-name">${escapeHtml(event.name)}</span> <span class="muted small">${escapeHtml(event.pos)} · ${escapeHtml(event.team)}</span></span></span>
            <span class="ev-val">${playValue(event)}</span>
          </div>
          <div class="ev-text">${escapeHtml(event.text || 'stat correction')}</div>
          <div class="impacts">${impactChips(event)}</div>
        </li>`;
    }

    function recapCard(group) {
      const since = group[0].since || group[0].ts;
      const key = `${since}-${group[0].ts}`;
      const rows = group.map((event) => `
        <div class="recap-row">
          <span class="ev-who">${teams.face(event.pid, event.team)}<span><span class="ev-name">${escapeHtml(event.name)}</span> <span class="muted small">${escapeHtml(event.text || 'stat correction')}</span></span></span>
          <div class="impacts">${impactChips(event)}</div>
        </div>`).join('');
      return `<li class="recap"><details data-recap="${key}"${state.openRecaps.has(key) ? ' open' : ''}>
          <summary>
            <span class="recap-title"><b>${group[0].firstLook ? 'This week so far' : 'While you were away'}</b><span class="muted small">${group[0].firstLook ? `as of ${clockOf(group[0].ts)}` : `${clockOf(since)} – ${clockOf(group[0].ts)}`} · ${group.length} player${group.length === 1 ? '' : 's'}</span></span>
          </summary>
          <div class="recap-rows">${rows}</div>
        </details></li>`;
    }

    return { isBig, maxImpact, impactChips, moodOf, playValue, matchesFilters, playRow, recapCard };
  }

  NightOwl.livePlays = { create };
})(globalThis.NightOwl);
