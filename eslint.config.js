// Content scripts are classic scripts sharing one global (NightOwl); tests and
// tooling run in Node.
const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  { ignores: ['dist/', 'node_modules/', 'coverage/'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: { ...globals.browser, chrome: 'readonly', module: 'readonly' }
    }
  },
  {
    files: ['test/**/*.js', 'eslint.config.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'commonjs', globals: globals.node }
  },
  {
    files: ['src/background.js'],
    languageOptions: { globals: { ...globals.serviceworker, chrome: 'readonly' } }
  },
  {
    files: ['tools/preview/shim.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'script', globals: globals.browser }
  },
  {
    files: ['scripts/**/*.mjs', 'tools/**/*.mjs'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: globals.node }
  },
  {
    rules: {
      'no-unused-vars': ['error', { args: 'after-used', caughtErrors: 'none' }],
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-var': 'error',
      'prefer-const': 'error'
    }
  }
];
