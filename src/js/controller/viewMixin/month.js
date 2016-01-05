/**
 * @fileoverview Controller mixin for Month View
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var common = require('../../common/common'),
    array = require('../../common/array'),
    Collection = require('../../common/collection'),
    CalEventViewModel = require('../../model/viewModel/calEvent');

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
     * @param {Date} starts - start date to find events
     * @param {Date} ends - end date to find events
     * @param {function} [andFilter] - additional filter to AND clause
     * @returns {object} viewmodel data
     */
    findByDateRange: function(starts, ends, andFilter) {
        var filter = Month._getDefaultFilter(starts, ends),
            ownEvents = this.events,
            result,
            eventList,
            collisionGroup,
            matrices,
            viewModels;

        if (andFilter) {
            filter = Collection.and.call(null, [filter].concat(andFilter));
        }

        result = ownEvents.find(filter);
        eventList = result.toArray().sort(array.compare.event.asc);
        collisionGroup = this.Core.getCollisionGroup(eventList);

        // CONVERT TO VIEWMODEL
        viewModels = common.createEventCollection.apply(
            null,
            util.map(result.items, function(event) {
                return CalEventViewModel.create(event);
            })
        );

        matrices = this.Core.getMatrices(viewModels, collisionGroup);
        this.Core.positionViewModelsForMonthView(starts, ends, matrices);

        return {
            viewModels: viewModels,
            matrices: matrices
       }; 
    }
};

module.exports = Month;

