/*eslint-disable*/
describe('handler:AlldayCreation', function() {
    var datetime = window.ne.dooray.calendar.datetime,
        AlldayCreation = window.ne.dooray.calendar.AlldayCreation,
        proto;

    beforeEach(function() {
        proto = AlldayCreation.prototype;
        // 테스트와 무관한 모듈 목 처리
        spyOn(window.ne.dooray.calendar.AlldayCreationGuide.prototype, 'initializeGuideElement').and.returnValue();
        spyOn(window, 'prompt');
    });

    it('checkExpectedCondition() can judge specific event target is suitable for creation handler.', function() {
        var div = document.createElement('div');
        var inst = {
            alldayView: {
                children: {
                    items: {
                        '40': 'hello world'
                    }
                }
            }
        };

        expect(proto.checkExpectedCondition(div)).toBe(false);

        var container = document.createElement('div');
        container.className = '/* @echo CSS_PREFIX */weekday tui-view-40';

        div.className = '/* @echo CSS_PREFIX */weekday-events';
        expect(proto.checkExpectedCondition.call(inst, div)).toBe(false);

        container.appendChild(div);
        expect(proto.checkExpectedCondition.call(inst, div)).toBe('hello world');
    });

    describe('_createEvent()', function() {
        var mockEventData,
            mockAlldayView,
            inst;

        beforeEach(function() {
            window.prompt.and.returnValue('myEvent');

            // 인스턴스 Mock
            inst = {
                baseController: jasmine.createSpyObj('baseController', ['createEvent']),
                guide: jasmine.createSpyObj('alldayCreation', ['clearGuideElement']),
                fire: jasmine.createSpy('on')
            };

            // 4일짜리 주간 뷰 렌더링 Mock
            mockAlldayView = {
                options: {
                    renderStartDate: '2015-05-01',
                    renderEndDate: '2015-05-04'
                }
            };
        });

        it('request event model creation to base controller by supplied eventdata.', function() {
            // 이벤트 데이터 Mock
            // 2일부터 3일까지 드래그함.
            mockEventData = {
                relatedView: mockAlldayView,
                dragStartXIndex: 1,
                xIndex: 2
            };

            proto._createEvent.call(inst, mockEventData);

            expect(inst.fire).toHaveBeenCalledWith('beforeCreateEvent', {
                isAllDay: true,
                starts: new Date('2015-05-02T00:00:00+09:00'),
                ends: new Date('2015-05-03T23:59:59+09:00')
            });
        });

        it('create event instance properly when supplied inverse dragstart, dragend index.', function() {
            // 이벤트 데이터 Mock
            // 4일부터 2일까지 드래그함.
            // 역방향으로 드래그했다
            mockEventData = {
                relatedView: mockAlldayView,
                dragStartXIndex: 3,
                xIndex: 1
            };

            proto._createEvent.call(inst, mockEventData);

            expect(inst.fire).toHaveBeenCalledWith('beforeCreateEvent', {
                isAllDay: true,
                starts: new Date('2015-05-02T00:00:00+09:00'),
                ends: new Date('2015-05-04T23:59:59+09:00')
            });
        });
    });

    describe('event handler methods', function() {
        var mockDragHandler,
            inst;

        beforeEach(function() {
            mockDragHandler = jasmine.createSpyObj('Drag', ['on', 'off']);
            inst = new AlldayCreation(mockDragHandler);
            spyOn(inst, 'fire');
            spyOn(inst, '_retriveEventData').and.returnValue(function() {return 'good'});
            spyOn(inst, '_createEvent');
        });

        it('_onDragStart() not fire dragstart event when not meet expected conditions.', function() {
            spyOn(inst, 'checkExpectedCondition').and.returnValue(false);
            inst._onDragStart({});
            expect(inst.fire).not.toHaveBeenCalled();

            inst.checkExpectedCondition.and.returnValue({});
            inst._onDragStart({});
            expect(inst.fire).toHaveBeenCalled();
        });

        describe('_onDrag()', function() {
            it('always work after initialize drag start event data.', function() {
                inst.getEventDataFunc = null;
                inst._onDrag({});
                expect(inst.fire).not.toHaveBeenCalled();

                inst.getEventDataFunc = jasmine.createSpy('getEventDataFunc').and.returnValue({a:1});
                inst._onDrag({});
                expect(inst.fire).toHaveBeenCalled();
            });

            it('extend eventData. add more property to complete creation action.', function() {
                inst.getEventDataFunc = jasmine.createSpy('getEventDataFunc').and.returnValue({
                    dragStartXIndex: 3,
                    xIndex:5
                });
                inst._onDrag({});

                expect(inst.fire).toHaveBeenCalledWith('alldayCreationDrag', {
                    dragStartXIndex: 3,
                    xIndex: 5
                });
            });
        });

        describe('_onDragEnd()', function() {
            it('always work after initialize drag start event data.', function() {
                inst.getEventDataFunc = null;
                inst._onDragEnd({});
                expect(inst.fire).not.toHaveBeenCalled();

                inst.getEventDataFunc = jasmine.createSpy('getEventDataFunc').and.returnValue({a:1});
                inst._onDragEnd({});
                expect(inst.fire).toHaveBeenCalled();
            });

            it('extend eventData. add more property to complete creation action.', function() {
                inst.getEventDataFunc = jasmine.createSpy('getEventDataFunc').and.returnValue({
                    dragStartXIndex: 3,
                    xIndex:5
                });
                inst._onDragEnd({});

                expect(inst.fire).toHaveBeenCalledWith('alldayCreationDragend', {
                    dragStartXIndex: 3,
                    xIndex: 5
                });
            });
        });
    });
});
