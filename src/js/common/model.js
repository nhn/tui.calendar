/**
 * @fileoverview Mixin module for models.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var TZDate = require('../common/timezone').Date;
var util = require('tui-code-snippet');
var spaceRx = /^\s*|\s*$/g,
    model;

var datetime = require('../common/datetime');

/**
 * Mixin module for models.
 * @mixin
 */
model = {
    /**
     * string trim
     * @param {string} str string to trim
     * @returns {string} trimed string
     */
    trim: function(str) {
        return str.replace(spaceRx, '');
    },
    /**
     * The collections of validator functions.
     */
    validators: {
        /**
         * check all of supplied fields(property) is not undefined or empty string.
         * @param {object} instance model instance.
         * @param {string[]} fields property names to check.
         * @returns {boolean} return true when supplied fields are not undefined or empty string.
         */
        required: function(instance, fields) {
            var valid = true,
                isValid = function(obj) {
                    return !util.isUndefined(obj) && model.trim(obj) !== '';
                };

            util.forEach(fields, function(fieldName) {
                valid = isValid(instance[fieldName]);

                return valid;
            });

            return valid;
        },

        /**
         * check supplied fields are valid dates and valid date ranges.
         * @param {object} instance model instance.
         * @param {Date[]} fields array of date range (start, end)
         * @returns {boolean} is valid date range?
         */
        dateRange: function(instance, fields) {
            var start, end;

            if (!util.isExisty(instance) || fields.length !== 2) {
                return true;
            }

            start = new TZDate(instance[fields[0]]);
            end = new TZDate(instance[fields[1]]);

            if (!datetime.isValid(start) || !datetime.isValid(end)) {
                return false;
            }

            if (datetime.compare(start, end) === 1) {
                return false;
            }

            return true;
        }
    },

    /**
     * Check validate for model instance.
     *
     * The validate are works on a basis of constructor's "schema" property.
     *
     * You can customize validators add some method to model#validators.
     * @returns {Boolean} model is valid?
     */
    isValid: function() {
        var self = this,
            schema = this.constructor.schema,
            validators = model.validators,
            validator,
            valid = true;

        if (!schema) {
            return true;
        }

        util.forEach(schema, function(values, validatorName) {
            validator = validators[validatorName];

            if (validator) {
                valid = validator(self, values);

                return valid; // returning false can stop this loop
            }

            return true;
        });

        return valid;
    },

    /**
     * Make data object form instance.
     *
     * It return object fill with all owned properties but exclude functions.
     * @returns {object} Data object
     */
    parameterize: function() {
        var param = {},
            isFunc = util.isFunction;

        util.forEach(this, function(value, propName) {
            if (!isFunc(value)) {
                param[propName] = value;
            }
        });

        return param;
    },

    /**
     * Mixin model module to supplied target.
     * @param {Object} target The object of want to mixed.
     * @example
     * function Man() {
     *     this.name = 'john';
     * }
     * model.mixin(Man.prototype);
     */
    mixin: function(target) {
        util.forEach(model, function(method, name) {
            if (name !== 'mixin') {
                target[name] = method;
            }
        });
    }
};

module.exports = model;
