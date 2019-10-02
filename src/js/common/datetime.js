/**
 * @fileoverview datetime utility module
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var TZDate = require('./timezone').Date,
    dw = require('../common/dw');
var util = require('tui-code-snippet');
/* eslint-disable no-useless-escape */
var dateFormatRx = /^(\d{4}[-|\/]*\d{2}[-|\/]*\d{2})\s?(\d{2}:\d{2}:\d{2})?$/;
var datetime, tokenFunc;

var memo = {
    millisecondsTo: {},
    millisecondsFrom: {}
};

tokenFunc = {
    /**
     * @param {TZDate} date date object.
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
     * @param {TZDate} date date object
     * @returns {string} four digit year number
     */
    'YYYY': function(date) {
        return String(date.getFullYear());
    },

    /**
     * @param {TZDate} date date object
     * @returns {string} two digit month number
     */
    'MM': function(date) {
        return datetime.leadingZero(date.getMonth() + 1, 2);
    },

    /**
     * @param {TZDate} date date object
     * @returns {string} two digit date number
     */
    'DD': function(date) {
        return datetime.leadingZero(date.getDate(), 2);
    },

    /**
     * @param {TZDate} date date object
     * @returns {string} HH:mm
     */
    'HH:mm': function(date) {
        var hour = date.getHours(),
            minutes = date.getMinutes();

        return datetime.leadingZero(hour, 2) + ':' +
            datetime.leadingZero(minutes, 2);
    },

    /**
     * @param {TZDate} date date object
     * @returns {string} hh:mm
     */
    'hh:mm': function(date) {
        var hour = date.getHours();
        var minutes = date.getMinutes();

        if (hour > 12) {
            hour = hour % 12;
        }

        return datetime.leadingZero(hour, 2) + ':' +
            datetime.leadingZero(minutes, 2);
    },

    /**
     * @param {TZDate} date date object
     * @returns {string} tt
     */
    'tt': function(date) {
        var hour = date.getHours();

        return hour < 12 ? 'am' : 'pm';
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
     * The number of milliseconds one minutes.
     * @type {number}
     */
    MILLISECONDS_PER_MINUTES: 60000,

    /**
     * The number of milliseconds 20 minutes for schedule min duration
     * @type {number}
     */
    MILLISECONDS_SCHEDULE_MIN_DURATION: 20 * 60000,

    /**
     * convert milliseconds
     * @param {string} type - type of value.
     * @param {number} value - value to convert.
     * @param {function} iteratee - iteratee function to use reduce.
     * @returns {number} converted value.
     */
    _convMilliseconds: function(type, value, iteratee) {
        var conv = [24, 60, 60, 1000],
            index = {
                day: 0,
                hour: 1,
                minutes: 2,
                seconds: 3
            };

        if (!(type in index) || global.isNaN(value)) {
            return false;
        }

        return util.reduce([value].concat(conv.slice(index[type])), iteratee);
    },

    /**
     * Convert milliseconds value to other type
     * @param {type} type convert to type want to. support "day", "hour",
     *  "minutes", "seconds" only.
     * @param {value} value - value to convert.
     * @returns {number} converted value.
     */
    millisecondsTo: function(type, value) {
        var cache = memo.millisecondsTo,
            key = type + value;

        if (cache[key]) {
            return cache[key];
        }

        cache[key] = datetime._convMilliseconds(type, value, function(m, v) {
            return m / v;
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

        cache[key] = datetime._convMilliseconds(type, value, function(m, v) {
            return m * v;
        });

        return cache[key];
    },

    /**
     * Convert hours to minutes
     * @param {number} hours - hours
     * @returns {number} minutes
     */
    minutesFromHours: function(hours) {
        return hours * 60;
    },

    /**
     * Make date array from supplied paramters.
     * @param {TZDate} start Start date.
     * @param {TZDate} end End date.
     * @param {number} step The number of milliseconds to use increment.
     * @returns {TZDate[]} TZDate array.
     */
    range: function(start, end, step) {
        var startTime = start.getTime();
        var endTime = end.getTime();
        var cursor = startTime;
        var date = dw(new TZDate(start));
        var result = [];

        while (cursor <= endTime && endTime >= date.d.getTime()) {
            result.push(datetime.start(date.d));
            cursor = cursor + step;
            date.addDate(1);
        }

        return result;
    },

    /**
     * Clone supplied date.
     * @param {TZDate} date date object to clone.
     * @returns {TZDate} Cloned date object
     */
    clone: function(date) {
        return new TZDate(date);
    },

    /**
     * Compare two dates.
     *
     * when first date is latest then seconds then return -1.
     *
     * return +1 reverse, and return 0 is same.
     * @param {TZDate} d1 Date object to compare.
     * @param {TZDate} d2 Date object to compare.
     * @returns {number} result of compare
     */
    compare: function(d1, d2) {
        var _d1 = d1.getTime(),
            _d2 = d2.getTime();

        if (_d1 < _d2) {
            return -1;
        }
        if (_d1 > _d2) {
            return 1;
        }

        return 0;
    },

    /**
     * @param {TZDate} d1 - date one
     * @param {TZDate} d2 - date two
     * @returns {boolean} is two date are same year, month?
     */
    isSameMonth: function(d1, d2) {
        return (d1.getFullYear() === d2.getFullYear() &&
                d1.getMonth() === d2.getMonth());
    },

    /**
     * @param {TZDate} d1 - date one
     * @param {TZDate} d2 - date two
     * @returns {boolean} is two date are same year, month, date?
     */
    isSameDate: function(d1, d2) {
        var sameMonth = datetime.isSameMonth(d1, d2);

        return sameMonth && (d1.getDate() === d2.getDate());
    },

    /**
     * Check supplied parameter is valid date object.
     * @param {*} d Object to validate.
     * @returns {boolean} return true when parameter is valid date object.
     */
    isValid: function(d) {
        if (d instanceof TZDate) {
            return !window.isNaN(d.getTime());
        }

        return false;
    },

    /**
     * convert non local date to UTC date.
     * @param {TZDate} d Date to convert UTC.
     * @returns {TZDate} The UTC Date.
     */
    toUTC: function(d) {
        var l = d.getTime(),
            offset = datetime.millisecondsFrom('minutes', new Date().getTimezoneOffset());

        return new TZDate(l + offset);
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

        if (String(number).length > length) {
            return String(number);
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
     * @returns {(TZDate|boolean)} Converted Date object. when supplied str is not available then return false.
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

        return new TZDate().setWithRaw(
            Number(ymd[0]),
            Number(ymd[1]) + fixMonth,
            Number(ymd[2]),
            Number(hms[0]),
            Number(hms[1]),
            Number(hms[2]),
            0
        );
    },

    /**
     * Return date object from Date.
     * @param {TZDate} date date
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
     * @param {TZDate} date date. if undefined, use now.
     * @returns {TZDate} start date.
     */
    start: function(date) {
        var d = date ? new TZDate(date) : new TZDate();
        d.setHours(0, 0, 0, 0);

        return d;
    },

    /**
     * Return 23:59:59 supplied date.
     * @param {TZDate} date date. if undefined, use now.
     * @returns {TZDate} end date.
     */
    end: function(date) {
        var d = date ? new TZDate(date) : new TZDate();
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
     * @param {TZDate} date String want to formatted.
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
     * Get start date of specific month
     * @param {TZDate} date - date to get start date
     * @returns {TZDate} start date of supplied month
     */
    startDateOfMonth: function(date) {
        var startDate = new TZDate(date);

        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);

        return startDate;
    },

    /**
     * Get end date of specific month
     * @param {TZDate} date - date to get end date
     * @returns {TZDate} end date of supplied month
     */
    endDateOfMonth: function(date) {
        var endDate = datetime.startDateOfMonth(date);

        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(endDate.getDate() - 1);
        endDate.setHours(23, 59, 59);

        return endDate;
    },

    /**
     * Return 2-dimensional array month calendar
     *
     * dates that different month with given date are negative values
     * @param {TZDate} month - date want to calculate month calendar
     * @param {object} options - options
     * @param {number} [options.startDayOfWeek=0] - start day of week
     * @param {boolean} options.isAlways6Week - whether the number of weeks are always 6
     * @param {number} options.visibleWeeksCount visible weeks count
     * @param {boolean} options.workweek - only show work week
     * @param {function} [iteratee] - iteratee for customizing calendar object
     * @returns {Array.<TZDate[]>} calendar 2d array
     */
    arr2dCalendar: function(month, options, iteratee) {
        var weekArr,
            start, end,
            startIndex, endIndex,
            totalDate, afterDates,
            cursor, week,
            calendar = [],
            startDayOfWeek = options.startDayOfWeek,
            isAlways6Week = util.isUndefined(options.isAlways6Week) ? true : options.isAlways6Week,
            visibleWeeksCount = options.visibleWeeksCount,
            workweek = options.workweek;

        if (visibleWeeksCount) {
            start = new TZDate(month);
            end = dw(new TZDate(month));
            end.addDate(7 * (visibleWeeksCount - 1));
            end = end.d;
        } else {
            start = datetime.startDateOfMonth(month);
            end = datetime.endDateOfMonth(month);
        }

        // create day number array by startDayOfWeek number
        // 4 -> [4, 5, 6, 0, 1, 2, 3]
        // 2 -> [2, 3, 4, 5, 6, 0, 1]
        weekArr = util.range(startDayOfWeek, 7).concat(util.range(7)).slice(0, 7);
        startIndex = util.inArray(start.getDay(), weekArr);
        endIndex = util.inArray(end.getDay(), weekArr);
        // free dates after last date of this month
        afterDates = 7 - (endIndex + 1);

        if (visibleWeeksCount) {
            totalDate = 7 * visibleWeeksCount;
        } else {
            totalDate = isAlways6Week ? (7 * 6) : (startIndex + end.getDate() + afterDates);
        }
        cursor = datetime.start(start).addDate(-startIndex);
        // iteratee all dates to render
        util.forEachArray(util.range(totalDate), function(i) {
            var date;

            if (!(i % 7)) {
                // group each date by week
                week = calendar[i / 7] = [];
            }

            date = datetime.start(cursor);
            date = iteratee ? iteratee(date) : date;
            if (!workweek || !datetime.isWeekend(date.getDay())) {
                week.push(date);
            }

            // add date
            cursor.setDate(cursor.getDate() + 1);
        });

        return calendar;
    },

    /**
     * Calculate grid left(%), width(%) by narrowWeekend, startDayOfWeek, workweek
     *
     * @param {number} days - day length of week
     * @param {boolean} narrowWeekend - narrow weekend
     * @param {number} startDayOfWeek - start day of week
     * @param {boolean} workweek - only show work week
     * @returns {Array} day, left, width
     */
    getGridLeftAndWidth: function(days, narrowWeekend, startDayOfWeek, workweek) {
        var limitDaysToApplyNarrowWeekend = 5;
        var uniformWidth = 100 / days;
        var wideWidth = days > limitDaysToApplyNarrowWeekend ? 100 / (days - 1) : uniformWidth;
        var accumulatedWidth = 0;
        var dates = util.range(startDayOfWeek, 7).concat(util.range(days)).slice(0, 7);

        if (workweek) {
            dates = util.filter(dates, function(day) {
                return !datetime.isWeekend(day);
            });
        }

        narrowWeekend = workweek ? false : narrowWeekend;

        return util.map(dates, function(day) {
            var model;
            var width = narrowWeekend ? wideWidth : uniformWidth;
            if (days > limitDaysToApplyNarrowWeekend && narrowWeekend && datetime.isWeekend(day)) {
                width = wideWidth / 2;
            }

            model = {
                day: day,
                width: width,
                left: accumulatedWidth
            };

            accumulatedWidth += width;

            return model;
        });
    },

    /**
     * Get that day is weekend
     * @param {number} day number
     * @returns {boolean} true if weekend or false
     */
    isWeekend: function(day) {
        return day === 0 || day === 6;
    },

    /**
     * Whether date is between supplied dates with date value?
     * @param {TZDate} d - target date
     * @param {TZDate} d1 - from date
     * @param {TZDate} d2 - to date
     * @returns {boolean} is between?
     */
    isBetweenWithDate: function(d, d1, d2) {
        var format = 'YYYYMMDD';
        d = parseInt(datetime.format(d, format), 10);
        d1 = parseInt(datetime.format(d1, format), 10);
        d2 = parseInt(datetime.format(d2, format), 10);

        return d1 <= d && d <= d2;
    },

    isStartOfDay: function(d) {
        return !datetime.compare(datetime.start(d), d);
    },

    convertStartDayToLastDay: function(d) {
        var date = new TZDate(d);
        var isStartOfDay = datetime.isStartOfDay(d);

        return isStartOfDay ? date.setDate(date.getDate() - 1) : date;
    },

    getStartOfNextDay: function(d) {
        var date = datetime.start(d);
        date.setHours(24);

        return date;
    }
};

module.exports = datetime;
