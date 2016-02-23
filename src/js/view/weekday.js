/**
 * @fileoverview Weekday view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../config'),
    domutil = require('../common/domutil'),
    datetime = require('../common/datetime'),
    View = require('./view');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - view options.
 * @param {number} [options.containerHeight=40] - minimum height of event 
 *  container element.
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to 
 *  make create easy.
 * @param {number} [options.eventHeight=18] - height of each event block.
 * @param {number} [options.eventGutter=2] - gutter height of each event block.
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
        eventHeight: 18,
        eventGutter: 2
    }, options);

    View.call(this, container);
}

util.inherit(Weekday, View);

/**
 * Get render date range
 * @returns {Date[]} rendered date range
 */
Weekday.prototype.getRenderDateRange = function() {
    var opt = this.options;

    return datetime.range(
        datetime.start(datetime.parse(opt.renderStartDate)),
        datetime.end(datetime.parse(opt.renderEndDate)),
        datetime.MILLISECONDS_PER_DAY
    );
};

/**
 * Get default view model.
 * @param {object} viewModel - viewModel from parent views.
 * @returns {object} viewModel to rendering.
 */
Weekday.prototype.getBaseViewModel = function() {
    var opt = this.options,
        range = this.getRenderDateRange(),
        gridWidth = (100 / range.length);

    return {
        width: gridWidth,
        eventHeight: opt.eventHeight,
        eventBlockHeight: (opt.eventHeight + opt.eventGutter),
        eventBlockGutter: opt.eventGutter,
        dates: util.map(range, function(date) {
            return {
                date: date.getDate(),
                month: date.getMonth() + 1,
                day: date.getDay()
            };
        })
    };
};

module.exports = Weekday;

