/**
 * @fileoverview Month view factory module
 * @author NHN FE Development Lab <dl_javascript@nhn.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../config'),
    array = require('../common/array'),
    datetime = require('../common/datetime'),
    domutil = require('../common/domutil'),
    common = require('../common/common'),
    Month = require('../view/month/month'),
    MonthClick = require('../handler/month/click'),
    MonthCreation = require('../handler/month/creation'),
    MonthResize = require('../handler/month/resize'),
    MonthMove = require('../handler/month/move'),
    More = require('../view/month/more'),
    ScheduleCreationPopup = require('../view/popup/scheduleCreationPopup'),
    ScheduleDetailPopup = require('../view/popup/scheduleDetailPopup'),
    Schedule = require('../model/schedule');

/**
 * Get the view model for more layer
 * @param {TZDate} date - date has more schedules
 * @param {HTMLElement} target - target element
 * @param {Collection} schedules - schedule collection
 * @param {string[]} daynames - daynames to use upside of month more view
 * @returns {object} view model
 */
function getViewModelForMoreLayer(date, target, schedules, daynames) {
    schedules.each(function(schedule) {
        var model = schedule.model;
        schedule.hasMultiDates = !datetime.isSameDate(model.start, model.end);
    });

    return {
        target: target,
        date: datetime.format(date, 'YYYY.MM.DD'),
        dayname: daynames[date.getDay()],
        schedules: schedules.sort(array.compare.schedule.asc)
    };
}

/**
 * @param {Base} baseController - controller instance
 * @param {HTMLElement} layoutContainer - container element for month view
 * @param {Drag} dragHandler - drag handler instance
 * @param {object} options - options
 * @returns {object} view instance and refresh method
 */
function createMonthView(baseController, layoutContainer, dragHandler, options) {
    var monthViewContainer, monthView, moreView, createView;
    var clickHandler, creationHandler, resizeHandler, moveHandler, clearSchedulesHandler, onUpdateSchedule;
    var onShowCreationPopup, onSaveNewSchedule, onShowEditPopup;
    var detailView, onShowDetailPopup, onDeleteSchedule, onEditSchedule;

    monthViewContainer = domutil.appendHTMLElement(
        'div', layoutContainer, config.classname('month'));

    monthView = new Month(options, monthViewContainer, baseController.Month);
    moreView = new More(options.month, layoutContainer, baseController.theme);

    // handlers
    clickHandler = new MonthClick(dragHandler, monthView, baseController);
    if (!options.isReadOnly) {
        creationHandler = new MonthCreation(dragHandler, monthView, baseController, options);
        resizeHandler = new MonthResize(dragHandler, monthView, baseController);
        moveHandler = new MonthMove(dragHandler, monthView, baseController);
    }

    clearSchedulesHandler = function() {
        if (moreView) {
            moreView.hide();
        }
    };

    onUpdateSchedule = function() {
        if (moreView) {
            moreView.refresh();
        }
    };

    // binding +n click schedule
    clickHandler.on('clickMore', function(clickMoreSchedule) {
        var date = clickMoreSchedule.date,
            target = clickMoreSchedule.target,
            schedules = util.pick(baseController.findByDateRange(
                datetime.start(date),
                datetime.end(date)
            ), clickMoreSchedule.ymd);

        schedules.items = util.filter(schedules.items, function(item) {
            return options.month.scheduleFilter(item.model);
        });

        if (schedules && schedules.length) {
            moreView.render(getViewModelForMoreLayer(date, target, schedules, monthView.options.daynames));

            schedules.each(function(scheduleViewModel) {
                if (scheduleViewModel) {
                    /**
                     * @event More#afterRenderSchedule
                     */
                    monthView.fire('afterRenderSchedule', {schedule: scheduleViewModel.model});
                }
            });

            monthView.fire('clickMore', {
                date: clickMoreSchedule.date,
                target: moreView.getMoreViewElement()
            });
        }
    });

    // binding popup for schedules creation
    if (options.useCreationPopup) {
        createView = new ScheduleCreationPopup(layoutContainer, baseController.calendars, options.usageStatistics);

        onSaveNewSchedule = function(scheduleData) {
            creationHandler.fire('beforeCreateSchedule', util.extend(scheduleData, {
                useCreationPopup: true
            }));
        };
        createView.on('beforeCreateSchedule', onSaveNewSchedule);
    }

    // binding popup for schedule detail
    if (options.useDetailPopup) {
        detailView = new ScheduleDetailPopup(layoutContainer, baseController.calendars);
        onShowDetailPopup = function(eventData) {
            var scheduleId = eventData.schedule.calendarId;
            eventData.calendar = common.find(baseController.calendars, function(calendar) {
                return calendar.id === scheduleId;
            });

            if (options.isReadOnly) {
                eventData.schedule = util.extend({}, eventData.schedule, {isReadOnly: true});
            }

            detailView.render(eventData);
        };
        onDeleteSchedule = function(eventData) {
            if (creationHandler) {
                creationHandler.fire('beforeDeleteSchedule', eventData);
            }
        };
        onEditSchedule = function(eventData) {
            moveHandler.fire('beforeUpdateSchedule', eventData);
        };

        clickHandler.on('clickSchedule', onShowDetailPopup);

        detailView.on('beforeDeleteSchedule', onDeleteSchedule);

        if (options.useCreationPopup) {
            onShowEditPopup = function(eventData) {
                createView.setCalendars(baseController.calendars);
                createView.render(eventData);
            };
            createView.on('beforeUpdateSchedule', onEditSchedule);
            detailView.on('beforeUpdateSchedule', onShowEditPopup);
        } else {
            detailView.on('beforeUpdateSchedule', onEditSchedule);
        }
    }

    // binding clear schedules
    baseController.on('clearSchedules', clearSchedulesHandler);

    // bind update schedule event
    baseController.on('updateSchedule', onUpdateSchedule);

    if (moveHandler) {
        moveHandler.on('monthMoveStart_from_morelayer', function() {
            moreView.hide();
        });
    }

    monthView.handler = {
        click: {
            'default': clickHandler
        }
    };

    if (!options.isReadOnly) {
        monthView.handler = util.extend(monthView.handler, {
            creation: {
                'default': creationHandler
            },
            resize: {
                'default': resizeHandler
            },
            move: {
                'default': moveHandler
            }
        });
    }

    monthView._beforeDestroy = function() {
        moreView.destroy();
        baseController.off('clearSchedules', clearSchedulesHandler);
        baseController.off('updateSchedule', onUpdateSchedule);

        util.forEach(monthView.handler, function(type) {
            util.forEach(type, function(handler) {
                handler.off();
                handler.destroy();
            });
        });

        if (options.useCreationPopup && options.useDetailPopup) {
            createView.off('beforeUpdateSchedule', onUpdateSchedule);
        }

        if (options.useCreationPopup) {
            if (creationHandler) {
                creationHandler.off('beforeCreateSchedule', onShowCreationPopup);
            }
            createView.off('saveSchedule', onSaveNewSchedule);
            createView.destroy();
        }

        if (options.useDetailPopup) {
            clickHandler.off('clickSchedule', onShowDetailPopup);
            detailView.off('beforeUpdateSchedule', onUpdateSchedule);
            detailView.off('beforeDeleteSchedule', onDeleteSchedule);
            detailView.destroy();
        }
    };

    // add controller
    monthView.controller = baseController.Month;

    return {
        view: monthView,
        refresh: function() {
            monthView.vLayout.refresh();
        },
        openCreationPopup: function(schedule) {
            if (createView && creationHandler) {
                creationHandler.invokeCreationClick(Schedule.create(schedule));
            }
        },
        showCreationPopup: function(eventData) {
            if (createView) {
                createView.setCalendars(baseController.calendars);
                createView.render(eventData);
            }
        },
        hideMoreView: function() {
            if (moreView) {
                moreView.hide();
            }
        }
    };
}

module.exports = createMonthView;
