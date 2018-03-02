'use strict';

var TZDate = require('common/timezone').Date;

module.exports = {
    toEqualTZDate: function() {
        return {
            compare: function(actual, expected) {
                var message;
                var pass = actual instanceof TZDate &&
                    expected instanceof TZDate &&
                    actual.getTime() === expected.getTime();

                if (pass) {
                    message = 'Expected ' + actual + 'not to be ' + expected;
                } else {
                    message = 'Expected ' + actual + 'to be ' + expected;
                }

                return {
                    pass: pass,
                    message: message
                };
            }
        };
    }
};
