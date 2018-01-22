/**
 * @fileoverview Base calendar controller
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var Schedule = require('../model/Schedule');
var ScheduleViewModel = require('../model/viewModel/ScheduleViewModel');
var datetime = require('../common/datetime');
var common = require('../common/common');

/**
 * @constructor
 * @param {object} options - options for base controller
 * @param {function} [options.groupFunc] - function for group each models {@see Collection#groupBy}
 * @mixes util.CustomEvents
 */
function Base(options) {
    options = options || {};

    /**
     * function for group each schedule models.
     * @type {function}
     * @param {ScheduleViewModel} viewModel - view model instance
     * @returns {string} group key
     */
    this.groupFunc = options.groupFunc || function(viewModel) {
        if (viewModel.model.isAllDay) {
            return 'allday';
        }
        return 'time';
    };

    /**
     * schedules collection.
     * @type {Collection}
     */
    this.schedules = common.createScheduleCollection();

    /**
     * Matrix for multidate schedules.
     * @type {object.<string, array>}
     */
    this.dateMatrix = {};
}

/**
 * Calculate contain dates in schedule.
 * @private
 * @param {Schedule} schedule The instance of schedule.
 * @returns {array} contain dates.
 */
Base.prototype._getContainDatesInSchedule = function(schedule) {
    var range = datetime.range(
        datetime.start(schedule.getStarts()),
        datetime.start(schedule.getEnds()),
        datetime.MILLISECONDS_PER_DAY
    );

    return range;
};

/**********
 * CRUD
 **********/

/**
 * Create an schedule instance from raw data.
 * @emits Base#beforeCreateSchedule
 * @emits Base#createdSchedule
 * @param {object} options Data object to create schedule.
 * @param {boolean} silent - set true then don't fire events.
 * @returns {Schedule} The instance of Schedule that created.
 */
Base.prototype.createSchedule = function(options, silent) {
    var schedule,
        scheduleData = {
            data: options
        };

    /**
     * @event Base#beforeCreateSchedule
     * @type {Calendar~Schedule[]}
     */
    if (!this.invoke('beforeCreateSchedule', scheduleData)) {
        return;
    }

    schedule = this.addSchedule(Schedule.create(options));

    if (!silent) {
        /**
         * @event Base#createdSchedule
         * @type {Schedule}
         */
        this.fire('createdSchedule', schedule);
    }

    return schedule;
};

/**
 * @emits Base#beforeCreateSchedule
 * @emits Base#createdSchedule
 * @param {Calendar~Schedule[]} dataList - dataObject list to create schedule.
 * @param {boolean} [silent=false] - set true then don't fire events.
 * @returns {Schedule[]} The instance list of Schedule that created.
 */
Base.prototype.createSchedules = function(dataList, silent) {
    var self = this;

    return util.map(dataList, function(data) {
        return self.createSchedule(data, silent);
    });
};

/**
 * Update an schedule.
 * @emits Base#updateSchedule
 * @param {Schedule} Schedule - schedule instance to update
 * @param {object} options updated object data.
 * @returns {Schedule} updated schedule instance
 */
Base.prototype.updateSchedule = function(Schedule, options) {
    var starts = options.starts || Schedule.starts;
    var ends = options.ends || Schedule.ends;

    options = options || {};

    if (options.title) {
        Schedule.set('title', options.title);
    }

    if (options.isAllDay) {
        Schedule.set('isAllDay', options.isAllDay);
    }

    if (options.starts || options.ends) {
        if (Schedule.isAllDay) {
            Schedule.setAllDayPeriod(starts, ends);
        } else {
            Schedule.setTimePeriod(starts, ends);
        }
    }

    if (options.color) {
        Schedule.set('color', options.color);
    }

    if (options.bgColor) {
        Schedule.set('bgColor', options.bgColor);
    }

    if (options.borderColor) {
        Schedule.set('borderColor', options.borderColor);
    }

    if (options.origin) {
        Schedule.set('origin', options.origin);
    }

    if (!util.isUndefined(options.isPending)) {
        Schedule.set('isPending', options.isPending);
    }

    if (!util.isUndefined(options.isFocused)) {
        Schedule.set('isFocused', options.isFocused);
    }

    this._removeFromMatrix(Schedule);
    this._addToMatrix(Schedule);

    /**
     * @event Base#updateSchedule
     */
    this.fire('updateSchedule');

    return Schedule;
};

/**
 * Delete schedule instance from controller.
 * @param {Schedule} Schedule - schedule instance to delete
 * @returns {Schedule} deleted model instance.
 */
Base.prototype.deleteSchedule = function(Schedule) {
    this._removeFromMatrix(Schedule);
    this.schedules.remove(Schedule);

    return Schedule;
};

/**
 * Set date matrix to supplied schedule instance.
 * @param {Schedule} schedule - instance of schedule.
 */
Base.prototype._addToMatrix = function(schedule) {
    var ownMatrix = this.dateMatrix;
    var containDates = this._getContainDatesInSchedule(schedule);

    util.forEach(containDates, function(date) {
        var ymd = datetime.format(date, 'YYYYMMDD'),
            matrix = ownMatrix[ymd] = ownMatrix[ymd] || [];

        matrix.push(util.stamp(schedule));
    });
};

/**
 * Remove schedule's id from matrix.
 * @param {Schedule} schedule - instance of schedule
 */
Base.prototype._removeFromMatrix = function(schedule) {
    var modelID = util.stamp(schedule);

    util.forEach(this.dateMatrix, function(matrix) {
        var index = util.inArray(modelID, matrix);

        if (~index) {
            matrix.splice(index, 1);
        }
    }, this);
};

/**
 * Add an schedule instance.
 * @emits Base#addedSchedule
 * @param {Schedule} schedule The instance of Schedule.
 * @param {boolean} silent - set true then don't fire events.
 * @returns {Schedule} The instance of Schedule that added.
 */
Base.prototype.addSchedule = function(schedule, silent) {
    this.schedules.add(schedule);
    this._addToMatrix(schedule);

    if (!silent) {
        /**
         * @event Base#addedSchedule
         * @type {object}
         */
        this.fire('addedSchedule', schedule);
    }

    return schedule;
};

/**
 * split schedule model by ymd.
 * @param {Date} starts - start date
 * @param {Date} ends - end date
 * @param {Collection} scheduleCollection - collection of schedule model.
 * @returns {object.<string, Collection>} splitted schedule model collections.
 */
Base.prototype.splitScheduleByDateRange = function(starts, ends, scheduleCollection) {
    var range = datetime.range(
            datetime.start(starts),
            datetime.start(ends),
            datetime.MILLISECONDS_PER_DAY
        ),
        ownMatrix = this.dateMatrix,
        result = {};

    util.forEachArray(range, function(date) {
        var ymd = datetime.format(date, 'YYYYMMDD'),
            matrix = ownMatrix[ymd],
            collection;

        collection = result[ymd] = common.createScheduleCollection();

        if (matrix && matrix.length) {
            util.forEachArray(matrix, function(id) {
                scheduleCollection.doWhenHas(id, function(schedule) {
                    collection.add(schedule);
                });
            });
        }
    });

    return result;
};

/**
 * Return schedules in supplied date range.
 *
 * available only YMD.
 * @param {Date} starts start date.
 * @param {Date} ends end date.
 * @returns {object.<string, Collection>} schedule collection grouped by dates.
 */
Base.prototype.findByDateRange = function(starts, ends) {
    var range = datetime.range(
            datetime.start(starts),
            datetime.start(ends),
            datetime.MILLISECONDS_PER_DAY
        ),
        ownSchedules = this.schedules.items,
        ownMatrix = this.dateMatrix,
        dformat = datetime.format,
        result = {},
        matrix,
        ymd,
        viewModels;

    util.forEachArray(range, function(date) {
        ymd = dformat(date, 'YYYYMMDD');
        matrix = ownMatrix[ymd];
        viewModels = result[ymd] = common.createScheduleCollection();

        if (matrix && matrix.length) {
            viewModels.add.apply(viewModels, util.map(matrix, function(id) {
                return ScheduleViewModel.create(ownSchedules[id]);
            }));
        }
    });

    return result;
};

Base.prototype.clearSchedules = function() {
    this.dateMatrix = {};
    this.schedules.clear();
    /**
     * for inner view when clear schedules
     * @event Base#clearSchedules
     * @type {Schedule}
     */
    this.fire('clearSchedules');
};

// mixin
util.CustomEvents.mixin(Base);

module.exports = Base;

