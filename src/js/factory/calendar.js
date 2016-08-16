/**
 * @fileoverview Factory module for control all other factory.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var Handlebars = require('handlebars-template-loader/runtime');
var dw = require('../common/dw'),
    datetime = require('../common/datetime'),
    Layout = require('../view/layout'),
    Drag = require('../handler/drag'),
    controllerFactory = require('./controller'),
    weekViewFactory = require('./weekView'),
    monthViewFactory = require('./monthView');

/**
 * @typedef {object} Calendar~CalEvent
 * @property {string} title - 이벤트 제목
 * @property {boolean} isAllDay - 종일일정여부
 * @property {string} starts - 일정 시작 시간
 * @property {string} ends - 일정 종료 시간
 * @property {string} [color] - 일정 텍스트색
 * @property {string} [bgColor] - 일정 배경색
 */

/**
 * Calendar class
 * @constructor
 * @mixes util.CustomEvents
 * @param {object} options - options for calendar
 *  @param {function} [options.groupFunc] - function for group event models {@see Collection#groupBy}
 *  @param {function} [options.controller] - controller instance
 *  @param {string} [options.defaultView='week'] - default view of calendar
 *  @param {string} [options.defaultDate=] - default date to render calendar.
 *   if not supplied, use today.
 *  @param {object} [options.template] - template option
 *   @param {function} [options.template.allday] - allday template function
 *   @param {function} [options.template.time] - time template function
 *  @param {object} [options.week] - options for week view
 *   @param {number} [options.week.startDayOfWeek=0] - start day of week
 *  @param {object} [options.month] - options for month view
 *  @param {Calendar~CalEvent[]} [options.events] - array of CalEvent data for add calendar after initialize.
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
        groupFunc: null,
        controller: null,
        defaultView: 'week',
        defaultDate: datetime.format(new Date(), 'YYYY-MM-DD'),
        template: util.extend({
            allday: null,
            time: null
        }, util.pick(options, 'template') || {}),
        week: util.extend({
            startDayOfWeek: 0
        }, util.pick(options, 'week') || {}),
        month: util.extend({}, util.pick(options, 'month') || {}),
        events: []
    }, options);

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
    this.dragHandler = new Drag({distance: 5}, this.layout.container);

    /**
     * current rendered view name.
     * @type {string}
     */
    this.viewName = opt.defaultView;

    /**
     * Refresh method. it can be ref different functions for each view modes.
     * @type {function}
     */
    this.refreshMethod = null;

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

    this.options = this.renderDate = this.controller =
        this.layout = this.dragHandler = this.viewName =
        this.refreshMethod = null;
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
 * @param {Calendar~Event[]} dataObjectList - array of {@see Calendar~Event} object
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
Calendar.prototype.createEvents = function(dataObjectList, silent) {
    this.controller.createEvents(dataObjectList, silent);

    if (!silent) {
        this.render();
    }
};

/**
 * Get event instance by event id
 * @param {string} id - ID of event instance
 * @returns {CalEvent} event instance
 */
Calendar.prototype.getEvent = function(id) {
    return util.pick(this.controller.events.items, id);
};

/**
 * Update event instance
 * @param {string} id - ID of event instance to update data
 * @param {object} data - object data to update instance
 */
Calendar.prototype.updateEvent = function(id, data) {
    var found;

    this.controller.events.doWhenHas(id, function(model) {
        found = model;
        util.forEach(data, function(value, key) {
            model.set(key, value);
        });
    });

    this.render();
    found.dirty(false);
};

/**
 * Delete event instance
 * @param {string} id - ID of event instance to delete
 */
Calendar.prototype.deleteEvent = function(id) {
    this.controller.events.remove(id);
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
    date = util.isDate(date) ? date : new Date(date);
    day = date.getDay();

    // calculate default render range first.
    start = new Date(
        Number(date) -
        msFrom('day', day) +
        msFrom('day', startDayOfWeek)
    );

    end = new Date(Number(start) + msFrom('day', 6));

    if (day < startDayOfWeek) {
        start = new Date(Number(start) - msFrom('day', 7));
        end = new Date(Number(end) - msFrom('day', 7));
    }

    return [start, end];
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
    this.controller.dateMatrix = {};
    this.controller.events.clear();
    this.render();
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

    this.layout.children.items[viewName].render();
};

/**
 * Move to today.
 */
Calendar.prototype.today = function() {
    this.renderDate = new Date();

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
        date2;

    offset = util.isExisty(offset) ? offset : 0;

    if (viewName === 'month') {
        renderDate.addMonth(offset);

        recursiveSet(view, function(opt) {
            opt.renderMonth = datetime.format(renderDate.d, 'YYYY-MM');
        });

        this.options.render = {
            startDate: new Date(renderDate.d.getFullYear(), renderDate.d.getMonth(), 1),
            endDate: new Date(renderDate.d.getFullYear(), renderDate.d.getMonth() + 1, 0)

    };

    } else if (viewName === 'week') {
        renderDate.addDate(offset * 7);
        date2 = this.getWeekDayRange(renderDate.d);

        recursiveSet(view, function(opt) {
            opt.renderStartDate = datetime.format(date2[0], 'YYYY-MM-DD');
            opt.renderEndDate = datetime.format(date2[1], 'YYYY-MM-DD');
        });

        this.options.render = {
            startDate: date2[0],
            endDate: date2[1]
        };


    } else if (viewName === 'day') {
        renderDate.addDate(offset);
        date2 = renderDate.clone().setHours(23, 59, 59, 0);

        recursiveSet(view, function(opt) {
            opt.renderStartDate = datetime.format(renderDate.d, 'YYYY-MM-DD');
            opt.renderEndDate = datetime.format(date2.d, 'YYYY-MM-DD');
        });

        this.options.render = {
            startDate: renderDate.d,
            endDate: date2.d
        };

    }

    this.renderDate = renderDate.d;
};

/**
 * Move to specific date
 * @param {(Date|string)} date - date to move
 */
Calendar.prototype.setDate = function(date) {
    if (util.isString(date)) {
        date = datetime.parse(date);
    }

    this.renderDate = new Date(Number(date));
    this.move(0)
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
     * @property {DoorayEvent} model - 클릭 이벤트 블록과 관련된 일정 모델 인스턴스
     * @property {MouseEvent} jsEvent - 마우스 이벤트
     */
    this.fire('clickEvent', clickEventData);
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

    util.forEach(handler.dblclick, function(dblclickHandler) {
        dblclickHandler[method]('beforeCreateEvent', self._onBeforeCreate, self);
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

    this.viewName = newViewName;
    this.refreshMethod = created.refresh;

    this.move();
    this.render();
};

util.CustomEvents.mixin(Calendar);

module.exports = Calendar;

