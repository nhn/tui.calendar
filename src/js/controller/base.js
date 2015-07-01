/**
 * @fileoverview Base calendar controller
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../datetime');
var Event = require('../model/event');
var Collection = require('../common/collection');

/**
 * @constructor
 * @mixes util.CustomEvents
 */
function Base() {
    /**
     * Event collection instance
     * @type {Collection} events
     */
    this.events = new Collection(this._getEventID);

    /**
     * collections by YYYYMMDD
     * @type {object.<string, Collection}
     */
    this.dates = {};
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
/**
 * Create an event instance.
 * @param {object} options Data object to create event.
 * @return {Base} this
 */
Base.prototype.create = function(options) {
    var event,
        formatted,
        dateCols;

    event = Event.create(options);
    formatted = datetime.format(datetime.toUTC(event.starts), 'YYYYMMDD');

    dateCols = this.dates[formatted];

    if (!dateCols) {
        dateCols = this.dates[formatted] = new Collection(this._getEventID);
    }

    dateCols.add(event);

    return this;



    

    // if (options.constructor === Event) {
    //     this.events.add(options);
    // } else {
    //     this.events.add(Event.create(options));
    // }
    // return this;
};

// Read

/**
 * @return {Collection} colllection with seached events.
 * TODO: inplements method
 */
Base.prototype.find = function() {
    return new Collection(this._getEventID);
};

/**
 * @param {Collection} collection from Base#find(). all of quering methods are except collection object for first argument.
 * @returns {array} result of query.
 * TODO: implememts method
 */
Base.prototype.getDateSchedule = function(collection) {
    return [];
};

// Update
Base.prototype.update = function() {};

// Delete
Base.prototype.delete = function() {};

/**********
 * API SYNC
 **********/

Base.prototype.sync = function() {};
Base.prototype.fetch = function(query) {};

// mixin
util.CustomEvents.mixin(Base);

module.exports = Base;

