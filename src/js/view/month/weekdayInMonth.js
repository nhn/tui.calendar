/**
 * @fileoverview Monthday in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../../config'),
    domutil = require('../../common/domutil'),
    Weekday = require('../weekday'),
    tmpl = require('./weekdayInMonth.hbs');

/**
 * @constructor
 * @extends {Weekday}
 * @param {object} options The object for view customization.
 * @param {string} options.renderStartDate - start date of allday view's render
 *  date. YYYY-MM-DD
 * @param {string} options.renderEndDate - end date of allday view's render 
 *  date. YYYY-MM-DD
 * @param {number} [options.height=60] - minimum height of event container 
 *  element.
 * @param {number} [options.eventBlockHeight=18] - height of each event block.
 * @param {number} [options.eventBlockGutter=2] - gutter height of each event 
 *  block.
 * @param {function} [options.getViewModelFunc] - function for extract partial 
 *  view model data from whole view models.
 * @param {HTMLElement} container Container element.
 */
function WeekdayInMonth(options, container) {
    Weekday.call(this, options, container);
}

util.inherit(WeekdayInMonth, Weekday);

/**
 * @override
 * @param {object} viewModel - events view models
 */
WeekdayInMonth.prototype.render = function(viewModel) {
    var opt = this.options,
        container = this.container,
        baseViewModel = this.getBaseViewModel(),
        eventElements;

    baseViewModel.matrices = opt.getViewModelFunc(viewModel);

    container.style.height = opt.containerHeight + 'px';
    container.innerHTML = tmpl(baseViewModel);

    eventElements = domutil.find(
        '.' + config.classname('weekday-event-title'), 
        container, 
        true
    );

    util.forEach(eventElements, function(el) {
        if (el.offsetWidth < el.scrollWidth) {
            el.setAttribute('title', domutil.getData(el, 'title'));
        }
    });
};

module.exports = WeekdayInMonth;

