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

var DEFAULT_VIEW_SEQUENCE = ['Milestone', 'Task', 'AllDay', 'TimeGrid'];
var DEFAULT_VIEWS = {
    'Milestone': {
        minHeight: 20,
        height: 80,
        maxHeight: 80,
        show: true
    },
    'Task': {
        minHeight: 40,
        height: 120,
        maxHeight: 120,
        show: true
    },
    'AllDay': {
        minHeight: 20,
        height: 80,
        maxHeight: 80,
        show: true,
        maxExpandCount: 10
    },
    'TimeGrid': {
        autoHeight: true,
        show: true
    }
};

/* eslint-disable complexity*/
module.exports = function(baseController, layoutContainer, dragHandler, options) {
    var weekView, dayNameContainer, dayNameView, vLayoutContainer, vLayout,
        milestoneView, taskView, alldayView, timeGridView;
    var viewSequence = options.week.viewSequence || DEFAULT_VIEW_SEQUENCE,
        views = options.week.views || DEFAULT_VIEWS,
        panels = [];
    var alldayPanel;

    weekView = new Week(null, options.week, layoutContainer);
    weekView.handler = {
        click: {},
        dayname: {},
        creation: {},
        move: {},
        resize: {}
    };

    // Change visibilities
    util.forEach(views, function(value, key) {
        if (key === 'Milestone' || key === 'Task') {
            value.show = options.taskView;
        } else if (key === 'AllDay' || key === 'TimeGrid') {
            value.show = options.scheduleView;
        }
    });

    // Make panels by view sequence and visibilities
    util.forEach(viewSequence, function(name) {
        var view = views[name];
        if (view.show) {
            if (panels.length) {
                panels.push({
                    isSplitter: true
                });
            }
            panels.push(util.extend({
                name: name
            }, view));
        }
    });

    if (panels.length) {
        panels[panels.length - 1].autoHeight = true;
        panels[panels.length - 1].maxHeight = null;
    }

    dayNameContainer = domutil.appendHTMLElement('div', weekView.container, config.classname('dayname-layout'));

    /**********
     * 일자표기 (상단 일월화수...)
     **********/
    dayNameView = new DayName(options.week, dayNameContainer);
    weekView.handler.dayname.date = new DayNameClick(dragHandler, dayNameView, baseController);
    weekView.addChild(dayNameView);

    /**********
     * 수직 레이아웃 모듈 초기화
     **********/
    vLayoutContainer = domutil.appendHTMLElement('div', weekView.container, config.classname('vlayout-area'));
    vLayoutContainer.style.height = (domutil.getSize(weekView.container)[1] - dayNameView.container.offsetHeight) + 'px';

    vLayout = new VLayout({
        panels: panels,
        panelHeights: options.week.panelHeights || []
    }, vLayoutContainer);

    weekView.vLayout = vLayout;

    if (util.pick(views, 'Milestone').show) {
        /**********
         * 마일스톤
         **********/
        milestoneView = new Milestone(options.week, vLayout.getPanelByName('Milestone').container);
        milestoneView.on('afterRender', function(viewModel) {
            vLayout.getPanelByName('Milestone').setHeight(null, viewModel.height);
        });
        weekView.addChild(milestoneView);
        weekView.handler.click.milestone = new MilestoneClick(dragHandler, milestoneView, baseController);
    }

    if (util.pick(views, 'Task').show) {
        /**********
         * 업무
         **********/
        taskView = new TaskView(options.week, vLayout.getPanelByName('Task').container);
        taskView.on('afterRender', function(viewModel) {
            vLayout.getPanelByName('Task').setHeight(null, viewModel.height);
        });
        weekView.addChild(taskView);
        weekView.handler.click.task = new TaskClick(dragHandler, taskView, baseController);
    }

    if (util.pick(views, 'AllDay').show) {
        /**********
         * 종일일정
         **********/
        alldayPanel = vLayout.getPanelByName('AllDay');
        alldayView = new Allday(options.week, alldayPanel.container, alldayPanel.options);
        alldayView.on('afterRender', function() {
            alldayPanel.setHeight(null, alldayView.contentHeight);

            if (alldayView.options.alldayViewType === 'toggle') {
                alldayView.changeFoldButtonVisibility();
            }
        });

        weekView.addChild(alldayView);
        weekView.handler.click.allday = new AlldayClick(dragHandler, alldayView, baseController);
        weekView.handler.creation.allday = new AlldayCreation(dragHandler, alldayView, baseController);
        weekView.handler.move.allday = new AlldayMove(dragHandler, alldayView, baseController);
        weekView.handler.resize.allday = new AlldayResize(dragHandler, alldayView, baseController);

        weekView.handler.click.allday.on('clickExpand', function() {
            alldayView.prevMaxHeight = alldayView.aboutMe.maxHeight;
            alldayPanel.options.maxHeight = alldayView.getExpandMaxHeight();
            alldayPanel.isHeightForcedSet = false;
            alldayView.collapsed = false;
            alldayView.aboutMe.forcedLayout = false;
            weekView.render();
        });

        weekView.handler.click.allday.on('clickCollapse', function() {
            var newHeight = alldayView.prevMaxHeight;
            delete alldayView.prevMaxHeight;
            alldayPanel.options.maxHeight = newHeight;
            alldayPanel.setHeight(null, newHeight);
            alldayView.collapsed = true;
            weekView.render();
        });

        alldayPanel.on('resize', function() {
            alldayView.aboutMe.forcedLayout = true;
            weekView.render();
        });
    }

    if (util.pick(views, 'TimeGrid').show) {
        /**********
         * 시간별 일정
         **********/
        timeGridView = new TimeGrid(options.week, vLayout.getPanelByName('TimeGrid').container);
        weekView.addChild(timeGridView);
        weekView.handler.click.time = new TimeClick(dragHandler, timeGridView, baseController);
        weekView.handler.creation.time = new TimeCreation(dragHandler, timeGridView, baseController);
        weekView.handler.move.time = new TimeMove(dragHandler, timeGridView, baseController);
        weekView.handler.resize.time = new TimeResize(dragHandler, timeGridView, baseController);
    }

    weekView.on('afterRender', function() {
        vLayout.refresh();
    });

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
        scrollToNow: function() {
            if (timeGridView) {
                timeGridView.scrollToNow();
            }
        }
    };
};
