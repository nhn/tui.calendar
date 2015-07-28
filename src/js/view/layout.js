/**
 * @fileoverview Layout view. wrap all view containers at outside.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var Collection = require('../common/collection');
var View = require('./view');

/**
 * Layout view for toggle each child view. It will controlled via navigation UI.
 * @constructor
 * @extends {View}
 * @param {HTMLElement} container Container element to use layout view.
 */
function Layout(container) {
    /*eslint-disable*/
    /**
     * @type {Collection} Child view collection.
     */
    this.childs = new Collection(function(childView) {
        return childView.viewName;
    });
    /*eslint-enable*/

    /**
     * @type {HTMLElement}
     */
    this.container = container;
}

util.inherit(Layout, View);

/**
 * Add an view object by creation function **(adderFunc)**.
 *
 * Invocations of adderFunc is called with layout view's container.
 *
 * As result of adderFunc. added it to layout view's childs.
 * @override
 * @param {function} adderFunc The adder function.
 * @returns {View} View instance added.
 */
Layout.prototype.addChild = function(adderFunc) {
    var childView = adderFunc(this.container);
    this.childs.add(childView);
    return childView;
};

/**
 * Remove child view.
 * @override
 * @param {string} name Name of view.
 */
Layout.prototype.removeChild = function(name) {
    this.childs.remove(name);
};

Layout.prototype.toggleChildView = function(name, onOff) {};

module.exports = Layout;

