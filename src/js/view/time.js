/**
 * @fileoverview View of time.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var array = require('../common/array');
var datetime = require('../datetime');
var domutil = require('../common/domutil');
var View = require('./view');
var EventViewModel = require('../model/viewModel/event');
var timeTmpl = require('./template/time.hbs');
var forEachArr = util.forEachArray;

/**
 * @constructor
 * @extends {View}
 * @param {number} width Date element width (percent)
 * @param {object} options Options
 * @param {string} options.ymd YYYMMDD string for this view
 * @param {boolean} options.isToday when set true then assign today design class to container.
 * @param {number} options.hourStart Can limit of render hour start.
 * @param {number} options.hourEnd Can limit of render hour end.
 * @param {HTMLElement} container Element to use container for this view.
 */
function Time(width, options, container) {
    View.call(this, null, container);

    container.style.width = width + '%';

    this.options = util.extend({
        ymd: '',
        isToday: false,
        hourStart: 0,
        hourEnd: 24
    }, options);

    if (this.options.isToday) {
        domutil.addClass(this.container, 'schedule-view-time-date-today');
    }
}

util.inherit(Time, View);

/**
 * Convert YYYYMMDD formatted string date to Date.
 * @param {string} str formatted string.
 * @returns {Date} start of date.
 */
Time.prototype._parseDateGroup = function(str) {
    var y = parseInt(str.substr(0, 4), 10),
        m = parseInt(str.substr(4, 2), 10),
        d = parseInt(str.substr(6, 2), 10);

    return new Date(y, m - 1, d);
};

/**
 * Make array with start and end times on events.
 * @param {array[]} matrix - matrix from controller.
 * @returns {array[]} starttime, endtime array (exclude first row's events)
 */
Time.prototype._generateRowMap = function(matrix) {
    var row,
        col,
        event,
        map = [],
        cursor = [],
        maxColLen = Math.max.apply(null, util.map(matrix, function(col) {
            return col.length;
        }));

    for (col = 1; col < maxColLen; col += 1) {
        for (row = 0; ;row += 1) {
            event = util.pick(matrix, row, col);

            if (!event) {
                break;
            }

            cursor.push([event.starts.getTime(), event.ends.getTime()]);
        }

        map.push(cursor);
        cursor = [];
    }

    return map;
};

/**
 * Get collision information from list
 * @param {array.<number[]>} arr - list to detecting collision. [[start, end], [start, end]]
 * @param {number} start - event start time that want to detect collisions.
 * @param {number} end - event end time that want to detect collisions.
 * @returns {boolean} target has collide in supplied array?
 */
Time.prototype._hasCollide = function(arr, start, end) {
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
};

/**
 * Set viewmodels for rendering.
 * @param {string} ymd The date of events. YYYYMMDD format.
 * @param {array} matrices The matrices for event placing.
 */
Time.prototype._getBaseViewModel = function(ymd, matrices) {
    var options = this.options,
        hourStart = options.hourStart,
        hourEnd = options.hourEnd,
        containerBound,
        todayStart,
        baseMil;

    /**
     * Calculate each event element bounds relative with rendered hour milliseconds and
     * wrap each event model to viewmodels.
     */
    containerBound = this.getViewBound();
    todayStart = this._parseDateGroup(ymd);
    baseMil = datetime.millisecondsFrom('hour', (hourEnd - hourStart));

    forEachArr(matrices, function(matrix) {
        var binaryMap,
            maxRowLength,
            widthPercent,
            leftPercents,
            i;

        binaryMap = this._generateRowMap(matrix);

        maxRowLength = Math.max.apply(null, util.map(matrix, function(row) {
            return row.length;
        }));

        widthPercent = 100 / maxRowLength;

        leftPercents = [];
        for (i = 0; i < maxRowLength; i += 1) {
            leftPercents[i] = widthPercent * i;
        }

        forEachArr(matrix, function(row) {
            forEachArr(row, function(event, col, scope) {
                var startTime,
                    endTime,
                    hasCollide,
                    collision = 0,
                    emptySpace = 1,
                    width,
                    height,
                    top,
                    i;

                if (!event) {
                    return;
                }

                top = event.starts - todayStart;
                if (hourStart) {
                    top -= datetime.millisecondsFrom('hour', hourStart);
                }
                // containerHeight : milliseconds in day = x : event's milliseconds
                top = (containerBound.height * top) / baseMil;
                height = (containerBound.height * event.duration()) / baseMil;

                startTime = event.starts.getTime() + 1;
                endTime = event.ends.getTime() - 1;

                // search real collision by using binary map.
                for (i = (col + 1); i < maxRowLength; i += 1) {
                    hasCollide = this._hasCollide(binaryMap[i - 1], startTime, endTime);

                    if (hasCollide) {
                        collision += 1;
                        break;
                    }

                    emptySpace += 1;
                }

                width = widthPercent * (emptySpace);

                // set width auto when has no collistions.
                if (!collision) {
                    width = null;
                }

                scope[col] = util.extend(EventViewModel.create(event), {
                    width: width,
                    height: height,
                    top: top,
                    left: leftPercents[col]
                });
            }, this);
        }, this);
    }, this);
};

/**
 * @returns {Date} - Date of this view.
 */
Time.prototype.getDate = function() {
    return this._parseDateGroup(this.options.ymd);
};


/**
 * @override
 * @param {string} ymd The date of events. YYYYMMDD format
 * @param {array} matrices Matrices for placing events
 */
Time.prototype.render = function(ymd, matrices) {
    this._getBaseViewModel(ymd, matrices);
    this.container.innerHTML = timeTmpl({
        matrices: matrices
    });
};

module.exports = Time;

