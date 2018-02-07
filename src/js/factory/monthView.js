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
    More = require('../view/month/more');

function findGridTarget(moreTarget, day) {
    var weekdayEl = domutil.closest(moreTarget, config.classname('.weekday'));
    var weekGridEls = domutil.find(config.classname('.weekday-grid-line'), weekdayEl, true);

    return weekGridEls[day];
}

function getViewModelForMoreLayer(date, target, schedules) {
    schedules.each(function(schedule) {
        var model = schedule.model;
        schedule.hasMultiDates = !datetime.isSameDate(model.start, model.end);
    });

    return {
        target: target,
        gridTarget: findGridTarget(target, date.getDay()),
        date: datetime.format(date, 'YYYY.MM.DD'),
        schedules: schedules.sort(array.compare.schedule.asc),
        width: target.offsetWidth
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
    var monthViewContainer, monthView, moreView;
    var clickHandler, creationHandler, resizeHandler, moveHandler, clearSchedulesHandler, onUpdateSchedule;

    monthViewContainer = domutil.appendHTMLElement(
        'div', layoutContainer, config.classname('month'));

    monthView = new Month(options.month, monthViewContainer, baseController.Month);
    moreView = new More(options.month, layoutContainer);

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

    // binding clear schedules
    baseController.on('clearSchedules', clearSchedulesHandler);

    // bind update schedule event
    baseController.on('updateSchedule', onUpdateSchedule);

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

        util.forEach(monthView.handler, function(type) {
            util.forEach(type, function(handler) {
                handler.off();
                handler.destroy();
            });
        });
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

