/**
 * @fileoverview Mixin module for models.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util,
    spaceRx = /^\s*|\s*$/g,
    validator,
    model;

function trim(str) {
    return str.replace(spaceRx, '');
}

validator = {
    required: function(instance, fieldName) {
        var target = instance[fieldName];

        return !util.isUndefined(target) && trim(target) !== '';
    }
};

/**
 * @mixin
 */
model = {
    isValid: function() {
        var that = this,
            schema = this.constructor.schema,
            valid = true;

        if (!schema) {
            return true;
        }

        util.forEach(schema, function(fields, validatorName) {
            util.forEach(fields, function(fieldName) {
                if (validator[validatorName](that, fieldName) === false) {
                    valid = false;
                    return false;
                }
            });

            if (valid === false) {
                return false;
            }
        });

        return valid;
    },
    mixin: function(target) {
        util.forEach(model, function(method, name) {
            if (name !== 'mixin') {
                target[name] = method;
            }
        });
    }
};

module.exports = model;
