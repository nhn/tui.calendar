/**
 * @fileoverview Monthday in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    existy = util.isExisty,
    mfloor = Math.floor,
    mmax = Math.max;

var Handlebars = require('handlebars/runtime');

var config = require('../../config'),
    common = require('../../common/common.js'),
    datetime = require('../../common/datetime'),
    domutil = require('../../common/domutil'),
    View = require('../../view/view'),
    Weekday = require('../weekday'),
    baseTmpl = require('./weekdayInMonth.hbs'),
    scheduleTmpl = require('./weekdayInMonthSchedule.hbs'),
    skipTmpl = require('./weekdayInMonthSkip.hbs');

var EVENT_PADDING_TOP = 14;

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
    var bound = View.prototype.getViewBound.call(this),
        selector = config.classname('.weekday-schedules'),
        height = domutil.getSize(domutil.find(selector, this.container))[1];

    bound.height = height;

    return bound;
};

/**
 * Get limit index of schedule block in current view
 * @returns {number} limit index
 */
WeekdayInMonth.prototype._getRenderLimitIndex = function() {
    var opt = this.options;
    var containerHeight = this.getViewBound().height - EVENT_PADDING_TOP - 5; // 더보기 버튼이 일정과 겹치지 않기 위한 보정값
    var count = mfloor(containerHeight / (opt.scheduleHeight + opt.scheduleGutter));

    return mmax(count - 1, 0); // subtraction for '+n' label block
};

/**
 * Get handlebars custom helper method for limitation schedule block render count
 * features
 *
 * Calculate count on each date. render +n label only when no cumulated
 * count on cache object
 * @param {object} exceedDate - object to be used as a cache
 * @returns {function} custom helper function
 */
WeekdayInMonth.prototype._getSkipHelper = function(exceedDate) {
    return function() {
        var viewModel = this; // eslint-disable-line
        var period = datetime.range(
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
    };
};

/**
 * Get view model for render skipped label
 * @param {object} exceedDate - object has count of each dates exceed schedule block
 *  count.
 * @param {object} baseViewModel - view model of base view
 * @returns {object[]} - view model for skipped label
 */
WeekdayInMonth.prototype._getSkipLabelViewModel = function(exceedDate, baseViewModel) {
    var dateRange = util.map(this.getRenderDateRange(), function(date) {
        return datetime.format(date, 'YYYYMMDD');
    });
    var dates = baseViewModel.dates;

    return util.map(exceedDate, function(skipped, ymd) {
        var index = util.inArray(ymd, dateRange);

        return {
            left: dates[index].left,
            width: dates[index].width,
            skipped: skipped,
            ymd: ymd
        };
    });
};

/**
 * @override
 * @param {object} viewModel - schedules view models
 */
WeekdayInMonth.prototype.render = function(viewModel) {
    var container = this.container,
        baseViewModel = this.getBaseViewModel(),
        renderLimitIdx,
        exceedDate = {},
        scheduleContainer,
        contentStr = '';

    if (!this.options.visibleWeeksCount) {
        setIsOtherMonthFlag(baseViewModel.dates, this.options.renderMonth);
    }
    container.innerHTML = baseTmpl(baseViewModel);

    renderLimitIdx = this._getRenderLimitIndex();

    scheduleContainer = domutil.find(
        config.classname('.weekday-schedules'),
        container
    );

    if (!scheduleContainer) {
        return;
    }

    Handlebars.registerHelper('wdSkipped', this._getSkipHelper(exceedDate));

    contentStr += scheduleTmpl(util.extend({
        matrices: viewModel,
        schedulePaddingTop: EVENT_PADDING_TOP,
        renderLimitIdx: renderLimitIdx
    }, baseViewModel));

    contentStr += skipTmpl(util.extend({
        renderLimitIdx: renderLimitIdx,
        viewModelForSkip: this._getSkipLabelViewModel(exceedDate, baseViewModel)
    }, baseViewModel));

    scheduleContainer.innerHTML = contentStr;

    common.setAutoEllipsis(
        config.classname('.weekday-schedule-title'),
        container
    );
};

WeekdayInMonth.prototype._beforeDestroy = function() {
    Handlebars.unregisterHelper('wdSkipped');
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
