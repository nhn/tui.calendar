/**
 * @fileoverview Creation handler for month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var core = require('./core');

/**
 * @constructor
 * @param {Drag} dragHandler - Drag handler instance.
 * @param {Month} monthView - Month view instance.
 * @param {Base} baseController - Base controller instance.
 */
function MonthCreation(dragHandler, monthView, baseController) {
    /**
     * @type {Drag}
     */
    this.dragHandler = dragHandler;

    /**
     * @type {Month}
     */
    this.monthView = monthView;

    /**
     * @type {Base}
     */
    this.baseController = baseController;

    /**
     * @type {function}
     */
    this.getBaseEventData = null;

    dragHandler.on('dragStart', this._onDragStart, this);
}

/**
 * Destructor
 */
MonthCreation.prototype.destroy = function() {
    this.dragHandler.off(this);
    this.monthView = this.baseController = this.dragHandler = null;
};

/**
 * DragStart event handler
 * @param {object} dragStartEvent - dragStart event data
 */
MonthCreation.prototype._onDragStart = function(dragStartEvent) {
    var dragHandler = this.dragHandler,
        originEvent = dragStartEvent.originEvent,
        target = dragStartEvent.target;

    // TODO: 빈 영역일때만 동작하도록 조건 설정.

    dragHandler.on({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getBaseEventData = core(dragHandler, this.monthView);
};

MonthCreation.prototype._onDrag = function(dragEvent) {
    if (!this.getBaseEventData) {
        return;
    }

    this.getBaseEventData(dragEvent.originEvent);
};

MonthCreation.prototype._onDragEnd = function(dragEndEvent) {
    this.dragHandler.off({
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    this.getBaseEventData = null;
};

module.exports = MonthCreation;

