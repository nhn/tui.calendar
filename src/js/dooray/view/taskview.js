/**
 * @fileoverview Task view for upper area of Week view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var View = require('../../view/view');
var tmpl = require('./taskview.hbs');

var PADDING = 4;    // 그리드 내 패딩 값 (top + height)

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for TaskView
 * @param {string} options.renderStartDate - start date of allday view's render date. YYYY-MM-DD
 * @param {string} options.renderEndDate - end date of allday view's render date. YYYY-MM-DD
 * @param {number} [options.minHeight=40] - min-height of taskview
 * @param {number} [options.lineHeight=12] - line height of milestone view
 * @param {HTMLElement} container - container element
 */
function TaskView(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        'schedule-view-task-container'
    );

    View.call(this, options, container);

    /**
     * @type {object}
     */
    this.options = util.extend({
        renderStartDate: '',
        renderEndDate: '',
        minHeight: 40,
        lineHeight: 12
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
        lineHeight = options.lineHeight,
        height = 0,
        mmax = Math.max;

    util.forEach(range, function(d) {
        events[datetime.format(d, 'YYYY-MM-DD')] = {};
    });

    util.extend(events, viewModel);

    height = mmax.apply(null, util.map(events, function(g) {
        var subtotal = util.keys(g).length * lineHeight;

        util.forEach(g, function(coll) {
            subtotal += (coll.length * lineHeight);
        });

        return subtotal;
    }));

    return {
        events: events,
        width: 100 / range.length,
        minHeight: options.minHeight,
        height: height + PADDING,
        lineHeight: options.lineHeight
    };
};

/**
 * 업무 뷰 렌더링
 * @override
 */
TaskView.prototype.render = function(viewModel) {
    var container = this.container,
        baseViewModel = this._getBaseViewModel(util.pick(viewModel.eventsInDateRange, 'task'));

    container.style.minHeight = this.options.minHeight + 'px';
    container.innerHTML = tmpl(baseViewModel);

    util.forEach(domutil.find('li', container, true), function(el) {
        if (el.offsetWidth < el.scrollWidth) {
            el.setAttribute('title', domutil.getData(el, 'title'));
        }
    });
};

module.exports = TaskView;

