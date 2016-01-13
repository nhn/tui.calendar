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
 * @param {object} options - options for WeekdayInWeek view
 * @param {number} [options.containerHeight=40] - minimum height of event 
 *  container element.
 * @param {number} [options.containerButtonGutter=8] - free space at bottom to 
 *  make create easy.
 * @param {number} [options.eventHeight=18] - height of each event block.
 * @param {number} [options.eventGutter=2] - gutter height of each event block.
 * @param {HTMLDIVElement} container - DOM element to use container for this 
 *  view.
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
        base = this.getBaseViewModel(),
        maxEventInDay,
        eventElements;

    // maxEventInDay = (this.getviewBound().height / base.eventBlockHeight);
    // console.log(maxEventInDay);

    base.matrices = opt.getViewModelFunc(viewModel);

    container.style.height = opt.containerHeight + 'px';
    container.innerHTML = tmpl(base);
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

