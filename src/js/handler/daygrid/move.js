/**
 * @fileoverview Move handler for DayGrid view.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var common = require('../../common/common');
var domutil = require('../../common/domutil');
var dayGridCore = require('./core');
var DayGridMoveGuide = require('./moveGuide');
var TZDate = require('../../common/timezone').Date;

/**
 * @constructor
 * @implements {Handler}
 * @mixes dayGridCore
 * @mixes CustomEvents
 * @param {Drag} dragHandler - Drag handler instance.
 * @param {DayGrid} view - view instance.
 * @param {Base} controller - Base controller instance.
 */
function DayGridMove(dragHandler, view, controller) {
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
     * Temporary variable for dragstart event data.
     * @type {object}
     */
    this._dragStart = null;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);

    /**
     * @type {DayGridMoveGuide}
     */
    this.guide = new DayGridMoveGuide(this);
}

DayGridMove.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.view = this.controller =
        this.guide = this._dragStart = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|DayGridSchedule} return DayGridSchedule view instance when satiate condition.
 */
DayGridMove.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        parentView,
        matches;

    if (~cssClass.indexOf(config.classname('weekday-resize-handle'))) {
        return false;
    }

    parentView = domutil.closest(target, config.classname('.weekday'));

    if (!parentView) {
        return false;
    }

    cssClass = domutil.getClass(parentView);
    matches = cssClass.match(config.daygrid.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.view.children.items, matches[1]);
};

/**
 * DragStart event handler method.
 * @emits DayGridMove#dragstart
 * @param {object} dragStartEventData - Drag#dragStart event handler event data.
 */
DayGridMove.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        controller = this.controller,
        excludeTarget = true,
        scheduleBlockElement,
        modelID,
        targetModel,
        getScheduleDataFunc,
        scheduleData;

    if (!result) {
        return;
    }

    scheduleBlockElement = domutil.closest(target, config.classname('.weekday-schedule-block'), excludeTarget);
    if (!scheduleBlockElement) {
        return;
    }

    modelID = domutil.getData(scheduleBlockElement, 'id');
    targetModel = controller.schedules.items[modelID];

    if (!targetModel) {
        return;
    }

    if (targetModel.isReadOnly) {
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
     * @event DayGridMove#dragstart
     * @type {object}
     * @property {DayGrid} relatedView - view instance.
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
 * @emits DayGridMove#drag
 * @param {object} dragEventData - Drag#drag event handler eventdata.
 */
DayGridMove.prototype._onDrag = function(dragEventData) {
    var getScheduleDataFunc = this.getScheduleDataFunc;

    if (!getScheduleDataFunc) {
        return;
    }

    /**
     * @schedule DayGridMove#drag
     * @type {object}
     * @property {DayGrid} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('drag', getScheduleDataFunc(dragEventData.originEvent));
};

/**
 * Request update schedule model to base controller.
 * @fires DayGridMove#beforeUpdateSchedule
 * @param {object} scheduleData - schedule data from DayGridMove handler module.
 */
DayGridMove.prototype._updateSchedule = function(scheduleData) {
    var schedule = scheduleData.targetModel,
        dateOffset = scheduleData.xIndex - scheduleData.dragStartXIndex,
        newStarts = new TZDate(schedule.start),
        newEnds = new TZDate(schedule.end);

    newStarts = newStarts.addDate(dateOffset);
    newEnds = newEnds.addDate(dateOffset);

    /**
     * @event DayGridMove#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - The original schedule instance
     * @property {Date} start - Deprecated: start time to update
     * @property {Date} end - Deprecated: end time to update
     * @property {object} changes - start and end time to update
     *  @property {Date} start - start time to update
     *  @property {Date} end - end time to update
     */
    this.fire('beforeUpdateSchedule', {
        schedule: schedule,
        changes: {
            start: newStarts,
            end: newEnds
        },
        start: newStarts,
        end: newEnds
    });
};

/**
 * DragEnd event hander method.
 * @emits DayGridMove#dragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {?boolean} skipUpdate - true then skip update schedule model.
 */
DayGridMove.prototype._onDragEnd = function(dragEndEventData, overrideEventName, skipUpdate) {
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
     * @event DayGridMove#dragend
     * @type {object}
     * @property {DayGrid} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'dragend', scheduleData);

    this.getScheduleDataFunc = this._dragStart = null;
};

/**
 * Click event handler method.
 * @emits DayGridMove#click
 * @param {object} clickEventData - Drag#Click event handler data.
 */
DayGridMove.prototype._onClick = function(clickEventData) {
    /**
     * @event DayGridMove#click
     * @type {object}
     * @property {DayGrid} relatedView - view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this._onDragEnd(clickEventData, 'click', true);
};

common.mixin(dayGridCore, DayGridMove);
util.CustomEvents.mixin(DayGridMove);

module.exports = DayGridMove;
