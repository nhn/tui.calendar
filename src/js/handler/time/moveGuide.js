/**
 * @fileoverview Module for Time.Move effect while dragging.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var reqAnimFrame = require('../../common/reqAnimFrame');

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
    this.timeMove.off({
        'time_move_dragstart': this._onDragStart,
        'time_move_drag': this._onDrag,
        'time_move_dragend': this._clearGuideElement,
        'time_move_click': this._clearGuideElement
    }, this);

    this.guideElement = this.timeMove = null;
};

/**
 * Clear guide element.
 */
TimeMoveGuide.prototype._clearGuideElement = function() {
    var guideElement = this.guideElement;

    if (guideElement && guideElement.parentNode) {
        guideElement.parentNode.removeChild(guideElement);
    }

    this.guideElement = this._getTopFunc = null;
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
    var eventElement = dragStartEventData.eventElement,
        guideElement = eventElement.parentNode.cloneNode(true);

    domutil.addClass(guideElement, 'view-time-move-guide');

    this.guideElement = guideElement;

    this._container = dragStartEventData.container;

    this._container.appendChild(guideElement);
};

/**
 * TimeMove#time_move_drag event handler
 * @param {object} dragEventData - drag event data
 */
TimeMoveGuide.prototype._onDrag = function(dragEventData) {
    var guideElement = this.guideElement,
        gridYIndex = dragEventData.gridYIndex,
        viewHeight = dragEventData.viewHeight,
        hourLength = dragEventData.hourLength,
        heightHalf = domevent.getMousePosition(dragEventData.originEvent, dragEventData.eventElement)[1],
        // offset for event element drag position.
        offset = ((heightHalf * hourLength) / viewHeight) | 0;

    // move guide element's parent element to viewview container related with mouse position.
    if (this._container !== dragEventData.currentTimeView.container) {
        this._container = dragEventData.currentTimeView.container;
        this._container.appendChild(guideElement);
    }

    if (!this._getTopFunc) {
        this._getTopFunc = util.bind(function(index) {
            // hourLength : viewHeight = index : X
            return (((index - offset) * viewHeight) / hourLength);
        }, this);
    }

    this._refreshGuideElement(this._getTopFunc(gridYIndex));
};

module.exports = TimeMoveGuide;

