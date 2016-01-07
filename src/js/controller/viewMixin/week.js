/**
 * @fileoverview Controller mixin modules for day views.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var Collection = require('../../common/collection'),
    common = require('../../common/common'),
    array = require('../../common/array'),
    CalEventViewModel = require('../../model/viewModel/calEvent');

/**
 * @mixin Base.Week
 */
var Week = {
    /**********
     * TIME GRID VIEW
     **********/

    /**
     * Make array with start and end times on events.
     * @this Base.Week
     * @param {array[]} matrix - matrix from controller.
     * @returns {array[]} starttime, endtime array (exclude first row's events)
     */
    generateTimeArrayInRow: function(matrix) {
        var row,
            col,
            event,
            map = [],
            cursor = [],
            maxColLen = Math.max.apply(null, util.map(matrix, function(col) {
                return col.length;
            }));

        for (col = 1; col < maxColLen; col += 1) {
            row = 0;
            event = util.pick(matrix, row, col);

            while (event) {
                cursor.push([event.getStarts().getTime(), event.getEnds().getTime()]);

                row += 1;
                event = util.pick(matrix, row, col);
            }

            map.push(cursor);
            cursor = [];
        }

        return map;
    },

    /**
     * Get collision information from list
     * @this Base.Week
     * @param {array.<number[]>} arr - list to detecting collision. [[start, end], [start, end]]
     * @param {number} start - event start time that want to detect collisions.
     * @param {number} end - event end time that want to detect collisions.
     * @returns {boolean} target has collide in supplied array?
     */
    hasCollide: function(arr, start, end) {
        var startStart,
            startEnd,
            endStart,
            endEnd,
            getFunc = function(index) {
                return function(block) {
                    return block[index];
                };
            },
            abs = Math.abs,
            compare = array.compare.num.asc,
            hasCollide;

        if (!arr.length) {
            return false;
        }

        startStart = abs(array.bsearch(arr, start, getFunc(0), compare));
        startEnd = abs(array.bsearch(arr, start, getFunc(1), compare));
        endStart = abs(array.bsearch(arr, end, getFunc(0), compare));
        endEnd = abs(array.bsearch(arr, end, getFunc(1), compare));
        hasCollide = !(startStart === startEnd && startEnd === endStart && endStart === endEnd);

        return hasCollide;
    },

    /**
     * Initialize values to viewmodels for detect real collision at rendering phase.
     * @this Base.Week
     * @param {array[]} matrices - Matrix data.
     */
    getCollides: function(matrices) {
        util.forEachArray(matrices, function(matrix) {
            var binaryMap,
                maxRowLength;

            binaryMap = Week.generateTimeArrayInRow(matrix);
            maxRowLength = Math.max.apply(null, util.map(matrix, function(row) {
                return row.length;
            }));

            util.forEachArray(matrix, function(row) {
                util.forEachArray(row, function(viewModel, col) {
                    var startTime,
                        endTime,
                        hasCollide,
                        i;

                    if (!viewModel) {
                        return;
                    }

                    startTime = viewModel.getStarts().getTime() + 1;
                    endTime = viewModel.getEnds().getTime() - 1;

                    for (i = (col + 1); i < maxRowLength; i += 1) {
                        hasCollide = Week.hasCollide(binaryMap[i - 1], startTime, endTime);

                        if (hasCollide) {
                            viewModel.hasCollide = true;
                            break;
                        }

                        viewModel.extraSpace += 1;
                    }
                });
            });
        });
    },

    /**
     * @this Base
     * @param {Date} starts - start date.
     * @param {Date} ends - end date.
     * @param {Collection} time - view model collection.
     * @returns {object} view model for time part.
     */
    getViewModelForTimeView: function(starts, ends, time) {
        var ymdSplitted = this.splitEventByDateRange(starts, ends, time),
            result = {};

        util.forEach(ymdSplitted, function(collection, ymd) {
            var viewModels = collection.sort(array.compare.event.asc),
                collisionGroups,
                matrices;

            collisionGroups = this.Core.getCollisionGroup(viewModels);
            matrices = this.Core.getMatrices(collection, collisionGroups);
            this.Week.getCollides(matrices);

            result[ymd] = matrices;
        }, this);

        return result;
    },

    /**********
     * ALLDAY VIEW
     **********/

    /**
     * create view model for allday view part.
     * @param {Date} starts start date.
     * @param {Date} ends end date.
     * @param {Collection} viewModelColl - allday event viewModel viewModels.
     * @returns {object} allday viewModel.
     */
    getViewModelForAlldayView: function(starts, ends, viewModelColl) {
        var ctrlCore = this.Core,
            viewModels,
            collisionGroups,
            matrices;

        if (!viewModelColl || !viewModelColl.length) {
            return [];
        }

        ctrlCore.limitRenderRange(starts, ends, viewModelColl);

        viewModels = viewModelColl.sort(array.compare.event.asc);
        collisionGroups = ctrlCore.getCollisionGroup(viewModels);

        matrices = ctrlCore.getMatrices(viewModelColl, collisionGroups);
        ctrlCore.positionViewModels(starts, ends, matrices);

        return matrices;
    },

    /**********
     * READ
     **********/

    /**
     * Populate events in date range.
     * @this Base
     * @param {Date} starts start date.
     * @param {Date} ends end date.
     * @param {object} [andFilter] - additional filter to AND clause
     * @returns {object} events grouped by dates.
     */
    findByDateRange: function(starts, ends, andFilter) {
        var ctrlCore = this.Core,
            ctrlWeek = this.Week,
            filters = [],
            modelColl,
            group;

        filters.push(ctrlCore.getEventInDateRangeFilter(starts, ends));

        if (andFilter) {
            filters.push(andFilter);
        }

        modelColl = this.events.find(Collection.and.apply(null, filters));
        modelColl = ctrlCore.convertToViewModel(modelColl);

        group = modelColl.groupBy(['allday', 'time'], this.groupFunc);
        group.allday = ctrlWeek.getViewModelForAlldayView(starts, ends, group.allday);
        group.time = ctrlWeek.getViewModelForTimeView(starts, ends, group.time);

        return group;
    }
};

module.exports = Week;

