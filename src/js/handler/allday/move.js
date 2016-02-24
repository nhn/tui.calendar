/**
 * @fileoverview Move handler for Allday view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var common = require('../../common/common');
var domutil = require('../../common/domutil');
var AlldayCore = require('./core');
var AlldayMoveGuide = require('./moveGuide');

/**
 * @constructor
 * @implements {Handler}
 * @mixes AlldayCore
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - Allday view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function AlldayMove(dragHandler, alldayView, baseController) {
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
     * Temporary variable for dragstart event data.
     * @type {object}
     */
    this._dragStart = null;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);

    /**
     * @type {AlldayMoveGuide}
     */
    this.guide = new AlldayMoveGuide(this);
}

AlldayMove.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.alldayView = this.baseController =
        this.guide = this._dragStart = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|WeekdayInWeek} return WeekdayInWeek view instance when satiate condition.
 */
AlldayMove.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        parentView,
        matches;

    if (~cssClass.indexOf(config.classname('weekday-resize-handle'))) {
        return false;
    }

    parentView = domutil.closest(target, config.classname('.weekday'));

    if (!parentView) {
        return false;
    }

    cssClass = domutil.getClass(parentView);
    matches = cssClass.match(config.allday.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.alldayView.children.items, matches[1]);
};

/**
 * DragStart event handler method.
 * @emits AlldayMove#alldayMoveDragstart
 * @param {object} dragStartEventData - Drag#dragStart event handler event data.
 */
AlldayMove.prototype._onDragStart = function(dragStartEventData) {
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

    eventBlockElement = domutil.closest(target, config.classname('.weekday-event-block'));
    if (!eventBlockElement) {
        return;
    }

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
     * @event AlldayMove#alldayMoveDragstart
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     * @property {CalEvent} model - data object of model isntance.
     * @property {HTMLDivElement} eventBlockElement - target event block element.
     */
    this.fire('alldayMoveDragstart', eventData);
};


/**
 * Drag event handler method.
 * @emits AlldayMove#alldayMoveDrag
 * @param {object} dragEventData - Drag#drag event handler eventdata.
 */
AlldayMove.prototype._onDrag = function(dragEventData) {
    var getEventDataFunc = this.getEventDataFunc;

    if (!getEventDataFunc) {
        return;
    }

    /**
     * @event AlldayMove#alldayMoveDrag
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('alldayMoveDrag', getEventDataFunc(dragEventData.originEvent));
};

/**
 * Request update event model to base controller.
 * @fires AlldayMove#beforeUpdateEvent
 * @param {object} eventData - event data from AlldayMove handler module.
 */
AlldayMove.prototype._updateEvent = function(eventData) {
    var model = eventData.targetModel,
        dateOffset = eventData.xIndex - eventData.dragStartXIndex,
        newStarts = new Date(model.starts.getTime()),
        newEnds = new Date(model.ends.getTime());

    newStarts = new Date(newStarts.setDate(newStarts.getDate() + dateOffset));
    newEnds = new Date(newEnds.setDate(newEnds.getDate() + dateOffset));

    /**
     * @event AlldayMove#beforeUpdateEvent
     * @type {object}
     * @property {CalEvent} model - model instance to update
     * @property {date} starts - start time to update
     * @property {date} ends - end time to update
     */
    this.fire('beforeUpdateEvent', {
        model: model,
        starts: newStarts,
        ends: newEnds
    });
};

/**
 * DragEnd event hander method.
 * @emits AlldayMove#alldayMoveDragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {?boolean} skipUpdate - true then skip update event model.
 */
AlldayMove.prototype._onDragEnd = function(dragEndEventData, overrideEventName, skipUpdate) {
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
     * @event AlldayMove#alldayMoveDragend
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'alldayMoveDragend', eventData);

    this.getEventDataFunc = this._dragStart = null;
};

/**
 * Click event handler method.
 * @emits AlldayMove#alldayMoveClick
 * @param {object} clickEventData - Drag#Click event handler data.
 */
AlldayMove.prototype._onClick = function(clickEventData) {
    /**
     * @event AlldayMove#alldayMoveClick
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this._onDragEnd(clickEventData, 'alldayMoveClick', true);
};

common.mixin(AlldayCore, AlldayMove);
util.CustomEvents.mixin(AlldayMove);

module.exports = AlldayMove;

