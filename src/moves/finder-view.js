// The trade finder pane of the Moves tool: runs season/finder.js over every
// team in a league and lays out the deals worth sending, with why each side
// would say yes. Redraft and dynasty are judged differently (see finder.js).
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, model, finder, ktc, value } = NightOwl;
  const { escape: esc, percent } = NightOwl.format;
  const { isPick, pickOf } = NightOwl.moveValues;

  const SHOWN = 8; // deals listed
  const CANDIDATES = 12; // deals whose playoff and title odds are worked out before the final order
  const PER_PARTNER = 2; // of them, per partner
  const PER_ASSET = 2; // and in how many one asset may appear
  const GOALS = [
    { id: 'balanced', label: 'Balanced', title: 'Weigh this season and the future as your team\'s outlook says' },
    { id: 'now', label: 'Win now', title: 'Pay in picks and youth for production this season' },
    { id: 'future', label: 'Rebuild', title: 'Sell production for picks and youth' }
  ];
  const tick = () => new Promise((resolve) => setTimeout(resolve));
  const sum = (xs) => xs.reduce((a, b) => a + b, 0);

  /**
   * deps: { state, V (valuer), label(pid), pickLabel(lg, pid, owner), nameOf(lg, ro), league(),
   *         render(), openTrade(item), positionsOf }
   */
  function create(deps) {
    const { state, V, nameOf, league, render, openTrade, positionsOf } = deps;
    const fs = state.finder;

    // ---- windows ---------------------------------------------------------

    /** roster id -> { w: 0..1, odds } from the replayed season (or, without playoffs, the standings). */
    function windows(lg, base) {
      const n = lg.raw.rosters.length;
      const out = new Map();
      for (const ro of lg.raw.rosters) {
        const t = base && base.teams[ro.roster_id];
        const rank = lg.ranks.get(ro.roster_id) || 1; // 1 = worst
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

    // ---- the search ------------------------------------------------------

    const dynasty = (lg) => lg.kind !== 'redraft' && V.usesKtc(lg);

    function context(lg) {
      const dyn = dynasty(lg);
      const cons = V.consensus(lg); // redraft with KeepTradeCut's fantasy values loaded
      return {
        mode: dyn ? 'dynasty' : 'redraft',
        consensus: cons,
        slots: lg.raw.slots,
        weeks: lg.weeks,
        positionsOf,
        isPick,
        // Who a full roster may cut to make room: anyone outside the lineup in dynasty (the cut is charged at his value), only throwaways in redraft.
        canCut: dyn ? () => true : (id) => V.rosPoints(lg, id) <= 25,
        rawOf: dyn ? (id) => V.dynastyValue(lg, id) : cons ? (id) => V.redraftValue(lg, id) : (id) => V.rosPoints(lg, id),
        valueOf: dyn ? (team, id, w) => V.valueFor(lg, id, w) : (team, id) => V.redraftValue(lg, id),
        sideValue: dyn ? ktc.sideValue : cons ? (values) => ktc.sideValue(values, ktc.EXPONENT_REDRAFT) : sum,
        pointValue: dyn || cons ? V.pointValue(lg) : 1,
        stats: (fs.stats = {}),
        goal: fs.goal,
        focus: { shop: fs.shop, target: fs.target }
      };
    }

    // Everything on a roster that could change hands (priced players and picks).
    function teamOf(lg, ro, w, dyn) {
      const pool = model.activePool(ro);
      const priced = (id) => (dyn ? V.dynastyValue(lg, id) > 0 : V.rosPoints(lg, id) > 0);
      const assets = (dyn ? (ro.players || []) : pool).filter(priced).concat(dyn ? (lg.picks.get(ro.roster_id) || []).filter(priced) : []);
      return { id: ro.roster_id, pool, assets, players: ro.players || [], count: (ro.players || []).length, capacity: lg.capacity, w };
    }

    async function run() {
      const token = ++fs.token;
      const lg = league();
      fs.results = null;
      fs.error = null;
      if (!lg) { fs.running = false; render(); return; }
      if (!lg.weeks.length) { fs.results = { items: [], windows: new Map(), mode: 'redraft', leagueId: lg.leagueId }; fs.running = false; render(); return; } // no regular-season week left to project
      fs.running = true;
      fs.progress = 'Reading the league…';
      render();
      try {
        const base = await ensureBase(lg).catch((err) => { console.warn('[Night Owl finder] no projection, using standings', err); return null; });
        if (token !== fs.token) return;
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
          if (token !== fs.token) return;
          const other = teamOf(lg, others[i], win.get(others[i].roster_id).w, dyn);
          found.push(...finder.proposeFor(ctx, me, other, mine));
        }
        found.sort((a, b) => b.score - a.score);
        // A varied shortlist: a couple of deals per partner, no asset in more than a couple.
        const shortlist = [];
        const perPartner = new Map();
        const used = new Map();
        for (const p of found) {
          const ids = p.give.concat(p.get);
          if ((perPartner.get(p.partnerId) || 0) >= PER_PARTNER || ids.some((id) => (used.get(id) || 0) >= PER_ASSET)) continue;
          perPartner.set(p.partnerId, (perPartner.get(p.partnerId) || 0) + 1);
          for (const id of ids) used.set(id, (used.get(id) || 0) + 1);
          shortlist.push(p);
          if (shortlist.length === CANDIDATES) break;
        }
        const items = await rankByOdds(lg, shortlist, ctx.mode, token);
        if (!items || token !== fs.token) return;
        fs.results = { items: items.slice(0, SHOWN), windows: win, mode: ctx.mode, consensus: !!ctx.consensus, leagueId: lg.leagueId };
        fs.running = false;
        render();
      } catch (err) {
        console.error('[Night Owl finder]', err);
        fs.error = err.message || String(err);
        fs.running = false;
        render();
      }
    }

    // What each deal does to your playoff and title odds, with the season
    // replayed with the trade done. Odds reorder the shortlist: a deal is worth
    // what it does for you, and a contender (or any redraft team) never gets one
    // that lowers its odds, which is what happens when it feeds a rival.
    async function rankByOdds(lg, items, mode, token) {
      const base = state.base.get(lg.leagueId);
      if (!lg.playoffTeams || !base) return items;
      const mineId = lg.mine.roster_id;
      const kept = [];
      for (let i = 0; i < items.length; i++) {
        fs.progress = `Replaying the season with each deal (${i + 1} of ${items.length})…`;
        render();
        await tick();
        if (token !== fs.token) return null;
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

    // ---- words ------------------------------------------------------------

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

    // The reasons each side says yes, in plain words.
    function reasons(lg, item, partner, win) {
      const dyn = fs.results.mode === 'dynasty';
      const w = win.get(partner.roster_id);
      const them = nameOf(lg, partner);
      const out = [];
      const n = lg.weeks.length;
      const starts = (side) => side.starts.slice(0, 2).map((s) => `${players.info(s.id).name} at ${slotText(s.slot)} (${s.weeks} of ${n} weeks)`).join(', ');
      if (item.me.starts.length) out.push(`<b>You:</b> ${esc(starts(item.me))} (${signed(item.me.dPts)} pts rest of season).`);
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
        const name = dyn ? 'KeepTradeCut' : 'consensus value';
        if (Math.abs(gap) < 0.04) out.push(`<b>Value:</b> within 4% on ${name}, an easy sell.`);
        else if (gap > 0) out.push(`<b>Value:</b> they win by ${Math.round(gap * 100)}% on ${name}, so it reads as a good deal for them.`);
        else out.push(`<b>Value:</b> they give up ${Math.round(-gap * 100)}% on ${name}${dyn ? ' and get the fit in return' : ' but gain real points'}.`);
      }
      if (!dyn && fs.results.consensus) {
        // Where the market and the projections disagree: what to buy low and sell high.
        const K = V.pointValue(lg);
        // Only players the market actually prices, and who matter: a throw-in's "edge" is noise.
        const priced = (id) => state.ktcRedraft.players[id] && V.redraftValue(lg, id) >= 1500 && V.rosPoints(lg, id) >= 30;
        const edge = (id) => (priced(id) ? (V.rosPoints(lg, id) * K) / V.redraftValue(lg, id) - 1 : 0);
        // A buy only counts as an edge if he is in your lineup most weeks.
        const regular = new Set(item.me.starts.filter((st) => st.weeks >= 0.4 * lg.weeks.length).map((st) => st.id));
        const buy = item.get.filter((id) => regular.has(id)).map((id) => [id, edge(id)]).sort((a, b) => b[1] - a[1])[0];
        const sell = item.give.filter((id) => !isPick(id)).map((id) => [id, edge(id)]).sort((a, b) => a[1] - b[1])[0];
        if (buy && buy[1] >= 0.15) out.push(`<b>Edge:</b> ${esc(players.info(buy[0]).name)} projects ${Math.round(Math.min(buy[1], 0.6) * 100)}%${buy[1] > 0.6 ? '+' : ''} more points than his price suggests.`);
        else if (sell && sell[1] <= -0.15) out.push(`<b>Edge:</b> you are selling ${esc(players.info(sell[0]).name)} above what he projects (${Math.round(Math.min(-sell[1], 0.6) * 100)}% less production than his price).`);
      }
      if (item.drops.me.length) out.push(`<b>Roster:</b> you would cut ${esc(item.drops.me.map((id) => players.info(id).name).join(', '))}.`);
      if (item.drops.them.length) out.push(`<b>Roster:</b> ${esc(them)} would cut ${esc(item.drops.them.map((id) => players.info(id).name).join(', '))}.`);
      return out.slice(0, 5);
    }
    const avg = (xs) => (xs.length ? sum(xs) / xs.length : null);

    function offerText(lg, item) {
      const them = item.them.starts[0];
      const pitch = them ? ` ${players.info(them.id).name} would start for you at ${slotText(them.slot)}.` : '';
      return `Trade idea (${lg.name}): I send ${list(lg, item.give)} for your ${list(lg, item.get)}.${pitch} Let me know what you think!`;
    }

    // ---- markup ----------------------------------------------------------

    function assetRow(lg, id, ownerRo, dyn) {
      const v = dyn ? V.worth(V.dynastyValue(lg, id)) : `${Math.round(V.rosPoints(lg, id))} pts`;
      const title = dyn ? 'KeepTradeCut value, for this league\'s format and scoring' : `Projected points rest of season${fs.results.consensus ? `; consensus value ${V.worth(V.redraftValue(lg, id))}` : ''}`;
      const who = isPick(id) ? deps.pickLabel(lg, id, ownerRo) : deps.label(id);
      const age = !isPick(id) && ageOf(id) ? `<i class="mv-age">${Math.round(ageOf(id))}y</i>` : '';
      return `<li>${who}${age}<span class="mv-ros" title="${title}">${v}</span></li>`;
    }

    function card(lg, item, index, win) {
      const dyn = fs.results.mode === 'dynasty';
      const partner = lg.raw.rosters.find((ro) => ro.roster_id === item.partnerId);
      const them = nameOf(lg, partner);
      const w = win.get(partner.roster_id);
      const label = item.likelihood >= 0.62 ? 'Likely' : item.likelihood >= 0.42 ? 'Fair shot' : 'Long shot';
      const tone = item.likelihood >= 0.62 ? 'high' : item.likelihood >= 0.42 ? 'mid' : 'low';
      const o = item.odds;
      const oddsLine = (id, who) => {
        if (!o) return '';
        const b = o.base.teams[id];
        const a = o.after.teams[id];
        const part = (key, name) => `${name} ${oddsLabel(b[key])} → <b>${oddsLabel(a[key])}</b>`;
        return `<span>${who}: ${lg.playoffTeams ? part('playoffOdds', 'playoffs') : ''}${o.after.bracket ? ` · ${part('titleOdds', 'title')}` : ''}</span>`;
      };
      const marketOf = dyn ? V.dynastyValue : V.redraftValue;
      const exponent = dyn ? undefined : ktc.EXPONENT_REDRAFT;
      const rawGive = ktc.sideValue(item.give.map((id) => marketOf(lg, id)), exponent);
      const rawGet = ktc.sideValue(item.get.map((id) => marketOf(lg, id)), exponent);
      return `<article class="mv-card">
        <div class="mv-card-h">
          <div><b>${esc(them)}</b> <span class="mv-win ${w.w >= 0.7 ? 'hot' : w.w < 0.3 ? 'cold' : ''}">${outlook(w.w)}${w.odds != null ? ` · ${oddsLabel(w.odds)}` : ''}</span></div>
          <span class="mv-likely ${tone}" title="How likely they are to say yes: they come out ahead in their own terms and the value is not lopsided against them">${label}</span>
        </div>
        <div class="mv-swap">
          <div><h5>You give</h5><ul>${item.give.map((id) => assetRow(lg, id, lg.mine, dyn)).join('')}</ul></div>
          <div class="mv-arrow" aria-hidden="true">⇄</div>
          <div><h5>You get</h5><ul>${item.get.map((id) => assetRow(lg, id, partner, dyn)).join('')}</ul></div>
        </div>
        <div class="mv-stats">
          <span>You: <b class="${item.me.dPts >= 0 ? 'up' : 'down'}">${signed(item.me.dPts)}</b> pts</span>
          <span>${esc(them)}: <b class="${item.them.dPts >= 0 ? 'up' : 'down'}">${signed(item.them.dPts)}</b> pts</span>
          ${dyn || fs.results.consensus ? `<span title="KeepTradeCut ${dyn ? '' : 'redraft '}value, packages adjusted">Value: give ${V.worth(rawGive)} · get ${V.worth(rawGet)}</span>` : ''}
        </div>
        ${o ? `<div class="mv-stats mv-odds">${oddsLine(lg.mine.roster_id, 'You')}${oddsLine(partner.roster_id, esc(them))}</div>` : ''}
        <ul class="mv-why">${reasons(lg, item, partner, win).map((r) => `<li>${r}</li>`).join('')}</ul>
        <div class="mv-actions">
          <button type="button" class="mv-btn" data-finder="open" data-i="${index}">Open in analyzer</button>
          <button type="button" class="mv-btn" data-finder="copy" data-i="${index}">Copy offer</button>
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
      const deadline = lg.tradeDeadline && state.nfl && state.nfl.week > lg.tradeDeadline
        ? `<p class="mv-warn small">This league's trade deadline (week ${lg.tradeDeadline}) has passed.</p>` : '';
      const kind = dyn ? 'Dynasty: priced on KeepTradeCut and each team\'s window.' : V.consensus(lg) ? 'Redraft: lineup points for the rest of the season (playoffs weighted), with KeepTradeCut\'s redraft values as the price.' : 'Redraft: priced on lineup points for the rest of the season.';
      let body;
      if (fs.running && !fs.results) body = `<div class="skel" role="status"><i></i><i></i></div><p class="muted small mv-note">${esc(fs.progress || '')}</p>`;
      else if (fs.error) body = `<p class="error">${esc(fs.error)}</p>`;
      else if (!fs.results) body = '<p class="muted small mv-note">Searching…</p>';
      else if (!fs.results.items.length) {
        body = `<p class="empty muted">No deal where both sides come out ahead.</p>
          <p class="muted small mv-note">${fs.shop || fs.target ? 'Try a different player, or clear the filters.' : 'Shop one of your players or go after a specific one to widen the search.'}${dyn ? ' "Win now" and "Rebuild" change what you are willing to pay.' : ''}</p>`;
      } else {
        body = fs.results.items.map((item, i) => card(lg, item, i, fs.results.windows)).join('');
      }
      return `<div class="mv-finder">${controls(lg)}${deadline}<p class="muted small mv-note mv-kind">${kind}</p>${body}</div>`;
    }

    // ---- events ----------------------------------------------------------

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
