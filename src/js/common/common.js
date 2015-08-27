/**
 * @fileoverview common/general utilities.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var Collection = require('../common/collection');
var aps = Array.prototype.slice;

function eventIDGetter(event) {
    return event.id();
}

module.exports = {
    /**
     * @param {...*} initItems - items to add newly created collection.
     * @returns {Collection} new collection for event models.
     */
    createEventCollection: function(initItems) {    // eslint-disable-line
        var collection = new Collection(eventIDGetter);

        if (arguments.length) {
            collection.add.apply(collection, arguments);
        }

        return collection;
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
                var args = aps.call(arguments, 1);

                if (util.isString(fn)) {
                    return (util.pick(result, fn) || function() {}).apply(result, args);
                }

                return fn.call(result, result);
            }
        };

        return pick;
    }
};

