/**
 * @fileoverview Layout module that supplied split height, resize height features.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util,
    mAbs = Math.abs;

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
        if (splitterIndex === index || !panel.isSplitter()) {
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

VLayout.prototype._getPanelIncreaseHeights = function(panels) {
    var increase = 0,
        panelSizeMap = [];

    util.forEach(panels, function(panel) {
        increase += panel.getHeight();
        panelSizeMap.push(increase);
    });

    return panelSizeMap;
};

VLayout.prototype._extendIndexUntilNoSplitter = function(index, toDown, skip) {
    var panels = this._panels,
        panel,
        isValidIndex = function(i) {
            return i >= 0 && i < panels.length;
        },
        factor = toDown ? 1 : -1,
        result = index + (skip || 0);

    if (!isValidIndex(index)) {
        return;
    }

    if (!panels[result].isSplitter()) {
        return result;
    }

    do {
        result += factor;
        panel = panels[result];
    } while (isValidIndex(result) && panel.isSplitter());

    return common.limit(result, [0], [panels.length]);
}

VLayout.prototype._correctBinarySearch = function(arr, value, index) {
    var increase = 0;

    util.forEach(arr, function(v, i) {
        if (i > index) {
            return false;
        }

        if (value === v) {
            increase += 1;
        }
    });

    return increase;
}

VLayout.prototype._getPanelResizeRange = function(panelSizeMap, startY, mouseY) {
    var panelCount = panelSizeMap.length,
        numberASC = array.compare.num.asc,
        fromIndexY, toIndexY;

    fromIndexY = mAbs(array.bsearch(panelSizeMap, startY, null, numberASC));
    fromIndexY += this._correctBinarySearch(panelSizeMap, startY, fromIndexY);
    toIndexY = mAbs(array.bsearch(panelSizeMap, mouseY, null, numberASC));

    fromIndexY = this._extendIndexUntilNoSplitter(fromIndexY, false);
    toIndexY = this._extendIndexUntilNoSplitter(toIndexY, true);

    // binary search just find supplied position's new index. because of that, 
    // from index is smaller then index of panel to increase height when dragging to upper side.
    // so, increase from index directly.
    if (mouseY < startY) {
        fromIndexY = this._extendIndexUntilNoSplitter(fromIndexY + 1, true);
    }

    fromIndexY = common.limit(fromIndexY, [0], [panelCount]);
    toIndexY = common.limit(toIndexY, [0], [panelCount]);

    return [fromIndexY, toIndexY].sort(numberASC);
};

VLayout.prototype._resize = function(splitter, startY, mouseY) {
    var panels = this._panels,
        toDown = mouseY > startY,
        resizedHeight = Math.abs(mouseY - startY),
        newPanelHeightMap = {},
        asideSplitHeight = this._getHeightOfAsideSplitter(splitter),
        panelSizeMap = this._getPanelIncreaseHeights(panels),
        resizeRange = this._getPanelResizeRange(panelSizeMap, startY, mouseY),
        increaseIndex,
        decreaseIndex,
        panelToShrink;

    resizeRange = util.range(resizeRange[0], resizeRange[1] + 1);

    if (!resizeRange) {
        return;
    }

    if (!toDown) {
        resizeRange.sort(array.compare.num.desc);
    }

    increaseIndex = resizeRange.shift();
    newPanelHeightMap[increaseIndex] = panels[increaseIndex].getHeight() + resizedHeight;

    decreaseIndex = resizeRange.pop();
    panelToShrink = panels[decreaseIndex];

    // panels between of start, end panel
    util.forEach(resizeRange, function(index) {
        var panel = panels[index];

        if (!panel.isSplitter()) {
            resizedHeight -= panel.getHeight();
            newPanelHeightMap[index] = 0;
        }
    });

    newPanelHeightMap[decreaseIndex] = Math.max(0, panelToShrink.getHeight() - resizedHeight);

    // consider splitter panel's height when set 0 height to shrink panel
    if (!newPanelHeightMap[decreaseIndex]) {
        newPanelHeightMap[increaseIndex] -= asideSplitHeight[+toDown];
    }

    reqAnimFrame.requestAnimFrame(function() {
        util.forEach(newPanelHeightMap, function(height, index) {
            panels[index].setHeight(null, height);
        });
    });
    return;
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
        splitterOffsetY: splitterOffsetY,
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

VLayout.prototype._getMouseY = function(dragData, originEvent) {
    var splitterOffsetY = dragData.splitterOffsetY,
        mouseY = domevent.getMousePosition(originEvent, this.container)[1];

    return common.limit(mouseY - splitterOffsetY, [dragData.minY], [dragData.maxY]);
};

VLayout.prototype._onDrag = function(e) {
    var dragData = this._dragData,
        mouseY = this._getMouseY(dragData, e.originEvent);

    this._refreshGuideElement(dragData.guideElement, mouseY);
};

VLayout.prototype._onDragEnd = function(e) {
    var dragData = this._dragData,
        mouseY = this._getMouseY(dragData, e.originEvent);

    this._resize(dragData.splitter, dragData.startY, mouseY);

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

