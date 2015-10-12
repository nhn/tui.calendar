/**
 * @fileoverview Extend model class for Dooray Calendar project.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var Event = require('../../model/event');
var enums = require('../enums');

/**
 * Event class for dooray project
 * @constructor
 * @extends {Event}
 */
function DoorayEvent() {
    Event.call(this);

    /**
     * 일정 카테고리 (마일스톤, 업무, 일반일정)
     * @type {string}
     */
    this.category = '';

    /**
     * 업무 일정의 경우 구분 (출근전, 점심전, 퇴근전)
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
     * 장소정보
     * @type {string}
     */
    this.location = '';

    /**
     * 기타정보
     * @type {object}
     */
    this.raw = null;
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

    this.category = options.category || enums.model.EVENT_CATEGORY.GENERAL;
    this.dueDateClass = options.dueDateClass || '';
};

/**
 * Marshal data to communicate with dooray API server
 * @returns {object} - data object that accept from dooray API server
 */
DoorayEvent.prototype.marshal = function() {
    var result = util.extend({}, this.raw);

    result.subject = this.title;
    result.category = this.category;
    result.dueDateClass = this.dueDateClass;
    result.wholeDayFlag = this.isAllDay;
    result.startedAt = this.starts.toISOString();
    result.endedAt = this.ends.toISOString();
    result.body = this.body;
    result.detailUrl = this.detailUrl;
    result.location = this.location;

    return result;
};

/**
 * Unmarshal data from server response data object
 * @param {object} dataObject - data object from dooray API server
 */
DoorayEvent.prototype.unmarshal = function(dataObject) {
    var starts,
        ends,
        body;

    dataObject = dataObject || {};

    this.title = dataObject.subject;
    this.category = dataObject.category;
    this.dueDateClass = dataObject.dueDateClass;
    this.isAllDay = util.isExisty(dataObject.wholeDayFlag) ? dataObject.wholeDayFlag : false;
    this.detailUrl = dataObject.detailUrl || '';
    this.location = dataObject.location || '';

    if (this.category === enums.model.EVENT_CATEGORY.GENERAL) {
        starts = new Date(dataObject.startedAt);
        ends = new Date(dataObject.endedAt);
    } else {
        // 마일스톤, 업무 일정은 종료일 기준으로 계산
        starts = new Date(dataObject.dueDate);
        ends = new Date(+starts)

        // 일정 시작시간을 종료시간 30분 전으로 지정
        starts.setMinutes(starts.getMinutes() - 30);
    }

    this.starts = starts;
    this.ends = ends;

    body = util.pick(dataObject, 'body');
    if (body) {
        this.body.mimeType = body.mimeType;
        this.body.content = body.content;
    }

    this.raw = dataObject;
};

module.exports = DoorayEvent;

