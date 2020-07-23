/* eslint-disable complexity */
/**
 * @fileoverview Module for calculate date by month view and mouse event object
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var common = require('../../common/common'),
    domutil = require('../../common/domutil'),
    domevent = require('../../common/domevent'),
    datetime = require('../../common/datetime');
var mfloor = Math.floor;

/**
 * Get high order function that can calc date in mouse point
 * @param {Month} monthView - month view
 * @returns {function} function return event data by mouse event object
 */
function getMousePosDate(monthView) {
    var weekColl = monthView.children,
        weeks = weekColl.sort(function(a, b) {
            return util.stamp(a) - util.stamp(b);
        }),
        weekCount = weekColl.length,
        days = weekColl.single().getRenderDateRange(),
        dayCount = days.length,
        relativeContainer = util.pick(monthView.vLayout.panels[1], 'container'),
        size = domutil.getSize(relativeContainer),
        grids = monthView.grids;

    /**
     * Get the left index
     * @param {number} left - left position(percent)
     * @returns {number} grid left index
     */
    function getX(left) {
        var i = 0;
        var length = grids.length;
        var grid;
        for (; i < length; i += 1) {
            grid = grids[i];
            if (grid.left <= left && left <= (grid.left + grid.width)) {
                return i;
            }
        }

        return left < 0 ? -1 : i;
    }

    /**
     * Get date related with mouse event object
     * @param {object} mouseEvent - click event data
     * @returns {object} data related with mouse event
     */
    function getDate(mouseEvent) {
        var pos = domevent.getMousePosition(mouseEvent, relativeContainer),
            x = getX(common.ratio(size[0], 100, pos[0])),
            y = mfloor(common.ratio(size[1], weekCount, pos[1])),
            weekdayView,
            date,
            dateRange;

        if (y < 0) {
            y = 0;
        }
        if (y >= weeks.length) {
            y = weeks.length - 1;
        }

        weekdayView = util.pick(weeks, y);

        if (!weekdayView) {
            return null;
        }

        dateRange = weekdayView.getRenderDateRange();
        if (x < 0) {
            x = 0;
        }
        if (x >= dateRange.length) {
            x = dateRange.length - 1;
        }

        date = util.pick(dateRange, x);

        if (!date) {
            return null;
        }

        return {
            x: x,
            y: y,
            sizeX: dayCount,
            sizeY: weekCount,
            date: datetime.end(date),
            weekdayView: weekdayView,
            triggerEvent: mouseEvent.type
        };
    }

    return getDate;
}

module.exports = getMousePosDate;
