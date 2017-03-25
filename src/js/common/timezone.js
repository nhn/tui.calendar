/**
 * @fileoverview timezone
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */
'use strict';

var MIN_TO_MS = 60 * 1000;
var SYSTEM_OFFSET_MS = new Date().getTimezoneOffset() * MIN_TO_MS;
var customOffsetMs = SYSTEM_OFFSET_MS;

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

function createDateWithMultipleArgs(args) {
    return new Date(Date.UTC.apply(null, args) + SYSTEM_OFFSET_MS);
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

    return new Date(time - customOffsetMs + SYSTEM_OFFSET_MS);
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
    return this._date.setTime(time - customOffsetMs + SYSTEM_OFFSET_MS);
};

TZDate.prototype.getTime = function() {
    return this._date.getTime() + customOffsetMs - SYSTEM_OFFSET_MS;
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
        customOffsetMs = SYSTEM_OFFSET_MS;
    }
};
