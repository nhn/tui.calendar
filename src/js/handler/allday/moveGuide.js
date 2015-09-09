/**
 * @fileoverview Effect module for Allday.Move
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var common = require('../../common/common');
var datetime = require('../../datetime');

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

AlldayMoveGuide.prototype._clearGuideElement = function() {};

AlldayMoveGuide.prototype._onDragStart = function(dragStartEventData) {
    var model = dragStartEventData.model,
        // 실제 기간을 바탕으로 가이드 엘리먼트의 길이를 재 계산한다 (렌더링할때 자르기 때문)
        dateLengthInEvent = datetime.range(
            datetime.start(model.starts),
            datetime.end(model.ends),
            datetime.MILLISECONDS_PER_DAY
        ).length,
        renderStartTime = datetime.parse(this.alldayMove.alldayView.options.renderStartDate).getTime(),
        baseWidthPercent = (100 / dragStartEventData.datesInRange),
        left = common.ratio(renderStartTime, 0, datetime.start(model.starts).getTime());

    console.log(renderStartTime);
    console.log(datetime.start(model.starts).getTime());


    console.log(baseWidthPercent * dateLengthInEvent, left);
};

AlldayMoveGuide.prototype._onDrag = function(dragEventData) {
    console.log(dragEventData);
};

module.exports = AlldayMoveGuide;

