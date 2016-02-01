/**
 * @fileoverview Module for modification of guide element for move in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;

var config = require('../../config'),
    domutil = require('../../common/domutil'),
    domevent = require('../../common/domevent'),
    FloatingLayer = require('../../common/floatingLayer'),
    tmpl = require('./moveGuide.hbs');

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
        month_move_dragstart: this._onDragStart,
        month_move_drag: this._onDrag,
        month_move_dragend: this._onDragEnd
    }, this);
}

/**
 * Destructor
 */
MonthMoveGuide.prototype.destroy = function() {
    this.monthMove.off(this);

    this.monthMove = this.elements = null;
};

/**
 * Hide element blocks for resize effect
 * @param {number} modelID - CalEvent model instance ID
 */
MonthMoveGuide.prototype._hideEventBlocks = function(modelID) {
    this.elements = domutil.find(
        config.classname('.weekday-event-block-' + modelID), 
        this.monthMove.monthView.container,
        true
    );

    util.forEach(this.elements, function(el) {
        el.style.display = 'none';
    });
};

/**
 * Show element blocks
 */
MonthMoveGuide.prototype._showEventBlocks = function() {
    util.forEach(this.elements, function(el) {
        el.style.display = 'block';
    });
};

/**
 * Handler for MonthMove#dragStart
 * @param {object} dragStartEvent - dragStart event data object
 */
MonthMoveGuide.prototype._onDragStart = function(dragStartEvent) {
    var monthView = this.monthMove.monthView,
        widthPercent = 100 / monthView.children.single().getRenderDateRange().length,
        height = parseInt(dragStartEvent.target.style.height, 10),
        container = monthView.container,
        mousePos = domevent.getMousePosition(dragStartEvent.originEvent, container),
        model = dragStartEvent.model,
        layer;

    layer = this.layer = new FloatingLayer(null, container);
    layer.setSize(widthPercent + '%', height);
    layer.setPosition(mousePos[0], mousePos[1]);

    layer.setContent(tmpl({
        label: model.title,
        bgColor: model.bgColor
    }));

    layer.show();

    this._hideEventBlocks(model.cid());

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
            dragEvent.originEvent, container);

    if (!this.layer) {
        return;
    }

    this.layer.setPosition(mousePos[0], mousePos[1]);
};

/**
 * Handler for MonthMove#dragEnd
 * @param {object} dragEndEvent - dragEnd event data object
 */
MonthMoveGuide.prototype._onDragEnd = function(dragEndEvent) {
    this._showEventBlocks();

    if (!util.browser.msie) {
        domutil.removeClass(global.document.body, config.classname('dragging'));
    }

    this.layer.destroy();
    this.layer = null;
};

module.exports = MonthMoveGuide;


