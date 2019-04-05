/**
 * @fileoverview Dirty flagging module for objects.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var common = require('tui-code-snippet');
var existy = common.isExisty,
    pick = common.pick,
    isFunc = common.isFunction;

/**
 * Mixin module for dirty flagging on specific objects.
 * @mixin
 * @example
 * var obj = { hello: 'good', test: '123' };
 * dirty.mixin(obj);
 *
 * obj.set('hello', 'world');
 * obj.isDirty();    // true
 * obj.isPropChanged('hello');    // true
 * obj.isPropChanged('test');    // false
 * obj.dirty(false);
 *
 * obj.isDirty();    // false
 * obj.isPropChanged('hello');    // false
 */
var dirty = {
    /**
     * Set property value with dirty flagging.
     * @param {string} propName Property name.
     * @param {*} value Proprty value.
     */
    set: function(propName, value) {
        var originValue = this[propName];

        if (originValue === value) {
            return;
        }

        this[propName] = value;

        if (!this._changed) {
            /**
             * Save changed properties.
             * @memberof dirty
             * @name _changed
             * @type {Object}
             */
            this._changed = {};
        }

        this._changed[propName] = true;

        /**
         * Dirty flag
         * @type {Boolean}
         * @name _dirty
         * @memberof dirty
         */
        this._dirty = true;
    },

    /**
     * Check dirty flag.
     * @returns {boolean} Property is changed.
     */
    isDirty: function() {
        return !!this._dirty;
    },

    /**
     * Set dirty flag manually.
     * @param {Boolean} [toDirty=true] This will set dirty flag directly.
     */
    dirty: function(toDirty) {
        toDirty = existy(toDirty) ? toDirty : true;

        /* istanbul ignore else */
        if (!toDirty) {
            this._changed = {};
        }

        this._dirty = toDirty;
    },

    /**
     * Delete property safety.
     * @param {String} propName The name of property.
     */
    deleteProp: function(propName) {
        delete this[propName];

        if (this._changed) {
            delete this._changed[propName];
        }
    },

    /**
     * Check the changes with specific property.
     * @param {String} propName The name of property you want.
     * @returns {boolean} Is property changed?
     */
    isPropChanged: function(propName) {
        if (!this._changed) {
            return false;
        }

        return this._changed[propName] === true;
    },

    /**
     * Mixin to specific objects.
     * @param {Object} target The object to mix this module.
     * @memberof module:util/dirty
     * @example
     * function Animal() {}
     * dirty.mixin(Animal.prototype);
     */
    mixin: function(target) {
        var methodFilterR = /(^_|mixin|wrap)/;

        common.forEachOwnProperties(dirty, function(o, k) {
            if (!methodFilterR.test(k)) {
                target[k] = dirty[k];
            }
        });
    },

    /**
     * Wrapper method for dirty flagging.
     *
     * This method invoke after invoked specific method that added by you.
     *
     * The method want to add are must exist before add.
     * @param {object} target Target object to method wrap.
     * @param {(string|object)} methodName
     *  Method name to wrap or methodName: flag objects.
     * @param {boolean} [flag=true]
     *  this will used to flagging by dirty flagger after invoke the methods added by you.
     * @memberof module:util/dirty
     * @example
     * function Animal(name) {
     *     this.name = name;
     * }
     * Animal.prototype.growl = jasmine.createSpy('growl');
     * Animal.prototype.test = function() {
     *     return this.name;
     * };
     *
     * dirty.mixin(Animal.prototype);
     * // single
     * dirty.wrap(Animal.prototype, 'growl', true);
     * // multiple
     * dirty.wrap(Animap.prototype, {
     *     growl: true,
     *     test: false
     * });
     *
     */
    wrap: function(target, methodName, flag) {
        var wrap = dirty.wrap,
            fn;

        if (common.isObject(methodName)) {
            common.forEachOwnProperties(methodName, function(_flag, _name) {
                wrap(target, _name, _flag);
            });

            return;
        }

        flag = existy(flag) ? flag : true;

        if (!target._wrapper) {
            /**
             * @param {function} _fn Original method to wrap.
             * @param {boolean} flagToSet The boolean value to using dirty flagging.
             * @returns {*} The result value of original method.
             * @name _wrapper
             * @memberof dirty
             */
            target._wrapper = function(_fn, flagToSet) {
                return function() {
                    var args = Array.prototype.slice.call(arguments);
                    var result = _fn.apply(this, args); // eslint-disable-line
                    this._dirty = flagToSet; // eslint-disable-line

                    return result;
                };
            };
        }

        if (existy(pick(target, methodName)) &&
            isFunc(target[methodName]) &&
            !existy(pick(target, methodName, '_wrapped'))) {
            fn = target[methodName];
            target[methodName] = target._wrapper(fn, flag);
            target[methodName]._wrapped = true;
        }
    }
};

module.exports = dirty;
