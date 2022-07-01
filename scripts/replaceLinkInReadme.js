/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const PACKAGES = ['calendar', 'react-calendar', 'vue-calendar'];

PACKAGES.forEach((package) => {
  const PACKAGE_JSON_PATH = path.join(__dirname, `../apps/${package}/package.json`);
  const { version, repository } = require(PACKAGE_JSON_PATH);
  const url = repository.url.slice(0, -4);

  const README_PATH = path.join(__dirname, `../apps/${package}/README.md`);
  const readme = fs.readFileSync(README_PATH).toString();

  const newReadme = readme
    .replaceAll('](/', `](${url}/blob/v${version}/`)
    .replaceAll('](.', `](${url}/blob/v${version}/apps/${package}`);

  fs.writeFileSync(README_PATH, newReadme);
});
