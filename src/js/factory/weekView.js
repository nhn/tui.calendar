/**
 * @fileoverview Factory module for WeekView
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../config');
var domutil = require('../common/domutil');
var VLayout = require('../common/vlayout');
var reqAnimFrame = require('../common/reqAnimFrame');
var Schedule = require('../model/schedule');
// Parent views
var Week = require('../view/week/week');

// Sub views
var DayName = require('../view/week/dayname');
var DayGrid = require('../view/week/dayGrid');
var TimeGrid = require('../view/week/timeGrid');
var ScheduleCreationPopup = require('../view/popup/scheduleCreationPopup');
var ScheduleDetailPopup = require('../view/popup/scheduleDetailPopup');

// Handlers
var DayNameClick = require('../handler/time/clickDayname');
var DayGridClick = require('../handler/daygrid/click');
var DayGridCreation = require('../handler/daygrid/creation');
var DayGridMove = require('../handler/daygrid/move');
var DayGridResize = require('../handler/daygrid/resize');
var TimeClick = require('../handler/time/click');
var TimeCreation = require('../handler/time/creation');
var TimeMove = require('../handler/time/move');
var TimeResize = require('../handler/time/resize');

var DAYGRID_HANDLDERS = {
    'click': DayGridClick,
    'creation': DayGridCreation,
    'move': DayGridMove,
    'resize': DayGridResize
};
var TIMEGRID_HANDLERS = {
    'click': TimeClick,
    'creation': TimeCreation,
    'move': TimeMove,
    'resize': TimeResize
};
var DEFAULT_PANELS = [
    {
        name: 'milestone',
        type: 'daygrid',
        minHeight: 20,
        maxHeight: 80,
        showExpandableButton: true,
        maxExpandableHeight: 210,
        handlers: ['click'],
        show: true
    },
    {
        name: 'task',
        type: 'daygrid',
        minHeight: 40,
        maxHeight: 120,
        showExpandableButton: true,
        maxExpandableHeight: 210,
        handlers: ['click', 'move'],
        show: true
    },
    {
        name: 'allday',
        type: 'daygrid',
        minHeight: 20,
        maxHeight: 80,
        showExpandableButton: true,
        maxExpandableHeight: 210,
        handlers: ['click', 'creation', 'move', 'resize'],
        show: true
    },
    {
        name: 'time',
        type: 'timegrid',
        autoHeight: true,
        handlers: ['click', 'creation', 'move', 'resize'],
        show: true
    }
];

/* eslint-disable complexity*/
module.exports = function(baseController, layoutContainer, dragHandler, options) {
    var panels = options.week.panels || DEFAULT_PANELS,
        vpanels = [];
    var weekView, dayNameContainer, dayNameView, vLayoutContainer, vLayout;
    var createView, onSaveNewSchedule, onSetCalendars;
    var detailView, onShowDetailPopup, onDeleteSchedule, onShowEditPopup, onEditSchedule;

    util.extend(options.week, {panels: panels});

    weekView = new Week(null, options.week, layoutContainer, panels);
    weekView.handler = {
        click: {},
        dayname: {},
        creation: {},
        move: {},
        resize: {}
    };

    // Make panels by view sequence and visibilities
    util.forEach(panels, function(panel) {
        var name = panel.name;

        // Change visibilities
        if (name === 'milestone' || name === 'task') {
            panel.show = options.taskView;
        } else if (name === 'allday' || name === 'time') {
            panel.show = options.scheduleView;
        }

        if (panel.show) {
            if (vpanels.length) {
                vpanels.push({
                    isSplitter: true
                });
            }
            vpanels.push(util.extend({}, panel));
        }
    });

    if (vpanels.length) {
        vpanels[vpanels.length - 1].autoHeight = true;
        vpanels[vpanels.length - 1].maxHeight = null;
    }

    dayNameContainer = domutil.appendHTMLElement('div', weekView.container, config.classname('dayname-layout'));

    /**********
     * Day name (top row(Mon, Tue, Wed...))
     **********/
    dayNameView = new DayName(options.week, dayNameContainer, baseController.theme);
    weekView.handler.dayname.date = new DayNameClick(dragHandler, dayNameView, baseController);
    weekView.addChild(dayNameView);

    /**********
     * Initialize vertical layout module
     **********/
    vLayoutContainer = domutil.appendHTMLElement('div', weekView.container, config.classname('vlayout-area'));
    vLayoutContainer.style.height = (domutil.getSize(weekView.container)[1] - dayNameView.container.offsetHeight) + 'px';

    vLayout = new VLayout({
        panels: vpanels,
        panelHeights: options.week.panelHeights || []
    }, vLayoutContainer, baseController.theme);

    weekView.vLayout = vLayout;

    util.forEach(panels, function(panel) {
        var name = panel.name;
        var handlers = panel.handlers;
        var view;

        if (!panel.show) {
            return;
        }

        if (panel.type === 'daygrid') {
            /**********
             * Schedule panel by Grid
             **********/
            view = new DayGrid(name, options.week, vLayout.getPanelByName(panel.name).container, baseController.theme);
            view.on('afterRender', function(viewModel) {
                vLayout.getPanelByName(name).setHeight(null, viewModel.height);
            });

            weekView.addChild(view);

            util.forEach(handlers, function(type) {
                weekView.handler[type][name] = new DAYGRID_HANDLDERS[type](dragHandler, view, baseController);
                view.addHandler(type, weekView.handler[type][name], vLayout.getPanelByName(name));
            });
        } else if (panel.type === 'timegrid') {
            /**********
             * Schedule panel by TimeGrid
             **********/
            view = new TimeGrid(name, options.week, vLayout.getPanelByName(name).container);
            weekView.addChild(view);
            util.forEach(handlers, function(type) {
                weekView.handler[type][name] = new TIMEGRID_HANDLERS[type](dragHandler, view, baseController);
            });
        }
    });

    vLayout.on('resize', function() {
        reqAnimFrame.requestAnimFrame(function() {
            weekView.render();
        });
    });

    // binding create schedules event
    if (options.useCreationPopup) {
        createView = new ScheduleCreationPopup(layoutContainer, baseController.calendars);

        onSaveNewSchedule = function(scheduleData) {
            util.extend(scheduleData, {
                useCreationPopup: true
            });
            if (scheduleData.isAllDay) {
                weekView.handler.creation.allday.fire('beforeCreateSchedule', scheduleData);
            } else {
                weekView.handler.creation.time.fire('beforeCreateSchedule', scheduleData);
            }
        };
        createView.on('beforeCreateSchedule', onSaveNewSchedule);
    }

    onSetCalendars = function(calendars) {
        if (createView) {
            createView.setCalendars(calendars);
        }
    };

    baseController.on('setCalendars', onSetCalendars);

    // binding popup for schedule detail
    if (options.useDetailPopup) {
        detailView = new ScheduleDetailPopup(layoutContainer, baseController.calendars);
        onShowDetailPopup = function(eventData) {
            var scheduleId = eventData.schedule.calendarId;
            eventData.calendar = baseController.calendars.find(function(calendar) {
                return calendar.id === scheduleId;
            });

            detailView.render(eventData);
        };
        onDeleteSchedule = function(eventData) {
            if (eventData.isAllDay) {
                weekView.handler.creation.allday.fire('beforeDeleteSchedule', eventData);
            } else {
                weekView.handler.creation.time.fire('beforeDeleteSchedule', eventData);
            }
        };
        onEditSchedule = function(eventData) {
            if (eventData.isAllDay) {
                weekView.handler.move.allday.fire('beforeUpdateSchedule', eventData);
            } else {
                weekView.handler.move.time.fire('beforeUpdateSchedule', eventData);
            }
        };

        util.forEach(weekView.handler.click, function(panel) {
            panel.on('clickSchedule', onShowDetailPopup);
        });
        if (options.useCreationPopup) {
            onShowEditPopup = function(eventData) {
                var calendars = baseController.calendars;
                eventData.isEditMode = true;
                createView.setCalendars(calendars);
                createView.render(eventData);
            };
            createView.on('beforeUpdateSchedule', onEditSchedule);
            detailView.on('beforeUpdateSchedule', onShowEditPopup);
        } else {
            detailView.on('beforeUpdateSchedule', onEditSchedule);
        }
        detailView.on('beforeDeleteSchedule', onDeleteSchedule);
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

        if (options.useCreationPopup) {
            createView.off('beforeCreateSchedule', onSaveNewSchedule);
            createView.destroy();
        }

        if (options.useDetailPopup) {
            detailView.off('beforeDeleteSchedule', onDeleteSchedule);
            detailView.destroy();
        }

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
            weekView.children.each(function(childView) {
                if (childView.scrollToNow) {
                    childView.scrollToNow();
                }
            });
        },
        openCreationPopup: function(schedule) {
            if (createView) {
                if (schedule.isAllDay) {
                    weekView.handler.creation.allday.invokeCreationClick(Schedule.create(schedule));
                } else {
                    weekView.handler.creation.time.invokeCreationClick(Schedule.create(schedule));
                }
            }
        },
        showCreationPopup: function(eventData) {
            if (createView) {
                createView.setCalendars(baseController.calendars);
                createView.render(eventData);
            }
        }
    };
};
