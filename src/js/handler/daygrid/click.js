/**
 * @fileoverview Click handle module for daygrid schedules
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var domutil = require('../../common/domutil');
var DayGridMove = require('./move');

/**
 * @constructor
 * @implements {Handler}
 * @mixes CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {DayGrid} [view] - daygrid view instance.
 * @param {Base} [controller] - Base controller instance.
 */
function DayGridClick(dragHandler, view, controller) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {DayGrid}
     */
    this.view = view;

    /**
     * @type {Base}
     */
    this.controller = controller;

    dragHandler.on({
        'click': this._onClick
    }, this);
}

/**
 * Destroy handler module
 */
DayGridClick.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.view = this.controller = this.dragHandler = null;
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {string} - model id
 */
DayGridClick.prototype.checkExpectCondition = DayGridMove.prototype.checkExpectedCondition;

/**
 * Click event handler
 * @param {object} clickEvent - click event data
 * @emits DayGridClick#clickSchedule
 * @emits DayGridClick#collapse
 * @emits DayGridClick#expand
 */
DayGridClick.prototype._onClick = function(clickEvent) {
    var self = this,
        target = clickEvent.target,
        dayGridScheduleView = this.checkExpectCondition(target),
        scheduleCollection = this.controller.schedules,
        collapseBtnElement = domutil.closest(
            target,
            config.classname('.weekday-collapse-btn')
        ),
        expandBtnElement = domutil.closest(
            target,
            config.classname('.weekday-exceed-in-week')
        ),
        containsTarget = this.view.container.contains(target);
    var blockElement, scheduleElement;

    if (!containsTarget) {
        return;
    }

    if (collapseBtnElement) {
        /**
         * click collpase btn event
         * @events DayGridClick#collapse
         */
        self.fire('collapse');

        return;
    }

    if (expandBtnElement) {
        this.view.setState({
            clickedExpandBtnIndex: parseInt(domutil.getData(expandBtnElement, 'index'), 10)
        });

        /**
         * click expand btn event
         * @events DayGridClick#expand
         */
        self.fire('expand');

        return;
    }

    if (!dayGridScheduleView) {
        return;
    }

    scheduleElement = domutil.closest(target, config.classname('.weekday-schedule'));
    if (scheduleElement) {
        blockElement = domutil.closest(target, config.classname('.weekday-schedule-block'));
        scheduleCollection.doWhenHas(domutil.getData(blockElement, 'id'), function(schedule) {
            /**
             * @events DayGridClick#clickSchedule
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

util.CustomEvents.mixin(DayGridClick);

module.exports = DayGridClick;
