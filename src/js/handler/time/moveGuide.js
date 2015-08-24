/**
 * @fileoverview Module for Time.Move effect while dragging.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');

var ratio = require('./core')._ratio;

/**
 * Class for Time.Move effect.
 * @constructor
 * @param {TimeMove} timeMove - The instance of TimeMove.
 */
function TimeMoveGuide(timeMove) {
    /**
     * @type {HTMLElement}
     */
    this.guideElement = null;

    /**
     * @type {TimeMove}
     */
    this.timeMove = timeMove;

    /**
     * @type {HTMLElement}
     */
    this._container = null;

    /**
     * @type {function}
     */
    this._getTopFunc = null;

    /**
     * @type {number}
     */
    this._startGridY = 0;

    /**
     * @type {number}
     */
    this._startTopPixel = 0;

    timeMove.on({
        'time_move_dragstart': this._onDragStart,
        'time_move_drag': this._onDrag,
        'time_move_dragend': this._clearGuideElement,
        'time_move_click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
TimeMoveGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.timeMove.off(this);
    this.guideElement = this.timeMove = this._container =
        this._getTopFunc = this._startGridY = this._startTopPixel = null;
};

/**
 * Clear guide element.
 */
TimeMoveGuide.prototype._clearGuideElement = function() {
    var guideElement = this.guideElement;

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, 'schedule-view-dragging');
    }

    domutil.remove(guideElement);

    this.guideElement = this._getTopFunc =
        this._startGridY = this._startTopPixel = null;
};

/**
 * Refresh guide element
 * @param {string} top - guide element's style top.
 */
TimeMoveGuide.prototype._refreshGuideElement = function(top) {
    var guideElement = this.guideElement;

    if (!guideElement) {
        return;
    }

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.top = top + 'px';
        guideElement.style.display = 'block';
    });
};

/**
 * TimeMove#time_move_dragstart event handler
 * @param {object} dragStartEventData - dragstart event data
 */
TimeMoveGuide.prototype._onDragStart = function(dragStartEventData) {
    var guideElement = domutil.closest(
        dragStartEventData.target,
        '.schedule-view-time-date-event-block'
    );

    if (!guideElement) {
        return;
    }

    guideElement = guideElement.cloneNode(true);
    domutil.addClass(guideElement, 'schedule-view-time-move-guide');

    this._startTopPixel = parseFloat(guideElement.style.top);
    this._startGridY = dragStartEventData.nearestGridY;
    this.guideElement = guideElement;
    this._container = dragStartEventData.relatedView.container;
    this._container.appendChild(guideElement);
};

/**
 * TimeMove#time_move_drag event handler
 * @param {object} dragEventData - drag event data
 */
TimeMoveGuide.prototype._onDrag = function(dragEventData) {
    var timeView = dragEventData.currentView,
        viewOptions = timeView.options,
        viewHeight = timeView.getViewBound().height,
        guideHeight = parseFloat(this.guideElement.style.height),
        hourLength = viewOptions.hourEnd - viewOptions.hourStart,
        gridYOffset = dragEventData.nearestGridY - this._startGridY,
        // hourLength : viewHeight = gridYOffset : X;
        gridYOffsetPixel = ratio(hourLength, viewHeight, gridYOffset),
        bottomLimit,
        top;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, 'schedule-view-dragging');
    }

    if (this._container !== timeView.container) {
        this._container = timeView.container;
        this._container.appendChild(this.guideElement);
    }

    top = this._startTopPixel + gridYOffsetPixel;
    bottomLimit = viewHeight - guideHeight;

    top = Math.max(top, 0);
    top = Math.min(top, bottomLimit);

    this._refreshGuideElement(top);
};

module.exports = TimeMoveGuide;

