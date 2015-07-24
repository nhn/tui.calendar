/**
 * @fileoverview Controller mixin modules for day views.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var array = require('../../common/array');

var aps = Array.prototype.slice;
var forEachArr = util.forEachArray;

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

        if (collection.length < 1) {
            return result;
        }

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
     * Calculate collision group.
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
        forEachArr(viewModels.slice(1), function(event, index) {
            foundPrevCollisionEvent = false;
            previousEventList = aps.apply(viewModels, [0, index + 1]).reverse();

            forEachArr(previousEventList, function(previous) {
                if (event.valueOf().collidesWith(previous.valueOf())) {
                    // 이전 일정들과 겹치는 경우 겹치는 일정의 Collision Group을
                    // 찾아 이 일정을 추가한다
                    foundPrevCollisionEvent = true;

                    forEachArr(collisionGroups.slice(0).reverse(), function(group) {
                        if (~util.inArray(util.stamp(previous.valueOf()), group)) {
                            // 겹치는 이전 일정을 찾은 경우 그 일정이 속한
                            // Collision Group에 이 일정을 포함시킨다.
                            group.push(util.stamp(event.valueOf()));
                            return false;
                        }
                    }, this);

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
     * @param {Collection} collection model collection.
     * @param {array[]} collisionGroups Collision groups for event set.
     * @returns {array} matrices
     */
    getMatrices: function(collection, collisionGroups) {
        var event,
            result = [],
            matrix,
            found,
            col,
            nextRow,
            lastRowInColumn,
            getLastRowInColumn = week.getLastRowInColumn;

        forEachArr(collisionGroups, function(group) {
            matrix = [[]];

            forEachArr(group, function(eventID) {
                event = collection.items[eventID];
                col = 0;
                found = false;

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

    /**
     * Populate events in date range.
     * @param {Date} starts start date.
     * @param {Date} ends end date.
     * @returns {object} events grouped by dates.
     */
    findByDateRange: function(starts, ends) {
        var eventsInRange = this.findByDateRange(starts, ends),
            grouped,
            collisionGroups,
            matrices,
            result = {},
            cursor;

        util.forEach(eventsInRange, function(collection, ymd) {
            cursor = result[ymd] = {};
            grouped = this._getGroupedEventList(collection);

            // Create view models.
            // For time view
            cursor.allday = [];
            cursor.task = [];

            collisionGroups = this.getCollisionGroup(grouped.time);
            matrices = this.getMatrices(collection, collisionGroups);
            cursor.time = matrices;
        }, week);

        return result;
    }
};

module.exports = week;

