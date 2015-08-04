/**
 * @fileoverview Handling move events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
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
    this._dragStartEventData = null;

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
    this.dragHandler.off({
        dragStart: this._onDragStart,
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);
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
    eventData = this._dragStartEventData = getEventDataFunc(
        dragStartEventData.originEvent, {
            eventElement: target,
            modelID: domutil.getData(target, 'id')
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
     * @property {HTMLElement} container - Target view's container element.
     * @property {number} viewHeight - Height of view container.
     * @property {number} hourLength - Length of view hours. it depends on hourStart, hourEnd option.
     * @property {number} gridYIndex - The number of hour number. it's not hour just index.
     * @property {number} time - Milliseconds value of drag star point.
     * @property {HTMLElement} eventElement - The element emitted move event.
     * @property {string} modelID - The model unique id emitted move event.
     * @property {MouseEvent} originEvent - Original mouse event object.
     */
    this.fire('time_move_dragstart', eventData);
};

/**
 * @emits TimeMove#time_move_drag
 * @param {MouseEvent} dragEventData - mousemove event object
 * @param {string} [overrideEventName] - name of emitting event to override.
 */
TimeMove.prototype._onDrag = function(dragEventData, overrideEventName) {
    var getEventDataFunc = this._getEventDataFunc,
        startEventData = this._dragStartEventData,
        timeView = this._getTimeView(dragEventData.target || dragEventData.srcElement),
        eventData;

    if (!timeView || !getEventDataFunc || !startEventData) {
        return;
    }

    eventData = getEventDataFunc(dragEventData, {
        currentTimeView: timeView,
        eventElement: startEventData.eventElement,
        modelID: startEventData.modelID
    });

    /**
     * @event TimeMove#time_move_drag
     * @type {object}
     * @property {Time} currentTimeView - time view instance related with current mouse position.
     * @property {HTMLElement} container - Target view's container element.
     * @property {number} viewHeight - Height of view container.
     * @property {number} hourLength - Length of view hours. it depends on hourStart, hourEnd option.
     * @property {number} gridYIndex - The number of hour number. it's not hour just index.
     * @property {number} time - Milliseconds value of drag star point.
     * @property {HTMLElement} eventElement - The element emitted move event.
     * @property {string} modelID - The model unique id emitted move event.
     * @property {MouseEvent} originEvent - Original mouse event object.
     */
    this.fire(overrideEventName || 'time_move_drag', eventData);
};

/**
 * @emits TimeMove#time_move_dragend
 * @param {MouseEvent} dragEndEventData - mouseup mouse event object.
 */
TimeMove.prototype._onDragEnd = function(dragEndEventData) {
    var getEventDataFunc = this._getEventDataFunc,
        startEventData = this._dragStartEventData,
        eventData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    if (!getEventDataFunc || !startEventData) {
        return;
    }

    eventData = getEventDataFunc(dragEndEventData, {
        eventElement: startEventData.eventElement,
        modelID: startEventData.modelID
    });

    /**
     * @event TimeMove#time_move_dragend
     * @type {object}
     * @property {HTMLElement} container - Target view's container element.
     * @property {number} viewHeight - Height of view container.
     * @property {number} hourLength - Length of view hours. it depends on hourStart, hourEnd option.
     * @property {number} gridYIndex - The number of hour number. it's not hour just index.
     * @property {number} time - Milliseconds value of drag star point.
     * @property {HTMLElement} eventElement - The element emitted move event.
     * @property {string} modelID - The model unique id emitted move event.
     * @property {MouseEvent} originEvent - Original mouse event object.
     */
    this.fire('time_move_dragend', eventData);

    this._getEventDataFunc = this._dragStartEventData = null;
};

/**
 * @emits TimeMove#time_move_click
 * @param {MouseEvent} clickEventData - click mouse event object.
 */
TimeMove.prototype._onClick = function(clickEventData) {
    var getEventDataFunc = this._getEventDataFunc,
        startEventData = this._dragStartEventData,
        eventData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    if (!getEventDataFunc || !startEventData) {
        return;
    }

    eventData = getEventDataFunc(clickEventData, {
        eventElement: startEventData.eventElement,
        modelID: startEventData.modelID
    });

    /**
     * @event TimeMove#time_move_click
     * @type {object}
     * @property {HTMLElement} container - Target view's container element.
     * @property {number} viewHeight - Height of view container.
     * @property {number} hourLength - Length of view hours. it depends on hourStart, hourEnd option.
     * @property {number} gridYIndex - The number of hour number. it's not hour just index.
     * @property {number} time - Milliseconds value of drag star point.
     * @property {HTMLElement} eventElement - The element emitted move event.
     * @property {string} modelID - The model unique id emitted move event.
     * @property {MouseEvent} originEvent - Original mouse event object.
     */
    this.fire('time_move_click', eventData);

    this._getEventDataFunc = this._dragStartEventData = null;
};

timeCore.mixin(TimeMove);
util.CustomEvents.mixin(TimeMove);

module.exports = TimeMove;

