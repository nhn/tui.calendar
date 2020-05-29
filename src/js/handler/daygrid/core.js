/* eslint no-shadow: 0 */
/**
 * @fileoverview Base mixin object for handler/daygrid
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var common = require('../../common/common');
var datetime = require('../../common/datetime');

var mmax = Math.max,
    mmin = Math.min;

/**
 * @mixin dayGridCore
 */
var dayGridCore = {
    /**
     * @param {view} view - view instance.
     * @param {MouseEvent} mouseEvent - mouse schedule object.
     * @returns {function|boolean} function that return schedule data by mouse events.
     */
    _retriveScheduleData: function(view, mouseEvent) {
        var weekdayView = view.children.single(),
            container,
            datesInRange,
            containerWidth,
            mousePos,
            dragStartXIndex,
            grids,
            range;

        if (!weekdayView) {
            return false;
        }

        container = weekdayView.container;
        range = weekdayView.getRenderDateRange();
        datesInRange = range.length;
        grids = weekdayView.getRenderDateGrids();

        containerWidth = domutil.getSize(container)[0];
        mousePos = domevent.getMousePosition(mouseEvent, container);
        dragStartXIndex = getX(grids, common.ratio(containerWidth, 100, mousePos[0]));

        /**
         * @param {MouseEvent} mouseEvent - mouse schedule in drag actions.
         * @returns {object} schedule data.
         */
        return function(mouseEvent) {
            var pos = domevent.getMousePosition(mouseEvent, container),
                mouseX = pos[0],
                xIndex = getX(grids, common.ratio(containerWidth, 100, mouseX));

            // apply limitation of creation schedule X index.
            xIndex = mmax(xIndex, 0);
            xIndex = mmin(xIndex, datesInRange - 1);

            return {
                relatedView: view,
                dragStartXIndex: dragStartXIndex,
                datesInRange: datesInRange,
                xIndex: xIndex,
                triggerEvent: mouseEvent.type,
                grids: grids,
                range: range
            };
        };
    },

    /**
     * @param {view} view - view instance.
     * @param {TZDate} startDate - start date
     * @returns {object} schedule data by mouse events.
     */
    _retriveScheduleDataFromDate: function(view, startDate) {
        var weekdayView = view.children.single(),
            xIndex = 0,
            datesInRange,
            dragStartXIndex = 0,
            grids,
            range;

        if (!weekdayView) {
            return false;
        }

        range = weekdayView.getRenderDateRange();
        datesInRange = range.length;
        grids = weekdayView.getRenderDateGrids();

        util.forEach(range, function(date, index) {
            if (datetime.isSameDate(date, startDate)) {
                xIndex = dragStartXIndex = index;
            }
        });

        // apply limitation of creation schedule X index.
        xIndex = mmax(xIndex, 0);
        xIndex = mmin(xIndex, datesInRange - 1);

        return {
            relatedView: view,
            dragStartXIndex: dragStartXIndex,
            datesInRange: datesInRange,
            xIndex: xIndex,
            triggerEvent: 'manual',
            grids: grids,
            range: range
        };
    }
};

/**
 * Get the left index
 * @param {Array} grids - grid size information
 * @param {number} left - left position(percent)
 * @returns {number} grid left index
 */
function getX(grids, left) {
    var i = 0;
    var length = grids.length;
    var grid;
    if (left < 0) {
        left = 0;
    }

    for (; i < length; i += 1) {
        grid = grids[i];
        if (grid.left <= left && left <= (grid.left + grid.width)) {
            return i;
        }
    }

    return i;
}

module.exports = dayGridCore;
