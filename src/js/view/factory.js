/**
 * @fileoverview Factory module for view.
 * @author NHN Ent. FE Development Team <e0242@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var domutil = require('../common/domutil');

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
        dragHandler = null;
    };

    if (name === 'Week') {
        layoutView.addChild(function(container) {
            var weekView = new Week(null, options, container);
            var dayNameView = new DayName(weekView.container);
            var timeGridView = new TimeGrid(options, weekView.container);
            // var timeCreationHandler = new TimeCreation(dragHandler, timeGridView);
            // var timeMoveHandler = new TimeMove(dragHandler, timeGridView);
            var timeResizeHandler = new TimeResize(dragHandler, timeGridView);

            weekView.addChild(dayNameView);
            weekView.addChild(timeGridView);

            // timeCreationHandler.on({
            //     'time_creation_dragstart': function(e) {
            //         console.log('dragstart:', e);
            //     },
            //     'time_creation_drag': function(e) {
            //         console.log('drag:', e);
            //     },
            //     'time_creation_dragend': function(e) {
            //         console.log('dragend:', e);
            //     },
            //     'time_creation_click': function(e) {
            //         console.log('click:', e);
            //     }
            // });
            // timeMoveHandler.on({
            //     'time_move_dragstart': function(e) {
            //         domutil.addClass(global.document.body, 'view-dragging');
            //         console.log('dragstart:', e);
            //     },
            //     'time_move_drag': function(e) {
            //         console.log('drag:', e);
            //     },
            //     'time_move_dragend': function(e) {
            //         domutil.removeClass(global.document.body, 'view-dragging');
            //         console.log('dragend:', e);
            //     },
            //     'time_move_click': function(e) {
            //         domutil.removeClass(global.document.body, 'view-dragging');
            //         console.log('click:', e);
            //     }
            // });
            timeResizeHandler.on({
                'time_resize_dragstart': function(e) {
                    domutil.addClass(global.document.body, 'view-resizing');
                    console.log('dragstart:', e);
                },
                'time_resize_drag': function(e) {
                    console.log('drag:', e);
                },
                'time_resize_dragend': function(e) {
                    domutil.removeClass(global.document.body, 'view-resizing');
                    console.log('dragend:', e);
                },
                'time_resize_click': function(e) {
                    domutil.removeClass(global.document.body, 'view-resizing');
                    console.log('click:', e);
                }
            });

            weekView.controller = baseController.Week;
            weekView._beforeDestroy = function() {
                timeCreationHandler.off();
                timeMoveHandler.off();
                timeResizeHandler.off();
                timeCreationHandler.destroy();
                timeMoveHandler.destroy();
                timeResizeHandler.destroy();

                timeCreationHandler = timeMoveHandler = timeResizeHandler = null;
            };

            return weekView;
        });
    }

    return layoutView;
};

