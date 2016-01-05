/**
 * @fileoverview Controller mixin modules for day views.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var Collection = require('../../common/collection');
var datetime = require('../../common/datetime');
var common = require('../../common/common');
var array = require('../../common/array');
var CalEventViewModel = require('../../model/viewModel/calEvent');
var aps = Array.prototype.slice;

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
     * @param {Collection} viewModels - allday event viewModel viewModels.
     * @returns {object} allday viewModel.
     */
    getViewModelForAlldayView: function(starts, ends, viewModels) {
        var list,
            collisionGroups,
            matrices;

        if (!viewModels || !viewModels.length) {
            return [];
        }

        viewModels.each(function(viewModel) {
            var ownStarts = viewModel.getStarts(),
                ownEnds = viewModel.getEnds();

            if (ownStarts < starts) {
                viewModel.renderStarts = new Date(starts.getTime());
            }

            if (ownEnds > ends) {
                viewModel.renderEnds = new Date(ends.getTime());
            }
        });

        list = viewModels.sort(array.compare.event.asc);
        collisionGroups = this.Core.getCollisionGroup(list);
        matrices = this.Core.getMatrices(viewModels, collisionGroups);
        this.Core.positionViewModelsForMonthView(starts, ends, matrices);

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
        var events,
            viewModels,
            filter;

        filter = function(model) {
            var ownStarts = model.getStarts(),
                ownEnds = model.getEnds();

            return (ownStarts >= starts && ownEnds <= ends) ||
                (ownStarts < starts && ownEnds >= starts) ||
                (ownEnds > ends && ownStarts <= ends);
        };

        if (andFilter) {
            filter = Collection.and.apply(null, [filter].concat(andFilter));
        }

        // QUERY EVENTS
        events = this.events.find(filter);

        // CONVERT TO VIEWMODEL
        viewModels = common.createEventCollection.apply(
            null,
            util.map(events.items, function(event) {
                return CalEventViewModel.create(event);
            })
        ).groupBy(['allday', 'time'], this.groupFunc);

        // CUSTOMIZE VIEWMODEL FOR EACH VIEW
        util.forEach(viewModels, function(coll, key, obj) {
            if (key === 'allday') {
                obj.allday = util.bind(Week.getViewModelForAlldayView, this)(starts, ends, coll);
            } else if (key === 'time') {
                obj.time = util.bind(Week.getViewModelForTimeView, this)(starts, ends, coll);
            }
        }, this);

        return viewModels;
    }
};

module.exports = Week;

