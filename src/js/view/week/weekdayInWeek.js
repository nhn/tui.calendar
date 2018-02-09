/**
 * @fileoverview Weekday view for week
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = require('tui-code-snippet');
var Weekday = require('../weekday'),
    tmpl = require('./weekdayInWeek.hbs');
var mmax = Math.max;

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
 */
function WeekdayInWeek(options, container) {
    Weekday.call(this, options, container);
}

util.inherit(WeekdayInWeek, Weekday);

/**
 * Render Weekday view
 * @override
 */
WeekdayInWeek.prototype.render = function(viewModel) {
    var opt = this.options,
        container = this.container,
        baseViewModel = this.getBaseViewModel(viewModel),
        maxScheduleInDay = 0;

    baseViewModel.matrices = opt.getViewModelFunc(viewModel);

    maxScheduleInDay = mmax.apply(
        null,
        util.map(baseViewModel.matrices, function(matrix) {
            return Math.max.apply(null, util.map(matrix, function(row) {
                return row.length;
            }));
        })
    );

    baseViewModel.minHeight = this._getMinHeight(maxScheduleInDay);
    baseViewModel.scheduleContainerTop = this.options.scheduleContainerTop;

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
        (maxScheduleInDay * opt.scheduleHeight) +
        ((maxScheduleInDay - 1) * opt.scheduleGutter) +
        opt.containerBottomGutter
    );
};


module.exports = WeekdayInWeek;
