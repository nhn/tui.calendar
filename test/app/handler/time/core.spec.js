/*eslint-disable*/
var core = require('handler/time/core');
var Time = require('view/week/time');

describe('module:Time.Creation', function() {
    it('_calcGridYIndex()', function() {
        // 24시간이 100px일 때  50px은 12시임
        expect(core._calcGridYIndex(86400000, 100, 50)).toBe(12);
        // 3시간이 100px일 때 50px는 1.5시간인데, 30분 단위로 반올림
        // 처리를 하므로 1이 되고, 51px는 1.5가 된다.
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

        spyOn(time, 'getDate').and.returnValue(new Date('2015-05-05T00:00:00+09:00'));
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
            timeY: (new Date('2015-05-05T12:00:00+09:00').getTime()),
            nearestGridY: 12,
            nearestGridTimeY: (new Date('2015-05-05T12:00:00+09:00').getTime()),
            triggerEvent: 'click'
        };

        expect(func(vMouseEvent)).toEqual(expected);
    });
});
