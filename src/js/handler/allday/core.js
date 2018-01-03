/* eslint no-shadow: 0 */
/**
 * @fileoverview Base mixin object for handler/allday
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var datetime = require('../../common/datetime');
var common = require('../../common/common');

var mmax = Math.max,
    mmin = Math.min;

/**
 * @mixin Allday.Core
 */
var alldayCore = {
    /**
     * @param {Allday} alldayView - view instance of allday.
     * @param {MouseEvent} mouseEvent - mouse event object.
     * @returns {function|boolean} function that return event data by mouse events.
     */
    _retriveEventData: function(alldayView, mouseEvent) {
        var weekdayView = alldayView.children.single(),
            container,
            renderStartDate,
            renderEndDate,
            datesInRange,
            containerWidth,
            mousePos,
            dragStartXIndex,
            grids;

        if (!weekdayView) {
            return false;
        }

        container = weekdayView.container;
        renderStartDate = datetime.parse(alldayView.options.renderStartDate);
        renderEndDate = datetime.end(datetime.parse(alldayView.options.renderEndDate));
        datesInRange = datetime.range(renderStartDate, renderEndDate, datetime.MILLISECONDS_PER_DAY).length;

        grids = datetime.getGridLeftAndWidth(
            datesInRange,
            alldayView.options.narrowWeekend,
            alldayView.options.startDayOfWeek
        );

        containerWidth = domutil.getSize(container)[0];
        mousePos = domevent.getMousePosition(mouseEvent, container);
        dragStartXIndex = getX(grids, common.ratio(containerWidth, 100, mousePos[0]));

        /**
         * @param {MouseEvent} mouseEvent - mouse event in drag actions.
         * @returns {object} event data.
         */
        return function(mouseEvent) {
            var pos = domevent.getMousePosition(mouseEvent, container),
                mouseX = pos[0],
                xIndex = getX(grids, common.ratio(containerWidth, 100, mouseX));

            // apply limitation of creation event X index.
            xIndex = mmax(xIndex, 0);
            xIndex = mmin(xIndex, datesInRange - 1);

            return {
                relatedView: alldayView,
                dragStartXIndex: dragStartXIndex,
                datesInRange: datesInRange,
                xIndex: xIndex,
                triggerEvent: mouseEvent.type,
                grids: grids
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

