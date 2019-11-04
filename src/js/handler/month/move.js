/**
 * @fileoverview Move handler for month view
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');

var config = require('../../config'),
    domutil = require('../../common/domutil'),
    datetime = require('../../common/datetime'),
    getMousePosData = require('./core'),
    MonthMoveGuide = require('./moveGuide'),
    TZDate = require('../../common/timezone').Date;

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
    this.getScheduleData = null;

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
 * Update target schedule
 * @fires {MonthMove#beforeUpdateSchedule}
 * @param {object} scheduleCache - cache object that result of single dragging
 *  session.
 */
MonthMove.prototype.updateSchedule = function(scheduleCache) {
    var schedule = scheduleCache.model;
    var duration = schedule.duration();
    var startDateRaw = datetime.raw(schedule.start);
    var dragEndTime = new TZDate(scheduleCache.end);
    var newStartDate = new TZDate(dragEndTime);

    newStartDate.setHours(startDateRaw.h, startDateRaw.m, startDateRaw.s, startDateRaw.ms);

    /**
     * @event MonthMove#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - The original schedule instance
     * @property {Date} start - Deprecated: start time to update
     * @property {Date} end - Deprecated: end time to update
     * @property {object} changes - start and end time to update
     *  @property {Date} start - start time to update
     *  @property {Date} end - end time to update
     */
    this.fire('beforeUpdateSchedule', {
        schedule: schedule,
        changes: {
            start: newStartDate,
            end: new TZDate(newStartDate).addMilliseconds(duration)
        },
        start: newStartDate,
        end: new TZDate(newStartDate).addMilliseconds(duration)
    });
};

/**
 * Get schedule block to clone for month guide effect
 * @param {HTMLElement} target - target element that related with drag schedule
 * @returns {HTMLElement} element to create guide effect
 */
MonthMove.prototype.getMonthScheduleBlock = function(target) {
    var blockSelector = config.classname('.weekday-schedule-block');

    return domutil.closest(target, blockSelector);
};

/**
 * Get schedule block from more layer
 * @param {HTMLElement} target - element to check
 * @returns {HTMLElement} schedule element
 */
MonthMove.prototype.getMoreLayerScheduleBlock = function(target) {
    var className = config.classname('.month-more-schedule');

    return domutil.closest(target, className);
};

/**
 * Check handler has permission to handle fired schedule
 * @fires {MonthMove#monthMoveStart_from_morelayer}
 * @param {HTMLElement} target - target element of fired schedule
 * @returns {(string|null)} model instance ID related with schedule. if handle
 *  has not permission to handle the schedule then return null.
 */
MonthMove.prototype.hasPermissionToHandle = function(target) {
    var modelID = null;
    var blockElement;

    if (domutil.hasClass(target, config.classname('weekday-resize-handle'))) {
        return null;
    }

    blockElement = this.getMonthScheduleBlock(target);

    if (blockElement) {
        modelID = domutil.getData(blockElement, 'id');
    } else {
        blockElement = this.getMoreLayerScheduleBlock(target);

        if (blockElement) {
            modelID = domutil.getData(blockElement, 'id');
            /**
             * Fire for notificate that the drag schedule start at more layer view.
             * @event {MonthMove#monthMoveStart_from_morelayer}
             */
            this.fire('monthMoveStart_from_morelayer');
        }
    }

    return modelID;
};

/**
 * Event handler for Drag#dragStart
 * @fires {MonthMove#monthMoveDragstart}
 * @param {object} dragStartEvent - drag start schedule data
 */
MonthMove.prototype._onDragStart = function(dragStartEvent) {
    var target = dragStartEvent.target,
        modelID = this.hasPermissionToHandle(target),
        model = this.baseController.schedules.items[modelID],
        scheduleData;

    if (!modelID || !model || model.isReadOnly || model.isPending) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getScheduleData = getMousePosData(this.monthView);

    scheduleData = this.getScheduleData(dragStartEvent.originEvent);
    scheduleData.originEvent = dragStartEvent.originEvent;
    scheduleData.target = this.getMonthScheduleBlock(target);
    scheduleData.model = model;

    this._cache = {
        model: model,
        target: target,
        start: new TZDate(Number(scheduleData.date))
    };

    /**
     * @event {MonthMove#monthMoveDragstart}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     * @property {HTMLElement} target - schedule block element
     * @property {Schedule} model - model instance
     */
    this.fire('monthMoveDragstart', scheduleData);
};

/**
 * @fires {MonthMove#monthMoveDrag}
 * @param {object} dragEvent - drag event data
 */
MonthMove.prototype._onDrag = function(dragEvent) {
    var scheduleData;

    if (!this.getScheduleData) {
        return;
    }

    scheduleData = util.extend({
        originEvent: dragEvent.originEvent
    }, this.getScheduleData(dragEvent.originEvent));

    if (!scheduleData) {
        return;
    }

    /**
     * @event {MonthMove#monthMoveDrag}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthMoveDrag', scheduleData);
};

/**
 * Event handler for Drag#dragEnd
 * @fires {MonthMove#monthMoveDragend}
 * @param {object} dragEndEvent - dragend event data
 */
MonthMove.prototype._onDragEnd = function(dragEndEvent) {
    var cache = this._cache;
    var scheduleData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    if (!this.getScheduleData) {
        return;
    }

    scheduleData = this.getScheduleData(dragEndEvent.originEvent);

    if (scheduleData) {
        cache.end = new TZDate(scheduleData.date);
        this.updateSchedule(cache);
    }

    /**
     * @event {MonthResize#monthMoveDragend}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthMoveDragend', scheduleData);

    this.getScheduleData = this._cache = null;
};

util.CustomEvents.mixin(MonthMove);

module.exports = MonthMove;
