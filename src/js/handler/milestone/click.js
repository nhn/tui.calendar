/**
 * @fileoverview 마일스톤 항목 클릭 이벤트 핸들러 모듈
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var domutil = require('../../common/domutil');

/**
 * 마일스톤 클릭 이벤트 핸들러 모듈
 * @constructor
 * @implelements {Handler}
 * @mixes util.CustomEvents
 * @param {Drag} dragHandler - dragHandler instance
 * @param {Milestone} milestoneView - milstone view instance
 * @param {Base} baseController - baseController instance
 */
function MilestoneClick(dragHandler, milestoneView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {Milestone}
     */
    this.milestoneView = milestoneView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    dragHandler.on({
        'click': this._onClick
    }, this);
}

/**
 * Destroy
 */
MilestoneClick.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.dragHandler = this.milestoneView = this.baseController = null;
};

/**
 * @param {HTMLElement} target - check reponsibility to this handler module supplied element
 * @returns {boolean|string} return false when handler has no responsibility for supplied element.
 * otherwise, return schedule model id that related with target element.
 */
MilestoneClick.prototype.checkExpectedCondition = function(target) {
    target = domutil.closest(target, config.classname('.milestone-item'));

    if (!target) {
        return false;
    }

    return domutil.getData(target, 'id');
};

/**
 * @emits MilestoneClick#clickSchedule
 * @param {object} clickEvent - click event object
 */
MilestoneClick.prototype._onClick = function(clickEvent) {
    var self = this,
        modelID = this.checkExpectedCondition(clickEvent.target);

    if (!modelID) {
        return;
    }

    this.baseController.schedules.doWhenHas(modelID, function(schedule) {
        /**
         * @events MilestoneClick#clickEvent
         * @type {object}
         * @property {Schedule} schedule - schedule instance
         * @property {MouseEvent} event - MouseEvent object
         */
        self.fire('clickSchedule', {
            schedule: schedule,
            event: clickEvent.originEvent
        });
    });
};

util.CustomEvents.mixin(MilestoneClick);

module.exports = MilestoneClick;

