/**
 * @fileoverview Module for resize schedule in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');

var config = require('../../config'),
    datetime = require('../../common/datetime'),
    domutil = require('../../common/domutil'),
    getMousePosData = require('./core'),
    MonthResizeGuide = require('./resizeGuide'),
    TZDate = require('../../common/timezone').Date;

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
    this.getScheduleData = null;

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
 * @fires {MonthResize#beforeUpdateSchedule}
 * @param {object} scheduleCache - cache object that result of single dragging
 *  session.
 */
MonthResize.prototype._updateSchedule = function(scheduleCache) {
    // You can not change the start date of the event. Only the end time can be changed.
    var newEnd = datetime.end(new TZDate(Number(scheduleCache.end))),
        schedule = scheduleCache.schedule;

    /**
     * @event MonthResize#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to update
     * @property {Date} start - start time to update
     * @property {Date} end - end time to update
     */
    this.fire('beforeUpdateSchedule', {
        schedule: schedule,
        start: new TZDate(Number(schedule.getStarts())),
        end: newEnd
    });
};

/**
 * Event handler for Drag#dragStart
 * @fires {MonthResize#monthResizeDragstart}
 * @param {object} dragStartEvent - drag start event data
 */
MonthResize.prototype._onDragStart = function(dragStartEvent) {
    var target = dragStartEvent.target,
        modelID, schedule,
        scheduleData;

    if (!domutil.hasClass(target, config.classname('weekday-resize-handle'))) {
        return;
    }

    target = domutil.closest(target, config.classname('.weekday-schedule-block'));

    if (!target) {
        return;
    }

    modelID = domutil.getData(target, 'id');
    schedule = this.baseController.schedules.items[modelID];

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getScheduleData = getMousePosData(this.monthView);
    scheduleData = this.getScheduleData(dragStartEvent.originEvent);
    scheduleData.target = target;
    scheduleData.model = schedule;

    this._cache = {
        schedule: schedule,
        target: target,
        start: new TZDate(Number(scheduleData.date))
    };

    /**
     * @event {MonthCreation#monthResizeDragstart}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     * @property {HTMLElement} target - schedule block element
     * @property {Schedule} model - model instance
     */
    this.fire('monthResizeDragstart', scheduleData);
};

/**
 * @fires {MonthResize#monthResizeDrag}
 * @param {object} dragEvent - drag event data
 */
MonthResize.prototype._onDrag = function(dragEvent) {
    var scheduleData;

    if (!this.getScheduleData) {
        return;
    }

    scheduleData = this.getScheduleData(dragEvent.originEvent);

    if (!scheduleData) {
        return;
    }

    /**
     * @event {MonthResize#monthResizeDrag}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthResizeDrag', scheduleData);
};

/**
 * @fires {MonthResize#monthResizeDragend}
 * @param {object} dragEndEvent - drag end event data
 */
MonthResize.prototype._onDragEnd = function(dragEndEvent) {
    var cache = this._cache,
        scheduleData;

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    if (!this.getScheduleData) {
        return;
    }

    scheduleData = this.getScheduleData(dragEndEvent.originEvent);

    if (scheduleData) {
        cache.end = new TZDate(Number(scheduleData.date));
        this._updateSchedule(cache);
    }

    /**
     * @event {MonthResize#monthResizeDragend}
     * @type {object}
     * @property {number} x - x index
     * @property {number} y - y index
     * @property {Date} date - drag date
     */
    this.fire('monthResizeDragend', scheduleData);

    this.getScheduleData = this._cache = null;
};

util.CustomEvents.mixin(MonthResize);

module.exports = MonthResize;

