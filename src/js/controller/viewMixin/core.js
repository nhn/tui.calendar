/**
 * @fileoverview Core methods for schedule block placing
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var forEachArr = util.forEachArray,
    aps = Array.prototype.slice;

var datetime = require('../../common/datetime');
var TZDate = require('../../common/timezone').Date;
var Collection = require('../../common/collection');
var ScheduleViewModel = require('../../model/viewModel/scheduleViewModel');
var model = require('../../common/model');
var getMaxTravelTime = model.getMaxTravelTime;

var Core = {
    /**
     * Calculate collision group.
     * @param {array} viewModels List of viewmodels.
     * @param {array[]} duplicateGroups Duplicate groups for schedule set.
     * @returns {array} Collision Group.
     */
    getCollisionGroup: function(viewModels, duplicateGroups) {
        var collisionGroups = [],
            foundPrevCollisionSchedule = false,
            duplicatedViewModels = [],
            previousScheduleList, filterViewModels = [];

        if (!viewModels.length) {
            return collisionGroups;
        }

        if (duplicateGroups && duplicateGroups.length && viewModels.length > 1) {
            filterViewModels = util.filter(viewModels, function(vm) {
                var itemId = util.stamp(vm.valueOf());

                if (duplicateGroups.indexOf(itemId) < 0) {
                    return true;
                }

                duplicatedViewModels.push(vm);

                return false;
            });

            forEachArr(filterViewModels, function(vm) {
                var modelId = vm.model.id;
                var ownMaxTravelTime;
                vm.duplicateModels = util.filter(duplicatedViewModels, function(dvm) {
                    return dvm.model.id === modelId;
                });

                ownMaxTravelTime = getMaxTravelTime(vm);

                vm.maxGoingDuration = ownMaxTravelTime.maxGoingDuration;
                vm.maxComingDuration = ownMaxTravelTime.maxComingDuration;
            });

            viewModels = filterViewModels;
        }

        collisionGroups[0] = viewModels[0] ? [util.stamp(viewModels[0].valueOf())] : [];
        forEachArr(viewModels.slice(1), function(schedule, index) {
            foundPrevCollisionSchedule = false;
            previousScheduleList = aps.apply(viewModels, [0, index + 1]).reverse();

            forEachArr(previousScheduleList, function(previous) {
                if (schedule.collidesWith(previous)) {
                    // If overlapping previous schedules, find a Collision Group of overlapping schedules and add this schedules
                    foundPrevCollisionSchedule = true;

                    forEachArr(collisionGroups.slice(0).reverse(), function(group) {
                        if (~util.inArray(util.stamp(previous.valueOf()), group)) {
                            // If you find a previous schedule that overlaps, include it in the Collision Group to which it belongs.
                            group.push(util.stamp(schedule.valueOf()));

                            return false; // returning false can stop this loop
                        }

                        return true;
                    });

                    return false; // returning false can stop this loop
                }

                return true;
            });

            if (!foundPrevCollisionSchedule) {
                // This schedule is a schedule that does not overlap with the previous schedule, so a new Collision Group is constructed.
                collisionGroups.push([util.stamp(schedule.valueOf())]);
            }

            return true;
        });

        return collisionGroups;
    },

    /**
     * Get row length by column index in 2d matrix.
     * @param {array[]} arr2d Matrix
     * @param {number} col Column index.
     * @returns {number} Last row number in column.
     */
    getLastRowInColumn: function(arr2d, col) {
        var row = arr2d.length;

        while (row > 0) {
            row -= 1;
            if (!util.isUndefined(arr2d[row][col])) {
                return row;
            }
        }

        return false;
    },

    /**
     * Calculate matrix for appointment block element placing.
     * @param {Collection} collection model collection.
     * @param {array[]} collisionGroups Collision groups for schedule set.
     * @returns {array} matrices
     */
    getMatrices: function(collection, collisionGroups) {
        var result = [],
            getLastRowInColumn = Core.getLastRowInColumn;

        forEachArr(collisionGroups, function(group) {
            var matrix = [[]];

            forEachArr(group, function(scheduleID) {
                var schedule = collection.items[scheduleID],
                    col = 0,
                    found = false,
                    nextRow,
                    lastRowInColumn;

                while (!found) {
                    lastRowInColumn = getLastRowInColumn(matrix, col);

                    if (lastRowInColumn === false) {
                        matrix[0].push(schedule);
                        found = true;
                    } else if (!schedule.collidesWith(matrix[lastRowInColumn][col])) {
                        nextRow = lastRowInColumn + 1;
                        if (util.isUndefined(matrix[nextRow])) {
                            matrix[nextRow] = [];
                        }
                        matrix[nextRow][col] = schedule;
                        found = true;
                    }

                    col += 1;
                }
            });
            result.push(matrix);
        });

        return result;
    },

    /**
     * Filter that get schedule model in supplied date ranges.
     * @param {Date} start - start date
     * @param {Date} end - end date
     * @returns {function} schedule filter function
     */
    getScheduleInDateRangeFilter: function(start, end) {
        return function(schedule) {
            var ownStarts = schedule.getStarts(),
                ownEnds = schedule.getEnds();

            // shorthand condition of
            //
            // (ownStarts >= start && ownEnds <= end) ||
            // (ownStarts < start && ownEnds >= start) ||
            // (ownEnds > end && ownStarts <= end)
            return !(ownEnds < start || ownStarts > end);
        };
    },

    /**
     * Position each view model for placing into container
     * @param {Date} start - start date to render
     * @param {Date} end - end date to render
     * @param {array} matrices - matrices from controller
     * @param {function} [iteratee] - iteratee function invoke each view models
     */
    positionViewModels: function(start, end, matrices, iteratee) {
        var ymdListToRender, endTime;

        ymdListToRender = util.map(
            datetime.range(start, end, datetime.MILLISECONDS_PER_DAY),
            function(date) {
                return datetime.format(date, 'YYYYMMDD');
            }
        );

        forEachArr(matrices, function(matrix) {
            forEachArr(matrix, function(column) {
                forEachArr(column, function(viewModel, index) {
                    var ymd, dateLength;

                    if (!viewModel) {
                        return;
                    }

                    ymd = datetime.format(viewModel.getStarts(), 'YYYYMMDD');
                    endTime = viewModel.hasMultiDates ?
                        datetime.end(viewModel.getEnds()) :
                        datetime.convertStartDayToLastDay(viewModel.getEnds());
                    dateLength = datetime.range(
                        datetime.start(viewModel.getStarts()),
                        endTime,
                        datetime.MILLISECONDS_PER_DAY
                    ).length;

                    viewModel.top = index;
                    viewModel.left = util.inArray(ymd, ymdListToRender);
                    viewModel.width = dateLength;

                    if (iteratee) {
                        iteratee(viewModel);
                    }
                });
            });
        });
    },

    /**
     * Limit start, end date each view model for render properly
     * @param {TZDate} start - start date to render
     * @param {TZDate} end - end date to render
     * @param {Collection|ScheduleViewModel} viewModelColl - schedule view
     *  model collection or ScheduleViewModel
     * @returns {ScheduleViewModel} return view model when third parameter is
     *  view model
     */
    limitRenderRange: function(start, end, viewModelColl) {
        /**
         * Limit render range for view models
         * @param {ScheduleViewModel} viewModel - view model instance
         * @returns {ScheduleViewModel} view model that limited render range
         */
        function limit(viewModel) {
            if (viewModel.getStarts() < start) {
                viewModel.exceedLeft = true;
                viewModel.renderStarts = new TZDate(start);
            }

            if (viewModel.getEnds() > end) {
                viewModel.exceedRight = true;
                viewModel.renderEnds = new TZDate(end);
            }

            return viewModel;
        }

        if (viewModelColl.constructor === Collection) {
            viewModelColl.each(limit);

            return null;
        }

        return limit(viewModelColl);
    },

    /**
     * Convert schedule model collection to view model collection.
     * @param {Collection} modelColl - collection of schedule model
     * @returns {Collection} collection of schedule view model
     */
    convertToViewModel: function(modelColl) {
        var viewModelColl;

        viewModelColl = new Collection(function(viewModel) {
            return viewModel.cid();
        });

        modelColl.each(function(schedule) {
            viewModelColl.add(ScheduleViewModel.create(schedule));
        });

        return viewModelColl;
    },

    groupByDuplicatedItem: function(collection) {
        var key;
        var duplicateCollections = [];
        var groupBySchedules = collection.groupBy(collection.toArray(), function(item) {
            return item.model.id;
        });

        for (key in groupBySchedules) {
            if (Object.prototype.hasOwnProperty.call(groupBySchedules, key) &&
                groupBySchedules[key].length > 1) {
                duplicateCollections.push(groupBySchedules[key]);
            }
        }

        return duplicateCollections;
    },

    filterDuplicatedViewModel: function(duplicateCollections, defaultCalendarId) {
        var duplicateIdsExceptMajor = [];
        forEachArr(duplicateCollections, function(collection) {
            var items = collection.toArray();
            var majorSchedule;
            var majorScheduleItemId;

            var filteredMajorSchedules = util.filter(items, function(item) {
                return item.model.calendarId === defaultCalendarId;
            });

            if (filteredMajorSchedules.length) {
                majorSchedule = filteredMajorSchedules[0];
            } else {
                majorSchedule = items[items.length - 1];
            }

            majorScheduleItemId = collection.getItemID(majorSchedule);

            forEachArr(items, function(item) {
                if (collection.getItemID(item) !== majorScheduleItemId) {
                    duplicateIdsExceptMajor.push(collection.getItemID(item));
                }
            });
        });

        return duplicateIdsExceptMajor;
    },

    isDupliate: function(collItems, collectionItemId, schedulModelId) {
        var result = false;
        var itemId;
        var scheduleId;

        for (itemId in collItems) {
            if (Object.prototype.hasOwnProperty.call(collItems, itemId)) {
                scheduleId = collItems[itemId].model.id;

                if (scheduleId === schedulModelId && itemId !== collectionItemId) {
                    result = true;
                    break;
                }
            }
        }

        return result;
    }
};

module.exports = Core;
