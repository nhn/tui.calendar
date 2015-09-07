/**
 * @fileoverview Handler module for MonthWeek view's creation actions.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.ne.util;
var domutil = require('../../common/domutil');

var parseViewIDRx = /^schedule-view-allday-monthweek[\s]schedule-view-(\d+)/;

/**
 * @constructor
 * @implements {Handler}
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - MonthWeek view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function AlldayCreation(dragHandler, alldayView, baseController) {    // eslint-disable-line
    /**
     * Drag handler instance.
     * @type {Drag}
     */
    this.dragHandler = null;

    /**
     * allday view instance.
     * @type {Allday}
     */
    this.alldayView = null;

    /**
     * Base controller instance.
     * @type {Base}
     */
    this.baseController = null;

    if (arguments.length) {
        this.connect.apply(this, arguments);
    }
}

/**
 * Check dragstart target is expected conditions for this handler.
 * @param {HTMLElement} target - dragstart event handler's target element.
 * @returns {boolean|MonthWeek} return MonthWeek view instance when satiate condition.
 */
AlldayCreation.prototype.checkExpectedCondition = function(target) {
    var cssClass = domutil.getClass(target),
        matches;

    if (cssClass !== 'schedule-view-monthweek-events') {
        return false;
    }

    target = target.parentNode;
    cssClass = domutil.getClass(target);
    matches = cssClass.match(parseViewIDRx);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.alldayView.childs.items, matches[1]);
};

/**
 * Connect handler, view, controller.
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - MonthWeek view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
AlldayCreation.prototype.connect = function(dragHandler, alldayView, baseController) {
    this.dragHandler = dragHandler;
    this.alldayView = alldayView;
    this.baseController = baseController;

    dragHandler.on({
        dragStart: this._onDragStart
    }, this);
};

/**
 * DragStart event handler method.
 * @param {object} dragStartEventData - Drag#dragStart event handler event data.
 */
AlldayCreation.prototype._onDragStart = function(dragStartEventData) {
    var target = dragStartEventData.target,
        result = this.checkExpectedCondition(target);

    //TODO: implements
    console.log(result);
};

module.exports = AlldayCreation;

