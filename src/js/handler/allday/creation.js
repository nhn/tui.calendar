/**
 * @fileoverview Handler module for MonthWeek view's creation actions.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.ne.util;
var common = require('../../common/common');
var domutil = require('../../common/domutil');
var alldayCore = require('./core');

var parseViewIDRx = /^schedule-view-allday-monthweek[\s]schedule-view-(\d+)/;

/**
 * @constructor
 * @implements {Handler}
 * @mixes AlldayCore
 * @mixes CutomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - MonthWeek view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function AlldayCreation(dragHandler, alldayView, baseController) {    // eslint-disable-line
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = null;

    /**
     * allday view instance.
     * @type {Allday}
     */
    this.alldayView = null;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.baseController = null;

    /**
     * @type {function}
     */
    this.getEventDataFunc = null;

    /**
     * @type {number}
     */
    this._dragStartXIndex = null;

    if (arguments.length) {
        this.connect.apply(this, arguments);
    }
}

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|MonthWeek} return MonthWeek view instance when satiate condition.
 */
AlldayCreation.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (cssClass !== 'schedule-view-monthweek-events') {
        return false;
    }

    target = target.parentNode;
    cssClass = domutil.getClass(target);
    matches = cssClass.match(parseViewIDRx);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.alldayView.childs.items, matches[1]);
};

/**
 * Connect handler, view, controller.
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - MonthWeek view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
AlldayCreation.prototype.connect = function(dragHandler, alldayView, baseController) {
    this.dragHandler = dragHandler;
    this.alldayView = alldayView;
    this.baseController = baseController;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);
};

AlldayCreation.prototype._createEvent = function(eventData) {
    //TODO: implements
};

/**
 * DragStart event handler method.
 * @emits AlldayCreation#allday_creation_dragstart
 * @param {object} dragStartEventData - Drag#dragStart event handler event data.
 */
AlldayCreation.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        getEventDataFunc,
        eventData;

    if (!result) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    getEventDataFunc = this.getEventDataFunc = this._retriveEventData(this.alldayView);
    eventData = getEventDataFunc(dragStartEventData.originEvent);
    this._dragStartXIndex = eventData.xIndex;

    /**
     * @event AlldayCreation#allday_creation_dragstart
     * @type {object}
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('allday_creation_dragstart', eventData);
};

/**
 * Drag event handler method.
 * @emits AlldayCreation#allday_creation_drag
 * @param {object} dragEventData - Drag#drag event handler eventdata.
 */
AlldayCreation.prototype._onDrag = function(dragEventData) {
    var getEventDataFunc = this.getEventDataFunc,
        dragStartXIndex,
        eventData;

    if (!getEventDataFunc) {
        return;
    }

    dragStartXIndex = this._dragStartXIndex;
    eventData = getEventDataFunc(dragEventData.originEvent);

    util.extend(eventData, {
        width: eventData.xIndex - dragStartXIndex
    });

    /**
     * @event AlldayCreation#allday_creation_drag
     * @type {object}
     * @property {number} xIndex - index number of mouse positions.
     * @property {number} width - grid count in drag range.
     */
    this.fire('allday_creation_drag', eventData);
};

/**
 * DragEnd event hander method.
 * @emits AlldayCreation#allday_creation_dragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 */
AlldayCreation.prototype._onDragEnd = function(dragEndEventData, overrideEventName) {
    var getEventDataFunc = this.getEventDataFunc,
        dragStartXIndex,
        eventData;

    if (!getEventDataFunc) {
        return;
    }

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    dragStartXIndex = this._dragStartXIndex;
    eventData = getEventDataFunc(dragEndEventData.originEvent);

    util.extend(eventData, {
        width: eventData.xIndex - dragStartXIndex
    });

    /**
     * @event AlldayCreation#allday_creation_dragend
     * @type {object}
     * @property {number} xIndex - index number of mouse positions.
     * @property {number} width - grid count in drag range.
     */
    this.fire(overrideEventName || 'allday_creation_dragend', eventData);

    this.getEventDataFunc = this._dragStartXIndex = null;
};

/**
 * Click event handler method.
 * @emits AlldayCreation#allday_creation_click
 * @param {object} clickEventData - Drag#Click event handler data.
 */
AlldayCreation.prototype._onClick = function(clickEventData) {
    /**
     * @event AlldayCreation#allday_creation_click
     * @type {object}
     * @property {number} xIndex - index number of mouse positions.
     * @property {number} width - grid count in drag range.
     */
    this._onDragEnd(clickEventData, 'allday_creation_click');
};

common.mixin(alldayCore, AlldayCreation);
util.CustomEvents.mixin(AlldayCreation);

module.exports = AlldayCreation;

