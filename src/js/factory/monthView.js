/**
 * @fileoverview Month view factory module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
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

function getViewModelForMoreLayer(date, target, events) {
    events.each(function(event) {
        var model = event.model;
        event.hasMultiDates = !datetime.isSameDate(model.starts, model.ends);
    });

    return {
        target: target,
        gridTarget: findGridTarget(target, date.getDay()),
        date: datetime.format(date, 'YYYY.MM.DD'),
        events: events.sort(array.compare.event.asc),
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
    var clickHandler, creationHandler, resizeHandler, moveHandler, clearEventsHandler;

    monthViewContainer = domutil.appendHTMLElement(
        'div', layoutContainer, config.classname('month'));

    monthView = new Month(options.month, monthViewContainer, baseController.Month);
    moreView = new More(layoutContainer);

    // handlers
    clickHandler = new MonthClick(dragHandler, monthView, baseController);
    creationHandler = new MonthCreation(dragHandler, monthView, baseController);
    resizeHandler = new MonthResize(dragHandler, monthView, baseController);
    moveHandler = new MonthMove(dragHandler, monthView, baseController);

    clearEventsHandler = function() {
        if (moreView) {
            moreView.hide();
        }
    };

    // binding +n click event
    clickHandler.on('clickMore', function(clickMoreEvent) {
        var date = clickMoreEvent.date,
            target = clickMoreEvent.target,
            events = util.pick(baseController.findByDateRange(
                datetime.start(date),
                datetime.end(date)
            ), clickMoreEvent.ymd);

        events.items = util.filter(events.items, function(item) {
            return options.month.eventFilter(item.model);
        });

        if (events && events.length) {
            moreView.render(getViewModelForMoreLayer(date, target, events));
        }
    });

    // binding clear events
    baseController.on('clearEvents', clearEventsHandler);

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
        baseController.off('clearEvents', clearEventsHandler);

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

