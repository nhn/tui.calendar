/**
 * @fileoverview View of days UI.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var domutil = require('../../common/domutil');
var datetime = require('../../common/datetime');
var TZDate = require('../../common/timezone').Date;
var View = require('../view');

/**
 * @constructor
 * @param {Base.Week} controller The controller mixin part.
 * @param {object} options View options
 * @param {string} [options.renderStartDate] Start date of render.
 *  if not supplied then use -3d from today. YYYY-MM-DD format.
 * @param {string} [options.renderEndDate] End date of render.
 *  if not supplied then use +3d from today. YYYY-MM-DD format.
 * @param {string} [options.cssPrefix] - CSS classname prefix
 * @param {HTMLElement} container The element to use container for this view.
 * @param {object} panels - schedule panels like 'milestone', 'task', 'allday', 'time'
 * @param {string} viewName - 'week', 'day'
 * @extends {View}
 */
function Week(controller, options, container, panels, viewName) {
    var range;

    container = domutil.appendHTMLElement('div', container);

    View.call(this, container);

    domutil.addClass(container, config.classname('week-container'));

    range = this._getRenderDateRange(new TZDate());

    /**
     * @type {object} Options for view.
     */
    this.options = util.extend({
        scheduleFilter: [function(schedule) {
            return Boolean(schedule.isVisible);
        }],
        renderStartDate: datetime.format(range.start, 'YYYY-MM-DD'),
        renderEndDate: datetime.format(range.end, 'YYYY-MM-DD'),
        narrowWeekend: false,
        startDayOfWeek: 0,
        workweek: false,
        showTimezoneCollapseButton: false,
        timezonesCollapsed: false,
        hourStart: 0,
        hourEnd: 24
    }, options);

    /**
     * Week controller mixin.
     * @type {Base.Week}
     */
    this.controller = controller;

    /**
     * Schedule Panels
     * @type {Array.<object>}
     */
    this.panels = panels;

    /**
     * Week view states
     * @type {object}
     */
    this.state = {
        timezonesCollapsed: this.options.timezonesCollapsed
    };

    if (viewName === 'day') {
        _disableDayOptions(this.options);
    }
}

util.inherit(Week, View);

/**********
 * Override props
 **********/

/**
 * Render each child view with schedules in ranges.
 * @fires Week#afterRender
 * @override
 */
Week.prototype.render = function() {
    var self = this,
        options = this.options,
        scheduleFilter = options.scheduleFilter,
        narrowWeekend = options.narrowWeekend,
        startDayOfWeek = options.startDayOfWeek,
        workweek = options.workweek,
        theme = this.controller.theme || {},
        state = this.state;
    var renderStartDate, renderEndDate, schedulesInDateRange, viewModel, grids, range;

    renderStartDate = new TZDate(options.renderStartDate);
    renderEndDate = new TZDate(options.renderEndDate);

    range = datetime.range(
        datetime.start(renderStartDate),
        datetime.end(renderEndDate),
        datetime.MILLISECONDS_PER_DAY
    );

    if (options.workweek && datetime.compare(renderStartDate, renderEndDate)) {
        range = util.filter(range, function(date) {
            return !datetime.isWeekend(date.getDay());
        });

        renderStartDate = range[0];
        renderEndDate = range[range.length - 1];
    }

    schedulesInDateRange = this.controller.findByDateRange(
        datetime.start(renderStartDate),
        datetime.end(renderEndDate),
        this.panels,
        scheduleFilter,
        this.options
    );

    grids = datetime.getGridLeftAndWidth(
        range.length,
        narrowWeekend,
        startDayOfWeek,
        workweek
    );

    viewModel = {
        schedulesInDateRange: schedulesInDateRange,
        renderStartDate: renderStartDate,
        renderEndDate: renderEndDate,
        grids: grids,
        range: range,
        theme: theme,
        state: state
    };

    this.children.each(function(childView) {
        var matrices;
        var viewName = util.pick(childView.options, 'viewName');
        childView.render(viewModel);

        if (viewName) {
            matrices = viewModel.schedulesInDateRange[viewName]; // DayGrid limits schedule count by visibleScheduleCount after rendering it.

            if (util.isArray(matrices)) {
                self._invokeAfterRenderSchedule(matrices);
            } else {
                util.forEach(matrices, function(matricesOfDay) {
                    self._invokeAfterRenderSchedule(matricesOfDay);
                });
            }
        }
    });

    /**
     * @event Week#afterRender
     */
    this.fire('afterRender');
};

/**
 * Fire 'afterRenderSchedule' event
 * @param {Array} matrices - schedule matrices from view model
 * @fires Week#afterRenderSchedule
 */
Week.prototype._invokeAfterRenderSchedule = function(matrices) {
    var self = this;
    util.forEachArray(matrices, function(matrix) {
        util.forEachArray(matrix, function(column) {
            util.forEachArray(column, function(scheduleViewModel) {
                if (scheduleViewModel) {
                    /**
                     * @event Week#afterRenderSchedule
                     */
                    self.fire('afterRenderSchedule', {schedule: scheduleViewModel.model});
                }
            });
        });
    });
};

/**********
 * Prototype props
 **********/

Week.prototype.viewName = 'week';

/**
 * Calculate default render date range from supplied date.
 * @param {Date} baseDate base date.
 * @returns {object} date range.
 */
Week.prototype._getRenderDateRange = function(baseDate) {
    var base = datetime.start(baseDate),
        start = new TZDate(Number(base)),
        end = new TZDate(Number(base));

    start.setDate(start.getDate() - 3);
    end.setDate(end.getDate() + 3);

    return {
        start: start,
        end: end
    };
};

/**
 * disable options for day view
 * @param {WeekOptions} options - week options to disable
 */
function _disableDayOptions(options) {
    options.workweek = false;
}

util.CustomEvents.mixin(Week);

module.exports = Week;
