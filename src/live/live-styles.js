// Styles for the live tracker view, applied inside the panel's shadow root.
// Kept in sync with Sleeper's palette (see the comment at the top).
globalThis.SLT = globalThis.SLT || {};
globalThis.SLT.liveCss = `
/* Sleeper's own palette, read off sleeper.com: navy panels, teal accent with
   navy text on it, pink for the bad news, blue-grey secondary text. */
.slt-live {
  --bg: #181c28;
  --panel: #1f2431;
  --card: rgba(163, 187, 211, 0.07);
  --card-hover: rgba(163, 187, 211, 0.09);
  --line: #3a465b;
  --chip: #262e3e;
  --text: #ffffff;
  --sub: #bfcfe0;
  --muted: #8d9fbc; /* was #677897: too dim on navy for small text */
  --teal: #00ceb8;
  --teal-ink: #022047;
  --teal-soft: rgba(0, 206, 184, 0.12);
  --pink: #f75c8d;
  --pink-soft: rgba(247, 92, 141, 0.12);
  --flash: rgba(0, 206, 184, 0.22);
}

* { box-sizing: border-box; }
.slt-live {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
  line-height: 1.45;
  -webkit-font-smoothing: antialiased;
  color: var(--text);
  font: 13.5px/1.4 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
button {
  font: inherit;
  color: var(--sub);
  background: var(--chip);
  border: 0;
  border-radius: 8px;
  padding: 4px 9px;
  cursor: pointer;
}
button { transition: transform .15s, background .2s, color .2s; }
button:hover { color: var(--text); }
button:active { transform: scale(.92); }
button.spin { animation: spinbtn .8s linear infinite; }
@keyframes spinbtn { to { transform: rotate(1turn); } }
button.icon { background: none; font-size: 16px; padding: 2px 6px; }
button.icon:hover { background: var(--chip); }
h2 {
  display: flex; align-items: center; gap: 6px; flex-wrap: wrap;
  font: 700 12px Poppins, sans-serif; letter-spacing: .06em; text-transform: uppercase;
  color: var(--sub);
  margin: 16px 0 9px;
}
h2::after { content: ''; flex: 1; min-width: 20px; height: 1px; background: linear-gradient(90deg, var(--line), transparent); }
.game-h img { width: 18px; height: 18px; object-fit: contain; vertical-align: middle; }
.live-tag {
  font: 800 10.5px Poppins, sans-serif; letter-spacing: .1em; color: #fff; background: #e5203a;
  padding: 1px 6px; border-radius: 4px; animation: livepulse 1.6s infinite;
}
@keyframes livepulse { 50% { box-shadow: 0 0 0 4px rgba(229, 32, 58, .25); } }
#net-total { color: var(--muted); font-weight: 500; }
.muted { color: var(--muted); }
.small { font-size: 12px; }
.empty { text-align: center; padding: 14px 8px; }
.card { background: var(--panel); border-radius: 12px; padding: 10px 12px; margin-top: 10px; }
.error { color: var(--pink); background: var(--pink-soft); padding: 8px 10px; border-radius: 8px; margin: 10px 0 0; }

.slt-scroll { flex: 1; min-height: 0; overflow: auto; padding: 0 12px 20px; }
.bar {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 12px;
  background: transparent;
}
.title { display: flex; align-items: center; gap: 7px; font-family: Poppins, sans-serif; }
.title strong { font-weight: 600; font-size: 15px; }
.actions { display: flex; align-items: center; }
.dot { width: 8px; height: 8px; border-radius: 50%; background: var(--muted); }
.dot.live { background: var(--teal); box-shadow: 0 0 0 0 var(--teal); animation: pulse 1.6s infinite; }
@keyframes pulse { 70% { box-shadow: 0 0 0 6px rgba(0, 206, 184, 0); } 100% { box-shadow: 0 0 0 0 rgba(0, 206, 184, 0); } }

#league-toggles label { display: flex; gap: 8px; align-items: center; padding: 3px 0; color: var(--sub); }
#league-toggles input { accent-color: var(--teal); }

/* Matchups — head-to-head cards with both owners' avatars */
.match {
  position: relative; border-radius: 16px; margin-bottom: 10px; overflow: hidden;
  background: linear-gradient(160deg, rgba(163, 187, 211, .07), rgba(163, 187, 211, .025));
  border: 1px solid rgba(163, 187, 211, .08);
  transition: transform .2s, border-color .3s, box-shadow .3s;
}
.match:hover { transform: translateY(-1px); border-color: rgba(163, 187, 211, .18); }
.match::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--line); }
.match.win { box-shadow: inset 60px 0 60px -60px rgba(0, 206, 184, .35); }
.match.win::before { background: var(--teal); box-shadow: 0 0 12px var(--teal); }
.match.lose { box-shadow: inset 60px 0 60px -60px rgba(247, 92, 141, .3); }
.match.lose::before { background: var(--pink); box-shadow: 0 0 12px var(--pink); }
.match[open] { background: linear-gradient(160deg, rgba(163, 187, 211, .1), rgba(163, 187, 211, .04)); }
.match > summary { list-style: none; display: block; padding: 11px 12px 13px 14px; cursor: pointer; }
.match > summary::-webkit-details-marker { display: none; }
.m-league { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 9px; }
.m-league .margin { flex: none; }
.lname { font: 700 13px Poppins, sans-serif; color: var(--sub); min-width: 0; overflow-wrap: anywhere; }
.margin { font: 700 12px Poppins, sans-serif; font-variant-numeric: tabular-nums; padding: 1px 8px; border-radius: 999px; background: var(--chip); }
.margin.win { color: var(--teal-ink); background: var(--teal); box-shadow: 0 0 12px rgba(0, 206, 184, .4); }
.margin.lose { color: #fff; background: var(--pink); box-shadow: 0 0 12px rgba(247, 92, 141, .35); }
.m-row { display: grid; grid-template-columns: 30px minmax(0, 1fr) auto minmax(0, 1fr) 30px; align-items: center; gap: 8px; }
.av { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; background: var(--chip); border: 2px solid var(--line); }
.av.blank { display: grid; place-items: center; font: 700 13px Poppins, sans-serif; color: var(--sub); }
.match.win .av.me { border-color: var(--teal); }
.match.lose .av.opp { border-color: var(--pink); }
.m-side { display: flex; flex-direction: column; min-width: 0; }
.m-side.opp { align-items: flex-end; text-align: right; }
.tname { font-size: 11px; line-height: 1.25; color: var(--muted); max-width: 100%; overflow-wrap: anywhere; }
.big { font: 800 22px/1.1 Poppins, sans-serif; font-variant-numeric: tabular-nums; letter-spacing: -.02em; }
.m-side.opp .big { color: var(--sub); }
.match.win .m-side.me .big { color: #fff; text-shadow: 0 0 18px rgba(0, 206, 184, .45); }
.match.lose .m-side.opp .big { color: #fff; }
.vs { font: 800 10.5px Poppins, sans-serif; color: var(--muted); letter-spacing: .1em; padding: 3px 5px; border-radius: 6px; background: rgba(0, 0, 0, .25); }
.wp { position: relative; display: block; height: 5px; border-radius: 3px; margin-top: 9px; background: linear-gradient(90deg, rgba(247, 92, 141, .5), var(--pink)); overflow: visible; }
.wp > span { display: block; height: 100%; border-radius: 3px; background: linear-gradient(90deg, rgba(0, 206, 184, .5), var(--teal)); transition: width .9s cubic-bezier(.2, .9, .3, 1); }
.wp > i { position: absolute; top: 50%; width: 9px; height: 9px; border-radius: 50%; background: #fff; transform: translate(-50%, -50%); box-shadow: 0 0 10px rgba(255, 255, 255, .7); transition: left .9s cubic-bezier(.2, .9, .3, 1); }
.match.flash { animation: flash 2.5s ease-out; }
.big.bump { display: inline-block; animation: bump .6s cubic-bezier(.2, 1.6, .4, 1); }
.pill-count { font: 700 11px Poppins, sans-serif; padding: 1px 8px; border-radius: 999px; margin-left: 4px; }
.pill-count.good { background: var(--teal-soft); color: var(--teal); }
.pill-count.bad { background: var(--pink-soft); color: var(--pink); }
@keyframes flash { from { background: var(--flash); } }

.lineups { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 2px 12px 12px; font-size: 13px; }
.lineups h3 { font: 600 12px Poppins, sans-serif; color: var(--sub); margin: 0 0 6px; overflow-wrap: anywhere; }
.slot { display: grid; grid-template-columns: 30px minmax(0, 1fr) auto; gap: 6px; align-items: center; padding: 3px 0; }
.slot .pos {
  font-size: 10.5px; font-weight: 700; text-align: center; border-radius: 32px;
  padding: 1px 0; background: var(--chip); color: var(--sub);
}
.slot .pos.QB { color: #fc2b6d; } .slot .pos.RB { color: #20ceb8; } .slot .pos.WR { color: #56c9f8; }
.slot .pos.TE { color: #feae58; } .slot .pos.K { color: #bd66ff; } .slot .pos.DEF { color: #bf755d; }
.slot .nm { line-height: 1.25; overflow-wrap: anywhere; }
.slot .pt { font-variant-numeric: tabular-nums; color: var(--sub); }
.slot.playing .nm::after { content: " ●"; color: var(--teal); font-size: 10px; vertical-align: middle; }

.good { color: var(--teal); }
.bad { color: var(--pink); }

/* Feed */
.feed-head { display: flex; align-items: center; justify-content: space-between; }
.tabs { display: flex; gap: 4px; }
.tab { font: 600 12px Poppins, sans-serif; padding: 3px 9px; background: var(--teal-soft); color: var(--teal); }
.tab.on { background: var(--teal); color: var(--teal-ink); }
#feed { list-style: none; padding: 0; margin: 0; }
.ev {
  position: relative; overflow: hidden; border-radius: 14px; padding: 11px 12px 11px 14px; margin-bottom: 8px;
  background: linear-gradient(100deg, color-mix(in srgb, var(--tc, #262e3e) 22%, transparent), rgba(163, 187, 211, .03) 55%);
  border: 1px solid rgba(163, 187, 211, .07); border-left: 3px solid transparent;
  transition: transform .2s, border-color .2s;
}
.ev:hover { transform: translateX(2px); border-color: rgba(163, 187, 211, .16); }
.ev-who { display: flex; align-items: center; gap: 8px; min-width: 0; }
.face {
  width: 30px; height: 30px; border-radius: 50%; object-fit: cover; object-position: 50% 18%; flex: none;
  background: #fff; border: 2px solid var(--line); box-shadow: 0 2px 8px rgba(0, 0, 0, .35);
}
.ev.good { border-left-color: var(--teal); }
.ev.bad { border-left-color: var(--pink); }
.ev.new { animation: flash 3s ease-out; }
.ev-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
.ev-who > span { min-width: 0; overflow-wrap: anywhere; }
.ev-name { font-weight: 700; }
.ev-net { font: 800 16px Poppins, sans-serif; font-variant-numeric: tabular-nums; white-space: nowrap; padding: 1px 8px; border-radius: 8px; align-self: flex-start; background: var(--chip); }
.ev-net.good { background: var(--teal-soft); }
.ev-net.bad { background: var(--pink-soft); }
.ev-text { color: var(--sub); margin: 5px 0 8px 38px; overflow-wrap: anywhere; }
.ev .impacts, .ev .ev-time { margin-left: 38px; }
.impacts { display: flex; flex-wrap: wrap; gap: 4px; }
.impact { font-size: 12px; font-weight: 600; border-radius: 8px; padding: 2px 7px; font-variant-numeric: tabular-nums; }
.impact.helps { background: var(--teal-soft); color: var(--teal); }
.impact.hurts { background: var(--pink-soft); color: var(--pink); }
.impact.zero { background: var(--chip); color: var(--muted); }
.game-list { list-style: none; padding: 0; margin: 0; }
.game-list .ev { padding: 7px 12px; }
.game-list .impacts { margin-top: 4px; }
.ev-time { font-size: 11px; color: var(--muted); margin-top: 5px; }

.slt-live [hidden] { display: none !important; }

/* Score bumps and new feed cards */
@keyframes bump { 0% { transform: scale(1); } 35% { transform: scale(1.25); color: var(--teal); } 100% { transform: scale(1); } }
.ev.new { animation: slidein .5s cubic-bezier(.2, 1.3, .4, 1), flash 3s ease-out; }
@keyframes slidein { from { transform: translateX(-24px) scale(.96); opacity: 0; } }

/* Play pop-ups */
/* The stage: a fixed strip just for play animations */
.stage {
  flex: none; position: relative; height: 196px; overflow: hidden;
  margin: 0 12px 4px; border-radius: 16px;
  background:
    radial-gradient(120% 90% at 50% 120%, rgba(0, 206, 184, .10), transparent 60%),
    repeating-linear-gradient(90deg, transparent 0 38px, rgba(163, 187, 211, .04) 38px 40px),
    var(--panel);
  border: 1px solid var(--line);
}
.stage .idle {
  position: absolute; inset: 0;
  background: linear-gradient(115deg, color-mix(in srgb, var(--idle-tint, transparent) 28%, transparent), transparent 70%); display: flex; flex-direction: column; gap: 4px;
  align-items: center; justify-content: center; text-align: center; padding: 0 16px;
  font-size: 13px; color: var(--sub); transition: opacity .3s;
}
.stage.busy .idle { opacity: 0; }
.stage::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 40%; left: -40%; pointer-events: none;
  background: linear-gradient(100deg, transparent, rgba(255, 255, 255, .05), transparent);
  animation: shimmer 4.5s ease-in-out infinite;
}
.stage.busy::after { display: none; }
@keyframes shimmer { 60%, 100% { left: 110%; } }
.stage .idle-who { display: flex; align-items: center; gap: 6px; color: #fff; }
.stage .idle-who img { width: 26px; height: 26px; border-radius: 50%; object-fit: cover; object-position: 50% 18%; background: #fff; }
.stage .last-net { font: 800 26px Poppins, sans-serif; }
.stage.glow-good { animation: glowgood 1.4s ease-out; }
.stage.glow-bad { animation: glowbad 1.4s ease-out; }
@keyframes glowgood { from { box-shadow: inset 0 0 70px rgba(0, 206, 184, .55); } to { box-shadow: inset 0 0 0 rgba(0, 206, 184, 0); } }
@keyframes glowbad { from { box-shadow: inset 0 0 70px rgba(247, 92, 141, .55); } to { box-shadow: inset 0 0 0 rgba(247, 92, 141, 0); } }
.pop {
  --tp: #262e3e; --ts: #00ceb8; --ink: #fff;
  position: absolute; inset: 0; overflow: hidden;
  display: grid; grid-template-columns: 118px 1fr; align-items: center; gap: 4px;
  padding: 0 12px 0 6px;
  background:
    radial-gradient(140% 120% at 0% 100%, color-mix(in srgb, var(--tp) 85%, #000) 0%, transparent 70%),
    linear-gradient(115deg, var(--tp) 0%, color-mix(in srgb, var(--tp) 55%, #0b0f18) 58%, #0b0f18 100%);
  animation: pop 2.2s ease forwards;
  font-family: Inter, sans-serif; color: #fff;
}
.pop.good { box-shadow: inset 0 0 0 2px var(--teal), inset 0 0 46px rgba(0, 206, 184, .35); }
.pop.bad { box-shadow: inset 0 0 0 2px var(--pink), inset 0 0 46px rgba(247, 92, 141, .35); }
@keyframes pop {
  0% { opacity: 0; transform: scale(1.06); }
  10% { opacity: 1; transform: scale(1); }
  86% { opacity: 1; }
  100% { opacity: 0; }
}
/* A stripe in the team's second color sweeps across as the play lands. */
.pop .band {
  position: absolute; top: -40%; bottom: -40%; left: 30%; width: 34px;
  background: var(--ts); opacity: .9; transform: rotate(18deg);
  box-shadow: 18px 0 0 color-mix(in srgb, var(--ts) 35%, transparent), -14px 0 0 rgba(255, 255, 255, .12);
  animation: band 2.2s cubic-bezier(.2, .8, .2, 1) forwards;
}
@keyframes band {
  0% { transform: translateX(-260px) rotate(18deg); }
  22% { transform: translateX(0) rotate(18deg); }
  100% { transform: translateX(26px) rotate(18deg); }
}
.pop .mark {
  position: absolute; right: -26px; top: 50%; width: 190px; height: 190px; object-fit: contain;
  opacity: 0; transform: translateY(-50%) scale(.7) rotate(-10deg);
  animation: mark 2.2s ease-out forwards; filter: saturate(1.1);
}
@keyframes mark { 18% { opacity: .2; transform: translateY(-50%) scale(1) rotate(-8deg); } 100% { opacity: .16; transform: translateY(-50%) scale(1.06) rotate(-6deg); } }

/* The player figure: jersey with the headshot on the collar. */
.pop .fig { position: relative; height: 170px; z-index: 1; animation: fig .7s cubic-bezier(.2, 1.5, .4, 1) both; }
@keyframes fig { from { transform: translateX(-130px) rotate(-14deg); opacity: 0; } }
.pop .jersey { position: absolute; left: 4px; bottom: 6px; width: 112px; filter: drop-shadow(0 6px 10px rgba(0, 0, 0, .45)); }
.pop .head {
  position: absolute; left: 31px; bottom: 92px; width: 58px; height: 58px; object-fit: cover; object-position: 50% 18%;
  border-radius: 50%; background: #fff; border: 3px solid var(--ts);
  box-shadow: 0 4px 12px rgba(0, 0, 0, .45);
  animation: head .9s .18s cubic-bezier(.2, 1.8, .4, 1) both;
}
@keyframes head { from { transform: translateY(-30px) scale(.4); opacity: 0; } }
.pop .logo {
  position: absolute; left: 6px; top: 50%; width: 108px; height: 108px; object-fit: contain;
  transform: translateY(-50%); filter: drop-shadow(0 6px 12px rgba(0, 0, 0, .5));
}

/* The words, on a dark glass card so teal/pink read on any team color. */
.pop .copy {
  position: relative; z-index: 1; text-align: left; min-width: 0;
  padding: 8px 10px 9px; border-radius: 12px;
  background: rgba(11, 15, 24, .62); backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, .08);
  animation: copy .6s .1s cubic-bezier(.2, 1.3, .4, 1) both;
}
@keyframes copy { from { transform: translateX(40px); opacity: 0; } }
.pop .headline {
  display: inline-block; font: 800 12px Poppins, sans-serif; letter-spacing: .14em;
  color: var(--ink2, #101820); background: var(--ts); padding: 1px 7px; border-radius: 4px; margin-bottom: 2px;
  animation: shake .5s .3s 2;
}
@keyframes shake { 25% { transform: rotate(-4deg) scale(1.1); } 75% { transform: rotate(4deg) scale(1.1); } }
.pop .pts { font: 800 40px/1 Poppins, sans-serif; font-variant-numeric: tabular-nums; color: #fff; }
.pop.good .pts { color: var(--teal); text-shadow: 0 0 22px rgba(0, 206, 184, .5); }
.pop.bad .pts { color: var(--pink); text-shadow: 0 0 22px rgba(247, 92, 141, .5); }
.pop.big .pts { font-size: 48px; }
.pop .who { font: 700 15px Poppins, sans-serif; margin-top: 2px; line-height: 1.2; overflow-wrap: anywhere; }
.pop .who span { font: 500 12px Inter, sans-serif; color: var(--sub); }
.pop .what { color: var(--sub); font-size: 12px; margin: 1px 0 5px; }
.pop .where { display: flex; flex-wrap: wrap; gap: 3px; }
.pop .where .impact { font-size: 11px; padding: 1px 6px; }
.spark {
  position: absolute; left: 64px; top: 50%; width: 7px; height: 11px; z-index: 2; border-radius: 2px;
  animation: spark 1.4s cubic-bezier(.1, .7, .3, 1) forwards;
}
@keyframes spark {
  0% { transform: translate(-50%, -50%) rotate(0); opacity: 1; }
  100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) rotate(var(--rot)); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .big.bump, .ev.new, .pop, .pop *, .spark, .stage, .stage::after, .intro *, .live-tag { animation: none !important; }
}

/* ---- Lineups tool ---- */

/* Entrance: cards rise in, staggered, the first time a tool opens. */
.intro .match, .intro .ev, .intro .lu-league, .intro .stage, .intro h2 { animation: rise .55s cubic-bezier(.2, 1.1, .4, 1) both; }
.intro .match:nth-child(2), .intro .ev:nth-child(2) { animation-delay: .06s; }
.intro .match:nth-child(3), .intro .ev:nth-child(3) { animation-delay: .12s; }
.intro .match:nth-child(4), .intro .ev:nth-child(4) { animation-delay: .18s; }
.intro .match:nth-child(5), .intro .ev:nth-child(5) { animation-delay: .24s; }
.intro .match:nth-child(n+6), .intro .ev:nth-child(n+6) { animation-delay: .3s; }
@keyframes rise { from { opacity: 0; transform: translateY(14px) scale(.98); } }

/* Lineups extras */
@keyframes ringpulse { 50% { transform: rotate(-90deg) scale(1.15); } }
@keyframes pop-in { from { transform: scale(.3); opacity: 0; } }
.card { background: rgba(31, 36, 49, .8); border: 1px solid rgba(163, 187, 211, .1); }
/* Nothing on this row would help: keep the list but tone it down. */

/* ==== Wow pass ==== */

/* Glass: a faint top highlight on every card. */
.match, .ev, .stage, .card {
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 6px 18px rgba(0, 0, 0, .18);
}
.match.win { box-shadow: inset 60px 0 60px -60px rgba(0, 206, 184, .35), inset 0 1px 0 rgba(255, 255, 255, .06), 0 6px 18px rgba(0, 0, 0, .18); }
.match.lose { box-shadow: inset 60px 0 60px -60px rgba(247, 92, 141, .3), inset 0 1px 0 rgba(255, 255, 255, .06), 0 6px 18px rgba(0, 0, 0, .18); }
.match.win::before { animation: edgeglow 2.8s ease-in-out infinite; }
@keyframes edgeglow { 50% { box-shadow: 0 0 18px var(--teal), 0 0 4px var(--teal); } }

/* Light sweeps across a card on hover. */
.match::after, .ev::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(105deg, transparent 35%, rgba(255, 255, 255, .08) 50%, transparent 65%);
  transform: translateX(-110%); transition: transform .9s ease;
}
.match:hover::after, .ev:hover::after { transform: translateX(110%); }

/* Gradient numerals. */
.big {
  background: linear-gradient(180deg, #ffffff 30%, #a3bbd3);
  -webkit-background-clip: text; background-clip: text; color: transparent;
}
.m-side.opp .big { background-image: linear-gradient(180deg, #c9d6e3 30%, #677897); }
.match.win .m-side.me .big { background-image: linear-gradient(180deg, #ffffff 10%, #00ceb8); text-shadow: none; filter: drop-shadow(0 0 10px rgba(0, 206, 184, .35)); }
.match.lose .m-side.opp .big { background-image: linear-gradient(180deg, #ffffff 10%, #f75c8d); filter: drop-shadow(0 0 10px rgba(247, 92, 141, .3)); }

/* Flowing gradient borders: next window (teal/violet), optimal banner (gold). */
@keyframes borderflow { from { background-position: 0 0, 0% 0; } to { background-position: 0 0, 300% 0; } }
@keyframes twinkle { 50% { transform: scale(1.35) rotate(20deg); opacity: .6; } }

/* Stage idle: a slow star field while waiting for a play. */
.stage .idle::before {
  content: ''; position: absolute; inset: 0; pointer-events: none; opacity: .55;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 22%, #fff, transparent),
    radial-gradient(1px 1px at 28% 70%, #56c9f8, transparent),
    radial-gradient(1.5px 1.5px at 46% 36%, #fff, transparent),
    radial-gradient(1px 1px at 63% 82%, #bd66ff, transparent),
    radial-gradient(1.5px 1.5px at 78% 28%, #00ceb8, transparent),
    radial-gradient(1px 1px at 90% 64%, #fff, transparent),
    radial-gradient(1px 1px at 36% 12%, #feae58, transparent),
    radial-gradient(1.5px 1.5px at 55% 58%, #fff, transparent);
  animation: stars 6s ease-in-out infinite alternate;
}
@keyframes stars { from { opacity: .25; transform: translateY(0); } to { opacity: .7; transform: translateY(-4px); } }
.stage .idle > * { position: relative; }

/* Richer chips and pills. */
.margin.lose { background: linear-gradient(135deg, #f75c8d, #ff86aa); }
.face, .lu-head, .av { transition: transform .25s cubic-bezier(.2, 1.6, .4, 1); }
.ev:hover .face, .match:hover .av { transform: scale(1.12) rotate(-4deg); }

@media (prefers-reduced-motion: reduce) {
  .match.win::before, .stage .idle::before { animation: none !important; }
  .match::after, .ev::after { display: none; }
}

/* ==== Bets tool ==== */
.bar .actions .tabs { margin-right: 4px; }
.bt-ctx { display: flex; flex-wrap: wrap; gap: 5px; margin: 10px 0 8px; }
.bt-ctx > span { font-size: 11.5px; color: var(--sub); padding: 2px 8px; border-radius: 999px; background: rgba(0, 0, 0, .25); border: 1px solid rgba(163, 187, 211, .08); display: inline-flex; align-items: center; gap: 4px; }
.bt-ctx b { color: #fff; }
.bt-opp img { width: 14px; height: 14px; object-fit: contain; }
.bt-rank.good { color: var(--teal); border-color: rgba(0, 206, 184, .35) !important; }
.bt-rank.bad { color: var(--pink); border-color: rgba(247, 92, 141, .3) !important; }
.bt-spark { position: relative; display: inline-flex; align-items: flex-end; gap: 2px; height: 22px; padding: 0 1px; }
.bt-spark i { display: block; width: 6px; border-radius: 2px 2px 0 0; background: rgba(163, 187, 211, .28); }
.bt-spark i.over { background: linear-gradient(180deg, #2fe6d2, #00ceb8); box-shadow: 0 0 6px rgba(0, 206, 184, .4); }
.bt-spark b { position: absolute; left: -2px; right: -2px; height: 0; border-top: 1px dashed #feae58; }
.bt-ladders { margin-top: 10px; display: grid; gap: 6px; }
.bt-sub { font: 600 11px Inter, sans-serif; color: var(--muted); text-transform: uppercase; letter-spacing: .05em; }
.bt-ladder { display: grid; gap: 4px; }
.bt-ladder-lbl { font: 600 12px Poppins, sans-serif; color: var(--sub); }
.bt-rungs { display: flex; gap: 4px; }
.bt-rung { display: inline-flex; flex-direction: column; align-items: center; min-width: 0; flex: 1; padding: 3px 4px; border-radius: 8px; font: 700 12px Poppins, sans-serif; background: rgba(0, 0, 0, .3); border: 1px solid rgba(163, 187, 211, .1); }
.bt-rung small { font: 600 10.5px Inter, sans-serif; color: var(--muted); }
.bt-rung.reached { background: linear-gradient(135deg, #00ceb8, #2fe6d2); color: var(--teal-ink); border-color: transparent; box-shadow: 0 0 10px rgba(0, 206, 184, .45); animation: pop-in .5s cubic-bezier(.2, 1.8, .4, 1); }
.bt-rung.reached small { color: rgba(2, 32, 71, .7); }
.bt-legal { font-size: 11px; color: var(--muted); text-align: center; margin: 14px 8px 4px; line-height: 1.4; }
@media (prefers-reduced-motion: reduce) { .bt-mkt.just-hit, .bt-rung.reached { animation: none !important; } }

/* ==== Bets navigation ==== */
.bt-toolbar {
  position: sticky; top: 0; z-index: 4; margin: 0 -12px 8px; padding: 8px 12px 9px;
  background: #151926; border-bottom: 1px solid rgba(163, 187, 211, .1);
  display: grid; gap: 7px;
}
.bt-tool-row { display: flex; align-items: center; gap: 6px; }
.bt-tool-row.chips { flex-wrap: wrap; gap: 5px; }
#bt-q {
  flex: 1; min-width: 0; font: 13px Inter, sans-serif; color: #fff;
  background: rgba(0, 0, 0, .35); border: 1px solid rgba(163, 187, 211, .16); border-radius: 10px; padding: 7px 10px;
  outline: none; transition: border-color .2s, box-shadow .2s;
}
#bt-q:focus { border-color: var(--teal); box-shadow: 0 0 0 3px rgba(0, 206, 184, .18); }
#bt-q::placeholder { color: var(--muted); }
#bt-sort {
  font: 600 12px Poppins, sans-serif; color: #fff; background: rgba(0, 0, 0, .35);
  border: 1px solid rgba(163, 187, 211, .16); border-radius: 10px; padding: 6px 8px; cursor: pointer;
}
.bt-toolbar .chip {
  font: 600 12px Poppins, sans-serif; color: var(--sub); background: rgba(0, 0, 0, .3);
  border: 1px solid rgba(163, 187, 211, .12); border-radius: 999px; padding: 3px 10px; cursor: pointer;
}
.bt-toolbar .chip.on { color: var(--teal-ink); background: linear-gradient(135deg, #00ceb8, #2fe6d2); border-color: transparent; box-shadow: 0 0 10px rgba(0, 206, 184, .35); }
.bt-toolbar .chip.ghost { margin-left: auto; background: none; color: var(--teal); border-color: rgba(0, 206, 184, .35); }
.bt-group-h:not(:first-child) { margin-top: 12px; }
.bt-group-h {
  position: sticky; top: var(--bt-tb, 0px); z-index: 3; margin: 0 -12px 6px; padding: 7px 12px;
  display: flex; align-items: center; gap: 6px; font: 700 12px Poppins, sans-serif; color: var(--sub);
  background: #151926;
}
.bt-group-h > span:last-child { margin-left: auto; color: var(--muted); font-weight: 600; }
.bt-item {
  position: relative; border-radius: 14px; margin-bottom: 6px; overflow: hidden;
  background: linear-gradient(110deg, color-mix(in srgb, var(--tc, #262e3e) 20%, transparent), rgba(163, 187, 211, .035) 50%);
  border: 1px solid rgba(163, 187, 211, .09);
  transition: border-color .2s, background .2s;
}
.bt-item:hover { border-color: rgba(163, 187, 211, .2); }
.bt-item::before { content: ''; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--tc, var(--line)); }
.bt-item.mine::before { background: linear-gradient(180deg, var(--teal), var(--tc, var(--teal))); }
.bt-item.theirs { opacity: .9; }
.bt-item[open] { border-color: rgba(0, 206, 184, .3); background: linear-gradient(160deg, color-mix(in srgb, var(--tc, #262e3e) 26%, transparent), rgba(163, 187, 211, .04) 45%); }
.bt-item.cashing { animation: cashpulse 1.2s ease-in-out 3; }
@keyframes cashpulse { 50% { box-shadow: 0 0 0 1px rgba(0, 206, 184, .5), 0 0 16px rgba(0, 206, 184, .25); } }
.bt-item > summary {
  list-style: none; cursor: pointer; display: grid; grid-template-columns: 34px minmax(0, 1fr) auto 12px;
  align-items: center; gap: 10px; padding: 9px 10px 9px 12px;
}
.bt-item > summary::-webkit-details-marker { display: none; }
.bt-item > summary .face { width: 34px; height: 34px; }
.bt-sum { display: grid; gap: 3px; min-width: 0; }
.bt-sum-top { display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 7px; min-width: 0; overflow-wrap: anywhere; }
.bt-sum-bot { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 6px; }
.bt-key { font-size: 12px; color: var(--sub); }
.bt-key b { color: #fff; }
.bt-key-lbl { color: var(--muted); }
.bt-key-hr { font: 700 11px Poppins, sans-serif; padding: 0 5px; border-radius: 5px; background: var(--chip); color: var(--sub); }
.bt-key-hr.good { background: var(--teal-soft); color: var(--teal); }
.bt-key-lean.up { color: var(--teal); }
.bt-key-lean.down { color: var(--pink); }
.bt-key-live { font: 700 11px Poppins, sans-serif; padding: 0 6px; border-radius: 5px; background: rgba(86, 201, 248, .18); color: #56c9f8; }
.bt-key-live.hit { background: var(--teal); color: var(--teal-ink); }
.bt-exp { font: 700 10.5px Poppins, sans-serif; padding: 1px 6px; border-radius: 5px; }
.bt-exp.you { background: var(--teal-soft); color: var(--teal); }
.bt-exp.opp { background: var(--pink-soft); color: var(--pink); }
.bt-exp.hit { background: var(--teal); color: var(--teal-ink); }
.bt-atd {
  display: flex; flex-direction: column; align-items: center; padding: 3px 8px; border-radius: 10px; min-width: 56px;
  background: linear-gradient(135deg, rgba(254, 174, 88, .16), rgba(247, 92, 141, .12)); border: 1px solid rgba(254, 174, 88, .3);
}
.bt-atd b { font: 800 14px Poppins, sans-serif; color: #fff; font-variant-numeric: tabular-nums; }
.bt-atd small { font: 600 10px Inter, sans-serif; color: #feae58; white-space: nowrap; }
.bt-atd.hit { background: linear-gradient(135deg, #00ceb8, #2fe6d2); border-color: transparent; }
.bt-atd.hit b, .bt-atd.hit small { color: var(--teal-ink); }
.bt-chev { color: var(--muted); font: 700 18px Poppins, sans-serif; transition: transform .25s; text-align: center; }
.bt-item[open] .bt-chev { transform: rotate(90deg); color: var(--teal); }
.bt-detail { padding: 0 12px 12px; }
.bt-item.opening .bt-detail { animation: rise .3s cubic-bezier(.2, 1.1, .4, 1) both; }
.bt-detail > .impacts { margin-bottom: 6px; }
.bt-tdline { font-size: 12px; color: var(--sub); margin: 4px 0 2px; }
.bt-tdline b.am { color: #fff; }
.intro .bt-item { animation: rise .45s cubic-bezier(.2, 1.1, .4, 1) both; }
@media (prefers-reduced-motion: reduce) { .bt-item.cashing, .bt-detail, .intro .bt-item { animation: none !important; } }

/* Compact odds table */
.bt-table { margin-top: 8px; border-radius: 12px; overflow: hidden; background: rgba(8, 11, 18, .45); border: 1px solid rgba(163, 187, 211, .08); }
.bt-tr {
  position: relative; display: grid; grid-template-columns: minmax(0, 1fr) 38px 40px 40px 80px 36px;
  align-items: center; gap: 0 5px; padding: 7px 10px; font-size: 12.5px; font-variant-numeric: tabular-nums;
  border-top: 1px solid rgba(163, 187, 211, .06);
}
.bt-tr:first-child { border-top: 0; }
.bt-th { padding: 5px 10px; font: 600 10.5px Inter, sans-serif; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); background: rgba(163, 187, 211, .04); }
.bt-th span:nth-child(n+2) { text-align: right; }
.bt-td-lbl { color: var(--sub); font-weight: 600; overflow-wrap: anywhere; line-height: 1.25; }
.bt-td-line { text-align: right; color: #fff; font-weight: 700; }
.bt-td-odds { text-align: right; color: var(--sub); }
.bt-td-l10 { display: flex; align-items: center; justify-content: flex-end; gap: 5px; color: var(--muted); font-weight: 700; font-size: 11.5px; }
.bt-td-l10.good { color: var(--teal); }
.bt-td-proj { text-align: right; font-weight: 700; color: var(--muted); }
.bt-td-proj.up { color: var(--teal); }
.bt-td-proj.down { color: var(--pink); }
.bt-tr .bt-spark { height: 14px; gap: 1px; flex: none; }
.bt-tr .bt-spark b { left: 0; right: 0; }
.bt-tr .bt-spark i { width: 3px; }
.bt-tr.hit { background: rgba(0, 206, 184, .08); }
.bt-tr.hit .bt-td-lbl { color: #fff; }
.bt-tr.just-hit { animation: cashed 1.6s ease-out; }
.bt-tr-live { grid-column: 1 / -1; position: relative; height: 14px; margin-top: 6px; border-radius: 7px; background: rgba(0, 0, 0, .4); overflow: hidden; }
.bt-tr-live i { position: absolute; left: 0; top: 0; bottom: 0; border-radius: 7px; background: linear-gradient(90deg, rgba(86, 201, 248, .5), #56c9f8); transition: width 1s cubic-bezier(.2, .9, .3, 1); }
.bt-tr-live.hit i { background: linear-gradient(90deg, #00ceb8, #2fe6d2); box-shadow: 0 0 10px rgba(0, 206, 184, .5); }
.bt-tr-live em { position: relative; display: block; text-align: center; font: 700 10px/14px Poppins, sans-serif; font-style: normal; color: #fff; text-shadow: 0 1px 2px rgba(0, 0, 0, .6); }
@keyframes cashed { 0% { background: rgba(0, 206, 184, .35); } 100% { background: rgba(0, 206, 184, .08); } }
@media (prefers-reduced-motion: reduce) { .bt-tr.just-hit { animation: none !important; } }

/* ==== Lineups ==== */
/* Window: a header bar; its leagues sit below it as cards. */
.lu-window { margin-bottom: 18px; }
.lu-window > summary {
  list-style: none; cursor: pointer; display: grid; gap: 8px; padding: 11px 12px; margin-bottom: 10px;
  border-radius: 14px; background: rgba(163, 187, 211, .06); border: 1px solid rgba(163, 187, 211, .1);
}
.lu-window > summary::-webkit-details-marker { display: none; }
.lu-window.next > summary {
  background: linear-gradient(120deg, rgba(0, 206, 184, .14), rgba(163, 187, 211, .05) 60%);
  border-color: rgba(0, 206, 184, .35); box-shadow: inset 3px 0 0 var(--teal);
}
.lu-when { display: flex; align-items: center; flex-wrap: wrap; gap: 6px 10px; }
.lu-label { flex: 1; display: flex; align-items: center; flex-wrap: wrap; gap: 6px; font: 700 13px Poppins, sans-serif; color: #fff; }
.lu-next { font: 800 10px Poppins, sans-serif; letter-spacing: .1em; color: var(--teal-ink); background: var(--teal); padding: 1px 6px; border-radius: 4px; }
.lu-lock { font: 600 12px Inter, sans-serif; color: var(--sub); white-space: nowrap; font-variant-numeric: tabular-nums; padding: 1px 8px; border-radius: 999px; background: rgba(0, 0, 0, .3); }
.lu-lock.soon { color: #101820; background: #feae58; }
.lu-ring { width: 20px; height: 20px; flex: none; transform: rotate(-90deg); }
.lu-ring .track { fill: none; stroke: rgba(163, 187, 211, .18); stroke-width: 3; }
.lu-ring .fill { fill: none; stroke: var(--teal); stroke-width: 3; stroke-linecap: round; }
.lu-ring.soon .fill { stroke: #feae58; }
.lu-ring.soon { animation: ringpulse 1.2s ease-in-out infinite; }
@keyframes ringpulse { 50% { transform: rotate(-90deg) scale(1.15); } }
.lu-games { display: flex; flex-wrap: wrap; gap: 6px; }
.lu-game { display: inline-flex; gap: 2px; background: rgba(0, 0, 0, .25); border-radius: 999px; padding: 2px 5px; }
.lu-game img { width: 18px; height: 18px; object-fit: contain; }
.lu-counts { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; font-size: 12px; color: var(--muted); }
.lu-flagcount { color: #feae58; font-weight: 700; }
.lu-allset { font: 700 11px Poppins, sans-serif; color: var(--teal-ink); background: var(--teal); padding: 1px 8px; border-radius: 999px; animation: pop-in .6s cubic-bezier(.2, 1.8, .4, 1) both; }

/* "Fix before kickoff" */
.lu-alert {
  display: grid; gap: 4px; margin: 4px 0 14px; padding: 10px 12px; border-radius: 12px; font-size: 12.5px; line-height: 1.4;
  color: #feae58; background: rgba(254, 174, 88, .08); border: 1px solid rgba(254, 174, 88, .25); box-shadow: inset 3px 0 0 #feae58;
}
.lu-alert strong { font: 700 12px Poppins, sans-serif; text-transform: uppercase; letter-spacing: .05em; }
.lu-alert a { color: #fff; }

/* League card */
.lu-league {
  margin-bottom: 10px; border-radius: 14px; overflow: hidden;
  background: rgba(163, 187, 211, .045); border: 1px solid rgba(163, 187, 211, .1);
  box-shadow: 0 6px 18px rgba(0, 0, 0, .18);
}
.lu-league-head { display: flex; align-items: center; flex-wrap: wrap; gap: 6px 8px; padding: 10px 12px; border-bottom: 1px solid rgba(163, 187, 211, .08); }
.lu-league-head .lname { flex: 1; min-width: 0; font: 700 13px Poppins, sans-serif; color: #fff; overflow-wrap: anywhere; }
.lu-league-head .lu-flagcount { font-size: 11.5px; padding: 1px 7px; border-radius: 999px; background: rgba(254, 174, 88, .14); }
.lu-edit {
  font: 600 11.5px Poppins, sans-serif; color: var(--teal); text-decoration: none; white-space: nowrap;
  padding: 3px 9px; border-radius: 8px; border: 1px solid rgba(0, 206, 184, .4); transition: background .2s, color .2s;
}
.lu-edit:hover { background: var(--teal); color: var(--teal-ink); }

/* Optimal lineup callout */
.lu-best {
  position: relative; overflow: hidden; margin: 0; padding: 11px 12px; border-radius: 0;
  background: linear-gradient(100deg, rgba(254, 174, 88, .2), rgba(247, 92, 141, .07) 55%, rgba(254, 174, 88, 0) 85%);
  box-shadow: inset 3px 0 0 #feae58; border-bottom: 1px solid rgba(254, 174, 88, .18);
}
.lu-best::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(105deg, transparent 35%, rgba(255, 236, 200, .22) 50%, transparent 65%);
  transform: translateX(-110%); animation: bestsweep 1.6s .3s ease-out 1 forwards;
}
@keyframes bestsweep { to { transform: translateX(110%); } }
.lu-best-head { display: flex; align-items: center; justify-content: space-between; gap: 8px; font: 700 12px Poppins, sans-serif; color: #ffc77d; text-transform: uppercase; letter-spacing: .06em; }
.lu-best-head > span:first-child::before { content: '✦'; display: inline-block; margin-right: 6px; color: #ffd98a; animation: twinkle 2s ease-in-out infinite; }
@keyframes twinkle { 50% { transform: scale(1.3) rotate(25deg); opacity: .65; } }
.lu-best-gain { font: 800 12.5px Poppins, sans-serif; color: #2a1606; background: linear-gradient(135deg, #ffd98a, #feae58); padding: 1px 9px; border-radius: 999px; letter-spacing: 0; text-transform: none; box-shadow: 0 0 14px rgba(254, 174, 88, .55); }
.lu-best-moves { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; font-size: 12.5px; color: var(--sub); }
.lu-move { display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px 3px 4px; border-radius: 999px; background: rgba(8, 11, 18, .45); border: 1px solid rgba(163, 187, 211, .1); }
.lu-move b { color: #fff; font-weight: 600; }
.lu-move::before { display: inline-grid; place-items: center; width: 18px; height: 18px; border-radius: 50%; font: 800 11px Poppins, sans-serif; color: #101820; background: var(--muted); content: '•'; }
.lu-move.start::before { content: '↑'; background: var(--teal); box-shadow: 0 0 8px rgba(0, 206, 184, .5); }
.lu-move.bench::before { content: '↓'; background: var(--pink); color: #fff; box-shadow: 0 0 8px rgba(247, 92, 141, .45); }
.lu-move.move::before { content: '↔'; background: #56c9f8; }

/* Player rows: dividers, not boxes */
.lu-list { list-style: none; padding: 0; margin: 0; }
.lu-row {
  position: relative; display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; gap: 4px 10px; align-items: center;
  padding: 10px 12px; border-top: 1px solid rgba(163, 187, 211, .07);
}
.lu-list .lu-row:first-child { border-top: 0; }
.lu-best + .lu-list .lu-row:first-child { border-top: 0; }
.lu-row.flagged { box-shadow: inset 3px 0 0 #feae58; background: linear-gradient(90deg, rgba(254, 174, 88, .1), rgba(254, 174, 88, .02) 55%, transparent); }
.lu-row.bench .lu-name, .lu-row.ir .lu-name, .lu-row.taxi .lu-name { color: var(--sub); }
.lu-head { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; object-position: 50% 18%; background: #fff; border: 2px solid var(--tc, var(--line)); }
.lu-main { min-width: 0; overflow-wrap: anywhere; line-height: 1.3; }
.lu-name { font-weight: 700; color: #fff; }
.lu-inj { font: 700 10.5px Inter, sans-serif; padding: 1px 5px; border-radius: 4px; background: rgba(254, 174, 88, .18); color: #feae58; vertical-align: 1px; }
.lu-inj.out { background: var(--pink-soft); color: var(--pink); }
.lu-side { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
.lu-pill { font: 700 11px Poppins, sans-serif; padding: 1px 8px; border-radius: 6px; letter-spacing: .03em; }
.lu-pill.start { background: var(--teal); color: var(--teal-ink); }
.lu-pill.bench { background: var(--chip); color: var(--sub); }
.lu-pill.ir, .lu-pill.taxi { background: var(--chip); color: var(--muted); }
.lu-proj { font: 700 12px Inter, sans-serif; color: #fff; font-variant-numeric: tabular-nums; }
.lu-proj::after { content: " proj"; color: var(--muted); font-weight: 500; }
.lu-inbest { font: 700 10.5px Poppins, sans-serif; color: #feae58; }
.lu-row { align-items: center; }
/* Notes and swaps line up under the name. */
.lu-extra { grid-column: 2 / -1; min-width: 0; }
.lu-extra:empty { display: none; }
.lu-note { font-size: 12px; line-height: 1.35; margin-top: 4px; overflow-wrap: anywhere; }
.lu-note.warn { color: var(--pink); }
.lu-note.swap { display: inline-block; color: #ffc77d; font-weight: 600; margin-left: -9px; padding: 2px 8px; border-radius: 7px; background: rgba(254, 174, 88, .12); border: 1px solid rgba(254, 174, 88, .22); }
.lu-note.info { color: var(--sub); }
.lu-opts { display: grid; gap: 2px; margin-top: 8px; }
.lu-opts-label { font: 600 10.5px Inter, sans-serif; color: var(--muted); text-transform: uppercase; letter-spacing: .05em; margin: 0 0 2px; }
.lu-opt { display: flex; align-items: center; flex-wrap: wrap; gap: 0 6px; margin: 0 -8px; padding: 4px 8px; border-radius: 8px; font-size: 12.5px; line-height: 1.35; }
.lu-opt:hover { background: rgba(163, 187, 211, .06); }
.lu-opt b { color: #fff; font-weight: 600; overflow-wrap: anywhere; }
.lu-opt-slot { flex: 1; min-width: 0; font-size: 11.5px; color: var(--muted); overflow-wrap: anywhere; }
.lu-opt .lu-gain { margin-left: auto; align-self: center; }
.lu-opt.up { background: linear-gradient(90deg, rgba(0, 206, 184, .14), rgba(0, 206, 184, .03)); box-shadow: inset 0 0 0 1px rgba(0, 206, 184, .22); }
.lu-opt.up .lu-gain { box-shadow: 0 0 10px rgba(0, 206, 184, .5); }
.lu-opt.down { opacity: .75; }
.lu-opts.quiet { opacity: .8; }
.lu-gain { font: 700 11.5px Poppins, sans-serif; padding: 1px 7px; border-radius: 6px; background: var(--chip); color: var(--muted); font-variant-numeric: tabular-nums; }
.lu-gain.up { background: var(--teal); color: var(--teal-ink); }
.lu-more { display: contents; }
.lu-more > summary { list-style: none; cursor: pointer; justify-self: start; font: 600 11.5px Inter, sans-serif; color: var(--teal); padding: 3px 0; }
.lu-more > summary::-webkit-details-marker { display: none; }
.lu-more[open] > summary { display: none; }
@media (prefers-reduced-motion: reduce) { .lu-ring.soon, .lu-allset, .lu-best::after, .lu-best-head > span:first-child::before { animation: none !important; } }

/* Scroll performance: let the browser skip off-screen rows entirely, and keep
   each row's layout/paint self-contained. */
.bt-item:not([open]) { content-visibility: auto; contain-intrinsic-size: auto 62px; }
.bt-item { contain: layout paint; }
.slt-scroll { overscroll-behavior: contain; }
`;
