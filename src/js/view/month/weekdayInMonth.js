/**
 * @fileoverview Monthday in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = require('tui-code-snippet');
var config = require('../../config'),
    common = require('../../common/common.js'),
    datetime = require('../../common/datetime'),
    domutil = require('../../common/domutil'),
    View = require('../../view/view'),
    Weekday = require('../weekday'),
    baseTmpl = require('./weekdayInMonth.hbs'),
    scheduleTmpl = require('./weekdayInMonthSchedule.hbs');
var existy = util.isExisty,
    mfloor = Math.floor,
    mmin = Math.min;

/**
 * @constructor
 * @extends {Weekday}
 * @param {object} options - options for WeekdayInWeek view
 * @param {number} [options.heightPercent] - height percent of view
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to
 *  make create easy.
 * @param {number} [options.scheduleHeight=18] - height of each schedule block.
 * @param {number} [options.scheduleGutter=2] - gutter height of each schedule block.
 * @param {HTMLDIVElement} container - DOM element to use container for this
 *  view.
 */
function WeekdayInMonth(options, container) {
    Weekday.call(this, options, container);
    container.style.height = options.heightPercent + '%';
}

util.inherit(WeekdayInMonth, Weekday);

/**
 * Get schedule container element's bound properly by override
 *
 * View#getViewBound.
 * @override
 */
WeekdayInMonth.prototype.getViewBound = function() {
    var bound = View.prototype.getViewBound.call(this);
    return bound;
};

/**
 * Get limit index of schedule block in current view
 * @returns {number} limit index
 */
WeekdayInMonth.prototype._getRenderLimitIndex = function() {
    var opt = this.options;
    var containerHeight = this.getViewBound().height;
    var gridHeaderHeight = util.pick(opt, 'grid', 'header', 'height') || 0;
    var gridFooterHeight = util.pick(opt, 'grid', 'footer', 'height') || 0;
    var visibleScheduleCount = opt.visibleScheduleCount || 0;
    var count;

    containerHeight -= (gridHeaderHeight + gridFooterHeight);

    count = mfloor(containerHeight / (opt.scheduleHeight + opt.scheduleGutter));

    if (!visibleScheduleCount) {
        visibleScheduleCount = count;
    }

    return mmin(count, visibleScheduleCount); // subtraction for '+n' label block
};

/**
 * @override
 * @param {object} viewModel - schedules view models
 */
WeekdayInMonth.prototype.getBaseViewModel = function(viewModel) {
    var opt = this.options,
        gridHeaderHeight = util.pick(opt, 'grid', 'header', 'height') || 0,
        gridFooterHeight = util.pick(opt, 'grid', 'footer', 'height') || 0,
        renderLimitIdx = this._getRenderLimitIndex(),
        exceedDate = this.getExceedDate(renderLimitIdx, viewModel.eventsInDateRange);
    var baseViewModel;

    viewModel = util.extend({
        exceedDate: exceedDate
    }, viewModel);

    baseViewModel = Weekday.prototype.getBaseViewModel.call(this, viewModel);

    baseViewModel = util.extend({
        matrices: viewModel.eventsInDateRange,
        gridHeaderHeight: gridHeaderHeight,
        gridFooterHeight: gridFooterHeight,
        renderLimitIdx: renderLimitIdx + 1
    }, baseViewModel);

    return baseViewModel;
};

/**
 * @override
 * @param {object} viewModel - schedules view models
 */
WeekdayInMonth.prototype.render = function(viewModel) {
    var container = this.container,
        baseViewModel = this.getBaseViewModel(viewModel),
        scheduleContainer,
        contentStr = '';

    if (!this.options.visibleWeeksCount) {
        setIsOtherMonthFlag(baseViewModel.dates, this.options.renderMonth);
    }

    container.innerHTML = baseTmpl(baseViewModel);

    scheduleContainer = domutil.find(
        config.classname('.weekday-schedules'),
        container
    );

    if (!scheduleContainer) {
        return;
    }

    contentStr += scheduleTmpl(baseViewModel);

    scheduleContainer.innerHTML = contentStr;

    common.setAutoEllipsis(
        config.classname('.weekday-schedule-title'),
        container
    );
};

WeekdayInMonth.prototype._beforeDestroy = function() {
};

/* eslint max-nested-callbacks: 0 */
/**
 * Make exceed date information
 * @param {number} maxCount - exceed schedule count
 * @param {Array} eventsInDateRange  - matrix of ScheduleViewModel
 * @returns {object} exceedDate
 */
WeekdayInMonth.prototype.getExceedDate = function(maxCount, eventsInDateRange) {
    var exceedDate = {};
    util.forEach(eventsInDateRange, function(matrix) {
        util.forEach(matrix, function(column) {
            util.forEach(column, function(viewModel) {
                var period;
                if (!viewModel) {
                    return;
                }

                period = datetime.range(
                    viewModel.getStarts(),
                    viewModel.getEnds(),
                    datetime.MILLISECONDS_PER_DAY
                );

                util.forEach(period, function(date) {
                    var ymd = datetime.format(date, 'YYYYMMDD');
                    if (!existy(exceedDate[ymd])) {
                        exceedDate[ymd] = 0;
                    }

                    exceedDate[ymd] += 1;
                });
            });
        });
    });

    util.forEach(exceedDate, function(value, ymd) {
        if (value > maxCount) {
            exceedDate[ymd] = value - maxCount;
        } else {
            exceedDate[ymd] = 0;
        }
    });

    return exceedDate;
};

/**
 * 현재 달이 아닌 날짜에 대해 isOtherMonth = true 플래그를 추가한다.
 * @param {Array} dates - 날짜정보 배열
 * @param {string} renderMonthStr - 현재 렌더링중인 월 (YYYYMM)
 */
function setIsOtherMonthFlag(dates, renderMonthStr) {
    var renderMonth = Number(renderMonthStr.substring(5));

    util.forEach(dates, function(dateObj) {
        dateObj.isOtherMonth = dateObj.month !== renderMonth;
    });
}

module.exports = WeekdayInMonth;
