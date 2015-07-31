/**
 * @fileoverview Handling move events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../../common/domutil');
var timeCore = require('./core');

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
 * @returns {(boolean|object)} - return object when satiate condition.
 */
TimeMove.prototype.checkExpectCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (cssClass !== 'view-time-event') {
        return false;
    }

    matches = domutil.getClass(target.parentNode.parentNode).match(parseTimeViewIDRx);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.childs.items, +matches[1]);
};

/**
 * @emits TimeMove#time_move_dratstart
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

    getEventDataFunc = this._retriveEventData(timeView);
    eventData = getEventDataFunc(dragStartEventData.originEvent);
    eventData.eventElement = target;
    eventData.modelID = domutil.getData(target, 'id');

    console.log(eventData);
};

timeCore.mixin(TimeMove);
util.CustomEvents.mixin(TimeMove);

module.exports = TimeMove;

