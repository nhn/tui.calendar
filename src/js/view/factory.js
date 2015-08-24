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

// Handlers
var Drag = require('../handler/drag');
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
            var weekView = new Week(null, options, container);
            var dayNameView = new DayName(weekView.container);
            var timeGridView = new TimeGrid(options, weekView.container);

            var timeCreationHandler = new TimeCreation(dragHandler, timeGridView, baseController);
            var timeMoveHandler = new TimeMove(dragHandler, timeGridView, baseController);
            var timeResizeHandler = new TimeResize(dragHandler, timeGridView, baseController);

            weekView.handlers = {
                time: {
                    creation: timeCreationHandler,
                    move: timeMoveHandler,
                    resize: timeResizeHandler
                }
            };

            weekView.addChild(dayNameView);
            weekView.addChild(timeGridView);

            weekView.controller = baseController.Week;
            weekView._beforeDestroy = function() {
                timeCreationHandler.off();
                timeMoveHandler.off();
                timeResizeHandler.off();
                timeCreationHandler.destroy();
                timeMoveHandler.destroy();
                timeResizeHandler.destroy();

                delete weekView.handlers.time;

                timeCreationHandler = timeMoveHandler = timeResizeHandler = null;
            };

            return weekView;
        });
    }

    return layoutView;
};

