/**
 * @fileoverview Weekday view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../config'),
    domutil = require('../common/domutil'),
    datetime = require('../common/datetime'),
    TZDate = require('../common/timezone').Date,
    View = require('./view');
var mfloor = Math.floor,
    mmin = Math.min;

/**
 * @constructor
 * @extends {View}
 * @param {object} options - view options.
 * @param {number} [options.containerHeight=40] - minimum height of schedule
 *  container element.
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to
 *  make create easy.
 * @param {number} [options.scheduleHeight=18] - height of each schedule block.
 * @param {number} [options.scheduleGutter=2] - gutter height of each schedule block.
 * @param {HTMLDIVElement} container - DOM element to use container for this
 *  view.
 */
function Weekday(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('weekday')
    );

    /**
     * @type {object}
     */
    this.options = util.extend({
        containerHeight: 40,
        containerBottomGutter: 8,
        scheduleHeight: 18,
        scheduleGutter: 2,
        narrowWeekend: false,
        startDayOfWeek: 0,
        workweek: false
    }, options);

    /*
     * cache parent's view model
     * @type {object}
     */
    this._cacheParentViewModel = null;

    View.call(this, container);
}

util.inherit(Weekday, View);

/**
 * Get render date range
 * @returns {Date[]} rendered date range
 */
Weekday.prototype.getRenderDateRange = function() {
    return this._cacheParentViewModel.range;
};

/**
 * Get render date grids information
 * @returns {Date[]} rendered date grids information
 */
Weekday.prototype.getRenderDateGrids = function() {
    return this._cacheParentViewModel.grids;
};

/**
 * Get default view model.
 * @param {object} viewModel parent's view model
 * @returns {object} viewModel to rendering.
 */
Weekday.prototype.getBaseViewModel = function(viewModel) {
    var opt = this.options;
    var range = viewModel.range;
    var today = datetime.format(new TZDate(), 'YYYYMMDD');
    var gridWidth = (100 / range.length);
    var grids = viewModel.grids;
    var exceedDate = viewModel.exceedDate || {};

    this._cacheParentViewModel = viewModel;

    return {
        width: gridWidth,
        scheduleHeight: opt.scheduleHeight,
        scheduleBlockHeight: (opt.scheduleHeight + opt.scheduleGutter),
        scheduleBlockGutter: opt.scheduleGutter,
        dates: util.map(range, function(date, index) {
            var day = date.getDay();
            var ymd = datetime.format(date, 'YYYYMMDD');

            return {
                date: datetime.format(date, 'YYYY-MM-DD'),
                month: date.getMonth() + 1,
                day: day,
                isToday: ymd === today,
                ymd: ymd,
                hiddenSchedules: exceedDate[ymd] || 0,
                width: grids[index] ? grids[index].width : 0,
                left: grids[index] ? grids[index].left : 0
            };
        })
    };
};

/* eslint max-nested-callbacks: 0 */
/**
 * Make exceed date information
 * @param {number} maxCount - exceed schedule count
 * @param {Array} eventsInDateRange  - matrix of ScheduleViewModel
 * @param {Array.<TZDate>} range - date range of one week
 * @returns {object} exceedDate
 */
Weekday.prototype.getExceedDate = function(maxCount, eventsInDateRange, range) {
    var exceedDate = this._initExceedDate(range);

    util.forEach(eventsInDateRange, function(matrix) {
        util.forEach(matrix, function(column) {
            util.forEach(column, function(viewModel) {
                var period;
                if (!viewModel || viewModel.top < maxCount) {
                    return;
                }

                period = datetime.range(
                    viewModel.getStarts(),
                    viewModel.getEnds(),
                    datetime.MILLISECONDS_PER_DAY
                );

                util.forEach(period, function(date) {
                    var ymd = datetime.format(date, 'YYYYMMDD');
                    exceedDate[ymd] += 1;
                });
            });
        });
    });

    return exceedDate;
};

/**
 * Initiate exceed date information
 * @param {Array.<TZDate>} range - date range of one week
 * @returns {Object} - initiated exceed date
 */
Weekday.prototype._initExceedDate = function(range) {
    var exceedDate = {};

    util.forEach(range, function(date) {
        var ymd = datetime.format(date, 'YYYYMMDD');
        exceedDate[ymd] = 0;
    });

    return exceedDate;
};

/**
 * Get limit index of schedule block in current view
 * @returns {number} limit index
 */
Weekday.prototype._getRenderLimitIndex = function() {
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

module.exports = Weekday;
