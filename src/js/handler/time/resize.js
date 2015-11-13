/**
 * @fileoverview Handling resize events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var timeCore = require('./core');
var TimeResizeGuide = require('./resizeGuide');

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
    this._dragStart = null;

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

    if (!domutil.hasClass(target, config.classname('time-resize-handle'))) {
        return false;
    }

    container = domutil.closest(target, '.' + config.classname('time-date'));

    if (!container) {
        return false;
    }

    matches = domutil.getClass(container).match(config.time.getViewIDRegExp);

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
        blockElement = domutil.closest(target, '.' + config.classname('time-date-event-block')),
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
     * @event TimeResize#time_resize_dragstart
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
    this.fire('time_resize_dragstart', eventData);
};

/**
 * Drag#drag event handler
 * @emits TimeResize#time_resize_drag
 * @param {object} dragEventData - event data of Drag#drag custom event.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeResize.prototype._onDrag = function(dragEventData, overrideEventName, revise) {
    var getEventDataFunc = this._getEventDataFunc,
        startEventData = this._dragStart,
        eventData;

    if (!getEventDataFunc || !startEventData) {
        return;
    }

    eventData = getEventDataFunc(dragEventData.originEvent, {
        targetModelID: startEventData.targetModelID
    });

    if (revise) {
        revise(eventData);
    }

    /**
     * @event TimeResize#time_resize_drag
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
    this.fire(overrideEventName || 'time_resize_drag', eventData);
};

/**
 * Update model instance by dragend event results.
 * @param {object} eventData - event data from TimeResize#time_resize_dragend
 */
TimeResize.prototype._updateEvent = function(eventData) {
    var ctrl = this.baseController,
        modelID = eventData.targetModelID,
        range = eventData.nearestRange,
        timeDiff = range[1] - range[0],
        model = ctrl.events.items[modelID],
        relatedView = eventData.relatedView,
        dateEnd,
        newEnds,
        baseDate;

    if (!model) {
        return;
    }

    timeDiff -= datetime.millisecondsFrom('minutes', 30);

    baseDate = new Date(relatedView.getDate());
    dateEnd = datetime.end(baseDate);
    newEnds = new Date(model.getEnds().getTime() + timeDiff);

    if (newEnds > dateEnd) {
        newEnds = new Date(dateEnd.getTime());
    }

    if (newEnds.getTime() - model.getStarts().getTime() < datetime.millisecondsFrom('minutes', 30)) {
        newEnds = new Date(model.getStarts().getTime() + datetime.millisecondsFrom('minutes', 30));
    }

    ctrl.updateEvent(modelID, {
        ends: newEnds
    });
};

/**
 * Drag#dragEnd event handler
 * @emits TimeResize#time_resize_dragend
 * @param {MouseEvent} dragEndEventData - Mouse event of Drag#dragEnd custom event.
 */
TimeResize.prototype._onDragEnd = function(dragEndEventData) {
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

    this._updateEvent(eventData);

    /**
     * @event TimeResize#time_resize_dragend
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
    this.fire('time_resize_dragend', eventData);

    this._getEventDataFunc = this._dragStart = null;
};

/**
 * @emits TimeResize#time_resize_click
 */
TimeResize.prototype._onClick = function() {
    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event TimeResize#time_resize_click
     */
    this.fire('time_resize_click');
};

timeCore.mixin(TimeResize);
util.CustomEvents.mixin(TimeResize);

module.exports = TimeResize;

