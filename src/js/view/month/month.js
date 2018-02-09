/**
 * @fileoverview Month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config'),
    datetime = require('../../common/datetime'),
    domutil = require('../../common/domutil'),
    TZDate = require('../../common/timezone').Date,
    tmpl = require('./month.hbs'),
    View = require('../view'),
    VLayout = require('../..//common/vlayout'),
    WeekdayInMonth = require('./weekdayInMonth');
var mmin = Math.min;

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options
 * @param {function} [options.scheduleFilter] - schedule filter
 * @param {number} [options.startDayOfWeek=0] - start day of week
 * @param {string} [options.renderMonth='2015-12'] - render month
 * @param {string[]} [options.daynames] - daynames to use upside of month view
 * @param {HTMLElement} container - container element
 * @param {Base.Month} controller - controller instance
 */
function Month(options, container, controller) {
    View.call(this, container);

    /**
     * @type {Base.Month}
     */
    this.controller = controller;

    /**
     * @type {VLayout}
     */
    this.vLayout = new VLayout({
        panels: [
            {height: 42},
            {autoHeight: true}
        ]
    }, container);

    /**
     * @type {string}
     */
    this.options = util.extend({
        scheduleFilter: function(schedule) {
            return Boolean(schedule.isVisible);
        },
        startDayOfWeek: 0,
        renderMonth: '2018-01',
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        narrowWeekend: false,
        visibleWeeksCount: null,
        grid: {
            header: {
                height: 34
            },
            footer: {
                height: 34
            }
        }
    }, options);

    this.options.grid.header = util.extend({
        height: 34
    }, util.pick(options, 'grid', 'header'));
    this.options.grid.footer = util.extend({
        height: 34
    }, util.pick(options, 'grid', 'footer'));

    /**
     * horizontal grid information
     * @type {Object}
     */
    this.grids = datetime.getGridLeftAndWidth(
        this.options.daynames.length,
        this.options.narrowWeekend,
        this.options.startDayOfWeek);
}

util.inherit(Month, View);

/**
 * Name of view. for managing subview at layout view
 * @type {string}
 */
Month.prototype.viewName = 'month';

/**
 * Get calendar array by supplied date
 * @param {string} renderMonthStr - month to render YYYY-MM, weeks2/3 to render YYYY-MM-DD
 * @returns {array.<Date[]>} calendar array
 */
Month.prototype._getMonthCalendar = function(renderMonthStr) {
    var date = datetime.parse(renderMonthStr) || datetime.parse(renderMonthStr + '-01');
    var startDayOfWeek = this.options.startDayOfWeek || 0;
    var visibleWeeksCount = mmin(this.options.visibleWeeksCount || 0, 6);
    var workweek = this.options.workweek || false;
    var datetimeOptions, calendar;

    if (this.options.visibleWeeksCount) {
        datetimeOptions = {
            startDayOfWeek: startDayOfWeek,
            isAlways6Week: false,
            visibleWeeksCount: visibleWeeksCount,
            workweek: workweek
        };
    } else {
        datetimeOptions = {
            startDayOfWeek: startDayOfWeek,
            isAlways6Week: true,
            workweek: workweek
        };
    }

    calendar = datetime.arr2dCalendar(date, datetimeOptions);

    return calendar;
};

/**
 * Create children view (week) and add children
 * @param {HTMLElement} container - container element to render weeks
 * @param {array.<Date[]>} calendar - calendar array from datetime#arr2dCalendar
 */
Month.prototype._renderChildren = function(container, calendar) {
    var self = this;
    var weekCount = calendar.length;
    var heightPercent = 100 / weekCount;
    var opt = this.options;
    var renderMonth = opt.renderMonth;
    var narrowWeekend = opt.narrowWeekend;
    var startDayOfWeek = opt.startDayOfWeek;
    var visibleWeeksCount = opt.visibleWeeksCount;
    var visibleScheduleCount = opt.visibleScheduleCount;
    var gridOption = opt.grid;

    container.innerHTML = '';
    this.children.clear();

    util.forEach(calendar, function(weekArr) {
        var start = new TZDate(Number(weekArr[0])),
            end = new TZDate(Number(weekArr[weekArr.length - 1])),
            weekdayViewContainer,
            weekdayView;

        weekdayViewContainer = domutil.appendHTMLElement(
            'div', container, config.classname('month-week-item'));

        weekdayView = new WeekdayInMonth({
            renderMonth: renderMonth,
            heightPercent: heightPercent,
            renderStartDate: datetime.format(start, 'YYYY-MM-DD'),
            renderEndDate: datetime.format(end, 'YYYY-MM-DD'),
            narrowWeekend: narrowWeekend,
            startDayOfWeek: startDayOfWeek,
            visibleWeeksCount: visibleWeeksCount,
            visibleScheduleCount: visibleScheduleCount,
            grid: gridOption
        }, weekdayViewContainer);

        self.addChild(weekdayView);
    });
};

/**
 * Render month view
 * @override
 */
Month.prototype.render = function() {
    var opt = this.options,
        vLayout = this.vLayout,
        controller = this.controller,
        daynames = opt.daynames,
        workweek = opt.workweek,
        calendar = this._getMonthCalendar(opt.renderMonth),
        scheduleFilter = opt.scheduleFilter,
        grids,
        daynameViewModel,
        baseViewModel;

    grids = this.grids = datetime.getGridLeftAndWidth(
        opt.daynames.length,
        opt.narrowWeekend,
        opt.startDayOfWeek
    );

    daynameViewModel = util.map(
        util.range(opt.startDayOfWeek, 7).concat(util.range(7)).slice(0, 7),
        function(day, index) {
            return {
                day: day,
                label: daynames[day],
                width: grids[index].width,
                left: grids[index].left
            };
        }
    );

    if (workweek) {
        grids = this.grids = datetime.getGridLeftAndWidth(5, opt.narrowWeekend, opt.startDayOfWeek, workweek);

        daynameViewModel = util.filter(daynameViewModel, function(daynameModel) {
            return !datetime.isWeekend(daynameModel.day);
        });

        util.forEach(daynameViewModel, function(daynameModel, index) {
            daynameModel.width = grids[index].width;
            daynameModel.left = grids[index].left;
        });
    }

    baseViewModel = {
        daynames: daynameViewModel
    };

    vLayout.panels[0].container.innerHTML = tmpl(baseViewModel);

    this._renderChildren(vLayout.panels[1].container, calendar);

    this.children.each(function(childView) {
        var start = datetime.parse(childView.options.renderStartDate);
        var end = datetime.parse(childView.options.renderEndDate);
        var eventsInDateRange = controller.findByDateRange(
            datetime.start(start),
            datetime.end(end),
            scheduleFilter
        );
        var dateRange = datetime.range(start, end, datetime.MILLISECONDS_PER_DAY);
        var viewModel = {
            eventsInDateRange: eventsInDateRange,
            range: dateRange,
            grids: grids
        };

        childView.render(viewModel);
    });
};

module.exports = Month;

