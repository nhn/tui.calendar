/**
 * @fileoverview Model of event.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var moment = require('moment');
var model = require('./model');

/**
 * The model of calendar events.
 * @constructor
 */
function Event() {
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
     * @type {Moment}
     */
    this.starts = moment();

    /**
     * event ends
     * @type {Moment}
     */
    this.ends = moment();

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
    event.starts = moment(data.starts);
    event.ends = moment(data.ends);

    return event;
};

/**********
 * prototype props
 **********/

/**
 * Check two event are same.
 * @param {Event} event Event model instance to compare.
 * @returns {boolean} Return false when not same.
 */
Event.prototype.isSame = function(event) {
    if (this.title !== event.title) {
        return false;
    }

    if (this.isAllDay !== event.isAllDay) {
        return false;
    }

    if (!this.starts.isSame(event.starts)) {
        return false;
    }

    if (!this.ends.isSame(event.ends)) {
        return false;
    }

    return true;
};

/**
 * return duration between starts and ends.
 * @returns {moment.Duration} duration
 */
Event.prototype.duration = function() {
    var starts = this.starts,
        ends = this.ends;

    if (this.isAllDay) {
        return moment.duration('24:00:00');
    }

    return moment.duration(ends.diff(starts));
};

model.mixin(Event.prototype);

module.exports = Event;

