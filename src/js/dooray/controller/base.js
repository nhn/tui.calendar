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
 * @param {object} options Data object to create event.
 * @param {boolean} silent - set true then don't fire events.
 * @returns {Event} The instance of Event that created.
 */
DoorayBase.prototype.createEvent = function(options, silent) {
    var event = this.addEvent(DoorayEvent.create(options));

    if (!silent) {
        /**
         * @event Base#createdEvent
         * @type {Event}
         */
        this.fire('createdEvent', event);
    }

    return event;
};

module.exports = DoorayBase;

