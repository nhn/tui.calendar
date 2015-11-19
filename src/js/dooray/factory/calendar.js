/**
 * @fileoverview Calendar for service.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var datetime = require('../../common/datetime');
var Calendar = require('../../factory/calendar');
var DoorayBase = require('../controller/base');
var Week = require('../../controller/viewMixin/week');
var serviceWeekViewFactory = require('./weekView');

/**
 * @typedef {object} ServiceCalendar~DoorayEvent
 * @property {string} [id] - 일정의 uniqueID.
 * @property {string} [calendarID] - 각 일정을 캘린더별로 그룹지을 수 있는 값.
 * @property {string} title - 이벤트 제목
 * @property {string} category - 이벤트 타입
 * @property {string} dueDateClass - 업무 일정 분류 (category가 'task'일 때 유효)
 * @property {string} starts - 일정 시작 시간
 * @property {string} ends - 일정 종료 시간
 * @property {string} [color] - 일정 텍스트색
 * @property {string} [bgColor] - 일정 배경색
 */

/**
 * Calendar factor module for service (dooray)
 * @constructor
 * @extends {Calendar}
 * @param {object} options - options for calendar
 *  @param {string} [options.cssPrefix] - CSS classname prefix
 *  @param {function} [options.groupFunc] - function for group event models {@see Collection#groupBy}
 *  @param {function} [options.controller] - controller instance
 *  @param {string} [options.defaultView='week'] - default view of calendar
 *  @param {object} [options.calendarColor] - {@see ServiceCalendar~DoorayEvent} 의 calendarID별로 스타일을 미리 지정 가능
 *  @param {object} [options.week] - options for week view
 *   @param {number} [options.week.startDayOfWeek=0] - start day of week
 *   @param {string} options.week.renderStartDate - YYYY-MM-DD render start date
 *   @param {string} options.week.renderEndDate - YYYY-MM-DD render end date
 *  @param {ServiceCalendar~DoorayEvent[]} options.events - 기본 일정 목록
 *  @param {object} [options.month] - options for month view
 *  @param {string} options.month.renderMonth - YYYY-MM render month
 * @param {HTMLDivElement} container = container element for calendar
 */
function ServiceCalendar(options, container) {
    var controller;

    if (!(this instanceof ServiceCalendar)) {
        return new ServiceCalendar(options, container);
    }

    /**
     * 서비스에서 사용되는 모델 구분용 옵션 함수
     * @param {CalEventViewModel} viewModel - DoorayEvent를 래핑한 뷰 모델
     * @returns {string} 구분 키 값
     */
    options.groupFunc = function(viewModel) {
        return viewModel.model.category;
    };

    // 컨트롤러 만들기
    controller = options.controller = (function() {
        var controller = new DoorayBase(options),
            originFindByDateRange;

        // 주뷰 컨트롤러 믹스인
        controller.Week = {};
        util.forEach(Week, function(method, methodName) {
            controller.Week[methodName] = util.bind(method, controller);
        });

        // 일정 조회 API에 기존 캘린더에 없었던 milstone, task를 지원하도록
        // 하기 위해 메서드를 오버라이딩한다.
        originFindByDateRange = controller.Week.findByDateRange;
        controller.Week.findByDateRange = function(starts, ends) {
            var dateRange = util.map(datetime.range(
                    datetime.start(starts),
                    datetime.end(ends),
                    datetime.MILLISECONDS_PER_DAY
                ), function(d) { return datetime.format(d, 'YYYY-MM-DD'); }),
                viewModel = originFindByDateRange(starts, ends);

            util.forEach(viewModel, function(coll, key, obj) {
                var groupedByYMD;

                // 마일스톤, 업무 뷰 뷰모델 가공
                if (key === 'task' || key === 'milestone') {
                    groupedByYMD = coll.groupBy(dateRange, function(viewModel) {
                        return datetime.format(viewModel.model.ends, 'YYYY-MM-DD');
                    });

                    if (key === 'task') {
                        util.forEach(groupedByYMD, function(coll, ymd, obj) {
                            obj[ymd] = coll.groupBy(function(viewModel) {
                                return viewModel.model.dueDateClass;
                            });
                        });
                    }

                    obj[key] = groupedByYMD;
                }
            });

            return viewModel;
        };

        return controller;
    })();

    // FullCalendar 기본 모듈은 category, dueDateClass 플래그를 모름. 때문에
    // 이곳에서 이벤트 핸들러를 등록해서 일정 생성 전에 isAllDay플래그를 보고
    // category를 수동으로 지정해준다
    controller.on('beforeCreateEvent', function(e) {
        var data = e.data;

        if (!data.category) {
            data.category = data.isAllDay ? 'allday' : 'time';
        }
    });

    /**
     * @type {object}
     */
    this.calendarColor = options.calendarColor || {};

    Calendar.call(this, options, container);
}

util.inherit(ServiceCalendar, Calendar);

ServiceCalendar.prototype.tmplKeys = ['milestone', 'task', 'allday', 'time'];

/**********
 * CRUD override
 **********/

/**
 * Create events instance and render calendar.
 * @param {ServiceCalendar~DoorayEvent[]} dataObjectList - array of {@see ServiceCalendar~DoorayEvent[]} object
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
ServiceCalendar.prototype.createEvent = function(dataObjectList, silent) {
    var calColor = this.calendarColor;

    util.forEach(dataObjectList, function(obj) {
        var color = calColor[obj.calendarID];

        if (color) {
            obj.color = color[0];
            obj.bgColor = color[1];
        }
    });

    Calendar.prototype.createEvent.call(this, dataObjectList, silent);
};

/**
 * @override
 * @param {string} id - id of event instance from server API
 * @returns {DoorayEvent} founded event instance.
 */
ServiceCalendar.prototype.getEvent = function(id) {
    return this.controller.events.single(function(model) {
        return model.id === id;
    });
};

/**
 * @override
 * @param {string} id - ID of event instance to update data
 * @param {object} data - data object to update event
 */
ServiceCalendar.prototype.updateEvent = function(id, data) {
    var ownEvents = this.controller.events,
        model = ownEvents.single(function(model) {
            return model.id === id;
        });

    if (model) {
        util.forEach(data, function(value, key) {
            model.set(key, value);
        });
        this.render();
        model.dirty(false);
    }
};

/**
 * Delete DoorayEvent instance
 * @override
 * @param {string} id - ID of event to delete
 */
ServiceCalendar.prototype.deleteEvent = function(id) {
    var ownEvents = this.controller.events,
        model = ownEvents.single(function(model) {
            return model.id === id;
        });

    if (model) {
        ownEvents.remove(model);
        this.render();
    }
};

/**********
 * Custom Events
 **********/

/**
 * 각 뷰의 클릭 핸들러와 사용자 클릭 이벤트 핸들러를 잇기 위한 브릿지 개념의 이벤트 핸들러
 * @emits ServiceCalendar#clickCalEvent
 * @param {object} clickEventData - 'clickCalEvent' 핸들러의 이벤트 데이터
 */
ServiceCalendar.prototype._onClick = function(clickEventData) {
    /**
     * @events ServiceCalendar#clickCalEvent
     * @type {object}
     * @property {DoorayEvent} model - 클릭 이벤트 블록과 관련된 일정 모델 인스턴스
     * @property {MouseEvent} jsEvent - 마우스 이벤트
     */
    this.fire('clickCalEvent', clickEventData);
};

/**
 * 캘린더 팩토리 클래스와 주뷰, 월뷰의 이벤트 연결을 토글한다
 * @param {boolean} isAttach - true면 이벤트 연결함.
 * @param {Week|Month} view - 주뷰 또는 월뷰
 * @param {ServiceCalendar} calendar - 캘린더 팩토리 클래스
 */
ServiceCalendar.prototype._toggleViewEvent = function(isAttach, view, calendar) {
    var handlers = view.handlers;

    util.forEach(handlers.click, function(handler) {
        if (isAttach) {
            handler.on('clickCalEvent', calendar._onClick, calendar);
            return;
        }

        handler.off('clickCalEvent', calendar._onClick, calendar);
    });
};

/**********
 * Methods
 **********/

/**
 * 같은 calendarID를 가진 모든 일정에 대해 글자색, 배경색을 재지정하고 뷰를 새로고침한다
 * @param {string} calendarID - calendarID value
 * @param {array} color - color array
 */
ServiceCalendar.prototype.changeCalendarColor = function(calendarID, color) {
    var calColor = this.calendarColor,
        ownEvents = this.controller.events;

    if (color.length !== 2) {
        config.throwError('Calendar#changeCalendarColor(): color 는 [color, bgColor] 형태여야 합니다.');
    }

    calColor[calendarID] = color.slice(0);

    ownEvents.each(function(model) {
        if (model.calendarID !== calendarID) {
            return;
        }

        model.color = color[0];
        model.bgColor = color[1];
    });

    this.render();
};

/**
 * 주뷰, 월뷰 간 전환
 * @override
 * @param {string} viewName - 'week', 'month' 중 하나
 * @param {boolean} [force=false] - true 지정시 뷰 전환이 없어도 전환을 위한 동작을 수행한다
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
ServiceCalendar.prototype.toggleView = function(viewName, force, silent) {
    var layout = this.layout,
        controller = this.controller,
        dragHandler = this.dragHandler,
        options = this.options,
        created;

    if (!force && this.currentViewName === viewName) {
        return;
    }
    
    layout.childs.doWhenHas(viewName, function(view) {
        this._toggleViewEvent(false, view, this);
    }, this);
    layout.clear();

    if (viewName === 'week') {
        created = serviceWeekViewFactory(controller, layout.container, dragHandler, options);
        layout.addChild(created.view);
        this._refreshMethod = created.refresh;
    } else if (viewName === 'month') {
        //TODO: month view. 
    }

    layout.childs.doWhenHas(viewName, function(view) {
        this._toggleViewEvent(true, view, this);
    }, this);

    this.currentViewName = viewName;

    if (!silent) {
        this.render();
    }
};

module.exports = ServiceCalendar;

