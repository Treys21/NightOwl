globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, tradeLoader, marketValues } = NightOwl;
  const { escape: escapeHtml, leagueSelect } = NightOwl.format;

  const SHOWN = 12;
  const sum = (numbers) => numbers.reduce((total, number) => total + number, 0);
  const percentText = (fraction) => `${fraction > 0 ? '+' : fraction < 0 ? '−' : ''}${Math.round(Math.abs(fraction) * 100)}%`;

  function create(deps) {
    const { state, V: leagueValues, league: currentLeague, render, active } = deps;
    const historyState = state.history;

    function pricing(league) {
      if (!leagueValues.usesMarket(league)) return { sideValue: sum, assetValue: () => 0 };
      return {
        sideValue: (values) => marketValues.sideValue(values),
        assetValue: (a) => (a.pick ? leagueValues.pickAsset(league, a.pick) : leagueValues.dynastyValue(league, a.pid))
      };
    }

    function ensure(league) {
      if (league.historyPromise) return league.historyPromise;
      league.historyPromise = tradeLoader.load(league, state.nfl, pricing(league)).then((result) => {
        league.history = result;
        league.trade = summarize(league, result);
        return result;
      }).catch((error) => {
        console.warn('[Night Owl history] unavailable', league.name, error);
        league.historyPromise = null;
        return null;
      });
      return league.historyPromise;
    }

    function summarize(league, history) {
      const seasons = Math.max(1, history.seasons.length);
      const appetite = new Map();
      const record = new Map();
      for (const roster of league.raw.rosters) {
        const profile = history.profiles[roster.owner_id];
        appetite.set(roster.roster_id, Math.max(0.25, Math.min(1, 0.25 + (profile ? profile.trades / seasons : 0) / 3)));
        if (profile) record.set(roster.roster_id, profile);
      }
      return { band: history.band, appetite, record, seasons };
    }

    const nameOfOwner = (league, userId) => (userId && league.names.get(userId)) || 'Former manager';
    const assetText = (league, a) => {
      if (a.pick) return `${a.pick.season} round ${a.pick.round} pick${a.pick.player ? ` → ${players.info(a.pick.player).name}` : a.pick.passed ? ' (passed on)' : ''}`;
      const player = players.info(a.pid);
      return `${player.name}${player.pos ? ` (${player.pos})` : ''}`;
    };

    function assetsOf(side, which) {
      return (which === 'got' ? side.got : side.gave).map((playerId) => ({ pid: playerId }))
        .concat((which === 'got' ? side.gotPicks : side.gavePicks).map((pick) => ({ pick })));
    }

    function assetList(league, assets) {
      const lines = assets.filter((asset) => !asset.pick || asset.pick.player || asset.pick.passed).map((asset) => `<li>${escapeHtml(assetText(league, asset))}</li>`);
      const byYear = new Map();
      for (const asset of assets.filter((asset) => asset.pick && !asset.pick.player && !asset.pick.passed)) {
        if (!byYear.has(asset.pick.season)) byYear.set(asset.pick.season, []);
        byYear.get(asset.pick.season).push(`R${asset.pick.round}`);
      }
      for (const [year, rounds] of byYear) lines.push(`<li class="picks">${escapeHtml(year)} picks · ${escapeHtml(rounds.join(' '))}</li>`);
      return lines.join('') || '<li class="muted">nothing</li>';
    }

    function tradeCard(league, item) {
      const { trade, grades, real, owners } = item;
      const isDynasty = leagueValues.usesMarket(league);
      const when = new Date(trade.at).toLocaleDateString([], { month: 'short', day: 'numeric' });
      const sides = Object.keys(trade.sides).map((rosterId) => {
        const grade = grades[rosterId];
        const side = trade.sides[rosterId];
        const owner = owners[rosterId];
        const mine = !!owner && owner === league.mine.owner_id;
        const stat = [];
        if (isDynasty && grade.valueNet) stat.push(`<b class="${grade.valueNet > 0 ? 'up' : 'down'}">${grade.valueNet > 0 ? '+' : '−'}${leagueValues.worth(Math.abs(grade.valueNet))}</b>`);
        if (real && real[rosterId] && real[rosterId].started >= 1) stat.push(`${Math.round(real[rosterId].started)} pts started`);
        return `<div class="mv-hist-side${mine ? ' me' : ''}">
          <div class="mv-hist-who"><b>${mine ? 'You' : escapeHtml(nameOfOwner(league, owner))}</b><span class="mv-grade g-${grade.tone}" title="Value now ${percentText(grade.valuePct)}${real ? `, started ${grade.ptsNet >= 0 ? '+' : ''}${grade.ptsNet} pts net` : ''}">${grade.letter}</span></div>
          <ul>${assetList(league, assetsOf(side, 'got'))}</ul>
          ${stat.length ? `<small class="muted">${stat.join(' · ')}</small>` : ''}
        </div>`;
      });
      return `<article class="mv-card mv-hist">
        <div class="mv-hist-h"><span>${escapeHtml(when)} · week ${trade.week}, ${escapeHtml(trade.season)}</span></div>
        <div class="mv-hist-sides">${sides.join('')}</div>
      </article>`;
    }

    function managers(league, history) {
      const rows = league.raw.rosters.map((roster) => ({ roster, profile: history.profiles[roster.owner_id] })).filter((row) => row.profile)
        .sort((a, b) => b.profile.trades - a.profile.trades || b.profile.avgPct - a.profile.avgPct);
      if (!rows.length) return '';
      return `<table class="mv-table mv-managers"><thead><tr><th>Manager</th><th title="Trades across every season of the league">Deals</th><th title="Average value won (+) or given up (−) per deal, on today's market">Avg</th><th title="Share of what they trade that is draft picks">Picks</th></tr></thead><tbody>
        ${rows.map(({ roster, profile }) => `<tr class="${roster.roster_id === league.mine.roster_id ? 'me' : ''}"><td>${roster.roster_id === league.mine.roster_id ? 'You' : escapeHtml(nameOfOwner(league, roster.owner_id))}</td><td class="num">${profile.trades}</td><td class="num ${profile.avgPct > 0.02 ? 'up' : profile.avgPct < -0.02 ? 'down' : ''}">${leagueValues.usesMarket(league) ? percentText(profile.avgPct) : '–'}</td><td class="num">${Math.round(profile.picksShare * 100)}%</td></tr>`).join('')}
      </tbody></table>`;
    }

    const managersFold = (league, history) => {
      const table = managers(league, history);
      return table ? `<details class="mv-fold"><summary>Managers</summary>${table}</details>` : '';
    };

    function pane() {
      const league = currentLeague();
      if (!league) return '<p class="empty muted">No league with a regular season left to play.</p>';
      const select = `<div class="mv-selects">${leagueSelect(state.leagues, league.leagueId)}</div>`;
      const history = league.history;
      if (!history) {
        return `${select}<div class="skel" role="status"><i></i><i></i></div><p class="muted small mv-note">Reading this league's trades…</p>`;
      }
      if (!history.graded.length) return `${select}<p class="empty muted">No trades in this league${history.seasons.length > 1 ? ` in its ${history.seasons.length} seasons` : ' this season'}.</p>`;
      const isDynasty = leagueValues.usesMarket(league);
      const band = history.band;
      const mine = history.graded.filter((gradedTrade) => gradedTrade.trade.sides[league.mine.roster_id] && gradedTrade.owners[league.mine.roster_id] === league.mine.owner_id);
      const myLetters = mine.slice(0, 8).map((gradedTrade) => gradedTrade.grades[league.mine.roster_id].letter).join(' ') + (mine.length > 8 ? ' …' : '');
      const shown = historyState.all ? history.graded : history.graded.slice(0, SHOWN);
      return `${select}
        <p class="mv-kind muted small" title="${escapeHtml(isDynasty ? 'Graded on today\'s market values and what the players started since; older deals carry hindsight.' : 'Graded on the points the players started for their new teams.')}">${history.graded.length} trade${history.graded.length === 1 ? '' : 's'} · ${escapeHtml(history.seasons[history.seasons.length - 1])}${history.seasons.length > 1 ? `–${escapeHtml(history.seasons[0])}` : ''}${band.medianAbsPct != null && isDynasty ? ` · typically ${Math.round(band.medianAbsPct * 100)}% off even` : ''}${mine.length ? ` · you ${escapeHtml(myLetters)}` : ''}</p>
        ${managersFold(league, history)}
        ${shown.map((gradedTrade) => tradeCard(league, gradedTrade)).join('')}
        ${!historyState.all && history.graded.length > SHOWN ? `<button type="button" class="mv-btn" data-history="more">Show all ${history.graded.length}</button>` : ''}`;
    }

    function change(event) {
      if (event.target.id !== 'mv-league') return false;
      state.finder.leagueId = event.target.value;
      historyState.all = false;
      const league = currentLeague();
      if (league && !league.history) ensure(league).then(() => active() && render());
      render();
      return true;
    }

    function click(event) {
      if (!event.target.closest('[data-history="more"]')) return false;
      historyState.all = true;
      render();
      return true;
    }

    return { pane, change, click, ensure };
  }

  NightOwl.movesHistory = { create };
})(globalThis.NightOwl);
