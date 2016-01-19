/**
 * @fileoverview Click handler for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config'),
    datetime = require('../../common/datetime'),
    domutil = require('../../common/domutil');

/**
 * @constructor
 * @implements {Handler}
 * @mixes util.CustomEvents
 * @param {Drag} [dragHandler] - Drag handler instance.
 * @param {Month} [monthView] - Month view instance.
 * @param {Base} [baseController] - Base controller instance.
 */
function MonthClick(dragHandler, monthView, baseController) {
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

    dragHandler.on({
        'click': this._onClick
    }, this);
}

/**
 * Destructor
 */
MonthClick.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.monthView = this.baseController = this.dragHandler = null;
};

/**
 * @fires MonthClick#clickMore
 * @param {object} clickEvent - click event object
 */
MonthClick.prototype._onClick = function(clickEvent) {
    var moreElement, ymd;

    moreElement = domutil.closest(
        clickEvent.target, 
        config.classname('.weekday-exceed')
    ); 

    if (moreElement) {
        ymd = domutil.getData(moreElement, 'ymd');

        /**
         * @event MonthClick#clickMore
         * @type {object}
         * @property {string} ymd - YYYYMMDD formatted date
         * @property {Date} date - target date
         * @property {MouseEvent} originEvent - original event object
         */
        this.fire('clickMore', {
            ymd: ymd,
            date: datetime.parse(ymd),
            originEvent: clickEvent.originEvent
        });
        return;
    }
};

util.CustomEvents.mixin(MonthClick);

module.exports = MonthClick;

