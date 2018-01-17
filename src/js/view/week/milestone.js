/**
 * @fileoverview 마일스톤 뷰
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var TZDate = require('../../common/timezone').Date;
var View = require('../../view/view');
var tmpl = require('../template/week//milestone.hbs');

// item height + gutter (defined in css)
var ITEM_HEIGHT = 17;

// list padding-top (defined in css)
var LIST_PADDING_TOP = 1;

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options
 * @param {string} options.renderStartDate - start date of allday view's render date. YYYY-MM-DD
 * @param {string} options.renderEndDate - end date of allday view's render date. YYYY-MM-DD
 * @param {number} [options.minHeight=52] - min-height of milestone view
 * @param {number} [options.lineHeight=12] - line height of milestone view
 * @param {HTMLElement} container - container element
 */
function Milestone(options, container) {
    container = domutil.appendHTMLElement(
        'div',
        container,
        config.classname('milestone-container')
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

util.inherit(Milestone, View);

/**
 * Get base viewmodel for task view
 * @param {object} [viewModel] - view model from parent view
 * @returns {object} view model for task view
 */
Milestone.prototype._getBaseViewModel = function(viewModel) {
    var options = this.options,
        events = {},
        range = datetime.range(
            datetime.start(datetime.parse(options.renderStartDate)),
            datetime.end(datetime.parse(options.renderEndDate)),
            datetime.MILLISECONDS_PER_DAY
        ),
        height,
        today = datetime.format(new TZDate(), 'YYYY-MM-DD'),
        viewModelEvents = util.pick(viewModel.eventsInDateRange, 'milestone'),
        grids = viewModel.grids,
        i = 0;

    // 일정이 없는 경우라도 빈 객체를 생성
    util.forEach(range, function(d) {
        events[datetime.format(d, 'YYYY-MM-DD')] = {length: 0};
    });

    util.extend(events, viewModelEvents);

    util.forEach(events, function(event, key) {
        event.isToday = (key === today);
        event.left = grids[i].left;
        event.width = grids[i].width;
        i += 1;
    });

    height = LIST_PADDING_TOP + Math.max.apply(null, util.map(events, function(coll) {
        return coll.length;
    })) * ITEM_HEIGHT;

    return {
        events: events,
        height: height
    };
};

/**
 * 마일스톤 뷰 렌더링
 * @override
 */
Milestone.prototype.render = function(viewModel) {
    var container = this.container,
        baseViewModel = this._getBaseViewModel(viewModel);

    container.style.minHeight = this.options.minHeight + 'px';
    container.innerHTML = tmpl(baseViewModel);

    util.forEach(domutil.find('li', container, true), function(el) {
        if (el.offsetWidth < el.scrollWidth) {
            el.setAttribute('title', domutil.getData(el, 'title'));
        }
    });

    this.fire('afterRender', baseViewModel);
};

module.exports = Milestone;

