globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const VERSION = 'suggest-v1';

  const REDRAFT_GUIDE = [
    'This is a redraft league: there is no rebuilding, only the current season.',
    'Winning teams usually sell high on a player to a losing team, and they consolidate several assets into one star.',
    'Distressed assets (injured, slumping, discounted players) are worth buying for the stretch run.',
    'Two solid weekly starters for one star often helps a middle or losing team more than the star does, so suggest two-for-one deals in both directions.',
    'Losing teams take long-term, high-upside shots over current points.'
  ].join(' ');

  const DYNASTY_GUIDE = [
    'This is a dynasty or keeper league: market value, age and future seasons matter as well as this season.',
    'Contending teams should convert future value into points now, and rebuilding teams should do the reverse.',
    'Players past their position age curve lose value quickly; young players on the rise gain it.'
  ].join(' ');

  const OUTPUT = [
    'Reply with JSON only, no other text, in exactly this shape:',
    '{"suggestions":[{"candidate":"c3","pitch":"one sentence"},{"partnerId":4,"give":["id"],"get":["id","id"],"pitch":"one sentence"}]}',
    'Use "candidate" to pick one of the listed candidate keys, or give your own deal with "partnerId", "give" (players on my roster) and "get" (players on that partner roster).',
    'Each side has one or two players. Rank the suggestions best first. Give at most three. Use only the player ids and partner ids in the data.'
  ].join('\n');

  function system(view) {
    const guide = view.league.kind === 'redraft' ? REDRAFT_GUIDE : DYNASTY_GUIDE;
    return [
      'You advise one fantasy football manager on which trades to propose. You reason only from the facts you are given and never invent players, stats or values.',
      guide,
      'A good suggestion raises my lineup points for the rest of the season, is something the partner would plausibly accept, and fits where each team stands in the standings.',
      OUTPUT
    ].join('\n\n');
  }

  const playerLine = (player) => `${player.id} | ${player.name} | ${player.pos} | age ${player.age == null ? '?' : player.age} | ${player.team || 'FA'} | market ${player.market} | projected ${player.projected} | lineup value ${player.lineupValue}`;

  function teamText(label, team, limit) {
    const rows = team.players.slice(0, limit).map(playerLine);
    return `${label} (partnerId ${team.rosterId}): record ${team.record}, rank ${team.rank}, points for ${team.pointsFor}, contention window ${team.window}\n${rows.join('\n')}`;
  }

  function facts(view) {
    const league = view.league;
    const lines = [
      `League: ${league.kind}, ${league.teams} teams, week ${league.week}, ${league.weeksLeft} regular season weeks left, playoffs start week ${league.playoffStart}`,
      `Lineup slots: ${league.slots.join(', ')}. Superflex: ${league.superflex ? 'yes' : 'no'}. Tight end premium: ${league.tightEndPremium ? 'yes' : 'no'}. Points per reception: ${league.scoring.reception}.`,
      'Columns: id | name | position | age | team | market value | projected points for the rest of the regular season | lineup value (points my lineup loses if this player is removed).',
      '',
      teamText('MY TEAM', { rosterId: 'me', record: view.me.record, rank: view.me.rank, pointsFor: view.me.pointsFor, window: view.me.window, players: view.me.players }, 30),
      ''
    ];
    for (const partner of view.partners) lines.push(teamText('PARTNER', partner, 22), '');
    const nameOf = new Map([view.me].concat(view.partners).flatMap((team) => team.players.map((player) => [player.id, player.name])));
    lines.push('CANDIDATE DEALS (from a rules-based finder; points are the finder projections for the rest of the season):');
    for (const candidate of view.candidates) {
      const give = candidate.giveText || candidate.give.map((id) => nameOf.get(id) || id).join(' + ');
      const get = candidate.getText || candidate.get.map((id) => nameOf.get(id) || id).join(' + ');
      lines.push(`${candidate.key} | partnerId ${candidate.partnerId} | I give ${give} (${candidate.give.join(',')}) | I get ${get} (${candidate.get.join(',')}) | my points ${candidate.static.myPoints} | their points ${candidate.static.theirPoints} | likelihood ${candidate.static.likelihood}`);
    }
    return lines.join('\n');
  }

  const ANALYST_NOTE = [
    'You also have a sandboxed shell with python3 (numpy, scipy, pandas, statsmodels, scikit-learn) and no network.',
    'The working directory has players.csv (every player on my roster and the partner rosters: team, id, name, pos, age, nflTeam, market, projected, lineupValue) and candidates.csv (the listed deals, with give and get ids).',
    'Before you answer, run short scripts to check the numbers that matter: for example how much each deal changes my starting lineup, how thin each position is, how large the market gap is against the typical gap, or how a deal compares with the other candidates.',
    'Keep it to a handful of short commands, then reply with the JSON only. Every id in your reply must come from the data.'
  ].join('\n');

  function analystSystem(view) {
    return `${system(view)}\n\n${ANALYST_NOTE}`;
  }

  function chatSystem(view) {
    const guide = view.league.kind === 'redraft' ? REDRAFT_GUIDE : DYNASTY_GUIDE;
    return [
      'You are chatting with one fantasy football manager about their trades. Answer in plain, short sentences, using only the facts in the data and what they tell you. Never invent players, stats or values; say so when the data does not cover a question.',
      guide,
      'When you suggest a trade, name the players on both sides and say why it helps both teams.'
    ].join('\n\n');
  }

  function transcript(messages) {
    return messages.map((message) => `${message.role === 'assistant' ? 'ADVISOR' : 'MANAGER'}: ${message.content}`).join('\n\n');
  }

  function build(view) {
    return { version: VERSION, system: system(view), user: `${facts(view)}\n\nPick the best trades for my team.` };
  }

  NightOwl.aiPrompts = { VERSION, build, system, analystSystem, analystNote: ANALYST_NOTE, chatSystem, transcript, facts };
})(globalThis.NightOwl);

if (typeof module !== 'undefined') module.exports = globalThis.NightOwl.aiPrompts;
