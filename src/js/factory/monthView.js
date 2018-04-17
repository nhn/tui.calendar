/**
 * @fileoverview Month view factory module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = require('tui-code-snippet');
var config = require('../config'),
    array = require('../common/array'),
    datetime = require('../common/datetime'),
    domutil = require('../common/domutil'),
    Month = require('../view/month/month'),
    MonthClick = require('../handler/month/click'),
    MonthCreation = require('../handler/month/creation'),
    MonthResize = require('../handler/month/resize'),
    MonthMove = require('../handler/month/move'),
    More = require('../view/month/more'),
    ScheduleCreationPopup = require('../view/popup/scheduleCreationPopup');

/**
 * Get the view model for more layer
 * @param {TZDate} date - date has more schedules
 * @param {HTMLElement} target - target element
 * @param {Collection} schedules - schedule collection
 * @returns {object} view model
 */
function getViewModelForMoreLayer(date, target, schedules) {
    schedules.each(function(schedule) {
        var model = schedule.model;
        schedule.hasMultiDates = !datetime.isSameDate(model.start, model.end);
    });

    return {
        target: target,
        date: datetime.format(date, 'YYYY.MM.DD'),
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
    var onShowCreationPopup, onSaveNewSchedule, onSetCalendars;

    monthViewContainer = domutil.appendHTMLElement(
        'div', layoutContainer, config.classname('month'));

    monthView = new Month(options.month, monthViewContainer, baseController.Month);
    moreView = new More(options.month, layoutContainer, baseController.theme);

    // handlers
    clickHandler = new MonthClick(dragHandler, monthView, baseController);
    creationHandler = new MonthCreation(dragHandler, monthView, baseController);
    resizeHandler = new MonthResize(dragHandler, monthView, baseController);
    moveHandler = new MonthMove(dragHandler, monthView, baseController);

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

    onSetCalendars = function(calendars) {
        if (createView) {
            createView.setCalendars(calendars);
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
            moreView.render(getViewModelForMoreLayer(date, target, schedules));
        }
    });

    // binding popup for schedules creation
    if (options.useCreationPopup) {
        createView = new ScheduleCreationPopup(layoutContainer, baseController.calendars);
        onShowCreationPopup = function(eventData) {
            createView.setCalendars(baseController.calendars);
            createView.render(eventData);
        };
        onSaveNewSchedule = function(scheduleData) {
            baseController.fire('saveSchedule', scheduleData);
        };
        creationHandler.on('beforeCreateSchedule', onShowCreationPopup);
        createView.on('saveSchedule', onSaveNewSchedule);
    }

    // binding clear schedules
    baseController.on('clearSchedules', clearSchedulesHandler);

    // bind update schedule event
    baseController.on('updateSchedule', onUpdateSchedule);

    // bind set calendar list event
    baseController.on('setCalendars', onSetCalendars);

    moveHandler.on('monthMoveStart_from_morelayer', function() {
        moreView.hide();
    });

    monthView.handler = {
        click: {
            'default': clickHandler
        },
        creation: {
            'default': creationHandler
        },
        resize: {
            'default': resizeHandler
        },
        move: {
            'default': moveHandler
        }
    };

    monthView._beforeDestroy = function() {
        moreView.destroy();
        baseController.off('clearSchedules', clearSchedulesHandler);
        baseController.off('updateSchedule', onUpdateSchedule);
        baseController.off('setCalendars', onSetCalendars);

        util.forEach(monthView.handler, function(type) {
            util.forEach(type, function(handler) {
                handler.off();
                handler.destroy();
            });
        });

        if (options.useCreationPopup) {
            creationHandler.off('beforeCreateSchedule', onShowCreationPopup);
            createView.off('saveSchedule', onSaveNewSchedule);
        }
    };

    // add controller
    monthView.controller = baseController.Month;

    return {
        view: monthView,
        refresh: function() {
            monthView.vLayout.refresh();
        }
    };
}

module.exports = createMonthView;

