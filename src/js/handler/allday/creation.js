/**
 * @fileoverview Handler module for WeekdayInWeek view's creation actions.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var common = require('../../common/common');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var alldayCore = require('./core');
var AlldayCreationGuide = require('./creationGuide');
var TZDate = require('../../common/timezone').Date;

/**
 * @constructor
 * @implements {Handler}
 * @mixes AlldayCore
 * @mixes CutomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - Allday view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function AlldayCreation(dragHandler, alldayView, baseController) {
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
     * @type {function}
     */
    this.getEventDataFunc = null;

    /**
     * @type {AlldayCreationGuide}
     */
    this.guide = new AlldayCreationGuide(this);

    domevent.on(alldayView.container, 'dblclick', this._onDblClick, this);
    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destroy method
 */
AlldayCreation.prototype.destroy = function() {
    this.guide.destroy();
    this.dragHandler.off(this);
    this.dragHandler = this.alldayView = this.baseController =
        this.getEventDataFunc = null;
};

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|WeekdayInWeek} return WeekdayInWeek view instance when satiate condition.
 */
AlldayCreation.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (cssClass !== config.classname('weekday-events')) {
        return false;
    }

    target = target.parentNode;
    cssClass = domutil.getClass(target);
    matches = cssClass.match(config.allday.getViewIDRegExp);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.alldayView.children.items, matches[1]);
};

/**
 * Request event model creation to controller by custom events.
 * @fires {AlldayCreation#beforeCreateEvent}
 * @param {object} eventData - event data from AlldayCreation module.
 */
AlldayCreation.prototype._createEvent = function(eventData) {
    var viewOptions = eventData.relatedView.options,
        dateRange = datetime.range(
            datetime.start(datetime.parse(viewOptions.renderStartDate)),
            datetime.end(datetime.parse(viewOptions.renderEndDate)),
            datetime.MILLISECONDS_PER_DAY
        ),
        startXIndex = eventData.dragStartXIndex,
        xIndex = eventData.xIndex,
        starts, ends;

    // when inverse start, end then change it.
    if (xIndex < startXIndex) {
        startXIndex = xIndex + startXIndex;
        xIndex = startXIndex - xIndex;
        startXIndex = startXIndex - xIndex;
    }

    starts = new TZDate(dateRange[startXIndex].getTime());
    ends = datetime.end(dateRange[xIndex]);

    /**
     * @event {AlldayCreation#beforeCreateEvent}
     * @type {object}
     * @property {boolean} isAllDay - whether event is fired in allday view area?
     * @property {Date} starts - select start date
     * @property {Date] ends - select end date
     */
    this.fire('beforeCreateEvent', {
        isAllDay: true,
        starts: starts,
        ends: ends,
        guide: this.guide
    });
};

/**
 * DragStart event handler method.
 * @emits AlldayCreation#alldayCreationDragstart
 * @param {object} dragStartEventData - Drag#dragStart event handler event data.
 */
AlldayCreation.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target),
        getEventDataFunc,
        eventData;

    if (!result) {
        return;
    }

    this.dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    getEventDataFunc = this.getEventDataFunc = this._retriveEventData(this.alldayView, dragStartEventData.originEvent);
    eventData = getEventDataFunc(dragStartEventData.originEvent);

    /**
     * @event AlldayCreation#alldayCreationDragstart
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('alldayCreationDragstart', eventData);
};

/**
 * Drag event handler method.
 * @emits AlldayCreation#alldayCreationDrag
 * @param {object} dragEventData - Drag#drag event handler eventdata.
 */
AlldayCreation.prototype._onDrag = function(dragEventData) {
    var getEventDataFunc = this.getEventDataFunc,
        eventData;

    if (!getEventDataFunc) {
        return;
    }

    eventData = getEventDataFunc(dragEventData.originEvent);

    /**
     * @event AlldayCreation#alldayCreationDrag
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire('alldayCreationDrag', eventData);
};

/**
 * DragEnd event hander method.
 * @emits AlldayCreation#alldayCreationDragend
 * @param {object} dragEndEventData - Drag#DragEnd event handler data.
 * @param {string} [overrideEventName] - override emitted event name when supplied.
 */
AlldayCreation.prototype._onDragEnd = function(dragEndEventData, overrideEventName) {
    var getEventDataFunc = this.getEventDataFunc,
        eventData;

    if (!getEventDataFunc) {
        return;
    }

    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd,
        click: this._onClick
    }, this);

    eventData = getEventDataFunc(dragEndEventData.originEvent);

    this._createEvent(eventData);

    /**
     * @event AlldayCreation#alldayCreationDragend
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this.fire(overrideEventName || 'alldayCreationDragend', eventData);

    this.getEventDataFunc = null;
};

/**
 * Click event handler method.
 * @emits AlldayCreation#alldayCreationClick
 * @param {object} clickEventData - Drag#Click event handler data.
 */
AlldayCreation.prototype._onClick = function(clickEventData) {
    /**
     * @event AlldayCreation#alldayCreationClick
     * @type {object}
     * @property {AlldayView} relatedView - allday view instance.
     * @property {number} datesInRange - date count of this view.
     * @property {number} dragStartXIndex - index number of dragstart grid index.
     * @property {number} xIndex - index number of mouse positions.
     */
    this._onDragEnd(clickEventData, 'alldayCreationClick');
};

/**
 * Dblclick event handler
 * @param {MouseEvent} e - Native MouseEvent
 */
AlldayCreation.prototype._onDblClick = function(e) {
    var target = e.target;
    var result = this.checkExpectedCondition(target);
    var getEventDataFunc, eventData;

    if (!result) {
        return;
    }

    getEventDataFunc = this._retriveEventData(this.alldayView, e);
    eventData = getEventDataFunc(e);

    this.fire('alldayCreationDblClick', eventData);

    this._createEvent(eventData);
};

common.mixin(alldayCore, AlldayCreation);
util.CustomEvents.mixin(AlldayCreation);

module.exports = AlldayCreation;
