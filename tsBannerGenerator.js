/*eslint-disable*/
var fs = require('fs');
var path = require('path');
var pkg = require('./package.json');

var declareFilePath = path.join(__dirname, 'index.d.ts');
var declareRows = fs.readFileSync(declareFilePath).toString().split('\n');
var tsVersion = (/[0-9.]+/).exec(pkg.devDependencies.typescript)[0];

var TS_BANNER = [
    '// Type definitions for TOAST UI Calendar v' + pkg.version,
    '// TypeScript Version: ' + tsVersion
].join('\n');

declareRows.splice(0, 2, TS_BANNER);
fs.writeFileSync(declareFilePath, declareRows.join('\n'));
