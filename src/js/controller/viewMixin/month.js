/**
 * @fileoverview Controller mixin for Month View
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var array = require('../../common/array'),
    datetime = require('../../common/datetime'),
    Collection = require('../../common/collection');
var mmax = Math.max;

var Month = {
    /**
     * Filter function for find time schedule
     * @param {ScheduleViewModel} viewModel - schedule view model
     * @returns {boolean} whether model is time schedule?
     */
    _onlyTimeFilter: function(viewModel) {
        return !viewModel.model.isAllDay && !viewModel.hasMultiDates;
    },

    /**
     * Filter function for find allday schedule
     * @param {ScheduleViewModel} viewModel - schedule view model
     * @returns {boolean} whether model is allday schedule?
     */
    _onlyAlldayFilter: function(viewModel) {
        return viewModel.model.isAllDay || viewModel.hasMultiDates;
    },

    /**
     * Weight top value +1 for month view render
     * @param {ScheduleViewModel} viewModel - schedule view model
     */
    _weightTopValue: function(viewModel) {
        viewModel.top = viewModel.top || 0;
        viewModel.top += 1;
    },

    /**
     * Adjust render range to render properly.
     *
     * Limit start, end for each allday schedules and expand start, end for
     * each time schedules
     * @this Base
     * @param {TZDate} start - render start date
     * @param {TZDate} end - render end date
     * @param {Collection} vColl - view model collection
     * property.
     */
    _adjustRenderRange: function(start, end, vColl) {
        var ctrlCore = this.Core;

        vColl.each(function(viewModel) {
            if (viewModel.model.isAllDay || viewModel.hasMultiDates) {
                ctrlCore.limitRenderRange(start, end, viewModel);
            }
        });
    },

    /**
     * Get max top index value for allday schedules in specific date (YMD)
     * @this Base
     * @param {string} ymd - yyyymmdd formatted value
     * @param {Collection} vAlldayColl - collection of allday schedules
     * @returns {number} max top index value in date
     */
    _getAlldayMaxTopIndexAtYMD: function(ymd, vAlldayColl) {
        var dateMatrix = this.dateMatrix,
            topIndexesInDate = [];
        util.forEach(dateMatrix[ymd], function(cid) {
            vAlldayColl.doWhenHas(cid, function(viewModel) {
                topIndexesInDate.push(viewModel.top);
            });
        });

        if (topIndexesInDate.length > 0) {
            return mmax.apply(null, topIndexesInDate);
        }

        return 0;
    },

    /**
     * Adjust time view model's top index value
     * @this Base
     * @param {Collection} vColl - collection of schedules
     */
    _adjustTimeTopIndex: function(vColl) {
        var ctrlMonth = this.Month;
        var getAlldayMaxTopIndexAtYMD = ctrlMonth._getAlldayMaxTopIndexAtYMD;
        var vAlldayColl = vColl.find(ctrlMonth._onlyAlldayFilter);
        var sortedTimeSchedules = vColl.find(ctrlMonth._onlyTimeFilter).sort(array.compare.schedule.asc);
        var maxIndexInYMD = {};

        sortedTimeSchedules.forEach(function(timeViewModel) {
            var scheduleYMD = datetime.format(timeViewModel.getStarts(), 'YYYYMMDD');
            var alldayMaxTopInYMD = maxIndexInYMD[scheduleYMD];

            if (util.isUndefined(alldayMaxTopInYMD)) {
                alldayMaxTopInYMD = maxIndexInYMD[scheduleYMD] =
                    getAlldayMaxTopIndexAtYMD(scheduleYMD, vAlldayColl);
            }
            maxIndexInYMD[scheduleYMD] = timeViewModel.top =
                (alldayMaxTopInYMD + 1);
        });
    },

    /**
     * Adjust time view model's top index value
     * @this Base
     * @param {Collection} vColl - collection of schedules
     */
    _stackTimeFromTop: function(vColl) {
        var ctrlMonth = this.Month;
        var vAlldayColl = vColl.find(ctrlMonth._onlyAlldayFilter);
        var sortedTimeSchedules = vColl.find(ctrlMonth._onlyTimeFilter).sort(array.compare.schedule.asc);
        var indiceInYMD = {};
        var dateMatrix = this.dateMatrix;

        sortedTimeSchedules.forEach(function(timeViewModel) {
            var scheduleYMD = datetime.format(timeViewModel.getStarts(), 'YYYYMMDD');
            var topArrayInYMD = indiceInYMD[scheduleYMD];
            var maxTopInYMD;
            var i;

            if (util.isUndefined(topArrayInYMD)) {
                topArrayInYMD = indiceInYMD[scheduleYMD] = [];
                util.forEach(dateMatrix[scheduleYMD], function(cid) {
                    vAlldayColl.doWhenHas(cid, function(viewModel) {
                        topArrayInYMD.push(viewModel.top);
                    });
                });
            }

            if (util.inArray(timeViewModel.top, topArrayInYMD) >= 0) {
                maxTopInYMD = mmax.apply(null, topArrayInYMD) + 1;
                for (i = 1; i <= maxTopInYMD; i += 1) {
                    timeViewModel.top = i;
                    if (util.inArray(timeViewModel.top, topArrayInYMD) < 0) {
                        break;
                    }
                }
            }
            topArrayInYMD.push(timeViewModel.top);
        });
    },

    /**
     * Convert multi-date time schedule to all-day schedule
     * @this Base
     * @param {Collection} vColl - view model collection
     * property.
     */
    _addMultiDatesInfo: function(vColl) {
        vColl.each(function(viewModel) {
            var model = viewModel.model;
            var start = model.getStarts();
            var end = model.getEnds();

            viewModel.hasMultiDates = !datetime.isSameDate(start, end);

            if (!model.isAllDay && viewModel.hasMultiDates) {
                viewModel.renderStarts = datetime.start(start);
                viewModel.renderEnds = datetime.convertStartDayToLastDay(end);
            }
        });
    },

    /**
     * Find schedule and get view model for specific month
     * @this Base
     * @param {TZDate} start - start date to find schedules
     * @param {TZDate} end - end date to find schedules
     * @param {function[]} [andFilters] - optional filters to applying search query
     * @param {boolean} [alldayFirstMode=false] if true, time schedule is lower than all-day schedule. Or stack schedules from the top.
     * @returns {object} view model data
     */
    findByDateRange: function(start, end, andFilters, alldayFirstMode) {
        var ctrlCore = this.Core,
            ctrlMonth = this.Month,
            filter = ctrlCore.getScheduleInDateRangeFilter(start, end),
            coll, vColl, vList,
            collisionGroup,
            matrices;

        alldayFirstMode = alldayFirstMode || false;
        andFilters = andFilters || [];
        filter = Collection.and.apply(null, [filter].concat(andFilters));

        coll = this.schedules.find(filter);
        vColl = ctrlCore.convertToViewModel(coll);
        ctrlMonth._addMultiDatesInfo(vColl);
        ctrlMonth._adjustRenderRange(start, end, vColl);
        vList = vColl.sort(array.compare.schedule.asc);

        collisionGroup = ctrlCore.getCollisionGroup(vList);
        matrices = ctrlCore.getMatrices(vColl, collisionGroup);
        ctrlCore.positionViewModels(start, end, matrices, ctrlMonth._weightTopValue);
        if (alldayFirstMode) {
            ctrlMonth._adjustTimeTopIndex(vColl);
        } else {
            ctrlMonth._stackTimeFromTop(vColl);
        }

        return matrices;
    }
};

module.exports = Month;
