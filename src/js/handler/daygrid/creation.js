/**
 * @fileoverview Handler module for WeekdayInWeek view's creation actions.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var datetime = require('../../common/datetime');
var common = require('../../common/common');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var dayGridCore = require('./core');
var DayGridCreationGuide = require('./creationGuide');
var TZDate = require('../../common/timezone').Date;

var CLICK_DELAY = 300;

/**
 * @constructor
 * @implements {Handler}
 * @mixes dayGridCore
 * @mixes CutomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {DayGrid} [view] - DayGrid view instance.
 * @param {Base} [controller] - Base controller instance.
 * @param {Options} [options] - calendar Options
 */
function DayGridCreation(dragHandler, view, controller, options) {
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * view instance.
     * @type {DayGrid}
     */
    this.view = view;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.controller = controller;

    /**
     * @type {function}
     */
    this.getScheduleDataFunc = null;

    /**
     * @type {DayGridCreationGuide}
     */
    this.guide = new DayGridCreationGuide(this);

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
        domevent.on(view.container, 'dblclick', this._onDblClick, this);
    }
}

/**
 * Destroy method
 */
DayGridCreation.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);

    if (this.view && this.view.container) {
        domevent.off(this.view.container, 'dblclick', this._onDblClick, this);
    }

    this.dragHandler = this.view = this.controller = this.getScheduleDataFunc = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|WeekdayInWeek} return WeekdayInWeek view instance when satiate condition.
 */
DayGridCreation.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target).trim();
    var excludeTarget = true;
    var matches, schedulesElement;

    if (domutil.closest(target, config.classname('.weekday-exceed-in-week'))
        || domutil.closest(target, config.classname('.weekday-collapse-btn'))
    ) {
        return false;
    }

    if (domutil.closest(target, config.classname('.weekday-schedule-block'), excludeTarget)) {
        return false;
    }

    schedulesElement = domutil.closest(target, config.classname('.weekday-schedules'));
    if (!schedulesElement && cssClass !== config.classname('weekday-schedules')) {
        return false;
    }

    target = schedulesElement ? schedulesElement.parentNode : target.parentNode;
    cssClass = domutil.getClass(target);
    matches = cssClass.match(config.daygrid.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.view.children.items, matches[1]);
};

/**
 * Request schedule model creation to controller by custom schedules.
 * @fires {DayGridCreation#beforeCreateSchedule}
 * @param {object} scheduleData - schedule data from DayGridCreation module.
 */
DayGridCreation.prototype._createSchedule = function(scheduleData) {
    var dateRange = scheduleData.range,
        startXIndex = scheduleData.dragStartXIndex,
        xIndex = scheduleData.xIndex,
        start, end;

    // when inverse start, end then change it.
    if (xIndex < startXIndex) {
        startXIndex = xIndex + startXIndex;
        xIndex = startXIndex - xIndex;
        startXIndex = startXIndex - xIndex;
    }

    start = new TZDate(dateRange[startXIndex]);
    end = datetime.end(dateRange[xIndex]);

    /**
     * @event {DayGridCreation#beforeCreateSchedule}
     * @type {object}
     * @property {string} category - schedule category
     * @property {boolean} isAllDay - whether schedule is fired in view area?
     * @property {Date} start - select start time
     * @property {Date} end - select end time
     * @property {DayGridCreationGuide} guide - DayGridCreationGuide instance
     * @property {string} triggerEventName - event name
     */
    this.fire('beforeCreateSchedule', {
        category: this.view.options.viewName,
        isAllDay: true,
        start: start,
        end: end,
        guide: this.guide,
        triggerEventName: scheduleData.triggerEvent
    });
};

/**
 * DragStart event handler method.
 * @emits DayGridCreation#dragstart
 * @param {object} dragStartEventData - Drag#dragStart event handler schedule data.
 */
DayGridCreation.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        getScheduleDataFunc,
        scheduleData;

    if (!result) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    getScheduleDataFunc = this._retriveScheduleData(this.view, dragStartEventData.originEvent);
    this.getScheduleDataFunc = getScheduleDataFunc;

    scheduleData = getScheduleDataFunc(dragStartEventData.originEvent);

    /**
     * @event DayGridCreation#dragstart
     * @type {object}
     * @property {DayGridView} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('dragstart', scheduleData);
};

/**
 * Drag event handler method.
 * @emits DayGridCreation#drag
 * @param {object} dragEventData - Drag#drag event handler scheduledata.
 */
DayGridCreation.prototype._onDrag = function(dragEventData) {
    var getScheduleDataFunc = this.getScheduleDataFunc,
        scheduleData;

    if (!getScheduleDataFunc) {
        return;
    }

    scheduleData = getScheduleDataFunc(dragEventData.originEvent);

    /**
     * @event DayGridCreation#drag
     * @type {object}
     * @property {DayGridView} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('drag', scheduleData);
};

/**
 * DragEnd event hander method.
 * @emits DayGridCreation#dragend
 * @param {object} dragEndEventData - Drag#dragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 */
DayGridCreation.prototype._onDragEnd = function(dragEndEventData, overrideEventName) {
    var getScheduleDataFunc = this.getScheduleDataFunc;
    var scheduleData;

    if (!getScheduleDataFunc) {
        return;
    }

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    scheduleData = getScheduleDataFunc(dragEndEventData.originEvent);

    this._createSchedule(scheduleData);

    /**
     * @event DayGridCreation#dragend
     * @type {object}
     * @property {DayGridView} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'dragend', scheduleData);

    this.getScheduleDataFunc = null;
};

/**
 * Click event handler method.
 * @emits DayGridCreation#click
 * @param {object} clickEventData - Drag#click event handler data.
 */
DayGridCreation.prototype._onClick = function(clickEventData) {
    var self = this;
    var getScheduleDataFunc, scheduleData;

    if (!this.checkExpectedCondition(clickEventData.target) || this._disableClick) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(this.view, clickEventData.originEvent);
    scheduleData = getScheduleDataFunc(clickEventData.originEvent);

    this._requestOnClick = true;
    setTimeout(function() {
        if (self._requestOnClick) {
            self.fire('click', scheduleData);
            self._createSchedule(scheduleData);
        }
        self._requestOnClick = false;
    }, CLICK_DELAY);
};

/**
 * Dblclick event handler method.
 * @emits DayGridCreation#click
 * @param {object} clickEventData - Drag#Click event handler data.
 */
DayGridCreation.prototype._onDblClick = function(clickEventData) {
    var getScheduleDataFunc, scheduleData;

    if (!this.checkExpectedCondition(clickEventData.target)) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(this.view, clickEventData);
    scheduleData = getScheduleDataFunc(clickEventData);

    this.fire('click', scheduleData);

    this._createSchedule(scheduleData);

    this._requestOnClick = false;
};

/**
 * Invoke creation click
 * @param {Schedule} schedule - schedule instance
 */
DayGridCreation.prototype.invokeCreationClick = function(schedule) {
    var scheduleData = this._retriveScheduleDataFromDate(this.view, schedule.start);

    this.fire('click', scheduleData);

    this._createSchedule(scheduleData);
};

common.mixin(dayGridCore, DayGridCreation);
util.CustomEvents.mixin(DayGridCreation);

module.exports = DayGridCreation;
