module.exports = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  preset: 'ts-jest/presets/js-with-babel',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'd.ts'],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.ts',
  },
  globals: { 'ts-jest': { babelConfig: true } },
  watchPathIgnorePatterns: ['<rootDir>/.storybook', '<rootDir>/.stories', '/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/playwright/'],
  setupFilesAfterEnv: [
    '<rootDir>/test/jestSetup.ts',
    '<rootDir>/test/matcher/matrices.ts',
    '<rootDir>/test/matcher/viewModels.ts',
  ],
};
