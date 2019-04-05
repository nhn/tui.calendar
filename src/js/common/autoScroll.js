/**
 * @fileoverview Add autoscroll feature to elements that prevented text selection.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var domevent = require('../common/domevent');
var domutil = require('../common/domutil');
var Point = require('../common/point');

var SCROLL_INTERVAL = 30;
var SCROLL_MAX = 15;
var SCROLL_CLICK_INCREASED = 2; // In IE, the offset of the actual UI pixel when the scroll bar is clicked is offset.

/**
 * Add autoscroll feature to elements that prevented text selection.
 * @constructor
 * @param {HTMLElement} container - HTMLElement to add autoscroll features.
 */
function AutoScroll(container) {
    /**
     * @type {HTMLElement}
     */
    this.container = container;

    /**
     * @type {AutoScroll.DIRECTION}
     */
    this._direction = AutoScroll.DIRECTION.INSIDE;

    /**
     * @type {number}
     */
    this._offset = 0;

    /**
     * interval to scrolling
     * @type {number}
     */
    this._intervalID = 0;

    domevent.on(container, {
        'mousedown': this._onMouseDown
    }, this);
}

/**
 * @enum
 */
AutoScroll.DIRECTION = {
    INSIDE: 0,
    TOP: 1,
    RIGHT: 2,
    BOTTOM: 3,
    LEFT: 4
};

/**
 * Instance destroy method.
 */
AutoScroll.prototype.destroy = function() {
    domevent.off(this.container, {
        'mousedown': this._onMouseDown,
        'mousemove': this._onMouseMove,
        'mouseup': this._onMouseUp
    }, this);

    window.clearInterval(this._intervalID);
    this._intervalID = this._direction = this.container = null;
};

/**
 * Normalize ClientRect and calculate each position of edges.
 * @param {ClientRect} clientRect - ClientRect object of element.
 * @returns {object} edges.
 */
AutoScroll.prototype._getEdgePositions = function(clientRect) {
    return {
        top: clientRect.top,
        right: clientRect.left + clientRect.width,
        bottom: clientRect.bottom,
        left: clientRect.left
    };
};

/**
 * Get element real size ("real size" -> size without scrollbar)
 * @param {HTMLElement} el - element want to know real size ("real size" -> size without scrollbar)
 * @returns {number[]} real size [width, height]
 */
AutoScroll.prototype.getRealSize = function(el) {
    var computed = domutil.getComputedStyle(el),
        border,
        padding;

    border = parseFloat(computed.getPropertyValue('border-top-width')) +
        parseFloat(computed.getPropertyValue('border-bottom-width'));
    padding = parseFloat(computed.getPropertyValue('padding-top')) +
        parseFloat(computed.getPropertyValue('padding-bottom'));

    return [el.clientWidth + border + padding, el.clientHeight + border + padding];
};

/**
 * Check supplied element has scrollbar.
 * @param {HTMLElement} el - element want to know has scrollbar.
 * @returns {boolean[]} has scrollbar? [horizontal, vertical]
 */
AutoScroll.prototype.hasScrollbar = function(el) {
    var realSize = this.getRealSize(el);

    return [
        el.offsetWidth > Math.ceil(realSize[0]),
        el.offsetHeight > Math.ceil(realSize[1])
    ];
};

/**
 * @param {HTMLElement} el - element want to know.
 * @param {MouseEvent} mouseEvent - mouse event object.
 * @returns {boolean} mouse pointer is on the scrollbar?
 */
AutoScroll.prototype.isOnScrollbar = function(el, mouseEvent) {
    var realSize = this.getRealSize(el),
        pos = domevent.getMousePosition(mouseEvent, el),
        mouseInScrollbar = false;

    mouseInScrollbar = (realSize[0] - SCROLL_CLICK_INCREASED < pos[0] ||
                        realSize[1] - SCROLL_CLICK_INCREASED < pos[1]);

    return mouseInScrollbar;
};

/**
 * MouseDown event handler
 * @param {MouseEvent} mouseDownEvent - mouse down event
 */
AutoScroll.prototype._onMouseDown = function(mouseDownEvent) {
    // only primary button can start drag.
    if (domevent.getMouseButton(mouseDownEvent) !== 0) {
        return;
    }

    // deactivate autoscroll feature when mouse is on the scrollbar. (IE)
    if (util.browser.msie && this.isOnScrollbar(this.container, mouseDownEvent)) {
        return;
    }

    window.clearInterval(this._intervalID);
    this._intervalID = window.setInterval(util.bind(this._onTick, this), SCROLL_INTERVAL);

    domevent.on(global, {
        'mousemove': this._onMouseMove,
        'mouseup': this._onMouseUp
    }, this);
};

/**
 * MouseMove event handler
 * @param {MouseEvent} mouseEvent - mouse move event object.
 */
AutoScroll.prototype._onMouseMove = function(mouseEvent) {
    var edge = this._getEdgePositions(this.container.getBoundingClientRect()),
        pos = Point.n(domevent.getMousePosition(mouseEvent));

    if (pos.y >= edge.top && pos.y <= edge.bottom &&
        pos.x >= edge.left && pos.x <= edge.right) {
        this._direction = AutoScroll.DIRECTION.INSIDE;

        return;
    }

    if (pos.y < edge.top) {
        this._direction = AutoScroll.DIRECTION.TOP;
        this._offset = edge.top - pos.y;

        return;
    }

    if (pos.y > edge.bottom) {
        this._direction = AutoScroll.DIRECTION.BOTTOM;
        this._offset = pos.y - edge.bottom;

        return;
    }

    if (pos.x < edge.left) {
        this._direction = AutoScroll.DIRECTION.LEFT;
        this._offset = edge.left - pos.x;

        return;
    }

    this._direction = AutoScroll.DIRECTION.RIGHT;
    this._offset = pos.x - edge.right;
};

/**
 * MouseUp event handler.
 */
AutoScroll.prototype._onMouseUp = function() {
    window.clearInterval(this._intervalID);
    this._intervalID = 0;
    this._direction = AutoScroll.DIRECTION.INSIDE;
    this._offset = 0;

    domevent.off(global, {
        'mousemove': this._onMouseMove,
        'mouseup': this._onMouseUp
    }, this);
};

/**
 * Interval tick event handler
 */
AutoScroll.prototype._onTick = function() {
    var direction = this._direction,
        container,
        factor;

    if (!direction) {
        return;
    }

    container = this.container;
    factor = Math.min(this._offset, SCROLL_MAX);

    switch (direction) {
        case AutoScroll.DIRECTION.TOP:
            container.scrollTop -= factor;
            break;
        case AutoScroll.DIRECTION.RIGHT:
            container.scrollLeft += factor;
            break;
        case AutoScroll.DIRECTION.BOTTOM:
            container.scrollTop += factor;
            break;
        default:
            container.scrollLeft -= factor;
            break;
    }
};

module.exports = AutoScroll;
