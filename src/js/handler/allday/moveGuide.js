/**
 * @fileoverview Effect module for Allday.Move
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.ne.util;
var common = require('../../common/common');
var datetime = require('../../datetime');
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

AlldayMoveGuide.prototype._clearGuideElement = function() {
    domutil.remove(this.guideElement);

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, 'schedule-view-dragging');
    }

    this._dragStartXIndex = this.getEventDataFunc = this.guideElement = null;
};

AlldayMoveGuide.prototype.refreshGuideElement = function(left, width) {
    var guideElement = this.guideElement;

    reqAnimFrame.requestAnimFrame(function() {
        guideElement.style.left = left + '%';
        guideElement.style.width = width + '%';
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
AlldayMoveGuide.prototype._getEventBlockData = function(dragStartEventData) {
    var model = dragStartEventData.model,
        datesInRange = dragStartEventData.datesInRange,
        baseWidthPercent = (100 / datesInRange),
        originEventStarts = datetime.start(model.starts),
        originEventEnds = datetime.end(model.ends),
        viewOptions = this.alldayMove.alldayView.options,
        renderStartDate = datetime.start(datetime.parse(viewOptions.renderStartDate)),
        renderEndDate = datetime.end(datetime.parse(viewOptions.renderEndDate)),
        diffByRenderStartDate = (new Date(originEventStarts.getTime() - renderStartDate.getTime())) / datetime.MILLISECONDS_PER_DAY | 0,
        diffByRenderEndDate = (new Date(originEventEnds.getTime() - renderEndDate.getTime())) / datetime.MILLISECONDS_PER_DAY | 0;

    return function(indexOffset) {
        return {
            baseWidthPercent: baseWidthPercent,
            fromLeft: diffByRenderStartDate + indexOffset,
            fromRight: diffByRenderEndDate + indexOffset
        };
    };
};

AlldayMoveGuide.prototype._onDragStart = function(dragStartEventData) {};

AlldayMoveGuide.prototype._onDrag = function(dragEventData) {};

module.exports = AlldayMoveGuide;

