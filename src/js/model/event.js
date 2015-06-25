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
     * @type {Date}
     */
    this.starts = null;

    /**
     * event ends
     * @type {Date}
     */
    this.ends = null;
}

/**********
 * static props
 **********/

Event.schema = {
    required: ['title'],
    dateRange: ['starts', 'ends']
};

/**********
 * prototype props
 **********/

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

    if (util.isExisty(starts) && util.isExisty(ends)) {
        return moment.duration(ends.diff(starts));
    }

    return moment.duration();
};

model.mixin(Event.prototype);

module.exports = Event;

