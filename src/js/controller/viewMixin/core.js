/**
 * @fileoverview Core methods for event block placing
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var aps = Array.prototype.slice;
var datetime = require('../../common/datetime'),
    Collection = require('../../common/collection'),
    CalEventViewModel = require('../../model/viewModel/calEvent');

var Core = {
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
        var result = [],
            getLastRowInColumn = Core.getLastRowInColumn;

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

    /**
     * Filter that get event model in supplied date ranges.
     * @param {Date} starts - start date
     * @param {Date} ends - end date
     * @returns {function} event filter function
     */
    getEventInDateRangeFilter: function(starts, ends) {
        return function(model) {
            var ownStarts = model.getStarts(),
                ownEnds = model.getEnds();

            return (ownStarts >= starts && ownEnds <= ends) ||
                (ownStarts < starts && ownEnds >= starts) ||
                (ownEnds > ends && ownStarts <= ends);
        }
    },

    /**
     * Position each view model for placing into container
     * @param {Date} starts - start date to render
     * @param {Date} ends - end date to render
     * @param {array} matrices - matrices from controller
     */
    positionViewModelsForMonthView: function(starts, ends, matrices) {
        var ymdListToRender;

        ymdListToRender = util.map(
            datetime.range(starts, ends, datetime.MILLISECONDS_PER_DAY),
            function(date) {
                return datetime.format(date, 'YYYYMMDD');
            }
        );

        util.forEachArray(matrices, function(matrix) {
            util.forEachArray(matrix, function(column) {
                util.forEachArray(column, function(viewModel, index) {
                    var ymd, dateLength;

                    if (!viewModel) {
                        return;
                    }

                    ymd = datetime.format(viewModel.getStarts(), 'YYYYMMDD');
                    dateLength = datetime.range(
                        viewModel.getStarts(),
                        viewModel.getEnds(),
                        datetime.MILLISECONDS_PER_DAY
                    ).length;

                    viewModel.top = index;
                    viewModel.left = util.inArray(ymd, ymdListToRender);
                    viewModel.width = dateLength;
                });
            });
        });
    },

    /**
     * Limit start, end date each view model for render properly
     * @param {Date} starts - start date to render
     * @param {Date} ends - end date to render
     * @param {Collection|CalEventViewModel} viewModelCollection - event view
     *  model collection or CalEventViewModel
     * @returns {CalEventViewModel} return view model when third parameter is
     *  view model
     */
    limitRenderRange: function(starts, ends, viewModelCollection) {
        function limit(viewModel) {
            if (viewModel.getStarts() < starts) {
                viewModel.renderStarts = new Date(starts.getTime());
            }

            if (viewModel.getEnds() > ends) {
                viewModel.renderEnds = new Date(ends.getTime());
            }

            return viewModel;
        }

        if (viewModelCollection.constructor === Collection) {
            viewModelCollection.each(limit);
            return;
        }

        return limit(viewModelCollection);
    },

    /**
     * Convert event model collection to view model collection.
     * @param {Collection} modelColl - collection of event model
     * @returns {Collection} collection of event view model
     */
    convertToViewModel: function(modelColl) {
        var viewModelColl;
        
        viewModelColl = new Collection(function(viewModel) {
            return viewModel.cid();
        });

        modelColl.each(function(model) {
            viewModelColl.add(CalEventViewModel.create(model));
        });

        return viewModelColl;
    }
};

module.exports = Core;

