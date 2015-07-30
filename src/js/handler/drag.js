/**
 * @fileoverview Drag handler for calendar.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
var domevent = require('../common/domevent');

/**
 * @constructor
 * @mixes CustomEvents
 * @param {LayoutView} layoutView Layout view instance.
 */
function Drag(layoutView) {
    var container = layoutView.container;

    domevent.on(container, 'mousedown', this._onMouseDown, this);

    /**
     * @type {HTMLElement}
     */
    this.container = container;

    /**
     * @type {boolean}
     */
    this._isMoved = false;
}

/**
 * Destroy method.
 */
Drag.prototype.destroy = function() {
    domevent.off(this.container, 'mousedown', this._onMouseDown, this);
    this._isMoved = null;
    this.container = null;
};

/**
 * Toggle event for mouse drags.
 * @param {boolean} onOff Set true then bind events.
 */
Drag.prototype._toggleDragEvent = function(onOff) {
    var prefix = ['disable', 'enable'],
        prefixEvent = ['on', 'off'],
        container = this.container,
        flag = +(!onOff);

    domutil[prefix[flag] + 'TextSelection'](container);
    domutil[prefix[flag] + 'ImageDrag'](container);
    domevent[prefixEvent[flag]](global, {
        mousemove: this._onMouseMove,
        mouseup: this._onMouseUp
    }, this);
};

/**
 * MouseDown DOM event handler.
 * @param {MouseEvent} mouseDownEvent MouseDown event object.
 * @emits Drag#dragStart
 */
Drag.prototype._onMouseDown = function(mouseDownEvent) {
    var eventData = {
        target: mouseDownEvent.target || mouseDownEvent.srcElement,
        originEvent: mouseDownEvent
    };

    // only primary button can start drag.
    if (domevent.getButton(mouseDownEvent) !== 0) {
        return;
    }

    /**
     * Drag starts events. cancelable.
     * @event Drag#dragStart
     * @type {object}
     * @property {HTMLElement} target - The target element in this event.
     * @property {MouseEvent} originEvent - Original MouseEvent object.
     */
    if (!this.invoke('dragStart', eventData)) {
        return;
    }

    this._toggleDragEvent(true);
};

/**
 * MouseMove DOM event handler.
 * @param {MouseEvent} mouseMoveEvent MouseMove event object.
 * @emits Drag#drag
 */
Drag.prototype._onMouseMove = function(mouseMoveEvent) {
    // prevent automatic scrolling.
    domevent.preventDefault(mouseMoveEvent);

    this._isMoved = true;

    /**
     * Events while dragging.
     * @event Drag#drag
     * @type {MouseEvent}
     */
    this.fire('drag', mouseMoveEvent);
};

/**
 * MouseUp DOM event handler.
 * @param {MouseEvent} mouseUpEvent MouseUp event object.
 * @emits Drag#dragEnd
 * @emits Drag#click
 */
Drag.prototype._onMouseUp = function(mouseUpEvent) {
    this._toggleDragEvent(false);

    // emit "click" event when not emitted drag event between mousedown and mouseup.
    if (this._isMoved) {
        this._isMoved = false;

        /**
         * Drag end events.
         * @event Drag#dragEnd
         * @type {MouseEvent}
         */
        this.fire('dragEnd', mouseUpEvent);
        return;
    }

    /**
     * Click events.
     * @event Drag#click
     * @type {MouseEvent}
     */
    this.fire('click', mouseUpEvent);
};

util.CustomEvents.mixin(Drag);

module.exports = Drag;

