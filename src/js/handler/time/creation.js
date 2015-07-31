/**
 * @fileoverview Handling creation events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../../datetime');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var Point = require('../../common/point');
var TimeCreationGuide = require('./creationGuide');
var parseViewIDRx = /^view-time-date[\s]view-(\d+)/;

/**
 * @constructor
 * @mixes util.CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function TimeCreation(dragHandler, timeGridView, baseController) {
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = null;

    /**
     * TimeGrid view instance.
     * @type {TimeGrid}
     */
    this.timeGridView = null;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.baseController = null;

    /**
     * Temporary function for single drag session's calc.
     * @type {function}
     */
    this._cached = null;

    /**
     * Temporary function for drag start data cache.
     * @type {object}
     */
    this._dragStartCache = null;

    /**
     * @type {TimeCreationGuide}
     */
    this._guide = new TimeCreationGuide(this);

    if (arguments.length) {
        this.connect.apply(this, arguments);
    }
}

/**
 * Destroy method
 */
TimeCreation.prototype.destroy = function() {
    this.dragHandler.off();
    this._guide.destroy();

    this.dragHandler = null;
    this.timeGridView = null;
    this.baseController = null;
    this._cached = null;
    this._guide = null;
};

/**
 * Connect handler, view, controllers for event creations.
 * @implements
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
TimeCreation.prototype.connect = function(dragHandler, timeGridView, baseController) {
    this.dragHandler = dragHandler;
    this.timeGridView = timeGridView;
    this.baseController = baseController;

    dragHandler.on({
        dragStart: this._onDragStart,
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);
};

/**
 * Check target element is expected condition for activate this plugins.
 * @implements
 * @param {HTMLElement} target - The element to check
 * @returns {(boolean|Time)} - return Time view instance when satiate condition.
 */
TimeCreation.prototype.checkExpectedCondition = function(target) {
    var matches = domutil.getClass(target).match(parseViewIDRx);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.childs.items, +matches[1]);
};

/**
 * Find nearest value from supplied params.
 * @param {number} value - value to find.
 * @param {array} nearest - nearest array.
 * @returns {number} nearest value
 */
TimeCreation.prototype._nearest = function(value, nearest) {
    var diff = util.map(nearest, function(v) {
            return Math.abs(value - v);
        }),
        nearestIndex = util.inArray(Math.min.apply(null, diff), diff);

    return nearest[nearestIndex];
};

/**
 * Get Y index ratio(hour) in time grids by supplied parameters.
 * @param {number} baseMil - base milliseconds number for supplied height.
 * @param {number} height - container element height.
 * @param {number} y - Y coordinate to calculate hour ratio.
 * @returns {number} hour index ratio value.
 */
TimeCreation.prototype._calcGridYIndex = function(baseMil, height, y) {
    // get ratio from right expression > point.y : x = session.height : baseMil
    // and convert milliseconds value to hours.
    var result = datetime.millisecondsTo('hour', (y * baseMil) / height),
        floored = result | 0,
        nearest = this._nearest(result - floored, [0, 1]);

    return floored + (nearest ? 0.5 : 0);
};

/**
 * Drag#dragStart event handler.
 * @emits TimeCreation#time_creation_dragstart
 * @param {object} dragStartEventData - Drag#dragStart event data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeCreation.prototype._onDragStart = function(dragStartEventData, overrideEventName, revise) {
    var target = dragStartEventData.target,
        targetView = this.checkExpectedCondition(target),
        viewOptions,
        hourLength,
        viewHeight,
        gridYIndex,
        eventData,
        viewDate,
        baseMil,
        cached,
        mouseY,
        time;

    if (!targetView) {
        return;
    }

    viewOptions = targetView.options;
    viewHeight = targetView.getViewBound().height;
    viewDate = targetView.getDate();

    hourLength = viewOptions.hourEnd - viewOptions.hourStart;
    baseMil = datetime.millisecondsFrom('hour', hourLength);

    cached = this._cached = util.bind(function(mouseEvent) {
        mouseY = Point.n(
            domevent.getMousePosition(
                mouseEvent,
                targetView.container
            )
        ).y;

        gridYIndex = this._calcGridYIndex(baseMil, viewHeight, mouseY);
        time = datetime.millisecondsFrom('hour', gridYIndex + viewOptions.hourStart);

        return {
            container: targetView.container,
            viewHeight: viewHeight,
            hourLength: hourLength,
            gridYIndex: gridYIndex,
            time: viewDate.getTime() + time,
            originEvent: mouseEvent
        };
    }, this);
    eventData = this._dragStartCache = cached(dragStartEventData.originEvent);

    if (revise) {
        revise(eventData);
    }

    /**
     * @event TimeCreation#time_creation_dragstart
     * @type {object}
     * @property {HTMLElement} container - Target view's container element.
     * @property {number} viewHeight - Height of view container.
     * @property {number} hourLength - Length of view hours. it depends on hourStart, hourEnd option.
     * @property {number} gridYIndex - The number of hour number. it's not hour just index.
     * @property {number} time - Milliseconds value of drag star point.
     * @property {MouseEvent} originEvent - Original mouse event object.
     */
    this.fire(overrideEventName || 'time_creation_dragstart', eventData);
};

/**
 * Drag#drag event handler
 * @emits TimeCreation#time_creation_drag
 * @param {MouseEvent} dragEventData - Mouse event of Drag#drag custom event.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {function} [revise] - supply function for revise event data before emit.
 */
TimeCreation.prototype._onDrag = function(dragEventData, overrideEventName, revise) {
    var cached = this._cached,
        eventData;

    if (!cached) {
        return;
    }

    eventData = cached(dragEventData);
    eventData.gridYIndex += 0.5;

    if (revise) {
        revise(eventData);
    }

    /**
     * @event TimeCreation#time_creation_drag
     * @type {object}
     * @property {HTMLElement} container - Target view's container element.
     * @property {number} viewHeight - Height of view container.
     * @property {number} hourLength - Length of view hours. it depends on hourStart, hourEnd option.
     * @property {number} gridYIndex - The number of hour number. it's not hour just index.
     * @property {number} time - Milliseconds value of drag star point.
     * @property {MouseEvent} originEvent - Original mouse event object.
     */
    this.fire(overrideEventName || 'time_creation_drag', eventData);
};

/**
 * Drag#dragEnd event handler
 * @emits TimeCreation#time_creation_dragend
 * @param {MouseEvent} dragEndEventData - Mouse event of Drag#dragEnd custom event.
 */
TimeCreation.prototype._onDragEnd = function(dragEndEventData) {
    var dragStartTime = this._dragStartCache.time;

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
    this._onDrag(dragEndEventData, 'time_creation_dragend', reviseFunc);

    this._dragStartCache = this._cached = null;
};

/**
 * Drag#click event handler
 * @emits TimeCreation#time_creation_click
 * @param {MouseEvent} clickEventData - Mouse event of Drag#click custom event.
 */
TimeCreation.prototype._onClick = function(clickEventData) {
    var dragStartTime = this._dragStartCache.time;

    function reviseFunc(eventData) {
        eventData.range = [dragStartTime, eventData.time + datetime.millisecondsFrom('hour', 0.5)];
    }
    /**
     * @event TimeCreation#time_creation_click
     * @type {object}
     * @property {HTMLElement} container - Target view's container element.
     * @property {number} viewHeight - Height of view container.
     * @property {number} hourLength - Length of view hours. it depends on hourStart, hourEnd option.
     * @property {number} gridYIndex - The number of hour number. it's not hour just index.
     * @property {Date[]} range - date range between drag start and drag end points.
     * @property {MouseEvent} originEvent - Original mouse event object.
     */
    this._onDrag(clickEventData, 'time_creation_click', reviseFunc);

    this._dragStartCache = this._cached = null;
};

util.CustomEvents.mixin(TimeCreation);

module.exports = TimeCreation;

