module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jasmine: true
  },
  parser: '@typescript-eslint/parser',
  plugins: ['prettier', 'react', '@typescript-eslint', 'jasmine'],
  extends: [
    'tui/es6',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:jasmine/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    parser: 'typescript-eslint-parser',
    ecmaVersion: 2018,
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  settings: {
    react: {
      pragma: 'h',
      version: '16.3'
    }
  },
  globals: {
    fixture: true
  }
};
