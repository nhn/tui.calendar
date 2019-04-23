/**
 * @fileoverview Month view
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config'),
    datetime = require('../../common/datetime'),
    domutil = require('../../common/domutil'),
    TZDate = require('../../common/timezone').Date,
    tmpl = require('../template/month/month.hbs'),
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
    var theme = controller ? controller.theme : null;
    var monthOption;

    options = options || {};
    monthOption = options ? options.month : {};

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
            {height: parseInt(controller.theme.month.dayname.height, 10) || 42},
            {autoHeight: true}
        ]
    }, container, theme);

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
        isAlways6Week: true,
        isReadOnly: options.isReadOnly,
        grid: {
            header: {
                height: 34
            },
            footer: {
                height: 3
            }
        }
    }, monthOption);

    this.options.grid.header = util.extend({
        height: 34
    }, util.pick(monthOption, 'grid', 'header'));
    this.options.grid.footer = util.extend({
        height: 3
    }, util.pick(monthOption, 'grid', 'footer'));

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
 * @param {string} renderMonth - month to render YYYY-MM, weeks2/3 to render YYYY-MM-DD
 * @returns {array.<Date[]>} calendar array
 */
Month.prototype._getMonthCalendar = function(renderMonth) {
    var date = new TZDate(renderMonth);
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
            isAlways6Week: this.options.isAlways6Week,
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
 * @param {Theme} theme - theme instance
 */
Month.prototype._renderChildren = function(container, calendar, theme) {
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
    var isReadOnly = opt.isReadOnly;

    container.innerHTML = '';
    this.children.clear();

    util.forEach(calendar, function(weekArr) {
        var start = new TZDate(weekArr[0]),
            end = new TZDate(weekArr[weekArr.length - 1]),
            weekdayViewContainer,
            weekdayView;

        weekdayViewContainer = domutil.appendHTMLElement(
            'div', container, config.classname('month-week-item'));

        weekdayView = new WeekdayInMonth({
            renderMonth: renderMonth,
            heightPercent: heightPercent,
            renderStartDate: start,
            renderEndDate: end,
            narrowWeekend: narrowWeekend,
            startDayOfWeek: startDayOfWeek,
            visibleWeeksCount: visibleWeeksCount,
            visibleScheduleCount: visibleScheduleCount,
            grid: gridOption,
            scheduleHeight: parseInt(theme.month.schedule.height, 10),
            scheduleGutter: parseInt(theme.month.schedule.marginTop, 10),
            isReadOnly: isReadOnly
        }, weekdayViewContainer);

        self.addChild(weekdayView);
    });
};

/**
 * Render month view
 * @override
 */
Month.prototype.render = function() {
    var self = this,
        opt = this.options,
        vLayout = this.vLayout,
        controller = this.controller,
        daynames = opt.daynames,
        workweek = opt.workweek,
        calendar = this._getMonthCalendar(opt.renderMonth),
        scheduleFilter = opt.scheduleFilter,
        theme = controller ? controller.theme : null,
        styles = this._getStyles(theme),
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
                width: grids[index] ? grids[index].width : 0,
                left: grids[index] ? grids[index].left : 0,
                color: this._getDayNameColor(theme, day)
            };
        },
        this
    );

    if (workweek) {
        grids = this.grids = datetime.getGridLeftAndWidth(5, opt.narrowWeekend, opt.startDayOfWeek, workweek);

        daynameViewModel = util.filter(daynameViewModel, function(daynameModel) {
            return !datetime.isWeekend(daynameModel.day);
        });

        util.forEach(daynameViewModel, function(daynameModel, index) {
            daynameModel.width = grids[index] ? grids[index].width : 0;
            daynameModel.left = grids[index] ? grids[index].left : 0;
        });
    }

    baseViewModel = {
        daynames: daynameViewModel,
        styles: styles
    };

    vLayout.panels[0].container.innerHTML = tmpl(baseViewModel);

    this._renderChildren(vLayout.panels[1].container, calendar, theme);

    baseViewModel.panelHeight = vLayout.panels[1].getHeight();

    this.children.each(function(childView) {
        var start = datetime.start(childView.options.renderStartDate);
        var end = datetime.start(childView.options.renderEndDate);
        var eventsInDateRange = controller.findByDateRange(
            datetime.start(start),
            datetime.end(end),
            scheduleFilter
        );
        var dateRange = datetime.range(
            datetime.start(start),
            datetime.end(end),
            datetime.MILLISECONDS_PER_DAY);
        var viewModel = {
            eventsInDateRange: eventsInDateRange,
            range: dateRange.slice(0, grids.length),
            grids: grids,
            panelHeight: baseViewModel.panelHeight,
            theme: theme
        };

        childView.render(viewModel);

        self._invokeAfterRenderSchedule(eventsInDateRange);
    });
};

/**
 * Fire 'afterRenderSchedule' event
 * @param {Array} matrices - schedule matrices from view model
 * @fires Month#afterRenderSchedule
 */
Month.prototype._invokeAfterRenderSchedule = function(matrices) {
    var self = this;
    util.forEachArray(matrices, function(matrix) {
        util.forEachArray(matrix, function(column) {
            util.forEachArray(column, function(scheduleViewModel) {
                if (scheduleViewModel && !scheduleViewModel.hidden) {
                    /**
                     * @event Month#afterRenderSchedule
                     */
                    self.fire('afterRenderSchedule', {schedule: scheduleViewModel.model});
                }
            });
        });
    });
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @returns {object} styles - styles object
 */
Month.prototype._getStyles = function(theme) {
    var styles = {};
    var dayname;

    if (theme) {
        dayname = theme.month.dayname;

        styles.borderTop = dayname.borderTop || theme.common.border;
        styles.borderLeft = dayname.borderLeft || theme.common.border;
        styles.height = dayname.height;
        styles.paddingLeft = dayname.paddingLeft;
        styles.paddingRight = dayname.paddingRight;
        styles.fontSize = dayname.fontSize;
        styles.backgroundColor = dayname.backgroundColor;
        styles.fontWeight = dayname.fontWeight;
        styles.textAlign = dayname.textAlign;
    }

    return styles;
};

/**
 * Get a day name color
 * @param {Theme} theme - theme instance
 * @param {number} day - day number
 * @returns {string} style - color style
 */
Month.prototype._getDayNameColor = function(theme, day) {
    var color = '';

    if (theme) {
        if (day === 0) {
            color = theme.common.holiday.color;
        } else if (day === 6) {
            color = theme.common.saturday.color;
        } else {
            color = theme.common.dayname.color;
        }
    }

    return color;
};

module.exports = Month;
