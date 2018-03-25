'use strict';

var datetime = require('common/datetime');
var TimeCreationGuide = require('handler/time/creationGuide');

describe('handler/time.creation.guide', function() {
    var mockTimeCreation,
        inst;

    beforeEach(function() {
        mockTimeCreation = jasmine.createSpyObj('TimeCreation', ['on']);
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
        var renderStart = Number(new Date('2015-11-17T03:00:00+09:00'));
        var renderEnd = Number(new Date('2015-11-17T23:59:59+09:00'));
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
            renderStart = Number(new Date('2015-11-17T03:00:00+09:00'));
            renderEnd = Number(new Date('2015-11-17T23:59:59+09:00'));
            inst._styleUnit = [210, 21, renderStart, renderEnd, 10];
        });

        it('limit guide style data base on unit data', function() {
            // top pixel can not be negative value
            var expected = [0, 30, Number(renderStart), Number(renderEnd)];
            var actual = inst._limitStyleData(-30, 30, Number(renderStart), Number(renderEnd));
            var yesterday = new Date(Number(renderStart));

            expect(expected).toEqual(actual);

            // renderstart can not be other date
            yesterday.setDate(yesterday.getDate() - 1);

            expected = [0, 30, Number(renderStart), Number(renderEnd)];
            actual = inst._limitStyleData(-30, 30, Number(yesterday), Number(renderEnd));

            expect(expected).toEqual(actual);
        });
    });

    describe('_getStyleDataFunc', function() {
        it('return function that available for calculate guide element styles from drag schedules', function() {
            // 3시부터 렌더링하는 뷰
            var renderStart = new Date('2015-11-17T03:00:00+09:00');
            var func = inst._getStyleDataFunc(210, 21, Number(renderStart));
            // 사용자가 4시를 클릭했다고 가정
            var clicked = new Date(renderStart).setHours(4),
                expected,
                actual;
            var mockEventData = {
                nearestGridY: 1,
                nearestGridTimeY: Number(clicked)
            };

            expected = [10, Number(clicked)];
            actual = func(mockEventData);

            expect(expected).toEqual(actual);
        });
    });

    describe('_onDrag()', function() {
        var mockTimeView,
            startTime,
            min30,
            mockEventData;

        beforeEach(function() {
            var renderStart = new Date('2015-11-17T00:00:00+09:00');

            min30 = datetime.MILLISECONDS_PER_MINUTES * 30;

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

            // 사용자가 4시를 클릭했다고 가정
            startTime = new Date(renderStart);
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
            // 사용자가 1시로 드래그함
            var time = new Date('2015-11-17T01:00:00+09:00');
            mockEventData = {
                nearestGridY: 1,
                nearestGridTimeY: Number(time),
                relatedView: mockTimeView
            };

            inst._onDrag(mockEventData);

            setTimeout(function() {
                expect(
                    inst._refreshGuideElement).toHaveBeenCalledWith(10, 25, Number(time),
                    (Number(startTime) + min30),
                    true);
                done();
            }, 100);
        });

        it('calculate style properly2', function(done) {
            // 사용자가 6시로 드래그함
            var time = new Date('2015-11-17T06:00:00+09:00');
            mockEventData = {
                nearestGridY: 5,
                nearestGridTimeY: Number(time),
                relatedView: mockTimeView
            };

            inst._onDrag(mockEventData);

            setTimeout(function() {
                expect(inst._refreshGuideElement).toHaveBeenCalledWith(30, 25, Number(startTime), Number(time) + min30);
                done();
            }, 200);
        });
    });
});

