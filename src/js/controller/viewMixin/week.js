/**
 * @fileoverview Controller mixin modules for day views.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../../datetime');
var array = require('../../common/array');
var Collection = require('../../common/collection');
var EventViewModel = require('../../model/viewModel/event');

/**
 * @mixin
 */
var week = /** @lends Base.prototype.week */{
    /**
     * Group EventViewModel array by type and sort it.
     * @param {Collection} collection ViewModel collection
     * @returns {object} Grouped ViewModels
     */
    _getGroupedEventList: function(collection) {
        var group,
            result = {
                allday: [],
                task: [],
                time: []
            };

        group = collection.groupBy(function(viewModel) {
            viewModel = viewModel.valueOf();
            if (viewModel.isAllDay) {
                return 'allday';
            }
            //TODO: task event flag
            return 'time';
        });

        util.forEach(group, function(collection, type, group) {
            group[type] = collection.sort(array.compare.event.asc);
        });

        return util.extend(result, group);
    },

    /**
     * Populate events in date range.
     * @param {Date} starts start date.
     * @param {Date} ends end date.
     * @returns {object} events grouped by dates.
     */
    findByDateRange: function(starts, ends) {
        var range = datetime.range(
                datetime.start(starts),
                datetime.start(ends),
                datetime.MILLISECONDS_PER_DAY
            ),
            ownEvents = this.events.items,
            ownMatrix = this.dateMatrix,
            dformat = datetime.format,
            matrix,
            col,
            ymd,
            result = {};

        util.forEachArray(range, function(date) {
            ymd = dformat(date, 'YYYYMMDD');
            matrix = ownMatrix[ymd];

            if (matrix) {
                // Make viewmodel collection.
                col = new Collection(function(viewModel) {
                    return util.stamp(viewModel.model);
                });

                // Add populated event list. convert each events to viewmodel.
                col.add.apply(col, util.map(matrix, function(id) {
                    return EventViewModel.create(ownEvents[id]);
                }));

                // Gorup events by type.
                result[ymd] = week._getGroupedEventList(col);
            }
        });

        return result;
    }
};

module.exports = week;

