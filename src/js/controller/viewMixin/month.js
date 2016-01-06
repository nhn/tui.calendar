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
     * Find event and get view model for specific month
     * @this Base
     * @param {Date} starts - start date to find events
     * @param {Date} ends - end date to find events
     * @param {function} [andFilter] - additional filter to AND clause
     * @returns {object} view model data
     */
    findByDateRange: function(starts, ends, andFilter) {
        var ownEvents = this.events,
            ctrlCore = this.Core,
            filters = [],
            modelColl,
            viewModelColl,
            eventList,
            collisionGroup,
            matrices;

        filters.push(ctrlCore.getEventInDateRangeFilter(starts, ends));

        if (andFilter) {
            filters.concat(andFilter);
        }

        modelColl = ownEvents.find(Collection.and.apply(null, filters));
        eventList = modelColl.toArray().sort(array.compare.event.asc);
        collisionGroup = ctrlCore.getCollisionGroup(eventList);

        // CONVERT TO VIEWMODEL
        viewModelColl = common.createEventCollection.apply(
            null,
            util.map(modelColl.items, function(model) {
                var viewModel = CalEventViewModel.create(model);

                return ctrlCore.limitRenderRange(starts, ends, viewModel);
            })
        );

        matrices = ctrlCore.getMatrices(viewModelColl, collisionGroup);
        ctrlCore.positionViewModelsForMonthView(starts, ends, matrices);

        return {
            viewModelColl: viewModelColl,
            matrices: matrices
       }; 
    }
};

module.exports = Month;

