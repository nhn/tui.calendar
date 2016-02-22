/**
 * @fileoverview Move handler for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;

var config = require('../../config'),
    domutil = require('../../common/domutil'),
    getMousePosData = require('./core'),
    MonthMoveGuide = require('./moveGuide');

/**
 * @constructor
 * @mixes CustomEvents
 * @param {Drag} dragHandler - Drag handler instance.
 * @param {Month} monthView - Month view instance.
 * @param {Base} baseController - Base controller instance.
 */
function MonthMove(dragHandler, monthView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {Month}
     */
    this.monthView = monthView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {function}
     */
    this.getEventData = null;

    /**
     * @type {object}
     */
    this._cache = null;

    /**
     * @type {MonthMoveGuide}
     */
    this.guide = new MonthMoveGuide(this);

    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destructor
 */
MonthMove.prototype.destroy = function() {
    this.dragHandler.off(this);

    this.dragHandler = this.monthView = this.baseController = null;
};

/**
 * Update target event
 * @fires {MonthMove#beforeUpdateEvent}
 * @param {object} eventCache - cache object that result of single dragging
 *  session.
 */
MonthMove.prototype._updateEvent = function(eventCache) {
    var model = eventCache.model,
        duration = Number(model.duration()),
        dragEndTime = Number(eventCache.ends);

    /**
     * @event MonthMove#beforeUpdateEvent
     * @type {object}
     * @property {CalEvent} model - model instance to update
     * @property {date} starts - start time to update
     * @property {date} ends - end time to update
     */
    this.fire('beforeUpdateEvent', {
        model: model,
        starts: new Date(dragEndTime),
        ends: new Date(dragEndTime + duration)
    });
};

/**
 * Get event block to clone for month guide effect
 * @param {HTMLElement} target - target element that related with drag event
 * @returns {HTMLElement} element to create guide effect
 */
MonthMove.prototype.getMonthEventBlock = function(target) {
    var blockSelector = config.classname('.weekday-event-block'),
        element = domutil.closest(target, blockSelector);

    if (!element) {
        element = target;
    }

    return element;
};

/**
 * Check event start from month view
 * @param {HTMLElement} target - element to check
 * @returns {boolean} whether event start from month view?
 */
MonthMove.prototype.isMonthEventBlock = function(target) {
    var titleClassName = config.classname('weekday-event-title');

    if (!domutil.hasClass(target, titleClassName)) {
        return false;
    }

    target = this.getMonthEventBlock(target);

    if (!target) {
        return false;
    }

    return true;
};

/**
 * Check event start from more layer
 * @param {HTMLElement} target - element to check
 * @returns {boolean} whether event start from more layer?
 */
MonthMove.prototype.isMoreLayerEventBlock = function(target) {
    var className = config.classname('month-more-event');

    return domutil.hasClass(target, className);
};

/**
 * Check handler has permission to handle fired event
 * @fires {MonthMove#month_move_start_from_morelayer}
 * @param {HTMLElement} target - target element of fired event
 * @returns {(string|null)} model instance ID related with event. if handle
 *  has not permission to handle the event then return null.
 */
MonthMove.prototype.hasPermissionToHandle = function(target) {
    var modelID = null,
        selector;

    if (this.isMonthEventBlock(target)) {
        selector = config.classname('.weekday-event-block');
        modelID = domutil.getData(domutil.closest(target, selector), 'id');
    } else if (this.isMoreLayerEventBlock(target)) {
        modelID = domutil.getData(target, 'id');
        /**
         * Fire for notificate that the drag event start at more layer view.
         * @event {MonthMove#month_move_start_from_morelayer}
         */
        this.fire('month_move_start_from_morelayer');
    }

    return modelID;
};

/**
 * Event handler for Drag#dragStart
 * @fires {MonthMove#month_move_dragstart}
 * @param {object} dragStartEvent - drag start event data
 */
MonthMove.prototype._onDragStart = function(dragStartEvent) {
    var target = dragStartEvent.target,
        modelID = this.hasPermissionToHandle(target),
        model,
        eventData;

    if (!modelID) {
        return;
    }

    model = this.baseController.events.items[modelID];

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getEventData = getMousePosData(this.monthView);

    eventData = this.getEventData(dragStartEvent.originEvent);
    eventData.originEvent = dragStartEvent.originEvent;
    eventData.target = this.getMonthEventBlock(target);
    eventData.model = model;

    this._cache = {
        model: model,
        target: target,
        starts: new Date(Number(eventData.date))
    };

    /**
     * @event {MonthMove#month_move_dragstart}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     * @property {HTMLElement} target - event block element
     * @property {CalEvent} model - model instance
     */
    this.fire('month_move_dragstart', eventData);
};


/**
 * @fires {MonthMove#month_move_drag}
 * @param {object} dragEvent - drag event data
 */
MonthMove.prototype._onDrag = function(dragEvent) {
    var eventData;

    if (!this.getEventData) {
        return;
    }

    eventData = util.extend({
        originEvent: dragEvent.originEvent
    }, this.getEventData(dragEvent.originEvent));

    if (!eventData) {
        return;
    }

    /**
     * @event {MonthMove#month_move_drag}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('month_move_drag', eventData);
};

/**
 * Event handler for Drag#dragEnd
 * @fires {MonthMove#month_move_dragend}
 * @param {object} dragEndEvent - dragend event data
 */
MonthMove.prototype._onDragEnd = function(dragEndEvent) {
    var cache = this._cache,
        eventData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    if (!this.getEventData) {
        return;
    }

    eventData = this.getEventData(dragEndEvent.originEvent);

    if (eventData) {
        cache.ends = new Date(Number(eventData.date));
        this._updateEvent(cache);
    }

    /**
     * @event {MonthResize#month_move_dragend}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('month_move_dragend', eventData);

    this.getEventData = this._cache = null;
};

util.CustomEvents.mixin(MonthMove);

module.exports = MonthMove;

