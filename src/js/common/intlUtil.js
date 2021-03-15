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
    second: 5
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
    var formattedLength = formatted.length;
    var i, pos;

    for (i = 0; i < formattedLength; i += 1) {
        pos = typeToPos[formatted[i].type];

        if (!util.isUndefined(pos)) {
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
 * Check if browser supports Intl.DateTimeFormat.prototype.formatToParts API
 * @returns {boolean} supported
 */
function supportIntl() {
    /**
     * IE9 and IE10 do not support Intl.DateTimeFormat
     * IE11 does not support IANA timezone names
     * http://kangax.github.io/compat-table/esintl/#test-DateTimeFormat_accepts_IANA_timezone_names
     */
    return global.Intl && global.Intl.DateTimeFormat &&
        util.isFunction(Intl.DateTimeFormat.prototype.formatToParts);
}

/**
 * Return DateTimeFormat instance by timezone
 * @param {string} timezoneName - timezone
 * @returns {DateTimeFormat} Intl.DateTimeFormat instance
 */
function getIntlFormatter(timezoneName) {
    if (!intlFormatter[timezoneName]) {
        intlFormatter[timezoneName] = new Intl.DateTimeFormat('en-US', {
            hourCycle: 'h23',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: timezoneName
        });
    }

    return intlFormatter[timezoneName];
}

/**
 * Get offset of the time by timezone
 * @param {string} timezoneName - recognize the time zone names of the IANA time zone database, such as 'Asia/Seoul', 'America/New_York'
 * @param {number} timestamp - timestamp
 * @returns {number} offset
 */
function offsetCalculator(timezoneName, timestamp) {
    var formatter = getIntlFormatter(timezoneName);
    var date = new Date(timestamp);

    return -calculateOffset(parseOffset(formatter, date), date);
}

intlUtil = {
    supportIntl: supportIntl,
    offsetCalculator: offsetCalculator
};

module.exports = intlUtil;
