globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { season, projection } = NightOwl;
  const { round1 } = NightOwl.numbers;
  const { escape: escapeHtml, short: shortNumber, tenths, percent } = NightOwl.format;

  const SIMS = NightOwl.model.SIMS;

  function create({ state }) {
    const ordinal = (number) => {
      const tail = number % 100 >= 11 && number % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[number % 10] || 'th');
      return `${number}${tail}`;
    };
    const record = (wins, losses, ties) => `${wins}–${losses}${ties ? `–${ties}` : ''}`;
    const signedTenth = (value) => { const rounded = round1(value); return rounded === 0 ? '0' : `${rounded > 0 ? '+' : '−'}${shortNumber(Math.abs(rounded))}`; };
    const oddsLabel = (probability) => (probability >= 0.995 ? '>99%' : probability > 0 && probability < 0.005 ? '<1%' : percent(probability));

    function table(league) {
      const cut = league.playoffTeams;
      return `<table class="se-table se-standings">
        <thead><tr><th>#</th><th>Team</th><th title="Wins-losses">Record</th><th title="Record if you played every team every week">All-play</th><th title="Points for">PF</th><th title="Wins above what your scores earned">Luck</th><th title="Power rating, 0–100: record 35%, points per week 35%, steadiness 15%, last 3 weeks 15%">Power</th>${league.rows.some((row) => row.playoffOdds != null) ? '<th title="Chance to make the playoffs">Playoffs</th>' : ''}</tr></thead>
        <tbody>${league.rows.map((row) => `
          <tr class="${row === league.me ? 'me' : ''}${cut && row.rank === cut ? ' cut' : ''}">
            <td>${row.rank}</td>
            <td class="se-team">${escapeHtml(row.name)}</td>
            <td>${record(row.wins, row.losses, row.ties)}</td>
            <td>${record(row.allPlay.w, row.allPlay.l, row.allPlay.t)}</td>
            <td>${shortNumber(row.pf)}</td>
            <td class="${row.luck > 0 ? 'up' : row.luck < 0 ? 'down' : ''}">${row.luck == null ? '–' : `${row.luck > 0 ? '+' : row.luck < 0 ? '−' : ''}${shortNumber(Math.abs(row.luck))}`}</td>
            <td>${row.power == null ? '–' : Math.round(row.power)}</td>
            ${row.playoffOdds == null ? '' : `<td>${oddsLabel(row.playoffOdds)}</td>`}
          </tr>`).join('')}</tbody>
      </table>${notes(league)}`;
    }

    function notes(league) {
      const parts = [];
      if (league.playoffTeams) parts.push(`Line under ${ordinal(league.playoffTeams)}: playoff cut.`);
      if (league.live) parts.push(`Week ${league.live} counts as if it ended now.`);
      return parts.length ? `<p class="muted small se-note">${parts.join(' ')}</p>` : '';
    }

    const METHODS = {
      linear: { label: 'Linear', blurb: 'Gaps count in proportion to their size.' },
      inverse: { label: 'Inverse', blurb: 'The worst teams pull far ahead; small gaps near the top barely count.' }
    };
    const pickLabel = (round, slot) => `${round}.${String(slot).padStart(2, '0')}`;

    function draftPicks(league) {
      return season.draftOrder(
        league.rows.map((row) => ({ rosterId: row.rosterId, wins: row.wins + row.ties / 2, max: row.max || 0, row: row })),
        { method: state.draftMethod }
      );
    }

    function myPicks(league, picks) {
      const mine = league.me.rosterId;
      const out = [];
      for (let round = 1; round <= league.draft.rounds; round++) {
        for (const pick of picks) if (league.draft.owner(round, pick.rosterId) === mine) out.push(pickLabel(round, pick.pick));
      }
      return out;
    }

    function draftBlock(league) {
      if (!league.draft) return '';
      const picks = draftPicks(league);
      const byRoster = new Map(league.rows.map((row) => [row.rosterId, row]));
      const held = myPicks(league, picks);
      const weight = Math.round(season.DRAFT_WIN_WEIGHT * 100);
      return `<section class="se-draft">
        <div class="se-draft-head">
          <div><b>${league.draft.season} draft order</b><span class="muted small">${league.live ? 'live, ' : ''}if the season ended now</span></div>
          <div class="tabs" role="group" aria-label="Draft order method">${Object.entries(METHODS).map(([key, method]) => `
            <button type="button" class="tab${state.draftMethod === key ? ' on' : ''}" data-method="${key}" aria-pressed="${state.draftMethod === key}" title="${escapeHtml(method.blurb)}">${method.label}</button>`).join('')}
          </div>
        </div>
        <table class="se-table se-draft-table">
          <thead><tr><th title="Round 1 pick">Pick</th><th>Team</th><th title="Wins">W</th><th title="Max points: best possible lineup every week">Max PF</th><th title="${weight}% wins, ${100 - weight}% max points; higher picks earlier">Score</th></tr></thead>
          <tbody>${picks.map((pick) => {
            const holder = league.draft.owner(1, pick.rosterId);
            const traded = holder !== pick.rosterId ? byRoster.get(holder) : null;
            return `<tr class="${holder === league.me.rosterId ? 'me' : ''}">
              <td>${pickLabel(1, pick.pick)}</td>
              <td class="se-team">${escapeHtml(pick.row.name)}${traded ? `<span class="se-via" title="Pick traded to ${escapeHtml(traded.name)}">→ ${escapeHtml(traded.name)}</span>` : ''}</td>
              <td>${shortNumber(pick.wins)}</td>
              <td>${pick.max ? tenths(pick.max) : '–'}</td>
              <td>${pick.score.toFixed(3)}</td>
            </tr>`;
          }).join('')}</tbody>
        </table>
        <p class="muted small se-note">${weight}% wins + ${100 - weight}% max points, worst first. ${escapeHtml(METHODS[state.draftMethod].blurb)}
          ${held.length ? `You hold <b>${held.join(', ')}</b>.` : `You hold no ${league.draft.season} picks.`}</p>
      </section>`;
    }

    const kpi = (value, label, { tone = '', title = '' } = {}) =>
      `<div class="se-kpi ${tone}"${title ? ` title="${escapeHtml(title)}"` : ''}><b>${value}</b><span>${label}</span></div>`;

    function firstsKpi(league) {
      const firsts = draftPicks(league).filter((pick) => league.draft.owner(1, pick.rosterId) === league.me.rosterId).map((pick) => pickLabel(1, pick.pick));
      return kpi(firsts.length ? firsts.join(', ') : 'Traded', `${league.draft.season} 1st`, {
        title: `Round 1 picks you hold, by the projected ${league.draft.season} draft order`
      });
    }

    const projRecord = (wins, losses) => `${shortNumber(round1(wins))}–${shortNumber(round1(losses))}`;
    const nameOf = (league, rosterId) => {
      const row = league.rows.find((row) => row.rosterId === rosterId);
      return row ? row.name : `Team ${rosterId}`;
    };

    const TOP_PICKS = 3;
    const firstPickOdds = (team) => (team.pickOdds ? team.pickOdds[0] : 0);
    const topThreePickOdds = (team) => (team.pickOdds ? team.pickOdds.slice(0, TOP_PICKS).reduce((total, odds) => total + odds, 0) : 0);

    function projectedTable(league, projected) {
      const cut = league.playoffTeams;
      const byes = projected.bracket && projected.bracket.rounds[0].matches.some((match) => !match.bottom);
      const showsDraftOdds = !!league.draft && projected.order.some((rosterId) => projected.teams[rosterId].pickOdds);
      return `<table class="se-table se-standings se-projected">
        <thead><tr><th title="Projected finish: average place across ${SIMS.toLocaleString()} simulated seasons">#</th><th>Team</th><th title="Projected final record (average across simulations)">Record</th><th title="Projected points for at season's end">PF</th>${cut ? '<th title="Chance to make the playoffs">Playoffs</th>' : ''}${byes ? '<th class="se-opt" title="Chance of a first-round bye">Bye</th>' : ''}${projected.bracket ? '<th title="Chance to win the championship">Title</th><th class="se-opt" title="Chance of losing the first playoff round">1st-round exit</th><th class="se-opt" title="Chance of winning the third-place game">3rd place</th>' : ''}${showsDraftOdds ? '<th class="se-opt" title="Chance of the first overall pick">#1 pick</th><th class="se-opt" title="Chance of a top-3 pick">Top 3</th>' : ''}</tr></thead>
        <tbody>${projected.order.map((rosterId, i) => {
          const team = projected.teams[rosterId];
          return `<tr class="${rosterId === league.me.rosterId ? 'me' : ''}${cut && i + 1 === cut ? ' cut' : ''}">
            <td>${i + 1}</td>
            <td class="se-team">${escapeHtml(nameOf(league, rosterId))}</td>
            <td>${projRecord(team.wins, team.losses)}</td>
            <td>${shortNumber(Math.round(team.pf))}</td>
            ${cut ? `<td>${oddsLabel(team.playoffOdds)}</td>` : ''}
            ${byes ? `<td class="se-opt">${oddsLabel(team.byeOdds)}</td>` : ''}
            ${projected.bracket ? `<td>${oddsLabel(team.titleOdds)}</td><td class="se-opt">${oddsLabel(team.firstRoundExitOdds)}</td><td class="se-opt">${oddsLabel(team.thirdPlaceOdds)}</td>` : ''}
            ${showsDraftOdds ? `<td class="se-opt">${oddsLabel(firstPickOdds(team))}</td><td class="se-opt">${oddsLabel(topThreePickOdds(team))}</td>` : ''}
          </tr>`;
        }).join('')}</tbody>
      </table>
      <p class="muted small se-note">${league.raw.inProgress ? `Week ${league.raw.next} so far, then ` : ''}each team's best projected lineup every week through the playoffs, played out ${SIMS.toLocaleString()} times on the real schedule${league.medianGame ? ', median games included' : ''}. Records are averages.</p>`;
    }

    function projectedDraftBlock(league, projected) {
      if (!league.draft) return '';
      const picks = projection.projectedDraft(projected, { method: state.draftMethod });
      const weight = Math.round(season.DRAFT_WIN_WEIGHT * 100);
      const held = [];
      for (let round = 1; round <= league.draft.rounds; round++) {
        for (const pick of picks) if (league.draft.owner(round, pick.rosterId) === league.me.rosterId) held.push(pickLabel(round, pick.pick));
      }
      return `<section class="se-draft">
        <div class="se-draft-head">
          <div><b>${league.draft.season} draft order</b><span class="muted small">projected, end of season</span></div>
          <div class="tabs" role="group" aria-label="Draft order method">${Object.entries(METHODS).map(([key, method]) => `
            <button type="button" class="tab${state.draftMethod === key ? ' on' : ''}" data-method="${key}" aria-pressed="${state.draftMethod === key}" title="${escapeHtml(method.blurb)}">${method.label}</button>`).join('')}
          </div>
        </div>
        <table class="se-table se-draft-table">
          <thead><tr><th title="Round 1 pick">Pick</th><th>Team</th><th title="Projected final wins">W</th><th title="Projected max points at season's end">Max PF</th><th title="Chance of the first overall pick">#1</th><th title="Chance of a top-3 pick">Top 3</th></tr></thead>
          <tbody>${picks.map((pick) => {
            const holder = league.draft.owner(1, pick.rosterId);
            const traded = holder !== pick.rosterId ? nameOf(league, holder) : null;
            return `<tr class="${holder === league.me.rosterId ? 'me' : ''}">
              <td>${pickLabel(1, pick.pick)}</td>
              <td class="se-team">${escapeHtml(nameOf(league, pick.rosterId))}${traded ? `<span class="se-via" title="Pick traded to ${escapeHtml(traded)}">→ ${escapeHtml(traded)}</span>` : ''}</td>
              <td>${shortNumber(round1(pick.wins))}</td>
              <td>${tenths(pick.max)}</td>
              <td>${pick.odds ? oddsLabel(pick.odds[0]) : '–'}</td>
              <td>${pick.odds ? oddsLabel(topThreePickOdds({ pickOdds: pick.odds })) : '–'}</td>
            </tr>`;
          }).join('')}</tbody>
        </table>
        <p class="muted small se-note">${weight}% wins + ${100 - weight}% max points on projected final numbers, worst first.
          ${held.length ? `You'd hold <b>${held.join(', ')}</b>.` : `You hold no ${league.draft.season} picks.`}</p>
      </section>`;
    }

    function bracketBlock(league, projected) {
      if (!projected.bracket) return '';
      const side = (entrant, chance) => (entrant
        ? `<div class="se-slot${entrant.rosterId === league.me.rosterId ? ' me' : ''}"><span class="se-seed">${entrant.seed}</span><span class="se-bteam">${escapeHtml(nameOf(league, entrant.rosterId))}</span><span class="se-bpts">${tenths(entrant.points)}</span><span class="se-bodds">${chance}</span></div>`
        : '<div class="se-slot bye"><span class="se-seed"></span><span class="se-bteam muted">Bye</span></div>');
      const champ = projected.bracket.champion;
      return `<section class="se-bracket">
        <div class="se-draft-head"><div><b>Projected playoffs</b><span class="muted small">favorites advance; % to win each game</span></div></div>
        <div class="se-rounds">${projected.bracket.rounds.map((round) => `
          <div class="se-round${round.matches.length === 1 ? ' solo' : ''}">
            <div class="se-round-h">${round.label}<span class="muted"> · Wk ${round.weeks.join('–')}</span></div>
            ${round.matches.map((match) => `<div class="se-match">
              ${side(match.top, match.bottom ? percent(match.pTop) : '')}
              ${match.bottom ? side(match.bottom, percent(1 - match.pTop)) : side(null)}
            </div>`).join('')}
          </div>`).join('')}
        </div>
        ${champ ? `<p class="muted small se-note">Projected champion: <b>${escapeHtml(nameOf(league, champ.rosterId))}</b> (${oddsLabel(projected.teams[champ.rosterId].titleOdds)} to win it all).${projected.teams[league.me.rosterId] ? ` You: ${oddsLabel(projected.teams[league.me.rosterId].titleOdds)}.` : ''}</p>` : ''}
      </section>`;
    }

    function projectedKpis(league, projected) {
      const myProjection = projected.teams[league.me.rosterId];
      const place = projected.order.indexOf(league.me.rosterId) + 1;
      const picks = league.draft ? projection.projectedDraft(projected, { method: state.draftMethod }) : null;
      const firsts = picks ? picks.filter((pick) => league.draft.owner(1, pick.rosterId) === league.me.rosterId).map((pick) => pickLabel(1, pick.pick)) : null;
      return `<div class="se-kpis">
        ${kpi(projRecord(myProjection.wins, myProjection.losses), `proj. · ${ordinal(place)}`, { title: 'Projected final record and finish' })}
        ${league.playoffTeams ? kpi(oddsLabel(myProjection.playoffOdds), 'playoffs', { tone: myProjection.playoffOdds >= 0.5 ? 'up' : 'down', title: `Chance to make the playoffs, from ${SIMS.toLocaleString()} projected seasons` }) : kpi(shortNumber(Math.round(myProjection.pf)), 'proj. PF')}
        ${projected.bracket ? kpi(oddsLabel(myProjection.titleOdds), 'title', { tone: myProjection.titleOdds >= 1 / league.rows.length ? 'up' : '', title: 'Chance to win the championship' }) : kpi(shortNumber(Math.round(myProjection.max)), 'proj. max')}
        ${firsts ? kpi(firsts.length ? firsts.join(', ') : 'Traded', `${league.draft.season} 1st`, { title: 'Round 1 picks you hold, by the projected end-of-season order' }) : kpi(oddsLabel(myProjection.byeOdds), 'bye', { title: 'Chance of a first-round bye' })}
      </div>`;
    }

    function leagueBlock(league) {
      const myTeam = league.me;
      const projectedLeague = state.mode === 'projected' ? state.projections.get(league.leagueId) : null;
      const projected = projectedLeague && !projectedLeague.error;
      const place = projected ? projectedLeague.order.indexOf(myTeam.rosterId) + 1 : myTeam.rank;
      const inPlayoffs = league.playoffTeams && place <= league.playoffTeams;
      const luck = myTeam.luck == null ? '–' : signedTenth(myTeam.luck);
      let body;
      if (state.mode !== 'projected') body = `${table(league)}${draftBlock(league)}`;
      else if (league.raw.next >= league.raw.playoffStart) body = `<p class="muted small se-note">The regular season is over; nothing left to project.</p>${table(league)}${draftBlock(league)}`;
      else if (!projectedLeague) body = '<div class="skel" role="status" aria-label="Projecting the rest of the season"><i></i><i></i><i></i></div>';
      else if (projectedLeague.error) body = `<p class="error">Couldn't project this league: ${escapeHtml(projectedLeague.error)}</p>`;
      else body = `${projectedTable(league, projectedLeague)}${bracketBlock(league, projectedLeague)}${projectedDraftBlock(league, projectedLeague)}`;
      return `<details class="se-league" data-id="${escapeHtml(league.leagueId)}"${state.open.has(league.leagueId) ? ' open' : ''}>
        <summary>
          <div class="se-head">
            <span class="se-name">${escapeHtml(league.name)}</span>
            <span class="se-rank${inPlayoffs ? ' in' : ''}" title="${projected ? 'Projected finish' : inPlayoffs ? 'In a playoff spot' : 'Outside the playoff spots'}">${projected ? 'proj. ' : ''}${ordinal(place)} of ${league.rows.length}</span>
          </div>
          ${projected ? projectedKpis(league, projectedLeague) : `<div class="se-kpis">
            ${kpi(record(myTeam.wins, myTeam.losses, myTeam.ties), league.medianGame ? 'incl. median' : 'record', { title: league.medianGame ? 'This league also plays the league median every week' : '' })}
            ${myTeam.playoffOdds == null
              ? kpi(record(myTeam.allPlay.w, myTeam.allPlay.l, myTeam.allPlay.t), 'all-play', { title: 'Your record if you played every team every week' })
              : kpi(oddsLabel(myTeam.playoffOdds), 'playoffs', { tone: myTeam.playoffOdds >= 0.5 ? 'up' : 'down', title: 'Chance to make the playoffs, from 2,000 simulations' })}
            ${kpi(luck, Math.abs(myTeam.luck) === 1 ? 'win of luck' : 'wins of luck', { tone: myTeam.luck > 0 ? 'up' : myTeam.luck < 0 ? 'down' : '', title: 'Wins above what your weekly scores earned' })}
            ${league.draft ? firstsKpi(league) : kpi(myTeam.efficiency == null ? '–' : percent(myTeam.efficiency), 'of max points', { title: 'Points scored out of the best lineup you could have set' })}
          </div>`}
        </summary>
        ${body}
      </details>`;
    }

    return { block: leagueBlock, nameOf, record, signedTenth };
  }

  NightOwl.seasonLeagues = { create };
})(globalThis.NightOwl);
