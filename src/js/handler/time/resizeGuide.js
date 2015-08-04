/**
 * @fileoverview Module for Time.Resize effect while dragging.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';
var util = global.ne.util;
var datetime = require('../../datetime');
var timeCore = require('./core');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var reqAnimFrame = require('../../common/reqAnimFrame');

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
    this.timeResize.off({
        'time_resize_dragstart': this._onDragStart,
        'time_resize_drag': this._onDrag,
        'time_resize_dragend': this._clearGuideElement,
        'time_resize_click': this._clearGuideElement
    }, this);

    this._clearGuideElement();

    this.guideElement = this.timeResize = this._getTopFunc = null;
};

TimeResizeGuide.prototype._clearGuideElement = function() {
    var guideElement = this.guideElement;
    this._originEventElement.style.display = 'block';

    if (guideElement && guideElement.parentNode) {
        guideElement.parentNode.removeChild(guideElement);
    }

    this.guideElement = this._getTopFunc = this._originEventElement = null;
};

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


TimeResizeGuide.prototype._onDragStart = function(dragStartEventData) {
    var eventElement = dragStartEventData.eventElement.parentNode,
        guideElement = eventElement.cloneNode(true);

    domutil.addClass(guideElement, 'view-time-resize-guide');

    this.guideElement = guideElement;
    this._originEventElement = eventElement;
    eventElement.style.display = 'none';

    dragStartEventData.container.appendChild(guideElement);
};

TimeResizeGuide.prototype._onDrag = function(dragEventData) {
    var eventElement = dragEventData.eventElement.parentNode,
        gridYIndex = dragEventData.gridYIndex,
        viewHeight = dragEventData.viewHeight,
        hourLength = dragEventData.hourLength,
        offsetIndex = timeCore._calcGridYIndex(
            datetime.millisecondsFrom('hour', hourLength),
            viewHeight,
            parseFloat(eventElement.style.top)
        );

    gridYIndex += 0.5;

    if (offsetIndex >= gridYIndex) {
        return;
    }

    if (!this._getTopFunc) {
        this._getTopFunc = util.bind(function(index) {
            // hourLength : viewHeight = index : X
            return ((index - offsetIndex) * viewHeight) / hourLength;
        }, this);
    }

    this._refreshGuideElement(this._getTopFunc(gridYIndex));
};

module.exports = TimeResizeGuide;

