/*eslint-disable*/
var reqAnimFrame = require('common/reqAnimFrame');
var AlldayCreationGuide = require('handler/allday/creationGuide');
var datetime = require('common/datetime');

describe('handler:AlldayCreationGuide', function() {
    var mockGuideElement,
        mockInst,
        proto;

    beforeEach(function() {
        mockGuideElement = {
            style: {}
        };

        mockInst = {
            guideElement: mockGuideElement,
            _getGuideWidth: function() {}
        };

        proto = AlldayCreationGuide.prototype;
        spyOn(reqAnimFrame, 'requestAnimFrame').and.callFake(function(callback) {
            callback();
        });

        spyOn(mockInst, '_getGuideWidth').and.callFake(proto._getGuideWidth);
    });

    describe('_refreshGuideElement()', function() {
        it('can refresh guide element to express creation actions.', function() {
            var grids = datetime.getGridLeftAndWidth(5, false, 0);
            // 세 번째 날짜 그리드에서 마우스 다운 시
            var mockEventData = {
                dragStartXIndex: 2,
                datesInRange: 5,
                xIndex: 2,
                length: 1,
                grids: grids
            };
            proto._refreshGuideElement.call(mockInst, mockEventData);
            expect(mockGuideElement.style).toEqual({
                width: '20%',
                left: '40%',
                display: 'block'
            });


            // 두 번째 그리드에서 네 번째 그리드까지 드래그 시
            mockEventData = {
                dragStartXIndex: 1,
                datesInRange: 5,
                xIndex: 3,
                length: 3,    // 드래그 이벤트에는 width 프로퍼티가 제공됨.
                grids: grids
            };
            proto._refreshGuideElement.call(mockInst, mockEventData);
            expect(mockGuideElement.style).toEqual({
                width: '60%',
                left: '20%',
                display: 'block'
            });

            // 세 번째 그리드에서 첫 번째 그리드로 드래그 (역방향)
            mockEventData = {
                dragStartXIndex: 2,
                datesInRange: 5,
                xIndex: 0,
                length: -1,
                grids: grids
            };
            proto._refreshGuideElement.call(mockInst, mockEventData);
            expect(mockGuideElement.style).toEqual({
                width: '60%',
                left: '0%',
                display: 'block'
            });
        });
    });
});
