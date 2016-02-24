/**
 * @fileoverview Click handle module for allday events
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
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
 * @emits AlldayClick#clickEvent
 */
AlldayClick.prototype._onClick = function(clickEvent) {
    var self = this,
        target = clickEvent.target,
        timeView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, config.classname('.allday-event-block')),
        eventCollection = this.baseController.events;

    if (!timeView || !blockElement) {
        return;
    }

    eventCollection.doWhenHas(domutil.getData(blockElement, 'id'), function(model) {
        /**
         * @events AlldayClick#clickEvent
         * @type {object}
         * @property {CalEvent} model - model instance
         * @property {MouseEvent} jsEvent - MouseEvent object
         */
        self.fire('clickEvent', {
            model: model,
            jsEvent: clickEvent.originEvent
        });
    });
};

util.CustomEvents.mixin(AlldayClick);

module.exports = AlldayClick;

