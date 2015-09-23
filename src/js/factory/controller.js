/**
 * @fileoverview Controller factory module.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var Base = require('../controller/base');
var Week = require('../controller/viewMixin/week');

/**
 * @returns {Base} The controller instance.
 */
module.exports = function() {
    var controller = new Base();

    controller.Week = {};
    util.forEach(Week, function(method, methodName) {
        controller.Week[methodName] = util.bind(method, controller);
    });

    return controller;
};

