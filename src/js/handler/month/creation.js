/**
 * @fileoverview Creation handler for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;

var config = require('../../config'),
    domutil = require('../../common/domutil'),
    core = require('./core');

/**
 * @constructor
 * @param {Drag} dragHandler - Drag handler instance.
 * @param {Month} monthView - Month view instance.
 * @param {Base} baseController - Base controller instance.
 */
function MonthCreation(dragHandler, monthView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {Month}
     */
    this.monthView = monthView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {function}
     */
    this.getDate = null;

    /**
     * Cache for dragging session
     * @type {object}
     */
    this._cache = null;

    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destructor
 */
MonthCreation.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.monthView = this.baseController = this.dragHandler = null;
};

/**
 * Fire before create event
 * @fires {MonthCreation#beforeCreateEvent}
 * @param {object} eventCache - cache data from single dragging session
 */
MonthCreation.prototype._createEvent = function(eventCache) {
    /**
     * @event {MonthCreation#beforeCreateEvent}
     * @type {object}
     * @property {boolean} isAllDay - whether creating event is allday?
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeCreateEvent', {
        isAllDay: true,
        starts: eventCache.dragStartDate,
        ends: eventCache.dragEndDate
    });
};

/**
 * DragStart event handler
 * @param {object} dragStartEvent - dragStart event data
 */
MonthCreation.prototype._onDragStart = function(dragStartEvent) {
    var target = dragStartEvent.target;

    if (!domutil.hasClass(target, config.classname('weekday-events'))) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getDate = core(this.monthView);

    this._cache = {
        dragStartDate: this.getDate(dragStartEvent.originEvent)
    };
};

/**
 * Drag event handler
 * @param {object} dragEvent - drag event data
 */
MonthCreation.prototype._onDrag = function(dragEvent) {
    var date;

    if (!this.getDate) {
        return;
    }

    date = this.getDate(dragEvent.originEvent);
    //TODO: creation guide
};

/**
 * DragEnd event handler
 * @param {object} dragEndEvent - drag end event data
 */
MonthCreation.prototype._onDragEnd = function(dragEndEvent) {
    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    if (!this.getDate) {
        return;
    }

    this._cache.dragEndDate = this.getDate(dragEndEvent.originEvent);

    this._createEvent(this._cache);

    this.getDateByMouseEvent = null;

    this._cache = null;
};

util.CustomEvents.mixin(MonthCreation);

module.exports = MonthCreation;

