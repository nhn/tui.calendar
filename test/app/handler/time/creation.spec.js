/*eslint-disable*/
var tc = ne.dooray.calendar.TimeCreation,
    proto = tc.prototype;
describe('module:Time.Creation', function() {
    it('checkExpectedCondition()', function() {
        var el = document.createElement('div');
        el.setAttribute('class', 'view-fake');

        expect(proto.checkExpectedCondition(el)).toBe(false);

        el.setAttribute('class', 'view-time-date');
        expect(proto.checkExpectedCondition(el)).toBe(false);

        el.setAttribute('class', 'view-time-date view-12');
        expect(proto.checkExpectedCondition.call({timeGridView: {childs:{items:{12: 'good'}}}}, el)).toBe('good');
    });

    it('_nearest()', function() {
        expect(proto._nearest(0.5, [0.3, 0.6, 0.9])).toBe(0.6);
        expect(proto._nearest(13, [5, 9, 11, 12, 15])).toBe(12);
        expect(proto._nearest(0.12, [0.5, 0.1, 0.11, 0.3])).toBe(0.11);
    });

    it('_calcGridYIndex()', function() {
        // 24시간이 100px일 때  50px은 12시임
        expect(proto._calcGridYIndex(86400000, 100, 50)).toBe(12);
        // 3시간이 100px일 때 50px는 1.5시간인데, 30분 단위로 반올림
        // 처리를 하므로 1이 되고, 51px는 1.5가 된다.
        expect(proto._calcGridYIndex(10800000, 100, 50)).toBe(1);
        expect(proto._calcGridYIndex(10800000, 100, 51)).toBe(1.5);
    });
});

