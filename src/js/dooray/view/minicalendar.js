/**
 * @fileoverview Minicalendar view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var View = require('../../view/view');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var datetime = require('../../common/datetime');
var tmpl = require('./minicalendar.hbs');

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
    defaultMonth.setHours(0, 0, 0);

    domevent.on(this.container, 'click', this._onClick, this);

    /**
     * @type {object}
     */
    this.options = util.extend({
        startDayOfWeek: 0,
        daynames: ['일', '월', '화', '수', '목', '금', '토']
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
 * Get selected data
 * @returns {Date} selected date
 */
MiniCalendar.prototype.getSelectedDate = function() {
    var selected = domutil.find('.schedule-view-minicalendar-focused', this.container),
        y, m, d;

    if (!selected) {
        return null;
    }

    y = domutil.getData(selected, 'y');
    m = domutil.getData(selected, 'm');
    d = domutil.getData(selected, 'd');

    return new Date(y, m, d);
};

/**
 * Get minicalendar view model
 * @param {Date} renderDate - Date to render minicalendar
 * @param {number} startDayOfWeek - number of start of week (0:sun ...)
 * @param {Date} today - today Date object
 * @param {Object.<string, array>} eventsInMonth - events array to represent dots in minicalendar
 * @returns {object} viewmodel
 */
MiniCalendar.prototype._getViewModel = function(renderDate, startDayOfWeek, today, eventsInMonth) {
    var viewModel = {
            title: datetime.format(renderDate, 'YYYY.MM'),
            startDayOfWeek: startDayOfWeek,
            dayname: null,
            calendar: null
        },
        daynames = this.options.daynames,
        renderMonth = renderDate.getMonth(),
        renderYear = renderDate.getFullYear(),
        todayDate = today.getDate(),
        todayMonth = today.getMonth(),
        todayYear = today.getFullYear(),
        todayIsRenderedMonth = (renderYear === todayYear && renderMonth === todayMonth);

    viewModel.dayname = util.map(
        util.range(startDayOfWeek, 7).concat(util.range(7)).slice(0, 7), 
        function(i) { return daynames[i]; }
    );

    viewModel.calendar = datetime.arr2dCalendar(renderDate, startDayOfWeek, function(d) {
        var month = d.getMonth(),
            year = d.getFullYear(),
            date = d.getDate(),
            isOtherDate = year !== renderYear || month !== renderMonth,
            eventsInDate,
            result = {
                y: year,
                m: month,
                d: d.getDate(),
                isOtherDate: isOtherDate
            };

        if (!isOtherDate) {
            // dates in rendered month
            if (todayIsRenderedMonth && date === todayDate) {
                result.today = true;

                // today is include in rendered month then autoselect today date
                result.focused = true;
            }
            
            if (!todayIsRenderedMonth && date === 1) {
                // today is not include in rendered month then autoselect first date of month
                result.focused = true;
            }
        }

        if (eventsInMonth) {
            eventsInDate = eventsInMonth[[year, month + 1, date].join('-')];

            if (eventsInDate) {
                // if has events in date then add.
                result.events = eventsInDate;
            }
        }

        return result;
    });

    return viewModel;
};

/**
 * Render view
 */
MiniCalendar.prototype.render = function() {
    var container = this.container,
        options = this.options,
        renderDate = options.renderMonth,
        startDayOfWeek = options.startDayOfWeek,
        //TODO: this will provide by controller
        events = {
            '2015-10-2': [{color:'dc9656'}, {color:'a1b56c'}],
            '2015-10-18': [{color:'a1b56c'}]
        },
        viewModel;

    viewModel = this._getViewModel(renderDate, startDayOfWeek, new Date(), events);

    container.innerHTML = tmpl(viewModel);
};

util.CustomEvents.mixin(MiniCalendar);

module.exports = MiniCalendar;

