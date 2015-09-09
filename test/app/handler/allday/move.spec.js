/*eslint-disable*/
var AlldayMove = window.ne.dooray.calendar.AlldayMove;
describe('handler:AlldayMove', function() {
    var proto;

    beforeEach(function() {
        proto = AlldayMove.prototype;
    });

    describe('checkExpectedCondition()', function() {
        var mockTarget;

        beforeEach(function() {
            mockTarget = document.createElement('div');
        });

        it('check specific event session is suitable for handler.', function() {
            // 1. not suitable for handler.
            expect(proto.checkExpectedCondition(mockTarget)).toBe(false);

            mockTarget.className = 'schedule-view-allday-event';    // simulate click 'event' element block.
            // 2. but there is no parent element for export parent view instance.
            expect(proto.checkExpectedCondition(mockTarget)).toBe(false);

            var mockInst = {
                alldayView: {
                    childs: {
                        items: {
                            '3': 'success'
                        }
                    }
                }
            };

            var parentEl = document.createElement('div');
            parentEl.className = 'schedule-view-allday-monthweek';
            parentEl.appendChild(mockTarget);

            // 3. no instance ID information.
            expect(proto.checkExpectedCondition.call(mockInst, mockTarget)).toBe(false);

            // 4. good
            parentEl.className = 'schedule-view-allday-monthweek schedule-view-3';
            expect(proto.checkExpectedCondition.call(mockInst, mockTarget)).toBe('success');
        });
    });

    describe('event handlers', function() {
        var inst,
            domutil;

        beforeEach(function() {
            domutil = window.ne.dooray.calendar.domutil;
            spyOn(domutil, 'closest');
            spyOn(domutil, 'getData');

            inst = new AlldayMove({on:function() {}});
        });

        describe('_onDragStart()', function() {
            it('cancel drag event when event session is not suitable for handler.', function() {
                spyOn(inst, 'checkExpectedCondition').and.returnValue(false);

                inst._onDragStart({});

                expect(domutil.closest).not.toHaveBeenCalled();
            });

            it('cancel drag event when model not exist that event session data.', function() {
                var mockController = {
                    events: {
                        items: {
                            '3': 'good'
                        }
                    }
                };

                var mockInst = {
                    baseController: mockController,
                    checkExpectedCondition: jasmine.createSpy('checkExpectedCondition'),
                    fire: jasmine.createSpy('fire')
                };

                // model instance not exist.
                mockInst.checkExpectedCondition.and.returnValue(true);
                domutil.getData.and.returnValue(2);
                proto._onDragStart.call(mockInst, {});

                expect(mockInst.fire).not.toHaveBeenCalled();
            });
        });
    });
});
