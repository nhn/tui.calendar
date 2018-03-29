/**
 * @fileoverview Weekday view for week
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var Weekday = require('../weekday'),
    tmpl = require('./weekdayInWeek.hbs'),
    datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var config = require('../../config');
var mmax = Math.max,
    mmin = Math.min;

/**
 * @constructor
 * @extends {Weekday}
 * @param {object} options - options for WeekdayInWeek view
 * @param {number} [options.containerHeight=40] - minimum height of schedule
 *  container element.
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to
 *  make create easy.
 * @param {number} [options.scheduleHeight=18] - height of each schedule block.
 * @param {number} [options.scheduleGutter=2] - gutter height of each schedule block.
 * @param {HTMLDIVElement} container - DOM element to use container for this
 *  view.
 * @param {object} [aboutMe] - parent container info
 * @param {string} [aboutMe.name] - panel name ['Milestone'|'Task'|'AllDay'|'TimeGrid']
 * @param {boolean} [aboutMe.forcedLayout] - force layout height by dragging
 */
function WeekdayInWeek(options, container, aboutMe) {
    Weekday.call(this, options, container);
    this.aboutMe = aboutMe || {};
}

util.inherit(WeekdayInWeek, Weekday);

/**
 * Render Weekday view
 * @override
 */
WeekdayInWeek.prototype.render = function(viewModel) {
    var opt = this.options,
        container = this.container,
        aboutMe = this.aboutMe,
        name = aboutMe.name;
    var baseViewModel;

    this.viewType = opt[name + 'ViewType'] || '';

    baseViewModel = this.getBaseViewModel(viewModel);

    if (this.viewType === 'toggle') {
        baseViewModel.viewType = this.viewType;
        baseViewModel.collapsed = this.collapsed ? 'collapsed' : '';
        baseViewModel.collapseBtnIndex = aboutMe.collapseBtnIndex;
    }

    container.innerHTML = tmpl(baseViewModel);

    util.forEach(domutil.find(config.classname('.weekday-exceed-in-week'), container, true), function(el) {
        el.style.marginLeft = -(el.offsetWidth + 6) + 'px';
    });

    util.forEach(domutil.find(config.classname('.weekday-collapse-btn'), container, true), function(el) {
        el.style.marginLeft = -(el.offsetWidth + 6) + 'px';
    });

    this.fire('afterRender', baseViewModel);
};

/**
 * returns maximum schedule count in day
 * @param {array} matrices - The matrices for schedule placing.
 * @returns {number} maximum schedule count in day
 */
WeekdayInWeek.prototype._getMaxScheduleInDay = function(matrices) {
    return mmax.apply(
        null,
        util.map(matrices, function(matrix) {
            return Math.max.apply(null, util.map(matrix, function(row) {
                return row.length;
            }));
        })
    );
};

/**
 * returns minimum height for container.
 * @param {number} maxScheduleInDay - max schedule blocks in one day
 * @returns {number}
 */
WeekdayInWeek.prototype._getMinHeight = function(maxScheduleInDay) {
    var opt = this.options;
    var contentHeight = (maxScheduleInDay * opt.scheduleHeight)
    + ((maxScheduleInDay - 1) * opt.scheduleGutter);

    if (this.collapsed && this.aboutMe.maxHeight >= contentHeight + opt.containerBottomGutter) {
        contentHeight += opt.containerBottomGutter;
    }

    return contentHeight;
};

/**
 * make and update data of exceed date
 * @param {object} exceedDate - data to have exceed date in a week
 * @param {TZDate} renderStarts - start date of a week
 * @param {TZDate} renderEnds - end date of a week
 */
WeekdayInWeek.prototype._updateExceedDate = function(exceedDate, renderStarts, renderEnds) {
    var date = datetime.clone(renderStarts);
    var day;

    for (; date <= renderEnds; date.setDate(date.getDate() + 1)) {
        day = datetime.format(date, 'YYYYMMDD');
        if (!exceedDate[day]) {
            exceedDate[day] = 1;
        } else {
            exceedDate[day] += 1;
        }
    }
};

/**
 * Exclude overflow schedules from matrices
 * @param {array} matrices - The matrices for schedule placing.
 * @param {number} visibleScheduleCount - maximum visible count on panel
 * @param {number} maxScheduleInDay - maximum number of schedules in day
 * @returns {array} - The matrices for schedule placing except overflowed schedules.
 */
WeekdayInWeek.prototype._excludeExceedSchedules = function(matrices, visibleScheduleCount, maxScheduleInDay) {
    if (visibleScheduleCount >= maxScheduleInDay) {
        return matrices;
    }

    return matrices.map(function(matrix) {
        return matrix.map(function(row) {
            if (row.length > visibleScheduleCount) {
                return row.filter(function(item) {
                    return item.top < visibleScheduleCount;
                }, this);
            }

            return row;
        }, this);
    }, this);
};

/**
 * @override
 * @param {object} viewModel - schedules view models
 */
WeekdayInWeek.prototype.getBaseViewModel = function(viewModel) {
    var opt = this.options;
    var matrices = opt.getViewModelFunc(viewModel);
    var maxScheduleInDay = this._getMaxScheduleInDay(matrices);
    var visibleScheduleCount = this.aboutMe.visibleScheduleCount;
    var aboutMe = this.aboutMe;
    var exceedDate = {};
    var baseViewModel, panelHeight;

    if (this.viewType === 'toggle') {
        panelHeight = aboutMe.forcedLayout ? this.getViewBound().height : mmin(aboutMe.height, aboutMe.maxHeight);
        visibleScheduleCount = Math.floor(panelHeight / (opt.scheduleHeight + opt.scheduleGutter));
        if (this.collapsed) {
            visibleScheduleCount = mmin(visibleScheduleCount, mmin(maxScheduleInDay, aboutMe.maxExpandCount));
            exceedDate =
                this.getExceedDate(visibleScheduleCount,
                    viewModel.schedulesInDateRange[aboutMe.name],
                    viewModel.range,
                    maxScheduleInDay
                );
            matrices = this._excludeExceedSchedules(matrices, visibleScheduleCount, maxScheduleInDay);
            aboutMe.visibleScheduleCount = visibleScheduleCount;
        } else {
            visibleScheduleCount = mmax(visibleScheduleCount, mmin(maxScheduleInDay, aboutMe.maxExpandCount));
        }
    }

    viewModel = util.extend({
        exceedDate: exceedDate || {}
    }, viewModel);

    baseViewModel = Weekday.prototype.getBaseViewModel.call(this, viewModel);

    baseViewModel = util.extend({
        minHeight: this._getMinHeight(maxScheduleInDay),
        matrices: matrices,
        scheduleContainerTop: this.options.scheduleContainerTop,
        maxScheduleInDay: maxScheduleInDay,
        floatingButtonTop: this._calculateFloatingBtnTop(visibleScheduleCount, maxScheduleInDay),
        panelName: aboutMe.name
    }, baseViewModel);

    return baseViewModel;
};

/**
 * Calculate absolute top position of floating button layer
 * @param {number} visibleScheduleCount - maximum (row) number of schedules that panel can show
 * @param {number} maxScheduleInDay - maximum number of schedules in day
 * @returns {number} absolute top position of floating buttons in weekday panel
 */
WeekdayInWeek.prototype._calculateFloatingBtnTop = function(visibleScheduleCount, maxScheduleInDay) {
    var scheduleHeight = this.options.scheduleHeight + this.options.scheduleGutter;

    if (!this.collapsed && maxScheduleInDay > this.aboutMe.maxExpandCount) {
        return (visibleScheduleCount - 0.5) * scheduleHeight;
    }

    return (visibleScheduleCount - 1) * scheduleHeight;
};

module.exports = WeekdayInWeek;
