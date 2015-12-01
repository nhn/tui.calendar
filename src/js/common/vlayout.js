/**
 * @fileoverview Layout module that supplied split height, resize height features.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../config'),
    common = require('./common'),
    domutil = require('./domutil'),
    domevent = require('./domevent'),
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

    domutil.addClass(container, config.classname('vlayout-container'));
    
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

    this._drag.on({
        dragStart: this._onDragStart,
        drag: this._onDrag,
        dragEnd: this._onDragEnd
    }, this);

    /**
     * @type {object}
     */
    this._dragData = null;

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
 * find index of specific panel that use container to supplied element 
 * @param {HTMLElement} element - html element to find panel
 * @returns {number} index of panel
 */
VLayout.prototype._indexOf = function(element) {
    var index = -1;

    util.forEach(this._panels, function(vPanel, i) {
        if (element === vPanel.container) {
            index = i;
            return false;
        }
    });
    
    return index;
};

VLayout.prototype._initializeGuideElement = function(element, top) {
    var cloned = element.cloneNode(true);

    domutil.addClass(cloned, config.classname('splitter-guide'));
    this._refreshGuideElement(cloned, top);

    this.container.appendChild(cloned);

    return cloned;
};

VLayout.prototype._refreshGuideElement = function(element, top) {
    element.style.top = top + 'px';
};

VLayout.prototype._clearGuideElement = function(element) {
    domutil.remove(element);
};

/**********
 * Drag Handlers
 **********/

VLayout.prototype._onDragStart = function(e) {
    var splitter = this._panels[this._indexOf(e.target)],
        splitterHeight = splitter.getHeight(),
        mouseY = domevent.getMousePosition(e.originEvent, this.container)[1],
        guideElement = this._initializeGuideElement(e.target, mouseY);

    splitter.addClass(config.classname('splitter-focused'));

    this._dragData = {
        splitter: splitter,
        guideElement: guideElement,
        minY: 0,
        maxY: this.getViewBound().height - splitterHeight
    };

    if (!util.browser.msie) {
        domutil.addClass(document.body, config.classname('resizing'));
    }
};

VLayout.prototype._onDrag = function(e) {
    var dragData = this._dragData,
        mouseY = domevent.getMousePosition(e.originEvent, this.container)[1];

    mouseY = common.limit(mouseY, [dragData.minY], [dragData.maxY]);

    this._refreshGuideElement(dragData.guideElement, mouseY);
};

VLayout.prototype._onDragEnd = function() {
    var dragData = this._dragData;

    dragData.splitter.removeClass(config.classname('splitter-focused'));
    this._clearGuideElement(dragData.guideElement);
    this._dragData = null;

    domutil.removeClass(document.body, config.classname('resizing'));
};

/**********
 * Methods
 **********/

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

