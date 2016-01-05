/**
 * @fileoverview Month view factory module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var config = require('../config'),
    domutil = require('../common/domutil'),
    Month = require('../view/month/month');

/**
 * @param {Base} baseController - controller instance
 * @param {HTMLElement} layoutContainer - container element for month view
 * @param {Drag} dragHandler - drag handler instance
 * @param {object} options - options
 * @returns {object} view instance and refresh method
 */
function createMonthView(baseController, layoutContainer, dragHandler, options) {
    var monthViewContainer,
        monthView;

    monthViewContainer = domutil.appendHTMLElement('div', layoutContainer, config.classname('month'));
    monthView = new Month(options.month, monthViewContainer);

    monthView.controller = baseController.Month;

    return {
        view: monthView,
        refresh: function() {}
    };
}

module.exports = createMonthView;

