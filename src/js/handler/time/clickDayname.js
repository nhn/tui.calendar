/**
 * @fileoverview Dayname click event hander module
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var domutil = require('../../common/domutil');

/**
 * @constructor
 * @implements {Handler}
 * @mixes util.CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {DayName} [dayNameView] - DayName view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function DayNameClick(dragHandler, dayNameView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {DayName}
     */
    this.dayNameView = dayNameView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    dragHandler.on({
        'click': this._onClick
    }, this);
}

/**
 * Destroy method
 */
DayNameClick.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.dayNameView = this.baseController = this.dragHandler = null;
};

/**
 * Check target element is expected condition for activate this plugins.
 * @param {HTMLElement} target - The element to check
 * @returns {string} - model id
 */
DayNameClick.prototype.checkExpectCondition = function(target) {
    var container = domutil.closest(target, config.classname('.dayname-date-area'));

    if (!container) {
        return false;
    }

    return true;
};

/**
 * Click event hander
 * @param {object} clickEvent - click event from {@link Drag}
 * @emits DayNameClick#clickDayname
 */
DayNameClick.prototype._onClick = function(clickEvent) {
    var self = this,
        target = clickEvent.target,
        daynameView = this.checkExpectCondition(target),
        blockElement = domutil.closest(target, config.classname('.dayname'));

    if (!daynameView || !blockElement) {
        return;
    }

    /**
     * @events DayNameClick#clickDayname
     * @type {object}
     * @property {string} date - click date
     */
    self.fire('clickDayname', {
        date: domutil.getData(blockElement, 'date')
    });
};

util.CustomEvents.mixin(DayNameClick);

module.exports = DayNameClick;
