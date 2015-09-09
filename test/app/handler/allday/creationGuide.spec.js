/*eslint-disable*/
var AlldayCreationGuide = window.ne.dooray.calendar.AlldayCreationGuide;
describe('handler:AlldayCreationGuide', function() {
    var mockGuideElement,
        mockInst,
        proto;

    beforeEach(function() {
        mockGuideElement = {
            style: {}
        };

        mockInst = {
            guideElement: mockGuideElement
        };

        proto = AlldayCreationGuide.prototype;
        spyOn(window.ne.dooray.calendar.reqAnimFrame, 'requestAnimFrame').and.callFake(function(callback) {
            callback();
        });
    });

    describe('_refreshGuideElement()', function() {
        it('can refresh guide element to express creation actions.', function() {
            // 세 번째 날짜 그리드에서 마우스 다운 시
            var mockEventData = {
                datesInRange: 5,
                xIndex: 2
            };
            mockInst._dragStartXIndex = 2;
            proto._refreshGuideElement.call(mockInst, mockEventData);
            expect(mockGuideElement.style).toEqual({
                width: '20%',
                left: '40%',
                display: 'block'
            });


            // 두 번째 그리드에서 네 번째 그리드까지 드래그 시
            mockEventData = {
                datesInRange: 5,
                xIndex: 3,
                width: 2    // 드래그 이벤트에는 width 프로퍼티가 제공됨.
            };
            mockInst._dragStartXIndex = 1;
            proto._refreshGuideElement.call(mockInst, mockEventData);
            expect(mockGuideElement.style).toEqual({
                width: '60%',
                left: '20%',
                display: 'block'
            });

            // 세 번째 그리드에서 첫 번째 그리드로 드래그 (역방향)
            mockEventData = {
                datesInRange: 5,
                xIndex: 0,
                width: -2
            };
            mockInst._dragStartXIndex = 2;
            proto._refreshGuideElement.call(mockInst, mockEventData);
            expect(mockGuideElement.style).toEqual({
                width: '60%',
                left: '0%',
                display: 'block'
            });
        });
    });
});
