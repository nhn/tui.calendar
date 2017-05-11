var Weekday = require('view/weekday');
var WeekdayInMonth = require('view/month/weekdayInMonth');
var CalEvent = require('model/calEvent');
var CalEventViewModel = require('model/viewModel/calEvent');

describe('view:WeekdayInMonth', function() {
    var mockInst;

    describe('_getRenderLimitIndex()', function() {
        var mockGetViewBound;

        beforeEach(function() {
            mockGetViewBound = jasmine.createSpy('getViewBound');
        });

        it('should 2 when containerHeight 60, event block height is 20.', function() {

            mockGetViewBound.and.returnValue({height: 60});
            mockInst = {
                getViewBound: mockGetViewBound,
                options: {
                    heightPercent: 100,
                    eventHeight: 18,
                    eventGutter: 2
                }
            };

            expect(WeekdayInMonth.prototype._getRenderLimitIndex.call(mockInst)).toBe(1);
        });

        it('should 0 when containerHeight is 0.', function() {
            mockGetViewBound.and.returnValue({height: 0});
            mockInst = {
                getViewBound: mockGetViewBound,
                options: {
                    heightPercent: 100,
                    eventHeight: 18,
                    eventGutter: 2
                }
            };

            expect(WeekdayInMonth.prototype._getRenderLimitIndex
                   .call(mockInst)).toBe(0);
        });
    });

    describe('_getSkipHelper()', function() {
        it('should return helper that counting event period each date.', function() {
            var viewModel = CalEventViewModel.create(CalEvent.create({
                    title: 'A',
                    isAllDay: true,
                    starts: '2015-05-01T00:00:00',
                    ends: '2015-05-03T23:59:59'
                })),
                cache = {},
                helper = WeekdayInMonth.prototype._getSkipHelper(cache);

            helper.call(viewModel, cache);

            expect(cache).toEqual({
                '20150501': 1,
                '20150502': 1,
                '20150503': 1
            });
        });
    });

    describe('_getSkipLabelViewModel()', function() {
        var spy;

        beforeEach(function() {
            spy = spyOn(Weekday.prototype, 'getRenderDateRange');
        });

        it('should create view model by supplied skip data properly.', function() {
            var skipData = {
                '20150501': 1,
                '20150502': 2,
                '20150503': 4,
                '20150504': 4
            }

            spy.and.returnValue([
                new Date('2015-05-01T00:00:00+09:00'),
                new Date('2015-05-02T00:00:00+09:00'),
                new Date('2015-05-03T00:00:00+09:00'),
                new Date('2015-05-04T00:00:00+09:00'),
                new Date('2015-05-05T00:00:00+09:00'),
                new Date('2015-05-06T00:00:00+09:00')
            ]);

            expect(WeekdayInMonth.prototype._getSkipLabelViewModel(skipData))
                .toEqual([
                    {
                        left: 0,
                        skipped: 1,
                        ymd: '20150501'
                    }, {
                        left: 1,
                        skipped: 2,
                        ymd: '20150502'
                    }, {
                        left: 2,
                        skipped: 4,
                        ymd: '20150503'
                    }, {
                        left: 3,
                        skipped: 4,
                        ymd: '20150504'
                    }
                ]);
        });
    });
});
