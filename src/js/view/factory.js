/**
 * @fileoverview Factory module for view.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

// Parent views
var Layout = require('./layout');
var Week = require('./week');

// Sub views
var DayName = require('./dayname');
var TimeGrid = require('./timeGrid');
var Allday = require('./allday');

// Handlers
var Drag = require('../handler/drag');
var AlldayCreation = require('../handler/allday/creation');
var AlldayMove = require('../handler/allday/move');
var AlldayResize = require('../handler/allday/resize');
var TimeCreation = require('../handler/time/creation');
var TimeMove = require('../handler/time/move');
var TimeResize = require('../handler/time/resize');

// Controllers
var controllerFactory = require('../controller/factory.js');

module.exports = function(name, options, container) {
    var layoutView,
        dragHandler,
        baseController;

    baseController = controllerFactory(['Week']);
    layoutView = new Layout(container);
    dragHandler = new Drag(layoutView);

    layoutView.controller = baseController;
    layoutView._beforeDestroy = function() {
        dragHandler.destroy();
        baseController.off();

        dragHandler = baseController = null;
    };

    function refresh() {
        layoutView.render();
    }

    baseController.on({
        updateEvent: refresh,
        createdEvent: refresh
    });

    if (name === 'Week') {
        layoutView.addChild(function(container) {
            var weekView,
                dayNameView,
                alldayView,
                timeGridView,
                alldayCreationHandler,
                alldayMoveHandler,
                alldayResizeHandler,
                timeCreationHandler,
                timeMoveHandler,
                timeResizeHandler;

            weekView = new Week(null, options, container);

            // Dayname
            dayNameView = new DayName(weekView.container);
            weekView.addChild(dayNameView);

            // Allday
            alldayView = new Allday(options, weekView.container);
            alldayCreationHandler = new AlldayCreation(dragHandler, alldayView, baseController);
            alldayMoveHandler = new AlldayMove(dragHandler, alldayView, baseController);
            alldayResizeHandler = new AlldayResize(dragHandler, alldayView, baseController);

            weekView.addChild(alldayView);

            // TimeGrid
            timeGridView = new TimeGrid(options, weekView.container);
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
        });
    }

    return layoutView;
};

