/**
 * @fileoverview Weekday view
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../config'),
    domutil = require('../common/domutil'),
    datetime = require('../common/datetime'),
    TZDate = require('../common/timezone').Date,
    View = require('./view');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - view options.
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
    var gridWidth = (100 / range.length);
    var grids = viewModel.grids;
    var exceedDate = viewModel.exceedDate || {};
    var theme = viewModel.theme;
    var now = new TZDate().toLocalTime();

    this._cacheParentViewModel = viewModel;

    return {
        width: gridWidth,
        scheduleHeight: opt.scheduleHeight,
        scheduleBlockHeight: (opt.scheduleHeight + opt.scheduleGutter),
        scheduleBlockGutter: opt.scheduleGutter,
        dates: util.map(range, function(date, index) {
            var day = date.getDay();
            var ymd = datetime.format(new TZDate(date), 'YYYYMMDD');
            var isToday = datetime.isSameDate(now, date);

            return {
                date: datetime.format(date, 'YYYY-MM-DD'),
                month: date.getMonth() + 1,
                day: day,
                isToday: isToday,
                ymd: ymd,
                hiddenSchedules: exceedDate[ymd] || 0,
                width: grids[index] ? grids[index].width : 0,
                left: grids[index] ? grids[index].left : 0,
                color: this._getDayNameColor(theme, day, isToday),
                backgroundColor: this._getDayBackgroundColor(theme, day)
            };
        }, this)
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

                // check that this schedule block is not visible after rendered.
                viewModel.hidden = true;

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
 * Get a day name color
 * @param {Theme} theme - theme instance
 * @param {number} day - day number
 * @param {boolean} isToday - today flag
 * @param {boolean} isOtherMonth - not this month flag
 * @returns {string} style - color style
 */
Weekday.prototype._getDayNameColor = function(theme, day, isToday, isOtherMonth) {
    var color = '';

    if (theme) {
        if (day === 0) {
            color = isOtherMonth ? theme.month.holidayExceptThisMonth.color : theme.common.holiday.color;
        } else if (day === 6) {
            color = isOtherMonth ? theme.month.dayExceptThisMonth.color : theme.common.saturday.color;
        } else if (isToday) {
            color = theme.common.today.color;
        } else {
            color = isOtherMonth ? theme.month.dayExceptThisMonth.color : theme.common.dayname.color;
        }
    }

    return color;
};

/**
 * Get a day background color
 * @param {Theme} theme - theme instance
 * @param {number} day - day number
 * @returns {string} style - color style
 */
Weekday.prototype._getDayBackgroundColor = function(theme, day) {
    var color = '';

    if (theme) {
        if (day === 0 || day === 6) {
            color = theme.month.weekend.backgroundColor;
        } else {
            color = 'inherit';
        }
    }

    return color;
};

module.exports = Weekday;
