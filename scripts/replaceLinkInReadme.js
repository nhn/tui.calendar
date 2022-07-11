/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const packages = [];
const targets = (process.env.PACKAGES || 'all').split(',');

if (targets.includes('core') || targets.includes('all')) {
  packages.push('calendar');
}
if (targets.includes('react') || targets.includes('all')) {
  packages.push('react-calendar');
}
if (targets.includes('vue') || targets.includes('all')) {
  packages.push('vue-calendar');
}

packages.forEach((package) => {
  const PACKAGE_JSON_PATH = path.join(__dirname, `../apps/${package}/package.json`);
  const { version, repository } = require(PACKAGE_JSON_PATH);
  const url = repository.url.slice(0, -4);

  const README_PATH = path.join(__dirname, `../apps/${package}/README.md`);
  const readme = fs.readFileSync(README_PATH).toString();

  const newReadme = readme
    .replaceAll('](/', `](${url}/blob/${package}@${version}/`)
    .replaceAll('](.', `](${url}/blob/${package}@${version}/apps/${package}`);

  fs.writeFileSync(README_PATH, newReadme);
});
