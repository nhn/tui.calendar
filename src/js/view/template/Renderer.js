'use strict';

var snabbdom = require('snabbdom');
var moduleClass = require('snabbdom/modules/class');
var moduleProps = require('snabbdom/modules/props');
var moduleStyle = require('snabbdom/modules/style');
var moduleDataset = require('snabbdom/modules/dataset');
var moduleEventListeners = require('snabbdom/modules/eventlisteners');

var toVNode = require('snabbdom/tovnode')['default'];

var domutil = require('../../common/domutil');

// Init patch function with chosen modules
var patch = snabbdom.init([
    moduleClass['default'], // makes it easy to toggle classes
    moduleProps['default'], // for setting properties on DOM elements
    moduleStyle['default'], // handles styling on elements with support for animations
    moduleDataset['default'], // Allows you to set custom data attributes (data-*) on DOM elements
    moduleEventListeners['default'] // attaches event listeners
]);

/**
 * @constructor
 * @param {HTMLElement} container - container
 * @param {function} tmplHbs - template function for handlebars
 * @param {function} tmplJsx - return Vnode from JSX
 * @param {boolean} useHbs - use handlebars
 */
function Renderer(container, tmplHbs, tmplJsx, useHbs) {
    this.parent = container;
    this.container = domutil.appendHTMLElement('div', container);
    this.vnode = useHbs ? null : toVNode(this.container);
    this.tmplHbs = tmplHbs;
    this.tmplJsx = tmplJsx;
    this.useHbs = useHbs;
}

Renderer.prototype.draw = function() {
    if (this.useHbs) {
        this._drawHbs.apply(this, arguments);
    } else {
        this._drawJsx.apply(this, arguments);
    }
};

Renderer.prototype._drawHbs = function() {
    // Using Handlebars
    this.container.innerHTML = this.tmplHbs.apply(this, arguments);
};

Renderer.prototype._drawJsx = function() {
    var newVnode = this.tmplJsx.apply(this, arguments);

    // Using snabbdom
    this.vnode = patch(this.vnode, newVnode);
};

module.exports = Renderer;
