/**
 * @fileoverview Resize Guide module.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var domutil = require('../../common/domutil');
var datetime = require('../../common/datetime');
var reqAnimFrame = require('../../common/reqAnimFrame');

/**
 * @constructor
 * @param {DayGridResize} resizeHandler - instance of DayGridResize
 */
function DayGridResizeGuide(resizeHandler) {
    /**
     * @type {DayGridResize}
     */
    this.resizeHandler = resizeHandler;

    /**
     * The element that actually contains the event element
     * @type {HTMLDIVElement}
     */
    this.scheduleContainer = null;

    /**
     * @type {function}
     */
    this.getScheduleDataFunc = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.scheduleBlockElement = null;

    resizeHandler.on({
        'dragstart': this._onDragStart,
        'drag': this._onDrag,
        'dragend': this._clearGuideElement,
        'click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
DayGridResizeGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.resizeHandler.off(this);
    this.resizeHandler = this.scheduleContainer = this.getScheduleDataFunc =
        this.guideElement = this.scheduleBlockElement = null;
};

/**
 * Clear guide element.
 */
DayGridResizeGuide.prototype._clearGuideElement = function() {
    domutil.remove(this.guideElement);

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('resizing-x'));
    }

    if (this.scheduleBlockElement) {
        domutil.removeClass(this.scheduleBlockElement, config.classname('weekday-schedule-block-dragging-dim'));
    }

    this.getScheduleDataFunc = null;
};

/**
 * Refresh guide element
 * @param {number} newWidth - new width percentage value to resize guide element.
 */
DayGridResizeGuide.prototype.refreshGuideElement = function(newWidth) {
    var guideElement = this.guideElement;

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.width = newWidth + '%';
    });
};

/**
 * Return function that calculate guide element's new width percentage value.
 * @param {object} dragStartEventData - dragstart schedule data.
 * @returns {function} return function that calculate guide element new width percentage.
 */
DayGridResizeGuide.prototype.getGuideElementWidthFunc = function(dragStartEventData) {
    var model = dragStartEventData.model,
        viewOptions = this.resizeHandler.view.options,
        fromLeft = Math.ceil(
            (model.start - viewOptions.renderStartDate) / datetime.MILLISECONDS_PER_DAY
        ) || 0,
        grids = dragStartEventData.grids;

    return function(xIndex) {
        var width = 0;
        var i = 0;
        var length = grids.length;
        width += grids[fromLeft] ? grids[fromLeft].width : 0;

        for (; i < length; i += 1) {
            if (i > fromLeft && i <= xIndex) {
                width += grids[i] ? grids[i].width : 0;
            }
        }

        return width;
    };
};

/**
 * DragStart event handler.
 * @param {object} dragStartEventData - schedule data.
 */
DayGridResizeGuide.prototype._onDragStart = function(dragStartEventData) {
    var container = this.resizeHandler.view.container,
        scheduleBlockElement = this.scheduleBlockElement = dragStartEventData.scheduleBlockElement,
        guideElement = this.guideElement = scheduleBlockElement.cloneNode(true),
        scheduleContainer;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('resizing-x'));
    }

    scheduleContainer = domutil.find(config.classname('.weekday-schedules'), container);
    domutil.addClass(guideElement, config.classname('daygrid-guide-move'));
    domutil.addClass(scheduleBlockElement, config.classname('weekday-schedule-block-dragging-dim'));

    scheduleContainer.appendChild(guideElement);

    this.getScheduleDataFunc = this.getGuideElementWidthFunc(dragStartEventData);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - schedule data.
 */
DayGridResizeGuide.prototype._onDrag = function(dragEventData) {
    var func = this.getScheduleDataFunc;

    if (!func) {
        return;
    }

    this.refreshGuideElement(func(dragEventData.xIndex));
};

module.exports = DayGridResizeGuide;
