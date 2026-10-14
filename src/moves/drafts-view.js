// The drafts pane of the Moves tool: each of the league's drafts as a board
// (rounds down, draft slots across), every pick coloured by how it has turned
// out against the picks around it, and a grade for each team's draft.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { players, tradeDrafts, tradeHistory } = NightOwl;
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

    const colour = (score) => {
      const s = Math.max(-1, Math.min(1, score));
      return s >= 0 ? `rgba(0, 206, 184, ${(0.08 + 0.5 * s).toFixed(2)})` : `rgba(247, 92, 141, ${(0.08 - 0.5 * s).toFixed(2)})`;
    };
    const pctText = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.round(Math.abs(n) * 100)}%`;

    function teamName(lg, rosterId) {
      const ro = lg.raw.rosters.find((r) => r.roster_id === rosterId);
      const name = ro ? ((ro.owner_id && lg.names.get(ro.owner_id)) || `Team ${rosterId}`) : `Team ${rosterId}`;
      return ro && ro.roster_id === lg.mine.roster_id ? 'You' : name;
    }
    const short = (text) => (text.length > TEAM_NAME_MAX ? `${text.slice(0, TEAM_NAME_MAX - 1)}…` : text);

    function cell(lg, draft, c) {
      if (!c) return '<div class="dv-cell empty"></div>';
      const p = players.info(c.pid);
      const last = (p.name || c.pid).split(' ').slice(-1)[0];
      const tip = `${p.name} (${p.pos || '?'}${p.team ? `, ${p.team}` : ''}) · pick ${c.no} (${c.label}), made by ${teamName(lg, c.by)}${c.traded ? `, traded from ${teamName(lg, c.from)}` : ''}\nWorth ${V.worth(c.value)} now; the picks around it returned ${V.worth(c.expected)} (${pctText(c.score)})`;
      return `<div class="dv-cell" style="background:${colour(c.score)}" title="${esc(tip)}">
        <span class="dv-no">${c.label}${c.traded ? ' <b title="Traded pick">↔</b>' : ''}</span>
        <span class="dv-name">${esc(last)}</span>
        <span class="dv-pos">${esc(p.pos || '')}</span>
        <span class="dv-val">${c.value ? V.worth(c.value) : '–'}</span>
      </div>`;
    }

    function board(lg, draft) {
      const value = valueFn(lg);
      if (!value) return '<p class="empty muted">Draft grades need KeepTradeCut values, which are not loaded.</p>';
      const b = tradeDrafts.board(draft, value);
      const slots = Array.from({ length: b.teams }, (_, i) => i + 1);
      const head = slots.map((s) => `<div class="dv-head" title="${esc(teamName(lg, draft.slotToRoster ? draft.slotToRoster[s] : s))}">${esc(short(teamName(lg, draft.slotToRoster ? draft.slotToRoster[s] : s)))}</div>`).join('');
      const rows = b.rows.map((row, r) => `<div class="dv-round">${r + 1}</div>${slots.map((s) => cell(lg, draft, row[s - 1])).join('')}`).join('');
      const grades = Object.entries(b.byRoster)
        .map(([rid, t]) => ({ rid: Number(rid), t, letter: tradeHistory.letterFor(t.score * GRADE_SCALE) }))
        .sort((x, y) => y.t.score - x.t.score);
      const table = `<table class="mv-table mv-managers"><thead><tr><th>Team</th><th>Grade</th><th title="Value of the players taken, now">Value</th><th title="Against the picks around each of theirs">vs expected</th></tr></thead><tbody>
        ${grades.map((g) => `<tr class="${g.rid === lg.mine.roster_id ? 'me' : ''}"><td>${esc(teamName(lg, g.rid))}</td><td class="num"><span class="mv-grade g-${tradeHistory.toneOf(g.letter)}">${g.letter}</span></td><td class="num">${V.worth(g.t.value)}</td><td class="num ${g.t.score > 0.03 ? 'up' : g.t.score < -0.03 ? 'down' : ''}">${pctText(g.t.score)}</td></tr>`).join('')}
      </tbody></table>`;
      return `<div class="dv-wrap"><div class="dv-grid" style="--teams:${b.teams}"><div class="dv-corner"></div>${head}${rows}</div></div>
        <p class="muted small mv-note dv-legend"><i class="dv-key up"></i> beat the picks around it <i class="dv-key down"></i> fell short · values are today's, so older drafts carry hindsight · ↔ traded pick</p>
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
      return `${select}<select id="mv-draft" aria-label="Draft">${options}</select></div>${board(lg, draft)}`;
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

    return { pane, change };
  }

  NightOwl.movesDrafts = { create };
})(globalThis.NightOwl);
