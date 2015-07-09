/**
 * @fileoverview Base calendar controller
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../datetime');
var array = require('../common/array');
var Collection = require('../common/collection');

var mabs = Math.abs;

/**
 * @constructor
 * @mixes util.CustomEvents
 */
function Base() {
    /**
     * events collection.
     * @type {Collection}
     */
    this.events = new Collection(this._getEventID);

    /**
     * Matrix for multidate events.
     * @type {object.<string, array>}
     */
    this.dateMatrix = {};
}

/**
 * getter method for collection instance.
 * @param {Event} event The instance of events.
 * @returns {number} unique event id
 */
Base.prototype._getEventID = function(event) {
    return util.stamp(event);
};

/**
 * Calculate contain dates in event.
 * @param {Event} event The instance of event.
 * @returns {array} contain dates.
 */
Base.prototype._getContainDatesInEvent = function(event) {
    var rawStart = datetime.raw(event.starts),
        rawEnd = datetime.raw(event.ends),
        start = new Date(rawStart.y, rawStart.M, rawStart.d),
        end = new Date(rawEnd.y, rawEnd.M, rawEnd.d),
        result = [];

    while (start <= end) {
        result.push(new Date(start.getTime()));
        start.setDate(start.getDate() + 1);
    }

    return result;
};

/**********
 * CRUD
 **********/

/**
 * Create an event instance from raw data.
 * @param {object} options Data object to create event.
 * @returns {Event} The instance of Event that created.
 */
Base.prototype.createEvent = function(options) {
    return this.addEvent(Event.create(options));
};

/**
 * Add an event instance.
 * @param {Event} event The instance of Event.
 * @returns {Event} The instance of Event that added.
 */
Base.prototype.addEvent = function(event) {
    var ownEvents = this.events,
        ownMatrix = this.dateMatrix,
        matrix,
        containDates = this._getContainDatesInEvent(event),
        dformat = datetime.format,
        stamp = util.stamp,
        key;

    ownEvents.add(event);

    util.forEach(containDates, function(date) {
        key = dformat(date, 'YYYYMMDD');
        matrix = ownMatrix[key];

        if (!matrix) {
            matrix = ownMatrix[key] = [];
        }

        matrix.push(stamp(event));
    });

    return event;
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

