// A league's drafts, read and graded. Pure: no DOM, no network.
//
//   rookieDraft   which of a season's drafts the league's traded picks were for
//   index         every pick by season, round and the roster it originally belonged to,
//                 so a traded "2025 round 1 pick" resolves to the player taken with it
//   board         the draft as a grid (rounds down, draft slots across), each pick
//                 priced now against what the picks around it returned
//   teamGrades    how each team's picks did, as a letter
//
// A pick is graded against what the pick chart said its slot was worth (KeepTradeCut's
// early, mid and late values for the round); where the chart has no such pick (rounds
// past the fourth, redraft leagues) the picks around it in the same draft stand in.
// A team is graded on the total value it gained over the chart: a fourth-round pick
// that grew into a 5,000-value player outweighs a first-rounder who only met his slot.
// Values are today's, so older drafts carry hindsight.
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
        const teams = draft.teams || Math.max(...draft.picks.map((q) => q.slot), 1);
        out.set(`${season}:${p.round}:${from}`, { pid: p.pid, no: p.no, round: p.round, slot: p.slot, by: p.by, from, season, teams, pos: ((p.no - 1) % teams) + 1 });
      }
    }
    return out;
  }

  /** The player taken with a traded pick ({ season, round, from }), or null (not drafted yet, or the draft is unknown). */
  const resolve = (idx, pick) => idx.get(`${pick.season}:${pick.round}:${pick.from}`) || null;

  /**
   * Follow every traded pick through the league's trades and say who it was worth what to. A pick can change
   * hands several times before its draft: only the manager who still held it at the draft used it (and made
   * the pick). In the trade that put it with him it is worth the player he took; in every earlier trade the
   * holder passed it on, so it was worth its slot (`passed`, with `pos` and `teams` for the pick chart).
   * Marks each pick object of a trade, both sides alike: `player` (the pid taken), or `passed` with `pos` and `teams`.
   *   trades   history.parse() rows ({ at, sides: { rid: { gotPicks, gavePicks } } }), any order
   *   idx      index() of the league's drafts
   */
  function settle(trades, idx) {
    const keyOf = (p) => `${p.season}:${p.round}:${p.from}`;
    const ordered = (trades || []).slice().sort((a, b) => a.at - b.at);
    const gives = new Map(); // pick -> who gave it away, and when
    for (const t of ordered) {
      for (const [rid, side] of Object.entries(t.sides)) {
        for (const p of side.gavePicks) {
          if (!gives.has(keyOf(p))) gives.set(keyOf(p), []);
          gives.get(keyOf(p)).push({ rid, at: t.at });
        }
      }
    }
    for (const t of ordered) {
      const verdict = new Map(); // pick -> what it was worth in this trade
      for (const [rid, side] of Object.entries(t.sides)) {
        for (const p of side.gotPicks) {
          const hit = idx.get(keyOf(p));
          if (!hit) continue;
          const passedOn = (gives.get(keyOf(p)) || []).some((g) => g.rid === rid && g.at > t.at);
          verdict.set(keyOf(p), !passedOn && String(hit.by) === String(rid) ? { player: hit.pid } : { passed: true, pos: hit.pos, teams: hit.teams });
        }
      }
      for (const side of Object.values(t.sides)) {
        for (const p of side.gotPicks.concat(side.gavePicks)) {
          const v = verdict.get(keyOf(p));
          if (v) { delete p.player; delete p.passed; Object.assign(p, v); }
        }
      }
    }
  }

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
   *   baselineOf   ({ round, slot, teams }) -> what the chart says the slot was worth (0 or omitted: use the neighbours)
   * -> { rounds, teams, rows: [[cell per slot]], picks: [cell], byRoster: { rosterId: { value, expected, score } } }
   *    cell { no, round, slot, pid, by, from, traded, value, expected, score, label }
   *    score: value over expected as a share of expected: 0 is as expected, +0.5 is 50% better
   */
  function board(draft, valueOf, baselineOf = null) {
    const picks = draft.picks.slice().sort((a, b) => a.no - b.no);
    const values = picks.map((p) => valueOf(p.pid));
    const teams = draft.teams || Math.max(...picks.map((p) => p.slot), 1);
    const around = expected(values);
    const exp = picks.map((p, k) => (baselineOf && baselineOf({ round: p.round, slot: ((p.no - 1) % teams) + 1, teams })) || around[k]);
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
    const average = cells.reduce((sum, c) => sum + c.expected, 0) / teams; // what a team's own picks are worth on average
    return { rounds: rows.length, teams, rows, picks: cells, byRoster, average };
  }

  /**
   * Each team's draft after its trades. A team that moved up for a pick paid for it, and one that sold a
   * pick was paid, so a draft is graded on what the team ended up with, not on the picks it happened to use:
   *   result   the players taken with the picks it used, plus what it got in the trades that moved this draft's
   *            picks less what it gave (players and other years' picks, at today's value)
   *   baseline what the slots it started with were expected to return
   * Teams are ranked on total value gained (a hit in the fourth round counts for its full growth); one that sold a pick is not blamed or credited for how
   * that pick turned out, only for the price; one that bought is graded on the player against what it paid.
   *   trades      the league's parsed trades (history.parse)
   *   assetValue  ({ pid } | { pick }) -> value now
   * -> { [rosterId]: { value, expected, picks, trades, baseline, gain, score } }
   *    gain: total value over the chart, picks and trades together; score: gain as a share of a team's average baseline
   */
  function afterTrades(b, draft, trades, assetValue) {
    const season = String(draft.season);
    const thisDraft = (p) => String(p.season) === season;
    const moved = {};
    for (const trade of trades || []) {
      const sides = Object.entries(trade.sides);
      if (!sides.some(([, side]) => side.gotPicks.concat(side.gavePicks).some(thisDraft))) continue;
      for (const [rid, side] of sides) {
        const worth = (list) => list.reduce((sum, a) => sum + assetValue(a), 0);
        const got = side.got.map((pid) => ({ pid })).concat(side.gotPicks.filter((p) => !thisDraft(p)).map((pick) => ({ pick })));
        const gave = side.gave.map((pid) => ({ pid })).concat(side.gavePicks.filter((p) => !thisDraft(p)).map((pick) => ({ pick })));
        moved[rid] = (moved[rid] || 0) + worth(got) - worth(gave);
      }
    }
    const baseline = {};
    for (const c of b.picks) baseline[c.from] = (baseline[c.from] || 0) + c.expected;
    const out = {};
    const rids = new Set([...Object.keys(b.byRoster), ...Object.keys(baseline), ...Object.keys(moved)]);
    for (const rid of rids) {
      const t = b.byRoster[rid] || { value: 0, expected: 0, picks: 0 };
      const base = baseline[rid] || 0;
      const trade = moved[rid] || 0;
      out[rid] = {
        value: t.value, expected: t.expected, picks: t.picks, trades: Math.round(trade), baseline: Math.round(base),
        gain: Math.round(t.value + trade - base),
        score: (t.value + trade - base) / Math.max(b.average, FLOOR)
      };
    }
    return out;
  }

  NightOwl.tradeDrafts = { rookieDraft, index, resolve, settle, expected, board, afterTrades, NEIGHBOURS };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.tradeDrafts;
