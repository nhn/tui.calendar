/**
 * @fileoverview Model of event.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../datetime');
var model = require('./model');

/**
 * The model of calendar events.
 * @constructor
 */
function Event() {
    var starts;

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
    starts = this.starts = new Date();

    /**
     * event ends
     * @type {Date}
     */
    this.ends = new Date(starts.getTime());
    this.ends.setMinutes(starts.getMinutes() + 31);

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
    var event = new Event();

    data = data || {};
    event.title = data.title || '';
    event.isAllDay = util.isExisty(data.isAllDay) ? data.isAllDay : false;
    event.starts = new Date(data.starts);
    event.ends = new Date(data.ends);

    return event;
};

/**********
 * prototype props
 **********/

/**
 * Check two event are equals (means title, isAllDay, starts, ends are same)
 * @param {Event} event Event model instance to compare.
 * @returns {boolean} Return false when not same.
 */
Event.prototype.equals = function(event) {
    if (this.title !== event.title) {
        return false;
    }

    if (this.isAllDay !== event.isAllDay) {
        return false;
    }

    if (datetime.compare(this.starts, event.starts) !== 0) {
        return false;
    }

    if (datetime.compare(this.ends, event.ends) !== 0) {
        return false;
    }

    return true;
};

/**
 * return duration between starts and ends.
 * TODO: applicable memoization patterns for duration.
 * @returns {Date} duration (UTC)
 */
Event.prototype.duration = function() {
    var starts = this.starts,
        ends = this.ends;

    if (this.isAllDay) {
        return new Date(datetime.MILLISECONDS_PER_DAY);
    }

    return new Date(ends - starts);
};

model.mixin(Event.prototype);

module.exports = Event;

