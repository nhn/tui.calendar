/*eslint-disable*/
var TimeGrid = require('view/week/timeGrid');
var timezone = require('common/timezone');
var TZDate = timezone.Date;

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
                {hour: 3, minutes: 0, hidden: true, color: '', fontWeight: ''},
                {hour: 4, minutes: 0, hidden: false, color: '', fontWeight: ''},
                {hour: 5, minutes: 0, hidden: false, color: '', fontWeight: ''},
                {hour: 6, minutes: 0, hidden: false, color: '', fontWeight: ''},
                {hour: 7, minutes: 0, hidden: false, color: '', fontWeight: ''},
                {hour: 8, minutes: 0, hidden: false, color: '', fontWeight: ''},
                {hour: 9, minutes: 0, hidden: false, color: '', fontWeight: ''},
                {hour: 10, minutes: 0, hidden: false, color: '', fontWeight: ''}
            ],
            styles: {},
            timezones: [],
            showTimezoneCollapseButton: false,
            timezonesCollapsed: false
        };

        var obj = {
            options: {
                hourStart: 3,
                hourEnd: 11,
                renderEndDate: new TZDate('2018-05-23'),
                showTimezoneCollapseButton: false,
                timezonesCollapsed: false
            },
            _getHourmarkerViewModel: function() {
                return {todaymarkerLeft: 1};
            },
            _getStyles: function() {
                return {};
            },
            _getTimezoneViewModel: function() {
                return [];
            }
        };

        var result = proto._getBaseViewModel.call(obj, {
            state: {timezonesCollapsed: false}
        });

        expect(result).toEqual(expected);

        jasmine.clock().uninstall();
    });

    describe('_getTopPercentByTime()', function() {
        var originDate,
            mock;

        beforeEach(function() {
            mock = {
                _getGridSize: function() { return [200, 300]; },
                _getBaseViewModel: function() { return {hour: {length: 24}} },
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
            mock._getBaseViewModel = function() { return {hour: {length: 5}}; };

            expect(proto._getTopPercentByTime.call(mock, new Date('2015-05-05T11:00:00+09:00'))).toBe(40);
        });
    });

    describe('_getTimezoneViewModel()', function() {
        beforeEach(function() {
            timezone.setOffsetByTimezoneOption(540);
        });

        afterEach(function() {
            timezone.restoreOffset();
        });

        it ('get view model with timezone option', function() {
            jasmine.clock().mockDate(new Date(2018, 4, 30, 9));

            var currentHours = 9;
            var width = 100 / 2;
            var expected = [{
                // GMT+09:00
                timeSlots: [
                    {hour: 0, minutes: 0, hidden: true, color: '', fontWeight: ''},
                    {hour: 1, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 2, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 3, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 4, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 5, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 6, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 7, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 8, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 9, minutes: 0, hidden: true, color: '', fontWeight: ''},
                    {hour: 10, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 11, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 12, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 13, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 14, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 15, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 16, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 17, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 18, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 19, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 20, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 21, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 22, minutes: 0, hidden: false, color: '', fontWeight: ''},
                    {hour: 23, minutes: 0, hidden: false, color: '', fontWeight: ''},
                ],
                displayLabel: 'GMT+09:00',
                timezoneOffset: 540,
                tooltip: 'Seoul',
                width: width,
                left: 1 * width,
                isPrimary: true,
                hourmarker: new TZDate(2018, 4, 30, 9),
                dateDifferenceSign: '+',
                dateDifference: 0,
                backgroundColor: '',
                hidden: false
            }, {
                // GMT-09:30
                timeSlots: [
                    {hour: 5, minutes: 30, hidden: true, color: '', fontWeight: ''},
                    {hour: 6, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 7, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 8, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 9, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 10, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 11, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 12, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 13, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 14, minutes: 30, hidden: true, color: '', fontWeight: ''},
                    {hour: 15, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 16, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 17, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 18, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 19, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 20, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 21, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 22, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 23, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 0, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 1, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 2, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 3, minutes: 30, hidden: false, color: '', fontWeight: ''},
                    {hour: 4, minutes: 30, hidden: false, color: '', fontWeight: ''}
                ],
                displayLabel: 'GMT-09:30',
                timezoneOffset: -570,
                tooltip: 'Marquesas Islands',
                width: width,
                left: 0 * width,
                isPrimary: false,
                hourmarker: new TZDate(2018, 4, 29, 14, 30),
                dateDifferenceSign: '-',
                dateDifference: 1,
                backgroundColor: '',
                hidden: false
            }];

            var obj = {
                options: {
                    hourStart: 0,
                    hourEnd: 24,
                    renderEndDate: new TZDate('2018-05-23'),
                    timezones: [
                        {
                            timezoneOffset: 540,
                            displayLabel: 'GMT+09:00',
                            tooltip: 'Seoul'
                        },
                        {
                            timezoneOffset: -570,
                            displayLabel: 'GMT-09:30',
                            tooltip: 'Marquesas Islands'
                        }
                    ]
                },
                _getHourmarkerViewModel: function() {
                    return {todaymarkerLeft: 1};
                },
                _getStyles: function() {
                    return {};
                }
            };

            var result = proto._getTimezoneViewModel.call(obj, currentHours, false, {});

            expect(result).toEqual(expected);

            jasmine.clock().uninstall();
        });
    })
});
