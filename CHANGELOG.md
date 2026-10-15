# Changelog

## 3.17.6

Internal cleanup, no change to what you see.

- The Live view is split into smaller parts: the Last week pane (`lastweek-view.js`) and the animations, jersey and count-up (`effects.js`) each have their own file. `live/view.js` is about 100 lines shorter.

## 3.17.5

Internal cleanup, no change to what you see.

- One shared `numbers` module replaces ten copies of the rounding helpers.
- One shared formatter for signed point changes and for the league picker, instead of a copy in each view.
- The three background fetch relays (KeepTradeCut, ESPN plays, ESPN data) share one handler.
- The trade, waiver and season views load each league's rosters, users and traded picks through one `api.leagueParts`.
- The season projection reuses the season's random generator instead of its own copy.
- Remembering which league cards are open is one helper.

## 3.17.4
- **Season recap** reads as a report: for each league, "What went right" (your top scorers, best pickup, best trade pickup) and "What went wrong" (the player you dropped or traded away who then produced for someone else), each with the headshot, name and points.

## 3.17.3
- **Last week** now leads with the plays themselves (twelve biggest, each with its headshot, size bar and per-league points); the insight cards are gone.

## 3.17.2
- **Season recap, visual.** Each league's recap is now a big rank and record, a luck pill, and cards with headshots for your MVP, best add, the one that got away, trades and wire activity, instead of a list of sentences. Lineup what-ifs are gone from it.

## 3.17.1
- **Last week, visual.** Result tiles with the margin, player headshots, a ★ on the deciding plays, short points pills per league and a bar for how big each play was, instead of sentences.

## 3.17.0
- **Live: Last week.** A fourth Live tab for the previous finished week: your result in every league, the plays that decided them (a touchdown that cost you leagues, a passer-and-receiver pair that won one and helped another), priced in each league's own scoring, and the biggest scoring plays that touched you.

## 3.16.0
- **Values rebuilt, redraft and dynasty separately.** Dynasty values blend the market with a multi-year production stream (position age curves, weighted by whether the team is contending or rebuilding). Redraft values are points over the league's real replacement level, with playoff weeks weighted by the team's standing (playoff team, in the hunt, long shot).
- **Redraft trades.** Cards flag players to sell high or buy low from recent scoring against projection, charge a premium for the side taking more bodies, and favour consolidation for leaders and weekly-starter depth for teams in the hunt. The analyzer adds the same plain notes.
- **Drafts.** Redraft drafts are graded on season points over replacement instead of a market consensus.
- **Dynasty trade analyzer** no longer judges a trade on this season's projected points alone: each side shows the lineup change for the next two seasons (position and age curves), a "within noise" tag when this season's change is too small to matter, and up to three plain cautions (helps now but costs later, years older or younger).

## 3.15.0
- **Drafts.** Kicker picks in a startup draft are recognised as placeholders for the rookie
  picks sold during it and replaced by the rookie pick they stand for (owned by whoever used
  it, ↔ where a trade moved it). Startup picks are judged against the picks around them
  rather than the rookie pick chart, and a team whose picks changed hands with no trade on
  record is graded on the players it took, with an asterisk.
- **Trade finder** offers only each team's soonest pick in every round and shows an incoming
  player in only one suggested deal.
- **Trade finder** no longer offers a rebuilding team an aging player (older than 26 at running back, 28 at receiver, 29 at tight end, 33 at quarterback), and applies the same rule to you when you pick the Rebuild goal.
- **Redraft teams** are never called rebuilding in the Trade finder (Playoff team, In the hunt, Long shot).
- **Season.** An opened league card takes the full row, so the extra odds columns show.

## 3.14.0
- **Lineups reads at a glance.** A status banner at the top says "All set", "No fixes needed"
  or "N fixes needed" with one specific line per fix; kickoff windows are compact cards with a
  status chip; each league block has a verdict, problems first, starters and bench in aligned
  columns, and backups only when a starter is at risk.
- **Season.** Projected standings add first-round exit, third-place and, for leagues with a
  draft, first-pick and top-3-pick odds. The "what you could have scored" line is gone.
- **Bets** shows just the touchdown odds (+150), not the implied percentage.
- **Tabs** are ordered Live, Lineups, Season, Moves, Draft, Bets.
- **Code and repo.** Comments are gone and names are spelled out across the source and tests;
  the repo is tidier (CI on Node 22 with read-only permissions, Dependabot, unused screenshots
  removed, package metadata filled in).

## 3.13.0
**A cleaner, calmer widget, a scheduled refresh, and a sweep of every state.**
- **Moves is simpler to read.** Finder cards show three stat tiles (points for you, your title
  odds before and after, value given against value received), one line of reasoning and a
  "Why it works" fold-out; the Trade analyzer, History and Drafts lose their long captions
  (they are tooltips now); History groups unused picks by year and folds the managers table.
- **Lineups, Season and Bets say less.** A backup is one line when there is nothing to gain,
  the Season review is one short sentence, and players with no lines fade back.
- **Scheduled refresh for what has no API.** Twice a day the background worker re-reads
  KeepTradeCut (dynasty and redraft) and The Ringer's rankings, so a tab opens on today's
  numbers. A Ringer refresh only replaces a board nobody has edited. Sleeper and ESPN stay live.
- **Every state, checked.** Unknown username (with a hint where to fix it), no leagues,
  offseason, leagues finished or in their draft, Sleeper, ESPN, KeepTradeCut or projections
  down, and a 340px-wide panel. Fixes: errors are a sentence rather than "Failed to fetch";
  Lineups with no league in season says so instead of showing empty windows; with ESPN down
  kickoffs show the day, not an invented 1:00 PM or a lock countdown; a dynasty league warns
  when KeepTradeCut is down; the Draft tab hides its filters until there is a board; Moves,
  Season and the nav keep their buttons visible on a narrow panel.

## 3.12.4
**Draft grades weigh the early picks; the board is colour only.**
- **Late busts count for less.** A pick that falls short is counted in proportion to what its
  slot was worth (at least a quarter of it), so a good first five rounds is a good draft even
  if the last rounds lose all their value. Hits count in full wherever they come.
- **Colour is the signal.** The ▲▼ badges and rings are gone: picks near expectation fade
  back and steals and busts are the strongly coloured cells.
- **Colour the board two ways:** against the pick chart (how far each pick is from its slot)
  or by player value (how much each player is worth now, whatever the slot).

## 3.12.3
**Manager names instead of team names.** Moves, Live and Season now show each manager's
Sleeper display name, which is easier to recognise than a team name (the team name is
the fallback when a manager has no display name).

## 3.12.2
**Draft grades on total value, and picks followed through every trade.**
- **Pick ownership.** A pick that changes hands before its draft is now followed through
  each trade. The manager who held it at the draft is credited with the player taken; anyone
  who passed it on is credited with its slot value on the pick chart (so a team that flipped
  a pick is no longer shown as having drafted the player).
- **Drafts are graded against the pick chart** (KeepTradeCut's early, mid and late values for
  each round), and teams on the total value they gained over it, trades included: a team that
  bought a pick is graded on the player against what it paid, one that sold on what it fetched.
  The table splits Picks, Trades and Gain.
- **Outliers stand out.** Picks near their slot fade back; steals and busts (50%+ off) get a
  ring, a bold name and a ▲ or ▼ badge with the percentage.
- **Trade analyzer** prices with the blended value (3.12.1) and the same package rule.

## 3.12.1
**The trade analyzer uses the blended price.**
- Moves → Trade now values players the way the finder does: KeepTradeCut mixed with
  projected points over replacement, and packages count the best player in full and
  each extra player only above replacement (redraft leagues too). Roster lists sort
  by the blended value and the tooltip shows the plain KeepTradeCut number beside it.

## 3.12.0
**Drafts board, picks graded as the players they became, full trade history, and a blended price.**
- **Moves → Drafts.** Each of a league's drafts as a board (rounds down, draft slots
  across), every pick coloured by how it has turned out against the picks around it,
  traded picks marked, and a letter grade per team's draft.
- **Spent picks are the players they became.** A traded pick whose draft has happened
  is valued as the player taken with it (matched by season, round and original owner),
  and the History card names him. Before, it counted as nothing, so a deal built on
  2025 picks graded as a robbery for whoever held the players.
- **Trade history covers the whole league**, back through every season, with points
  for finished seasons too. The league's "typical gap" that sets what the finder
  tolerates is read from the last two seasons only (older deals carry hindsight).
- **Finer trade grades.** Twelve steps (A+ to F) with wider bands: a near-even deal is
  a C, a typical 12% deal a B and a D+, and it takes a lopsided one to reach A+ or F.
- **A blended dynasty price.** A player's value mixes KeepTradeCut with his projected
  points over replacement (15% production for rebuilders, 30% in between, 45% for
  contenders), with a small haircut for young players KeepTradeCut prices on hope.
  Packages count the best player in full and each extra player only above replacement,
  so two mid pieces no longer add up to a star.

## 3.11.0
**Trade finder and waiver tuning: value over replacement, real byes, league-specific thresholds.**
- **Replacement level.** Lineups are now measured against the free agent a team
  would actually start (the league's best available at each position, or the
  weakest rostered starters when a position is picked clean, as quarterbacks are
  in superflex). A hole on a bye no longer scores zero, so a backup quarterback
  is worth the bye and injury weeks he covers, not a whole season, and bench
  filler no longer pads deals.
- **Byes from the NFL schedule.** A team with no game is on bye and its players
  are out that week; a healthy player with a game but no projection row is
  projected at his average; a week with no published projections is skipped
  rather than counted as zeros.
- **Far-off weeks fade** toward replacement (1.5% a week), since week 14 is less
  certain than next week.
- **Picks.** First- and second-round picks carry a small premium over KeepTradeCut
  (10% and 5%), and contenders and rebuilders now differ by a few percent on a
  pick, not 20%, which had made picks the cheap thing to give. Each side's
  shortlist mixes players and picks, and half the finder's results are
  player-for-player deals when they exist.
- **Per league.** Point thresholds scale with the league's scoring per starter
  and the weeks left; waiver recommendations use the same scale, the same
  byes and fades, and in dynasty never suggest cutting a player the market values.

## 3.10.0
**Trade history, season path and recap, and a backtest for the trade logic.**
- **Moves → History.** Every trade in a league (this season and last, following
  the league's history) with an A–F grade for each side: today's KeepTradeCut
  value in dynasty, plus what the players actually started for their new teams
  (redraft is graded on points alone). A table shows how each manager trades:
  deals, average value won or given up, and how much of it is picks.
- **The finder learns from the league.** A manager who trades often is likelier
  to say yes, and one who never has is flagged as a long shot; the other side's
  price tolerance follows what this league's trades have actually looked like;
  cards add a History line ("has made 4 trades in 2 seasons and usually comes out
  ahead: expect them to push on price").
- **Season → Path.** Each remaining opponent with your chance in the game, what
  finishing with each win total does to your playoff odds, how much your next game
  swings them ("win → 78%, lose → 31%"), and your route through the projected
  bracket. The simulation can now force a game's result to measure that.
- **Season → Recap.** What the bench cost you (and the costliest weeks), your MVP,
  the best player you added, the one you dropped who got away, and what your
  trades produced.
- **Backtest** (`npm run backtest -- --user <name>`). Rebuilds both rosters just
  before each real trade in your leagues and puts it through the finder's own
  gates, next to random swaps as a baseline, trying many parameter sets. It found
  that real dynasty deals look most even when packages are discounted much more
  steeply than assumed (power-mean exponent 2.5, was 1.5: the median gap between
  the sides fell from 23% to 12%), so that is now the default, and the price
  tolerances were widened to match (the other side may lose 12%, you may overpay
  20%). It also showed real trades are far lumpier than fair deals: in these
  leagues every trade had one side losing lineup points, so the finder's "both
  sides improve" proposals are deliberately cleaner than what people usually do.

## 3.9.0
**Trade finder** (Moves → Finder). For one league, it searches every team for
trades they would plausibly accept and you would actually want, and says why.
- **Redraft:** judged on lineup points for the rest of the season, with the
  playoff weeks counted extra (a title is won there), and priced on
  KeepTradeCut's redraft (fantasy) values so the other manager sees a fair deal.
  Contenders must come out ahead in points (you by 3+, them by 2+), never lose
  more than a tenth on price, and you never overpay by more than ~7%: the edge
  is production and fit, not a premium. A team out of the race takes a deal that
  wins on price instead of points. Packages are priced harder than in dynasty
  (depth is free on the waiver wire). Cards flag where the market and the
  projections disagree ("X projects 25% more points than his price suggests").
  A deal that lowers your own playoff or title odds (it fed a rival) is dropped.
  The trade analyzer shows the same consensus line.
- **Dynasty and keeper:** priced on KeepTradeCut as each team sees it, with a
  window per team from its playoff odds. Contenders pay in picks and youth for
  points this season and must come out ahead in points; rebuilders sell
  production for picks and youth and must come out ahead in value. Nobody does
  a deal because the calculator reads 2% their way, and the other side is never
  asked to lose more than 8% on consensus value.
- **Real-roster logic:** kickers and defenses are never trade chips; full
  rosters can cut a spare part (charged at his value in dynasty); picks are
  tracked per owner and priced by projected draft slot.
- **Ranking:** each deal is scored on how much both sides gain, then the season
  is replayed with the trade done and deals are re-ordered by what they do to
  your playoff and title odds.
- **Playoff weeks count extra** (1.5×) when any roster move is priced, in
  Waivers, the trade analyzer and the finder: a title is won there.
- **Controls:** shop one of your players, go after a specific player, or pick
  Win now / Balanced / Rebuild. Each card says how likely a yes is, and why each
  side wants it ("Brock Bowers starts at TE in 7 of 8 weeks"). Open any deal in
  the analyzer, or copy a ready-to-send offer.

## 3.8.0
**New: Moves tab** (Alt+Shift+6). Waivers and a trade analyzer, priced in what
each league actually scores.
- **Waivers.** Per league: the free agents who would raise your lineup over
  the rest of the season, with the player to cut (or "open spot"), plus the best
  adds for next week. Starter points gained, on Sleeper's projections in that
  league's own scoring, with your lineup re-set every remaining week.
- **Trade analyzer.** Pick a league and a team, tick what you give and get.
  You see each side's lineup points gained or lost, and both teams' playoff
  and title odds with the season replayed 2,000 times with the trade done.
- **Dynasty and keeper leagues use KeepTradeCut values** (refreshed daily, new
  host permission `keeptradecut.com`). The value is KTC's for the league's
  format (superflex or 1QB, and the tight-end premium column when the league
  pays one), scaled by how the league's scoring treats the player compared with
  KTC's PPR baseline, and packages are priced so depth doesn't buy a star.
  Redraft leagues use projected points only. Draft picks (next three drafts,
  rounds 1 to 4) can be traded too, with traded picks tracked per owner. The
  next draft's slots ("2027 1.03") come from the Season tab's projection: the
  season played out 2,000 times from the standings and every remaining week's
  projected lineups, sorted by the league's draft formula, then priced early,
  mid or late. Later drafts are priced mid. Ratios against the league's typical scoring are used, so
  standard scoring doesn't make picks look better than players.
- **Type checking.** `npm run typecheck` (`tsc --checkJs`) is part of `verify`
  and CI; it caught a malformed doc comment and a handful of typed-wrong spots.
- **Quality of life.** Alt+Shift+1…6 switches tool and Alt+Shift+M minimizes or
  restores the panel; each tool remembers its scroll position when you switch
  away and back.
- Season now shares its calendar, schedule, projection and simulation code
  with Moves (`season/model.js`).

Fixes and a cleanup pass from a full code review.
- **Draft board no longer jumps to the top.** It was redrawn from scratch on
  every 3-second poll, which reset the scroll position; now an unchanged board
  is left alone and a changed one keeps your place.
- **Rank badges update** on Sleeper's own draft list when a player is taken
  (they were stamped once and never refreshed), and come back if Sleeper
  re-renders the row.
- **Lineup alerts look ahead.** They used the week Sleeper is still showing
  until midweek, so Thursday's lineups could be missed; they now use the same
  look-ahead week as the Lineups tab.
- **A stuck request can't freeze a tool.** Every request gives up after 20
  seconds; before, one that never answered stopped that tool's polling until
  the page reloaded.
- **Less work while idle.** Live, Lineups and Season skip redrawing when a poll
  changed nothing, Live writes its saved state only when it changed, and the
  season projection yields between leagues so Sleeper's page never stalls.
- **Cleaner after an update.** An old panel left running after the extension is
  reloaded now removes itself instead of logging errors; the panel no longer
  stacks up listeners each time Sleeper forces it to rebuild.
- Under the hood: the code every tool repeated to find your username, user id,
  leagues, roster, team names and week now lives in two shared modules
  (`leagues`, `account`), one handler hides broken images, and dead styles are
  gone. 127 tests (9 new).

## 3.7.0
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
