/**
 * @fileoverview Controller mixin for Month View
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var array = require('../../common/array'),
    Collection = require('../../common/collection');

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
            group,
            alldayViewModels,
            collisionGroup,
            matrices;

        filters.push(ctrlCore.getEventInDateRangeFilter(starts, ends));

        if (andFilter) {
            filters.concat(andFilter);
        }

        group = ownEvents
            .find(Collection.and.apply(null, filters))
            .groupBy(['allday', 'time'], function(model) {
                return (model.isAllDay ? 'allday' : 'time');
            });

        modelColl = this.events.find(Collection.and.apply(null, filters));
        modelColl = ctrlCore.convertToViewModel(modelColl);
        group = modelColl.groupBy(['allday', 'time'], function(viewModel) {
            return (viewModel.model.isAllDay ? 'allday' : 'time');
        });

        alldayViewModels = group.allday.toArray().sort(array.compare.event.asc);
        collisionGroup = ctrlCore.getCollisionGroup(alldayViewModels);
        matrices = ctrlCore.getMatrices(group.allday, collisionGroup);

        ctrlCore.positionViewModelsForMonthView(starts, ends, matrices);

        return {
            allday: {
                coll: group.allday,
                matrices: matrices
            },
            time: {
                coll: group.time
            }
        };
    }
};

module.exports = Month;

