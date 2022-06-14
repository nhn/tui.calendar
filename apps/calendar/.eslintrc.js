module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'unused-imports',
    'simple-import-sort',
    'prettier',
    'react',
    'react-hooks',
    '@typescript-eslint',
    'jest',
  ],
  extends: [
    'tui',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    parser: 'typescript-eslint-parser',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    react: {
      pragma: 'h',
      version: '16.13',
    },
  },
  globals: {
    fixture: true,
  },
  ignorePatterns: ['**/*.d.ts'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'no-duplicate-imports': 'off',
    '@typescript-eslint/no-duplicate-imports': 'error',
    'no-shadow': 'off',
    'no-use-before-define': 0,
    // use unused-imports plugin
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { args: 'after-used', argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    'react/prop-types': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'jest/no-conditional-expect': 0,
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Preact.
          ['^preact'],
          // Any other packages.
          ['^(\\w|@)(?!src/|test/|stories/|t/)'],
          // Source files.
          ['^@src/'],
          // stories files
          ['^@stories/'],
          // Types.
          ['^@t/'],
          // Absolute imports and other imports such as Vue-style `@/foo`.
          // Anything not matched in another group.
          ['^'],
          // Relative imports.
          // Anything that starts with a dot.
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'warn',
    complexity: ['error', { max: 8 }],
    'no-warning-comments': 0,
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.e2e.ts'],
      rules: {
        'max-nested-callbacks': ['error', { max: 5 }],
        'jest/expect-expect': [
          'warn',
          {
            assertFunctionNames: ['expect', 'assert*'],
          },
        ],
      },
    },
    {
      files: ['playwright/**/*.ts'],
      rules: {
        'dot-notation': ['error', { allowKeywords: true }],
        'jest/expect-expect': 'off',
        'jest/no-done-callback': 'off',
      },
    },
  ],
};
