/**
 * @fileoverview Monthday in month view
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var Handlebars = require('hbsfy/runtime');
var config = require('../../config'),
    datetime = require('../../common/datetime'),
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
    container.style.height = options.containerHeight + 'px';
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
        eventLenInEachDate = viewModel.eventLenInEachDate,
        maxEventInDay,
        eventElements,
        renderedEventLenInDate = {},
        exceededDate = {};

    maxEventInDay = Math.floor(opt.containerHeight / base.eventBlockHeight);
    maxEventInDay -= 2;    // (month label index) + (+n label index)

    base.maxEventInDay = maxEventInDay;
    base.matrices = viewModel.matrices;

    Handlebars.registerHelper('wdCumulateCount', function() {
        var ymd = datetime.format(this.model.starts, 'YYYYMMDD');

        if (!renderedEventLenInDate[ymd]) {
            renderedEventLenInDate[ymd] = 0;
        }

        console.log(renderedEventLenInDate);

        renderedEventLenInDate[ymd] += 1;
    });

    Handlebars.registerHelper('wdNoExceeded', function(options) {
        var ymd = datetime.format(this.model.starts, 'YYYYMMDD');

        if (!exceededDate[ymd]) {
            exceededDate[ymd] = true;
            this.top = maxEventInDay + 1;
            return options.fn(this);
        }
    });

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

