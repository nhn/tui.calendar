/**
 * @fileoverview Month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;

var config = require('../../config'),
    datetime = require('../../common/datetime'),
    domutil = require('../../common/domutil'),
    tmpl = require('./month.hbs'),
    View = require('../view'),
    VLayout = require('../..//common/vlayout'),
    WeekdayInMonth = require('./weekdayInMonth');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options
 * @param {function} [options.eventFilter] - event filter
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
            {height: 37},
            {autoHeight: true}
        ]
    }, container);

    /**
     * @type {string}
     */
    this.options = util.extend({
        eventFilter: function(model) {
            return Boolean(model.visible);
        },
        startDayOfWeek: 0,
        renderMonth: '2015-12',
        daynames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    }, options);
}

util.inherit(Month, View);

/**
 * Name of view. for managing subview at layout view
 * @type {string}
 */
Month.prototype.viewName = 'month';

/**
 * Get calendar array by supplied date
 * @param {string} renderMonthStr - month to render YYYY-MM
 * @param {number} [startDayOfWeek=0] - start day of week
 * @returns {array.<Date[]>} calendar array
 */
Month.prototype._getMonthCalendar = function(renderMonthStr, startDayOfWeek) {
    var date = datetime.parse(renderMonthStr + '-01'),
        calendar = datetime.arr2dCalendar(date, startDayOfWeek || 0);

    return calendar;
};

/**
 * Create children view (week) and add children
 * @param {HTMLElement} container - container element to render weeks
 * @param {array.<Date[]>} calendar - calendar array from datetime#arr2dCalendar
 */
Month.prototype._renderChildren = function(container, calendar) {
    var self = this,
        weekCount = calendar.length,
        heightPercent = 100 / weekCount;

    container.innerHTML = '';
    this.children.clear();

    util.forEach(calendar, function(weekArr) {
        var starts = new Date(Number(weekArr[0])),
            ends = new Date(Number(weekArr[weekArr.length - 1])),
            weekdayViewContainer,
            weekdayView;

        weekdayViewContainer = domutil.appendHTMLElement(
            'div', container, config.classname('month-week-item'));

        weekdayView = new WeekdayInMonth({
            heightPercent: heightPercent,
            renderStartDate: datetime.format(starts, 'YYYY-MM-DD'),
            renderEndDate: datetime.format(ends, 'YYYY-MM-DD')
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
        calendar = this._getMonthCalendar(opt.renderMonth),
        eventFilter = opt.eventFilter,
        daynameViewModel,
        baseViewModel;

    daynameViewModel = util.map(
        util.range(opt.startDayOfWeek, 7).concat(util.range(7)).slice(0, 7),
        function(i) {
            return {
                day: i,
                label: daynames[i]
            };
        }
    );

    baseViewModel = {
        daynames: daynameViewModel,
        width: 100 / daynameViewModel.length
    };

    vLayout.panels[0].container.innerHTML = tmpl(baseViewModel);

    this._renderChildren(vLayout.panels[1].container, calendar);

    this.children.each(function(childView) {
        var viewModel = controller.findByDateRange(
            datetime.start(datetime.parse(childView.options.renderStartDate)),
            datetime.end(datetime.parse(childView.options.renderEndDate)),
            eventFilter
        );

        childView.render(viewModel);
    });
};

module.exports = Month;

