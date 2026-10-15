const test = require('node:test');
const assert = require('node:assert');
const agent = require('../src/shared/agent.js');

const settings = (url, token) => ({ agent: { url, token } });

test('only a loopback address is accepted', () => {
  assert.strictEqual(agent.baseUrl('http://127.0.0.1:8787'), 'http://127.0.0.1:8787');
  assert.strictEqual(agent.baseUrl(''), 'http://127.0.0.1:8787');
  for (const bad of ['https://127.0.0.1:8787', 'http://evil.example', 'http://localhost:8787', 'http://127.0.0.1.evil.example', 'nonsense']) assert.strictEqual(agent.baseUrl(bad), null, bad);
});

test('requests need a token and a known path, and carry the token in a header', () => {
  assert.match(agent.request(settings('http://127.0.0.1:8787', ''), { path: '/health' }).error, /token/);
  assert.match(agent.request(settings('http://evil.example', 'abc'), { path: '/health' }).error, /127\.0\.0\.1/);
  assert.match(agent.request(settings('http://127.0.0.1:8787', 'abc'), { path: '/etc/passwd' }).error, /Unknown/);
  const health = agent.request(settings('http://127.0.0.1:8787', 'abc'), { path: '/health' });
  assert.strictEqual(health.url, 'http://127.0.0.1:8787/health');
  assert.strictEqual(health.init.method, undefined);
  assert.strictEqual(health.init.headers['x-night-owl-token'], 'abc');
  const suggest = agent.request(settings('http://127.0.0.1:9000', 'abc'), { path: '/suggest', body: { view: 1 } });
  assert.strictEqual(suggest.init.method, 'POST');
  assert.strictEqual(suggest.init.body, '{"view":1}');
  assert.strictEqual(suggest.init.credentials, 'omit');
  assert.ok(suggest.timeout > health.timeout);
});
