/**
 * @fileoverview Minicalendar view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var View = require('../../view/view');
var domutil = require('../../common/domutil');
var datetime = require('../../datetime');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for minicalendar view
 * @param {number} [options.startDayOfWeek=0] - start day of week. default 0 (sunday)
 * @param {string} [options.renderMonth] - YYYY-MM formatted date to render. 
 * if not supplied use current month
 * @param {HTMLDivElement} container - element to use container
 */
function MiniCalendar(options, container) {
    var baseMonth;

    View.call(this, options, container);

    domutil.addClass(container, 'schedule-view-minicalendar');

    baseMonth = datetime.format(new Date(), 'YYYY-MM');

    /**
     * @type {object}
     */
    this.options = util.extend({
        startDayOfWeek: 0,
        renderMonth: baseMonth
    }, options);
}

util.inherit(MiniCalendar, View);

module.exports = MiniCalendar;

