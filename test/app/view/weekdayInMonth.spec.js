var Weekday = require('view/weekday');
var WeekdayInMonth = require('view/month/weekdayInMonth');
var Schedule = require('model/Schedule');
var ScheduleViewModel = require('model/viewModel/ScheduleViewModel');
var datetime = require('common/datetime');

describe('view:WeekdayInMonth', function() {
    var mockInst;

    describe('_getRenderLimitIndex()', function() {
        var mockGetViewBound;

        beforeEach(function() {
            mockGetViewBound = jasmine.createSpy('getViewBound');
        });

        it('should 2 when containerHeight 60, schedule block height is 20.', function() {

            mockGetViewBound.and.returnValue({height: 60});
            mockInst = {
                getViewBound: mockGetViewBound,
                options: {
                    heightPercent: 100,
                    scheduleHeight: 18,
                    scheduleGutter: 2
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
                    scheduleHeight: 18,
                    scheduleGutter: 2
                }
            };

            expect(WeekdayInMonth.prototype._getRenderLimitIndex
                   .call(mockInst)).toBe(0);
        });
    });

    describe('_getSkipHelper()', function() {
        it('should return helper that counting schedule period each date.', function() {
            var viewModel = ScheduleViewModel.create(Schedule.create({
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
            };
            var grids = datetime.getGridLeftAndWidth(7, false, 0);
            var viewModel = {
                dates: grids
            };

            spy.and.returnValue([
                new Date('2015-05-01T00:00:00+09:00'),
                new Date('2015-05-02T00:00:00+09:00'),
                new Date('2015-05-03T00:00:00+09:00'),
                new Date('2015-05-04T00:00:00+09:00'),
                new Date('2015-05-05T00:00:00+09:00'),
                new Date('2015-05-06T00:00:00+09:00')
            ]);

            expect(WeekdayInMonth.prototype._getSkipLabelViewModel(skipData, viewModel))
                .toEqual([
                    {
                        left: grids[0].left,
                        skipped: 1,
                        ymd: '20150501',
                        width: jasmine.any(Number)
                    }, {
                        left: grids[1].left,
                        skipped: 2,
                        ymd: '20150502',
                        width: jasmine.any(Number)
                    }, {
                        left: grids[2].left,
                        skipped: 4,
                        ymd: '20150503',
                        width: jasmine.any(Number)
                    }, {
                        left: grids[3].left,
                        skipped: 4,
                        ymd: '20150504',
                        width: jasmine.any(Number)
                    }
                ]);
        });
    });
});
