/**
 * @fileoverview Handling move events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
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
    this._getEventDataFunc = null;

    /**
     * @type {object}
     */
    this._dragStart = null;

    /**
     * @type {TimeMoveGuide}
     */
    this._guide = new TimeMoveGuide(this);

    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destroy method.
 */
TimeMove.prototype.destroy = function() {
    this._guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.timeGridView = this.baseController =
        this._getEventDataFunc = this._dragStart = this._guide = null;
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {boolean|object} - return object when satiate condition.
 */
TimeMove.prototype.checkExpectCondition = function(target) {
    if (!domutil.closest(target, config.classname('.time-event'))) {
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
 * @emits TimeMove#timeMoveDragstart
 * @param {object} dragStartEventData - Drag#dragStart event data.
 */
TimeMove.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        timeView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, config.classname('.time-date-event-block')),
        getEventDataFunc,
        eventData;

    if (!timeView || !blockElement) {
        return;
    }

    getEventDataFunc = this._getEventDataFunc = this._retriveEventData(timeView);
    eventData = this._dragStart = getEventDataFunc(
        dragStartEventData.originEvent, {
            targetModelID: domutil.getData(blockElement, 'id')
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
     * @property {string} targetModelID - The model unique id emitted move event.
     */
    this.fire('timeMoveDragstart', eventData);
};

/**
 * @emits TimeMove#timeMoveDrag
 * @param {MouseEvent} dragEventData - mousemove event object
 * @param {string} [overrideEventName] - name of emitting event to override.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeMove.prototype._onDrag = function(dragEventData, overrideEventName, revise) {
    var getEventDataFunc = this._getEventDataFunc,
        timeView = this._getTimeView(dragEventData.target),
        dragStart = this._dragStart,
        eventData;

    if (!timeView || !getEventDataFunc || !dragStart) {
        return;
    }

    eventData = getEventDataFunc(dragEventData.originEvent, {
        currentView: timeView,
        targetModelID: dragStart.targetModelID
    });

    if (revise) {
        revise(eventData);
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
     * @property {string} targetModelID - The model unique id emitted move event.
     */
    this.fire(overrideEventName || 'timeMoveDrag', eventData);
};

/**
 * Update model instance by dragend event results.
 * @fires TimeMove#beforeUpdateEvent
 * @param {object} eventData - event data from TimeMove#timeMoveDragend
 */
TimeMove.prototype._updateEvent = function(eventData) {
    var ctrl = this.baseController,
        modelID = eventData.targetModelID,
        range = eventData.nearestRange,
        timeDiff = range[1] - range[0],
        dateDiff = 0,
        model = ctrl.events.items[modelID],
        relatedView = eventData.relatedView,
        currentView = eventData.currentView,
        eventDuration,
        dateStart,
        dateEnd,
        newStarts,
        newEnds,
        baseDate;

    if (!model || !currentView) {
        return;
    }

    timeDiff -= datetime.millisecondsFrom('minutes', 30);
    baseDate = new TZDate(relatedView.getDate());
    dateStart = datetime.start(baseDate);
    dateEnd = datetime.end(baseDate);
    newStarts = new TZDate(model.getStarts().getTime() + timeDiff);
    newEnds = new TZDate(model.getEnds().getTime() + timeDiff);
    eventDuration = model.duration();

    if (currentView) {
        dateDiff = currentView.getDate() - relatedView.getDate();
    }

    if (newStarts < dateStart) {
        newStarts = new TZDate(dateStart.getTime());
        newEnds = new TZDate(newStarts.getTime() + eventDuration.getTime());
    } else if (newEnds > dateEnd) {
        newEnds = new TZDate(dateEnd.getTime());
        newStarts = new TZDate(newEnds.getTime() - eventDuration.getTime());
    }

    newStarts = new TZDate(newStarts.getTime() + dateDiff);
    newEnds = new TZDate(newEnds.getTime() + dateDiff);

    /**
     * @event TimeMove#beforeUpdateEvent
     * @type {object}
     * @property {CalEvent} model - model instance to update
     * @property {date} starts - start time to update
     * @property {date} ends - end time to update
     */
    this.fire('beforeUpdateEvent', {
        model: model,
        starts: newStarts,
        ends: newEnds
    });
};

/**
 * @emits TimeMove#timeMoveDragend
 * @param {MouseEvent} dragEndEventData - mouseup mouse event object.
 */
TimeMove.prototype._onDragEnd = function(dragEndEventData) {
    var getEventDataFunc = this._getEventDataFunc,
        currentView = this._getTimeView(dragEndEventData.target),
        dragStart = this._dragStart,
        eventData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    if (!getEventDataFunc || !dragStart) {
        return;
    }

    eventData = getEventDataFunc(dragEndEventData.originEvent, {
        currentView: currentView,
        targetModelID: dragStart.targetModelID
    });

    eventData.range = [
        dragStart.timeY,
        eventData.timeY + datetime.millisecondsFrom('hour', 0.5)
    ];

    eventData.nearestRange = [
        dragStart.nearestGridTimeY,
        eventData.nearestGridTimeY + datetime.millisecondsFrom('hour', 0.5)
    ];

    this._updateEvent(eventData);

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
     * @property {string} targetModelID - The model unique id emitted move event.
     * @property {number[]} range - milliseconds range between drag start and end.
     * @property {number[]} nearestRange - milliseconds range related with nearestGridY between start and end.
     */
    this.fire('timeMoveDragend', eventData);
};

/**
 * @emits TimeMove#timeMoveClick
 * @param {MouseEvent} clickEventData - click mouse event object.
 */
TimeMove.prototype._onClick = function(clickEventData) {
    var getEventDataFunc = this._getEventDataFunc,
        dragStart = this._dragStart,
        eventData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    if (!getEventDataFunc || !dragStart) {
        return;
    }

    eventData = getEventDataFunc(clickEventData.originEvent, {
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
     * @property {string} targetModelID - The model unique id emitted move event.
     */
    this.fire('timeMoveClick', eventData);
};

timeCore.mixin(TimeMove);
util.CustomEvents.mixin(TimeMove);

module.exports = TimeMove;

