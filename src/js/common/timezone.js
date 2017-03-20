/**
 * @fileoverview timezone
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */
'use strict';

var SYSTEM_OFFSET = new Date().getTimezoneOffset();

var systemOffset = SYSTEM_OFFSET;
var customOffset = systemOffset;
var correctionTime = 0;

var publicMethods = [
    // getters
    'getFullYear',
    'getMonth',
    'getDate',
    'getDay',
    'getHours',
    'getMinutes',
    'getSeconds',
    'getMilliseconds',

    // setters
    'setFullYear',
    'setMonth',
    'setDate',
    'setHours',
    'setMinutes',
    'setSeconds',
    'setMilliseconds'
];

/**
 * Calculate correction time (ms)
 * @returns {number}
 */
function resetCorrectionTime() {
    correctionTime = (customOffset - systemOffset) * 60 * 1000;
}

/**
 * Date Class
 * @param {Date} date - date
 */
function TZDate(date) {
    var time;

    if (!date) {
        time = Date.now();
    } else if (date instanceof Date) {
        time = date.getTime();
    } else {
        time = date;
    }

    this._date = new Date(time - correctionTime);
}

publicMethods.forEach(function(methodName) {
    TZDate.prototype[methodName] = function() {
        var args = Array.prototype.slice.call(arguments);
        return this._date[methodName].apply(this._date, args);
    };
});

TZDate.prototype.setTime = function(time) {
    this._date.setTime(time - correctionTime);
};

TZDate.prototype.getTime = function() {
    return this._date.getTime() + correctionTime;
};

module.exports = {
    Date: TZDate,

    /**
     * Set offset
     * @param {number} offset - timezone offset based on minutes
     */
    setTimezone: function(offset) {
        customOffset = offset;
        resetCorrectionTime();
    },

    /**
     * (Use this method only for testing)
     * Mock system timezone offset
     * @param {number} offset - timezone offset based on minutes
     */
    mockSystemTimezone: function(offset) {
        systemOffset = SYSTEM_OFFSET + offset;
        resetCorrectionTime();
    },

    /**
     * (Use this method only for testing)
     * Reset system timezone and custom timezone
     */
    restoreTimezone: function() {
        systemOffset = customOffset = SYSTEM_OFFSET;
        resetCorrectionTime();
    }
};
