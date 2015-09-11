/**
 * @fileoverview Resize handler module for Allday view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.ne.util;
var domutil = require('../../common/domutil');
var common = require('../../common/common');
var AlldayCore = require('./core');

var parseViewIDRx = /^schedule-view-allday-monthweek[\s]schedule-view-(\d+)/;

/**
 * @constructor
 * @implements {Handler}
 * @mixes AlldayCore
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - MonthWeek view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function AlldayResize(dragHandler, alldayView, baseController) {
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * allday view instance.
     * @type {Allday}
     */
    this.alldayView = alldayView;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {number}
     */
    this._dragStartXIndex = null;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);
}

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|MonthWeek} return MonthWeek view instance when satiate condition.
 */
AlldayResize.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (!~cssClass.indexOf('schedule-view-allday-resize-handle')) {
        return false;
    }

    target = domutil.closest(target, '.schedule-view-allday-monthweek');

    if (!target) {
        return false;
    }

    cssClass = domutil.getClass(target);
    matches = cssClass.match(parseViewIDRx);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.alldayView.childs.items, matches[1]);
};

/**
 * DragStart event handler.
 * @emits AlldayResize#allday_resize_dragstart
 * @param {object} dragStartEventData - event data.
 */
AlldayResize.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        controller = this.baseController,
        eventBlockElement,
        modelID,
        targetModel,
        getEventDataFunc,
        eventData;

    if (!result) {
        return;
    }

    eventBlockElement = domutil.closest(target, '.schedule-view-allday-event-block');
    modelID = domutil.getData(eventBlockElement, 'id');
    targetModel = controller.events.items[modelID];

    if (!targetModel) {
        return;
    }

    getEventDataFunc = this.getEventDataFunc = this._retriveEventData(this.alldayView);
    eventData = getEventDataFunc(dragStartEventData.originEvent);
    this._dragStartXIndex = eventData.xIndex;

    util.extend(eventData, {
        eventBlockElement: eventBlockElement,
        model: targetModel
    });

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    /**
     * @event AlldayResize#allday_resize_dragstart
     * @type {object}
     * @property {number} datesInRange - date count of this view.
     * @property {number} xIndex - index number of mouse positions.
     * @property {Event} model - data object of model isntance.
     * @property {HTMLDivElement} eventBlockElement - target event block element.
     */
    this.fire('allday_resize_dragstart', eventData);
};

AlldayResize.prototype._onDrag = function() {};

AlldayResize.prototype._onDragEnd = function() {};

AlldayResize.prototype._onClick = function() {};

common.mixin(AlldayCore, AlldayResize);
util.CustomEvents.mixin(AlldayResize);

module.exports = AlldayResize;

