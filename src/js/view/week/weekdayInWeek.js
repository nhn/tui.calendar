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
 * @param {object} options The object for view customization.
 * @param {string} options.renderStartDate - start date of allday view's render
 *  date. YYYY-MM-DD
 * @param {string} options.renderEndDate - end date of allday view's render 
 *  date. YYYY-MM-DD
 * @param {number} [options.height=60] - minimum height of event container 
 *  element.
 * @param {number} [options.eventBlockHeight=18] - height of each event block.
 * @param {number} [options.eventBlockGutter=2] - gutter height of each event 
 *  block.
 * @param {function} [options.getViewModelFunc] - function for extract partial 
 *  view model data from whole view models.
 * @param {HTMLElement} container Container element.
 */
function WeekdayInWeek(options, container) {
    Weekday.call(this, options, container);
}

util.inherit(WeekdayInWeek, Weekday);

/**
 * Render Weekday view
 * @override
 */
WeekdayInWeek.prototype.render = function() {
    var opt = this.options,
        container = this.container,
        viewModel = this._getBaseViewModel(),
        maxEventInDay = 0;

    viewModel.matrices = opt.getViewModelFunc(viewModel);

    maxEventInDay = mmax.apply(
        null, 
        util.map(viewModel.matrices, function(matrix) {
            return Math.max.apply(null, util.map(matrix, function(row) {
                return row.length;
            }));
        })
    );

    this._setMinHeight(maxEventInDay);

    container.innerHTML = tmpl(viewModel);
};

/**
 * Set minimum height for container.
 * 
 * Need set min-height to container when wrapping container's height is smaller 
 * then monthweek container.
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

