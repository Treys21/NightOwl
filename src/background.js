// Fetch relay for the content scripts. ESPN's APIs refuse requests that carry a
// sleeper.com Origin (403) but answer the extension's own, so the Lineups and
// Bets tools ask this worker for kickoff times, game odds and DraftKings props.
// Only messages from this extension, for allow-listed hosts, are relayed.
const ALLOWED = ['https://site.api.espn.com/', 'https://sports.core.api.espn.com/'];

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (sender.id !== chrome.runtime.id) return false;
  if (!msg || msg.type !== 'nightowl-fetch' || typeof msg.url !== 'string') return false;
  if (!ALLOWED.some((prefix) => msg.url.startsWith(prefix))) {
    sendResponse({ ok: false, error: 'host not allowed' });
    return false;
  }
  fetch(msg.url)
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`${res.status} ${msg.url}`))))
    .then(
      (data) => sendResponse({ ok: true, data }),
      (err) => sendResponse({ ok: false, error: String(err.message || err) })
    );
  return true; // respond asynchronously
});
