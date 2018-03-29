/**
 * @fileoverview Click handle module for allday schedules
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var domutil = require('../../common/domutil');
var AlldayMove = require('./move');

/**
 * @constructor
 * @implements {Handler}
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Allday} [alldayView] - allday view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function AlldayClick(dragHandler, alldayView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {Allday}
     */
    this.alldayView = alldayView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    dragHandler.on({
        'click': this._onClick
    }, this);
}

/**
 * Destroy handler module
 */
AlldayClick.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.alldayView = this.baseController = this.dragHandler = null;
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {string} - model id
 */
AlldayClick.prototype.checkExpectCondition = AlldayMove.prototype.checkExpectedCondition;

/**
 * Click event handler
 * @param {object} clickEvent - click event data
 * @emits AlldayClick#clickSchedule
 */
AlldayClick.prototype._onClick = function(clickEvent) {
    var self = this,
        target = clickEvent.target,
        timeView = this.checkExpectCondition(target),
        scheduleCollection = this.baseController.schedules,
        collapseElement = domutil.closest(
            clickEvent.target,
            config.classname('.weekday-collapse-btn')
        );
    var blockElement, scheduleElement;

    if (collapseElement) {
        self.fire('clickCollapse');

        return;
    }

    if (!timeView) {
        return;
    }

    if (this._onClickMoreElement(clickEvent.target)) {
        return;
    }

    scheduleElement = domutil.closest(target, config.classname('.weekday-schedule'));
    if (scheduleElement) {
        blockElement = domutil.closest(target, config.classname('.weekday-schedule-block'));
        scheduleCollection.doWhenHas(domutil.getData(blockElement, 'id'), function(schedule) {
            /**
             * @events AlldayClick#clickSchedule
             * @type {object}
             * @property {Schedule} schedule - schedule instance
             * @property {MouseEvent} event - MouseEvent object
             */
            self.fire('clickSchedule', {
                schedule: schedule,
                event: clickEvent.originEvent
            });
        });
    }
};

AlldayClick.prototype._onClickMoreElement = function(target) {
    var moreElement = domutil.closest(target, config.classname('.weekday-exceed-in-week'));
    var index = moreElement.dataset ? moreElement.dataset.index : moreElement.getAttribute('data-index');
    var parseInt = Number.parseInt || window.parseInt;

    if (moreElement) {
        this.fire('clickExpand', parseInt(index || 0, 10));

        return true;
    }

    return false;
};

util.CustomEvents.mixin(AlldayClick);

module.exports = AlldayClick;
