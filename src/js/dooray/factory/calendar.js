/**
 * @fileoverview Calendar for service.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config'),
    Calendar = require('../../factory/calendar'),
    controllerFactory = require('../factory/controller'),
    serviceWeekViewFactory = require('./weekView');

/**
 * @typedef {object} ServiceCalendar~DoorayEvent
 * @property {string} [id] - 일정의 uniqueID.
 * @property {string} [calendarID] - 각 일정을 캘린더별로 그룹지을 수 있는 값.
 * @property {string} title - 이벤트 제목
 * @property {string} category - 이벤트 타입
 * @property {string} dueDateClass - 업무 일정 분류 (category가 'task'일 때 유효)
 * @property {string} starts - 일정 시작 시간
 * @property {string} ends - 일정 종료 시간
 * @property {string} [color] - 일정 텍스트색
 * @property {string} [bgColor] - 일정 배경색
 */

/**
 * Calendar factor module for service (dooray)
 * @constructor
 * @extends {Calendar}
 * @param {object} options - options for calendar
 *  @param {string} [options.cssPrefix] - CSS classname prefix
 *  @param {function} [options.groupFunc] - function for group event models {@see Collection#groupBy}
 *  @param {function} [options.controller] - controller instance
 *  @param {string} [options.defaultView='week'] - default view of calendar
 *  @param {object} [options.calendarColor] - {@see ServiceCalendar~DoorayEvent} 의 calendarID별로 스타일을 미리 지정 가능
 *  @param {object} [options.week] - options for week view
 *   @param {number} [options.week.startDayOfWeek=0] - start day of week
 *   @param {string} options.week.renderStartDate - YYYY-MM-DD render start date
 *   @param {string} options.week.renderEndDate - YYYY-MM-DD render end date
 *   @param {string} [options.week.panelHeights] - each panel height
 *  @param {ServiceCalendar~DoorayEvent[]} options.events - 기본 일정 목록
 *  @param {object} [options.month] - options for month view
 *  @param {string} options.month.renderMonth - YYYY-MM render month
 * @param {HTMLDivElement} container = container element for calendar
 */
function ServiceCalendar(options, container) {
    var controller;

    if (!(this instanceof ServiceCalendar)) {
        return new ServiceCalendar(options, container);
    }

    /**
     * 서비스에서 사용되는 모델 구분용 옵션 함수
     * @param {CalEventViewModel} viewModel - DoorayEvent를 래핑한 뷰 모델
     * @returns {string} 구분 키 값
     */
    options.groupFunc = function(viewModel) {
        return viewModel.model.category;
    };

    controller = options.controller = controllerFactory(options);

    // FullCalendar 기본 모듈은 category, dueDateClass 플래그를 모름. 때문에
    // 이곳에서 이벤트 핸들러를 등록해서 일정 생성 전에 isAllDay플래그를 보고
    // category를 수동으로 지정해준다
    controller.on('beforeCreateEvent', function(e) {
        var data = e.data;

        if (!data.category) {
            data.category = data.isAllDay ? 'allday' : 'time';
        }
    });

    /**
     * @type {object}
     */
    this.calendarColor = options.calendarColor || {};

    Calendar.call(this, options, container);
}

util.inherit(ServiceCalendar, Calendar);

/**********
 * CRUD override
 **********/

/**
 * Create events instance and render calendar.
 * @param {ServiceCalendar~DoorayEvent[]} dataObjectList - array of {@see ServiceCalendar~DoorayEvent[]} object
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
ServiceCalendar.prototype.createEvents = function(dataObjectList, silent) {
    var calColor = this.calendarColor;

    util.forEach(dataObjectList, function(obj) {
        var color = calColor[obj.calendarID];

        if (color) {
            obj.color = color.color;
            obj.bgColor = color.bgColor;
        }
    });

    Calendar.prototype.createEvents.call(this, dataObjectList, silent);
};

/**
 * @override
 * @param {string} id - id of event instance from server API
 * @returns {DoorayEvent} founded event instance.
 */
ServiceCalendar.prototype.getEvent = function(id) {
    return this.controller.events.single(function(model) {
        return model.id === id;
    });
};

/**
 * @override
 * @param {string} id - ID of event instance to update data
 * @param {object} data - data object to update event
 */
ServiceCalendar.prototype.updateEvent = function(id, data) {
    var ctrl = this.controller,
        ownEvents = ctrl.events,
        calEvent = ownEvents.single(function(model) {
            return model.id === id;
        });

    if (calEvent) {
        ctrl.updateEvent(calEvent, data);
        this.render();
    }
};

/**
 * Delete DoorayEvent instance
 * @override
 * @fires ServiceCalendar#beforeDeleteEvent
 * @param {string} id - ID of event to delete
 */
ServiceCalendar.prototype.deleteEvent = function(id) {
    var ctrl = this.controller,
        ownEvents = ctrl.events,
        calEvent = ownEvents.single(function(model) {
            return model.id === id;
        });

    if (!calEvent) {
        return;
    }

    /**
     * @event ServiceCalendar#beforeDeleteEvent
     * @type {object}
     * @property {CalEvent} model - model instance to delete
     */
    this.fire('beforeDeleteEvent', {
        model: calEvent
    });

    ctrl.deleteEvent(calEvent);
    this.render();
};

/**********
 * Methods
 **********/

/**
 * 현재 화면의 각 영역에 대한 높이 값을 반환한다.
 * @returns {number[]} splitter와 autoHeight를 제외한 나머지 패널의 높이 배열
 */
ServiceCalendar.prototype.getLayoutData = function() {
    return this.layout.vlayout.getLayoutData();
};

/**
 * 같은 calendarID를 가진 모든 일정에 대해 글자색, 배경색을 재지정하고 뷰를 새로고침한다
 * @param {string} calendarID - calendarID value
 * @param {object} option - color data object
 *  @param {string} option.color - text color of event element
 *  @param {string} option.bgColor - bg color of event element
 *  @param {boolean} [option.render=true] - set false then does not auto render.
 */
ServiceCalendar.prototype.setCalendarColor = function(calendarID, option) {
    var calColor = this.calendarColor,
        ownEvents = this.controller.events,
        ownColor = calColor[calendarID];

    if (!util.isObject(option)) {
        config.throwError('Calendar#changeCalendarColor(): color 는 {color: \'\', bgColor: \'\'} 형태여야 합니다.');
    }

    ownColor = calColor[calendarID] = util.extend({
        color: '#000',
        bgColor: '#a1b56c',
        render: true
    }, option);

    ownEvents.each(function(model) {
        if (model.calendarID !== calendarID) {
            return;
        }

        model.color = ownColor.color;
        model.bgColor = ownColor.bgColor;
    });

    if (!!ownColor.render) {
        this.render();
    }
};

/**
 * Toggle events visibility by calendar ID
 * @param {string} calendarID - calendar id value
 * @param {boolean} toHide - set true to hide events
 * @param {boolean} render - set true then render after change visible property each models
 * @private
 */
ServiceCalendar.prototype._toggleEventsByCalendarID = function(calendarID, toHide, render) {
    var ownEvents = this.controller.events;

    calendarID = util.isArray(calendarID) ? calendarID : [calendarID];

    ownEvents.each(function(model) {
        if (~util.inArray(model.calendarID, calendarID)) {
            model.set('visible', !toHide);
        }
    });

    if (render) {
        this.render();
    }
};

/**
 * Show events visibility by calendar ID
 * @param {string|string[]} calendarID - calendar id value
 * @param {boolean} [render=true] - set false then doesn't render after change model's property.
 */
ServiceCalendar.prototype.showEventsByCalendarID = function(calendarID, render) {
    render = util.isExisty(render) ? render : true;
    this._toggleEventsByCalendarID(calendarID, false, render);
};

/**
 * Hide events visibility by calendar ID
 * @param {string|string[]} calendarID - calendar id value
 * @param {boolean} [render=true] - set false then doesn't render after change model's property.
 */
ServiceCalendar.prototype.hideEventsByCalendarID = function(calendarID, render) {
    render = util.isExisty(render) ? render : true;
    this._toggleEventsByCalendarID(calendarID, true, render);
};

/**
 * 주뷰, 월뷰 간 전환
 * @override
 * @param {string} viewName - 'week', 'month' 중 하나
 * @param {boolean} [force=false] - true 지정시 뷰 전환이 없어도 전환을 위한 동작을 수행한다
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
ServiceCalendar.prototype.toggleView = function(viewName, force, silent) {
    var layout = this.layout,
        controller = this.controller,
        dragHandler = this.dragHandler,
        options = this.options,
        created;

    if (!force && this.currentViewName === viewName) {
        return;
    }
    
    layout.children.doWhenHas(viewName, function(view) {
        this._toggleViewEvent(false, view, this);
    }, this);
    layout.clear();

    if (viewName === 'week') {
        created = serviceWeekViewFactory(controller, layout.container, dragHandler, options);
        layout.addChild(created.view);
        this._refreshMethod = created.refresh;
    } else if (viewName === 'month') {
        //TODO: month view. 
    }

    layout.children.doWhenHas(viewName, function(view) {
        this._toggleViewEvent(true, view, this);
    }, this);

    this.currentViewName = viewName;

    if (!silent) {
        this.render();
    }
};

module.exports = ServiceCalendar;

