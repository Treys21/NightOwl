globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const POSITIONS = ['QB', 'RB', 'WR', 'TE'];
  const RECENT_WEEKS = 4;
  const UNRANKED = 9999;
  const PICK_MARKET = { 1: 25, 2: 12, 3: 6 };
  const DEFAULT_AGE = 25;

  const mean = (values) => (values.length ? values.reduce((total, value) => total + value, 0) / values.length : 0);
  const isPick = (assetId) => String(assetId).startsWith('pick:');

  function marketOf(searchRank) {
    return 100 * Math.exp(-(searchRank || UNRANKED) / 80);
  }

  function playerAsset(playerId, facts) {
    const info = facts.infoOf(playerId);
    const history = facts.weeksPlayed.map((week) => facts.pointsOf(week, playerId)).filter((points) => points !== undefined && points !== null);
    const recent = facts.weeksPlayed.filter((week) => week >= facts.week - RECENT_WEEKS).map((week) => facts.pointsOf(week, playerId)).filter((points) => points !== undefined && points !== null);
    const ppg = mean(history);
    return { kind: 'player', pid: String(playerId), pos: info.pos, age: info.age || DEFAULT_AGE, mkt: marketOf(info.searchRank), ppg, recent: recent.length ? mean(recent) : ppg };
  }

  function pickAsset(assetId, facts) {
    const [, year, round] = String(assetId).split(':');
    const yearsOut = Number(year) - Number(facts.season);
    return { kind: 'pick', round: Number(round), years_out: yearsOut, mkt: (PICK_MARKET[Number(round)] || 2) * Math.pow(0.9, yearsOut) };
  }

  function assetOf(assetId, facts) {
    return isPick(assetId) ? pickAsset(assetId, facts) : playerAsset(assetId, facts);
  }

  function rosterOf(rosterPlayerIds, facts) {
    const fantasy = rosterPlayerIds.map((playerId) => playerAsset(playerId, facts)).filter((asset) => POSITIONS.includes(asset.pos));
    return { size: rosterPlayerIds.length, players: fantasy };
  }

  function build(facts, deal) {
    const mineIds = facts.rosterPlayers(deal.myId);
    const theirIds = facts.rosterPlayers(deal.partnerId);
    const rank = {};
    const count = facts.standingsRanks.size;
    facts.standingsRanks.forEach((position, rosterId) => { rank[rosterId] = count > 1 ? (count - position) / (count - 1) : 0.5; });
    return {
      positions: facts.positions,
      sides: [
        { rid: deal.myId, give: deal.give.map((assetId) => assetOf(assetId, facts)), recv: deal.get.map((assetId) => assetOf(assetId, facts)) },
        { rid: deal.partnerId, give: deal.get.map((assetId) => assetOf(assetId, facts)), recv: deal.give.map((assetId) => assetOf(assetId, facts)) }
      ],
      rosters: { [deal.myId]: rosterOf(mineIds, facts), [deal.partnerId]: rosterOf(theirIds, facts) },
      rank
    };
  }

  NightOwl.likelihoodInput = { build, marketOf };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.likelihoodInput;
