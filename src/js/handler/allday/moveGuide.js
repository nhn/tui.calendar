/**
 * @fileoverview Effect module for Allday.Move
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');

/**
 * Class for Allday.Move dragging effect.
 * @constructor
 * @param {AlldayMove} alldayMove - instance of AlldayMove.
 */
function AlldayMoveGuide(alldayMove) {
    /**
     * @type {AlldayMove}
     */
    this.alldayMove = alldayMove;

    /**
     * 실제로 이벤트 엘리먼트를 담는 엘리먼트
     * @type {HTMLDIVElement}
     */
    this.eventContainer = null;

    /**
     * @type {number}
     */
    this._dragStartXIndex = null;

    /**
     * @type {HTMLDIVElement}
     */
    this.guideElement = null;

    alldayMove.on({
        'allday_move_dragstart': this._onDragStart,
        'allday_move_drag': this._onDrag,
        'allday_move_dragend': this._clearGuideElement,
        'allday_move_click': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
AlldayMoveGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.alldayMove.off(this);
    this.alldayMove = this.eventContainer = this._dragStartXIndex =
        this.guideElement = null;
};

/**
 * Clear guide element.
 */
AlldayMoveGuide.prototype._clearGuideElement = function() {
    domutil.remove(this.guideElement);

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('dragging'));
    }

    this._dragStartXIndex = this.getEventDataFunc = this.guideElement = null;
};

/**
 * Refresh guide element.
 * @param {number} leftPercent - left percent of guide element.
 * @param {number} widthPercent - width percent of guide element.
 * @param {boolean} isExceededLeft - event starts is faster then render start date?
 * @param {boolean} isExceededRight - event ends is later then render end date?
 */
AlldayMoveGuide.prototype.refreshGuideElement = function(leftPercent, widthPercent, isExceededLeft, isExceededRight) {
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
 * Get event block information from event data.
 *
 * For example, there is single event has 10 length. but render range in view is 5 then
 * rendered block must be cut out to render properly. in this case, this method return
 * how many block are cut before rendering.
 *
 * 이벤트 데이터에서 이벤트 블록 엘리먼트 렌더링에 대한 필요 정보를 추출한다.
 *
 * ex) 렌더링 된 블록의 길이는 5지만 실제 이 이벤트는 10의 길이를 가지고 있을 때
 * 좌 우로 몇 만큼 잘려있는지에 관한 정보를 반환함.
 * @param {object} dragStartEventData - event data from Allday.Move handler.
 * @returns {function} function that return event block information.
 */
AlldayMoveGuide.prototype._getEventBlockDataFunc = function(dragStartEventData) {
    var model = dragStartEventData.model,
        datesInRange = dragStartEventData.datesInRange,
        baseWidthPercent = (100 / datesInRange),
        originEventStarts = datetime.start(model.starts),
        originEventEnds = datetime.end(model.ends),
        viewOptions = this.alldayMove.alldayView.options,
        renderStartDate = datetime.start(datetime.parse(viewOptions.renderStartDate)),
        renderEndDate = datetime.end(datetime.parse(viewOptions.renderEndDate)),
        fromLeft = (new Date(originEventStarts.getTime() - renderStartDate.getTime())) / datetime.MILLISECONDS_PER_DAY | 0,
        fromRight = (new Date(originEventEnds.getTime() - renderEndDate.getTime())) / datetime.MILLISECONDS_PER_DAY | 0;

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
 * @param {object} dragStartEventData - event data.
 */
AlldayMoveGuide.prototype._onDragStart = function(dragStartEventData) {
    var alldayViewContainer = this.alldayMove.alldayView.container,
        guideElement = this.guideElement = dragStartEventData.eventBlockElement.cloneNode(true),
        eventContainer;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('dragging'));
    }

    eventContainer = domutil.find(config.classname('.weekday-events'), alldayViewContainer);
    domutil.addClass(guideElement, config.classname('allday-guide-move'));
    eventContainer.appendChild(guideElement);

    this._dragStartXIndex = dragStartEventData.xIndex;
    this.getEventDataFunc = this._getEventBlockDataFunc(dragStartEventData);
};

/**
 * Drag event handler.
 * @param {object} dragEventData - event data.
 */
AlldayMoveGuide.prototype._onDrag = function(dragEventData) {
    var getEventDataFunc = this.getEventDataFunc,
        dragStartXIndex = this._dragStartXIndex,
        datesInRange = dragEventData.datesInRange,
        eventData,
        isExceededLeft,
        isExceededRight,
        originLength,
        newLeft,
        newWidth;

    if (!getEventDataFunc) {
        return;
    }

    eventData = getEventDataFunc(dragEventData.xIndex - dragStartXIndex);
    isExceededLeft = eventData.fromLeft < 0;
    isExceededRight = eventData.fromRight > 0;

    newLeft = Math.max(0, eventData.fromLeft);
    originLength = (eventData.fromLeft * -1) + (datesInRange + eventData.fromRight);
    newWidth = isExceededLeft ? (originLength + eventData.fromLeft) : originLength;
    newWidth = isExceededRight ? (newWidth - eventData.fromRight) : newWidth;

    newLeft *= eventData.baseWidthPercent;
    newWidth *= eventData.baseWidthPercent;

    this.refreshGuideElement(newLeft, newWidth, isExceededLeft, isExceededRight);
};

module.exports = AlldayMoveGuide;

