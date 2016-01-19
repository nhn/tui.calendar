/**
 * @fileoverview Floating layer for displaying event in specific date
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config'),
    domevent = require('../../common/domevent'),
    domutil = require('../../common/domutil'),
    View = require('../../view/view'),
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

More.prototype._onClick = function(clickEvent) {
    var target = (clickEvent.target || clickEvent.srcElement),
        moreLayer = domutil.closest(target, config.classname('.month-more'));

    if (moreLayer) {
        return;
    }

    this.hide();
};

/**
 * @override
 */
More.prototype.destroy = function() {
    this.layer.destroy();
    this.layer = null;
    domevent.off(document.body, 'mousedown', this._onClick, this);
    View.prototype.destroy.call(this);
};

/**
 * @override
 * @param {object} viewModel - view model from factory/monthView
 */
More.prototype.render = function(viewModel) {
    var self = this,
        layer = self.layer;

    layer.setSize('auto', viewModel.height);
    layer.setPosition(viewModel.left, viewModel.top);
    layer.setContent(tmpl(viewModel));

    layer.show();

    util.debounce(function() {
        domevent.on(document.body, 'mousedown', self._onClick, self);
    })();
};

/**
 * Hide layer
 */
More.prototype.hide = function() {
    this.layer.hide();
    domevent.off(document.body, 'mousedown', this._onClick, this);
};

module.exports = More;

