/**
 * @fileoverview datetime utility module
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var opt = Object.prototype.toString;

var datetime = {
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
    }
};

module.exports = datetime;

