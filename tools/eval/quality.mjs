export const DEFAULT_QUALITY = {
  acceptThreshold: 0.7,
  minimumWeeksLeft: 3,
  shortWindowWeeks: 5,
  minimumCandidates: 2,
  fewCandidates: 5,
  marketLeakPenalty: 0.1,
  shortWindowPenalty: 0.2,
  fewCandidatesPenalty: 0.2,
  lopsidedFraction: 0.45,
  lopsidedPenalty: 0.5,
  thinLeaguePenalty: 0.3,
  minimumTeams: 8
};

export function scoreCase(meta, options = {}) {
  const rules = Object.assign({}, DEFAULT_QUALITY, options);
  const reasons = [];
  let score = 1;
  const hard = (reason) => { reasons.push(reason); score = 0; };
  const soft = (reason, penalty) => { reasons.push(reason); score -= penalty; };

  if (!meta.seasonComplete) hard('season-not-finished');
  if (meta.actingTeamAbandoned) hard('acting-team-abandoned');
  if (meta.weeksLeft < rules.minimumWeeksLeft) hard('too-few-weeks-left');
  if (meta.candidateCount < rules.minimumCandidates) hard('too-few-candidates');
  if (score === 0) return { score: 0, reasons, accepted: false };

  if (meta.weeksLeft < rules.shortWindowWeeks) soft('short-outcome-window', rules.shortWindowPenalty);
  if (meta.candidateCount < rules.fewCandidates) soft('few-candidates', rules.fewCandidatesPenalty);
  if (meta.teams < rules.minimumTeams) soft('thin-league', rules.thinLeaguePenalty);
  if (meta.marketValuesFromToday) soft('market-values-from-today', rules.marketLeakPenalty);
  if (meta.lopsidedShare > rules.lopsidedFraction) soft('many-lopsided-candidates', rules.lopsidedPenalty);

  score = Math.max(0, Math.round(score * 100) / 100);
  return { score, reasons, accepted: score >= rules.acceptThreshold };
}

export function median(values) {
  const sorted = values.slice().sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

export function madOutliers(values, limit = 3) {
  const center = median(values);
  const spread = median(values.map((value) => Math.abs(value - center))) * 1.4826;
  if (!spread) return values.map(() => false);
  return values.map((value) => Math.abs(value - center) / spread > limit);
}
