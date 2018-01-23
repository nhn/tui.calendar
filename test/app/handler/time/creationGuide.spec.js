var datetime = require('common/datetime');
var TimeCreationGuide = require('handler/time/creationGuide');
var reqAnimFrame = require('common/reqAnimFrame');

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

        mockTimeView.getViewBound.and.returnValue({height: 210}); // 10px per hour

        var renderStart = +new Date('2015-11-17T03:00:00+09:00');
        var renderEnd = +new Date('2015-11-17T23:59:59+09:00');

        var expected = [210, 21, renderStart, renderEnd, 10];
        var actual = inst._getUnitData(mockTimeView);

        expect(expected).toEqual(actual);
    });

    describe('_limitStyleData()', function() {
        var renderStart,
            renderEnd;

        beforeEach(function() {
            renderStart = +new Date('2015-11-17T03:00:00+09:00');
            renderEnd = +new Date('2015-11-17T23:59:59+09:00');
            inst._styleUnit = [210, 21, renderStart, renderEnd, 10]
        });

        it('limit guide style data base on unit data', function() {
            // top pixel can not be negative value
            var expected = [0, 30, +renderStart, +renderEnd];
            var actual = inst._limitStyleData(-30, 30, +renderStart, +renderEnd);

            expect(expected).toEqual(actual);

            // renderstart can not be other date
            var yesterday = new Date(+renderStart);
            yesterday.setDate(yesterday.getDate() - 1);

            var expected = [0, 30, +renderStart, +renderEnd];
            var actual = inst._limitStyleData(-30, 30, +yesterday, +renderEnd);

            expect(expected).toEqual(actual);
        });
    });

    describe('_getStyleDataFunc', function() {
        it('return function that available for calculate guide element styles from drag schedules', function() {
            // 3시부터 렌더링하는 뷰
            var renderStart = new Date('2015-11-17T03:00:00+09:00');
            var func = inst._getStyleDataFunc(210, 21, +renderStart);

            // 사용자가 4시를 클릭했다고 가정
            var clicked = new Date(renderStart);
            clicked.setHours(4);

            var mockEventData = {
                nearestGridY: 1,
                nearestGridTimeY: +clicked
            };

            var expected = [10, +clicked];
            var actual = func(mockEventData);

            expect(expected).toEqual(actual);
        });
    });

    describe('_onDrag()', function() {
        var mockTimeView,
            startTime,
            min30;

        beforeEach(function() {
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

            var renderStart = new Date('2015-11-17T00:00:00+09:00');
            // 사용자가 4시를 클릭했다고 가정
            startTime = new Date(renderStart);
            startTime.setHours(4);

            var mockEventData = {
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
            var mockEventData = {
                nearestGridY: 1,
                nearestGridTimeY: +time,
                relatedView: mockTimeView
            };

            inst._onDrag(mockEventData);

            setTimeout(function() {
                expect(inst._refreshGuideElement).toHaveBeenCalledWith(10, 25, +time, (+startTime + min30), true);
                done();
            }, 10);
        });

        it('calculate style properly2', function(done) {
            // 사용자가 6시로 드래그함
            var time = new Date('2015-11-17T06:00:00+09:00');
            var mockEventData = {
                nearestGridY: 5,
                nearestGridTimeY: +time,
                relatedView: mockTimeView
            };

            inst._onDrag(mockEventData);

            setTimeout(function() {
                expect(inst._refreshGuideElement).toHaveBeenCalledWith(30, 25, +startTime, +time + min30);
                done();
            }, 100);
        });
    });
});

