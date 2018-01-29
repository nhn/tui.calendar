/**
 * @fileoverview View of allday schedule container inside of Week view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
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
 * @param {number} [options.height=60] - minimum height of schedule container element.
 * @param {number} [options.scheduleBlockHeight=18] - height of each schedule block.
 * @param {number} [options.scheduleBlockGutter=2] - gutter height of each schedule block.
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
        scheduleHeight: 18,
        scheduleGutter: 2,
        scheduleContainerTop: 1,
        getViewModelFunc: function(viewModel) {
            return viewModel.schedulesInDateRange.allday;
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
 * create month week view model for render allday schedules in top of week views.
 * @override
 * @param {object} viewModel - viewModel from parent views.
 */
Allday.prototype.render = function(viewModel) {
    var container = this.container;
    var scheduleContainerTop = this.options.scheduleContainerTop;
    var weekdayView;
    var self = this;

    container.innerHTML = tmpl(this.options);

    this.children.clear();

    weekdayView = new WeekdayInWeek(
        this.options,
        domutil.find(config.classname('.weekday-container'), container)
    );
    weekdayView.on('afterRender', function(weekdayViewModel) {
        self.contentHeight = weekdayViewModel.minHeight + scheduleContainerTop;
    });

    this.addChild(weekdayView);

    this.children.each(function(childView) {
        childView.render(viewModel);
    });

    this.fire('afterRender', viewModel);
};

module.exports = Allday;

