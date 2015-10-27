/**
 * @fileoverview Allday event click event hander module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../../common/domutil');
var parseTimeViewIDRx = /^schedule-view-time-date[\s]schedule-view-(\d+)/;

/**
 * @constructor
 * @implements {Handler}
 * @mixes util.CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {TimeGrid} [timeGridView] - TimeGrid view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function TimeClick(dragHandler, timeGridView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = null;

    /**
     * @type {TimeGrid}
     */
    this.timeGridView = null;

    /**
     * @type {Base}
     */
    this.baseController = null;

    this.connect(dragHandler, timeGridView, baseController);
}

/**
 * Connect hander, view, controller.
 * @param {Drag} dragHandler - dragHandler instance
 * @param {TimeGrid} timeGridView - timeGrid instance
 * @param {Base} baseController - controller instance
 */
TimeClick.prototype.connect = function(dragHandler, timeGridView, baseController) {
    this.dragHandler = dragHandler;
    this.timeGridView = timeGridView;
    this.baseController = baseController;

    dragHandler.on({
        'click': this._onClick
    }, this);
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {string} - model id
 */
TimeClick.prototype.checkExpectCondition = function(target) {
    var container = domutil.closest(target, '.schedule-view-time-date'),
        matches;

    if (!container) {
        return false;
    }

    matches = domutil.getClass(container).match(parseTimeViewIDRx);

    if (!matches || matches.length < 2) {
        return false;
    }

    return util.pick(this.timeGridView.childs.items, +matches[1]);
};

/**
 * Click event hander
 * @param {object} clickEvent - click event from {@link Drag}
 * @emits TimeClick#time_click_click
 */
TimeClick.prototype._onClick = function(clickEvent) {
    var target = clickEvent.target,
        timeView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, '.schedule-view-time-date-event-block'),
        eventCollection = this.baseController.events;

    if (!timeView || !blockElement) {
        return;
    }

    eventCollection.doWhenHas(domutil.getData(blockElement, 'id'), function(model) {
        /**
         * @events TimeClick#time_click_click
         * @type {object}
         * @property {Event} model - model instance
         */
        this.fire('time_click_click', {
            model:  model
        });
    }, this);
};

util.CustomEvents.mixin(TimeClick);

module.exports = TimeClick;

