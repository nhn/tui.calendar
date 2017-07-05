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
        util.map(baseViewModel.matrices, function(matrix) {
            return Math.max.apply(null, util.map(matrix, function(row) {
                return row.length;
            }));
        })
    );

    baseViewModel.minHeight = this._getMinHeight(maxEventInDay);

    container.innerHTML = tmpl(baseViewModel);

    this.fire('afterRender', baseViewModel);
};

/**
 * returns minimum height for container.
 * @param {number} maxEventInDay - max event blocks in one day
 * @returns {number}
 */
WeekdayInWeek.prototype._getMinHeight = function(maxEventInDay) {
    var opt = this.options;

    return (
        (maxEventInDay * opt.eventHeight) + 
        ((maxEventInDay - 1) * opt.eventGutter) + 
        opt.containerBottomGutter
    );
};


module.exports = WeekdayInWeek;
