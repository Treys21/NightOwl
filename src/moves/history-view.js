globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, tradeLoader, ktc } = NightOwl;
  const { escape: escapeHtml } = NightOwl.format;

  const SHOWN = 12;
  const sum = (xs) => xs.reduce((a, b) => a + b, 0);
  const pct = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.round(Math.abs(n) * 100)}%`;

  function create(deps) {
    const { state, V, league: currentLeague, render, active } = deps;
    const hs = state.history;

    function pricing(league) {
      if (!V.usesKtc(league)) return { sideValue: sum, assetValue: () => 0 };
      return {
        sideValue: (vs) => ktc.sideValue(vs),
        assetValue: (a) => (a.pick ? V.pickAsset(league, a.pick) : V.dynastyValue(league, a.pid))
      };
    }

    function ensure(league) {
      if (league.historyPromise) return league.historyPromise;
      league.historyPromise = tradeLoader.load(league, state.nfl, pricing(league)).then((h) => {
        league.history = h;
        league.trade = summarize(league, h);
        return h;
      }).catch((error) => {
        console.warn('[Night Owl history] unavailable', league.name, error);
        league.historyPromise = null;
        return null;
      });
      return league.historyPromise;
    }

    function summarize(league, h) {
      const seasons = Math.max(1, h.seasons.length);
      const appetite = new Map();
      const record = new Map();
      for (const roster of league.raw.rosters) {
        const p = h.profiles[roster.owner_id];
        appetite.set(roster.roster_id, Math.max(0.25, Math.min(1, 0.25 + (p ? p.trades / seasons : 0) / 3)));
        if (p) record.set(roster.roster_id, p);
      }
      return { band: h.band, appetite, record, seasons };
    }

    const nameOfOwner = (league, userId) => (userId && league.names.get(userId)) || 'Former manager';
    const assetText = (league, a) => {
      if (a.pick) return `${a.pick.season} round ${a.pick.round} pick${a.pick.player ? ` → ${players.info(a.pick.player).name}` : a.pick.passed ? ' (passed on)' : ''}`;
      const p = players.info(a.pid);
      return `${p.name}${p.pos ? ` (${p.pos})` : ''}`;
    };

    function assetsOf(side, which) {
      return (which === 'got' ? side.got : side.gave).map((playerId) => ({ pid: playerId }))
        .concat((which === 'got' ? side.gotPicks : side.gavePicks).map((pick) => ({ pick })));
    }

    function assetList(league, assets) {
      const lines = assets.filter((a) => !a.pick || a.pick.player || a.pick.passed).map((a) => `<li>${escapeHtml(assetText(league, a))}</li>`);
      const byYear = new Map();
      for (const a of assets.filter((x) => x.pick && !x.pick.player && !x.pick.passed)) {
        if (!byYear.has(a.pick.season)) byYear.set(a.pick.season, []);
        byYear.get(a.pick.season).push(`R${a.pick.round}`);
      }
      for (const [year, rounds] of byYear) lines.push(`<li class="picks">${escapeHtml(year)} picks · ${escapeHtml(rounds.join(' '))}</li>`);
      return lines.join('') || '<li class="muted">nothing</li>';
    }

    function tradeCard(league, item) {
      const { trade, grades, real, owners } = item;
      const isDynasty = V.usesKtc(league);
      const when = new Date(trade.at).toLocaleDateString([], { month: 'short', day: 'numeric' });
      const sides = Object.keys(trade.sides).map((rosterId) => {
        const g = grades[rosterId];
        const side = trade.sides[rosterId];
        const owner = owners[rosterId];
        const mine = !!owner && owner === league.mine.owner_id;
        const stat = [];
        if (isDynasty && g.valueNet) stat.push(`<b class="${g.valueNet > 0 ? 'up' : 'down'}">${g.valueNet > 0 ? '+' : '−'}${V.worth(Math.abs(g.valueNet))}</b>`);
        if (real && real[rosterId] && real[rosterId].started >= 1) stat.push(`${Math.round(real[rosterId].started)} pts started`);
        return `<div class="mv-hist-side${mine ? ' me' : ''}">
          <div class="mv-hist-who"><b>${mine ? 'You' : escapeHtml(nameOfOwner(league, owner))}</b><span class="mv-grade g-${g.tone}" title="Value now ${pct(g.valuePct)}${real ? `, started ${g.ptsNet >= 0 ? '+' : ''}${g.ptsNet} pts net` : ''}">${g.letter}</span></div>
          <ul>${assetList(league, assetsOf(side, 'got'))}</ul>
          ${stat.length ? `<small class="muted">${stat.join(' · ')}</small>` : ''}
        </div>`;
      });
      return `<article class="mv-card mv-hist">
        <div class="mv-hist-h"><span>${escapeHtml(when)} · week ${trade.week}, ${escapeHtml(trade.season)}</span></div>
        <div class="mv-hist-sides">${sides.join('')}</div>
      </article>`;
    }

    function managers(league, h) {
      const rows = league.raw.rosters.map((roster) => ({ ro: roster, p: h.profiles[roster.owner_id] })).filter((r) => r.p)
        .sort((a, b) => b.p.trades - a.p.trades || b.p.avgPct - a.p.avgPct);
      if (!rows.length) return '';
      return `<table class="mv-table mv-managers"><thead><tr><th>Manager</th><th title="Trades across every season of the league">Deals</th><th title="Average value won (+) or given up (−) per deal, on today's market">Avg</th><th title="Share of what they trade that is draft picks">Picks</th></tr></thead><tbody>
        ${rows.map(({ ro: roster, p }) => `<tr class="${roster.roster_id === league.mine.roster_id ? 'me' : ''}"><td>${roster.roster_id === league.mine.roster_id ? 'You' : escapeHtml(nameOfOwner(league, roster.owner_id))}</td><td class="num">${p.trades}</td><td class="num ${p.avgPct > 0.02 ? 'up' : p.avgPct < -0.02 ? 'down' : ''}">${V.usesKtc(league) ? pct(p.avgPct) : '–'}</td><td class="num">${Math.round(p.picksShare * 100)}%</td></tr>`).join('')}
      </tbody></table>`;
    }

    const managersFold = (league, h) => {
      const table = managers(league, h);
      return table ? `<details class="mv-fold"><summary>Managers</summary>${table}</details>` : '';
    };

    function pane() {
      const league = currentLeague();
      if (!league) return '<p class="empty muted">No league with a regular season left to play.</p>';
      const select = `<div class="mv-selects"><select id="mv-league" aria-label="League">${state.leagues.map((l) => `<option value="${escapeHtml(l.leagueId)}"${l.leagueId === league.leagueId ? ' selected' : ''}>${escapeHtml(l.name)}</option>`).join('')}</select></div>`;
      const h = league.history;
      if (!h) {
        return `${select}<div class="skel" role="status"><i></i><i></i></div><p class="muted small mv-note">Reading this league's trades…</p>`;
      }
      if (!h.graded.length) return `${select}<p class="empty muted">No trades in this league${h.seasons.length > 1 ? ` in its ${h.seasons.length} seasons` : ' this season'}.</p>`;
      const isDynasty = V.usesKtc(league);
      const band = h.band;
      const mine = h.graded.filter((g) => g.trade.sides[league.mine.roster_id] && g.owners[league.mine.roster_id] === league.mine.owner_id);
      const myLetters = mine.slice(0, 8).map((g) => g.grades[league.mine.roster_id].letter).join(' ') + (mine.length > 8 ? ' …' : '');
      const shown = hs.all ? h.graded : h.graded.slice(0, SHOWN);
      return `${select}
        <p class="mv-kind muted small" title="${escapeHtml(isDynasty ? 'Graded on today\'s KeepTradeCut values and what the players started since; older deals carry hindsight.' : 'Graded on the points the players started for their new teams.')}">${h.graded.length} trade${h.graded.length === 1 ? '' : 's'} · ${escapeHtml(h.seasons[h.seasons.length - 1])}${h.seasons.length > 1 ? `–${escapeHtml(h.seasons[0])}` : ''}${band.medianAbsPct != null && isDynasty ? ` · typically ${Math.round(band.medianAbsPct * 100)}% off even` : ''}${mine.length ? ` · you ${escapeHtml(myLetters)}` : ''}</p>
        ${managersFold(league, h)}
        ${shown.map((g) => tradeCard(league, g)).join('')}
        ${!hs.all && h.graded.length > SHOWN ? `<button type="button" class="mv-btn" data-history="more">Show all ${h.graded.length}</button>` : ''}`;
    }

    function change(e) {
      if (e.target.id !== 'mv-league') return false;
      state.finder.leagueId = e.target.value;
      hs.all = false;
      const league = currentLeague();
      if (league && !league.history) ensure(league).then(() => active() && render());
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
