<img src="docs/images/header.jpg" alt="Night Owl" width="100%">

# Night Owl

A small Chrome extension for [Sleeper](https://sleeper.com) fantasy football. It adds a
floating panel to sleeper.com that shows what's happening in all your leagues at once,
so you don't have to click through them one by one.

[**Download the latest version**](https://github.com/Treys21/NightOwl/releases/latest/download/night-owl.zip)

## What's in it

- **Live**: every scoring play by your players and your opponents', with what it did
  in each league (scoring settings differ), plus your win odds for the week.
- **Lineups**: the best lineup you can set before each kickoff, and a warning if a
  starter is on bye or a slot is empty.
- **Season**: standings, luck, and points left on the bench for every league. It can
  also play out the rest of the season and your playoff path.
- **Bets**: lines and hit rates for the players you're starting.
- **Moves**: waiver pickups, a trade analyzer, a trade finder, trade history with
  grades, and draft boards. Dynasty values come from KeepTradeCut.
- **Draft**: your own rankings, shown on the board in a Sleeper draft room.

Everything is read-only. Night Owl never changes anything in your leagues.

## Install

Night Owl isn't in the Chrome Web Store, so you load it yourself. It takes a couple of minutes.

1. Download [night-owl.zip](https://github.com/Treys21/NightOwl/releases/latest/download/night-owl.zip)
   and unzip it (double-click on a Mac; right-click and **Extract All** on Windows).
   You'll get a folder called `night-owl`.
2. Go to `chrome://extensions` in Chrome.
3. Turn on **Developer mode** (top right), click **Load unpacked**, and pick the
   `night-owl` folder.
4. Open [sleeper.com](https://sleeper.com) and enter your Sleeper username in the panel.

Leave the `night-owl` folder where it is, because Chrome runs the extension from it.
You can drag the panel anywhere and resize it from any edge.

**Updating:** download the new zip, unzip it over the old folder, then click the
refresh arrow on Night Owl's card in `chrome://extensions`.

## Privacy

Everything runs in your browser. There's no account and no tracking. Night Owl only
reads public data from Sleeper, ESPN, KeepTradeCut and The Ringer (for draft rankings). It can send a desktop
notification when one of your starters is ruled out before kickoff; you can turn that
off in the popup.

## Problems

If something doesn't work, [open an issue](https://github.com/Treys21/NightOwl/issues/new/choose).
For how the code is organized, see [CONTRIBUTING.md](CONTRIBUTING.md).

<sub>Made by [Anik Patel](https://github.com/Treys21) · MIT license · Not affiliated with Sleeper</sub>
