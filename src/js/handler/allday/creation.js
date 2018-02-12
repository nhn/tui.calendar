/**
 * @fileoverview Handler module for WeekdayInWeek view's creation actions.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = require('tui-code-snippet');
var config = require('../../config');
var datetime = require('../../common/datetime');
var common = require('../../common/common');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var alldayCore = require('./core');
var AlldayCreationGuide = require('./creationGuide');
var TZDate = require('../../common/timezone').Date;

var CLICK_DELAY = 300;

/**
 * @constructor
 * @implements {Handler}
 * @mixes AlldayCore
 * @mixes CutomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - Allday view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function AlldayCreation(dragHandler, alldayView, baseController) {
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * allday view instance.
     * @type {Allday}
     */
    this.alldayView = alldayView;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {function}
     */
    this.getScheduleDataFunc = null;

    /**
     * @type {AlldayCreationGuide}
     */
    this.guide = new AlldayCreationGuide(this);

    /**
     * @type {boolean}
     */
    this._requestOnClick = false;

    dragHandler.on('dragStart', this._onDragStart, this);
    dragHandler.on('click', this._onClick, this);
    domevent.on(alldayView.container, 'dblclick', this._onDblClick, this);
}

/**
 * Destroy method
 */
AlldayCreation.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);

    if (this.alldayView && this.alldayView.container) {
        domevent.off(this.alldayView.container, 'dblclick', this._onDblClick, this);
    }

    this.dragHandler = this.alldayView = this.baseController = this.getScheduleDataFunc = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|WeekdayInWeek} return WeekdayInWeek view instance when satiate condition.
 */
AlldayCreation.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (cssClass !== config.classname('weekday-schedules')) {
        return false;
    }

    target = target.parentNode;
    cssClass = domutil.getClass(target);
    matches = cssClass.match(config.allday.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.alldayView.children.items, matches[1]);
};

/**
 * Request schedule model creation to controller by custom schedules.
 * @fires {AlldayCreation#beforeCreateSchedule}
 * @param {object} scheduleData - schedule data from AlldayCreation module.
 */
AlldayCreation.prototype._createSchedule = function(scheduleData) {
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

    start = new TZDate(dateRange[startXIndex].getTime());
    end = datetime.end(dateRange[xIndex]);

    /**
     * @event {AlldayCreation#beforeCreateSchedule}
     * @type {object}
     * @property {boolean} isAllDay - whether schedule is fired in allday view area?
     * @property {Date} start - select start time
     * @property {Date} end - select end time
     * @property {TimeCreationGuide} guide - TimeCreationGuide instance
     * @property {string} triggerEventName - event name
     */
    this.fire('beforeCreateSchedule', {
        isAllDay: true,
        start: start,
        end: end,
        guide: this.guide,
        triggerEventName: scheduleData.triggerEvent
    });
};

/**
 * DragStart event handler method.
 * @emits AlldayCreation#alldayCreationDragstart
 * @param {object} dragStartEventData - Drag#dragStart event handler schedule data.
 */
AlldayCreation.prototype._onDragStart = function(dragStartEventData) {
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

    getScheduleDataFunc = this._retriveScheduleData(this.alldayView, dragStartEventData.originEvent);
    this.getScheduleDataFunc = getScheduleDataFunc;

    scheduleData = getScheduleDataFunc(dragStartEventData.originEvent);

    /**
     * @event AlldayCreation#alldayCreationDragstart
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('alldayCreationDragstart', scheduleData);
};

/**
 * Drag event handler method.
 * @emits AlldayCreation#alldayCreationDrag
 * @param {object} dragEventData - Drag#drag event handler scheduledata.
 */
AlldayCreation.prototype._onDrag = function(dragEventData) {
    var getScheduleDataFunc = this.getScheduleDataFunc,
        scheduleData;

    if (!getScheduleDataFunc) {
        return;
    }

    scheduleData = getScheduleDataFunc(dragEventData.originEvent);

    /**
     * @event AlldayCreation#alldayCreationDrag
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('alldayCreationDrag', scheduleData);
};

/**
 * DragEnd event hander method.
 * @emits AlldayCreation#alldayCreationDragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 */
AlldayCreation.prototype._onDragEnd = function(dragEndEventData, overrideEventName) {
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
     * @event AlldayCreation#alldayCreationDragend
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'alldayCreationDragend', scheduleData);

    this.getScheduleDataFunc = null;
};

/**
 * Click event handler method.
 * @emits AlldayCreation#alldayCreationClick
 * @param {object} clickEventData - Drag#Click event handler data.
 */
AlldayCreation.prototype._onClick = function(clickEventData) {
    var self = this;
    var getScheduleDataFunc, scheduleData;

    if (!this.checkExpectedCondition(clickEventData.target)) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(this.alldayView, clickEventData.originEvent);
    scheduleData = getScheduleDataFunc(clickEventData.originEvent);

    this._requestOnClick = true;
    setTimeout(function() {
        if (self._requestOnClick) {
            self.fire('alldayCreationClick', scheduleData);
            self._createSchedule(scheduleData);
        }
        self._requestOnClick = false;
    }, CLICK_DELAY);
};

/**
 * Dblclick event handler method.
 * @emits AlldayCreation#alldayCreationClick
 * @param {object} clickEventData - Drag#Click event handler data.
 */
AlldayCreation.prototype._onDblClick = function(clickEventData) {
    var getScheduleDataFunc, scheduleData;

    if (!this.checkExpectedCondition(clickEventData.target)) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(this.alldayView, clickEventData);
    scheduleData = getScheduleDataFunc(clickEventData);

    this.fire('alldayCreationClick', scheduleData);

    this._createSchedule(scheduleData);

    this._requestOnClick = false;
};

common.mixin(alldayCore, AlldayCreation);
util.CustomEvents.mixin(AlldayCreation);

module.exports = AlldayCreation;
