/**
 * @fileoverview Layout module that supplied split height, resize height features.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../config'),
    domutil = require('./domutil'),
    View = require('../view/view'),
    VPanel = require('./vpanel'),
    Drag = require('../handler/drag');

/**
 * @typedef PanelOptions
 * @type {object}
 * @property {number} [minHeight=0] - minimum height of panel
 * @property {number} [maxHeight] - maximum height of panel. default is container height.
 * @property {number} [height=0] - current panel height
 * @property {boolean} [splitter=false] - is this panel uses splitter?
 * @property {boolean} [autoHeight=false] - is this panel uses remain height of container?
 * @property {string} [className=''] - className string for add created element
 */

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for VLayout module
 *  @param {PanelOptions[]} [options.panels] - panels to add layout when initialize
 * @param {HTMLElement} container - container element
 */
function VLayout(options, container) {
    var frag;

    if (!(this instanceof VLayout)) {
        return new VLayout(options, container);
    }

    View.call(this, container);
    
    /**
     * @type {object}
     */
    this.options = util.extend({
        panels: []
    }, options);

    /**
     * @type {VPanel[]}
     */
    this._panels = [];

    /**
     * @type {Drag}
     */
    this._drag = new Drag({
        distance: 0,
        exclude: function(target) {
            return !domutil.hasClass(target, config.classname('splitter'));
        }
    }, container);

    if (options.panels.length) {
        frag = document.createDocumentFragment();

        util.forEach(options.panels, function(panelOptions) {
            this.addPanel(panelOptions, frag);
        }, this);

        this.container.appendChild(frag);
    }

    this.refresh();
}

util.inherit(VLayout, View);

/**
 * refresh each panels
 */
VLayout.prototype.refresh = function() {
    var panelToFillHeight = [],
        usedHeight = 0,
        remainHeight;

    util.forEach(this._panels, function(vPanel) {
        var element = vPanel.container;

        if (domutil.getData(element, 'autoHeight')) {
            panelToFillHeight.push(vPanel);
        } else {
            usedHeight += vPanel.getHeight();
        }
    });

    remainHeight = (this.getViewBound().height - usedHeight) / panelToFillHeight.length;

    util.forEach(panelToFillHeight, function(vPanel) {
        vPanel.setHeight(null, remainHeight);
    });
};

/**
 * add panel
 * @param {PanelOptions} options - options for panel
 * @param {container} container - container element
 */
VLayout.prototype.addPanel = function(options, container) {
    var element = document.createElement('div'),
        vPanel = new VPanel(options, element);

    this._panels.push(vPanel);

    container.appendChild(element);
};

module.exports = VLayout;

