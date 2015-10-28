/**
 * @fileoverview Factory module for WeekView (customized for service)
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var domutil = require('../../common/domutil');

// Parent views
var Week = require('../../view/week/week');

// Sub views
var DayName = require('../../view/week/dayname');
var Milestone = require('../view/milestone');
var TaskView = require('../view/taskview');
var TimeGrid = require('../../view/week/timeGrid');
var Allday = require('../../view/week/allday');


// Handlers
var AlldayClick = require('../../handler/allday/click');
var AlldayCreation = require('../../handler/allday/creation');
var AlldayMove = require('../../handler/allday/move');
var AlldayResize = require('../../handler/allday/resize');
var TimeClick = require('../../handler/time/click');
var TimeCreation = require('../../handler/time/creation');
var TimeMove = require('../../handler/time/move');
var TimeResize = require('../../handler/time/resize');
var MilestoneClick = require('../handler/milestoneClick');
var TaskClick = require('../handler/taskClick');

// Base Templates
var weekViewTmpl = require('../../dooray/view/template/factory/weekView.hbs');

module.exports = function(baseController, layoutContainer, dragHandler, options) {
    var weekView,
        dayNameView,
        milestoneView,
        taskView,
        alldayView,
        timeGridView,
        milestoneClickHandler,
        taskClickHandler,
        alldayClickHandler,
        alldayCreationHandler,
        alldayMoveHandler,
        alldayResizeHandler,
        timeClickHandler,
        timeCreationHandler,
        timeMoveHandler,
        timeResizeHandler;

    weekView = new Week(null, options.week, layoutContainer);
    weekView.container.innerHTML = weekViewTmpl();

    /**********
     * 일자표기 (상단 일월화수...)
     **********/
    dayNameView = new DayName(null, domutil.find('.schedule-view-dayname-layout', weekView.container));
    weekView.addChild(dayNameView);

    /**********
     * 마일스톤
     **********/
    milestoneView = new Milestone(options.week, domutil.find('.schedule-view-milestone-layout'));
    weekView.addChild(milestoneView);
    milestoneClickHandler = new MilestoneClick(dragHandler, milestoneView, baseController);

    /**********
     * 업무
     **********/
    taskView = new TaskView(options.week, domutil.find('.schedule-view-milestone-layout'));
    weekView.addChild(taskView);
    taskClickHandler = new TaskClick(dragHandler, taskView, baseController);

    /**********
     * 종일일정
     **********/
    alldayView = new Allday(options.week, domutil.find('.schedule-view-allday-layout', weekView.container));
    alldayClickHandler = new AlldayClick(dragHandler, alldayView, baseController);
    alldayCreationHandler = new AlldayCreation(dragHandler, alldayView, baseController);
    alldayMoveHandler = new AlldayMove(dragHandler, alldayView, baseController);
    alldayResizeHandler = new AlldayResize(dragHandler, alldayView, baseController);
    weekView.addChild(alldayView);

    /**********
     * 시간별 일정
     **********/
    timeGridView = new TimeGrid(options.week, domutil.find('.schedule-view-timegrid-layout', weekView.container));
    timeClickHandler = new TimeClick(dragHandler, timeGridView, baseController);
    timeCreationHandler = new TimeCreation(dragHandler, timeGridView, baseController);
    timeMoveHandler = new TimeMove(dragHandler, timeGridView, baseController);
    timeResizeHandler = new TimeResize(dragHandler, timeGridView, baseController);

    weekView.handlers = {
        milestone: {
            click: milestoneClickHandler
        },
        task: {
            click: taskClickHandler
        },
        allday: {
            click: alldayClickHandler,
            creation: alldayCreationHandler,
            move: alldayMoveHandler,
            resize: alldayResizeHandler
        },
        time: {
            click: timeClickHandler,
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
        milestoneClickHandler.destroy();
        taskClickHandler.destroy();

        timeClickHandler.destroy();
        timeCreationHandler.destroy();
        timeMoveHandler.destroy();
        timeResizeHandler.destroy();

        alldayClickHandler.destroy();
        alldayCreationHandler.destroy();
        alldayMoveHandler.destroy();
        alldayResizeHandler.destroy();

        delete weekView.handlers.milestone;
        delete weekView.handlers.task;
        delete weekView.handlers.time;
        delete weekView.handlers.allday;

        taskClickHandler = milestoneClickHandler = null;
        timeClickHandler = timeCreationHandler = timeMoveHandler = timeResizeHandler = null;
        alldayClickHandler = alldayCreationHandler = alldayMoveHandler = alldayResizeHandler = null;
    };

    return weekView;
};
