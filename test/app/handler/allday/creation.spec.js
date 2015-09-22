/*eslint-disable*/
var datetime = window.ne.dooray.calendar.datetime;
var AlldayCreation = window.ne.dooray.calendar.AlldayCreation;
describe('handler:AlldayCreation', function() {
    var proto;

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
                childs: {
                    items: {
                        '40': 'hello world'
                    }
                }
            }
        };

        expect(proto.checkExpectedCondition(div)).toBe(false);

        var container = document.createElement('div');
        container.className = 'schedule-view-allday-monthweek schedule-view-40';

        div.className = 'schedule-view-monthweek-events';
        expect(proto.checkExpectedCondition.call(inst, div)).toBe(false);

        container.appendChild(div);
        expect(proto.checkExpectedCondition.call(inst, div)).toBe('hello world');
    });

    describe('event handler methods', function() {
        var inst;

        beforeEach(function() {
            inst = new AlldayCreation();
            spyOn(inst, 'fire');
            spyOn(inst, '_retriveEventData').and.returnValue(function() {return 'good'});
            inst.dragHandler = jasmine.createSpyObj('dragHandler', ['on', 'off']);
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

                expect(inst.fire).toHaveBeenCalledWith('allday_creation_drag', {
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

                expect(inst.fire).toHaveBeenCalledWith('allday_creation_dragend', {
                    dragStartXIndex: 3,
                    xIndex: 5
                });
            });
        });
    });
});
