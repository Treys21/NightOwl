globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, model, path, recap, tradeLoader, tradeHistory } = NightOwl;
  const { round1 } = NightOwl.numbers;
  const { escape: escapeHtml, percent, delta: signed } = NightOwl.format;

  const tick = () => new Promise((resolve) => setTimeout(resolve));
  const LEVERAGE_SIMS = 1500;
  const oddsLabel = (probability) => (probability >= 0.995 ? '>99%' : probability > 0 && probability < 0.005 ? '<1%' : percent(probability));
  const ordinal = (number) => `${number}${number % 100 >= 11 && number % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[number % 10] || 'th')}`;

  function create(deps) {
    const { state, render, nameOf, active } = deps;
    const paths = new Map();
    const recaps = new Map();

    async function computePath(league) {
      const myRosterId = league.me.rosterId;
      const base = state.projections.get(league.leagueId);
      if (!base || base.error) return null;
      const forecast = await model.forecastWeeks(league, { remainingOf: state.remainingOf, stats: state.stats });
      const games = path.schedule(forecast, myRosterId);
      let lev = null;
      const first = forecast.weeks[0];
      if (first && first.pairs.some((pair) => pair.includes(myRosterId)) && !first.teams[myRosterId].lineupSet) {
        const options = { remainingOf: state.remainingOf, stats: state.stats, sims: LEVERAGE_SIMS };
        const win = await model.projectLeague(league, Object.assign({ forced: { weekIndex: 0, winner: myRosterId } }, options));
        await tick();
        const opponent = first.pairs.find((pair) => pair.includes(myRosterId)).find((rosterId) => rosterId !== myRosterId);
        const lose = await model.projectLeague(league, Object.assign({ forced: { weekIndex: 0, winner: opponent } }, options));
        lev = Object.assign({ week: first.week }, path.leverage(win, lose, myRosterId));
      }
      return { games, lev, needs: path.needs(base.teams[myRosterId].winOdds), route: path.route(base.bracket, myRosterId), base };
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
      const pathSummary = paths.get(league.leagueId);
      const myRosterId = league.me.rosterId;
      let body;
      if (league.raw.next >= league.raw.playoffStart) body = '<p class="muted small se-note">The regular season is over.</p>';
      else if (!pathSummary || pathSummary.status === 'loading') body = '<div class="skel" role="status" aria-label="Working out your path"><i></i><i></i></div>';
      else if (pathSummary.status === 'error') body = `<p class="error">Couldn't work out the path: ${escapeHtml(pathSummary.error)}</p>`;
      else {
        const myProjection = pathSummary.base.teams[myRosterId];
        const expected = pathSummary.games.reduce((sum, game) => sum + game.p, 0);
        const hardest = pathSummary.games.slice().sort((a, b) => a.p - b.p)[0];
        const seed = myProjection.seedOdds.indexOf(Math.max(...myProjection.seedOdds)) + 1;
        const rows = pathSummary.games.map((game) => `<tr><td>${game.week}</td><td class="se-team">${escapeHtml(nameOf(league, game.oppId))}</td><td>${game.mean.toFixed(0)}–${game.oppMean.toFixed(0)}</td><td class="${game.p >= 0.6 ? 'up' : game.p < 0.4 ? 'down' : ''}">${oddsLabel(game.p)}</td></tr>`).join('');
        const sure = pathSummary.needs.findIndex((need) => need.make >= 0.985);
        const shownNeeds = myProjection.playoffOdds >= 0.985 || myProjection.playoffOdds <= 0.015 ? [] : pathSummary.needs.slice(Math.max(0, (sure < 0 ? pathSummary.needs.length : sure + 1) - 5), sure < 0 ? pathSummary.needs.length : sure + 1);
        const settled = myProjection.playoffOdds >= 0.985 ? 'You are all but in.' : myProjection.playoffOdds <= 0.015 ? 'You are all but out.' : '';
        const need = shownNeeds.map((shownNeed) => `<tr><td>${shownNeed.atLeast}+ wins</td><td>${oddsLabel(shownNeed.p)}</td><td class="${shownNeed.make >= 0.9 ? 'up' : shownNeed.make < 0.4 ? 'down' : ''}">${oddsLabel(shownNeed.make)}</td></tr>`).join('');
        const lev = pathSummary.lev ? `<p class="se-lev">Week ${pathSummary.lev.week} swings your playoff odds from <b class="down">${oddsLabel(pathSummary.lev.lose.playoffs)}</b> if you lose to <b class="up">${oddsLabel(pathSummary.lev.win.playoffs)}</b> if you win${pathSummary.lev.swing >= 0.15 ? ': the game that matters most' : ''}.${league.playoffTeams && pathSummary.lev.win.title !== pathSummary.lev.lose.title && pathSummary.base.bracket ? ` Title odds ${oddsLabel(pathSummary.lev.lose.title)} → ${oddsLabel(pathSummary.lev.win.title)}.` : ''}</p>` : '';
        const route = pathSummary.route ? `<div class="se-route"><b>Your route</b><span class="muted small"> (favorites advance)</span>${pathSummary.route.map((step) => `<div class="se-route-r"><span>${escapeHtml(step.label)}</span><span>${step.bye ? 'bye' : `vs ${escapeHtml(nameOf(league, step.opponent.rosterId))} (${step.opponent.seed}) · ${oddsLabel(step.p)}`}</span></div>`).join('')}</div>` : (pathSummary.base.bracket ? '<p class="muted small se-note">Outside the projected bracket right now.</p>' : '');
        body = `<div class="se-kpis">
            <div class="se-kpi"><b>${oddsLabel(myProjection.playoffOdds)}</b><span>playoffs</span></div>
            <div class="se-kpi"><b>${ordinal(seed)}</b><span>likeliest seed</span></div>
            <div class="se-kpi"><b>${expected.toFixed(1)} of ${pathSummary.games.length}</b><span>expected wins left</span></div>
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
      const myRosterId = league.me.rosterId;
      const lastPlayed = league.raw.next - 1;
      const [weekly, { trades, moves }] = await Promise.all([
        tradeLoader.weeklyPoints(league.leagueId, 0, lastPlayed),
        tradeLoader.rows(league.leagueId, Math.max(1, state.nfl.week))
      ]);
      const positionsOf = (playerId) => players.info(playerId).positions;
      const lineups = recap.lineups(myRosterId, weekly, league.raw.slots, positionsOf);
      const wire = recap.wire(myRosterId, moves, weekly);
      const mine = tradeHistory.parse(trades, league.raw.season).filter((trade) => trade.sides[myRosterId]);
      let net = 0;
      for (const trade of mine) {
        const real = tradeHistory.realized(trade, weekly);
        net += real[myRosterId].started - Object.entries(real).filter(([rosterId]) => Number(rosterId) !== myRosterId).reduce((total, [, entry]) => total + entry.started, 0);
      }
      const startedPoints = (rosterId, playerId, afterWeek) => weekly.reduce((total, weekEntry) => {
        const entry = weekEntry.rosters[rosterId];
        return weekEntry.week > afterWeek && entry && (entry.starters || []).includes(playerId) ? total + ((entry.points && entry.points[playerId]) || 0) : total;
      }, 0);
      let bestPickup = null;
      let bestGivenAway = null;
      for (const trade of mine) {
        for (const [rosterId, side] of Object.entries(trade.sides)) {
          const mineSide = Number(rosterId) === myRosterId;
          for (const playerId of side.got) {
            const points = Math.round(startedPoints(Number(rosterId), playerId, trade.week) * 10) / 10;
            if (mineSide && (!bestPickup || points > bestPickup.pts)) bestPickup = { pid: playerId, pts: points };
            if (!mineSide && (!bestGivenAway || points > bestGivenAway.pts)) bestGivenAway = { pid: playerId, pts: points };
          }
        }
      }
      return {
        lineups, wire, trades: mine.length, tradeNet: round1(net), weeks: weekly.length,
        bestPickup: bestPickup && bestPickup.pts > 0 ? bestPickup : null,
        bestGivenAway: bestGivenAway && bestGivenAway.pts > 0 ? bestGivenAway : null
      };
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
      const recapSummary = recaps.get(league.leagueId);
      const myTeam = league.me;
      let body;
      if (!recapSummary || recapSummary.status === 'loading') body = '<div class="skel" role="status" aria-label="Reading your season"><i></i><i></i></div>';
      else if (recapSummary.status === 'error') body = `<p class="error">Couldn't read this season: ${escapeHtml(recapSummary.error)}</p>`;
      else if (!recapSummary.weeks) body = '<p class="muted small se-note">No finished weeks yet.</p>';
      else {
        const face = (playerId) => `<img class="sr-face" src="${NightOwl.teams.headshot(playerId)}" alt="" loading="lazy" onerror="this.style.display='none'">`;
        const luckTone = myTeam.luck > 0 ? 'up' : myTeam.luck < 0 ? 'down' : '';
        const row = (playerId, note, points) => `<li class="sr-row">${face(playerId)}<span class="sr-who"><b>${pname(playerId)}</b><em>${note}</em></span><span class="sr-pts">${points.toFixed(0)}</span></li>`;
        const weeksText = (count) => `${count} start${count === 1 ? '' : 's'}`;
        const wire = recapSummary.wire;
        const good = [
          ...recapSummary.lineups.scorers.map((scorer, index) => row(scorer.pid, index === 0 ? `MVP, ${weeksText(scorer.weeks)}` : `Carried you, ${weeksText(scorer.weeks)}`, scorer.pts)),
          wire.bestAdd ? row(wire.bestAdd.pid, `Pickup after week ${wire.bestAdd.week}`, wire.bestAdd.started) : '',
          recapSummary.bestPickup ? row(recapSummary.bestPickup.pid, 'Trade pickup', recapSummary.bestPickup.pts) : ''
        ].filter(Boolean).join('');
        const bad = [
          wire.regret ? row(wire.regret.pid, 'Dropped, then starred for others', wire.regret.pts) : '',
          recapSummary.bestGivenAway ? row(recapSummary.bestGivenAway.pid, 'Traded away, started for them', recapSummary.bestGivenAway.pts) : ''
        ].filter(Boolean).join('');
        const tradeLine = recapSummary.trades ? `<span>${recapSummary.trades} trade${recapSummary.trades === 1 ? '' : 's'}: ${signed(recapSummary.tradeNet)} pts</span>` : '';
        const wireLine = wire.adds ? `<span>${wire.adds} adds, ${wire.drops} drops</span>` : '';
        body = `<div class="sr-top">
            <div class="sr-rank"><b>${ordinal(myTeam.rank)}</b><span>${myTeam.wins}–${myTeam.losses}${myTeam.ties ? `–${myTeam.ties}` : ''}</span></div>
            <div class="sr-luck ${luckTone}" title="Wins above what your weekly scores earned"><b>${myTeam.luck == null ? '–' : signed(myTeam.luck)}</b><span>wins of luck</span></div>
            <div class="sr-meta">${tradeLine}${wireLine}</div>
          </div>
          ${good ? `<p class="sr-h up">What went right</p><ul class="sr-rows up">${good}</ul>` : ''}
          ${bad ? `<p class="sr-h down">What went wrong</p><ul class="sr-rows down">${bad}</ul>` : ''}`;
      }
      return `<details class="se-league" data-id="${escapeHtml(league.leagueId)}"${state.open.has(league.leagueId) ? ' open' : ''}>
        <summary><div class="se-head"><span class="se-name">${escapeHtml(league.name)}</span><span class="se-rank${league.playoffTeams && myTeam.rank <= league.playoffTeams ? ' in' : ''}">${ordinal(myTeam.rank)} of ${league.rows.length}</span></div></summary>
        ${body}
      </details>`;
    }

    function clear() { paths.clear(); recaps.clear(); }

    return { pathBlock, recapBlock, runPaths, runRecaps, clear };
  }

  NightOwl.seasonExtras = { create };
})(globalThis.NightOwl);
