/**
 * @fileoverview Module for modification of guide element in event resize
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;

var config = require('../../config'),
    domutil = require('../../common/domutil'),
    MonthGuide = require('./guide');

/**
 * @constructor
 * @param {MonthResize} monthResize - month/resize module instance
 */
function MonthResizeGuide(monthResize) {
    /**
     * @type {MonthResize}
     */
    this.monthResize = monthResize;

    /**
     * @type {MonthGuide}
     */
    this.guide = null; 

    monthResize.on({
        month_resize_dragstart: this._onDragStart,
        month_resize_drag: this._onDrag,
        month_resize_dragend: this._onDragEnd
    }, this);
}

/**
 * Destructor
 */
MonthResizeGuide.prototype.destroy = function() {
    this.monthResize.off(this);
    this.guide.destroy();

    this.guide = this.monthResize = null;
};

/**
 * Drag start event handler
 * @param {object} dragStartEvent - event data from MonthResize
 */
MonthResizeGuide.prototype._onDragStart = function(dragStartEvent) {
    this.guide = new MonthGuide({
        isResizeMode: true
    }, this.monthResize.monthView);

    this.guide.start(dragStartEvent);
    
    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('resizing-x'));
    }
};

/**
 * Drag event handler
 * @param {object} dragEvent - event data from MonthCreation
 */
MonthResizeGuide.prototype._onDrag = function(dragEvent) {
    this.guide.update(dragEvent.x, dragEvent.y);
};

/**
 * Drag end event handler
 */
MonthResizeGuide.prototype._onDragEnd = function() {
    this.guide.destroy();
    this.guide = null;

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('resizing-x'));
    }
};

module.exports = MonthResizeGuide;

