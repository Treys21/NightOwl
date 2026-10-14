// The trade history pane of the Moves tool: every trade in a league (this
// season and last) with a grade for each side, and how each manager trades.
// The finder reads the same history to judge who is likely to deal.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, tradeLoader, ktc } = NightOwl;
  const { escape: esc } = NightOwl.format;

  const SHOWN = 12; // trades listed before "Show more"
  const sum = (xs) => xs.reduce((a, b) => a + b, 0);
  const pct = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.round(Math.abs(n) * 100)}%`;

  /** deps: { state, V, league(), render, active() } */
  function create(deps) {
    const { state, V, league, render, active } = deps;
    const hs = state.history;

    // ---- loading ---------------------------------------------------------

    // How the market prices an asset now. Redraft has no long-run price, so its trades are graded on points alone.
    function pricing(lg) {
      if (!V.usesKtc(lg)) return { sideValue: sum, assetValue: () => 0 };
      return {
        sideValue: (vs) => ktc.sideValue(vs),
        // A pick is worth the player to whoever used it, and its slot to whoever passed it on.
        assetValue: (a) => (a.pick ? V.pickAsset(lg, a.pick) : V.dynastyValue(lg, a.pid))
      };
    }

    /** Load (once) a league's trades; resolves to the history, or null when Sleeper can't be reached. */
    function ensure(lg) {
      if (lg.historyPromise) return lg.historyPromise;
      lg.historyPromise = tradeLoader.load(lg, state.nfl, pricing(lg)).then((h) => {
        lg.history = h;
        lg.trade = summarize(lg, h);
        return h;
      }).catch((err) => {
        console.warn('[Night Owl history] unavailable', lg.name, err);
        lg.historyPromise = null;
        return null;
      });
      return lg.historyPromise;
    }

    /** What the finder wants from a history: the league's tolerance and each current manager's appetite for deals. */
    function summarize(lg, h) {
      const seasons = Math.max(1, h.seasons.length);
      const appetite = new Map();
      const record = new Map();
      for (const ro of lg.raw.rosters) {
        const p = h.profiles[ro.owner_id];
        appetite.set(ro.roster_id, Math.max(0.25, Math.min(1, 0.25 + (p ? p.trades / seasons : 0) / 3)));
        if (p) record.set(ro.roster_id, p);
      }
      return { band: h.band, appetite, record, seasons };
    }

    // ---- words -----------------------------------------------------------

    const nameOfOwner = (lg, userId) => (userId && lg.names.get(userId)) || 'Former manager';
    const assetText = (lg, a) => {
      if (a.pick) return `${a.pick.season} round ${a.pick.round} pick${a.pick.player ? ` → ${players.info(a.pick.player).name}` : a.pick.passed ? ' (passed on)' : ''}`;
      const p = players.info(a.pid);
      return `${p.name}${p.pos ? ` (${p.pos})` : ''}`;
    };

    function assetsOf(side, which) {
      return (which === 'got' ? side.got : side.gave).map((pid) => ({ pid }))
        .concat((which === 'got' ? side.gotPicks : side.gavePicks).map((pick) => ({ pick })));
    }

    // Players one to a line; picks nobody has used yet gathered by year ("2027 picks · R1 R2 R3").
    function assetList(lg, assets) {
      const lines = assets.filter((a) => !a.pick || a.pick.player || a.pick.passed).map((a) => `<li>${esc(assetText(lg, a))}</li>`);
      const byYear = new Map();
      for (const a of assets.filter((x) => x.pick && !x.pick.player && !x.pick.passed)) {
        if (!byYear.has(a.pick.season)) byYear.set(a.pick.season, []);
        byYear.get(a.pick.season).push(`R${a.pick.round}`);
      }
      for (const [year, rounds] of byYear) lines.push(`<li class="picks">${esc(year)} picks · ${esc(rounds.join(' '))}</li>`);
      return lines.join('') || '<li class="muted">nothing</li>';
    }

    function tradeCard(lg, item) {
      const { trade, grades, real, owners } = item;
      const dyn = V.usesKtc(lg);
      const when = new Date(trade.at).toLocaleDateString([], { month: 'short', day: 'numeric' });
      const sides = Object.keys(trade.sides).map((rid) => {
        const g = grades[rid];
        const side = trade.sides[rid];
        const owner = owners[rid];
        const mine = !!owner && owner === lg.mine.owner_id;
        const stat = [];
        if (dyn && g.valueNet) stat.push(`<b class="${g.valueNet > 0 ? 'up' : 'down'}">${g.valueNet > 0 ? '+' : '−'}${V.worth(Math.abs(g.valueNet))}</b>`);
        if (real && real[rid] && real[rid].started >= 1) stat.push(`${Math.round(real[rid].started)} pts started`);
        return `<div class="mv-hist-side${mine ? ' me' : ''}">
          <div class="mv-hist-who"><b>${mine ? 'You' : esc(nameOfOwner(lg, owner))}</b><span class="mv-grade g-${g.tone}" title="Value now ${pct(g.valuePct)}${real ? `, started ${g.ptsNet >= 0 ? '+' : ''}${g.ptsNet} pts net` : ''}">${g.letter}</span></div>
          <ul>${assetList(lg, assetsOf(side, 'got'))}</ul>
          ${stat.length ? `<small class="muted">${stat.join(' · ')}</small>` : ''}
        </div>`;
      });
      return `<article class="mv-card mv-hist">
        <div class="mv-hist-h"><span>${esc(when)} · week ${trade.week}, ${esc(trade.season)}</span></div>
        <div class="mv-hist-sides">${sides.join('')}</div>
      </article>`;
    }

    function managers(lg, h) {
      const rows = lg.raw.rosters.map((ro) => ({ ro, p: h.profiles[ro.owner_id] })).filter((r) => r.p)
        .sort((a, b) => b.p.trades - a.p.trades || b.p.avgPct - a.p.avgPct);
      if (!rows.length) return '';
      return `<table class="mv-table mv-managers"><thead><tr><th>Manager</th><th title="Trades across every season of the league">Deals</th><th title="Average value won (+) or given up (−) per deal, on today's market">Avg</th><th title="Share of what they trade that is draft picks">Picks</th></tr></thead><tbody>
        ${rows.map(({ ro, p }) => `<tr class="${ro.roster_id === lg.mine.roster_id ? 'me' : ''}"><td>${ro.roster_id === lg.mine.roster_id ? 'You' : esc(nameOfOwner(lg, ro.owner_id))}</td><td class="num">${p.trades}</td><td class="num ${p.avgPct > 0.02 ? 'up' : p.avgPct < -0.02 ? 'down' : ''}">${V.usesKtc(lg) ? pct(p.avgPct) : '–'}</td><td class="num">${Math.round(p.picksShare * 100)}%</td></tr>`).join('')}
      </tbody></table>`;
    }

    const managersFold = (lg, h) => {
      const table = managers(lg, h);
      return table ? `<details class="mv-fold"><summary>Managers</summary>${table}</details>` : '';
    };

    // ---- markup ----------------------------------------------------------

    function pane() {
      const lg = league();
      if (!lg) return '<p class="empty muted">No league with a regular season left to play.</p>';
      const select = `<div class="mv-selects"><select id="mv-league" aria-label="League">${state.leagues.map((l) => `<option value="${esc(l.leagueId)}"${l.leagueId === lg.leagueId ? ' selected' : ''}>${esc(l.name)}</option>`).join('')}</select></div>`;
      const h = lg.history;
      if (!h) {
        return `${select}<div class="skel" role="status"><i></i><i></i></div><p class="muted small mv-note">Reading this league's trades…</p>`;
      }
      if (!h.graded.length) return `${select}<p class="empty muted">No trades in this league${h.seasons.length > 1 ? ` in its ${h.seasons.length} seasons` : ' this season'}.</p>`;
      const dyn = V.usesKtc(lg);
      const band = h.band;
      const mine = h.graded.filter((g) => g.trade.sides[lg.mine.roster_id] && g.owners[lg.mine.roster_id] === lg.mine.owner_id);
      const myLetters = mine.slice(0, 8).map((g) => g.grades[lg.mine.roster_id].letter).join(' ') + (mine.length > 8 ? ' …' : '');
      const shown = hs.all ? h.graded : h.graded.slice(0, SHOWN);
      return `${select}
        <p class="mv-kind muted small" title="${esc(dyn ? 'Graded on today\'s KeepTradeCut values and what the players started since; older deals carry hindsight.' : 'Graded on the points the players started for their new teams.')}">${h.graded.length} trade${h.graded.length === 1 ? '' : 's'} · ${esc(h.seasons[h.seasons.length - 1])}${h.seasons.length > 1 ? `–${esc(h.seasons[0])}` : ''}${band.medianAbsPct != null && dyn ? ` · typically ${Math.round(band.medianAbsPct * 100)}% off even` : ''}${mine.length ? ` · you ${esc(myLetters)}` : ''}</p>
        ${managersFold(lg, h)}
        ${shown.map((g) => tradeCard(lg, g)).join('')}
        ${!hs.all && h.graded.length > SHOWN ? `<button type="button" class="mv-btn" data-history="more">Show all ${h.graded.length}</button>` : ''}`;
    }

    function change(e) {
      if (e.target.id !== 'mv-league') return false;
      state.finder.leagueId = e.target.value;
      hs.all = false;
      const lg = league();
      if (lg && !lg.history) ensure(lg).then(() => active() && render());
      render();
      return true;
    }

    function click(e) {
      if (!e.target.closest('[data-history="more"]')) return false;
      hs.all = true;
      render();
      return true;
    }

    return { pane, change, click, ensure };
  }

  NightOwl.movesHistory = { create };
})(globalThis.NightOwl);
