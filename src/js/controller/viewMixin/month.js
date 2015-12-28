/**
 * @fileoverview Controller mixin for Month View
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var datetime = require('../../common/datetime'),
    Collection = require('../../common/collection');

var Month = {

    /**
     * Default filter for Month#findByMonth method
     * @param {Date} starts - start date
     * @param {Date} ends - end date
     * @returns {function} event filter function
     */
    _getDefaultFilter: function(starts, ends) {
        return function(model) {
            var ownStarts = model.getStarts(),
                ownEnds = model.getEnds();

            return (ownStarts >= starts && ownEnds <= ends) ||
                (ownStarts < starts && ownEnds >= starts) ||
                (ownEnds > ends && ownStarts <= ends);
        }
    },

    /**
     * Find event and get view model for specific month
     * @this Base
     * @param {Date} month - month to find events
     * @param {function} [andFilter] - additional filter to AND clause
     * @returns {object} viewmodel data
     */
    findByMonth: function(month, andFilter) {
        var starts = datetime.startDateOfMonth(month),
            ends = datetime.endDateOfMonth(month),
            filter = Month._defaultFilter(starts, ends),
            events;

        if (andFilter) {
            filter = Collection.and.call(null, [filter].concat(andFilter));
        }

        events = this.events.find(filter);

        return {};
    }
};

module.exports = Month;

