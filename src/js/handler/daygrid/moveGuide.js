/**
 * @fileoverview Effect module for DayGrid.Move
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');

/**
 * Class for DayGrid.Move dragging effect.
 * @constructor
 * @param {DayGridMove} daygridMove - instance of DayGridMove.
 */
function DayGridMoveGuide(daygridMove) {
    /**
     * @type {DayGridMove}
     */
    this.daygridMove = daygridMove;

    /**
     * The element that actually contains the event element
     * @type {HTMLDIVElement}
     */
    this.scheduleContainer = null;

    /**
     * @type {number}
     */
    this._dragStartXIndex = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = null;

    /**
     * @type {HTMLElement[]}
     */
    this.elements = null;

    daygridMove.on({
        'dragstart': this._onDragStart,
        'drag': this._onDrag,
        'dragend': this._clearGuideElement,
        'click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
DayGridMoveGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.daygridMove.off(this);
    this.daygridMove = this.scheduleContainer = this._dragStartXIndex =
        this.elements = this.guideElement = null;
};

/**
 * Clear guide element.
 */
DayGridMoveGuide.prototype._clearGuideElement = function() {
    this._showOriginScheduleBlocks();

    domutil.remove(this.guideElement);

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('dragging'));
    }

    this._dragStartXIndex = this.getScheduleDataFunc = this.guideElement = null;
};

/**
 * Dim element blocks
 * @param {number} modelID - Schedule model instance ID
 */
DayGridMoveGuide.prototype._hideOriginScheduleBlocks = function(modelID) {
    var className = config.classname('weekday-schedule-block-dragging-dim');
    var scheduleBlocks = domutil.find(
        config.classname('.weekday-schedule-block'),
        this.daygridMove.view.container,
        true
    );

    this.elements = util.filter(scheduleBlocks, function(schedule) {
        return domutil.getData(schedule, 'id') === modelID;
    });

    util.forEach(this.elements, function(el) {
        domutil.addClass(el, className);
    });
};

/**
 * Show element blocks
 */
DayGridMoveGuide.prototype._showOriginScheduleBlocks = function() {
    var className = config.classname('weekday-schedule-block-dragging-dim');

    util.forEach(this.elements, function(el) {
        domutil.removeClass(el, className);
    });
};

/**
 * Highlight element blocks
 * @param {Schedule} model - model
 * @param {HTMLElement} parent - parent element
 */
DayGridMoveGuide.prototype._highlightScheduleBlocks = function(model, parent) {
    var elements = domutil.find(config.classname('.weekday-schedule'), parent, true);

    util.forEach(elements, function(el) {
        el.style.margin = '0';

        if (!model.isFocused) {
            el.style.backgroundColor = model.dragBgColor;
            el.style.borderLeftColor = model.borderColor;
            el.style.color = '#ffffff';
        }
    });
};

/**
 * Refresh guide element.
 * @param {number} leftPercent - left percent of guide element.
 * @param {number} widthPercent - width percent of guide element.
 * @param {boolean} isExceededLeft - schedule start is faster then render start date?
 * @param {boolean} isExceededRight - schedule end is later then render end date?
 */
DayGridMoveGuide.prototype.refreshGuideElement = function(leftPercent, widthPercent, isExceededLeft, isExceededRight) {
    var guideElement = this.guideElement;

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.left = leftPercent + '%';
        guideElement.style.width = widthPercent + '%';

        if (isExceededLeft) {
            domutil.addClass(guideElement, config.classname('weekday-exceed-left'));
        } else {
            domutil.removeClass(guideElement, config.classname('weekday-exceed-left'));
        }

        if (isExceededRight) {
            domutil.addClass(guideElement, config.classname('weekday-exceed-right'));
        } else {
            domutil.removeClass(guideElement, config.classname('weekday-exceed-right'));
        }
    });
};

/**
 * Get schedule block information from schedule data.
 *
 * For example, there is single schedule has 10 length. but render range in view is 5 then
 * rendered block must be cut out to render properly. in this case, this method return
 * how many block are cut before rendering.
 *
 * @param {object} dragStartEventData - schedule data from DayGrid.Move handler.
 * @returns {function} function that return schedule block information.
 */
DayGridMoveGuide.prototype._getScheduleBlockDataFunc = function(dragStartEventData) {
    var model = dragStartEventData.model,
        datesInRange = dragStartEventData.datesInRange,
        range = dragStartEventData.range,
        baseWidthPercent = (100 / datesInRange),
        originScheduleStarts = datetime.start(model.start),
        originScheduleEnds = datetime.end(model.end),
        renderStartDate = datetime.start(range[0]),
        renderEndDate = datetime.end(range[range.length - 1]),
        fromLeft = Math.ceil((originScheduleStarts.getTime() -
            renderStartDate.getTime()) / datetime.MILLISECONDS_PER_DAY) || 0,
        fromRight = Math.ceil((originScheduleEnds.getTime() -
            renderEndDate.getTime()) / datetime.MILLISECONDS_PER_DAY) || 0;

    return function(indexOffset) {
        return {
            baseWidthPercent: baseWidthPercent,
            fromLeft: fromLeft + indexOffset,
            fromRight: fromRight + indexOffset
        };
    };
};

/**
 * DragStart event handler.
 * @param {object} dragStartEventData - schedule data.
 */
DayGridMoveGuide.prototype._onDragStart = function(dragStartEventData) {
    var container = this.daygridMove.view.container,
        guideElement = this.guideElement = dragStartEventData.scheduleBlockElement.cloneNode(true),
        scheduleContainer;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('dragging'));
    }

    this._hideOriginScheduleBlocks(String(dragStartEventData.model.cid()));

    scheduleContainer = domutil.find(config.classname('.weekday-schedules'), container);
    domutil.appendHTMLElement('div', guideElement, config.classname('weekday-schedule-cover'));
    scheduleContainer.appendChild(guideElement);

    this._dragStartXIndex = dragStartEventData.xIndex;
    this.getScheduleDataFunc = this._getScheduleBlockDataFunc(dragStartEventData);

    this._highlightScheduleBlocks(dragStartEventData.model, guideElement);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - schedule data.
 */
DayGridMoveGuide.prototype._onDrag = function(dragEventData) {
    var getScheduleDataFunc = this.getScheduleDataFunc,
        dragStartXIndex = this._dragStartXIndex,
        datesInRange = dragEventData.datesInRange,
        grids = dragEventData.grids,
        scheduleData,
        isExceededLeft,
        isExceededRight,
        originLength,
        leftIndex,
        size,
        newLeft,
        newWidth;

    if (!getScheduleDataFunc) {
        return;
    }

    scheduleData = getScheduleDataFunc(dragEventData.xIndex - dragStartXIndex);
    isExceededLeft = scheduleData.fromLeft < 0;
    isExceededRight = scheduleData.fromRight > 0;

    leftIndex = Math.max(0, scheduleData.fromLeft);
    originLength = (scheduleData.fromLeft * -1) + (datesInRange + scheduleData.fromRight);
    size = isExceededLeft ? (originLength + scheduleData.fromLeft) : originLength;
    size = isExceededRight ? (size - scheduleData.fromRight) : size;

    newLeft = grids[leftIndex] ? grids[leftIndex].left : 0;
    newWidth = getScheduleBlockWidth(leftIndex, size, grids);

    this.refreshGuideElement(newLeft, newWidth, isExceededLeft, isExceededRight);
};

/**
 * Get schedule width based on grids
 * @param {number} left - left index
 * @param {number} size - schedule width
 * @param {Array} grids - dates information
 * @returns {number} element width
 */
function getScheduleBlockWidth(left, size, grids) {
    var width = 0;
    var i = 0;
    var length = grids.length;
    for (; i < size; i += 1) {
        left = (left + i) % length;
        if (left < length) {
            width += grids[left] ? grids[left].width : 0;
        }
    }

    return width;
}

module.exports = DayGridMoveGuide;
