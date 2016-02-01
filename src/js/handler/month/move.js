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

MonthMove.prototype._updateEvent = function() {};

/**
 * Event handler for Drag#dragStart
 * @fires {MonthMove#month_move_dragstart}
 * @param {object} dragStartEvent - drag start event data
 */
MonthMove.prototype._onDragStart = function(dragStartEvent) {
    var target = dragStartEvent.target,
        modelID, model,
        eventData;

    if (!domutil.hasClass(target, config.classname('weekday-event-title'))) {
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
    eventData.originEvent = dragStartEvent.originEvent;
    eventData.target = target;
    eventData.model = model;

    this._cache = {
        model: model,
        target: target,
        starts: new Date(+eventData.date)
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
        cache.ends = new Date(+eventData.date);
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

