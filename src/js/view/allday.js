/**
 * @fileoverview View of allday event container inside of Week view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var View = require('./view');
var MonthWeek = require('./monthweek');
var mainTmpl = require('./template/week/allday.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} options The object for view customization.
 * @param {number} [options.hourStart=0] You can change view's start hours.
 * @param {number} [options.hourEnd=0] You can change view's end hours.
 * @param {HTMLElement} container Container element.
 */
function Allday(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        'schedule-view-allday-container'
    );

    /**
     * @type {HTMLDIVElement}
     */
    this.monthweekContainer = null;

    View.call(this, null, container);
}

util.inherit(Allday, View);

/**
 * create month week view model for render allday events in top of week views.
 * @override
 * @param {object} viewModel - viewModel from parent views.
 */
Allday.prototype.render = function(viewModel) {
    var container = this.container,
        monthWeekInst;

    container.innerHTML = mainTmpl();

    this.childs.clear();

    monthWeekInst = new MonthWeek({
        height: 60
    }, domutil.find('.schedule-view-allday-monthweek-container', container));

    this.addChild(monthWeekInst);

    this.childs.each(function(childView) {
        childView.render(viewModel);
    });
};

module.exports = Allday;

