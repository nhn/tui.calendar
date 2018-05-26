/**
 * @fileoverview Month view factory module
 * @author jbpark <pjb0811@gmail.com>
 */
'use strict';

var config = require('../config');
var domutil = require('../common/domutil');
var Year = require('../view/year/year');

/**
 * @param {Base} baseController - controller instance
 * @param {HTMLElement} layoutContainer - container element for year view
 * @param {Drag} dragHandler - drag handler instance
 * @param {object} options - options
 * @returns {object} view instance and refresh method
 */
function createYearView(baseController, layoutContainer, dragHandler, options) {
    var yearViewContainer;
    var yearView;

    yearViewContainer = domutil.appendHTMLElement(
        'div', layoutContainer, config.classname('year'));

    yearView = new Year({
        options: options,
        container: yearViewContainer,
        controllers: baseController
    });

    // add controller
    yearView.controller = baseController.Year;

    return {
        view: yearView
    };
}

module.exports = createYearView;

