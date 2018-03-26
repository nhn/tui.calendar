/**
 * @fileoverview Resize Guide module.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var domutil = require('../../common/domutil');
var datetime = require('../../common/datetime');
var reqAnimFrame = require('../../common/reqAnimFrame');
var TZDate = require('../../common/timezone').Date;

/**
 * @constructor
 * @param {AlldayResize} alldayResize - instance of AlldayResize
 */
function AlldayResizeGuide(alldayResize) {
    /**
     * @type {AlldayResize}
     */
    this.alldayResize = alldayResize;

    /**
     * 실제로 이벤트 엘리먼트를 담는 엘리먼트
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

    alldayResize.on({
        'alldayResizeDragstart': this._onDragStart,
        'alldayResizeDrag': this._onDrag,
        'alldayResizeDragend': this._clearGuideElement,
        'alldayResizeClick': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
AlldayResizeGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.alldayResize.off(this);
    this.alldayResize = this.scheduleContainer = this.getScheduleDataFunc =
        this.guideElement = null;
};

/**
 * Clear guide element.
 */
AlldayResizeGuide.prototype._clearGuideElement = function() {
    domutil.remove(this.guideElement);

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('resizing-x'));
    }

    this.getScheduleDataFunc = null;
};

/**
 * Refresh guide element
 * @param {number} newWidth - new width percentage value to resize guide element.
 */
AlldayResizeGuide.prototype.refreshGuideElement = function(newWidth) {
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
AlldayResizeGuide.prototype.getGuideElementWidthFunc = function(dragStartEventData) {
    var model = dragStartEventData.model,
        viewOptions = this.alldayResize.alldayView.options,
        fromLeft = (new TZDate(
            model.start.getTime() - datetime.parse(viewOptions.renderStartDate)
        )) / datetime.MILLISECONDS_PER_DAY | 0,
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
AlldayResizeGuide.prototype._onDragStart = function(dragStartEventData) {
    var alldayViewContainer = this.alldayResize.alldayView.container,
        guideElement = this.guideElement = dragStartEventData.scheduleBlockElement.cloneNode(true),
        scheduleContainer;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('resizing-x'));
    }

    scheduleContainer = domutil.find(config.classname('.weekday-schedules'), alldayViewContainer);
    domutil.addClass(guideElement, config.classname('allday-guide-move'));
    scheduleContainer.appendChild(guideElement);

    this.getScheduleDataFunc = this.getGuideElementWidthFunc(dragStartEventData);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - schedule data.
 */
AlldayResizeGuide.prototype._onDrag = function(dragEventData) {
    var func = this.getScheduleDataFunc;

    if (!func) {
        return;
    }

    this.refreshGuideElement(func(dragEventData.xIndex));
};

module.exports = AlldayResizeGuide;

