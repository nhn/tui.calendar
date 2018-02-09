/**
 * @fileoverview common/general utilities.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var aps = Array.prototype.slice;

var domutil = require('../common/domutil'),
    Collection = require('../common/collection');

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
     * @param {...*} initItems - items to add newly created collection.
     * @returns {Collection} new collection for schedule models.
     */
    createScheduleCollection: function(initItems) {    // eslint-disable-line
        var collection = new Collection(scheduleIDGetter);

        if (arguments.length) {
            collection.add.apply(collection, arguments);
        }

        return collection;
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
     * pick value from object then return utility object to treat it.
     * @param {object} obj - object to search supplied path property.
     * @param {...string} paths - rest parameter that string value to search property in object.
     * @returns {object} pick object.
     */
    pick2: function(obj, paths) {    // eslint-disable-line
        var result = util.pick.apply(null, arguments),
            pick;

        pick = {
            /**
             * @returns {*} picked value.
             */
            val: function() {
                return result;
            },

            /**
             * invoke supplied function in picked object.
             *
             * the callback context is set picked object.
             * @param {string|function} fn - function to invoke in picked object.
             * @returns {*} result of invoke.
             */
            then: function(fn) {
                var args;

                if (!result) {
                    return undefined;    //eslint-disable-line
                }

                args = aps.call(arguments, 1);

                if (util.isString(fn)) {
                    return (util.pick(result, fn) || function() {}).apply(result, args);
                }

                return fn.call(result, result);
            }
        };

        return pick;
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
     * Set 'title' attribute for all element that has exceeded content in
     * container
     * @param {string} selector - CSS selector {@see domutil#find}
     * @param {HTMLElement} container - container element
     */
    setAutoEllipsis: function(selector, container) {
        util.forEach(domutil.find(selector, container, true), function(el) {
            if (el.offsetWidth < el.scrollWidth) {
                el.setAttribute('title', domutil.getData(el, 'title'));
            }
        });
    }
};

