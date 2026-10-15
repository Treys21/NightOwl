globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { escape: escapeHtml, delta } = NightOwl.format;

  function create({ api, context, paint }) {
    const lastWeek = { status: 'idle', review: null, week: null, playsMissing: false };

    const message = (text) => `<p class="muted small empty">${escapeHtml(text)}</p>`;

    function html() {
      if (lastWeek.status === 'loading' || lastWeek.status === 'idle') return '<div class="skel" role="status" aria-label="Loading last week"><i></i><i></i><i></i></div>';
      if (lastWeek.status === 'failed') return message('Last week could not be loaded right now.');
      if (!lastWeek.week) return message('No finished week yet.');
      const review = lastWeek.review;
      if (!review.results.length) return message(`None of your leagues played in week ${lastWeek.week}.`);
      const headshot = (playerId) => `<img class="lw-face" src="${NightOwl.teams.headshot(playerId)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">`;
      const tiles = review.results.map((result) => `<li class="lw-tile ${result.won ? 'up' : result.lost ? 'down' : ''}" title="${escapeHtml(result.leagueName)}: ${result.myPoints.toFixed(1)} to ${result.theirPoints.toFixed(1)}"><span class="lw-tile-name">${escapeHtml(result.leagueName)}</span><b>${delta(result.margin)}</b></li>`).join('');
      const leagueName = new Map(review.results.map((result) => [result.leagueId, result.leagueName]));
      const pill = (name, points, decided, title) => `<span class="lw-chip ${points > 0 ? 'up' : 'down'}${decided ? ' decided' : ''}" title="${escapeHtml(title)}">${decided ? '★ ' : ''}<i>${escapeHtml(name)}</i> ${delta(points)}</span>`;
      const swingOf = (priced) => Math.max(...priced.entries.map((entry) => Math.abs(entry.net)));
      const ranked = review.plays.slice().sort((first, second) => swingOf(second) - swingOf(first)).slice(0, 12);
      const biggest = ranked.length ? swingOf(ranked[0]) : 1;
      const plays = ranked.map((priced) => `<li class="lw-play"><span class="lw-faces">${headshot(priced.participants[0].playerId)}</span><span class="lw-body"><span class="lw-text">${escapeHtml(priced.play.text.split(' (')[0])}</span><span class="lw-bar"><i style="width:${Math.round(100 * swingOf(priced) / biggest)}%"></i></span><span class="lw-chips">${priced.entries.map((entry) => pill(leagueName.get(entry.leagueId), entry.net, entry.flipped, '')).join('')}</span></span></li>`).join('');
      return `<ul class="lw-tiles">${tiles}</ul>${lastWeek.playsMissing ? message('Plays unavailable right now.') : `${plays ? `<ul class="lw-plays">${plays}</ul>` : ''}`}`;
    }


    async function ensure() {
      const current = context();
      if (lastWeek.status !== 'idle' || !current) return;
      lastWeek.status = 'loading';
      paint();
      try {
        const nflState = await api.state();
        const loaded = await NightOwl.liveWeekData.loadLastWeek({ nflState, userId: current.userId, excludedLeagueIds: current.excluded });
        lastWeek.week = loaded.week;
        lastWeek.playsMissing = !loaded.plays;
        lastWeek.review = loaded.week ? NightOwl.weekReview.reviewWeek({ leagues: loaded.leagues, plays: loaded.plays || [], playerIdOf: loaded.playerIdOf }) : null;
        lastWeek.status = 'ready';
      } catch (error) {
        console.warn('[Night Owl live] last week unavailable', error);
        lastWeek.status = 'failed';
      }
      paint();
    }

    return { html, ensure };
  }

  NightOwl.liveLastWeek = { create };
})(globalThis.NightOwl);
