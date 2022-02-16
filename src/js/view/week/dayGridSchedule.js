/**
 * @fileoverview Weekday view for week
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var Weekday = require('../weekday'),
    tmpl = require('../template/week/dayGridSchedule.hbs');
var mmax = Math.max;

/**
 * @constructor
 * @extends {Weekday}
 * @param {object} options - options for DayGridSchedule view
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to
 *  make create easy.
 * @param {number} [options.scheduleHeight=18] - height of each schedule block.
 * @param {number} [options.scheduleGutter=2] - gutter height of each schedule block.
 * @param {HTMLDivElement} container - DOM element to use container for this
 *  view.
 */
function DayGridSchedule(options, container) {
    Weekday.call(this, options, container);

    this.collapsed = true;
}

util.inherit(DayGridSchedule, Weekday);

/**
 * Render Weekday view
 * @override
 */
DayGridSchedule.prototype.render = function(viewModel) {
    var container = this.container;
    var baseViewModel;

    baseViewModel = this.getBaseViewModel(viewModel);

    container.innerHTML = tmpl(baseViewModel);

    this.fire('afterRender', baseViewModel);
};

/**
 * returns maximum schedule count in day
 * @param {array} matrices - The matrices for schedule placing.
 * @returns {number} maximum schedule count in day
 */
DayGridSchedule.prototype._getMaxScheduleInDay = function(matrices) {
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
DayGridSchedule.prototype._getMinHeight = function(maxScheduleInDay) {
    var opt = this.options;
    var contentHeight = (maxScheduleInDay * opt.scheduleHeight)
        + ((maxScheduleInDay - 1) * opt.scheduleGutter);

    return contentHeight;
};

/**
 * @override
 * @param {object} viewModel - schedules view models
 */
DayGridSchedule.prototype.getBaseViewModel = function(viewModel) {
    var opt = this.options;
    var matrices = opt.getViewModelFunc(viewModel);
    var maxScheduleInDay = this._getMaxScheduleInDay(matrices);
    var baseViewModel;
    var styles = this._getStyles(viewModel.theme);

    baseViewModel = Weekday.prototype.getBaseViewModel.call(this, viewModel);

    baseViewModel = util.extend({
        minHeight: this._getMinHeight(maxScheduleInDay),
        matrices: matrices,
        scheduleContainerTop: this.options.scheduleContainerTop,
        maxScheduleInDay: maxScheduleInDay,
        isReadOnly: opt.isReadOnly,
        styles: styles
    }, baseViewModel);

    return baseViewModel;
};

/**
 * Get the styles from theme
 * @param {Theme} theme - theme instance
 * @returns {object} styles - styles object
 */
DayGridSchedule.prototype._getStyles = function(theme) {
    var styles = {};

    if (theme) {
        styles.borderRadius = theme.week.dayGridSchedule.borderRadius;
    }

    return styles;
};

module.exports = DayGridSchedule;
