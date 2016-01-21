/**
 * @fileoverview Creation guide module for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var domutil = require('../../common/domutil');

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
     * @type {HTMLElement[]}
     */
    this.guideElements = [];

    monthCreation.on({
        month_creation_dragstart: this._onDragStart,
        month_creation_drag: this._onDrag,
        month_creation_dragend: this._onDragEnd
    }, this);
}

MonthCreationGuide.prototype._onDragStart = function() {};

MonthCreationGuide.prototype._onDrag = function() {};

MonthCreationGuide.prototype._onDragEnd = function() {};

module.exports = MonthCreationGuide;

