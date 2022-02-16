/**
 * @fileoverview Layout view. wrap all view containers at outside.
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../config');
var domutil = require('../common/domutil');
var Collection = require('../common/collection');
var View = require('./view');

/**
 * Layout view for toggle each child view. It will controlled via navigation UI.
 * @constructor
 * @extends {View}
 * @param {HTMLElement} container Container element to use layout view.
 * @param {Theme} theme - theme instance
 */
function Layout(container, theme) {
    container = domutil.appendHTMLElement('div', container, config.classname('layout'));

    View.call(this, container);

    /**
     * @type {Collection} Child view collection.
     */
    this.children = new Collection(function(childView) {
        return childView.viewName;
    });

    /**
     * @type {Theme}
     */
    this.theme = theme;

    this.applyTheme();
}

util.inherit(Layout, View);

/**
 * Clear child views.
 */
Layout.prototype.clear = function() {
    this.children.each(function(childView) {
        childView.destroy();
    });

    this.children.clear();
    this.container.innerHTML = '';
};

/**
 * Remove child view.
 * @override
 * @param {(string|View)} viewName - name of view or instance.
 */
Layout.prototype.removeChild = function(viewName) {
    this.children.remove(viewName);
};

/**
 * Toggle child views.
 * @param {string} viewName - Name of view.
 */
Layout.prototype.toggleChildView = function(viewName) {
    var container,
        prefix = ['add', 'remove'],
        flag;

    this.children.each(function(childView) {
        container = childView.container;
        flag = Number(childView.viewName === viewName);
        domutil[prefix[flag] + 'Class'](container, config.classname('hidden'));
    });
};

Layout.prototype.applyTheme = function() {
    var style = this.container.style;
    var theme = this.theme.common;

    // background color
    style.backgroundColor = theme.backgroundColor;
};

module.exports = Layout;
