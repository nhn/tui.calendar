/**
 * @fileoverview Minicalendar view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util,
    parseDateRx = /(\d{4}-\d{2}-\d{2})/;

var config = require('../../config'),
    View = require('../../view/view'),
    domutil = require('../../common/domutil'),
    domevent = require('../../common/domevent'),
    datetime = require('../../common/datetime'),
    tmpl = require('./minicalendar.hbs'),
    TZDate = require('../../common/timezone').Date;

/**
 * Returns the CSS class name for the given index
 * @param {number} dayIdx - day index
 * @returns {string}
 */
function getDayClassName(dayIdx) {
    switch (dayIdx) {
        case 0:
            return 'holiday-sun';
        case 6:
            return 'holiday-sat';
        default:
            return '';
    }
}

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for minicalendar view
 *  @param {number} [options.startDayOfWeek=0] - start day of week. default 0 (sunday)
 *  @param {string|Date} [options.renderMonth] - month to render
 *  @param {string[]} [options.daynames] - array of each days name
 *  @param {string} [options.selectedDate=''] - YYYY-MM-DD formatted selected date
 * @param {HTMLDivElement} container - element to use container
 */
function MiniCalendar(options, container) {
    var todayStart,
        todayYMD;

    if (!(this instanceof MiniCalendar)) {
        return new MiniCalendar(options, container);
    }

    View.call(this, container);

    domutil.addClass(container, config.classname('minicalendar'));
    domevent.on(this.container, 'click', this._onClick, this);

    todayStart = datetime.start(new TZDate());
    todayYMD = datetime.format(todayStart, 'YYYY-MM-DD');

    /**
     * @type {object}
     */
    options = this.options = util.extend({
        startDayOfWeek: 0,
        renderMonth: todayStart,
        daynames: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        selectedDate: todayYMD
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
    this.hlData[todayYMD] = {
        today: true
    };

    /**
     * @type {Date}
     */
    this.selectedDate = new TZDate(Number(options.renderMonth));

    // focused 된 범위가 1일인지 여부 (1일인 경우 스타일을 다르게 표시하기 위함)
    this.singleFocused = false;

    // default is week.
    this.viewName = 'week';

    this.currentDate = null;

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
 * @fires Minicalendar#click
 * @param {HTMLButtonElement} buttonElement - date button from _onClick event handler
 */
MiniCalendar.prototype._date = function(buttonElement) {
    var td = domutil.closest(buttonElement, 'td'),
        cssClass = domutil.getClass(td),
        matches;

    if (!td) {
        return;
    }

    matches = cssClass.match(parseDateRx);

    if (!matches) {
        return;
    }

    this.selectedDate = datetime.parse(matches[0]);

    this.render();

    /**
     * @event MiniCalendar#click
     * @type {object}
     * @property {Date} date - clicked date
     */
    this.fire('click', {
        date: new Date(Number(this.selectedDate))
    });
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
 * Get minicalendar view model
 * @param {Date} renderDate - Date to render minicalendar
 * @param {number} startDayOfWeek - number of start of week (0:sun ...)
 * @returns {object} viewmodel
 */
MiniCalendar.prototype._getViewModel = function(renderDate, startDayOfWeek) {
    var opt = this.options,
        daynames = opt.daynames,
        hlData = this.hlData,
        selectedDate = this.selectedDate,
        classPrefix = config.classname('minicalendar-'),
        viewName = this.viewName,
        currentDate = this.currentDate ? this.currentDate : new Date(),
        viewModel = {
            title: datetime.format(renderDate, 'YYYY.MM'),
            startDayOfWeek: startDayOfWeek,
            tableClass: this.singleFocused ? (classPrefix + 'single-focused') : ''
        };

    viewModel.dayname = util.map(
        util.range(startDayOfWeek, 7).concat(util.range(7)).slice(0, 7),
        function(i) {
            return {
                name: daynames[i],
                cssClass: classPrefix + getDayClassName(i)
            };
        }
    );

    viewModel.calendar = datetime.arr2dCalendar(renderDate, startDayOfWeek, true, function(date) {
        var ymd = datetime.format(date, 'YYYY-MM-DD'),
            day = date.getDay(),
            dayClassName = getDayClassName(day),
            cssClasses = util.keys(hlData[ymd] ? hlData[ymd] : {});

        if (viewName === 'month' && !datetime.isSameMonth(currentDate, renderDate)) {
            cssClasses = util.filter(cssClasses, function(value) {
                return value !== 'focused';
            });
        }

        cssClasses.push(ymd);

        if (datetime.isSameDate(date, selectedDate)) {
            cssClasses.push('selected');
        }

        if (!datetime.isSameMonth(date, renderDate)) {
            cssClasses.push('other-month');
        }

        if (dayClassName) {
            cssClasses.push(dayClassName);
        }

        return {
            date: date.getDate(),
            cssClass: classPrefix + cssClasses.join(' ' + classPrefix)
        };
    });

    return viewModel;
};

/**
 * Add highlight date
 * @param {string} ymd - ymd
 * @param {string} cssClass - cssClass
 */
MiniCalendar.prototype._addHlData = function(ymd, cssClass) {
    var hlData = this.hlData[ymd];

    if (!hlData) {
        hlData = this.hlData[ymd] = {};
    }

    hlData[cssClass] = true;
};

/**
 * Set highlight date range
 * @param {Date} start - focus start date
 * @param {Date} end - focus end date
 * @param {string} cssClass - cssClass
 */
MiniCalendar.prototype._setHlDateRange = function(start, end, cssClass) {
    var self = this,
        range = datetime.range(
            datetime.start(start),
            datetime.end(end),
            datetime.MILLISECONDS_PER_DAY
        );

    util.forEach(range, function(date) {
        self._addHlData(datetime.format(date, 'YYYY-MM-DD'), cssClass);
    });
};

/**
 * Clear focus data
 */
MiniCalendar.prototype.clearFocusData = function() {
    util.forEach(this.hlData, function(obj) {
        delete obj.focused;
    });
    this.singleFocused = false;
    this.render();
};

/**
 * Clear focus data
 */
MiniCalendar.prototype.clearMarkData = function() {
    util.forEach(this.hlData, function(obj) {
        delete obj.marked;
    });
};

/**
 * Focus specific date range
 * @param {Date} start - focus start date
 * @param {Date} end - focus end date
 * @param {Date} currentDate - current date
 * @param {string} viewName - type of view(day, week, month);
 */
MiniCalendar.prototype.focusDateRange = function(start, end, currentDate, viewName) {
    this.clearFocusData();
    this._setHlDateRange(start, end, 'focused');
    this.singleFocused = datetime.isSameDate(new TZDate(start), new TZDate(end));
    this.viewName = viewName;
    this.currentDate = currentDate;
    this.options.renderMonth = datetime.start(currentDate);

    this.render();
};


MiniCalendar.prototype.markData = function(dates) {
    var self = this;
    this.clearMarkData();
    util.forEach(dates, function(date) {
        self._setHlDateRange(date.start, date.end, 'marked');
    });
    this.render();
};


/**
 * Get selected data
 * @returns {Date} selected date
 */
MiniCalendar.prototype.getSelectedDate = function() {
    return new TZDate(Number(this.selectedDate));
};

/**
 * select specific date.
 * @param {Date|string} date - date to select
 */
MiniCalendar.prototype.selectDate = function(date) {
    date = util.isDate(date) ? date : datetime.parse(date);

    this.selectedDate = new TZDate(Number(date));

    this.render();
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

module.exports = MiniCalendar;
