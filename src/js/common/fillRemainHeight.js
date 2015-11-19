/**
 * @fileoverview Module for specific element's height set to remain height of container element.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var domutil = require('../common/domutil');

/**
 * @constructor
 * @param {HTMLElement[]} elements - element list to managing height
 * @param {HTMLElement} container - wrapping container element
 */
function FillRemainHeight(elements, container) {
    if (!(this instanceof FillRemainHeight)) {
        return new FillRemainHeight(elements, container);
    }

    /**
     * @type {number}
     */
    this._idx = 0;

    /**
     * @type {object}
     */
    this._listed = {};

    /**
     * @type {HTMLElement}
     */
    this._container = container;

    util.forEach(elements, function(element) {
        this.addElement(element);
    }, this);
}

/**
 * Destroy method
 */
FillRemainHeight.prototype.destroy = function() {
    this._idx = this._listed = this._container = null;
};

/**
 * @param {HTMLElement} element - element to set height px
 * @param {number} height - pixel height value
 * @private
 */
FillRemainHeight.prototype._setHeight = function(element, height) {
    element.style.height = height + 'px';
};

FillRemainHeight.prototype._getHeight = function(element) {
    return element.offsetHeight;
};

/**
 * Add managed element
 * @param {HTMLElement} element - element to managing height
 */
FillRemainHeight.prototype.addElement = function(element) {
    var id = this._idx;

    domutil.setData(element, 'elid', id);

    this._listed[id] = element;
    this._idx += 1;
};

/**
 * Remove managed element
 * @param {HTMLElement} element - element to remove
 */
FillRemainHeight.prototype.removeElement = function(element) {
    var id = domutil.getData(element, 'elid');

    domutil.setData(element, 'elid', '');

    delete this._listed[id];
};

/**
 * Get height of element that not listed in this module
 * @param {object} listed - this._listed property
 * @param {HTMLElement} element - element to calculate height
 * @returns {number} height
 */
FillRemainHeight.prototype._getOtherElementHeight = function(listed, element) {
    var id;

    if (element.nodeName === '#text') {
        return 0;
    }

    id = domutil.getData(element, 'elid');

    if (listed[id]) {
        return 0;
    }

    return this._getHeight(element);
};

/**
 * calculate rest height of container and set it to listed elements.
 */
FillRemainHeight.prototype.refresh = function() {
    var container = this._container,
        containerHeight = domutil.getSize(container)[1],
        childs = container.childNodes,
        i = 0, len = childs.length,
        listed = this._listed,
        usedHeight = 0,
        height;

    for (; i < len; i += 1) {
        usedHeight += this._getOtherElementHeight(listed, childs[i]);
    }

    height = (containerHeight - usedHeight) / util.keys(listed).length;
    util.forEach(listed, function(element) {
        this._setHeight(element, height);
    }, this);
};

module.exports = FillRemainHeight;

