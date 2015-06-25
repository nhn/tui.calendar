/**
 * @fileoverview Model of event.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

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
    required: ['title']
};

model.mixin(Event.prototype);

module.exports = Event;

