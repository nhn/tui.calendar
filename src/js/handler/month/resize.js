/**
 * @fileoverview Module for resize event in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var config = require('../../config'),
    domutil = require('../../common/domutil'),
    getMousePosData = require('./core');

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

    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destructor
 */
MonthResize.prototype.destroy = function() {
    this.dragHandler.off(this);

    this.dragHandler = this.monthView = this.baseController = null;
};

MonthResize.prototype._updateEvent = function(eventCache) {

};

/**
 * Event handler for Drag#dragStart
 * @fires {MonthResize#month_resize_dragstart}
 * @param {object} dragStartEvent - drag start event data
 */
MonthResize.prototype._onDragStart = function(dragStartEvent) {
    var target = dragStartEvent.target,
        eventData;

    if (!domutil.hasClass(target, config.classname('weekday-resize-handle'))) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getEventData = getMousePosData(this.monthView);

    eventData = this.getEventData(dragStartEvent.originEvent);

    this._cache = {
        starts: new Date(+eventData.date)
    };

    /**
     * @event {MonthCreation#month_resize_dragstart}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
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

module.exports = MonthResize;

