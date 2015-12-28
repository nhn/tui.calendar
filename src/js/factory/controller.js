/**
 * @fileoverview Controller factory module.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var Base = require('../controller/base'),
    Week = require('../controller/viewMixin/week'),
    Month = require('../controller/viewMixin/month');

/**
 * @param {object} options - options for base controller
 * @param {function} [options.groupFunc] - function for group each models {@see Collection#groupBy}
 * @returns {Base} The controller instance.
 */
module.exports = function(options) {
    var controller = new Base(options);

    controller.Week = {};
    util.forEach(Week, function(method, methodName) {
        controller.Week[methodName] = util.bind(method, controller);
    });

    controller.Month = {};
    util.forEach(Month, function(method, methodName) {
        controller.Month[methodName] = util.bind(method, controller);
    });

    return controller;
};

