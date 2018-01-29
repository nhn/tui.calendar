/* eslint no-shadow: 0 */
/**
 * @fileoverview Base mixin object for handler/allday
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var common = require('../../common/common');

var mmax = Math.max,
    mmin = Math.min;

/**
 * @mixin Allday.Core
 */
var alldayCore = {
    /**
     * @param {Allday} alldayView - view instance of allday.
     * @param {MouseEvent} mouseEvent - mouse schedule object.
     * @returns {function|boolean} function that return schedule data by mouse events.
     */
    _retriveScheduleData: function(alldayView, mouseEvent) {
        var weekdayView = alldayView.children.single(),
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
                relatedView: alldayView,
                dragStartXIndex: dragStartXIndex,
                datesInRange: datesInRange,
                xIndex: xIndex,
                triggerEvent: mouseEvent.type,
                grids: grids,
                range: range
            };
        };
    }
};

function getX(grids, left) {
    var i = 0;
    var length = grids.length;
    var grid;
    for (; i < length; i += 1) {
        grid = grids[i];
        if (grid.left <= left && left <= (grid.left + grid.width)) {
            return i;
        }
    }

    return i;
}

module.exports = alldayCore;

