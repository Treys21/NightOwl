globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const NEIGHBOURS = 2;
  const MIN_WEIGHT = 0.25;
  const FLOOR = 800;

  function rookieDraft(drafts, season) {
    const of = (drafts || []).filter((d) => String(d.season) === String(season));
    return of.sort((a, b) => a.rounds - b.rounds)[0] || null;
  }

  const originalOf = (draft, pick) => (draft.slotToRoster && draft.slotToRoster[pick.slot]) || pick.by;

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

  const resolve = (idx, pick) => idx.get(`${pick.season}:${pick.round}:${pick.from}`) || null;

  function settle(trades, idx) {
    const keyOf = (p) => `${p.season}:${p.round}:${p.from}`;
    const ordered = (trades || []).slice().sort((a, b) => a.at - b.at);
    const gives = new Map();
    for (const t of ordered) {
      for (const [rosterId, side] of Object.entries(t.sides)) {
        for (const p of side.gavePicks) {
          if (!gives.has(keyOf(p))) gives.set(keyOf(p), []);
          gives.get(keyOf(p)).push({ rid: rosterId, at: t.at });
        }
      }
    }
    for (const t of ordered) {
      const verdict = new Map();
      for (const [rosterId, side] of Object.entries(t.sides)) {
        for (const p of side.gotPicks) {
          const hit = idx.get(keyOf(p));
          if (!hit) continue;
          const passedOn = (gives.get(keyOf(p)) || []).some((g) => g.rid === rosterId && g.at > t.at);
          verdict.set(keyOf(p), !passedOn && String(hit.by) === String(rosterId) ? { player: hit.pid } : { passed: true, pos: hit.pos, teams: hit.teams });
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

  function expected(values) {
    return values.map((_, k) => {
      const near = [];
      for (let j = Math.max(0, k - NEIGHBOURS); j <= Math.min(values.length - 1, k + NEIGHBOURS); j++) if (j !== k) near.push(values[j]);
      return near.length ? near.reduce((a, b) => a + b, 0) / near.length : 0;
    });
  }

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
    const lead = cells.slice(0, Math.max(1, Math.ceil(cells.length / 4)));
    const reference = lead.reduce((sum, c) => sum + c.expected, 0) / lead.length;
    const weigh = (c) => Math.max(MIN_WEIGHT, Math.min(1, Math.max(c.expected, c.value) / Math.max(reference, FLOOR)));
    for (const c of cells) {
      c.weight = weigh(c);
      c.excess = c.value >= c.expected ? c.value - c.expected : (c.value - c.expected) * c.weight;
    }
    const byRoster = {};
    for (const c of cells) {
      const t = (byRoster[c.by] = byRoster[c.by] || { value: 0, expected: 0, picks: 0, excess: 0 });
      t.value += c.value;
      t.expected += c.expected;
      t.excess += c.excess;
      t.picks++;
    }
    for (const t of Object.values(byRoster)) t.score = (t.value - t.expected) / Math.max(t.expected, FLOOR);
    const average = cells.reduce((sum, c) => sum + c.expected, 0) / teams;
    return { rounds: rows.length, teams, rows, picks: cells, byRoster, average, reference };
  }

  function afterTrades(b, draft, trades, assetValue) {
    const season = String(draft.season);
    const thisDraft = (p) => String(p.season) === season;
    const moved = {};
    for (const trade of trades || []) {
      const sides = Object.entries(trade.sides);
      if (!sides.some(([, side]) => side.gotPicks.concat(side.gavePicks).some(thisDraft))) continue;
      for (const [rosterId, side] of sides) {
        const worth = (list) => list.reduce((sum, a) => sum + assetValue(a), 0);
        const got = side.got.map((playerId) => ({ pid: playerId })).concat(side.gotPicks.filter((p) => !thisDraft(p)).map((pick) => ({ pick })));
        const gave = side.gave.map((playerId) => ({ pid: playerId })).concat(side.gavePicks.filter((p) => !thisDraft(p)).map((pick) => ({ pick })));
        moved[rosterId] = (moved[rosterId] || 0) + worth(got) - worth(gave);
      }
    }
    const baseline = {};
    for (const c of b.picks) baseline[c.from] = (baseline[c.from] || 0) + c.expected;
    const out = {};
    const rids = new Set([...Object.keys(b.byRoster), ...Object.keys(baseline), ...Object.keys(moved)]);
    for (const rosterId of rids) {
      const t = b.byRoster[rosterId] || { value: 0, expected: 0, picks: 0, excess: 0 };
      const base = baseline[rosterId] || 0;
      const trade = moved[rosterId] || 0;
      out[rosterId] = {
        value: t.value, expected: t.expected, picks: t.picks, trades: Math.round(trade), baseline: Math.round(base),
        gain: Math.round(t.excess + (t.expected + trade - base)),
        score: (t.excess + (t.expected + trade - base)) / Math.max(b.average, FLOOR)
      };
    }
    return out;
  }

  NightOwl.tradeDrafts = { rookieDraft, index, resolve, settle, expected, board, afterTrades, NEIGHBOURS };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.tradeDrafts;
