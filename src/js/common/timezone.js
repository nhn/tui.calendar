/**
 * @fileoverview timezone
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */
'use strict';

var MIN_TO_MS = 60 * 1000;
var getTimezoneOffset = function(time) {
    time = time || Date.now();

    return new Date(time).getTimezoneOffset() * MIN_TO_MS;
};

var customOffsetMs = getTimezoneOffset();

var getterMethods = [
    'getDate',
    'getDay',
    'getFullYear',
    'getHours',
    'getMilliseconds',
    'getMinutes',
    'getMonth',
    'getSeconds'
];

var setterMethods = [
    'setDate',
    'setFullYear',
    'setHours',
    'setMilliseconds',
    'setMinutes',
    'setMonth',
    'setSeconds'
];

/**
 * Create a Date instance with multiple arguments
 * @param {Array} args - arguments
 * @returns {Date}
 */
function createDateWithMultipleArgs(args) {
    var utc = Date.UTC.apply(null, args);

    return new Date(utc + getTimezoneOffset(utc));
}

/**
 * Create a Date instance with argument
 * @param {Date|TZDate|string|number} arg - arguments
 * @returns {Date}
 */
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

    return new Date(time - customOffsetMs + getTimezoneOffset(time));
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

TZDate.prototype.setTime = function(time) {
    return this._date.setTime(time - customOffsetMs + getTimezoneOffset(time));
};

TZDate.prototype.getTime = function() {
    return this._date.getTime() + customOffsetMs - getTimezoneOffset(this._date.getTime());
};

TZDate.prototype.valueOf = function() {
    return this.getTime();
};

getterMethods.forEach(function(methodName) {
    TZDate.prototype[methodName] = function() {
        return this._date[methodName].apply(this._date, arguments);
    };
});

setterMethods.forEach(function(methodName) {
    TZDate.prototype[methodName] = function() {
        this._date[methodName].apply(this._date, arguments);

        return this.getTime();
    };
});

module.exports = {
    Date: TZDate,

    /**
     * Set offset
     * @param {number} offset - timezone offset based on minutes
     */
    setOffset: function(offset) {
        customOffsetMs = offset * MIN_TO_MS;
    },

    /**
     * (Use this method only for testing)
     * Reset system timezone and custom timezone
     */
    restoreOffset: function() {
        customOffsetMs = getTimezoneOffset();
    }
};
