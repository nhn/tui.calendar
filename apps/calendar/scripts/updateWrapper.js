/* eslint-disable */
const path = require('path');
const fs = require('fs');

const CORE_PACKAGE_JSON_PATH = path.join(__dirname, '../package.json');
const REACT_PACKAGE_JSON_PATH = path.join(__dirname, '../../react-calendar/package.json');
const VUE_PACKAGE_JSON_PATH = path.join(__dirname, '../../vue-calendar/package.json');

const corePackage = require(CORE_PACKAGE_JSON_PATH);
const reactPackage = require(REACT_PACKAGE_JSON_PATH);
const vuePackage = require(VUE_PACKAGE_JSON_PATH);

const version = corePackage.version;

reactPackage.version = version;
reactPackage.dependencies['@toast-ui/calendar'] = `^${version}`;

fs.writeFileSync(REACT_PACKAGE_JSON_PATH, `${JSON.stringify(reactPackage, null, 2)}\n`);

vuePackage.version = version;
vuePackage.dependencies['@toast-ui/calendar'] = `^${version}`;

fs.writeFileSync(VUE_PACKAGE_JSON_PATH, `${JSON.stringify(vuePackage, null, 2)}\n`);
