# Changelog

## Unreleased
- **Season: Now | Projected.** Projected plays out the rest of the season and
  the playoffs 2,000 times from every team's best projected lineup (Sleeper's
  weekly projections, scored by each league's rules, on the real schedule,
  median games included; a week in progress counts points so far plus what's
  left of each starter's game). It shows projected final records and finish,
  playoff, bye and title odds, the end-of-season draft order with #1-pick
  odds, and a projected playoff bracket in Sleeper's format.

## 3.6.0
A design pass across the whole panel: calmer, simpler, more consistent.
- **One control style.** Sub-tabs, filters, positions, Mine / Opponents and
  Linear / Inverse share one quiet look; teal fill now only means the active
  tool or good news.
- **Week first.** Each tool's bar shows the week instead of repeating its name.
  Lineups jumps to next week as soon as the last game ends (marked "upcoming").
- **Live:** Feed / Matchups / Games as underlined tabs, filters on one row,
  the play stage steps aside when nothing is on, finished matchups say
  "Won by" or "Lost by" with the week's record on the tab, scores always show
  two decimals, and the empty Games tab says why.
- **Season:** four numbers per league (record, playoffs, luck, your 1st or
  max points), value over label.
- **Lineups:** a two-line "Next lock" header; list labels sit over their numbers.
- **Popup:** Account and Draft rankings sections, one main button each,
  "synced 1h ago".
- Loading shows placeholder cards; narrow panels keep filter rows on one line.

Fixed:
- Draft board styles leaked into other tables.
- The popup said "connected as" without the name.

## 3.5.0
New, in Season:
- **Draft order** for dynasty and keeper leagues: next year's round-1 order if
  the season ended now, worst first, scored 30% on wins and 70% on max points.
  Switch between **Linear** (min-max: gaps count in proportion) and
  **Inverse** (reciprocal: the worst teams pull far ahead). Traded picks show
  who holds them, and you see every pick you own across all rounds.
- **Power rating** (0–100) for every team: record 35%, points per week 35%,
  steadiness 15%, last three weeks 15%.
- **Live standings:** once a week's games start, records, points, max points,
  luck and the draft order count that week as if it ended now, refreshing
  every 2 minutes while it's played.

Fixed:
- Season's luck and week review lagged a week after Sleeper had already
  recorded results: finished weeks now come from Sleeper's own records.

## 3.4.0
New:
- **Setup inside the panel:** type your Sleeper username right in the panel
  the first time you open it. The popup is no longer required.
- **Lineup alerts:** a Chrome notification when one of your starters is ruled
  out, put on IR, or on bye before his game locks, from ESPN's injury report.
  Click it to open that league's lineup page; switch alerts off in the popup.
- **Playoff odds** in Season, for you and every team in each league, from
  2,000 simulations of the rest of the regular season (median games included).
- **Live matchups** show how many starters each side still has to play, a
  win-chance line through the day, and how many matchups you're favored in.
- **Bets** keeps closing lines even if the tab wasn't open before kickoff
  (the background worker saves them), and players without a line show their
  live stats instead of a dead end.

Polish, from a design review:
- Live opens with a **So far today** recap instead of an empty feed mid-slate.
- Lineups only says "All set" when there's truly nothing to fix.
- Calmer look: a quiet panel frame that turns teal while your games are on, a
  solid tab highlight, and no decorative glows, sweeps or sparkles. Rows are
  neutral; team colours stay in the play pop-ups.
- The idle Live stage shrinks to a strip between plays.
- Optimal lineup suggestions are teal; amber is only for warnings.
- Bets toolbar: kickoff times in a dropdown, two rows instead of four.
- Draft board lists available players first, "Value" column, pick number in
  the on-the-clock banner.
- Season notes median-game records and shows which leagues expand.
- Visible keyboard focus, larger tap targets, labelled icon buttons.
- Matchup cards take their colour from the win chance, so a card never looks
  like a loss next to "Win 96%". The score gap stays neutral.
- Live bets read as progress: "38 of 54.5 rec yds".
- Lineup counts match what's listed, with one word ("to fix") everywhere; a
  backup list shows projections instead of negative gains.
- The recap folds bonus scoring keys into "big-play bonus" and keeps each
  player to two lines.

## 3.3.0
Ideas from r/fantasyfootballcoding and other Sleeper tools.
- New **Season** tab: every league in one place, with your rank, record,
  all-play record (as if you played every team every week), luck (wins above
  what your scores earned, counting median games correctly), and the share of
  max points your lineups scored. Each league shows last week's biggest bench
  mistake and says when the best lineup would have won. Expand a league for
  its full standings with the playoff line.
- **Win probability** on every Live matchup, from live points plus each
  starter's projection for the time left in his game (ESPN game clock). The
  bar under the score now shows your chance to win.
- Plainer on-screen wording: no more em-dashes in labels and notes.

## 3.2.0
- Resize the panel from any edge or corner, not just the bottom-right. One
  size for every tab, remembered between visits; double-click the header to
  reset it. The panel always stays inside the window, even when the browser
  window shrinks.
- Every tab adapts to the panel's size:
  - **Narrow:** compact Draft table; shorter labels.
  - **Short:** Live's stage shrinks, and hides when there's barely room for
    the feed.
  - **Wide:** Live plays, matchups and games, Lineups league cards, and Bets
    players flow into columns.
- Setup guide in the README written for non-technical fans, with a one-click
  download link.

## 3.1.0
- Live, rebuilt for busy slates: **Feed | Matchups | Games** tabs under the
  stage, pinned filters (helps me, hurts me, big plays, one league), compact
  play rows grouped by update, and collapsible games with live ones first.
- Each play shows its `+`/`−` in each league from your side, never a summed
  total across leagues.
- One pop-up at a time: at most the three biggest plays per update, and only
  plays worth a point or more. Fixed big-play pop-ups that rendered ghosted.
- When a data feed stops responding, the panel names it ("ESPN odds and
  kickoffs aren't responding right now") instead of a section going quiet.
- Bets: players whose game has started show "lines closed at kickoff".
- New logo, the "Hybrid" mark: cyan outer tube, pink inner tube. Redrawn 16 and
  32 px icons so the eyes stay distinct in the toolbar.
- New README with screenshots and an animated preview; brand assets in `docs/brand/`.

## 3.0.1
- Live: opening the panel after time away no longer shows everything that
  happened meanwhile as one giant "play" (e.g. a whole game's stat line). Those
  changes fold into a collapsed **While you were away** recap, and the stage
  and "Last play" only ever show real, just-happened plays.
- Bonus stats read as plain English: "40+ yd pass TD", "100+ rec yds bonus".

## 3.0.0
- First release for testers: a two-minute "Try it" install guide, feedback and
  bug report forms, and a downloadable release zip.
- Reorganized the code by tool (`shared/ panel/ draft/ live/ lineups/ bets/
  styles/`) under one `NightOwl` namespace, with one API client and one shared
  player cache (the draft board no longer keeps its own 5 MB copy).
- The draft board is a regular view, like Live, Lineups and Bets. Only the
  visible tool runs, and rank badges clear when you leave the Draft tab.
- Styles moved into real CSS files. The panel waits for them before it shows,
  so it never flashes unstyled.
- Draft status moved out of the header into the board's toolbar, so the tool
  switch never gets squeezed. "Status" sorting now lists available players first.
- The popup confirms your username ("✓ connected as …").
- ESLint in CI, plus tests for formatting, board sorting and content-script load order.

## 2.9.0
- MIT license; repository at github.com/Treys21/NightOwl.
- Test fixtures safe to publish: the rankings parser now tests against a
  synthetic page (no third-party article copy), league names anonymized.
- Final logo: the "Double Frame" neon mark (design #39) — pink and cyan tube
  frame around glowing owl eyes. New toolbar icons (16/32/48/128), and the
  panel badge now powers on frame by frame when the panel opens.

## 2.8.0
- New logo: the neon "Neon Eyes in Owl" mark — toolbar icons (16/32/48/128),
  panel badge (powers on when the panel opens), popup header and README.
  SVG sources in `icons/src/`.

## 2.7.1
- Lineups: livelier optimal-lineup callout (gold sweep, arrow move chips) and flagged rows.

## 2.7.0
- Renamed to **Night Owl** (was Sleeper Toolkit).

## 2.6.0
- Production prep: extension icons, Chrome 116 minimum, `npm run check` /
  `npm run package`, CI workflow, manifest tests, README for publishing.
- No personal defaults: the Sleeper username starts empty and each tool asks for
  it; debug logging is off unless `localStorage['sdr-debug'] = '1'`.
- Removed the unused `jsdom` dev dependency.

## 2.5
- Lineups: aligned edges throughout, single-line swap options, slimmer callouts.
- Bets: in-place list updates (no flicker), off-screen rows skipped, static
  panel background for smooth scrolling.

## 2.4
- Bets: compact expandable rows, pinned search / position / kickoff-window /
  sort toolbar, compact odds table, trimmed milestone ladders.
- Lineups: redesigned cards, window headers and optimal-lineup callout.

## 2.2 – 2.3
- American odds (+125 / −130) across Bets; larger, higher-contrast text;
  resizable panel.

## 2.1
- Bets tab: Sleeper Picks lines and payouts, anytime-TD odds, DraftKings
  milestones via ESPN, hit rates, projection vs line, defense ranks, implied
  team totals, live progress against each line.

## 1.8 – 2.0
- Lineups: exact optimal-lineup solver (flex-aware), every valid swap per player,
  swap gains that read the same from both sides, ESPN relay via the background
  worker with a Sleeper-schedule fallback.
- Visual overhaul: rotating gradient frame, glass cards, gradient numerals.

## 1.5 – 1.7
- Lineups tab: kickoff windows, starting/bench per league, start/sit flags.

## 1.2 – 1.4
- Live tab merged into the draft extension behind a tool switch; team-colored
  play pop-ups with jerseys, headshots and confetti.

## 1.1
- Draft rankings overlay with Ringer sync.
