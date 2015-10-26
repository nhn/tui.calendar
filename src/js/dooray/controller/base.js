/**
 * @fileoverview Base controller for Dooray service project.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var Base = require('../../controller/base');
var DoorayEvent = require('../model/event');

/**
 * @constructor
 * @param {object} options - options for base controller
 * @param {function} [options.groupFunc] - function for group each models {@see Collection#groupBy}
 * @extends {Base}
 */
function DoorayBase(options) {
    Base.call(this, options);
}

util.inherit(DoorayBase, Base);

/**********
 * CRUD override
 **********/

/**
 * Create an event instance from raw data.
 * @override
 * @emits Base#createdEvent
 * @param {ServiceCalendar~Events} data - Data object to create event.
 * @param {boolean} silent - set true then don't fire events.
 * @returns {DoorayEvent} The instance of Event that created.
 */
DoorayBase.prototype.createEvent = function(data, silent) {
    var event = this.addEvent(DoorayEvent.create(data));

    if (!silent) {
        /**
         * @event Base#createdEvent
         * @type {DoorayEvent}
         */
        this.fire('createdEvent', event);
    }

    return event;
};

/**
 * @emits Base#createdEvent
 * @param {ServiceCalendar~Events[]} dataList - dataObject list to create event.
 * @param {boolean} [silent=false] - set true then don't fire events.
 * @returns {DoorayEvent[]} The instance list of Event that created.
 */
DoorayBase.prototype.createEvents = function(dataList, silent) {
    var events = [];

    util.forEach(dataList, function(data) {
        var inst = DoorayEvent.create(data);
        events.push(inst);

        this.addEvent(inst);
    }, this);

    if (!silent) {
        /**
         * @event Base#createdEvent
         * @type {DoorayEvent[]}
         */
        this.fire('createdEvent', events);
    }

    return events;
};

module.exports = DoorayBase;

