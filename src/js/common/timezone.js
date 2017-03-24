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
 */
function resetCorrectionTime() {
    correctionTime = (customOffset - systemOffset) * 60 * 1000;
}

function createDateWithMultipleArgs(args) {
    var time = Date.UTC.apply(null, args);

    return new Date(time + (systemOffset * 60 * 1000));
}

function createDateWithSingleArg(arg) {
    var time;

    if (arg instanceof Date || arg instanceof TZDate) {
        time = arg.getTime();
    } else if ((typeof arg) === 'string') {
        time = Date.parse(arg);
    } else if ((typeof arg) === 'number') {
        time = arg;
    } else if (arg === null) {
        time = 0;
    } else {
        throw new Error('Invalid Type');
    }

    return new Date(time - correctionTime);
}

/**
 * Date Class
 */
function TZDate() {
    var date;

    switch (arguments.length) {
        case 0:
            date = createDateWithSingleArg(Date.now());
            break;
        case 1:
            date = createDateWithSingleArg(arguments[0]);
            break;
        default:
            date = createDateWithMultipleArgs(arguments);
    }

    this._date = date;
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

TZDate.prototype.valueOf = function() {
    return this.getTime();
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
