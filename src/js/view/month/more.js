/**
 * @fileoverview Floating layer for displaying event in specific date
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var View = require('../../view/view'),
    FloatingLayer = require('../../common/floatingLayer'),
    tmpl = require('./more.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {HTMLElement} container = container element
 */
function More(container) {
    View.call(this, container);

    /**
     * @type {FloatingLayer}
     */
    this.layer = new FloatingLayer(null, container);
}

util.inherit(More, View);

/**
 * @override
 */
More.prototype.destroy = function() {
    this.layer.destroy();
    this.layer = null;
    View.prototype.destroy.call(this);
};

/**
 * @override
 * @param {object} viewModel - view model from factory/monthView
 */
More.prototype.render = function(viewModel) {
    var layer = this.layer;

    layer.setSize('auto', viewModel.height);
    layer.setPosition(viewModel.left, viewModel.top);
    layer.setContent(tmpl(viewModel));

    layer.show();
};

/**
 * Hide layer
 */
More.prototype.hide = function() {
    this.layer.hide();
};

module.exports = More;

