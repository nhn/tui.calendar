/**
 * @fileoverview Core methods for dragging actions
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var common = require('../../common/common');
var datetime = require('../../common/datetime');
var domevent = require('../../common/domevent');
var Point = require('../../common/point');
var TZDate = require('../../common/timezone').Date;

/**
 * @mixin Time.Core
 */
var timeCore = {
    /**
     * Get Y index ratio(hour) in time grids by supplied parameters.
     * @param {number} baseMil - base milliseconds number for supplied height.
     * @param {number} height - container element height.
     * @param {number} y - Y coordinate to calculate hour ratio.
     * @returns {number} hour index ratio value.
     */
    _calcGridYIndex: function(baseMil, height, y) {
        // get ratio from right expression > point.y : x = session.height : baseMil
        // and convert milliseconds value to hours.
        var result = datetime.millisecondsTo('hour', (y * baseMil) / height),
            floored = result | 0,
            nearest = common.nearest(result - floored, [0, 1]);

        return floored + (nearest ? 0.5 : 0);
    },

    /**
     * Get function to makes event data from Time and mouseEvent
     * @param {Time} timeView - Instance of time view.
     * @returns {function} - Function that return event data from mouse event.
     */
    _retriveScheduleData: function(timeView) {
        var self = this,
            container = timeView.container,
            options = timeView.options,
            viewHeight = timeView.getViewBound().height,
            viewTime = timeView.getDate(),
            hourLength = options.hourEnd - options.hourStart,
            baseMil = datetime.millisecondsFrom('hour', hourLength);

        /**
         * @param {MouseEvent} mouseEvent - mouse event object to get common event data.
         * @param {object} [extend] - object to extend event data before return.
         * @returns {object} - common event data for time
         */
        return function(mouseEvent, extend) {
            var mouseY = Point.n(domevent.getMousePosition(mouseEvent, container)).y,
                gridY = common.ratio(viewHeight, hourLength, mouseY),
                timeY = new TZDate(viewTime).addMinutes(datetime.minutesFromHours(gridY)),
                nearestGridY = self._calcGridYIndex(baseMil, viewHeight, mouseY),
                nearestGridTimeY = new TZDate(viewTime).addMinutes(
                    datetime.minutesFromHours(nearestGridY + options.hourStart)
                );

            return util.extend({
                target: domevent.getEventTarget(mouseEvent),
                relatedView: timeView,
                originEvent: mouseEvent,
                mouseY: mouseY,
                gridY: gridY,
                timeY: timeY,
                nearestGridY: nearestGridY,
                nearestGridTimeY: nearestGridTimeY,
                triggerEvent: mouseEvent.type
            }, extend);
        };
    },

    /**
     * Get function to makes event data from Time and mouseEvent
     * @param {Time} timeView - Instance of time view.
     * @param {TZDate} startDate - start date
     * @param {TZDate} endDate - end date
     * @param {number} hourStart Can limit of render hour start.
     * @returns {object} - common event data for time from mouse event.
     */
    _retriveScheduleDataFromDate: function(timeView, startDate, endDate, hourStart) {
        var viewTime = timeView.getDate();
        var gridY, timeY, nearestGridY, nearestGridTimeY, nearestGridEndY, nearestGridEndTimeY;

        gridY = startDate.getHours() - hourStart + getNearestHour(startDate.getMinutes());
        timeY = new TZDate(viewTime).addMinutes(datetime.minutesFromHours(gridY));
        nearestGridY = gridY;
        nearestGridTimeY = new TZDate(viewTime).addMinutes(datetime.minutesFromHours(nearestGridY));
        nearestGridEndY = endDate.getHours() - hourStart + getNearestHour(endDate.getMinutes());
        nearestGridEndTimeY = new TZDate(viewTime).addMinutes(datetime.minutesFromHours(nearestGridEndY));

        return {
            target: timeView,
            relatedView: timeView,
            gridY: gridY,
            timeY: timeY,
            nearestGridY: nearestGridY,
            nearestGridTimeY: nearestGridTimeY,
            nearestGridEndY: nearestGridEndY,
            nearestGridEndTimeY: nearestGridEndTimeY,
            triggerEvent: 'manual',
            hourStart: hourStart
        };
    },

    /**
     * Mixin method.
     * @param {(TimeCreation|TimeMove)} obj - Constructor functions
     */
    mixin: function(obj) {
        var proto = obj.prototype;
        util.forEach(timeCore, function(method, methodName) {
            if (methodName === 'mixin') {
                return;
            }

            proto[methodName] = method;
        });
    }
};

/**
 * Get the nearest hour
 * @param {number} minutes - minutes
 * @returns {number} hour
 */
function getNearestHour(minutes) {
    var nearestHour;
    if (minutes === 0) {
        nearestHour = 0;
    } else if (minutes > 30) {
        nearestHour = 1;
    } else if (minutes <= 30) {
        nearestHour = 0.5;
    }

    return nearestHour;
}

module.exports = timeCore;
