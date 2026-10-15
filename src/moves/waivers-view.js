globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { teams, players } = NightOwl;
  const { teamUrl } = NightOwl.leagues;
  const { escape: escapeHtml, delta: signed } = NightOwl.format;
  const { pickOf } = NightOwl.moveValues;

  const SHOWN = 6;
  const STREAMERS = 3;

  function create({ state, values }) {
    const { pickSlot, pickTierOf, ordinalRound } = values;

    const label = (playerId) => {
      const player = players.info(playerId);
      const injury = player.injury ? `<i class="mv-inj" title="${escapeHtml(player.injury)}">${escapeHtml(player.injury)}</i>` : '';
      return `<span class="mv-who"><img src="${teams.photo(playerId, player.team)}" alt="" loading="lazy"><span class="mv-nm"><b>${escapeHtml(player.name)}</b><small>${escapeHtml(player.pos)}${player.team ? ` · ${escapeHtml(player.team)}` : ''}${injury}</small></span></span>`;
    };


    function pickLabel(league, playerId, owner) {
      const pick = pickOf(playerId);
      const tier = pickTierOf(league, pick);
      const slot = pick.year === Number(league.raw.season) + 1 ? pickSlot(league, pick.from) : null;
      const own = pick.from === owner.roster_id;
      const from = own ? 'own pick' : `from ${escapeHtml(league.names.get((league.raw.rosters.find((roster) => roster.roster_id === pick.from) || {}).owner_id) || `Team ${pick.from}`)}`;
      return `<span class="mv-who"><span class="mv-pk">${String(pick.year).slice(2)}</span><span class="mv-nm"><b>${pick.year} ${slot ? `${pick.round}.${String(slot).padStart(2, '0')}` : `${tier[0].toUpperCase()}${tier.slice(1)} ${ordinalRound(pick.round)}`}</b><small>${slot ? `${tier} ${ordinalRound(pick.round)} · ` : ''}${from}</small></span></span>`;
    }

    function addRow(league, target, { by: rankBy }) {
      const drop = target.drop ? `<span class="mv-cut" title="The player your lineup misses least">cut ${escapeHtml(players.info(target.drop).name)}</span>` : '<span class="mv-cut">open spot</span>';
      return `<tr>
        <td>${label(target.pid)}</td>
        <td class="num" title="Projected next week">${target.next.toFixed(1)}</td>
        <td class="num up" title="Starter points he'd add ${rankBy === 'gain' ? 'over the rest of the season' : 'next week'}">${signed(rankBy === 'gain' ? target.gain : target.nowGain)}</td>
        <td class="mv-drop">${drop}</td>
      </tr>`;
    }

    function waiverBlock(league) {
      const targets = state.targets.get(league.leagueId);
      const week = league.weeks[0] && league.weeks[0].week;
      let head;
      let body = '';
      if (!targets) {
        head = '<span class="mv-best muted">Checking…</span>';
      } else if (!targets.length) {
        head = '<span class="mv-best muted">No upgrades</span>';
        body = '';
      } else {
        const best = targets[0];
        head = `<span class="mv-best up">${signed(best.gain)} pts · ${escapeHtml(players.info(best.pid).name)}</span>`;
        const long = targets.filter((target) => target.gain >= 0.05).slice(0, SHOWN);
        const quick = targets.filter((target) => target.nowGain >= 0.05).sort((a, b) => b.nowGain - a.nowGain).slice(0, STREAMERS);
        const tableHead = (rankBy) => `<thead><tr><th></th><th title="Projected points next week">Wk ${week}</th><th title="${rankBy === 'gain' ? 'Starter points added for the rest of the season' : 'Starter points added next week'}">${rankBy === 'gain' ? 'ROS' : 'Gain'}</th><th></th></tr></thead>`;
        body = `<h4 class="mv-h">Best for the rest of the season</h4>
          <table class="mv-table">${tableHead('gain')}<tbody>${long.map((target) => addRow(league, target, { by: 'gain' })).join('') || '<tr><td colspan="4" class="muted">No long-term upgrades</td></tr>'}</tbody></table>
          ${quick.length ? `<h4 class="mv-h">Best for week ${week}</h4>
          <table class="mv-table">${tableHead('now')}<tbody>${quick.map((target) => addRow(league, target, { by: 'now' })).join('')}</tbody></table>` : ''}
          <p class="muted small mv-note">Starter points your best lineup gains with him${league.kind !== 'redraft' ? ' this season (age and picks are not counted)' : ''}, after cutting the player your lineup misses least. Projections are Sleeper's.
          <a href="${teamUrl(league.leagueId)}" target="_blank" rel="noopener">Open in Sleeper</a></p>`;
      }
      return `<details class="mv-league" data-id="${escapeHtml(league.leagueId)}"${state.open.has(league.leagueId) ? ' open' : ''}>
        <summary><div class="mv-head"><span class="mv-name">${escapeHtml(league.name)}</span>${head}</div></summary>
        ${body}
      </details>`;
    }

    return { label, pickLabel, block: waiverBlock };
  }

  NightOwl.movesWaivers = { create };
})(globalThis.NightOwl);
