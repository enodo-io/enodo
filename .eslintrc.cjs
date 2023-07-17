const config = {
  env: {
    browser: false,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    'import/extensions': 0,
    'no-new': 0,
    'class-methods-use-this': 0,
  },
};

module.exports = config;
