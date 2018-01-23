/**
 * @fileoverview Module for Time.Creation effect while dragging.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var common = require('../../common/common');
var datetime = require('../../common/datetime');
var config = require('../../config');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');
var ratio = require('../../common/common').ratio;
var TZDate = require('../../common/timezone').Date;
var MIN30 = (datetime.MILLISECONDS_PER_MINUTES * 30);

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
     * @type {HTMLDivElement}
     */
    this.guideTimeElement = domutil.appendHTMLElement(
        'span',
        this.guideElement,
        config.classname('time-guide-creation-label')
    );

    domutil.addClass(this.guideElement, config.classname('time-guide-creation'));

    /**
     * @type {TimeCreation}
     */
    this.timeCreation = timeCreation;

    /**
     * @type {array}
     */
    this._styleUnit = null;

    /**
     * @type {array}
     */
    this._styleStart = null;

    /**
     * @type {function}
     */
    this._styleFunc = null;

    timeCreation.on({
        timeCreationDragstart: this._createGuideElement,
        timeCreationDrag: this._onDrag,
        timeCreationClick: this._createGuideElement
    }, this);
}

/**
 * Destroy method.
 */
TimeCreationGuide.prototype.destroy = function() {
    this.clearGuideElement();
    this.timeCreation.off(this);
    this.timeCreation = this._styleUnit = this._styleStart =
        this._styleFunc = this.guideElement = this.guideTimeElement = null;
};

/**
 * Clear guide element.
 */
TimeCreationGuide.prototype.clearGuideElement = function() {
    var guideElement = this.guideElement,
        timeElement = this.guideTimeElement;

    domutil.remove(guideElement);

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.display = 'none';
        guideElement.style.top = '';
        guideElement.style.height = '';
        timeElement.innerHTML = '';
    });
};

/**
 * Refresh guide element
 * @param {number} top - The number of guide element's style top
 * @param {number} height - The number of guide element's style height
 * @param {Date} start - start time of schedule to create
 * @param {Date} end - end time of schedule to create
 * @param {boolean} bottomLabel - is label need to render bottom of guide element?
 */
TimeCreationGuide.prototype._refreshGuideElement = function(top, height, start, end, bottomLabel) {
    var guideElement = this.guideElement;
    var timeElement = this.guideTimeElement;

    guideElement.style.top = top + 'px';
    guideElement.style.height = height + 'px';
    guideElement.style.display = 'block';

    timeElement.innerHTML = datetime.format(new TZDate(start), 'HH:mm') +
        ' - ' + datetime.format(new TZDate(end), 'HH:mm');

    if (bottomLabel) {
        domutil.removeClass(timeElement, config.classname('time-guide-bottom'));
    } else {
        domutil.addClass(timeElement, config.classname('time-guide-bottom'));
    }
};

/**
 * Get unit data of calculating new style of guide element by user interaction
 * @param {Time} relatedView - time view instance related with schedule
 * @returns {array} unit data.
 */
TimeCreationGuide.prototype._getUnitData = function(relatedView) {
    var viewOpt = relatedView.options,
        viewHeight = relatedView.getViewBound().height,
        hourLength = viewOpt.hourEnd - viewOpt.hourStart,
        todayStart = datetime.parse(viewOpt.ymd),
        todayEnd = datetime.end(todayStart);

    todayStart.setHours(0, 0, 0, 0);
    todayStart.setHours(viewOpt.hourStart);

    // [0] height of view
    // [1] hour length of view
    // [2] start time of view
    // [3] end time of view
    // [4] height of view for one hour
    return [
        viewHeight,
        hourLength,
        Number(todayStart),
        Number(todayEnd),
        viewHeight / hourLength
    ];
};

/**
 * Applying limitation to supplied data and return it.
 * @param {number} top - top pixel of guide element
 * @param {number} height - height pixel of guide element
 * @param {number} start - relative time value of dragstart point
 * @param {number} end - relative time value of dragend point
 * @returns {array} limited style data
 */
TimeCreationGuide.prototype._limitStyleData = function(top, height, start, end) {
    var unitData = this._styleUnit;

    top = common.limit(top, [0], [unitData[0]]);
    height = common.limit(top + height, [0], [unitData[0]]) - top;
    start = common.limit(start, [unitData[2]], [unitData[3]]);
    end = common.limit(end, [unitData[2]], [unitData[3]]);

    return [top, height, start, end];
};

/**
 * Get function to calculate guide element UI data from supplied units
 * @param {number} viewHeight - total height of view's container element
 * @param {number} hourLength - hour length that rendered in time view
 * @param {number} todayStart - time for view's start date
 * @returns {function} UI data calculator function
 */
TimeCreationGuide.prototype._getStyleDataFunc = function(viewHeight, hourLength, todayStart) {
    var todayEnd = Number(datetime.end(new TZDate(Number(todayStart))));

    /**
     * Get top, time value from schedule dat
     * @param {object} scheduleData - schedule data object
     * @returns {number[]} top, time
     */
    function getStyleData(scheduleData) {
        var gridY = scheduleData.nearestGridY,
            gridTimeY = scheduleData.nearestGridTimeY,
            top, time;

        top = common.limit(ratio(hourLength, viewHeight, gridY), [0], [viewHeight]);
        time = common.limit(gridTimeY, [todayStart], [todayEnd]);

        return [top, time];
    }

    return getStyleData;
};

/**
 * DragStart event handler
 * @param {object} dragStartEventData - dragStart schedule data.
 */
TimeCreationGuide.prototype._createGuideElement = function(dragStartEventData) {
    var relatedView = dragStartEventData.relatedView,
        unitData, styleFunc, styleData, result;

    unitData = this._styleUnit = this._getUnitData(relatedView);
    styleFunc = this._styleFunc = this._getStyleDataFunc.apply(this, unitData);
    styleData = this._styleStart = styleFunc(dragStartEventData);

    result = this._limitStyleData(
        styleData[0],
        (unitData[4] / 2),
        styleData[1],
        (styleData[1] + MIN30)
    );

    this._refreshGuideElement.apply(this, result);

    relatedView.container.appendChild(this.guideElement);
};

/**
 * Drag event handler
 * @param {object} dragEventData - drag schedule data.
 */
TimeCreationGuide.prototype._onDrag = function(dragEventData) {
    var styleFunc = this._styleFunc,
        unitData = this._styleUnit,
        startStyle = this._styleStart,
        refreshGuideElement = this._refreshGuideElement.bind(this),
        heightOfHalfHour,
        endStyle,
        result;

    if (!styleFunc || !unitData || !startStyle) {
        return;
    }

    heightOfHalfHour = (unitData[4] / 2);
    endStyle = styleFunc(dragEventData);

    if (endStyle[0] > startStyle[0]) {
        result = this._limitStyleData(
            startStyle[0],
            (endStyle[0] - startStyle[0]) + heightOfHalfHour,
            startStyle[1],
            (endStyle[1] + MIN30)
        );
    } else {
        result = this._limitStyleData(
            endStyle[0],
            (startStyle[0] - endStyle[0]) + heightOfHalfHour,
            endStyle[1],
            (startStyle[1] + MIN30)
        );
        result.push(true);
    }

    reqAnimFrame.requestAnimFrame(function() {
        refreshGuideElement.apply(null, result);
    });
};

module.exports = TimeCreationGuide;
