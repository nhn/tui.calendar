/**
 * @fileoverview Wrapper module for easy calc date object
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var ts = Object.prototype.toString;

function DW(date) {
    if (!(this instanceof DW)) {
        return new DW(date);
    }

    if (ts.call(date) !== '[object Date]') {
        date = new Date(date);
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
    return new DW(new Date(Number(this.d)));
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
 * Add month
 * @param {number} m - month to add
 * @returns {DW} wrapper object
 */
DW.prototype.addMonth = function(m) {
    this.d.setMonth(this.d.getMonth() + m);
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

