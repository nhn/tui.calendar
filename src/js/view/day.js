
/**
 * @fileoverview view for render allday event block in month grid.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var View = require('./view');
var tmpl = require('./template/week/day.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - option object.
 * @param {number} options.width - conatiner width percent.
 * @param {string} options.ymd - ymd value for this view.
 * @param {HTMLDIVElement} container - DOM element to use container for this view.
 */
function Day(options, container) {
    container = domutil.appendHTMLElement('div', container, 'schedule-view-day');

    View.call(this, null, container);

    this.options = util.extend({
        ymd: '',
        width: 0
    }, options);

    domutil.setData(container, 'ymd', this.options.ymd);
}

util.inherit(Day, View);

/**
 * @override
 * @param {object} viewModel - view model from parent view.
 */
Day.prototype.render = function(viewModel) {
    var events = util.pick(viewModel.eventsInDateRange.allday, this.options.ymd);

    if (!events) {
        return;
    }

    util.forEach(events, function(viewModel) {
        viewModel.width *= this.options.width;
        viewModel.left *= this.options.width;
    }, this);

    this.container.innerHTML = tmpl(events);
};

module.exports = Day;

