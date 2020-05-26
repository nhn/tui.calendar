/* eslint-disable no-sync */
'use strict';

var fs = require('fs');
var path = require('path');
var config = require(path.resolve(process.cwd(), 'tuidoc.config.json'));
var examples = config.examples || {};
var filePath = examples.filePath;
var globalErrorLogVariable = examples.globalErrorLogVariable;

/**
 * Get Examples Url
 */
function getTestUrls() {
    var urlPrefix = 'http://nhn.github.io/tui.calendar/latest';
    var testUrls;

    if (!filePath) {
        throw Error('not exist examples path at tuidoc.config.json');
    }

    testUrls = fs.readdirSync(filePath).reduce(function(urls, fileName) {
        if (/html$/.test(fileName)) {
            urls.push(urlPrefix + '/' + filePath + '/' + fileName);
        }

        return urls;
    }, []);

    fs.writeFileSync('url.txt', testUrls.join(', '));
}

/**
 * Get Global Variable
 */
function getGlobalVariable() {
    if (!globalErrorLogVariable) {
        throw Error('not exist examples path at tuidoc.config.json');
    }

    fs.writeFileSync('errorVariable.txt', globalErrorLogVariable);
}

/**
 * Get Supported Browser List
 */
function getBrowserList() {
    var browsers = ['ie9', 'ie10', 'ie11', 'safari', 'edge', 'firefox', 'chrome'];

    fs.writeFileSync('browserList.txt', browsers.join(', '));
}

getTestUrls();
getGlobalVariable();
getBrowserList();
