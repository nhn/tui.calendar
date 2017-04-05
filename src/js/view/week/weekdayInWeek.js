/**
 * @fileoverview Weekday view for week
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    mmax = Math.max;

var Weekday = require('../weekday'),
    tmpl = require('./weekdayInWeek.hbs');

/**
 * @constructor
 * @extends {Weekday}
 * @param {object} options - options for WeekdayInWeek view
 * @param {number} [options.containerHeight=40] - minimum height of event
 *  container element.
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to
 *  make create easy.
 * @param {number} [options.eventHeight=18] - height of each event block.
 * @param {number} [options.eventGutter=2] - gutter height of each event block.
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
        baseViewModel = this.getBaseViewModel(),
        maxEventInDay = 0;

    baseViewModel.matrices = opt.getViewModelFunc(viewModel);

    maxEventInDay = mmax.apply(
        null,
        util.map(viewModel.matrices, function(matrix) {
            return Math.max.apply(null, util.map(matrix, function(row) {
                return row.length;
            }));
        })
    );

    this._setMinHeight(maxEventInDay);
    container.innerHTML = tmpl(baseViewModel);
};

/**
 * Set minimum height for container.
 *
 * Need set min-height to container when wrapping container's height is smaller
 * then weekday container.
 *
 * If set height directly, vertical grids represent in each days are not cover
 * wrapping container.
 *
 * @param {number} maxEventInDay - how largest event block in one day?
 */
WeekdayInWeek.prototype._setMinHeight = function(maxEventInDay) {
    var opt = this.options,
        newHeight = (maxEventInDay * (opt.eventHeight + opt.eventGutter)) +
            opt.containerBottomGutter;

    this.container.style.minHeight = newHeight + 'px';
};

module.exports = WeekdayInWeek;
