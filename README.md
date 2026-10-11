<p align="center"><img src="icons/icon128.png" width="112" alt="Night Owl logo"></p>

# Night Owl

*Every play, every league, one glance.*

A Chrome extension for [Sleeper](https://sleeper.com) fantasy football that adds
a floating panel to sleeper.com with four tools. Not affiliated with Sleeper. Switch between them with the
**Draft | Live | Lineups | Bets** toggle in the panel header.

| Tool | What it does |
| --- | --- |
| **Draft** | Your own rankings as a live big board inside Sleeper mock and real drafts, plus rank badges on Sleeper's player rows. |
| **Live** | One game-day feed across every league you're in: each scoring play by your starters *and* your opponents' starters, with what it did in each league under that league's own scoring. |
| **Lineups** | Start/sit check before every kickoff window: who's starting or benched in each league, the exact optimal lineup, and every valid swap. |
| **Bets** | Player lines, anytime-TD odds, milestones, hit rates and matchup context for your starters — with live progress against each line once games start. Information only. |

Only the visible tool runs; the others stop polling. Drag the header to move
the panel and the bottom-right corner to resize it — both are remembered.

## Install

**From a release zip:** download `night-owl-v<version>.zip`, unzip it,
then in `chrome://extensions` turn on **Developer mode** → **Load unpacked** →
pick the unzipped folder.

**From source:** `git clone https://github.com/Treys21/NightOwl.git`, then **Load unpacked** the cloned folder.

After updating the files, click the ↻ reload icon on the extension's card in
`chrome://extensions` and refresh sleeper.com. The card shows the version, so
you can confirm the update took.

Requires Chrome 116 or newer.

## Getting started

1. Click the toolbar icon and enter your **Sleeper username**, then **Save**.
   Live, Lineups and Bets read your leagues from it; Draft uses it for the
   "you're on the clock" banner.
2. Open any page on sleeper.com — the panel appears in the corner.
3. *(Draft only)* In the popup, pick a scoring format and hit
   **Sync from Ringer** to load rankings, or add/reorder players by hand.

## The tools

### Draft

| Column | Meaning |
| --- | --- |
| Rk | Your rank |
| Player | Name + team |
| Pos | Position |
| Status | `available`, or the pick number they went at |
| Δ | `pick − your rank` — positive = fell to you (value), negative = reach |

Draft rooms (`sleeper.com/draft/...`) always open on this tool. Rankings edits in
the popup show up without a reload; export/import keeps a hand-tuned board safe.

### Live

- **Play stage** — every new scoring play pops up dressed in the player's team
  colors: jersey with his number, headshot, the points it was worth to you
  across leagues, and confetti for touchdowns. Double-click **Week N** to preview.
- **In this game** — for each game on now or later today, every starter from
  your matchups who's in it, tagged *you* / *opp* per league.
- **Matchups** — live score per league with both owners' avatars and a share bar.
  Tap one to see both lineups.
- **Live feed** — e.g. *CeeDee Lamb +1 rec · +15 rec yds* with a chip per league
  (*R1CO · you +2.5*, *NYC · opp +3*) and your net. Filter *Helps me* / *Hurts me*.

Polls Sleeper's live stats every 15s while one of your games is on (2 min
otherwise), diffs each player's stat line, and scores the difference with each
league's `scoring_settings` — this reproduces Sleeper's own `players_points`
exactly (see `test/live-tracker.test.js`). If the panel was closed, missed plays
fold into one entry per player marked *since last check*.

### Lineups

Games are grouped into kickoff windows (e.g. Sun 9:30 AM London, 1:00 PM slate,
4:05, 4:25, SNF, MNF). The next window to lock is first, with a countdown.

- **Every rostered player** from those teams in every league: **STARTING** (slot),
  **BENCH**, IR or taxi, projected points under that league's scoring, injury tag.
- **Optimal lineup** — solved exactly (max-weight slot assignment, so FLEX /
  SUPER_FLEX / REC_FLEX chains are considered together). Players whose game has
  started stay locked; byes and Out / IR / Doubtful count as zero. Shown when it
  beats your lineup by 1+ projected point, as exact start / slide / bench moves.
- **Every valid swap** per player, best first — straight swaps or one-step flex
  chains ("Mitchell in at FLEX, Shakir slides to WR"). The number is what the
  swap does to your lineup: **+** helps, **−** hurts.
- **Fix before kickoff** — starters on bye or Out, and empty slots.

Lineups are changed in Sleeper itself (the public API is read-only); each league
has an **Edit lineup ↗** link. Rosters re-read every minute while the tab is open.

### Bets

Every player you start (toggle **+ Opponents** for theirs), one compact row
each — tap to expand. The pinned toolbar searches by name or team, filters by
position or kickoff window, and sorts by kickoff, TD odds, hit rate, projection
vs line, or how many of your leagues he's in.

- **Anytime TD** — American odds (e.g. +125) with the implied chance.
- **Lines table** — Line · Over · Under (American odds) · Last 10 (mini chart +
  hit rate) · Proj (projection − line).
- **DraftKings milestones** — the six rungs nearest his line, each with how often
  he's reached it in his last 10.
- **Matchup** — opponent's rank vs his position, team implied total, game O/U and spread.
- **Live** — once his game starts, a progress bar per line fills from live stats;
  cashed lines turn teal (✓ HIT). Closing lines are kept after Sleeper pulls them
  at kickoff. Double-click **Bets** to preview.

Odds come from Sleeper Picks payouts (converted to American odds) and DraftKings
via ESPN. Nothing is placed or linked to any account. 21+, gamble responsibly —
1-800-GAMBLER.

## Privacy

- Everything runs in your browser. The only data stored is in
  `chrome.storage.local` on your machine: your Sleeper username, rankings, panel
  position/size, and caches (player directory, last stats snapshot, lines).
- No analytics, no tracking, no server of our own.
- Network requests go only to the public APIs listed below, and only read data.

## Permissions

| Permission | Why |
| --- | --- |
| `storage`, `unlimitedStorage` | Settings, rankings and caches (the Sleeper player directory is ~5 MB). |
| `sleeper.com` | Shows the panel on Sleeper pages. |
| `api.sleeper.app`, `api.sleeper.com` | Leagues, rosters, matchups, players, live stats, projections, schedule, Sleeper Picks lines. |
| `site.api.espn.com`, `sports.core.api.espn.com` | Kickoff times, game odds and DraftKings player props (fetched by the background worker — ESPN rejects requests from a sleeper.com page). |
| `theringer.com` | "Sync from Ringer" rankings for the draft board. |

## Data sources

All public and **undocumented** — they work today and can change without notice.
Each source fails on its own: if one breaks, only its section empties.

| Source | Used for |
| --- | --- |
| `api.sleeper.app/v1` | User, leagues, rosters, matchups, players, NFL state |
| `api.sleeper.com/stats`, `/projections`, `/schedule` | Live stats, projections, defense stats, schedule |
| `api.sleeper.app/lines/available` | Sleeper Picks player lines and payouts |
| ESPN scoreboard + core API | Kickoff times, spreads/totals, DraftKings props |
| The Ringer | Draft rankings |

## Development

No build step and no runtime dependencies — plain MV3 JavaScript loaded as
classic scripts. Node 20+ is only needed for tests and packaging.

```bash
npm test          # unit tests (node --test)
npm run check     # manifest files exist, scripts parse, versions agree
npm run package   # dist/night-owl-v<version>.zip for release / the Web Store
```

CI (`.github/workflows/ci.yml`) runs all three on every push and pull request
and uploads the zip as a build artifact.

Releasing: bump `version` in **both** `manifest.json` and `package.json` (the
check fails if they differ), add a `CHANGELOG.md` entry, then `npm run package`.

Debug logging on sleeper.com: run `localStorage.setItem('sdr-debug', '1')` in the
page console and reload.

### Layout

```
manifest.json
icons/                      extension icons (16/32/48/128 PNG)
icons/src/                  their SVG sources (logo.svg = master with glow)
scripts/                    check.mjs, package.mjs
src/background.js           fetch relay for ESPN (allow-listed hosts only)
src/popup/                  username, rankings editor, Ringer sync
src/sleeper/                panel shell + tool switch, draft board, inline badges, routing
src/lib/                    storage, CSP-safe styles, Sleeper API, name matching, Ringer parser
src/live/
  scoring.js tracker.js     live scoring + play diffing        (pure)
  lineups-core.js           kickoff windows, optimal lineup     (pure)
  bets-core.js              lines, odds, hit rates, ranks       (pure)
  teams.js players.js       team colors/CDN, shared player cache
  live-api.js               Sleeper/ESPN endpoints
  live.js lineups.js bets.js   the three views
  live-styles.js            styles for Live / Lineups / Bets
test/                       node --test, with real captured fixtures
```

### Tests

Pure logic is tested against real captured data: live scoring vs Sleeper's own
matchup totals (two leagues with different scoring), the lineup solver and flex
chains, Sleeper Picks lines / ESPN props / odds conversion, the rankings parser
(on a synthetic page with the same embedded-data structure),
name matching against the Sleeper player list, snake-draft order, and the
manifest itself. The panels are verified by hand in the browser.

### Design notes

- **Polling lives in content scripts**, not the service worker — MV3 workers are
  killed after ~30s idle and `chrome.alarms` fires at most once a minute.
- **Shadow DOM** isolates the panel from Sleeper's CSS (and vice versa).
- **`src/sleeper/inline-badges.js` is deliberately fragile** — it holds every
  guess at Sleeper's markup; if nothing matches it does nothing.
- **Ringer rankings are read from the page's embedded data**, not its table, so
  syncing is a fetch and exact.

## License

[MIT](LICENSE) © 2026 Anik Patel. Covers this code only — Sleeper, ESPN,
DraftKings and The Ringer data and names belong to their owners. Night Owl is
not affiliated with or endorsed by Sleeper.
