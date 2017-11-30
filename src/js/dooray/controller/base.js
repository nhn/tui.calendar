/* eslint complexity: 0 */
/**
 * @fileoverview Base controller for Dooray service project.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var Base = require('../../controller/base');
var DoorayEvent = require('../model/calEvent');
var TZDate = require('../../common/timezone').Date;

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
 * Update an event.
 * @emits DoorayBase#updateEvent
 * @param {CalEvent} calEvent - event instance to update
 * @param {object} options updated object data
 * @returns {CalEvent|boolean} updated event instance, when it fail then return false
 */
DoorayBase.prototype.updateEvent = function(calEvent, options) {
    var starts = options.starts || calEvent.starts;
    var ends = options.ends || calEvent.ends;

    if (options.title) {
        calEvent.set('title', options.title);
    }

    if (options.isAllDay) {
        calEvent.set('isAllDay', options.isAllDay);
    }

    if (options.starts || options.ends) {
        if (calEvent.isAllDay) {
            calEvent.setAllDayPeriod(starts, ends);
        } else {
            calEvent.setTimePeriod(starts, ends);
        }
    }

    if (options.color) {
        calEvent.set('color', options.color);
    }

    if (options.bgColor) {
        calEvent.set('bgColor', options.bgColor);
    }

    if (options.borderColor) {
        calEvent.set('borderColor', options.borderColor);
    }

    if (options.origin) {
        calEvent.set('origin', options.origin);
    }

    if (!util.isUndefined(options.isPending)) {
        calEvent.set('isPending', options.isPending);
    }

    if (!util.isUndefined(options.isFocused)) {
        calEvent.set('isFocused', options.isFocused);
    }

    this._removeFromMatrix(calEvent);
    this._addToMatrix(calEvent);

    /**
     * @event DoorayBase#updateEvent
     */
    this.fire('updateEvent');

    return true;
};

/**
 * Delete event instance from controller
 * @param {CalEvent} calEvent - event instance to delete
 * @returns {CalEvent} deleted model instance
 */
DoorayBase.prototype.deleteEvent = function(calEvent) {
    this._removeFromMatrix(calEvent);
    this.events.remove(calEvent);

    return true;
};


module.exports = DoorayBase;
