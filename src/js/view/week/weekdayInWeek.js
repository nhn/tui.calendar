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

    return (maxScheduleInDay * (opt.scheduleHeight + opt.scheduleGutter));
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
 * @param {*} maxCount - maximum visible count on panel
 * @returns {array} - The matrices for schedule placing except overflowed schedules.
 */
WeekdayInWeek.prototype._excludeExceedSchedules = function(matrices, maxCount) {
    return matrices.map(function(matrix) {
        return matrix.map(function(row) {
            if (row.length > maxCount) {
                return row.filter(function(item) {
                    return item.top < maxCount;
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
    var exceedDate, baseViewModel, panelHeight, minHiddenScheduleCount;

    if (this.viewType === 'toggle') {
        panelHeight = aboutMe.forcedLayout ? this.getViewBound().height : mmin(aboutMe.height, aboutMe.maxHeight);
        visibleScheduleCount = Math.floor(panelHeight / (opt.scheduleHeight + opt.scheduleGutter));
        if (this.collapsed) {
            visibleScheduleCount = mmin(visibleScheduleCount, mmin(maxScheduleInDay, aboutMe.maxExpandCount));
        } else {
            visibleScheduleCount = mmax(visibleScheduleCount, mmin(maxScheduleInDay, aboutMe.maxExpandCount));
        }

        exceedDate =
            this.getExceedDate(visibleScheduleCount,
                viewModel.schedulesInDateRange[aboutMe.name],
                viewModel.range,
                maxScheduleInDay
            );

        if (this.collapsed) {
            if (maxScheduleInDay > visibleScheduleCount) {
                matrices = this._excludeExceedSchedules(matrices, visibleScheduleCount);
            }
            aboutMe.visibleScheduleCount = visibleScheduleCount;
        } else {
            minHiddenScheduleCount = maxScheduleInDay - aboutMe.visibleScheduleCount;
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
        minHiddenScheduleIndex: this._getCollapseBtnIndex(viewModel,
            baseViewModel,
            minHiddenScheduleCount,
            maxScheduleInDay
        ),
        maxScheduleInDay: maxScheduleInDay,
        floatingButtonTop: (
            visibleScheduleCount -
            (maxScheduleInDay > 10 && !this.collapsed ? 0.5 : 1)) * (opt.scheduleHeight + opt.scheduleGutter
        ),
        panelName: aboutMe.name
    }, baseViewModel);

    return baseViewModel;
};

/**
 * return weekday index to show collapse button
 * @param {object} viewModel - view model
 * @param {object} baseViewModel - base view model
 * @param {number} maxHiddenCount - maximum hidden count when panel is collapsed
 * @param {number} maxScheduleInDay - maximum schedule in day
 * @returns {number} weekday index
 */
WeekdayInWeek.prototype._getCollapseBtnIndex = function(viewModel, baseViewModel, maxHiddenCount, maxScheduleInDay) {
    var aboutMe = this.aboutMe;
    var minHiddenScheduleCount = maxHiddenCount;
    var exceedDate =
        this.getExceedDate(
            mmin(maxScheduleInDay, aboutMe.maxExpandCount) - maxHiddenCount,
            viewModel.schedulesInDateRange[aboutMe.name],
            viewModel.range
        );
    var btnIndex = viewModel.range ? viewModel.range.length - 1 : 0;

    if (baseViewModel.dates && baseViewModel.dates.length) {
        baseViewModel.dates.forEach(function(date, index) {
            var ymd = date.ymd;
            if (exceedDate[ymd] !== 0 && minHiddenScheduleCount >= exceedDate[ymd]) {
                minHiddenScheduleCount = exceedDate[ymd];
                btnIndex = index;
            }
        });
    }

    return btnIndex;
};

module.exports = WeekdayInWeek;
