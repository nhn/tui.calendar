/**
 * @fileoverview timezone
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');

var MIN_TO_MS = 60 * 1000;
var nativeOffsetMs = getTimezoneOffset();
var customOffsetMs = nativeOffsetMs;
var timezoneOffsetCallback = null;
var timezoneOffsetCallbackFunc = null;
var setByTimezoneOption = false;
var primaryTimezoneName, intlFormatter;

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

var typeToPos = {
    year: 0,
    month: 1,
    day: 2,
    hour: 3,
    minute: 4,
    second: 5
};

/**
 * Get the timezone offset by timestampe
 * @param {number} timestamp - timestamp
 * @returns {number} timezone offset
 * @private
 */
function getTimezoneOffset(timestamp) {
    timestamp = util.isUndefined(timestamp) ? Date.now() : timestamp;

    return new Date(timestamp).getTimezoneOffset() * MIN_TO_MS;
}

/**
 * Get the custome timezone offset by timestampe
 * @param {number} timestamp - timestamp
 * @returns {number} timezone offset
 * @private
 */
function getCustomTimezoneOffset(timestamp) {
    var date;

    if (!setByTimezoneOption && timezoneOffsetCallback) {
        return timezoneOffsetCallback(timestamp) * MIN_TO_MS;
    }

    if (!util.isUndefined(primaryTimezoneName) && timezoneOffsetCallbackFunc) {
        return -timezoneOffsetCallbackFunc(primaryTimezoneName, timestamp) * MIN_TO_MS;
    }

    if (intlFormatter) {
        date = new Date(timestamp);

        return -getOffset(partsOffset(intlFormatter, date), date) * MIN_TO_MS;
    }

    return customOffsetMs;
}

/**
 * Convert to local time
 * @param {number} time - time
 * @returns {number} local time
 */
function getLocalTime(time) {
    var timezoneOffset, customTimezoneOffset, localTime, newDateTimezoneOffsetMS;

    if (!setByTimezoneOption) {
        return time;
    }

    timezoneOffset = getTimezoneOffset(time);
    customTimezoneOffset = getCustomTimezoneOffset(time);
    localTime = time - customTimezoneOffset + timezoneOffset;
    newDateTimezoneOffsetMS = new Date(localTime).getTimezoneOffset() * MIN_TO_MS;

    if (newDateTimezoneOffsetMS !== timezoneOffset) {
        localTime += (newDateTimezoneOffsetMS - timezoneOffset);
    }

    return localTime;
}

/**
 * Create a Date instance with multiple arguments
 * @param {Array} args - arguments
 * @returns {Date}
 * @private
 */
function createDateWithMultipleArgs(args) {
    var utc = Date.UTC.apply(null, args);

    return new Date(utc + getTimezoneOffset(utc));
}

/**
 * To convert a Date to TZDate as it is.
 * @param {TZDate|number|null} arg - date
 * @returns {Date}
 */
function createDateWithUTCTime(arg) {
    var time;

    if (arg instanceof TZDate) {
        time = arg.getUTCTime();
    } else if ((typeof arg) === 'number') {
        time = arg;
    } else if (arg === null) {
        time = 0;
    } else {
        throw new Error('Invalid Type');
    }

    return new Date(time);
}

/**
 * Convert time to local time. Those times are only from API and not from inner source code.
 * @param {Date|string} arg - date
 * @returns {Date}
 */
function createDateAsLocalTime(arg) {
    var time;

    if (arg instanceof Date) {
        time = arg.getTime();
    } else if ((typeof arg) === 'string') {
        time = Date.parse(arg);
    } else {
        throw new Error('Invalid Type');
    }

    time = getLocalTime(time);

    return new Date(time);
}

/**
 * is it for local time? These type can be used from Calendar API.
 * @param {Date|string} arg - date
 * @returns {boolean}
 */
function useLocalTimeConverter(arg) {
    return arg instanceof Date || (typeof arg) === 'string';
}

/**
 * Extract date tokens (y, M, d, h, m, s) using the formatToParts() method.
 * @param {Intl.DateTimeFormat} dtf - Intl.DateTimeFormat instance
 * @param {Date} date - date object
 * @returns {Array.<number>} An array of objects only containing the formatted date
 */
function partsOffset(dtf, date) {
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
 * @param {Array.<number>} parts - An array of objects only containing the formatted date
 * @param {Date} date - date object
 * @returns {number} offset
 */
function getOffset(parts, date) {
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
 * Timezone Date Class
 * @param {number|TZDate|Date|string} date - date to be converted
 * @constructor
 */
function TZDate(date) {
    var nativeDate;

    if (util.isUndefined(date)) {
        date = Date.now();
    }

    if (arguments.length > 1) {
        nativeDate = createDateWithMultipleArgs(arguments);
    } else if (useLocalTimeConverter(date)) {
        nativeDate = createDateAsLocalTime(date);
    } else {
        nativeDate = createDateWithUTCTime(date);
    }

    this._date = nativeDate;
}

/**
 * Get milliseconds which is converted by timezone
 * @returns {number} milliseconds
 */
TZDate.prototype.getTime = function() {
    var time = this._date.getTime();

    return time + getCustomTimezoneOffset(time) - getTimezoneOffset(time);
};

/**
 * Get UTC milliseconds
 * @returns {number} milliseconds
 */
TZDate.prototype.getUTCTime = function() {
    return this._date.getTime();
};

/**
 * toUTCString
 * @returns {string}
 */
TZDate.prototype.toUTCString = function() {
    return this._date.toUTCString();
};

/**
 * to Date
 * @returns {Date}
 */
TZDate.prototype.toDate = function() {
    return this._date;
};

TZDate.prototype.valueOf = function() {
    return this.getTime();
};

TZDate.prototype.addDate = function(day) {
    this.setDate(this.getDate() + day);

    return this;
};

TZDate.prototype.addMinutes = function(minutes) {
    this.setMinutes(this.getMinutes() + minutes);

    return this;
};

TZDate.prototype.addMilliseconds = function(milliseconds) {
    this.setMilliseconds(this.getMilliseconds() + milliseconds);

    return this;
};

/* eslint-disable max-params*/
TZDate.prototype.setWithRaw = function(y, M, d, h, m, s, ms) {
    this.setFullYear(y, M, d);
    this.setHours(h, m, s, ms);

    return this;
};

/**
 * @returns {TZDate} local time
 */
TZDate.prototype.toLocalTime = function() {
    var time = this.getTime();
    var utcTime = this.getUTCTime();
    var diff = time - utcTime;

    return new TZDate(utcTime - diff);
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
     * Set offset
     * @param {number} offset - timezone offset based on minutes
     */
    setOffsetByTimezoneOption: function(offset) {
        this.setOffset(-offset);
        setByTimezoneOption = true;
    },

    /**
     * Get offset in case of `setByTimezoneOption`. Or return 0.
     * @returns {number} timezone offset offset minutes
     */
    getOffset: function() {
        if (setByTimezoneOption) {
            return customOffsetMs / MIN_TO_MS;
        }

        return 0;
    },

    /**
     * Set a callback function to get timezone offset by timestamp
     * @param {function} callback - callback function
     * @deprecated Use the setOffsetCallbackFunc method instead of this.
     */
    setOffsetCallback: function(callback) {
        timezoneOffsetCallback = callback;
    },

    /**
     * Set a callback function to get timezone offset by timestamp
     * @param {function} callback - callback function
     */
    setOffsetCallbackFunc: function(callback) {
        timezoneOffsetCallbackFunc = callback;
    },

    /**
     * Check to use custom timezone option
     * @returns {boolean} use custom timezone option
     */
    hasCustomeTimezoneOffset: function() {
        return setByTimezoneOption;
    },

    /**
     * set primary timezone name
     * @param {string} timezone - timezone (such as 'Asia/Seoul', 'America/New_York')
     */
    setTimezoneName: function(timezone) {
        primaryTimezoneName = timezone;
    },

    /**
     * set primary timezone by timezone option
     * @param {string} timezone - timezone (such as 'Asia/Seoul', 'America/New_York')
     */
    // eslint-disable-next-line complexity
    setPrimaryTimezone: function(timezoneObj) {
        var offset, timestamp, date;

        if (!timezoneObj) {
            return;
        }

        setByTimezoneOption = true;

        if (util.isNumber(timezoneObj.timezoneOffset)) {
            this.setOffset(-timezoneObj.timezoneOffset);
        }

        timestamp = new TZDate().toLocalTime().valueOf();

        if (timezoneObj.timezone) {
            this.setTimezoneName(timezoneObj.timezone);

            if (timezoneObj.offsetCallback) {
                offset = timezoneObj.offsetCallback(
                    timezoneObj.timezone,
                    timestamp
                );
                this.setOffset(-offset);
                this.setOffsetCallbackFunc(timezoneObj.offsetCallback);
            } else if (Intl && Intl.DateTimeFormat) {
                intlFormatter = new Intl.DateTimeFormat('en-US', {
                    hourCycle: 'h23',
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    timeZone: primaryTimezoneName
                });

                date = new Date(timestamp);
                offset = getOffset(partsOffset(intlFormatter, date), date);

                this.setOffset(offset);
            }
        }
    },

    /**
     * (Use this method only for testing)
     * Reset system timezone and custom timezone
     */
    restoreOffset: function() {
        customOffsetMs = getTimezoneOffset();
    }
};
