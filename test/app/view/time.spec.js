/*eslint-disable*/
describe('View/Time', function() {
    var Time = ne.dooray.calendar.Time,
        CalEvent = ne.dooray.calendar.CalEvent,
        CalEventViewModel = ne.dooray.calendar.CalEventViewModel,
        datetime = ne.dooray.calendar.datetime;

    it('_parseDateGroup()', function() {
        var str = '20150501';

        expect(Time.prototype._parseDateGroup(str)).toEqual(new Date('2015-05-01T00:00:00+09:00'));
    });

    it('getEventViewBound()', function() {
        var event = CalEvent.create({
            starts: '2015-05-01T09:00:00+09:00',
            ends: '2015-05-01T10:00:00+09:00'
        });

        var viewModel = CalEventViewModel.create(event);

        var result = Time.prototype.getEventViewBound(viewModel, {
            todayStart: new Date('2015-05-01T00:00:00+09:00'),
            baseMS: datetime.millisecondsFrom('hour', 24),
            baseHeight: 230,
            baseLeft: [0, 50],
            baseWidth: 50,
            columnIndex: 1
        });

        expect(result.top).toBeCloseTo(86, 0);
        expect(result.left).toBe(50);
        expect(result.width).toBe(null);
        expect(result.height).toBeCloseTo(10, 0);
    });
});
