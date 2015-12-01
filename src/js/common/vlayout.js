/**
 * @fileoverview Layout module that supplied split height, resize height features.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../config'),
    array = require('./array'),
    common = require('./common'),
    domutil = require('./domutil'),
    domevent = require('./domevent'),
    reqAnimFrame = require('./reqAnimFrame'),
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

VLayout.prototype._getHeightOfAsideSplitter = function(splitter) {
    var unitHeight = splitter.getHeight(),
        splitterIndex = this._indexOf(splitter.container),
        before = 0,
        after = 0;

    util.forEach(this._panels, function(panel, index) {
        if (splitterIndex === index || !panel.options.isSplitter) {
            return;
        }

        if (index < splitterIndex) {
            before += unitHeight;
        } else {
            after += unitHeight;
        }
    });

    return [before, after];
};

VLayout.prototype._resize = function(splitter, splitterIndex, startY, mouseY) {
    var panels = this._panels,
        sumHeight = 0,
        sizeMap = [],
        diffY = mouseY - startY,
        absDiffY = Math.abs(diffY),
        toDown = diffY > 0,
        startIndexY, mouseIndexY, temp,
        resizeRange,
        resizeMap = {},
        firstIndex, first,
        lastIndex, last,
        asideSplitterHeight;

    asideSplitterHeight = this._getHeightOfAsideSplitter(splitter);

    util.forEach(panels, function(panel) {
        sumHeight += panel.getHeight();
        sizeMap.push(sumHeight);
    });

    startIndexY = Math.abs(array.bsearch(sizeMap, startY, null, array.compare.num.asc));
    mouseIndexY = Math.abs(array.bsearch(sizeMap, mouseY + 4, null, array.compare.num.asc));
    
    if (!toDown) {
        temp = startIndexY;
        startIndexY = mouseIndexY;
        mouseIndexY = (temp + 2);
    }

    if (panels[startIndexY].options.isSplitter) {
        startIndexY -= (toDown ? -1 : 1);
    }

    startIndexY = common.limit(startIndexY, [0], [panels.length - 1]);
    mouseIndexY = common.limit(mouseIndexY, [0], [panels.length - 1]);

    resizeRange = util.range(startIndexY, mouseIndexY + 1, 2);

    if (!toDown) {
        resizeRange.reverse();
    }

    firstIndex = resizeRange.shift();
    first = panels[firstIndex];
    resizeMap[firstIndex] = first.getHeight() + absDiffY;

    lastIndex = resizeRange.pop();
    last = panels[lastIndex];

    util.forEach(resizeRange, function(index) {
        var panel = panels[index],
            panelHeight = panel.getHeight();

        absDiffY -= panelHeight;

        resizeMap[index] = 0;
    });

    resizeMap[lastIndex] = Math.max(0, last.getHeight() - absDiffY);

    if (!resizeMap[lastIndex]) {
        resizeMap[firstIndex] -= toDown ? asideSplitterHeight[1] : asideSplitterHeight[0];
    }

    reqAnimFrame.requestAnimFrame(function() {
        util.forEach(resizeMap, function(height, index) {
            panels[index].setHeight(null, height);
        });
    });
};

/**********
 * Drag Handlers
 **********/

VLayout.prototype._onDragStart = function(e) {
    var splitterIndex = this._indexOf(e.target),
        splitter = this._panels[splitterIndex],
        splitterHeight = splitter.getHeight(),
        splitterOffsetY = domevent.getMousePosition(e.originEvent, e.target)[1],
        mouseY = domevent.getMousePosition(e.originEvent, this.container)[1],
        guideElement = this._initializeGuideElement(e.target, mouseY);
    
    splitter.addClass(config.classname('splitter-focused'));

    this._dragData = {
        splitterIndex: splitterIndex,
        splitter: splitter,
        guideElement: guideElement,
        startY: mouseY - splitterOffsetY,
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

VLayout.prototype._onDragEnd = function(e) {
    var dragData = this._dragData,
        mouseY = domevent.getMousePosition(e.originEvent, this.container)[1];

    mouseY = common.limit(mouseY, [dragData.minY], [dragData.maxY]);
    this._resize(dragData.splitter, dragData.splitterIndex, dragData.startY, mouseY);

    this._dragData = null;
    this._clearGuideElement(dragData.guideElement);
    dragData.splitter.removeClass(config.classname('splitter-focused'));
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

