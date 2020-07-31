/**
 * @fileoverview common/general utilities.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');

var domutil = require('../common/domutil'),
    Collection = require('../common/collection');
var datetime = require('../common/datetime');

/**
 * Default schedule id getter for collection
 * @param {Schedule} schedule - schedule instance
 * @returns {string} schedule id
 */
function scheduleIDGetter(schedule) {
    return schedule.cid();
}

module.exports = {
    /**
     * @returns {Collection} new collection for schedule models.
     */
    createScheduleCollection: function() {
        return new Collection(scheduleIDGetter);
    },

    /**
     * Get ratio value.
     *
     * a : b = y : X;
     *
     * =
     *
     * X = (b * y) / a;
     * @param {number} a - a
     * @param {number} b - b
     * @param {number} y - y
     * @returns {number} ratio value
     */
    ratio: function(a, b, y) {
        // a : b = y : x;
        return (b * y) / a;
    },

    /**
     * Find nearest value from supplied params.
     * @param {number} value - value to find.
     * @param {array} nearest - nearest array.
     * @returns {number} nearest value
     */
    nearest: function(value, nearest) {
        var diff = util.map(nearest, function(v) {
                return Math.abs(value - v);
            }),
            nearestIndex = util.inArray(Math.min.apply(null, diff), diff);

        return nearest[nearestIndex];
    },

    /**
     * Mixin method.
     *
     * (extend methods except property name 'mixin')
     * @param {object} from - mixin object.
     * @param {object} to - object to mixin.
     */
    mixin: function(from, to) {
        util.extend(to.prototype, from);
    },

    /**
     * Limit supplied value base on `minArr`, `maxArr`
     * @param {number} value - value
     * @param {array} minArr - min
     * @param {array} maxArr - max
     * @returns {number} limited value
     */
    limit: function(value, minArr, maxArr) {
        var v = Math.max.apply(null, [value].concat(minArr));
        v = Math.min.apply(null, [v].concat(maxArr));

        return v;
    },

    /**
     * Limit supplied date base on `min`, `max`
     * @param {TZDate} date - date
     * @param {TZDate} min - min
     * @param {TZDate} max - max
     * @returns {TZDate} limited value
     */
    limitDate: function(date, min, max) {
        if (date < min) {
            return min;
        }
        if (date > max) {
            return max;
        }

        return date;
    },

    /**
     * Max value with TZDate type for timezone calculation
     * @param {TZDate} d1 - date 1
     * @param {TZDate} d2 - date 2
     * @returns {TZDate}
     */
    maxDate: function(d1, d2) {
        if (d1 > d2) {
            return d1;
        }

        return d2;
    },

    stripTags: function(str) {
        return str.replace(/<([^>]+)>/ig, '');
    },

    /**
     * Get first value in 2-dimentional array.
     * @param {Array.<Array>} arr2d - 2-dimentional array
     * @returns {*} first value in 2d array
     */
    firstIn2dArray: function(arr2d) {
        return util.pick(arr2d, '0', '0');
    },

    /**
     * Get last value in 2-dimentional array.
     * @param {Array.<Array>} arr2d - 2-dimentional array
     * @returns {*} last value in 2d array
     */
    lastIn2dArray: function(arr2d) {
        var lastRow = arr2d.length - 1,
            lastCol = arr2d[lastRow].length - 1;

        return util.pick(arr2d, lastRow, lastCol);
    },

    /**
     * Set 'title' attribute for all elements that have exceeded content in
     * container
     * @param {string} selector - CSS selector {@see domutil#find}
     * @param {HTMLElement} container - container element
     * @param {boolean} force - force to apply
     */
    setAutoEllipsis: function(selector, container, force) {
        util.forEach(domutil.find(selector, container, true), function(el) {
            if (force || el.offsetWidth < el.scrollWidth) {
                el.setAttribute('title', domutil.getData(el, 'title'));
            }
        });
    },

    /**
     * Set the value at path of object.
     * @param {object} object - the object to modify
     * @param {string} path -the path of property to set
     * @param {*} value - the value to set
     */
    set: function(object, path, value) {
        var names = path.split('.');
        var store = object;

        util.forEach(names, function(name, index) {
            store[name] = store[name] || {};

            if (index === names.length - 1) {
                store[name] = value;
            } else {
                store = store[name];
            }
        });
    },

    /**
     * shift a array
     * @param {Array.<any>} array - array
     * @param {number} shift - positive or negative integer to shift
     * @returns {Array.<any>} shifted array
     */
    shiftArray: function(array, shift) {
        var length = Math.abs(shift);
        var i;

        if (shift > 0) {
            for (i = 0; i < length; i += 1) {
                array.push(array.shift());
            }
        } else if (shift < 0) {
            for (i = 0; i < length; i += 1) {
                array.unshift(array.pop());
            }
        }

        return array;
    },

    /**
     * take elements from array between start and end.
     * @param {Array.<any>} array - array
     * @param {number} start - start index
     * @param {number} end - end index
     * @returns {Array.<any>}
     */
    takeArray: function(array, start, end) {
        var length = array.length;
        var rightCount = length - end;
        var leftCount = start;

        // remove right
        array.splice(end, rightCount);
        // remove left
        array.splice(0, leftCount);

        return array;
    },

    /**
     * shift hours
     * @param {number} hours - hours
     * @param {number} shift - positive or negative integer to shift
     * @returns {number} shifted hours
     */
    shiftHours: function(hours, shift) {
        if (shift > 0) {
            hours = (hours + shift) % 24;
        } else if (shift < 0) {
            hours += shift;
            hours = hours > 0 ? hours : 24 + hours;
        }

        return hours;
    },

    /**
     * Parse css value into number and units
     * @param {string} cssValue - css value like '72px'
     * @returns {Array} [number, unit]
     */
    parseUnit: function(cssValue) {
        var number = parseFloat(cssValue, 10);
        var unit = cssValue.match(/[\d.\-+]*\s*(.*)/)[1] || '';

        return [number, unit];
    },

    find: function(array, iteratee, contextopt) {
        var found;

        util.forEach(array, function(item) {
            if (iteratee) {
                found = iteratee(item);
            }

            if (found) {
                found = item;

                return false;
            }

            return true;
        }, contextopt);

        return found;
    },

    getScheduleChanges: function(schedule, propNames, data) {
        var changes = {};
        var dateProps = ['start', 'end'];

        util.forEach(propNames, function(propName) {
            if (dateProps.indexOf(propName) > -1) {
                if (datetime.compare(schedule[propName], data[propName])) {
                    changes[propName] = data[propName];
                }
            } else if (!util.isUndefined(data[propName]) && schedule[propName] !== data[propName]) {
                changes[propName] = data[propName];
            }
        });

        return util.isEmpty(changes) ? null : changes;
    }
};
