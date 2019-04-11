/**
 * @fileoverview Wrapper module for easy calc date object
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var TZDate = require('./timezone').Date;

/**
 * @constructor
 * @param {TZDate} date to wrapping DW class
 */
function DW(date) {
    if (!(this instanceof DW)) {
        return new DW(date);
    }

    if (!(date instanceof TZDate)) {
        date = new TZDate(date);
    }

    /**
     * @type {TZDate}
     */
    this.d = date;
}

/**
 * Return d property when supplied object is DW. else return itself
 * @param {*} obj - object
 * @returns {TZDate} date
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
    return new DW(new TZDate(this.d));
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
 * Add month.
 * @param {number} m - month to add
 * @returns {DW} wrapper object
 */
DW.prototype.addMonth = function(m) {
    var currentMonth = this.d.getMonth();
    var currentDay = this.d.getDate();
    var leapYear = this._isLeapYear();
    var targetMonth = currentMonth + m;
    var clone = this.clone();
    var targetDaysOfMonth = currentDay;

    if (m) {
        if (targetMonth === 1) {
            targetDaysOfMonth = leapYear ? 29 : 28;
        } else {
            if (m > 0) {
                clone.d.setMonth(targetMonth + 1, 0);
            } else {
                clone.d.setMonth(currentMonth, 0);
            }
            targetDaysOfMonth = clone.d.getDate();
        }
    }

    this.d.setMonth(targetMonth, Math.min(currentDay, targetDaysOfMonth));

    return this;
};

/**
 * Is leap year or not
 * @returns {boolean}
 */
DW.prototype._isLeapYear = function() {
    var year = this.d.getFullYear();

    return ((year % 4 === 0) && (year % 100 !== 0)) || !(year % 400);
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
 * @param {TZDate|DW} d1 - from date
 * @param {TZDate|DW} d2 - to date
 * @returns {boolean} is between?
 */
DW.prototype.isBetween = function(d1, d2) {
    var safe = this.safe;

    return safe(d1) <= this.d && this.d <= safe(d2);
};

module.exports = DW;
