// Runs the content scripts on a plain local page, for screenshots and design
// review. Stands in for the extension APIs and anonymizes everything personal:
// league names, owner names and avatars are replaced before the views see them.
//
// Query parameters:
//   user=<sleeper username>  tool=draft|live|lineups|bets|season|moves  w= h= (panel size)
//   route=<path>             pretend to be on this sleeper.com path (draft rooms)
//   picks=<n>                show a draft as in progress after n picks
//   stage=1                  leave one starter slot empty (shows the lineup fixer)
//   rankings=<json>          draft rankings [{ rank, name, position }]
(function () {
  'use strict';

  const params = new URLSearchParams(location.search);
  if (params.get('route')) history.replaceState(null, '', params.get('route'));

  const LEAGUES = ['Dynasty Degens', 'Office League', 'Sunday Scaries', 'College Buddies', 'Blood Feud', 'Twelve Angry Men', 'Waiver Wire Warriors', 'The Gauntlet', 'Couch GMs', 'Fantasy Fam'];
  const NAMES = ['GridironGus', 'WaiverWendy', 'TheCommish', 'PuntGod', 'RedZoneRay', 'BenchMob', 'TankCommander', 'FlexLuthor', 'HailMaryHank', 'SnapCountSam', 'TwoPointTina', 'TrustTheProcess', 'BlitzBrigade', 'FourthAndLong', 'MondayMagic'];
  const COLORS = ['#00ceb8', '#56c9f8', '#bd66ff', '#f75c8d', '#feae58', '#3df5ff', '#ff4fd8', '#7ee081'];

  let me = null;
  let staged = false;
  const leagueNames = new Map();
  const userNames = new Map();
  const pick = (map, key, list) => {
    if (!map.has(key)) map.set(key, list[map.size % list.length]);
    return map.get(key);
  };
  const avatar = (name, i) => 'data:image/svg+xml,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="20" fill="${COLORS[i % COLORS.length]}"/>` +
    `<text x="20" y="26" font-family="Arial" font-weight="700" font-size="17" text-anchor="middle" fill="#0e1018">${name[0]}</text></svg>`);
  const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { 'content-type': 'application/json' } });

  function scrub(url, data) {
    if (/\/v1\/user\/[^/]+$/.test(url) && data && data.user_id) {
      me = data.user_id;
      return Object.assign({}, data, { display_name: 'nightowl', username: 'nightowl', avatar: null });
    }
    if (Array.isArray(data) && data[0] && data[0].league_id && 'name' in data[0]) {
      return data.map((l) => Object.assign({}, l, { name: pick(leagueNames, l.league_id, LEAGUES), avatar: null }));
    }
    if (Array.isArray(data) && data[0] && data[0].display_name !== undefined) {
      return data.map((u) => {
        const name = u.user_id === me ? 'You' : pick(userNames, u.user_id, NAMES);
        const meta = Object.assign({}, u.metadata, { team_name: name, avatar: avatar(name, [...userNames.keys()].indexOf(u.user_id) + 1) });
        return Object.assign({}, u, { display_name: name, avatar: null, metadata: meta });
      });
    }
    return data;
  }

  const realFetch = window.fetch.bind(window);
  window.fetch = async (input, init) => {
    const res = await realFetch(input, init);
    const url = String(input);

    const picks = Number(params.get('picks'));
    if (picks && /\/v1\/draft\/\d+(\/picks)?$/.test(url)) {
      const data = await res.clone().json();
      return json(Array.isArray(data) ? data.slice(0, picks) : Object.assign({}, data, { status: 'drafting' }));
    }

    const week = url.match(/\/v1\/league\/(\d+)\/matchups\/\d+$/);
    if (params.get('stage') && week && me && !staged) {
      staged = true; // claim it before awaiting: matchups load in parallel
      const data = await res.clone().json();
      const rosters = await realFetch(`https://api.sleeper.app/v1/league/${week[1]}/rosters`).then((r) => r.json());
      const own = rosters.find((r) => r.owner_id === me);
      const mine = own && data.find((m) => m.roster_id === own.roster_id);
      if (mine && mine.starters && mine.starters.length > 3) {
        mine.starters = mine.starters.slice();
        mine.starters[3] = '0';
      }
      return json(data);
    }

    if (!/api\.sleeper\.app\/v1\/(user|league)/.test(url)) return res;
    const data = await res.clone().json().catch(() => null);
    return data == null ? res : json(scrub(url, data), res.status);
  };

  const mem = {
    settings: { username: params.get('user') || '' },
    ui: { tool: params.get('tool') || 'live', x: 20, y: 20, w: Number(params.get('w')) || 440, h: Number(params.get('h')) || 800 },
    rankings: JSON.parse(params.get('rankings') || '[]')
  };
  const listeners = [];
  window.chrome = {
    runtime: {
      id: 'preview',
      lastError: null,
      getURL: (path) => `/${path}`,
      sendMessage: (msg, cb) => realFetch(msg.type === 'nightowl-ktc' ? '/ktc' : `/relay?url=${encodeURIComponent(msg.url)}`)
        .then((r) => r.json())
        .then((data) => cb({ ok: true, data }), (err) => cb({ ok: false, error: String(err) }))
    },
    storage: {
      local: {
        get: (key, cb) => cb({ [key]: mem[key] }),
        set: (items, cb) => {
          const changes = {};
          for (const [k, v] of Object.entries(items)) changes[k] = { newValue: v };
          Object.assign(mem, items);
          if (cb) cb();
          listeners.forEach((fn) => fn(changes, 'local'));
        },
        remove: (keys, cb) => {
          [].concat(keys).forEach((k) => delete mem[k]);
          if (cb) cb();
        }
      },
      onChanged: { addListener: (fn) => listeners.push(fn) }
    }
  };
})();
