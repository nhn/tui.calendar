/**
 * @fileoverview Model of event.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../datetime');
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
     * event duration.
     * @type {Date}
     */
    this._duration = null;

    /**
     * @type {object.<string, *>}
     */
    this._changed = {};

    this.init();

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

    event.init(data);

    return event;
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
};

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
        ends = this.ends,
        duration;

    if (this.isAllDay) {
        duration = new Date(datetime.end(ends) - datetime.start(starts));
    } else {
        duration = new Date(ends - starts);
    }

    if (!this._duration || this.isDirty()) {
        this._duration = duration;
    }

    return this._duration;
};

model.mixin(Event.prototype);
dirty.mixin(Event.prototype);

module.exports = Event;

