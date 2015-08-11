/**
 * @fileoverview Module for Time.Resize effect while dragging.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';
var util = global.ne.util;
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');

var ratio = require('./core')._ratio;

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
    this._originEventElement = null;

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
        'time_resize_dragstart': this._onDragStart,
        'time_resize_drag': this._onDrag,
        'time_resize_dragend': this._clearGuideElement,
        'time_resize_click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
TimeResizeGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.timeResize.off(this);
    this.guideElement = this.timeResize = this._getTopFunc =
        this._originEventElement = this._startHeightPixel =
        this._startGridY = this._startTopPixel = null;
};

/**
 * Clear guide element.
 */
TimeResizeGuide.prototype._clearGuideElement = function() {
    var guideElement = this.guideElement,
        originElement = this._originEventElement;

    domutil.removeClass(global.document.body, 'view-resizing');

    if (originElement) {
        originElement.style.display = 'block';
    }

    if (guideElement && guideElement.parentNode) {
        guideElement.parentNode.removeChild(guideElement);
    }

    this.guideElement = this._getTopFunc = this._originEventElement =
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
 * TimeMove#time_move_dragstart event handler
 * @param {object} dragStartEventData - dragstart event data
 */
TimeResizeGuide.prototype._onDragStart = function(dragStartEventData) {
    var originElement = domutil.closest(
            dragStartEventData.target,
            '.view-time-date-event-block'
        ),
        guideElement;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, 'view-resizing');
    }

    if (!originElement) {
        return;
    }

    this._startGridY = dragStartEventData.nearestGridY;
    this._startHeightPixel = parseFloat(originElement.style.height);
    this._startTopPixel = parseFloat(originElement.style.top);

    this._originEventElement = originElement;
    guideElement = this.guideElement = originElement.cloneNode(true);
    domutil.addClass(guideElement, 'view-time-resize-guide');

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
    // at least large than 30min from event start time.
    minHeight = guideTop + ratio(hourLength, viewHeight, 0.5);
    minHeight -= this._startTopPixel;
    // smaller than 24h
    maxHeight = viewHeight - guideTop;

    height = Math.max(height, minHeight);
    height = Math.min(height, maxHeight);

    this._refreshGuideElement(height);
};

module.exports = TimeResizeGuide;

