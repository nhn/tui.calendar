/**
 * @fileoverview View of days UI.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var datetime = require('../datetime');
var View = require('./view');

/**
 * @constructor
 * @param {Base.Week} controller The controller mixin part.
 * @param {object} options View options
 * @param {string} [options.renderStartDate] Start date of render. if not supplied then use -3d from today. YYYY-MM-DD format.
 * @param {string} [options.renderEndDate] End date of render. if not supplied then use +3d from today. YYYY-MM-DD format.
 * @param {HTMLElement} container The element to use container for this view.
 * @extends {View}
 */
function Week(controller, options, container) {
    var range;

    container = domutil.appendHTMLElement(
        'div',
        container,
        'schedule-view-week-container'
    );

    View.call(this, null, container);

    range = this._getRenderDateRange(new Date());

    /**
     * @type {object} Options for view.
     */
    this.options = util.extend({
        renderStartDate: datetime.format(range.start, 'YYYY-MM-DD'),
        renderEndDate: datetime.format(range.end, 'YYYY-MM-DD')
    }, options);

    /**
     * Week controller mixin.
     * @type {Base.Week}
     */
    this.controller = controller;
}

util.inherit(Week, View);

/**********
 * Override props
 **********/

/**
 * Render each child view with events in ranges.
 */
Week.prototype.render = function() {
    var options = this.options,
        renderStartDate = datetime.parse(options.renderStartDate),
        renderEndDate = datetime.parse(options.renderEndDate),
        eventsInDateRange = this.controller.findByDateRange(
            datetime.start(renderStartDate),
            datetime.end(renderEndDate)
        ),
        viewModel = {
            eventsInDateRange: eventsInDateRange,
            renderStartDate: renderStartDate,
            renderEndDate: renderEndDate
        };

    this.childs.each(function(childView) {
        childView.render(viewModel);
    });
};

/**
 * Listen child view's resize event and handle it.
 * @param {string} source - the string to use group requests.
 * @param {number} param - additional information for resizing session.
 */
Week.prototype._onResize = function(source, param) {
    var ownChilds = this.childs,
        timegrid,
        height;

    if (source === 'monthweek:resize') {
        timegrid = ownChilds.find(function(view) {
            return view.viewName === 'timegrid';
        }).single();

        height = this.timeGridOriginHeight;

        if (!this.timeGridOriginHeight) {
            height = this.timeGridOriginHeight = domutil.getSize(timegrid.container)[1];
        }

        timegrid.container.style.height = (height - param) + 'px';
        return;
    }
};

/**********
 * Prototype props
 **********/

Week.prototype.viewName = 'Week';

/**
 * Calculate default render date range from supplied date.
 * @param {Date} baseDate base date.
 * @returns {object} date range.
 */
Week.prototype._getRenderDateRange = function(baseDate) {
    var base = datetime.start(baseDate),
        start = new Date(+base),
        end = new Date(+base);

    start.setDate(start.getDate() - 3);
    end.setDate(end.getDate() + 3);

    return {
        start: start,
        end: end
    };
};

module.exports = Week;

