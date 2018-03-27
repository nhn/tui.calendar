'use strict';

var WeekdayInMonth = require('view/month/weekdayInMonth');
var Schedule = require('model/schedule');
var ScheduleViewModel = require('model/viewModel/scheduleViewModel');
var TZDate = require('common/timezone').Date;

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
                    scheduleGutter: 2,
                    grid: {
                        header: {
                            height: 34
                        }
                    }
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

    describe('getExceedDate()', function() {
        it('should return helper that counting schedule period each date.', function() {
            var viewModel = ScheduleViewModel.create(Schedule.create({
                    title: 'A',
                    isAllDay: true,
                    start: '2015-05-01T00:00:00',
                    end: '2015-05-03T23:59:59'
                })),
                eventsInDateRange = [[[viewModel]]],
                ranges = [new TZDate('2015-05-01T00:00:00'), new TZDate('2015-05-02T00:00:00'), new TZDate('2015-05-03T00:00:00')],
                cache = WeekdayInMonth.prototype.getExceedDate(0, eventsInDateRange, ranges);

            expect(cache).toEqual({
                '20150501': 1,
                '20150502': 1,
                '20150503': 1
            });
        });
    });
});
