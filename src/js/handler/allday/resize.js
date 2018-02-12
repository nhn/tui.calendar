/**
 * @fileoverview Resize handler module for Allday view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = require('tui-code-snippet');
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var common = require('../../common/common');
var AlldayCore = require('./core');
var AlldayResizeGuide = require('./resizeGuide');
var TZDate = require('../../common/timezone').Date;

/**
 * @constructor
 * @implements {Handler}
 * @mixes AlldayCore
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - Allday view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function AlldayResize(dragHandler, alldayView, baseController) {
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
     * Temporary variable for dragStart event data.
     * @type {object}
     */
    this._dragStart = null;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);

    /**
     * @type {AlldayResizeGuide}
     */
    this.guide = new AlldayResizeGuide(this);
}

/**
 * Destroy method
 */
AlldayResize.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.alldayView = this.baseController =
        this.guide = this._dragStart = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|WeekdayInWeek} return WeekdayInWeek view instance when satiate condition.
 */
AlldayResize.prototype.checkExpectedCondition = function(target) {
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
    matches = cssClass.match(config.allday.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.alldayView.children.items, matches[1]);
};

/**
 * DragStart event handler.
 * @emits AlldayResize#alldayResizeDragstart
 * @param {object} dragStartEventData - schedule data.
 */
AlldayResize.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        controller = this.baseController,
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

    getScheduleDataFunc = this._retriveScheduleData(this.alldayView, dragStartEventData.originEvent);
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
     * @event AlldayResize#alldayResizeDragstart
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     * @property {Schedule} model - data object of model isntance.
     * @property {HTMLDivElement} scheduleBlockElement - target schedule block element.
     */
    this.fire('alldayResizeDragstart', scheduleData);
};

/**
 * Drag event handler method.
 * @emits AlldayResize#alldayResizeDrag
 * @param {object} dragEventData - Drag#drag event handler scheduledata.
 */
AlldayResize.prototype._onDrag = function(dragEventData) {
    var getScheduleDataFunc = this.getScheduleDataFunc;

    if (!getScheduleDataFunc) {
        return;
    }

    /**
     * @event AlldayResize#alldayResizeDrag
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('alldayResizeDrag', getScheduleDataFunc(dragEventData.originEvent));
};

/**
 * Request update schedule instance to base controller.
 * @fires AlldayResize#beforeUpdateSchedule
 * @param {object} scheduleData - schedule data from AlldayResize handler.
 */
AlldayResize.prototype._updateSchedule = function(scheduleData) {
    var schedule = scheduleData.targetModel,
        dateOffset = scheduleData.xIndex - scheduleData.dragStartXIndex,
        newEnds = new TZDate(schedule.end.getTime());

    newEnds = new TZDate(newEnds.setDate(newEnds.getDate() + dateOffset));
    newEnds = new TZDate(Math.max(datetime.end(schedule.start).getTime(), newEnds.getTime()));

    /**
     * @event AlldayResize#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to update
     * @property {date} start - start time to update
     * @property {date} end - end time to update
     */
    this.fire('beforeUpdateSchedule', {
        schedule: schedule,
        start: schedule.getStarts(),
        end: newEnds
    });
};

/**
 * DragEnd event hander method.
 * @emits AlldayResize#alldayResizeDragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {?boolean} skipUpdate - true then skip update schedule model.
 */
AlldayResize.prototype._onDragEnd = function(dragEndEventData, overrideEventName, skipUpdate) {
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
     * @event AlldayResize#alldayResizeDragend
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'alldayResizeDragend', scheduleData);

    this.getScheduleDataFunc = this._dragStart = null;
};

/**
 * Click event handler method.
 * @emits AlldayResize#alldayResizeClick
 * @param {object} clickEventData - Drag#Click event handler data.
 */
AlldayResize.prototype._onClick = function(clickEventData) {
    /**
     * @event AlldayResize#alldayResizeClick
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this._onDragEnd(clickEventData, 'alldayResizeClick', true);
};

common.mixin(AlldayCore, AlldayResize);
util.CustomEvents.mixin(AlldayResize);

module.exports = AlldayResize;

