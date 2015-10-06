/**
 * @fileoverview Factory module for WeekView (customized for service)
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;

// Parent views
var Week = require('../../view/week');

// Sub views
var DayName = require('../../view/dayname');
var TimeGrid = require('../../view/timeGrid');
var Allday = require('../../view/allday');

// Handlers
var AlldayCreation = require('../../handler/allday/creation');
var AlldayMove = require('../../handler/allday/move');
var AlldayResize = require('../../handler/allday/resize');
var TimeCreation = require('../../handler/time/creation');
var TimeMove = require('../../handler/time/move');
var TimeResize = require('../../handler/time/resize');

module.exports = function(baseController, layoutContainer, dragHandler, options) {
    var weekView,
        dayNameView,
        alldayView,
        timeGridView,
        alldayOptions,
        alldayCreationHandler,
        alldayMoveHandler,
        alldayResizeHandler,
        timeCreationHandler,
        timeMoveHandler,
        timeResizeHandler;

    weekView = new Week(null, options.week, layoutContainer);

    // Dayname
    dayNameView = new DayName(weekView.container);
    weekView.addChild(dayNameView);

    /**********
     * AllDay View
     **********/
    alldayOptions = util.extend({
        title: null,
        height: 20
    }, options.week);

    // Allday - milestone
    alldayOptions.title = '마일스톤';
    alldayView = new Allday(alldayOptions, weekView.container);
    weekView.addChild(alldayView);
    // Allday - morning
    alldayOptions.title = '출근전';
    alldayView = new Allday(alldayOptions, weekView.container);
    weekView.addChild(alldayView);
    // Allday - lunch
    alldayOptions.title = '점심전';
    alldayView = new Allday(alldayOptions, weekView.container);
    weekView.addChild(alldayView);
    // Allday - evening
    alldayOptions.title = '퇴근전';
    alldayView = new Allday(alldayOptions, weekView.container);
    weekView.addChild(alldayView);
    // Allday - wholeDay
    alldayOptions.title = '종일일정';
    alldayView = new Allday(alldayOptions, weekView.container);
    alldayCreationHandler = new AlldayCreation(dragHandler, alldayView, baseController);
    alldayMoveHandler = new AlldayMove(dragHandler, alldayView, baseController);
    alldayResizeHandler = new AlldayResize(dragHandler, alldayView, baseController);
    weekView.addChild(alldayView);

    /**********
     * TimeGrid View
     **********/
    timeGridView = new TimeGrid(options.week, weekView.container);
    timeCreationHandler = new TimeCreation(dragHandler, timeGridView, baseController);
    timeMoveHandler = new TimeMove(dragHandler, timeGridView, baseController);
    timeResizeHandler = new TimeResize(dragHandler, timeGridView, baseController);

    weekView.handlers = {
        allday: {
            creation: alldayCreationHandler,
            move: alldayMoveHandler,
            resize: alldayResizeHandler
        },
        time: {
            creation: timeCreationHandler,
            move: timeMoveHandler,
            resize: timeResizeHandler
        }
    };

    weekView.addChild(timeGridView);

    // add controller
    weekView.controller = baseController.Week;

    // add destroy
    weekView._beforeDestroy = function() {
        timeCreationHandler.off();
        timeMoveHandler.off();
        timeResizeHandler.off();
        timeCreationHandler.destroy();
        timeMoveHandler.destroy();
        timeResizeHandler.destroy();

        alldayCreationHandler.off();
        alldayMoveHandler.off();
        alldayResizeHandler.off();
        alldayCreationHandler.destroy();
        alldayMoveHandler.destroy();
        alldayResizeHandler.destroy();

        delete weekView.handlers.time;
        delete weekView.handlers.allday;

        timeCreationHandler = timeMoveHandler = timeResizeHandler = null;
    };

    return weekView;
};
