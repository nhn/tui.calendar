/**
 * @fileoverview Controller factory module.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var Base = require('../controller/base'),
    Core = require('../controller/viewMixin/core'),
    Week = require('../controller/viewMixin/week'),
    Month = require('../controller/viewMixin/month');

/**
 * Mixin object. create object property to target and mix to that
 * @param {object} from - source object
 * @param {object} to - target object
 * @param {string} propertyName - property name
 */
function mixin(from, to, propertyName) {
    var obj = to[propertyName] = {};

    util.forEach(from, function(method, methodName) {
        obj[methodName] = method.bind(to);
    });
}

/**
 * @param {object} options - options for base controller
 * @param {function} [options.groupFunc] - function for group each models {@see Collection#groupBy}
 * @returns {Base} The controller instance.
 */
module.exports = function(options) {
    var controller = new Base(options);

    mixin(Core, controller, 'Core');
    mixin(Week, controller, 'Week');
    mixin(Month, controller, 'Month');

    // for Theme
    controller.Core.theme = controller.theme;
    controller.Week.theme = controller.theme;
    controller.Month.theme = controller.theme;

    return controller;
};
