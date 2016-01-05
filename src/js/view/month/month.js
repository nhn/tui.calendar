/**
 * @fileoverview Month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util,
    BORDER_BOTTOM = 1;

var config = require('../../config'),
    common = require('../../common/common'),
    datetime = require('../../common/datetime'),
    domutil = require('../../common/domutil'),
    View = require('../view'),
    MonthWeek = require('../monthweek');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options
 * @param {number} [options.startDayOfWeek=0] - start day of week
 * @param {string} [options.renderMonth='2015-12'] - render month
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
     * @type {string}
     */
    this.options = util.extend({
        startDayOfWeek: 0,
        renderMonth: '2015-12'
    }, options);
}

util.inherit(Month, View);

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
 * Create childs view (week) and add childs
 * @param {array.<Date[]>} calendar - calendar array from datetime#arr2dCalendar
 */
Month.prototype._renderChilds = function(calendar) {
    var container = this.container,
        containerHeight = this.getViewBound().height,
        weekCount = calendar.length,
        heightForOneWeek = (containerHeight / weekCount) - BORDER_BOTTOM;

    container.innerHTML = '';
    this.childs.clear();

    util.forEach(calendar, function(weekArr, i) {
        var starts = new Date(+weekArr[0]),
            ends = new Date(+weekArr[weekArr.length - 1]),
            monthWeek;

        monthWeek = new MonthWeek({
            containerHeight: heightForOneWeek + ((i + 1 === weekCount) ? BORDER_BOTTOM : 0),
            _mode: MonthWeek.MONTHWEEK_MODE.MONTH,
            renderStartDate: datetime.format(starts, 'YYYY-MM-DD'),
            renderEndDate: datetime.format(ends, 'YYYY-MM-DD')
        }, domutil.appendHTMLElement('div', container, config.classname('week-in-month')));

        this.addChild(monthWeek);
    }, this);
};

/**
 * Render month view
 * @override
 */
Month.prototype.render = function() {
    var opt = this.options,
        calendar = this._getMonthCalendar(opt.renderMonth),
        viewModel = this.controller.findByDateRange(
            common.firstIn2dArray(calendar),
            common.lastIn2dArray(calendar)
        );

    this._renderChilds(calendar);

    this.childs.each(function(childView) {
        childView.render(viewModel);
    });
};

module.exports = Month;

