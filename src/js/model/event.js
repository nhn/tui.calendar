/**
 * @fileoverview Model of event.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../common/datetime');
var dirty = require('../common/dirty');
var model = require('../common/model');

/**
 * The model of calendar events.
 * @constructor
 * @mixes dirty
 * @mixes model
 */
function Event() {
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
     * @type {Date}
     */
    this.starts = null;

    /**
     * event ends
     * @type {Date}
     */
    this.ends = null;

    /**
     * event text color
     * @type {string}
     */
    this.color = '#000';

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

Event.schema = {
    required: ['title'],
    dateRange: ['starts', 'ends']
};

/**
 * create event model from json(object) data.
 * @param {object} data object for model.
 * @returns {Event} Event model instance.
 */
Event.create = function(data) {
    var inst = new Event();
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
Event.prototype.init = function(options) {
    options = options || {};

    this.id = options.id || '';
    this.title = options.title || '';
    this.isAllDay = util.isExisty(options.isAllDay) ? options.isAllDay : false;

    if (options.starts) {
        this.starts = new Date(options.starts);
    } else {
        this.starts = new Date();
    }

    if (options.ends) {
        this.ends = new Date(options.ends);
    } else {
        this.ends = new Date(this.starts.getTime());
        this.ends.setMinutes(this.ends.getMinutes() + 30);
    }

    this.color = options.color || this.color;
    this.bgColor = options.bgColor || this.bgColor;
};

/**
 * @returns {Date} render start date.
 */
Event.prototype.getStarts = function() {
    return this.starts;
};

/**
 * @returns {Date} render end date.
 */
Event.prototype.getEnds = function() {
    return this.ends;
};

/**
 * @returns {number} instance unique id.
 */
Event.prototype.cid = function() {
    return util.stamp(this);
};

/**
 * Check two event are equals (means title, isAllDay, starts, ends are same)
 * @param {Event} event Event model instance to compare.
 * @returns {boolean} Return false when not same.
 */
Event.prototype.equals = function(event) {
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

    return true;
};

/**
 * return duration between starts and ends.
 * @returns {Date} duration (UTC)
 */
Event.prototype.duration = function() {
    var starts = this.getStarts(),
        ends = this.getEnds(),
        duration;

    if (this.isAllDay) {
        duration = new Date(datetime.end(ends) - datetime.start(starts));
    } else {
        duration = new Date(ends - starts);
    }

    return duration;
};

/**
 * Returns true if the given Event coincides with the same time as the
 * calling Event.
 * @param {Event} event The other event to compare with this Event.
 * @returns {boolean} If the other event occurs within the same time as the first object.
 */
Event.prototype.collidesWith = function(event) {
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

model.mixin(Event.prototype);
dirty.mixin(Event.prototype);

module.exports = Event;

