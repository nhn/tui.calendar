/*eslint-disable*/
var core = require('handler/time/core');
var TZDate = require('common/timezone').Date;
var Time = require('view/week/time');

describe('module:Time.Creation', function() {
    it('_calcGridYIndex()', function() {
        // 50px is 12 o'clock when 24 hours is 100px
        expect(core._calcGridYIndex(86400000, 100, 50)).toBe(12);
        // When 3 hours is 100px, 50px is 1.5 hours, which is rounded up to 30 minutes, so it becomes 1 and 51px becomes 1.5.
        expect(core._calcGridYIndex(10800000, 100, 50)).toBe(1);
        expect(core._calcGridYIndex(10800000, 100, 51)).toBe(1.5);
    });

    it('_retriveScheduleData()', function() {
        var container = document.createElement('div');
        container.style.height = '100px';
        spyOn(container, 'getBoundingClientRect').and.returnValue({
            left: 0,
            top: 0
        });
        container.clientLeft = 0;
        container.clientTop = 0;

        var time = new Time({ width: 100 }, container);

        spyOn(time, 'getDate').and.returnValue(new Date('2015-05-05T00:00:00'));
        spyOn(time, 'getViewBound').and.returnValue({
            height: 230
        });

        var func = core._retriveScheduleData(time);

        // center of timeview grid.
        var vMouseEvent = {
            target: 'hello',
            clientX: 10,
            clientY: 115,
            type: 'click'
        };

        var expected = {
            target: 'hello',
            relatedView: time,
            originEvent: vMouseEvent,
            mouseY: 115,
            gridY: 12,
            timeY: new TZDate('2015-05-05T12:00:00'),
            nearestGridY: 12,
            nearestGridTimeY: new TZDate('2015-05-05T12:00:00'),
            triggerEvent: 'click'
        };

        expect(func(vMouseEvent)).toEqual(expected);
    });
});
