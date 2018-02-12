/**
 * @fileoverview Guide element for Allday.Creation
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var config = require('../../config');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');

/**
 * Class for Allday.Creation dragging effect.
 * @constructor
 * @param {AlldayCreation} alldayCreation - instance of AlldayCreation.
 */
function AlldayCreationGuide(alldayCreation) {
    /**
     * @type {AlldayCreation}
     */
    this.alldayCreation = alldayCreation;

    /**
     * @type {HTMLDIVElement}
     */
    this.scheduleContainer = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = document.createElement('div');

    this.initializeGuideElement();

    alldayCreation.on({
        alldayCreationDragstart: this._createGuideElement,
        alldayCreationDrag: this._onDrag,
        alldayCreationClick: this._createGuideElement
    }, this);
}

/**
 * Destroy method
 */
AlldayCreationGuide.prototype.destroy = function() {
    this.clearGuideElement();
    this.alldayCreation.off(this);
    this.alldayCreation = this.scheduleContainer = this.guideElement = null;
};

/**
 * initialize guide element's default style.
 */
AlldayCreationGuide.prototype.initializeGuideElement = function() {
    domutil.addClass(this.guideElement, config.classname('allday-guide-creation-block'));
};

/**
 * Drag event handler
 * @param {object} scheduleData - schedule data from Allday.Creation handler.
 */
AlldayCreationGuide.prototype._onDrag = function(scheduleData) {
    this._refreshGuideElement(scheduleData, true);
};

/**
 * Get element width based on narrowWeekend
 * @param {number} dragStartIndex - grid start index
 * @param {number} dragEndIndex - grid end index
 * @param {Array} grids - dates information
 * @returns {number} element width
 */
AlldayCreationGuide.prototype._getGuideWidth = function(dragStartIndex, dragEndIndex, grids) {
    var width = 0;
    var i = dragStartIndex;
    for (; i <= dragEndIndex; i += 1) {
        width += grids[i].width;
    }

    return width;
};

/**
 * Refresh guide element.
 * @param {object} scheduleData - schedule data from Allday.Creation handler.
 * @param {boolean} defer - If set to true, set style in the next frame
 */
AlldayCreationGuide.prototype._refreshGuideElement = function(scheduleData, defer) {
    var guideElement = this.guideElement,
        data = scheduleData,
        dragStartXIndex = data.dragStartXIndex < data.xIndex ? data.dragStartXIndex : data.xIndex,
        dragEndXIndex = data.dragStartXIndex < data.xIndex ? data.xIndex : data.dragStartXIndex,
        leftPercent,
        widthPercent;

    leftPercent = data.grids[dragStartXIndex].left;
    widthPercent = this._getGuideWidth(dragStartXIndex, dragEndXIndex, data.grids);

    function setStyle() {
        guideElement.style.display = 'block';
        guideElement.style.left = leftPercent + '%';
        guideElement.style.width = widthPercent + '%';
    }

    if (defer) {
        reqAnimFrame.requestAnimFrame(setStyle);
    } else {
        setStyle();
    }
};

/**
 * Clear guide element.
 */
AlldayCreationGuide.prototype.clearGuideElement = function() {
    var guideElement = this.guideElement;

    domutil.remove(guideElement);

    guideElement.style.display = 'none';
    guideElement.style.left = '';
    guideElement.style.width = '';
};

/**
 * Create guide element
 * @param {object} dragStartEventData - schedule data object of Allday.Creation.
 */
AlldayCreationGuide.prototype._createGuideElement = function(dragStartEventData) {
    var alldayCreation = this.alldayCreation,
        alldayView = alldayCreation.alldayView,
        alldayContainerElement = alldayView.container,
        scheduleContainer = domutil.find(config.classname('.weekday-creation'), alldayContainerElement);

    scheduleContainer.appendChild(this.guideElement);
    this._refreshGuideElement(dragStartEventData);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - event data object of Allday.Creation.
 */
AlldayCreationGuide.prototype._onDrag = function(dragEventData) {
    this._refreshGuideElement(dragEventData);
};

module.exports = AlldayCreationGuide;
