// Fetch relay for the content scripts. ESPN's scoreboard API refuses requests
// that carry a sleeper.com Origin (403), but answers the extension's own
// origin, so the Lineups and Bets tools ask this worker to fetch kickoff
// times, game odds and DraftKings player props for them.
// Only allow-listed hosts are relayed.
const ALLOWED = ['https://site.api.espn.com/', 'https://sports.core.api.espn.com/'];

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (!msg || msg.type !== 'slt-fetch' || typeof msg.url !== 'string') return false;
  if (!ALLOWED.some((prefix) => msg.url.startsWith(prefix))) {
    sendResponse({ ok: false, error: 'host not allowed' });
    return false;
  }
  fetch(msg.url)
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`${res.status} ${msg.url}`))))
    .then((data) => sendResponse({ ok: true, data }), (err) => sendResponse({ ok: false, error: String(err.message || err) }));
  return true; // respond asynchronously
});
