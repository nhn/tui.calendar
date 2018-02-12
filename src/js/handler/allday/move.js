/**
 * @fileoverview Move handler for Allday view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = require('tui-code-snippet');
var config = require('../../config');
var common = require('../../common/common');
var domutil = require('../../common/domutil');
var AlldayCore = require('./core');
var AlldayMoveGuide = require('./moveGuide');
var TZDate = require('../../common/timezone').Date;

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
        scheduleBlockElement,
        modelID,
        targetModel,
        getScheduleDataFunc,
        scheduleData;

    if (!result) {
        return;
    }

    scheduleBlockElement = domutil.closest(target, config.classname('.weekday-schedule-block'));
    if (!scheduleBlockElement) {
        return;
    }

    modelID = domutil.getData(scheduleBlockElement, 'id');
    targetModel = controller.schedules.items[modelID];

    if (!targetModel) {
        return;
    }

    if (targetModel.isReadOnly) {
        return;
    }

    getScheduleDataFunc = this._retriveScheduleData(this.alldayView, dragStartEventData.originEvent);
    this.getScheduleDataFunc = getScheduleDataFunc;
    scheduleData = this._dragStart = getScheduleDataFunc(dragStartEventData.originEvent);

    util.extend(scheduleData, {
        scheduleBlockElement: scheduleBlockElement,
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
     * @property {Schedule} model - data object of model isntance.
     * @property {HTMLDivElement} scheduleBlockElement - target schedule block element.
     */
    this.fire('alldayMoveDragstart', scheduleData);
};


/**
 * Drag event handler method.
 * @emits AlldayMove#alldayMoveDrag
 * @param {object} dragEventData - Drag#drag event handler eventdata.
 */
AlldayMove.prototype._onDrag = function(dragEventData) {
    var getScheduleDataFunc = this.getScheduleDataFunc;

    if (!getScheduleDataFunc) {
        return;
    }

    /**
     * @schedule AlldayMove#alldayMoveDrag
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('alldayMoveDrag', getScheduleDataFunc(dragEventData.originEvent));
};

/**
 * Request update schedule model to base controller.
 * @fires AlldayMove#beforeUpdateSchedule
 * @param {object} scheduleData - schedule data from AlldayMove handler module.
 */
AlldayMove.prototype._updateSchedule = function(scheduleData) {
    var schedule = scheduleData.targetModel,
        dateOffset = scheduleData.xIndex - scheduleData.dragStartXIndex,
        newStarts = new TZDate(schedule.start.getTime()),
        newEnds = new TZDate(schedule.end.getTime());

    newStarts = new TZDate(newStarts.setDate(newStarts.getDate() + dateOffset));
    newEnds = new TZDate(newEnds.setDate(newEnds.getDate() + dateOffset));

    /**
     * @event AlldayMove#beforeUpdateSchedule
     * @type {object}
     * @property {Schedule} schedule - schedule instance to update
     * @property {Date} start - start time to update
     * @property {Date} end - end time to update
     */
    this.fire('beforeUpdateSchedule', {
        schedule: schedule,
        start: newStarts,
        end: newEnds
    });
};

/**
 * DragEnd event hander method.
 * @emits AlldayMove#alldayMoveDragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 * @param {?boolean} skipUpdate - true then skip update schedule model.
 */
AlldayMove.prototype._onDragEnd = function(dragEndEventData, overrideEventName, skipUpdate) {
    var getScheduleDataFunc = this.getScheduleDataFunc,
        dragStart = this._dragStart,
        scheduleData;

    if (!getScheduleDataFunc || !dragStart) {
        return;
    }

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    scheduleData = getScheduleDataFunc(dragEndEventData.originEvent);
    util.extend(scheduleData, {
        targetModel: dragStart.model
    });

    if (!skipUpdate) {
        this._updateSchedule(scheduleData);
    }

    /**
     * @event AlldayMove#alldayMoveDragend
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'alldayMoveDragend', scheduleData);

    this.getScheduleDataFunc = this._dragStart = null;
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

