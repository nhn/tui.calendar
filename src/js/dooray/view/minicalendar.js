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
var api = require('../controller/api');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for minicalendar view
 * @param {number} [options.startDayOfWeek=0] - start day of week. default 0 (sunday)
 * @param {string} [options.renderMonth] - YYYY-MM formatted date to render. 
 * if not supplied use current month
 * @param {ServiceCalendar} [options.calendar] - dooray calendar instance
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
        daynames: ['일', '월', '화', '수', '목', '금', '토'],
        calendar: null
    }, options);

    this.options.renderMonth = defaultMonth;

    /**
     * 미니캘린더 일 별 일정존재여부 debounce 함수
     * @type {function}
     */
    this._loadTasks = util.debounce(util.bind(this._loadTasks, this), 300);

    this.render();
}

util.inherit(MiniCalendar, View);

/**
 * 서버로부터 일자별 존재 일정 정보를 비동기로 받아오고 콜백을 호출한다
 * @param {object} viewModel - viewModel
 * @param {function} callback - nodejs common callback
 */
MiniCalendar.prototype._loadTasks = function(viewModel, callback) {
    var renderStart = viewModel.calendar[0][0],
        renderEnd = (function() {
            var lastRow = viewModel.calendar[viewModel.calendar.length - 1];
            return lastRow[lastRow.length - 1];
        })();

    renderStart = datetime.start(new Date(renderStart.y, renderStart.m, renderStart.d));
    renderEnd = datetime.end(new Date(renderEnd.y, renderEnd.m, renderEnd.d));

    api().getMinicalendarTasks(renderStart, renderEnd, callback);
};

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
 * @returns {object} viewmodel
 */
MiniCalendar.prototype._getViewModel = function(renderDate, startDayOfWeek, today) {
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
            day = d.getDay(),
            isOtherDate = year !== renderYear || month !== renderMonth,
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

        if (day === 0 || day === 6) {
            result.weekend = true;
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
        viewModel;

    viewModel = this._getViewModel(renderDate, startDayOfWeek, new Date());

    container.innerHTML = tmpl(viewModel);

    // 렌더 완료 후 일정있는 일자 강조
    this._loadTasks(viewModel, function(err, res) {
        if (!err) {
            //TODO: 여기서 일자 강조
        }
    });
};

util.CustomEvents.mixin(MiniCalendar);

module.exports = MiniCalendar;

