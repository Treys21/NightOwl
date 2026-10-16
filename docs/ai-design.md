# AI trade advice: design

## What the evidence says (eval v1, 20 redraft + 20 dynasty tuning cases)
- Dynasty: the model's first pick beat the static finder's first pick by +17 points over the rest of the season (interval 4 to 30, p = 0.009). The result holds with the market term turned off (+18, p = 0.004), so it is not the model optimizing a number it was shown.
- Redraft: no difference (+1.7, interval -10 to 9, p = 0.72). The best candidate in hindsight averages 55 points and the model's pick 22, so there is headroom, but the model lacked the facts that predict it.
- The model almost never proposes its own deals (2%). It re-ranks; it does not search.

## Result of step 1 (v2: recent form added, 20 redraft tuning cases)
Model first pick minus static first pick: -0.3 (interval -8 to 3, p = 0.89), against +1.7 for v1. Adding recent form did not help redraft re-ranking. Redraft AI stays off by default; next tests are verified custom deals (engine tools) and self-consistency, not more prompt wording.

## Principles
1. **The engine owns numbers, the model owns judgment.** Lineup points, fairness and acceptability come from the engine (`finder.judge`, `value.tradeImpact`). The model never invents or recomputes them.
2. **Only decision-time facts.** Anything a manager could see that week: standings, rosters, projections, recent weekly scoring. Nothing from after the decision.
3. **Ship per league type, only what beats the baseline.** Dynasty AI ships first. Redraft stays behind the static finder until it measures better.
4. **Every claim is checkable.** Replies are JSON; every id is validated against the roster; every custom deal is re-judged by the engine before it is shown.

## Layers
1. **Facts (deterministic, versioned).** `tools/eval/build-cases.mjs` and `src/moves/finder-view.js` `aiView()` build the same shape: league, my team, partner teams, candidate deals. v2 adds per-player recent form (last three weeks) and a per-week projection, so the model can tell hot streaks and lost roles from projections.
2. **Engine tools (next).** Expose `judge`, `impact` and `rank` to the agent as a small CLI inside the sandbox (`tools/local-agent`, analyst mode), so the model can propose its own deals and have them verified, instead of only choosing from the finder's list.
3. **Agent.** Direct mode: one call, JSON out. Analyst mode: sandboxed shell with numpy, scipy, pandas, statsmodels, scikit-learn and the engine tools, no network, writes only to a scratch directory. Chat mode keeps a short transcript for follow-up questions. All run on the user's laptop through the Claude Agent SDK; tools are off by default.
4. **Eval.** Pre-registered weights, quality-gated cases, tuning and held-out splits, paired league-clustered bootstrap, outlier clipping, noise floor. A prompt or facts change ships only if it beats the previous version on tuning and is confirmed once on held-out.

## Roadmap, in order
1. v2 facts and prompt (recent form): measure on the redraft tuning cases.
2. Measure run-to-run noise (repeat runs) before trusting small differences.
3. Engine tools in analyst mode; measure whether verified custom deals beat re-ranking.
4. Self-consistency (several samples, vote) if noise is high.
5. One check on the held-out set per milestone, then enable per league type in the extension.

## Learned trade likelihood (dynasty)
- A gradient-boosted model scores how much a deal looks like a trade real managers make, trained on about 5,000 real dynasty and keeper trades from 876 leagues against same-team single-swap alternatives. Fit and checked by whole league. On unseen leagues its AUC is 0.71 against 0.54 for value gap alone, and its probabilities are calibrated.
- Ranking the real trade among 60 alternatives between the same two teams: top 5 in 58% of trades against 39% for the gap-only baseline.
- It does not find better deals. Ranking by likelihood alone lowers the realized lineup gain; the model is used only as a gate that drops the least plausible 30% of candidates, which cost about 3 points in hindsight against picking by expected gain.
- Redraft is too weak to ship (AUC about 0.59) and keeps the static likelihood.
- The market feature is Sleeper's search rank, a snapshot that carries some end-of-season information, so live numbers may be slightly lower than the offline ones.
- `src/ai/likelihood.js` featurizes and predicts; it matches the Python training pipeline to 1e-6 on stored fixtures (`test/likelihood.test.js`). `src/ai/likelihood-input.js` builds its input from live league facts.

## Dynasty re-rank: confirmation and checks (suggest-v2, hindsight points over the rest of the season)
- Held-out, run once, never used for tuning: 48 dynasty cases in 15 leagues. Model first pick minus static finder first pick: +13.6 [5.6, 22.3], p = 0.002 (model -1.7, static -16.0).
- Tuning set, 30 cases in 11 leagues, two independent runs: +14.9 [4.1, 25.0] and +19.1 [5.9, 31.1]. The model picked the same first deal in both runs for 19 of 30 cases.
- Giving the model the engine verification tool (`tools/eval/engine.mjs`) did not help: +6.1 [-3.5, 15.4]. Own deals stayed at 1% to 7% in every arm. The model re-ranks; it does not search.
- The learned-likelihood gate (drop the least likely 30% of candidates) cost about 2 points on the first pick over 268 dynasty cases, and the dropped candidates were not worse in hindsight, so the finder only uses the learned score for its Likely, Fair shot and Long shot labels.
