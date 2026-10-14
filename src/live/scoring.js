// Fantasy scoring from Sleeper stat lines. Sleeper's stat rows already carry
// the derived keys (bonus_*, pts_allow_14_20, yds_allow_300_349, fgm_40_49 ...),
// so a league's score for a player is just sum(stat[key] * scoring[key]) —
// this matches the players_points Sleeper reports in matchups exactly.
globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const round2 = (n) => Math.round(n * 100) / 100;

  function points(stats, scoring) {
    if (!stats || !scoring) return 0;
    let total = 0;
    for (const key in stats) {
      const weight = scoring[key];
      if (weight) total += stats[key] * weight;
    }
    return round2(total);
  }

  // Keys whose value changed between two stat lines -> { key: change }.
  function statDelta(prev, cur) {
    const out = {};
    const keys = new Set([...Object.keys(prev || {}), ...Object.keys(cur || {})]);
    for (const key of keys) {
      const change = round2(((cur && cur[key]) || 0) - ((prev && prev[key]) || 0));
      if (change !== 0) out[key] = change;
    }
    return out;
  }

  // Points change from a stat delta under one league's scoring.
  const deltaPoints = (delta, scoring) => points(delta, scoring);

  // Ordered so a play reads naturally: "+1 rec, +15 rec yds, +1 rec TD".
  /** @type {Array<[string, string]>} */
  const LABELS = [
    ['pass_cmp', 'cmp'], ['pass_yd', 'pass yds'], ['pass_td', 'pass TD'], ['pass_int', 'INT thrown'],
    ['pass_2pt', '2-pt pass'], ['pass_sack', 'sacked'],
    ['rush_att', 'rush'], ['rush_yd', 'rush yds'], ['rush_td', 'rush TD'], ['rush_2pt', '2-pt rush'],
    ['rec', 'rec'], ['rec_yd', 'rec yds'], ['rec_td', 'rec TD'], ['rec_2pt', '2-pt rec'],
    ['rush_fd', 'rush 1st down'], ['rec_fd', 'rec 1st down'], ['pass_fd', 'pass 1st down'],
    ['fum_lost', 'fumble lost'], ['fum', 'fumble'],
    ['kr_yd', 'KR yds'], ['pr_yd', 'PR yds'], ['st_td', 'ST TD'],
    ['fgm_0_19', 'FG 0-19'], ['fgm_20_29', 'FG 20-29'], ['fgm_30_39', 'FG 30-39'],
    ['fgm_40_49', 'FG 40-49'], ['fgm_50_59', 'FG 50-59'], ['fgm_60p', 'FG 60+'],
    ['fgmiss', 'FG miss'], ['xpm', 'XP'], ['xpmiss', 'XP miss'],
    ['sack', 'sack'], ['int', 'INT'], ['fum_rec', 'fum rec'], ['ff', 'forced fum'],
    ['def_td', 'DEF TD'], ['def_st_td', 'ST TD'], ['safe', 'safety'], ['blk_kick', 'blocked kick'],
    ['pts_allow', 'pts allowed'], ['yds_allow', 'yds allowed'],
    ['idp_tkl_solo', 'solo tkl'], ['idp_tkl_ast', 'ast tkl'], ['idp_sack', 'sack'],
    ['idp_int', 'INT'], ['idp_ff', 'forced fum'], ['idp_fum_rec', 'fum rec'], ['idp_pass_def', 'PD'],
    ['idp_td', 'TD']
  ];
  const LABEL = new Map(LABELS);
  const ORDER = new Map(LABELS.map(([key], i) => [key, i]));
  // Shown even when unscored: they explain what happened on the play.
  const ALWAYS = new Set(['pass_yd', 'rush_yd', 'rec', 'rec_yd', 'pts_allow', 'yds_allow']);
  // Tier keys flip on/off as a total crosses a band; the raw total says it better.
  const HIDDEN = /^(pts_allow_|yds_allow_|fgm_yds|fgm_lng|pos_rank|pts_(std|ppr|half_ppr|idp))/;

  const UNIT = { pass_yd: 'pass yds', rush_yd: 'rush yds', rec_yd: 'rec yds', pass_cmp: 'cmp', rec: 'rec', rush_att: 'rush att' };

  // Bonus and long-play keys Sleeper adds per league: pass_td_40p -> "40+ yd pass TD",
  // bonus_rec_yd_100 -> "100+ rec yds bonus".
  function humanize(key) {
    let m = key.match(/^(pass|rush|rec)_td_(\d+)p$/);
    if (m) return `${m[2]}+ yd ${m[1]} TD`;
    m = key.match(/^bonus_(.+?)_(\d+)p?$/);
    if (m) return `${m[2]}+ ${UNIT[m[1]] || m[1].replace(/_/g, ' ')} bonus`;
    m = key.match(/^(pass|rush|rec)_(\d+)_(\d+)$/);
    if (m) return `${m[2]}-${m[3]} yd ${m[1]}`;
    m = key.match(/^(pass|rush|rec)_(\d+)p$/);
    if (m) return `${m[2]}+ yd ${m[1]}`;
    m = key.match(/^bonus_rec_(te|rb|wr)$/);
    if (m) return `${m[1].toUpperCase()} rec bonus`;
    return key.replace(/^bonus_(.+)$/, '$1 bonus').replace(/_/g, ' ');
  }

  // "+1 rec · +15 rec yds" for the keys that matter in any of `scorings`.
  function describe(delta, scorings) {
    const parts = [];
    const tags = [];
    let fold = false;
    for (const key of Object.keys(delta)) {
      if (HIDDEN.test(key)) continue;
      const scored = scorings.some((s) => s && s[key]);
      if (!scored && !ALWAYS.has(key)) continue;
      const v = delta[key];
      if (LABEL.has(key)) parts.push({ key, text: `${v > 0 ? '+' : ''}${v} ${LABEL.get(key)}` });
      // A one-off bonus reads as a tag ("40+ yd pass TD"). Repeated ones
      // (a summed catch-up) just echo stats already listed, so they fold away.
      else if (v === 1) tags.push(humanize(key));
      else if (v > 1) fold = true;
    }
    parts.sort((a, b) => ORDER.get(a.key) - ORDER.get(b.key));
    const extra = tags.length > 2 || (fold && !tags.length) ? ['big-play bonus'] : tags;
    return parts.map((p) => p.text).concat(extra).join(' · ');
  }

  NightOwl.scoring = { points, statDelta, deltaPoints, describe, round2 };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.scoring;
