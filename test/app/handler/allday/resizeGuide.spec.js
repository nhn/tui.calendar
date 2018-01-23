var AlldayResizeGuide = require('handler/allday/resizeGuide');

describe('handler:AlldayResizeGuide', function() {
    var inst;

    beforeEach(function() {
        inst = new AlldayResizeGuide(jasmine.createSpyObj('alldayView', ['on']));
    });

    describe('getGuideElementWidthFunc()', function() {
        it('Calculate guide element\'s width percentage value by user resizing action.', function() {
            // 렌더링 범위는 5/1 ~ 5/5
            var mockAlldayResize = {
                alldayResize: {
                    alldayView: {
                        options: {
                            renderStartDate: '2015-05-01',
                            renderEndDate: '2015-05-05'
                        }
                    }
                }
            };

            // 5/4일에 있는 1일짜리 종일일정
            var mockDragStartEventData = {
                datesInRange: 5,
                xIndex: 3,
                eventBlockElement: {},
                model: {
                    start: new Date('2015-05-04T00:00:00+09:00'),
                    end: new Date('2015-05-04T23:59:59+09:00')
                }
            };

            var func = inst.getGuideElementWidthFunc.call(mockAlldayResize, mockDragStartEventData);

            // 오른쪽으로 한번 리사이징
            expect(func(4)).toBe(40);

            // 역방향 수정 불가. 5/3일로 드래그해도 크기는 유지됨.
            expect(func(2)).toBe(20);
        });
    });
});
