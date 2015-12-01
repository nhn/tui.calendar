/**
 * @fileoverview Panel class for VLayout module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../config'),
    common = require('./common'),
    domutil = require('./domutil'),
    View = require('../view/view');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for VPanel
 * @param {HTMLElement} container - container element
 */
function VPanel(options, container) {
    View.call(this, container);

    this.options = util.extend({
        minHeight: 0,
        maxHeight: null,
        height: null,
        isSplitter: false,
        autoHeight: false,
        className: ''
    }, options);

    this._initPanel(options, container);
}

util.inherit(VPanel, View);

/**
 * set height of html element
 * @param {HTMLElement} [container] - container element
 * @param {number} newHeight - height
 */
VPanel.prototype.setHeight = function(container, newHeight) {
    container = container || this.container;
    container.style.height = newHeight + 'px';
};

/**
 * get outer height of panel element
 * @returns {number} outer height of panel element
 */
VPanel.prototype.getHeight = function() {
    return this.container.offsetHeight;
};

/**
 * add design class to panel element
 * @param {string} className - classname string
 */
VPanel.prototype.addClass = function(className) {
    domutil.addClass(this.container, className);
}

/**
 * remove design class to panel element
 * @param {string} className - classname string
 */
VPanel.prototype.removeClass = function(className) {
    domutil.removeClass(this.container, className);
};

/**
 * initialize panel element
 * @param {PanelOptions} options - options for panel
 * @param {HTMLDivElement} container - panel element
 */
VPanel.prototype._initPanel = function(options, container) {
    var height;

    if (options.isSplitter) {
        domutil.addClass(container, config.classname('splitter'));
        return;
    }

    domutil.addClass(container, options.className);

    if (options.autoHeight) {
        domutil.setData(container, 'autoHeight', true);
    } else {
        height = common.limit(options.height || 0, 
            [options.minHeight],
            options.maxHeight ? [options.maxHeight] : []
        );

        this.setHeight(container, height);
    }
};

module.exports = VPanel;

