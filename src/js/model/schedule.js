/* eslint complexity: 0 */
/**
 * @fileoverview Model of schedule.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var TZDate = require('../common/timezone').Date;
var datetime = require('../common/datetime');
var dirty = require('../common/dirty');
var model = require('../common/model');

/**
 * 일정 카테고리
 * @readonly
 * @enum {string}
 */
var SCHEDULE_CATEGORY = {
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
 * The model of calendar schedules.
 * @constructor
 * @mixes dirty
 * @mixes model
 */
function Schedule() {
    /**
     * `Optional` unique id for various use.
     * @type {string}
     */
    this.id = '';

    /**
     * title for schedule.
     * @type {string}
     */
    this.title = '';

    /**
     * is schedule is all day schedule?
     * @type {boolean}
     */
    this.isAllDay = false;

    /**
     * schedule starts
     * @type {TZDate}
     */
    this.starts = null;

    /**
     * schedule ends
     * @type {TZDate}
     */
    this.ends = null;

    /**
     * schedule text color
     * @type {string}
     */
    this.color = '#000';

    /**
     * schedule block visibility
     * @type {boolean}
     */
    this.visible = true;

    /**
     * schedule background color
     * @type {string}
     */
    this.bgColor = '#a1b56c';

    /**
     * schedule left border color
     * @type {string}
     */
    this.borderColor = '#000';

    /**
     * 캘린더 ID
     * @type {string}
     */
    this.calendarId = '';

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
     * 커스텀 스타일
     * @type {string}
     */
    this.customStyle = '';

    /**
     * in progress flag to do something
     * @type {boolean}
     */
    this.isPending = false;

    /**
     * focused schedule flag
     * @type {boolean}
     */
    this.isFocused = false;

    /**
     * 렌더링과 관계 없는 별도 데이터 저장 공간.
     * @type {object}
     */
    this.raw = null;

    // initialize model id
    util.stamp(this);
}

/**********
 * static props
 **********/

Schedule.schema = {
    required: ['title'],
    dateRange: ['starts', 'ends']
};

/**
 * create schedule model from json(object) data.
 * @param {object} data object for model.
 * @returns {Schedule} Schedule model instance.
 */
Schedule.create = function(data) {
    var inst = new Schedule();
    inst.init(data);

    return inst;
};

/**********
 * prototype props
 **********/

/**
 * Initialize schedule instance.
 * @param {object} options options.
 */
Schedule.prototype.init = function(options) {
    options = util.extend({}, options);
    if (options.category === SCHEDULE_CATEGORY.ALLDAY) {
        options.isAllDay = true;
    }

    this.id = options.id || '';
    this.title = options.title || '';
    this.isAllDay = util.isExisty(options.isAllDay) ? options.isAllDay : false;
    this.visible = util.isExisty(options.visible) ? options.visible : true;

    this.color = options.color || this.color;
    this.bgColor = options.bgColor || this.bgColor;
    this.borderColor = options.borderColor || this.borderColor;
    this.calendarId = options.calendarId || '';
    this.category = options.category || '';
    this.dueDateClass = options.dueDateClass || '';
    this.customStyle = options.customStyle || '';
    this.isPending = options.isPending || false;
    this.isFocused = options.isFocused || false;

    if (this.isAllDay) {
        this.setAllDayPeriod(options.starts, options.ends);
    } else {
        this.setTimePeriod(options.starts, options.ends);
    }

    if (options.category === SCHEDULE_CATEGORY.MILESTONE ||
        options.category === SCHEDULE_CATEGORY.TASK) {
        this.starts = new TZDate(this.ends);
    }

    this.raw = options.raw || null;
};

Schedule.prototype.setAllDayPeriod = function(starts, ends) {
    // 종일일정인 경우 문자열의 날짜정보만 사용한다.
    if (util.isString(starts)) {
        starts = datetime.parse(starts.substring(0, 10));
    }
    if (util.isString(ends)) {
        ends = datetime.parse(ends.substring(0, 10));
    }

    this.starts = starts;
    this.starts.setHours(0, 0, 0);
    this.ends = ends || new TZDate(this.starts);
    this.ends.setHours(23, 59, 59);
};

Schedule.prototype.setTimePeriod = function(starts, ends) {
    this.starts = new TZDate(starts || Date.now());
    this.ends = new TZDate(ends || this.starts);

    if (!ends) {
        this.ends.setMinutes(this.ends.getMinutes() + 30);
    }
};

/**
 * @returns {Date} render start date.
 */
Schedule.prototype.getStarts = function() {
    return this.starts;
};

/**
 * @returns {Date} render end date.
 */
Schedule.prototype.getEnds = function() {
    return this.ends;
};

/**
 * @returns {number} instance unique id.
 */
Schedule.prototype.cid = function() {
    return util.stamp(this);
};

/**
 * Check two schedule are equals (means title, isAllDay, starts, ends are same)
 * @param {Schedule} schedule Schedule model instance to compare.
 * @returns {boolean} Return false when not same.
 */
Schedule.prototype.equals = function(schedule) {
    if (this.id !== schedule.id) {
        return false;
    }

    if (this.title !== schedule.title) {
        return false;
    }

    if (this.isAllDay !== schedule.isAllDay) {
        return false;
    }

    if (datetime.compare(this.getStarts(), schedule.getStarts()) !== 0) {
        return false;
    }

    if (datetime.compare(this.getEnds(), schedule.getEnds()) !== 0) {
        return false;
    }

    if (this.color !== schedule.color) {
        return false;
    }

    if (this.bgColor !== schedule.bgColor) {
        return false;
    }

    if (this.borderColor !== schedule.borderColor) {
        return false;
    }

    return true;
};

/**
 * return duration between starts and ends.
 * @returns {Date} duration (UTC)
 */
Schedule.prototype.duration = function() {
    var starts = this.getStarts(),
        ends = this.getEnds(),
        duration;

    if (this.isAllDay) {
        duration = new TZDate(datetime.end(ends) - datetime.start(starts));
    } else {
        duration = new TZDate(ends - starts);
    }

    return duration;
};

/**
 * Returns true if the given Schedule coincides with the same time as the
 * calling Schedule.
 * @param {Schedule} schedule The other schedule to compare with this Schedule.
 * @returns {boolean} If the other schedule occurs within the same time as the first object.
 */
Schedule.prototype.collidesWith = function(schedule) {
    var ownStarts = this.getStarts(),
        ownEnds = this.getEnds(),
        starts = schedule.getStarts(),
        ends = schedule.getEnds();

    if ((starts > ownStarts && starts < ownEnds) ||
        (ends > ownStarts && ends < ownEnds) ||
        (starts <= ownStarts && ends >= ownEnds)) {
        return true;
    }
    return false;
};

model.mixin(Schedule.prototype);
dirty.mixin(Schedule.prototype);

module.exports = Schedule;
