/**
 * @fileoverview Base controller for Dooray service project.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var Base = require('../../controller/base');
var DoorayEvent = require('../model/calEvent');

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
 * @emits Base#beforeCreateEvent
 * @emits Base#createdEvent
 * @param {ServiceCalendar~CalEvent} data - Data object to create event.
 * @param {boolean} silent - set true then don't fire events.
 * @returns {DoorayEvent} The instance of CalEvent that created.
 */
DoorayBase.prototype.createEvent = function(data, silent) {
    var inst,
        eventData = {
            data: data
        };

    /**
     * @event Base#beforeCreateEvent
     * @type {ServiceCalendar~Events[]}
     */
    if (!this.invoke('beforeCreateEvent', eventData)) {
        return;
    }

    inst = this.addEvent(DoorayEvent.create(data));

    if (!silent) {
        /**
         * @event Base#createdEvent
         * @type {DoorayEvent}
         */
        this.fire('createdEvent', inst);
    }

    return inst;
};

/**
 * @emits Base#beforeCreateEvent
 * @emits Base#createdEvent
 * @param {ServiceCalendar~CalEvent[]} dataList - dataObject list to create event.
 * @param {boolean} [silent=false] - set true then don't fire events.
 * @returns {DoorayEvent[]} The instance list of CalEvent that created.
 */
DoorayBase.prototype.createEvents = function(dataList, silent) {
    return util.map(dataList, function(data) {
        return this.createEvent(data, silent);
    }, this);
};

module.exports = DoorayBase;

