module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'google',
    'airbnb-base',
    'plugin:fsd/all',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },

  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'fsd',
  ],
  settings: {
    'import/resolver': 'webpack',
  },
  rules: {
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'always',
      js: 'always',
    }],
    indent: [2, 2],
    'no-underscore-dangle': 'off',
    'require-jsdoc': 0,
    'fsd/hof-name-prefix': 'error',
    'fsd/no-heavy-constructor': 'error',
    'fsd/jq-cache-dom-elements': 'error',
    'fsd/jq-use-js-prefix-in-selector': 'error',
    'fsd/no-function-declaration-in-event-listener': 'error',
    'fsd/split-conditionals': 'error',
  },
};
