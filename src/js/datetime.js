/**
 * @fileoverview datetime utility module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util,
    opt = Object.prototype.toString;

var dateFormatRx = /^(\d{4}[-|\/]*\d{2}[-|\/]*\d{2})\s?(\d{2}:\d{2}:\d{2})?$/;

var datetime,
    tokenFunc;

var memo = {
    millisecondsTo: {},
    millisecondsFrom: {}
};

tokenFunc = {
    /**
     * @param {Date} date date object.
     * @returns {string} YYYYMMDD
     */
    'YYYYMMDD': function(date) {
        return [
            date.getFullYear(),
            datetime.leadingZero(date.getMonth() + 1, 2),
            datetime.leadingZero(date.getDate(), 2)
        ].join('');
    },
    /**
     * @param {Date} date date object
     * @returns {string} four digit year number
     */
    'YYYY': function(date) {
        return date.getFullYear() + '';
    },

    /**
     * @param {Date} date date object
     * @returns {string} two digit month number
     */
    'MM': function(date) {
        return datetime.leadingZero(date.getMonth() + 1, 2);
    },

    /**
     * @param {Date} date date object
     * @returns {string} two digit date number
     */
    'DD': function(date) {
        return datetime.leadingZero(date.getDate(), 2);
    },

    /**
     * @param {Date} date date object
     * @returns {string} HH:mm
     */
    'HH:mm': function(date) {
        var hour = date.getHours(),
            minutes = date.getMinutes();

        return datetime.leadingZero(hour, 2) + ':' +
            datetime.leadingZero(minutes, 2);
    }
};

datetime = {
    /**
     * The number of milliseconds one day.
     * @type {number}
     */
    MILLISECONDS_PER_DAY: 86400000,

    /**
     * The number of milliseconds one hour.
     * @type {number}
     */
    MILLISECONDS_PER_HOUR: 3600000,

    /**
     * convert milliseconds
     * @param {string} type - type of value.
     * @param {number} value - value to convert.
     * @param {function} iteratee - iteratee function to use reduce.
     * @returns {number} converted value.
     */
    _convMilliseconds: function(type, value, iteratee) {
        var conv = [60, 60, 1000],
            index = {
                hour: 0,
                minutes: 1,
                seconds: 2
            };

        if (!(type in index) || global.isNaN(value)) {
            return false;
        }

        return util.reduce([value].concat(conv.slice(index[type])), iteratee);
    },

    /**
     * Convert milliseconds value to other type
     * @param {type} type convert to type want to. support "hour", "minutes", "seconds" only.
     * @param {value} value - value to convert.
     * @returns {number} converted value.
     */
    millisecondsTo: function(type, value) {
        var cache = memo.millisecondsTo,
            key = type + value;

        if (cache[key]) {
            return cache[key];
        }

        cache[key] = datetime._convMilliseconds(type, value, function(memo, v) {
            return memo / v;
        });

        return cache[key];
    },

    /**
     * Convert value to milliseconds
     * @param {type} type - type of supplied value. support "hour", "minutes", "seconds" only.
     * @param {value} value - value to convert.
     * @returns {number} converted value.
     */
    millisecondsFrom: function(type, value) {
        var cache = memo.millisecondsFrom,
            key = type + value;

        if (cache[key]) {
            return cache[key];
        }

        cache[key] = datetime._convMilliseconds(type, value, function(memo, v) {
            return memo * v;
        });

        return cache[key];
    },

    /**
     * Make date array from supplied paramters.
     * @param {Date} start Start date.
     * @param {Date} end End date.
     * @param {number} step The number of milliseconds to use increment.
     * @returns {array} Date array.
     */
    range: function(start, end, step) {
        var cursor = new Date(start.getTime()),
            result = [];

        while (cursor <= end) {
            result.push(cursor);
            cursor = new Date(cursor.getTime() + step);
        }

        return result;
    },

    /**
     * Clone supplied date.
     * @param {Date} date date object to clone.
     * @returns {Date} Cloned date object
     */
    clone: function(date) {
        return new Date(date.getTime());
    },

    /**
     * Compare two dates.
     *
     * when first date is latest then seconds then return -1.
     *
     * return +1 reverse, and return 0 is same.
     * @param {Date} d1 Date object to compare.
     * @param {Date} d2 Date object to compare.
     * @returns {number} result of compare
     */
    compare: function(d1, d2) {
        var _d1 = d1.getTime(),
            _d2 = d2.getTime();

        if (_d1 < _d2) {
            return -1;
        } else if (_d1 > _d2) {
            return 1;
        }
        return 0;
    },

    /**
     * Check supplied parameter is valid date object.
     * @param {*} d Object to validate.
     * @returns {boolean} return true when parameter is valid date object.
     */
    isValid: function(d) {
        if (opt.call(d) === '[object Date]') {
            return !window.isNaN(d.getTime());
        }
        return false;
    },

    /**
     * convert non local date to UTC date.
     * @param {Date} d Date to convert UTC.
     * @returns {Date} The UTC Date.
     */
    toUTC: function(d) {
        var l = d.getTime(),
            offset = datetime.millisecondsFrom('minutes', new Date().getTimezoneOffset());

        return new Date(l + offset);
    },

    /**
     * pad left zero characters.
     * @param {number} number number value to pad zero.
     * @param {number} length pad length to want.
     * @returns {string} padded string.
     */
    leadingZero: function(number, length) {
        var zero = '',
            i = 0;

        if ((number + '').length > length) {
            return number + '';
        }

        for (; i < (length - 1); i += 1) {
            zero += '0';
        }

        return (zero + number).slice(length * -1);
    },

    /**
     * Convert date string to date object.
     *
     * Only listed below formats avaliable.
     *
     * - YYYYMMDD
     * - YYYY/MM/DD
     * - YYYY-MM-DD
     * - YYYY/MM/DD HH:mm:SS
     * - YYYY-MM-DD HH:mm:SS
     *
     * @param {string} str Formatted string.
     * @param {number} [fixMonth=-1] - number for fix month calculating.
     * @returns {(Date|boolean)} Converted Date object. when supplied str is not available then return false.
     */
    parse: function(str, fixMonth) {
        var separator,
            matches = str.match(dateFormatRx),
            ymd,
            hms;

        if (util.isUndefined(fixMonth)) {
            fixMonth = -1;
        }

        if (!matches) {
            return false;
        }

        if (str.length > 8) {
            // YYYY/MM/DD
            // YYYY-MM-DD
            // YYYY/MM/DD HH:mm:SS
            // YYYY-MM-DD HH:mm:SS
            separator = ~str.indexOf('/') ? '/' : '-';
            matches = matches.splice(1);

            ymd = matches[0].split(separator);
            hms = matches[1] ? matches[1].split(':') : [0, 0, 0];
        } else {
            // YYYYMMDD
            matches = matches[0];
            ymd = [matches.substr(0, 4), matches.substr(4, 2), matches.substr(6, 2)];
            hms = [0, 0, 0];
        }

        return new Date(+ymd[0], +ymd[1] + fixMonth, +ymd[2], +hms[0], +hms[1], +hms[2]);
    },

    /**
     * Return date object from Date.
     * @param {Date} date date
     * @returns {object} Date object.
     */
    raw: function(date) {
        return {
            y: date.getFullYear(),
            M: date.getMonth(),
            d: date.getDate(),
            h: date.getHours(),
            m: date.getMinutes(),
            s: date.getSeconds(),
            ms: date.getMilliseconds()
        };
    },

    /**
     * Return 00:00:00 supplied date.
     * @param {Date} date date.
     * @returns {Date} start date.
     */
    start: function(date) {
        var d = new Date(date.getTime());
        d.setHours(0, 0, 0, 0);

        return d;
    },

    /**
     * Return 23:59:59 supplied date.
     * @param {Date} date date.
     * @returns {Date} end date.
     */
    end: function(date) {
        var d = new Date(date.getTime());
        d.setHours(23, 59, 59, 0);

        return d;
    },

    /**
     * Return formatted string as basis of supplied string.
     *
     * Supported Token Lists.
     *
     * - YYYY => 1988
     * - MM => 01 ~ 12
     * - DD => 01 ~ 31
     * - YYYYMMDD => 19880925
     * @param {Date} date String want to formatted.
     * @param {string} format format str.
     * @returns {string}  Formatted date string.
     */
    format: function(date, format) {
        var result = format;
        util.forEachOwnProperties(tokenFunc, function(converter, token) {
            result = result.replace(token, converter(date));
        });

        return result;
    },

    /**
     * Return 2-dimensional array month calendar
     *
     * dates that different month with given date are negative values
     * @param {Date} month - date want to calculate month calendar
     * @param {number} [startDayOfWeek=0] - start day of week
     * @param {function} [iteratee] - iteratee for customizing calendar object
     * @returns {Array.<string[]>} calendar 2d array
     */
    arr2dCalendar: function(month, startDayOfWeek, iteratee) {
        var weekDayMatrix = [
                [0, 1, 2, 3, 4, 5, 6],
                [1, 2, 3, 4, 5, 6, 0],
                [2, 3, 4, 5, 6, 0, 1],
                [3, 4, 5, 6, 0, 1, 2],
                [4, 5, 6, 0, 1, 2, 3],
                [5, 6, 0, 1, 2, 3, 4],
                [6, 0, 1, 2, 3, 4, 5]
            ],
            weekArr,
            starts, ends,
            startIndex, endIndex,
            afterDates,
            cursor, week,
            calendar = [];

        starts = new Date(new Date(+month).setDate(1));
        ends = new Date(new Date(+starts).setMonth(starts.getMonth() + 1));
        ends = new Date(new Date(+ends).setDate(ends.getDate() - 1));

        weekArr = weekDayMatrix[startDayOfWeek || 0];
        startIndex = util.inArray(starts.getDay(), weekArr);
        endIndex = util.inArray(ends.getDay(), weekArr);
        afterDates = 7 - (endIndex + 1);

        cursor = new Date(new Date(+starts).setDate(starts.getDate() - startIndex));
        util.forEachArray(util.range(startIndex + ends.getDate() + afterDates), function(i) {
            var date;

            if (!(i % 7)) {
                week = calendar[i / 7] = [];
            }

            date = new Date(+cursor);
            date = iteratee ? iteratee(date) : date;
            week.push(date);

            cursor = new Date(cursor.setDate(cursor.getDate() + 1));
        });

        return calendar;
    }
};

module.exports = datetime;

