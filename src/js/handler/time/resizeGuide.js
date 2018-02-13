/**
 * @fileoverview Module for Time.Resize effect while dragging.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');
var ratio = require('../../common/common').ratio;

/**
 * Class for Time.Resize effect.
 * @constructor
 * @param {TimeResize} timeResize - the instance of TimeResize handler.
 */
function TimeResizeGuide(timeResize) {
    /**
     * @type {HTMLElement}
     */
    this.guideElement = null;

    /**
     * @type {TimeResize}
     */
    this.timeResize = timeResize;

    /**
     * @type {function}
     */
    this._getTopFunc = null;

    /**
     * @type {HTMLElement}
     */
    this._originScheduleElement = null;

    /**
     * @type {number}
     */
    this._startTopPixel = 0;

    /**
     * @type {number}
     */
    this._startHeightPixel = 0;

    /**
     * @type {number}
     */
    this._startGridY = 0;

    timeResize.on({
        'timeResizeDragstart': this._onDragStart,
        'timeResizeDrag': this._onDrag,
        'timeResizeDragend': this._clearGuideElement,
        'timeResizeClick': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
TimeResizeGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.timeResize.off(this);
    this.guideElement = this.timeResize = this._getTopFunc =
        this._originScheduleElement = this._startHeightPixel =
        this._startGridY = this._startTopPixel = null;
};

/**
 * Clear guide element.
 */
TimeResizeGuide.prototype._clearGuideElement = function() {
    var guideElement = this.guideElement,
        originElement = this._originScheduleElement;

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('resizing'));
    }

    if (originElement) {
        originElement.style.display = 'block';
    }

    domutil.remove(guideElement);

    this.guideElement = this._getTopFunc = this._originScheduleElement =
        this._startHeightPixel = this._startGridY = this._startTopPixel = null;
};

/**
 * Refresh guide element
 * @param {string} height - guide element's style height.
 */
TimeResizeGuide.prototype._refreshGuideElement = function(height) {
    var guideElement = this.guideElement;

    if (!guideElement) {
        return;
    }

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.height = height + 'px';
        guideElement.style.display = 'block';
    });
};

/**
 * TimeMove#timeMoveDragstart event handler
 * @param {object} dragStartEventData - dragstart event data
 */
TimeResizeGuide.prototype._onDragStart = function(dragStartEventData) {
    var originElement = domutil.closest(
            dragStartEventData.target,
            config.classname('.time-date-schedule-block')
        ),
        guideElement;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('resizing'));
    }

    if (!originElement) {
        return;
    }

    this._startGridY = dragStartEventData.nearestGridY;
    this._startHeightPixel = parseFloat(originElement.style.height);
    this._startTopPixel = parseFloat(originElement.style.top);

    this._originScheduleElement = originElement;
    guideElement = this.guideElement = originElement.cloneNode(true);
    domutil.addClass(guideElement, config.classname('time-guide-resize'));

    originElement.style.display = 'none';
    dragStartEventData.relatedView.container.appendChild(guideElement);
};

/**
 * @param {object} dragEventData - event data from Drag#drag.
 */
TimeResizeGuide.prototype._onDrag = function(dragEventData) {
    var timeView = dragEventData.relatedView,
        viewOptions = timeView.options,
        viewHeight = timeView.getViewBound().height,
        hourLength = viewOptions.hourEnd - viewOptions.hourStart,
        guideElement = this.guideElement,
        guideTop = parseFloat(guideElement.style.top),
        gridYOffset = dragEventData.nearestGridY - this._startGridY,
        // hourLength : viewHeight = gridYOffset : X;
        gridYOffsetPixel = ratio(hourLength, viewHeight, gridYOffset),
        minHeight,
        maxHeight,
        height;

    height = (this._startHeightPixel + gridYOffsetPixel);
    // at least large than 30min from schedule start time.
    minHeight = guideTop + ratio(hourLength, viewHeight, 0.5);
    minHeight -= this._startTopPixel;
    // smaller than 24h
    maxHeight = viewHeight - guideTop;

    height = Math.max(height, minHeight);
    height = Math.min(height, maxHeight);

    this._refreshGuideElement(height);
};

module.exports = TimeResizeGuide;

