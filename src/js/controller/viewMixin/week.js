/**
 * @fileoverview Controller mixin modules for day views.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../../datetime');
var common = require('../../common/common');
var array = require('../../common/array');
var EventViewModel = require('../../model/viewModel/event');
var aps = Array.prototype.slice;

/**
 * @mixin Base.Week
 */
var Week = {
    /**********
     * COMMON
     **********/

    /**
     * Calculate collision group.
     * @this Base.Week
     * @param {array} viewModels List of viewmodels.
     * @returns {array} Collision Group.
     */
    getCollisionGroup: function(viewModels) {
        var collisionGroups = [],
            foundPrevCollisionEvent = false,
            previousEventList;

        if (!viewModels.length) {
            return collisionGroups;
        }

        collisionGroups[0] = [util.stamp(viewModels[0].valueOf())];
        util.forEachArray(viewModels.slice(1), function(event, index) {
            foundPrevCollisionEvent = false;
            previousEventList = aps.apply(viewModels, [0, index + 1]).reverse();

            util.forEachArray(previousEventList, function(previous) {
                if (event.collidesWith(previous)) {
                    // 이전 일정들과 겹치는 경우 겹치는 일정의 Collision Group을
                    // 찾아 이 일정을 추가한다
                    foundPrevCollisionEvent = true;

                    util.forEachArray(collisionGroups.slice(0).reverse(), function(group) {
                        if (~util.inArray(util.stamp(previous.valueOf()), group)) {
                            // 겹치는 이전 일정을 찾은 경우 그 일정이 속한
                            // Collision Group에 이 일정을 포함시킨다.
                            group.push(util.stamp(event.valueOf()));
                            return false;
                        }
                    });

                    return false;
                }
            });

            if (!foundPrevCollisionEvent) {
                // 이 일정은 이전일정과 겹치지 않는 일정이므로
                // 새 Collision Group을 구성한다.
                collisionGroups.push([util.stamp(event.valueOf())]);
            }
        });

        return collisionGroups;
    },

    /**
     * Get row length by column index in 2d matrix.
     * @this Base.Week
     * @param {array[]} arr2d Matrix
     * @param {number} col Column index.
     * @return {number} Last row number in column.
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
     * @this Base.Week
     * @param {Collection} collection model collection.
     * @param {array[]} collisionGroups Collision groups for event set.
     * @returns {array} matrices
     */
    getMatrices: function(collection, collisionGroups) {
        var result = [],
            getLastRowInColumn = Week.getLastRowInColumn;

        util.forEachArray(collisionGroups, function(group) {
            var matrix = [[]];

            util.forEachArray(group, function(eventID) {
                var event = collection.items[eventID],
                    col = 0,
                    found = false,
                    nextRow,
                    lastRowInColumn;

                while (!found) {
                    lastRowInColumn = getLastRowInColumn(matrix, col);

                    if (lastRowInColumn === false) {
                        matrix[0].push(event);
                        found = true;
                    } else if (!event.collidesWith(matrix[lastRowInColumn][col])) {
                        nextRow = lastRowInColumn + 1;
                        if (util.isUndefined(matrix[nextRow])) {
                            matrix[nextRow] = [];
                        }
                        matrix[nextRow][col] = event;
                        found = true;
                    }

                    col += 1;
                }
            });

            result.push(matrix);
        });

        return result;
    },

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
                event = event.valueOf();
                cursor.push([event.starts.getTime(), event.ends.getTime()]);

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
                    var model,
                        startTime,
                        endTime,
                        hasCollide,
                        i;

                    if (!viewModel) {
                        return;
                    }

                    model = viewModel.valueOf();
                    startTime = model.starts.getTime() + 1;
                    endTime = model.ends.getTime() - 1;

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

            collisionGroups = this.getCollisionGroup(viewModels);
            matrices = this.getMatrices(collection, collisionGroups);
            this.getCollides(matrices);

            result[ymd] = matrices;
        }, Week);

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
            ymdsToRender,
            collisionGroups,
            matrices;

        if (!viewModels || !viewModels.length) {
            return [];
        }

        ymdsToRender = util.map(
            datetime.range(starts, ends, datetime.MILLISECONDS_PER_DAY),
            function(date) {
                return datetime.format(date, 'YYYYMMDD');
            }
        );

        list = viewModels.sort(array.compare.event.asc);
        collisionGroups = Week.getCollisionGroup(list);
        matrices = Week.getMatrices(viewModels, collisionGroups);

        util.forEachArray(matrices, function(matrix) {
            util.forEachArray(matrix, function(column) {
                util.forEachArray(column, function(viewModel, index) {
                    var model, ymd, dateLength;

                    if (!viewModel) {
                        return;
                    }

                    model = viewModel.valueOf();
                    ymd = datetime.format(model.starts, 'YYYYMMDD');
                    dateLength = datetime.range(
                        model.starts,
                        model.ends,
                        datetime.MILLISECONDS_PER_DAY
                    ).length;

                    viewModel.top = index;
                    viewModel.left = util.inArray(ymd, ymdsToRender);
                    viewModel.width = dateLength;
                });
            });
        });

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
     * @returns {object} events grouped by dates.
     * TODO: task
     */
    findByDateRange: function(starts, ends) {
        var that = this,
            events,
            viewModels,
            result = {};

        events = this.events.find(function(model) {
            return (model.starts >= starts && model.ends <= ends);
        });

        // CONVERT TO VIEWMODEL.
        viewModels = common.createEventCollection.apply(
            null,
            util.map(events.items, function(event) {
                return EventViewModel.create(event);
            })
        ).groupBy(function(viewModel) {
            if (viewModel.model.isAllDay) {
                return 'allday';
            }
            return 'time';
        });

        // view model for allday
        result.allday = common.pick2(viewModels, 'allday').then(function(allday) {
            return util.bind(Week.getViewModelForAlldayView, that)(starts, ends, allday);
        });

        // view model for Time.
        result.time = common.pick2(viewModels, 'time').then(function(time) {
            return util.bind(Week.getViewModelForTimeView, that)(starts, ends, time);
        });

        return result;
    }
};

module.exports = Week;

