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

    domevent.on(container, 'click', this._onClick, this);
}

util.inherit(More, View);

/**
 * Click event handler for close button
 * @param {MouseEvent} clickEvent - mouse event object
 */
More.prototype._onClick = function(clickEvent) {
    var target = (clickEvent.target || clickEvent.srcElement);

    if (!domutil.hasClass(target, config.classname('month-more-close'))) {
        return;
    }

    this.hide();
};

/**
 * Mousedown event handler for hiding more layer when user mousedown outside of
 * layer
 * @param {MouseEvent} mouseDownEvent - mouse event object
 */
More.prototype._onMouseDown = function(mouseDownEvent) {
    var target = (mouseDownEvent.target || mouseDownEvent.srcElement),
        moreLayer = domutil.closest(target, config.classname('.month-more'));

    if (moreLayer) {
        return;
    }

    this.hide();
};

/**
 * Get new position for more layer by +n element itself
 * @param {HTMLElement} target - +n element
 * @returns {number[]} new position of more layer
 */
More.prototype._getRenderPosition = function(target) {
    var pos = domutil.getPosition(target);

    // change position relative with More container element
    pos = domevent.getMousePosition({
        clientX: pos[0],
        clientY: pos[1]
    }, this.container);

    return [pos[0], pos[1] - 100];
};

/**
 * @override
 */
More.prototype.destroy = function() {
    this.layer.destroy();
    this.layer = null;
    domevent.off(this.container, 'click', this._onClick, this);
    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
    View.prototype.destroy.call(this);
};


/**
 * @override
 * @param {object} viewModel - view model from factory/monthView
 */
More.prototype.render = function(viewModel) {
    var self = this,
        layer = this.layer,
        pos;

    viewModel = util.extend({
        height: 100
    }, viewModel);

    layer.setContent(tmpl(viewModel));
    layer.setSize('auto', 100);

    pos = this._getRenderPosition(viewModel.target);
    layer.setPosition.apply(layer, pos);

    layer.show();

    util.debounce(function() {
        domevent.on(document.body, 'mousedown', self._onMouseDown, self);
    })();
};

/**
 * Hide layer
 */
More.prototype.hide = function() {
    this.layer.hide();
    domevent.off(document.body, 'mousedown', this._onMouseDown, this);
};

module.exports = More;

