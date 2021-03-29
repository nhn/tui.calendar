/*eslint-disable*/
const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

const declareFilePath = path.join(__dirname, 'index.d.ts');
const declareRows = fs.readFileSync(declareFilePath).toString().split('\n');
const TS_BANNER = ['// Type definitions for TOAST UI Date v' + pkg.version].join('\n');

declareRows.splice(0, 1, TS_BANNER);
fs.writeFileSync(declareFilePath, declareRows.join('\n'));
