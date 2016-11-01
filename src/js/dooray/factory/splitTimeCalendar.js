/**
 * @fileoverview Calendar for service.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var Handlebars = require('handlebars-template-loader/runtime');

var config = require('../../config'),
    controllerFactory = require('../../factory/controller'),
    serviceWeekViewFactory = require('./splitTimeView'),
    datetime = require('../../common/datetime'),
    Layout = require('../../view/layout');

function SplitCalendarView(options, container) {
    if (!(this instanceof SplitCalendarView)) {
        return new SplitCalendarView(options, container);
    }
    var opt;

    /**
     * default option from service page
     * @type {object}
     */
    this.options = opt = util.extend({
        controller: null,
        defaultDate: datetime.format(new Date(), 'YYYY-MM-DD'),
        template: util.extend({
            time: null
        }, util.pick(options, 'template') || {}),
        renderStartDate: '2016-10-31 09:40:00',
        renderEndDate: '2016-10-31 12:40:00',
        events: [],
        calendarColor: {},
        disableHourMarker: true
    }, options);

    this.calendarColor = opt.calendarColor;

    this.container = container;

    /**
     * Current rendered date
     * @type {Date}
     */
    this.setRenderTime();

    /**
     * base controller
     * @type {Base}
     */
    this.controller = opt.controller || this.createController();

    /**
     * layout view (layout manager)
     * @type {Layout}
     */
    this.layout = new Layout(container);

    /**
     * Refresh method. it can be ref different functions for each view modes.
     * @type {function}
     */
    this.refreshMethod = null;

    this.initialize();
}


SplitCalendarView.prototype.setRenderTime = function() {
    var opt = this.options;
    opt.hourStart = new Date(opt.renderStartDate).getHours() - 2;
    opt.hourEnd = new Date(opt.renderEndDate).getHours() + 2;
    this.renderDate = datetime.format(new Date(opt.renderStartDate), 'YYYY-MM-DD');
};

/**
 * Initialize calendar
 */
SplitCalendarView.prototype.initialize = function() {
    var controller = this.controller,
      opt = this.options;

    this.layout.controller = controller;

    if (opt.events && opt.events.length) {
        this.createEvents(opt.events, true);
    }

    util.forEach(opt.template, function(func, name) {
        if (func) {
            Handlebars.registerHelper(name + '-tmpl', func);
        }
    });

    var created = this.createView(
      controller,
      this.layout.container,
      this.dragHandler,
      opt
    );
    this.layout.addChild(created.view);
    this.refreshMethod = created.refresh;

    this.render();
};

/**
 * Render calendar.
 */
SplitCalendarView.prototype.render = function() {
    this.layout.render();
};

SplitCalendarView.prototype.destroy = function() {
    console.log('?')
    //this.dragHandler.destroy();
    this.controller.off();
    this.layout.clear();
    this.layout.destroy();

    this.options = this.renderDate = this.controller =
      this.layout = this.dragHandler = this.viewName =
        this.refreshMethod = null;
};

/**
 * 캘린더 팩토리 클래스와 주뷰, 월뷰의 이벤트 연결을 토글한다
 * @param {boolean} isAttach - true면 이벤트 연결함.
 * @param {Week|Month} view - 주뷰 또는 월뷰
 */
SplitCalendarView.prototype._toggleViewEvent = function(isAttach, view) {
    var self = this,
      handler = view.handler,
      method = isAttach ? 'on' : 'off';

    util.forEach(handler.click, function(clickHandler) {
        clickHandler[method]('clickEvent', self._onClick, self);
    });
};

/**
 * @override
 */
SplitCalendarView.prototype.createController = function() {
    return controllerFactory(this.options);
};

/**
 * @override
 */
SplitCalendarView.prototype.createView = function(controller, container, dragHandler, options) {
    return serviceWeekViewFactory(
        controller,
        container,
        dragHandler,
        options
    );
};

/**********
 * CRUD override
 **********/

/**
 * Create events instance and render calendar.
 * @param {SplitCalendarView~DoorayEvent[]} dataObjectList - array of {@see SplitCalendarView~DoorayEvent[]} object
 * @param {boolean} [silent=false] - no auto render after creation when set true
 */
SplitCalendarView.prototype.createEvents = function(dataObjectList, silent) {
    var calColor = this.calendarColor,
        self = this,
        parseRenderStartTime = new Date(this.options.renderStartDate); //cache

    util.forEach(dataObjectList, function(obj) {
        self.filterEvent(obj, parseRenderStartTime);
        var color = calColor[obj.calendarID];

        if (color) {
            obj.color = color.color;
            obj.bgColor = color.bgColor;
        }
    });

    this.controller.createEvents(dataObjectList, silent);
    if (!silent) {
        this.render();
    }
};

SplitCalendarView.prototype.filterEvent = function(event, startTime) {
    var parseDate = new Date(event.starts);
    event.origin = {
        starts: event.starts,
        ends: event.ends
    };
    if (this.options.hourStart > parseDate.getHours()
      && datetime.isSameDate(parseDate, startTime)) {
        event.starts = parseDate.setHours(this.options.hourStart);
    }
    console.log(event)
};

/**
 * @override
 * @param {string} id - ID of event instance to update data
 * @param {object} data - data object to update event
 */
SplitCalendarView.prototype.updateEvent = function(id, data) {
    var ctrl = this.controller,
        ownEvents = ctrl.events,
        calEvent = ownEvents.single(function(model) {
            return model.id === id;
        });

    if (calEvent) {
        ctrl.updateEvent(calEvent, data);
        this.render();
    }
};

/**
 * Delete DoorayEvent instance
 * @override
 * @fires SplitCalendarView#beforeDeleteEvent
 * @param {string} id - ID of event to delete
 */
SplitCalendarView.prototype.deleteEvent = function(id) {
    var ctrl = this.controller,
        ownEvents = ctrl.events,
        calEvent = ownEvents.single(function(model) {
            return model.id === id;
        });

    if (!calEvent) {
        return;
    }

    /**
     * @event SplitCalendarView#beforeDeleteEvent
     * @type {object}
     * @property {CalEvent} model - model instance to delete
     */
    this.fire('beforeDeleteEvent', {
        model: calEvent
    });

    ctrl.deleteEvent(calEvent);
    this.render();
};

/**********
 * Methods
 **********/

/**
 * 현재 화면의 각 영역에 대한 높이 값을 반환한다.
 * @returns {number[]} splitter와 autoHeight를 제외한 나머지 패널의 높이 배열
 */
SplitCalendarView.prototype.getLayoutData = function() {
    return this.layout.vLayout.getLayoutData();
};

/**
 * 같은 calendarID를 가진 모든 일정에 대해 글자색, 배경색을 재지정하고 뷰를 새로고침한다
 * @param {string} calendarID - calendarID value
 * @param {object} option - color data object
 *  @param {string} option.color - text color of event element
 *  @param {string} option.bgColor - bg color of event element
 *  @param {boolean} [option.render=true] - set false then does not auto render.
 */
SplitCalendarView.prototype.setCalendarColor = function(calendarID, option) {
    var calColor = this.calendarColor,
        ownEvents = this.controller.events,
        ownColor = calColor[calendarID];

    if (!util.isObject(option)) {
        config.throwError('Calendar#changeCalendarColor(): color 는 {color: \'\', bgColor: \'\'} 형태여야 합니다.');
    }

    ownColor = calColor[calendarID] = util.extend({
        color: '#000',
        bgColor: '#a1b56c',
        render: true
    }, option);

    ownEvents.each(function(model) {
        if (model.calendarID !== calendarID) {
            return;
        }

        model.color = ownColor.color;
        model.bgColor = ownColor.bgColor;
    });

    if (ownColor.render) {
        this.render();
    }
};

util.CustomEvents.mixin(SplitCalendarView);

module.exports = SplitCalendarView;

