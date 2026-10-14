globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, tradeDrafts, tradeHistory, ktc } = NightOwl;
  const { escape: escapeHtml } = NightOwl.format;

  const GRADE_SCALE = 0.5;
  const TEAM_NAME_MAX = 12;

  function create(deps) {
    const { state, V, league: currentLeague, render, active, ensureHistory } = deps;
    const ds = state.drafts;

    function valueFn(league) {
      if (V.usesKtc(league)) return (playerId) => V.dynastyValue(league, playerId);
      if (V.consensus(league)) return (playerId) => V.redraftValue(league, playerId);
      return null;
    }

    const NEAR = 0.15;
    const colour = (score) => {
      const m = Math.max(0, Math.min(1, (Math.abs(score) - NEAR) / (1 - NEAR)));
      const alpha = (0.04 + 0.8 * Math.pow(m, 0.75)).toFixed(2);
      return score >= 0 ? `rgba(0, 206, 184, ${alpha})` : `rgba(247, 92, 141, ${alpha})`;
    };
    const absoluteScore = (value, mid, top) => (value >= mid ? (top > mid ? (value - mid) / (top - mid) : 0) : (value - mid) / Math.max(mid, 1));
    const pctText = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.round(Math.abs(n) * 100)}%`;

    function teamName(league, rosterId) {
      const roster = league.raw.rosters.find((r) => r.roster_id === rosterId);
      const name = roster ? ((roster.owner_id && league.names.get(roster.owner_id)) || `Team ${rosterId}`) : `Team ${rosterId}`;
      return roster && roster.roster_id === league.mine.roster_id ? 'You' : name;
    }
    const short = (text) => (text.length > TEAM_NAME_MAX ? `${text.slice(0, TEAM_NAME_MAX - 1)}…` : text);

    function cell(league, draft, c, scoreOf) {
      if (!c) return '<div class="dv-cell empty"></div>';
      const p = players.info(c.pid);
      const last = (p.name || c.pid).split(' ').slice(-1)[0];
      const tip = `${p.name} (${p.pos || '?'}${p.team ? `, ${p.team}` : ''}) · pick ${c.no} (${c.label}), made by ${teamName(league, c.by)}${c.traded ? `, traded from ${teamName(league, c.from)}` : ''}\nWorth ${V.worth(c.value)} now; the picks around it returned ${V.worth(c.expected)} (${pctText(c.score)})`;
      const shown = scoreOf(c);
      const kind = Math.abs(shown) < NEAR ? ' near' : '';
      return `<div class="dv-cell${kind}" style="background:${colour(shown)}" title="${escapeHtml(tip)}">
        <span class="dv-no">${c.label}${c.traded ? ' <b title="Traded pick">↔</b>' : ''}</span>
        <span class="dv-name">${escapeHtml(last)}</span>
        <span class="dv-pos">${escapeHtml(p.pos || '')}</span>
        <span class="dv-val">${c.value ? V.worth(c.value) : '–'}</span>
      </div>`;
    }

    function board(league, draft) {
      const value = valueFn(league);
      if (!value) return '<p class="empty muted">Draft grades need KeepTradeCut values, which are not loaded.</p>';
      const chart = V.usesKtc(league) && state.ktc && state.ktc.picks;
      const b = tradeDrafts.board(draft, value, chart ? ({ round, slot, teams }) => ktc.pickBaseline(chart, { round, slot, teams, superflex: league.superflex }) : null);
      const slots = Array.from({ length: b.teams }, (_, i) => i + 1);
      const sorted = b.picks.map((c) => c.value).sort((x, y) => x - y);
      const mid = sorted[Math.floor(sorted.length / 2)] || 0;
      const top = sorted[sorted.length - 1] || 0;
      const scoreOf = ds.color === 'value' ? (c) => absoluteScore(c.value, mid, top) : (c) => (c.score < 0 ? c.score * c.weight : c.score);
      const head = slots.map((s) => `<div class="dv-head" title="${escapeHtml(teamName(league, draft.slotToRoster ? draft.slotToRoster[s] : s))}">${escapeHtml(short(teamName(league, draft.slotToRoster ? draft.slotToRoster[s] : s)))}</div>`).join('');
      const rows = b.rows.map((row, r) => `<div class="dv-round">${r + 1}</div>${slots.map((s) => cell(league, draft, row[s - 1], scoreOf)).join('')}`).join('');
      const worthOf = (a) => (a.pick ? V.pickAsset(league, a.pick) : value(a.pid));
      const net = tradeDrafts.afterTrades(b, draft, (league.history.graded || []).map((g) => g.trade), worthOf);
      const grades = Object.entries(net)
        .map(([rosterId, t]) => ({ rid: Number(rosterId), t, letter: tradeHistory.letterFor(t.score * GRADE_SCALE) }))
        .sort((x, y) => y.t.score - x.t.score);
      const signed = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${V.worth(Math.abs(n))}`;
      const table = `<table class="mv-table mv-managers"><thead><tr><th>Team</th><th>Grade</th><th title="Value now of the players taken with the picks the team used">Picks</th><th title="Value now of what the team got in trades that moved this draft's picks, less what it gave">Trades</th><th title="Total value gained over what the pick chart said the team's own slots were worth, picks and trades together">Gain</th></tr></thead><tbody>
        ${grades.map((g) => `<tr class="${g.rid === league.mine.roster_id ? 'me' : ''}"><td>${escapeHtml(teamName(league, g.rid))}</td><td class="num"><span class="mv-grade g-${tradeHistory.toneOf(g.letter)}">${g.letter}</span></td><td class="num">${V.worth(g.t.value)}</td><td class="num ${g.t.trades > 0 ? 'up' : g.t.trades < 0 ? 'down' : ''}">${g.t.trades ? signed(g.t.trades) : '–'}</td><td class="num ${g.t.gain > 0 ? 'up' : g.t.gain < 0 ? 'down' : ''}">${g.t.gain ? signed(g.t.gain) : '–'}</td></tr>`).join('')}
      </tbody></table>`;
      return `<div class="dv-wrap"><div class="dv-grid" style="--teams:${b.teams}"><div class="dv-corner"></div>${head}${rows}</div></div>
        <p class="muted small mv-note dv-legend" title="Values are today's, so older drafts carry hindsight. Team grades include what was paid or received in pick trades."><i class="dv-key up"></i> ${ds.color === 'value' ? 'worth the most' : 'beat its slot'} <i class="dv-key down"></i> ${ds.color === 'value' ? 'worth little' : 'fell short'} · ↔ traded pick</p>
        ${table}`;
    }

    function pane() {
      const league = currentLeague();
      if (!league) return '<p class="empty muted">No league with a regular season left to play.</p>';
      const select = `<div class="mv-selects"><select id="mv-league" aria-label="League">${state.leagues.map((l) => `<option value="${escapeHtml(l.leagueId)}"${l.leagueId === league.leagueId ? ' selected' : ''}>${escapeHtml(l.name)}</option>`).join('')}</select>`;
      const h = league.history;
      if (!h) return `${select}</div><div class="skel" role="status"><i></i><i></i></div><p class="muted small mv-note">Reading this league's drafts…</p>`;
      const drafts = h.drafts.slice().sort((a, b) => Number(b.season) - Number(a.season) || a.rounds - b.rounds);
      if (!drafts.length) return `${select}</div><p class="empty muted">No completed drafts in this league yet.</p>`;
      const draft = drafts.find((d) => d.id === ds.draftId) || drafts[0];
      const options = drafts.map((d) => `<option value="${escapeHtml(d.id)}"${d.id === draft.id ? ' selected' : ''}>${escapeHtml(d.season)} ${d.rounds > 10 ? 'startup' : 'rookie'} draft · ${d.rounds} rounds</option>`).join('');
      return `${select}<select id="mv-draft" aria-label="Draft">${options}</select></div>${colourToggle()}${board(league, draft)}`;
    }

    const colourToggle = () => `<div class="tabs mv-goals dv-colour" role="group" aria-label="Colour the board by">
      ${[['slot', 'vs pick chart', 'How far each pick is from what its slot was worth'], ['value', 'Player value', 'How much each player is worth now, whatever the slot']]
        .map(([id, label, title]) => `<button type="button" class="tab${ds.color === id ? ' on' : ''}" data-dcolor="${id}" title="${title}">${label}</button>`).join('')}</div>`;

    function click(e) {
      const button = e.target.closest('[data-dcolor]');
      if (!button) return false;
      ds.color = button.dataset.dcolor;
      render();
      return true;
    }

    function change(e) {
      if (e.target.id === 'mv-draft') { ds.draftId = e.target.value; render(); return true; }
      if (e.target.id !== 'mv-league') return false;
      state.finder.leagueId = e.target.value;
      ds.draftId = null;
      const league = currentLeague();
      if (league && !league.history) ensureHistory(league).then(() => active() && render());
      render();
      return true;
    }

    return { pane, change, click };
  }

  NightOwl.movesDrafts = { create };
})(globalThis.NightOwl);
