/**
 * @fileoverview Base calendar controller
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var CalEvent = require('../model/calEvent');
var CalEventViewModel = require('../model/viewModel/calEventViewModel');
var datetime = require('../common/datetime');
var common = require('../common/common');

/**
 * @constructor
 * @param {object} options - options for base controller
 * @param {function} [options.groupFunc] - function for group each models {@see Collection#groupBy}
 * @mixes util.CustomEvents
 */
function Base(options) {
    options = options || {};

    /**
     * function for group each event models.
     * @type {function}
     * @param {CalEventViewModel} viewModel - view model instance
     * @returns {string} group key
     */
    this.groupFunc = options.groupFunc || function(viewModel) {
        if (viewModel.model.isAllDay) {
            return 'allday';
        }
        return 'time';
    };

    /**
     * events collection.
     * @type {Collection}
     */
    this.events = common.createEventCollection();

    /**
     * Matrix for multidate events.
     * @type {object.<string, array>}
     */
    this.dateMatrix = {};
}

/**
 * Calculate contain dates in event.
 * @private
 * @param {CalEvent} event The instance of event.
 * @returns {array} contain dates.
 */
Base.prototype._getContainDatesInEvent = function(event) {
    var range = datetime.range(
        datetime.start(event.getStarts()),
        datetime.start(event.getEnds()),
        datetime.MILLISECONDS_PER_DAY
    );

    return range;
};

/**********
 * CRUD
 **********/

/**
 * Create an event instance from raw data.
 * @emits Base#beforeCreateEvent
 * @emits Base#createdEvent
 * @param {object} options Data object to create event.
 * @param {boolean} silent - set true then don't fire events.
 * @returns {CalEvent} The instance of CalEvent that created.
 */
Base.prototype.createEvent = function(options, silent) {
    var event,
        eventData = {
            data: options
        };

    /**
     * @event Base#beforeCreateEvent
     * @type {Calendar~CalEvent[]}
     */
    if (!this.invoke('beforeCreateEvent', eventData)) {
        return;
    }

    event = this.addEvent(CalEvent.create(options));

    if (!silent) {
        /**
         * @event Base#createdEvent
         * @type {CalEvent}
         */
        this.fire('createdEvent', event);
    }

    return event;
};

/**
 * @emits Base#beforeCreateEvent
 * @emits Base#createdEvent
 * @param {Calendar~CalEvent[]} dataList - dataObject list to create event.
 * @param {boolean} [silent=false] - set true then don't fire events.
 * @returns {CalEvent[]} The instance list of CalEvent that created.
 */
Base.prototype.createEvents = function(dataList, silent) {
    var self = this;

    return util.map(dataList, function(data) {
        return self.createEvent(data, silent);
    });
};

/**
 * Update an event.
 * @emits Base#updateEvent
 * @param {CalEvent} calEvent - event instance to update
 * @param {object} options updated object data.
 * @returns {CalEvent} updated event instance
 */
Base.prototype.updateEvent = function(calEvent, options) {
    var starts = options.starts || calEvent.starts;
    var ends = options.ends || calEvent.ends;

    options = options || {};

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
     * @event Base#updateEvent
     */
    this.fire('updateEvent');

    return calEvent;
};

/**
 * Delete event instance from controller.
 * @param {CalEvent} calEvent - event instance to delete
 * @returns {CalEvent} deleted model instance.
 */
Base.prototype.deleteEvent = function(calEvent) {
    this._removeFromMatrix(calEvent);
    this.events.remove(calEvent);

    return calEvent;
};

/**
 * Set date matrix to supplied event instance.
 * @param {CalEvent} event - instance of event.
 */
Base.prototype._addToMatrix = function(event) {
    var ownMatrix = this.dateMatrix;
    var containDates = this._getContainDatesInEvent(event);

    util.forEach(containDates, function(date) {
        var ymd = datetime.format(date, 'YYYYMMDD'),
            matrix = ownMatrix[ymd] = ownMatrix[ymd] || [];

        matrix.push(util.stamp(event));
    });
};

/**
 * Remove event's id from matrix.
 * @param {CalEvent} event - instance of event
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
 * @emits Base#addedEvent
 * @param {CalEvent} event The instance of CalEvent.
 * @param {boolean} silent - set true then don't fire events.
 * @returns {CalEvent} The instance of CalEvent that added.
 */
Base.prototype.addEvent = function(event, silent) {
    this.events.add(event);
    this._addToMatrix(event);

    if (!silent) {
        /**
         * @event Base#addedEvent
         * @type {object}
         */
        this.fire('addedEvent', event);
    }

    return event;
};

/**
 * split event model by ymd.
 * @param {Date} starts - start date
 * @param {Date} ends - end date
 * @param {Collection} eventCollection - collection of event model.
 * @returns {object.<string, Collection>} splitted event model collections.
 */
Base.prototype.splitEventByDateRange = function(starts, ends, eventCollection) {
    var range = datetime.range(
            datetime.start(starts),
            datetime.start(ends),
            datetime.MILLISECONDS_PER_DAY
        ),
        ownMatrix = this.dateMatrix,
        result = {};

    util.forEachArray(range, function(date) {
        var ymd = datetime.format(date, 'YYYYMMDD'),
            matrix = ownMatrix[ymd],
            collection;

        collection = result[ymd] = common.createEventCollection();

        if (matrix && matrix.length) {
            util.forEachArray(matrix, function(id) {
                eventCollection.doWhenHas(id, function(event) {
                    collection.add(event);
                });
            });
        }
    });

    return result;
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
        viewModels = result[ymd] = common.createEventCollection();

        if (matrix && matrix.length) {
            viewModels.add.apply(viewModels, util.map(matrix, function(id) {
                return CalEventViewModel.create(ownEvents[id]);
            }));
        }
    });

    return result;
};

Base.prototype.clearEvents = function() {
    this.dateMatrix = {};
    this.events.clear();
    /**
     * for inner view when clear events
     * @event Base#clearEvents
     * @type {CalEvent}
     */
    this.fire('clearEvents');
};

// mixin
util.CustomEvents.mixin(Base);

module.exports = Base;

