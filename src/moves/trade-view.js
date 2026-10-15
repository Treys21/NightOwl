globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, value, model } = NightOwl;
  const { escape: escapeHtml, percent, delta: signed, leagueSelect } = NightOwl.format;
  const oddsLabel = (probability) => (probability >= 0.995 ? '>99%' : probability > 0 && probability < 0.005 ? '<1%' : percent(probability));
  const { isPick } = NightOwl.moveValues;

  const tick = () => new Promise((resolve) => setTimeout(resolve));

  function create({ state, values, label, pickLabel, render, active }) {
    const { usesKtc, worth, dynastyValue, restOfSeasonPoints } = values;
    const leagueValues = values;

    const tradeLeague = () => state.leagues.find((league) => league.leagueId === state.trade.leagueId) || null;
    const rosterById = (league, rosterId) => league.raw.rosters.find((roster) => roster.roster_id === rosterId) || null;
    const nameOf = (league, roster) => (roster ? league.names.get(roster.owner_id) || `Team ${roster.roster_id}` : '');

    function keepTradeValid() {
      const tradeState = state.trade;
      let league = tradeLeague();
      if (!league) { league = state.leagues[0] || null; tradeState.leagueId = league && league.leagueId; tradeState.partner = null; tradeState.give.clear(); tradeState.get.clear(); }
      if (!league) return;
      const partner = tradeState.partner && rosterById(league, tradeState.partner);
      if (!partner || partner.roster_id === league.mine.roster_id) { tradeState.partner = null; tradeState.get.clear(); }
      const holds = (roster, playerId) => (isPick(playerId) ? (league.picks.get(roster.roster_id) || []) : roster.players || []).includes(playerId);
      for (const playerId of [...tradeState.give]) if (!holds(league.mine, playerId)) tradeState.give.delete(playerId);
      for (const playerId of [...tradeState.get]) if (!partner || !holds(partner, playerId)) tradeState.get.delete(playerId);
    }


    function pickList(league, roster, chosen, kind) {
      const away = new Set([...(roster.reserve || []), ...(roster.taxi || [])]);
      const rows = (roster.players || []).slice().sort((a, b) => (usesKtc(league) ? leagueValues.blendedValue(league, b) - leagueValues.blendedValue(league, a) : 0) || restOfSeasonPoints(league, b) - restOfSeasonPoints(league, a));
      const picks = (league.picks.get(roster.roster_id) || []).filter((playerId) => dynastyValue(league, playerId) > 0 || chosen.has(playerId));
      const pickRows = usesKtc(league) ? picks.map((playerId) => `<label class="mv-pick${chosen.has(playerId) ? ' on' : ''}">
          <input type="checkbox" data-${kind}="${escapeHtml(playerId)}"${chosen.has(playerId) ? ' checked' : ''}>
          ${pickLabel(league, playerId, roster)}<span class="mv-ros" title="Draft pick value (KeepTradeCut, for this league's format)">${worth(dynastyValue(league, playerId))}</span>
        </label>`).join('') : '';
      return `<div class="mv-picks">${rows.map((playerId) => {
        const tag = (roster.reserve || []).includes(playerId) ? 'IR' : (roster.taxi || []).includes(playerId) ? 'taxi' : '';
        return `<label class="mv-pick${chosen.has(playerId) ? ' on' : ''}">
          <input type="checkbox" data-${kind}="${escapeHtml(playerId)}"${chosen.has(playerId) ? ' checked' : ''}>
          ${label(playerId)}${usesKtc(league)
            ? `<span class="mv-ros" title="Value: KeepTradeCut (${worth(dynastyValue(league, playerId))}, for this league's format and scoring) mixed with projected points over a free agent${tag ? `; on ${escapeHtml(tag)}` : ''}">${leagueValues.blendedValue(league, playerId) ? worth(leagueValues.blendedValue(league, playerId)) : '–'}</span>`
            : `<span class="mv-ros" title="Projected points rest of season">${away.has(playerId) ? escapeHtml(tag) : Math.round(restOfSeasonPoints(league, playerId))}</span>`}
        </label>`;
      }).join('')}${pickRows}</div>`;
    }

    const pointsDeltaHtml = (amount) => `<b class="${amount > 0 ? 'up' : amount < 0 ? 'down' : ''}">${signed(amount)}</b>`;

    function sideCard(league, who, roster, impact, base, after, futureChange) {
      const odds = (key, text) => `${text} ${oddsLabel(base.teams[roster.roster_id][key])} → <b>${oddsLabel(after.teams[roster.roster_id][key])}</b>`;
      const hasPlayoffs = league.playoffTeams > 0;
      const line = base && after && hasPlayoffs
        ? `<div class="mv-side-o">${odds('playoffOdds', 'Playoffs')}${after.bracket ? ` · ${odds('titleOdds', 'Title')}` : ''}</div>`
        : (state.thinking && hasPlayoffs ? '<div class="mv-side-o muted">Updating odds…</div>' : '');
      const season = Number(league.raw.season);
      const size = futureChange ? NightOwl.horizon.meaningfulness(impact.delta, league.weeks.length) : null;
      const sizeTag = size ? `<span class="mv-size ${size}">${size === 'negligible' ? 'within noise' : size}</span>` : '';
      const later = futureChange ? `<div class="mv-side-f"><span class="muted">Next seasons</span> ${futureChange.map((change, index) => `${season + index + 1} ${pointsDeltaHtml(change)}`).join(' · ')}</div>` : '';
      return `<div class="mv-side">
        <div class="mv-side-h">${escapeHtml(who)}</div>
        <div class="mv-side-n">${pointsDeltaHtml(impact.delta)}<span class="muted"> pts this season</span>${sizeTag}</div>
        ${later}
        ${line}
      </div>`;
    }

    function marketLine(league, partner, them) {
      const tradeState = state.trade;
      const send = sideValueOf(league, [...tradeState.give]);
      const get = sideValueOf(league, [...tradeState.get]);
      const net = get - send;
      const big = Math.max(send, get, 1);
      const redraft = leagueValues.consensus(league);
      const unpriced = [...tradeState.give, ...tradeState.get].filter((playerId) => !leagueValues.marketValue(league, playerId)).length;
      const format = `${league.superflex ? 'Superflex' : '1QB'}${league.tep ? ` TE${'+'.repeat(league.tep)}` : ''}`;
      let call = redraft ? 'Even on consensus value.' : 'Even by blended value.';
      if (Math.abs(net) / big >= 0.05) call = net > 0 ? `Favors you by ${worth(net)} (${Math.round(Math.abs(net) / big * 100)}%).` : `Favors ${escapeHtml(them)} by ${worth(-net)} (${Math.round(Math.abs(net) / big * 100)}%).`;
      return { net, html: `<div class="mv-dyn" title="${redraft ? 'Consensus value (KeepTradeCut redraft)' : 'KeepTradeCut mixed with projected points'} · ${format} · this league's scoring · extra players count over a free agent${unpriced ? ` · ${unpriced} unpriced player${unpriced === 1 ? '' : 's'} counted as zero` : ''}">
        <div class="mv-dyn-n"><span>You send <b>${worth(send)}</b></span><span>You get <b>${worth(get)}</b></span>${valueDeltaHtml(net)}</div>
        <p class="mv-verdict">${call}</p>
      </div>` };
    }
    const sideValueOf = (league, assetIds) => leagueValues.packageValue(league, assetIds);
    const valueDeltaHtml = (amount) => `<b class="${amount > 0 ? 'up' : amount < 0 ? 'down' : ''}">${amount > 0 ? '+' : amount < 0 ? '−' : ''}${worth(Math.abs(amount))}</b>`;

    function verdict(myImpact, them, names) {
      const a = myImpact.delta;
      const b = them.delta;
      if (Math.abs(a) < 0.5 && Math.abs(b) < 0.5) return 'basically even.';
      if (a >= 0 && b >= 0) return 'both lineups improve.';
      if (a <= 0 && b <= 0) return 'both lineups get worse, so this is about depth or the future.';
      return a > b ? `favors you by ${Math.abs(a - b).toFixed(1)} pts.` : `favors ${escapeHtml(names)} by ${Math.abs(a - b).toFixed(1)} pts.`;
    }

    function dynastyVerdict(nowChange, futureChange, weeksLeft) {
      const horizon = NightOwl.horizon;
      const nowSize = horizon.meaningfulness(nowChange, weeksLeft);
      const nowText = nowSize === 'negligible' ? 'no real change for you this season' : `${nowChange > 0 ? 'helps' : 'costs'} you ${Math.abs(nowChange).toFixed(1)} pts this season (${nowSize})`;
      const lastYear = futureChange[futureChange.length - 1];
      const laterSize = horizon.meaningfulness(lastYear, horizon.SEASON_GAMES);
      const laterText = laterSize === 'negligible' ? 'and about even after that' : `and ${lastYear > 0 ? 'helps' : 'costs'} you ${Math.abs(lastYear).toFixed(0)} pts by ${futureChange.length} seasons out`;
      return `${nowText}, ${laterText}.`;
    }

    function tradeNotesHtml(league, result) {
      const tradeState = state.trade;
      const describe = (playerId) => {
        const entry = state.ktc && state.ktc.players[playerId];
        return { name: players.info(playerId).name, age: entry ? entry.a : null, position: (league.rep.positionsOf(playerId) || [])[0] };
      };
      const notes = NightOwl.horizon.tradeNotes({
        now: result.impact.a.delta,
        future: result.horizon.a,
        weeksLeft: league.weeks.length,
        season: Number(league.raw.season),
        gives: [...tradeState.give].filter((playerId) => !isPick(playerId)).map(describe),
        gets: [...tradeState.get].filter((playerId) => !isPick(playerId)).map(describe)
      });
      return notes.length ? `<ul class="mv-notes">${notes.slice(0, 3).map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul>` : '';
    }

    function redraftNotesHtml(league) {
      const tradeState = state.trade;
      const named = (assetIds) => [...assetIds].filter((assetId) => !isPick(assetId));
      const notes = [];
      const hot = named(tradeState.give).find((playerId) => (leagueValues.formOf(league, playerId) || {}).signal === 'hot');
      const cold = named(tradeState.get).find((playerId) => (leagueValues.formOf(league, playerId) || {}).signal === 'cold');
      if (hot) notes.push(`${players.info(hot).name} is running hotter than his projection, which is a good time to sell.`);
      if (cold) notes.push(`${players.info(cold).name} is scoring under his projection with no change in role, which is a good time to buy.`);
      const given = named(tradeState.give).length;
      const received = named(tradeState.get).length;
      if (received - given >= 1) notes.push(`You take on ${received - given} extra roster ${received - given === 1 ? 'spot' : 'spots'}; the other side gets the star, so expect a higher price.`);
      if (given - received >= 1) notes.push('You consolidate into fewer, better players, which suits a team already in position to make the playoffs.');
      return notes.length ? `<ul class="mv-notes">${notes.slice(0, 3).map((note) => `<li>${escapeHtml(note)}</li>`).join('')}</ul>` : '';
    }

    function tradeResult(league, partner) {
      const tradeState = state.trade;
      const result = tradeState.result;
      if (!result) return '';
      const them = nameOf(league, partner);
      const slots = league.capacity;
      const give = [...tradeState.give].filter((playerId) => !isPick(playerId)).length;
      const get = [...tradeState.get].filter((playerId) => !isPick(playerId)).length;
      const myCount = (league.mine.players || []).length - give + get;
      const theirCount = (partner.players || []).length - get + give;
      const warn = [];
      if (myCount > slots) warn.push(`You would need to drop ${myCount - slots}.`);
      if (theirCount > slots) warn.push(`${escapeHtml(them)} would need to drop ${theirCount - slots}.`);
      return `<div class="mv-result" title="Each lineup is re-set every remaining week on Sleeper's projections${league.kind !== 'redraft' ? '; later seasons use each player\'s per-game rate with an age curve for his position' : ''}. Odds replay the season ${model.SIMS.toLocaleString()} times with the trade done.">
        <div class="mv-sides">${sideCard(league, 'You', league.mine, result.impact.a, result.base, result.after, result.horizon && result.horizon.a)}${sideCard(league, them, partner, result.impact.b, result.base, result.after, result.horizon && result.horizon.b)}</div>
        ${usesKtc(league) || leagueValues.consensus(league) ? marketLine(league, partner, them).html : ''}
        <p class="mv-verdict mv-sub">${result.horizon ? `Lineups: ${dynastyVerdict(result.impact.a.delta, result.horizon.a, league.weeks.length)}` : `${usesKtc(league) || leagueValues.consensus(league) ? 'Lineups: ' : 'For this season: '}${verdict(result.impact.a, result.impact.b, them)}`}</p>
        ${result.horizon ? tradeNotesHtml(league, result) : league.kind === 'redraft' ? redraftNotesHtml(league) : ''}
        ${league.kind !== 'redraft' && state.ktcError ? '<p class="muted small">Dynasty values unavailable right now (KeepTradeCut could not be reached).</p>' : ''}
        ${warn.length ? `<p class="mv-warn small">${warn.join(' ')}</p>` : ''}
      </div>`;
    }

    function tradePane() {
      if (!state.leagues.length) return '<p class="empty muted">No league with a regular season left to play.</p>';
      const tradeState = state.trade;
      const league = tradeLeague() || state.leagues[0];
      const partner = tradeState.partner && rosterById(league, tradeState.partner);
      const others = league.raw.rosters.filter((roster) => roster.roster_id !== league.mine.roster_id).sort((a, b) => nameOf(league, a).localeCompare(nameOf(league, b)));
      return `<div class="mv-trade">
        <div class="mv-selects">
          ${leagueSelect(state.leagues, league.leagueId)}
          <select id="mv-partner" aria-label="Trade with">
            <option value="">Trade with…</option>
            ${others.map((roster) => `<option value="${roster.roster_id}"${partner && partner.roster_id === roster.roster_id ? ' selected' : ''}>${escapeHtml(nameOf(league, roster))}</option>`).join('')}
          </select>
        </div>
        ${partner ? `
          <h4 class="mv-h">You give</h4>${pickList(league, league.mine, tradeState.give, 'give')}
          <h4 class="mv-h">You get</h4>${pickList(league, partner, tradeState.get, 'get')}
          ${tradeResult(league, partner)}` : '<p class="muted small mv-note">Choose a team to trade with.</p>'}
      </div>`;
    }

    async function analyzeTrade() {
      const tradeState = state.trade;
      const league = tradeLeague();
      const partner = league && tradeState.partner && rosterById(league, tradeState.partner);
      const token = ++tradeState.token;
      state.thinking = false;
      if (!league || !partner || (!tradeState.give.size && !tradeState.get.size)) { tradeState.result = null; render(); return; }

      const give = [...tradeState.give].filter((playerId) => !isPick(playerId));
      const get = [...tradeState.get].filter((playerId) => !isPick(playerId));
      const impact = value.tradeImpact({
        slots: league.raw.slots, weeks: league.rep.weeks, positionsOf: league.rep.positionsOf,
        a: { pool: league.rep.pool(model.activePool(league.mine)) }, b: { pool: league.rep.pool(model.activePool(partner)) },
        aGives: give, bGives: get
      });
      const ktcAge = (playerId) => { const entry = state.ktc && state.ktc.players[playerId]; return entry ? entry.a : null; };
      const horizonImpact = usesKtc(league)
        ? NightOwl.horizon.horizonImpact({
          slots: league.raw.slots, positionsOf: league.rep.positionsOf, ageOf: ktcAge, weeks: league.weeks, isVirtual: league.rep.isVirtual, replacementRate: league.rep.rate,
          a: { pool: league.rep.pool(model.activePool(league.mine)) }, b: { pool: league.rep.pool(model.activePool(partner)) }, aGives: give, bGives: get
        })
        : null;
      tradeState.result = { impact, horizon: horizonImpact, base: state.base.get(league.leagueId) || null, after: null };
      state.thinking = league.playoffTeams > 0 && (give.length > 0 || get.length > 0);
      render();
      if (!state.thinking) return;

      try {
        await tick();
        const projectionOptions = { remainingOf: state.remainingOf, stats: state.stats };
        let base = state.base.get(league.leagueId);
        if (!base) { base = await model.projectLeague(league, projectionOptions); state.base.set(league.leagueId, base); }
        if (token !== tradeState.token) return;
        await tick();
        const after = await model.projectLeague(league, Object.assign({ rosters: value.applyTrade(league.raw.rosters, league.mine.roster_id, partner.roster_id, give, get) }, projectionOptions));
        if (token !== tradeState.token) return;
        tradeState.result = { impact, horizon: horizonImpact, base, after };
      } catch (error) {
        console.warn('[Night Owl moves] odds unavailable', error);
      } finally {
        if (token === tradeState.token) { state.thinking = false; if (active()) render(); }
      }
    }

    return { pane: tradePane, analyze: analyzeTrade, keepValid: keepTradeValid, nameOf };
  }

  NightOwl.movesTrade = { create };
})(globalThis.NightOwl);
