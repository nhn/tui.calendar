/**
 * @fileoverview Creation guide module for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var MonthGuide = require('./guide');

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
    this.monthCreation.off(this);

    if (this.guide) {
        this.guide.destroy();
    }

    this.guide = this.monthCreation = null;
};

/**
 * Drag start event handler
 * @param {object} dragStartEvent - event data from MonthCreation
 */
MonthCreationGuide.prototype._onDragStart = function(dragStartEvent) {
    this.guide = new MonthGuide(null, this.monthCreation.monthView);
    this.guide.start(dragStartEvent);
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
 */
MonthCreationGuide.prototype._onDragEnd = function() {
    this.guide.destroy();
    this.guide = null;
};

module.exports = MonthCreationGuide;

