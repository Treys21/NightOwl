// A league's drafts, read and graded. Pure: no DOM, no network.
//
//   rookieDraft   which of a season's drafts the league's traded picks were for
//   index         every pick by season, round and the roster it originally belonged to,
//                 so a traded "2025 round 1 pick" resolves to the player taken with it
//   board         the draft as a grid (rounds down, draft slots across), each pick
//                 priced now against what the picks around it returned
//   teamGrades    how each team's picks did, as a letter
//
// A pick is graded against its neighbours in the same draft, not against a price
// list: Keeptradecut stops pricing a draft once it is made, and the picks around
// a selection (a couple above, a couple below) are the fair yardstick for what
// that slot should have returned. The value is today's, so older drafts carry hindsight.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const NEIGHBOURS = 2; // picks either side that set what a slot is "expected" to return
  const FLOOR = 800; // expected value never counts below this, so a late pick that beats nothing isn't an infinite win

  /**
   * The draft a season's traded picks belong to. A league can hold a startup
   * draft and a rookie draft in one season; the rookie draft is the short one.
   * drafts: [{ season, rounds, ... }] -> the one draft for that season, or null
   */
  function rookieDraft(drafts, season) {
    const of = (drafts || []).filter((d) => String(d.season) === String(season));
    return of.sort((a, b) => a.rounds - b.rounds)[0] || null;
  }

  /** The roster a pick originally belonged to: the owner of its draft slot (the roster that made it, when the slot map is missing). */
  const originalOf = (draft, pick) => (draft.slotToRoster && draft.slotToRoster[pick.slot]) || pick.by;

  /**
   * Every pick of the league's drafts, keyed `${season}:${round}:${original roster}`.
   * -> Map key -> { pid, no, round, slot, by, from, season }
   */
  function index(drafts) {
    const seasons = [...new Set((drafts || []).map((d) => String(d.season)))];
    const out = new Map();
    for (const season of seasons) {
      const draft = rookieDraft(drafts, season);
      for (const p of draft.picks) {
        const from = originalOf(draft, p);
        out.set(`${season}:${p.round}:${from}`, { pid: p.pid, no: p.no, round: p.round, slot: p.slot, by: p.by, from, season });
      }
    }
    return out;
  }

  /** The player taken with a traded pick ({ season, round, from }), or null (not drafted yet, or the draft is unknown). */
  const resolve = (idx, pick) => idx.get(`${pick.season}:${pick.round}:${pick.from}`) || null;

  /** What each overall pick should have returned: the mean of the picks around it (not counting itself). */
  function expected(values) {
    return values.map((_, k) => {
      const near = [];
      for (let j = Math.max(0, k - NEIGHBOURS); j <= Math.min(values.length - 1, k + NEIGHBOURS); j++) if (j !== k) near.push(values[j]);
      return near.length ? near.reduce((a, b) => a + b, 0) / near.length : 0;
    });
  }

  /**
   * One draft as a grid.
   *   draft     { rounds, teams, slotToRoster, picks: [{ no, round, slot, by, pid }] }
   *   valueOf   pid -> value now (0 when the market has none)
   * -> { rounds, teams, rows: [[cell per slot]], picks: [cell], byRoster: { rosterId: { value, expected, score } } }
   *    cell { no, round, slot, pid, by, from, traded, value, expected, score, label }
   *    score: value over expected as a share of expected: 0 is as expected, +0.5 is 50% better
   */
  function board(draft, valueOf) {
    const picks = draft.picks.slice().sort((a, b) => a.no - b.no);
    const values = picks.map((p) => valueOf(p.pid));
    const exp = expected(values);
    const teams = draft.teams || Math.max(...picks.map((p) => p.slot), 1);
    const cells = picks.map((p, k) => {
      const from = originalOf(draft, p);
      return {
        no: p.no, round: p.round, slot: p.slot, pid: p.pid, by: p.by, from, traded: p.by !== from,
        value: values[k], expected: Math.round(exp[k]),
        score: (values[k] - exp[k]) / Math.max(exp[k], FLOOR),
        label: `${p.round}.${String(((p.no - 1) % teams) + 1).padStart(2, '0')}`
      };
    });
    const rows = [];
    for (const c of cells) {
      (rows[c.round - 1] = rows[c.round - 1] || new Array(teams).fill(null))[c.slot - 1] = c;
    }
    const byRoster = {};
    for (const c of cells) {
      const t = (byRoster[c.by] = byRoster[c.by] || { value: 0, expected: 0, picks: 0 });
      t.value += c.value;
      t.expected += c.expected;
      t.picks++;
    }
    for (const t of Object.values(byRoster)) t.score = (t.value - t.expected) / Math.max(t.expected, FLOOR);
    return { rounds: rows.length, teams, rows, picks: cells, byRoster };
  }

  NightOwl.tradeDrafts = { rookieDraft, index, resolve, expected, board, NEIGHBOURS };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.tradeDrafts;
