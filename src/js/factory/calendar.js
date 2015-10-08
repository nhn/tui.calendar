/**
 * @fileoverview Factory module for control all other factory.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../common/datetime');
var Layout = require('../view/layout');
var Drag = require('../handler/drag');
var controllerFactory = require('./controller');
var weekViewFactory = require('./weekView');

/**
 * Calendar class
 * @constructor
 * @param {object} options - options for calendar
 * @param {string} [options.defaultView='week'] - default view of calendar
 * @param {object} [options.week] - options for week view
 * @param {string} options.week.renderStartDate - YYYY-MM-DD render start date
 * @param {string} options.week.renderEndDate - YYYY-MM-DD render end date
 * @param {object} [options.month] - options for month view
 * @param {string} options.month.renderMonth - YYYY-MM render month
 * @param {HTMLDivElement} container = container element for calendar
 */
function Calendar(options, container) {
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
    this.controller = controllerFactory();

    /**
     * layout view (layout manager)
     * @type {Layout}
     */
    this.view = new Layout(container);

    /**
     * global drag handler
     * @type {Drag}
     */
    this.dragHandler = new Drag(this.view);

    /**
     * current rendered view name.
     * @type {string}
     */
    this.currentViewName = options.defaultView || 'week';

    /**********
     * SETTING
     **********/
    this.view.controller = this.controller;

    function refresh() {
        this.refreshChildView();
    }

    this.controller.on({
        updateEvent: refresh,
        createdEvent: refresh
    }, this);

    this.toggleView(options.defaultView, true);
}

/**
 * Move next.
 */
Calendar.prototype.next = function() {
    this.move(1);
};

/**
 * Move previous.
 */
Calendar.prototype.prev = function() {
    this.move(-1);
};

/**
 * Move to today.
 */
Calendar.prototype.today = function() {
    var currentView = this.getCurrentView(),
        originOptions = this.originOptions;

    if (currentView.viewName === 'week') {
        originOptions = originOptions.week;
        this.options.week = {
            renderStartDate: originOptions.renderStartDate,
            renderEndDate: originOptions.renderEndDate 
        };
        currentView.recursive(function(view) {
            if (!view.options) {
                return;
            }

            view.options.renderStartDate = originOptions.renderStartDate;
            view.options.renderEndDate = originOptions.renderEndDate;
        });
    }

    this.refreshChildView(currentView.viewName);
};

/**
 * Move calendar by direction
 * @param {number} direction - the number that want to move (+1, -1)
 */
Calendar.prototype.move = function(direction) {
    var currentView = this.getCurrentView(),
        options = this.options,

        dateOffset,
        newStart,
        newEnd;

    if (currentView.viewName === 'week') {
        newStart = datetime.start(datetime.parse(options.week.renderStartDate));
        newEnd = datetime.end(datetime.parse(options.week.renderEndDate));
        dateOffset = datetime.range(newStart, newEnd, datetime.MILLISECONDS_PER_DAY).length * direction;
        newStart = datetime.format(new Date(newStart.setDate(newStart.getDate() + dateOffset)), 'YYYY-MM-DD');
        newEnd = datetime.format(new Date(newEnd.setDate(newEnd.getDate() + dateOffset)), 'YYYY-MM-DD');

        options.week = {
            renderStartDate: newStart,
            renderEndDate: newEnd
        };
        currentView.recursive(function(view) {
            if (!view.options) {
                return;
            }

            view.options.renderStartDate = newStart;
            view.options.renderEndDate = newEnd;
        });
    }

    this.refreshChildView(currentView.viewName);
}

/**
 * Return current rendered view.
 * @returns {View} current view instance
 */
Calendar.prototype.getCurrentView = function() {
    return util.pick(this.view.childs.items, this.currentViewName);
}

/**
 * Toggle current view
 * @param {string} viewName - the name of view.
 * @param {boolean} force - force render despite of current view and new view are equal
 */
Calendar.prototype.toggleView = function(viewName, force) {
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
            return weekViewFactory(controller, view.container, dragHandler, options);
        });
    }
}

/**
 * Destroy calendar instance.
 */
Calendar.prototype.destory = function() {
    this.dragHandler.destroy();
    this.controller.off();
    this.view.clear();

    this.options = this.baseDate = this.controller =
        this.view = this.dragHandler = null;
}

/**
 * Refresh child views
 * @param {string} [viewName] - the name of view to render. if not supplied then refresh all.
 */
Calendar.prototype.refreshChildView = function(viewName) {
    if (!viewName) {
        this.view.render();
        return;
    }

    this.view.childs.items[viewName].render();
};

/**
 * Create default option
 * @param {object} options - option from service page
 * @returns {object} default option. 
 */
Calendar.prototype.setOptions = function(options) {
    var today = this.baseDate,
        dateRange;

    options = util.extend({
        defaultView: 'week',    // 기본 주간 뷰 설정
        week: null,
        month: null 
    }, options);

    if (!options.week) {
        dateRange = datetime.range(
            datetime.start(new Date(new Date(today).setDate(today.getDate() - 3))),
            datetime.end(new Date(new Date(today).setDate(today.getDate() + 3))),
            datetime.MILLISECONDS_PER_DAY
        );

        options.week = {
            renderStartDate: datetime.format(dateRange[0], 'YYYY-MM-DD'),
            renderEndDate: datetime.format(dateRange[6], 'YYYY-MM-DD')
        };
    }

    if (!options.month) {
        options.month = {
            renderMonth: datetime.format(today, 'YYYY-MM')
        };
    }

    return options;
};

module.exports = Calendar;

