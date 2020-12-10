/**
 * @fileoverview Core methods for schedule block placing
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var forEachArr = util.forEachArray,
    aps = Array.prototype.slice;

var datetime = require('../../common/datetime');
var tz = require('../../common/timezone');
var TZDate = tz.Date;
var Collection = require('../../common/collection');
var ScheduleViewModel = require('../../model/viewModel/scheduleViewModel');

var Core = {
    /**
     * Calculate collision group.
     * @param {array} viewModels List of viewmodels.
     * @returns {array} Collision Group.
     */
    getCollisionGroup: function(viewModels) {
        var collisionGroups = [],
            foundPrevCollisionSchedule = false,
            previousScheduleList;

        if (!viewModels.length) {
            return collisionGroups;
        }

        collisionGroups[0] = [util.stamp(viewModels[0].valueOf())];
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
        return function(model) {
            var ownStarts = model.getStarts(),
                ownEnds = model.getEnds();
            var dateByOffset;

            if (tz.hasPrimaryTimezoneCustomSetting()) {
                dateByOffset = recalculateDateByOffset(ownStarts, ownEnds);
                ownStarts = dateByOffset.start;
                ownEnds = dateByOffset.end;
            }

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
        var ymdListToRender;

        ymdListToRender = util.map(
            datetime.range(start, end, datetime.MILLISECONDS_PER_DAY),
            function(date) {
                return datetime.format(date, 'YYYYMMDD');
            }
        );

        forEachArr(matrices, function(matrix) {
            forEachArr(matrix, function(column) {
                forEachArr(column, function(viewModel, index) {
                    var ymd, dateLength, startDate, endDate;

                    if (!viewModel) {
                        return;
                    }

                    startDate = viewModel.getStarts();
                    endDate = viewModel.getEnds();
                    dateLength = datetime.range(
                        datetime.start(startDate),
                        datetime.renderEnd(startDate, endDate),
                        datetime.MILLISECONDS_PER_DAY
                    ).length;

                    ymd = datetime.format(startDate, 'YYYYMMDD');
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

        modelColl.each(function(model) {
            viewModelColl.add(ScheduleViewModel.create(model));
        });

        return viewModelColl;
    }
};

/**
 * Get range date by custom timezone or native timezone
 * @param {TZDate} ownStarts start date.
 * @param {TZDate} ownEnds end date.
 * @returns {RangeDate} recalculated start and end date
 */
function recalculateDateByOffset(ownStarts, ownEnds) {
    var nativeOffsetMs = tz.getNativeOffsetMs();
    var startOffset = ownStarts.toDate().getTimezoneOffset();
    var MIN_TO_MS = 60 * 1000;
    var offsetDiffMs = 0;

    var primaryTimezoneName = tz.getPrimaryTimezoneName();
    var primaryOffset = tz.getPrimaryOffset();
    var timezoneOffset = tz.getOffsetByTimezoneName(primaryTimezoneName, ownStarts.getTime());

    if (tz.isNativeOsUsingDSTTimezone() && nativeOffsetMs !== startOffset) {
        // When using a custom time zone, the native time zone offset is fixed and rendered.
        // So, The fixed and rendered time should be recalculated as the original time zone offset.
        offsetDiffMs = (startOffset * MIN_TO_MS) - nativeOffsetMs;
    }

    if (tz.isPrimaryUsingDSTTimezone() && primaryOffset !== timezoneOffset) {
        // The custom time zone is a time zone where two offsets including DST are applied.
        // The first rendered schedule is calculated and drawn with the offset calculated at the access time(system OS local time).
        // It should be recalculated with the original time zone offset.
        offsetDiffMs = (primaryOffset - timezoneOffset) * MIN_TO_MS;
    }

    return {
        start: new TZDate(ownStarts.getUTCTime() + offsetDiffMs),
        end: new TZDate(ownEnds.getUTCTime() + offsetDiffMs)
    };
}

module.exports = Core;
