describe('view:WeekdayInMonth', function() {
    var WeekdayInMonth = ne.dooray.calendar.WeekdayInMonth,
        CalEvent = ne.dooray.calendar.CalEvent,
        CalEventViewModel = ne.dooray.calendar.CalEventViewModel,
        mockInst;

    describe('_getRenderLimitIndex()', function() {
        it('should 2 when containerHeight 60, event block height is 20.', function() {
            mockInst = {
                options: {
                    containerHeight: 60,
                    eventHeight: 18,
                    eventGutter: 2
                }
            };

            expect(WeekdayInMonth.prototype._getRenderLimitIndex
                   .call(mockInst)).toBe(2);
        });

        it('should 0 when containerHeight is 0.', function() {
            mockInst = {
                options: {
                    containerHeight: 0,
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
                    starts: '2015-05-01T00:00:00+09:00',
                    ends: '2015-05-03T23:59:59+09:00'
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
            spy = spyOn(ne.dooray.calendar.Weekday.prototype, 'getRenderDateRange');
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
