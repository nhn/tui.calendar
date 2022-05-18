module.exports = {
  "**/*.js": "eslint --fix",
  "**/*.{ts,tsx}": [
    () => "npm run check-types --workspace=@toast-ui/calendar",
    "eslint --fix",
    "jest --bail --findRelatedTests",
  ],
  "**/*.css": "stylelint"
}
