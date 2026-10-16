<img src="docs/images/header.jpg" alt="Night Owl" width="100%">

# Night Owl

A small Chrome extension for [Sleeper](https://sleeper.com) fantasy football. It adds a
floating panel to sleeper.com that shows what's happening in all your leagues at once,
so you don't have to click through them one by one.

[**Download the latest version**](https://github.com/Treys21/NightOwl/releases/latest/download/night-owl.zip)

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

## AI trade ideas (optional, dynasty)

Night Owl can ask an AI to re-rank the finder's dynasty trade ideas, explain them, and answer follow-up questions. Nothing leaves your computer except through an agent you run yourself:

1. Install Node 20 or newer and Claude Code, and sign in to Claude Code once.
2. In a terminal: `cd tools/local-agent`, `npm install`, `node server.mjs`.
3. Open the Night Owl popup, paste the token from `~/.night-owl-agent/token` into the local agent card, and save.

The agent listens on 127.0.0.1 only and checks the token on every request. In testing, its first pick beat the plain finder's first pick by 14 to 26 points over the rest of the season on dynasty leagues; redraft AI is off because it showed no gain. Details and numbers are in `docs/ai-design.md`.

## Privacy

Everything runs in your browser. There's no account and no tracking. Night Owl only
reads public data from Sleeper, ESPN and The Ringer (for draft rankings). It can send a desktop
notification when one of your starters is ruled out before kickoff; you can turn that
off in the popup.

## Problems

If something doesn't work, [open an issue](https://github.com/Treys21/NightOwl/issues/new/choose).
For how the code is organized, see [CONTRIBUTING.md](CONTRIBUTING.md).

<sub>Made by [Anik Patel](https://github.com/Treys21) · MIT license · Not affiliated with Sleeper</sub>
