'use strict';

var util = require('tui-code-snippet');
var intlFormatter = {};
var intlUtil;

var typeToPos = {
    year: 0,
    month: 1,
    day: 2,
    hour: 3,
    minute: 4,
    second: 5,
};

/**
 * Extract date tokens (y, M, d, h, m, s) using the formatToParts() method.
 * @param {Intl.DateTimeFormat} dtf - Intl.DateTimeFormat instance
 * @param {Date} date - date object
 * @returns {Array.<number>} An array of objects only containing the formatted date
 */
function parseOffset(dtf, date) {
    var formatted = dtf.formatToParts(date);
    var filled = [];
    var i, pos;

    for (i = 0; i < formatted.length; i += 1) {
        pos = typeToPos[formatted[i].type];

        if (typeof pos !== 'undefined') {
            filled[pos] = parseInt(formatted[i].value, 10);
        }
    }

    return filled;
}

/**
 * The time zone offset is calculated from the difference between the current time and the time in a specific time zone.
 * @param {Array.<number>} parts - An array of objects only containing the formatted date (e.g. [2020, 12, 14, 10, 15, 19])
 * @param {Date} date - date object
 * @returns {number} offset
 */
function calculateOffset(parts, date) {
    var y = parts[0];
    var M = parts[1];
    var d = parts[2];
    var h = parts[3];
    var m = parts[4];
    var s = parts[5];

    var utc = new Date(Date.UTC(y, M - 1, d, h, m, s));
    var offset = (utc - date) / 60 / 1000;

    return Math.round(offset);
}

/**
 * Check if browser supports Intl, Intl.DateTimeFormat, formatToParts API
 * @param {string} timezoneCode - timezone
 * @returns {boolean} supported
 */
function supportIntl(timezoneCode) {
    var supported = false;
    var formatter;

    if (global.Intl && global.Intl.DateTimeFormat) {
        formatter = getIntlFormatter(timezoneCode);

        if (util.isFunction(formatter.formatToParts)) {
            intlFormatter[timezoneCode] = formatter;
            supported = true;
        }
    }

    return supported;
}

/**
 * Return DateTimeFormat instance by timezone
 * @param {string} timezoneCode - timezone
 * @returns {DateTimeFormat} Intl.DateTimeFormat instance
 */
function getIntlFormatter(timezoneCode) {
    if (!intlFormatter[timezoneCode]) {
        intlFormatter[timezoneCode] = new Intl.DateTimeFormat('en-US', {
            hourCycle: 'h23',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: timezoneCode,
        });
    }

    return intlFormatter[timezoneCode];
}

/**
 * Get offset of the time by timezone
 * @param {string} timezoneCode - timezone (e.g. 'Asia/Seoul', 'America/New_York')
 * @param {number} timestamp - timestamp
 * @returns {number} offset
 */
function offsetCalculator(timezoneCode, timestamp) {
    var formatter = getIntlFormatter(timezoneCode);
    var date = new Date(timestamp);

    return -calculateOffset(parseOffset(formatter, date), date);
}

/**
 * Get offset of the time by timezone
 * @param {string} timezoneCode - timezone (e.g. 'Asia/Seoul', 'America/New_York')
 * @param {number} timestamp - timestamp
 * @returns {number} offset
 */
function getTimezoneDate(timezoneCode, timestamp) {
    var formatter = getIntlFormatter(timezoneCode);
    var date = new Date(timestamp);

    return parseOffset(formatter, date);
}

intlUtil = {
    supportIntl: supportIntl,
    offsetCalculator: offsetCalculator,
    getTimezoneDate: getTimezoneDate,
};

module.exports = intlUtil;
