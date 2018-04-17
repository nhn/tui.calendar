'use strict';

var getMousePosData = require('handler/month/core');
var Month = require('view/month/month');
var WeekdayInMonth = require('view/month/weekdayInMonth');
var TZDate = require('common/timezone').Date;
var datetime = require('common/datetime');
var Theme = require('theme/theme');

describe('handler:MonthCore', function() {
    var m, w1, w2;
    var controller;

    beforeEach(function() {
        var container = document.createElement('div');
        container.style.width = '70px';
        container.style.height = '100px';

        controller = {
            theme: new Theme()
        };

        // January 2016 calendar first week, second week
        m = new Month(null, container, controller);

        // mock the container element
        m.vLayout.panels[1].container = container;

        w1 = new WeekdayInMonth({
            renderStartDate: '2015-12-27',
            renderEndDate: '2016-01-02'
        }, document.createElement('div'));
        w1._cacheParentViewModel = {
            range: datetime.range(
                datetime.start(datetime.parse('2015-12-27')),
                datetime.end(datetime.parse('2016-01-02')),
                datetime.MILLISECONDS_PER_DAY
            )
        };

        w2 = new WeekdayInMonth({
            renderStartDate: '2016-01-03',
            renderEndDate: '2016-01-09'
        }, document.createElement('div'));
        w2._cacheParentViewModel = {
            range: datetime.range(
                datetime.start(datetime.parse('2016-01-03')),
                datetime.end(datetime.parse('2016-01-09')),
                datetime.MILLISECONDS_PER_DAY
            )
        };

        m.addChild(w1);
        m.addChild(w2);
    });

    it('should calc date by mouse event.', function() {
        var func = getMousePosData(m);

        var mockMouseEvent = {
            clientX: 9,
            clientY: 20,
            type: 'click'
        };

        expect(func(mockMouseEvent)).toEqual({
            x: 0,
            y: 0,
            sizeX: 7,
            sizeY: 2,
            date: new TZDate('2015-12-27T00:00:00+09:00'),
            weekdayView: w1,
            triggerEvent: 'click'
        });

        mockMouseEvent = {
            clientX: 58,
            clientY: 60,
            type: 'click'
        };

        expect(func(mockMouseEvent)).toEqual({
            x: 5,
            y: 1,
            sizeX: 7,
            sizeY: 2,
            date: new TZDate('2016-01-08T00:00:00+09:00'),
            weekdayView: w2,
            triggerEvent: 'click'
        });
    });
});
