/**
 * @fileoverview Factory module for view.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
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

// Controllers
var controllerFactory = require('../controller/factory.js');

module.exports = function(name, options, container) {
    var layoutView,
        baseController,
        weekView,
        dayNameView,
        timeGridView;

    layoutView = new Layout(container);
    baseController = layoutView.controller = controllerFactory(['Week']);

    if (name === 'Week') {
        layoutView.addChild(function(container) {
            weekView = new Week(null, options, container);

            dayNameView = new DayName(weekView.container);
            weekView.addChild(dayNameView);

            timeGridView = new TimeGrid(options, weekView.container);
            weekView.addChild(timeGridView);

            weekView.controller = baseController.Week;

            return weekView;
        });
    }

    return layoutView;
};

