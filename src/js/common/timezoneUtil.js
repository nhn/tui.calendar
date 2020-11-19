'use strict';

var util = require('tui-code-snippet');
var intlUtil = require('./intlUtil');
var tz = require('./timezone');

var primaryOffset;
var tzUtil, primaryTimezoneCode, offsetCalculator;

var differentOffset = {
    STANDARD_TO_DST: 1,
    DST_TO_STANDARD: -1,
    SAME: 0,
};

/**
 * Get offset by timezoneCode
 * @param {string} timezoneCode - timezone code (such as 'Asia/Seoul', 'America/New_York')
 * @param {number} timestamp - timestamp
 * @returns {number} timezone offset
 */
function getOffsetByTimezoneCode(timezoneCode, timestamp) {
    var offset = getPrimaryOffset();
    var calculator;

    if (util.isUndefined(timezoneCode)) {
        return offset;
    }

    calculator = getOffsetCalculator(timezoneCode);

    return calculator ? calculator(timezoneCode, timestamp) : offset;
}

/**
 * Set primary offset
 * @param {number} offset - offset
 */
function setPrimaryOffset(offset) {
    primaryOffset = offset;

    tz.setOffsetByTimezoneOption(-offset);
}

/**
 * Return primary offset
 * @returns {number} offset
 */
function getPrimaryOffset() {
    return util.isNumber(primaryOffset) ? primaryOffset : new Date().getTimezoneOffset();
}

/**
 * Set primary timezone code
 * @param {string} timezoneCode - timezone code (such as 'Asia/Seoul', 'America/New_York')
 */
function setPrimaryTimezoneCode(timezoneCode) {
    primaryTimezoneCode = timezoneCode;
}

/**
 * Get primary timezone code
 * @returns {string} primary timezone code (such as 'Asia/Seoul', 'America/New_York')
 */
function getPrimaryTimezoneCode() {
    return primaryTimezoneCode;
}

/**
 * Set a calculator function to get timezone offset by timestamp
 * @param {function} calculator - offset calculator
 */
function setOffsetCalculator(calculator) {
    offsetCalculator = calculator;
}

/**
 * Return a function to calculate timezone offset by timestamp
 * @param {string} timezoneCode - timezone code
 * @returns {function | null} offset calculator
 */
function getOffsetCalculator(timezoneCode) {
    if (util.isFunction(offsetCalculator)) {
        return offsetCalculator;
    }

    if (intlUtil.supportIntl(timezoneCode)) {
        return intlUtil.offsetCalculator;
    }

    return null;
}

/**
 * Set timezone and offset by timezone option
 * @param {Timezone} timezoneObj - {@link Timezone}
 */
function setPrimaryTimezoneByOption(timezoneObj) {
    var timezoneCode = timezoneObj.timezone;
    var timestamp, offset;

    if (!timezoneObj) {
        return;
    }

    timestamp = Date.now();

    if (timezoneCode) {
        setPrimaryTimezoneCode(timezoneCode);

        offset = getOffsetByTimezoneCode(timezoneCode, timestamp);
        setPrimaryOffset(offset);
    }
}

tzUtil = {
    differentOffset: differentOffset,
    setOffsetCalculator: setOffsetCalculator,
    setPrimaryTimezoneByOption: setPrimaryTimezoneByOption,
    getPrimaryTimezoneCode: getPrimaryTimezoneCode,
    getPrimaryOffset: getPrimaryOffset,
    getOffsetByTimezoneCode: getOffsetByTimezoneCode,
};

module.exports = tzUtil;
