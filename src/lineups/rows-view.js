globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { teams } = NightOwl;
  const { escape: escapeHtml, tenths: fmt } = NightOwl.format;
  const { slotLabel, teamUrl } = NightOwl.leagues;
  const core = NightOwl.lineups;

  const RISK_LABEL = { bye: 'Bye week', out: 'Out', questionable: 'Questionable' };
  const MOVE_VERB = { start: 'Start', slide: 'Slide', move: 'Slide', bench: 'Bench' };

  function optionChip(row, option, showProjection) {
    const direction = option.gain > 0 ? 'up' : option.gain < 0 ? 'down' : '';
    const effect = option.gain > 0 ? `gains ${fmt(option.gain)}` : option.gain < 0 ? `loses ${fmt(-option.gain)}` : 'is a wash';
    const verb = row.status === 'start' ? `Benching ${row.name} for` : `Starting ${row.name} over`;
    const slideNote = option.via ? ` (${option.via.name} slides to ${slotLabel(option.via.slot)})` : '';
    const title = `${verb} ${option.name} (${fmt(option.proj)} proj) ${effect}${slideNote}`;
    const sign = option.gain > 0 ? '+' : option.gain < 0 ? '−' : '±';
    const figure = showProjection ? fmt(option.proj) : `${sign}${fmt(Math.abs(option.gain))}`;
    return `<span class="lu-opt ${direction}" title="${escapeHtml(title)}">
      <b>${escapeHtml(option.name)}</b><span class="lu-opt-slot">${escapeHtml(slotLabel(option.slot))}</span>
      <span class="lu-gain ${showProjection ? '' : direction}">${figure}</span>
    </span>`;
  }

  function rowOptions(row) {
    const options = row.options || [];
    if (!options.length || row.locked || row.move) return '';
    const startsAtRisk = row.status === 'start' && core.riskOf(row);
    const improves = options[0].gain >= core.MIN_GAIN;
    if (!startsAtRisk && !improves) return '';
    const showProjection = !improves;
    const label = showProjection ? 'Backup' : row.status === 'start' ? 'Swap for' : 'Start over';
    const [best] = options;
    if (options.length === 1) {
      return `<div class="lu-row-options single"><span class="lu-row-options-label">${label}</span>${optionChip(row, best, showProjection)}</div>`;
    }
    return `<details class="lu-row-options">
      <summary><span class="lu-row-options-label">${label}</span>${optionChip(row, best, showProjection)}<span class="lu-row-options-more">+${options.length - 1} more</span></summary>
      <div class="lu-row-options-list">${options.slice(1).map((option) => optionChip(row, option, showProjection)).join('')}</div>
    </details>`;
  }

  function bestBanner(league) {
    if (!league.best || !league.best.moves.length) return '';
    return `<div class="lu-best">
      <div class="lu-best-head"><span>Best lineup</span><span class="lu-best-gain">+${fmt(league.best.gain)} pts</span></div>
      <ul class="lu-best-moves">${league.best.moves.map((move) => `<li class="lu-move ${move.type}">
        <span class="lu-move-verb">${MOVE_VERB[move.type]}</span><b>${escapeHtml(move.name)}</b>${move.slot ? `<span class="lu-move-slot">${escapeHtml(slotLabel(move.slot))}</span>` : ''}
      </li>`).join('')}</ul>
    </div>`;
  }

  function rowFlag(row) {
    if (row.status === 'ir' && row.injury === 'IR') return '';
    if (row.bye) return { text: RISK_LABEL.bye, tone: 'warn' };
    if (!row.injury) return '';
    const tone = core.OUT.has(row.injury) ? 'out' : 'warn';
    return { text: row.injury, tone };
  }

  function rowMove(row) {
    if (!row.move || row.locked) return '';
    const text = row.move === 'bench' ? 'Bench' : `${MOVE_VERB[row.move]} ${row.move === 'start' ? 'at' : 'to'} ${slotLabel(row.moveSlot)}`;
    return `<span class="lu-row-move ${row.move}">${row.move === 'start' ? '↑' : row.move === 'bench' ? '↓' : '↔'} ${escapeHtml(text)}</span>`;
  }

  function playerRow(league, row) {
    const risk = core.riskOf(row);
    const flag = rowFlag(row);
    const colors = teams.colors(row.team).primary;
    const scoresZero = row.status === 'start' && (row.bye || core.OUT.has(row.injury));
    const projection = row.status === 'ir' || row.status === 'taxi' ? '–' : scoresZero ? `<s>${fmt(row.proj)}</s>` : fmt(row.proj);
    const slotCell = row.status === 'start' ? slotLabel(row.slot) : row.status === 'bench' ? 'BN' : row.status === 'ir' ? 'IR' : 'TAXI';
    const extra = `${rowMove(row)}${rowOptions(row)}`;
    return `<li class="lu-row ${row.status}${risk === 'bye' || risk === 'out' ? ' at-risk' : ''}${row.move && !row.locked ? ' moving' : ''}" style="--tc:${colors}">
      <img class="lu-head" alt="" src="${teams.photo(row.pid, row.team)}" style="border-color:${colors}">
      <div class="lu-row-who">
        <span class="lu-name">${escapeHtml(row.name)}</span>
        <span class="lu-row-meta">${escapeHtml(row.pos)} · ${escapeHtml(row.team)}${flag ? ` <span class="lu-row-flag ${flag.tone}">${escapeHtml(flag.text)}</span>` : ''}</span>
      </div>
      <span class="lu-row-slot ${row.status}">${escapeHtml(slotCell)}</span>
      <span class="lu-row-proj${scoresZero ? ' zero' : ''}"${scoresZero ? ` title="Projected ${fmt(row.proj)}, but not expected to score"` : ''}>${projection}</span>
      ${extra ? `<div class="lu-row-extra">${extra}</div>` : ''}
    </li>`;
  }

  function emptySlotRow(slot) {
    return `<li class="lu-row vacant at-risk">
      <span class="lu-row-hole">+</span>
      <div class="lu-row-who"><span class="lu-name">Empty slot</span><span class="lu-row-meta">Fill before kickoff</span></div>
      <span class="lu-row-slot start">${escapeHtml(slotLabel(slot))}</span>
      <span class="lu-row-proj">–</span>
    </li>`;
  }

  function verdictChip(verdict) {
    if (verdict.state === 'fix') return `<span class="lu-block-verdict fix">${verdict.problems} to fix</span>`;
    if (verdict.state === 'better') return `<span class="lu-block-verdict better">+${fmt(verdict.gain)} available</span>`;
    return '<span class="lu-block-verdict set">✓ Set</span>';
  }

  function rowGroup(name, rows, renderRow, withColumns) {
    if (!rows.length) return '';
    return `<li class="lu-block-group"><span class="lu-block-group-name">${name}<i>${rows.length}</i></span>${withColumns ? '<span class="lu-block-group-column">Slot</span><span class="lu-block-group-column">Proj</span>' : ''}</li>${rows.map(renderRow).join('')}`;
  }

  function leagueBlock(league, rows, showBest) {
    const atRiskFirst = (a, b) => Number(!(core.riskOf(a) === 'bye' || core.riskOf(a) === 'out')) - Number(!(core.riskOf(b) === 'bye' || core.riskOf(b) === 'out'));
    const starters = rows.filter((row) => row.status === 'start').sort(atRiskFirst);
    const bench = rows.filter((row) => row.status === 'bench');
    const reserve = rows.filter((row) => row.status === 'ir' || row.status === 'taxi');
    const emptySlots = showBest ? league.empty : [];
    const renderRow = (row) => playerRow(league, row);
    return `<div class="lu-league">
      <div class="lu-league-head">
        <span class="lname">${escapeHtml(league.name)}</span>
        ${showBest ? verdictChip(core.verdictOf(league)) : ''}
        <a class="lu-edit" href="${teamUrl(league.leagueId)}">Edit lineup ↗</a>
      </div>
      ${showBest ? bestBanner(league) : ''}
      <ol class="lu-list">
        ${starters.length || emptySlots.length ? `<li class="lu-block-group"><span class="lu-block-group-name">Starters<i>${starters.length + emptySlots.length}</i></span><span class="lu-block-group-column">Slot</span><span class="lu-block-group-column">Proj</span></li>${emptySlots.map(emptySlotRow).join('')}${starters.map(renderRow).join('')}` : ''}
        ${rowGroup('Bench', bench, renderRow, !starters.length && !emptySlots.length)}
        ${rowGroup('IR and taxi', reserve, renderRow, false)}
      </ol>
    </div>`;
  }

  const ORDER = { start: 0, bench: 1, taxi: 2, ir: 3 };
  const sortRows = (rows) => rows.slice().sort((a, b) => ORDER[a.status] - ORDER[b.status] || (a.slotIndex ?? 99) - (b.slotIndex ?? 99) || b.proj - a.proj);

  NightOwl.lineupsRows = { leagueBlock, sortRows };
})(globalThis.NightOwl);
