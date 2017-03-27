/**
 * @fileoverview Extend model class for Dooray Calendar project.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var TZDate = require('../../common/timezone').Date;
var CalEvent = require('../../model/calEvent');

/**
 * 일정 카테고리
 * @readonly
 * @enum {string}
 */
var EVENT_CATEGORY = {
    /** 마일스톤 */
    MILESTONE: 'milestone',

    /** 업무 */
    TASK: 'task',

    /** 종일일정 */
    ALLDAY: 'allday',

    /** 시간별 일정 */
    TIME: 'time'
};

/**
 * CalEvent class for dooray project
 * @constructor
 * @extends {CalEvent}
 */
function DoorayEvent() {
    CalEvent.call(this);

    /**
     * 캘린더 ID
     * @type {string}
     */
    this.calendarID = '';

    /**
     * 일정 카테고리 (마일스톤, 업무, 종일일정, 시간별일정)
     * @type {string}
     */
    this.category = '';

    /**
     * 업무 일정의 경우 구분 (출근전, 점심전, 퇴근전)
     * @type {string}
     */
    this.dueDateClass = '';

    /**
     * 렌더링과 관계 없는 별도 데이터 저장 공간.
     * @type {object}
     */
    this.raw = null;
}

util.inherit(DoorayEvent, CalEvent);

/**
 * @override
 */
DoorayEvent.create = function(data) {
    var inst = new DoorayEvent();
    inst.init(data);

    return inst;
};

/**
 * @override
 * @param {object} options options.
 */
DoorayEvent.prototype.init = function(options) {
    options = options || {};

    options.isAllDay = options.category === EVENT_CATEGORY.ALLDAY;
    CalEvent.prototype.init.call(this, options);

    this.calendarID = options.calendarID;
    this.category = options.category;
    this.dueDateClass = options.dueDateClass;
    this.isPending = options.isPending;

    if (options.category === EVENT_CATEGORY.MILESTONE ||
        options.category === EVENT_CATEGORY.TASK) {
        this.starts = new TZDate(this.ends);
        this.starts.setMinutes(this.starts.getMinutes() - 30);
    }

    this.raw = options.raw || null;
};

module.exports = DoorayEvent;

