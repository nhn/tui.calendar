/**
 * @fileoverview Module for Time.Creation effect while dragging.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');

/**
 * Class for Time.Creation dragging effect.
 * @constructor
 * @param {TimeCreation} timeCreation - instance of TimeCreation.
 */
function TimeCreationGuide(timeCreation) {
    var guideElement;

    /**
     * Guide element for creation effect.
     * @type {HTMLElement}
     */
    guideElement = this.guideElement = global.document.createElement('div');

    domutil.addClass(guideElement, 'view-time-creation-guide');

    /**
     * @type {TimeCreation}
     */
    this.timeCreation = timeCreation;

    /**
     * @type {number}
     */
    this.startY = 0;

    /**
     * @type {function}
     */
    this._cached = null;

    timeCreation.on({
        'time_creation_dragstart': this._onDragStart,
        'time_creation_drag': this._onDrag,
        'time_creation_dragend': this._clearGuideElement,
        'time_creation_click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method.
 */
TimeCreationGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.timeCreation.off({
        'time_creation_dragstart': this._onDragStart,
        'time_creation_drag': this._onDrag,
        'time_creation_dragend': this._clearGuideElement,
        'time_creation_click': this._clearGuideElement
    }, this);

    this.guideElement = this.timeCreation = this.startY = null;
};

/**
 * Clear guide element.
 */
TimeCreationGuide.prototype._clearGuideElement = function() {
    var guideElement = this.guideElement;

    if (guideElement.parentNode) {
        guideElement.parentNode.removeChild(guideElement);
    }

    guideElement.style.display = 'none';
    guideElement.style.top = 'auto';
    guideElement.style.height = 'auto';
};

/**
 * Refresh guide element
 * @param {number} top - The number of guide element's style top.
 * @param {number} height - The number of guide element's style height.
 */
TimeCreationGuide.prototype._refreshGuideElement = function(top, height) {
    var guideElement = this.guideElement;

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.top = top + 'px';
        guideElement.style.height = height + 'px';
        guideElement.style.display = 'block';
    });
};

/**
 * Calculate Y index ratio.
 * @param {number} viewHeight - Height of view container.
 * @param {number} hourLength - Length of hour.
 * @param {number} index - The number of want to get ratio index.
 * @returns {number} - The number of pixel ratio.
 */
TimeCreationGuide.prototype._getYRatio = function(viewHeight, hourLength, index) {
    // hourLength : viewHeight = index : X;
    return (viewHeight * index) / hourLength;
};

/**
 * DragStart event handler
 * @param {object} dragStartEventData - dragStart event data.
 */
TimeCreationGuide.prototype._onDragStart = function(dragStartEventData) {
    var guideElement = this.guideElement,
        gridYIndex = dragStartEventData.gridYIndex,
        viewHeight = dragStartEventData.viewHeight,
        hourLength = dragStartEventData.hourLength,
        cached,
        startY;

    cached = this._cached = util.bind(function(index) {
        if (cached[index]) {
            return cached[index];
        }

        cached[index] = this._getYRatio(viewHeight, hourLength, index);

        return cached[index];
    }, this);

    this.startY = startY = cached(gridYIndex);

    this._refreshGuideElement(startY, cached(0.5));

    dragStartEventData.container.appendChild(guideElement);
};

/**
 * Drag event handler
 * @param {object} dragEventData - drag event data.
 */
TimeCreationGuide.prototype._onDrag = function(dragEventData) {
    var gridYIndex = dragEventData.gridYIndex,
        cached = this._cached,
        startY = this.startY,
        dragEndY;

    if (!cached) {
        return;
    }

    dragEndY = cached(gridYIndex);

    if (dragEndY > startY) {
        this._refreshGuideElement(startY, dragEndY - startY);
        return;
    }

    this._refreshGuideElement(dragEndY - cached(0.5), (startY + cached(1)) - dragEndY);
};

module.exports = TimeCreationGuide;

