/**
 * @fileoverview datetime utility module
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util,
    opt = Object.prototype.toString;

var dateFormatRx = /^\d{4}(-|\/)\d{2}(-|\/)\d{2} \d{2}:\d{2}:\d{2}$/;

var datetime,
    tokenFunc;

tokenFunc = {
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
        return datetime.leftPad(date.getMonth() + 1, 2);
    },

    /**
     * @param {Date} date date object
     * @returns {string} two digit date number
     */
    'DD': function(date) {
        return datetime.leftPad(date.getDate(), 2);
    }
};

datetime = {
    /**
     * The number of milliseconds one day.
     * @type {number}
     */
    MILLISECONDS_PER_DAY: 86400000,

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

        if (_d1 > _d2) {
            return -1;
        } else if (_d1 < _d2) {
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
     * convert non UTC date to UTC date.
     * @param {Date} d Date to convert UTC.
     * @returns {Date} The UTC Date.
     */
    toUTC: function(d) {
        return new Date(d.getTime() + (new Date()).getTimezoneOffset() * 60000);
    },

    /**
     * pad left zero characters.
     * @param {number} number number value to pad zero.
     * @param {number} length pad length to want.
     * @returns {string} padded string.
     */
    leftPad: function(number, length) {
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
     * - YYYY/MM/DD HH:mm:SS
     * - YYYY-MM-DD HH:mm:SS
     *
     * @param {string} str Formatted string.
     * @returns {(Date|boolean)} Converted Date object. when supplied str is not available then return false.
     */
    parse: function(str) {
        var separator,
            parts,
            ymd,
            hms;

        if (!dateFormatRx.test(str)) {
            return false;
        }

        separator = ~str.indexOf('/') ? '/' : '-';
        parts = str.split(' ');
        ymd = parts[0].split(separator);
        hms = parts[1].split(':');

        return new Date(+ymd[0], +ymd[1], +ymd[2], +hms[0], +hms[1], +hms[2]);
    },

    /**
     * Return formatted string as basis of supplied string.
     *
     * Supported Token Lists.
     *
     * - YYYY => 1988
     * - MM => 01 ~ 12
     * - DD => 01 ~ 31
     * @param {Date} date String want to formatted.
     * @param {string} format format str.
     * @returns {string}  Formatted date string.
     * TODO: if slower performance because of iterating token. then change the method to format limitation.
     */
    format: function(date, format) {
        var result = format;
        util.forEachOwnProperties(tokenFunc, function(converter, token) {
            result = result.replace(token, converter(date));
        });

        return result;
    }
};

module.exports = datetime;

