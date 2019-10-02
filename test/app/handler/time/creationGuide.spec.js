'use strict';

var datetime = require('common/datetime');
var TZDate = require('common/timezone').Date;
var TimeCreationGuide = require('handler/time/creationGuide');
var Theme = require('theme/theme');
var MIN30 = 30;

describe('handler/time.creation.guide', function() {
    var mockTimeCreation,
        inst;

    beforeEach(function() {
        mockTimeCreation = jasmine.createSpyObj('TimeCreation', ['on', 'baseController']);
        mockTimeCreation.baseController.theme = new Theme();
        inst = new TimeCreationGuide(mockTimeCreation);
    });

    it('_getUnitData() get unit data for calculating guide element style.', function() {
        var mockTimeView = {
            options: {
                hourStart: 3,
                hourEnd: 24,
                ymd: '2015-11-17'
            },
            getViewBound: jasmine.createSpy('TimeView#getViewBound')
        };
        var renderStart = new TZDate('2015-11-17T03:00:00+09:00');
        var renderEnd = new TZDate('2015-11-18T00:00:00+09:00');
        var expected,
            actual;

        mockTimeView.getViewBound.and.returnValue({height: 210}); // 10px per hour

        expected = [210, 21, renderStart, renderEnd, 10];
        actual = inst._getUnitData(mockTimeView);

        expect(expected).toEqual(actual);
    });

    describe('_limitStyleData()', function() {
        var renderStart,
            renderEnd;

        beforeEach(function() {
            renderStart = new TZDate('2015-11-17T03:00:00');
            renderEnd = new TZDate('2015-11-17T23:59:59');
            inst._styleUnit = [210, 21, renderStart, renderEnd, 10];
        });

        it('limit guide style data base on unit data', function() {
            // top pixel can not be negative value
            var expected = [0, 30, renderStart, renderEnd];
            var actual = inst._limitStyleData(-30, 30, renderStart, renderEnd);
            var yesterday = new TZDate(renderStart);

            expect(expected).toEqual(actual);

            // renderstart can not be other date
            yesterday.setDate(yesterday.getDate() - 1);

            expected = [0, 30, renderStart, renderEnd];
            actual = inst._limitStyleData(-30, 30, yesterday, renderEnd);

            expect(expected).toEqual(actual);
        });
    });

    describe('_getStyleDataFunc', function() {
        it('return function that available for calculate guide element styles from drag schedules', function() {
            // View rendered from 3 o'clock
            var renderStart = new TZDate('2015-11-17T03:00:00+09:00');
            var func = inst._getStyleDataFunc(210, 21, renderStart);
            // Assuming the user clicked on 4 o'clock
            var clicked = new TZDate(renderStart),
                expected,
                actual;
            var mockEventData = {
                nearestGridY: 1,
                nearestGridTimeY: clicked
            };

            clicked.setHours(4);
            expected = [10, clicked, new TZDate(clicked).addMinutes(MIN30)];
            actual = func(mockEventData);

            expect(expected).toEqual(actual);
        });
    });

    describe('_onDrag()', function() {
        var mockTimeView,
            startTime,
            mockEventData;

        beforeEach(function() {
            var renderStart = new TZDate('2015-11-17T00:00:00');

            mockTimeView = {
                options: {
                    hourStart: 0,
                    hourEnd: 24,
                    ymd: '2015-11-17'
                },
                getViewBound: jasmine.createSpy('getViewBound'),
                container: jasmine.createSpyObj('HTMLElement', ['appendChild'])
            };
            mockTimeView.getViewBound.and.returnValue({height: 240});

            // Assuming the user clicked on 4 o'clock
            startTime = new TZDate(renderStart);
            startTime.setHours(4);

            mockEventData = {
                nearestGridY: 3,
                nearestGridTimeY: startTime,
                relatedView: mockTimeView
            };

            inst._createGuideElement(mockEventData);

            spyOn(inst, '_refreshGuideElement');
        });

        it('calculate style properly when user dragging to before start time', function(done) {
            // User dragged to 1 o'clock
            var time = new TZDate('2015-11-17T01:00:00');
            mockEventData = {
                nearestGridY: 1,
                nearestGridTimeY: time,
                relatedView: mockTimeView
            };

            inst._onDrag(mockEventData);

            setTimeout(function() {
                expect(
                    inst._refreshGuideElement).toHaveBeenCalledWith(10, 25, time,
                    startTime.addMinutes(MIN30),
                    true);
                done();
            }, 100);
        });

        it('calculate style properly2', function(done) {
            // User dragged to 6 o'clock
            var time = new TZDate('2015-11-17T06:00:00');
            mockEventData = {
                nearestGridY: 5,
                nearestGridTimeY: time,
                relatedView: mockTimeView
            };

            inst._onDrag(mockEventData);

            setTimeout(function() {
                expect(inst._refreshGuideElement).toHaveBeenCalledWith(30, 25, startTime, time.addMinutes(MIN30));
                done();
            }, 200);
        });
    });
});

