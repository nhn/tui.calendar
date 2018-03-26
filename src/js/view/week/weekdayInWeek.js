/**
 * @fileoverview Weekday view for week
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var Weekday = require('../weekday'),
    tmpl = require('./weekdayInWeek.hbs'),
    datetime = require('../../common/datetime');
var mmax = Math.max,
    mfloor = Math.floor,
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
        matrices = opt.getViewModelFunc(viewModel),
        aboutMe = this.aboutMe,
        exceedDate = {};
    var maxScheduleInDay, baseViewModel, panelHeight, visibleScheduleCount;

    maxScheduleInDay = mmax.apply(
        null,
        util.map(matrices, function(matrix) {
            return Math.max.apply(null, util.map(matrix, function(row) {
                return row.length;
            }));
        })
    );

    if (this.collapsed) {
        panelHeight = aboutMe.forcedLayout ? this.getViewBound().height : mmin(aboutMe.height, aboutMe.maxHeight);
        visibleScheduleCount = Math.floor(panelHeight / (opt.scheduleHeight + opt.scheduleGutter));

        if (maxScheduleInDay > visibleScheduleCount) {
            matrices = matrices.map(function(matrix) {
                return matrix.map(function(row) {
                    if (row.length >= visibleScheduleCount) {
                        return row.filter(function(item) {
                            var exceeded = item.top >= visibleScheduleCount - 1;

                            if (exceeded) {
                                this._updateExceedDate(exceedDate, item.renderStarts, item.renderEnds);
                            }

                            return !exceeded;
                        }, this);
                    }

                    return row;
                }, this);
            }, this);

            viewModel.exceedDate = exceedDate;
        }
    }

    baseViewModel = this.getBaseViewModel(viewModel);
    baseViewModel.contentHeight = this._getMinHeight(maxScheduleInDay);
    baseViewModel.matrices = matrices;
    baseViewModel.scheduleContainerTop = this.options.scheduleContainerTop;
    baseViewModel.collapsed = (this.collapsed && (maxScheduleInDay > visibleScheduleCount)) ? 'collapsed' : '';
    baseViewModel.maxScheduleInDay = maxScheduleInDay;
    baseViewModel.visibleScheduleCount = visibleScheduleCount;

    container.innerHTML = tmpl(baseViewModel);

    this.fire('afterRender', baseViewModel);
};

/**
 * returns minimum height for container.
 * @param {number} maxScheduleInDay - max schedule blocks in one day
 * @returns {number}
 */
WeekdayInWeek.prototype._getMinHeight = function(maxScheduleInDay) {
    var opt = this.options;

    return (
        (maxScheduleInDay * (opt.scheduleHeight + opt.scheduleGutter)) +
        opt.containerBottomGutter
    );
};

/**
 * Get limit index of schedule block in current view
 * @returns {number} limit index
 */
WeekdayInWeek.prototype._getRenderLimitIndex = function() {
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

module.exports = WeekdayInWeek;
