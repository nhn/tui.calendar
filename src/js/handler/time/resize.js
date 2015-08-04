/**
 * @fileoverview Handling resize events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';
var util = global.ne.util;
var datetime = require('../../datetime');
var domutil = require('../../common/domutil');
var timeCore = require('./core');
var TimeResizeGuide = require('./resizeGuide');

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
function TimeResize(dragHandler, timeGridView, baseController) {
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
     * @type {TimeResizeGuide}
     */
    this._guide = new TimeResizeGuide(this);

    if (arguments.length) {
        this.connect.apply(this, arguments);
    }
}

/**
 * Destroy method
 */
TimeResize.prototype.destroy = function() {
    this.dragHandler.off({
        dragStart: this._onDragStart
    }, this);
};

/**
 * Connect handler, view, controllers for event creations.
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
TimeResize.prototype.connect = function(dragHandler, timeGridView, baseController) {
    this.dragHandler = dragHandler;
    this.timeGridView = timeGridView;
    this.baseController = baseController;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);
};

/**
 * @param {HTMLElement} target - element to check condition.
 * @returns {object|boolean} - return time view instance or false
 */
TimeResize.prototype.checkExpectCondition = function(target) {
    var container,
        matches;

    if (!domutil.hasClass(target, 'view-time-resize-handle')) {
        return false;
    }

    container = domutil.closest(target, '.view-time-date');

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
 * @emits TimeResize#time_resize_dragstart
 * @param {object} dragStartEventData - event data of Drag#dragstart
 */
TimeResize.prototype._onDragStart = function(dragStartEventData) {
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
     * @event TimeResize#time_resize_dragstart
     * @type {object}
     * @property {HTMLElement} container - Target view's container element.
     * @property {number} viewHeight - Height of view container.
     * @property {number} hourLength - Length of view hours. it depends on hourStart, hourEnd option.
     * @property {number} gridYIndex - The number of hour number. it's not hour just index.
     * @property {number} time - Milliseconds value of drag star point.
     * @property {HTMLElement} eventElement - The element emitted resize event.
     * @property {string} modelID - The model unique id emitted move event.
     * @property {MouseEvent} originEvent - Original mouse event object.
     */
    this.fire('time_resize_dragstart', eventData);
};

/**
 * Drag#drag event handler
 * @emits TimeResize#time_resize_drag
 * @param {MouseEvent} dragEventData - Mouse event of Drag#drag custom event.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeResize.prototype._onDrag = function(dragEventData, overrideEventName, revise) {
    var getEventDataFunc = this._getEventDataFunc,
        startEventData = this._dragStartEventData,
        eventData;

    eventData = getEventDataFunc(dragEventData, {
        eventElement: startEventData.eventElement,
        modelID: startEventData.modelID
    });

    if (revise) {
        revise(eventData);
    }

    /**
     * @event TimeResize#time_resize_drag
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
    this.fire(overrideEventName || 'time_resize_drag', eventData);
};

/**
 * Drag#dragEnd event handler
 * @emits TimeResize#time_resize_dragend
 * @param {MouseEvent} dragEndEventData - Mouse event of Drag#dragEnd custom event.
 */
TimeResize.prototype._onDragEnd = function(dragEndEventData) {
    var dragStartTime = this._dragStartEventData.time;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    function reviseFunc(eventData) {
        eventData.range = [dragStartTime, eventData.time + datetime.millisecondsFrom('hour', 0.5)];
    }

    /**
     * @event TimeCreation#time_creation_dragend
     * @type {object}
     * @property {HTMLElement} container - Target view's container element.
     * @property {number} viewHeight - Height of view container.
     * @property {number} hourLength - Length of view hours. it depends on hourStart, hourEnd option.
     * @property {number} gridYIndex - The number of hour number. it's not hour just index.
     * @property {Date[]} range - date range between drag start and drag end points.
     * @property {MouseEvent} originEvent - Original mouse event object.
     */
    this._onDrag(dragEndEventData, 'time_resize_dragend', reviseFunc);

    this._getEventDataFunc = this._dragStartEventData = null;
};

TimeResize.prototype._onClick = function() {
    this.fire('time_resize_click');
};

timeCore.mixin(TimeResize);
util.CustomEvents.mixin(TimeResize);

module.exports = TimeResize;

