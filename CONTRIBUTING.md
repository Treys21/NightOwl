# Contributing

Thanks for trying Night Owl! Bug reports and feedback are the most useful
contributions right now. Use the [issue forms](https://github.com/Treys21/NightOwl/issues/new/choose).

## Setup

```bash
git clone https://github.com/Treys21/NightOwl.git
cd NightOwl
npm ci
npm run verify
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
| Shared | `storage`, `dom`, `format`, `api`, `teams`, `players` | `api` is the only module that touches the network. `players` is the single cached copy of Sleeper's ~5 MB player directory. |
| Pure logic | `scoring`, `tracker`, `lineups`, `bets`, `match`, `draftOrder`, `ringer` | No DOM, no network. They also export via `module.exports` and are unit-tested in Node. |
| Views | `NightOwl.views.{draft, live, lineups, bets}` | Each one is `{ mount(el), unmount(), navigated?() }`. Only the visible view is mounted, and an unmounted view must stop all timers. |
| Shell | `panel/shell.js`, `panel/main.js` | The shell owns the shadow root, the tool switch, drag and resize. `main.js` is the entry point and follows Sleeper's SPA navigation. |

Styles live in `src/styles/*.css`, loaded with `NightOwl.dom.adoptStyles` as
constructed stylesheets. Colors follow Sleeper's palette, with the tokens
defined in `common.css`.

ESPN rejects requests that carry a sleeper.com Origin, so `api.kickoffs` and
`api.propBets` go through `src/background.js`. That relay only forwards
allow-listed ESPN hosts, and only for messages from this extension.

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
   `gh release create v<version> dist/night-owl-v<version>.zip --notes-file <notes>`.
