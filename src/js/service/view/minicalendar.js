/**
 * @fileoverview Minicalendar view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var config = require('../../config');
var View = require('../../view/view');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var datetime = require('../../datetime');
var Handlebars = require('hbsfy/runtime');
var tmpl = require('./minicalendar.hbs');

Handlebars.registerHelper('minical-otherdate', function() {
    if (this < 0) {
        return 'schedule-view-minicalendar-other';
    }
});

Handlebars.registerHelper('minical-abs', function() {
    return Math.abs(this);
});

Handlebars.registerHelper('minical-header', function() {
    var dayname = this.dayname,
        index = this.startDayOfWeek;

    return util.map(util.range(7), function() {
        var tag = '<th>' + dayname[index] + '</th>';
        index += 1;
        if (index > 6) {
            index = 0;
        }
        return tag;
    }).join('');
});

Handlebars.registerHelper('minical-dots', function(eventsInDates) {
    var events = eventsInDates[this];

    if (events) {
        return util.map(util.range(events.length), function() { return '&bull;'; }).join('');
    }
});

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for minicalendar view
 * @param {number} [options.startDayOfWeek=0] - start day of week. default 0 (sunday)
 * @param {string} [options.renderMonth] - YYYY-MM formatted date to render. 
 * if not supplied use current month
 * @param {HTMLDivElement} container - element to use container
 */
function MiniCalendar(options, container) {
    var defaultMonth;

    View.call(this, options, container);

    domutil.addClass(container, 'schedule-view-minicalendar');


    defaultMonth = util.pick(options, 'renderMonth');
    if (defaultMonth) {
        defaultMonth = datetime.parse(defaultMonth + '-01');
    } else {
        defaultMonth = new Date();
    }

    domevent.on(this.container, 'click', this._onClick, this);

    /**
     * @type {object}
     */
    this.options = util.extend({
        startDayOfWeek: 0
    }, options);

    this.options.renderMonth = defaultMonth;
}

util.inherit(MiniCalendar, View);

/**
 * Next, Prev button event handler
 * @param {HTMLButtonElement} buttonElement - next, prev button from _onClick event handler
 */
MiniCalendar.prototype.nav = function(buttonElement) {
    var isNext = domutil.hasClass(buttonElement, 'schedule-view-minicalendar-next'),
        options = this.options,
        offset = isNext ? 1 : -1;

    options.renderMonth.setMonth(options.renderMonth.getMonth() + offset);

    this.render();
};

/**
 * Date button event handler
 * @param {HTMLButtonElement} buttonElement - date button from _onClick event handler
 */
MiniCalendar.prototype.date = function(buttonElement) {
    var td = domutil.closest(buttonElement, 'td'),
        previous;

    if (td) {
        previous = domutil.find('.schedule-view-minicalendar-focused', this.container);

        if (previous) {
            domutil.removeClass(previous, 'schedule-view-minicalendar-focused');
        }

        domutil.addClass(td, 'schedule-view-minicalendar-focused');
    }
};

/**
 * Click event handler
 * @param {MouseEvent} clickEvent - click mouse event object
 */
MiniCalendar.prototype._onClick = function(clickEvent) {
    var target = clickEvent.srcElement || clickEvent.target,
        button = domutil.closest(target, 'button');

    if (!button) {
        return;
    }

    if (domutil.hasClass(button, 'schedule-view-minicalendar-date')) {
        this.date(button);
        return;
    }

    if (domutil.hasClass(button, 'schedule-view-minicalendar-nav')) {
        this.nav(button);
        return;
    }
};

/**
 * Render view
 */
MiniCalendar.prototype.render = function() {
    var container = this.container,
        options = this.options,
        viewModel = {
            month: options.renderMonth,
            renderMonth: datetime.format(options.renderMonth, 'YYYY.MM'),
            startDayOfWeek: options.startDayOfWeek,
            dayname: config.label.DAY_NAME.kor,
            eventsInDates: {
                '-30': [{}, {}],
                '4': [{}]
            },
            calendar: datetime.arr2dCalendar(options.renderMonth, options.startDayOfWeek)
        };

    container.innerHTML = tmpl(viewModel);
};

module.exports = MiniCalendar;

