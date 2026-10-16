globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const POSITIONS = ['QB', 'RB', 'WR', 'TE'];
  const FLEX_POSITIONS = ['RB', 'WR', 'TE'];

  const sum = (values) => values.reduce((total, value) => total + value, 0);
  const mean = (values) => (values.length ? sum(values) / values.length : 0);
  const maxOf = (values) => (values.length ? Math.max(...values) : 0);

  function sideVector(received, given) {
    const features = {};
    [['in', received], ['out', given]].forEach(([name, group]) => {
      const players = group.filter((asset) => asset.kind === 'player');
      const picks = group.filter((asset) => asset.kind === 'pick');
      features[`${name}_n`] = players.length;
      features[`${name}_mkt`] = sum(group.map((asset) => asset.mkt));
      features[`${name}_mktmax`] = maxOf(group.map((asset) => asset.mkt));
      features[`${name}_ppg`] = sum(players.map((asset) => asset.ppg));
      features[`${name}_recent`] = sum(players.map((asset) => asset.recent));
      features[`${name}_maxppg`] = maxOf(players.map((asset) => asset.ppg));
      features[`${name}_age`] = mean(players.map((asset) => asset.age));
      features[`${name}_picks`] = picks.length;
      features[`${name}_pick1`] = picks.filter((asset) => asset.round === 1).length;
      features[`${name}_pick2`] = picks.filter((asset) => asset.round === 2).length;
      features[`${name}_pickval`] = sum(picks.map((asset) => 1 / asset.round / (1 + asset.years_out)));
      POSITIONS.forEach((position) => {
        features[`${name}_${position}`] = players.filter((asset) => asset.pos === position).length;
      });
    });
    return features;
  }

  function lineupSlots(positions) {
    return {
      strict: positions.filter((slot) => POSITIONS.includes(slot)).map((slot) => [slot]),
      flex: positions.filter((slot) => slot === 'FLEX').map(() => FLEX_POSITIONS),
      superflex: positions.filter((slot) => slot === 'SUPER_FLEX').map(() => POSITIONS)
    };
  }

  function lineupPoints(entries, slots) {
    const left = new Map(entries);
    let total = 0;
    ['strict', 'flex', 'superflex'].forEach((kind) => {
      slots[kind].forEach((eligible) => {
        const available = [];
        left.forEach(([position, value], playerId) => {
          if (eligible.includes(position)) available.push({ value, playerId });
        });
        available.sort((a, b) => b.value - a.value || (a.playerId < b.playerId ? 1 : -1));
        const best = available[0];
        if (best) {
          total += best.value;
          left.delete(best.playerId);
        }
      });
    });
    return total;
  }

  function rosterEntries(players, extra, dropped) {
    const entries = new Map();
    players.forEach((player) => {
      if (!dropped.has(player.pid) && POSITIONS.includes(player.pos)) entries.set(player.pid, [player.pos, player.ppg]);
    });
    extra.forEach((asset) => {
      if (asset.kind === 'player' && POSITIONS.includes(asset.pos)) entries.set(asset.pid, [asset.pos, asset.ppg]);
    });
    return entries;
  }

  function partyFeatures(party, roster, rank, slots) {
    const features = sideVector(party.recv, party.give);
    features.ppg_gap = features.in_ppg - features.out_ppg;
    features.mkt_gap = features.in_mkt - features.out_mkt;
    features.mkt_ratio = Math.log((features.in_mkt + 1) / (features.out_mkt + 1));
    features.recent_gap = features.in_recent - features.out_recent;
    features.age_gap = features.in_age - features.out_age;
    features.pick_gap = features.in_pickval - features.out_pickval;
    features.rank = rank[party.rid] === undefined ? 0.5 : rank[party.rid];
    const dropped = new Set(party.give.filter((asset) => asset.kind === 'player').map((asset) => asset.pid));
    const beforeEntries = rosterEntries(roster.players, [], new Set());
    const before = lineupPoints(beforeEntries, slots);
    const after = lineupPoints(rosterEntries(roster.players, party.recv, dropped), slots);
    features.lineup_before = before;
    features.lineup_gain = after - before;
    features.lineup_gain_pct = (after - before) / Math.max(before, 1);
    const top = Array.from(beforeEntries.entries()).sort((a, b) => b[1][1] - a[1][1]).slice(0, 9);
    features.gave_top9 = top.filter(([playerId]) => dropped.has(playerId)).length;
    features.roster_n = roster.size;
    const ages = roster.players.map((player) => player.age).sort((a, b) => a - b);
    features.team_age = ages.length ? mean(ages.slice(0, Math.max(1, Math.floor(ages.length / 2)))) : 25;
    POSITIONS.forEach((position) => {
      features[`depth_${position}`] = Array.from(beforeEntries.values()).filter(([entryPosition, value]) => entryPosition === position && value > 5).length;
    });
    return features;
  }

  function featurize(input) {
    const slots = lineupSlots(input.positions);
    return input.sides.map((party) => partyFeatures(party, input.rosters[party.rid], input.rank, slots));
  }

  function vectorize(features, keys) {
    const vector = [];
    keys.forEach((key) => {
      vector.push(Math.min(features[0][key], features[1][key]), Math.max(features[0][key], features[1][key]));
    });
    return vector;
  }

  function treeValue(tree, vector) {
    let node = tree[0];
    let index = 0;
    while (!node[5]) {
      index = vector[node[1]] <= node[2] ? node[3] : node[4];
      node = tree[index];
    }
    return node[0];
  }

  function interpolate(curve, value) {
    const { x, y } = curve;
    if (value <= x[0]) return y[0];
    if (value >= x[x.length - 1]) return y[y.length - 1];
    let low = 0;
    let high = x.length - 1;
    while (high - low > 1) {
      const middle = (low + high) >> 1;
      if (x[middle] <= value) low = middle; else high = middle;
    }
    const span = x[high] - x[low];
    return span === 0 ? y[low] : y[low] + ((y[high] - y[low]) * (value - x[low])) / span;
  }

  function predict(model, features) {
    const vector = vectorize(features, model.keys);
    const raw = 1 / (1 + Math.exp(-(model.base + sum(model.trees.map((tree) => treeValue(tree, vector))))));
    return { raw, calibrated: interpolate(model.iso, raw) };
  }

  function likelihood(model, input) {
    return predict(model, featurize(input));
  }

  NightOwl.likelihood = { featurize, predict, likelihood, lineupSlots, lineupPoints };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.likelihood;
