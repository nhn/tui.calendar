/**
 * @fileoverview The base class of views.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');

/**
 * Base class of views.
 *
 * All views create own container element inside supplied container element.
 * @constructor
 * @param {options} options The object for describe view's specs.
 * @param {HTMLElement} container Default container element for view. you can use this element for this.container syntax.
 */
function View(options, container) {
    var id = util.stamp(this);

    options = options || {};

    if (util.isUndefined(container)) {
        container = domutil.appendHTMLElement('div');
    }

    container = domutil.appendHTMLElement('div', container);
    container.setAttribute('id', 'view-' + id);

    /**
     * unique id
     * @type {number}
     */
    this.id = id;

    /**
     * base element of view.
     * @type {HTMLDIVElement}
     */
    this.container = container;
}

module.exports = View;

