module.exports = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  preset: 'ts-jest',
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node', 'd.ts'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/src/test/cssFileMock.ts',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@stories/(.*)$': '<rootDir>/stories/$1',
  },
  globals: { 'ts-jest': { tsconfig: '<rootDir>/tsconfig.test.json' } },
  watchPathIgnorePatterns: ['<rootDir>/.storybook', '<rootDir>/.stories', '/node_modules/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/playwright/'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts', '<rootDir>/src/test/matchers.ts'],
};
