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
var getMousePosDate = require('./core');
var Guide = require('./creationGuide');
var TZDate = require('../../common/timezone').Date;

var CLICK_DELAY = 300;

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
    this.getScheduleData = null;

    /**
     * Cache for dragging session
     * @type {object}
     */
    this._cache = null;

    /**
     * @type {MonthCreationGuide}
     */
    this.guide = new Guide(this);

    /**
     * @type {boolean}
     */
    this._requestOnClick = false;

    dragHandler.on('dragStart', this._onDragStart, this);
    dragHandler.on('click', this._onClick, this);
    domevent.on(monthView.container, 'dblclick', this._onDblClick, this);
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
        this.getScheduleData = this._cache = this.guide = null;
};

/**
 * Fire before create schedule
 * @fires {MonthCreation#beforeCreateSchedule}
 * @param {object} eventData - cache data from single dragging session
 */
MonthCreation.prototype._createSchedule = function(eventData) {
    /**
     * @event {MonthCreation#beforeCreateSchedule}
     * @type {object}
     * @property {boolean} isAllDay - whether creating schedule is allday?
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeCreateSchedule', {
        isAllDay: eventData.isAllDay,
        starts: eventData.starts,
        ends: eventData.ends,
        guide: this.guide.guide,
        triggerEvent: eventData.triggerEvent
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

    this.getScheduleData = getMousePosDate(this.monthView);

    eventData = this.getScheduleData(dragStartEvent.originEvent);

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

    if (!this.getScheduleData) {
        return;
    }

    eventData = this.getScheduleData(dragEvent.originEvent);

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

    if (!this.getScheduleData) {
        return;
    }

    eventData = this.getScheduleData(dragEndEvent.originEvent);

    if (eventData) {
        cache.ends = new TZDate(Number(eventData.date));
        cache.isAllDay = true;

        times = [
            Number(cache.starts),
            Number(cache.ends)
        ].sort(array.compare.num.asc);

        cache.starts = new TZDate(times[0]);
        cache.ends = datetime.end(new TZDate(times[1]));

        this._createSchedule(cache);
    }

    /**
     * @event {MonthCreation#monthCreationDragend}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthCreationDragend', eventData);

    this.getScheduleData = this._cache = null;
};

/**
 * Dblclick event handler
 * @fires {MonthCreation#monthCreationDragstart}
 * @param {MouseEvent} e - Native MouseEvent
 */
MonthCreation.prototype._onDblClick = function(e) {
    var eventData, range;

    if (!isElementWeekdaySchedule(e.target)) {
        return;
    }

    eventData = getMousePosDate(this.monthView)(e);

    this.fire('monthCreationClick', eventData);

    range = adjustStartAndEndTime(new TZDate(Number(eventData.date)), new TZDate(Number(eventData.date)));

    this._createSchedule({
        starts: range.starts,
        ends: range.ends,
        isAllDay: false,
        triggerEvent: eventData.triggerEvent
    });

    this._requestOnClick = false;
};

/**
 * Click event handler
 * @fires {MonthCreation#monthCreationDragstart}
 * @param {MouseEvent} e - Native MouseEvent
 */
MonthCreation.prototype._onClick = function(e) {
    var self = this;
    var eventData, range;

    if (!isElementWeekdaySchedule(e.target)) {
        return;
    }

    eventData = getMousePosDate(this.monthView)(e.originEvent);

    this._requestOnClick = true;
    setTimeout(function() {
        if (self._requestOnClick) {
            self.fire('monthCreationClick', eventData);

            range = adjustStartAndEndTime(new TZDate(Number(eventData.date)), new TZDate(Number(eventData.date)));

            self._createSchedule({
                starts: range.starts,
                ends: range.ends,
                isAllDay: false,
                triggerEvent: eventData.triggerEvent
            });
        }
        self._requestOnClick = false;
    }, CLICK_DELAY);
};

/**
 * Adjust time to half hour or hour o'clock
 * @param {TZDate} starts - start time
 * @param {TZDate} ends - end time
 * @returns {Object} starts and ends
 */
function adjustStartAndEndTime(starts, ends) {
    var now = new TZDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    if (minutes <= 30) {
        minutes = 30;
    } else {
        hours += 1;
        minutes = 0;
    }
    starts.setHours(hours, minutes, 0, 0);
    ends.setHours(hours + 1, minutes, 0, 0);

    return {
        starts: starts,
        ends: ends
    };
}

/**
 * Returns whether the given element is Weekday-Schedule.
 * @param {HTMLElement} el - target element
 * @returns {boolean}
 */
function isElementWeekdaySchedule(el) {
    return domutil.hasClass(el, config.classname('weekday-events'));
}

util.CustomEvents.mixin(MonthCreation);

module.exports = MonthCreation;
