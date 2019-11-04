/**
 * @fileoverview Resize handler module for DayGrid view.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var common = require('../../common/common');
var dayGridCore = require('./core');
var DayGridResizeGuide = require('./resizeGuide');
var TZDate = require('../../common/timezone').Date;

/**
 * @constructor
 * @implements {Handler}
 * @mixes dayGridCore
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {DayGrid} [view] - view instance.
 * @param {Base} [controller] - Base controller instance.
 */
function DayGridResize(dragHandler, view, controller) {
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
     * Temporary variable for dragStart event data.
     * @type {object}
     */
    this._dragStart = null;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);

    /**
     * @type {DayGridResizeGuide}
     */
    this.guide = new DayGridResizeGuide(this);
}

/**
 * Destroy method
 */
DayGridResize.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.view = this.controller =
        this.guide = this._dragStart = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|WeekdayInWeek} return WeekdayInWeek view instance when satiate condition.
 */
DayGridResize.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (!~cssClass.indexOf(config.classname('weekday-resize-handle'))) {
        return false;
    }

    target = domutil.closest(target, config.classname('.weekday'));

    if (!target) {
        return false;
    }

    cssClass = domutil.getClass(target);
    matches = cssClass.match(config.daygrid.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.view.children.items, matches[1]);
};

/**
 * DragStart event handler.
 * @emits DayGridResize#dragstart
 * @param {object} dragStartEventData - schedule data.
 */
DayGridResize.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        controller = this.controller,
        scheduleBlockElement,
        modelID,
        targetModel,
        getScheduleDataFunc,
        scheduleData;

    if (!result) {
        return;
    }

    scheduleBlockElement = domutil.closest(target, config.classname('.weekday-schedule-block'));
    modelID = domutil.getData(scheduleBlockElement, 'id');
    targetModel = controller.schedules.items[modelID];

    if (!targetModel) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(this.view, dragStartEventData.originEvent);
    this.getScheduleDataFunc = getScheduleDataFunc;
    scheduleData = this._dragStart = getScheduleDataFunc(dragStartEventData.originEvent);

    util.extend(scheduleData, {
        scheduleBlockElement: scheduleBlockElement,
        model: targetModel
    });

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event DayGridResize#dragstart
     * @type {object}
     * @property {View} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     * @property {Schedule} model - data object of model isntance.
     * @property {HTMLDivElement} scheduleBlockElement - target schedule block element.
     */
    this.fire('dragstart', scheduleData);
};

/**
 * Drag event handler method.
 * @emits DayGridResize#drag
 * @param {object} dragEventData - Drag#drag event handler scheduledata.
 */
DayGridResize.prototype._onDrag = function(dragEventData) {
    var getScheduleDataFunc = this.getScheduleDataFunc;

    if (!getScheduleDataFunc) {
        return;
    }

    /**
     * @event DayGridResize#drag
     * @type {object}
     * @property {View} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('drag', getScheduleDataFunc(dragEventData.originEvent));
};

/**
 * Request update schedule instance to base controller.
 * @fires DayGridResize#beforeUpdateSchedule
 * @param {object} scheduleData - schedule data from DayGridResize handler.
 */
DayGridResize.prototype._updateSchedule = function(scheduleData) {
    var schedule = scheduleData.targetModel,
        dateOffset = scheduleData.xIndex - scheduleData.dragStartXIndex,
        newEnds = new TZDate(schedule.end);
    var changes;

    newEnds = newEnds.addDate(dateOffset);
    newEnds = new TZDate(common.maxDate(datetime.end(schedule.start), newEnds));

    changes = common.getScheduleChanges(
        schedule,
        ['end'],
        {end: newEnds}
    );

    /**
     * @event DayGridResize#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - The original schedule instance
     * @property {Date} start - Deprecated: start time to update
     * @property {Date} end - Deprecated: end time to update
     * @property {object} changes - end time to update
     *  @property {date} end - end time to update
     */
    this.fire('beforeUpdateSchedule', {
        schedule: schedule,
        changes: changes,
        start: schedule.getStarts(),
        end: newEnds
    });
};

/**
 * DragEnd event hander method.
 * @emits DayGridResize#dragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {?boolean} skipUpdate - true then skip update schedule model.
 */
DayGridResize.prototype._onDragEnd = function(dragEndEventData, overrideEventName, skipUpdate) {
    var getScheduleDataFunc = this.getScheduleDataFunc,
        dragStart = this._dragStart,
        scheduleData;

    if (!getScheduleDataFunc || !dragStart) {
        return;
    }

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    scheduleData = getScheduleDataFunc(dragEndEventData.originEvent);
    util.extend(scheduleData, {
        targetModel: dragStart.model
    });

    if (!skipUpdate) {
        this._updateSchedule(scheduleData);
    }

    /**
     * @event DayGridResize#dragend
     * @type {object}
     * @property {View} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'dragend', scheduleData);

    this.getScheduleDataFunc = this._dragStart = null;
};

/**
 * Click event handler method.
 * @emits DayGridResize#click
 * @param {object} clickEventData - Drag#Click event handler data.
 */
DayGridResize.prototype._onClick = function(clickEventData) {
    /**
     * @event DayGridResize#click
     * @type {object}
     * @property {View} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this._onDragEnd(clickEventData, 'click', true);
};

common.mixin(dayGridCore, DayGridResize);
util.CustomEvents.mixin(DayGridResize);

module.exports = DayGridResize;
