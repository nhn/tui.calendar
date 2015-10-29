/**
 * @fileoverview Extend model class for Dooray Calendar project.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var Event = require('../../model/event');

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
 * Event class for dooray project
 * @constructor
 * @extends {Event}
 */
function DoorayEvent() {
    Event.call(this);

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
}

util.inherit(DoorayEvent, Event);

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

    Event.prototype.init.call(this, options);

    this.isAllDay = options.category === EVENT_CATEGORY.ALLDAY;
    this.category = options.category;
    this.dueDateClass = options.dueDateClass;

    if (options.category === EVENT_CATEGORY.MILESTONE ||
        options.category === EVENT_CATEGORY.TASK) {
        this.starts = new Date(+this.ends);
        this.starts.setMinutes(this.starts.getMinutes() - 30);
    }
};

module.exports = DoorayEvent;

