/**
 * @fileoverview View of time.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var TZDate = require('../../common/timezone').Date;
var View = require('../view');
var timeTmpl = require('../template/week/time.hbs');

var forEachArr = util.forEachArray;

/**
 * @constructor
 * @extends {View}
 * @param {object} options Options
 * @param {number} options.index Date index in week view.
 * @param {number} options.width Date element width (percent)
 * @param {string} options.ymd YYYMMDD string for this view
 * @param {boolean} options.isToday when set true then assign today design class to container.
 * @param {number} options.hourStart Can limit of render hour start.
 * @param {number} options.hourEnd Can limit of render hour end.
 * @param {HTMLElement} container Element to use container for this view.
 * @param {Theme} theme - theme instance
 */
function Time(options, container, theme) {
    View.call(this, container);

    this.options = util.extend({
        index: 0,
        width: 0,
        ymd: '',
        isToday: false,
        pending: false,
        hourStart: 0,
        hourEnd: 24,
        defaultMarginBottom: 2,
        minHeight: 18.5
    }, options);

    this.timeTmpl = timeTmpl;

    /**
     * @type {Theme}
     */
    this.theme = theme;

    container.style.width = options.width + '%';
    container.style.left = options.left + '%';

    if (this.options.isToday) {
        domutil.addClass(this.container, config.classname('today'));
    }

    this.applyTheme();
}

util.inherit(Time, View);

/**
 * Convert YYYYMMDD formatted string date to Date.
 * @param {string} str formatted string.
 * @returns {Date} start of date.
 */
Time.prototype._parseDateGroup = function(str) {
    var y = parseInt(str.substr(0, 4), 10),
        m = parseInt(str.substr(4, 2), 10),
        d = parseInt(str.substr(6, 2), 10);

    return new TZDate(y, m - 1, d);
};

/**
 * @param {ScheduleViewModel} viewModel - view model instance to calculate bound.
 * @param {object} options - options for calculating schedule element's bound.
 * @param {Date} options.todayStart - date object represent schedule date's start (00:00:00)
 * @param {number} options.baseMS - the number of milliseconds to render schedule blocks.
 * @param {number} options.baseHeight - pixel value related with baseMS options.
 * @param {number[]} options.baseLeft - left position percents for each columns.
 * @param {number} options.baseWidth - the unit of schedule blocks width percent.
 * @param {number} options.columnIndex - the number index of schedule blocks.
 * it represent rendering index from left sides in view.
 * @returns {object} bound object for supplied view model.
 */
Time.prototype.getScheduleViewBound = function(viewModel, options) {
    var baseMS = options.baseMS;
    var baseHeight = options.baseHeight;
    var cropped = false;
    var offsetStart, width, height, top;
    var isReadOnly = util.pick(viewModel, 'model', 'isReadOnly') || false;

    offsetStart = viewModel.valueOf().start - options.todayStart;

    // containerHeight : milliseconds in day = x : schedule's milliseconds
    top = (baseHeight * offsetStart) / baseMS;
    height = (baseHeight * viewModel.duration()) / baseMS;
    width = options.baseWidth * (viewModel.extraSpace + 1);

    // set width auto when has no collisions.
    if (!viewModel.hasCollide) {
        width = null;
    }

    if (height + top > baseHeight) {
        height = baseHeight - top;
        cropped = true;
    }

    if (isReadOnly) {
        cropped = true;
    }

    return {
        top: top,
        left: options.baseLeft[options.columnIndex],
        width: width,
        height: Math.max(height, this.options.minHeight) - this.options.defaultMarginBottom,
        cropped: cropped
    };
};

/**
 * Set viewmodels for rendering.
 * @param {string} ymd The date of schedules. YYYYMMDD format.
 * @param {array} matrices The matrices for schedule placing.
 * @param {number} containerHeight - container's height
 */
Time.prototype._getBaseViewModel = function(ymd, matrices, containerHeight) {
    var self = this,
        options = this.options,
        hourStart = options.hourStart,
        hourEnd = options.hourEnd,
        todayStart,
        baseMS;

    /**
     * Calculate each schedule element bounds relative with rendered hour milliseconds and
     * wrap each schedule model to viewmodels.
     */
    containerHeight = containerHeight || this.getViewBound().height;
    todayStart = this._parseDateGroup(ymd);
    todayStart.setHours(hourStart);
    baseMS = datetime.millisecondsFrom('hour', (hourEnd - hourStart));

    forEachArr(matrices, function(matrix) {
        var maxRowLength,
            widthPercent,
            leftPercents,
            i;

        maxRowLength = Math.max.apply(null, util.map(matrix, function(row) {
            return row.length;
        }));

        widthPercent = 100 / maxRowLength;

        leftPercents = [];
        for (i = 0; i < maxRowLength; i += 1) {
            leftPercents[i] = widthPercent * i;
        }

        forEachArr(matrix, function(row) {
            forEachArr(row, function(viewModel, col) {
                var viewBound;

                if (!viewModel) {
                    return;
                }

                viewBound = self.getScheduleViewBound(viewModel, {
                    todayStart: todayStart,
                    baseMS: baseMS,
                    baseLeft: leftPercents,
                    baseWidth: widthPercent,
                    baseHeight: containerHeight,
                    columnIndex: col
                });

                util.extend(viewModel, viewBound);
            });
        });
    });
};

/**
 * @returns {Date} - Date of this view.
 */
Time.prototype.getDate = function() {
    return this._parseDateGroup(this.options.ymd);
};

/**
 * @override
 * @param {string} ymd The date of schedules. YYYYMMDD format
 * @param {array} matrices Matrices for placing schedules
 * @param {number} containerHeight - container's height
 */
Time.prototype.render = function(ymd, matrices, containerHeight) {
    this._getBaseViewModel(ymd, matrices, containerHeight);
    this.container.innerHTML = this.timeTmpl({
        matrices: matrices,
        styles: this._getStyles(this.theme)
    });
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @returns {object} styles - styles object
 */
Time.prototype._getStyles = function(theme) {
    var styles = {};
    var options = this.options;

    if (theme) {
        styles.borderRight = theme.week.timegrid.borderRight || theme.common.border;
        styles.marginRight = theme.week.timegrid.paddingRight;
        styles.borderRadius = theme.week.timegridSchedule.borderRadius;
        styles.paddingLeft = theme.week.timegridSchedule.paddingLeft;
        styles.backgroundColor = options.isToday ? theme.week.today.backgroundColor : 'inherit';
    }

    return styles;
};

Time.prototype.applyTheme = function() {
    var style = this.container.style;
    var styles = this._getStyles(this.theme);

    style.borderRight = styles.borderRight;
    style.backgroundColor = styles.backgroundColor;
};

module.exports = Time;
