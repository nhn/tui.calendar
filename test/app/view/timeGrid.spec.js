/*eslint-disable*/
var TimeGrid = ne.dooray.calendar.TimeGrid;
describe('View/TimeGrid', function() {
    var proto;

    beforeEach(function() {
        proto = TimeGrid.prototype;
    });

    it('_getBaseViewModel()', function() {
        var expected = {
            hours: [
                {hour: 3},
                {hour: 4},
                {hour: 5},
                {hour: 6},
                {hour: 7},
                {hour: 8},
                {hour: 9},
                {hour: 10}
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

    describe('_getTopByTime()', function() {
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
            // 12:00:00 is middle time of one days. return 150 when grid height is 300
            expect(proto._getTopByTime.call(mock, new Date('2015-05-05T12:00:00+09:00'))).toBe(150);
        });

        it('calculate properly when hourStart, hourEnd is changed.', function() {
            mock.options.hourStart = 9;
            mock.options.hourEnd = 14;
            mock._getBaseViewModel = function() { return {hours: {length: 5}}; };

            expect(proto._getTopByTime.call(mock, new Date('2015-05-05T11:00:00+09:00'))).toBe(120);
        });

        it('return 0 when view rendered yet.', function() {
            mock._getGridSize = function() {return false;};
            expect(proto._getTopByTime.call(mock, null)).toBe(0)
        });
    });
});
