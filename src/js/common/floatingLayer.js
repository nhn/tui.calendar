/**
 * @fileoverview Floating layer module
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../config'),
    domutil = require('../common/domutil'),
    View = require('../view/view');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for floating layer module
 * @param {HTMLElement} container - parent continer for floating layer
 */
function FloatingLayer(options, container) {
    var sibling = container[FloatingLayer.PROP_KEY],
        layerContainer;

    if (!sibling) {
        sibling = container[FloatingLayer.PROP_KEY] = [];
    }

    sibling.push(this);

    /**
     * @type {Collection}
     */
    this.sibling = sibling;

    /**
     * @type {number}
     */
    this.zIndex = this.getLargestZIndex() || FloatingLayer.INIT_ZINDEX;

    layerContainer = document.createElement('div');
    layerContainer.style.display = 'none';
    layerContainer.style.position = 'absolute';
    domutil.addClass(layerContainer, config.classname('floating-layer'));
    container.appendChild(layerContainer);

    View.call(this, layerContainer);

    /**
     * @type {HTMLElement}
     */
    this.parent = container;
}

util.inherit(FloatingLayer, View);

/**
 * @const
 */
FloatingLayer.PROP_KEY = '__fe_floating_layer';

/**
 * @const
 */
FloatingLayer.INIT_ZINDEX = 999;

/**
 * Destroy floating layer instance. if there no instnace in parent container
 *
 * remove instance cache property in container element
 */
FloatingLayer.prototype.destroy = function() {
    var parent = this.parent,
        sibling = this.sibling,
        i = 0, cnt = sibling.length;

    for (; i < cnt; i += 1) {
        if (sibling[i] === this) {
            sibling.splice(i, 1);
            break;
        }
    }

    if (!sibling.length) {
        try {
            delete parent[FloatingLayer.PROP_KEY];
        } catch (e) {
            parent[FloatingLayer.PROP_KEY] = null;
        }

        parent.style.position = '';
    }

    domutil.remove(this.container);

    this.sibling = null;

    View.prototype.destroy.call(this);
};

/**
 * @returns {boolean} whether layer is visible?
 */
FloatingLayer.prototype.isVisible = function() {
    return this.container.style.display !== 'none';
};

/**
 * Set layer position
 * @param {number} x - x coordinate of layer
 * @param {number} y - y coordinate of layer
 */
FloatingLayer.prototype.setPosition = function(x, y) {
    domutil.setPosition(this.container, x, y);
};

/**
 * Set layer left, top, right, bottom position
 * @param {object} ltrb object of left, top, right, bottom
 * @param {number} [ltrb.left] left pixel value.
 * @param {number} [ltrb.top] top pixel value.
 * @param {number} [ltrb.right] right pixel value.
 * @param {number} [ltrb.bottom] bottom pixel value.
 */
FloatingLayer.prototype.setLTRB = function(ltrb) {
    domutil.setLTRB(this.container, ltrb);
};

/**
 * Set layer size
 * @param {number|string} w - layer width
 * @param {number|string} h - layer height
 */
FloatingLayer.prototype.setSize = function(w, h) {
    var container = this.container;

    w = util.isNumber(w) ? w + 'px' : w;
    h = util.isNumber(h) ? h + 'px' : h;

    container.style.width = w;
    container.style.height = h;
};

/**
 * Set layer content
 * @param {string} html - html string
 */
FloatingLayer.prototype.setContent = function(html) {
    this.container.innerHTML = html;
};

/**
 * Get largest z-index from sibling layers
 * @returns {number} largest z-index value
 */
FloatingLayer.prototype.getLargestZIndex = function() {
    var zIndexes = util.map(this.sibling, function(layer) {
        return layer.zIndex;
    });

    return Math.max.apply(null, zIndexes);
};

/**
 * Set focus to layer
 */
FloatingLayer.prototype.focus = function() {
    var zIndexForShow = this.getLargestZIndex() + 1;
    this.container.style.zIndex = this.zIndex = zIndexForShow;
};

/**
 * Show layer
 */
FloatingLayer.prototype.show = function() {
    this.focus();
    this.container.style.display = 'block';
};

/**
 * Hide layer
 */
FloatingLayer.prototype.hide = function() {
    this.container.style.display = 'none';
};

module.exports = FloatingLayer;
