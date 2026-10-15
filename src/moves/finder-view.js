globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, model, finder, ktc, value } = NightOwl;
  const { escape: escapeHtml, percent, delta: signed, leagueSelect } = NightOwl.format;
  const { isPick, pickOf, nearestPickPerRound } = NightOwl.moveValues;

  const SHOWN = 8;
  const CANDIDATES = 12;
  const PER_PARTNER = 2;
  const PER_ASSET = 2;
  const GOALS = [
    { id: 'balanced', label: 'Balanced', title: 'Weigh this season and the future as your team\'s outlook says' },
    { id: 'now', label: 'Win now', title: 'Pay in picks and youth for production this season' },
    { id: 'future', label: 'Rebuild', title: 'Sell production for picks and youth' }
  ];
  const HISTORY_WAIT_MS = 8000;
  const tick = () => new Promise((resolve) => setTimeout(resolve));
  const sum = (numbers) => numbers.reduce((total, number) => total + number, 0);

  function create(deps) {
    const { state, V: leagueValues, nameOf, league: currentLeague, render, openTrade, active, ensureHistory } = deps;
    const finderState = state.finder;

    function windows(league, base) {
      const teamCount = league.raw.rosters.length;
      const out = new Map();
      for (const roster of league.raw.rosters) {
        const projectedTeam = base && base.teams[roster.roster_id];
        const rank = league.ranks.get(roster.roster_id) || 1;
        const contentionLevel = projectedTeam && league.playoffTeams ? finder.contention(projectedTeam.playoffOdds) : teamCount > 1 ? (rank - 1) / (teamCount - 1) : 0.5;
        out.set(roster.roster_id, { contention: contentionLevel, odds: projectedTeam && league.playoffTeams ? projectedTeam.playoffOdds : null });
      }
      return out;
    }
    const outlook = (teamWindow, isDynasty) => {
      if (isDynasty) return teamWindow.contention >= 0.7 ? 'Contending' : teamWindow.contention < 0.3 ? 'Rebuilding' : 'In the hunt';
      return NightOwl.redraftValues.stanceLabel(NightOwl.redraftValues.stanceOf(teamWindow.odds));
    };

    async function ensureBase(league) {
      let base = state.base.get(league.leagueId);
      if (!base) {
        base = await model.projectLeague(league, { remainingOf: state.remainingOf, stats: state.stats, draftMethod: state.draftMethod });
        state.base.set(league.leagueId, base);
      }
      return base;
    }

    const hasPick = (deal) => deal.give.concat(deal.get).some(isPick);

    function variedDeals(sorted, limit, wanted, limits = true) {
      const chosen = new Set();
      const perPartner = new Map();
      const used = new Map();
      const incomingPlayers = new Set();
      const admit = (deal) => {
        if (chosen.has(deal)) return;
        const assetIds = deal.give.concat(deal.get);
        const incomingPlayerIds = deal.get.filter((assetId) => !isPick(assetId));
        if (limits && (incomingPlayerIds.some((playerId) => incomingPlayers.has(playerId)) || (perPartner.get(deal.partnerId) || 0) >= PER_PARTNER || assetIds.some((assetId) => (used.get(assetId) || 0) >= PER_ASSET))) return;
        for (const playerId of incomingPlayerIds) incomingPlayers.add(playerId);
        chosen.add(deal);
        perPartner.set(deal.partnerId, (perPartner.get(deal.partnerId) || 0) + 1);
        for (const assetId of assetIds) used.set(assetId, (used.get(assetId) || 0) + 1);
      };
      for (const deal of sorted.filter(wanted)) { if (chosen.size >= Math.ceil(limit / 2)) break; admit(deal); }
      for (const deal of sorted) { if (chosen.size >= limit) break; admit(deal); }
      return sorted.filter((deal) => chosen.has(deal));
    }

    const dynasty = (league) => league.kind !== 'redraft' && leagueValues.usesKtc(league);

    const packageOf = (isDynasty) => (values, picks) => ktc.packageValue(values.map((value, i) => ({ v: value, pick: !!(picks && picks[i]) })), isDynasty
      ? { exponent: ktc.EXPONENT_PACKAGE, replacement: ktc.REPLACEMENT_DYNASTY }
      : { exponent: ktc.EXPONENT_REDRAFT, replacement: ktc.REPLACEMENT_REDRAFT });

    function buildContext(league) {
      const isDynasty = dynasty(league);
      const hasConsensus = leagueValues.consensus(league);
      return {
        mode: isDynasty ? 'dynasty' : 'redraft',
        consensus: hasConsensus,
        slots: league.raw.slots,
        weeks: league.rep.weeks,
        positionsOf: league.rep.positionsOf,
        isVirtual: league.rep.isVirtual,
        ageOf: (assetId) => { const entry = state.ktc && state.ktc.players[assetId]; return entry && entry.a; },
        isPick,
        canCut: isDynasty ? () => true : (assetId) => leagueValues.restOfSeasonPoints(league, assetId) <= 25,
        rawOf: isDynasty ? (assetId) => leagueValues.blendedValue(league, assetId) : hasConsensus ? (assetId) => leagueValues.redraftValue(league, assetId) : (assetId) => leagueValues.overReplacement(league, assetId),
        valueOf: isDynasty ? (team, assetId, contentionLevel) => leagueValues.valueFor(league, assetId, contentionLevel) : (team, assetId) => leagueValues.redraftValue(league, assetId),
        sideValue: isDynasty || hasConsensus ? packageOf(isDynasty) : sum,
        pointValue: isDynasty || hasConsensus ? leagueValues.pointValue(league) : 1,
        fairTolerance: isDynasty && league.trade ? league.trade.band.tolerance : null,
        params: { minPoints: { me: finder.DEFAULTS.minPoints.me * league.scale, them: finder.DEFAULTS.minPoints.them * league.scale } },
        goal: finderState.goal,
        focus: { shop: finderState.shop, target: finderState.target }
      };
    }

    function teamOf(league, roster, teamWindow, isDynasty) {
      const contentionLevel = teamWindow.contention;
      const pool = model.activePool(roster);
      const priced = (assetId) => (isDynasty ? leagueValues.blendedValue(league, assetId) > 0 : leagueValues.restOfSeasonPoints(league, assetId) > 0);
      const assets = (isDynasty ? (roster.players || []) : pool).filter(priced).concat(isDynasty ? nearestPickPerRound((league.picks.get(roster.roster_id) || []).filter(priced)) : []);
      const appetite = league.trade ? league.trade.appetite.get(roster.roster_id) : null;
      return { id: roster.roster_id, pool: league.rep.pool(pool), assets, players: roster.players || [], count: (roster.players || []).length, capacity: league.capacity, w: contentionLevel, stance: NightOwl.redraftValues.stanceOf(teamWindow.odds), appetite };
    }

    async function run() {
      const token = ++finderState.token;
      const league = currentLeague();
      finderState.results = null;
      finderState.error = null;
      if (!league) { finderState.running = false; render(); return; }
      if (!league.weeks.length) { finderState.results = { items: [], windows: new Map(), mode: 'redraft', leagueId: league.leagueId }; finderState.running = false; render(); return; }
      finderState.running = true;
      finderState.progress = 'Reading the league…';
      render();
      try {
        if (!league.history) {
          finderState.progress = 'Reading the league\'s trades…';
          render();
          await Promise.race([ensureHistory(league), new Promise((resolve) => setTimeout(resolve, HISTORY_WAIT_MS))]);
          if (token !== finderState.token || !active()) return;
        }
        const base = await ensureBase(league).catch((error) => { console.warn('[Night Owl finder] no projection, using standings', error); return null; });
        if (token !== finderState.token || !active()) return;
        const teamWindows = windows(league, base);
        const isDynasty = dynasty(league);
        const context = buildContext(league);
        const myRoster = league.mine;
        const myTeam = teamOf(league, myRoster, teamWindows.get(myRoster.roster_id), isDynasty);
        const mine = finder.dropLosses(myTeam, context);
        const found = [];
        const others = league.raw.rosters.filter((roster) => roster.roster_id !== myRoster.roster_id);
        for (let i = 0; i < others.length; i++) {
          finderState.progress = `Checking ${nameOf(league, others[i])} (${i + 1} of ${others.length})…`;
          render();
          await tick();
          if (token !== finderState.token || !active()) return;
          const other = teamOf(league, others[i], teamWindows.get(others[i].roster_id), isDynasty);
          found.push(...finder.proposeFor(context, myTeam, other, mine));
        }
        found.sort((a, b) => b.score - a.score);
        const shortlist = variedDeals(found, CANDIDATES, (deal) => !hasPick(deal));
        const items = await rankByOdds(league, shortlist, context.mode, token);
        if (!items || token !== finderState.token) return;
        finderState.results = { items: variedDeals(items, SHOWN, (deal) => !hasPick(deal), false), windows: teamWindows, mode: context.mode, consensus: !!context.consensus, leagueId: league.leagueId };
        finderState.running = false;
        render();
      } catch (error) {
        console.error('[Night Owl finder]', error);
        finderState.error = NightOwl.format.errorText(error);
        finderState.running = false;
        render();
      }
    }

    async function rankByOdds(league, items, mode, token) {
      const base = state.base.get(league.leagueId);
      if (!league.playoffTeams || !base) return items;
      const myRosterId = league.mine.roster_id;
      const kept = [];
      for (let i = 0; i < items.length; i++) {
        finderState.progress = `Replaying the season with each deal (${i + 1} of ${items.length})…`;
        render();
        await tick();
        if (token !== finderState.token || !active()) return null;
        const item = items[i];
        try {
          const rosters = value.applyTrade(league.raw.rosters, myRosterId, item.partnerId, item.give.filter((assetId) => !isPick(assetId)), item.get.filter((assetId) => !isPick(assetId)));
          const after = await model.projectLeague(league, { remainingOf: state.remainingOf, stats: state.stats, rosters });
          item.odds = { base, after };
          const playoffOddsChange = after.teams[myRosterId].playoffOdds - base.teams[myRosterId].playoffOdds;
          const titleOddsChange = after.teams[myRosterId].titleOdds - base.teams[myRosterId].titleOdds;
          const care = mode === 'redraft' ? 1 : item.me.wMe;
          if ((mode === 'redraft' || item.me.wMe >= 0.6) && (playoffOddsChange < -0.01 || titleOddsChange < -0.005)) continue;
          item.score *= Math.max(0.4, Math.min(3, 1 + care * (14 * titleOddsChange + 5 * playoffOddsChange)));
        } catch (error) {
          console.warn('[Night Owl finder] odds unavailable', error);
        }
        kept.push(item);
      }
      return kept.sort((a, b) => b.score - a.score);
    }

    const nameOfAsset = (league, assetId) => {
      if (!isPick(assetId)) return players.info(assetId).name;
      const pick = pickOf(assetId);
      const slot = pick.year === Number(league.raw.season) + 1 ? leagueValues.pickSlot(league, pick.from) : null;
      return slot ? `${pick.year} ${pick.round}.${String(slot).padStart(2, '0')}` : `${pick.year} ${leagueValues.pickTierOf(league, pick)} ${leagueValues.ordinalRound(pick.round)}`;
    };
    const list = (league, assetIds) => assetIds.map((assetId) => nameOfAsset(league, assetId)).join(' + ');
    const ageOf = (assetId) => { const entry = state.ktc && state.ktc.players[assetId]; return entry && entry.a; };
    const slotText = (slot) => NightOwl.leagues.slotLabel(slot);
    const oddsLabel = (probability) => (probability >= 0.995 ? '>99%' : probability > 0 && probability < 0.005 ? '<1%' : percent(probability));

    function reasons(league, item, partner, teamWindows) {
      const isDynasty = finderState.results.mode === 'dynasty';
      const partnerWindow = teamWindows.get(partner.roster_id);
      const them = nameOf(league, partner);
      const out = [];
      const weekCount = league.weeks.length;
      const starts = (side) => side.starts.slice(0, 2).map((start) => `${players.info(start.id).name} at ${slotText(start.slot)} (${start.weeks} of ${weekCount} wks${start.weeks <= 0.3 * weekCount ? ', cover' : ''})`).join(', ');
      if (item.me.starts.length) out.push(`<b>You:</b> ${escapeHtml(starts(item.me))}.`);
      else if (item.me.dPts > 0.5) out.push(`<b>You:</b> ${signed(item.me.dPts)} pts of depth and injury cover.`);
      else if (isDynasty) out.push(`<b>You:</b> little change this season (${signed(item.me.dPts)} pts), more long-term value.`);
      if (item.them.starts.length) out.push(`<b>${escapeHtml(them)}:</b> ${escapeHtml(starts(item.them))} (${signed(item.them.dPts)} pts).`);
      else if (item.them.dPts > 0.5) out.push(`<b>${escapeHtml(them)}:</b> ${signed(item.them.dPts)} pts of depth.`);
      const market = isDynasty || finderState.results.consensus;
      if (isDynasty) {
        const ageGive = avg(item.give.filter((assetId) => !isPick(assetId)).map(ageOf).filter(Boolean));
        const ageGet = avg(item.get.filter((assetId) => !isPick(assetId)).map(ageOf).filter(Boolean));
        const picksGive = item.give.filter(isPick).length;
        const picksGet = item.get.filter(isPick).length;
        if (partnerWindow.contention < 0.3 && (picksGive || (ageGive && ageGet && ageGive < ageGet - 1))) out.push(`<b>Fit:</b> ${escapeHtml(them)} is rebuilding (${partnerWindow.odds != null ? `${oddsLabel(partnerWindow.odds)} playoff odds` : 'bottom of the standings'}) and gets ${picksGive ? 'draft capital' : 'younger players'}.`);
        else if (partnerWindow.contention >= 0.7 && (picksGet || (ageGive && ageGet && ageGet < ageGive - 1))) out.push(`<b>Fit:</b> ${escapeHtml(them)} is contending and is paid in production, not futures.`);
        else if (partnerWindow.contention >= 0.7) out.push(`<b>Fit:</b> ${escapeHtml(them)} is contending (${partnerWindow.odds != null ? `${oddsLabel(partnerWindow.odds)} playoff odds` : 'top of the standings'}) and wants points now.`);
      } else if (finderState.results.consensus && partnerWindow.contention < 0.25) {
        out.push(`<b>Fit:</b> ${escapeHtml(them)} is out of the race${partnerWindow.odds != null ? ` (${oddsLabel(partnerWindow.odds)} playoff odds)` : ''}, so what counts for them is a fair price.`);
      } else if (!market) {
        out.push('<b>Pitch:</b> both lineups improve, so neither side is giving ground.');
      }
      if (market) {
        const gap = item.rawNetThem;
        const name = isDynasty ? 'blended value' : 'consensus value';
        if (Math.abs(gap) < 0.04) out.push(`<b>Value:</b> within 4% on ${name}, an easy sell.`);
        else if (gap > 0) out.push(`<b>Value:</b> they win by ${Math.round(gap * 100)}% on ${name}, so it reads as a good deal for them.`);
        else out.push(`<b>Value:</b> they give up ${Math.round(-gap * 100)}% on ${name}${isDynasty ? ' and get the fit in return' : ' but gain real points'}.`);
      }
      if (!isDynasty && finderState.results.consensus) {
        const valuePerPoint = leagueValues.pointValue(league);
        const priced = (assetId) => state.ktcRedraft.players[assetId] && leagueValues.redraftValue(league, assetId) >= 1500 && leagueValues.overReplacement(league, assetId) >= 12;
        const edge = (assetId) => (priced(assetId) ? (leagueValues.overReplacement(league, assetId) * valuePerPoint) / leagueValues.redraftValue(league, assetId) - 1 : 0);
        const regular = new Set(item.me.starts.filter((start) => start.weeks >= 0.4 * league.weeks.length).map((start) => start.id));
        const buy = item.get.filter((assetId) => regular.has(assetId)).map((assetId) => [assetId, edge(assetId)]).sort((a, b) => b[1] - a[1])[0];
        const sell = item.give.filter((assetId) => !isPick(assetId)).map((assetId) => [assetId, edge(assetId)]).sort((a, b) => a[1] - b[1])[0];
        if (buy && buy[1] >= 0.15) out.push(`<b>Edge:</b> ${escapeHtml(players.info(buy[0]).name)} projects ${Math.round(Math.min(buy[1], 0.6) * 100)}%${buy[1] > 0.6 ? '+' : ''} more points than his price suggests.`);
        else if (sell && sell[1] <= -0.15) out.push(`<b>Edge:</b> you are selling ${escapeHtml(players.info(sell[0]).name)} above what he projects (${Math.round(Math.min(-sell[1], 0.6) * 100)}% less production than his price).`);
      }
      if (!isDynasty) {
        const formOfEach = (assetIds) => assetIds.filter((assetId) => !isPick(assetId)).map((assetId) => [assetId, leagueValues.formOf(league, assetId)]).filter(([, form]) => form);
        const hot = formOfEach(item.give).find(([, form]) => form.signal === 'hot');
        const cold = formOfEach(item.get).find(([, form]) => form.signal === 'cold');
        const rate = (form) => `${form.recentPerGame.toFixed(1)} a game against ${form.projectedPerGame.toFixed(1)} projected`;
        if (hot) out.push(`<b>Sell high:</b> ${escapeHtml(players.info(hot[0]).name)} is scoring ${rate(hot[1])}, and that tends to come back down.`);
        if (cold) out.push(`<b>Buy low:</b> ${escapeHtml(players.info(cold[0]).name)} has scored ${rate(cold[1])}, and his role has not changed.`);
      }
      const tradeRecord = league.trade && league.trade.record.get(partner.roster_id);
      if (tradeRecord && tradeRecord.trades >= 2) {
        const seasons = league.trade.seasons;
        const base = `${them} has made ${tradeRecord.trades} trade${tradeRecord.trades === 1 ? '' : 's'} in ${seasons} season${seasons === 1 ? '' : 's'}`;
        if (isDynasty && tradeRecord.avgPct > 0.05) out.push(`<b>History:</b> ${escapeHtml(base)} and usually comes out ahead (${Math.round(tradeRecord.avgPct * 100)}% on average): expect them to push on price.`);
        else if (isDynasty && tradeRecord.avgPct < -0.05) out.push(`<b>History:</b> ${escapeHtml(base)} and has tended to give value away (${Math.round(-tradeRecord.avgPct * 100)}% on average).`);
        else out.push(`<b>History:</b> ${escapeHtml(base)}, usually close to even.`);
      } else if (league.trade && league.trade.appetite.get(partner.roster_id) <= 0.3) {
        out.push(`<b>History:</b> ${escapeHtml(them)} has rarely traded here, so a yes is harder to get.`);
      }
      if (item.drops.me.length) out.push(`<b>Roster:</b> you would cut ${escapeHtml(item.drops.me.map((assetId) => players.info(assetId).name).join(', '))}.`);
      if (item.drops.them.length) out.push(`<b>Roster:</b> ${escapeHtml(them)} would cut ${escapeHtml(item.drops.them.map((assetId) => players.info(assetId).name).join(', '))}.`);
      return out.slice(0, 6);
    }
    const avg = (numbers) => (numbers.length ? sum(numbers) / numbers.length : null);

    function offerText(league, item) {
      const them = item.them.starts[0];
      const pitch = them ? ` ${players.info(them.id).name} would start for you at ${slotText(them.slot)}.` : '';
      return `Trade idea (${league.name}): I send ${list(league, item.give)} for your ${list(league, item.get)}.${pitch} Let me know what you think!`;
    }

    function assetRow(league, assetId, ownerRoster, isDynasty) {
      const valueText = isDynasty ? leagueValues.worth(leagueValues.blendedValue(league, assetId)) : `${Math.round(leagueValues.restOfSeasonPoints(league, assetId))} pts`;
      const title = isDynasty ? `Value: KeepTradeCut (${leagueValues.worth(leagueValues.dynastyValue(league, assetId))}, for this league's format and scoring) mixed with projected points over a free agent` : `Projected points rest of season${finderState.results.consensus ? `; consensus value ${leagueValues.worth(leagueValues.redraftValue(league, assetId))}` : ''}`;
      const who = isPick(assetId) ? deps.pickLabel(league, assetId, ownerRoster) : deps.label(assetId);
      const age = !isPick(assetId) && ageOf(assetId) ? `<i class="mv-age">${Math.round(ageOf(assetId))}y</i>` : '';
      return `<li>${who}${age}<span class="mv-ros" title="${title}">${valueText}</span></li>`;
    }

    function kpiOdds(oddsReplay, league, partner) {
      if (!oddsReplay) return '';
      const key = oddsReplay.after.bracket ? 'titleOdds' : league.playoffTeams ? 'playoffOdds' : null;
      if (!key) return '';
      const b = oddsReplay.base.teams[league.mine.roster_id][key];
      const a = oddsReplay.after.teams[league.mine.roster_id][key];
      const improved = a - b > 0.002;
      const down = a - b < -0.002;
      const partnerOdds = oddsReplay.after.teams[partner.roster_id];
      return `<div class="kpi ${improved ? 'up' : down ? 'down' : ''}" title="Your ${key === 'titleOdds' ? 'title' : 'playoff'} odds with the trade done; their ${key === 'titleOdds' ? 'title' : 'playoff'} odds: ${oddsLabel(oddsReplay.base.teams[partner.roster_id][key])} → ${oddsLabel(partnerOdds[key])}"><b>${oddsLabel(b)}<i>→</i>${oddsLabel(a)}</b><span>${key === 'titleOdds' ? 'title odds' : 'playoff odds'}</span></div>`;
    }

    function why(league, item, partner, teamWindows) {
      const [first, ...rest] = reasons(league, item, partner, teamWindows);
      if (!first) return '';
      return `<p class="mv-why1">${first}</p>${rest.length ? `<details class="mv-more"><summary>Why it works</summary><ul class="mv-why">${rest.map((reason) => `<li>${reason}</li>`).join('')}</ul></details>` : ''}`;
    }

    function card(league, item, index, teamWindows) {
      const isDynasty = finderState.results.mode === 'dynasty';
      const partner = league.raw.rosters.find((roster) => roster.roster_id === item.partnerId);
      const them = nameOf(league, partner);
      const partnerWindow = teamWindows.get(partner.roster_id);
      const label = item.likelihood >= 0.62 ? 'Likely' : item.likelihood >= 0.42 ? 'Fair shot' : 'Long shot';
      const tone = item.likelihood >= 0.62 ? 'high' : item.likelihood >= 0.42 ? 'mid' : 'low';
      const oddsReplay = item.odds;
      const marketOf = isDynasty ? leagueValues.blendedValue : leagueValues.redraftValue;
      const price = packageOf(isDynasty);
      const rawGive = price(item.give.map((assetId) => marketOf(league, assetId)), item.give.map(isPick));
      const rawGet = price(item.get.map((assetId) => marketOf(league, assetId)), item.get.map(isPick));
      return `<article class="mv-card ${tone}">
        <div class="mv-card-h">
          <div><b>${escapeHtml(them)}</b> <span class="mv-win ${partnerWindow.contention >= 0.7 ? 'hot' : partnerWindow.contention < 0.3 ? 'cold' : ''}">${outlook(partnerWindow, isDynasty)}${partnerWindow.odds != null ? ` · ${oddsLabel(partnerWindow.odds)}` : ''}</span></div>
          <span class="mv-likely ${tone}" title="How likely they are to say yes: they come out ahead in their own terms and the value is not lopsided against them">${label}</span>
        </div>
        <div class="mv-swap">
          <div><h5>You give</h5><ul>${item.give.map((assetId) => assetRow(league, assetId, league.mine, isDynasty)).join('')}</ul></div>
          <div class="mv-arrow" aria-hidden="true">⇄</div>
          <div><h5>You get</h5><ul>${item.get.map((assetId) => assetRow(league, assetId, partner, isDynasty)).join('')}</ul></div>
        </div>
        <div class="mv-kpis">
          <div class="kpi ${item.me.dPts >= 0 ? 'up' : 'down'}" title="Lineup points over replacement for the rest of the season; ${escapeHtml(them)}: ${signed(item.them.dPts)}"><b>${signed(item.me.dPts)}</b><span>pts for you</span></div>
          ${kpiOdds(oddsReplay, league, partner)}
          ${isDynasty || finderState.results.consensus ? `<div class="kpi" title="Blended value, packages adjusted: you give ${leagueValues.worth(rawGive)}, you get ${leagueValues.worth(rawGet)}"><b>${leagueValues.worth(rawGive)}<i>⇄</i>${leagueValues.worth(rawGet)}</b><span>value</span></div>` : ''}
        </div>
        ${why(league, item, partner, teamWindows)}
        <div class="mv-actions">
          <button type="button" class="mv-btn ghost" data-finder="copy" data-i="${index}">Copy offer</button>
          <button type="button" class="mv-btn" data-finder="open" data-i="${index}">Open in analyzer</button>
        </div>
      </article>`;
    }

    function controls(league) {
      const isDynasty = dynasty(league);
      const myAssetIds = (league.mine.players || []).filter((assetId) => (isDynasty ? leagueValues.dynastyValue(league, assetId) > 0 : leagueValues.restOfSeasonPoints(league, assetId) > 0))
        .concat(isDynasty ? (league.picks.get(league.mine.roster_id) || []).filter((assetId) => leagueValues.dynastyValue(league, assetId) > 0) : []);
      const rank = (assetId) => (isDynasty ? leagueValues.dynastyValue(league, assetId) : leagueValues.restOfSeasonPoints(league, assetId));
      myAssetIds.sort((a, b) => rank(b) - rank(a));
      const others = league.raw.rosters.filter((roster) => roster.roster_id !== league.mine.roster_id).sort((a, b) => nameOf(league, a).localeCompare(nameOf(league, b)));
      const option = (assetId, selected) => `<option value="${escapeHtml(assetId)}"${selected ? ' selected' : ''}>${escapeHtml(nameOfAsset(league, assetId))}${isPick(assetId) ? '' : ` (${escapeHtml(players.info(assetId).pos)})`}</option>`;
      const targets = others.map((roster) => {
        const topAssetIds = (roster.players || []).filter((assetId) => rank(assetId) > 0).sort((a, b) => rank(b) - rank(a)).slice(0, 12);
        return topAssetIds.length ? `<optgroup label="${escapeHtml(nameOf(league, roster))}">${topAssetIds.map((assetId) => option(assetId, assetId === finderState.target)).join('')}</optgroup>` : '';
      }).join('');
      return `<div class="mv-selects mv-finder-controls">
        ${leagueSelect(state.leagues, league.leagueId)}
        <select id="mv-shop" aria-label="Shop a player"><option value="">Shop one of yours…</option>${myAssetIds.map((assetId) => option(assetId, assetId === finderState.shop)).join('')}</select>
        <select id="mv-target" aria-label="Target a player"><option value="">Go after a player…</option>${targets}</select>
      </div>
      ${isDynasty ? `<div class="tabs mv-goals" role="group" aria-label="Goal">${GOALS.map((goal) => `<button type="button" class="tab${finderState.goal === goal.id ? ' on' : ''}" data-goal="${goal.id}" title="${escapeHtml(goal.title)}">${goal.label}</button>`).join('')}</div>` : ''}`;
    }

    function aiView(league) {
      const results = finderState.results;
      const isDynasty = results.mode === 'dynasty';
      const context = buildContext(league);
      const teamWindows = results.windows;
      const rosterView = (roster, label) => {
        const team = teamOf(league, roster, teamWindows.get(roster.roster_id), isDynasty);
        const losses = finder.dropLosses(team, context).out;
        const listed = (roster.players || []).filter((playerId) => !isPick(playerId) && players.info(playerId).pos).map((playerId) => {
          const info = players.info(playerId);
          return { id: playerId, name: info.name, pos: info.pos, age: ageOf(playerId) ? Math.round(ageOf(playerId)) : null, team: info.team || null, market: Math.round(context.rawOf(playerId)), projected: Math.round(leagueValues.restOfSeasonPoints(league, playerId) * 10) / 10, lineupValue: Math.round((losses.get(playerId) || 0) * 10) / 10 };
        }).sort((a, b) => b.projected - a.projected);
        const settings = roster.settings || {};
        return { rosterId: label || roster.roster_id, record: `${settings.wins || 0}-${settings.losses || 0}`, rank: league.ranks.get(roster.roster_id) || 1, pointsFor: Math.round((settings.fpts || 0) + (settings.fpts_decimal || 0) / 100), window: Math.round(teamWindows.get(roster.roster_id).contention * 100) / 100, players: listed };
      };
      const partnerIds = [...new Set(results.items.map((item) => item.partnerId))];
      return {
        league: { kind: isDynasty ? 'dynasty' : 'redraft', teams: league.raw.rosters.length, week: state.nfl ? state.nfl.week : 0, weeksLeft: league.weeks.length, playoffStart: league.raw.playoffStart || null, playoffTeams: league.playoffTeams || null, slots: league.raw.slots, superflex: Boolean(league.superflex), tightEndPremium: Boolean(league.tep), scoring: { reception: (league.raw.scoring && league.raw.scoring.rec) || 0, passTouchdown: (league.raw.scoring && league.raw.scoring.pass_td) || 4 } },
        me: rosterView(league.mine, 'me'),
        partners: partnerIds.map((partnerId) => rosterView(league.raw.rosters.find((roster) => roster.roster_id === partnerId))),
        candidates: results.items.map((item, index) => ({ key: `c${index + 1}`, partnerId: item.partnerId, give: item.give, get: item.get, giveText: list(league, item.give), getText: list(league, item.get), static: { myPoints: Math.round(item.me.dPts * 10) / 10, theirPoints: Math.round(item.them.dPts * 10) / 10, fairnessToThem: Math.round(item.rawNetThem * 100) / 100, likelihood: Math.round(item.likelihood * 100) / 100 } }))
      };
    }

    const aiPane = NightOwl.movesAi.create({
      finderState, nameOf, currentLeague, render, openTrade,
      buildView: aiView,
      listAssets: (league, assetIds) => list(league, assetIds)
    });

    function pane() {
      const league = currentLeague();
      if (!league) return '<p class="empty muted">No league with a regular season left to play.</p>';
      const isDynasty = dynasty(league);
      const noValues = league.kind !== 'redraft' && !leagueValues.usesKtc(league)
        ? '<p class="mv-warn small">KeepTradeCut isn\'t loading, so deals are priced on this season\'s points only.</p>' : '';
      const deadline = league.tradeDeadline && state.nfl && state.nfl.week > league.tradeDeadline
        ? `<p class="mv-warn small">This league's trade deadline (week ${league.tradeDeadline}) has passed.</p>` : '';
      const kind = isDynasty ? 'Dynasty: priced on KeepTradeCut and each team\'s window.' : leagueValues.consensus(league) ? 'Redraft: lineup points for the rest of the season (playoffs weighted), with KeepTradeCut\'s redraft values as the price.' : 'Redraft: priced on lineup points for the rest of the season.';
      let body;
      if (finderState.running && !finderState.results) body = `<div class="skel" role="status"><i></i><i></i></div><p class="muted small mv-note">${escapeHtml(finderState.progress || '')}</p>`;
      else if (finderState.error) body = `<p class="error">${escapeHtml(finderState.error)}</p>`;
      else if (!finderState.results) body = '<p class="muted small mv-note">Searching…</p>';
      else if (!finderState.results.items.length) {
        body = `<p class="empty muted">No deal where both sides come out ahead.${finderState.shop || finderState.target ? ' Try another player.' : ' Shop a player or go after one.'}</p>`;
      } else {
        body = finderState.results.items.map((item, i) => card(league, item, i, finderState.results.windows)).join('');
      }
      return `<div class="mv-finder" title="${escapeHtml(kind)}">${controls(league)}${noValues}${deadline}${aiPane.block(league)}${body}</div>`;
    }

    function change(event) {
      const element = event.target;
      if (element.id === 'mv-league') { finderState.leagueId = element.value; finderState.shop = null; finderState.target = null; }
      else if (element.id === 'mv-shop') finderState.shop = element.value || null;
      else if (element.id === 'mv-target') finderState.target = element.value || null;
      else return false;
      run();
      return true;
    }

    function click(event) {
      if (aiPane.click(event)) return true;
      const goal = event.target.closest('[data-goal]');
      if (goal) { finderState.goal = goal.dataset.goal; run(); return true; }
      const button = event.target.closest('[data-finder]');
      if (!button || !finderState.results) return false;
      const item = finderState.results.items[Number(button.dataset.i)];
      if (!item) return true;
      if (button.dataset.finder === 'open') openTrade(item);
      else copy(button, item);
      return true;
    }

    function copy(button, item) {
      const league = currentLeague();
      const text = offerText(league, item);
      const done = () => { button.textContent = 'Copied'; setTimeout(() => { button.textContent = 'Copy offer'; }, 1600); };
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject(new Error('no clipboard'))).then(done, () => {
        button.textContent = 'Copy failed';
        setTimeout(() => { button.textContent = 'Copy offer'; }, 1600);
      });
    }

    return { pane, change, click, run, key: aiPane.key };
  }

  NightOwl.movesFinder = { create };
})(globalThis.NightOwl);
