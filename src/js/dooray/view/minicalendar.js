/**
 * @fileoverview Minicalendar view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var View = require('../../view/view');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var datetime = require('../../common/datetime');
var tmpl = require('./minicalendar.hbs');

var getDateRx = new RegExp('/* @echo CSS_PREFIX */minicalendar-(\\d{4}-\\d{2}-\\d{2})');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for minicalendar view
 *  @param {number} [options.startDayOfWeek=0] - start day of week. default 0 (sunday)
 *  @param {string|Date} [options.renderMonth] - month to render
 *  @param {string[]} [options.highlightDate] - dates to highlight
 *  @param {string[]} [options.daynames] - array of each days name.
 * @param {HTMLDivElement} container - element to use container
 */
function MiniCalendar(options, container) {
    var today = datetime.start(new Date());

    if (!(this instanceof MiniCalendar)) {
        return new MiniCalendar(options, container);
    }

    View.call(this, container);
    domutil.addClass(container, '/* @echo CSS_PREFIX */minicalendar');
    domevent.on(this.container, 'click', this._onClick, this);

    /**
     * @type {object}
     */
    options = this.options = util.extend({
        startDayOfWeek: 0,
        renderMonth: new Date(+today),
        highlightDate: [],
        daynames: ['일', '월', '화', '수', '목', '금', '토']
    }, options);

    // parse renderMonth options if it is an string
    if (util.isString(options.renderMonth)) {
        options.renderMonth = datetime.start(datetime.parse(options.renderMonth));
    }

    /**
     * 일자 강조 데이터
     * @type {object}
     */
    this.hlData = {};
    if (options.highlightDate.length) {
        this.highlightDate(options.highlightDate);
    }

    this.render();
}

util.inherit(MiniCalendar, View);

/**
 * Next, Prev button event handler
 * @fires Minicalendar#change
 * @param {HTMLButtonElement} buttonElement - next, prev button from _onClick event handler
 */
MiniCalendar.prototype._nav = function(buttonElement) {
    var isNext = domutil.hasClass(buttonElement, '/* @echo CSS_PREFIX */minicalendar-next'),
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
        previous = domutil.find('./* @echo CSS_PREFIX */minicalendar-focused', this.container);

        if (previous) {
            domutil.removeClass(previous, '/* @echo CSS_PREFIX */minicalendar-focused');
        }

        domutil.addClass(td, '/* @echo CSS_PREFIX */minicalendar-focused');

        selected = this.getSelectedDate();

        if (datetime.isSameDate(selected, today)) {
            domutil.addClass(td, '/* @echo CSS_PREFIX */minicalendar-today');
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

    if (domutil.hasClass(button, '/* @echo CSS_PREFIX */minicalendar-date')) {
        this._date(button);
        return;
    }

    if (domutil.hasClass(button, '/* @echo CSS_PREFIX */minicalendar-nav')) {
        this._nav(button);
        return;
    }
};

/**
 * Get selected data
 * @returns {Date} selected date
 */
MiniCalendar.prototype.getSelectedDate = function() {
    var selected = domutil.find('./* @echo CSS_PREFIX */minicalendar-focused', this.container),
        matches;

    if (!selected) {
        return null;
    }

    matches = selected.className.match(getDateRx);

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
    var _date,
        td, button;

    if (util.isString(date)) {
        date = datetime.parse(date);
    }

    _date = datetime.format(date, 'YYYY-MM-DD');
    td = domutil.find('./* @echo CSS_PREFIX */minicalendar-' + _date, this.container);
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
            hasSchedule: hlData[ymd],
            isNotThisMonth: !dateIsInThisMonth,
            weekend: (day === 0 || day === 6),
            selected: selected,
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

/**
 * Cache data for highlight specific dates in calendar.
 * @param {string[]} dateStrList - the array of dates to highlight. (YYYY-MM-DD)
 * @param {boolean} [silent=false] - set true for prevent auto rendering.
 */
MiniCalendar.prototype.highlightDate = function(dateStrList, silent) {
    var ownData = this.hlData;

    util.forEach(dateStrList, function(ymd) {
        ownData[ymd] = true;
    });

    if (!silent) {
        this.render();
    }
};

/**
 * Clear cached data for highlighting specific date for represent the date has schedule.
 * @param {boolean} [silent=false] - set true for prevent auto rendering.
 */
MiniCalendar.prototype.clearHighlightDate = function(silent) {
    delete this.hlData;
    this.hlData = {};

    if (!silent) {
        this.render();
    }
};

util.CustomEvents.mixin(MiniCalendar);

module.exports = MiniCalendar;

