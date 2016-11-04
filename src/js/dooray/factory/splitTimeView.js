/**
 * @fileoverview Factory module for WeekView (customized for service)
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';

var util = global.tui.util;
var config = require('../../config');
var domutil = require('../../common/domutil');
var VLayout = require('../../common/vlayout');

// Parent views
var Week = require('../../view/week/week');

// Sub views
var TimeGrid = require('../../view/week/splitTimeGrid');

// Handlers
var TimeClick = require('../../handler/time/click');
var TimeCreation = require('../../handler/time/creation');
var TimeMove = require('../../handler/time/move');
var TimeResize = require('../../handler/time/resize');

module.exports = function(baseController, layoutContainer, dragHandler, options) {
    var weekView,
        vLayoutContainer,
        vLayout,
        timeGridView,
        timeClickHandler;

    weekView = new Week(null, options, layoutContainer);
    /**********
     * 수직 레이아웃 모듈 초기화
     **********/
    vLayoutContainer = domutil.appendHTMLElement('div', weekView.container, config.classname('vlayout-area'));

    vLayout = new VLayout({
        panels: [
            {autoHeight: true}
        ],
        panelHeights: options.panelHeights || []
    }, vLayoutContainer);
    weekView.vLayout = vLayout;

    /**********
     * 시간별 일정
     **********/
    timeGridView = new TimeGrid(options, vLayout.panels[0].container);
    weekView.addChild(timeGridView);
    timeClickHandler = new TimeClick(dragHandler, timeGridView, baseController);

    weekView.on('afterRender', function() {
        vLayout.refresh();
    });

    weekView.handler = {
        click: {
            time: timeClickHandler
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
            vLayout.refresh();
        }
    };
};
