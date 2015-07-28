/**
 * @fileoverview Handling creation events from drag handler and time grid view
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var number = require('../../common/number');
var domutil = require('../../common/domutil');
var domevent = require('../../common/domevent');
var Point = require('../../common/point');

var session = {};
var parseViewIDRx = /^view-time-date[\s]view-(\d+)/;
var HOUR_TO_MILLISECONDS = 60 * 60 * 1000;

var timeCreation = {
    connect: function(dragHandler, timeGridView) {
        dragHandler.on({
            dragStart: timeCreation.dragStart,
            drag: timeCreation.drag,
            dragEnd: timeCreation.dragEnd,
            click: timeCreation.click
        }, timeGridView);
    },

    calcHourByPoint: function(timeGridView, point) {
        var options = timeGridView.options,
            baseLength = options.hourEnd - options.hourStart,
            baseMil = baseLength * HOUR_TO_MILLISECONDS,
            result;

        // point.y : x = session.height : baseMil;
        result = (point.y * baseMil) / session.bound.height;
        // milliseconds to hours
        result = (result / 60 / 60 / 1000);
        // add hour offset from option.
        result += options.hourStart;

        // split by 30 minutes (0.5)
        if (+result.toFixed(1) - Math.floor(result) > 0.5) {
            result = Math.floor(result) + 0.5;
        } else {
            result = Math.floor(result);
        }

        return result;
    },

    dragStart: function(dragStartEvent) {
        var target = dragStartEvent.target,
            cssClass = domutil.getClass(target),
            baseElement,
            matches = cssClass.match(parseViewIDRx);

        if (!matches) {
            return;
        }

        baseElement = this.container.childNodes[0];

        session.targetView = this.childs.items[+matches[1]];
        session.bound = this.getViewBound.call({container: baseElement});
        session.dragStart = Point.n(domevent.getMousePosition(dragStartEvent.originEvent, baseElement));

        console.log(timeCreation.calcHourByPoint(this, session.dragStart));
    },

    drag: function(dragEvent) {},
    
    dragEnd: function(dragEndEvent) {},
    
    click: function() {}
};

module.exports = timeCreation;

