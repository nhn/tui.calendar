/**
 * @fileoverview View of days UI.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var domutil = require('../../common/domutil');
var datetime = require('../../common/datetime');
var TZDate = require('../../common/timezone').Date;
var View = require('../view');

/**
 * FullCalendar 에서는 날짜 정보만 사용(YYYY-MM-DD) 하고,
 * SplitTimeCalendar 에서는 타임존 정보까지 포함된 문자열을 사용하기 때문에 분기처리함.
 * @param {String} dateString - date string
 * @returns {TZDate}
 */
function parseRangeDateString(dateString) {
    if (dateString.length === 10) {
        return datetime.parse(dateString);
    }

    return new TZDate(dateString);
}

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
 * @extends {View}
 */
function Week(controller, options, container, panels) {
    var range;

    container = domutil.appendHTMLElement('div', container);

    View.call(this, container);

    domutil.addClass(container, config.classname('week-container'));

    range = this._getRenderDateRange(new TZDate());

    /**
     * @type {object} Options for view.
     */
    this.options = util.extend({
        scheduleFilter: function(schedule) {
            return Boolean(schedule.isVisible);
        },
        renderStartDate: datetime.format(range.start, 'YYYY-MM-DD'),
        renderEndDate: datetime.format(range.end, 'YYYY-MM-DD'),
        narrowWeekend: false,
        startDayOfWeek: 0,
        workweek: false
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
    var options = this.options,
        scheduleFilter = options.scheduleFilter,
        narrowWeekend = options.narrowWeekend,
        startDayOfWeek = options.startDayOfWeek,
        workweek = options.workweek;
    var renderStartDate, renderEndDate, schedulesInDateRange, viewModel, grids, range;

    renderStartDate = parseRangeDateString(options.renderStartDate);
    renderEndDate = parseRangeDateString(options.renderEndDate);

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
        scheduleFilter
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
        range: range
    };

    this.children.each(function(childView) {
        childView.render(viewModel);
    });

    /**
     * @event Week#afterRender
     */
    this.fire('afterRender');
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

util.CustomEvents.mixin(Week);

module.exports = Week;

