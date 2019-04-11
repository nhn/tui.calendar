/**
 * @fileoverview Module for Time.Move effect while dragging.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../../config');
var domutil = require('../../common/domutil');
var reqAnimFrame = require('../../common/reqAnimFrame');
var ratio = require('../../common/common').ratio;
var FloatingLayer = require('../../common/floatingLayer');
var tmpl = require('../../view/template/week/timeMoveGuide.hbs');
var TZDate = require('../../common/timezone').Date;
var Schedule = require('../../model/schedule');
var datetime = require('../../common/datetime');
var common = require('../../common/common');

var SCHEDULE_MIN_DURATION = datetime.MILLISECONDS_SCHEDULE_MIN_DURATION;

/**
 * Class for Time.Move effect.
 * @constructor
 * @param {TimeMove} timeMove - The instance of TimeMove.
 */
function TimeMoveGuide(timeMove) {
    /**
     * @type {FloatingLayer}
     */
    this._guideLayer = null;

    /**
     * @Type {Schedule}
     */
    this._model = null;

    /**
     * @type {object}
     */
    this._viewModel = null;

    /**
     * @type {object}
     */
    this._lastDrag = null;

    /**
     * @type {HTMLElement}
     */
    this.guideElement = null;

    /**
     * @type {TimeMove}
     */
    this.timeMove = timeMove;

    /**
     * @type {HTMLElement}
     */
    this._container = null;

    /**
     * @type {function}
     */
    this._getTopFunc = null;

    /**
     * @type {number}
     */
    this._startGridY = 0;

    /**
     * @type {number}
     */
    this._startTopPixel = 0;

    timeMove.on({
        'timeMoveDragstart': this._onDragStart,
        'timeMoveDrag': this._onDrag,
        'timeMoveDragend': this._clearGuideElement,
        'timeMoveClick': this._clearGuideElement
    }, this);
}

/**
 * Destroy method
 */
TimeMoveGuide.prototype.destroy = function() {
    this._clearGuideElement();
    this.timeMove.off(this);
    if (this._guideLayer) {
        this._guideLayer.destroy();
    }
    this.guideElement = this.timeMove = this._container = this._guideLayer = this._lastDrag =
        this._getTopFunc = this._startGridY = this._startTopPixel = this._viewModel = null;
};

/**
 * Clear guide element.
 */
TimeMoveGuide.prototype._clearGuideElement = function() {
    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('dragging'));
    }
    if (this._guideLayer) {
        this._guideLayer.destroy();
    }

    this._showOriginScheduleBlocks();

    this.guideElement = this._getTopFunc = this._guideLayer = this._model = this._lastDrag =
        this._startGridY = this._startTopPixel = this._viewModel = null;
};

/**
 * Dim element blocks
 * @param {number} modelID - Schedule model instance ID
 */
TimeMoveGuide.prototype._hideOriginScheduleBlocks = function() {
    var className = config.classname('time-date-schedule-block-dragging-dim');
    if (this.guideElement) {
        domutil.addClass(this.guideElement, className);
    }
};

/**
 * Show element blocks
 */
TimeMoveGuide.prototype._showOriginScheduleBlocks = function() {
    var className = config.classname('time-date-schedule-block-dragging-dim');
    if (this.guideElement) {
        domutil.removeClass(this.guideElement, className);
    }
};

/**
 * Refresh guide element
 * @param {string} top - guide element's style top.
 * @param {Schedule} model - updated model
 * @param {object} viewModel - view model
 */
TimeMoveGuide.prototype._refreshGuideElement = function(top, model, viewModel) {
    var self = this;

    reqAnimFrame.requestAnimFrame(function() {
        if (!self._guideLayer) {
            return;
        }
        self._guideLayer.setPosition(0, top);
        self._guideLayer.setContent(tmpl(util.extend({model: model}, viewModel)));
    });
};

/**
 * TimeMove#timeMoveDragstart event handler
 * @param {object} dragStartEventData - dragstart event data
 */
TimeMoveGuide.prototype._onDragStart = function(dragStartEventData) {
    var guideElement = domutil.closest(
        dragStartEventData.target,
        config.classname('.time-date-schedule-block')
    );
    var duration, modelDuration, goingDuration, comingDuration;

    if (!guideElement) {
        return;
    }

    this._startTopPixel = parseFloat(guideElement.style.top);
    this._startGridY = dragStartEventData.nearestGridY;
    this.guideElement = guideElement;
    this._container = dragStartEventData.relatedView.container;

    this._model = util.extend(
        Schedule.create(dragStartEventData.model),
        dragStartEventData.model
    );

    modelDuration = this._model.duration();
    modelDuration = modelDuration > SCHEDULE_MIN_DURATION ? modelDuration : SCHEDULE_MIN_DURATION;
    goingDuration = datetime.millisecondsFrom('minutes', this._model.goingDuration);
    comingDuration = datetime.millisecondsFrom('minutes', this._model.comingDuration);
    duration = goingDuration + modelDuration + comingDuration;

    this._lastDrag = dragStartEventData;
    this._viewModel = {
        hasGoingDuration: goingDuration > 0,
        hasComingDuration: comingDuration > 0,
        goingDurationHeight: common.ratio(duration, goingDuration, 100),
        modelDurationHeight: common.ratio(duration, modelDuration, 100),
        comingDurationHeight: common.ratio(duration, comingDuration, 100)
    };

    this._resetGuideLayer();
    this._hideOriginScheduleBlocks();
};

/**
 * TimeMove#timeMoveDrag event handler
 * @param {object} dragEventData - drag event data
 */
TimeMoveGuide.prototype._onDrag = function(dragEventData) {
    var timeView = dragEventData.currentView,
        viewOptions = timeView.options,
        viewHeight = timeView.getViewBound().height,
        guideHeight = parseFloat(this.guideElement.style.height),
        hourLength = viewOptions.hourEnd - viewOptions.hourStart,
        gridYOffset = dragEventData.nearestGridY - this._startGridY,
        gridYOffsetPixel = ratio(hourLength, viewHeight, gridYOffset),
        gridDiff = dragEventData.nearestGridY - this._lastDrag.nearestGridY,
        bottomLimit,
        top;

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('dragging'));
    }

    if (this._container !== timeView.container) {
        this._container = timeView.container;
        this._resetGuideLayer();
    }

    top = this._startTopPixel + gridYOffsetPixel;
    bottomLimit = viewHeight - guideHeight;

    top = Math.max(top, 0);
    top = Math.min(top, bottomLimit);

    // update time
    this._model.start = new TZDate(this._model.getStarts()).addMinutes(datetime.minutesFromHours(gridDiff));
    this._model.end = new TZDate(this._model.getEnds()).addMinutes(datetime.minutesFromHours(gridDiff));
    this._lastDrag = dragEventData;

    this._refreshGuideElement(top, this._model, this._viewModel);
};

TimeMoveGuide.prototype._resetGuideLayer = function() {
    if (this._guideLayer) {
        this._guideLayer.destroy();
        this._guideLayer = null;
    }
    this._guideLayer = new FloatingLayer(null, this._container);
    this._guideLayer.setSize(this._container.getBoundingClientRect().width, this.guideElement.style.height);
    this._guideLayer.setPosition(0, this.guideElement.style.top);
    this._guideLayer.setContent(tmpl(util.extend({model: this._model}, this._viewModel)));
    this._guideLayer.show();
};

module.exports = TimeMoveGuide;
