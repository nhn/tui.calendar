/**
 * @fileoverview Base calendar controller
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var Event = require('../model/event');
var Collection = require('../common/collection');

/**
 * @constructor
 */
function Base() {
    /**
     * Event collection instance
     * @type {Collection} events
     */
    this.events = new Collection(this._getEventID);
}

/**
 * @param {Event} event The event instance.
 * @returns {number} The number of event's unique id.
 */
Base.prototype._getEventID = function(event) {
    return util.stamp(event);
};

/**********
 * CRUD
 **********/

// Create
Base.prototype.create = function(options) {
    var event = Event.create(options);
    this.events.add(event);
    return this;
};

// Read
Base.prototype.find = function() {};
Base.prototype.getDateSchedule = function() {};

// Update
Base.prototype.update = function() {};

// Delete
Base.prototype.delete = function() {};

/**********
 * API SYNC
 **********/

Base.prototype.sync = function() {}; 

module.exports = Base;

