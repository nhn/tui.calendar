/**
 * @fileoverview Handling move schedules from drag handler and time grid view
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var TZDate = require('../../common/timezone').Date;
var timeCore = require('./core');
var TimeMoveGuide = require('./moveGuide');

/**
 * @constructor
 * @implements {Handler}
 * @mixes timeCore
 * @mixes util.CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function TimeMove(dragHandler, timeGridView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {TimeGrid}
     */
    this.timeGridView = timeGridView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {function}
     */
    this._getScheduleDataFunc = null;

    /**
     * @type {object}
     */
    this._dragStart = null;

    /**
     * @type {TimeMoveGuide}
     */
    this._guide = new TimeMoveGuide(this);

    dragHandler.on('dragStart', this._onDragStart, this);
    dragHandler.on('mousedown', this._onMouseDown, this);
}

/**
 * Destroy method.
 */
TimeMove.prototype.destroy = function() {
    this._guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.timeGridView = this.baseController =
        this._getScheduleDataFunc = this._dragStart = this._guide = null;
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {boolean|object} - return object when satiate condition.
 */
TimeMove.prototype.checkExpectCondition = function(target) {
    if (!domutil.closest(target, config.classname('.time-schedule'))) {
        return false;
    }

    return this._getTimeView(target);
};

/**
 * Get Time view container from supplied element.
 * @param {HTMLElement} target - element to find time view container.
 * @returns {object|boolean} - return time view instance when finded.
 */
TimeMove.prototype._getTimeView = function(target) {
    var container = domutil.closest(target, config.classname('.time-date')),
        matches;

    if (!container) {
        return false;
    }

    matches = domutil.getClass(container).match(config.time.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.children.items, Number(matches[1]));
};

/**
 * @emits TimeMove#mousedown
 * @param {object} mouseDownEventData - Drag#mousedown schedule data.
 */
TimeMove.prototype._onMouseDown = function(mouseDownEventData) {
    var target = mouseDownEventData.target,
        timeView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, config.classname('.time-date-schedule-block'));

    if (!timeView || !blockElement) {
        return;
    }

    // EventTarget.target is not changed in mousemove event even if mouse is over the other element.
    // It's different with other browsers(IE, Chrome, Safari)
    if (util.browser.firefox) {
        domevent.preventDefault(mouseDownEventData.originEvent);
    }
};

/**
 * @emits TimeMove#timeMoveDragstart
 * @param {object} dragStartEventData - Drag#dragStart schedule data.
 */
TimeMove.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        timeView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, config.classname('.time-date-schedule-block')),
        getScheduleDataFunc,
        scheduleData,
        ctrl = this.baseController,
        targetModelID,
        targetModel;

    if (!timeView || !blockElement) {
        return;
    }

    targetModelID = domutil.getData(blockElement, 'id');
    targetModel = ctrl.schedules.items[targetModelID];

    if (targetModel.isReadOnly) {
        return;
    }

    getScheduleDataFunc = this._getScheduleDataFunc = this._retriveScheduleData(timeView);
    scheduleData = this._dragStart = getScheduleDataFunc(
        dragStartEventData.originEvent, {
            targetModelID: targetModelID,
            model: targetModel
        }
    );

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event TimeMove#timeMoveDragstart
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move schedule.
     * @property {Schedule} model - model instance
     */
    this.fire('timeMoveDragstart', scheduleData);
};

/**
 * @emits TimeMove#timeMoveDrag
 * @param {MouseEvent} dragEventData - mousemove event object
 * @param {string} [overrideEventName] - name of emitting event to override.
 * @param {function} [revise] - supply function for revise schedule data before emit.
 */
TimeMove.prototype._onDrag = function(dragEventData, overrideEventName, revise) {
    var getScheduleDataFunc = this._getScheduleDataFunc,
        timeView = this._getTimeView(dragEventData.target),
        dragStart = this._dragStart,
        scheduleData;

    if (!timeView || !getScheduleDataFunc || !dragStart) {
        return;
    }

    scheduleData = getScheduleDataFunc(dragEventData.originEvent, {
        currentView: timeView,
        targetModelID: dragStart.targetModelID
    });

    if (revise) {
        revise(scheduleData);
    }

    /**
     * @event TimeMove#timeMoveDrag
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with drag start position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {Time} currentView - time view instance related with current mouse position.
     * @property {string} targetModelID - The model unique id emitted move schedule.
     */
    this.fire(overrideEventName || 'timeMoveDrag', scheduleData);
};

/**
 * Update model instance by dragend event results.
 * @fires TimeMove#beforeUpdateSchedule
 * @param {object} scheduleData - schedule data from TimeMove#timeMoveDragend
 */
TimeMove.prototype._updateSchedule = function(scheduleData) {
    var ctrl = this.baseController,
        modelID = scheduleData.targetModelID,
        range = scheduleData.nearestRange,
        timeDiff = range[1] - range[0],
        dateDiff = 0,
        schedule = ctrl.schedules.items[modelID],
        relatedView = scheduleData.relatedView,
        currentView = scheduleData.currentView,
        newStarts,
        newEnds;

    if (!schedule || !currentView) {
        return;
    }

    timeDiff -= datetime.millisecondsFrom('minutes', 30);
    newStarts = new TZDate(schedule.getStarts()).addMilliseconds(timeDiff);
    newEnds = new TZDate(schedule.getEnds()).addMilliseconds(timeDiff);

    if (currentView) {
        dateDiff = currentView.getDate() - relatedView.getDate();
    }

    newStarts.addMilliseconds(dateDiff);
    newEnds.addMilliseconds(dateDiff);

    /**
     * @event TimeMove#beforeUpdateSchedule
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
 * @emits TimeMove#timeMoveDragend
 * @param {MouseEvent} dragEndEventData - mouseup mouse event object.
 */
TimeMove.prototype._onDragEnd = function(dragEndEventData) {
    var getScheduleDataFunc = this._getScheduleDataFunc,
        currentView = this._getTimeView(dragEndEventData.target),
        dragStart = this._dragStart,
        scheduleData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    if (!getScheduleDataFunc || !dragStart) {
        return;
    }

    scheduleData = getScheduleDataFunc(dragEndEventData.originEvent, {
        currentView: currentView,
        targetModelID: dragStart.targetModelID
    });

    scheduleData.range = [
        dragStart.timeY,
        new TZDate(scheduleData.timeY).addMinutes(30)
    ];

    scheduleData.nearestRange = [
        dragStart.nearestGridTimeY,
        new TZDate(scheduleData.nearestGridTimeY).addMinutes(30)
    ];

    this._updateSchedule(scheduleData);

    /**
     * @event TimeMove#timeMoveDragend
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with drag start position.
     * @property {Time} currentView - time view instance related with current mouse position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move schedule.
     * @property {number[]} range - milliseconds range between drag start and end.
     * @property {number[]} nearestRange - milliseconds range related with nearestGridY between start and end.
     */
    this.fire('timeMoveDragend', scheduleData);
};

/**
 * @emits TimeMove#timeMoveClick
 * @param {MouseEvent} clickEventData - click mouse event object.
 */
TimeMove.prototype._onClick = function(clickEventData) {
    var getScheduleDataFunc = this._getScheduleDataFunc,
        dragStart = this._dragStart,
        scheduleData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    if (!getScheduleDataFunc || !dragStart) {
        return;
    }

    scheduleData = getScheduleDataFunc(clickEventData.originEvent, {
        targetModelID: dragStart.targetModelID
    });

    /**
     * @event TimeMove#timeMoveClick
     * @type {object}
     * @property {HTMLElement} target - current target in mouse event object.
     * @property {Time} relatedView - time view instance related with drag start position.
     * @property {MouseEvent} originEvent - mouse event object.
     * @property {number} mouseY - mouse Y px mouse event.
     * @property {number} gridY - grid Y index value related with mouseY value.
     * @property {number} timeY - milliseconds value of mouseY points.
     * @property {number} nearestGridY - nearest grid index related with mouseY value.
     * @property {number} nearestGridTimeY - time value for nearestGridY.
     * @property {string} targetModelID - The model unique id emitted move schedule.
     */
    this.fire('timeMoveClick', scheduleData);
};

timeCore.mixin(TimeMove);
util.CustomEvents.mixin(TimeMove);

module.exports = TimeMove;
