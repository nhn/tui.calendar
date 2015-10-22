/**
 * @fileoverview 서비스 좌측 캘린더 목록 뷰
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var View = require('../../view/view');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var Collection = require('../../common/collection');
var tmpl = require('./calendars.hbs');
var api = require('../controller/api');
var API_REQUEST_DELAY = 300;

/**
 * @constructor
 * @extends {View}
 * @mixes CustomEvents
 * @param {object} options - options for calendar list view
 * @param {ServiceCalendar} options.calendar - dooray calendar instance
 * @param {HTMLDivElement} container - view container
 */
function Calendars(options, container) {
    var that = this;

    View.call(that, null, container);

    /**
     * @type {object}
     */
    that.options = options;

    /**
     * debounced load task api method
     * @type {function}
     */
    that._loadTasks = util.debounce(util.bind(that._loadTasks, that), API_REQUEST_DELAY);

    /**
     * 선택한 캘린더 목록
     * @type {string[]}
     */
    that._selected = [];

    /**
     * 캘린더 참조 객체 콜렉션
     * @type {Collection}
     */
    that._calendars = new Collection(function(calendarRef) {
        return calendarRef.id + '';
    });

    // bind event
    domevent.on(container, {
        'change': that._onChange,
        'click': that._onClick
    }, that);

    that.render(function() {
        that._selected = that.getSelectedCalendarID();
    });
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
    var that = this;

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
 */
Calendars.prototype.render = function(callback) {
    // 캘린더 목록 조회
    var that = this;

    api().getCalendars(null, function(err, res) {
        if (err) {
            window.alert('캘린더 목록을 받아오는 중 문제가 발생했습니다. \n잠시 후 다시 시도하세요');
            return;
        }

        that._calendars = Collection.merge(that._calendars, res);
        
        that.container.innerHTML = tmpl(that._getViewModel(res));

        that._loadTasks(that.getSelectedCalendarID());

        callback && callback();
    });
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
 * @param {Event} changeEventData - input event
 */
Calendars.prototype._onChange = function() {
    this._selected = this.getSelectedCalendarID();

    this._loadTasks(this._selected);
    // this._loadTasks(this.getSelectedCalendarID());
};

/**
 * calendar click event handler
 * @emits Calendars@createCalendar
 * @param {MouseEvent} clickEvent - click event object
 */
Calendars.prototype._onClick = function(clickEvent) {
    var target = clickEvent.target;

    if (domutil.hasClass(target, 'schedule-view-calendars-create')) {
        /**
         * @events Calendars#createCalendar
         */
        this.fire('createCalendar');
    }
};

util.CustomEvents.mixin(Calendars);

module.exports = Calendars;

