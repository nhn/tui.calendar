/**
 * @fileoverview Factory module for control all other factory.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../config');
var common = require('../common/common');
var datetime = require('../common/datetime');
var Layout = require('../view/layout');
var Drag = require('../handler/drag');
var controllerFactory = require('./controller');
var weekViewFactory = require('./weekView');
var Handlebars = require('hbsfy/runtime');

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
 *  @param {object} [options.template] - template option
 *   @param {function} [options.template.allday] - allday template function
 *   @param {function} [options.template.time] - time template function
 *  @param {object} [options.week] - options for week view
 *   @param {number} [options.week.startDayOfWeek=0] - start day of week
 *   @param {string} options.week.renderStartDate - YYYY-MM-DD render start date
 *   @param {string} options.week.renderEndDate - YYYY-MM-DD render end date
 *  @param {object} [options.month] - options for month view
 *   @param {string} options.month.renderMonth - YYYY-MM render month
 *  @param {Calendar~CalEvent[]} [options.events] - array of CalEvent data for add calendar after initialize.
 * @param {HTMLDivElement} container = container element for calendar
 */
function Calendar(options, container) {
    if (!(this instanceof Calendar)) {
        return new Calendar(options, container);
    }

    /**
     * base date of view (today() will use this property)
     * @type {Date}
     */
    this.baseDate = datetime.start(new Date());

    /**
     * default option from service page
     * @type {object}
     */
    this.options = this.setOptions(options);

    /**
     * original options for reference when ui reset
     * @type {object}
     */
    this.originOptions = JSON.parse(JSON.stringify(this.options));

    /**
     * base controller
     * @type {Base}
     */
    this.controller = options.controller || controllerFactory(options);

    /**
     * layout view (layout manager)
     * @type {Layout}
     */
    this.layout = new Layout(container);

    /**
     * global drag handler
     * @type {Drag}
     */
    this.dragHandler = new Drag({
        distance: 5
    }, this.layout);


    /**
     * current rendered view name.
     * @type {string}
     */
    this.currentViewName = options.defaultView || 'week';

    /**********
     * SETTING
     **********/
    this.layout.controller = this.controller;

    function refresh() {
        this.refreshChildView();
    }

    this.controller.on({
        updateEvent: refresh,
        createdEvent: refresh
    }, this);

    if (options.events && options.events.length) {
        this.createEvent(options.events, true);
    }

    /**
     * @type {Date}
     */
    this._currentStartDate = null;

    /**
     * @type {Date}
     */
    this._currentEndDate = null;

    /**
     * @type {function}
     */
    this._refreshMethod = null;

    this.initializeView();
}

/**********
 * CRUD Methods
 **********/

/**
 * Create events instance and render calendar.
 * @param {Calendar~Event[]} dataObjectList - array of {@see Calendar~Event} object
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
Calendar.prototype.createEvent = function(dataObjectList, silent) {
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
Calendar.prototype._setOptionRecurseively = function(view, func) {
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
 * @return {array} render range
 * @private
 */
Calendar.prototype._getWeekRenderRange = function(date, startDayOfWeek) {
    var day, start, end;

    date = util.isDate(date) ? date : new Date(date);
    startDayOfWeek = (startDayOfWeek || 0);
    day = date.getDay();

    function mil(d) {
        return datetime.MILLISECONDS_PER_DAY * d;
    }

    // calculate default render range first.
    start = new Date(+date - mil(day) + mil(startDayOfWeek));
    end = new Date(+start + mil(6));

    if (day < startDayOfWeek) {
        start = new Date(+start - mil(7));
        end = new Date(+end - mil(7));
    }

    return [start, end];
};

/**********
 * General Methods
 **********/

/**
 * Delete all data and clear view.
 */
Calendar.prototype.clear = function() {
    this.controller.dateMatrix = {};
    this.controller.events.clear();
    this.render();
};

/**
 * Render calendar.
 */
Calendar.prototype.render = function() {
    this.layout.render();
};

/**
 * Refresh calendar layout.
 */
Calendar.prototype.refresh = function() {
    if (this._refreshMethod) {
        this._refreshMethod();
    }
};

/**
 * Initialize current view.
 */
Calendar.prototype.initializeView = function() {
    var currentViewName = this.currentViewName,
        options;

    this.toggleView(currentViewName, true, true);

    if (this.currentViewName === 'week') {
        options = this.options.week;
        this.setDate(options.renderStartDate, options.renderEndDate);
    } else {
        //TODO: month view.
    }
};

/**
 * Set calendar's render date range and refresh view
 * @param {string|Date} start - start date of render
 * @param {string|Date} end - end date of render
 */
Calendar.prototype.setDate = function(start, end) {
    var ymd = 'YYYY-MM-DD';
    start = util.isDate(start) ? start : new Date(start);

    if (this.currentViewName === 'week') {
        if (!end) {
            config.throwError('Calendar#setDate() Need 2 parameter (start, end) in "week" view.');
            return;
        }
        end = util.isDate(end) ? end : new Date(end);

        this._currentStartDate = new Date(+start);
        this._currentEndDate = new Date(+end);

        start = datetime.format(start, ymd);
        end = datetime.format(end, ymd);

        this._setOptionRecurseively(this.getCurrentView(), function(viewOption) {
            viewOption.renderStartDate = start;
            viewOption.renderEndDate = end;
        });
    } else {
        //TODO: month view.
    }

    this.refreshChildView(this.currentViewName);
};

/**
 * Move current render range to range that include supplied date
 * @param {string|Date} date - date to show
 */
Calendar.prototype.showDate = function(date) {
    var options = this.options;

    date = util.isDate(date) ? date : new Date(date);

    if (this.currentViewName === 'week') {
        this.setDate.apply(this, this._getWeekRenderRange(date, options.startDayOfWeek));
    } else {
        //TODO: month view.
    }
};

/**
 * Move to today.
 */
Calendar.prototype.today = function() {
    this.showDate(new Date());
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
    var start = this._currentStartDate,
        end = this._currentEndDate,
        diff;

    if (this.currentViewName === 'week') {
        diff = ((end - start) + datetime.MILLISECONDS_PER_DAY) * (offset || 0);

        start = new Date(+start + diff);
        end = new Date(+end + diff);

        this.setDate(start, end);
    } else {
        //TODO: month view.
    }
};

/**
 * Move the calendar forward an arvitrary amount of unit
 */
Calendar.prototype.next = function() {
    this.move(1);
};

/**
 * Move the calendar backward an arvitrary amount of unit
 */
Calendar.prototype.prev = function() {
    this.move(-1);
};

/**
 * Return current rendered view.
 * @returns {View} current view instance
 */
Calendar.prototype.getCurrentView = function() {
    return util.pick(this.layout.childs.items, this.currentViewName);
}

/**
 * Toggle current view
 * @param {string} viewName - the name of view.
 * @param {boolean} force - force render despite of current view and new view are equal
 */
Calendar.prototype.toggleView = function(viewName, force) {
    var layout = this.layout,
        controller = this.controller,
        dragHandler = this.dragHandler,
        options = this.options;

    if (!force && this.currentViewName === viewName) {
        return;
    }

    this.currentViewName = viewName;
    layout.clear();

    if (viewName === 'week') {
        layout.addChild(weekViewFactory(controller, layout.container, dragHandler, options));
    }
}

/**
 * Destroy calendar instance.
 */
Calendar.prototype.destroy = function() {
    this.dragHandler.destroy();
    this.controller.off();
    this.layout.clear();
    this.layout.destroy();

    this.options = this.baseDate = this.controller =
        this.layout = this.dragHandler = null;
}

/**
 * Refresh child views
 * @param {string} [viewName] - the name of view to render. if not supplied then refresh all.
 */
Calendar.prototype.refreshChildView = function(viewName) {
    if (!viewName) {
        this.render();
        return;
    }

    this.layout.childs.items[viewName].render();
};

Calendar.prototype.tmplKeys = ['time', 'allday'];

/**
 * Create default option
 * @param {object} options - option from service page
 * @returns {object} default option. 
 */
Calendar.prototype.setOptions = function(options) {
    var today = this.baseDate,
        ymd = 'YYYY-MM-DD',
        renderRange,
        weekOpt,
        tmplOpt;

    options = util.extend({
        defaultView: 'week',    // 기본 주간 뷰 설정
        week: null,
        month: null 
    }, options);

    weekOpt = options.week = util.extend({
        startDayOfWeek: 0
    }, options.week);

    if (!weekOpt.renderStartDate || !weekOpt.renderEndDate) {
        renderRange = this._getWeekRenderRange(new Date(), weekOpt.startDayOfWeek);
        weekOpt.renderStartDate = datetime.format(renderRange[0], ymd);
        weekOpt.renderEndDate = datetime.format(renderRange[1], ymd);
    }

    if (!options.month) {
        options.month = {
            renderMonth: datetime.format(today, 'YYYY-MM')
        };
    }

    // template
    function defaultTmpl(model) {
        return common.stripTags(model.title);
    }

    tmplOpt = options.template = util.extend({
        allday: defaultTmpl,
        time: defaultTmpl
    }, options.template);

    util.forEach(this.tmplKeys, function(name) {
        var func = tmplOpt[name] || defaultTmpl;
        Handlebars.registerHelper(name + '-tmpl', func);
    });

    return options;
};

util.CustomEvents.mixin(Calendar);

module.exports = Calendar;

