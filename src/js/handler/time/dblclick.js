/**
 * @fileoverview Double click handler for time view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var domevent = require('../../common/domevent'),
    domutil = require('../../common/domutil'),
    datetime = require('../../common/datetime'),
    common = require('../../common/common'),
    config = require('../../config');

/**
 * @constructor
 * @implements {Handler}
 * @mixes util.CustomEvents
 * @param {TimeGrid} timeGridView - timeGrid view instance
 */
function TimeDblClick(timeGridView) {
    this.timeGridView = timeGridView;

    domevent.on(timeGridView.container, 'dblclick', this._onDblClick, this);
}

/**
 * Destroy handler
 */
TimeDblClick.prototype.destroy = function() {
    var timeGridView = this.timeGridView;

    if (!timeGridView || !timeGridView.container) {
        return;
    }

    domevent.off(timeGridView.container, 'dblclick', this._onDblClick, this);
    this.timeGridView = null;
};

/**
 * Check target element is has privilege for handle this handler
 * @param {HTMLElement} target - The element to check
 * @returns {(boolean|Time)} - return Time view instance when satiate condition.
 */
TimeDblClick.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (!~cssClass.indexOf(config.classname('time-date'))) {
        return false;
    }

    matches = cssClass.match(config.time.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.childs.items, matches[1]);
};

/**
 * Double click event hander
 * @fires TimeDblclick#beforeCreateEvent
 * @param {MouseEvent} e - mouse event for double click
 */
TimeDblClick.prototype._onDblClick = function(e) {
    var timeView = this.checkExpectedCondition(e.srcElement || e.target),
        targetDate, mousePosY, viewHeight, renderHourRange,
        relativeTime, relativeHour, relativeMinutes,
        newStart, newEnd;

    if (!timeView) {
        return;
    }

    targetDate = datetime.start(datetime.parse(timeView.options.ymd));
    mousePosY = domevent.getMousePosition(e, timeView.container)[1];
    viewHeight = timeView.getViewBound().height;
    renderHourRange = util.range(timeView.options.hourStart, timeView.options.hourEnd);

    relativeTime = new Date(+common.ratio(viewHeight, (renderHourRange.length * datetime.MILLISECONDS_PER_HOUR), mousePosY));
    relativeHour = relativeTime.getUTCHours();
    relativeMinutes = common.nearest(relativeTime.getUTCMinutes(), [0, 60]) / 2;
    targetDate.setHours(relativeHour, relativeMinutes);

    newStart = new Date(+targetDate);
    newEnd = new Date(Math.min((+targetDate + datetime.MILLISECONDS_PER_HOUR), +datetime.end(new Date(+targetDate))));

    /**
     * @event {TimeDblClick#beforeCreateEvent}
     * @type {object}
     * @property {boolean} isAllDay - whether event is fired in allday view area?
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeCreateEvent', {
        isAllDay: false,
        starts: newStart,
        ends: newEnd
    });
};

util.CustomEvents.mixin(TimeDblClick);

module.exports = TimeDblClick;

