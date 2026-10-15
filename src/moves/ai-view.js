globalThis.NightOwl = globalThis.NightOwl || {};

(function (NightOwl) {
  'use strict';

  const { escape: escapeHtml } = NightOwl.format;
  const { isPick } = NightOwl.moveValues;

  function create(deps) {
    const { finderState, nameOf, currentLeague, render, openTrade, buildView, listAssets } = deps;
    const ai = { forResults: null, busy: false, result: null, error: null, deep: false, messages: [], chatBusy: false, token: 0 };
    let ready = false;

    const refreshReady = () => NightOwl.ai.configured().then((value) => { if (value !== ready) { ready = value; render(); } });
    refreshReady();
    NightOwl.storage.onChanged(() => { refreshReady(); });

    function sync() {
      if (ai.forResults === finderState.results) return;
      ai.forResults = finderState.results;
      ai.result = null;
      ai.error = null;
      ai.messages = [];
      ai.busy = false;
      ai.chatBusy = false;
      ai.token++;
    }

    async function ask(fresh) {
      const league = currentLeague();
      if (!league || !finderState.results || !finderState.results.items.length) return;
      const token = ++ai.token;
      ai.busy = true;
      ai.error = null;
      render();
      try {
        const view = buildView(league);
        const data = await NightOwl.ai.suggest(view, { deep: ai.deep, fresh });
        if (token !== ai.token) return;
        if (!data.ok) throw new Error('The AI did not return a usable trade. Try again.');
        ai.result = { suggestions: data.suggestions, cached: Boolean(data.cached), deep: ai.deep };
      } catch (error) {
        if (token !== ai.token) return;
        ai.error = NightOwl.format.errorText(error);
      }
      ai.busy = false;
      render();
    }

    async function send(text) {
      const league = currentLeague();
      const message = String(text || '').trim();
      if (!league || !message || ai.chatBusy || !finderState.results) return;
      const token = ai.token;
      ai.messages.push({ role: 'user', content: message });
      ai.chatBusy = true;
      render();
      try {
        const data = await NightOwl.ai.chat(buildView(league), ai.messages, { deep: ai.deep });
        if (token !== ai.token) return;
        ai.messages.push({ role: 'assistant', content: data.reply || 'No answer.' });
      } catch (error) {
        if (token !== ai.token) return;
        ai.messages.push({ role: 'assistant', content: NightOwl.format.errorText(error), failed: true });
      }
      ai.chatBusy = false;
      render();
    }

    function suggestionCard(league, suggestion) {
      const partner = league.raw.rosters.find((roster) => roster.roster_id === Number(suggestion.partnerId));
      const them = partner ? nameOf(league, partner) : 'Partner';
      return `<article class="mv-card ai-card">
        <div class="mv-card-h"><div><b>${escapeHtml(them)}</b> <span class="mv-win">${suggestion.source === 'custom' ? 'AI idea' : 'From the finder'}</span></div></div>
        <div class="ai-swap"><span>${escapeHtml(listAssets(league, suggestion.give))}</span><i aria-hidden="true">⇄</i><span>${escapeHtml(listAssets(league, suggestion.get))}</span></div>
        ${suggestion.pitch ? `<p class="mv-why1">${escapeHtml(suggestion.pitch)}</p>` : ''}
        <div class="mv-actions"><button type="button" class="mv-btn" data-ai="open" data-i="${ai.result.suggestions.indexOf(suggestion)}">Open in analyzer</button></div>
      </article>`;
    }

    function chatHtml() {
      const rows = ai.messages.map((message) => `<p class="ai-msg ${message.role}${message.failed ? ' failed' : ''}">${escapeHtml(message.content).replace(/\n/g, '<br>')}</p>`).join('');
      return `<details class="mv-more ai-chat" data-key="ai-chat"><summary>Chat</summary>
        <div class="ai-thread">${rows}${ai.chatBusy ? '<p class="ai-msg assistant muted">…</p>' : ''}</div>
        <div class="ai-input"><input type="text" id="ai-draft" placeholder="Ask about these deals" aria-label="Ask about these deals" autocomplete="off" /><button type="button" class="mv-btn" data-ai="send"${ai.chatBusy ? ' disabled' : ''}>Send</button></div>
      </details>`;
    }

    function block(league) {
      sync();
      if (!ready) return '<p class="muted small mv-note ai-off">AI is off: start the local agent and paste its token in the Night Owl popup.</p>';
      if (!finderState.results || !finderState.results.items.length) return '';
      const cards = ai.result ? ai.result.suggestions.map((suggestion) => suggestionCard(league, suggestion)).join('') : '';
      return `<div class="mv-ai">
        <div class="ai-bar">
          <button type="button" class="mv-btn" data-ai="ask"${ai.busy ? ' disabled' : ''}>${ai.busy ? 'Thinking…' : 'Ask AI'}</button>
          <button type="button" class="mv-btn ghost" data-ai="again" title="Ask again for a fresh answer"${ai.busy || !ai.result ? ' disabled' : ''}>↻</button>
          <button type="button" class="tab${ai.deep ? ' on' : ''}" data-ai="deep" aria-pressed="${ai.deep}" title="Let the AI run statistics on the league data first (slower)">Deep</button>
        </div>
        ${ai.busy ? '<div class="skel" role="status"><i></i><i></i></div>' : ''}
        ${ai.error ? `<p class="error">${escapeHtml(ai.error)}</p>` : ''}
        ${cards}
        ${chatHtml()}
      </div>`;
    }

    function click(event) {
      const button = event.target.closest('[data-ai]');
      if (!button) return false;
      const action = button.dataset.ai;
      if (action === 'ask') ask(false);
      else if (action === 'again') ask(true);
      else if (action === 'deep') { ai.deep = !ai.deep; render(); }
      else if (action === 'send') {
        const field = button.closest('.ai-input').querySelector('input');
        send(field.value);
      } else if (action === 'open' && ai.result) {
        const suggestion = ai.result.suggestions[Number(button.dataset.i)];
        if (suggestion) openTrade({ partnerId: Number(suggestion.partnerId), give: suggestion.give, get: suggestion.get });
      }
      return true;
    }

    function key(event) {
      if (event.key !== 'Enter' || !event.target || event.target.id !== 'ai-draft') return false;
      event.preventDefault();
      send(event.target.value);
      return true;
    }

    return { block, click, key, isPick };
  }

  NightOwl.movesAi = { create };
})(globalThis.NightOwl);
