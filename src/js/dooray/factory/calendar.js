/**
 * @fileoverview Calendar for service.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../../common/datetime');

// FACTORY
var Calendar = require('../../factory/calendar');

// CONTROLLER
var DoorayBase = require('../controller/base');
var Week = require('../../controller/viewMixin/week');

// VIEW
var serviceWeekViewFactory = require('./weekView');

var enums = require('../enums');

/**
 * @typedef {object} ServiceCalendar~Events
 * @property {string} title - 이벤트 제목
 * @property {string} category - 이벤트 타입
 * @property {string} dueDateClass - 업무 일정 분류 (category가 'task'일 때 유효)
 * @property {string} starts - 일정 시작 시간
 * @property {string} ends - 일정 종료 시간
 */

/**
 * Calendar factor module for service (dooray)
 * @constructor
 * @extends {Calendar}
 * @param {object} options - options for calendar
 * @param {function} [options.groupFunc] - function for group event models {@see Collection#groupBy}
 * @param {function} [options.controller] - controller instance
 * @param {string} [options.defaultView='week'] - default view of calendar
 * @param {object} [options.week] - options for week view
 * @param {string} options.week.renderStartDate - YYYY-MM-DD render start date
 * @param {string} options.week.renderEndDate - YYYY-MM-DD render end date
 * @param {ServiceCalendar~Events[]} options.events - 기본 일정 목록
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
        return viewModel.model.category;
    };

    // 컨트롤러 만들기
    options.controller = (function() {
        var controller = new DoorayBase(options),
            originFindByDateRange;

        controller.Week = {};
        util.forEach(Week, function(method, methodName) {
            controller.Week[methodName] = util.bind(method, controller);
        });

        // 마일스톤, 업무 뷰 용 뷰모델 처리기 추가
        originFindByDateRange = controller.Week.findByDateRange;
        controller.Week.findByDateRange = function(starts, ends) {
            var dateRange = util.map(datetime.range(
                    datetime.start(starts),
                    datetime.end(ends),
                    datetime.MILLISECONDS_PER_DAY
                ), function(d) { return datetime.format(d, 'YYYY-MM-DD'); }),
                viewModel = originFindByDateRange(starts, ends);

            util.forEach(viewModel, function(coll, key, obj) {
                var groupedByYMD;

                // 마일스톤, 업무 뷰 뷰모델 가공
                if (key === 'task' || key === 'milestone') {
                    groupedByYMD = coll.groupBy(dateRange, function(viewModel) {
                        return datetime.format(viewModel.model.ends, 'YYYY-MM-DD');
                    });

                    if (key === 'task') {
                        util.forEach(groupedByYMD, function(coll, ymd, obj) {
                            obj[ymd] = coll.groupBy(function(viewModel) {
                                return viewModel.model.dueDateClass;
                            });
                        });
                    }

                    obj[key] = groupedByYMD;
                }
            });

            return viewModel;
        };

        return controller;
    })();

    if (options.events) {
        util.forEach(options.events, function(data) {
            options.controller.createEvent(data);
        });
    }

    Calendar.call(this, options, container);
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

