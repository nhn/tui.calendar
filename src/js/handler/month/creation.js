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
var domevent = require('../../common/domevent');
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
     * To prevent dblclick and dragend event from occuring together
     * @type {boolean}
     */
    this._blockDblClick = false;

    /**
     * @type {MonthCreationGuide}
     */
    this.guide = new Guide(this);

    domevent.on(monthView.container, 'dblclick', this._onDblClick, this);
    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destructor
 */
MonthCreation.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.guide.destroy();

    if (this.monthView && this.monthView.container) {
        domevent.off(this.monthView.container, 'dblclick', this._onDblClick, this);
    }

    this.dragHandler = this.monthView = this.baseController =
        this.getEventData = this._cache = this.guide = null;
};

/**
 * Fire before create event
 * @fires {MonthCreation#beforeCreateEvent}
 * @param {object} dateRange - cache data from single dragging session
 */
MonthCreation.prototype._createEvent = function(dateRange) {
    var times = [
            Number(dateRange.starts),
            Number(dateRange.ends)
        ].sort(array.compare.num.asc),
        starts = new TZDate(times[0]),
        ends = datetime.end(new TZDate(times[1]));

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
        ends: ends,
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

    this._blockDblClick = true;

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
    var self = this;
    var eventData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    setTimeout(function() {
        self._blockDblClick = false;
    }, 0);

    if (!this.getEventData) {
        return;
    }

    eventData = this.getEventData(dragEndEvent.originEvent);

    if (eventData) {
        cache.ends = new TZDate(Number(eventData.date));
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
MonthCreation.prototype._onDblClick = function(e) {
    var eventData, targetDate;

    if (this._blockDblClick || !isElementWeekdayEvent(e.target)) {
        return;
    }

    eventData = getMousePosData(this.monthView)(e);
    targetDate = eventData.date;

    this.fire('monthCreationDblClick', eventData);

    this._createEvent({
        starts: targetDate,
        ends: datetime.end(targetDate)
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
