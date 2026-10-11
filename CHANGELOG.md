# Changelog

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
