globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, tradeDrafts, tradeHistory, ktc } = NightOwl;
  const { escape: escapeHtml } = NightOwl.format;

  const GRADE_SCALE = 0.5;
  const TEAM_NAME_MAX = 12;

  function create(deps) {
    const { state, V: leagueValues, league: currentLeague, render, active, ensureHistory } = deps;
    const draftsState = state.drafts;

    function valueFn(league) {
      if (leagueValues.usesKtc(league)) return (playerId) => leagueValues.dynastyValue(league, playerId);
      if (leagueValues.consensus(league)) return (playerId) => leagueValues.redraftValue(league, playerId);
      return null;
    }

    const NEAR = 0.15;
    const colour = (score) => {
      const intensity = Math.max(0, Math.min(1, (Math.abs(score) - NEAR) / (1 - NEAR)));
      const alpha = (0.04 + 0.8 * Math.pow(intensity, 0.75)).toFixed(2);
      return score >= 0 ? `rgba(0, 206, 184, ${alpha})` : `rgba(247, 92, 141, ${alpha})`;
    };
    const absoluteScore = (value, medianValue, bestValue) => (value >= medianValue ? (bestValue > medianValue ? (value - medianValue) / (bestValue - medianValue) : 0) : (value - medianValue) / Math.max(medianValue, 1));
    const percentChangeText = (fraction) => `${fraction > 0 ? '+' : fraction < 0 ? '−' : ''}${Math.round(Math.abs(fraction) * 100)}%`;

    function teamName(league, rosterId) {
      const roster = league.raw.rosters.find((roster) => roster.roster_id === rosterId);
      const name = roster ? ((roster.owner_id && league.names.get(roster.owner_id)) || `Team ${rosterId}`) : `Team ${rosterId}`;
      return roster && roster.roster_id === league.mine.roster_id ? 'You' : name;
    }
    const short = (text) => (text.length > TEAM_NAME_MAX ? `${text.slice(0, TEAM_NAME_MAX - 1)}…` : text);

    function cell(league, draft, boardCell, scoreOf) {
      if (!boardCell) return '<div class="dv-cell empty"></div>';
      const player = players.info(boardCell.pid);
      const last = (player.name || boardCell.pid).split(' ').slice(-1)[0];
      const tip = `${player.name} (${player.pos || '?'}${player.team ? `, ${player.team}` : ''}) · pick ${boardCell.no} (${boardCell.label}), made by ${teamName(league, boardCell.by)}${boardCell.traded ? `, traded from ${teamName(league, boardCell.from)}` : ''}\nWorth ${leagueValues.worth(boardCell.value)} now; the picks around it returned ${leagueValues.worth(boardCell.expected)} (${percentChangeText(boardCell.score)})`;
      const shown = scoreOf(boardCell);
      const kind = Math.abs(shown) < NEAR ? ' near' : '';
      return `<div class="dv-cell${kind}" style="background:${colour(shown)}" title="${escapeHtml(tip)}">
        <span class="dv-no">${boardCell.label}${boardCell.traded ? ' <b title="Traded pick">↔</b>' : ''}</span>
        <span class="dv-name">${escapeHtml(last)}</span>
        <span class="dv-pos">${escapeHtml(player.pos || '')}</span>
        <span class="dv-val">${boardCell.value ? leagueValues.worth(boardCell.value) : '–'}</span>
      </div>`;
    }

    function board(league, draft) {
      const value = valueFn(league);
      if (!value) return '<p class="empty muted">Draft grades need KeepTradeCut values, which are not loaded.</p>';
      const chart = leagueValues.usesKtc(league) && state.ktc && state.ktc.picks;
      const b = tradeDrafts.board(draft, value, chart ? ({ round, slot, teams }) => ktc.pickBaseline(chart, { round, slot, teams, superflex: league.superflex }) : null);
      const slots = Array.from({ length: b.teams }, (_, i) => i + 1);
      const sorted = b.picks.map((pick) => pick.value).sort((left, right) => left - right);
      const medianValue = sorted[Math.floor(sorted.length / 2)] || 0;
      const bestValue = sorted[sorted.length - 1] || 0;
      const scoreOf = draftsState.color === 'value' ? (boardCell) => absoluteScore(boardCell.value, medianValue, bestValue) : (boardCell) => (boardCell.score < 0 ? boardCell.score * boardCell.weight : boardCell.score);
      const head = slots.map((slot) => `<div class="dv-head" title="${escapeHtml(teamName(league, draft.slotToRoster ? draft.slotToRoster[slot] : slot))}">${escapeHtml(short(teamName(league, draft.slotToRoster ? draft.slotToRoster[slot] : slot)))}</div>`).join('');
      const rows = b.rows.map((row, index) => `<div class="dv-round">${index + 1}</div>${slots.map((slot) => cell(league, draft, row[slot - 1], scoreOf)).join('')}`).join('');
      const worthOf = (a) => (a.pick ? leagueValues.pickAsset(league, a.pick) : value(a.pid));
      const net = tradeDrafts.afterTrades(b, draft, (league.history.graded || []).map((gradedTrade) => gradedTrade.trade), worthOf);
      const grades = Object.entries(net)
        .map(([rosterId, teamResult]) => ({ rosterId: Number(rosterId), result: teamResult, letter: tradeHistory.letterFor(teamResult.score * GRADE_SCALE) }))
        .sort((left, right) => right.result.score - left.result.score);
      const signed = (amount) => `${amount > 0 ? '+' : amount < 0 ? '−' : ''}${leagueValues.worth(Math.abs(amount))}`;
      const table = `<table class="mv-table mv-managers"><thead><tr><th>Team</th><th>Grade</th><th title="Value now of the players taken with the picks the team used">Picks</th><th title="Value now of what the team got in trades that moved this draft's picks, less what it gave">Trades</th><th title="Total value gained over what the pick chart said the team's own slots were worth, picks and trades together">Gain</th></tr></thead><tbody>
        ${grades.map((grade) => `<tr class="${grade.rosterId === league.mine.roster_id ? 'me' : ''}"><td>${escapeHtml(teamName(league, grade.rosterId))}</td><td class="num"><span class="mv-grade g-${tradeHistory.toneOf(grade.letter)}">${grade.letter}</span></td><td class="num">${leagueValues.worth(grade.result.value)}</td><td class="num ${grade.result.trades > 0 ? 'up' : grade.result.trades < 0 ? 'down' : ''}">${grade.result.trades ? signed(grade.result.trades) : '–'}</td><td class="num ${grade.result.gain > 0 ? 'up' : grade.result.gain < 0 ? 'down' : ''}">${grade.result.gain ? signed(grade.result.gain) : '–'}</td></tr>`).join('')}
      </tbody></table>`;
      return `<div class="dv-wrap"><div class="dv-grid" style="--teams:${b.teams}"><div class="dv-corner"></div>${head}${rows}</div></div>
        <p class="muted small mv-note dv-legend" title="Values are today's, so older drafts carry hindsight. Team grades include what was paid or received in pick trades."><i class="dv-key up"></i> ${draftsState.color === 'value' ? 'worth the most' : 'beat its slot'} <i class="dv-key down"></i> ${draftsState.color === 'value' ? 'worth little' : 'fell short'} · ↔ traded pick</p>
        ${table}`;
    }

    function pane() {
      const league = currentLeague();
      if (!league) return '<p class="empty muted">No league with a regular season left to play.</p>';
      const select = `<div class="mv-selects"><select id="mv-league" aria-label="League">${state.leagues.map((leagueChoice) => `<option value="${escapeHtml(leagueChoice.leagueId)}"${leagueChoice.leagueId === league.leagueId ? ' selected' : ''}>${escapeHtml(leagueChoice.name)}</option>`).join('')}</select>`;
      const history = league.history;
      if (!history) return `${select}</div><div class="skel" role="status"><i></i><i></i></div><p class="muted small mv-note">Reading this league's drafts…</p>`;
      const drafts = history.drafts.slice().sort((a, b) => Number(b.season) - Number(a.season) || a.rounds - b.rounds);
      if (!drafts.length) return `${select}</div><p class="empty muted">No completed drafts in this league yet.</p>`;
      const draft = drafts.find((draft) => draft.id === draftsState.draftId) || drafts[0];
      const options = drafts.map((listedDraft) => `<option value="${escapeHtml(listedDraft.id)}"${listedDraft.id === draft.id ? ' selected' : ''}>${escapeHtml(listedDraft.season)} ${listedDraft.rounds > 10 ? 'startup' : 'rookie'} draft · ${listedDraft.rounds} rounds</option>`).join('');
      return `${select}<select id="mv-draft" aria-label="Draft">${options}</select></div>${colourToggle()}${board(league, draft)}`;
    }

    const colourToggle = () => `<div class="tabs mv-goals dv-colour" role="group" aria-label="Colour the board by">
      ${[['slot', 'vs pick chart', 'How far each pick is from what its slot was worth'], ['value', 'Player value', 'How much each player is worth now, whatever the slot']]
        .map(([mode, label, title]) => `<button type="button" class="tab${draftsState.color === mode ? ' on' : ''}" data-dcolor="${mode}" title="${title}">${label}</button>`).join('')}</div>`;

    function click(event) {
      const button = event.target.closest('[data-dcolor]');
      if (!button) return false;
      draftsState.color = button.dataset.dcolor;
      render();
      return true;
    }

    function change(event) {
      if (event.target.id === 'mv-draft') { draftsState.draftId = event.target.value; render(); return true; }
      if (event.target.id !== 'mv-league') return false;
      state.finder.leagueId = event.target.value;
      draftsState.draftId = null;
      const league = currentLeague();
      if (league && !league.history) ensureHistory(league).then(() => active() && render());
      render();
      return true;
    }

    return { pane, change, click };
  }

  NightOwl.movesDrafts = { create };
})(globalThis.NightOwl);
