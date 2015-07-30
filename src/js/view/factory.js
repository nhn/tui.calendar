/**
 * @fileoverview Factory module for view.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;

// Parent views
var Layout = require('./layout');
var Week = require('./week');

// Sub views
var DayName = require('./dayname');
var TimeGrid = require('./timeGrid');

// Handlers
var Drag = require('../handler/drag');
var TimeCreation = require('../handler/time/creation');

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
        dragHandler = null;
    };

    if (name === 'Week') {
        layoutView.addChild(function(container) {
            var weekView = new Week(null, options, container);
            var dayNameView = new DayName(weekView.container);
            var timeGridView = new TimeGrid(options, weekView.container);
            var timeCreationHandler = new TimeCreation(dragHandler, timeGridView);
            // TODO: timeMoveHandler
            // TODO: timeResizeHandler

            weekView.addChild(dayNameView);
            weekView.addChild(timeGridView);

            weekView.controller = baseController.Week;
            weekView._beforeDestroy = function() {
                timeCreationHandler.destroy();
                timeCreationHandler = null;
            };

            return weekView;
        });
    }

    return layoutView;
};

