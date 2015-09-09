/**
 * @fileoverview Base mixin object for handler/allday
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var datetime = require('../../datetime');
var common = require('../../common/common');

var config = require('../../config');
var CONTAINER_PADDING_LEFT = config.monthweek.view.CONTAINER_PADDING_LEFT;

var mmax = Math.max,
    mmin = Math.min;

/**
 * @mixin Allday.Core
 */
var alldayCore = {
    /**
     * @param {Allday} alldayView - view instance of allday.
     * @returns {function} function that return event data by mouse events.
     */
    _retriveEventData: function(alldayView) {
        var container = alldayView.container,
            renderStartDate,
            renderEndDate,
            datesInRange,
            containerWidth;

        renderStartDate = datetime.parse(alldayView.options.renderStartDate);
        renderEndDate = datetime.end(datetime.parse(alldayView.options.renderEndDate));
        datesInRange = datetime.range(renderStartDate, renderEndDate, datetime.MILLISECONDS_PER_DAY).length;
        containerWidth = domutil.getSize(container)[0] - CONTAINER_PADDING_LEFT;    // subtract container left padding.

        /**
         * @param {MouseEvent} mouseEvent - mouse event in drag actions.
         * @returns {object} event data.
         */
        return function(mouseEvent) {
            var pos = domevent.getMousePosition(mouseEvent, container),
                mouseX = pos[0] - CONTAINER_PADDING_LEFT,
                xIndex = common.ratio(containerWidth, datesInRange, mouseX) | 0;

            // apply limitation of creation event X index.
            xIndex = mmax(xIndex, 0);
            xIndex = mmin(xIndex, datesInRange - 1);

            return {
                datesInRange: datesInRange,
                xIndex: xIndex
            };
        };
    }
};

module.exports = alldayCore;

