/* eslint complexity: 0 */
/**
 * @fileoverview Model of schedule.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var TZDate = require('../common/timezone').Date;
var datetime = require('../common/datetime');
var dirty = require('../common/dirty');
var model = require('../common/model');

/**
 * Schedule category
 * @readonly
 * @enum {string}
 */
var SCHEDULE_CATEGORY = {
    /** milestone */
    MILESTONE: 'milestone',

    /** task */
    TASK: 'task',

    /** all-day schedule */
    ALLDAY: 'allday',

    /** normal schedule */
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
     * schedule start
     * @type {TZDate}
     */
    this.start = null;

    /**
     * schedule end
     * @type {TZDate}
     */
    this.end = null;

    /**
     * schedule text color
     * @type {string}
     */
    this.color = '#000';

    /**
     * schedule block visibility
     * @type {boolean}
     */
    this.isVisible = true;

    /**
     * schedule background color
     * @type {string}
     */
    this.bgColor = '#a1b56c';

    /**
     * schedule background color when dragging it
     * @type {string}
     */
    this.dragBgColor = '#a1b56c';

    /**
     * schedule left border color
     * @type {string}
     */
    this.borderColor = '#000';

    /**
     * calendar ID
     * @type {string}
     */
    this.calendarId = '';

    /**
     * Schedule category(milestone, task, allday, time)
     * @type {string}
     */
    this.category = '';

    /**
     * Classification of work schedules (before work, before lunch, before work)
     * @type {string}
     */
    this.dueDateClass = '';

    /**
     * Custom style for schedule element
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
     * read-only schedule flag
     * @type {boolean}
     */
    this.isReadOnly = false;

    /**
     * Separate data storage space independent of rendering.
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
    dateRange: ['start', 'end']
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
    this.isVisible = util.isExisty(options.isVisible) ? options.isVisible : true;

    this.color = options.color || this.color;
    this.bgColor = options.bgColor || this.bgColor;
    this.dragBgColor = options.dragBgColor || this.dragBgColor;
    this.borderColor = options.borderColor || this.borderColor;
    this.calendarId = options.calendarId || '';
    this.category = options.category || '';
    this.dueDateClass = options.dueDateClass || '';
    this.customStyle = options.customStyle || '';
    this.isPending = options.isPending || false;
    this.isFocused = options.isFocused || false;
    this.isReadOnly = options.isReadOnly || false;

    if (this.isAllDay) {
        this.setAllDayPeriod(options.start, options.end);
    } else {
        this.setTimePeriod(options.start, options.end);
    }

    if (options.category === SCHEDULE_CATEGORY.MILESTONE ||
        options.category === SCHEDULE_CATEGORY.TASK) {
        this.start = new TZDate(this.end);
    }

    this.raw = options.raw || null;
};

Schedule.prototype.setAllDayPeriod = function(start, end) {
    // If it is an all-day schedule, only the date information of the string is used.
    if (util.isString(start)) {
        start = datetime.parse(start.substring(0, 10));
    }
    if (util.isString(end)) {
        end = datetime.parse(end.substring(0, 10));
    }

    this.start = start;
    this.start.setHours(0, 0, 0);
    this.end = end || new TZDate(this.start);
    this.end.setHours(23, 59, 59);
};

Schedule.prototype.setTimePeriod = function(start, end) {
    this.start = new TZDate(start || Date.now());
    this.end = new TZDate(end || this.start);

    if (!end) {
        this.end.setMinutes(this.end.getMinutes() + 30);
    }
};

/**
 * @returns {Date} render start date.
 */
Schedule.prototype.getStarts = function() {
    return this.start;
};

/**
 * @returns {Date} render end date.
 */
Schedule.prototype.getEnds = function() {
    return this.end;
};

/**
 * @returns {number} instance unique id.
 */
Schedule.prototype.cid = function() {
    return util.stamp(this);
};

/**
 * Check two schedule are equals (means title, isAllDay, start, end are same)
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

    if (this.dragBgColor !== schedule.dragBgColor) {
        return false;
    }

    if (this.borderColor !== schedule.borderColor) {
        return false;
    }

    return true;
};

/**
 * return duration between start and end.
 * @returns {Date} duration (UTC)
 */
Schedule.prototype.duration = function() {
    var start = this.getStarts(),
        end = this.getEnds(),
        duration;

    if (this.isAllDay) {
        duration = new TZDate(datetime.end(end) - datetime.start(start));
    } else {
        duration = new TZDate(end - start);
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
        start = schedule.getStarts(),
        end = schedule.getEnds();

    if ((start > ownStarts && start < ownEnds) ||
        (end > ownStarts && end < ownEnds) ||
        (start <= ownStarts && end >= ownEnds)) {
        return true;
    }

    return false;
};

model.mixin(Schedule.prototype);
dirty.mixin(Schedule.prototype);

module.exports = Schedule;
