var Freebusy = ne.dooray.calendar.Freebusy;
describe('Freebusy', function() {
    it('_getBlockBound() calculate relative bound of blocks', function() {
        var event1 = {
            from: '2015-01-01T00:00:00+09:00',
            to: '2015-01-01T01:00:00+09:00'
        };

        var actual = Freebusy.prototype._getBlockBound(event1);
        expect(actual[0]).toBe(0);
        expect(actual[1]).toBeCloseTo(4.16, 1);

        var event2 = {
            from: '2015-01-01T09:30:00+09:00',
            to: '2015-02-02T11:30:00+09:00'
        };

        var actual = Freebusy.prototype._getBlockBound(event2);
        expect(actual[0]).toBeCloseTo(39.58, 1);
        expect(actual[1]).toBeCloseTo(8.33, 1);
    });

    it('_getMilliseconds() get milliseconds value from sum of hour, minutes, seconds from date object.', function() {
        var date1 = new Date('2015-11-20T09:00:00+09:00');
        expect(Freebusy.prototype._getMilliseconds(date1)).toBe(32400000);

        var date2 = '2015-01-20T03:30:00+09:00';
        expect(Freebusy.prototype._getMilliseconds(date2)).toBe(10800000 + 1800000);
    });
});
