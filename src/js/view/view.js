/**
 * @fileoverview The base class of views.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;

/**
 * @constructor
 * @param {options} options The object for describe view's specs.
 * @param {HTMLElement} container Default container element for view. you can use this element for this.container syntax.
 */
function View(options, container) {
    options = options || {};

    if (util.isString(container)) {
        container = global.document.getElementById(container);
    }

    if (!container) {
        throw new Error('View(): need container element.');
    }

    this.container = container;
}

module.exports = View;

