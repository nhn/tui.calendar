/**
 * @fileoverview Creation guide module for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config'),
    common = require('../../common/common'),
    domutil = require('../../common/domutil'),
    MonthGuide = require('./guide');

/**
 * @constructor
 * @param {MonthCreation} monthCreation - instance of MonthCreation
 */
function MonthCreationGuide(monthCreation) {
    /**
     * @type {MonthCreation}
     */
    this.monthCreation = monthCreation;

    /**
     * @type {MonthGuide}
     */
    this.guide = null; 

    monthCreation.on({
        month_creation_dragstart: this._onDragStart,
        month_creation_drag: this._onDrag,
        month_creation_dragend: this._onDragEnd
    }, this);
}

/**
 * Destructor
 */
MonthCreationGuide.prototype.destroy = function() {
    util.forEach(this.guideElements, function(guideElement) {
        domutil.remove(guideElement);
    });

    this.monthCreation.off(this);
    this.guide = this.monthCreation = null;
};

/**
 * Drag start event handler
 * @param {object} dragStartEvent - event data from MonthCreation
 */
MonthCreationGuide.prototype._onDragStart = function(dragStartEvent) {
    this.guide = new MonthGuide(this.monthCreation.monthView);

    this.guide.start(dragStartEvent.x, dragStartEvent.y);
};

/**
 * Drag event handler
 * @param {object} dragEvent - event data from MonthCreation
 */
MonthCreationGuide.prototype._onDrag = function(dragEvent) {
    this.guide.update(dragEvent.x, dragEvent.y);

};

/**
 * Drag end event handler
 * @param {object} dragEndEvent - event data from MonthCreation
 */
MonthCreationGuide.prototype._onDragEnd = function(dragEndEvent) {
    this.guide.clear();
};


module.exports = MonthCreationGuide;

