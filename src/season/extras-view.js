globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, model, path, recap, tradeLoader, tradeHistory } = NightOwl;
  const { escape: escapeHtml, percent } = NightOwl.format;

  const tick = () => new Promise((resolve) => setTimeout(resolve));
  const LEVERAGE_SIMS = 1500;
  const oddsLabel = (p) => (p >= 0.995 ? '>99%' : p > 0 && p < 0.005 ? '<1%' : percent(p));
  const ordinal = (n) => `${n}${n % 100 >= 11 && n % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th')}`;
  const signed = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(1)}`;

  function create(deps) {
    const { state, render, nameOf, active } = deps;
    const paths = new Map();
    const recaps = new Map();

    async function computePath(league) {
      const me = league.me.rosterId;
      const base = state.projections.get(league.leagueId);
      if (!base || base.error) return null;
      const forecast = await model.forecastWeeks(league, { remainingOf: state.remainingOf, stats: state.stats });
      const games = path.schedule(forecast, me);
      let lev = null;
      const first = forecast.weeks[0];
      if (first && first.pairs.some((p) => p.includes(me)) && !first.teams[me].lineupSet) {
        const opts = { remainingOf: state.remainingOf, stats: state.stats, sims: LEVERAGE_SIMS };
        const win = await model.projectLeague(league, Object.assign({ forced: { weekIndex: 0, winner: me } }, opts));
        await tick();
        const opponent = first.pairs.find((p) => p.includes(me)).find((id) => id !== me);
        const lose = await model.projectLeague(league, Object.assign({ forced: { weekIndex: 0, winner: opponent } }, opts));
        lev = Object.assign({ week: first.week }, path.leverage(win, lose, me));
      }
      return { games, lev, needs: path.needs(base.teams[me].winOdds), route: path.route(base.bracket, me), base };
    }

    async function runPaths() {
      const generation = state.loadedAt;
      for (const league of state.leagues) {
        if (paths.has(league.leagueId) || league.raw.next >= league.raw.playoffStart) continue;
        if (!state.projections.get(league.leagueId)) continue;
        paths.set(league.leagueId, { status: 'loading' });
        await tick();
        if (!active() || generation !== state.loadedAt) { paths.delete(league.leagueId); return; }
        try {
          const found = await computePath(league);
          paths.set(league.leagueId, found ? { status: 'ready', ...found } : { status: 'error', error: 'the projection for this league is unavailable' });
        } catch (error) {
          console.warn('[Night Owl season] path unavailable', league.name, error);
          paths.set(league.leagueId, { status: 'error', error: NightOwl.format.errorText(error) });
        }
        if (active()) render();
      }
    }

    function pathBlock(league) {
      const p = paths.get(league.leagueId);
      const me = league.me.rosterId;
      let body;
      if (league.raw.next >= league.raw.playoffStart) body = '<p class="muted small se-note">The regular season is over.</p>';
      else if (!p || p.status === 'loading') body = '<div class="skel" role="status" aria-label="Working out your path"><i></i><i></i></div>';
      else if (p.status === 'error') body = `<p class="error">Couldn't work out the path: ${escapeHtml(p.error)}</p>`;
      else {
        const t = p.base.teams[me];
        const expected = p.games.reduce((sum, g) => sum + g.p, 0);
        const hardest = p.games.slice().sort((a, b) => a.p - b.p)[0];
        const seed = t.seedOdds.indexOf(Math.max(...t.seedOdds)) + 1;
        const rows = p.games.map((g) => `<tr><td>${g.week}</td><td class="se-team">${escapeHtml(nameOf(league, g.oppId))}</td><td>${g.mean.toFixed(0)}–${g.oppMean.toFixed(0)}</td><td class="${g.p >= 0.6 ? 'up' : g.p < 0.4 ? 'down' : ''}">${oddsLabel(g.p)}</td></tr>`).join('');
        const sure = p.needs.findIndex((n) => n.make >= 0.985);
        const shownNeeds = t.playoffOdds >= 0.985 || t.playoffOdds <= 0.015 ? [] : p.needs.slice(Math.max(0, (sure < 0 ? p.needs.length : sure + 1) - 5), sure < 0 ? p.needs.length : sure + 1);
        const settled = t.playoffOdds >= 0.985 ? 'You are all but in.' : t.playoffOdds <= 0.015 ? 'You are all but out.' : '';
        const need = shownNeeds.map((n) => `<tr><td>${n.atLeast}+ wins</td><td>${oddsLabel(n.p)}</td><td class="${n.make >= 0.9 ? 'up' : n.make < 0.4 ? 'down' : ''}">${oddsLabel(n.make)}</td></tr>`).join('');
        const lev = p.lev ? `<p class="se-lev">Week ${p.lev.week} swings your playoff odds from <b class="down">${oddsLabel(p.lev.lose.playoffs)}</b> if you lose to <b class="up">${oddsLabel(p.lev.win.playoffs)}</b> if you win${p.lev.swing >= 0.15 ? ': the game that matters most' : ''}.${league.playoffTeams && p.lev.win.title !== p.lev.lose.title && p.base.bracket ? ` Title odds ${oddsLabel(p.lev.lose.title)} → ${oddsLabel(p.lev.win.title)}.` : ''}</p>` : '';
        const route = p.route ? `<div class="se-route"><b>Your route</b><span class="muted small"> (favorites advance)</span>${p.route.map((r) => `<div class="se-route-r"><span>${escapeHtml(r.label)}</span><span>${r.bye ? 'bye' : `vs ${escapeHtml(nameOf(league, r.opponent.rosterId))} (${r.opponent.seed}) · ${oddsLabel(r.p)}`}</span></div>`).join('')}</div>` : (p.base.bracket ? '<p class="muted small se-note">Outside the projected bracket right now.</p>' : '');
        body = `<div class="se-kpis">
            <div class="se-kpi"><b>${oddsLabel(t.playoffOdds)}</b><span>playoffs</span></div>
            <div class="se-kpi"><b>${ordinal(seed)}</b><span>likeliest seed</span></div>
            <div class="se-kpi"><b>${expected.toFixed(1)} of ${p.games.length}</b><span>expected wins left</span></div>
            <div class="se-kpi"><b>${hardest ? `Wk ${hardest.week}` : '–'}</b><span>${hardest ? `toughest (${oddsLabel(hardest.p)})` : 'toughest'}</span></div>
          </div>
          ${lev}
          <table class="se-table"><thead><tr><th>Wk</th><th>Opponent</th><th title="Projected scores, you first">Proj.</th><th title="Your chance to win">Win</th></tr></thead><tbody>${rows}</tbody></table>
          ${settled ? `<p class="muted small se-note">${settled}</p>` : ''}
          ${need ? `<table class="se-table"><thead><tr><th>Finish with</th><th title="Chance of finishing with at least that many wins">Chance</th><th title="Chance to make the playoffs if you do">Playoffs</th></tr></thead><tbody>${need}</tbody></table>` : ''}
          ${route}`;
      }
      return `<details class="se-league" data-id="${escapeHtml(league.leagueId)}"${state.open.has(league.leagueId) ? ' open' : ''}>
        <summary><div class="se-head"><span class="se-name">${escapeHtml(league.name)}</span><span class="se-rank${league.playoffTeams && league.me.rank <= league.playoffTeams ? ' in' : ''}">${ordinal(league.me.rank)} of ${league.rows.length}</span></div></summary>
        ${body}
      </details>`;
    }

    async function computeRecap(league) {
      const me = league.me.rosterId;
      const lastPlayed = league.raw.next - 1;
      const [weekly, { trades, moves }] = await Promise.all([
        tradeLoader.weeklyPoints(league.leagueId, 0, lastPlayed),
        tradeLoader.rows(league.leagueId, Math.max(1, state.nfl.week))
      ]);
      const positionsOf = (playerId) => players.info(playerId).positions;
      const lineups = recap.lineups(me, weekly, league.raw.slots, positionsOf);
      const wire = recap.wire(me, moves, weekly);
      const mine = tradeHistory.parse(trades, league.raw.season).filter((t) => t.sides[me]);
      let net = 0;
      for (const t of mine) {
        const real = tradeHistory.realized(t, weekly);
        net += real[me].started - Object.entries(real).filter(([rosterId]) => Number(rosterId) !== me).reduce((s, [, r]) => s + r.started, 0);
      }
      return { lineups, wire, trades: mine.length, tradeNet: Math.round(net * 10) / 10, weeks: weekly.length };
    }

    async function runRecaps() {
      const generation = state.loadedAt;
      for (const league of state.leagues) {
        if (recaps.has(league.leagueId)) continue;
        recaps.set(league.leagueId, { status: 'loading' });
        await tick();
        if (!active() || generation !== state.loadedAt) { recaps.delete(league.leagueId); return; }
        try {
          recaps.set(league.leagueId, { status: 'ready', ...(await computeRecap(league)) });
        } catch (error) {
          console.warn('[Night Owl season] recap unavailable', league.name, error);
          recaps.set(league.leagueId, { status: 'error', error: NightOwl.format.errorText(error) });
        }
        if (active()) render();
      }
    }

    const pname = (playerId) => escapeHtml(players.info(playerId).name);

    function recapBlock(league) {
      const r = recaps.get(league.leagueId);
      const m = league.me;
      let body;
      if (!r || r.status === 'loading') body = '<div class="skel" role="status" aria-label="Reading your season"><i></i><i></i></div>';
      else if (r.status === 'error') body = `<p class="error">Couldn't read this season: ${escapeHtml(r.error)}</p>`;
      else if (!r.weeks) body = '<p class="muted small se-note">No finished weeks yet.</p>';
      else {
        const worst = r.lineups.weeks.filter((w) => w.miss && w.loss >= 1).sort((a, b) => b.loss - a.loss).slice(0, 3);
        const perfect = r.lineups.weeks.filter((w) => w.loss < 0.05).length;
        body = `<div class="se-kpis">
            <div class="se-kpi"><b>${ordinal(m.rank)}</b><span>${m.wins}–${m.losses}${m.ties ? `–${m.ties}` : ''}</span></div>
            <div class="se-kpi ${m.luck > 0 ? 'up' : m.luck < 0 ? 'down' : ''}"><b>${m.luck == null ? '–' : signed(m.luck)}</b><span>wins of luck</span></div>
            <div class="se-kpi"><b>${m.efficiency == null ? '–' : percent(m.efficiency)}</b><span>of max points</span></div>
            <div class="se-kpi"><b>${r.lineups.totalLoss.toFixed(0)}</b><span>pts left on bench</span></div>
          </div>
          <ul class="se-recap">
            ${r.lineups.mvp ? `<li><b>MVP:</b> ${pname(r.lineups.mvp.pid)}, ${r.lineups.mvp.pts.toFixed(0)} pts in ${r.lineups.mvp.weeks} starts.</li>` : ''}
            <li><b>Lineups:</b> perfect in ${perfect} of ${r.weeks} week${r.weeks === 1 ? '' : 's'}.${worst.length ? ` Costliest: ${worst.map((w) => `week ${w.week}, ${pname(w.miss.in)} over ${w.miss.out ? pname(w.miss.out) : 'an empty slot'} (${w.loss.toFixed(1)})`).join('; ')}.` : ''}</li>
            ${r.wire.bestAdd ? `<li><b>Best add:</b> ${pname(r.wire.bestAdd.pid)} started ${r.wire.bestAdd.started.toFixed(0)} pts for you after week ${r.wire.bestAdd.week}.</li>` : ''}
            ${r.wire.regret ? `<li><b>Got away:</b> ${pname(r.wire.regret.pid)} started ${r.wire.regret.pts.toFixed(0)} pts for others after you dropped him.</li>` : ''}
            ${r.trades ? `<li><b>Trades:</b> ${r.trades} so far; the players you got started ${signed(r.tradeNet)} pts more than the ones you gave. Grades are in Moves → History.</li>` : ''}
            ${r.wire.adds ? `<li class="muted">${r.wire.adds} add${r.wire.adds === 1 ? '' : 's'} and ${r.wire.drops} drop${r.wire.drops === 1 ? '' : 's'} on the wire.</li>` : ''}
          </ul>`;
      }
      return `<details class="se-league" data-id="${escapeHtml(league.leagueId)}"${state.open.has(league.leagueId) ? ' open' : ''}>
        <summary><div class="se-head"><span class="se-name">${escapeHtml(league.name)}</span><span class="se-rank${league.playoffTeams && m.rank <= league.playoffTeams ? ' in' : ''}">${ordinal(m.rank)} of ${league.rows.length}</span></div></summary>
        ${body}
      </details>`;
    }

    function clear() { paths.clear(); recaps.clear(); }

    return { pathBlock, recapBlock, runPaths, runRecaps, clear };
  }

  NightOwl.seasonExtras = { create };
})(globalThis.NightOwl);
