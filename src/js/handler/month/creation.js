/**
 * @fileoverview Creation handler for month view
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');

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
 * @param {Options} [options] - calendar Options
 */
function MonthCreation(dragHandler, monthView, baseController, options) {
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

    /**
     * @type {boolean}
     */
    this._disableDblClick = options.disableDblClick;

    /**
     * @type {boolean}
     */
    this._disableClick = options.disableClick;

    dragHandler.on('dragStart', this._onDragStart, this);
    dragHandler.on('click', this._onClick, this);

    if (this._disableDblClick) {
        CLICK_DELAY = 0;
    } else {
        domevent.on(monthView.container, 'dblclick', this._onDblClick, this);
    }
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
     * @property {boolean} isAllDay - whether schedule is fired in allday view area?
     * @property {Date} start - select start time
     * @property {Date} end - select end time
     * @property {TimeCreationGuide} guide - TimeCreationGuide instance
     * @property {string} triggerEventName - event name
     */
    this.fire('beforeCreateSchedule', {
        isAllDay: eventData.isAllDay,
        start: eventData.start,
        end: eventData.end,
        guide: this.guide.guide,
        triggerEventName: eventData.triggerEvent
    });
};

/**
 * DragStart event handler
 * @fires {MonthCreation#monthCreationDragstart}
 * @param {object} dragStartEvent - dragStart event data
 */
MonthCreation.prototype._onDragStart = function(dragStartEvent) {
    var eventData;

    if (!isElementWeekdayGrid(dragStartEvent.target)) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getScheduleData = getMousePosDate(this.monthView);

    eventData = this.getScheduleData(dragStartEvent.originEvent);

    this._cache = {
        start: new TZDate(eventData.date)
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
        cache.end = new TZDate(eventData.date);
        cache.isAllDay = true;

        times = [
            cache.start,
            cache.end
        ].sort(array.compare.num.asc);

        cache.start = new TZDate(times[0]);
        cache.end = datetime.end(times[1]);

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

    if (!isElementWeekdayGrid(e.target)) {
        return;
    }

    eventData = getMousePosDate(this.monthView)(e);

    this.fire('monthCreationClick', eventData);

    range = this._adjustStartAndEndTime(new TZDate(eventData.date), new TZDate(eventData.date));

    this._createSchedule({
        start: range.start,
        end: range.end,
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

    if (!isElementWeekdayGrid(e.target) || this._disableClick) {
        return;
    }

    eventData = getMousePosDate(this.monthView)(e.originEvent);

    this._requestOnClick = true;
    setTimeout(function() {
        if (self._requestOnClick) {
            self.fire('monthCreationClick', eventData);

            range = self._adjustStartAndEndTime(new TZDate(eventData.date), new TZDate(eventData.date));

            self._createSchedule({
                start: range.start,
                end: range.end,
                isAllDay: false,
                triggerEvent: eventData.triggerEvent
            });
        }
        self._requestOnClick = false;
    }, CLICK_DELAY);
};

/**
 * Adjust time to our o'clock
 * @param {TZDate} start - start time
 * @param {TZDate} end - end time
 * @returns {Object} start and end
 */
MonthCreation.prototype._adjustStartAndEndTime = function(start, end) {
    var now = new TZDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    // adjust start to less time. Adjusting had been greater time in monthly view when clicking grid
    if (minutes <= 30) {
        minutes = 0;
    } else {
        minutes = 30;
    }
    start.setHours(hours, minutes, 0, 0);
    end.setHours(hours + 1, minutes, 0, 0);

    return {
        start: start,
        end: end
    };
};

/**
 * Invoke creation click
 * @param {Schedule} schedule - schedule instance
 */
MonthCreation.prototype.invokeCreationClick = function(schedule) {
    var eventData = {
        model: schedule
    };

    this.fire('monthCreationClick', eventData);

    this._createSchedule({
        start: schedule.start,
        end: schedule.end,
        isAllDay: schedule.isAllDay,
        triggerEvent: 'manual'
    });
};

/**
 * Returns whether the given element is Weekday-Schedule.
 * @param {HTMLElement} el - target element
 * @returns {boolean}
 */
function isElementWeekdayGrid(el) {
    return domutil.closest(el, config.classname('.weekday-grid'))
        && !domutil.closest(el, config.classname('.weekday-exceed-in-month'));
}

util.CustomEvents.mixin(MonthCreation);

module.exports = MonthCreation;
