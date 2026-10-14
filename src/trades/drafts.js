globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const NEIGHBOURS = 2;
  const MIN_WEIGHT = 0.25;
  const FLOOR = 800;

  function rookieDraft(drafts, season) {
    const seasonDrafts = (drafts || []).filter((draft) => String(draft.season) === String(season));
    return seasonDrafts.sort((a, b) => a.rounds - b.rounds)[0] || null;
  }

  const originalOf = (draft, pick) => (draft.slotToRoster && draft.slotToRoster[pick.slot]) || pick.by;

  function index(drafts) {
    const seasons = [...new Set((drafts || []).map((draft) => String(draft.season)))];
    const out = new Map();
    for (const season of seasons) {
      const draft = rookieDraft(drafts, season);
      for (const pick of draft.picks) {
        const from = originalOf(draft, pick);
        const teams = draft.teams || Math.max(...draft.picks.map((pick) => pick.slot), 1);
        out.set(`${season}:${pick.round}:${from}`, { pid: pick.pid, no: pick.no, round: pick.round, slot: pick.slot, by: pick.by, from, season, teams, pos: ((pick.no - 1) % teams) + 1 });
      }
    }
    return out;
  }

  const resolve = (index, pick) => index.get(`${pick.season}:${pick.round}:${pick.from}`) || null;

  function settle(trades, index) {
    const keyOf = (pick) => `${pick.season}:${pick.round}:${pick.from}`;
    const ordered = (trades || []).slice().sort((a, b) => a.at - b.at);
    const gives = new Map();
    for (const trade of ordered) {
      for (const [rosterId, side] of Object.entries(trade.sides)) {
        for (const gavePick of side.gavePicks) {
          if (!gives.has(keyOf(gavePick))) gives.set(keyOf(gavePick), []);
          gives.get(keyOf(gavePick)).push({ rid: rosterId, at: trade.at });
        }
      }
    }
    for (const trade of ordered) {
      const verdict = new Map();
      for (const [rosterId, side] of Object.entries(trade.sides)) {
        for (const gotPick of side.gotPicks) {
          const hit = index.get(keyOf(gotPick));
          if (!hit) continue;
          const passedOn = (gives.get(keyOf(gotPick)) || []).some((giveAway) => giveAway.rid === rosterId && giveAway.at > trade.at);
          verdict.set(keyOf(gotPick), !passedOn && String(hit.by) === String(rosterId) ? { player: hit.pid } : { passed: true, pos: hit.pos, teams: hit.teams });
        }
      }
      for (const side of Object.values(trade.sides)) {
        for (const gotPick of side.gotPicks.concat(side.gavePicks)) {
          const pickVerdict = verdict.get(keyOf(gotPick));
          if (pickVerdict) { delete gotPick.player; delete gotPick.passed; Object.assign(gotPick, pickVerdict); }
        }
      }
    }
  }

  function expected(values) {
    return values.map((_, k) => {
      const near = [];
      for (let j = Math.max(0, k - NEIGHBOURS); j <= Math.min(values.length - 1, k + NEIGHBOURS); j++) if (j !== k) near.push(values[j]);
      return near.length ? near.reduce((total, value) => total + value, 0) / near.length : 0;
    });
  }

  function board(draft, valueOf, baselineOf = null) {
    const picks = draft.picks.slice().sort((a, b) => a.no - b.no);
    const values = picks.map((pick) => valueOf(pick.pid));
    const teams = draft.teams || Math.max(...picks.map((pick) => pick.slot), 1);
    const around = expected(values);
    const exp = picks.map((pick, k) => (baselineOf && baselineOf({ round: pick.round, slot: ((pick.no - 1) % teams) + 1, teams })) || around[k]);
    const cells = picks.map((pick, k) => {
      const from = originalOf(draft, pick);
      return {
        no: pick.no, round: pick.round, slot: pick.slot, pid: pick.pid, by: pick.by, from, traded: pick.by !== from,
        value: values[k], expected: Math.round(exp[k]),
        score: (values[k] - exp[k]) / Math.max(exp[k], FLOOR),
        label: `${pick.round}.${String(((pick.no - 1) % teams) + 1).padStart(2, '0')}`
      };
    });
    const rows = [];
    for (const cell of cells) {
      (rows[cell.round - 1] = rows[cell.round - 1] || new Array(teams).fill(null))[cell.slot - 1] = cell;
    }
    const lead = cells.slice(0, Math.max(1, Math.ceil(cells.length / 4)));
    const reference = lead.reduce((sum, cell) => sum + cell.expected, 0) / lead.length;
    const weigh = (cell) => Math.max(MIN_WEIGHT, Math.min(1, Math.max(cell.expected, cell.value) / Math.max(reference, FLOOR)));
    for (const cell of cells) {
      cell.weight = weigh(cell);
      cell.excess = cell.value >= cell.expected ? cell.value - cell.expected : (cell.value - cell.expected) * cell.weight;
    }
    const byRoster = {};
    for (const cell of cells) {
      const teamTotals = (byRoster[cell.by] = byRoster[cell.by] || { value: 0, expected: 0, picks: 0, excess: 0 });
      teamTotals.value += cell.value;
      teamTotals.expected += cell.expected;
      teamTotals.excess += cell.excess;
      teamTotals.picks++;
    }
    for (const teamTotals of Object.values(byRoster)) teamTotals.score = (teamTotals.value - teamTotals.expected) / Math.max(teamTotals.expected, FLOOR);
    const average = cells.reduce((sum, cell) => sum + cell.expected, 0) / teams;
    return { rounds: rows.length, teams, rows, picks: cells, byRoster, average, reference };
  }

  function afterTrades(boardResult, draft, trades, assetValue) {
    const season = String(draft.season);
    const thisDraft = (pick) => String(pick.season) === season;
    const moved = {};
    for (const trade of trades || []) {
      const sides = Object.entries(trade.sides);
      if (!sides.some(([, side]) => side.gotPicks.concat(side.gavePicks).some(thisDraft))) continue;
      for (const [rosterId, side] of sides) {
        const worth = (list) => list.reduce((sum, asset) => sum + assetValue(asset), 0);
        const got = side.got.map((playerId) => ({ pid: playerId })).concat(side.gotPicks.filter((gotPick) => !thisDraft(gotPick)).map((pick) => ({ pick })));
        const gave = side.gave.map((playerId) => ({ pid: playerId })).concat(side.gavePicks.filter((gavePick) => !thisDraft(gavePick)).map((pick) => ({ pick })));
        moved[rosterId] = (moved[rosterId] || 0) + worth(got) - worth(gave);
      }
    }
    const baseline = {};
    for (const pick of boardResult.picks) baseline[pick.from] = (baseline[pick.from] || 0) + pick.expected;
    const out = {};
    const rids = new Set([...Object.keys(boardResult.byRoster), ...Object.keys(baseline), ...Object.keys(moved)]);
    for (const rosterId of rids) {
      const teamTotals = boardResult.byRoster[rosterId] || { value: 0, expected: 0, picks: 0, excess: 0 };
      const base = baseline[rosterId] || 0;
      const trade = moved[rosterId] || 0;
      out[rosterId] = {
        value: teamTotals.value, expected: teamTotals.expected, picks: teamTotals.picks, trades: Math.round(trade), baseline: Math.round(base),
        gain: Math.round(teamTotals.excess + (teamTotals.expected + trade - base)),
        score: (teamTotals.excess + (teamTotals.expected + trade - base)) / Math.max(boardResult.average, FLOOR)
      };
    }
    return out;
  }

  NightOwl.tradeDrafts = { rookieDraft, index, resolve, settle, expected, board, afterTrades, NEIGHBOURS };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.tradeDrafts;
