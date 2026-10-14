// The drafts pane of the Moves tool: each of the league's drafts as a board
// (rounds down, draft slots across), every pick coloured by how it has turned
// out against the picks around it, and a grade for each team's draft.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, tradeDrafts, tradeHistory, ktc } = NightOwl;
  const { escape: esc } = NightOwl.format;

  // A draft's team score runs about half as wide as a trade's, so it is scaled before it becomes a letter.
  const GRADE_SCALE = 0.5;
  const TEAM_NAME_MAX = 12;

  /** deps: { state, V, league(), render, active(), ensureHistory(lg) } */
  function create(deps) {
    const { state, V, league, render, active, ensureHistory } = deps;
    const ds = state.drafts;

    /** What a drafted player is worth now in this league: dynasty value, or the redraft consensus. Null when no market is loaded. */
    function valueFn(lg) {
      if (V.usesKtc(lg)) return (pid) => V.dynastyValue(lg, pid);
      if (V.consensus(lg)) return (pid) => V.redraftValue(lg, pid);
      return null;
    }

    // Colour is the only signal: a pick near what was expected fades back, and past ±15% the colour comes in,
    // full by ±100%, so the steals and busts are what the eye finds. A late pick's shortfall is shown at the
    // weight it counts for in the grade (see tradeDrafts.board), so a bust in round 10 doesn't shout.
    const NEAR = 0.15;
    const colour = (score) => {
      const m = Math.max(0, Math.min(1, (Math.abs(score) - NEAR) / (1 - NEAR)));
      const alpha = (0.04 + 0.8 * Math.pow(m, 0.75)).toFixed(2);
      return score >= 0 ? `rgba(0, 206, 184, ${alpha})` : `rgba(247, 92, 141, ${alpha})`;
    };
    // How good the player is, whatever the slot: red at nothing, green at the draft's best, neutral at the middle.
    const absoluteScore = (value, mid, top) => (value >= mid ? (top > mid ? (value - mid) / (top - mid) : 0) : (value - mid) / Math.max(mid, 1));
    const pctText = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.round(Math.abs(n) * 100)}%`;

    function teamName(lg, rosterId) {
      const ro = lg.raw.rosters.find((r) => r.roster_id === rosterId);
      const name = ro ? ((ro.owner_id && lg.names.get(ro.owner_id)) || `Team ${rosterId}`) : `Team ${rosterId}`;
      return ro && ro.roster_id === lg.mine.roster_id ? 'You' : name;
    }
    const short = (text) => (text.length > TEAM_NAME_MAX ? `${text.slice(0, TEAM_NAME_MAX - 1)}…` : text);

    function cell(lg, draft, c, scoreOf) {
      if (!c) return '<div class="dv-cell empty"></div>';
      const p = players.info(c.pid);
      const last = (p.name || c.pid).split(' ').slice(-1)[0];
      const tip = `${p.name} (${p.pos || '?'}${p.team ? `, ${p.team}` : ''}) · pick ${c.no} (${c.label}), made by ${teamName(lg, c.by)}${c.traded ? `, traded from ${teamName(lg, c.from)}` : ''}\nWorth ${V.worth(c.value)} now; the picks around it returned ${V.worth(c.expected)} (${pctText(c.score)})`;
      const shown = scoreOf(c);
      const kind = Math.abs(shown) < NEAR ? ' near' : '';
      return `<div class="dv-cell${kind}" style="background:${colour(shown)}" title="${esc(tip)}">
        <span class="dv-no">${c.label}${c.traded ? ' <b title="Traded pick">↔</b>' : ''}</span>
        <span class="dv-name">${esc(last)}</span>
        <span class="dv-pos">${esc(p.pos || '')}</span>
        <span class="dv-val">${c.value ? V.worth(c.value) : '–'}</span>
      </div>`;
    }

    function board(lg, draft) {
      const value = valueFn(lg);
      if (!value) return '<p class="empty muted">Draft grades need KeepTradeCut values, which are not loaded.</p>';
      // The pick chart sets what each slot was worth (dynasty); without it the picks around each one do.
      const chart = V.usesKtc(lg) && state.ktc && state.ktc.picks;
      const b = tradeDrafts.board(draft, value, chart ? ({ round, slot, teams }) => ktc.pickBaseline(chart, { round, slot, teams, superflex: lg.superflex }) : null);
      const slots = Array.from({ length: b.teams }, (_, i) => i + 1);
      const sorted = b.picks.map((c) => c.value).sort((x, y) => x - y);
      const mid = sorted[Math.floor(sorted.length / 2)] || 0;
      const top = sorted[sorted.length - 1] || 0;
      // vs the pick chart: how far each pick is from its slot, shortfalls at the weight they count for; or the player's value alone.
      const scoreOf = ds.color === 'value' ? (c) => absoluteScore(c.value, mid, top) : (c) => (c.score < 0 ? c.score * c.weight : c.score);
      const head = slots.map((s) => `<div class="dv-head" title="${esc(teamName(lg, draft.slotToRoster ? draft.slotToRoster[s] : s))}">${esc(short(teamName(lg, draft.slotToRoster ? draft.slotToRoster[s] : s)))}</div>`).join('');
      const rows = b.rows.map((row, r) => `<div class="dv-round">${r + 1}</div>${slots.map((s) => cell(lg, draft, row[s - 1], scoreOf)).join('')}`).join('');
      // Graded after trades: a team that bought a pick paid for it, one that sold a pick was paid.
      const worthOf = (a) => (a.pick ? V.pickAsset(lg, a.pick) : value(a.pid));
      const net = tradeDrafts.afterTrades(b, draft, (lg.history.graded || []).map((g) => g.trade), worthOf);
      const grades = Object.entries(net)
        .map(([rid, t]) => ({ rid: Number(rid), t, letter: tradeHistory.letterFor(t.score * GRADE_SCALE) }))
        .sort((x, y) => y.t.score - x.t.score);
      const signed = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${V.worth(Math.abs(n))}`;
      const table = `<table class="mv-table mv-managers"><thead><tr><th>Team</th><th>Grade</th><th title="Value now of the players taken with the picks the team used">Picks</th><th title="Value now of what the team got in trades that moved this draft's picks, less what it gave">Trades</th><th title="Total value gained over what the pick chart said the team's own slots were worth, picks and trades together">Gain</th></tr></thead><tbody>
        ${grades.map((g) => `<tr class="${g.rid === lg.mine.roster_id ? 'me' : ''}"><td>${esc(teamName(lg, g.rid))}</td><td class="num"><span class="mv-grade g-${tradeHistory.toneOf(g.letter)}">${g.letter}</span></td><td class="num">${V.worth(g.t.value)}</td><td class="num ${g.t.trades > 0 ? 'up' : g.t.trades < 0 ? 'down' : ''}">${g.t.trades ? signed(g.t.trades) : '–'}</td><td class="num ${g.t.gain > 0 ? 'up' : g.t.gain < 0 ? 'down' : ''}">${g.t.gain ? signed(g.t.gain) : '–'}</td></tr>`).join('')}
      </tbody></table>`;
      return `<div class="dv-wrap"><div class="dv-grid" style="--teams:${b.teams}"><div class="dv-corner"></div>${head}${rows}</div></div>
        <p class="muted small mv-note dv-legend" title="Values are today's, so older drafts carry hindsight. Team grades include what was paid or received in pick trades."><i class="dv-key up"></i> ${ds.color === 'value' ? 'worth the most' : 'beat its slot'} <i class="dv-key down"></i> ${ds.color === 'value' ? 'worth little' : 'fell short'} · ↔ traded pick</p>
        ${table}`;
    }

    // ---- markup ----------------------------------------------------------

    function pane() {
      const lg = league();
      if (!lg) return '<p class="empty muted">No league with a regular season left to play.</p>';
      const select = `<div class="mv-selects"><select id="mv-league" aria-label="League">${state.leagues.map((l) => `<option value="${esc(l.leagueId)}"${l.leagueId === lg.leagueId ? ' selected' : ''}>${esc(l.name)}</option>`).join('')}</select>`;
      const h = lg.history;
      if (!h) return `${select}</div><div class="skel" role="status"><i></i><i></i></div><p class="muted small mv-note">Reading this league's drafts…</p>`;
      const drafts = h.drafts.slice().sort((a, b) => Number(b.season) - Number(a.season) || a.rounds - b.rounds);
      if (!drafts.length) return `${select}</div><p class="empty muted">No completed drafts in this league yet.</p>`;
      const draft = drafts.find((d) => d.id === ds.draftId) || drafts[0];
      const options = drafts.map((d) => `<option value="${esc(d.id)}"${d.id === draft.id ? ' selected' : ''}>${esc(d.season)} ${d.rounds > 10 ? 'startup' : 'rookie'} draft · ${d.rounds} rounds</option>`).join('');
      return `${select}<select id="mv-draft" aria-label="Draft">${options}</select></div>${colourToggle()}${board(lg, draft)}`;
    }

    const colourToggle = () => `<div class="tabs mv-goals dv-colour" role="group" aria-label="Colour the board by">
      ${[['slot', 'vs pick chart', 'How far each pick is from what its slot was worth'], ['value', 'Player value', 'How much each player is worth now, whatever the slot']]
        .map(([id, label, title]) => `<button type="button" class="tab${ds.color === id ? ' on' : ''}" data-dcolor="${id}" title="${title}">${label}</button>`).join('')}</div>`;

    function click(e) {
      const btn = e.target.closest('[data-dcolor]');
      if (!btn) return false;
      ds.color = btn.dataset.dcolor;
      render();
      return true;
    }

    function change(e) {
      if (e.target.id === 'mv-draft') { ds.draftId = e.target.value; render(); return true; }
      if (e.target.id !== 'mv-league') return false;
      state.finder.leagueId = e.target.value;
      ds.draftId = null;
      const lg = league();
      if (lg && !lg.history) ensureHistory(lg).then(() => active() && render());
      render();
      return true;
    }

    return { pane, change, click };
  }

  NightOwl.movesDrafts = { create };
})(globalThis.NightOwl);
