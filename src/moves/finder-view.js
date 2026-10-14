globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, model, finder, ktc, value } = NightOwl;
  const { escape: escapeHtml, percent } = NightOwl.format;
  const { isPick, pickOf } = NightOwl.moveValues;

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
  const sum = (xs) => xs.reduce((a, b) => a + b, 0);

  function create(deps) {
    const { state, V, nameOf, league: currentLeague, render, openTrade, active, ensureHistory } = deps;
    const fs = state.finder;

    function windows(league, base) {
      const n = league.raw.rosters.length;
      const out = new Map();
      for (const roster of league.raw.rosters) {
        const t = base && base.teams[roster.roster_id];
        const rank = league.ranks.get(roster.roster_id) || 1;
        const w = t && league.playoffTeams ? finder.contention(t.playoffOdds) : n > 1 ? (rank - 1) / (n - 1) : 0.5;
        out.set(roster.roster_id, { w, odds: t && league.playoffTeams ? t.playoffOdds : null });
      }
      return out;
    }
    const outlook = (w) => (w >= 0.7 ? 'Contending' : w < 0.3 ? 'Rebuilding' : 'In the hunt');

    async function ensureBase(league) {
      let base = state.base.get(league.leagueId);
      if (!base) {
        base = await model.projectLeague(league, { remainingOf: state.remainingOf, stats: state.stats, draftMethod: state.draftMethod });
        state.base.set(league.leagueId, base);
      }
      return base;
    }

    const hasPick = (p) => p.give.concat(p.get).some(isPick);

    function varied(sorted, limit, wanted, limits = true) {
      const chosen = new Set();
      const perPartner = new Map();
      const used = new Map();
      const admit = (p) => {
        if (chosen.has(p)) return;
        const ids = p.give.concat(p.get);
        if (limits && ((perPartner.get(p.partnerId) || 0) >= PER_PARTNER || ids.some((id) => (used.get(id) || 0) >= PER_ASSET))) return;
        chosen.add(p);
        perPartner.set(p.partnerId, (perPartner.get(p.partnerId) || 0) + 1);
        for (const id of ids) used.set(id, (used.get(id) || 0) + 1);
      };
      for (const p of sorted.filter(wanted)) { if (chosen.size >= Math.ceil(limit / 2)) break; admit(p); }
      for (const p of sorted) { if (chosen.size >= limit) break; admit(p); }
      return sorted.filter((p) => chosen.has(p));
    }

    const dynasty = (league) => league.kind !== 'redraft' && V.usesKtc(league);

    const packageOf = (isDynasty) => (values, picks) => ktc.packageValue(values.map((v, i) => ({ v, pick: !!(picks && picks[i]) })), isDynasty
      ? { exponent: ktc.EXPONENT_PACKAGE, replacement: ktc.REPLACEMENT_DYNASTY }
      : { exponent: ktc.EXPONENT_REDRAFT, replacement: ktc.REPLACEMENT_REDRAFT });

    function buildContext(league) {
      const isDynasty = dynasty(league);
      const cons = V.consensus(league);
      return {
        mode: isDynasty ? 'dynasty' : 'redraft',
        consensus: cons,
        slots: league.raw.slots,
        weeks: league.rep.weeks,
        positionsOf: league.rep.positionsOf,
        isVirtual: league.rep.isVirtual,
        isPick,
        canCut: isDynasty ? () => true : (id) => V.rosPoints(league, id) <= 25,
        rawOf: isDynasty ? (id) => V.blendedValue(league, id) : cons ? (id) => V.redraftValue(league, id) : (id) => V.overReplacement(league, id),
        valueOf: isDynasty ? (team, id, w) => V.valueFor(league, id, w) : (team, id) => V.redraftValue(league, id),
        sideValue: isDynasty || cons ? packageOf(isDynasty) : sum,
        pointValue: isDynasty || cons ? V.pointValue(league) : 1,
        fairTolerance: isDynasty && league.trade ? league.trade.band.tolerance : null,
        params: { minPoints: { me: finder.DEFAULTS.minPoints.me * league.scale, them: finder.DEFAULTS.minPoints.them * league.scale } },
        goal: fs.goal,
        focus: { shop: fs.shop, target: fs.target }
      };
    }

    function teamOf(league, roster, w, isDynasty) {
      const pool = model.activePool(roster);
      const priced = (id) => (isDynasty ? V.blendedValue(league, id) > 0 : V.rosPoints(league, id) > 0);
      const assets = (isDynasty ? (roster.players || []) : pool).filter(priced).concat(isDynasty ? (league.picks.get(roster.roster_id) || []).filter(priced) : []);
      const appetite = league.trade ? league.trade.appetite.get(roster.roster_id) : null;
      return { id: roster.roster_id, pool: league.rep.pool(pool), assets, players: roster.players || [], count: (roster.players || []).length, capacity: league.capacity, w, appetite };
    }

    async function run() {
      const token = ++fs.token;
      const league = currentLeague();
      fs.results = null;
      fs.error = null;
      if (!league) { fs.running = false; render(); return; }
      if (!league.weeks.length) { fs.results = { items: [], windows: new Map(), mode: 'redraft', leagueId: league.leagueId }; fs.running = false; render(); return; }
      fs.running = true;
      fs.progress = 'Reading the league…';
      render();
      try {
        if (!league.history) {
          fs.progress = 'Reading the league\'s trades…';
          render();
          await Promise.race([ensureHistory(league), new Promise((resolve) => setTimeout(resolve, HISTORY_WAIT_MS))]);
          if (token !== fs.token || !active()) return;
        }
        const base = await ensureBase(league).catch((error) => { console.warn('[Night Owl finder] no projection, using standings', error); return null; });
        if (token !== fs.token || !active()) return;
        const win = windows(league, base);
        const isDynasty = dynasty(league);
        const context = buildContext(league);
        const myRo = league.mine;
        const me = teamOf(league, myRo, win.get(myRo.roster_id).w, isDynasty);
        const mine = finder.dropLosses(me, context);
        const found = [];
        const others = league.raw.rosters.filter((roster) => roster.roster_id !== myRo.roster_id);
        for (let i = 0; i < others.length; i++) {
          fs.progress = `Checking ${nameOf(league, others[i])} (${i + 1} of ${others.length})…`;
          render();
          await tick();
          if (token !== fs.token || !active()) return;
          const other = teamOf(league, others[i], win.get(others[i].roster_id).w, isDynasty);
          found.push(...finder.proposeFor(context, me, other, mine));
        }
        found.sort((a, b) => b.score - a.score);
        const shortlist = varied(found, CANDIDATES, (p) => !hasPick(p));
        const items = await rankByOdds(league, shortlist, context.mode, token);
        if (!items || token !== fs.token) return;
        fs.results = { items: varied(items, SHOWN, (p) => !hasPick(p), false), windows: win, mode: context.mode, consensus: !!context.consensus, leagueId: league.leagueId };
        fs.running = false;
        render();
      } catch (error) {
        console.error('[Night Owl finder]', error);
        fs.error = NightOwl.format.errorText(error);
        fs.running = false;
        render();
      }
    }

    async function rankByOdds(league, items, mode, token) {
      const base = state.base.get(league.leagueId);
      if (!league.playoffTeams || !base) return items;
      const mineId = league.mine.roster_id;
      const kept = [];
      for (let i = 0; i < items.length; i++) {
        fs.progress = `Replaying the season with each deal (${i + 1} of ${items.length})…`;
        render();
        await tick();
        if (token !== fs.token || !active()) return null;
        const item = items[i];
        try {
          const rosters = value.applyTrade(league.raw.rosters, mineId, item.partnerId, item.give.filter((id) => !isPick(id)), item.get.filter((id) => !isPick(id)));
          const after = await model.projectLeague(league, { remainingOf: state.remainingOf, stats: state.stats, rosters });
          item.odds = { base, after };
          const dP = after.teams[mineId].playoffOdds - base.teams[mineId].playoffOdds;
          const dT = after.teams[mineId].titleOdds - base.teams[mineId].titleOdds;
          const care = mode === 'redraft' ? 1 : item.me.wMe;
          if ((mode === 'redraft' || item.me.wMe >= 0.6) && (dP < -0.01 || dT < -0.005)) continue;
          item.score *= Math.max(0.4, Math.min(3, 1 + care * (14 * dT + 5 * dP)));
        } catch (error) {
          console.warn('[Night Owl finder] odds unavailable', error);
        }
        kept.push(item);
      }
      return kept.sort((a, b) => b.score - a.score);
    }

    const nameOfAsset = (league, id) => {
      if (!isPick(id)) return players.info(id).name;
      const pick = pickOf(id);
      const slot = pick.year === Number(league.raw.season) + 1 ? V.pickSlot(league, pick.from) : null;
      return slot ? `${pick.year} ${pick.round}.${String(slot).padStart(2, '0')}` : `${pick.year} ${V.pickTierOf(league, pick)} ${V.ordinalRound(pick.round)}`;
    };
    const list = (league, ids) => ids.map((id) => nameOfAsset(league, id)).join(' + ');
    const ageOf = (id) => { const e = state.ktc && state.ktc.players[id]; return e && e.a; };
    const slotText = (s) => NightOwl.leagues.slotLabel(s);
    const oddsLabel = (p) => (p >= 0.995 ? '>99%' : p > 0 && p < 0.005 ? '<1%' : percent(p));
    const signed = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(1)}`;

    function reasons(league, item, partner, win) {
      const isDynasty = fs.results.mode === 'dynasty';
      const w = win.get(partner.roster_id);
      const them = nameOf(league, partner);
      const out = [];
      const n = league.weeks.length;
      const starts = (side) => side.starts.slice(0, 2).map((s) => `${players.info(s.id).name} at ${slotText(s.slot)} (${s.weeks} of ${n} wks${s.weeks <= 0.3 * n ? ', cover' : ''})`).join(', ');
      if (item.me.starts.length) out.push(`<b>You:</b> ${escapeHtml(starts(item.me))}.`);
      else if (item.me.dPts > 0.5) out.push(`<b>You:</b> ${signed(item.me.dPts)} pts of depth and injury cover.`);
      else if (isDynasty) out.push(`<b>You:</b> little change this season (${signed(item.me.dPts)} pts), more long-term value.`);
      if (item.them.starts.length) out.push(`<b>${escapeHtml(them)}:</b> ${escapeHtml(starts(item.them))} (${signed(item.them.dPts)} pts).`);
      else if (item.them.dPts > 0.5) out.push(`<b>${escapeHtml(them)}:</b> ${signed(item.them.dPts)} pts of depth.`);
      const market = isDynasty || fs.results.consensus;
      if (isDynasty) {
        const ageGive = avg(item.give.filter((id) => !isPick(id)).map(ageOf).filter(Boolean));
        const ageGet = avg(item.get.filter((id) => !isPick(id)).map(ageOf).filter(Boolean));
        const picksGive = item.give.filter(isPick).length;
        const picksGet = item.get.filter(isPick).length;
        if (w.w < 0.3 && (picksGive || (ageGive && ageGet && ageGive < ageGet - 1))) out.push(`<b>Fit:</b> ${escapeHtml(them)} is rebuilding (${w.odds != null ? `${oddsLabel(w.odds)} playoff odds` : 'bottom of the standings'}) and gets ${picksGive ? 'draft capital' : 'younger players'}.`);
        else if (w.w >= 0.7 && (picksGet || (ageGive && ageGet && ageGet < ageGive - 1))) out.push(`<b>Fit:</b> ${escapeHtml(them)} is contending and is paid in production, not futures.`);
        else if (w.w >= 0.7) out.push(`<b>Fit:</b> ${escapeHtml(them)} is contending (${w.odds != null ? `${oddsLabel(w.odds)} playoff odds` : 'top of the standings'}) and wants points now.`);
      } else if (fs.results.consensus && w.w < 0.25) {
        out.push(`<b>Fit:</b> ${escapeHtml(them)} is out of the race${w.odds != null ? ` (${oddsLabel(w.odds)} playoff odds)` : ''}, so what counts for them is a fair price.`);
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
      if (!isDynasty && fs.results.consensus) {
        const K = V.pointValue(league);
        const priced = (id) => state.ktcRedraft.players[id] && V.redraftValue(league, id) >= 1500 && V.overReplacement(league, id) >= 12;
        const edge = (id) => (priced(id) ? (V.overReplacement(league, id) * K) / V.redraftValue(league, id) - 1 : 0);
        const regular = new Set(item.me.starts.filter((st) => st.weeks >= 0.4 * league.weeks.length).map((st) => st.id));
        const buy = item.get.filter((id) => regular.has(id)).map((id) => [id, edge(id)]).sort((a, b) => b[1] - a[1])[0];
        const sell = item.give.filter((id) => !isPick(id)).map((id) => [id, edge(id)]).sort((a, b) => a[1] - b[1])[0];
        if (buy && buy[1] >= 0.15) out.push(`<b>Edge:</b> ${escapeHtml(players.info(buy[0]).name)} projects ${Math.round(Math.min(buy[1], 0.6) * 100)}%${buy[1] > 0.6 ? '+' : ''} more points than his price suggests.`);
        else if (sell && sell[1] <= -0.15) out.push(`<b>Edge:</b> you are selling ${escapeHtml(players.info(sell[0]).name)} above what he projects (${Math.round(Math.min(-sell[1], 0.6) * 100)}% less production than his price).`);
      }
      const rec = league.trade && league.trade.record.get(partner.roster_id);
      if (rec && rec.trades >= 2) {
        const seasons = league.trade.seasons;
        const base = `${them} has made ${rec.trades} trade${rec.trades === 1 ? '' : 's'} in ${seasons} season${seasons === 1 ? '' : 's'}`;
        if (isDynasty && rec.avgPct > 0.05) out.push(`<b>History:</b> ${escapeHtml(base)} and usually comes out ahead (${Math.round(rec.avgPct * 100)}% on average): expect them to push on price.`);
        else if (isDynasty && rec.avgPct < -0.05) out.push(`<b>History:</b> ${escapeHtml(base)} and has tended to give value away (${Math.round(-rec.avgPct * 100)}% on average).`);
        else out.push(`<b>History:</b> ${escapeHtml(base)}, usually close to even.`);
      } else if (league.trade && league.trade.appetite.get(partner.roster_id) <= 0.3) {
        out.push(`<b>History:</b> ${escapeHtml(them)} has rarely traded here, so a yes is harder to get.`);
      }
      if (item.drops.me.length) out.push(`<b>Roster:</b> you would cut ${escapeHtml(item.drops.me.map((id) => players.info(id).name).join(', '))}.`);
      if (item.drops.them.length) out.push(`<b>Roster:</b> ${escapeHtml(them)} would cut ${escapeHtml(item.drops.them.map((id) => players.info(id).name).join(', '))}.`);
      return out.slice(0, 6);
    }
    const avg = (xs) => (xs.length ? sum(xs) / xs.length : null);

    function offerText(league, item) {
      const them = item.them.starts[0];
      const pitch = them ? ` ${players.info(them.id).name} would start for you at ${slotText(them.slot)}.` : '';
      return `Trade idea (${league.name}): I send ${list(league, item.give)} for your ${list(league, item.get)}.${pitch} Let me know what you think!`;
    }

    function assetRow(league, id, ownerRo, isDynasty) {
      const v = isDynasty ? V.worth(V.blendedValue(league, id)) : `${Math.round(V.rosPoints(league, id))} pts`;
      const title = isDynasty ? `Value: KeepTradeCut (${V.worth(V.dynastyValue(league, id))}, for this league's format and scoring) mixed with projected points over a free agent` : `Projected points rest of season${fs.results.consensus ? `; consensus value ${V.worth(V.redraftValue(league, id))}` : ''}`;
      const who = isPick(id) ? deps.pickLabel(league, id, ownerRo) : deps.label(id);
      const age = !isPick(id) && ageOf(id) ? `<i class="mv-age">${Math.round(ageOf(id))}y</i>` : '';
      return `<li>${who}${age}<span class="mv-ros" title="${title}">${v}</span></li>`;
    }

    function kpiOdds(o, league, partner) {
      if (!o) return '';
      const key = o.after.bracket ? 'titleOdds' : league.playoffTeams ? 'playoffOdds' : null;
      if (!key) return '';
      const b = o.base.teams[league.mine.roster_id][key];
      const a = o.after.teams[league.mine.roster_id][key];
      const up = a - b > 0.002;
      const down = a - b < -0.002;
      const theirs = o.after.teams[partner.roster_id];
      return `<div class="kpi ${up ? 'up' : down ? 'down' : ''}" title="Your ${key === 'titleOdds' ? 'title' : 'playoff'} odds with the trade done; their ${key === 'titleOdds' ? 'title' : 'playoff'} odds: ${oddsLabel(o.base.teams[partner.roster_id][key])} → ${oddsLabel(theirs[key])}"><b>${oddsLabel(b)}<i>→</i>${oddsLabel(a)}</b><span>${key === 'titleOdds' ? 'title odds' : 'playoff odds'}</span></div>`;
    }

    function why(league, item, partner, win) {
      const [first, ...rest] = reasons(league, item, partner, win);
      if (!first) return '';
      return `<p class="mv-why1">${first}</p>${rest.length ? `<details class="mv-more"><summary>Why it works</summary><ul class="mv-why">${rest.map((r) => `<li>${r}</li>`).join('')}</ul></details>` : ''}`;
    }

    function card(league, item, index, win) {
      const isDynasty = fs.results.mode === 'dynasty';
      const partner = league.raw.rosters.find((roster) => roster.roster_id === item.partnerId);
      const them = nameOf(league, partner);
      const w = win.get(partner.roster_id);
      const label = item.likelihood >= 0.62 ? 'Likely' : item.likelihood >= 0.42 ? 'Fair shot' : 'Long shot';
      const tone = item.likelihood >= 0.62 ? 'high' : item.likelihood >= 0.42 ? 'mid' : 'low';
      const o = item.odds;
      const marketOf = isDynasty ? V.blendedValue : V.redraftValue;
      const price = packageOf(isDynasty);
      const rawGive = price(item.give.map((id) => marketOf(league, id)), item.give.map(isPick));
      const rawGet = price(item.get.map((id) => marketOf(league, id)), item.get.map(isPick));
      return `<article class="mv-card ${tone}">
        <div class="mv-card-h">
          <div><b>${escapeHtml(them)}</b> <span class="mv-win ${w.w >= 0.7 ? 'hot' : w.w < 0.3 ? 'cold' : ''}">${outlook(w.w)}${w.odds != null ? ` · ${oddsLabel(w.odds)}` : ''}</span></div>
          <span class="mv-likely ${tone}" title="How likely they are to say yes: they come out ahead in their own terms and the value is not lopsided against them">${label}</span>
        </div>
        <div class="mv-swap">
          <div><h5>You give</h5><ul>${item.give.map((id) => assetRow(league, id, league.mine, isDynasty)).join('')}</ul></div>
          <div class="mv-arrow" aria-hidden="true">⇄</div>
          <div><h5>You get</h5><ul>${item.get.map((id) => assetRow(league, id, partner, isDynasty)).join('')}</ul></div>
        </div>
        <div class="mv-kpis">
          <div class="kpi ${item.me.dPts >= 0 ? 'up' : 'down'}" title="Lineup points over replacement for the rest of the season; ${escapeHtml(them)}: ${signed(item.them.dPts)}"><b>${signed(item.me.dPts)}</b><span>pts for you</span></div>
          ${kpiOdds(o, league, partner)}
          ${isDynasty || fs.results.consensus ? `<div class="kpi" title="Blended value, packages adjusted: you give ${V.worth(rawGive)}, you get ${V.worth(rawGet)}"><b>${V.worth(rawGive)}<i>⇄</i>${V.worth(rawGet)}</b><span>value</span></div>` : ''}
        </div>
        ${why(league, item, partner, win)}
        <div class="mv-actions">
          <button type="button" class="mv-btn ghost" data-finder="copy" data-i="${index}">Copy offer</button>
          <button type="button" class="mv-btn" data-finder="open" data-i="${index}">Open in analyzer</button>
        </div>
      </article>`;
    }

    function controls(league) {
      const isDynasty = dynasty(league);
      const mineIds = (league.mine.players || []).filter((id) => (isDynasty ? V.dynastyValue(league, id) > 0 : V.rosPoints(league, id) > 0))
        .concat(isDynasty ? (league.picks.get(league.mine.roster_id) || []).filter((id) => V.dynastyValue(league, id) > 0) : []);
      const rank = (id) => (isDynasty ? V.dynastyValue(league, id) : V.rosPoints(league, id));
      mineIds.sort((a, b) => rank(b) - rank(a));
      const others = league.raw.rosters.filter((roster) => roster.roster_id !== league.mine.roster_id).sort((a, b) => nameOf(league, a).localeCompare(nameOf(league, b)));
      const option = (id, selected) => `<option value="${escapeHtml(id)}"${selected ? ' selected' : ''}>${escapeHtml(nameOfAsset(league, id))}${isPick(id) ? '' : ` (${escapeHtml(players.info(id).pos)})`}</option>`;
      const targets = others.map((roster) => {
        const ids = (roster.players || []).filter((id) => rank(id) > 0).sort((a, b) => rank(b) - rank(a)).slice(0, 12);
        return ids.length ? `<optgroup label="${escapeHtml(nameOf(league, roster))}">${ids.map((id) => option(id, id === fs.target)).join('')}</optgroup>` : '';
      }).join('');
      return `<div class="mv-selects mv-finder-controls">
        <select id="mv-league" aria-label="League">${state.leagues.map((l) => `<option value="${escapeHtml(l.leagueId)}"${l.leagueId === league.leagueId ? ' selected' : ''}>${escapeHtml(l.name)}</option>`).join('')}</select>
        <select id="mv-shop" aria-label="Shop a player"><option value="">Shop one of yours…</option>${mineIds.map((id) => option(id, id === fs.shop)).join('')}</select>
        <select id="mv-target" aria-label="Target a player"><option value="">Go after a player…</option>${targets}</select>
      </div>
      ${isDynasty ? `<div class="tabs mv-goals" role="group" aria-label="Goal">${GOALS.map((g) => `<button type="button" class="tab${fs.goal === g.id ? ' on' : ''}" data-goal="${g.id}" title="${escapeHtml(g.title)}">${g.label}</button>`).join('')}</div>` : ''}`;
    }

    function pane() {
      const league = currentLeague();
      if (!league) return '<p class="empty muted">No league with a regular season left to play.</p>';
      const isDynasty = dynasty(league);
      const noValues = league.kind !== 'redraft' && !V.usesKtc(league)
        ? '<p class="mv-warn small">KeepTradeCut isn\'t loading, so deals are priced on this season\'s points only.</p>' : '';
      const deadline = league.tradeDeadline && state.nfl && state.nfl.week > league.tradeDeadline
        ? `<p class="mv-warn small">This league's trade deadline (week ${league.tradeDeadline}) has passed.</p>` : '';
      const kind = isDynasty ? 'Dynasty: priced on KeepTradeCut and each team\'s window.' : V.consensus(league) ? 'Redraft: lineup points for the rest of the season (playoffs weighted), with KeepTradeCut\'s redraft values as the price.' : 'Redraft: priced on lineup points for the rest of the season.';
      let body;
      if (fs.running && !fs.results) body = `<div class="skel" role="status"><i></i><i></i></div><p class="muted small mv-note">${escapeHtml(fs.progress || '')}</p>`;
      else if (fs.error) body = `<p class="error">${escapeHtml(fs.error)}</p>`;
      else if (!fs.results) body = '<p class="muted small mv-note">Searching…</p>';
      else if (!fs.results.items.length) {
        body = `<p class="empty muted">No deal where both sides come out ahead.${fs.shop || fs.target ? ' Try another player.' : ' Shop a player or go after one.'}</p>`;
      } else {
        body = fs.results.items.map((item, i) => card(league, item, i, fs.results.windows)).join('');
      }
      return `<div class="mv-finder" title="${escapeHtml(kind)}">${controls(league)}${noValues}${deadline}${body}</div>`;
    }

    function change(e) {
      const element = e.target;
      if (element.id === 'mv-league') { fs.leagueId = element.value; fs.shop = null; fs.target = null; }
      else if (element.id === 'mv-shop') fs.shop = element.value || null;
      else if (element.id === 'mv-target') fs.target = element.value || null;
      else return false;
      run();
      return true;
    }

    function click(e) {
      const goal = e.target.closest('[data-goal]');
      if (goal) { fs.goal = goal.dataset.goal; run(); return true; }
      const button = e.target.closest('[data-finder]');
      if (!button || !fs.results) return false;
      const item = fs.results.items[Number(button.dataset.i)];
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

    return { pane, change, click, run };
  }

  NightOwl.movesFinder = { create };
})(globalThis.NightOwl);
