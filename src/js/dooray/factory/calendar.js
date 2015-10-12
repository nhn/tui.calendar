/**
 * @fileoverview Calendar for service.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;

// FACTORY
var Calendar = require('../../factory/calendar');

// CONTROLLER
var DoorayBase = require('../controller/base');
var Week = require('../../controller/viewMixin/week');

// VIEW
var serviceWeekViewFactory = require('./weekView');

// API
// var calendarAPI = require('../calendarAPI');
var API = require('../controller/api');

var enums = require('../enums');

/**
 * Calendar factor module for service (dooray)
 * @constructor
 * @extends {Calendar}
 * @mixed {CalendarAPI}
 * @param {object} options - options for calendar
 * @param {function} [options.groupFunc] - function for group event models {@see Collection#groupBy}
 * @param {function} [options.controller] - controller instance
 * @param {string} [options.defaultView='week'] - default view of calendar
 * @param {object} [options.week] - options for week view
 * @param {string} options.week.renderStartDate - YYYY-MM-DD render start date
 * @param {string} options.week.renderEndDate - YYYY-MM-DD render end date
 * @param {object} [options.month] - options for month view
 * @param {string} options.month.renderMonth - YYYY-MM render month
 * @param {HTMLDivElement} container = container element for calendar
 */
function ServiceCalendar(options, container) {
    /**
     * 서비스에서 사용되는 모델 구분용 옵션 함수
     * @param {EventViewModel} viewModel - DoorayEvent를 래핑한 뷰 모델
     * @returns {string} 구분 키 값
     */
    options.groupFunc = function(viewModel) {
        var model = viewModel.model,
            category = model.category,
            isAllDay = model.isAllDay;

        if (category === enums.model.EVENT_CATEGORY.TASK) {
            return category + '-' + viewModel.dueDateClass;
        } else if (category === enums.model.EVENT_CATEGORY.GENERAL) {
            return isAllDay ? 'allday' : 'time';
        }

        return 'milestone';
    };

    options.controller = (function() {
        var controller = new DoorayBase(options);

        controller.Week = {};
        util.forEach(Week, function(method, methodName) {
            controller.Week[methodName] = util.bind(method, controller);
        });

        return controller;
    })();

    Calendar.call(this, options, container);

    this.api = new API({
        beforeRequest: function() {
            console.log('before');
        },
        afterResponse: function() {
            console.log('after');
        }
    });
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

