/**
 * @fileoverview Click handler for month view
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
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
    var self = this,
        moreElement,
        scheduleCollection = this.baseController.schedules,
        blockElement = domutil.closest(clickEvent.target, config.classname('.weekday-schedule-block'))
                    || domutil.closest(clickEvent.target, config.classname('.month-more-schedule'));

    moreElement = domutil.closest(
        clickEvent.target,
        config.classname('.weekday-exceed-in-month')
    );

    if (moreElement) {
        self.fire('clickMore', {
            date: datetime.parse(domutil.getData(moreElement, 'ymd')),
            target: moreElement,
            ymd: domutil.getData(moreElement, 'ymd')
        });
    }

    if (blockElement) {
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

util.CustomEvents.mixin(MonthClick);

module.exports = MonthClick;
