/*eslint-disable*/
var datetime = require('common/datetime');
var AlldayCreation = require('handler/allday/creation');
var AlldayCreationGuide = require('handler/allday/creationGuide');
var TZDate = require('common/timezone').Date;

describe('handler:AlldayCreation', function() {
    var proto;

    beforeEach(function() {
        proto = AlldayCreation.prototype;
        // 테스트와 무관한 모듈 목 처리
        spyOn(AlldayCreationGuide.prototype, 'initializeGuideElement').and.returnValue();
        spyOn(window, 'prompt');
    });

    it('checkExpectedCondition() can judge specific schedule target is suitable for creation handler.', function() {
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

        div.className = '/* @echo CSS_PREFIX */weekday-schedules';
        expect(proto.checkExpectedCondition.call(inst, div)).toBe(false);

        container.appendChild(div);
        expect(proto.checkExpectedCondition.call(inst, div)).toBe('hello world');
    });

    describe('_createSchedule()', function() {
        var mockEventData,
            mockAlldayView,
            inst;

        beforeEach(function() {
            window.prompt.and.returnValue('myEvent');

            // 인스턴스 Mock
            inst = {
                baseController: jasmine.createSpyObj('baseController', ['createSchedule']),
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

        it('request schedule model creation to base controller by supplied scheduledata.', function() {
            // 이벤트 데이터 Mock
            // 2일부터 3일까지 드래그함.
            mockEventData = {
                relatedView: mockAlldayView,
                dragStartXIndex: 1,
                xIndex: 2,
                triggerEvent: 'drag',
                range: [null, new TZDate('2015-05-02T00:00:00+09:00'), new TZDate('2015-05-03T23:59:59+09:00')]
            };

            proto._createSchedule.call(inst, mockEventData);

            expect(inst.fire).toHaveBeenCalledWith('beforeCreateSchedule', {
                isAllDay: true,
                start: new TZDate('2015-05-02T00:00:00+09:00'),
                end: new TZDate('2015-05-03T23:59:59+09:00'),
                guide: inst.guide,
                triggerEventName: 'drag'
            });
        });

        it('create schedule instance properly when supplied inverse dragstart, dragend index.', function() {
            // 이벤트 데이터 Mock
            // 4일부터 2일까지 드래그함.
            // 역방향으로 드래그했다
            mockEventData = {
                relatedView: mockAlldayView,
                dragStartXIndex: 3,
                xIndex: 1,
                triggerEvent: 'drag',
                range: [null, new TZDate('2015-05-02T00:00:00+09:00'), null, new TZDate('2015-05-04T23:59:59+09:00')]
            };

            proto._createSchedule.call(inst, mockEventData);

            expect(inst.fire).toHaveBeenCalledWith('beforeCreateSchedule', {
                isAllDay: true,
                start: new TZDate('2015-05-02T00:00:00+09:00'),
                end: new TZDate('2015-05-04T23:59:59+09:00'),
                guide: inst.guide,
                triggerEventName: 'drag'
            });
        });
    });

    describe('event handler methods', function() {
        var mockDragHandler,
            inst;

        beforeEach(function() {
            mockDragHandler = jasmine.createSpyObj('Drag', ['on', 'off']);
            mockAlldayView = {container: {}};
            inst = new AlldayCreation(mockDragHandler, mockAlldayView);
            spyOn(inst, 'fire');
            spyOn(inst, '_retriveScheduleData').and.returnValue(function() {return 'good'});
            spyOn(inst, '_createSchedule');
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
                inst.getScheduleDataFunc = null;
                inst._onDrag({});
                expect(inst.fire).not.toHaveBeenCalled();

                inst.getScheduleDataFunc = jasmine.createSpy('getScheduleDataFunc').and.returnValue({a:1});
                inst._onDrag({});
                expect(inst.fire).toHaveBeenCalled();
            });

            it('extend eventData. add more property to complete creation action.', function() {
                inst.getScheduleDataFunc = jasmine.createSpy('getScheduleDataFunc').and.returnValue({
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
                inst.getScheduleDataFunc = null;
                inst._onDragEnd({});
                expect(inst.fire).not.toHaveBeenCalled();

                inst.getScheduleDataFunc = jasmine.createSpy('getScheduleDataFunc').and.returnValue({a:1});
                inst._onDragEnd({});
                expect(inst.fire).toHaveBeenCalled();
            });

            it('extend eventData. add more property to complete creation action.', function() {
                inst.getScheduleDataFunc = jasmine.createSpy('getScheduleDataFunc').and.returnValue({
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
