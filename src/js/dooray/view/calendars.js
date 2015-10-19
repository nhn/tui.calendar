/**
 * @fileoverview 서비스 좌측 캘린더 목록 뷰
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var View = require('../../view/view');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var tmpl = require('./calendars.hbs');
var api = require('../controller/api');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for calendar list view
 * @param {ServiceCalendar} options.calendar - dooray calendar instance
 * @param {HTMLDivElement} container - view container
 */
function Calendars(options, container) {
    var that;

    View.call(this, null, container);

    /**
     * @type {object}
     */
    this.options = options;

    /**
     * debounced load task api method
     * @type {function}
     */
    this._loadTasks = util.debounce(util.bind(this._loadTasks, this), 300);

    // 캘린더 목록 조회
    that = this;
    api().getCalendars(null, function(err, res) {
        if (err) {
            window.alert('캘린더 목록을 받아오는 중 문제가 발생했습니다. \n잠시 후 다시 시도하세요');
            return;
        }

        that.render(res);
    });

    // bind event
    domevent.on(container, {
        'change': this._onChange,
        'click': this._onClick
    }, this);

    // bind custom event
    this.on({
        'afterRender': this._loadTasks,
        'changeCalendarSelection': this._loadTasks
    }, this);
}

util.inherit(Calendars, View);

/**
 * 캘린더 ID에 대한 목록을 API서버로부터 요청하고 결과를 캘린더에 렌더링한다.
 * @param {string[]} calendarIDList - 캘린더 ID 리스트 
 */
Calendars.prototype._loadTasks = function(calendarIDList) {
    var calendar = this.options.calendar;

    if (!calendarIDList.length) {
        return;
    }

    api().getTasks('*', calendarIDList.join(','), '', '', function(err, tasks) {
        if (err) {
            window.alert('태스크 목록을 받아오는 중 문제가 발생했습니다. \n잠시 후 다시 시도하세요');
            return;
        }

        calendar.clear();

        tasks.each(function(inst) {
            calendar.controller.addEvent(inst, true);
        });

        calendar.view.render();
    });
}

/**
 * @param {Collection} viewModel - collection for CalendarReference
 * @returns {object} view model
 */
Calendars.prototype._getViewModel = function(viewModel) {
    // 일반 캘린더와 프로젝트 캘린더를 나눈다
    var grouped = viewModel.groupBy(function(calendarRef) {
        var raw = calendarRef.raw;

        if (raw.owner) {
            return 'general';
        }

        return 'project'
    });

    return grouped;
};

/**
 * @override
 * @fires Calendars#afterRender
 * @param {Collection} viewModel - collection for CalendarReference
 */
Calendars.prototype.render = function(viewModel) {
    if (viewModel) {
        viewModel = this._getViewModel(viewModel);
    }

    this.container.innerHTML = tmpl(viewModel);

    /**
     * @event Calendars#afterRender
     * @type {Calendars}
     */
    this.fire('afterRender', this.getSelectedCalendarID());
};

/**
 * 현재 뷰를 참조해 체크된 캘린더 ID배열을 반환한다.
 * @returns {string[]} 선택된 캘린더 id 배열
 */
Calendars.prototype.getSelectedCalendarID = function() {
    var container = this.container,
        inputs = domutil.find('input', container, function(el) {
            return el.type === 'checkbox' && el.checked;
        });

    return util.map(inputs, function(el) {
        return domutil.getData(domutil.closest(el, 'li'), 'id');
    });
};

/**
 * calendar checkbox onchange event handler
 * @emits Calendars#changeCalendarSelection
 * @param {Event} changeEventData - input event
 */
Calendars.prototype._onChange = function() {
    /**
     * @events Calendars#changeCalendarSelection
     * @type {string[]} calendar id list
     */
    this.fire('changeCalendarSelection', this.getSelectedCalendarID());
};

/**
 * calendar click event handler
 * @emits Calendars@onClickCreateCalendar
 * @param {MouseEvent} clickEvent - click event object
 */
Calendars.prototype._onClick = function(clickEvent) {
    var target = clickEvent.target;

    if (domutil.hasClass(target, 'schedule-view-calendars-create')) {
        /**
         * @events Calendars#onClickCreateCalendar
         */
        this.fire('onClickCreateCalendar');
    }
};

util.CustomEvents.mixin(Calendars);

module.exports = Calendars;

