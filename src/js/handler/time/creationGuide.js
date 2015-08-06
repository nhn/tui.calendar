/**
 * @fileoverview Module for Time.Creation effect while dragging.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');

var ratio = require('./core')._ratio;

/**
 * Class for Time.Creation dragging effect.
 * @constructor
 * @param {TimeCreation} timeCreation - instance of TimeCreation.
 */
function TimeCreationGuide(timeCreation) {
    /**
     * Guide element for creation effect.
     * @type {HTMLElement}
     */
    this.guideElement = global.document.createElement('div');

    /**
     * @type {TimeCreation}
     */
    this.timeCreation = timeCreation;

    /**
     * @type {number}
     */
    this._startGridY = 0;

    /**
     * @type {function}
     */
    this._getTopFunc = null;

    domutil.addClass(this.guideElement, 'view-time-creation-guide');

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
    this.timeCreation.off(this);
    this.guideElement = this.timeCreation = this._startGridY =
        this._getTopFunc = null;
};

/**
 * Clear guide element.
 */
TimeCreationGuide.prototype._clearGuideElement = function() {
    var guideElement = this.guideElement;

    if (guideElement.parentNode) {
        guideElement.parentNode.removeChild(guideElement);
    }

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.display = 'none';
        guideElement.style.top = '';
        guideElement.style.height = '';
    });
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
 * DragStart event handler
 * @param {object} dragStartEventData - dragStart event data.
 */
TimeCreationGuide.prototype._onDragStart = function(dragStartEventData) {
    var timeView = dragStartEventData.relatedView,
        viewOptions = timeView.options,
        viewHeight = timeView.getViewBound().height,
        hourLength = viewOptions.hourEnd - viewOptions.hourStart,
        getTopFunc;

    getTopFunc = this._getTopFunc = util.bind(function(indexY) {
        // memo
        if (getTopFunc[indexY]) {
            return getTopFunc[indexY];
        }

        getTopFunc[indexY] = ratio(hourLength, viewHeight, indexY);

        return getTopFunc[indexY];
    }, this);

    this._startGridY = getTopFunc(dragStartEventData.nearestGridY);

    this._refreshGuideElement(
        this._startGridY,
        getTopFunc(0.5)
    );

    timeView.container.appendChild(this.guideElement);
};

/**
 * Drag event handler
 * @param {object} dragEventData - drag event data.
 */
TimeCreationGuide.prototype._onDrag = function(dragEventData) {
    var getTopFunc = this._getTopFunc,
        startGridY = this._startGridY,
        endGridY;

    if (!getTopFunc) {
        return;
    }

    endGridY = getTopFunc(dragEventData.nearestGridY);

    if (endGridY > startGridY) {
        this._refreshGuideElement(startGridY, endGridY - startGridY);
        return;
    }

    this._refreshGuideElement(
        endGridY - getTopFunc(0.5),
        (startGridY + getTopFunc(1)) - endGridY
    );
};

module.exports = TimeCreationGuide;

