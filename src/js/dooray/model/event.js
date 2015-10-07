/**
 * @fileoverview Extend model class for Dooray Calendar project.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var Event = require('../../model/event');
var doorayConfig = require('../config');

/**
 * Event class for dooray project
 * @constructor
 * @extends {Event}
 */
function DoorayEvent() {
    Event.apply(this);

    /**
     * 일정 카테고리
     * @type {EVENT_CATEGORY}
     */
    this.category = doorayConfig.model.EVENT_CATEGORY.GENERAL;

    /**
     * 일정 마감 분류
     * @type {string}
     */
    this.dueDateClass = '';

    /**
     * 일정 내용 본문 정보
     * @type {object}
     */
    this.body = {
        mimeType: '',
        content: ''
    }; 

    /**
     * 상세정보 url
     * @type {string}
     */
    this.detailUrl = '';

    /**
     * 기타정보
     * @type {object}
     */
    this.raw = null;
}

util.inherit(DoorayEvent, Event);

/**
 * create event model from json(object) data.
 * @override
 * @param {object} data object for model.
 * @returns {Event} DoorayEvent model instance.
 */
DoorayEvent.createEvent = function(data) {
    var event = new DoorayEvent();

    event.init(data);

    return event;
};

/**
 * Initialize event instance.
 * @override
 * @param {object} options options.
 */
DoorayEvent.prototype.init = function(options) {
    var starts,
        ends,
        body;

    options = options || {};

    this.title = options.subject;
    this.category = options.category;
    this.dueDateClass = options.dueDateClass;
    this.isAllDay = util.isExisty(options.wholeDayFlag) ? options.wholeDayFlag : false;
    this.detailUrl = options.detailUrl || '';

    if (this.category === doorayConfig.model.EVENT_CATEGORY.GENERAL) {
        starts = new Date(options.startedAt);
        ends = new Date(options.endedAt);
    } else {
        // 마일스톤, 업무 일정은 종료일 기준으로 계산
        starts = new Date(options.dueDate);
        ends = new Date(+starts)

        // 일정 시작시간을 종료시간 30분 전으로 지정
        starts.setMinutes(starts.getMinutes() - 30);
    }

    this.starts = starts;
    this.ends = ends;

    body = util.pick(options, 'body');
    if (body) {
        this.body.mimeType = body.mimeType;
        this.body.content = body.content;
    }

    this.raw = options;
};

module.exports = DoorayEvent;

