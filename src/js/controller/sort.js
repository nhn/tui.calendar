/**
 * @fileoverview Controller for sort event collections. (experimental)
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var Collection = require('../model/collection');

var filters = {
    allDay: function(model) {
        return model.isAllDay;
    },
    notAllDay: function(model) {
        return !model.isAllDay;
    }
};

function Sort() {}

Sort.prototype.process = function(collection) {
    // group by all day events.
    var allDayEvents,
        notAllDayEvents;

    allDayEvents = collection.find(filters.allDay);
    notAllDayEvents = collection.find(filters.notAllDay);

    console.log(allDayEvents.length, notAllDayEvents.length);
};

module.exports = Sort;

