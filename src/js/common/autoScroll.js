/**
 * @fileoverview Add autoscroll feature to elements that prevented text selection.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domevent = require('../common/domevent');
var Point = require('../common/point');

var SCROLL_INTERVAL = 30;
var SCROLL_MAX = 15;

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
 * MouseDown event handler
 */
AutoScroll.prototype._onMouseDown = function() {
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
    return;
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

