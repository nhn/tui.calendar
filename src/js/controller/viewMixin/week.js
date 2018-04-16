/* eslint no-shadow: 0 */
/**
 * @fileoverview Controller mixin modules for day views.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');

var Collection = require('../../common/collection');
var array = require('../../common/array');
var datetime = require('../../common/datetime');

/**
 * @mixin Base.Week
 */
var Week = {
    /**********
     * TIME GRID VIEW
     **********/

    /**
     * Make array with start and end times on schedules.
     * @this Base.Week
     * @param {array[]} matrix - matrix from controller.
     * @returns {array[]} starttime, endtime array (exclude first row's schedules)
     */
    generateTimeArrayInRow: function(matrix) {
        var row,
            col,
            schedule,
            map = [],
            cursor = [],
            maxColLen = Math.max.apply(null, util.map(matrix, function(col) {
                return col.length;
            }));

        for (col = 1; col < maxColLen; col += 1) {
            row = 0;
            schedule = util.pick(matrix, row, col);

            while (schedule) {
                cursor.push([schedule.getStarts().getTime(), schedule.getEnds().getTime()]);

                row += 1;
                schedule = util.pick(matrix, row, col);
            }

            map.push(cursor);
            cursor = [];
        }

        return map;
    },

    /**
     * Get collision information from list
     * @this Base
     * @param {array.<number[]>} arr - list to detecting collision. [[start, end], [start, end]]
     * @param {number} start - schedule start time that want to detect collisions.
     * @param {number} end - schedule end time that want to detect collisions.
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
     * @this Base
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
     * create view model for time view part
     * @this Base
     * @param {Date} start - start date.
     * @param {Date} end - end date.
     * @param {Collection} time - view model collection.
     * @returns {object} view model for time part.
     */
    getViewModelForTimeView: function(start, end, time) {
        var self = this,
            ymdSplitted = this.splitScheduleByDateRange(start, end, time),
            result = {};

        util.forEach(ymdSplitted, function(collection, ymd) {
            var viewModels = collection.sort(array.compare.schedule.asc),
                collisionGroups,
                matrices;

            collisionGroups = self.Core.getCollisionGroup(viewModels);
            matrices = self.Core.getMatrices(collection, collisionGroups);
            self.Week.getCollides(matrices);

            result[ymd] = matrices;
        });

        return result;
    },

    /**********
     * ALLDAY VIEW
     **********/

    /**
     * Set hasMultiDates flag to true and set date ranges for rendering
     * @this Base
     * @param {Collection} vColl - view model collection
     */
    _addMultiDatesInfo: function(vColl) {
        vColl.each(function(viewModel) {
            var model = viewModel.model;
            viewModel.hasMultiDates = true;
            viewModel.renderStarts = datetime.start(model.getStarts());
            viewModel.renderEnds = datetime.end(model.getEnds());
        });
    },

    /**
     * create view model for allday view part
     * @this Base
     * @param {Date} start start date.
     * @param {Date} end end date.
     * @param {Collection} viewModelColl - allday schedule viewModel viewModels.
     * @returns {object} allday viewModel.
     */
    getViewModelForAlldayView: function(start, end, viewModelColl) {
        var ctrlCore = this.Core,
            ctrlWeek = this.Week,
            viewModels,
            collisionGroups,
            matrices;

        if (!viewModelColl || !viewModelColl.length) {
            return [];
        }

        ctrlWeek._addMultiDatesInfo(viewModelColl);
        ctrlCore.limitRenderRange(start, end, viewModelColl);

        viewModels = viewModelColl.sort(array.compare.schedule.asc);
        collisionGroups = ctrlCore.getCollisionGroup(viewModels);

        matrices = ctrlCore.getMatrices(viewModelColl, collisionGroups);
        ctrlCore.positionViewModels(start, end, matrices);

        return matrices;
    },

    /**********
     * READ
     **********/

    /**
     * Populate schedules in date range.
     * @this Base
     * @param {Date} start start date.
     * @param {Date} end end date.
     * @param {Array.<object>} panels - schedule panels like 'milestone', 'task', 'allday', 'time'
     * @param {function[]} [andFilters] - optional filters to applying search query
     * @returns {object} schedules grouped by dates.
     */
    findByDateRange: function(start, end, panels, andFilters) {
        var ctrlCore = this.Core,
            ctrlWeek = this.Week,
            filter = ctrlCore.getScheduleInDateRangeFilter(start, end),
            scheduleTypes = util.pluck(panels, 'name'),
            modelColl,
            group;

        andFilters = andFilters || [];
        filter = Collection.and.apply(null, [filter].concat(andFilters));

        modelColl = this.schedules.find(filter);
        modelColl = ctrlCore.convertToViewModel(modelColl);

        group = modelColl.groupBy(scheduleTypes, this.groupFunc);
        util.forEach(panels, function(panel) {
            var name = panel.name;
            if (panel.type === 'daygrid') {
                group[name] = ctrlWeek.getViewModelForAlldayView(start, end, group[name]);
            } else if (panel.type === 'timegrid') {
                group[name] = ctrlWeek.getViewModelForTimeView(start, end, group[name]);
            }
        });

        return group;
    },

    /* eslint max-nested-callbacks: 0 */
    /**
     * Make exceed date information
     * @param {number} maxCount - exceed schedule count
     * @param {Array} eventsInDateRange  - matrix of ScheduleViewModel
     * @param {Array.<TZDate>} range - date range of one week
     * @returns {object} exceedDate
     */
    getExceedDate: function(maxCount, eventsInDateRange, range) {
        var exceedDate = {};

        util.forEach(range, function(date) {
            var ymd = datetime.format(date, 'YYYYMMDD');
            exceedDate[ymd] = 0;
        });

        util.forEach(eventsInDateRange, function(matrix) {
            util.forEach(matrix, function(column) {
                util.forEach(column, function(viewModel) {
                    var period;
                    if (!viewModel || viewModel.top < maxCount) {
                        return;
                    }

                    period = datetime.range(
                        viewModel.getStarts(),
                        viewModel.getEnds(),
                        datetime.MILLISECONDS_PER_DAY
                    );

                    util.forEach(period, function(date) {
                        var ymd = datetime.format(date, 'YYYYMMDD');
                        exceedDate[ymd] += 1;
                    });
                });
            });
        });

        return exceedDate;
    },

    /**
     * Exclude overflow schedules from matrices
     * @param {array} matrices - The matrices for schedule placing.
     * @param {number} visibleScheduleCount - maximum visible count on panel
     * @returns {array} - The matrices for schedule placing except overflowed schedules.
     */
    excludeExceedSchedules: function(matrices, visibleScheduleCount) {
        return matrices.map(function(matrix) {
            return matrix.map(function(row) {
                if (row.length > visibleScheduleCount) {
                    return row.filter(function(item) {
                        return item.top < visibleScheduleCount;
                    }, this);
                }

                return row;
            }, this);
        }, this);
    }
};

module.exports = Week;

