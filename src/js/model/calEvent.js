/* eslint complexity: 0 */
/**
 * @fileoverview Model of event.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var TZDate = require('../common/timezone').Date;
var datetime = require('../common/datetime');
var dirty = require('../common/dirty');
var model = require('../common/model');

/**
 * The model of calendar events.
 * @constructor
 * @mixes dirty
 * @mixes model
 */
function CalEvent() {
    /**
     * `Optional` unique id for various use.
     * @type {string}
     */
    this.id = '';

    /**
     * title for event.
     * @type {string}
     */
    this.title = '';

    /**
     * is event is all day event?
     * @type {boolean}
     */
    this.isAllDay = false;

    /**
     * event starts
     * @type {TZDate}
     */
    this.starts = null;

    /**
     * event ends
     * @type {TZDate}
     */
    this.ends = null;

    /**
     * event text color
     * @type {string}
     */
    this.color = '#000';

    /**
     * event block visibility
     * @type {boolean}
     */
    this.visible = true;

    /**
     * event background color
     * @type {string}
     */
    this.bgColor = '#a1b56c';

    // initialize model id
    util.stamp(this);
}

/**********
 * static props
 **********/

CalEvent.schema = {
    required: ['title'],
    dateRange: ['starts', 'ends']
};

/**
 * create event model from json(object) data.
 * @param {object} data object for model.
 * @returns {CalEvent} CalEvent model instance.
 */
CalEvent.create = function(data) {
    var inst = new CalEvent();
    inst.init(data);

    return inst;
};

/**********
 * prototype props
 **********/

/**
 * Initialize event instance.
 * @param {object} options options.
 */
CalEvent.prototype.init = function(options) {
    options = util.extend({}, options);

    this.id = options.id || '';
    this.title = options.title || '';
    this.isAllDay = util.isExisty(options.isAllDay) ? options.isAllDay : false;
    this.visible = util.isExisty(options.visible) ? options.visible : true;

    this.color = options.color || this.color;
    this.bgColor = options.bgColor || this.bgColor;
    this.borderColor = options.borderColor || this.borderColor;
    this.origin = options.origin || this.origin;

    if (this.isAllDay) {
        this.setAllDayPeriod(options.starts, options.ends);
    } else {
        this.setTimePeriod(options.starts, options.ends);
    }
};

CalEvent.prototype.setAllDayPeriod = function(starts, ends) {
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

CalEvent.prototype.setTimePeriod = function(starts, ends) {
    this.starts = new TZDate(starts || Date.now());
    this.ends = new TZDate(ends || this.starts);

    if (!ends) {
        this.ends.setMinutes(this.ends.getMinutes() + 30);
    }
};

/**
 * @returns {Date} render start date.
 */
CalEvent.prototype.getStarts = function() {
    return this.starts;
};

/**
 * @returns {Date} render end date.
 */
CalEvent.prototype.getEnds = function() {
    return this.ends;
};

/**
 * @returns {number} instance unique id.
 */
CalEvent.prototype.cid = function() {
    return util.stamp(this);
};

/**
 * Check two event are equals (means title, isAllDay, starts, ends are same)
 * @param {CalEvent} event CalEvent model instance to compare.
 * @returns {boolean} Return false when not same.
 */
CalEvent.prototype.equals = function(event) {
    if (this.id !== event.id) {
        return false;
    }

    if (this.title !== event.title) {
        return false;
    }

    if (this.isAllDay !== event.isAllDay) {
        return false;
    }

    if (datetime.compare(this.getStarts(), event.getStarts()) !== 0) {
        return false;
    }

    if (datetime.compare(this.getEnds(), event.getEnds()) !== 0) {
        return false;
    }

    if (this.color !== event.color) {
        return false;
    }

    if (this.bgColor !== event.bgColor) {
        return false;
    }

    if (this.borderColor !== event.borderColor) {
        return false;
    }

    return true;
};

/**
 * return duration between starts and ends.
 * @returns {Date} duration (UTC)
 */
CalEvent.prototype.duration = function() {
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
 * Returns true if the given CalEvent coincides with the same time as the
 * calling CalEvent.
 * @param {CalEvent} event The other event to compare with this CalEvent.
 * @returns {boolean} If the other event occurs within the same time as the first object.
 */
CalEvent.prototype.collidesWith = function(event) {
    var ownStarts = this.getStarts(),
        ownEnds = this.getEnds(),
        starts = event.getStarts(),
        ends = event.getEnds();

    if ((starts > ownStarts && starts < ownEnds) ||
        (ends > ownStarts && ends < ownEnds) ||
        (starts <= ownStarts && ends >= ownEnds)) {
        return true;
    }
    return false;
};

model.mixin(CalEvent.prototype);
dirty.mixin(CalEvent.prototype);

module.exports = CalEvent;
