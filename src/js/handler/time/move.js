/**
 * @fileoverview Handling move events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../../datetime');
var domutil = require('../../common/domutil');
var timeCore = require('./core');
var TimeMoveGuide = require('./moveGuide');

var parseTimeViewIDRx = /^view-time-date[\s]view-(\d+)/;

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
    this.dragHandler = null;

    /**
     * @type {TimeGrid}
     */
    this.timeGridView = null;

    /**
     * @type {Base}
     */
    this.baseController = null;

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

    if (arguments.length) {
        this.connect.apply(this, arguments);
    }
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
 * Connect handler, view, controllers for event creations.
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
TimeMove.prototype.connect = function(dragHandler, timeGridView, baseController) {
    this.dragHandler = dragHandler;
    this.timeGridView = timeGridView;
    this.baseController = baseController;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {boolean|object} - return object when satiate condition.
 */
TimeMove.prototype.checkExpectCondition = function(target) {
    if (domutil.getClass(target) !== 'view-time-event') {
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
    var container = domutil.closest(target, '.view-time-date'),
        matches;

    if (!container) {
        return false;
    }

    matches = domutil.getClass(container).match(parseTimeViewIDRx);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.childs.items, +matches[1]);
};

/**
 * @emits TimeMove#time_move_dragstart
 * @param {object} dragStartEventData - Drag#dragStart event data.
 */
TimeMove.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        timeView = this.checkExpectCondition(target),
        getEventDataFunc,
        eventData;

    if (!timeView) {
        return;
    }

    getEventDataFunc = this._getEventDataFunc = this._retriveEventData(timeView);
    eventData = this._dragStart = getEventDataFunc(
        dragStartEventData.originEvent, {
            targetModelID: domutil.getData(target, 'id')
        }
    );

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event TimeMove#time_move_dragstart
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
    this.fire('time_move_dragstart', eventData);
};

/**
 * @emits TimeMove#time_move_drag
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
     * @event TimeMove#time_move_drag
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
    this.fire(overrideEventName || 'time_move_drag', eventData);
};

/**
 * @emits TimeMove#time_move_dragend
 * @param {MouseEvent} dragEndEventData - mouseup mouse event object.
 */
TimeMove.prototype._onDragEnd = function(dragEndEventData) {
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

    eventData = getEventDataFunc(dragEndEventData.originEvent, {
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

    /**
     * @event TimeMove#time_move_dragend
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
     * @property {number[]} range - milliseconds range between drag start and end.
     * @property {number[]} nearestRange - milliseconds range related with nearestGridY between start and end.
     */
    this.fire('time_move_dragend', eventData);
};

/**
 * @emits TimeMove#time_move_click
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
     * @event TimeMove#time_move_click
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
    this.fire('time_move_click', eventData);
};

timeCore.mixin(TimeMove);
util.CustomEvents.mixin(TimeMove);

module.exports = TimeMove;

