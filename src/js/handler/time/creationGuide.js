/**
 * @fileoverview Module for Time.Creation effect while dragging.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var common = require('../../common/common');
var datetime = require('../../common/datetime');
var config = require('../../config');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');
var ratio = require('../../common/common').ratio;
var TZDate = require('../../common/timezone').Date;
var MIN60 = (datetime.MILLISECONDS_PER_MINUTES * 60);

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

    this.applyTheme(timeCreation.baseController.theme);
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
 * @param {TZDate} start - start time of schedule to create
 * @param {TZDate} end - end time of schedule to create
 * @param {boolean} bottomLabel - is label need to render bottom of guide element?
 */
TimeCreationGuide.prototype._refreshGuideElement = function(top, height, start, end, bottomLabel) {
    var guideElement = this.guideElement;
    var timeElement = this.guideTimeElement;

    guideElement.style.top = top + 'px';
    guideElement.style.height = height + 'px';
    guideElement.style.display = 'block';

    timeElement.innerHTML = datetime.format(start, 'HH:mm') +
        ' - ' + datetime.format(end, 'HH:mm');

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
        todayEnd = datetime.getStartOfNextDay(todayStart);

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
        todayStart,
        todayEnd,
        viewHeight / hourLength
    ];
};

/**
 * Applying limitation to supplied data and return it.
 * @param {number} top - top pixel of guide element
 * @param {number} height - height pixel of guide element
 * @param {TZDate} start - relative time value of dragstart point
 * @param {TZDate} end - relative time value of dragend point
 * @returns {array} limited style data
 */
TimeCreationGuide.prototype._limitStyleData = function(top, height, start, end) {
    var unitData = this._styleUnit;

    top = common.limit(top, [0], [unitData[0]]);
    height = common.limit(top + height, [0], [unitData[0]]) - top;
    start = common.limitDate(start, unitData[2], unitData[3]);
    end = common.limitDate(end, unitData[2], unitData[3]);

    return [top, height, start, end];
};

/**
 * Get function to calculate guide element UI data from supplied units
 * @param {number} viewHeight - total height of view's container element
 * @param {number} hourLength - hour length that rendered in time view
 * @param {TZDate} todayStart - time for view's start date
 * @returns {function} UI data calculator function
 */
TimeCreationGuide.prototype._getStyleDataFunc = function(viewHeight, hourLength, todayStart) {
    var todayStartTime = todayStart;
    var todayEndTime = datetime.end(todayStart);

    /**
     * Get top, time value from schedule data
     * @param {object} scheduleData - schedule data object
     * @returns {number[]} top, time
     */
    function getStyleData(scheduleData) {
        var minMinutes = 30;
        var gridY = scheduleData.nearestGridY,
            gridTimeY = scheduleData.nearestGridTimeY,
            gridEndTimeY = scheduleData.nearestGridEndTimeY || new TZDate(gridTimeY).addMinutes(minMinutes),
            top, startTime, endTime;

        top = common.limit(ratio(hourLength, viewHeight, gridY), [0], [viewHeight]);
        startTime = common.limitDate(gridTimeY, todayStartTime, todayEndTime);
        endTime = common.limitDate(gridEndTimeY, todayStartTime, todayEndTime);

        return [top, startTime, endTime];
    }

    return getStyleData;
};

/**
 * DragStart event handler
 * @param {object} dragStartEventData - dragStart schedule data.
 */
TimeCreationGuide.prototype._createGuideElement = function(dragStartEventData) {
    var relatedView = dragStartEventData.relatedView,
        hourStart = datetime.millisecondsFrom('hour', dragStartEventData.hourStart) || 0,
        unitData, styleFunc, styleData, result, top, height, start, end;

    unitData = this._styleUnit = this._getUnitData(relatedView);
    styleFunc = this._styleFunc = this._getStyleDataFunc.apply(this, unitData);
    styleData = this._styleStart = styleFunc(dragStartEventData);

    start = new TZDate(styleData[1]).addMinutes(datetime.minutesFromHours(hourStart));
    end = new TZDate(styleData[2]).addMinutes(datetime.minutesFromHours(hourStart));
    top = styleData[0];
    height = (unitData[4] * (end - start) / MIN60);

    result = this._limitStyleData(
        top,
        height,
        start,
        end
    );

    this._refreshGuideElement.apply(this, result);

    relatedView.container.appendChild(this.guideElement);
};

/**
 * Drag event handler
 * @param {object} dragEventData - drag schedule data.
 */
TimeCreationGuide.prototype._onDrag = function(dragEventData) {
    var minutes30 = 30;
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
            new TZDate(endStyle[1]).addMinutes(minutes30)
        );
    } else {
        result = this._limitStyleData(
            endStyle[0],
            (startStyle[0] - endStyle[0]) + heightOfHalfHour,
            endStyle[1],
            new TZDate(startStyle[1]).addMinutes(minutes30)
        );
        result.push(true);
    }

    reqAnimFrame.requestAnimFrame(function() {
        refreshGuideElement.apply(null, result);
    });
};

TimeCreationGuide.prototype.applyTheme = function(theme) {
    var style = this.guideElement.style;
    var timeStyle = this.guideTimeElement.style;

    // block
    style.backgroundColor = theme.common.creationGuide.backgroundColor;
    style.border = theme.common.creationGuide.border;

    // label
    timeStyle.color = theme.week.creationGuide.color;
    timeStyle.fontSize = theme.week.creationGuide.fontSize;
    timeStyle.fontWeight = theme.week.creationGuide.fontWeight;
};

module.exports = TimeCreationGuide;
