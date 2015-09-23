/**
 * @fileoverview Factory module for control all other factory.
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.ne.util;
var datetime = require('../datetime');
var Layout = require('../view/layout');
var Drag = require('../handler/drag');
var controllerFactory = require('./controllerFactory');
var weekViewFactory = require('./weekViewFactory');
var Calendar = require('./calendar');

function setOptions(options) {
    var today = datetime.start(new Date()),
        dateRange;

    options = util.extend({
        defaultView: 'week',    // 기본 주간 뷰 설정
        week: null,
        month: null 
    }, options);

    if (!options.week) {
        dateRange = datetime.range(
            datetime.start(new Date(new Date(today).setDate(today.getDate() - 3))),
            datetime.end(new Date(new Date(today).setDate(today.getDate() + 3))),
            datetime.MILLISECONDS_PER_DAY
        );

        options.week = {
            renderStartDate: datetime.format(dateRange[0], 'YYYY-MM-DD'),
            renderEndDate: datetime.format(dateRange[6], 'YYYY-MM-DD')
        };
    }

    if (!options.month) {
        options.month = {
            renderMonth: datetime.format(today, 'YYYY-MM')
        };
    }

    return options;
}

module.exports = function(options, container) {
    var controller,
        layoutView,
        dragHandler;

    options = setOptions(options);

    // controller
    controller = controllerFactory();

    // layout manager
    layoutView = new Layout(container);

    // global drag handler
    dragHandler = new Drag(layoutView);

    /**********
     * SETTING - LAYOUT VIEW
     **********/
    layoutView.controller = controller;
    layoutView._beforeDestroy = function() {
        dragHandler.destroy();
        baseController.off();
        dragHandler = baseController = null;
    };

    /**********
     * SETTING - CONTROLLER and LAYOUT VIEW
     **********/
    function refresh() {
        //TODO: partial render (only weekView or only monthView)
        layoutView.render();
    }

    controller.on({
        updateEvent: refresh,
        createdEvent: refresh
    });

    /**********
     * CREATE CHILD VIEW
     **********/
    if (options.defaultView === 'week') {
        layoutView.addChild(function() {
            return weekViewFactory(
                controller, 
                layoutView.container, 
                dragHandler, 
                options
            );
        });
    }
    //TODO: month view
    
    return new Calendar(options, layoutView, controller);
}
