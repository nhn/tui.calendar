/**
 * @fileoverview Layout view. wrap all view containers at outside.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');
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
 * @param {(string|View)} viewName - name of view or instance.
 */
Layout.prototype.removeChild = function(viewName) {
    this.childs.remove(viewName);
};

/**
 * Toggle child views.
 * @param {string} viewName - Name of view.
 */
Layout.prototype.toggleChildView = function(viewName) {
    var container,
        prefix = ['add', 'remove'],
        flag;

    this.childs.each(function(childView) {
        container = childView.container;
        flag = +(childView.viewName === viewName);
        domutil[prefix[flag] + 'Class'](container, 'view-hidden');
    });
};

module.exports = Layout;

