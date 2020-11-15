/**
 * @fileoverview timezone
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';
/* eslint-disable */
var util = require('tui-code-snippet');

var MIN_TO_MS = 60 * 1000;
var nativeOffsetMs = getTimezoneOffset();
var customOffsetMs = nativeOffsetMs;
var timezoneOffsetCallback = null;
var setByTimezoneOption = false;
var isSameNativeOffsetAndCustomOffset = false;
var intlFormatter = {};
var primaryOffset;
var timezoneUtil, offsetCalculator, primaryTimezoneCode;

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

var differentOffset = {
    STANDARD_TO_DST: 1,
    DST_TO_STANDARD: -1,
    SAME: 0
};

/**
 * Get the timezone offset by timestampe
 * @param {number} timestamp - timestamp
 * @returns {number} timezone offset
 * @private
 */
function getTimezoneOffset(timestamp) {
    timestamp = util.isNumber(timestamp) ? timestamp :  Date.now();

    return new Date(timestamp).getTimezoneOffset() * MIN_TO_MS;
}

/**
 * Get the custome timezone offset by timestampe
 * @param {number} timestamp - timestamp
 * @returns {number} timezone offset
 * @private
 */
function getCustomTimezoneOffset(timestamp) {
    var offset;

    if (!setByTimezoneOption && timezoneOffsetCallback) {
        return timezoneOffsetCallback(timestamp) * MIN_TO_MS;
    }

    offset = timezoneUtil.getTimezoneOffsetByTimezone(primaryTimezoneCode, timestamp);

    return -offset * MIN_TO_MS;
}

/**
 * Convert to local time
 * @param {number} time - time
 * @returns {number} local time
 */
function getLocalTime(time) {
  var timezoneOffsetMs = getTimezoneOffset(time);
  var primaryTimezoneOffsetMs = timezoneUtil.getPrimaryOffset() * MIN_TO_MS;
  var localTime = time - primaryTimezoneOffsetMs + timezoneOffsetMs;

  return localTime;
}

function getLocalTime_old(time) {
    var timezoneOffsetMs = getTimezoneOffset(time);
    var customTimezoneOffsetMs = getCustomTimezoneOffset(time);

    // Q. customTimezoneOffset일 때 왜 0으로 설정할까???????
    // var timezoneOffsetDiff = customTimezoneOffset ? 0 : nativeOffsetMs - timezoneOffset;

    var timezoneOffsetDiff = setByTimezoneOption ? 0 : nativeOffsetMs - timezoneOffsetMs;
    var localTime = time - customTimezoneOffsetMs + timezoneOffsetMs + timezoneOffsetDiff;

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
  var timezoneOffsetMs = getTimezoneOffset(time);
  var primaryTimezoneOffsetMs = timezoneUtil.getPrimaryOffset() * MIN_TO_MS;

  return time + primaryTimezoneOffsetMs - timezoneOffsetMs;
};

TZDate.prototype.getTime_old = function() {
    var time = this._date.getTime();

    var timezoneOffsetMs = getTimezoneOffset(time);
    var primaryTimezoneOffsetMs = timezoneUtil.getPrimaryOffset() * MIN_TO_MS;
    var localTime = time - primaryTimezoneOffsetMs + timezoneOffsetMs;

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

// 시스템 OS 서울일 때
TZDate.prototype.convertByPrimaryTimezone_fromSeoul = function() {
    return new TZDate(this.getTime());
};

// 시스템 OS 뉴욕일 때
TZDate.prototype.convertByPrimaryTimezone = function() {
    return new TZDate(this.getTime());
  /*
  var primaryOffsetMs = -timezoneUtil.getPrimaryOffset() * MIN_TO_MS;
  var offsetMs = setByTimezoneOption ?
      timezoneUtil.getTimezoneOffsetByTimezone(primaryTimezoneCode, this.getTime()) * MIN_TO_MS :
      -getTimezoneOffset(this.getTime());
  var nativeTime = this.getTime() - nativeOffsetMs - offsetMs;
  var result = nativeTime + nativeOffsetMs + offsetMs;
  var diffMs = offsetMs - primaryOffsetMs;
  result -= diffMs;
  console.log('convertByPrimaryTimezone', result, diffMs,
      offsetMs / MIN_TO_MS, primaryOffsetMs / MIN_TO_MS);

  return new TZDate(result);
  */
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

/**
 * Set primary timezone code
 * @param {string} timezoneCode - timezone code (such as 'Asia/Seoul', 'America/New_York')
 */
function setPrimaryTimezoneCode(timezoneCode) {
    primaryTimezoneCode = timezoneCode;
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
* @param {Array.<number>} parts - An array of objects only containing the formatted date (e.g. [2020, 12, 14, 10, 15, 19])
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
* Check if browser supports Intl, Intl.DateTimeFormat, formatToParts API
* @param {string} timeZone - timezone
* @returns {boolean} supported
*/
function supportIntl(timeZone) {
    var supported = false;
    var formatter;

    if (global.Intl && global.Intl.DateTimeFormat) {
        formatter = getIntlFormatter(timeZone);

        if (util.isFunction(formatter.formatToParts)) {
            intlFormatter[timeZone] = formatter;
            supported = true;
        }
    }

    return supported;
}

/**
* Return DateTimeFormat instance by timezone
* @param {string} timeZone - timezone
* @returns {DateTimeFormat} Intl.DateTimeFormat instance
*/
function getIntlFormatter(timeZone) {
    if (!intlFormatter[timeZone]) {
        intlFormatter[timeZone] = new Intl.DateTimeFormat('en-US', {
            hourCycle: 'h23',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZone: timeZone
        });
    }

    return intlFormatter[timeZone];
}

timezoneUtil = {
    Date: TZDate,
    differentOffset: differentOffset,
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
     */
    setOffsetCallback: function(callback) {
        timezoneOffsetCallback = callback;
    },

    /**
     * (Use this method only for testing)
     * Reset system timezone and custom timezone
     */
    restoreOffset: function() {
        customOffsetMs = getTimezoneOffset();
    },

    /**
     * Set a callback function to get timezone offset by timestamp
     * @param {function} calculator - offset calculator
     */
    setOffsetCalculator: function(calculator) {
        offsetCalculator = calculator;
    },

    /**
     * Check to use custom timezone option
     * @returns {boolean} use custom timezone option
     */
    hasCustomeTimezoneOffset: function() {
        return setByTimezoneOption;
    },

    /**
     * Set timezone and offset by timezone option
     * @param {Timezone} timezoneObj - {@link Timezone} (such as 'Asia/Seoul', 'America/New_York')
     */
    // eslint-disable-next-line complexity
    setPrimaryOffsetByTimezoneOption: function(timezoneObj) {
        var timezoneCode = timezoneObj.timezone;
        var offset, timestamp;

        if (!timezoneObj) {
            return;
        }

        setByTimezoneOption = true;
        timestamp = new TZDate().getTime();

        if (timezoneCode) {
            setPrimaryTimezoneCode(timezoneCode);

            offset = timezoneUtil.getTimezoneOffsetByTimezone(timezoneCode, timestamp);
            primaryOffset = -offset;
            timezoneUtil.setOffset(-offset);

            // fixedPrimaryOffset = this.getTimezoneOffsetByTimezone(timezoneCode, Date.now().valueOf());

            isSameNativeOffsetAndCustomOffset = -offset === nativeOffsetMs / MIN_TO_MS;

            if (isSameNativeOffsetAndCustomOffset) {
                // 커스텀 타임존 0번째 인덱스와 시스템 OS 시간대가 같을 경우 커스텀 시간대를 지정하지 않았을 때와 같음
                setByTimezoneOption = false;
            }
        }
    },

    /**
     * Get offset by timezone and time
     * @param {string} timezoneCode - timezone code (such as 'Asia/Seoul', 'America/New_York')
     * @param {number} timestamp - timestamp
     * @returns {number} timezone offset
     */
    getTimezoneOffsetByTimezone: function(timezoneCode, timestamp) {
        var offset = timezoneUtil.getPrimaryOffset();
        var formatter, date;

        if (util.isUndefined(timezoneCode)) {
            return -offset;
        }

        if (util.isFunction(offsetCalculator)) {
            offset = offsetCalculator(timezoneCode, timestamp);
        } else if (supportIntl(timezoneCode)) {
            formatter = getIntlFormatter(timezoneCode);
            date = new Date(timestamp);
            offset = getOffset(partsOffset(formatter, date), date);
        }

        return offset;
    },

    /**
     * Set primary timezone offset.
     * @param {number} offset - offset
     */
    setPrimaryOffset: function(offset) {
        primaryOffset = offset;
    },

    /**
     * Return primary timezone offset.
     * If there is no primaryOffset, the native offset is returned.
     * @returns {number} primary timezone offset
     */
    getPrimaryOffset: function() {
        return util.isNumber(primaryOffset) ? primaryOffset : nativeOffsetMs / MIN_TO_MS;
    },

    /**
     *
     * @param {number} startTime - start timestamp
     * @param {number} endTime - end timestamp
     * @returns {number}
     */
    isDifferentOffsetStartAndEndTime: function(startTime, endTime) {
        var offset1, offset2;

        if (setByTimezoneOption) {
            offset1 = -this.getTimezoneOffsetByTimezone(primaryTimezoneCode, startTime);
            offset2 = -this.getTimezoneOffsetByTimezone(primaryTimezoneCode, endTime);
        } else {
            offset1 = getTimezoneOffset(startTime);
            offset2 = getTimezoneOffset(endTime);
        }

        var result = 0;
        if (offset1 > offset2) {
            result = differentOffset.STANDARD_TO_DST; // Standard to DST
        } else if (offset1 < offset2) {
            result = differentOffset.DST_TO_STANDARD; // DST to Standard
        }

        return result;
    }
};

module.exports = timezoneUtil;
