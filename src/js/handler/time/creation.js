/**
 * @fileoverview Handling creation events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var array = require('../../common/array');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var TimeCreationGuide = require('./creationGuide');
var TZDate = require('../../common/timezone').Date;
var timeCore = require('./core');

var CLICK_DELAY = 300;

/**
 * @constructor
 * @implements {Handler}
 * @mixes timeCore
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function TimeCreation(dragHandler, timeGridView, baseController) {
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * TimeGrid view instance.
     * @type {TimeGrid}
     */
    this.timeGridView = timeGridView;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {TimeCreationGuide}
     */
    this.guide = new TimeCreationGuide(this);

    /**
     * Temporary function for single drag session's calc.
     * @type {function}
     */
    this._getScheduleDataFunc = null;

    /**
     * Temporary function for drag start data cache.
     * @type {object}
     */
    this._dragStart = null;

    /**
     * @type {boolean}
     */
    this._requestOnClick = false;

    dragHandler.on('dragStart', this._onDragStart, this);
    dragHandler.on('click', this._onClick, this);
    domevent.on(timeGridView.container, 'dblclick', this._onDblClick, this);
}

/**
 * Destroy method
 */
TimeCreation.prototype.destroy = function() {
    var timeGridView = this.timeGridView;

    this.guide.destroy();
    this.dragHandler.off(this);

    if (timeGridView && timeGridView.container) {
        domevent.off(timeGridView.container, 'dblclick', this._onDblClick, this);
    }

    this.dragHandler = this.timeGridView = this.baseController =
        this._getScheduleDataFunc = this._dragStart = this.guide = null;
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {(boolean|Time)} - return Time view instance when satiate condition.
 */
TimeCreation.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (cssClass === config.classname('time-date-schedule-block-wrap')) {
        target = target.parentNode;
        cssClass = domutil.getClass(target);
    }

    matches = cssClass.match(config.time.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.children.items, matches[1]);
};

/**
 * Drag#dragStart event handler.
 * @emits TimeCreation#timeCreationDragstart
 * @param {object} dragStartEventData - Drag#dragStart event data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeCreation.prototype._onDragStart = function(dragStartEventData, overrideEventName, revise) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        getScheduleDataFunc,
        eventData;

    if (!result) {
        return;
    }

    getScheduleDataFunc = this._getScheduleDataFunc = this._retriveScheduleData(result);
    eventData = this._dragStart = getScheduleDataFunc(dragStartEventData.originEvent);

    if (revise) {
        revise(eventData);
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    /**
     * @event TimeCreation#timeCreationDragstart
     * @type {object}
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     */
    this.fire(overrideEventName || 'timeCreationDragstart', eventData);
};

/**
 * Drag#drag event handler
 * @emits TimeCreation#timeCreationDrag
 * @param {object} dragEventData - event data from Drag#drag.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeCreation.prototype._onDrag = function(dragEventData, overrideEventName, revise) {
    var getScheduleDataFunc = this._getScheduleDataFunc,
        eventData;

    if (!getScheduleDataFunc) {
        return;
    }

    eventData = getScheduleDataFunc(dragEventData.originEvent);

    if (revise) {
        revise(eventData);
    }

    /**
     * @event TimeCreation#timeCreationDrag
     * @type {object}
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     */
    this.fire(overrideEventName || 'timeCreationDrag', eventData);
};

/**
 * @fires TimeCreation#beforeCreateSchedule
 * @param {object} eventData - event data object from TimeCreation#timeCreationDragend
 * or TimeCreation#timeCreationClick
 */
TimeCreation.prototype._createSchedule = function(eventData) {
    var relatedView = eventData.relatedView,
        createRange = eventData.createRange,
        nearestGridTimeY = eventData.nearestGridTimeY,
        baseDate,
        dateStart,
        dateEnd,
        start,
        end;

    if (!createRange) {
        createRange = [
            nearestGridTimeY,
            nearestGridTimeY + datetime.millisecondsFrom('minutes', 30)
        ];
    }

    baseDate = new TZDate(relatedView.getDate());
    dateStart = datetime.start(baseDate);
    dateEnd = datetime.end(baseDate);
    start = Math.max(dateStart.getTime(), createRange[0]);
    end = Math.min(dateEnd.getTime(), createRange[1]);

    /**
     * @event TimeCreation#beforeCreateSchedule
     * @type {object}
     * @property {boolean} isAllDay - whether schedule is fired in allday view area?
     * @property {Date} start - select start time
     * @property {Date} end - select end time
     * @property {TimeCreationGuide} guide - TimeCreationGuide instance
     * @property {string} triggerEventName - event name
     */
    this.fire('beforeCreateSchedule', {
        isAllDay: false,
        start: new TZDate(start),
        end: new TZDate(end),
        guide: this.guide,
        triggerEventName: eventData.triggerEvent
    });
};

/**
 * Drag#dragEnd event handler
 * @emits TimeCreation#timeCreationDragend
 * @param {object} dragEndEventData - event data from Drag#dragend
 */
TimeCreation.prototype._onDragEnd = function(dragEndEventData) {
    var self = this,
        dragStart = this._dragStart;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    /**
     * Function for manipulate event data before firing event
     * @param {object} eventData - event data
     */
    function reviseFunc(eventData) {
        var range = [
            dragStart.nearestGridTimeY,
            eventData.nearestGridTimeY
        ].sort(array.compare.num.asc);
        range[1] += datetime.millisecondsFrom('hour', 0.5);

        eventData.createRange = range;

        self._createSchedule(eventData);
    }

    /**
     * @event TimeCreation#timeCreationDragend
     * @type {object}
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {number[]} createRange - milliseconds range between drag start and end to create.
     */
    this._onDrag(dragEndEventData, 'timeCreationDragend', reviseFunc);

    this._dragStart = this._getScheduleDataFunc = null;
};

/**
 * Drag#click event handler
 * @emits TimeCreation#timeCreationClick
 * @param {object} clickEventData - event data from Drag#click.
 */
TimeCreation.prototype._onClick = function(clickEventData) {
    var self = this;
    var condResult, getScheduleDataFunc, eventData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    condResult = this.checkExpectedCondition(clickEventData.target);
    if (!condResult) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(condResult);
    eventData = getScheduleDataFunc(clickEventData.originEvent);

    this._requestOnClick = true;
    setTimeout(function() {
        if (self._requestOnClick) {
            self.fire('timeCreationClick', eventData);
            self._createSchedule(eventData);
        }
        self._requestOnClick = false;
    }, CLICK_DELAY);
    this._dragStart = this._getScheduleDataFunc = null;
};

/**
 * Dblclick event handler
 * @param {MouseEvent} e - Native MouseEvent
 */
TimeCreation.prototype._onDblClick = function(e) {
    var condResult, getScheduleDataFunc, eventData;

    condResult = this.checkExpectedCondition(e.target);
    if (!condResult) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(condResult);
    eventData = getScheduleDataFunc(e);

    this.fire('timeCreationClick', eventData);

    this._createSchedule(eventData);

    this._requestOnClick = false;
};

/**
 * Invoke creation click
 * @param {Schedule} schedule - schedule instance
 */
TimeCreation.prototype.invokeCreationClick = function(schedule) {
    var opt = this.timeGridView.options,
        range = datetime.range(
            datetime.parse(opt.renderStartDate),
            datetime.parse(opt.renderEndDate),
            datetime.MILLISECONDS_PER_DAY),
        targetDate = schedule.start;
    var getScheduleDataFunc, eventData, timeView;

    util.forEach(range, function(date, index) {
        if (datetime.isSameDate(date, targetDate)) {
            timeView = this.timeGridView.children.toArray()[index];
        }
    }, this);

    getScheduleDataFunc = this._retriveScheduleDataFromDate(timeView);
    eventData = getScheduleDataFunc(schedule.start, schedule.end);

    this.fire('timeCreationClick', eventData);

    this._createSchedule(eventData);
};

timeCore.mixin(TimeCreation);
util.CustomEvents.mixin(TimeCreation);

module.exports = TimeCreation;
