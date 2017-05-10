/**
 * @fileoverview Factory module for WeekView
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../config');
var domutil = require('../common/domutil');
var VLayout = require('../common/vlayout');
// Parent views
var Week = require('../view/week/week');
// Sub views
var DayName = require('../view/week/dayname');
var TimeGrid = require('../view/week/timeGrid');
var Allday = require('../view/week/allday');
// Handlers
var AlldayClick = require('../handler/allday/click');
var AlldayCreation = require('../handler/allday/creation');
var AlldayMove = require('../handler/allday/move');
var AlldayResize = require('../handler/allday/resize');
var TimeClick = require('../handler/time/click');
var TimeCreation = require('../handler/time/creation');
var TimeMove = require('../handler/time/move');
var TimeResize = require('../handler/time/resize');

module.exports = function(baseController, layoutContainer, dragHandler, options) {
    var weekView,
        dayNameContainer,
        dayNameView,
        vLayoutContainer,
        vLayout,
        alldayView,
        timeGridView,
        alldayClickHandler,
        alldayDblClickHandler,
        alldayCreationHandler,
        alldayMoveHandler,
        alldayResizeHandler,
        timeClickHandler,
        timeDblClickHandler,
        timeCreationHandler,
        timeMoveHandler,
        timeResizeHandler;

    weekView = new Week(null, options.week, layoutContainer);
    dayNameContainer = domutil.appendHTMLElement('div', weekView.container, config.classname('dayname-layout'));

    /**********
     * 일자표기 (상단 일월화수...)
     **********/
    dayNameView = new DayName(null, dayNameContainer);
    weekView.addChild(dayNameView);

    /**********
     * 수직 레이아웃 모듈 초기화
     **********/
    vLayoutContainer = domutil.appendHTMLElement('div', weekView.container, config.classname('vlayout-area'));
    vLayoutContainer.style.height = (domutil.getSize(weekView.container)[1] -
                                     dayNameView.container.offsetHeight) + 'px';

    vLayout = new VLayout({
        panels: [
            {height: 52, minHeight: 52},
            {isSplitter: true},
            {autoHeight: true}
        ]
    }, vLayoutContainer);
    weekView.vLayout = vLayout;

    /**********
     * 종일일정
     **********/
    alldayView = new Allday(options.week, vLayout.panels[0].container);
    weekView.addChild(alldayView);
    alldayClickHandler = new AlldayClick(dragHandler, alldayView, baseController);
    alldayCreationHandler = new AlldayCreation(dragHandler, alldayView, baseController);
    alldayMoveHandler = new AlldayMove(dragHandler, alldayView, baseController);
    alldayResizeHandler = new AlldayResize(dragHandler, alldayView, baseController);

    /**********
     * 시간별 일정
     **********/
    timeGridView = new TimeGrid(options.week, vLayout.panels[2].container);
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
        }
    };
};
