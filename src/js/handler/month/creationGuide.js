/**
 * @fileoverview Creation guide module for month view
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
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
        monthCreationDragstart: this._createGuideElement,
        monthCreationDrag: this._onDrag,
        monthCreationDragend: this._onDragEnd,
        monthCreationClick: this._createGuideElement
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
 * @param {object} dragStartEvent - schedule data from MonthCreation
 */
MonthCreationGuide.prototype._createGuideElement = function(dragStartEvent) {
    var options = {
        isCreationMode: true,
        height: '100%',
        top: 0
    };

    this.guide = new MonthGuide(options, this.monthCreation.monthView);
    this.guide.start(dragStartEvent);
};

/**
 * Drag event handler
 * @param {object} dragEvent - schedule data from MonthCreation
 */
MonthCreationGuide.prototype._onDrag = function(dragEvent) {
    this.guide.update(dragEvent.x, dragEvent.y);
};

/**
 * Drag end event handler
 */
MonthCreationGuide.prototype._onDragEnd = function() {
    // Do nothing. User calls destroy directly.
    this.guide = null;
};

module.exports = MonthCreationGuide;
