/**
 * @fileoverview Minicalendar view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config'),
    View = require('../../view/view'),
    domutil = require('../../common/domutil'),
    domevent = require('../../common/domevent'),
    datetime = require('../../common/datetime'),
    tmpl = require('./minicalendar.hbs');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for minicalendar view
 *  @param {number} [options.startDayOfWeek=0] - start day of week. default 0 (sunday)
 *  @param {string|Date} [options.renderMonth] - month to render
 *  @param {string[]} [options.daynames] - array of each days name
 *  @param {number[]} [options.weekendNumber] - number of weekend
 *  @param {string} [options.selectedDate=''] - YYYY-MM-DD formatted selected date
 * @param {HTMLDivElement} container - element to use container
 */
function MiniCalendar(options, container) {
    var todayStart;

    if (!(this instanceof MiniCalendar)) {
        return new MiniCalendar(options, container);
    }

    View.call(this, container);
    domutil.addClass(container, config.classname('minicalendar'));
    domevent.on(this.container, 'click', this._onClick, this);
    todayStart = datetime.start(new Date());

    /**
     * @type {object}
     */
    options = this.options = util.extend({
        startDayOfWeek: 0,
        renderMonth: todayStart,
        daynames: ['일', '월', '화', '수', '목', '금', '토'],
        weekendNumber: [0, 6],
        selectedDate: datetime.format(todayStart, 'YYYY-MM-DD')
    }, options);

    // parse renderMonth options if it is an string
    if (util.isString(options.renderMonth)) {
        options.renderMonth = datetime.start(datetime.parse(options.renderMonth));
    }

    // var hlData = {
    //     'today': {'2015-12-08': true},
    //     'selected': {'2015-12-09': true},
    //
    //     'focused': {'2015-06-12': true, '2015-06-13': true},
    //     'has-schedule': {'2015-05-01': true, '2015-05-02': true}
    // };

    /**
     * 일자 강조 데이터
     * @type {object}
     */
    this.hlData = {};

    this.render();
}

util.inherit(MiniCalendar, View);

/**
 * Next, Prev button event handler
 * @fires Minicalendar#change
 * @param {HTMLButtonElement} buttonElement - next, prev button from _onClick event handler
 */
MiniCalendar.prototype._nav = function(buttonElement) {
    var isNext = domutil.hasClass(buttonElement, config.classname('minicalendar-next')),
        options = this.options,
        offset = isNext ? 1 : -1,
        eventData = {
            before: this.getSelectedDate()
        };

    options.renderMonth.setMonth(options.renderMonth.getMonth() + offset);

    this.render();

    eventData.after = this.getSelectedDate();

    /**
     * @event MiniCalendar#change
     * @type {object}
     * @property {Date} before - the date of before changed
     * @property {Date} after - the date of after changed
     */
    this.fire('change', eventData);
};

/**
 * Date button event handler
 * @fires Minicalendar#change
 * @param {HTMLButtonElement} buttonElement - date button from _onClick event handler
 */
MiniCalendar.prototype._date = function(buttonElement) {
    var td = domutil.closest(buttonElement, 'td'),
        today = (new Date()),
        previous,
        selected,
        eventData = {
            before: this.getSelectedDate()
        };

    if (td) {
        previous = domutil.find('.' + config.classname('minicalendar-focused'), this.container);

        if (previous) {
            domutil.removeClass(previous, config.classname('minicalendar-focused'));
        }

        domutil.addClass(td, config.classname('minicalendar-focused'));

        selected = this.getSelectedDate();

        if (datetime.isSameDate(selected, today)) {
            domutil.addClass(td, config.classname('minicalendar-today'));
        }

        eventData.after = selected;

        /**
         * @event MiniCalendar#change
         * @type {object}
         * @property {Date} before - the date of before changed
         * @property {Date} after - the date of after changed
         */
        this.fire('change', eventData);
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

    if (domutil.hasClass(button, config.classname('minicalendar-date'))) {
        this._date(button);
        return;
    }

    if (domutil.hasClass(button, config.classname('minicalendar-nav'))) {
        this._nav(button);
        return;
    }
};

/**
 * Get selected data
 * @returns {Date} selected date
 */
MiniCalendar.prototype.getSelectedDate = function() {
    var selected = domutil.find('.' + config.classname('minicalendar-focused'), this.container),
        matches;

    if (!selected) {
        return null;
    }

    matches = selected.className.match(config.minicalendar.getDataRegExp);

    if (!matches || matches.length < 2) {
        return;
    }

    return datetime.parse(matches[1]);
};

/**
 * select specific date.
 * @param {Date|string} date - date to select
 */
MiniCalendar.prototype.selectDate = function(date) {
    var _date, td, button;

    if (util.isString(date)) {
        date = datetime.parse(date);
    }

    _date = datetime.format(date, 'YYYY-MM-DD');
    td = domutil.find('.' + config.classname('minicalendar-') + _date, this.container);
    button = domutil.find('button', td);

    if (!td || !button) {
        return;
    }

    this._date(button);
};

/**
 * Get minicalendar view model
 * @param {Date} renderDate - Date to render minicalendar
 * @param {number} startDayOfWeek - number of start of week (0:sun ...)
 * @returns {object} viewmodel
 */
MiniCalendar.prototype._getViewModel = function(renderDate, startDayOfWeek) {
    var daynames = this.options.daynames,
        hlData = this.hlData,
        today = datetime.start(new Date()),
        isCurrentMonth = datetime.isSameMonth(renderDate, today),
        viewModel = {
            title: datetime.format(renderDate, 'YYYY.MM'),
            startDayOfWeek: startDayOfWeek
        };

    viewModel.dayname = util.map(
        util.range(startDayOfWeek, 7).concat(util.range(7)).slice(0, 7),
        function(i) { return daynames[i]; } 
    );

    viewModel.calendar = datetime.arr2dCalendar(renderDate, startDayOfWeek, function(date) {
        var d = date.getDate(),
            ymd = datetime.format(date, 'YYYY-MM-DD'),
            day = date.getDay(),
            selected = false,
            isToday = datetime.isSameDate(date, today),
            dateIsInThisMonth = datetime.isSameMonth(date, renderDate);

        if (dateIsInThisMonth) {
            if (isCurrentMonth) {
                if (isToday) {
                    selected = true;
                    isToday = true;
                }
            } else if (d === 1) {
                selected = true;
            }
        }

        return {
            d: d,
            ymd: ymd,
            isNotThisMonth: !dateIsInThisMonth,
            selected: selected,

            hasSchedule: hlData[ymd],
            weekend: (day === 0 || day === 6),
            today: isToday
        };
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
        viewModel;

    viewModel = this._getViewModel(renderDate, startDayOfWeek);

    container.innerHTML = tmpl(viewModel);
};

util.CustomEvents.mixin(MiniCalendar);

module.exports = MiniCalendar;

