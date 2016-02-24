/**
 * @fileoverview Creation handler for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;

var config = require('../../config'),
    datetime = require('../../common/datetime'),
    array = require('../../common/array'),
    domutil = require('../../common/domutil'),
    getMousePosData = require('./core'),
    Guide = require('./creationGuide');

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
    this.getEventData = null;

    /**
     * Cache for dragging session
     * @type {object}
     */
    this._cache = null;

    /**
     * @type {MonthCreationGuide}
     */
    this.guide = new Guide(this);

    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destructor
 */
MonthCreation.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.guide.destroy();

    this.dragHandler = this.monthView = this.baseController =
        this.getEventData = this._cache = this.guide = null;
};

/**
 * Fire before create event
 * @fires {MonthCreation#beforeCreateEvent}
 * @param {object} eventCache - cache data from single dragging session
 */
MonthCreation.prototype._createEvent = function(eventCache) {
    var times = [
            Number(eventCache.starts),
            Number(eventCache.ends)
        ].sort(array.compare.num.asc),
        starts = new Date(times[0]),
        ends = datetime.end(new Date(times[1]));

    /**
     * @event {MonthCreation#beforeCreateEvent}
     * @type {object}
     * @property {boolean} isAllDay - whether creating event is allday?
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeCreateEvent', {
        isAllDay: true,
        starts: starts,
        ends: ends
    });
};

/**
 * DragStart event handler
 * @fires {MonthCreation#month_creation_dragstart}
 * @param {object} dragStartEvent - dragStart event data
 */
MonthCreation.prototype._onDragStart = function(dragStartEvent) {
    var target = dragStartEvent.target,
        eventData;

    if (!domutil.hasClass(target, config.classname('weekday-events'))) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getEventData = getMousePosData(this.monthView);

    eventData = this.getEventData(dragStartEvent.originEvent);

    this._cache = {
        starts: new Date(Number(eventData.date))
    };

    /**
     * @event {MonthCreation#month_creation_dragstart}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('month_creation_dragstart', eventData);
};

/**
 * Drag event handler
 * @fires {MonthCreation#month_creation_drag}
 * @param {object} dragEvent - drag event data
 */
MonthCreation.prototype._onDrag = function(dragEvent) {
    var eventData;

    if (!this.getEventData) {
        return;
    }

    eventData = this.getEventData(dragEvent.originEvent);

    if (!eventData) {
        return;
    }

    /**
     * @event {MonthCreation#month_creation_drag}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('month_creation_drag', eventData);
};

/**
 * DragEnd event handler
 * @fires {MonthCreation#month_creation_dragend}
 * @param {object} dragEndEvent - drag end event data
 */
MonthCreation.prototype._onDragEnd = function(dragEndEvent) {
    var cache = this._cache,
        eventData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    if (!this.getEventData) {
        return;
    }

    eventData = this.getEventData(dragEndEvent.originEvent);

    if (eventData) {
        cache.ends = new Date(Number(eventData.date));
        this._createEvent(cache);
    }

    /**
     * @event {MonthCreation#month_creation_dragend}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('month_creation_dragend', eventData);

    this.getEventData = this._cache = null;
};

util.CustomEvents.mixin(MonthCreation);

module.exports = MonthCreation;

