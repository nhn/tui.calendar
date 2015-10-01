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

Handlebars.registerHelper('minical-dayname', function() {
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
 * Get selected data
 * @returns {Date} selected date
 */
MiniCalendar.prototype.getSelectedDate = function() {
    var selected = domutil.find('.schedule-view-minicalendar-focused', this.container),
        y, m, d,
        date;

    if (!selected) {
        return null;
    }

    y = domutil.getData(selected, 'y');
    m = domutil.getData(selected, 'm');
    d = domutil.getData(selected, 'd');

    date = new Date(y, m, d);

    return date;
};

/**
 * Render view
 */
MiniCalendar.prototype.render = function() {
    var container = this.container,
        options = this.options,
        renderDate = options.renderMonth,
        startDayOfWeek = options.startDayOfWeek,
        viewModel = {
            title: datetime.format(renderDate, 'YYYY.MM'),
            dayname: config.label.DAY_NAME.kor,
            startDayOfWeek: startDayOfWeek,
            calendar: null,
            events: null
        },
        renderMonth = renderDate.getMonth(),
        renderYear = renderDate.getFullYear(),
        today = new Date(),
        todayDate = today.getDate(),
        todayMonth = today.getMonth(),
        todayYear = today.getFullYear(),

        //TODO: from controller
        events = {
            '2015-10-2': [{color:'dc9656'}, {color:'a1b56c'}],
            '2015-10-18': [{color:'a1b56c'}]
        };

    // 뷰 모델을 만든다
    viewModel.calendar = datetime.arr2dCalendar(renderDate, startDayOfWeek, function(d) {
        var month = d.getMonth(),
            year = d.getFullYear(),
            date = d.getDate(),
            isCurrentMonth = (year === todayYear && month === todayMonth),
            eventsInDate,
            result = {
                y: year,
                m: month,
                d: d.getDate(),
            };

        if (year !== renderYear || month !== renderMonth) {
            // 렌더링 된 월 이외의 날짜들 처리
            result.isOtherDate = true;
        }

        if (isCurrentMonth && date === todayDate) {
            // 오늘이 렌더링 된 미니캘린더의 월인 경우 오늘을 선택 처리
            result.focused = true;
        } else if (!isCurrentMonth && date === 1) {
            // 오늘이 렌더링 된 미니캘린더의 월이 아닌 경우 1일을 선택 처리
            result.focused = true;
        }

        eventsInDate = events[[year, month + 1, date].join('-')];

        if (eventsInDate) {
            result.events = eventsInDate;
        }

        return result;
    });


    container.innerHTML = tmpl(viewModel);
};

util.CustomEvents.mixin(MiniCalendar);

module.exports = MiniCalendar;

