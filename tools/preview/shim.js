(function () {
  'use strict';

  const params = new URLSearchParams(location.search);
  if (params.get('route')) history.replaceState(null, '', params.get('route'));

  const LEAGUES = ['Dynasty Degens', 'Office League', 'Sunday Scaries', 'College Buddies', 'Blood Feud', 'Twelve Angry Men', 'Waiver Wire Warriors', 'The Gauntlet', 'Couch GMs', 'Fantasy Fam'];
  const NAMES = ['GridironGus', 'WaiverWendy', 'TheCommish', 'PuntGod', 'RedZoneRay', 'BenchMob', 'TankCommander', 'FlexLuthor', 'HailMaryHank', 'SnapCountSam', 'TwoPointTina', 'TrustTheProcess', 'BlitzBrigade', 'FourthAndLong', 'MondayMagic'];
  const COLORS = ['#00ceb8', '#56c9f8', '#bd66ff', '#f75c8d', '#feae58', '#3df5ff', '#ff4fd8', '#7ee081'];

  let currentUserId = null;
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
      currentUserId = data.user_id;
      return Object.assign({}, data, { display_name: 'nightowl', username: 'nightowl', avatar: null });
    }
    if (Array.isArray(data) && data[0] && data[0].league_id && 'name' in data[0]) {
      return data.map((league) => Object.assign({}, league, { name: pick(leagueNames, league.league_id, LEAGUES), avatar: null }, params.get('status') ? { status: params.get('status') } : {}));
    }
    if (Array.isArray(data) && data[0] && data[0].display_name !== undefined) {
      return data.map((user) => {
        const name = user.user_id === currentUserId ? 'You' : pick(userNames, user.user_id, NAMES);
        const meta = Object.assign({}, user.metadata, { team_name: name, avatar: avatar(name, [...userNames.keys()].indexOf(user.user_id) + 1) });
        return Object.assign({}, user, { display_name: name, avatar: null, metadata: meta });
      });
    }
    return data;
  }

  const realFetch = window.fetch.bind(window);
  const fault = params.get('fault') || '';
  const nflOverride = params.get('nfl') ? JSON.parse(params.get('nfl')) : null;
  window.fetch = async (input, init) => {
    const url = String(input);
    if (fault === 'sleeper' && /api\.sleeper\.(app|com)/.test(url)) throw new TypeError('Failed to fetch');
    if (fault === 'projections' && /\/projections\//.test(url)) throw new TypeError('Failed to fetch');
    if (fault === 'slow') await new Promise((resolve) => setTimeout(resolve, 2500));
    const response = await realFetch(input, init);
    if (nflOverride && /\/v1\/state\/nfl$/.test(url)) {
      const real = await response.clone().json();
      return json(Object.assign({}, real, nflOverride));
    }
    if (params.get('leagues') === 'none' && /\/v1\/user\/[^/]+\/leagues\//.test(url)) return json([]);

    const picks = Number(params.get('picks'));
    if (picks && /\/v1\/draft\/\d+(\/picks)?$/.test(url)) {
      const data = await response.clone().json();
      return json(Array.isArray(data) ? data.slice(0, picks) : Object.assign({}, data, { status: 'drafting' }));
    }

    const week = url.match(/\/v1\/league\/(\d+)\/matchups\/\d+$/);
    if (params.get('stage') && week && currentUserId && !staged) {
      staged = true;
      const data = await response.clone().json();
      const rosters = await realFetch(`https://api.sleeper.app/v1/league/${week[1]}/rosters`).then((response) => response.json());
      const own = rosters.find((roster) => roster.owner_id === currentUserId);
      const mine = own && data.find((matchup) => matchup.roster_id === own.roster_id);
      if (mine && mine.starters && mine.starters.length > 3) {
        mine.starters = mine.starters.slice();
        mine.starters[3] = '0';
      }
      return json(data);
    }

    if (!/api\.sleeper\.app\/v1\/(user|league)/.test(url)) return response;
    const data = await response.clone().json().catch(() => null);
    return data == null ? response : json(scrub(url, data), response.status);
  };

  const agentReply = (message) => {
    if (message.path === '/health') return { ok: true, data: { ok: true, model: 'preview' } };
    const view = message.body.view;
    if (message.path === '/chat') return { ok: true, data: { ok: true, reply: 'The first deal helps your lineup most and is easy for them to accept, so I would send it first.' } };
    const picks = view.candidates.slice(0, 2).map((candidate, index) => ({ source: 'candidate', key: candidate.key, partnerId: candidate.partnerId, give: candidate.give, get: candidate.get, pitch: index ? 'A smaller upgrade that costs you little and fits their depth.' : 'Lifts your lineup the most and the other side picks up real starters in return.' }));
    return { ok: true, data: { ok: true, suggestions: picks, errors: [], mode: message.body.mode } };
  };

  const mem = {
    settings: Object.assign({ username: params.get('user') || '' }, params.get('agent') ? { agent: { url: 'http://127.0.0.1:8787', token: 'preview' } } : {}),
    ui: { tool: params.get('tool') || 'live', x: 20, y: 20, w: Number(params.get('w')) || 440, h: Number(params.get('h')) || 800 },
    rankings: JSON.parse(params.get('rankings') || '[]')
  };
  const listeners = [];
  window.chrome = {
    runtime: {
      id: 'preview',
      lastError: null,
      getURL: (path) => `/${path}`,
      sendMessage: (message, callback) => message.type === 'nightowl-agent'
        ? setTimeout(() => callback(agentReply(message)), 600)
        : fault === 'espn'
        ? callback({ ok: false, error: 'Failed to fetch' })
        : realFetch(message.type === 'nightowl-scoring-plays' ? `/plays?event=${message.eventId}` : `/relay?url=${encodeURIComponent(message.url)}`)
        .then((response) => response.json())
        .then((data) => callback({ ok: true, data }), (err) => callback({ ok: false, error: String(err) }))
    },
    storage: {
      local: {
        get: (key, callback) => callback({ [key]: mem[key] }),
        set: (items, callback) => {
          const changes = {};
          for (const [key, value] of Object.entries(items)) changes[key] = { newValue: value };
          Object.assign(mem, items);
          if (callback) callback();
          listeners.forEach((listener) => listener(changes, 'local'));
        },
        remove: (keys, callback) => {
          [].concat(keys).forEach((key) => delete mem[key]);
          if (callback) callback();
        }
      },
      onChanged: { addListener: (listener) => listeners.push(listener) }
    }
  };
})();
