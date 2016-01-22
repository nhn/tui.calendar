/**
 * @fileoverview Double click handler for allday
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var common = require('../../common/common'),
    datetime = require('../../common/datetime'),
    config = require('../../config'),
    domevent = require('../../common/domevent'),
    domutil = require('../../common/domutil');

/**
 * @constructor
 * @implements {Handler}
 * @mixes util.CustomEvents
 * @param {Allday} alldayView - instance of allday view
 */
function AlldayDblClick(alldayView) {
    /**
     * @type {Allday}
     */
    this.alldayView = alldayView;

    domevent.on(alldayView.container, 'dblclick', this._onDblClick, this);
}

/**
 * Destroy handler
 */
AlldayDblClick.prototype.destroy = function() {
    if (!this.alldayView || !this.alldayView.container) {
        return;
    }

    domevent.off(this.alldayView.container, 'dblclick', this._onDblClick, this);
    this.alldayView = null;
};

/**
 * Check supplied target has privilege to handle this handler
 * @override
 * @param {HTMLElement} target - target element from dblclick event
 * @returns {boolean|WeekdayInWeek} WeekdayInWeek view or false
 */
AlldayDblClick.prototype.checkExpectedCondition = function(target) {
    var weekdayView;

    if (!domutil.hasClass(target, config.classname('weekday-events')) && 
        !domutil.hasClass(target, config.classname('weekday-grid-line'))) {
        return false;
    }

    weekdayView = this.alldayView.children.single();

    if (!weekdayView) {
        return false;
    }

    return weekdayView;
};

/**
 * Dblclick event hander
 * @fires AlldayDblClick#beforeCreateEvent
 * @param {MouseEvent} e - dblclick mouse event object
 */
AlldayDblClick.prototype._onDblClick = function(e) {
    var weekdayView = this.checkExpectedCondition(e.srcElement || e.target),
        mousePosX, viewWidth, renderDateRange, dateIndex,
        targetDate;

    if (!weekdayView) {
        return;
    }

    mousePosX = domevent.getMousePosition(e, weekdayView.container)[0];
    viewWidth = weekdayView.getViewBound().width;
    renderDateRange = weekdayView.getRenderDateRange();
    dateIndex = Math.floor(common.ratio(viewWidth, renderDateRange.length, mousePosX));
    targetDate = renderDateRange[dateIndex];

    /**
     * @event {AlldayDblClick#beforeCreateEvent}
     * @type {object}
     * @property {boolean} isAllDay - whether event is fired in allday view area?
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeCreateEvent', {
        isAllDay: true,
        starts: new Date(+targetDate),
        ends: datetime.end(new Date(+targetDate))
    });
};

util.CustomEvents.mixin(AlldayDblClick);

module.exports = AlldayDblClick;

