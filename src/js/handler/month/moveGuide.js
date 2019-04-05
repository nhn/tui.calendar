/**
 * @fileoverview Module for modification of guide element for move in month view
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');

var config = require('../../config'),
    domutil = require('../../common/domutil'),
    domevent = require('../../common/domevent'),
    FloatingLayer = require('../../common/floatingLayer'),
    tmpl = require('./moveGuide.hbs'),
    Schedule = require('../../model/schedule');

/**
 * @constructor
 * @param {MonthMove} monthMove - month/move module instance
 */
function MonthMoveGuide(monthMove) {
    /**
     * @type {MonthMove}
     */
    this.monthMove = monthMove;

    /**
     * @type {HTMLElement[]}
     */
    this.elements = null;

    /**
     * @type {FloatingLayer}
     */
    this.layer = null;

    monthMove.on({
        monthMoveDragstart: this._onDragStart,
        monthMoveDrag: this._onDrag,
        monthMoveDragend: this._onDragEnd
    }, this);
}

/**
 * Destructor
 */
MonthMoveGuide.prototype.destroy = function() {
    this.monthMove.off(this);
    this._clearGridBgColor();

    if (this.layer) {
        this.layer.destroy();
    }

    if (this.element) {
        domutil.remove(this.element);
    }

    this.monthMove = this.elements = this.layer = null;
};

/**
 * Hide element blocks for resize effect
 * @param {number} modelID - Schedule model instance ID
 */
MonthMoveGuide.prototype._hideOriginScheduleBlocks = function(modelID) {
    var className = config.classname('weekday-schedule-block-dragging-dim');

    this.elements = domutil.find(
        config.classname('.weekday-schedule-block-' + modelID),
        this.monthMove.monthView.container,
        true
    );

    util.forEach(this.elements, function(el) {
        domutil.addClass(el, className);
    });
};

/**
 * Show element blocks
 */
MonthMoveGuide.prototype._showOriginScheduleBlocks = function() {
    var className = config.classname('weekday-schedule-block-dragging-dim');

    util.forEach(this.elements, function(el) {
        domutil.removeClass(el, className);
    });
};

/**
 * Clear background color for filled grid element.
 */
MonthMoveGuide.prototype._clearGridBgColor = function() {
    var selector = config.classname('.weekday-filled'),
        className = config.classname('weekday-filled'),
        beforeGridElement = domutil.find(selector,
            this.monthMove.monthView.container);

    if (beforeGridElement) {
        domutil.removeClass(beforeGridElement, className);
    }
};

/**
 * Fill background color of date grids relatied with model updates.
 * @param {object} dragEvent - drag event data from MonthMoveGuide#_onDrag
 */
MonthMoveGuide.prototype._updateGridBgColor = function(dragEvent) {
    var gridElements = domutil.find(config.classname('.weekday-grid-line'), this.monthMove.monthView.container, true),
        className = config.classname('weekday-filled'),
        targetIndex = (dragEvent.x + (dragEvent.sizeX * dragEvent.y));

    this._clearGridBgColor();

    if (!gridElements || !gridElements[targetIndex]) {
        return;
    }

    domutil.addClass(gridElements[targetIndex], className);
};

/**
 * Handler for MonthMove#dragStart
 * @param {object} dragStartEvent - dragStart schedule data object
 */
MonthMoveGuide.prototype._onDragStart = function(dragStartEvent) {
    var monthView = this.monthMove.monthView,
        firstWeekdayView = monthView.children.single(),
        weekdayOptions = firstWeekdayView.options,
        widthPercent = 100 / firstWeekdayView.getRenderDateRange().length,
        height = weekdayOptions.scheduleGutter + weekdayOptions.scheduleHeight,
        container = monthView.container,
        mousePos = domevent.getMousePosition(dragStartEvent.originEvent, container),
        model = dragStartEvent.model,
        layer = new FloatingLayer(null, container);

    this._hideOriginScheduleBlocks(model.cid());

    this.layer = layer;
    layer.setSize(widthPercent + '%', height);
    layer.setPosition(mousePos[0], mousePos[1]);
    layer.setContent(tmpl({
        model: util.extend(
            Schedule.create(model),
            model
        ),
        styles: {
            scheduleHeight: weekdayOptions.scheduleHeight,
            scheduleBulletTop: weekdayOptions.scheduleHeight / 3,
            borderRadius: monthView.controller.theme.month.schedule.borderRadius
        }
    }));
    layer.show();

    if (!util.browser.msie) {
        domutil.addClass(global.document.body, config.classname('dragging'));
    }
};

/**
 * Handler for MonthMove#drag
 * @param {object} dragEvent - drag event data object
 */
MonthMoveGuide.prototype._onDrag = function(dragEvent) {
    var container = this.monthMove.monthView.container,
        mousePos = domevent.getMousePosition(
            dragEvent.originEvent,
            container
        );

    this._updateGridBgColor(dragEvent);

    if (!this.layer) {
        return;
    }

    this.layer.setPosition(mousePos[0], mousePos[1]);
};

/**
 * Handler for MonthMove#dragEnd
 */
MonthMoveGuide.prototype._onDragEnd = function() {
    this._showOriginScheduleBlocks();

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('dragging'));
    }

    this._clearGridBgColor();
    this.layer.destroy();
    this.layer = null;
};

module.exports = MonthMoveGuide;
