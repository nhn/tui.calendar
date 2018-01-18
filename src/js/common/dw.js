/**
 * @fileoverview Wrapper module for easy calc date object
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var TZDate = require('../common/timezone').Date;

/**
 * @constructor
 * @param {Date} date to wrapping DW class
 */
function DW(date) {
    if (!(this instanceof DW)) {
        return new DW(date);
    }

    if (!(date instanceof TZDate)) {
        date = new TZDate(date);
    }

    /**
     * @type {Date}
     */
    this.d = date;
}

/**
 * Return d property when supplied object is DW. else return itself
 * @param {*} obj - object
 * @returns {Date} date
 */
DW.prototype.safe = function(obj) {
    if (obj.constructor === DW) {
        return obj.d;
    }

    return obj;
};

/**
 * Clone DW object
 * @returns {DW} cloned dwrap object
 */
DW.prototype.clone = function() {
    return new DW(new TZDate(Number(this.d)));
};

/**
 * Add days
 * @param {number} day - day to add
 * @returns {DW} wrapper object
 */
DW.prototype.addDate = function(day) {
    this.d.setDate(this.d.getDate() + day);
    return this;
};

/**
 * Add month. If month value is changed, date set to 1.
 * @param {number} m - month to add
 * @returns {DW} wrapper object
 */
DW.prototype.addMonth = function(m) {
    var prevMonth = this.d.getMonth();
    var prevYear = this.d.getFullYear();
    this.d.setMonth(prevMonth + m);

    // move to first day on the month because plus 1 month on '2017-01-31' means '2017-03-01'
    // Don't do it on different year(Because december + 1month is ok)
    if (this.d.getFullYear() === prevYear && this.d.getMonth() !== prevMonth) {
        this.d.setMonth(prevMonth + m, 1);
    }
    return this;
};

/**
 * Set hour, minutes, seconds, milliseconds
 * @param {number} h - hours
 * @param {number} m - minutes
 * @param {number} s - seconds
 * @param {number} ms - milliseconds
 * @returns {DW} wrapper object
 */
DW.prototype.setHours = function(h, m, s, ms) {
    this.d.setHours(h, m, s, ms);
    return this;
};

/**
 * Whether date is between supplied dates?
 * @param {Date|DW} d1 - from date
 * @param {Date|DW} d2 - to date
 * @returns {boolean} is between?
 */
DW.prototype.isBetween = function(d1, d2) {
    var safe = this.safe;
    return safe(d1) <= this.d && this.d <= safe(d2);
};

module.exports = DW;
