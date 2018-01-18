/**
 * @fileoverview Factory module for control all other factory.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    mmin = Math.min;
var Handlebars = require('handlebars-template-loader/runtime');
var dw = require('../common/dw'),
    datetime = require('../common/datetime'),
    Layout = require('../view/layout'),
    Drag = require('../handler/drag'),
    controllerFactory = require('./controller'),
    weekViewFactory = require('./weekView'),
    monthViewFactory = require('./monthView'),
    TZDate = require('../common/timezone').Date,
    config = require('../config'),
    timezone = require('../common/timezone');

/**
 * @typedef {object} CalEvent
 * @property {string} [id] - 일정의 uniqueID.
 * @property {string} [calendarId] - 각 일정을 캘린더별로 그룹지을 수 있는 값.
 * @property {string} title - 이벤트 제목
 * @property {string} starts - 일정 시작 시간
 * @property {string} ends - 일정 종료 시간
 * @property {boolean} isAllDay - 종일일정여부
 * @property {string} [color] - 일정 텍스트색
 * @property {string} [bgColor] - 일정 배경색
 * @property {string} category - 이벤트 타입
 * @property {string} dueDateClass - 업무 일정 분류 (category가 'task'일 때 유효)
 * @property {string} customStyle - 커스텀 클래스 추가
 * @property {string} [borderColor] - 일정 border색
 */

/**
 * Calendar class
 * @constructor
 * @mixes util.CustomEvents
 * @param {object} options - options for calendar
 *  @param {string} [options.cssPrefix] - CSS classname prefix
 *  @param {function} [options.groupFunc] - function for group event models {@see Collection#groupBy}
 *  @param {function} [options.controller] - controller instance
 *  @param {string} [options.defaultView='week'] - default view of calendar
 *  @param {string} [options.defaultDate=] - default date to render calendar.
 *   if not supplied, use today.
 *  @param {object} [options.calendarColor] - calendarId별로 스타일을 미리 지정 가능 {@see Calendar~CalEvent}
 *  @param {object} [options.template] - template option
 *   @param {function} [options.template.allday] - allday template function
 *   @param {function} [options.template.time] - time template function
 *  @param {object} [options.week] - options for week view
 *   @param {number} [options.week.startDayOfWeek=0] - start day of week
 *   @param {string} [options.week.panelHeights] - each panel height
 *  @param {object} [options.month] - options for month view
 *   @param {function} [options.eventFilter] - event filter for month view
 *  @param {Array.<CalEvent>} [options.events] - array of CalEvent data for add calendar after initialize.
 * @param {HTMLDivElement} container = container element for calendar
 */
function Calendar(options, container) {
    var opt;

    if (!(this instanceof Calendar)) {
        return new Calendar(options, container);
    }

    /**
     * default option from service page
     * @type {object}
     */
    this.options = opt = util.extend({
        calendarColor: {},
        groupFunc: function(viewModel) {
            var model = viewModel.model;

            if (model.category === 'time' && (model.ends - model.starts > datetime.MILLISECONDS_PER_DAY)) {
                return 'allday';
            }
            return model.category;
        },
        controller: null,
        defaultView: 'week',
        taskView: true,
        defaultDate: new TZDate(),
        template: util.extend({
            allday: null,
            time: null
        }, util.pick(options, 'template') || {}),
        week: util.extend({}, util.pick(options, 'week') || {}),
        month: util.extend({}, util.pick(options, 'month') || {}),
        events: []
    }, options);

    this.options.week = util.extend({
        startDayOfWeek: 0
    }, util.pick(this.options, 'week') || {});

    this.options.month = util.extend({
        eventFilter: function(model) {
            return Boolean(model.visible) &&
                (model.category === 'allday' || model.category === 'time');
        }
    }, util.pick(options, 'month') || {});

    /**
     * Calendar color map
     * @type {object}
     */
    this.calendarColor = opt.calendarColor;

    /**
     * @type {HTMLElement}
     */
    this.container = container;

    /**
     * Current rendered date
     * @type {Date}
     */
    this.renderDate = opt.defaultDate;

    /**
     * base controller
     * @type {Base}
     */
    this.controller = opt.controller || this.createController();

    /**
     * layout view (layout manager)
     * @type {Layout}
     */
    this.layout = new Layout(container);

    /**
     * global drag handler
     * @type {Drag}
     */
    this.dragHandler = new Drag({distance: 10}, this.layout.container);

    /**
     * current rendered view name.
     * @type {string}
     */
    this.viewName = opt.defaultView;

    /**
     * previous rendered view name
     * @type {string}
     */
    this.prevViewName = this.viewName;

    /**
     * Refresh method. it can be ref different functions for each view modes.
     * @type {function}
     */
    this.refreshMethod = null;

    /**
     * Scroll to now. It can be called for 'week', 'day' view modes.
     */
    this.scrollToNowMethod = null;

    this.initialize();
}

/**
 * Create controller instance
 * @returns {Base} controller instance
 */
Calendar.prototype.createController = function() {
    return controllerFactory(this.options);
};

/**
 * Create week view instance by dependent module instances
 * @param {Base} controller - controller
 * @param {HTMLElement} container - container element
 * @param {Drag} dragHandler - global drag handler
 * @param {object} options - options for week view
 * @returns {Week} week view instance
 */
Calendar.prototype.createWeekView = function(controller, container, dragHandler, options) {
    return weekViewFactory(
        controller,
        container,
        dragHandler,
        options
    );
};

/**
 * Create week view instance by dependent module instances
 * @param {Base} controller - controller
 * @param {HTMLElement} container - container element
 * @param {Drag} dragHandler - global drag handler
 * @param {object} options - options for week view
 * @returns {Month} month view instance
 */
Calendar.prototype.createMonthView = function(controller, container, dragHandler, options) {
    return monthViewFactory(
        controller,
        container,
        dragHandler,
        options
    );
};

/**
 * Destructor
 */
Calendar.prototype.destroy = function() {
    this.dragHandler.destroy();
    this.controller.off();
    this.layout.clear();
    this.layout.destroy();

    util.forEach(this.options.template, function(func, name) {
        if (func) {
            Handlebars.unregisterHelper(name + '-tmpl');
        }
    });

    this.options = this.renderDate = this.controller =
        this.layout = this.dragHandler = this.viewName = this.prevViewName =
        this.refreshMethod = this.scrollToNowMethod = null;
};

/**
 * Initialize calendar
 */
Calendar.prototype.initialize = function() {
    var controller = this.controller,
        viewName = this.viewName,
        opt = this.options;

    this.layout.controller = controller;

    if (opt.events && opt.events.length) {
        this.createEvents(opt.events, true);
    }

    util.forEach(opt.template, function(func, name) {
        if (func) {
            Handlebars.registerHelper(name + '-tmpl', func);
        }
    });

    this.toggleView(viewName, true);
};

/**********
 * CRUD Methods
 **********/

/**
 * Create events instance and render calendar.
 * @param {Array.<CalEvent>} dataObjectList - array of {@see Calendar~Event} object
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
Calendar.prototype.createEvents = function(dataObjectList, silent) {
    var calColor = this.calendarColor;

    util.forEach(dataObjectList, function(obj) {
        var color = calColor[obj.calendarId];

        if (color) {
            obj.color = color.color;
            obj.bgColor = color.bgColor;
            obj.borderColor = color.borderColor;
        }
    });

    this.controller.createEvents(dataObjectList, silent);

    if (!silent) {
        this.render();
    }
};

/**
 * Get event instance by event id
 * @param {string} id - ID of event instance
 * @param {string} calendarId - calendarId of event instance
 * @returns {CalEvent} event instance
 */
Calendar.prototype.getEvent = function(id, calendarId) {
    return this.controller.events.single(function(model) {
        return model.id === id && model.calendarId === calendarId;
    });
};

/**
 * Update event instance
 * @param {string} id - ID of event instance to update 
 * @param {string} calendarId - calendarId of event instance to update data
 * @param {object} data - object data to update instance
 */
Calendar.prototype.updateEvent = function(id, calendarId, data) {
    var ctrl = this.controller,
        ownEvents = ctrl.events,
        calEvent = ownEvents.single(function(model) {
            return model.id === id && model.calendarId === calendarId;
        });

    if (calEvent) {
        ctrl.updateEvent(calEvent, data);
        this.render();
    }
};

/**
 * Delete event instance
 * @fires Calendar#beforeDeleteEvent
 * @param {string} id - ID of event instance to delete
 * @param {string} calendarId - calendarId of event to delete
 */
Calendar.prototype.deleteEvent = function(id, calendarId) {
    var ctrl = this.controller,
        ownEvents = ctrl.events,
        calEvent = ownEvents.single(function(model) {
            return model.id === id && model.calendarId === calendarId;
        });

    if (!calEvent) {
        return;
    }

    /**
     * @event Calendar#beforeDeleteEvent
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
 * Private Methods
 **********/

/**
 * Set child view's options recursively
 * @param {View} view - parent view
 * @param {function} func - option manipulate function
 * @private
 */
Calendar.prototype.setOptionRecurseively = function(view, func) {
    view.recursive(function(childView) {
        var opt = childView.options;

        if (!opt) {
            return;
        }

        func(opt);
    });
};

/**
 * @param {string|Date} date - date to show in calendar
 * @param {number} [startDayOfWeek=0] - start day of week
 * @returns {array} render range
 * @private
 */
Calendar.prototype.getWeekDayRange = function(date, startDayOfWeek) {
    var day, start, end,
        msFrom = datetime.millisecondsFrom;

    startDayOfWeek = (startDayOfWeek || 0); // eslint-disable-line
    date = util.isDate(date) ? date : new TZDate(date);
    day = date.getDay();

    // calculate default render range first.
    start = new TZDate(
        Number(date) -
        msFrom('day', day) +
        msFrom('day', startDayOfWeek)
    );

    end = new TZDate(Number(start) + msFrom('day', 6));

    if (day < startDayOfWeek) {
        start = new TZDate(Number(start) - msFrom('day', 7));
        end = new TZDate(Number(end) - msFrom('day', 7));
    }

    return [start, end];
};

/**
 * Toggle events visibility by calendar ID
 * @param {string} calendarId - calendar id value
 * @param {boolean} toHide - set true to hide events
 * @param {boolean} render - set true then render after change visible property each models
 * @private
 */
Calendar.prototype._toggleEventsByCalendarID = function(calendarId, toHide, render) {
    var ownEvents = this.controller.events;

    calendarId = util.isArray(calendarId) ? calendarId : [calendarId];

    ownEvents.each(function(model) {
        if (~util.inArray(model.calendarId, calendarId)) {
            model.set('visible', !toHide);
        }
    });

    if (render) {
        this.render();
    }
};

/**********
 * General Methods
 **********/

/**
 * Render calendar.
 */
Calendar.prototype.render = function() {
    this.layout.render();
};

/**
 * Delete all data and clear view.
 */
Calendar.prototype.clear = function() {
    this.controller.clearEvents();
    this.render();
};

/**
 * Scroll to now.
 */
Calendar.prototype.scrollToNow = function() {
    if (this.scrollToNowMethod) {
        this.scrollToNowMethod();
    }
};

/**
 * Refresh calendar layout.
 */
Calendar.prototype.refresh = function() {
    if (this.refreshMethod) {
        this.refreshMethod();
    }

    this.render();
};

/**
 * Refresh child views
 * @param {string} [viewName] - the name of view to render. if not supplied then refresh all.
 */
Calendar.prototype.refreshChildView = function(viewName) {
    if (!viewName) {
        this.render();
        return;
    }

    if (viewName === 'day') {
        viewName = 'week';
    }

    this.layout.children.items[viewName].render();
};

/**
 * Move to today.
 */
Calendar.prototype.today = function() {
    this.renderDate = new TZDate();

    this._setViewName(this.viewName); // see Calendar.move if (viewName === 'day') case using prevViewName 'week'se
    this.move();
    this.render();
};

/**
 * Move the calendar amount of offset value
 * @param {number} offset - offset value.
 * @example
 * // move previous week when "week" view.
 * // move previous month when "month" view.
 * calendar.move(-1);
 */
Calendar.prototype.move = function(offset) {
    var renderDate = dw(this.renderDate),
        viewName = this.viewName,
        view = this.getCurrentView(),
        recursiveSet = this.setOptionRecurseively,
        startDate, endDate, tempDate, startDayOfWeek, visibleWeeksCount, datetimeOptions;

    offset = util.isExisty(offset) ? offset : 0;

    if (viewName === 'month') {
        startDayOfWeek = util.pick(this.options, 'month', 'startDayOfWeek') || 0;
        visibleWeeksCount = mmin(util.pick(this.options, 'month', 'visibleWeeksCount') || 0, 6);

        if (visibleWeeksCount) {
            datetimeOptions = {
                startDayOfWeek: startDayOfWeek,
                isAlways6Week: false,
                visibleWeeksCount: visibleWeeksCount
            };

            renderDate.addDate(offset * 7 * datetimeOptions.visibleWeeksCount);
            tempDate = datetime.arr2dCalendar(this.renderDate, datetimeOptions);

            recursiveSet(view, function(opt) {
                opt.renderMonth = datetime.format(renderDate.d, 'YYYY-MM-DD');
            });
        } else {
            datetimeOptions = {
                startDayOfWeek: startDayOfWeek,
                isAlways6Week: true
            };

            renderDate.addMonth(offset);
            tempDate = datetime.arr2dCalendar(this.renderDate, datetimeOptions);

            recursiveSet(view, function(opt) {
                opt.renderMonth = datetime.format(renderDate.d, 'YYYY-MM');
            });
        }

        startDate = tempDate[0][0];
        endDate = tempDate[tempDate.length - 1][6];
    } else if (viewName === 'week') {
        renderDate.addDate(offset * 7);
        tempDate = this.getWeekDayRange(renderDate.d, util.pick(this.options, 'week', 'startDayOfWeek') || 0);
        startDate = tempDate[0];
        endDate = tempDate[1];

        recursiveSet(view, function(opt) {
            opt.renderStartDate = datetime.format(startDate, 'YYYY-MM-DD');
            opt.renderEndDate = datetime.format(endDate, 'YYYY-MM-DD');
        });
    } else if (viewName === 'day') {
        renderDate.addDate(offset);
        startDate = endDate = renderDate.d;

        recursiveSet(view, function(opt) {
            opt.renderStartDate = datetime.format(startDate, 'YYYY-MM-DD');
            opt.renderEndDate = datetime.format(endDate, 'YYYY-MM-DD');
        });
    }

    this.renderDate = renderDate.d;
    this.renderRange = {
        start: startDate,
        end: endDate
    };
};

/**
 * Move to specific date
 * @param {(Date|string)} date - date to move
 */
Calendar.prototype.setDate = function(date) {
    if (util.isString(date)) {
        date = datetime.parse(date);
    }

    this.renderDate = new TZDate(Number(date));
    this._setViewName(this.viewName); // see Calendar.move if (viewName === 'day') case using prevViewName 'week'se
    this.move(0);
    this.render();
};

/**
 * Move the calendar forward an arvitrary amount of unit
 */
Calendar.prototype.next = function() {
    this.move(1);
    this.render();
};

/**
 * Move the calendar backward an arvitrary amount of unit
 */
Calendar.prototype.prev = function() {
    this.move(-1);
    this.render();
};

/**
 * Return current rendered view.
 * @returns {View} current view instance
 */
Calendar.prototype.getCurrentView = function() {
    var viewName = this.viewName;

    if (viewName === 'day') {
        viewName = 'week';
    }

    return util.pick(this.layout.children.items, viewName);
};

/**
 * 같은 calendarId를 가진 모든 일정에 대해 글자색, 배경색을 재지정하고 뷰를 새로고침한다
 * @param {string} calendarId - calendarId value
 * @param {object} option - color data object
 *  @param {string} option.color - text color of event element
 *  @param {string} option.bgColor - bg color of event element
 *  @param {boolean} [option.render=true] - set false then does not auto render.
 */
Calendar.prototype.setCalendarColor = function(calendarId, option) {
    var calColor = this.calendarColor,
        ownEvents = this.controller.events,
        ownColor = calColor[calendarId];

    if (!util.isObject(option)) {
        config.throwError('Calendar#changeCalendarColor(): color 는 {color: \'\', bgColor: \'\'} 형태여야 합니다.');
    }

    ownColor = calColor[calendarId] = util.extend({
        color: '#000',
        bgColor: '#a1b56c',
        borderColor: '#a1b56c',
        render: true
    }, option);

    ownEvents.each(function(model) {
        if (model.calendarId !== calendarId) {
            return;
        }

        model.color = ownColor.color;
        model.bgColor = ownColor.bgColor;
        model.borderColor = ownColor.borderColor;
    });

    if (ownColor.render) {
        this.render();
    }
};

/**
 * Show events visibility by calendar ID
 * @param {string|string[]} calendarId - calendar id value
 * @param {boolean} [render=true] - set false then doesn't render after change model's property.
 */
Calendar.prototype.showEventsByCalendarID = function(calendarId, render) {
    render = util.isExisty(render) ? render : true;
    this._toggleEventsByCalendarID(calendarId, false, render);
};

/**
 * Hide events visibility by calendar ID
 * @param {string|string[]} calendarId - calendar id value
 * @param {boolean} [render=true] - set false then doesn't render after change model's property.
 */
Calendar.prototype.hideEventsByCalendarID = function(calendarId, render) {
    render = util.isExisty(render) ? render : true;
    this._toggleEventsByCalendarID(calendarId, true, render);
};

/**********
 * Custom Events
 **********/

/**
 * 각 뷰의 클릭 핸들러와 사용자 클릭 이벤트 핸들러를 잇기 위한 브릿지 개념의 이벤트 핸들러
 * @fires Calendar#clickEvent
 * @param {object} clickEventData - 'clickEvent' 핸들러의 이벤트 데이터
 */
Calendar.prototype._onClick = function(clickEventData) {
    /**
     * @events Calendar#clickEvent
     * @type {object}
     * @property {CalEvent} model - 클릭 이벤트 블록과 관련된 일정 모델 인스턴스
     * @property {MouseEvent} jsEvent - 마우스 이벤트
     */
    this.fire('clickEvent', clickEventData);
};

/**
 * dayname 클릭 이벤트 핸들러
 * @fires Calendar#clickDayname
 * @param {object} clickEventData - 'clickDayname' 핸들러의 이벤트 데이터
 */
Calendar.prototype._onClickDayname = function(clickEventData) {
    /**
     * @events Calendar#clickDayname
     * @type {object}
     * @property {string} date - 'YYYY-MM-DD'형식의 날짜
     */
    this.fire('clickDayname', clickEventData);
};

/**
 * @fires {Calendar#beforeCreateEvent}
 * @param {object} createEventData - select event data from allday, time
 */
Calendar.prototype._onBeforeCreate = function(createEventData) {
    /**
     * @events Calendar#beforeCreateEvent
     * @type {object}
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeCreateEvent', createEventData);
};

/**
 * @fires Calendar#beforeUpdateEvent
 * @param {object} updateEventData - update event data
 */
Calendar.prototype._onBeforeUpdate = function(updateEventData) {
    /**
     * @event Calendar#beforeUpdateEvent
     * @type {object}
     * @property {CalEvent} model - model instance to update
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeUpdateEvent', updateEventData);
};

/**
 * @fires Calendar#resizePanel
 * @param {object} resizeEventData - resize event data object
 */
Calendar.prototype._onResizePanel = function(resizeEventData) {
    /**
     * @event Calendar#resizePanel
     * @type {object}
     * @property {number[]} layoutData - layout data after resized
     */
    this.fire('resizePanel', resizeEventData);
};

/**
 * 캘린더 팩토리 클래스와 주뷰, 월뷰의 이벤트 연결을 토글한다
 * @param {boolean} isAttach - true면 이벤트 연결함.
 * @param {Week|Month} view - 주뷰 또는 월뷰
 */
Calendar.prototype._toggleViewEvent = function(isAttach, view) {
    var self = this,
        handler = view.handler,
        isMonthView = view.viewName === 'month',
        method = isAttach ? 'on' : 'off';

    util.forEach(handler.click, function(clickHandler) {
        clickHandler[method]('clickEvent', self._onClick, self);
    });

    util.forEach(handler.dayname, function(clickHandler) {
        clickHandler[method]('clickDayname', self._onClickDayname, self);
    });

    util.forEach(handler.creation, function(creationHandler) {
        creationHandler[method]('beforeCreateEvent', self._onBeforeCreate, self);
    });

    util.forEach(handler.move, function(moveHandler) {
        moveHandler[method]('beforeUpdateEvent', self._onBeforeUpdate, self);
    });

    util.forEach(handler.resize, function(resizeHandler) {
        resizeHandler[method]('beforeUpdateEvent', self._onBeforeUpdate, self);
    });

    if (!isMonthView) {
        view.vLayout[method]('resize', self._onResizePanel, self);
    }
};

/**
 * Toggle current view
 * @param {string} newViewName - new view name to render
 * @param {boolean} force - force render despite of current view and new view are equal
 */
Calendar.prototype.toggleView = function(newViewName, force) {
    var self = this,
        layout = this.layout,
        controller = this.controller,
        dragHandler = this.dragHandler,
        options = this.options,
        viewName = this.viewName,
        created;

    if (!force && viewName === newViewName) {
        return;
    }

    this._setViewName(newViewName);

    //convert day to week
    if (viewName === 'day') {
        viewName = 'week';
    }

    if (newViewName === 'day') {
        newViewName = 'week';
    }
    layout.children.doWhenHas(viewName, function(view) {
        self._toggleViewEvent(false, view);
    });

    layout.clear();

    if (newViewName === 'month') {
        created = this.createMonthView(
            controller,
            layout.container,
            dragHandler,
            options
        );
    } else if (newViewName === 'week' || newViewName === 'day') {
        created = this.createWeekView(
            controller,
            layout.container,
            dragHandler,
            options
        );
    }

    layout.addChild(created.view);

    layout.children.doWhenHas(newViewName, function(view) {
        self._toggleViewEvent(true, view);
    });

    this.refreshMethod = created.refresh;
    this.scrollToNowMethod = created.scrollToNow;

    this.move();
    this.render();
};

/**
 * Toggle task view
 * @param {string} isUse - new view name to render
 */
Calendar.prototype.toggleTaskView = function(isUse) {
    var viewName = this.viewName,
        options = this.options;

    options.taskView = isUse;
    this.toggleView(viewName, true);
};

/**
 * Set current view name
 * @param {string} viewName - new view name to render
 *
 */
Calendar.prototype._setViewName = function(viewName) {
    this.prevViewName = this.viewName;
    this.viewName = viewName;
};

/**
 * Set timezone offset
 * @param {number} offset - offset (min)
 */
Calendar.setTimezoneOffset = function(offset) {
    timezone.setOffset(offset);
};

util.CustomEvents.mixin(Calendar);

module.exports = Calendar;
