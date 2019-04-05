/**
 * @fileoverview Guide element for DayGrid.Creation
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var config = require('../../config');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');

/**
 * Class for DayGrid.Creation dragging effect.
 * @constructor
 * @param {DayGridCreation} creation - instance of DayGridCreation.
 */
function DayGridCreationGuide(creation) {
    /**
     * @type {DayGridCreation}
     */
    this.creation = creation;

    /**
     * @type {HTMLDIVElement}
     */
    this.scheduleContainer = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = document.createElement('div');

    this.initializeGuideElement();
    this.applyTheme(creation.controller.theme);

    creation.on({
        dragstart: this._createGuideElement,
        drag: this._onDrag,
        click: this._createGuideElement
    }, this);
}

/**
 * Destroy method
 */
DayGridCreationGuide.prototype.destroy = function() {
    this.clearGuideElement();
    this.creation.off(this);
    this.creation = this.scheduleContainer = this.guideElement = null;
};

/**
 * initialize guide element's default style.
 */
DayGridCreationGuide.prototype.initializeGuideElement = function() {
    domutil.addClass(this.guideElement, config.classname('daygrid-guide-creation-block'));
};

/**
 * Drag event handler
 * @param {object} scheduleData - schedule data from DayGrid.Creation handler.
 */
DayGridCreationGuide.prototype._onDrag = function(scheduleData) {
    this._refreshGuideElement(scheduleData, true);
};

/**
 * Get element width based on narrowWeekend
 * @param {number} dragStartIndex - grid start index
 * @param {number} dragEndIndex - grid end index
 * @param {Array} grids - dates information
 * @returns {number} element width
 */
DayGridCreationGuide.prototype._getGuideWidth = function(dragStartIndex, dragEndIndex, grids) {
    var width = 0;
    var i = dragStartIndex;
    for (; i <= dragEndIndex; i += 1) {
        width += grids[i] ? grids[i].width : 0;
    }

    return width;
};

/**
 * Refresh guide element.
 * @param {object} scheduleData - schedule data from DayGrid.Creation handler.
 * @param {boolean} defer - If set to true, set style in the next frame
 */
DayGridCreationGuide.prototype._refreshGuideElement = function(scheduleData, defer) {
    var guideElement = this.guideElement,
        data = scheduleData,
        dragStartXIndex = data.dragStartXIndex < data.xIndex ? data.dragStartXIndex : data.xIndex,
        dragEndXIndex = data.dragStartXIndex < data.xIndex ? data.xIndex : data.dragStartXIndex,
        leftPercent,
        widthPercent;

    leftPercent = data.grids[dragStartXIndex] ? data.grids[dragStartXIndex].left : 0;
    widthPercent = this._getGuideWidth(dragStartXIndex, dragEndXIndex, data.grids);

    /** eslint-disable require-jsdoc */
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
DayGridCreationGuide.prototype.clearGuideElement = function() {
    var guideElement = this.guideElement;

    domutil.remove(guideElement);

    guideElement.style.display = 'none';
    guideElement.style.left = '';
    guideElement.style.width = '';
};

/**
 * Create guide element
 * @param {object} dragStartEventData - schedule data object of DayGrid.Creation.
 */
DayGridCreationGuide.prototype._createGuideElement = function(dragStartEventData) {
    var creation = this.creation,
        view = creation.view,
        container = view.container,
        scheduleContainer = domutil.find(config.classname('.weekday-grid'), container);

    scheduleContainer.appendChild(this.guideElement);
    this._refreshGuideElement(dragStartEventData);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - event data object of DayGrid.Creation.
 */
DayGridCreationGuide.prototype._onDrag = function(dragEventData) {
    this._refreshGuideElement(dragEventData);
};

DayGridCreationGuide.prototype.applyTheme = function(theme) {
    var style = this.guideElement.style;

    style.backgroundColor = theme.common.creationGuide.backgroundColor;
    style.border = theme.common.creationGuide.border;
};

module.exports = DayGridCreationGuide;
