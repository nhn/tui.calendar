/**
 * @fileoverview Calendar for service.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var Calendar = require('../../factory/calendar');
var serviceWeekViewFactory = require('./weekView');
var calendarAPI = require('../calendarAPI');

/**
 * @constructor
 * @extends {Calendar}
 * @mixed {CalendarAPI}
 */
function ServiceCalendar() {
    Calendar.apply(this, arguments);

    this.api = calendarAPI;
}

util.inherit(ServiceCalendar, Calendar);

/**
 * @override
 */
ServiceCalendar.prototype.toggleView = function(viewName, force) {
    var view = this.view,
        controller = this.controller,
        dragHandler = this.dragHandler,
        options = this.options;

    if (!force && this.currentViewName === viewName) {
        return;
    }

    this.currentViewName = viewName;
    view.clear();

    if (viewName === 'week') {
        view.addChild(function() {
            return serviceWeekViewFactory(controller, view.container, dragHandler, options);
        });
    }
};

module.exports = ServiceCalendar;

