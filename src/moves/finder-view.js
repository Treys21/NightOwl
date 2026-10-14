globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, model, finder, ktc, value } = NightOwl;
  const { escape: esc, percent } = NightOwl.format;
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
    const { state, V, nameOf, league, render, openTrade, active, ensureHistory } = deps;
    const fs = state.finder;

    function windows(lg, base) {
      const n = lg.raw.rosters.length;
      const out = new Map();
      for (const ro of lg.raw.rosters) {
        const t = base && base.teams[ro.roster_id];
        const rank = lg.ranks.get(ro.roster_id) || 1;
        const w = t && lg.playoffTeams ? finder.contention(t.playoffOdds) : n > 1 ? (rank - 1) / (n - 1) : 0.5;
        out.set(ro.roster_id, { w, odds: t && lg.playoffTeams ? t.playoffOdds : null });
      }
      return out;
    }
    const outlook = (w) => (w >= 0.7 ? 'Contending' : w < 0.3 ? 'Rebuilding' : 'In the hunt');

    async function ensureBase(lg) {
      let base = state.base.get(lg.leagueId);
      if (!base) {
        base = await model.projectLeague(lg, { remainingOf: state.remainingOf, stats: state.stats, draftMethod: state.draftMethod });
        state.base.set(lg.leagueId, base);
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

    const dynasty = (lg) => lg.kind !== 'redraft' && V.usesKtc(lg);

    const packageOf = (dyn) => (values, picks) => ktc.packageValue(values.map((v, i) => ({ v, pick: !!(picks && picks[i]) })), dyn
      ? { exponent: ktc.EXPONENT_PACKAGE, replacement: ktc.REPLACEMENT_DYNASTY }
      : { exponent: ktc.EXPONENT_REDRAFT, replacement: ktc.REPLACEMENT_REDRAFT });

    function context(lg) {
      const dyn = dynasty(lg);
      const cons = V.consensus(lg);
      return {
        mode: dyn ? 'dynasty' : 'redraft',
        consensus: cons,
        slots: lg.raw.slots,
        weeks: lg.rep.weeks,
        positionsOf: lg.rep.positionsOf,
        isVirtual: lg.rep.isVirtual,
        isPick,
        canCut: dyn ? () => true : (id) => V.rosPoints(lg, id) <= 25,
        rawOf: dyn ? (id) => V.blendedValue(lg, id) : cons ? (id) => V.redraftValue(lg, id) : (id) => V.overReplacement(lg, id),
        valueOf: dyn ? (team, id, w) => V.valueFor(lg, id, w) : (team, id) => V.redraftValue(lg, id),
        sideValue: dyn || cons ? packageOf(dyn) : sum,
        pointValue: dyn || cons ? V.pointValue(lg) : 1,
        fairTolerance: dyn && lg.trade ? lg.trade.band.tolerance : null,
        params: { minPoints: { me: finder.DEFAULTS.minPoints.me * lg.scale, them: finder.DEFAULTS.minPoints.them * lg.scale } },
        goal: fs.goal,
        focus: { shop: fs.shop, target: fs.target }
      };
    }

    function teamOf(lg, ro, w, dyn) {
      const pool = model.activePool(ro);
      const priced = (id) => (dyn ? V.blendedValue(lg, id) > 0 : V.rosPoints(lg, id) > 0);
      const assets = (dyn ? (ro.players || []) : pool).filter(priced).concat(dyn ? (lg.picks.get(ro.roster_id) || []).filter(priced) : []);
      const appetite = lg.trade ? lg.trade.appetite.get(ro.roster_id) : null;
      return { id: ro.roster_id, pool: lg.rep.pool(pool), assets, players: ro.players || [], count: (ro.players || []).length, capacity: lg.capacity, w, appetite };
    }

    async function run() {
      const token = ++fs.token;
      const lg = league();
      fs.results = null;
      fs.error = null;
      if (!lg) { fs.running = false; render(); return; }
      if (!lg.weeks.length) { fs.results = { items: [], windows: new Map(), mode: 'redraft', leagueId: lg.leagueId }; fs.running = false; render(); return; }
      fs.running = true;
      fs.progress = 'Reading the league…';
      render();
      try {
        if (!lg.history) {
          fs.progress = 'Reading the league\'s trades…';
          render();
          await Promise.race([ensureHistory(lg), new Promise((resolve) => setTimeout(resolve, HISTORY_WAIT_MS))]);
          if (token !== fs.token || !active()) return;
        }
        const base = await ensureBase(lg).catch((err) => { console.warn('[Night Owl finder] no projection, using standings', err); return null; });
        if (token !== fs.token || !active()) return;
        const win = windows(lg, base);
        const dyn = dynasty(lg);
        const ctx = context(lg);
        const myRo = lg.mine;
        const me = teamOf(lg, myRo, win.get(myRo.roster_id).w, dyn);
        const mine = finder.dropLosses(me, ctx);
        const found = [];
        const others = lg.raw.rosters.filter((ro) => ro.roster_id !== myRo.roster_id);
        for (let i = 0; i < others.length; i++) {
          fs.progress = `Checking ${nameOf(lg, others[i])} (${i + 1} of ${others.length})…`;
          render();
          await tick();
          if (token !== fs.token || !active()) return;
          const other = teamOf(lg, others[i], win.get(others[i].roster_id).w, dyn);
          found.push(...finder.proposeFor(ctx, me, other, mine));
        }
        found.sort((a, b) => b.score - a.score);
        const shortlist = varied(found, CANDIDATES, (p) => !hasPick(p));
        const items = await rankByOdds(lg, shortlist, ctx.mode, token);
        if (!items || token !== fs.token) return;
        fs.results = { items: varied(items, SHOWN, (p) => !hasPick(p), false), windows: win, mode: ctx.mode, consensus: !!ctx.consensus, leagueId: lg.leagueId };
        fs.running = false;
        render();
      } catch (err) {
        console.error('[Night Owl finder]', err);
        fs.error = NightOwl.format.errorText(err);
        fs.running = false;
        render();
      }
    }

    async function rankByOdds(lg, items, mode, token) {
      const base = state.base.get(lg.leagueId);
      if (!lg.playoffTeams || !base) return items;
      const mineId = lg.mine.roster_id;
      const kept = [];
      for (let i = 0; i < items.length; i++) {
        fs.progress = `Replaying the season with each deal (${i + 1} of ${items.length})…`;
        render();
        await tick();
        if (token !== fs.token || !active()) return null;
        const item = items[i];
        try {
          const rosters = value.applyTrade(lg.raw.rosters, mineId, item.partnerId, item.give.filter((id) => !isPick(id)), item.get.filter((id) => !isPick(id)));
          const after = await model.projectLeague(lg, { remainingOf: state.remainingOf, stats: state.stats, rosters });
          item.odds = { base, after };
          const dP = after.teams[mineId].playoffOdds - base.teams[mineId].playoffOdds;
          const dT = after.teams[mineId].titleOdds - base.teams[mineId].titleOdds;
          const care = mode === 'redraft' ? 1 : item.me.wMe;
          if ((mode === 'redraft' || item.me.wMe >= 0.6) && (dP < -0.01 || dT < -0.005)) continue;
          item.score *= Math.max(0.4, Math.min(3, 1 + care * (14 * dT + 5 * dP)));
        } catch (err) {
          console.warn('[Night Owl finder] odds unavailable', err);
        }
        kept.push(item);
      }
      return kept.sort((a, b) => b.score - a.score);
    }

    const nameOfAsset = (lg, id) => {
      if (!isPick(id)) return players.info(id).name;
      const pick = pickOf(id);
      const slot = pick.year === Number(lg.raw.season) + 1 ? V.pickSlot(lg, pick.from) : null;
      return slot ? `${pick.year} ${pick.round}.${String(slot).padStart(2, '0')}` : `${pick.year} ${V.pickTierOf(lg, pick)} ${V.ordinalRound(pick.round)}`;
    };
    const list = (lg, ids) => ids.map((id) => nameOfAsset(lg, id)).join(' + ');
    const ageOf = (id) => { const e = state.ktc && state.ktc.players[id]; return e && e.a; };
    const slotText = (s) => NightOwl.leagues.slotLabel(s);
    const oddsLabel = (p) => (p >= 0.995 ? '>99%' : p > 0 && p < 0.005 ? '<1%' : percent(p));
    const signed = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n).toFixed(1)}`;

    function reasons(lg, item, partner, win) {
      const dyn = fs.results.mode === 'dynasty';
      const w = win.get(partner.roster_id);
      const them = nameOf(lg, partner);
      const out = [];
      const n = lg.weeks.length;
      const starts = (side) => side.starts.slice(0, 2).map((s) => `${players.info(s.id).name} at ${slotText(s.slot)} (${s.weeks} of ${n} wks${s.weeks <= 0.3 * n ? ', cover' : ''})`).join(', ');
      if (item.me.starts.length) out.push(`<b>You:</b> ${esc(starts(item.me))}.`);
      else if (item.me.dPts > 0.5) out.push(`<b>You:</b> ${signed(item.me.dPts)} pts of depth and injury cover.`);
      else if (dyn) out.push(`<b>You:</b> little change this season (${signed(item.me.dPts)} pts), more long-term value.`);
      if (item.them.starts.length) out.push(`<b>${esc(them)}:</b> ${esc(starts(item.them))} (${signed(item.them.dPts)} pts).`);
      else if (item.them.dPts > 0.5) out.push(`<b>${esc(them)}:</b> ${signed(item.them.dPts)} pts of depth.`);
      const market = dyn || fs.results.consensus;
      if (dyn) {
        const ageGive = avg(item.give.filter((id) => !isPick(id)).map(ageOf).filter(Boolean));
        const ageGet = avg(item.get.filter((id) => !isPick(id)).map(ageOf).filter(Boolean));
        const picksGive = item.give.filter(isPick).length;
        const picksGet = item.get.filter(isPick).length;
        if (w.w < 0.3 && (picksGive || (ageGive && ageGet && ageGive < ageGet - 1))) out.push(`<b>Fit:</b> ${esc(them)} is rebuilding (${w.odds != null ? `${oddsLabel(w.odds)} playoff odds` : 'bottom of the standings'}) and gets ${picksGive ? 'draft capital' : 'younger players'}.`);
        else if (w.w >= 0.7 && (picksGet || (ageGive && ageGet && ageGet < ageGive - 1))) out.push(`<b>Fit:</b> ${esc(them)} is contending and is paid in production, not futures.`);
        else if (w.w >= 0.7) out.push(`<b>Fit:</b> ${esc(them)} is contending (${w.odds != null ? `${oddsLabel(w.odds)} playoff odds` : 'top of the standings'}) and wants points now.`);
      } else if (fs.results.consensus && w.w < 0.25) {
        out.push(`<b>Fit:</b> ${esc(them)} is out of the race${w.odds != null ? ` (${oddsLabel(w.odds)} playoff odds)` : ''}, so what counts for them is a fair price.`);
      } else if (!market) {
        out.push('<b>Pitch:</b> both lineups improve, so neither side is giving ground.');
      }
      if (market) {
        const gap = item.rawNetThem;
        const name = dyn ? 'blended value' : 'consensus value';
        if (Math.abs(gap) < 0.04) out.push(`<b>Value:</b> within 4% on ${name}, an easy sell.`);
        else if (gap > 0) out.push(`<b>Value:</b> they win by ${Math.round(gap * 100)}% on ${name}, so it reads as a good deal for them.`);
        else out.push(`<b>Value:</b> they give up ${Math.round(-gap * 100)}% on ${name}${dyn ? ' and get the fit in return' : ' but gain real points'}.`);
      }
      if (!dyn && fs.results.consensus) {
        const K = V.pointValue(lg);
        const priced = (id) => state.ktcRedraft.players[id] && V.redraftValue(lg, id) >= 1500 && V.overReplacement(lg, id) >= 12;
        const edge = (id) => (priced(id) ? (V.overReplacement(lg, id) * K) / V.redraftValue(lg, id) - 1 : 0);
        const regular = new Set(item.me.starts.filter((st) => st.weeks >= 0.4 * lg.weeks.length).map((st) => st.id));
        const buy = item.get.filter((id) => regular.has(id)).map((id) => [id, edge(id)]).sort((a, b) => b[1] - a[1])[0];
        const sell = item.give.filter((id) => !isPick(id)).map((id) => [id, edge(id)]).sort((a, b) => a[1] - b[1])[0];
        if (buy && buy[1] >= 0.15) out.push(`<b>Edge:</b> ${esc(players.info(buy[0]).name)} projects ${Math.round(Math.min(buy[1], 0.6) * 100)}%${buy[1] > 0.6 ? '+' : ''} more points than his price suggests.`);
        else if (sell && sell[1] <= -0.15) out.push(`<b>Edge:</b> you are selling ${esc(players.info(sell[0]).name)} above what he projects (${Math.round(Math.min(-sell[1], 0.6) * 100)}% less production than his price).`);
      }
      const rec = lg.trade && lg.trade.record.get(partner.roster_id);
      if (rec && rec.trades >= 2) {
        const seasons = lg.trade.seasons;
        const base = `${them} has made ${rec.trades} trade${rec.trades === 1 ? '' : 's'} in ${seasons} season${seasons === 1 ? '' : 's'}`;
        if (dyn && rec.avgPct > 0.05) out.push(`<b>History:</b> ${esc(base)} and usually comes out ahead (${Math.round(rec.avgPct * 100)}% on average): expect them to push on price.`);
        else if (dyn && rec.avgPct < -0.05) out.push(`<b>History:</b> ${esc(base)} and has tended to give value away (${Math.round(-rec.avgPct * 100)}% on average).`);
        else out.push(`<b>History:</b> ${esc(base)}, usually close to even.`);
      } else if (lg.trade && lg.trade.appetite.get(partner.roster_id) <= 0.3) {
        out.push(`<b>History:</b> ${esc(them)} has rarely traded here, so a yes is harder to get.`);
      }
      if (item.drops.me.length) out.push(`<b>Roster:</b> you would cut ${esc(item.drops.me.map((id) => players.info(id).name).join(', '))}.`);
      if (item.drops.them.length) out.push(`<b>Roster:</b> ${esc(them)} would cut ${esc(item.drops.them.map((id) => players.info(id).name).join(', '))}.`);
      return out.slice(0, 6);
    }
    const avg = (xs) => (xs.length ? sum(xs) / xs.length : null);

    function offerText(lg, item) {
      const them = item.them.starts[0];
      const pitch = them ? ` ${players.info(them.id).name} would start for you at ${slotText(them.slot)}.` : '';
      return `Trade idea (${lg.name}): I send ${list(lg, item.give)} for your ${list(lg, item.get)}.${pitch} Let me know what you think!`;
    }

    function assetRow(lg, id, ownerRo, dyn) {
      const v = dyn ? V.worth(V.blendedValue(lg, id)) : `${Math.round(V.rosPoints(lg, id))} pts`;
      const title = dyn ? `Value: KeepTradeCut (${V.worth(V.dynastyValue(lg, id))}, for this league's format and scoring) mixed with projected points over a free agent` : `Projected points rest of season${fs.results.consensus ? `; consensus value ${V.worth(V.redraftValue(lg, id))}` : ''}`;
      const who = isPick(id) ? deps.pickLabel(lg, id, ownerRo) : deps.label(id);
      const age = !isPick(id) && ageOf(id) ? `<i class="mv-age">${Math.round(ageOf(id))}y</i>` : '';
      return `<li>${who}${age}<span class="mv-ros" title="${title}">${v}</span></li>`;
    }

    function kpiOdds(o, lg, partner) {
      if (!o) return '';
      const key = o.after.bracket ? 'titleOdds' : lg.playoffTeams ? 'playoffOdds' : null;
      if (!key) return '';
      const b = o.base.teams[lg.mine.roster_id][key];
      const a = o.after.teams[lg.mine.roster_id][key];
      const up = a - b > 0.002;
      const down = a - b < -0.002;
      const theirs = o.after.teams[partner.roster_id];
      return `<div class="kpi ${up ? 'up' : down ? 'down' : ''}" title="Your ${key === 'titleOdds' ? 'title' : 'playoff'} odds with the trade done; their ${key === 'titleOdds' ? 'title' : 'playoff'} odds: ${oddsLabel(o.base.teams[partner.roster_id][key])} → ${oddsLabel(theirs[key])}"><b>${oddsLabel(b)}<i>→</i>${oddsLabel(a)}</b><span>${key === 'titleOdds' ? 'title odds' : 'playoff odds'}</span></div>`;
    }

    function why(lg, item, partner, win) {
      const [first, ...rest] = reasons(lg, item, partner, win);
      if (!first) return '';
      return `<p class="mv-why1">${first}</p>${rest.length ? `<details class="mv-more"><summary>Why it works</summary><ul class="mv-why">${rest.map((r) => `<li>${r}</li>`).join('')}</ul></details>` : ''}`;
    }

    function card(lg, item, index, win) {
      const dyn = fs.results.mode === 'dynasty';
      const partner = lg.raw.rosters.find((ro) => ro.roster_id === item.partnerId);
      const them = nameOf(lg, partner);
      const w = win.get(partner.roster_id);
      const label = item.likelihood >= 0.62 ? 'Likely' : item.likelihood >= 0.42 ? 'Fair shot' : 'Long shot';
      const tone = item.likelihood >= 0.62 ? 'high' : item.likelihood >= 0.42 ? 'mid' : 'low';
      const o = item.odds;
      const marketOf = dyn ? V.blendedValue : V.redraftValue;
      const price = packageOf(dyn);
      const rawGive = price(item.give.map((id) => marketOf(lg, id)), item.give.map(isPick));
      const rawGet = price(item.get.map((id) => marketOf(lg, id)), item.get.map(isPick));
      return `<article class="mv-card ${tone}">
        <div class="mv-card-h">
          <div><b>${esc(them)}</b> <span class="mv-win ${w.w >= 0.7 ? 'hot' : w.w < 0.3 ? 'cold' : ''}">${outlook(w.w)}${w.odds != null ? ` · ${oddsLabel(w.odds)}` : ''}</span></div>
          <span class="mv-likely ${tone}" title="How likely they are to say yes: they come out ahead in their own terms and the value is not lopsided against them">${label}</span>
        </div>
        <div class="mv-swap">
          <div><h5>You give</h5><ul>${item.give.map((id) => assetRow(lg, id, lg.mine, dyn)).join('')}</ul></div>
          <div class="mv-arrow" aria-hidden="true">⇄</div>
          <div><h5>You get</h5><ul>${item.get.map((id) => assetRow(lg, id, partner, dyn)).join('')}</ul></div>
        </div>
        <div class="mv-kpis">
          <div class="kpi ${item.me.dPts >= 0 ? 'up' : 'down'}" title="Lineup points over replacement for the rest of the season; ${esc(them)}: ${signed(item.them.dPts)}"><b>${signed(item.me.dPts)}</b><span>pts for you</span></div>
          ${kpiOdds(o, lg, partner)}
          ${dyn || fs.results.consensus ? `<div class="kpi" title="Blended value, packages adjusted: you give ${V.worth(rawGive)}, you get ${V.worth(rawGet)}"><b>${V.worth(rawGive)}<i>⇄</i>${V.worth(rawGet)}</b><span>value</span></div>` : ''}
        </div>
        ${why(lg, item, partner, win)}
        <div class="mv-actions">
          <button type="button" class="mv-btn ghost" data-finder="copy" data-i="${index}">Copy offer</button>
          <button type="button" class="mv-btn" data-finder="open" data-i="${index}">Open in analyzer</button>
        </div>
      </article>`;
    }

    function controls(lg) {
      const dyn = dynasty(lg);
      const mineIds = (lg.mine.players || []).filter((id) => (dyn ? V.dynastyValue(lg, id) > 0 : V.rosPoints(lg, id) > 0))
        .concat(dyn ? (lg.picks.get(lg.mine.roster_id) || []).filter((id) => V.dynastyValue(lg, id) > 0) : []);
      const rank = (id) => (dyn ? V.dynastyValue(lg, id) : V.rosPoints(lg, id));
      mineIds.sort((a, b) => rank(b) - rank(a));
      const others = lg.raw.rosters.filter((ro) => ro.roster_id !== lg.mine.roster_id).sort((a, b) => nameOf(lg, a).localeCompare(nameOf(lg, b)));
      const option = (id, selected) => `<option value="${esc(id)}"${selected ? ' selected' : ''}>${esc(nameOfAsset(lg, id))}${isPick(id) ? '' : ` (${esc(players.info(id).pos)})`}</option>`;
      const targets = others.map((ro) => {
        const ids = (ro.players || []).filter((id) => rank(id) > 0).sort((a, b) => rank(b) - rank(a)).slice(0, 12);
        return ids.length ? `<optgroup label="${esc(nameOf(lg, ro))}">${ids.map((id) => option(id, id === fs.target)).join('')}</optgroup>` : '';
      }).join('');
      return `<div class="mv-selects mv-finder-controls">
        <select id="mv-league" aria-label="League">${state.leagues.map((l) => `<option value="${esc(l.leagueId)}"${l.leagueId === lg.leagueId ? ' selected' : ''}>${esc(l.name)}</option>`).join('')}</select>
        <select id="mv-shop" aria-label="Shop a player"><option value="">Shop one of yours…</option>${mineIds.map((id) => option(id, id === fs.shop)).join('')}</select>
        <select id="mv-target" aria-label="Target a player"><option value="">Go after a player…</option>${targets}</select>
      </div>
      ${dyn ? `<div class="tabs mv-goals" role="group" aria-label="Goal">${GOALS.map((g) => `<button type="button" class="tab${fs.goal === g.id ? ' on' : ''}" data-goal="${g.id}" title="${esc(g.title)}">${g.label}</button>`).join('')}</div>` : ''}`;
    }

    function pane() {
      const lg = league();
      if (!lg) return '<p class="empty muted">No league with a regular season left to play.</p>';
      const dyn = dynasty(lg);
      const noValues = lg.kind !== 'redraft' && !V.usesKtc(lg)
        ? '<p class="mv-warn small">KeepTradeCut isn\'t loading, so deals are priced on this season\'s points only.</p>' : '';
      const deadline = lg.tradeDeadline && state.nfl && state.nfl.week > lg.tradeDeadline
        ? `<p class="mv-warn small">This league's trade deadline (week ${lg.tradeDeadline}) has passed.</p>` : '';
      const kind = dyn ? 'Dynasty: priced on KeepTradeCut and each team\'s window.' : V.consensus(lg) ? 'Redraft: lineup points for the rest of the season (playoffs weighted), with KeepTradeCut\'s redraft values as the price.' : 'Redraft: priced on lineup points for the rest of the season.';
      let body;
      if (fs.running && !fs.results) body = `<div class="skel" role="status"><i></i><i></i></div><p class="muted small mv-note">${esc(fs.progress || '')}</p>`;
      else if (fs.error) body = `<p class="error">${esc(fs.error)}</p>`;
      else if (!fs.results) body = '<p class="muted small mv-note">Searching…</p>';
      else if (!fs.results.items.length) {
        body = `<p class="empty muted">No deal where both sides come out ahead.${fs.shop || fs.target ? ' Try another player.' : ' Shop a player or go after one.'}</p>`;
      } else {
        body = fs.results.items.map((item, i) => card(lg, item, i, fs.results.windows)).join('');
      }
      return `<div class="mv-finder" title="${esc(kind)}">${controls(lg)}${noValues}${deadline}${body}</div>`;
    }

    function change(e) {
      const el = e.target;
      if (el.id === 'mv-league') { fs.leagueId = el.value; fs.shop = null; fs.target = null; }
      else if (el.id === 'mv-shop') fs.shop = el.value || null;
      else if (el.id === 'mv-target') fs.target = el.value || null;
      else return false;
      run();
      return true;
    }

    function click(e) {
      const goal = e.target.closest('[data-goal]');
      if (goal) { fs.goal = goal.dataset.goal; run(); return true; }
      const btn = e.target.closest('[data-finder]');
      if (!btn || !fs.results) return false;
      const item = fs.results.items[Number(btn.dataset.i)];
      if (!item) return true;
      if (btn.dataset.finder === 'open') openTrade(item);
      else copy(btn, item);
      return true;
    }

    function copy(btn, item) {
      const lg = league();
      const text = offerText(lg, item);
      const done = () => { btn.textContent = 'Copied'; setTimeout(() => { btn.textContent = 'Copy offer'; }, 1600); };
      (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject(new Error('no clipboard'))).then(done, () => {
        btn.textContent = 'Copy failed';
        setTimeout(() => { btn.textContent = 'Copy offer'; }, 1600);
      });
    }

    return { pane, change, click, run };
  }

  NightOwl.movesFinder = { create };
})(globalThis.NightOwl);
