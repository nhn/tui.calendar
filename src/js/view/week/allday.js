/**
 * @fileoverview View of allday event container inside of Week view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config'),
    domutil = require('../../common/domutil'),
    View = require('../view'),
    WeekdayInWeek = require('./weekdayInWeek'),
    tmpl = require('../template/week/allday.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} options The object for view customization.
 * @param {string} options.renderStartDate - start date of allday view's render date. YYYY-MM-DD
 * @param {string} options.renderEndDate - end date of allday view's render date. YYYY-MM-DD
 * @param {number} [options.height=60] - minimum height of event container element.
 * @param {number} [options.eventBlockHeight=18] - height of each event block.
 * @param {number} [options.eventBlockGutter=2] - gutter height of each event block.
 * @param {function} [options.getViewModelFunc] - function for extract partial view model data from whole view models.
 * @param {HTMLElement} container Container element.
 */
function Allday(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('allday-container')
    );

    /**
     * rendering options.
     * @type {object}
     */
    this.options = util.extend({
        title: 'All-day',
        renderStartDate: '',
        renderEndDate: '',
        containerBottomGutter: 18,
        eventHeight: 18,
        eventGutter: 2,
        eventContainerTop: 1,
        getViewModelFunc: function(viewModel) {
            return viewModel.eventsInDateRange.allday;
        }
    }, options);

    /**
     * height of content
     */
    this.contentHeight = 0;

    View.call(this, container);
}

util.inherit(Allday, View);

/**
 * create month week view model for render allday events in top of week views.
 * @override
 * @param {object} viewModel - viewModel from parent views.
 */
Allday.prototype.render = function(viewModel) {
    var container = this.container;
    var eventContainerTop = this.options.eventContainerTop;
    var weekdayView;
    var self = this;

    container.innerHTML = tmpl(this.options);

    this.children.clear();

    weekdayView = new WeekdayInWeek(
        this.options,
        domutil.find(config.classname('.weekday-container'), container)
    );
    weekdayView.on('afterRender', function(weekdayViewModel) {
        self.contentHeight = weekdayViewModel.minHeight + eventContainerTop;
    });

    this.addChild(weekdayView);

    this.children.each(function(childView) {
        childView.render(viewModel);
    });

    this.fire('afterRender', viewModel);
};

module.exports = Allday;

