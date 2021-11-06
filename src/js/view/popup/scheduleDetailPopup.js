/* eslint-disable vars-on-top */
/**
 * @fileoverview Floating layer for showing detail schedule
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var View = require('../../view/view');
var FloatingLayer = require('../../common/floatingLayer');
var util = require('tui-code-snippet');
var config = require('../../config'),
    domevent = require('../../common/domevent'),
    domutil = require('../../common/domutil');
var tmpl = require('../template/popup/scheduleDetailPopup.hbs');
var tz = require('../../common/timezone');
var TZDate = tz.Date;
var datetime = require('../../common/datetime');

/**
 * @constructor
 * @extends {View}
 * @param {HTMLElement} container - container element
 */
function ScheduleDetailPopup(container) {
    View.call(this, container);
    /**
     * @type {FloatingLayer}
     */
    this.layer = new FloatingLayer(null, container);

    /**
     * cached view model
     * @type {object}
     */
    this._viewModel = null;
    this._schedule = null;
    this._calendar = null;

    domevent.on(container, 'click', this._onClick, this);
}

util.inherit(ScheduleDetailPopup, View);

/**
 * Mousedown event handler for hiding popup layer when user mousedown outside of
 * layer
 * @param {MouseEvent} mouseDownEvent - mouse event object
 */
ScheduleDetailPopup.prototype._onMouseDown = function(mouseDownEvent) {
    var target = domevent.getEventTarget(mouseDownEvent),
        popupLayer = domutil.closest(target, config.classname('.floating-layer'));

    if (popupLayer) {
        return;
    }

    this.hide();
};

/**
 * @override
 */
ScheduleDetailPopup.prototype.destroy = function() {
    this.layer.destroy();
    this.layer = null;
    domevent.off(this.container, 'click', this._onClick, this);
    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
    View.prototype.destroy.call(this);
};

/**
 * @override
 * Click event handler for close button
 * @param {MouseEvent} clickEvent - mouse event object
 */
ScheduleDetailPopup.prototype._onClick = function(clickEvent) {
    var target = domevent.getEventTarget(clickEvent);

    this._onClickEditSchedule(target);

    this._onClickDeleteSchedule(target);
};

/**
 * @fires ScheduleDetailPopup#clickEditSchedule
 * @param {HTMLElement} target - event target
 */
ScheduleDetailPopup.prototype._onClickEditSchedule = function(target) {
    var className = config.classname('popup-edit');

    if (domutil.hasClass(target, className) || domutil.closest(target, '.' + className)) {
        this.fire('beforeUpdateSchedule', {
            schedule: this._schedule,
            triggerEventName: 'click',
            target: this._scheduleEl
        });

        this.hide();
    }
};

/**
 * @fires ScheduleDetailPopup#clickEditSchedule
 * @param {HTMLElement} target - event target
 */
ScheduleDetailPopup.prototype._onClickDeleteSchedule = function(target) {
    var className = config.classname('popup-delete');

    if (domutil.hasClass(target, className) || domutil.closest(target, '.' + className)) {
        this.fire('beforeDeleteSchedule', {
            schedule: this._schedule
        });

        this.hide();
    }
};

/**
 * @override
 * @param {object} viewModel - view model from factory/monthView
 */
ScheduleDetailPopup.prototype.render = function(viewModel) {
    var layer = this.layer;
    var self = this;

    layer.setContent(tmpl({
        schedule: this._getScheduleModel(viewModel.schedule),
        calendar: viewModel.calendar
    }));
    layer.show();
    this._setPopupPositionAndArrowDirection(viewModel.event);

    this._schedule = viewModel.schedule;
    this._calendar = viewModel.calendar;

    util.debounce(function() {
        domevent.on(document.body, 'mousedown', self._onMouseDown, self);
    })();
};

// eslint-disable-next-line complexity
ScheduleDetailPopup.prototype._getScheduleModel = function(scheduleViewModel) {
    var viewModel = util.extend({}, scheduleViewModel);
    var dayStart = datetime.start(scheduleViewModel.start);
    var startDayOffset = dayStart.toDate().getTimezoneOffset();
    var nativeOffsetMs = tz.getNativeOffsetMs();
    var hasPrimaryTimezoneCustomSetting = tz.hasPrimaryTimezoneCustomSetting();
    var startOffset = viewModel.start.toDate().getTimezoneOffset();
    var endOffset = viewModel.end.toDate().getTimezoneOffset();
    var primaryTimezoneCode = tz.getPrimaryTimezoneName();
    var primaryOffset = tz.getPrimaryOffset();
    var startTimezoneOffset = tz.getOffsetByTimezoneName(
        primaryTimezoneCode,
        viewModel.start.getTime()
    );
    var endTimezoneOffset = tz.getOffsetByTimezoneName(
        primaryTimezoneCode,
        viewModel.end.getTime()
    );
    var MIN_TO_MS = 60 * 1000;
    var offsetDiffMs = 0;
    var start, end;

    if (
        hasPrimaryTimezoneCustomSetting &&
        tz.isNativeOsUsingDSTTimezone() &&
        nativeOffsetMs !== startDayOffset
    ) {
        // When using a custom time zone, the native time zone offset is fixed and rendered.
        // So, The fixed and rendered time should be recalculated as the original time zone offset.
        // The current system OS local time is not affected by summer/standard time and the schedule should always be displayed in the same location.
        offsetDiffMs = (startOffset * MIN_TO_MS) - nativeOffsetMs;
        start = new TZDate(viewModel.start);
        start.addMilliseconds(offsetDiffMs);

        viewModel.start = start;

        offsetDiffMs = (endOffset * MIN_TO_MS) - nativeOffsetMs;
        end = new TZDate(viewModel.end);
        end.addMilliseconds(offsetDiffMs);

        viewModel.end = end;
    }

    if (
        hasPrimaryTimezoneCustomSetting &&
        tz.isPrimaryUsingDSTTimezone() &&
        (primaryOffset !== startTimezoneOffset || primaryOffset !== endTimezoneOffset)
    ) {
        // The custom time zone is a time zone where two offsets including DST are applied.
        // The first rendered schedule is calculated and drawn with the offset calculated at the access time(system OS local time).
        // It should be recalculated with the original time zone offset.
        offsetDiffMs = (primaryOffset - startTimezoneOffset) * MIN_TO_MS;

        start = new TZDate(viewModel.start);
        start.addMilliseconds(offsetDiffMs);

        viewModel.start = start;

        offsetDiffMs = (primaryOffset - endTimezoneOffset) * MIN_TO_MS;

        end = new TZDate(viewModel.end);
        end.addMilliseconds(offsetDiffMs);

        viewModel.end = end;
    }

    return viewModel;
};

/**
 * Set popup position and arrow direction to appear near guide element
 * @param {Event} event - creation guide element
 */
ScheduleDetailPopup.prototype._setPopupPositionAndArrowDirection = function(event) {
    var layer = domutil.find(config.classname('.popup'), this.layer.container);
    var layerSize = {
        width: layer.offsetWidth,
        height: layer.offsetHeight
    };

    var containerBound = this.container.getBoundingClientRect();
    var scheduleEl = domevent.getEventTarget(event);
    var blockEl = domutil.closest(scheduleEl, config.classname('.time-date-schedule-block'))
        || domutil.closest(scheduleEl, config.classname('.weekday-schedule'))
        || scheduleEl;
    var scheduleBound = blockEl.getBoundingClientRect();
    var pos;

    this._scheduleEl = blockEl;

    pos = this._calcRenderingData(layerSize, containerBound, scheduleBound);
    this.layer.setPosition(pos.x, pos.y);
    this._setArrowDirection(pos.arrow);
};

/**
 * Get calculate rendering positions of y and arrow top by schedule block elements
 * @param {number} scheduleBoundTop - schedule block's top
 * @param {number} scheduleBoundBottom - schedule block's bottom
 * @param {number} layerHeight - popup layer's height
 * @param {number} containerTop - container's top
 * @param {number} containerBottom - container's bottom
 * @returns {YAndArrowTop} y and arrowTop
 */
ScheduleDetailPopup.prototype._getYAndArrowTop = function(
    scheduleBoundTop,
    scheduleBoundBottom,
    layerHeight,
    containerTop,
    containerBottom
) {
    var ARROW_WIDTH_HALF = 8;
    var scheduleVerticalCenter, y, arrowTop;

    scheduleBoundTop = scheduleBoundTop < 0 ? 0 : scheduleBoundTop;
    scheduleVerticalCenter = (scheduleBoundTop + scheduleBoundBottom) / 2;
    y = scheduleVerticalCenter - (layerHeight / 2);

    if (y < containerTop) {
        y = 0;
        arrowTop = scheduleVerticalCenter - containerTop - ARROW_WIDTH_HALF;
    } else if (y + layerHeight > containerBottom) {
        y = Math.max(containerBottom - layerHeight - containerTop, 0);
        arrowTop = scheduleVerticalCenter - y - containerTop - ARROW_WIDTH_HALF;
    } else {
        y -= containerTop;
    }

    if (arrowTop < 0 || arrowTop > layerHeight) {
        arrowTop = null;
    }

    /**
     * @typedef {Object} YAndArrowTop
     * @property {number} y - top position of popup layer
     * @property {number} [arrowTop] - relative position of popup arrow, if it is not set, arrow appears on the middle of popup
     */
    return {
        y: y,
        arrowTop: arrowTop
    };
};

/**
 * Get calculate rendering x position and arrow direction by schedule block elements
 * @param {number} scheduleBoundLeft - schedule block's left
 * @param {number} scheduleBoundRight - schedule block's right
 * @param {number} layerWidth - popup layer's width
 * @param {number} containerLeft - container's left
 * @param {number} containerRight - container's right
 * @returns {XAndArrowDirection} x and arrowDirection
 */
ScheduleDetailPopup.prototype._getXAndArrowDirection = function(
    scheduleBoundLeft,
    scheduleBoundRight,
    layerWidth,
    containerLeft,
    containerRight
) {
    var arrowDirection = 'arrow-left';
    var x = scheduleBoundRight;
    var MARGIN = 4;

    if (x + layerWidth > containerRight) {
        arrowDirection = 'arrow-right';
        x = scheduleBoundLeft - layerWidth - MARGIN;
    } else {
        x += MARGIN;
    }

    if (x < containerLeft) {
        x = 0;
    } else {
        x -= containerLeft;
    }

    /**
     * @typedef {Object} XAndArrowDirection
     * @property {number} x - left position of popup layer
     * @property {string} arrowDirection - direction of popup arrow
     */
    return {
        x: x,
        arrowDirection: arrowDirection
    };
};

/**
 * Calculate rendering position usering guide elements
 * @param {{width: {number}, height: {number}}} layerSize - popup layer's width and height
 * @param {{top: {number}, left: {number}, right: {number}, bottom: {number}}} containerBound - width and height of the upper layer, that acts as a border of popup
 * @param {{top: {number}, left: {number}, right: {number}, bottom: {number}}} scheduleBound - guide element bound data
 * @returns {PopupRenderingData} rendering position of popup and popup arrow
 */
ScheduleDetailPopup.prototype._calcRenderingData = function(layerSize, containerBound, scheduleBound) {
    var yPosInfo = this._getYAndArrowTop(
        scheduleBound.top,
        scheduleBound.bottom,
        layerSize.height,
        containerBound.top,
        containerBound.bottom
    );
    var xPosInfo = this._getXAndArrowDirection(
        scheduleBound.left,
        scheduleBound.right,
        layerSize.width,
        containerBound.left,
        containerBound.right
    );

    /**
     * @typedef {Object} PopupRenderingData
     * @property {number} x - left position
     * @property {number} y - top position
     * @property {string} arrow.direction - direction of popup arrow
     * @property {number} [arrow.position] - relative position of popup arrow, if it is not set, arrow appears on the middle of popup
     */
    return {
        x: xPosInfo.x,
        y: yPosInfo.y,
        arrow: {
            direction: xPosInfo.arrowDirection,
            position: yPosInfo.arrowTop
        }
    };
};

/**
 * Set arrow's direction and position
 * @param {Object} arrow rendering data for popup arrow
 */
ScheduleDetailPopup.prototype._setArrowDirection = function(arrow) {
    var direction = arrow.direction || 'arrow-left';
    var arrowEl = domutil.find(config.classname('.popup-arrow'), this.layer.container);
    var borderElement = domutil.find(config.classname('.popup-arrow-border'), arrowEl);

    if (direction !== config.classname('arrow-left')) {
        domutil.removeClass(arrowEl, config.classname('arrow-left'));
        domutil.addClass(arrowEl, config.classname(direction));
    }

    if (arrow.position) {
        borderElement.style.top = arrow.position + 'px';
    }
};

/**
 * Hide layer
 */
ScheduleDetailPopup.prototype.hide = function() {
    this.layer.hide();

    if (this.guide) {
        this.guide.clearGuideElement();
        this.guide = null;
    }

    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
};

/**
 * refresh layer
 */
ScheduleDetailPopup.prototype.refresh = function() {
    if (this._viewModel) {
        this.layer.setContent(this.tmpl(this._viewModel));
    }
};

module.exports = ScheduleDetailPopup;
