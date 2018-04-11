/*eslint-disable*/
var TimeGrid = require('view/week/timeGrid');

describe('View/TimeGrid', function() {
    var proto;

    beforeEach(function() {
        proto = TimeGrid.prototype;
    });

    it('_getBaseViewModel()', function() {
        jasmine.clock().mockDate(new Date(2015, 0, 1, 3));

        var expected = {
            todaymarkerLeft: 1,
            hoursLabels: [
                {hours: 3, hidden: true},
                {hours: 4, hidden: false},
                {hours: 5, hidden: false},
                {hours: 6, hidden: false},
                {hours: 7, hidden: false},
                {hours: 8, hidden: false},
                {hours: 9, hidden: false},
                {hours: 10, hidden: false}
            ],
            styles: {}
        };

        var obj = {
            options: {
                hourStart: 3,
                hourEnd: 11
            },
            _getHourmarkerViewModel: function() {
                return {todaymarkerLeft: 1};
            },
            _getStyles: function() {
                return {};
            }
        };

        var result = proto._getBaseViewModel.call(obj, {});

        expect(result).toEqual(expected);

        jasmine.clock().uninstall();
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
            expect(proto._getTopPercentByTime.call(mock, new Date('2015-05-05T00:00:00+09:00'))).toBe(0);

            mock.options.hourStart = 21;
            expect(proto._getTopPercentByTime.call(mock, new Date('2015-05-05T22:30:00+09:00'))).toBe(50);

            mock.options.hourStart = 21;
            expect(proto._getTopPercentByTime.call(mock, new Date('2015-05-05T22:30:00+09:00'))).toBe(50);
        });

        it('calculate properly when hourStart, hourEnd is changed.', function() {
            mock.options.hourStart = 9;
            mock.options.hourEnd = 14;
            mock._getBaseViewModel = function() { return {hours: {length: 5}}; };

            expect(proto._getTopPercentByTime.call(mock, new Date('2015-05-05T11:00:00+09:00'))).toBe(40);
        });
    });
});
