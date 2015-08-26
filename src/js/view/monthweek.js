/**
 * @fileoverview View of week event container inside of Week view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var View = require('./view');
var Day = require('./day');
var tmpl = require('./template/week/monthweek.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - view options.
 * @param {object} [options.height=72] - height of monthweek views.
 * @param {HTMLDIVElement} container - DOM element to use container for this view.
 * TODO: split week?
 */
function MonthWeek(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        'schedule-view-allday-monthweek'
    );

    /**
     * @type {object}
     */
    this.options = util.extend({
        height: 72    // default value when Month view rendering.
    }, options);

    View.call(this, null, container);
}

util.inherit(MonthWeek, View);

/**
 * get base viewmodel for monthweek view.
 * @param {object} viewModel - viewModel from parent views.
 * @returns {object} view model for monthweek view.
 */
MonthWeek.prototype._getBaseViewModel = function(viewModel) {
    var eventsInDateRange = viewModel.eventsInDateRange,
        widthPercent = 100 / util.keys(eventsInDateRange).length;

    return {
        height: this.options.height,
        eventGrid: util.map(eventsInDateRange, function() {
            return widthPercent;
        })
    };
};

/**
 * @override
 * @param {object} viewModel - viewModel from parent views.
 */
MonthWeek.prototype.render = function(viewModel) {
    var container = this.container,
        eventsInDateRange = viewModel.eventsInDateRange;

    container.innerHTML = tmpl(this._getBaseViewModel(viewModel));

    util.forEach(eventsInDateRange, function(eventViewModels, ymd) {
        var dayView = new Day({
            ymd: ymd,
            width: 100 / util.keys(eventsInDateRange).length
        }, domutil.find('.schedule-view-monthweek-events'));

        this.addChild(dayView);
    }, this);

    this.childs.each(function(childView) {
        childView.render(viewModel);
    });
};

module.exports = MonthWeek;

