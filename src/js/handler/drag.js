/**
 * @fileoverview Drag handler for calendar.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var domutil = require('../common/domutil');
var domevent = require('../common/domevent');
var config = require('../config');

/**
 * @constructor
 * @mixes CustomEvents
 * @param {object} options - options for drag handler
 * @param {number} [options.distance=10] - distance in pixels after mouse must move before dragging should start
 * @param {function} [options.exclude] - filter function for don't fire drag events that specific conditions.
 * @param {HTMLElement} container element to watching drag interaction.
 */
function Drag(options, container) {
    domevent.on(container, 'mousedown', this._onMouseDown, this);

    this.options = util.extend({
        distance: 10,
        exclude: null
    }, options);

    /**
     * @type {HTMLElement}
     */
    this.container = container;

    /**
     * Flag for represent current dragging session has been cancelled for exclude option.
     * @type {boolean}
     */
    this._cancelled = false;

    /**
     * @type {boolean}
     */
    this._isMoved = false;

    /**
     * dragging distance in pixel between mousedown and firing dragStart events
     * @type {number}
     */
    this._distance = 0;

    /**
     * @type {boolean}
     */
    this._dragStartFired = false;

    /**
     * @type {object}
     */
    this._dragStartEventData = null;
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
 * Clear cache data for single dragging session.
 */
Drag.prototype._clearData = function() {
    this._cancelled = false;
    this._distance = 0;
    this._isMoved = false;
    this._dragStartFired = false;
    this._dragStartEventData = null;
};

/**
 * Toggle events for mouse dragging.
 * @param {boolean} toBind - bind events related with dragging when supplied "true"
 */
Drag.prototype._toggleDragEvent = function(toBind) {
    var container = this.container,
        domMethod,
        method;

    if (toBind) {
        domMethod = 'on';
        method = 'disable';
    } else {
        domMethod = 'off';
        method = 'enable';
    }

    domutil[method + 'TextSelection'](container, preventDefaultWhenNotPopup);
    domutil[method + 'ImageDrag'](container, preventDefaultWhenNotPopup);
    domevent[domMethod](global.document, {
        mousemove: this._onMouseMove,
        mouseup: this._onMouseUp
    }, this);
};

/**
 * Normalize mouse event object.
 * @param {MouseEvent} mouseEvent - mouse event object.
 * @returns {object} normalized mouse event data.
 */
Drag.prototype._getEventData = function(mouseEvent) {
    return {
        target: domevent.getEventTarget(mouseEvent),
        originEvent: mouseEvent
    };
};

/**
 * MouseDown DOM event handler.
 * @param {MouseEvent} mouseDownEvent MouseDown event object.
 */
Drag.prototype._onMouseDown = function(mouseDownEvent) {
    var opt = this.options,
        target = domevent.getEventTarget(mouseDownEvent);

    // only primary button can start drag.
    if (domevent.getMouseButton(mouseDownEvent) !== 0) {
        return;
    }

    if (opt.exclude && opt.exclude(target)) {
        this._cancelled = true;

        return;
    }

    this._clearData();
    this._dragStartEventData = this._getEventData(mouseDownEvent);

    this._toggleDragEvent(true);

    /**
     * mousedown event for firefox bug. cancelable.
     * @event Drag#mouseDown
     * @type {object}
     * @property {HTMLElement} target - target element in this event.
     * @property {MouseEvent} originEvent - original mouse event object.
     */
    this.fire('mousedown', this._dragStartEventData);
};

/**
 * MouseMove DOM event handler.
 * @emits Drag#drag
 * @emits Drag#dragStart
 * @param {MouseEvent} mouseMoveEvent MouseMove event object.
 */
Drag.prototype._onMouseMove = function(mouseMoveEvent) {
    var distance;

    if (this._cancelled) {
        this._clearData();

        return;
    }

    distance = this.options.distance;
    // prevent automatic scrolling.
    preventDefaultWhenNotPopup(mouseMoveEvent);

    if (this._distance < distance) {
        this._distance += 1;

        return;
    }
    this._isMoved = true;

    if (!this._dragStartFired) {
        this._dragStartFired = true;

        /**
         * Drag start events. cancelable.
         * @event Drag#dragStart
         * @type {object}
         * @property {HTMLElement} target - target element in this event.
         * @property {MouseEvent} originEvent - original mouse event object.
         */
        if (!this.invoke('dragStart', this._dragStartEventData)) {
            this._toggleDragEvent(false);
            this._clearData();

            return;
        }
    }

    /**
     * CalEvents while dragging.
     * @event Drag#drag
     * @type {object}
     * @property {HTMLElement} target - target element in this event.
     * @property {MouseEvent} originEvent - original mouse event object.
     */
    this.fire('drag', this._getEventData(mouseMoveEvent));
};

/**
 * MouseUp DOM event handler.
 * @param {MouseEvent} mouseUpEvent MouseUp event object.
 * @emits Drag#dragEnd
 * @emits Drag#click
 */
Drag.prototype._onMouseUp = function(mouseUpEvent) {
    if (this._cancelled) {
        return;
    }

    this._toggleDragEvent(false);

    // emit "click" event when not emitted drag event between mousedown and mouseup.
    if (this._isMoved) {
        this._isMoved = false;
        /**
         * Drag end events.
         * @event Drag#dragEnd
         * @type {MouseEvent}
         * @property {HTMLElement} target - target element in this event.
         * @property {MouseEvent} originEvent - original mouse event object.
         */
        this.fire('dragEnd', this._getEventData(mouseUpEvent));
    } else {
        /**
         * Click events.
         * @event Drag#click
         * @type {MouseEvent}
         * @property {HTMLElement} target - target element in this event.
         * @property {MouseEvent} originEvent - original mouse event object.
         */
        this.fire('click', this._getEventData(mouseUpEvent));
    }

    this._clearData();
};

/**
 * If the target is not a popup, it prevents the default.
 * @method
 * @param {MouseEvent} event - Mouse event object
 */
function preventDefaultWhenNotPopup(event) {
    var popup = domutil.closest(event.target, config.classname('.popup'));

    if (!popup) {
        domevent.preventDefault(event);
    }
}

util.CustomEvents.mixin(Drag);

module.exports = Drag;
