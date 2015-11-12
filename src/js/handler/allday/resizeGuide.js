/**
 * @fileoverview Resize Guide module.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var domutil = require('../../common/domutil');
var datetime = require('../../common/datetime');
var reqAnimFrame = require('../../common/reqAnimFrame');


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
    this.eventContainer = null;

    /**
     * @type {function}
     */
    this.getEventDataFunc = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = null;

    alldayResize.on({
        'allday_resize_dragstart': this._onDragStart,
        'allday_resize_drag': this._onDrag,
        'allday_resize_dragend': this._clearGuideElement,
        'allday_resize_click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
AlldayResizeGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.alldayResize.off(this);
    this.alldayResize = this.eventContainer = this.getEventDataFunc =
        this.guideElement = null;
};

/**
 * Clear guide element.
 */
AlldayResizeGuide.prototype._clearGuideElement = function() {
    domutil.remove(this.guideElement);

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, '/* @echo CSS_PREFIX */resizing-x');
    }

    this.getEventDataFunc = null;
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
 * @param {object} dragStartEventData - dragstart event data.
 * @returns {function} return function that calculate guide element new width percentage.
 */
AlldayResizeGuide.prototype.getGuideElementWidthFunc = function(dragStartEventData) {
    var model = dragStartEventData.model,
        viewOptions = this.alldayResize.alldayView.options,
        startDate = datetime.start(new Date(Math.max(model.starts.getTime(), datetime.parse(viewOptions.renderStartDate).getTime()))),
        endDate = datetime.end(new Date(Math.min(model.ends.getTime(), datetime.parse(viewOptions.renderEndDate).getTime()))),
        originLength = datetime.range(startDate, endDate, datetime.MILLISECONDS_PER_DAY).length,
        baseWidthPercent = 100 / dragStartEventData.datesInRange,
        dragStartIndex = dragStartEventData.xIndex;

    return function(xIndex) {
        var offset = xIndex - dragStartIndex,
            newLength = originLength + offset;

        newLength = Math.max(1, newLength);

        return newLength * baseWidthPercent;
    }
};

/**
 * DragStart event handler.
 * @param {object} dragStartEventData - event data.
 */
AlldayResizeGuide.prototype._onDragStart = function(dragStartEventData) {
    var alldayViewContainer = this.alldayResize.alldayView.container,
        guideElement = this.guideElement = dragStartEventData.eventBlockElement.cloneNode(true),
        eventContainer;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, '/* @echo CSS_PREFIX */resizing-x');
    }

    eventContainer = domutil.find('./* @echo CSS_PREFIX */monthweek-events', alldayViewContainer);
    domutil.addClass(guideElement, '/* @echo CSS_PREFIX */allday-guide-move');
    eventContainer.appendChild(guideElement);

    this.getEventDataFunc = this.getGuideElementWidthFunc(dragStartEventData);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - event data.
 */
AlldayResizeGuide.prototype._onDrag = function(dragEventData) {
    var func = this.getEventDataFunc;

    if (!func) {
        return;
    }

    this.refreshGuideElement(func(dragEventData.xIndex));
};

module.exports = AlldayResizeGuide;

