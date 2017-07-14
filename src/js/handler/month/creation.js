/**
 * @fileoverview Creation handler for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;

var config = require('../../config');
var datetime = require('../../common/datetime');
var array = require('../../common/array');
var domutil = require('../../common/domutil');
var getMousePosData = require('./core');
var Guide = require('./creationGuide');
var TZDate = require('../../common/timezone').Date;

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
    dragHandler.on('click', this._onClick, this);
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
 * @param {object} dateRange - cache data from single dragging session
 */
MonthCreation.prototype._createEvent = function(dateRange) {
    /**
     * @event {MonthCreation#beforeCreateEvent}
     * @type {object}
     * @property {boolean} isAllDay - whether creating event is allday?
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeCreateEvent', {
        isAllDay: dateRange.isAllDay,
        starts: dateRange.starts,
        ends: dateRange.ends,
        guide: this.guide.guide
    });
};

/**
 * DragStart event handler
 * @fires {MonthCreation#monthCreationDragstart}
 * @param {object} dragStartEvent - dragStart event data
 */
MonthCreation.prototype._onDragStart = function(dragStartEvent) {
    var eventData;

    if (!isElementWeekdayEvent(dragStartEvent.target)) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getEventData = getMousePosData(this.monthView);

    eventData = this.getEventData(dragStartEvent.originEvent);

    this._cache = {
        starts: new TZDate(Number(eventData.date))
    };

    /**
     * @event {MonthCreation#monthCreationDragstart}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthCreationDragstart', eventData);
};

/**
 * Drag event handler
 * @fires {MonthCreation#monthCreationDrag}
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
     * @event {MonthCreation#monthCreationDrag}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthCreationDrag', eventData);
};

/**
 * DragEnd event handler
 * @fires {MonthCreation#monthCreationDragend}
 * @param {object} dragEndEvent - drag end event data
 */
MonthCreation.prototype._onDragEnd = function(dragEndEvent) {
    var cache = this._cache;
    var eventData;
    var times;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    if (!this.getEventData) {
        return;
    }

    eventData = this.getEventData(dragEndEvent.originEvent);

    if (eventData) {
        cache.ends = new TZDate(Number(eventData.date));
        cache.isAllDay = true;

        times = [
            Number(cache.starts),
            Number(cache.ends)
        ].sort(array.compare.num.asc);

        cache.starts = new TZDate(times[0]);
        cache.ends = datetime.end(new TZDate(times[1]));

        this._createEvent(cache);
    }

    /**
     * @event {MonthCreation#monthCreationDragend}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthCreationDragend', eventData);

    this.getEventData = this._cache = null;
};

/**
 * DragStart event handler
 * @fires {MonthCreation#monthCreationDragstart}
 * @param {MouseEvent} e - Native MouseEvent
 */
MonthCreation.prototype._onClick = function(e) {
    var eventData, now, starts, ends, hours, minutes;

    if (!isElementWeekdayEvent(e.target)) {
        return;
    }

    eventData = getMousePosData(this.monthView)(e.originEvent);

    this.fire('monthCreationClick', eventData);

    now = new TZDate();
    starts = new TZDate(Number(eventData.date));
    ends = new TZDate(Number(eventData.date));

    hours = now.getHours();
    minutes = now.getMinutes();
    if (minutes <= 30) {
        minutes = 30;
    } else {
        hours += 1;
        minutes = 0;
    }
    starts.setHours(hours, minutes, 0, 0);
    ends.setHours(hours + 1, minutes, 0, 0);

    this._createEvent({
        starts: starts,
        ends: ends,
        isAllDay: false
    });
};

/**
 * Returns whether the given element is Weekday-Event.
 * @param {HTMLElement} el - target element
 * @returns {boolean}
 */
function isElementWeekdayEvent(el) {
    return domutil.hasClass(el, config.classname('weekday-events'));
}

util.CustomEvents.mixin(MonthCreation);

module.exports = MonthCreation;
