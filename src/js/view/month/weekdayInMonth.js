/**
 * @fileoverview Monthday in month view
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config'),
    common = require('../../common/common.js'),
    domutil = require('../../common/domutil'),
    View = require('../../view/view'),
    Weekday = require('../weekday'),
    baseTmpl = require('../template/month/weekdayInMonth.hbs'),
    scheduleTmpl = require('../template/month/weekdayInMonthSchedule.hbs');
var mfloor = Math.floor,
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
 * @param {number} panelHeight - panel's height for pre-calculation
 * @returns {number} limit index
 */
WeekdayInMonth.prototype._getRenderLimitIndex = function(panelHeight) {
    var opt = this.options;
    var containerHeight = panelHeight || this.getViewBound().height;
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
        renderLimitIdx = this._getRenderLimitIndex() + 1,
        exceedDate = this.getExceedDate(renderLimitIdx, viewModel.eventsInDateRange, viewModel.range),
        styles = this._getStyles(viewModel.theme);
    var baseViewModel;

    viewModel = util.extend({
        exceedDate: exceedDate
    }, viewModel);

    baseViewModel = Weekday.prototype.getBaseViewModel.call(this, viewModel);

    baseViewModel = util.extend({
        matrices: viewModel.eventsInDateRange,
        gridHeaderHeight: gridHeaderHeight,
        gridFooterHeight: gridFooterHeight,
        renderLimitIdx: renderLimitIdx,
        isReadOnly: opt.isReadOnly,
        styles: styles
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
        scheduleContainer;

    if (!this.options.visibleWeeksCount) {
        setIsOtherMonthFlag(baseViewModel.dates, this.options.renderMonth, viewModel.theme);
    }

    container.innerHTML = baseTmpl(baseViewModel);

    scheduleContainer = domutil.find(
        config.classname('.weekday-schedules'),
        container
    );

    if (!scheduleContainer) {
        return;
    }

    scheduleContainer.innerHTML = scheduleTmpl(baseViewModel);

    common.setAutoEllipsis(
        config.classname('.weekday-schedule-title'),
        container,
        true
    );
};

WeekdayInMonth.prototype._beforeDestroy = function() {
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @returns {object} styles - styles object
 */
WeekdayInMonth.prototype._getStyles = function(theme) {
    var styles = {};

    if (theme) {
        styles.borderTop = theme.common.border;
        styles.borderLeft = theme.common.border;
        styles.fontSize = theme.month.day.fontSize;
        styles.borderRadius = theme.month.schedule.borderRadius;
        styles.marginLeft = theme.month.schedule.marginLeft;
        styles.marginRight = theme.month.schedule.marginRight;
        styles.scheduleBulletTop = this.options.scheduleHeight / 3;
    }

    return styles;
};

/**
 * 현재 달이 아닌 날짜에 대해 isOtherMonth = true 플래그를 추가한다.
 * @param {Array} dates - 날짜정보 배열
 * @param {TZDate} renderMonth - 현재 렌더링중인 월 (YYYYMM)
 * @param {Theme} theme - theme instance
 */
function setIsOtherMonthFlag(dates, renderMonth, theme) {
    var month = renderMonth.getMonth() + 1;

    util.forEach(dates, function(dateObj) {
        var isOtherMonth = dateObj.month !== month;
        dateObj.isOtherMonth = isOtherMonth;

        if (isOtherMonth) {
            dateObj.color = Weekday.prototype._getDayNameColor(theme, dateObj.day, dateObj.isToday, isOtherMonth);
        }
    });
}

module.exports = WeekdayInMonth;
