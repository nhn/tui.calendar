var AlldayResize = window.ne.dooray.calendar.AlldayResize;
describe('handler:AlldayResize', function() {
    describe('_updateEvent()', function() {
        var mockEventData,
            mockEventInstance,
            mockAlldayView,
            inst;

        beforeEach(function() {
            // 인스턴스 Mock
            inst = {
                baseController: jasmine.createSpyObj('baseController', ['updateEvent'])
            };

            // 5일짜리 주간 뷰 렌더링 Mock
            mockAlldayView = {
                options: {
                    renderStartDate: '2015-04-29',
                    renderEndDate: '2015-05-03'
                } 
            };
        });

        it('update property when supplied inverse dragstart, dragend.', function() {
            // 하루짜리 일정
            mockEventInstance = {
                id: function() { return '30'; },
                starts: new Date('2015-05-02T00:00:00+09:00'),
                ends: new Date('2015-05-03T23:59:59+09:00')
            };

            // 이벤트 데이터 Mock
            // 시작일자보다 앞선 그리드까지 리사이즈 했다
            mockEventData = {
                targetModel: mockEventInstance,
                relatedView: mockAlldayView,
                dragStartXIndex: 4,
                xIndex: 2
            };

            AlldayResize.prototype._updateEvent.call(inst, mockEventData);

            // 종료일자는 시작일자보다 앞설 수 없다.
            expect(inst.baseController.updateEvent).toHaveBeenCalledWith('30', {
                ends: new Date('2015-05-02T23:59:59+09:00')
            });
            
        });

        it('update event model properly by supplied event data.', function() {
            // 하루짜리 일정
            mockEventInstance = {
                id: function() { return '30'; },
                starts: new Date('2015-04-30T00:00:00+09:00'),
                ends: new Date('2015-04-30T23:59:59+09:00')
            };

            // 이벤트 데이터 Mock
            // 오른쪽으로 한칸 옮겼다
            mockEventData = {
                targetModel: mockEventInstance,
                relatedView: mockAlldayView,
                dragStartXIndex: 1,
                xIndex: 2
            };

            AlldayResize.prototype._updateEvent.call(inst, mockEventData);

            // 하루 증가함
            expect(inst.baseController.updateEvent).toHaveBeenCalledWith('30', {
                ends: new Date('2015-05-01T23:59:59+09:00')
            });
        });
    });
});
