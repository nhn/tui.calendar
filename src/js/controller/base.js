/**
 * @fileoverview Base calendar controller
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var Event = require('../model/event');
var EventViewModel = require('../model/viewModel/event');
var datetime = require('../datetime');
var Collection = require('../common/collection');

/**
 * @constructor
 * @mixes util.CustomEvents
 */
function Base() {
    /*eslint-disable*/
    /**
     * events collection.
     * @type {Collection}
     */
    this.events = new Collection(function(event) {
        return util.stamp(event);
    });
    /*eslint-enable*/

    /**
     * Matrix for multidate events.
     * @type {object.<string, array>}
     */
    this.dateMatrix = {};
}

/**
 * Calculate contain dates in event.
 * @private
 * @param {Event} event The instance of event.
 * @returns {array} contain dates.
 */
Base.prototype._getContainDatesInEvent = function(event) {
    var range = datetime.range(
        datetime.start(event.starts),
        datetime.start(event.ends),
        datetime.MILLISECONDS_PER_DAY
    );

    return range;
};

/**********
 * CRUD
 **********/

/**
 * Create an event instance from raw data.
 * @emits Base#createdEvent
 * @param {object} options Data object to create event.
 * @returns {Event} The instance of Event that created.
 */
Base.prototype.createEvent = function(options) {
    var event = this.addEvent(Event.create(options));

    /**
     * @event Base#createdEvent
     * @type {Event}
     */
    this.fire('createdEvent', event);

    return event;
};

/**
 * Set date matrix to supplied event instance.
 * @param {Event} event - instance of event.
 */
Base.prototype._addToMatrix = function(event) {
    var ownMatrix = this.dateMatrix,
        containDates = this._getContainDatesInEvent(event);

    util.forEach(containDates, function(date) {
        var ymd = datetime.format(date, 'YYYYMMDD'),
            matrix = ownMatrix[ymd] = ownMatrix[ymd] || [];

        matrix.push(util.stamp(event));
    });
};

/**
 * Remove event's id from matrix.
 * @param {Event} event - instance of event
 */
Base.prototype._removeFromMatrix = function(event) {
    var modelID = util.stamp(event);

    util.forEach(this.dateMatrix, function(matrix) {
        var index = util.inArray(modelID, matrix);

        if (~index) {
            matrix.splice(index, 1);
        }
    }, this);
};

/**
 * Add an event instance.
 * @param {Event} event The instance of Event.
 * @returns {Event} The instance of Event that added.
 */
Base.prototype.addEvent = function(event) {
    this.events.add(event);
    this._addToMatrix(event);

    return event;
};


/**
 * Return events in supplied date range.
 *
 * available only YMD.
 * @param {Date} starts start date.
 * @param {Date} ends end date.
 * @returns {object.<string, Collection>} event collection grouped by dates.
 */
Base.prototype.findByDateRange = function(starts, ends) {
    var range = datetime.range(
            datetime.start(starts),
            datetime.start(ends),
            datetime.MILLISECONDS_PER_DAY
        ),
        ownEvents = this.events.items,
        ownMatrix = this.dateMatrix,
        dformat = datetime.format,
        result = {},
        matrix,
        ymd,
        viewModels;

    util.forEachArray(range, function(date) {
        ymd = dformat(date, 'YYYYMMDD');
        matrix = ownMatrix[ymd];
        viewModels = result[ymd] = new Collection(function(event) {
            return util.stamp(event.model);
        });

        if (matrix && matrix.length) {
            viewModels.add.apply(viewModels, util.map(matrix, function(id) {
                return EventViewModel.create(ownEvents[id]);
            }));
        }
    });

    return result;
};

// Update
/**
 * Update an event.
 * @emits Base#updateEvent
 * @param {number} id The unique id of Event instance.
 * @param {object} options updated object data.
 * @returns {Event|boolean} updated event instance, when it fail then return false.
 */
Base.prototype.updateEvent = function(id, options) {
    var result = false;

    this.events.doWhenHas(id, function(event) {
        options = options || {};

        if (options.title) {
            event.set('title', options.title);
        }

        if (options.isAllDay) {
            event.set('isAllDay', options.isAllDay);
        }

        if (options.starts) {
            event.set('starts', new Date(options.starts));
        }

        if (options.ends) {
            event.set('ends', new Date(options.ends));
        }

        this._removeFromMatrix(event);
        this._addToMatrix(event);

        result = event;
    }, this);

    /**
     * @event Base#updateEvent
     */
    this.fire('updateEvent');

    return result;
};

// Delete
/**
 * Delete event instance from controller.
 * @param {number} id - unique id of model instance.
 * @returns {Event} deleted model instance.
 */
Base.prototype.deleteEvent = function(id) {
    var result = false;

    this.events.doWhenHas(id, function(event) {
        result = event;
        this._removeFromMatrix(event);
        this.events.remove(event);
    }, this);

    return result;
};

/**********
 * API
 **********/

Base.prototype.sync = function() {};
Base.prototype.fetch = function(query) {};

// mixin
util.CustomEvents.mixin(Base);

module.exports = Base;

