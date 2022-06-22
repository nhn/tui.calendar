module.exports = {
  "**/*.js": "eslint --fix",
  "**/*.{ts,tsx}": [
    () => "npm run check-types --workspace=@toast-ui/vue-calendar",
    "eslint --fix",
  ],
}
