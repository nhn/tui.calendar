/**
 * @fileoverview Module for resize event in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;

var config = require('../../config'),
    domutil = require('../../common/domutil'),
    getMousePosData = require('./core'),
    MonthResizeGuide = require('./resizeGuide');

/**
 * @constructor
 * @param {Drag} dragHandler - Drag handler instance.
 * @param {Month} monthView - Month view instance.
 * @param {Base} baseController - Base controller instance.
 */
function MonthResize(dragHandler, monthView, baseController) {
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
     * @type {MonthResizeGuide}
     */
    this.guide = new MonthResizeGuide(this);

    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destructor
 */
MonthResize.prototype.destroy = function() {
    this.dragHandler.off(this);

    this.dragHandler = this.monthView = this.baseController = null;
};

/**
 * Fire event for update model
 * @fires {MonthResize#beforeUpdateEvent}
 * @param {object} eventCache - cache object that result of single dragging
 *  session.
 */
MonthResize.prototype._updateEvent = function(eventCache) {
    // 일정의 시작 일자를 변경할 순 없음.
    // 종료시간만 변경 가능.
    var newEnds = new Date(+eventCache.ends),
        model = eventCache.model;

    newEnds.setHours(23, 59, 59);

    /**
     * @event MonthResize#beforeUpdateEvent
     * @type {object}
     * @property {CalEvent} model - model instance to update
     * @property {date} starts - start time to update
     * @property {date} ends - end time to update
     */
    this.fire('beforeUpdateEvent', {
        model: model,
        starts: new Date(+model.getStarts()),
        ends: newEnds
    });
};

/**
 * Event handler for Drag#dragStart
 * @fires {MonthResize#month_resize_dragstart}
 * @param {object} dragStartEvent - drag start event data
 */
MonthResize.prototype._onDragStart = function(dragStartEvent) {
    var target = dragStartEvent.target,
        modelID, model,
        eventData;

    if (!domutil.hasClass(target, config.classname('weekday-resize-handle'))) {
        return;
    }

    target = domutil.closest(target, config.classname('.weekday-event-block'));

    if (!target) {
        return;
    }

    modelID = domutil.getData(target, 'id');
    model = this.baseController.events.items[modelID];

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getEventData = getMousePosData(this.monthView);
    eventData = this.getEventData(dragStartEvent.originEvent);
    eventData.target = target;
    eventData.model = model;

    this._cache = {
        model: model,
        target: target,
        starts: new Date(+eventData.date)
    };

    target.style.display = 'none';

    /**
     * @event {MonthCreation#month_resize_dragstart}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     * @property {HTMLElement} target - event block element
     * @property {CalEvent} model - model instance
     */
    this.fire('month_resize_dragstart', eventData);
};

/**
 * @fires {MonthResize#month_resize_drag}
 * @param {object} dragEvent - drag event data
 */
MonthResize.prototype._onDrag = function(dragEvent) {
    var eventData;

    if (!this.getEventData) {
        return;
    }

    eventData = this.getEventData(dragEvent.originEvent);

    if (!eventData) {
        return;
    }
    
    /**
     * @event {MonthCreation#month_resize_drag}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('month_resize_drag', eventData);
};

/**
 * @fires {MonthResize#month_resize_dragend}
 * @param {object} dragEndEvent - drag end event data
 */
MonthResize.prototype._onDragEnd = function(dragEndEvent) {
    var cache = this._cache,
        eventData;

    cache.target.style.display = 'block';

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    if (!this.getEventData) {
        return;
    }

    eventData = this.getEventData(dragEndEvent.originEvent);

    if (eventData) {
        cache.ends = new Date(+eventData.date);
        this._updateEvent(cache);
    }

    /**
     * @event {MonthResize#month_resize_dragend}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('month_resize_dragend', eventData);

    this.getEventData = this._cache = null;
};

util.CustomEvents.mixin(MonthResize);

module.exports = MonthResize;

