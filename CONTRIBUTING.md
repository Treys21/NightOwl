# Contributing

Thanks for trying Night Owl! Bug reports and feedback are the most useful
contributions right now. Use the [issue forms](https://github.com/Treys21/NightOwl/issues/new/choose).

## Setup

```bash
git clone https://github.com/Treys21/NightOwl.git
cd NightOwl
npm ci
npm run verify          # lint, type check (tsc --checkJs), manifest check, tests
```

Then go to `chrome://extensions`, choose **Load unpacked**, and pick the repo
folder. After editing, click ↻ on the card and refresh sleeper.com.

## Architecture

Content scripts are classic scripts that share one isolated world. Each one
adds a module to a single global, `NightOwl`, and the manifest's
`content_scripts` order is the dependency order (`test/content-scripts.test.js`
enforces it).

| Layer | Modules | Notes |
| --- | --- | --- |
| Shared | `storage`, `dom`, `format`, `leagues`, `api`, `account`, `teams`, `players` | `api` is the only module that touches the network (every request times out after 20 s). `account` resolves your username and user id once for every tool; `leagues` holds the league plumbing they all share (your roster, team names, the week to show). `players` is the single cached copy of Sleeper's ~5 MB player directory. |
| Pure logic | `scoring`, `tracker`, `lineups`, `bets`, `season`, `match`, `draftOrder`, `ringer` | No DOM, no network. They also export via `module.exports` and are unit-tested in Node. |
| Views | `NightOwl.views.{draft, live, lineups, bets, season, moves}` | Each one is `{ mount(el), unmount(), navigated?() }`. Only the visible view is mounted, and an unmounted view must stop all timers. |
| Shell | `panel/shell.js`, `panel/main.js` | The shell owns the shadow root, the tool switch, drag and resize. `main.js` is the entry point and follows Sleeper's SPA navigation. |

Views render on every poll, and most polls change nothing. Write markup with
`NightOwl.dom.setHtml(el, html)`, which skips the write when the element already
shows exactly that, so an idle panel does no DOM work and keeps its scroll
position.

Styles live in `src/styles/*.css`, loaded with `NightOwl.dom.adoptStyles` as
constructed stylesheets. Colors follow Sleeper's palette, with the tokens
defined in `common.css`.

ESPN rejects requests that carry a sleeper.com Origin, so `api.kickoffs` and
`api.propBets` go through `src/background.js`. That relay only forwards
allow-listed ESPN hosts, and only for messages from this extension.

## Layout

```
manifest.json
icons/                 extension icons (16/32/48/128); SVG sources in icons/src/
docs/                  README images, brand assets (logo, avatar, social preview)
scripts/               check.mjs (static checks), package.mjs (release zip)
src/
  background.js        ESPN fetch relay (allow-listed hosts only), lineup alerts,
                       and a twice-daily refresh of player and Ringer data
  shared/              storage, DOM helpers and styles loader, formatting,
                       league helpers, API client, account, team colors,
                       shared player directory
  panel/               shell.js (tool switch, drag, resize), main.js (entry)
  draft/               draft.js (controller), board.js, badges.js,
                       match-names.js, draft-order.js, ringer.js
  live/                view.js, scoring.js, tracker.js
  lineups/             view.js, core.js (windows, optimal lineup)
  bets/                view.js, core.js (lines, odds, hit rates)
  season/              view.js, extras-view.js (path and recap), path.js, recap.js,
                       replacement.js (replacement level, byes, fading projections),
                       core.js (all-play, luck, max points, win odds,
                       live week, draft order, power rating), project.js
                       (rest-of-season simulation), value.js (what a roster
                       move is worth in lineup points), model.js (calendar,
                       schedule, projections, shared by Season and Moves),
                       finder.js (trade proposals: how each side judges a deal)
  trades/              history.js (parse, grade, manager profiles), drafts.js (draft
                       boards and pick ownership), loader.js (fetch and cache)
  moves/               view.js (waivers, trade analyzer), finder-view.js (trade
                       finder), history-view.js, drafts-view.js, values.js (picks,
                       market values, blended price, windows)
  styles/              panel, draft, common, live, bets, lineups, season, moves (.css)
  shared/market-values.js  dynasty values from Sleeper's search rank, age and position (fitted on real trades; coefficients in market-fit.js)
  popup/               username, rankings editor, Ringer sync
tools/preview/         preview server and shim (fault switches: fault=, nfl=, leagues=, status=)
tools/backtest/        run.mjs: replays real trades through the finder's gates (npm run backtest -- --user <name>)
test/                  node --test, with real captured fixtures
```

## Tests

Pure logic is tested against real captured data: live scoring against Sleeper's
own matchup totals across leagues with different scoring, the lineup solver,
Sleeper Picks and ESPN parsing, odds conversion, the rankings parser (on a
synthetic page), name matching, snake-draft order, board sorting, feed outage
tracking, and the manifest. A load test runs every content script in manifest
order in one shared global, as Chrome does. The panels are checked by hand in
the browser.

## Previewing and design review

`npm run preview -- --user <sleeper username>` screenshots every tab at three
panel sizes into `.preview/`, using real data with league and owner names
anonymized. `node tools/preview/server.mjs` serves the same page for a live
look at `http://127.0.0.1:8765/?user=<name>&tool=live`.


## Ground rules

- Read-only, public endpoints only. No auth, no analytics, no servers of our own.
- Never hardcode a username or league; everything starts from the username the
  person enters (`npm run check` enforces part of this).
- Keep pure logic pure and tested. A new parser gets a fixture in `test/fixtures/`
  made from real captured data, with personal names anonymized.
- No third-party copyrighted content in the repo (articles, images).

## Releasing

1. Bump `version` in **both** `manifest.json` and `package.json` (`npm run check`
   fails if they differ) and add a `CHANGELOG.md` entry.
2. Run `npm run verify && npm run package`.
3. Commit, push to `main`, then
   `gh release create v<version> dist/night-owl-v<version>.zip dist/night-owl.zip --notes-file <notes>`.
   Keep the `night-owl.zip` asset: the README's download link points at it.
