globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { teams, players } = NightOwl;
  const { escape: escapeHtml, short: shortNumber, percent: percentText, dayTime: timeOf } = NightOwl.format;
  const core = NightOwl.bets;

  const MIN_BAR_PERCENT = 6;
  const GOOD_DEFENSE_RANK = 8;
  const BAD_DEFENSE_RANK = 25;

  function create({ state }) {
    function sparkline(recent, line) {
      const values = recent.map((game) => game.value).filter((value) => value != null);
      if (!values.length) return '';
      const top = Math.max(line * 1.4, ...values, 1);
      const bars = recent.map((game) => {
        const heightPercent = Math.max(MIN_BAR_PERCENT, Math.round((game.value / top) * 100));
        return `<i class="${game.value > line ? 'over' : ''}" style="height:${heightPercent}%" title="${escapeHtml(game.opponent || '')} ${escapeHtml(game.date || '')}: ${shortNumber(game.value)}"></i>`;
      }).join('');
      return `<span class="bt-spark">${bars}<b style="bottom:${Math.round((line / top) * 100)}%"></b></span>`;
    }

    function marketRow(playerId, market, inPlay) {
      const rate = core.hitRate(market.recent, market.line);
      const projected = core.statValue(state.proj[playerId], market.keys);
      const live = inPlay ? core.progress(market, state.live[playerId]) : null;
      const marketKey = `${playerId}:${market.type}`;
      const lean = projected != null && !market.td && !market.max ? Math.round((projected - market.line) * 10) / 10 : null;
      const recentTitle = market.recent.map((game) => `${game.opponent || ''} ${shortNumber(game.value)}`).join(' · ');
      return `<div class="bt-tr${live && live.hit ? ' hit' : ''}${state.fresh.has(marketKey) ? ' just-hit' : ''}">
        <span class="bt-td-lbl">${escapeHtml(market.label)}</span>
        <span class="bt-td-line">${shortNumber(market.line)}</span>
        <span class="bt-td-odds" title="Over pays ${market.over || '–'}×">${market.over ? core.american(market.over) : '–'}</span>
        <span class="bt-td-odds" title="Under pays ${market.under || '–'}×">${market.under ? core.american(market.under) : '–'}</span>
        <span class="bt-td-l10${rate && rate.over * 2 > rate.games ? ' good' : ''}" title="Last ${market.recent.length}: ${escapeHtml(recentTitle)}">${sparkline(market.recent, market.line)}${rate ? `${rate.over}/${rate.games}` : '–'}</span>
        <span class="bt-td-proj ${lean > 0 ? 'up' : lean < 0 ? 'down' : ''}" title="${projected != null ? `Sleeper projects ${shortNumber(projected)}` : 'No projection for this stat'}">${lean != null ? `${lean > 0 ? '+' : ''}${shortNumber(lean)}` : '–'}</span>
        ${live ? `<span class="bt-tr-live${live.hit ? ' hit' : ''}"><i style="width:${Math.round(live.pct * 100)}%"></i><em>${live.hit ? '✓ ' : ''}${shortNumber(live.value)} / ${shortNumber(live.line)}</em></span>` : ''}
      </div>`;
    }

    function ladderRow(playerId, ladder, inPlay) {
      const market = (state.lines[playerId] || []).find((candidate) => candidate.keys.join() === ladder.keys.join() && !candidate.max);
      const values = market ? market.recent.map((game) => game.value).filter((value) => value != null) : [];
      const liveValue = inPlay ? (core.statValue(state.live[playerId], ladder.keys) ?? 0) : null;
      const rungs = core.trimRungs(ladder.rungs, market ? market.line : null).map((rung) => {
        const rate = values.length ? values.filter((value) => value >= rung).length / values.length : null;
        const reached = liveValue != null && liveValue >= rung;
        return `<span class="bt-rung${reached ? ' reached' : ''}" title="${rate != null ? `${rung}+ in ${Math.round(rate * values.length)} of last ${values.length}` : `${rung}+`}">
          ${rung}+${rate != null ? `<small>${percentText(rate)}</small>` : ''}</span>`;
      }).join('');
      return `<div class="bt-ladder"><span class="bt-ladder-lbl">${escapeHtml(ladder.label)}</span><div class="bt-rungs">${rungs}</div></div>`;
    }

    function context(player, game) {
      if (!game) return '';
      const opponent = game.home === player.team ? game.away : game.home;
      const separator = game.home === player.team ? 'vs' : '@';
      const rank = state.ranks[opponent] && state.ranks[opponent][player.pos === 'DEF' ? 'QB' : player.pos];
      const impliedTotals = core.impliedTotals(game);
      const parts = [`<span class="bt-opp"><img alt="" src="${teams.logo(opponent)}">${separator} ${escapeHtml(opponent)}</span>`];
      if (rank && player.pos !== 'DEF') {
        const tone = rank.rank <= GOOD_DEFENSE_RANK ? 'good' : rank.rank >= BAD_DEFENSE_RANK ? 'bad' : '';
        parts.push(`<span class="bt-rank ${tone}" title="${escapeHtml(opponent)} allows ${rank.perGame} fantasy pts/game to ${escapeHtml(player.pos)}s">${core.ordinal(rank.rank)} most to ${escapeHtml(player.pos)}s</span>`);
      }
      if (impliedTotals && impliedTotals.teams[player.team] != null) parts.push(`<span class="bt-chip">Team total <b>${shortNumber(impliedTotals.teams[player.team])}</b></span>`);
      if (impliedTotals) parts.push(`<span class="bt-chip">O/U <b>${shortNumber(impliedTotals.total)}</b>${impliedTotals.favorite ? ` · ${escapeHtml(impliedTotals.favorite)} −${shortNumber(impliedTotals.spread)}` : ''}</span>`);
      return `<div class="bt-ctx">${parts.join('')}</div>`;
    }

    function detail(playerId, spots, game, inPlay) {
      const player = players.info(playerId);
      const markets = state.lines[playerId] || [];
      const ladders = state.ladders[playerId] || [];
      const others = markets.filter((market) => !market.td);
      const touchdownMarket = markets.find((market) => market.td && market.type === 'anytime_touchdowns');
      const touchdownHitRate = touchdownMarket ? core.hitRate(touchdownMarket.recent, core.ANYTIME_TOUCHDOWN_LINE) : null;
      const spotChips = spots.map((spot) => `<span class="impact ${spot.side === 'me' ? 'helps' : 'hurts'}">${escapeHtml(spot.leagueName)} · ${spot.side === 'me' ? 'you' : 'opp'}</span>`).join('');
      return `<div class="bt-detail">
        <div class="impacts">${spotChips}</div>
        ${touchdownMarket && touchdownMarket.over ? `<div class="bt-tdline">Anytime TD <b class="am">${core.american(touchdownMarket.over)}</b>${touchdownHitRate ? ` · scored in ${touchdownHitRate.over} of last ${touchdownHitRate.games}` : ''}${touchdownMarket.under ? ` · No <b class="am">${core.american(touchdownMarket.under)}</b>` : ''}</div>` : ''}
        ${context(player, game)}
        ${others.length ? `<div class="bt-table">
          <div class="bt-tr bt-th"><span>Line</span><span></span><span>Over</span><span>Under</span><span>Last 10</span><span>Proj</span></div>
          ${others.map((other) => marketRow(playerId, other, inPlay)).join('')}
        </div>` : '<p class="muted small">No player lines posted yet.</p>'}
        ${ladders.length ? `<div class="bt-ladders"><span class="bt-sub">DraftKings milestones · hit rate last 10</span>${ladders.map((ladder) => ladderRow(playerId, ladder, inPlay)).join('')}</div>` : ''}
      </div>`;
    }

    function item(playerId, spots, game, showWindow) {
      const player = players.info(playerId);
      const markets = state.lines[playerId] || [];
      const touchdownMarket = markets.find((market) => market.type === 'anytime_touchdowns');
      const key = core.keyMarket(markets, player.pos);
      const inPlay = state.previewing || !!(game && game.state !== 'pre');
      const liveTd = touchdownMarket && inPlay ? core.progress(touchdownMarket, state.live[playerId]) : null;
      const keyLive = key && inPlay ? core.progress(key, state.live[playerId]) : null;
      const keyHitRate = key ? core.hitRate(key.recent, key.line) : null;
      const keyProj = key ? core.statValue(state.proj[playerId], key.keys) : null;
      const keyLean = key && keyProj != null && !key.max ? keyProj - key.line : null;
      const hits = inPlay ? markets.filter((market) => { const progress = core.progress(market, state.live[playerId]); return progress && progress.hit; }).length : 0;
      const mine = spots.filter((spot) => spot.side === 'me').length;
      const theirs = spots.length - mine;
      const open = state.open.has(playerId);
      const keyHtml = key
        ? `<span class="bt-key">${keyLive
          ? `<span class="bt-key-live${keyLive.hit ? ' hit' : ''}">${keyLive.hit ? '✓ ' : ''}${shortNumber(keyLive.value)}</span> <span class="bt-key-lbl">of ${shortNumber(key.line)} ${escapeHtml(key.label)}</span>`
          : `<span class="bt-key-lbl">${escapeHtml(key.label)}</span> <b>${shortNumber(key.line)}</b>${keyHitRate ? ` <span class="bt-key-hr${keyHitRate.over * 2 > keyHitRate.games ? ' good' : ''}">${keyHitRate.over}/${keyHitRate.games}</span>` : ''}${keyLean != null && Math.abs(keyLean) >= 0.5 ? ` <span class="bt-key-lean ${keyLean > 0 ? 'up' : 'down'}">${keyLean > 0 ? '▲' : '▼'}</span>` : ''}`}</span>`
        : `<span class="muted small">${inPlay ? escapeHtml(core.liveLine(player.pos, state.live[playerId]) || 'No line for this game') : 'No lines yet'}</span>`;
      const justCashed = markets.some((market) => state.fresh.has(`${playerId}:${market.type}`));
      return `<details class="bt-item${mine ? ' mine' : ' theirs'}${state.showOpp ? ' mixed' : ''}${justCashed ? ' cashing' : ''}${!key && !inPlay ? ' nolines' : ''}${state.justOpened.has(playerId) ? ' opening' : ''}" data-key="p:${escapeHtml(playerId)}" data-pid="${escapeHtml(playerId)}" style="--tc:${teams.colors(player.team).primary}"${open ? ' open' : ''}>
        <summary>
          ${teams.face(playerId, player.team)}
          <span class="bt-sum">
            <span class="bt-sum-top"><span class="ev-name">${escapeHtml(player.name)}</span><span class="muted small">${escapeHtml(player.pos)} · ${escapeHtml(player.team)}${showWindow && game ? ` · ${escapeHtml(timeOf(game.kickoff))}` : ''}</span></span>
            <span class="bt-sum-bot">${keyHtml}
              ${mine > 1 ? `<span class="bt-exp you" title="Starting in ${mine} of your leagues">${mine} leagues</span>` : ''}${theirs && (state.showOpp || !mine) ? `<span class="bt-exp opp" title="Starting for ${theirs} opponent${theirs > 1 ? 's' : ''}">opp ×${theirs}</span>` : ''}
              ${hits ? `<span class="bt-exp hit">✓ ${hits} hit</span>` : ''}</span>
          </span>
          ${touchdownMarket && touchdownMarket.over ? `<span class="bt-atd${liveTd && liveTd.hit ? ' hit' : ''}" title="Anytime touchdown odds"><b>${liveTd && liveTd.hit ? '✓ TD' : core.american(touchdownMarket.over)}</b>${liveTd && liveTd.hit ? '<small>scored</small>' : ''}</span>` : '<span></span>'}
          <span class="bt-chev">›</span>
        </summary>
        ${open ? detail(playerId, spots, game, inPlay) : ''}
      </details>`;
    }

    return { item };
  }

  NightOwl.betsRows = { create };
})(globalThis.NightOwl);
