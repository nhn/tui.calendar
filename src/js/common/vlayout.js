/**
 * @fileoverview Layout module that supplied split height, resize height features.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    mAbs = Math.abs;

var config = require('../config'),
    common = require('./common'),
    domutil = require('./domutil'),
    domevent = require('./domevent'),
    LinkedList = require('./linkedlist'),
    View = require('../view/view'),
    VPanel = require('./vpanel'),
    Drag = require('../handler/drag');

/**
 * @typedef PanelOptions
 * @type {object}
 * @property {number} [minHeight=0] - minimum height of panel
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
     * @type {LinkedList}
     */
    this._panels = new LinkedList();

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

    if (this.options.panels.length) {
        this.addPanels(this.options.panels, this.container);
    }

    this.refresh();
}

util.inherit(VLayout, View);

/**
 * Initialize resizing guide element
 * @param {HTMLElement} element - element to use guide element after cloned
 * @param {number} top - top pixel value for guide element
 * @returns {HTMLElement} cloned element == guide element
 */
VLayout.prototype._initializeGuideElement = function(element, top) {
    var cloned = element.cloneNode(true);

    domutil.addClass(cloned, config.classname('splitter-guide'));
    this._refreshGuideElement(cloned, top);
    this.container.appendChild(cloned);

    return cloned;
};

/**
 * Refresh guide element position
 * @param {HTMLElement} element - guide element
 * @param {number} top - top pixel value for guide element
 */
VLayout.prototype._refreshGuideElement = function(element, top) {
    element.style.top = top + 'px';
};

/**
 * Clear guide element position
 * @param {HTMLElement} element - guide element
 */
VLayout.prototype._clearGuideElement = function(element) {
    domutil.remove(element);
};

/**
 * Resize overall panels size
 * @param {LinkedListItem} splItem - linkedlist item with splitter panel
 * @param {number} startY - dragstart Y position
 * @param {number} mouseY - dragend Y position
 */
VLayout.prototype._resize = function(splItem, startY, mouseY) {
    var diffY = startY - mouseY,
        resizedHeight = mAbs(diffY),
        resizeMap = [],
        toDown = mouseY > startY,
        traverseMethod = ['prev', 'next'],
        cursor = splItem[traverseMethod[+!toDown]](), 
        panel, resizeInfo;

    panel = cursor.data;
    resizeInfo = panel.getResizeInfoByGrowth(+resizedHeight);
    resizeMap.push([panel, resizeInfo[0]]);

    while (cursor = cursor[traverseMethod[+toDown]]()) {
        panel = cursor.data;
        
        if (panel.isSplitter()) {
            continue;
        }

        resizeInfo = panel.getResizeInfoByGrowth(-resizedHeight);
        resizeMap.push([panel, resizeInfo[0]]);
        resizedHeight -= resizeInfo[1];

        if (resizedHeight < 0) {
            break;
        }
    }

    util.forEach(resizeMap, function(pair) {
        pair[0].setHeight(null, pair[1]);
    });
};

/**
 * Get summation of splitter and panel's minimum height upper and below of supplied splitter
 * @param {LinkedListItem} splItem - linkedlist item with splitter
 * @returns {number[]} upper and below splitter's height and panel minimum height summation.
 */
VLayout.prototype._getMouseYAdditionalLimit = function(splItem) {
    var upper = 0,
        below = 0,
        cursor = splItem,
        func = function(panel) {
            if (panel.isSplitter()) {
                return panel.getHeight();
            }

            return panel.options.minHeight;
        };

    while (cursor = cursor.prev()) {
        upper += func(cursor.data);
    }

    cursor = splItem;

    while (cursor = cursor.next()) {
        below += func(cursor.data);
    }

    return [upper, below];
};

/**********
 * Drag Handlers
 **********/

/**
 * Drag start event handler
 * @param {object} e - drag start event data
 */
VLayout.prototype._onDragStart = function(e) {
    var oEvent = e.originEvent,
        target = e.target,
        splID = domutil.getData(target, 'pnid'),
        splItem = this._panels.get(splID),
        splPanel = util.pick(splItem, 'data'),
        splHeight = splPanel.getHeight(),
        splOffsetY = domevent.getMousePosition(oEvent, target)[1],
        mouseY = domevent.getMousePosition(oEvent, this.container)[1],
        guideElement = this._initializeGuideElement(target, mouseY);
        
    splPanel.addClass(config.classname('splitter-focused'));

    this._dragData = {
        splItem: splItem,
        splOffsetY: splOffsetY,
        guideElement: guideElement,
        startY: mouseY - splOffsetY,
        minY: 0,
        maxY: this.getViewBound().height - splHeight
    };

    if (!util.browser.msie) {
        domutil.addClass(document.body, config.classname('resizing'));
    }
};

/**
 * Drag event handler
 * @param {object} e - drag event data
 */
VLayout.prototype._onDrag = function(e) {
    var dragData = this._dragData,
        mouseY = domevent.getMousePosition(e.originEvent, this.container)[1];

    mouseY = common.limit(mouseY - dragData.splOffsetY, [dragData.minY], [dragData.maxY]);

    this._refreshGuideElement(dragData.guideElement, mouseY);
};

/**
 * Drag end event handler
 * @param {object} e - dragend event data
 */
VLayout.prototype._onDragEnd = function(e) {
    var dragData = this._dragData,
        asideMinMax = this._getMouseYAdditionalLimit(dragData.splItem),
        mouseY = domevent.getMousePosition(e.originEvent, this.container)[1];

    // mouseY value can't exceed summation of splitter height and panel's minimum height based on target splitter.
    mouseY = common.limit(mouseY - dragData.splOffsetY, [dragData.minY + asideMinMax[0]], [dragData.maxY - asideMinMax[1]]);

    this._resize(dragData.splItem, dragData.startY, mouseY);

    this._dragData = null;
    this._clearGuideElement(dragData.guideElement);
    dragData.splItem.data.removeClass(config.classname('splitter-focused'));
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

    this._panels.each(function(item) {
        var panel = item.data;

        if (panel.options.autoHeight) {
            panelToFillHeight.push(panel);
        } else {
            usedHeight += panel.getHeight();
        }
    });

    remainHeight = (this.getViewBound().height - usedHeight) / panelToFillHeight.length;

    util.forEach(panelToFillHeight, function(panel) {
        panel.setHeight(null, remainHeight);
    });
};

/**
 * add panel
 * @param {PanelOptions} options - options for panel
 * @param {container} [container] - container element
 */
VLayout.prototype.addPanel = function(options, container) {
    var element = document.createElement('div'),
        panel = new VPanel(options, element),

    container = container || this.container;

    panel = this._panels.add(panel);
    domutil.setData(element, 'pnid', panel.id);

    container.appendChild(element);
};

/**
 * Add multiple panel
 * @param {PanelOptions[]} options - panel options list
 * @param {HTMLElement} container - container element
 */
VLayout.prototype.addPanels = function(options, container) {
    var frag = document.createDocumentFragment();

    util.forEach(options, function(option) {
        this.addPanel(option, frag);
    }, this);

    container.appendChild(frag);
};

module.exports = VLayout;

