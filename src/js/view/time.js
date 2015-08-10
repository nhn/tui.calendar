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
        domutil.addClass(this.container, 'view-time-date-today');
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

Time.prototype._getLastEventInColumn = function(matrix, col) {
    var row = 0,
        evt;

    for (;; row += 1) {
        evt = util.pick(matrix, row, col);
        if (!util.pick(matrix, row + 1, col)) {
            break;
        }
    }

    return evt;
};

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

            cursor.push({
                model: event,
                starts: event.starts.getTime(),
                ends: event.ends.getTime()
            });
        }

        map.push(cursor);
        cursor = [];
    }

    return map;
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
        baseMil,
        abs = Math.abs;


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
                var collision = 0,
                    emptySpace = 1,
                    map,
                    width,
                    height,
                    startStart,
                    startEnd,
                    endStart,
                    endEnd,
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

                // search real collision by using binary map.
                for (i = (col + 1); i < maxRowLength; i += 1) {
                    map = binaryMap[i - 1];

                    if (!map.length) {
                        break;
                    }

                    startStart = abs(array.bsearch(
                        map,
                        event.starts.getTime(),
                        function(m) { return m.starts + 1; },
                        array.compare.num.asc
                    ));

                    startEnd = abs(array.bsearch(
                        map,
                        event.starts.getTime(),
                        function(m) { return m.ends - 1; },
                        array.compare.num.asc
                    ));

                    endStart = abs(array.bsearch(
                        map,
                        event.ends.getTime(),
                        function(m) { return m.starts + 1; },
                        array.compare.num.asc
                    ));

                    endEnd = abs(array.bsearch(
                        map,
                        event.ends.getTime(),
                        function(m) { return m.ends - 1; },
                        array.compare.num.asc
                    ));

                    if (!(startStart === startEnd && startEnd === endStart && endStart === endEnd)) {
                        collision += 1;
                        break;
                    }

                    emptySpace += 1;
                }

                width = widthPercent * (emptySpace);

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

