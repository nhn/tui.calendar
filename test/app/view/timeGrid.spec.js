/*eslint-disable*/
var TimeGrid = ne.dooray.calendar.TimeGrid;
describe('View/TimeGrid', function() {
    var proto;

    beforeEach(function() {
        proto = TimeGrid.prototype;
    });

    it('_getBaseViewModel()', function() {
        var MockDate = jasmine.createSpyObj('Date', ['getHours']);
        spyOn(window, 'Date').and.returnValue(MockDate);
        MockDate.getHours.and.returnValue(3);

        var expected = {
            hours: [
                {hour: 3, isCurrent: true},
                {hour: 4, isCurrent: false},
                {hour: 5, isCurrent: false},
                {hour: 6, isCurrent: false},
                {hour: 7, isCurrent: false},
                {hour: 8, isCurrent: false},
                {hour: 9, isCurrent: false},
                {hour: 10, isCurrent: false}
            ]
        };
        var obj = {
            options: {
                hourStart: 3,
                hourEnd: 11
            }
        };

        var result = proto._getBaseViewModel.call(obj);

        expect(result).toEqual(expected);
    });

    describe('_getTopPercentByTime()', function() {
        var originDate,
            mock;

        beforeEach(function() {
            mock = {
                _getGridSize: function() { return [200, 300]; },
                _getBaseViewModel: function() { return {hours: {length: 24}} },
                options: {
                    hourStart: 0,
                    hourEnd: 24 
                }
            };
        });

        it('calculate related CSS top pixel value by time object.', function() {
            // 12:00:00 is middle time of one days. return 50%
            expect(proto._getTopPercentByTime.call(mock, new Date('2015-05-05T12:00:00+09:00'))).toBe(50);
        });

        it('calculate properly when hourStart, hourEnd is changed.', function() {
            mock.options.hourStart = 9;
            mock.options.hourEnd = 14;
            mock._getBaseViewModel = function() { return {hours: {length: 5}}; };

            expect(proto._getTopPercentByTime.call(mock, new Date('2015-05-05T11:00:00+09:00'))).toBe(120);
        });
    });
});
