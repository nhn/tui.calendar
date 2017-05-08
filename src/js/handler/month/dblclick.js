/**
 * @fileoverview Double click handler for month view
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var datetime = require('../../common/datetime');
var domevent = require('../../common/domevent');
var MonthGuide = require('../../handler/month/guide');
var getMousePosData = require('./core');

/**
 * @constructor
 * @implements {Handler}
 * @mixes util.CustomEvents
 * @param {Allday} monthView - instance of allday view
 */
function DblClick(monthView) {
    /**
     * @type {Allday}
     */
    this.monthView = monthView;

    domevent.on(monthView.container, 'dblclick', this._onDblClick, this);
}

/**
 * Destroy handler
 */
DblClick.prototype.destroy = function() {
    if (!this.monthView || !this.monthView.container) {
        return;
    }

    domevent.off(this.monthView.container, 'dblclick', this._onDblClick, this);

    this.monthView = null;
};

/**
 * Dblclick event hander
 * @fires DblClick#beforeCreateEvent
 * @param {MouseEvent} e - dblclick mouse event object
 */
DblClick.prototype._onDblClick = function(e) {
    var eventData = getMousePosData(this.monthView)(e);
    var targetDate;

    if (!eventData) {
        return;
    }

    this.guide = new MonthGuide(null, this.monthView);
    this.guide.start(eventData);
    targetDate = eventData.date;

    /**
     * @event {DblClick#beforeCreateEvent}
     * @type {object}
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeCreateEvent', {
        isAllDay: true,
        guide: this.guide,
        starts: targetDate,
        ends: datetime.end(targetDate)
    });
};

util.CustomEvents.mixin(DblClick);

module.exports = DblClick;
