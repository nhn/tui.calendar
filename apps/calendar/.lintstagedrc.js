module.exports = {
  '**/*.js': 'eslint --fix',
  '**/*.{ts,tsx}': [() => 'npm run check-types', 'eslint --fix', 'jest --bail --findRelatedTests'],
  '**/*.css': 'stylelint',
};
