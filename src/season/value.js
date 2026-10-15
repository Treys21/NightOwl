globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { round1 } = NightOwl.numbers;
  const { optimal } = NightOwl.season;

  const SCAN_PER_POSITION = 14;
  const DROP_OPTIONS = 3;
  const MIN_GAIN = 0.05;

  function lineupPoints(slots, pool, weeks, positionsOf) {
    const perWeek = weeks.map((week) => optimal(slots, pool, (playerId) => (week.isOut(playerId) ? 0 : week.projOf(playerId)), positionsOf).points * (week.weight || 1));
    return { total: perWeek.reduce((total, weekPoints) => total + weekPoints, 0), perWeek };
  }

  const restOfSeason = (playerId, weeks) => weeks.reduce((sum, week) => sum + (week.isOut(playerId) ? 0 : week.projOf(playerId) * (week.weight || 1)), 0);

  function waiverTargets({ slots, pool, droppable, openSpots = 0, candidates, weeks, positionsOf, minGain = MIN_GAIN }) {
    if (!weeks.length) return [];
    const base = lineupPoints(slots, pool, weeks, positionsOf);

    const byPosition = new Map();
    for (const playerId of candidates) {
      const ros = restOfSeason(playerId, weeks);
      if (ros <= 0) continue;
      const pos = (positionsOf(playerId) || [])[0] || '?';
      if (!byPosition.has(pos)) byPosition.set(pos, []);
      byPosition.get(pos).push({ pid: playerId, ros });
    }
    const scan = [...byPosition.values()].flatMap((list) => list.sort((a, b) => b.ros - a.ros).slice(0, SCAN_PER_POSITION));

    let drops = [null];
    if (openSpots <= 0) {
      drops = droppable
        .map((playerId) => ({ pid: playerId, loss: base.total - lineupPoints(slots, pool.filter((poolPlayerId) => poolPlayerId !== playerId), weeks, positionsOf).total, ros: restOfSeason(playerId, weeks) }))
        .sort((a, b) => a.loss - b.loss || a.ros - b.ros)
        .slice(0, DROP_OPTIONS)
        .map((entry) => entry.pid);
      if (!drops.length) return [];
    }

    const out = [];
    for (const { pid: playerId, ros } of scan) {
      let best = null;
      for (const drop of drops) {
        const next = lineupPoints(slots, pool.filter((poolPlayerId) => poolPlayerId !== drop).concat(playerId), weeks, positionsOf);
        const gain = next.total - base.total;
        if (!best || gain > best.gain) best = { gain, nowGain: next.perWeek[0] - base.perWeek[0], drop };
      }
      if (best.gain >= minGain || best.nowGain >= minGain * 0.5) {
        out.push({ pid: playerId, gain: round1(best.gain), nowGain: round1(best.nowGain), drop: best.drop, ros: round1(ros), next: round1(weeks[0].isOut(playerId) ? 0 : weeks[0].projOf(playerId)) });
      }
    }
    return out.sort((a, b) => b.gain - a.gain || b.nowGain - a.nowGain);
  }

  const swap = (pool, out, inn) => {
    const gone = new Set(out);
    return pool.filter((playerId) => !gone.has(playerId)).concat(inn);
  };

  function tradeImpact({ slots, weeks, positionsOf, a: firstTeam, b: secondTeam, aGives: firstTeamGives, bGives: secondTeamGives }) {
    const side = (pool, gives, gets) => {
      const before = lineupPoints(slots, pool, weeks, positionsOf);
      const after = lineupPoints(slots, swap(pool, gives, gets), weeks, positionsOf);
      return {
        before: round1(before.total),
        after: round1(after.total),
        delta: round1(after.total - before.total),
        perWeek: after.perWeek.map((change, i) => round1(change - before.perWeek[i]))
      };
    };
    return { a: side(firstTeam.pool, firstTeamGives, secondTeamGives), b: side(secondTeam.pool, secondTeamGives, firstTeamGives) };
  }

  function applyTrade(rosters, aId, bId, firstTeamGives, secondTeamGives) {
    const move = (roster, out, inn) => {
      const gone = new Set(out);
      const keep = (list) => (list || []).filter((playerId) => !gone.has(playerId));
      return Object.assign({}, roster, {
        players: keep(roster.players).concat(inn),
        starters: keep(roster.starters),
        reserve: keep(roster.reserve),
        taxi: keep(roster.taxi)
      });
    };
    return rosters.map((roster) => {
      if (roster.roster_id === aId) return move(roster, firstTeamGives, secondTeamGives);
      if (roster.roster_id === bId) return move(roster, secondTeamGives, firstTeamGives);
      return roster;
    });
  }

  NightOwl.value = { lineupPoints, restOfSeason, waiverTargets, tradeImpact, applyTrade };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.value;
