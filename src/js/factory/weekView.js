/**
 * @fileoverview Factory module for WeekView
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../config');
var domutil = require('../common/domutil');
var VLayout = require('../common/vlayout');
// Parent views
var Week = require('../view/week/week');

// Sub views
var DayName = require('../view/week/dayname');
var TimeGrid = require('../view/week/timeGrid');
var Allday = require('../view/week/allday');
var Milestone = require('../view/week/milestone');
var TaskView = require('../view/week/taskview');

// Handlers
var AlldayClick = require('../handler/allday/click');
var AlldayCreation = require('../handler/allday/creation');
var AlldayMove = require('../handler/allday/move');
var AlldayResize = require('../handler/allday/resize');
var DayNameClick = require('../handler/time/clickDayname');
var TimeClick = require('../handler/time/click');
var TimeCreation = require('../handler/time/creation');
var TimeMove = require('../handler/time/move');
var TimeResize = require('../handler/time/resize');
var MilestoneClick = require('../handler/milestone/click');
var TaskClick = require('../handler/task/click');

module.exports = function(baseController, layoutContainer, dragHandler, options) {
    var weekView, dayNameContainer, dayNameView, vLayoutContainer, vLayout,
        milestoneView, taskView, alldayView, timeGridView,
        milestoneClickHandler, taskClickHandler, alldayClickHandler, alldayCreationHandler,
        alldayMoveHandler, alldayResizeHandler, timeClickHandler, timeCreationHandler,
        timeMoveHandler, timeResizeHandler, daynameClickHandler,
        panels;

    weekView = new Week(null, options.week, layoutContainer);
    dayNameContainer = domutil.appendHTMLElement('div', weekView.container, config.classname('dayname-layout'));

    /**********
     * 일자표기 (상단 일월화수...)
     **********/
    dayNameView = new DayName(options.week, dayNameContainer);
    daynameClickHandler = new DayNameClick(dragHandler, dayNameView, baseController);
    weekView.addChild(dayNameView);

    /**********
     * 수직 레이아웃 모듈 초기화
     **********/
    vLayoutContainer = domutil.appendHTMLElement('div', weekView.container, config.classname('vlayout-area'));
    vLayoutContainer.style.height = (domutil.getSize(weekView.container)[1] -
                                     dayNameView.container.offsetHeight) + 'px';

    panels = [
        {height: 100, minHeight: 100},
        {isSplitter: true},
        {autoHeight: true}
    ];

    if (options.taskView) {
        panels = [
            {minHeight: 20, maxHeight: 80},
            {isSplitter: true},
            {minHeight: 40, maxHeight: 120},
            {isSplitter: true},
            {minHeight: 20, maxHeight: 80},
            {isSplitter: true},
            {autoHeight: true}
        ];
    }

    vLayout = new VLayout({
        panels: panels,
        panelHeights: options.week.panelHeights || []
    }, vLayoutContainer);

    weekView.vLayout = vLayout;

    if (options.taskView) {
        /**********
         * 마일스톤
         **********/
        milestoneView = new Milestone(options.week, vLayout.panels[0].container);
        milestoneView.on('afterRender', function(viewModel) {
            vLayout.panels[0].setHeight(null, viewModel.height);
        });
        weekView.addChild(milestoneView);
        milestoneClickHandler = new MilestoneClick(dragHandler, milestoneView, baseController);

        /**********
         * 업무
         **********/
        taskView = new TaskView(options.week, vLayout.panels[2].container);
        taskView.on('afterRender', function(viewModel) {
            vLayout.panels[2].setHeight(null, viewModel.height);
        });
        weekView.addChild(taskView);
        taskClickHandler = new TaskClick(dragHandler, taskView, baseController);
    }

    /**********
     * 종일일정
     **********/
    alldayView = new Allday(options.week, vLayout.panels[panels.length - 3].container);
    alldayView.on('afterRender', function() {
        vLayout.panels[panels.length - 3].setHeight(null, alldayView.contentHeight);
    });
    weekView.addChild(alldayView);
    alldayClickHandler = new AlldayClick(dragHandler, alldayView, baseController);
    alldayCreationHandler = new AlldayCreation(dragHandler, alldayView, baseController);
    alldayMoveHandler = new AlldayMove(dragHandler, alldayView, baseController);
    alldayResizeHandler = new AlldayResize(dragHandler, alldayView, baseController);

    /**********
     * 시간별 일정
     **********/
    timeGridView = new TimeGrid(options.week, vLayout.panels[panels.length - 1].container);
    weekView.addChild(timeGridView);
    timeClickHandler = new TimeClick(dragHandler, timeGridView, baseController);
    timeCreationHandler = new TimeCreation(dragHandler, timeGridView, baseController);
    timeMoveHandler = new TimeMove(dragHandler, timeGridView, baseController);
    timeResizeHandler = new TimeResize(dragHandler, timeGridView, baseController);

    weekView.on('afterRender', function() {
        vLayout.refresh();
    });

    weekView.handler = {
        click: {
            allday: alldayClickHandler,
            time: timeClickHandler
        },
        dayname: {
            date: daynameClickHandler
        },
        creation: {
            allday: alldayCreationHandler,
            time: timeCreationHandler
        },
        move: {
            allday: alldayMoveHandler,
            time: timeMoveHandler
        },
        resize: {
            allday: alldayResizeHandler,
            time: timeResizeHandler
        }
    };

    if (options.taskView) {
        weekView.handler.click.milestone = milestoneClickHandler;
        weekView.handler.click.task = taskClickHandler;
    }

    // add controller
    weekView.controller = baseController.Week;

    // add destroy
    weekView._beforeDestroy = function() {
        util.forEach(weekView.handler, function(type) {
            util.forEach(type, function(handler) {
                handler.off();
                handler.destroy();
            });
        });

        weekView.off();
    };

    return {
        view: weekView,
        refresh: function() {
            var weekViewHeight = weekView.getViewBound().height,
                daynameViewHeight = domutil.getBCRect(
                    dayNameView.container
                ).height;

            vLayout.container.style.height =
                weekViewHeight - daynameViewHeight + 'px';
            vLayout.refresh();
        },
        scrollToNow: timeGridView.scrollToNow.bind(timeGridView)
    };
};
