/**
 * @fileoverview Task view for upper area of Week view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var View = require('../../view/view');
var tmpl = require('./taskview.hbs');
var TZDate = require('../../common/timezone').Date;

// height + gutter (defined in CSS)
var ITEM_HEIGHT = 20;

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for TaskView
 * @param {string} options.renderStartDate - start date of allday view's render date. YYYY-MM-DD
 * @param {string} options.renderEndDate - end date of allday view's render date. YYYY-MM-DD
 * @param {number} [options.minHeight=52] - min-height of taskview
 * @param {number} [options.lineHeight=12] - line height of milestone view
 * @param {HTMLElement} container - container element
 */
function TaskView(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('task-container')
    );

    View.call(this, container);

    /**
     * @type {object}
     */
    this.options = util.extend({
        renderStartDate: '',
        renderEndDate: ''
    }, options);
}

util.inherit(TaskView, View);

/**
 * Get base viewmodel for task view
 * @param {object} [viewModel] - view model from parent view
 * @returns {object} view model for task view
 */
TaskView.prototype._getBaseViewModel = function(viewModel) {
    var options = this.options,
        events = {},
        range = datetime.range(
            datetime.start(datetime.parse(options.renderStartDate)),
            datetime.end(datetime.parse(options.renderEndDate)),
            datetime.MILLISECONDS_PER_DAY
        ),
        height = 0,
        mmax = Math.max,
        today = datetime.format(new TZDate(), 'YYYY-MM-DD');

    util.forEach(range, function(d) {
        var date = datetime.format(d, 'YYYY-MM-DD');
        events[date] = {
            morning: {length: 0},
            lunch: {length: 0},
            evening: {length: 0}
        };
    });
    util.extend(events, viewModel);

    height = mmax.apply(null, util.map(events, function(g) {
        var subcount = 0;

        util.forEach(g, function(coll) {
            subcount += (coll.length || 0);
        });
        return subcount;
    })) * ITEM_HEIGHT;

    util.forEach(events, function(event, key) {
        event.isToday = (key === today);
    });

    return {
        events: events,
        width: 100 / range.length,
        height: height
    };
};

/**
 * 업무 뷰 렌더링
 * @override
 */
TaskView.prototype.render = function(viewModel) {
    var container = this.container,
        baseViewModel = this._getBaseViewModel(util.pick(viewModel.eventsInDateRange, 'task'));

    container.innerHTML = tmpl(baseViewModel);

    util.forEach(domutil.find('li', container, true), function(el) {
        if (el.offsetWidth < el.scrollWidth) {
            el.setAttribute('title', domutil.getData(el, 'title'));
        }
    });

    this.fire('afterRender', baseViewModel);
};

module.exports = TaskView;

