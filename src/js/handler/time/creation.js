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

var session = {};
var parseViewIDRx = /^view-time-date[\s]view-(\d+)/;

/**
 * @constructor
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
     * Temporary data for single drag creation session.
     * @type {object}
     */
    this.creationSessionData = {};

    if (arguments.length) {
        this.connect.apply(this, arguments);
    }
}

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
 * Get Y coordinate ratio(hour) in time grids by supplied parameters.
 * @param {number} baseMil - base milliseconds number for supplied height.
 * @param {number} height - container element height.
 * @param {number} y - Y coordinate to calculate hour ratio.
 * @returns {number} hour ratio value.
 */
TimeCreation.prototype._calcHourNumber = function(baseMil, height, y) {
    // get ratio from right expression > point.y : x = session.height : baseMil
    // and convert milliseconds value to hours.
    var result = datetime.millisecondsTo('hour', (y * baseMil) / height);
};

TimeCreation.prototype._onDragStart = function() {};

TimeCreation.prototype._onDrag = function() {};

TimeCreation.prototype._onDragEnd = function() {};

TimeCreation.prototype._onClick = function() {};


var timeCreation = {
    connect: function(dragHandler, timeGridView) {
        dragHandler.on({
            dragStart: timeCreation.dragStart,
            drag: timeCreation.drag,
            dragEnd: timeCreation.dragEnd,
            click: timeCreation.click
        }, timeGridView);
    },

    /**
     * Find nearest value from supplied params.
     * @param {number} value - value to find.
     * @param {array} nearest - nearest array.
     * @returns {number} nearest value
     */
    _nearest: function(value, nearest) {
        var diff = util.map(nearest, function(v) {
                return Math.abs(value - v);
            }),
            nearestIndex = util.inArray(Math.min.apply(null, diff), diff);

        return nearest[nearestIndex];
    },

    calcHourByPoint: function(timeGridView, point) {
        var options = timeGridView.options,
            baseLength = options.hourEnd - options.hourStart,
            baseMil = datetime.millisecondsFrom('hour', baseLength),
            floored,
            nearest,
            result;

        // point.y : x = session.height : baseMil;
        result = (point.y * baseMil) / session.bound.height;
        // milliseconds to hours
        result = datetime.millisecondsTo('hour', result);
        // add hour offset from option.
        result += options.hourStart;
        // round 30 minutes (0.5)
        floored = (result | 0);
        nearest = timeCreation._nearest(result - floored, [0, 1]);
        result = floored + (nearest ? 0.5 : 0);

        return result;
    },

    dragStart: function(dragStartEvent) {
        var target = dragStartEvent.target,
            cssClass = domutil.getClass(target),
            baseElement,
            matches = cssClass.match(parseViewIDRx);

        if (!matches) {
            return;
        }

        baseElement = this.container.childNodes[0];

        session.targetView = this.childs.items[+matches[1]];
        session.bound = this.getViewBound.call({container: baseElement});
        session.dragStart = Point.n(domevent.getMousePosition(dragStartEvent.originEvent, baseElement));

        console.log(this.calcHourByPoint(this, session.dragStart));
    },
    drag: function(dragEvent) {},
    dragEnd: function(dragEndEvent) {},
    click: function() {}
};

module.exports = timeCreation;

