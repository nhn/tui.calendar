/**
 * @fileoverview Module for modification of guide element in schedule resize
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');

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
     * @type {HTMLElement[]}
     */
    this.elements = null;

    /**
     * @type {MonthGuide}
     */
    this.guide = null;

    monthResize.on({
        monthResizeDragstart: this._onDragStart,
        monthResizeDrag: this._onDrag,
        monthResizeDragend: this._onDragEnd
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
 * Hide element blocks for resize effect
 * @param {number} modelID - Schedule model instance ID
 */
MonthResizeGuide.prototype._hideScheduleBlocks = function(modelID) {
    this.elements = domutil.find(
        config.classname('.weekday-schedule-block-' + modelID),
        this.monthResize.monthView.container,
        true
    );

    util.forEach(this.elements, function(el) {
        el.style.display = 'none';
    });
};

/**
 * Show element blocks
 */
MonthResizeGuide.prototype._showScheduleBlocks = function() {
    util.forEach(this.elements, function(el) {
        el.style.display = 'block';
    });
};

/**
 * Drag start event handler
 * @param {object} dragStartEvent - schedule data from MonthResize
 */
MonthResizeGuide.prototype._onDragStart = function(dragStartEvent) {
    this.guide = new MonthGuide({
        isResizeMode: true
    }, this.monthResize.monthView);

    this.guide.start(dragStartEvent);

    this._hideScheduleBlocks(dragStartEvent.model.cid());

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
    this._showScheduleBlocks();

    this.guide.destroy();
    this.elements = this.guide = null;

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('resizing-x'));
    }
};

module.exports = MonthResizeGuide;
