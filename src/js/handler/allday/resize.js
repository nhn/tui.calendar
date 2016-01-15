/**
 * @fileoverview Resize handler module for Allday view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var common = require('../../common/common');
var AlldayCore = require('./core');
var AlldayResizeGuide = require('./resizeGuide');

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
     * Temporary variable for dragStart event data.
     * @type {object}
     */
    this._dragStart = null;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);

    /**
     * @type {AlldayResizeGuide}
     */
    this.guide = new AlldayResizeGuide(this);
}

/**
 * Destroy method
 */
AlldayResize.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.alldayView = this.baseController =
        this.guide = this._dragStart = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|MonthWeek} return MonthWeek view instance when satiate condition.
 */
AlldayResize.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (!~cssClass.indexOf(config.classname('monthweek-resize-handle'))) {
        return false;
    }

    target = domutil.closest(target, config.classname('.monthweek'));

    if (!target) {
        return false;
    }

    cssClass = domutil.getClass(target);
    matches = cssClass.match(config.allday.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.alldayView.children.items, matches[1]);
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

    eventBlockElement = domutil.closest(target, config.classname('.monthweek-event-block'));
    modelID = domutil.getData(eventBlockElement, 'id');
    targetModel = controller.events.items[modelID];

    if (!targetModel) {
        return;
    }

    getEventDataFunc = this.getEventDataFunc = this._retriveEventData(this.alldayView, dragStartEventData.originEvent);
    eventData = this._dragStart = getEventDataFunc(dragStartEventData.originEvent);

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
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     * @property {CalEvent} model - data object of model isntance.
     * @property {HTMLDivElement} eventBlockElement - target event block element.
     */
    this.fire('allday_resize_dragstart', eventData);
};

/**
 * Drag event handler method.
 * @emits AlldayResize#allday_resize_drag
 * @param {object} dragEventData - Drag#drag event handler eventdata.
 */
AlldayResize.prototype._onDrag = function(dragEventData) {
    var getEventDataFunc = this.getEventDataFunc;

    if (!getEventDataFunc) {
        return;
    }

    /**
     * @event AlldayResize#allday_resize_drag
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('allday_resize_drag', getEventDataFunc(dragEventData.originEvent));
};

/**
 * Request update event instance to base controller.
 * @fires AlldayResize#beforeUpdateEvent
 * @param {object} eventData - event data from AlldayResize handler.
 */
AlldayResize.prototype._updateEvent = function(eventData) {
    var model = eventData.targetModel,
        dateOffset = eventData.xIndex - eventData.dragStartXIndex,
        newEnds = new Date(model.ends.getTime());

    newEnds = new Date(newEnds.setDate(newEnds.getDate() + dateOffset));
    newEnds = new Date(Math.max(datetime.end(model.starts).getTime(), newEnds.getTime()));

    /**
     * @event AlldayResize#beforeUpdateEvent
     * @type {object}
     * @property {CalEvent} model - model instance to update
     * @property {date} starts - start time to update
     * @property {date} ends - end time to update
     */
    this.fire('beforeUpdateEvent', {
        model: model,
        starts: model.getStarts(),
        ends: newEnds
    });
};

/**
 * DragEnd event hander method.
 * @emits AlldayResize#allday_resize_dragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {?boolean} skipUpdate - true then skip update event model.
 */
AlldayResize.prototype._onDragEnd = function(dragEndEventData, overrideEventName, skipUpdate) {
    var getEventDataFunc = this.getEventDataFunc,
        dragStart = this._dragStart,
        eventData;

    if (!getEventDataFunc || !dragStart) {
        return;
    }

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    eventData = getEventDataFunc(dragEndEventData.originEvent);
    util.extend(eventData, {
        targetModel: dragStart.model
    });

    if (!skipUpdate) {
        this._updateEvent(eventData);
    }

    /**
     * @event AlldayResize#allday_resize_dragend
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'allday_resize_dragend', eventData);

    this.getEventDataFunc = this._dragStart = null;
};

/**
 * Click event handler method.
 * @emits AlldayResize#allday_resize_click
 * @param {object} clickEventData - Drag#Click event handler data.
 */
AlldayResize.prototype._onClick = function(clickEventData) {
    /**
     * @event AlldayResize#allday_resize_click
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this._onDragEnd(clickEventData, 'allday_resize_click', true);
};

common.mixin(AlldayCore, AlldayResize);
util.CustomEvents.mixin(AlldayResize);

module.exports = AlldayResize;

